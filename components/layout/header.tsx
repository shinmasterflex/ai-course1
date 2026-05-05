"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { progressManager } from "@/lib/global-progress"
import { AIChatButton } from "@/components/ai/ai-chat-button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isResetting, setIsResetting] = useState(false)
  const router = useRouter()

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-sky-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/course" className="flex h-10 shrink-0 items-center">
          <Image
            src="/Logo.png"
            alt="Cognijin Logo"
            width={720}
            height={400}
            className="block h-8 w-auto md:h-9"
            priority
          />
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
          <Button
            onClick={handleReset}
            disabled={isResetting}
            className="bg-brand-orange hover:bg-[#e64a19] text-white flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {isResetting ? "Resetting..." : "Reset Progress"}
          </Button>
          <Button asChild className="bg-brand-green hover:bg-[#143d31] text-white">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>

      <AIChatButton />
    </header>
  )
}
