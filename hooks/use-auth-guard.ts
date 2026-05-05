'use client'

import { createClient } from '@/lib/supabase'
import { initializeProgressSync } from '@/lib/progress-sync'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type UseAuthGuardOptions = {
  redirectTo?: string
}

type UseAuthGuardResult = {
  isChecking: boolean
  isAuthenticated: boolean
  user: User | null
}

export function useAuthGuard(options: UseAuthGuardOptions = {}): UseAuthGuardResult {
  const { redirectTo = '/sign-in' } = options
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let isMounted = true

    const checkSession = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser()

        if (!isMounted) {
          return
        }

        if (error || !currentUser) {
          setUser(null)
          setIsAuthenticated(false)
          router.replace(redirectTo)
          return
        }

        setUser(currentUser)
        setIsAuthenticated(true)

        // Ensure authenticated users always exist in Prisma users table
        const syncResponse = await fetch('/api/auth/sync-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })

        if (syncResponse.ok) {
          const syncResult = await syncResponse.json()

          if (syncResult?.hasAccess === false) {
            setIsAuthenticated(false)
            router.replace('/register?paymentRequired=1')
            return
          }
        } else {
          console.error('[Auth Guard] Failed to sync user to Prisma:', await syncResponse.text())
        }

        // Initialize progress sync after successful auth
        initializeProgressSync().catch((err) => {
          console.error('[Auth Guard] Failed to initialize progress:', err)
        })
      } catch {
        if (!isMounted) {
          return
        }

        setUser(null)
        setIsAuthenticated(false)
        router.replace(redirectTo)
      } finally {
        if (isMounted) {
          setIsChecking(false)
        }
      }
    }

    checkSession()

    return () => {
      isMounted = false
    }
  }, [redirectTo, router])

  return { isChecking, isAuthenticated, user }
}