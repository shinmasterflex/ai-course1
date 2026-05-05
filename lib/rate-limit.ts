import { NextRequest } from 'next/server'

type RateLimitStore = Map<string, number[]>

declare global {
  var __cognijinRateLimitStore: RateLimitStore | undefined
}

type RateLimitConfig = {
  keyPrefix: string
  maxRequests: number
  windowMs: number
}

export type RateLimitResult = {
  limited: boolean
  remaining: number
  retryAfterSeconds: number
}

function getStore(): RateLimitStore {
  if (!globalThis.__cognijinRateLimitStore) {
    globalThis.__cognijinRateLimitStore = new Map<string, number[]>()
  }

  return globalThis.__cognijinRateLimitStore
}

function getClientIp(request: Request | NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (forwardedFor) {
    const firstHop = forwardedFor.split(',')[0]?.trim()
    if (firstHop) {
      return firstHop
    }
  }

  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function enforceRateLimit(
  request: Request | NextRequest,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const earliestAllowed = now - config.windowMs
  const ip = getClientIp(request)
  const bucketKey = `${config.keyPrefix}:${ip}`
  const store = getStore()
  const existingHits = store.get(bucketKey) ?? []
  const activeHits = existingHits.filter((timestamp) => timestamp > earliestAllowed)

  if (activeHits.length >= config.maxRequests) {
    const oldestHit = activeHits[0] ?? now
    const retryAfterMs = Math.max(0, oldestHit + config.windowMs - now)

    store.set(bucketKey, activeHits)

    return {
      limited: true,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    }
  }

  activeHits.push(now)
  store.set(bucketKey, activeHits)

  if (store.size > 4000) {
    for (const [key, hits] of store.entries()) {
      const filtered = hits.filter((timestamp) => timestamp > now - config.windowMs)
      if (filtered.length === 0) {
        store.delete(key)
      } else {
        store.set(key, filtered)
      }
    }
  }

  return {
    limited: false,
    remaining: Math.max(0, config.maxRequests - activeHits.length),
    retryAfterSeconds: 0,
  }
}