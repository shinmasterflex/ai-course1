/**
 * MODULE 5: CODING FUNDAMENTALS
 */

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { QuickCheckCard } from "@/components/learning/lesson-interactions"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { ProgressBar } from "@/components/learning/progress-bar"
import { TextDisplay } from "@/components/learning/text-display"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { moduleQuizData } from "@/lib/module-quiz-data"
import { Binary, Bug, CheckCircle2, Code2, FunctionSquare, GitBranch } from "lucide-react"

export default function Module5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-5"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3"])
  const questions = moduleQuizData[MODULE_ID]

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) {
        setCurrentSectionIndex(idx)
      }
    }
  }, [currentSectionIndex, sectionParam, sections])

  useEffect(() => {
    if (allQuizComplete && currentSectionIndex === totalSections - 1) {
      const last = sections[totalSections - 1]
      if (last) {
        markSectionComplete(MODULE_ID, last.id)
        setCurrentPosition(MODULE_ID, last.id)
      }
    }
  }, [allQuizComplete, currentSectionIndex, markSectionComplete, sections, setCurrentPosition, totalSections])

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [5],
  })

  const handleSectionComplete = () => {
    if (!canAdvance && currentSectionIndex === 5) {
      return
    }

    const current = sections[currentSectionIndex]
    if (current) {
      markSectionComplete(MODULE_ID, current.id)
      setCurrentPosition(MODULE_ID, current.id)
    }

    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-5?section=${next.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 5: Coding Fundamentals</h1>
            <p className="text-lg text-muted-foreground mb-4">Build the core mental models of code before writing advanced software.</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 5"
              title="Learn to think like a programmer"
              description="Master the key coding concepts used in every language: variables, control flow, functions, and debugging."
              imageSrc="/images/modules/module-5.jpg"
              imageAlt="Coding fundamentals and programming logic"
            />
          )}

          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="Coding is structured problem-solving. You give a computer clear instructions and break complex tasks into small, predictable steps." />
              <Card className="p-5 space-y-2">
                {[
                  "How programmers break down problems",
                  "Variables, data types, and why they matter",
                  "Conditionals and loops for decision-making and repetition",
                  "Functions to organize reusable logic",
                  "Debugging techniques to find and fix mistakes",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Start Module
              </Button>
            </div>
          )}

          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Think Like a Programmer</h2>
              <TextDisplay content="A programmer takes a fuzzy goal and turns it into a precise sequence of steps. The main skill is decomposition: break one big problem into smaller solvable parts." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Code2 className="h-4 w-4" />A repeatable coding workflow</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Define the input and expected output.</li>
                  <li>2. Split the task into small operations.</li>
                  <li>3. Implement one step at a time.</li>
                  <li>4. Test each step with realistic examples.</li>
                  <li>5. Refactor once it works.</li>
                </ul>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Variables and Data</h2>
              <TextDisplay content="Variables are labels for values. Data types define what operations are valid for those values." />
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><Binary className="h-4 w-4 text-brand-orange" />Common data types</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Numbers: counts, measurements, prices</li>
                    <li>Strings: names, messages, labels</li>
                    <li>Booleans: true or false state</li>
                    <li>Arrays/lists: ordered collections</li>
                    <li>Objects/maps: keyed information</li>
                  </ul>
                </Card>
                <Card className="p-5">
                  <h3 className="font-semibold mb-2 text-brand-green">Why this matters</h3>
                  <p className="text-sm text-muted-foreground">Type mistakes are one of the most common coding bugs. Strong naming and predictable data shapes make code easier to test and maintain.</p>
                </Card>
              </div>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Control Flow</h2>
              <TextDisplay content="Control flow decides what code runs and when. Conditionals handle branching and loops handle repetition." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-brand-green"><GitBranch className="h-4 w-4" />Two building blocks</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Conditionals:</span> use if/else to choose paths based on rules.</p>
                  <p><span className="font-medium text-foreground">Loops:</span> use for/while to process repeated items consistently.</p>
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Functions and Reuse</h2>
              <TextDisplay content="Functions package logic so you can reuse it safely. Good functions are small, focused, and clearly named." />
              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><FunctionSquare className="h-4 w-4" />A practical checklist</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Use one responsibility per function.</li>
                  <li>Pass clear inputs (parameters).</li>
                  <li>Return one predictable output shape.</li>
                  <li>Avoid hidden side effects when possible.</li>
                </ul>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Debugging Fundamentals</h2>
              <TextDisplay content="Debugging is the skill of locating where reality diverges from your expectation. Great developers debug methodically, not by random guessing." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Bug className="h-4 w-4 text-brand-orange" />Debug in this order</h3>
                <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Reproduce the issue consistently.</li>
                  <li>Check inputs and assumptions.</li>
                  <li>Narrow the failing section.</li>
                  <li>Inspect logs and intermediate values.</li>
                  <li>Write a test for the fix.</li>
                </ol>
              </Card>
              <QuickCheckCard
                prompt="What is the strongest first step when a bug appears in production?"
                options={[
                  { id: "a", label: "Immediately rewrite the whole function" },
                  { id: "b", label: "Reproduce the bug reliably, then isolate where the behavior diverges" },
                  { id: "c", label: "Ignore logs and rely only on intuition" },
                  { id: "d", label: "Add random delays and hope the issue disappears" },
                ]}
                correctOptionId="b"
                explanation="Correct. Reproducibility and isolation are the foundation of effective debugging."
                onAnswered={() => markSectionInteractionComplete(5)}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              {!canAdvance && <p className="text-sm text-muted-foreground">Complete the debugging checkpoint to unlock the module quiz.</p>}
              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Answer all three questions to complete Coding Fundamentals." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Great work. You now have the coding building blocks needed for the rest of the course." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white" onClick={() => router.push("/course/module-6")}>
                      Continue to Module 6
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push("/course")}>Dashboard</Button>
                  </div>
                </div>
              )}
              {!allQuizComplete && (
                <p className="text-sm text-muted-foreground">Answer all three questions above to complete this module.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
