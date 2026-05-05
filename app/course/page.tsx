/**
 * DASHBOARD PAGE
 * AI course main dashboard showing progress and module overview
 */

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Target, TrendingUp, Award, Brain, Cpu, MessageSquare, Zap, Shield, Wrench, BookOpen, Briefcase, Bot, Rocket } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { cn } from "@/lib/utils"

const MODULE_META = [
  { id: "module-0", icon: BookOpen,     color: "brand-green",  label: "Welcome to AI",                description: "Get oriented and understand the road ahead." },
  { id: "module-1", icon: Cpu,          color: "brand-orange", label: "What Is AI?",                  description: "A grounded definition, history, and types of AI." },
  { id: "module-2", icon: Brain,        color: "brand-green",  label: "How Machines Learn",           description: "Training data, neural networks, and AI limits." },
  { id: "module-3", icon: MessageSquare,color: "brand-orange", label: "LLMs & Prompting",             description: "How ChatGPT works and how to prompt effectively." },
  { id: "module-4", icon: Zap,          color: "brand-green",  label: "AI Tools for Everyday Life",  description: "Writing, images, productivity ? a guided tour." },
  { id: "module-5", icon: Shield,       color: "brand-orange", label: "AI Ethics, Safety & Society",  description: "Bias, privacy, deepfakes, and responsible use." },
  { id: "module-6", icon: Wrench,       color: "brand-green",  label: "Your AI Toolkit",              description: "No-code tools, workflows, and your first project." },
  { id: "module-7", icon: Briefcase,    color: "brand-orange", label: "AI for Business & Work",       description: "Workplace applications, industries, and career strategy." },
  { id: "module-8", icon: Bot,          color: "brand-green",  label: "AI Agents",                    description: "How autonomous AI agents work and what they can do." },
  { id: "module-9", icon: Rocket,       color: "brand-orange", label: "The Future of AI",             description: "AGI, governance, careers, and what comes next." },
]

const PHASES = [
  { label: "Phase 1: Understanding AI",       color: "brand-green",  moduleIds: ["module-0", "module-1", "module-2"] },
  { label: "Phase 2: Using AI",               color: "brand-orange", moduleIds: ["module-3", "module-4"] },
  { label: "Phase 3: AI in the World",        color: "brand-green",  moduleIds: ["module-5", "module-6"] },
  { label: "Phase 4: Thinking Critically & Building", color: "brand-orange", moduleIds: ["module-7", "module-8", "module-9"] },
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
            Your beginner-friendly journey from zero to AI-confident, one module at a time.
          </p>
        </div>

        <Card className="mb-8 overflow-hidden border-brand-indigo/20 bg-white/90">
          <CardContent className="p-0">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="space-y-4 p-6 md:p-8">
                <div className="inline-flex items-center rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
                  Visual Progress Center
                </div>
                <h2 className="text-2xl font-semibold text-brand-indigo md:text-3xl">See your learning momentum instantly</h2>
                <p className="text-muted-foreground">
                  Your dashboard now includes visual progress graphics to make milestones, pacing, and completion trends easier to scan.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold text-brand-indigo md:text-sm">
                  <div className="rounded-lg border border-brand-green/30 bg-brand-green/10 p-2">Completion</div>
                  <div className="rounded-lg border border-brand-indigo/20 bg-brand-indigo/10 p-2">Consistency</div>
                  <div className="rounded-lg border border-brand-orange/30 bg-brand-orange/10 p-2">Retention</div>
                </div>
              </div>
              <div className="border-t border-brand-indigo/10 bg-sky-50/70 p-4 lg:border-l lg:border-t-0">
                <Image
                  src="/graphics/progress-rings.svg"
                  alt="Illustrated circular progress metrics"
                  width={820}
                  height={520}
                  className="h-auto w-full rounded-xl border border-brand-indigo/10"
                  priority
                />
              </div>
            </div>
          </CardContent>
        </Card>

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

        <Card className="mb-8 overflow-hidden border-brand-orange/20 bg-gradient-to-r from-brand-green/10 via-white to-brand-orange/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-brand-indigo">Your Module Roadmap</CardTitle>
            <CardDescription>Track where you are in the complete learning arc from foundations to advanced application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src="/graphics/module-path.svg"
              alt="Visual roadmap connecting module phases"
              width={960}
              height={340}
              className="h-auto w-full rounded-xl border border-brand-indigo/10 bg-white"
            />
          </CardContent>
        </Card>

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
