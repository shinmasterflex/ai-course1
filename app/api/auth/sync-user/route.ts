import { createServerSupabaseClient } from '@/lib/supabase-server'
import { prisma } from '@/lib/prisma'
import { verifyCheckoutSessionPayment } from '@/lib/stripe'
import { verifyTurnstileToken } from '@/lib/bot-protection'
import { enforceRateLimit } from '@/lib/rate-limit'
import { getSupabasePublishableKey, getSupabaseSecretKey, getSupabaseUrl } from '@/lib/supabase-env'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

type SyncBody = {
  sessionId?: string
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

function getSessionIdFromBody(body: SyncBody | null): string | null {
  if (!body || typeof body.sessionId !== 'string') {
    return null
  }

  const trimmedSessionId = body.sessionId.trim()
  return trimmedSessionId.length > 0 ? trimmedSessionId : null
}

function getSessionIdFromMetadata(metadata: Record<string, unknown>): string | null {
  if (typeof metadata.stripe_checkout_session_id !== 'string') {
    return null
  }

  const trimmedSessionId = metadata.stripe_checkout_session_id.trim()
  return trimmedSessionId.length > 0 ? trimmedSessionId : null
}

async function resolveAuthenticatedUser(request: Request) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (user && !error) {
    return { user, error: null }
  }

  const authHeader = request.headers.get('authorization')?.trim() ?? ''
  const bearerPrefix = 'bearer '

  if (!authHeader.toLowerCase().startsWith(bearerPrefix)) {
    return { user: null, error }
  }

  const accessToken = authHeader.slice(bearerPrefix.length).trim()
  if (!accessToken) {
    return { user: null, error }
  }

  const tokenClient = createSupabaseClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const {
    data: tokenData,
    error: tokenError,
  } = await tokenClient.auth.getUser(accessToken)

  if (tokenError || !tokenData.user) {
    return { user: null, error: tokenError ?? error }
  }

  return { user: tokenData.user, error: null }
}

async function upsertAppUser(payload: AppUserUpsertPayload) {
  try {
    return await prisma.users.upsert({
      where: { id: payload.id },
      update: payload,
      create: payload,
    })
  } catch (prismaError) {
    console.error('[Sync API] Prisma upsert failed. Falling back to Supabase service-role upsert:', prismaError)

    const adminClient = createSupabaseClient(getSupabaseUrl(), getSupabaseSecretKey(), {
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
      throw new Error(error?.message ?? 'Supabase fallback upsert failed.')
    }

    return data
  }
}

export async function POST(request: Request) {
  const rateLimit = enforceRateLimit(request, {
    keyPrefix: 'api-auth-sync-user',
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

  let body: SyncBody | null = null

  try {
    body = (await request.json()) as SyncBody
  } catch {
    body = null
  }

  const sessionIdFromBody = getSessionIdFromBody(body)
  
  // Get the current authenticated user from SSR cookie session, or Bearer token fallback.
  const { user, error } = await resolveAuthenticatedUser(request)
  
  console.log('[Sync API] User:', user?.email || 'none', 'Error:', error?.message)
  
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Only enforce bot verification for explicit payment-linking requests from client forms.
  if (sessionIdFromBody) {
    const turnstileToken = request.headers.get('x-turnstile-token')
    const botVerification = await verifyTurnstileToken(request, turnstileToken)

    if (!botVerification.ok) {
      return NextResponse.json(
        { error: botVerification.reason ?? 'Bot verification failed.' },
        { status: 403 }
      )
    }
  }

  const metadata = user.user_metadata ?? {}
  const firstName = typeof metadata.first_name === 'string' ? metadata.first_name.trim() : null
  const lastName = typeof metadata.last_name === 'string' ? metadata.last_name.trim() : null
  const normalizedEmail = user.email!.trim().toLowerCase()
  const sessionId = sessionIdFromBody ?? getSessionIdFromMetadata(metadata)

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: user.id },
      select: {
        paidAt: true,
        stripeCheckoutSessionId: true,
      },
    })

    let verifiedSessionId: string | null = null

    if (sessionId) {
      try {
        const verification = await verifyCheckoutSessionPayment(sessionId)

        if (
          verification.isPaid &&
          verification.normalizedCustomerEmail === normalizedEmail
        ) {
          const existingSessionOwner = await prisma.users.findFirst({
            where: { stripeCheckoutSessionId: sessionId },
            select: { id: true },
          })

          if (!existingSessionOwner || existingSessionOwner.id === user.id) {
            verifiedSessionId = sessionId
          }
        }
      } catch (verificationError) {
        console.error('[Sync API] Stripe verification failed:', verificationError)
      }
    }

    const paidAt = existingUser?.paidAt ?? (verifiedSessionId ? new Date() : null)
    const stripeCheckoutSessionId = existingUser?.stripeCheckoutSessionId ?? verifiedSessionId

    const dbUser = await upsertAppUser({
      id: user.id,
      email: normalizedEmail,
      firstName,
      lastName,
      paidAt,
      stripeCheckoutSessionId,
      updatedAt: new Date(),
    })

    console.log('[Sync API] Successfully synced user to Prisma:', user.id)
    return NextResponse.json({
      user: dbUser,
      hasAccess: Boolean(dbUser.paidAt),
    })
  } catch (error) {
    console.error('[Sync API] Error syncing user:', error)
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 })
  }
}
