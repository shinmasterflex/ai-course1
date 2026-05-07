/**
 * PUBLIC HOMEPAGE
 * Landing page for the AI Adoption Beginner's Course
 */

"use client"

import Link from "next/link"
import Image from "next/image"
import { PublicHeader } from "@/components/layout/public-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, CircuitBoard, Sparkles } from "lucide-react"
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
                AI Adoption Beginner's Course
              </div>
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                <span className="text-brand-indigo">Lead AI Adoption with</span>{" "}
                <span className="brand-wordmark text-brand-orange">Cognijin</span>
              </h1>
              <p className="max-w-2xl text-xl text-muted-foreground md:text-2xl">
                A practical field guide for beginners and business teams who need to evaluate vendors, prioritize use cases, measure ROI, and execute AI adoption with confidence.
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Button asChild size="lg" className="text-lg px-10 bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course">Start AI Adoption Beginner's Course</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-10 border-brand-green/30">
                  <Link href="/demo">Preview Sample Module</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> {modules.length} Modules</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> ROI and Vendor Frameworks</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Guided Checkpoints and Decision Tools</span>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden border-brand-green/25 bg-white/85 shadow-xl backdrop-blur">
                <CardContent className="space-y-5 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold text-brand-indigo">Course Snapshot</h3>
                  <p className="text-muted-foreground">
                    Structured modules, practical examples, guided checkpoints, and implementation scorecards designed for real business decisions.
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
                    <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 p-3 text-brand-indigo">ROI</div>
                    <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3 text-brand-indigo">Vendors</div>
                    <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 p-3 text-brand-indigo">Execution</div>
                  </div>
                </CardContent>
              </Card>

              <div className="pointer-events-none absolute -left-6 -top-6 hidden rounded-xl border border-brand-green/30 bg-white/95 px-4 py-3 text-sm shadow-lg md:block">
                <div className="font-semibold text-brand-indigo">10 Modules</div>
                <div className="text-xs text-muted-foreground">From market shift to practical adoption planning</div>
              </div>

              <div className="pointer-events-none absolute -bottom-5 -right-4 hidden rounded-xl border border-brand-orange/30 bg-white/95 px-4 py-3 text-sm shadow-lg md:block">
                <div className="font-semibold text-brand-indigo">Guided Learning Tools</div>
                <div className="text-xs text-muted-foreground">Decision tools, practice prompts, and scorecards</div>
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
                <CardTitle className="text-brand-indigo">Vendor and Tool Clarity</CardTitle>
                <CardDescription>Make better platform and partner decisions with structured evaluation frameworks and realistic examples.</CardDescription>
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
                <CardTitle className="text-brand-indigo">Implementation Momentum</CardTitle>
                <CardDescription>Track practical milestones, pilot outcomes, learning progress, and organizational readiness.</CardDescription>
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
                <CardTitle className="text-brand-indigo">Adoption Roadmap</CardTitle>
                <CardDescription>Sequence opportunities, governance, and stack decisions with hands-on planning tools.</CardDescription>
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
              <h2 className="text-4xl font-bold text-brand-indigo">Beginner Curriculum Overview</h2>
              <p className="text-xl text-muted-foreground">
                Follow a practical path built for beginners and business teams. Move from market context to procurement, ROI, governance, implementation, and long-term advantage.
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
                      <span className="rounded-full bg-brand-indigo/10 px-3 py-1 text-brand-indigo">Module {index}</span>
                      <span className="text-brand-indigo/70 normal-case tracking-normal">{module.sections.length} sections</span>
                    </div>
                    <CardTitle className="text-xl leading-snug text-brand-indigo">{module.title}</CardTitle>
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-r from-brand-green/10 via-white to-brand-orange/10 p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-indigo">Build Your AI Adoption Plan</h3>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Start with Module 0 and work through the full field guide. By the end, you will have a realistic roadmap, vendor shortlist criteria, and ROI measurement plan.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course" className="inline-flex items-center gap-2">
                    Enter the Program
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

