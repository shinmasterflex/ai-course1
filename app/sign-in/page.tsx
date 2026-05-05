'use client'

import { getAuthCallbackUrl } from '@/lib/site-url'
import { createClient } from '@/lib/supabase'
import { TurnstileWidget } from '@/components/auth/turnstile-widget'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const isBotProtectionRequired =
    process.env.NEXT_PUBLIC_BOT_PROTECTION_REQUIRED === 'true' || process.env.NODE_ENV === 'production'
  const isTurnstileEnabled = isBotProtectionRequired && Boolean(turnstileSiteKey?.trim())

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (honeypot.trim().length > 0) {
      setError('Bot activity detected. Please refresh and try again.')
      return
    }

    if (isTurnstileEnabled && !captchaToken) {
      setError('Please complete the bot protection challenge.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
        options: {
          captchaToken: captchaToken ?? undefined,
        },
      })

      if (signInError) {
        // Provide more helpful error messages
        if (signInError.message === 'Invalid login credentials') {
          setError('Invalid email or password. Please check your credentials and try again.')
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Please confirm your email before signing in. Check your inbox for the confirmation link.')
        } else {
          setError(signInError.message)
        }
        return
      }

      // Best-effort profile sync so users appear in the app database even if they were created in Auth earlier.
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }

        if (session?.access_token) {
          headers.Authorization = `Bearer ${session.access_token}`
        }

        await fetch('/api/auth/sync-user', {
          method: 'POST',
          headers,
        })
      } catch (syncError) {
        console.warn('[SignIn] Profile sync failed:', syncError)
      }

      router.push('/course')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email.trim()) {
      setError('Please enter your email address')
      setLoading(false)
      return
    }

    if (honeypot.trim().length > 0) {
      setError('Bot activity detected. Please refresh and try again.')
      setLoading(false)
      return
    }

    if (isTurnstileEnabled && !captchaToken) {
      setError('Please complete the bot protection challenge.')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: getAuthCallbackUrl('recovery'),
          captchaToken: captchaToken ?? undefined,
        }
      )

      if (resetError) {
        setError(resetError.message)
      } else {
        setResetSent(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send reset email right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold">
          {showResetForm ? 'Reset Your Password' : 'Sign in to your LMS Account'}
        </h1>

        {error && (
          <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {resetSent ? (
          <div className="rounded border border-green-400 bg-green-50 p-4 text-center">
            <p className="font-medium text-green-800 mb-2">Check your email!</p>
            <p className="text-sm text-green-700">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <button
              onClick={() => {
                setShowResetForm(false)
                setResetSent(false)
                setError(null)
              }}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              ??Back to Sign In
            </button>
          </div>
        ) : showResetForm ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                required
                className="w-full rounded border p-2 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            {isTurnstileEnabled && (
              <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setCaptchaToken} />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowResetForm(false)
                  setError(null)
                }}
                className="flex-1 rounded border border-gray-300 p-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        ) : (
          <>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full rounded border p-2 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  required
                  className="w-full rounded border p-2 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              {isTurnstileEnabled && (
                <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setCaptchaToken} />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => {
                  setShowResetForm(true)
                  setError(null)
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Need an account?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:underline">
                Register here
              </a>
            </p>
          </>
        )}
      </div>
    </main>
  )
}
