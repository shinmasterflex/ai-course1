"use client"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronDown, BookOpen, CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProgress } from "@/hooks/use-progress"
import { useState, useEffect, useMemo } from "react"
import { createClient } from "@/lib/supabase"

function getDisplayName(user: { email?: string | null; user_metadata?: Record<string, unknown> } | null) {
  if (!user) return ""

  const metadata = user.user_metadata && typeof user.user_metadata === "object" ? user.user_metadata : {}
  const firstName = typeof metadata.first_name === "string" ? metadata.first_name.trim() : ""
  const lastName = typeof metadata.last_name === "string" ? metadata.last_name.trim() : ""
  const fullName = typeof metadata.full_name === "string" ? metadata.full_name.trim() : ""
  const name = typeof metadata.name === "string" ? metadata.name.trim() : ""

  const combinedName = [firstName, lastName].filter(Boolean).join(" ")
  if (combinedName) return combinedName
  if (fullName) return fullName
  if (name) return name

  return user.email ? user.email : ""
}

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { getCourseStructure, getCompletedSections, currentModule, currentSection, setCurrentPosition } = useProgress()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [displayName, setDisplayName] = useState("")

  // Mark as client-side after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

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

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  const courseStructure = getCourseStructure()
  const completedSectionIdsByModule = useMemo(() => {
    const completedMap = new Map<string, Set<string>>()

    courseStructure.modules.forEach((module) => {
      completedMap.set(module.id, new Set(getCompletedSections(module.id)))
    })

    return completedMap
  }, [courseStructure, getCompletedSections, currentModule, currentSection])

  const activeSectionFromUrl = searchParams?.get("section")
  const sidebarAttributes = getExplainerAttributes({
    type: "Course sidebar",
    title: "Module and section navigation",
    summary: "This sidebar shows the course structure, active module, and section-level progress.",
    details: [
      "Module rows jump to a module entry point.",
      "Expanded section rows let the learner move directly to a specific section in the active module.",
    ],
    interaction: "Use the sidebar when you want to navigate by module outline instead of scrolling linearly.",
  })

  const handleSectionClick = (moduleId: string, sectionId: string) => {
    setCurrentPosition(moduleId, sectionId)
    router.push(`/course/${moduleId}?section=${sectionId}`)
  }

  const handleModuleClick = (moduleId: string, sections: { id: string }[]) => {
    if (pathname?.includes(moduleId)) return // already here
    const firstSection = sections[0]?.id
    if (firstSection) {
      setCurrentPosition(moduleId, firstSection)
      router.push(`/course/${moduleId}?section=${firstSection}`)
    } else {
      router.push(`/course/${moduleId}`)
    }
  }

  if (isCollapsed) {
    return (
      <button
        {...getExplainerAttributes({
          type: "Sidebar toggle",
          title: "Expand sidebar",
          summary: "This floating control restores the collapsed course menu.",
          details: ["Use it when you need the full module outline again."],
          interaction: "Click it to reopen the sidebar.",
        })}
        onClick={toggleCollapsed}
        className="fixed -left-2 top-20 z-50 flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg hover:bg-muted transition-all duration-300 ease-in-out group hover:left-0"
        aria-label="Expand sidebar"
      >
        <BookOpen className="h-4 w-4 text-brand-green" />
        <span className="text-sm font-medium">Menu</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>
    )
  }

  return (
    <aside {...sidebarAttributes} className="w-64 border-r border-border bg-card min-h-screen overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 font-heading">
            <BookOpen className="h-5 w-5 text-brand-green" />
            Program Menu
          </h2>
          <button
            {...getExplainerAttributes({
              type: "Sidebar toggle",
              title: "Collapse sidebar",
              summary: "This button hides the course menu to make more room for lesson content.",
              details: ["Collapsing the sidebar is useful when you want a wider reading area."],
              interaction: "Click it to collapse the sidebar into the floating menu button.",
            })}
            onClick={toggleCollapsed}
            className="p-1 rounded hover:bg-muted transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {displayName ? <p className="mb-4 text-sm text-muted-foreground">{displayName}</p> : null}

        <nav className="space-y-2">
          {courseStructure.modules.map((module) => {
            const isActiveModule = pathname?.includes(module.id)

            return (
              <div key={module.id}>
                {/* Module Header */}
                <button
                  {...getExplainerAttributes({
                    type: "Module navigation",
                    title: module.title,
                    summary: `This button opens ${module.title} and routes to its first available section.`,
                    details: [
                      `This module contains ${module.sections.length} section${module.sections.length === 1 ? "" : "s"}.`,
                      isActiveModule ? "This is the active module right now." : "This module is available as a navigation jump.",
                    ],
                    interaction: "Click it to move into this module and reveal its section list.",
                  })}
                  onClick={() => handleModuleClick(module.id, module.sections)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors font-heading text-left",
                    isActiveModule ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                >
                  <span className="text-left">{module.title}</span>
                  <ChevronDown className={cn("h-4 w-4 flex-shrink-0 transition-transform", isActiveModule && "rotate-180")} />
                </button>

                {/* Module Sections - Always show for active module */}
                {isActiveModule && (
                  <div className="ml-4 mt-2 space-y-1">
                    {module.sections.map((section, index) => {
                      // Don't show completion or active status until client-side hydration is complete
                      const completedSet = completedSectionIdsByModule.get(module.id)
                      const isCompleted = isClient && Boolean(completedSet?.has(section.id))
                      const defaultSectionId = module.sections[0]?.id
                      const isActive =
                        isClient &&
                        ((isActiveModule && activeSectionFromUrl === section.id) ||
                          (isActiveModule && !activeSectionFromUrl && section.id === defaultSectionId) ||
                          (currentModule === module.id && currentSection === section.id && !activeSectionFromUrl))

                      return (
                        <button
                          key={section.id}
                          {...getExplainerAttributes({
                            type: "Section navigation",
                            title: section.title,
                            summary: `This button opens the ${section.title} section inside ${module.title}.`,
                            details: [
                              isCompleted ? "This section is marked complete." : "This section is not yet complete.",
                              isActive ? "This is the section currently shown in the main lesson area." : "Use this to jump directly to the section.",
                            ],
                            interaction: "Click it to navigate directly to this lesson section.",
                          })}
                          onClick={() => handleSectionClick(module.id, section.id)}
                          className={cn(
                            "w-full flex items-center gap-2 p-2 rounded text-sm transition-colors text-left",
                            isActive && "bg-brand-green/10 text-brand-green font-medium",
                            !isActive && "hover:bg-muted",
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                          ) : isActive ? (
                            <Circle className="h-4 w-4 text-brand-orange fill-brand-orange flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className="text-pretty">{section.title}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
