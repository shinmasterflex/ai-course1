/**
 * MODULE 0: WELCOME TO AI
 * Introductory module - no prior knowledge required
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import NextImage from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DragSortChallenge, FlipCardGrid, MatchingChallenge } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Smartphone, Car, ShoppingCart, Music, MessageSquare, Image, Brain, Zap, Globe, Stethoscope, Mic } from "lucide-react"
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

          <Card className="mb-8 overflow-hidden border-brand-indigo/20 bg-white/90">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="space-y-3 p-5 md:p-6">
                <p className="inline-flex rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
                  Module Visual Guide
                </p>
                <h2 className="text-2xl font-semibold text-brand-indigo">A clear path through your AI fundamentals</h2>
                <p className="text-sm text-muted-foreground">
                  Follow each section in order, complete checkpoints, and build confidence before moving to Module 1.
                </p>
              </div>
              <div className="border-t border-brand-indigo/10 bg-sky-50/60 p-4 lg:border-l lg:border-t-0">
                <NextImage
                  src="/graphics/module-path.svg"
                  alt="Visual learning path for course progression"
                  width={960}
                  height={340}
                  className="h-auto w-full rounded-xl border border-brand-indigo/10 bg-white"
                />
              </div>
            </div>
          </Card>

          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Welcome & Course Overview</h2>
              <TextDisplay variant="callout" content="Welcome! You are about to learn one of the most important skills of the 21st century - and you do not need any technical background to do it." />
              <TextDisplay content="This course is designed for curious people who want to understand what AI is, how it works, and how to use it responsibly. Whether you are a student, a professional, or just someone who keeps hearing about AI in the news - this is for you." />
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand-orange" /> What makes this course different</h3>
                <ul className="space-y-3">
                  {["No jargon - every technical term is explained in plain language","No math - you will understand the concepts without a single equation","No coding - this is for users of AI, not builders (though we will point you there if you want)","Interactive - quizzes, flashcards, and exercises keep you engaged"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-brand-orange" /> Mind-blowing AI facts to get you started</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { stat: "100M users", detail: "ChatGPT reached 100 million users in just 2 months - faster than any product in history. Netflix took 3.5 years." },
                    { stat: "1.8 trillion", detail: "The estimated number of parameters in GPT-4 - roughly 1,800,000,000,000 adjustable values that shape every response." },
                    { stat: "700%", detail: "AI investment grew 700% in the decade from 2010 to 2020, and the pace has only accelerated since." },
                    { stat: "30+ times", detail: "The average person interacts with AI over 30 times per day - most of it completely invisible in the background." },
                  ].map(({ stat, detail }) => (
                    <Card key={stat} className="p-4 border-l-4 border-l-brand-orange">
                      <p className="text-2xl font-black text-brand-orange mb-1">{stat}</p>
                      <p className="text-sm text-muted-foreground">{detail}</p>
                    </Card>
                  ))}
                </div>
              </div>
              <FlipCardGrid
                cards={[
                  {
                    title: "Pattern Recognition",
                    prompt: "What does AI do best in daily tools?",
                    answer: "It detects patterns in huge datasets quickly and applies them to tasks like recommendations, ranking, and prediction.",
                  },
                  {
                    title: "Prediction",
                    prompt: "What is a simple way to think about AI outputs?",
                    answer: "Most outputs are predictions based on previous examples, not human-like understanding or intuition.",
                  },
                  {
                    title: "Augmentation",
                    prompt: "Why does AI matter for beginners?",
                    answer: "It helps you draft, summarize, and organize faster, so you can focus on judgment and decision-making.",
                  },
                  {
                    title: "Verification",
                    prompt: "What habit keeps AI useful and safe?",
                    answer: "Always verify important facts and claims before acting on AI output.",
                  },
                ]}
              />
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Brain className="h-5 w-5 text-brand-green" /> Discover your AI learning style</h3>
                <p className="text-sm text-muted-foreground mb-4">We removed the legacy Cognijin personality assessment from this course flow.</p>
              </div>
              <TextDisplay
                variant="info"
                content="You can continue directly into the course modules. Learning guidance is now built into each module section instead of a separate personality quiz."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Got it - let's go!
              </Button>
            </div>
          )}

          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Is Already Around You</h2>
              <TextDisplay content="Before we define AI, let us notice something: you have probably already used AI today without realising it. The average person interacts with AI over 30 times a day - most of it invisible." />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Smartphone,    label: "Face ID / Fingerprint Unlock",  desc: "AI recognises your face or fingerprint in milliseconds - trained on millions of facial images to find patterns unique to you." },
                  { icon: ShoppingCart,  label: "Product Recommendations",        desc: "Amazon, Netflix, Spotify - all use AI to suggest what you might like by finding users who behave similarly to you." },
                  { icon: MessageSquare, label: "Spam Filter",                    desc: "Your email's spam folder is an AI that has learned what bad emails look like - updated continuously as new spam evolves." },
                  { icon: Car,           label: "Navigation Apps",                desc: "Google Maps uses AI to predict traffic 60+ minutes in advance using real-time data from millions of drivers on the road right now." },
                  { icon: Music,         label: "Voice Assistants",               desc: "Siri, Alexa, and Google Assistant convert your voice to text, understand intent, and generate responses - all powered by AI." },
                  { icon: Image,         label: "Photo Apps",                     desc: "Organising photos by person, place, or object is AI at work - automatically identifying faces, landscapes, and objects." },
                  { icon: Globe,         label: "Search Engines",                 desc: "Google processes 8.5 billion searches per day. AI ranks results, understands typos, and answers questions directly in the search bar." },
                  { icon: Stethoscope,   label: "Medical Imaging",                desc: "AI can now detect certain cancers in X-rays and MRI scans as accurately as - or better than - specialist radiologists." },
                  { icon: Mic,           label: "Real-time Translation",          desc: "Tools like Google Translate use neural machine translation, converting between 100+ languages almost instantly." },
                  { icon: Brain,         label: "Credit Scoring",                 desc: "When you apply for a loan or credit card, AI analyses hundreds of data points in seconds to determine your risk profile." },
                ].map(({ icon: Icon, label, desc }) => (
                  <Card key={label} className="p-4 flex gap-3 items-start">
                    <div className="bg-brand-green/10 p-2 rounded-lg mt-1"><Icon className="h-5 w-5 text-brand-green" /></div>
                    <div><p className="font-semibold">{label}</p><p className="text-sm text-muted-foreground">{desc}</p></div>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The point: AI is not some distant science-fiction technology. It is already woven into the fabric of daily life - often invisibly. This course will help you understand exactly how it works and why it matters." />
              <MatchingChallenge
                title="Daily AI Match"
                description="Choose a real-world AI use and match it to what it does for users."
                pairs={[
                  {
                    id: "navigation",
                    left: "Navigation apps",
                    right: "Predict traffic and suggest faster routes",
                  },
                  {
                    id: "spam",
                    left: "Email spam filter",
                    right: "Classify messages as likely unwanted content",
                  },
                  {
                    id: "recommendation",
                    left: "Product recommendations",
                    right: "Rank options based on similar behavior patterns",
                  },
                ]}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">What You will Learn</h2>
              <TextDisplay content="Here is the full journey you are embarking on. Seven modules, three phases:" />
              <div className="space-y-4">
                {[
                  { phase: "Phase 1: Understanding AI", color: "brand-green", modules: [
                    { n: 0, title: "Welcome to AI",               desc: "Orient yourself - you are here!" },
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
                          <span><span className="font-medium">{title}</span> - <span className="text-muted-foreground text-sm">{desc}</span></span>
                        </li>
                      ))}
               DragSortChallenge
                title="Course Path Builder"
                description="Drag each phase into the recommended learning sequence."
                items={[
                  "Thinking and Building",
                  "Understanding AI",
                  "Using AI",
                ]}
                correctOrder={[
                  "Understanding AI",
                  "Using AI",
                  "Thinking and Building",
                ]}
              />
              <     </ul>
                  </Card>
                ))}
              </div>
              <Card className="p-4 bg-brand-orange/5 border-brand-orange/20">
                <h3 className="font-semibold mb-3 text-brand-orange">Estimated time</h3>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  {[
                    { label: "Per module", time: "20-40 min" },
                    { label: "Full course", time: "3-5 hours" },
                    { label: "Weekend sprint", time: "Achievable" },
                  ].map(({ label, time }) => (
                    <div key={label} className="text-center p-3 bg-white rounded-lg border">
                      <p className="text-muted-foreground text-xs mb-1">{label}</p>
                      <p className="font-bold text-brand-orange">{time}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">How to Use This Course</h2>
              <TextDisplay content="You will get the most out of this course if you follow a few simple guidelines:" />
              <div className="space-y-3">
                {[
                  { n: "1", tip: "Go in order", desc: "Each module builds on the previous one. Start from Module 0 and work your way through." },
                  { n: "2", tip: "Do the exercises", desc: "The quizzes and matching games are not decoration - they are how your brain actually locks in the knowledge." },
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
              
              
              
              
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Summary & Next Steps</h2>
              <TextDisplay variant="success" content="You have completed Module 0! You now know what this course covers and how to use it." />
              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Brain className="h-5 w-5 text-brand-orange" /> Key Takeaways</h3>
                <ul className="space-y-2">
                  {[
                    "AI is already in your everyday life - from your phone to your email",
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
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand-orange" /> Preview: Key Terms You Will Master</h3>
                <p className="text-sm text-muted-foreground mb-4">Flip each card to get a sneak peek at the AI vocabulary you will understand by the end of this course.</p>
                
              </div>
              <TextDisplay variant="callout" content="Up next: Module 1 - What Is Artificial Intelligence? We will give AI a real definition, look at its history, and bust some popular myths." />
              <div className="flex gap-4">
                <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  Complete Module and Go to Module 1
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
