"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"

export function ModuleSectionBackButton() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getCourseStructure, setCurrentPosition } = useProgress()

  const moduleId = useMemo(() => {
    const match = pathname?.match(/^\/course\/(module-\d+)$/)
    return match?.[1] ?? null
  }, [pathname])

  const navigationTarget = useMemo(() => {
    if (!moduleId) {
      return null
    }

    const module = getCourseStructure().modules.find((item) => item.id === moduleId)
    if (!module || module.sections.length === 0) {
      return null
    }

    const currentSectionId = searchParams?.get("section") ?? module.sections[0]?.id
    const currentSectionIndex = module.sections.findIndex((section) => section.id === currentSectionId)
    const safeSectionIndex = currentSectionIndex >= 0 ? currentSectionIndex : 0

    if (safeSectionIndex === 0) {
      return {
        href: "/course",
        label: "Back",
        sectionId: null,
      }
    }

    const previousSection = module.sections[safeSectionIndex - 1]

    return {
      href: `/course/${moduleId}?section=${previousSection.id}`,
      label: "Back",
      sectionId: previousSection.id,
    }
  }, [getCourseStructure, moduleId, searchParams])

  if (!moduleId || !navigationTarget) {
    return null
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={() => {
        if (navigationTarget.sectionId) {
          setCurrentPosition(moduleId, navigationTarget.sectionId)
        }

        router.push(navigationTarget.href)
      }}
    >
      <ArrowLeft className="h-4 w-4" />
      {navigationTarget.label}
    </Button>
  )
}