"use client"

import Link from "next/link"
import Image from "next/image"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { Button } from "@/components/ui/button"
import { ModuleSectionBackButton } from "@/components/learning/module-section-back-button"
import { RotateCcw } from "lucide-react"
import { progressManager } from "@/lib/global-progress"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isResetting, setIsResetting] = useState(false)
  const router = useRouter()
  const headerAttributes = getExplainerAttributes({
    type: "Course header",
    title: "Top navigation bar",
    summary: "This header keeps the learner anchored with primary navigation, brand access, and course-level actions.",
    details: [
      "The left side handles orientation and return navigation.",
      "The right side contains course-wide actions like reset progress and return home.",
    ],
    interaction: "Use the links for fast navigation and the reset control only when you want to clear all saved progress.",
  })

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
    <header {...headerAttributes} className="sticky top-0 z-50 w-full border-b border-border bg-sky-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <ModuleSectionBackButton />
          <Link
            href="/course"
            {...getExplainerAttributes({
              type: "Brand navigation",
              title: "Cognijin course logo",
              summary: "This logo returns the learner to the course dashboard.",
              details: ["Brand links are a common return path back to the main course overview."],
              interaction: "Click the logo to leave the current lesson and return to the dashboard.",
            })}
            className="flex h-10 shrink-0 items-center"
          >
            <Image
              src="/Logo.png"
              alt="Cognijin Logo"
              width={720}
              height={400}
              className="block h-8 w-auto md:h-9"
              priority
            />
          </Link>
        </div>

        <div
          {...getExplainerAttributes({
            type: "Header actions",
            title: "Global course controls",
            summary: "These actions affect the full course session rather than only the current lesson block.",
            details: ["Reset Progress clears saved completion state.", "Home exits the course experience and returns to the public landing page."],
            interaction: "Use these controls when you want to restart progress or leave the course area.",
          })}
          className="flex items-center gap-2"
        >
          <Button
            {...getExplainerAttributes({
              type: "Reset action",
              title: isResetting ? "Resetting progress" : "Reset Progress",
              summary: "This button clears all saved course progress for the current learner on this device and in synced state.",
              details: ["It is intentionally destructive and asks for confirmation before proceeding.", "Use it when you want a full restart instead of continuing where you left off."],
              interaction: "Click it only if you want to permanently restart your course progress.",
            })}
            onClick={handleReset}
            disabled={isResetting}
            className="bg-brand-orange hover:bg-[#e64a19] text-white flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {isResetting ? "Resetting..." : "Reset Progress"}
          </Button>
          <Button
            {...getExplainerAttributes({
              type: "Navigation",
              title: "Dashboard",
              summary: "This button returns to the course dashboard.",
              details: ["Use it to navigate back to the main course overview."],
              interaction: "Click Dashboard to return to the course dashboard.",
            })}
            asChild
            className="bg-brand-green hover:bg-[#143d31] text-white"
          >
            <Link href="/course">Dashboard</Link>
          </Button>
        </div>
      </div>

    </header>
  )
}
