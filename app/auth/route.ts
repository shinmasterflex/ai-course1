import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSupabasePublishableKey, getSupabaseUrl } from '@/lib/supabase-env'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      getSupabaseUrl(),
      getSupabasePublishableKey(),
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    )
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[Auth] Failed to exchange code for session:', error.message)
    }

    if (!error && data.user) {
      // Sync user to Prisma database
      try {
        const metadata = data.user.user_metadata && typeof data.user.user_metadata === 'object' ? data.user.user_metadata : {}
        const firstName = typeof metadata.first_name === 'string' ? metadata.first_name.trim() : null
        const lastName = typeof metadata.last_name === 'string' ? metadata.last_name.trim() : null
        
        await prisma.users.upsert({
          where: { id: data.user.id },
          update: {
            email: data.user.email!,
            firstName,
            lastName,
            updatedAt: new Date(),
          },
          create: {
            id: data.user.id,
            email: data.user.email!,
            firstName,
            lastName,
            updatedAt: new Date(),
          },
        })
      } catch (syncError) {
        console.error('[Auth] Error syncing user to database:', syncError)
      }
    }
  }

  return NextResponse.redirect(`${origin}/course`)
}