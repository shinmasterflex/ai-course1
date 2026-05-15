"use client"

import { CourseModulePage } from "@/components/learning/course-module-page"

/**
 * PUBLIC TRY-IT-OUT PAGE
 * Free Module 0 preview accessible to all visitors without auth or payment.
 * Hosted at /try (outside the gated /course dashboard) and configured so
 * internal navigation stays on this public route.
 */
export default function TryPage() {
  return (
    <CourseModulePage
      moduleId="module-0"
      basePath="/try"
      exitPath="/register?paymentRequired=1"
    />
  )
}
