import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabasePublishableKey, getSupabaseUrl, hasSupabasePublicEnv } from '@/lib/supabase-env'
import { enforceRateLimit } from '@/lib/rate-limit'

type SupabaseAuthError = {
  code?: string
  message?: string
}

function isRefreshTokenMissingError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false
  }

  const authError = error as SupabaseAuthError
  return authError.code === 'refresh_token_not_found'
}

function isAuthSessionMissingError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false
  }

  const authError = error as SupabaseAuthError
  if (authError.code === 'auth_session_missing') {
    return true
  }

  return authError.message === 'Auth session missing!'
}

function isExpectedAnonymousAuthError(error: unknown): boolean {
  return isRefreshTokenMissingError(error) || isAuthSessionMissingError(error)
}

function getRateLimitConfig(request: NextRequest): { keyPrefix: string; maxRequests: number; windowMs: number } | null {
  const { pathname } = request.nextUrl
  const isPost = request.method === 'POST'

  if (pathname === '/sign-in' || pathname === '/register') {
    return {
      keyPrefix: `page-auth-${pathname}`,
      maxRequests: isPost ? 20 : 80,
      windowMs: 10 * 60 * 1000,
    }
  }

  if (pathname.startsWith('/api/auth/sync-user')) {
    return {
      keyPrefix: 'proxy-api-auth-sync-user',
      maxRequests: 30,
      windowMs: 10 * 60 * 1000,
    }
  }

  if (pathname.startsWith('/api/ai-chat')) {
    return {
      keyPrefix: 'proxy-api-ai-chat',
      maxRequests: 50,
      windowMs: 60 * 1000,
    }
  }

  return null
}

function isSupabaseProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith('/course') ||
    pathname.startsWith('/api/auth/sync-user') ||
    pathname.startsWith('/api/progress')
  )
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const rateLimitConfig = getRateLimitConfig(request)

  if (rateLimitConfig) {
    const rateLimit = enforceRateLimit(request, rateLimitConfig)

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
  }

  if (!hasSupabasePublicEnv()) {
    console.error('[Middleware] Supabase environment variables are missing.')

    if (isSupabaseProtectedPath(pathname)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication service is not configured.' },
          { status: 500 }
        )
      }

      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('error', 'auth_config')
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        const isSecureCookie = request.nextUrl.protocol === 'https:' || process.env.NODE_ENV === 'production'

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
            path: options?.path ? options.path : '/',
            sameSite: options?.sameSite ? options.sameSite : 'lax',
            secure: typeof options?.secure === 'boolean' ? options.secure : isSecureCookie,
          })
        })
      },
    },
  })

  // Check if this is an auth callback with a code
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  
  if (code) {
    // Exchange code for session - this will use the PKCE verifier cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[Middleware] Auth code exchange failed:', error.message)
    }
  }

  // Refresh session if it exists. Missing refresh tokens on public pages are expected for anonymous users.
  let user: { email?: string | null } | null = null

  try {
    const {
      data: { user: resolvedUser },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      if (!isExpectedAnonymousAuthError(error)) {
        console.error('[Middleware] Failed to resolve auth user:', error.message)
      }
    } else {
      user = resolvedUser
    }
  } catch (error) {
    if (!isExpectedAnonymousAuthError(error)) {
      console.error('[Middleware] Unexpected error while resolving auth user:', error)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
