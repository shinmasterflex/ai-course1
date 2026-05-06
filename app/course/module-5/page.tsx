/**
 * MODULE 5: EVALUATING THE BUSINESS IMPACT OF AI
 */

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { QuickCheckCard } from "@/components/learning/lesson-interactions"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { ProgressBar } from "@/components/learning/progress-bar"
import { TextDisplay } from "@/components/learning/text-display"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { moduleQuizData } from "@/lib/module-quiz-data"
import { BarChart3, Calculator, CheckCircle2, CircleDollarSign, Gauge, ShieldAlert, TrendingUp } from "lucide-react"

export default function Module5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-5"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)
  const currentSection = sections[currentSectionIndex]

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5", "quiz6"])
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

  const mainExplainerAttributes = getExplainerAttributes({
    type: "Module workspace",
    title: "Module 5: Evaluating the Business Impact of AI",
    summary: currentSection
      ? `You are viewing ${currentSection.title}, section ${currentSectionIndex + 1} of ${totalSections} in Module 5.`
      : "This module teaches practical ways to measure AI value, calculate ROI, and decide whether a tool is worth adopting.",
    details: [
      `Completed sections so far: ${completedSectionIds.length} of ${totalSections}.`,
      "Each section is built around decisions founders, creators, freelancers, and managers make in real workflows.",
    ],
    interaction: "Use each section to assess value with a practical framework, then apply it with short scenario checks.",
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main {...mainExplainerAttributes} className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 5: Evaluating the Business Impact of AI</h1>
            <p className="text-lg text-muted-foreground mb-4">Figure out if an AI tool is actually worth it using clear metrics, ROI math, and real-world decision frameworks.</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 5"
              title="Measure AI value like a smart operator"
              description="Go beyond hype and time-saved claims. Learn to evaluate impact, cost, risk, and strategic leverage before committing to any tool."
              imageSrc="/images/modules/module-5.jpg"
              imageAlt="Business-focused AI impact evaluation"
              componentId="m5-hero"
            />
          )}

          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay
                variant="callout"
                content="Most people evaluate AI tools backwards. They start with features, then try to justify value later. In this module, you will start with business outcomes first, then decide if the tool earns its place."
              />
              <Card componentId="m5-module-overview" className="p-5 space-y-2">
                {[
                  "What ROI means in the context of AI",
                  "How teams measure effectiveness without vanity metrics",
                  "The major ways AI creates value (revenue, cost, quality, risk)",
                  "A simple ROI formula you can use immediately",
                  "How to spot misleading metrics and inflated success claims",
                  "A practical scorecard for deciding tool adoption",
                  "Why AI leverage matters beyond raw time savings",
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
              <h2 className="text-3xl font-bold text-brand-orange">What ROI Means for AI</h2>
              <TextDisplay content="ROI for AI is not just about doing tasks faster. It is about whether outcomes improve enough to justify total cost, complexity, and risk." />
              <Card componentId="m5-roi-basics" className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4" />
                  AI ROI in plain language
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Value = better output, higher conversion, fewer errors, faster cycles, or lower risk.</li>
                  <li>Cost = subscriptions, integration effort, training time, QA overhead, and change management.</li>
                  <li>Positive ROI means value is bigger than total cost over a defined period.</li>
                </ul>
              </Card>
              <Card componentId="m5-leverage" className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-2 text-brand-green">Leverage beats raw speed</h3>
                <p className="text-sm text-muted-foreground">If AI saves 3 hours but lets you launch twice as many offers, close larger deals, or improve retention, leverage can outweigh time savings by a wide margin.</p>
              </Card>
              <QuickCheckCard
                prompt="Quick scenario: Which outcome best signals AI leverage, not just speed?"
                options={[
                  { id: "a", label: "Writing the same number of proposals in less time" },
                  { id: "b", label: "Producing 2x proposals with equal quality and 30% higher close rate" },
                  { id: "c", label: "Using the newest AI model for brand perception" },
                  { id: "d", label: "Reducing prompt length by 20 tokens" },
                ]}
                correctOptionId="b"
                optionExplanations={{
                  a: "This is only efficiency. It may help, but it does not automatically create larger business impact.",
                  b: "Correct. This combines scale and outcome quality, which is what leverage looks like.",
                  c: "Model prestige is not business value. Outcomes matter more than novelty.",
                  d: "Token savings are usually too small to represent strategic impact on their own.",
                }}
                explanation="Correct. Leverage means increased output and better business outcomes, not just doing the same work faster."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">How Businesses Measure AI Effectiveness</h2>
              <TextDisplay content="Strong teams evaluate AI using outcome metrics, not tool activity. Track what changes in the business, not just how much the AI was used." />
              <Card componentId="m5-effectiveness" className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-brand-orange">
                  <Gauge className="h-4 w-4" />
                  Four value-creation lanes
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                  <div className="rounded-lg border p-3">Revenue: improved conversion, upsell, faster sales cycles</div>
                  <div className="rounded-lg border p-3">Cost: fewer manual hours, lower outsource spend, reduced rework</div>
                  <div className="rounded-lg border p-3">Quality: better consistency, fewer defects, stronger customer experience</div>
                  <div className="rounded-lg border p-3">Risk: fewer compliance misses, reduced fraud, lower incident exposure</div>
                </div>
              </Card>
              <QuickCheckCard
                prompt="Quick check: Which is the strongest effectiveness metric for an AI support assistant?"
                options={[
                  { id: "a", label: "Number of prompts sent per day" },
                  { id: "b", label: "Average response emoji score from internal testers" },
                  { id: "c", label: "First-contact resolution and customer satisfaction trend" },
                  { id: "d", label: "How often the team mentions AI in meetings" },
                ]}
                correctOptionId="c"
                optionExplanations={{
                  a: "Usage volume does not guarantee better outcomes. Activity is not the same as impact.",
                  b: "This is weak and subjective on its own. You need customer-facing performance metrics.",
                  c: "Correct. These metrics map directly to service quality and business value.",
                  d: "Internal excitement is not evidence of effectiveness.",
                }}
                explanation="Correct. The best AI metrics are tied to real outcomes users and customers experience."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Card componentId="m5-effectiveness" className="p-5 bg-brand-orange/5 border-brand-orange/20">
                <h3 className="font-semibold mb-2 text-brand-orange">Field tip</h3>
                <p className="text-sm text-muted-foreground">Track 1 lead metric and 2 lag metrics per AI workflow. More than that often becomes noise for small teams.</p>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">How to Calculate AI ROI</h2>
              <TextDisplay content="Use a simple, transparent model first. You can increase sophistication later, but clarity beats complexity in early decisions." />
              <Card componentId="m5-roi-formula" className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-brand-green">
                  <Calculator className="h-4 w-4" />
                  Starter formula
                </h3>
                <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                  <code>{`Net Benefit = Total AI-Driven Value - Total AI Cost
ROI (%) = (Net Benefit / Total AI Cost) * 100

Example (monthly):
Value created:
- 40 hours saved x $45/hour = $1,800
- Better conversion adds profit = $1,200
Total value = $3,000

Costs:
- AI subscriptions = $350
- Setup + QA time = $650
Total cost = $1,000

Net benefit = $2,000
ROI = 200%`}</code>
                </pre>
              </Card>
              <QuickCheckCard
                prompt="Quick check: Which cost is most often forgotten in AI ROI calculations?"
                options={[
                  { id: "a", label: "Subscription plan cost" },
                  { id: "b", label: "Initial integration and team onboarding time" },
                  { id: "c", label: "Price of the team's laptops" },
                  { id: "d", label: "Office rent" },
                ]}
                correctOptionId="b"
                optionExplanations={{
                  a: "Direct tool cost is usually obvious and is rarely forgotten.",
                  b: "Correct. Implementation and behavior-change costs are often the hidden ROI killers.",
                  c: "Laptop cost is usually a fixed baseline and not specific to AI adoption decisions.",
                  d: "Rent is a fixed overhead, not an AI-specific marginal cost.",
                }}
                explanation="Correct. Include implementation and adoption effort, not just subscription fees."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Card componentId="m5-roi-formula" className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-2 text-brand-green">Action drill</h3>
                <p className="text-sm text-muted-foreground">Pick one AI tool you already use. Estimate monthly value and total cost in under 10 minutes using the formula above.</p>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Misleading AI Metrics to Avoid</h2>
              <TextDisplay content="Vanity metrics create false confidence. The goal is not to prove AI is being used. The goal is to prove meaningful business improvement." />
              <Card componentId="m5-metrics" className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  Red flags
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>"We ran 10,000 prompts this week." (activity, not value)</li>
                  <li>"The team feels faster." (subjective without baseline)</li>
                  <li>"Output volume went up." (quality may have dropped)</li>
                  <li>"The model score improved." (business KPIs might still be flat)</li>
                </ul>
              </Card>
              <Card componentId="m5-metrics" className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Better metric stack
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Efficiency: time-to-completion, cycle time, handoff delay</li>
                  <li>Effectiveness: conversion, resolution quality, revenue per workflow</li>
                  <li>Risk: compliance incidents, error rate, escalation rate</li>
                </ul>
              </Card>
              <QuickCheckCard
                prompt="Quick check: Which metric pair best avoids vanity reporting?"
                options={[
                  { id: "a", label: "Prompt count + number of AI tools purchased" },
                  { id: "b", label: "Cycle-time reduction + defect rate trend" },
                  { id: "c", label: "User logins + social media mentions" },
                  { id: "d", label: "Token usage + model name" },
                ]}
                correctOptionId="b"
                optionExplanations={{
                  a: "These are adoption and spending signals, not reliable impact signals.",
                  b: "Correct. This pair tracks both speed and quality, reducing blind spots.",
                  c: "These are weak proxies for AI business outcomes.",
                  d: "Technical telemetry alone cannot prove business value.",
                }}
                explanation="Correct. The best metrics tie process improvement to output quality."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Should You Adopt This AI Tool?</h2>
              <TextDisplay content="Adoption is a portfolio decision, not a vibe. Use a clear scorecard so you can compare tools quickly and avoid expensive mistakes." />
              <Card componentId="m5-adoption" className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  AI adoption scorecard (0-5 each)
                </h3>
                <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <div className="rounded-lg border p-3">Expected business impact</div>
                  <div className="rounded-lg border p-3">Data/security fit</div>
                  <div className="rounded-lg border p-3">Integration effort</div>
                  <div className="rounded-lg border p-3">Team readiness</div>
                  <div className="rounded-lg border p-3">Reliability and quality control</div>
                  <div className="rounded-lg border p-3">Time to measurable value</div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">Rule of thumb: pilot tools scoring 20+ first. Archive tools scoring below 14 unless a strategic reason exists.</p>
              </Card>
              <QuickCheckCard
                prompt="Checkpoint: Which decision is strongest after a 2-week AI pilot?"
                options={[
                  { id: "a", label: "Roll out immediately because the team likes the interface" },
                  { id: "b", label: "Scale only after ROI trend, quality stability, and risk checks pass" },
                  { id: "c", label: "Cancel because one edge case failed" },
                  { id: "d", label: "Expand to every department before documenting workflow changes" },
                ]}
                correctOptionId="b"
                optionExplanations={{
                  a: "UI preference is not enough evidence for broad adoption.",
                  b: "Correct. Scale only when impact, quality, and risk signals are all acceptable.",
                  c: "One failure should trigger diagnosis, not automatic cancellation.",
                  d: "Premature expansion creates operational and governance risk.",
                }}
                explanation="Correct. The best adoption decisions are evidence-based, not hype-driven."
                onAnswered={() => markSectionInteractionComplete(5)}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              {!canAdvance && <p className="text-sm text-muted-foreground">Complete the adoption checkpoint to unlock the module quiz.</p>}
              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Answer all questions to complete your AI business impact toolkit." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} componentId="m5-quiz" />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Great work. You can now evaluate AI tools using practical ROI logic, reliable metrics, and real adoption criteria." />
                  <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white" onClick={() => router.push("/course")}>Complete Module</Button>
                </div>
              )}
              {!allQuizComplete && <p className="text-sm text-muted-foreground">Answer all questions above to complete this module.</p>}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
