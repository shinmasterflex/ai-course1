/**
 * MODULE 0: WELCOME TO AI
 * Introductory module — no prior knowledge required
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { FlipCard } from "@/components/learning/flip-card"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Smartphone, Car, ShoppingCart, Music, MessageSquare, Image, Brain } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"

export default function Module0Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-0"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [sectionParam])

  const handleSectionComplete = () => {
    const current = sections[currentSectionIndex]
    if (current) {
      markSectionComplete(MODULE_ID, current.id)
      setCurrentPosition(MODULE_ID, current.id)
    }
    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-0?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 0: Welcome to AI</h1>
            <p className="text-lg text-muted-foreground mb-4">Your beginner-friendly starting point</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Welcome */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Welcome & Course Overview</h2>
              <TextDisplay variant="callout" content="Welcome! You are about to learn one of the most important skills of the 21st century — and you do not need any technical background to do it." />
              <TextDisplay content="This course is designed for curious people who want to understand what AI is, how it works, and how to use it responsibly. Whether you are a student, a professional, or just someone who keeps hearing about AI in the news — this is for you." />
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand-orange" /> What makes this course different</h3>
                <ul className="space-y-3">
                  {[
                    "No jargon — every technical term is explained in plain language",
                    "No math — you will understand the concepts without a single equation",
                    "No coding — this is for users of AI, not builders (though we will point you there if you want)",
                    "Interactive — quizzes, flashcards, and exercises keep you engaged",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Got it — let&apos;s go! →
              </Button>
            </div>
          )}

          {/* Section 1: AI Is Already Around You */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Is Already Around You</h2>
              <TextDisplay content="Before we define AI, let us notice something: you have probably already used AI today without realising it." />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Smartphone,    label: "Face ID / Fingerprint Unlock",  desc: "AI recognises your face or fingerprint in milliseconds." },
                  { icon: ShoppingCart,  label: "Product Recommendations",        desc: "Amazon, Netflix, Spotify — all use AI to suggest what you might like." },
                  { icon: MessageSquare, label: "Spam Filter",                    desc: "Your email's spam folder is an AI that learns what to block." },
                  { icon: Car,           label: "Navigation Apps",                desc: "Google Maps uses AI to predict traffic and find the fastest route." },
                  { icon: Music,         label: "Voice Assistants",               desc: "Siri, Alexa, and Google Assistant all run on AI." },
                  { icon: Image,         label: "Photo Apps",                     desc: "Organising photos by person, place, or object is AI at work." },
                ].map(({ icon: Icon, label, desc }) => (
                  <Card key={label} className="p-4 flex gap-3 items-start">
                    <div className="bg-brand-green/10 p-2 rounded-lg mt-1"><Icon className="h-5 w-5 text-brand-green" /></div>
                    <div><p className="font-semibold">{label}</p><p className="text-sm text-muted-foreground">{desc}</p></div>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The point: AI is not some distant science-fiction technology. It is already woven into daily life. This course will help you understand exactly how." />
              <div className="rounded-xl border bg-gradient-to-br from-brand-orange/5 to-brand-green/5 p-1">
                <MultipleChoice
                  question="Quick challenge — which of these does NOT use AI?"
                  options={[
                    { text: "Netflix recommending your next show", isCorrect: false, feedback: "Netflix's recommendation engine learns your tastes and compares them with millions of other viewers to predict what you'll love next." },
                    { text: "A basic light switch turning on the lights", isCorrect: true, feedback: "Correct! A light switch just follows a fixed electrical rule: flip up = on. No data, no learning, no patterns — pure physics." },
                    { text: "Gmail auto-completing your sentences", isCorrect: false, feedback: "Gmail's Smart Compose is powered by a language model trained on billions of emails to predict what you're about to type." },
                    { text: "Spotify's Discover Weekly playlist", isCorrect: false, feedback: "Discover Weekly is entirely AI — Spotify analyses your listening history and compares it to millions of listeners to surface music you'll likely love." },
                  ]}
                  explanation="AI learns from data and adapts over time. A light switch just follows the laws of electricity — no intelligence, no patterns, no learning. That is the fundamental difference."
                />
              </div>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* Section 2: What You'll Learn */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">What You&apos;ll Learn</h2>
              <TextDisplay content="Here is the full journey you are embarking on. Seven modules, three phases:" />
              <div className="space-y-4">
                {[
                  { phase: "Phase 1: Understanding AI", color: "brand-green", modules: [
                    { n: 0, title: "Welcome to AI",               desc: "Orient yourself — you are here!" },
                    { n: 1, title: "What Is AI?",                 desc: "Definitions, history, and types of AI" },
                    { n: 2, title: "How Machines Learn",          desc: "Training data, neural nets, and AI limits" },
                  ]},
                  { phase: "Phase 2: Using AI", color: "brand-orange", modules: [
                    { n: 3, title: "LLMs & Prompting",            desc: "How ChatGPT works and how to talk to it well" },
                    { n: 4, title: "AI Tools for Everyday Life",  desc: "Writing, images, productivity tools" },
                  ]},
                  { phase: "Phase 3: Thinking & Building", color: "brand-green", modules: [
                    { n: 5, title: "AI Ethics, Safety & Society", desc: "Bias, privacy, and responsible use" },
                    { n: 6, title: "Your AI Toolkit",             desc: "No-code tools, workflows, your first project" },
                  ]},
                ].map(({ phase, color, modules }) => (
                  <Card key={phase} className="p-4">
                    <h3 className={`font-bold text-lg mb-3 text-${color}`}>{phase}</h3>
                    <ul className="space-y-2">
                      {modules.map(({ n, title, desc }) => (
                        <li key={n} className="flex items-center gap-3">
                          <span className={`bg-${color}/10 text-${color} text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>{n}</span>
                          <span><span className="font-medium">{title}</span> — <span className="text-muted-foreground text-sm">{desc}</span></span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* Section 3: How to Use This Course */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">How to Use This Course</h2>
              <TextDisplay content="You will get the most out of this course if you follow a few simple guidelines:" />
              <div className="space-y-3">
                {[
                  { n: "1", tip: "Go in order", desc: "Each module builds on the previous one. Start from Module 0 and work your way through." },
                  { n: "2", tip: "Do the exercises", desc: "The quizzes and matching games are not decoration — they are how your brain actually locks in the knowledge." },
                  { n: "3", tip: "Take your time", desc: "There is no deadline. Better to understand each module fully than to rush through." },
                  { n: "4", tip: "Try the tools", desc: "In Module 3 and beyond, you will be encouraged to try real AI tools. Open a tab and experiment as you learn." },
                  { n: "5", tip: "Use the sidebar", desc: "The sidebar tracks your progress and lets you jump between sections easily." },
                ].map(({ n, tip, desc }) => (
                  <Card key={n} className="p-4 flex gap-3 items-start">
                    <span className="bg-brand-green text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{n}</span>
                    <div><p className="font-semibold">{tip}</p><p className="text-sm text-muted-foreground">{desc}</p></div>
                  </Card>
                ))}
              </div>
              <FlipCard
                front="How long will this course take?"
                back="Most people complete each module in 20-40 minutes. The full course can be done in a weekend, or spread over a few weeks — whichever works for you."
              />
              <FlipCard
                front="What if I don't understand something?"
                back="Totally normal — and part of learning. Re-read the section, then try asking ChatGPT: 'Explain [concept] to me like I am a complete beginner.' Then come back — it will click."
              />
              <FlipCard
                front="Will this course become outdated quickly?"
                back="The tools change fast, but the fundamentals do not. Understanding what AI is, how it learns, and how to think critically about it will stay relevant no matter what new models appear. Focus on principles, not products."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* Section 4: Summary */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Summary & Next Steps</h2>
              <TextDisplay variant="success" content="You have completed Module 0! You now know what this course covers and how to use it." />
              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Brain className="h-5 w-5 text-brand-orange" /> Key Takeaways</h3>
                <ul className="space-y-2">
                  {[
                    "AI is already in your everyday life — from your phone to your email",
                    "This course requires no math, no code, and no prior knowledge",
                    "There are 3 phases: Understanding AI, Using AI, and Thinking Critically",
                    "You learn best by going in order and doing the exercises",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <TextDisplay variant="callout" content="Up next: Module 1 — What Is Artificial Intelligence? We will give AI a real definition, look at its history, and bust some popular myths." />
              <div className="flex gap-4">
                <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  Complete Module & Go to Module 1 →
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/course")}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
