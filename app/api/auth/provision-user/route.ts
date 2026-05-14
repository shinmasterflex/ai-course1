import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { enforceRateLimit } from '@/lib/rate-limit'
import { verifyCheckoutSessionPayment } from '@/lib/stripe'
import { upsertAppUser, findUserById, findUserBySessionId } from '@/lib/user-db-ops'

type ProvisionBody = {
  userId?: string
  email?: string
  firstName?: string
  lastName?: string
  sessionId?: string
}

function normalizeOptionalName(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: Request) {
  const rateLimit = enforceRateLimit(request, {
    keyPrefix: 'api-auth-provision-user',
    maxRequests: 12,
    windowMs: 10 * 60 * 1000,
  })

  if (rateLimit.limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      }
    )
  }

  let body: ProvisionBody | null = null

  try {
    body = (await request.json()) as ProvisionBody
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
  }

  const userId = typeof body?.userId === 'string' ? body.userId.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId.trim() : ''

  if (!userId || !email || !sessionId) {
    return NextResponse.json({ error: 'Missing required registration fields.' }, { status: 400 })
  }

  const adminClient = createClient(getSupabaseUrl(), getSupabaseSecretKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  let authUserData: Awaited<ReturnType<typeof adminClient.auth.admin.getUserById>>['data'] | null = null
  let authUserError: Awaited<ReturnType<typeof adminClient.auth.admin.getUserById>>['error'] | null = null

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const result = await adminClient.auth.admin.getUserById(userId)
    authUserData = result.data
    authUserError = result.error

    if (authUserData?.user && !authUserError) {
      break
    }

    await wait(250)
  }

  if (authUserError || !authUserData?.user) {
    return NextResponse.json({ error: 'Unable to verify created user.' }, { status: 400 })
  }

  const rawAuthEmail = authUserData.user.email
  const authEmail = rawAuthEmail ? rawAuthEmail.trim().toLowerCase() : ''
  if (!authEmail || authEmail !== email) {
    return NextResponse.json({ error: 'Email verification mismatch.' }, { status: 400 })
  }

  const verification = await verifyCheckoutSessionPayment(sessionId)

  if (!verification.isPaid || verification.normalizedCustomerEmail !== email) {
    return NextResponse.json({ error: 'Payment session could not be verified for this user.' }, { status: 403 })
  }

  const existingSessionOwner = await findUserBySessionId(sessionId)

  if (existingSessionOwner && existingSessionOwner.id !== userId) {
    return NextResponse.json({ error: 'Payment session is already linked to another account.' }, { status: 409 })
  }

  const firstName = normalizeOptionalName(body?.firstName)
  const lastName = normalizeOptionalName(body?.lastName)

  try {
    const dbUser = await upsertAppUser({
      id: userId,
      email,
      firstName,
      lastName,
      paidAt: new Date(),
      stripeCheckoutSessionId: sessionId,
      updatedAt: new Date(),
    })

    return NextResponse.json({ user: dbUser })
  } catch (err: unknown) {
    // A concurrent request claimed this session between our findFirst check and the upsert.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      // Distinguish between session ID conflict vs email conflict
      const conflictTarget = Array.isArray(err.meta?.target) ? err.meta.target : []
      if (conflictTarget.includes('stripeCheckoutSessionId')) {
        // Session was claimed by another user during race window
        const sessionOwner = await findUserBySessionId(sessionId)
        if (sessionOwner?.id !== userId) {
          // Confirmed: another user owns this session
          return NextResponse.json(
            { error: 'Payment session is already linked to another account.' },
            { status: 409 },
          )
        }
        // We own it; query succeeded anyway (idempotent)
        const dbUser = await findUserById(userId)
        if (!dbUser) {
          return NextResponse.json({ error: 'Failed to provision user' }, { status: 500 })
        }
        return NextResponse.json({ user: dbUser })
      } else if (conflictTarget.includes('email')) {
        // Email already registered by another user
        return NextResponse.json(
          { error: 'Email is already linked to another account.' },
          { status: 409 },
        )
      } else {
        throw err
      }
    } else {
      throw err
    }
  }
}