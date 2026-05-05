'use client'

import { getAuthCallbackUrl } from '@/lib/site-url'
import { createClient } from '@/lib/supabase'
import { TurnstileWidget } from '@/components/auth/turnstile-widget'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

function getSupabaseProjectDetails() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ''

  if (!url) {
    return {
      isConfigured: false,
      projectRef: null as string | null,
      reason: 'Missing NEXT_PUBLIC_SUPABASE_URL',
    }
  }

  const lower = url.toLowerCase()
  if (lower.includes('your-project-ref') || lower.includes('example')) {
    return {
      isConfigured: false,
      projectRef: null as string | null,
      reason: 'NEXT_PUBLIC_SUPABASE_URL is still a placeholder value',
    }
  }

  try {
    const parsed = new URL(url)
    const projectRef = parsed.hostname.split('.')[0] ?? null

    return {
      isConfigured: Boolean(projectRef),
      projectRef,
      reason: null as string | null,
    }
  } catch {
    return {
      isConfigured: false,
      projectRef: null as string | null,
      reason: 'NEXT_PUBLIC_SUPABASE_URL is not a valid URL',
    }
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [paymentEmail, setPaymentEmail] = useState<string | null>(null)
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null)
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const isBotProtectionRequired =
    process.env.NEXT_PUBLIC_BOT_PROTECTION_REQUIRED === 'true' || process.env.NODE_ENV === 'production'
  const isTurnstileEnabled = isBotProtectionRequired && Boolean(turnstileSiteKey?.trim())
  const querySessionId = useMemo(() => searchParams.get('session_id')?.trim() ?? '', [searchParams])
  const supabaseProjectDetails = useMemo(() => getSupabaseProjectDetails(), [])

  useEffect(() => {
    const loadCurrentUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setCurrentUserEmail(user?.email?.trim().toLowerCase() ?? null)
    }

    loadCurrentUser().catch((currentUserError) => {
      console.error('[Register] Failed to load current user:', currentUserError)
      setCurrentUserEmail(null)
    })
  }, [])

  useEffect(() => {
    const verifyPaymentSession = async (sessionId: string) => {
      setPaymentLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/payments/verify-session?session_id=${encodeURIComponent(sessionId)}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result?.error || 'Unable to verify payment session.')
        }

        setPaymentVerified(true)
        setPaymentSessionId(result.sessionId)
        setPaymentEmail(result.email)
        setEmail(result.email)
      } catch (verificationError) {
        const message = verificationError instanceof Error ? verificationError.message : 'Unable to verify payment session.'
        setPaymentVerified(false)
        setPaymentSessionId(null)
        setPaymentEmail(null)
        setError(message)
      } finally {
        setPaymentLoading(false)
      }
    }

    if (!querySessionId) {
      setPaymentVerified(false)
      setPaymentSessionId(null)
      setPaymentEmail(null)
      return
    }

    verifyPaymentSession(querySessionId)
  }, [querySessionId])

  const handleStartCheckout = async () => {
    setCheckoutLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.checkoutUrl) {
        throw new Error(result?.error || 'Unable to start checkout.')
      }

      window.location.href = result.checkoutUrl
    } catch (checkoutError) {
      const message = checkoutError instanceof Error ? checkoutError.message : 'Unable to start checkout.'
      setError(message)
      setCheckoutLoading(false)
    }
  }

  const handleUnlockModules = async () => {
    if (!paymentSessionId) {
      setError('Payment session is missing. Please complete checkout again.')
      return
    }

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
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (captchaToken) {
        headers['x-turnstile-token'] = captchaToken
      }

      const response = await fetch('/api/auth/sync-user', {
        method: 'POST',
        headers,
        body: JSON.stringify({ sessionId: paymentSessionId }),
      })

      const result = await response.json()

      if (!response.ok || !result?.hasAccess) {
        throw new Error(result?.error || 'Payment could not be linked to this account.')
      }

      router.push('/course')
      router.refresh()
    } catch (unlockError) {
      const message = unlockError instanceof Error ? unlockError.message : 'Unable to unlock modules.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (honeypot.trim().length > 0) {
      setError('Bot activity detected. Please refresh and try again.')
      return
    }

    if (isTurnstileEnabled && !captchaToken) {
      setError('Please complete the bot protection challenge.')
      return
    }

    if (!paymentVerified || !paymentSessionId) {
      setError('Please complete payment before creating your account.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (!supabaseProjectDetails.isConfigured) {
        throw new Error('Registration is temporarily unavailable. Please try again later.')
      }

      const supabase = createClient()
      const redirectUrl = getAuthCallbackUrl()
      const normalizedEmail = email.trim().toLowerCase()

      console.log('Email redirect URL will be:', redirectUrl)

      const signUpPromise = supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          captchaToken: captchaToken ?? undefined,
          data: {
            first_name: firstName,
            last_name: lastName,
            stripe_checkout_session_id: paymentSessionId,
          },
        },
      })

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Sign-up request timed out. Please try again in a moment.'))
        }, 15000)
      })

      const { data, error } = await Promise.race([signUpPromise, timeoutPromise])

      console.log('Sign up response:', { data, error })

      if (error) {
        const errorCode = typeof error.code === 'string' ? ` (${error.code})` : ''
        console.error('[Register] Supabase sign-up error:', error.message, errorCode)
        setError('Unable to complete registration right now. Please try again.')
      } else if (data?.user?.identities && data.user.identities.length === 0) {
        setError('This email is already registered. Please sign in and then use your paid checkout link to unlock modules.')
      } else if (data?.user) {
        try {
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          }

          if (captchaToken) {
            headers['x-turnstile-token'] = captchaToken
          }

          const provisionResponse = await fetch('/api/auth/provision-user', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              userId: data.user.id,
              email: normalizedEmail,
              firstName,
              lastName,
              sessionId: paymentSessionId,
            }),
          })

          if (!provisionResponse.ok) {
            const result = await provisionResponse.json().catch(() => null)
            console.error('[Register] Failed to provision app user:', result)
          }
        } catch (provisionError) {
          console.error('[Register] Failed to provision app user:', provisionError)
        }

        alert('Success! Check your email for a confirmation link to activate your account.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to complete sign up right now.'
      console.error('Sign up failed:', error)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const paymentEmailMismatch = Boolean(
    currentUserEmail && paymentEmail && currentUserEmail !== paymentEmail
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Create your LMS Account</h1>

        {error && (
          <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {!paymentVerified ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Payment is required before registration. Complete checkout, then return to this page with the Stripe success link.
            </p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                if (!checkoutLoading) {
                  void handleStartCheckout()
                }
              }}
              className="block w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-center"
              aria-disabled={checkoutLoading}
            >
              {checkoutLoading ? 'Redirecting to Checkout...' : 'Pay to Register'}
            </a>
            {paymentLoading && (
              <p className="text-sm text-gray-600">Verifying payment session...</p>
            )}
          </div>
        ) : currentUserEmail ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Payment verified for <strong>{paymentEmail}</strong>.
            </p>
            {paymentEmailMismatch ? (
              <p className="text-sm text-red-700">
                The paid email does not match your signed-in account ({currentUserEmail}). Sign in with the paid email account.
              </p>
            ) : (
              <>
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
                  type="button"
                  onClick={handleUnlockModules}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Unlocking...' : 'Unlock Course Modules'}
                </button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded text-black"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded text-black"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                required
                value={email}
                readOnly
                className="w-full p-2 border rounded text-black bg-gray-100"
                placeholder="you@example.com"
              />
              <p className="mt-1 text-xs text-gray-600">Email is locked to the Stripe checkout email.</p>
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="?�••••••�?
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
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Sending Invite...' : 'Sign Up'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/sign-in" className="font-medium text-blue-600 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </main>
  )
}