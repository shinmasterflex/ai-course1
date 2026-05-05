function sanitizeUrl(value: string): string {
  return value.trim().replace(/\/$/, '')
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

export function getAuthCallbackUrl(type?: string): string {
  const callbackUrl = `${getAppBaseUrl()}/auth/callback`

  if (!type) {
    return callbackUrl
  }

  return `${callbackUrl}?type=${encodeURIComponent(type)}`
}