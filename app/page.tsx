/**
 * PUBLIC HOMEPAGE
 * Landing page for the AI Adoption Beginner's Course
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
                Beginner's AI Course
              </div>
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                <span className="text-brand-indigo">Learn AI</span>{" "}
                <span className="brand-wordmark text-brand-orange">the Right Way</span>
              </h1>
              <p className="max-w-2xl text-xl text-muted-foreground md:text-2xl">
                Understand artificial intelligence from the ground up. Perfect for beginners who want to learn what AI is, how it works, and how to use it responsibly.
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Button asChild size="lg" className="text-lg px-10 bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course">Start Learning</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> 5 Core Modules</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Hands-on Learning</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Learn at Your Pace</span>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden border-brand-green/25 bg-white/85 shadow-xl backdrop-blur">
                <CardContent className="space-y-5 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold text-brand-indigo">What You'll Learn</h3>
                  <p className="text-muted-foreground">
                    Master the fundamentals of AI with clear explanations and practical examples.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">What is AI and how does it work?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Different types of AI models and tools</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Real-world AI use cases</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">How to use AI tools effectively</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">AI safety and responsible use</span>
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
                <CardDescription>No prior AI knowledge needed. We explain everything from the ground up.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Start with the fundamentals and build your understanding step by step.
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-brand-green/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">Learn by Doing</CardTitle>
                <CardDescription>Practical lessons with real-world examples and hands-on exercises.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Get practical skills you can use right away in your work and life.
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-brand-orange/20 bg-white/90">
              <CardHeader>
                <CardTitle className="text-brand-indigo">Your Pace</CardTitle>
                <CardDescription>Learn whenever and wherever you want. Complete modules at your own speed.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No deadlines or time pressure. Learn at a pace that works for you.
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
                Five beginner-friendly modules that build your AI knowledge from the ground up.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {modules.map((module) => {
                const moduleNum = module.id.replace("module-", "");
                const titles = ["What is AI?", "AI Tools and Models", "AI Use Cases", "Getting Started", "Safety & Ethics"];
                const title = titles[parseInt(moduleNum)] || module.title;
                
                return (
                  <Card key={module.id} className="group overflow-hidden border-brand-green/20 hover:border-brand-orange/40 hover:shadow-md transition-all">
                    <CardHeader className="space-y-2">
                      <div className="text-sm font-semibold text-brand-orange">Module {moduleNum}</div>
                      <CardTitle className="text-lg leading-snug text-brand-indigo">{title}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.sections.length} lessons
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-r from-brand-green/10 via-white to-brand-orange/10 p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-indigo">Ready to Learn?</h3>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Start learning AI fundamentals today. Work through the modules at your own pace and master the basics.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course" className="inline-flex items-center gap-2">
                    Start Course
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

