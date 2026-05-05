'use client'

import { createClient } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Check if user has valid recovery session
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setError('Invalid or expired password reset link. Please request a new one.')
      }
    }
    
    checkSession()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    // Redirect to course after 2 seconds
    setTimeout(() => {
      router.push('/course')
    }, 2000)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-brand-green/15 via-sky-50 to-brand-orange/15 px-4 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-brand-indigo/15 bg-white/80 shadow-xl backdrop-blur lg:grid-cols-2">
          <aside className="relative hidden border-r border-brand-indigo/10 bg-gradient-to-br from-brand-green/10 via-white to-brand-orange/10 p-8 lg:block">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-brand-green/35 bg-white px-3 py-1 text-xs font-semibold text-brand-indigo">
                Account Recovery
              </p>
              <h2 className="text-3xl font-semibold text-brand-indigo">Your account is secure again</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Password updated successfully. You will be redirected to your course dashboard in a moment.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-brand-indigo/10 bg-white">
              <Image
                src="/graphics/auth-security.svg"
                alt="Account security illustration"
                width={860}
                height={620}
                className="h-auto w-full"
                priority
              />
            </div>
          </aside>

          <section className="p-6 md:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-brand-green/25 bg-brand-green/5 p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-800">Password Updated!</h1>
              <p className="text-gray-600">
                Your password has been successfully updated. Redirecting you to the course...
              </p>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-green/15 via-sky-50 to-brand-orange/15 px-4 py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-brand-indigo/15 bg-white/80 shadow-xl backdrop-blur lg:grid-cols-2">
        <aside className="relative hidden border-r border-brand-indigo/10 bg-gradient-to-br from-brand-green/10 via-white to-brand-orange/10 p-8 lg:block">
          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-brand-green/35 bg-white px-3 py-1 text-xs font-semibold text-brand-indigo">
              Password Recovery
            </p>
            <h2 className="text-3xl font-semibold text-brand-indigo">Set a strong new password</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Update your credentials securely and continue your learning progress without interruption.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-brand-indigo/10 bg-white">
            <Image
              src="/graphics/auth-security.svg"
              alt="Security illustration for password reset"
              width={860}
              height={620}
              className="h-auto w-full"
              priority
            />
          </div>
        </aside>

        <section className="p-6 md:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-brand-indigo/15 bg-white p-6">
            <h1 className="text-center text-2xl font-bold text-brand-indigo">Set New Password</h1>

            <p className="text-center text-sm text-gray-600">
              Please enter your new password below.
            </p>

            {error && (
              <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-brand-indigo/20 p-2.5 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  required
                  className="w-full rounded-lg border border-brand-indigo/20 p-2.5 text-black"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !!error}
                className="w-full rounded-lg bg-brand-orange p-2.5 text-white hover:bg-brand-orange/90 disabled:bg-gray-400"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>

            <div className="text-center text-sm">
              <Link href="/sign-in" className="font-medium text-brand-indigo hover:underline">
                Back to Sign In
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
