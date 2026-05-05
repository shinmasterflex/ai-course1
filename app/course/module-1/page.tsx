/**
 * MODULE 1: WHAT IS ARTIFICIAL INTELLIGENCE?
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { FlipCardGrid, MatchingChallenge, OrderingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
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

          <ModuleHero
            eyebrow="Module 1"
            title="Build the foundation for everything that follows"
            description="Get clear on what AI is, where it came from, and how to separate practical reality from hype."
          />

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="By the end of this module you will be able to define AI in plain language, explain its history, distinguish between types of AI, complete your first useful AI task, and confidently correct common myths." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4" /> What is in this module</h3>
                <ul className="space-y-2 text-sm">
                  {["Defining AI - what it actually means","A brief history - from 1950 to today","Types of AI - narrow, general, super","Your first useful AI win - a beginner-safe exercise","Myths vs. Reality - what AI can and cannot do","Module Quiz"].map((item) => (
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
              <TextDisplay variant="callout" content="Think of it this way: human intelligence lets you recognise faces, understand language, solve problems, and learn from experience. AI is software engineered to do the same kinds of things - not by thinking the way humans do, but by finding patterns in massive amounts of data." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3">Three Key Words in the Definition</h3>
                <div className="space-y-3">
                  {[
                    { word: "Artificial", meaning: "Made by people, not nature. AI is built by engineers and researchers - not something that emerges spontaneously from the universe." },
                    { word: "Intelligence", meaning: "The ability to learn, reason, understand language, or make decisions - tasks that previously required human minds to perform." },
                    { word: "Software", meaning: "AI runs on computers. It is not a robot body (though robots can use AI) - it is code running on chips, servers, and devices you already own." },
                  ].map(({ word, meaning }) => (
                    <div key={word} className="flex gap-3">
                      <span className="font-bold text-brand-orange w-32 flex-shrink-0">{word}</span>
                      <span className="text-muted-foreground">{meaning}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-brand-orange" /> Core AI Vocabulary - Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These terms will appear throughout the course. Click each card to reveal the definition.</p>
                <FlipCardGrid
                  cards={[
                    {
                      title: "AI",
                      prompt: "What does AI mean in this course?",
                      answer: "Software that performs tasks that usually require human intelligence, like understanding language, recognizing patterns, or making predictions.",
                    },
                    {
                      title: "Model",
                      prompt: "What is an AI model?",
                      answer: "The trained system inside the AI that has learned patterns from data and uses them to generate predictions or responses.",
                    },
                    {
                      title: "Training data",
                      prompt: "Why does training data matter?",
                      answer: "Training data is the example material the model learns from. If it is weak, incomplete, or biased, the model's output will reflect that.",
                    },
                    {
                      title: "Prompt",
                      prompt: "What is a prompt?",
                      answer: "A prompt is the instruction or question you give an AI system. Better prompts usually lead to more useful outputs.",
                    },
                  ]}
                />
              </div>
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: History */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">A Brief History of AI</h2>
              <TextDisplay content="AI is not new - researchers have been working on it since the 1950s. The story matters because each wave of progress came from a combination of better ideas, more data, and more computing power." />
              <div className="space-y-4">
                {[
                  {
                    era: "1950s-1960s",
                    title: "The idea is born",
                    detail: "Researchers such as Alan Turing and John McCarthy asked whether machines could imitate intelligent behavior. Early systems solved logic puzzles and played simple games.",
                  },
                  {
                    era: "1970s-1980s",
                    title: "Expert systems rise",
                    detail: "Companies built rule-based systems that encoded specialist knowledge. They worked in narrow areas but were expensive to maintain and brittle outside their rules.",
                  },
                  {
                    era: "1997",
                    title: "Machines beat top humans at specific tasks",
                    detail: "IBM Deep Blue defeated world chess champion Garry Kasparov, showing that narrow AI could outperform humans in well-defined domains.",
                  },
                  {
                    era: "2012",
                    title: "Deep learning breaks through",
                    detail: "Neural networks trained on huge datasets started outperforming older approaches in image recognition, unlocking a new phase of rapid progress.",
                  },
                  {
                    era: "2017-2022",
                    title: "Transformers and generative AI",
                    detail: "The transformer architecture made modern LLMs possible. Tools like ChatGPT turned AI from a specialist technology into a mass-market product.",
                  },
                ].map(({ era, title, detail }) => (
                  <Card key={era} className="p-5 border-l-4 border-l-brand-orange">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">{era}</p>
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{detail}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">The pattern to remember</h3>
                <p className="text-sm text-muted-foreground">AI progress rarely comes from one magic invention. It usually happens when algorithms improve, training data grows, and computing power becomes cheap enough to scale.</p>
              </Card>
              <QuickCheckCard
                prompt="What best explains why AI improved so sharply in the modern era?"
                options={[
                  { id: "a", label: "One scientist suddenly solved intelligence forever" },
                  { id: "b", label: "Better algorithms, more data, and more computing power came together" },
                  { id: "c", label: "AI only started existing after ChatGPT launched" },
                  { id: "d", label: "Robots became common in every home" },
                ]}
                correctOptionId="b"
                explanation="Modern AI progress came from compounding improvements in models, datasets, and compute rather than a single breakthrough in isolation."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Types of AI */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Types of AI</h2>
              <TextDisplay content="Not all AI is the same. Researchers distinguish between three levels - and only one of them actually exists today." />
              <div className="space-y-4">
                <Card className="p-5 border-2 border-brand-green/40 bg-brand-green/5">
                  <h3 className="font-bold text-lg text-brand-green mb-2">Narrow AI (Weak AI) - This is real, and it exists today</h3>
                  <p className="text-muted-foreground">Narrow AI is designed to do one specific task very well. It cannot go beyond what it was trained for. Examples: spam filters, face recognition, ChatGPT, Netflix recommendations, Google Translate.</p>
                  <p className="mt-2 font-medium">Every AI you have ever used is Narrow AI.</p>
                </Card>
                <Card className="p-5 border-2 border-brand-orange/40 bg-brand-orange/5">
                  <h3 className="font-bold text-lg text-brand-orange mb-2">General AI (AGI) - Theoretical, does not exist yet</h3>
                  <p className="text-muted-foreground">AGI would be an AI that can do any intellectual task a human can do - reasoning across domains, learning new skills from scratch, understanding context the way people do. Scientists disagree on when (or if) this will happen.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Notable: Sam Altman (OpenAI CEO) has said AGI could arrive within a few years. Other leading researchers say decades away - or never.</p>
                </Card>
                <Card className="p-5 border-2 border-gray-300 bg-gray-50">
                  <h3 className="font-bold text-lg text-gray-600 mb-2">Superintelligence - Science fiction for now</h3>
                  <p className="text-muted-foreground">A hypothetical AI far smarter than all humans combined. This is what science fiction movies are about. It does not exist, and most researchers consider it very far away - if it is possible at all.</p>
                </Card>
              </div>
              <TextDisplay variant="callout" content="Key insight: When you read scary headlines about AI 'taking over,' they are almost always talking about AGI or superintelligence - things that do not exist. The AI you use today is Narrow AI, which is powerful but limited to specific tasks." />
              <h3 className="text-lg font-semibold">Test your understanding - Can Narrow AI do this?</h3>
              <QuickCheckCard
                prompt="Which task is the best fit for narrow AI?"
                options={[
                  { id: "a", label: "Diagnose every possible human problem across all domains with no additional training" },
                  { id: "b", label: "Filter spam emails based on patterns learned from past messages" },
                  { id: "c", label: "Understand the world exactly like a human child" },
                  { id: "d", label: "Instantly transfer common sense to any new task" },
                ]}
                correctOptionId="b"
                explanation="Spam filtering is a classic narrow AI task: specific, pattern-based, and trainable from large numbers of examples."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: AI in Your Life */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Your First Useful Win</h2>
              <TextDisplay content="You have learned what AI is. Now use it for something genuinely helpful. Your first win should be small, low-risk, and easy to review - not a life decision or a complex automation." />
              <TextDisplay variant="callout" content="The beginner rule: start with summarising, drafting, or organising. Avoid sensitive data. Verify anything important before you use it." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">A 10-minute exercise you can do right now</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Task:</span> paste a long email, meeting note, or article into your AI tool and ask for a short summary plus action items.</p>
                  <p><span className="font-medium text-foreground">Why this is a good first use:</span> the output is easy to judge, the stakes are low, and you immediately feel the time savings.</p>
                  <p><span className="font-medium text-foreground">Use this prompt:</span></p>
                  <p className="font-mono bg-background rounded border p-3 text-xs leading-relaxed">
                    Summarise the text below in 5 bullet points. Then list the 3 most important action items separately. Use plain language. If anything is unclear, say what is missing instead of guessing.
                  </p>
                </div>
              </Card>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Summarise",
                    desc: "Turn a long email, article, or meeting transcript into the key points in under a minute.",
                  },
                  {
                    title: "Draft",
                    desc: "Start from rough notes and ask AI to draft a reply, agenda, or short update you can edit.",
                  },
                  {
                    title: "Organise",
                    desc: "Convert messy notes into a checklist, table, timeline, or set of next steps.",
                  },
                ].map(({ title, desc }) => (
                  <Card key={title} className="p-4">
                    <h3 className="font-semibold text-brand-orange mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">What makes this a real win?</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "You save time on a task you already do",
                    "You can quickly spot whether the answer is good or bad",
                    "You are not sharing passwords, financial data, or private personal information",
                    "You stay in control because you review the output before using it",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Three things not to do yet</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Do not</span> use AI for medical, legal, or financial decisions without expert verification.</p>
                  <p><span className="font-medium text-foreground">Do not</span> paste confidential work documents into a public AI tool unless your organisation has approved it.</p>
                  <p><span className="font-medium text-foreground">Do not</span> trust the first answer automatically. Read it, edit it, and verify key facts.</p>
                </div>
              </Card>
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Myths vs Reality */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Myths vs. Reality</h2>
              <TextDisplay content="AI gets a lot of hype - and a lot of fear. Most of it comes from misunderstanding what AI actually is. Let us set the record straight:" />
              <div className="space-y-4">
                {[
                  {
                    myth: "Myth: AI understands the world like a person.",
                    reality: "Reality: AI recognizes patterns in data. It can sound fluent without having human understanding, judgment, or lived experience.",
                  },
                  {
                    myth: "Myth: AI outputs are objective because they come from a machine.",
                    reality: "Reality: AI can reflect bias, bad assumptions, or weak data. Machine-generated does not mean neutral or correct.",
                  },
                  {
                    myth: "Myth: AI will replace every job completely.",
                    reality: "Reality: most near-term impact is task-level automation and augmentation. Jobs change first; they do not all disappear at once.",
                  },
                  {
                    myth: "Myth: The best way to use AI is to trust the first answer.",
                    reality: "Reality: strong AI use looks like drafting, reviewing, editing, and verifying - not blind acceptance.",
                  },
                ].map(({ myth, reality }) => (
                  <Card key={myth} className="p-5">
                    <p className="font-semibold text-brand-orange mb-2">{myth}</p>
                    <p className="text-sm text-muted-foreground">{reality}</p>
                  </Card>
                ))}
              </div>
              <MatchingChallenge
                title="Myth Match Sprint"
                description="Tap a myth, then tap its matching reality statement."
                pairs={[
                  {
                    id: "patterns",
                    left: "AI understands like humans",
                    right: "AI predicts patterns; it does not have lived understanding",
                  },
                  {
                    id: "neutral",
                    left: "Machine output is always objective",
                    right: "AI can mirror bias from training data and labels",
                  },
                  {
                    id: "replace",
                    left: "AI will replace every job completely",
                    right: "Near-term impact is mostly task automation and augmentation",
                  },
                ]}
              />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">Practical takeaway</h3>
                <p className="text-sm text-muted-foreground mb-3">The healthiest beginner mindset is neither hype nor fear. Treat AI as a useful but limited assistant.</p>
                <ul className="space-y-2 text-sm">
                  {[
                    "Use AI to accelerate first drafts and summaries",
                    "Keep humans in charge of judgment and accountability",
                    "Verify important claims before acting on them",
                    "Expect useful help, not perfect truth",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <QuickCheckCard
                prompt="Which statement reflects the most accurate beginner mental model of AI?"
                options={[
                  { id: "a", label: "AI is either magical or useless, nothing in between" },
                  { id: "b", label: "AI is a helpful but limited assistant that still needs human review" },
                  { id: "c", label: "AI always understands meaning the way humans do" },
                  { id: "d", label: "AI outputs should be treated as verified facts by default" },
                ]}
                correctOptionId="b"
                explanation="This course frames AI as powerful but limited: useful for support and acceleration, but still requiring human oversight and verification."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <OrderingChallenge
                title="Build the Responsible AI Workflow"
                description="Move each step into the strongest practical order."
                items={[
                  "Use AI output directly",
                  "Give clear context and constraints",
                  "Verify claims and edit for your audience",
                  "Define your task and desired output",
                ]}
                correctOrder={[
                  "Define your task and desired output",
                  "Give clear context and constraints",
                  "Verify claims and edit for your audience",
                  "Use AI output directly",
                ]}
              />
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

