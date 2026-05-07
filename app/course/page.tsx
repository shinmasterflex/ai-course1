/**
 * DASHBOARD PAGE
 * AI Adoption Beginner's Course dashboard showing progress and module overview
 */

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Target, TrendingUp, Award, LineChart, Compass, BriefcaseBusiness, Layers, Handshake, Calculator, Shield, Map, Bot, Network, Telescope } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { cn } from "@/lib/utils"

const MODULE_META = [
  { id: "module-0", icon: Compass,          color: "brand-green",  label: "The AI Shift",                         description: "Separate hype from reality and define your leadership posture." },
  { id: "module-1", icon: Layers,           color: "brand-orange", label: "AI Landscape",                        description: "Models, tools, agencies, and delivery models mapped for decisions." },
  { id: "module-2", icon: LineChart,        color: "brand-green",  label: "Business Value",                       description: "Find high-ROI use cases and prioritize opportunities with confidence." },
  { id: "module-3", icon: BriefcaseBusiness,color: "brand-orange", label: "Tools That Matter",                   description: "Evaluate tool categories, integration fit, pricing, and security." },
  { id: "module-4", icon: Handshake,        color: "brand-green",  label: "Agency and Partner Selection",        description: "Run vendor diligence and structure pilots that produce real evidence." },
  { id: "module-5", icon: Calculator,       color: "brand-green",  label: "ROI Frameworks",                      description: "Build credible ROI models, prioritization matrices, and reporting." },
  { id: "module-6", icon: Shield,           color: "brand-orange", label: "Risk and Governance",                 description: "Implement guardrails for data, reliability, compliance, and vendors." },
  { id: "module-7", icon: Map,              color: "brand-orange", label: "Adoption Roadmap",                    description: "Translate strategy into pilots, change management, and phased rollout." },
  { id: "module-8", icon: Bot,              color: "brand-green",  label: "Agents and Automation Systems",       description: "Design practical automation with human oversight and operational control." },
  { id: "module-9", icon: Network,          color: "brand-green",  label: "AI Stack Design",                     description: "Avoid tool sprawl and build a maintainable, owned AI ecosystem." },
  { id: "module-10", icon: Telescope,       color: "brand-orange", label: "Future Positioning",                  description: "Anticipate industry shifts and position for durable AI advantage." },
]

export default function DashboardPage() {
  const router = useRouter()
  const progress = useProgress()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

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

  const allModuleProgress = MODULE_META.map(({ id }) => getModuleProgress(id))
  const totalCompleted = allModuleProgress.reduce((sum, p) => sum + p.completed, 0)
  const totalSections = allModuleProgress.reduce((sum, p) => sum + p.total, 0)
  const completionRate = totalSections > 0 ? Math.round((totalCompleted / totalSections) * 100) : 0
  const dashboardExplainerAttributes = getExplainerAttributes({
    type: "Course dashboard",
    title: "AI Adoption Beginner's Course overview",
    summary: "This page summarizes strategic progress across the full AI adoption curriculum and provides direct access to each module.",
    details: [
      `Overall completion is ${completionRate}% across ${MODULE_META.length} modules.`,
      "Use the roadmap and module cards to choose your next strategic focus area or revisit completed frameworks.",
    ],
    interaction: "Review progress and enter the next module where your organization needs immediate decisions.",
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main {...dashboardExplainerAttributes} className="container mx-auto px-4 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to{" "}
            <span className="text-brand-orange">AI Strategy</span>{" "}
            <span className="text-brand-green">for Leaders</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your field guide for AI adoption, vendor decisions, ROI planning, and implementation execution.
          </p>
        </div>

        <Card className="mb-8 overflow-hidden border-brand-indigo/20 bg-white/90">
          <CardContent className="p-0">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="space-y-4 p-6 md:p-8">
                <div className="inline-flex items-center rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
                  Strategic Progress Center
                </div>
                <h2 className="text-2xl font-semibold text-brand-indigo md:text-3xl">Track implementation readiness at a glance</h2>
                <p className="text-muted-foreground">
                  Monitor your progress through landscape analysis, tool selection, vendor diligence, governance, and rollout planning.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold text-brand-indigo md:text-sm">
                  <div className="rounded-lg border border-brand-green/30 bg-brand-green/10 p-2">Prioritization</div>
                  <div className="rounded-lg border border-brand-indigo/20 bg-brand-indigo/10 p-2">Execution</div>
                  <div className="rounded-lg border border-brand-orange/30 bg-brand-orange/10 p-2">Governance</div>
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
            <CardDescription>Track where you are across all modules in your AI adoption and implementation journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src="/graphics/module-path.svg"
              alt="Visual roadmap connecting course modules"
              width={960}
              height={340}
              className="h-auto w-full rounded-xl border border-brand-indigo/10 bg-white"
            />
          </CardContent>
        </Card>

        {/* Modules */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-brand-indigo">All Modules</CardTitle>
              <CardDescription>Follow the full course sequence from market context to practical adoption planning, with checkpoints in every module.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {MODULE_META.map((meta, modIndex) => {
                const { completed, total } = getModuleProgress(meta.id)
                const status = getStatus(completed, total)
                const Icon = meta.icon

                return (
                  <Card key={meta.id} className="border hover:shadow-md transition-shadow">
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
                          onClick={() => router.push(`/course/${meta.id}`)}
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
        </div>
      </main>
    </div>
  )
}
