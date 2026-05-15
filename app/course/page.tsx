/**
 * DASHBOARD PAGE
 * Beginner AI course dashboard
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Lightbulb, Brain, Zap, Lock, Workflow } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { getCourseStructure } from "@/lib/course-content"
import { createClient } from "@/lib/supabase"
import { cn } from "@/lib/utils"

const MODULE_VISUALS = {
  "module-0": { icon: Lightbulb, color: "brand-green" },
  "module-1": { icon: Brain, color: "brand-orange" },
  "module-2": { icon: Zap, color: "brand-green" },
  "module-3": { icon: Workflow, color: "brand-green" },
  "module-4": { icon: Lock, color: "brand-orange" },
} as const

export default function DashboardPage() {
  const router = useRouter()
  const progress = useProgress()
  const [mounted, setMounted] = useState(false)
  const [hasPaidAccess, setHasPaidAccess] = useState(false)
  const [accessResolved, setAccessResolved] = useState(false)
  const courseModules = getCourseStructure().modules

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    let isMounted = true

    const resolveAccess = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (!isMounted) return

        if (error || !user) {
          setHasPaidAccess(false)
          setAccessResolved(true)
          return
        }

        const response = await fetch("/api/auth/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })

        if (!isMounted) return

        if (!response.ok) {
          setHasPaidAccess(false)
          setAccessResolved(true)
          return
        }

        const result = await response.json()
        setHasPaidAccess(Boolean(result?.hasAccess))
        setAccessResolved(true)
      } catch {
        if (!isMounted) return
        setHasPaidAccess(false)
        setAccessResolved(true)
      }
    }

    void resolveAccess()

    return () => {
      isMounted = false
    }
  }, [])

  const getModuleProgress = (moduleId: string) => {
    const mod = progress.modules?.find((m) => m.id === moduleId)
    const completedCount = mod?.sections.filter((s) => s.completed).length
    const completed = typeof completedCount === "number" ? completedCount : 0
    const totalCount = mod?.sections.length
    const total = typeof totalCount === "number" && totalCount > 0 ? totalCount : 1
    return { completed, total }
  }

  const getStatus = (completed: number, total: number) =>
    completed === 0 ? "Not Started" : completed === total ? "Completed" : "In Progress"

  const allModuleProgress = courseModules.map((module) => getModuleProgress(module.id))
  const totalCompleted = allModuleProgress.reduce((sum, p) => sum + p.completed, 0)
  const totalSections = allModuleProgress.reduce((sum, p) => sum + p.total, 0)
  const completionRate = totalSections > 0 ? Math.round((totalCompleted / totalSections) * 100) : 0
  const dashboardExplainerAttributes = getExplainerAttributes({
    type: "Course dashboard",
    title: "AI strategy dashboard",
    summary: "Track your progress through practical AI execution modules covering adoption, governance, and measurable value.",
    details: [
      `You've completed ${completionRate}% of the course across ${courseModules.length} modules.`,
      "Start with any module or continue where you left off.",
    ],
    interaction: "Select a module to begin learning or continue your progress.",
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main {...dashboardExplainerAttributes} className="container mx-auto px-4 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-brand-green">Overview of AI</span> <span className="text-brand-orange">for Business</span> <span className="text-brand-indigo">Leaders</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Follow this course across AI foundations, practical workflows, adoption, and measurable value.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-orange">{mounted ? completionRate : 0}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {!mounted || completionRate === 0 ? "Start learning today" : completionRate === 100 ? "Course complete" : "Keep learning"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-green">
                {mounted ? allModuleProgress.filter((p) => p.completed === p.total).length : 0} / {courseModules.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">modules finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-brand-indigo">Course Modules</CardTitle>
              <CardDescription>Navigate the updated course modules and continue where you left off.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseModules.map((module) => {
                const { completed, total } = getModuleProgress(module.id)
                const status = getStatus(completed, total)
                const visual = MODULE_VISUALS[module.id as keyof typeof MODULE_VISUALS] ?? { icon: Workflow, color: "brand-indigo" }
                const Icon = visual.icon
                const isDemoModule = module.id === "module-0"
                const isLocked = accessResolved && !hasPaidAccess && !isDemoModule

                return (
                  <Card key={module.id} className="border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2 rounded-lg", `bg-${visual.color}/10`)}>
                            <Icon className={cn("h-5 w-5", `text-${visual.color}`)} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription>{module.description ?? "Practical AI implementation lessons for leadership teams."}</CardDescription>
                          </div>
                        </div>
                        <span className={cn(
                          "text-xs font-semibold px-3 py-1 rounded-full",
                          status === "Completed"   ? "bg-green-100 text-green-800" :
                          status === "In Progress" ? "bg-orange-100 text-orange-800" :
                                                     "bg-gray-100 text-gray-600"
                        )}>
                          {status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <ProgressBar current={mounted ? completed : 0} total={total} />
                          <p className="text-xs text-muted-foreground mt-1">{mounted ? completed : 0} / {total} sections</p>
                        </div>
                        <Button
                          size="sm"
                          variant={isLocked ? "outline" : status === "Not Started" ? "default" : "outline"}
                          className={cn(
                            isLocked
                              ? "border-brand-indigo/30 text-brand-indigo hover:bg-brand-indigo/5"
                              : status === "Not Started" && "bg-brand-orange hover:bg-brand-orange/90 text-white"
                          )}
                          onClick={() =>
                            router.push(isLocked ? "/register?paymentRequired=1" : `/course/${module.id}`)
                          }
                        >
                          {isLocked ? "Unlock" : status === "Not Started" ? "Start" : status === "Completed" ? "Review" : "Continue"}
                        </Button>
                      </div>
                      {isLocked ? (
                        <p className="mt-3 text-xs text-muted-foreground">
                          Module 0 is free. Unlock premium access to continue with Module 1 and beyond.
                        </p>
                      ) : null}
                    </CardContent>
                  </Card>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
