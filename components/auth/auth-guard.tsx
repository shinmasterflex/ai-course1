'use client'

import { Spinner } from '@/components/ui/spinner'
import { useAuthGuard } from '@/hooks/use-auth-guard'
import type React from 'react'

type AuthGuardProps = {
  children: React.ReactNode
  redirectTo?: string
}

function DefaultLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner className="size-4" />
        <span>Checking session...</span>
      </div>
    </div>
  )
}

export function AuthGuard({
  children,
  redirectTo,
}: AuthGuardProps) {
  const { isChecking, isAuthenticated } = useAuthGuard({ redirectTo })

  if (isChecking || !isAuthenticated) {
    return <DefaultLoadingState />
  }

  return <>{children}</>
}