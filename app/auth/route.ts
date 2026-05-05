import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSupabasePublishableKey, getSupabaseUrl } from '@/lib/supabase-env'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  console.log('[Auth] Received request with code:', code ? 'YES' : 'NO')

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
    
    console.log('[Auth] Exchange session result:', { 
      userId: data?.user?.id, 
      email: data?.user?.email,
      error: error?.message 
    })

    if (!error && data.user) {
      // Sync user to Prisma database
      try {
        console.log('[Auth] Syncing user to Prisma:', data.user.id)
        const metadata = data.user.user_metadata ?? {}
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
        
        console.log('[Auth] Successfully synced user to Prisma')
      } catch (syncError) {
        console.error('[Auth] Error syncing user to database:', syncError)
      }
    }
  }

  return NextResponse.redirect(`${origin}/course`)
}