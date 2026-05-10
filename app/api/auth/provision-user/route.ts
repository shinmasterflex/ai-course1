import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { enforceRateLimit } from '@/lib/rate-limit'
import { verifyCheckoutSessionPayment } from '@/lib/stripe'
import { getSupabaseSecretKey, getSupabaseUrl } from '@/lib/supabase-env'

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

type AppUserUpsertPayload = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  paidAt: Date | null
  stripeCheckoutSessionId: string | null
  updatedAt: Date
}

async function upsertAppUser(payload: AppUserUpsertPayload) {
  try {
    return await prisma.users.upsert({
      where: { id: payload.id },
      update: payload,
      create: payload,
    })
  } catch (prismaError) {
    console.error('[Provision API] Prisma upsert failed. Falling back to Supabase service-role upsert:', prismaError)

    const adminClient = createClient(getSupabaseUrl(), getSupabaseSecretKey(), {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data, error } = await adminClient
      .from('users')
      .upsert(payload, { onConflict: 'id' })
      .select('*')
      .single()

    if (error || !data) {
      throw new Error(error?.message ? error.message : 'Supabase upsert failed.')
    }

    return data
  }
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

  const existingSessionOwner = await prisma.users.findFirst({
    where: { stripeCheckoutSessionId: sessionId },
    select: { id: true },
  })

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
      return NextResponse.json(
        { error: 'Payment session is already linked to another account.' },
        { status: 409 },
      )
    }
    throw err
  }
}