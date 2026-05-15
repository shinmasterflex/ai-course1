"use client"

import { CourseExplainerLayout } from "@/components/learning/component-explainer"
import { setupProgressSyncOnUnload } from "@/lib/progress-sync"
import { useProgress } from "@/hooks/use-progress"
import { AuthGuard } from "@/components/auth/auth-guard"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import type React from "react"

/**
 * COURSE LAYOUT
 * Nested layout for /course routes
 * Inherits all styles and fonts from root layout
 * 
 * ⚠️ PAYMENT GATING: AuthGuard enforces payment verification before showing course content
 * - Authenticated users without payment are redirected to /register?paymentRequired=1
 * - This ensures only paid users can access course materials
 */
export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { getCourseStructure, setCurrentPosition, currentModule, currentSection } = useProgress()
  // The /course dashboard itself is reachable for browsing module listings;
  // Module 0 now lives at the public /try route, so it is no longer gated here.
  const isDemoAccessiblePath = pathname === "/course"

  // Setup automatic progress sync on page unload
  useEffect(() => {
    const cleanup = setupProgressSyncOnUnload()
    return cleanup
  }, [])

  // Keep global progress position aligned with the current route.
  useEffect(() => {
    if (!pathname?.startsWith("/course/")) return

    const moduleId = pathname.split("/")[2]
    if (!moduleId) return

    const courseStructure = getCourseStructure()
    const module = courseStructure.modules.find((m) => m.id === moduleId)
    if (!module) return

    const requestedSection = searchParams?.get("section")
    const hasRequestedSection = !!requestedSection && module.sections.some((section) => section.id === requestedSection)
    const sectionId = hasRequestedSection ? requestedSection : module.sections[0]?.id
    if (!sectionId) return

    if (currentModule === moduleId && currentSection === sectionId) return
    setCurrentPosition(moduleId, sectionId)
  }, [currentModule, currentSection, getCourseStructure, pathname, searchParams, setCurrentPosition])

  if (isDemoAccessiblePath) {
    return <CourseExplainerLayout>{children}</CourseExplainerLayout>
  }

  return (
    <AuthGuard redirectTo="/register?paymentRequired=1">
      <CourseExplainerLayout>{children}</CourseExplainerLayout>
    </AuthGuard>
  )
}
