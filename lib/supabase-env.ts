function getFirstDefinedEnvVar(...names: string[]): string | null {
  for (const name of names) {
    const value = process.env[name]

    if (value) {
      return value
    }
  }

  return null
}

function getClientSupabaseUrl(): string | null {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
  }
  if (process.env.SUPABASE_URL) {
    return process.env.SUPABASE_URL
  }
  return null
}

function getClientSupabasePublishableKey(): string | null {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY : null
}

function getRequiredEnvVar(...names: string[]): string {
  const value = getFirstDefinedEnvVar(...names)

  if (!value) {
    throw new Error(`Missing required environment variable. Provide one of: ${names.join(', ')}`)
  }

  return value
}

export function hasSupabasePublicEnv(): boolean {
  const hasUrl = Boolean(getClientSupabaseUrl())
  const hasKey = Boolean(getClientSupabasePublishableKey())

  return hasUrl && hasKey
}

export function getSupabaseUrl(): string {
  const clientValue = getClientSupabaseUrl()

  if (clientValue) {
    return clientValue
  }

  return getRequiredEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL')
}

export function getSupabasePublishableKey(): string {
  const clientValue = getClientSupabasePublishableKey()

  if (clientValue) {
    return clientValue
  }

  return getRequiredEnvVar(
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
  )
}

export function getSupabaseSecretKey(): string {
  return getRequiredEnvVar('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY')
}
