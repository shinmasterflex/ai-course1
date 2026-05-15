/**
 * PUBLIC HOMEPAGE
 * Landing page for the beginner AI course
 */

"use client"

import Link from "next/link"
import { PublicHeader } from "@/components/layout/public-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { getCourseStructure } from "@/lib/course-content"

export default function HomePage() {
  const modules = getCourseStructure().modules

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/20 via-sky-50 to-brand-orange/20 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-indigo">
                <Sparkles className="h-4 w-4 text-brand-orange" />
                Overview of AI for Business Leaders
              </div>
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                <span className="text-brand-indigo">Lead AI</span>{" "}
                <span className="brand-wordmark text-brand-orange">with Clarity</span>
              </h1>
              <p className="max-w-2xl text-xl text-muted-foreground md:text-2xl">
                Practical, beginner-friendly guidance for understanding and applying AI across tools, workflows, and measurable outcomes.
              </p>
              <div className="inline-flex items-center rounded-full border border-brand-orange/40 bg-white/90 px-4 py-2 text-sm font-semibold text-brand-indigo">
                Module 0 is free. Start now and unlock Modules 1-4 anytime.
              </div>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Button asChild size="lg" className="text-lg px-10 bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course/module-0">Start Free Module 0</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-10">
                  <Link href="/register?paymentRequired=1">Unlock Full Course</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> 5 Core Modules</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Decision Frameworks</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Beginner Friendly</span>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden border-brand-green/25 bg-white/85 shadow-xl backdrop-blur">
                <CardContent className="space-y-5 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold text-brand-indigo">What You'll Learn</h3>
                  <p className="text-muted-foreground">
                    Build decision-ready AI capability with structured modules and practical implementation guidance.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Navigate the AI landscape with operational clarity</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Optimize prompts, workflows, and your AI stack</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Evaluate partners and reduce deployment risk</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Build adoption roadmaps and governance controls</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Measure ROI and strategic business value</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="overflow-hidden border-brand-indigo/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">Beginner Friendly</CardTitle>
                <CardDescription>Built for anyone who wants practical AI skills, from first-time learners to experienced practitioners.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Move from AI basics to confident application with frameworks you can use right away.
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-brand-green/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">Decision Frameworks</CardTitle>
                <CardDescription>Use structured scorecards, checkpoints, and implementation patterns.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Reduce guesswork when evaluating tools, partners, and rollout plans.
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-brand-orange/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">Outcome Focused</CardTitle>
                <CardDescription>Designed around adoption, governance, and measurable business value.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Track progress through high-impact modules and knowledge checks.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-brand-indigo">Course Structure</h2>
              <p className="text-xl text-muted-foreground">
                Five modules for strategic AI execution across assessment, adoption, and value realization.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {modules.map((module) => {
                const moduleNum = module.id.replace("module-", "")
                const moduleLabel = module.title.includes(":") ? module.title.split(":").slice(1).join(":").trim() : module.title
                
                return (
                  <Card key={module.id} className="group overflow-hidden border-brand-green/20 hover:border-brand-orange/40 hover:shadow-md transition-all">
                    <CardHeader className="space-y-2">
                      <div className="text-sm font-semibold text-brand-orange">Module {moduleNum}</div>
                      <CardTitle className="text-lg leading-snug text-brand-indigo">{moduleLabel}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.sections.length} lessons
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-r from-brand-green/10 via-white to-brand-orange/10 p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-indigo">Ready to Execute?</h3>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Start the course and build practical AI confidence you can apply in real work.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course" className="inline-flex items-center gap-2">
                    Start Overview of AI for Business Leaders
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

