import { NextRequest } from 'next/server'

type TurnstileResponse = {
  success: boolean
  'error-codes'?: string[]
}

export type BotVerificationResult = {
  ok: boolean
  reason?: string
}

function getTurnstileSecretKey(): string | null {
  return process.env.TURNSTILE_SECRET_KEY ? process.env.TURNSTILE_SECRET_KEY : null
}

export function getTurnstileSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : null
}

export function isBotProtectionRequired(): boolean {
  if (process.env.BOT_PROTECTION_REQUIRED === 'true') {
    return true
  }

  return process.env.NODE_ENV === 'production'
}

function getClientIp(request: Request | NextRequest): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (forwardedFor) {
    const firstHop = forwardedFor.split(',')[0]?.trim()
    if (firstHop) {
      return firstHop
    }
  }

  const realIp = request.headers.get('x-real-ip')
  return realIp ? realIp : null
}

export async function verifyTurnstileToken(
  request: Request | NextRequest,
  token: string | null | undefined
): Promise<BotVerificationResult> {
  if (!isBotProtectionRequired()) {
    return { ok: true }
  }

  const secretKey = getTurnstileSecretKey()

  if (!secretKey) {
    return { ok: false, reason: 'Bot protection is not configured.' }
  }

  const normalizedToken = token?.trim() ? token.trim() : ''

  if (!normalizedToken) {
    return { ok: false, reason: 'Missing bot protection token.' }
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: normalizedToken,
      remoteip: getClientIp(request) ? getClientIp(request)! : '',
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    return { ok: false, reason: 'Bot verification request failed.' }
  }

  const data = (await response.json()) as TurnstileResponse

  if (!data.success) {
    const errorCode = data['error-codes']?.[0]
    return {
      ok: false,
      reason: errorCode ? `Bot verification failed (${errorCode}).` : 'Bot verification failed.',
    }
  }

  return { ok: true }
}