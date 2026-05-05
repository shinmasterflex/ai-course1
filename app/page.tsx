/**
 * PUBLIC HOMEPAGE
 * Landing page for the Introduction to AI course
 */

"use client"

import Link from "next/link"
import Image from "next/image"
import { PublicHeader } from "@/components/layout/public-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, CircuitBoard, Sparkles } from "lucide-react"
import { getCourseStructure } from "@/lib/course-structure"

function modulePhase(index: number): string {
  if (index <= 2) return "Foundations"
  if (index <= 5) return "Practice"
  return "Advanced"
}

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
                AI Learning System, Zero to Confident
              </div>
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                <span className="text-brand-indigo">Learn AI with</span>{" "}
                <span className="brand-wordmark bg-gradient-to-r from-brand-indigo via-brand-orange to-brand-green bg-clip-text text-transparent">Cognijin</span>
              </h1>
              <p className="max-w-2xl text-xl text-muted-foreground md:text-2xl">
                Explore a complete AI path across 10 modules, from fundamentals and prompting to agents, ethics, and future trends.
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Button asChild size="lg" className="text-lg px-10 bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course">Start Learning</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-10 border-brand-green/30">
                  <Link href="/demo">Preview Module 0</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> {modules.length} Modules</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Hands-on Activities</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Beginner Friendly</span>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden border-brand-green/25 bg-white/85 shadow-xl backdrop-blur">
                <CardContent className="space-y-5 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold text-brand-indigo">Curriculum Snapshot</h3>
                  <p className="text-muted-foreground">
                    Structured modules, interactive checkpoints, and practical guidance so learners can apply AI confidently.
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-brand-indigo/15 bg-white">
                    <Image
                      src="/images/landing/hero-ai.jpg"
                      alt="Person working with AI generated visuals on multiple screens"
                      width={960}
                      height={680}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm font-semibold">
                    <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 p-3 text-brand-indigo">Prompting</div>
                    <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3 text-brand-indigo">Tools</div>
                    <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 p-3 text-brand-indigo">Agents</div>
                  </div>
                </CardContent>
              </Card>

              <div className="pointer-events-none absolute -left-6 -top-6 hidden rounded-xl border border-brand-green/30 bg-white/95 px-4 py-3 text-sm shadow-lg md:block">
                <div className="font-semibold text-brand-indigo">10 Modules</div>
                <div className="text-xs text-muted-foreground">From basics to strategy</div>
              </div>

              <div className="pointer-events-none absolute -bottom-5 -right-4 hidden rounded-xl border border-brand-orange/30 bg-white/95 px-4 py-3 text-sm shadow-lg md:block">
                <div className="font-semibold text-brand-indigo">Hands-On Practice</div>
                <div className="text-xs text-muted-foreground">Lessons plus checkpoints</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="overflow-hidden border-brand-indigo/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">How Concepts Connect</CardTitle>
                <CardDescription>Visual links between data, models, reasoning, and agent workflows.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/landing/concepts-robot.jpg"
                  alt="Humanoid robot in a modern technology lab"
                  width={960}
                  height={680}
                  className="h-auto w-full rounded-xl border border-brand-indigo/10 object-cover"
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-brand-green/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">Progress At A Glance</CardTitle>
                <CardDescription>Track momentum with clear visual progress states.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/landing/progress-dashboard.jpg"
                  alt="Data dashboard and analytics reports on a desk"
                  width={820}
                  height={520}
                  className="h-auto w-full rounded-xl border border-brand-green/10 object-cover"
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-brand-orange/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">Roadmap Journey</CardTitle>
                <CardDescription>A path view that shows where each module fits in the arc.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/landing/roadmap-team.jpg"
                  alt="Team collaborating with laptops during a learning workshop"
                  width={960}
                  height={340}
                  className="h-auto w-full rounded-xl border border-brand-orange/10 object-cover"
                />
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
              <h2 className="text-4xl font-bold text-brand-indigo">Overview of All Modules</h2>
              <p className="text-xl text-muted-foreground">
                Follow a guided journey through every part of modern AI. Start with core concepts and finish with agents, strategy, and the future of AI.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module, index) => (
                <Card key={module.id} className="group overflow-hidden border-2 border-brand-green/20 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-xl">
                  <CardHeader className="space-y-3">
                    <div className="rounded-lg border border-brand-green/20 bg-gradient-to-r from-brand-green/10 to-brand-orange/10 p-4">
                      <div className="flex items-center justify-between text-xs font-semibold text-brand-indigo/80">
                        <span>{module.id.replace("module-", "Module ")}</span>
                        <span>{module.sections.length} sections</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                      <span className="rounded-full bg-brand-indigo/10 px-3 py-1 text-brand-indigo">{modulePhase(index)}</span>
                    </div>
                    <CardTitle className="text-xl leading-snug text-brand-indigo">{module.title}</CardTitle>
                    <CardDescription className="text-base">
                      Build practical understanding through concise lessons, examples, and interactive checks.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-r from-brand-green/10 via-white to-brand-orange/10 p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-indigo">Start Your AI Journey Today</h3>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Start with Module 0 and continue through the full learning path. The platform tracks your progress across every module.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course" className="inline-flex items-center gap-2">
                    Open Course
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-brand-green/30">
                  <Link href="/course" className="inline-flex items-center gap-2">
                    View Course Dashboard
                    <CircuitBoard className="h-4 w-4" />
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
