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
import { getComponentExplanation, getSectionLearningContent } from "@/lib/component-card-content"

type CourseModulePageProps = {
  moduleId: string
}

type ComponentCardContent = {
  scenario: {
    title: string
    body: string
    checklistTitle: string
    checklistItems: string[]
    explainer: {
      type: string
      title: string
      explanation: string
    }
  }
  quickCheck: {
    prompt: string
    options: { id: string; label: string }[]
    correctOptionId: string
    explanation: string
    optionExplanations: Record<string, string>
    explainer: {
      type: string
      title: string
      explanation: string
    }
  }
}

function buildScenarioCardExplanation(
  moduleTitle: string,
  sectionTitle: string,
  scenarioTitle: string,
  scenarioBody: string,
  checklistTitle: string,
  checklistItems: string[],
  panelExplanation: string,
) {
  const checklistPreview = checklistItems.map((item) => `- ${item}`).join("\n")
  return [
    `Module: ${moduleTitle}. Section: ${sectionTitle}.`,
    `Scenario card: ${scenarioTitle}. ${scenarioBody}`,
    `Action checklist (${checklistTitle}):\n${checklistPreview}`,
    panelExplanation,
  ].join("\n\n")
}

function buildQuickCheckCardExplanation(
  sectionTitle: string,
  prompt: string,
  options: { id: string; label: string }[],
  panelExplanation: string,
) {
  const optionLines = options.map((option) => `${option.id.toUpperCase()}: ${option.label}`).join("\n")
  return [
    `Checkpoint for ${sectionTitle}.`,
    `Prompt: ${prompt}`,
    `Options:\n${optionLines}`,
    panelExplanation,
  ].join("\n\n")
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
  const sectionLearningContent = getSectionLearningContent(moduleId, currentSection?.id)

  const sectionExplainerBaseId = currentSection ? `${moduleId}-${currentSection.id}` : undefined
  const componentCards: ComponentCardContent | null = useMemo(() => {
    if (!currentSection || !sectionLearningContent || !sectionExplainerBaseId) {
      return null
    }

    const scenarioExplainerId = `${sectionExplainerBaseId}-scenario`
    const quickCheckExplainerId = `${sectionExplainerBaseId}-quick-check`
    const scenarioPanelExplanation = getComponentExplanation(scenarioExplainerId)?.explanation
    const quickCheckPanelExplanation = getComponentExplanation(quickCheckExplainerId)?.explanation

    const scenarioMergedExplanation = scenarioPanelExplanation
      ? scenarioPanelExplanation
      : `This scenario card introduces the section context for ${currentSection.title} and prepares you to apply the concept in a real workflow.`
    const quickCheckMergedExplanation = quickCheckPanelExplanation
      ? quickCheckPanelExplanation
      : `This quick check validates whether you can apply ${currentSection.title} with evidence-based reasoning.`

    return {
      scenario: {
        title: sectionLearningContent.scenarioTitle,
        body: sectionLearningContent.scenarioBody,
        checklistTitle: sectionLearningContent.checklistTitle,
        checklistItems: sectionLearningContent.checklistItems,
        explainer: {
          type: "Scenario card",
          title: sectionLearningContent.scenarioTitle,
          explanation: buildScenarioCardExplanation(
            module.title,
            currentSection.title,
            sectionLearningContent.scenarioTitle,
            sectionLearningContent.scenarioBody,
            sectionLearningContent.checklistTitle,
            sectionLearningContent.checklistItems,
            scenarioMergedExplanation,
          ),
        },
      },
      quickCheck: {
        prompt: sectionLearningContent.quickCheckPrompt,
        options: sectionLearningContent.quickCheckOptions,
        correctOptionId: sectionLearningContent.quickCheckCorrectOptionId,
        explanation: sectionLearningContent.quickCheckExplanation,
        optionExplanations: sectionLearningContent.quickCheckOptionExplanations,
        explainer: {
          type: "Checkpoint card",
          title: `Quick check: ${currentSection.title}`,
          explanation: buildQuickCheckCardExplanation(
            currentSection.title,
            sectionLearningContent.quickCheckPrompt,
            sectionLearningContent.quickCheckOptions,
            quickCheckMergedExplanation,
          ),
        },
      },
    }
  }, [currentSection, module.title, sectionExplainerBaseId, sectionLearningContent])

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
                content={currentSection.summary ? currentSection.summary : "Use this section to sharpen your decision quality and implementation discipline."}
              />

              {componentCards ? (
                <Card
                  className="p-5 border-brand-indigo/20 bg-brand-indigo/5 space-y-4"
                  {...getExplainerAttributes(componentCards.scenario.explainer)}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-indigo/80">Scenario</p>
                    <p className="text-lg font-semibold text-brand-indigo">{componentCards.scenario.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{componentCards.scenario.body}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-indigo/80">Action Checklist</p>
                    <p className="text-sm font-medium text-foreground mt-1">{componentCards.scenario.checklistTitle}</p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                      {componentCards.scenario.checklistItems.map((item) => (
                        <li key={`${moduleId}-${currentSection.id}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ) : null}

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green/80">Checkpoint</p>
                  <p className="text-sm text-muted-foreground">Use this quick check to confirm you can apply the section in a real situation.</p>
                </div>
                <QuickCheckCard
                  key={`${moduleId}-${currentSection.id}-quick-check`}
                  componentId={`${moduleId}-${currentSection.id}-quick-check`}
                  explainerDescriptor={componentCards ? componentCards.quickCheck.explainer : undefined}
                  prompt={componentCards ? componentCards.quickCheck.prompt : `What is the strongest next move after completing "${currentSection.title}"?`}
                  options={componentCards ? componentCards.quickCheck.options : [
                    { id: "a", label: "Buy a tool immediately based on a demo" },
                    { id: "b", label: "Translate insights into a scoped decision plan with owners and metrics" },
                    { id: "c", label: "Wait until the market is fully stable" },
                  ]}
                  correctOptionId={componentCards ? componentCards.quickCheck.correctOptionId : "b"}
                  explanation={componentCards ? componentCards.quickCheck.explanation : "High-quality AI decisions require a scoped plan, clear owners, measurable outcomes, and risk controls."}
                  optionExplanations={componentCards ? componentCards.quickCheck.optionExplanations : {
                    a: "Demo quality alone is a weak signal. Procurement should follow structured evaluation.",
                    b: "This is the implementation-focused, beginner-friendly approach.",
                    c: "Delays often increase strategic risk without improving decision quality.",
                  }}
                />
              </div>

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


