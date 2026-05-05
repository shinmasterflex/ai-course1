'use client'

import { getAuthCallbackUrl } from '@/lib/site-url'
import { createClient } from '@/lib/supabase'
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
      user: data.session?.user?.email || 'Not logged in',
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
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Auth Debug Tool</h1>
        <p className="text-center text-gray-600">Diagnose authentication issues</p>

        <div className="space-y-4 border-t pt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 p-3 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 p-3 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={testLogin}
              className="rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Test Login
            </button>
            
            <button
              onClick={checkSession}
              className="rounded-lg bg-green-600 px-4 py-3 text-white font-medium hover:bg-green-700 transition"
            >
              Check Session
            </button>

            <button
              onClick={resetPassword}
              className="rounded-lg bg-orange-600 px-4 py-3 text-white font-medium hover:bg-orange-700 transition"
            >
              Reset Password
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-6 rounded-lg bg-gray-100 p-4">
            <h3 className="font-bold mb-2 text-gray-800">Result:</h3>
            <pre className="text-xs overflow-auto max-h-96 bg-gray-900 text-green-400 p-4 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="border-t pt-6 space-y-3">
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

        <div className="flex justify-center gap-4 border-t pt-6">
          <a 
            href="/sign-in" 
            className="text-blue-600 hover:underline font-medium"
          >
            ??Back to Sign In
          </a>
          <a 
            href="/register" 
            className="text-blue-600 hover:underline font-medium"
          >
            Create New Account ??
          </a>
        </div>
      </div>
    </main>
  )
}
