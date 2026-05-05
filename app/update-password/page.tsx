'use client'

import { createClient } from '@/lib/supabase'
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
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md text-center">
          <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-800">Password Updated!</h1>
          <p className="text-gray-600">
            Your password has been successfully updated. Redirecting you to the course...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold">Set New Password</h1>
        
        <p className="text-sm text-gray-600 text-center">
          Please enter your new password below.
        </p>

        {error && (
          <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full rounded border p-2 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              className="w-full rounded border p-2 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!error}
            className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <div className="text-center text-sm">
          <a href="/sign-in" className="text-blue-600 hover:underline">
            ??Back to Sign In
          </a>
        </div>
      </div>
    </main>
  )
}
