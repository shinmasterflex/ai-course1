function sanitizeUrl(value: string): string {
  return value.trim().replace(/\/$/, '')
}

export function getSafeAuthRedirectPath(nextPath?: string | null, fallbackPath: string = '/educ'): string {
  if (!nextPath) {
    return fallbackPath
  }

  const trimmed = nextPath.trim()
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return fallbackPath
  }

  return trimmed
}

export function getAppBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (envUrl) {
    return sanitizeUrl(envUrl)
  }

  if (typeof window !== 'undefined') {
    return sanitizeUrl(window.location.origin)
  }

  return 'http://localhost:3000'
}

export function getAuthCallbackUrl(type?: string, nextPath?: string): string {
  const callbackUrl = new URL(`${getAppBaseUrl()}/auth/callback`)

  if (type) {
    callbackUrl.searchParams.set('type', type)
  }

  const safeNextPath = getSafeAuthRedirectPath(nextPath, '')
  if (safeNextPath) {
    callbackUrl.searchParams.set('next', safeNextPath)
  }

  return callbackUrl.toString()
}