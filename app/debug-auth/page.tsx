'use client'

import { getAuthCallbackUrl } from '@/lib/site-url'
import { createClient } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function DebugAuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<any>(null)

  const testLogin = async () => {
    const supabase = createClient()
    
    console.log('Testing login with:', { email, passwordLength: password.length })
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    })

    setResult({
      success: !error,
      error: error ? {
        message: error.message,
        status: error.status,
        name: error.name,
      } : null,
      user: data.user ? {
        id: data.user.id,
        email: data.user.email,
        confirmed_at: data.user.confirmed_at,
        email_confirmed_at: data.user.email_confirmed_at,
        last_sign_in_at: data.user.last_sign_in_at,
      } : null,
    })
  }

  const checkSession = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()
    
    setResult({
      currentSession: data.session ? 'Active session found' : 'No active session',
      user: data.session?.user?.email ? data.session.user.email : 'Not logged in',
      error: error?.message,
    })
  }

  const resetPassword = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }
    
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getAuthCallbackUrl('recovery'),
    })

    if (error) {
      setResult({ error: error.message })
    } else {
      setResult({ success: 'Password reset email sent! Check your inbox.' })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-green/15 via-sky-50 to-brand-orange/15 p-4 md:p-8">
      <div className="mx-auto w-full max-w-5xl space-y-6 overflow-hidden rounded-2xl border border-brand-indigo/15 bg-white/85 p-6 shadow-xl backdrop-blur md:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
              Internal Debug Utility
            </p>
            <h1 className="text-3xl font-bold text-brand-indigo">Auth Debug Tool</h1>
            <p className="text-sm text-muted-foreground">Diagnose authentication, session, and reset flow issues.</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-brand-indigo/10 bg-white">
            <Image
              src="/graphics/auth-security.svg"
              alt="Authentication security visual"
              width={860}
              height={620}
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-brand-indigo/10 pt-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-brand-indigo/20 p-3 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-brand-indigo/20 p-3 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={testLogin}
              className="rounded-lg bg-brand-indigo px-4 py-3 text-white font-medium transition hover:opacity-90"
            >
              Test Login
            </button>
            
            <button
              onClick={checkSession}
              className="rounded-lg bg-brand-green px-4 py-3 text-white font-medium transition hover:opacity-90"
            >
              Check Session
            </button>

            <button
              onClick={resetPassword}
              className="rounded-lg bg-brand-orange px-4 py-3 text-white font-medium transition hover:opacity-90"
            >
              Reset Password
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-6 rounded-lg border border-brand-indigo/10 bg-gray-100 p-4">
            <h3 className="mb-2 font-bold text-gray-800">Result:</h3>
            <pre className="max-h-96 overflow-auto rounded bg-gray-900 p-4 text-xs text-green-400">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="space-y-3 border-t border-brand-indigo/10 pt-6">
          <h3 className="font-semibold text-gray-800">Common Issues:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">1.</span>
              <span><strong>Email not confirmed:</strong> Click the confirmation link sent to your email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">2.</span>
              <span><strong>Wrong password:</strong> Passwords are case-sensitive. Try resetting it.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">3.</span>
              <span><strong>Whitespace in email:</strong> Make sure there are no spaces before/after your email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">4.</span>
              <span><strong>Different email used:</strong> Check if you registered with a different email address</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center gap-4 border-t border-brand-indigo/10 pt-6">
          <Link href="/sign-in" className="font-medium text-brand-indigo hover:underline">
            Back to Sign In
          </Link>
          <Link href="/register" className="font-medium text-brand-indigo hover:underline">
            Create New Account
          </Link>
        </div>
      </div>
    </main>
  )
}
