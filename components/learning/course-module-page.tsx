"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { TextDisplay } from "@/components/learning/text-display"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { moduleQuizData } from "@/lib/course-content"
import { getSectionLearningContent } from "@/lib/course-content"

type CourseModulePageProps = {
  moduleId: string
}

export function CourseModulePage({ moduleId }: CourseModulePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((item) => item.id === moduleId)
  const sections = useMemo(() => (module?.sections ? module.sections : []), [module])
  const totalSections = sections.length
  const currentSection = sections[currentSectionIndex]
  const completedSectionIds = getCompletedSections(moduleId)

  const questions = moduleQuizData[moduleId] ? moduleQuizData[moduleId] : []
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
      return
    }

    router.push("/course")
  }

  const explainerAttributes = getExplainerAttributes({
    type: "AI adoption learning workspace",
    title: module?.title ? module.title : "AI adoption module",
    explanation: currentSection
      ? `You are viewing ${currentSection.title}, section ${currentSectionIndex + 1} of ${totalSections}. Completed sections: ${completedSectionIds.length} of ${totalSections}. Review the scenario, use the checklist, answer the checkpoint, and continue to the next section.`
      : "Work through each section to build your implementation-ready AI strategy.",
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
  const content = getSectionLearningContent(moduleId, currentSection?.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main {...explainerAttributes} className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{module.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{module.description ? module.description : "Practical frameworks for AI adoption and confident decision-making."}</p>
            <ProgressBar current={completedSectionIds.length} total={Math.max(totalSections, 1)} label="Module Progress" />
          </div>

          {currentSection ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">{currentSection.title}</h2>
              <TextDisplay
                variant="callout"
                content={currentSection.summary ? currentSection.summary : ""}
              />

              {content ? <TextDisplay content={content} /> : null}

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
              <h3 className="text-2xl font-semibold text-brand-indigo">Module checkpoint</h3>
              <TextDisplay content="Use this checkpoint to validate what you learned before moving to the next module." />
              <ModuleQuiz
                key={`${moduleId}-course-quiz`}
                questions={questions}
                results={quizResults}
                onAnswer={handleQuizComplete}
                componentId={`${moduleId}-course-quiz`}
              />
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



