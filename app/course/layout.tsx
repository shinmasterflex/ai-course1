"use client"

import { CourseExplainerLayout } from "@/components/learning/component-explainer"
import { setupProgressSyncOnUnload } from "@/lib/progress-sync"
import { useProgress } from "@/hooks/use-progress"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import type React from "react"

/**
 * COURSE LAYOUT
 * Nested layout for /course routes
 * Inherits all styles and fonts from root layout
 */
export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { getCourseStructure, setCurrentPosition, currentModule, currentSection } = useProgress()

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

  return <CourseExplainerLayout>{children}</CourseExplainerLayout>
}
