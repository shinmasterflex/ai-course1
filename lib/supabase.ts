import { createBrowserClient } from '@supabase/ssr'

function isPlaceholder(value: string): boolean {
  const lowered = value.toLowerCase()
  return (
    lowered.includes('your-project-ref') ||
    lowered.includes('sb_publishable_xxx') ||
    lowered.includes('example')
  )
}

// For client components
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      'Missing NEXT_PUBLIC Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your deployment environment and redeploy.'
    )
  }

  if (isPlaceholder(supabaseUrl) || isPlaceholder(supabasePublishableKey)) {
    throw new Error(
      'Supabase environment variables are still placeholder values. Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY with real values from your Supabase project settings.'
    )
  }

  return createBrowserClient(
    supabaseUrl,
    supabasePublishableKey
  )
}


