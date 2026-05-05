/**
 * DASHBOARD PAGE
 * AI course main dashboard showing progress and module overview
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Target, TrendingUp, Award, Brain, Cpu, MessageSquare, Zap, Shield, Wrench, BookOpen } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { cn } from "@/lib/utils"

const MODULE_META = [
  { id: "module-0", icon: BookOpen,     color: "brand-green", label: "Welcome to AI",                    description: "Get oriented and understand the road ahead." },
  { id: "module-1", icon: Cpu,          color: "brand-orange", label: "What Is AI?",                      description: "A grounded definition, history, and types of AI." },
  { id: "module-2", icon: Brain,        color: "brand-green", label: "How Machines Learn",                description: "Training data, neural networks, and AI limits." },
  { id: "module-3", icon: MessageSquare,color: "brand-orange", label: "LLMs & Prompting",                 description: "How ChatGPT works and how to prompt effectively." },
  { id: "module-4", icon: Zap,          color: "brand-green", label: "AI Tools for Everyday Life",       description: "Writing, images, productivity — a guided tour." },
  { id: "module-5", icon: Shield,       color: "brand-orange", label: "AI Ethics, Safety & Society",     description: "Bias, privacy, deepfakes, and responsible use." },
  { id: "module-6", icon: Wrench,       color: "brand-green", label: "Your AI Toolkit",                  description: "No-code tools, workflows, and your first project." },
]

const PHASES = [
  { label: "Phase 1: Understanding AI",          color: "brand-green",  moduleIds: ["module-0", "module-1", "module-2"] },
  { label: "Phase 2: Using AI",                  color: "brand-orange", moduleIds: ["module-3", "module-4"] },
  { label: "Phase 3: Thinking Critically & Building", color: "brand-green", moduleIds: ["module-5", "module-6"] },
]

export default function DashboardPage() {
  const router = useRouter()
  const progress = useProgress()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const getModuleProgress = (moduleId: string) => {
    const mod = progress.modules?.find((m) => m.id === moduleId)
    const completed = mod?.sections.filter((s) => s.completed).length || 0
    const total = mod?.sections.length || 1
    return { completed, total }
  }

  const getStatus = (completed: number, total: number) =>
    completed === 0 ? "Not Started" : completed === total ? "Completed" : "In Progress"

  const allModuleProgress = MODULE_META.map(({ id }) => getModuleProgress(id))
  const totalCompleted = allModuleProgress.reduce((sum, p) => sum + p.completed, 0)
  const totalSections = allModuleProgress.reduce((sum, p) => sum + p.total, 0)
  const completionRate = totalSections > 0 ? Math.round((totalCompleted / totalSections) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to{" "}
            <span className="text-brand-orange">Introduction</span>{" "}
            <span className="text-brand-green">to AI</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your beginner-friendly journey from zero to AI-confident — one module at a time.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mounted ? completionRate : 0}%</div>
              <p className="text-xs text-muted-foreground">
                {!mounted || completionRate === 0 ? "Start your first module" : completionRate === 100 ? "Course complete!" : "Keep going!"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sections Done</CardTitle>
              <Target className="h-4 w-4 text-brand-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mounted ? totalCompleted : 0} / {totalSections}</div>
              <p className="text-xs text-muted-foreground">sections completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Modules Complete</CardTitle>
              <Award className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mounted ? allModuleProgress.filter((p) => p.completed === p.total).length : 0} / {MODULE_META.length}
              </div>
              <p className="text-xs text-muted-foreground">modules finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Phases & Modules */}
        <div className="space-y-8">
          {PHASES.map((phase) => (
            <Card key={phase.label}>
              <CardHeader>
                <CardTitle className={cn("text-xl", `text-${phase.color}`)}>{phase.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {phase.moduleIds.map((moduleId, idx) => {
                  const meta = MODULE_META.find((m) => m.id === moduleId)!
                  const { completed, total } = getModuleProgress(moduleId)
                  const status = getStatus(completed, total)
                  const Icon = meta.icon
                  const modIndex = MODULE_META.findIndex((m) => m.id === moduleId)

                  return (
                    <Card key={moduleId} className="border hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", `bg-${meta.color}/10`)}>
                              <Icon className={cn("h-5 w-5", `text-${meta.color}`)} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Module {modIndex}: {meta.label}</CardTitle>
                              <CardDescription>{meta.description}</CardDescription>
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
                            variant={status === "Not Started" ? "default" : "outline"}
                            className={cn(status === "Not Started" && "bg-brand-orange hover:bg-brand-orange/90 text-white")}
                            onClick={() => router.push(`/course/${moduleId}`)}
                          >
                            {status === "Not Started" ? "Start" : status === "Completed" ? "Review" : "Continue"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
