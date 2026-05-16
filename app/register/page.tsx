"use client"

import { TurnstileWidget } from "@/components/auth/turnstile-widget"
import { Button } from "@/components/ui/button"
import { getAuthCallbackUrl, getSafeAuthRedirectPath } from "@/lib/site-url"
import { createClient } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [paymentRequired, setPaymentRequired] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false)
  const [hasAuthenticatedSession, setHasAuthenticatedSession] = useState(false)
  const [authStateResolved, setAuthStateResolved] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState("")

  useEffect(() => {
    setMounted(true)
    setPaymentRequired(searchParams?.get("paymentRequired") === "1")
  }, [searchParams])

  useEffect(() => {
    let isMounted = true

    const resolveExistingSession = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!isMounted) return
        setHasAuthenticatedSession(Boolean(user))
      } catch {
        if (!isMounted) return
        setHasAuthenticatedSession(false)
      } finally {
        if (isMounted) {
          setAuthStateResolved(true)
        }
      }
    }

    void resolveExistingSession()

    return () => {
      isMounted = false
    }
  }, [])

  const paymentLinkUrl = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL
  const nextPath = getSafeAuthRedirectPath(searchParams?.get("next"), paymentRequired ? "/register?paymentRequired=1" : "/educ")
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const isBotProtectionRequired =
    process.env.NEXT_PUBLIC_BOT_PROTECTION_REQUIRED === "true" || process.env.NODE_ENV === "production"
  const isTurnstileEnabled = isBotProtectionRequired && Boolean(turnstileSiteKey?.trim())

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()

    if (honeypot.trim().length > 0) {
      setError("Bot activity detected. Please refresh and try again.")
      return
    }

    if (!firstName.trim()) {
      setError("Please enter your first name.")
      return
    }

    if (!email.trim()) {
      setError("Please enter your email address.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (isTurnstileEnabled && !captchaToken) {
      setError("Please complete the bot protection challenge.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: getAuthCallbackUrl("signup", nextPath),
          captchaToken: captchaToken ? captchaToken : undefined,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim() ? lastName.trim() : null,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      const accessToken = data.session?.access_token
      if (accessToken) {
        const response = await fetch("/api/auth/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({}),
        })

        if (!response.ok) {
          console.warn("[Register] Failed to sync user after sign up:", await response.text())
        }
      }

      setNeedsEmailConfirmation(!data.session)
      setRegistrationComplete(true)
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Unable to create your account right now.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const showAuthenticatedState = authStateResolved && hasAuthenticatedSession

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-green/15 via-sky-50 to-brand-orange/15 px-4 py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-brand-indigo/15 bg-white/80 shadow-xl backdrop-blur lg:grid-cols-2">
        <aside className="relative hidden border-r border-brand-indigo/10 bg-gradient-to-br from-brand-green/10 via-white to-brand-orange/10 p-8 lg:block">
          <div className="space-y-5">
            <p className={`inline-flex rounded-full border bg-white px-3 py-1 text-xs font-semibold ${paymentRequired ? "border-brand-orange/35 text-brand-orange" : "border-brand-green/35 text-brand-indigo"}`}>
              {paymentRequired ? "Create Your Account to Unlock Full Access" : "Create Your Learning Account"}
            </p>
            <h2 className="text-3xl font-semibold text-brand-indigo">
              {paymentRequired ? "Register, then unlock the full AI course" : "Register and save your AI learning progress"}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {paymentRequired
                ? "Create your account first so your payment, access, and progress are tied to the right user record."
                : "Your account is linked to Supabase authentication and synced into the app users table so progress and access can follow you."}
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>✓ Secure Supabase authentication</p>
              <p>✓ Profile synced to the app users table</p>
              <p>✓ Saved learning progress across sessions</p>
              {paymentRequired ? <p>✓ Ready for paid access to Modules 1-4</p> : <p>✓ Free access to Module 0 right away</p>}
            </div>
          </div>
          <div className="mt-7 overflow-hidden rounded-2xl border border-brand-indigo/10 bg-white">
            <Image
              src="/graphics/module-path.svg"
              alt="Visual learning path across all modules"
              width={900}
              height={560}
              className="h-auto w-full"
              priority
            />
          </div>
        </aside>

        <section className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-xl border border-brand-indigo/15 bg-white p-6">
            <h1 className="text-center text-2xl font-bold text-brand-indigo md:text-3xl">Register</h1>
            <p className="text-sm text-muted-foreground text-center">
              {paymentRequired
                ? "Create your account to continue into payment and unlock the full course."
                : "Create your account to save progress and continue learning across devices."}
            </p>

            {error ? (
              <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            ) : null}

            {showAuthenticatedState ? (
              <div className="space-y-4 rounded-lg border border-brand-green/25 bg-brand-green/5 p-5 text-sm text-brand-indigo">
                <p className="text-base font-semibold">You are already logged in.</p>
                <p>
                  {paymentRequired
                    ? "Your account is ready. Continue to payment to unlock Modules 1-4, or return to the free Module 0 preview."
                    : "Your Supabase session is active and your profile can be synced into the users table as you continue learning."}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {paymentRequired && paymentLinkUrl ? (
                    <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
                      <a href={paymentLinkUrl} target="_blank" rel="noopener noreferrer">
                        Complete Payment
                      </a>
                    </Button>
                  ) : (
                    <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
                      <Link href={nextPath}>Continue</Link>
                    </Button>
                  )}
                  <Button asChild variant="outline">
                    <Link href="/try">Try Module 0</Link>
                  </Button>
                </div>
              </div>
            ) : registrationComplete ? (
              <div className="space-y-4 rounded-lg border border-brand-green/25 bg-brand-green/5 p-5 text-sm text-brand-indigo">
                <p className="text-base font-semibold">Account created successfully.</p>
                <p>
                  {needsEmailConfirmation
                    ? `Check ${email} for your confirmation email. Once you confirm, we will finish signing you in and sync your profile into the users table.`
                    : "Your account is active and synced. You can continue into the course right away."}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {needsEmailConfirmation ? (
                    <Button asChild className="bg-brand-indigo text-white hover:bg-brand-indigo/90">
                      <Link href={nextPath === '/course' ? '/login' : `/login?next=${encodeURIComponent(nextPath)}`}>Go to Login</Link>
                    </Button>
                  ) : paymentRequired && paymentLinkUrl ? (
                    <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
                      <a href={paymentLinkUrl} target="_blank" rel="noopener noreferrer">
                        Complete Payment
                      </a>
                    </Button>
                  ) : (
                    <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
                      <Link href={nextPath}>Continue</Link>
                    </Button>
                  )}
                  <Button asChild variant="outline">
                    <Link href="/try">Try Module 0</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-brand-indigo/20 p-2.5 text-black"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-brand-indigo/20 p-2.5 text-black"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-brand-indigo/20 p-2.5 text-black"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-brand-indigo/20 p-2.5 text-black"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-brand-indigo/20 p-2.5 text-black"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter your password"
                  />
                </div>

                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                {isTurnstileEnabled ? (
                  <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setCaptchaToken} />
                ) : null}

                <Button type="submit" disabled={loading} className="w-full bg-brand-orange text-white hover:bg-brand-orange/90">
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            )}

            <div className="border-t pt-4 space-y-3">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href={nextPath === '/course' ? '/login' : `/login?next=${encodeURIComponent(nextPath)}`} className="font-medium text-brand-indigo hover:underline">
                  Login
                </Link>
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/course">Return to Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
