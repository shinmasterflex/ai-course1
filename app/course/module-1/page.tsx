/**
 * MODULE 1: WHAT IS ARTIFICIAL INTELLIGENCE?
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Brain, Clock, Lightbulb } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module1Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-1"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "matching"])
  const questions = moduleQuizData[MODULE_ID]

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [sectionParam])

  useEffect(() => {
    if (allQuizComplete && currentSectionIndex === totalSections - 1) {
      const last = sections[totalSections - 1]
      if (last) { markSectionComplete(MODULE_ID, last.id); setCurrentPosition(MODULE_ID, last.id) }
    }
  }, [allQuizComplete])

  const handleSectionComplete = () => {
    const current = sections[currentSectionIndex]
    if (current) { markSectionComplete(MODULE_ID, current.id); setCurrentPosition(MODULE_ID, current.id) }
    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-1?section=${next.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 1: What Is Artificial Intelligence?</h1>
            <p className="text-lg text-muted-foreground mb-4">Cut through the hype and build a real understanding of AI</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="By the end of this module you will be able to define AI in plain language, explain its history, distinguish between types of AI, spot AI in your daily life, and confidently correct common myths." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4" /> What is in this module</h3>
                <ul className="space-y-2 text-sm">
                  {["Defining AI ? what it actually means","A brief history ? from 1950 to today","Types of AI ? narrow, general, super","AI in your daily life ? real examples","Myths vs. Reality ? what AI can and cannot do","Module Quiz"].map((item) => (
                    <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" />{item}</li>
                  ))}
                </ul>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: Defining AI */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Defining AI</h2>
              <TextDisplay content="Artificial Intelligence (AI) is software that is designed to perform tasks that would normally require human intelligence." />
              <TextDisplay variant="callout" content="Think of it this way: human intelligence lets you recognise faces, understand language, solve problems, and learn from experience. AI is software engineered to do the same kinds of things ? not by thinking the way humans do, but by finding patterns in massive amounts of data." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3">Three Key Words in the Definition</h3>
                <div className="space-y-3">
                  {[
                    { word: "Artificial", meaning: "Made by people, not nature. AI is built by engineers and researchers ? not something that emerges spontaneously from the universe." },
                    { word: "Intelligence", meaning: "The ability to learn, reason, understand language, or make decisions ? tasks that previously required human minds to perform." },
                    { word: "Software", meaning: "AI runs on computers. It is not a robot body (though robots can use AI) ? it is code running on chips, servers, and devices you already own." },
                  ].map(({ word, meaning }) => (
                    <div key={word} className="flex gap-3">
                      <span className="font-bold text-brand-orange w-32 flex-shrink-0">{word}</span>
                      <span className="text-muted-foreground">{meaning}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-brand-orange" /> Core AI Vocabulary ? Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These terms will appear throughout the course. Click each card to reveal the definition.</p>
                
              </div>
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: History */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">A Brief History of AI</h2>
              <TextDisplay content="AI is not new ? researchers have been working on it since the 1950s. Click through the timeline below to see how we got here:" />
              
              
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Types of AI */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Types of AI</h2>
              <TextDisplay content="Not all AI is the same. Researchers distinguish between three levels ? and only one of them actually exists today." />
              <div className="space-y-4">
                <Card className="p-5 border-2 border-brand-green/40 bg-brand-green/5">
                  <h3 className="font-bold text-lg text-brand-green mb-2">Narrow AI (Weak AI) ? This is real, and it exists today</h3>
                  <p className="text-muted-foreground">Narrow AI is designed to do one specific task very well. It cannot go beyond what it was trained for. Examples: spam filters, face recognition, ChatGPT, Netflix recommendations, Google Translate.</p>
                  <p className="mt-2 font-medium">Every AI you have ever used is Narrow AI.</p>
                </Card>
                <Card className="p-5 border-2 border-brand-orange/40 bg-brand-orange/5">
                  <h3 className="font-bold text-lg text-brand-orange mb-2">General AI (AGI) ? Theoretical, does not exist yet</h3>
                  <p className="text-muted-foreground">AGI would be an AI that can do any intellectual task a human can do ? reasoning across domains, learning new skills from scratch, understanding context the way people do. Scientists disagree on when (or if) this will happen.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Notable: Sam Altman (OpenAI CEO) has said AGI could arrive within a few years. Other leading researchers say decades away ? or never.</p>
                </Card>
                <Card className="p-5 border-2 border-gray-300 bg-gray-50">
                  <h3 className="font-bold text-lg text-gray-600 mb-2">Superintelligence ? Science fiction for now</h3>
                  <p className="text-muted-foreground">A hypothetical AI far smarter than all humans combined. This is what science fiction movies are about. It does not exist, and most researchers consider it very far away ? if it is possible at all.</p>
                </Card>
              </div>
              <TextDisplay variant="callout" content="Key insight: When you read scary headlines about AI 'taking over,' they are almost always talking about AGI or superintelligence ? things that do not exist. The AI you use today is Narrow AI, which is powerful but limited to specific tasks." />
              <h3 className="text-lg font-semibold">Test your understanding ? Can Narrow AI do this?</h3>
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: AI in Your Life */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI in Your Daily Life</h2>
              <TextDisplay content="Let us look at specific categories where AI is already working for you ? right now." />
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Myths vs Reality */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Myths vs. Reality</h2>
              <TextDisplay content="AI gets a lot of hype ? and a lot of fear. Most of it comes from misunderstanding what AI actually is. Let us set the record straight:" />
              
              
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Let us check your understanding. Answer all three questions correctly to complete the module." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent work! You have completed Module 1. You now have a solid foundation for understanding what AI is." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-2")}>
                      Continue to Module 2
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push("/course")}>Dashboard</Button>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
