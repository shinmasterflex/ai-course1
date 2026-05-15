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

  const routeContext = useMemo(() => {
    if (pathname === "/try" || pathname?.startsWith("/try/")) {
      return { moduleId: "module-0", basePath: "/try", exitPath: "/" }
    }

    const match = pathname?.match(/^\/course\/(module-\d+)$/)
    if (match && match[1]) {
      return { moduleId: match[1], basePath: `/course/${match[1]}`, exitPath: "/course" }
    }

    return null
  }, [pathname])

  const moduleId = routeContext?.moduleId ?? null

  const navigationTarget = useMemo(() => {
    if (!routeContext || !moduleId) {
      return null
    }

    const module = getCourseStructure().modules.find((item) => item.id === moduleId)
    if (!module || module.sections.length === 0) {
      return null
    }

    const currentSectionId = searchParams?.get("section") ? searchParams.get("section") : module.sections[0]?.id
    const currentSectionIndex = module.sections.findIndex((section) => section.id === currentSectionId)
    const safeSectionIndex = currentSectionIndex >= 0 ? currentSectionIndex : 0

    if (safeSectionIndex === 0) {
      return {
        href: routeContext.exitPath,
        label: "Back",
        sectionId: null,
      }
    }

    const previousSection = module.sections[safeSectionIndex - 1]

    return {
      href: `${routeContext.basePath}?section=${previousSection.id}`,
      label: "Back",
      sectionId: previousSection.id,
    }
  }, [getCourseStructure, moduleId, routeContext, searchParams])

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