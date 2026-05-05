'use client'

import { createClient } from '@/lib/supabase'
import type { EmailOtpType } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Confirming your email...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const url = new URL(window.location.href)
        const tokenHash = url.searchParams.get('token_hash')
        const rawType = url.searchParams.get('type')
        const code = url.searchParams.get('code')

        const isEmailOtpType = (
          value: string | null
        ): value is EmailOtpType => {
          if (!value) {
            return false
          }

          return ['signup', 'invite', 'magiclink', 'recovery', 'email_change', 'email'].includes(value)
        }

        await new Promise(resolve => setTimeout(resolve, 500))

        const supabase = createClient()

        let { data: { user }, error } = await supabase.auth.getUser()

        if ((!user || error) && tokenHash && isEmailOtpType(rawType)) {
          setStatus('Confirming your email...')
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: rawType,
          })

          if (!verifyError) {
            const refreshed = await supabase.auth.getUser()
            user = refreshed.data.user
            error = refreshed.error
          } else {
            console.error('[Client Callback] verifyOtp error:', verifyError.message)
          }
        }

        if ((!user || error) && code) {
          await new Promise(resolve => setTimeout(resolve, 500))
          const retried = await supabase.auth.getUser()
          user = retried.data.user
          error = retried.error
        }
        
        console.log('[Client Callback] User check:', { 
          userId: user?.id,
          email: user?.email,
          type: rawType,
          error: error?.message 
        })

        if (error || !user) {
          setStatus('Error confirming email. Please try again.')
          setTimeout(() => {
            router.push('/sign-in')
          }, 2000)
          return
        }

        // Handle password recovery flow
        if (rawType === 'recovery') {
          setStatus('Redirecting to password update...')
          setTimeout(() => {
            router.push('/update-password')
          }, 500)
          return
        }

        setStatus('Email confirmed! Syncing your account...')
        
        // Sync to Prisma via API route
        try {
          console.log('[Client Callback] Calling sync API...')
          const {
            data: { session },
          } = await supabase.auth.getSession()

          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          }

          if (session?.access_token) {
            headers.Authorization = `Bearer ${session.access_token}`
          }

          const response = await fetch('/api/auth/sync-user', {
            method: 'POST',
            headers,
          })

          console.log('[Client Callback] Sync API response status:', response.status)
          const responseData = await response.json()
          console.log('[Client Callback] Sync API response data:', responseData)

          if (response.ok) {
            console.log('[Client Callback] User synced to Prisma successfully')
            setStatus('Success! Redirecting to your course...')
            setTimeout(() => {
              router.push('/course')
            }, 1000)
          } else {
            console.error('[Client Callback] Failed to sync to Prisma:', responseData)
            setStatus('Account confirmed! Redirecting...')
            setTimeout(() => {
              router.push('/course')
            }, 1000)
          }
        } catch (syncError) {
          console.error('[Client Callback] Sync error:', syncError)
          setStatus('Account confirmed! Redirecting...')
          setTimeout(() => {
            router.push('/course')
          }, 1000)
        }
      } catch (error) {
        console.error('[Client Callback] Error:', error)
        setStatus('An error occurred. Redirecting...')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{status}</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  )
}
