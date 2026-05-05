"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { progressManager } from "@/lib/global-progress"
import { AIChatButton } from "@/components/ai/ai-chat-button"
import { createClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function getDisplayName(user: { email?: string | null; user_metadata?: Record<string, unknown> } | null) {
  if (!user) return ""

  const metadata = user.user_metadata ?? {}
  const firstName = typeof metadata.first_name === "string" ? metadata.first_name.trim() : ""
  const lastName = typeof metadata.last_name === "string" ? metadata.last_name.trim() : ""
  const fullName = typeof metadata.full_name === "string" ? metadata.full_name.trim() : ""
  const name = typeof metadata.name === "string" ? metadata.name.trim() : ""

  const combinedName = [firstName, lastName].filter(Boolean).join(" ")
  if (combinedName) return combinedName
  if (fullName) return fullName
  if (name) return name

  return user.email ?? ""
}

export function Header() {
  const [displayName, setDisplayName] = useState("")
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    const loadUserName = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!isMounted) return
      setDisplayName(getDisplayName(user))
    }

    loadUserName()

    return () => {
      isMounted = false
    }
  }, [])

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset all course progress? This action cannot be undone.")) return
    if (isResetting) return

    setIsResetting(true)
    try {
      localStorage.clear()
      await progressManager.resetProgress()
      localStorage.clear()
      router.push("/course")
      router.refresh()
    } finally {
      setIsResetting(false)
    }
  }

  const handleSignOut = async () => {
    if (isSigningOut) return

    setIsSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/sign-in")
    router.refresh()
    setIsSigningOut(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-sky-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/course" className="flex items-center gap-2.5">
          <Image src="/logo1.svg" alt="Cogniijn Logo" width={40} height={28} className="h-7 w-10" priority />
          <div className="text-[1.9rem] leading-none sm:text-[2rem]">
            <span className="brand-wordmark text-brand-orange">Cogniijn</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/course" className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors">
            Dashboard
          </Link>
          <Link
            href="/course/module-0"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 0
          </Link>
          <Link
            href="/course/module-1"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 1
          </Link>
          <Link
            href="/course/module-2"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 2
          </Link>
          <Link
            href="/course/module-3"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 3
          </Link>
          <Link
            href="/course/module-4"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 4
          </Link>
          <Link
            href="/course/module-5"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 5
          </Link>
          <Link
            href="/course/module-6"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 6
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {displayName ? <span className="hidden text-sm text-muted-foreground md:inline">{displayName}</span> : null}
          <Button
            onClick={handleReset}
            disabled={isResetting}
            className="bg-brand-orange hover:bg-[#e64a19] text-white flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {isResetting ? "Resetting..." : "Reset Progress"}
          </Button>
          <Button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="bg-brand-green hover:bg-[#143d31] text-white"
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      </div>

      <AIChatButton />
    </header>
  )
}
