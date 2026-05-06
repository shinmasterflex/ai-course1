"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { TextDisplay } from "@/components/learning/text-display"
import { QuickCheckCard } from "@/components/learning/lesson-interactions"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { moduleQuizData } from "@/lib/module-quiz-data"

type ExecutiveModulePageProps = {
  moduleId: string
}

export function ExecutiveModulePage({ moduleId }: ExecutiveModulePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((item) => item.id === moduleId)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const currentSection = sections[currentSectionIndex]
  const completedSectionIds = getCompletedSections(moduleId)

  const questions = moduleQuizData[moduleId] ?? []
  const quizKeys = useMemo(() => questions.map((question) => question.key), [questions])
  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz<string>(moduleId, quizKeys)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((section) => section.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) {
        setCurrentSectionIndex(idx)
      }
    }
  }, [currentSectionIndex, sectionParam, sections])

  const goToSection = (index: number) => {
    const target = sections[index]
    if (!target) return

    setCurrentSectionIndex(index)
    setCurrentPosition(moduleId, target.id)
    router.push(`/course/${moduleId}?section=${target.id}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSectionComplete = () => {
    if (!currentSection) return

    markSectionComplete(moduleId, currentSection.id)
    setCurrentPosition(moduleId, currentSection.id)

    if (currentSectionIndex < totalSections - 1) {
      goToSection(currentSectionIndex + 1)
    }
  }

  const explainerAttributes = getExplainerAttributes({
    type: "Executive learning workspace",
    title: module?.title ?? "Executive AI module",
    summary: currentSection
      ? `You are viewing ${currentSection.title}, section ${currentSectionIndex + 1} of ${totalSections}.`
      : "Work through each section to build your implementation-ready AI strategy.",
    details: [
      `Completed sections: ${completedSectionIds.length} of ${totalSections}.`,
      "Each section focuses on practical business decisions, not technical theory.",
    ],
    interaction: "Review the section, apply the checklist, complete the checkpoint, then continue.",
  })

  if (!module) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <p>Module not found.</p>
        </main>
      </div>
    )
  }

  const completionReady = completedSectionIds.length === totalSections

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main {...explainerAttributes} className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{module.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{module.description ?? "Executive decision frameworks for AI adoption."}</p>
            <ProgressBar current={completedSectionIds.length} total={Math.max(totalSections, 1)} label="Module Progress" />
          </div>

          {currentSection ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">{currentSection.title}</h2>
              <TextDisplay
                variant="callout"
                content={currentSection.summary ?? "Use this section to sharpen your decision quality and implementation discipline."}
              />

              <Card className="p-5 border-brand-indigo/20 bg-white/90">
                <h3 className="text-lg font-semibold mb-3 text-brand-indigo">Executive scenario</h3>
                <p className="text-sm text-muted-foreground">
                  Your leadership team must make a decision related to this topic in the next quarter. Use this section to define options,
                  quantify trade-offs, and identify the minimum-risk next step.
                </p>
              </Card>

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="text-lg font-semibold mb-3 text-brand-orange">Implementation checklist</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Clarify the business objective and success metric before selecting tools.</li>
                  <li>Document assumptions, risks, and owner accountability.</li>
                  <li>Define a pilot scope with timeline, guardrails, and review cadence.</li>
                </ul>
              </Card>

              <QuickCheckCard
                prompt={`What is the strongest next move after completing "${currentSection.title}"?`}
                options={[
                  { id: "a", label: "Buy a tool immediately based on a demo" },
                  { id: "b", label: "Translate insights into a scoped decision plan with owners and metrics" },
                  { id: "c", label: "Wait until the market is fully stable" },
                ]}
                correctOptionId="b"
                explanation="High-quality AI decisions require a scoped plan, clear owners, measurable outcomes, and risk controls."
                optionExplanations={{
                  a: "Demo quality alone is a weak signal. Procurement should follow structured evaluation.",
                  b: "This is the implementation-focused executive approach.",
                  c: "Delays often increase strategic risk without improving decision quality.",
                }}
              />

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={currentSectionIndex === 0}
                  onClick={() => goToSection(currentSectionIndex - 1)}
                >
                  Previous Section
                </Button>
                <Button type="button" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={handleSectionComplete}>
                  {currentSectionIndex === totalSections - 1 ? "Complete Section" : "Complete and Continue"}
                </Button>
              </div>
            </div>
          ) : (
            <p>No sections configured for this module yet.</p>
          )}

          {completionReady && questions.length > 0 && (
            <div className="mt-10 space-y-5">
              <h3 className="text-2xl font-semibold text-brand-indigo">Leadership checkpoint</h3>
              <TextDisplay content="Use this checkpoint to validate strategic decision quality before moving to the next module." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} componentId={`${moduleId}-executive-quiz`} />
              {allQuizComplete ? (
                <Card className="p-4 border-brand-green/30 bg-brand-green/10 text-sm text-brand-indigo">
                  Checkpoint complete. You have validated readiness to apply this module in real business decisions.
                </Card>
              ) : null}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
