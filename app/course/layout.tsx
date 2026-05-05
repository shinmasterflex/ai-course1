"use client"

import { setupProgressSyncOnUnload } from "@/lib/progress-sync"
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
  // Setup automatic progress sync on page unload
  useEffect(() => {
    const cleanup = setupProgressSyncOnUnload()
    return cleanup
  }, [])

  return <>{children}</>
}
