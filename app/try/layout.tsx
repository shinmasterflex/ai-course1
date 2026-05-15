"use client"

import type React from "react"
import { useEffect } from "react"
import { CourseExplainerLayout } from "@/components/learning/component-explainer"
import { setupProgressSyncOnUnload } from "@/lib/progress-sync"

/**
 * TRY MODULE 0 LAYOUT
 * Public, visitor-facing layout that hosts the free Module 0 preview
 * outside of the gated /course dashboard.
 */
export default function TryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const cleanup = setupProgressSyncOnUnload()
    return cleanup
  }, [])

  return <CourseExplainerLayout>{children}</CourseExplainerLayout>
}
