/**
 * MODULE 0: WELCOME TO AI
 * Introductory module - no prior knowledge required
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import NextImage from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DragSortChallenge, FlipCardGrid, MatchingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Sparkles, Smartphone, Car, ShoppingCart, Music, MessageSquare, Image, Brain, Zap, Globe, Stethoscope, Mic, Search, MapPinned, Users, PenSquare, Code2, Target, Clock3, Rocket } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"

export default function Module0Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-0"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const currentSection = sections[currentSectionIndex]
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  const selfAssessmentQuestions = useMemo(
    () => [
      {
        key: "confidence",
        prompt: "How confident are you explaining AI in plain language today?",
        options: [
          { id: "a", label: "Not confident yet", score: 1 },
          { id: "b", label: "Somewhat confident", score: 2 },
          { id: "c", label: "Confident", score: 3 },
        ],
      },
      {
        key: "habits",
        prompt: "When an AI answer looks great, what do you usually do?",
        options: [
          { id: "a", label: "Use it immediately", score: 1 },
          { id: "b", label: "Skim and sanity-check it", score: 2 },
          { id: "c", label: "Verify important facts before using", score: 3 },
        ],
      },
      {
        key: "practice",
        prompt: "How often do you experiment with new tools hands-on?",
        options: [
          { id: "a", label: "Rarely", score: 1 },
          { id: "b", label: "Sometimes", score: 2 },
          { id: "c", label: "Regularly", score: 3 },
        ],
      },
      {
        key: "mindset",
        prompt: "Which mindset best matches successful AI learners?",
        options: [
          { id: "a", label: "Find one perfect prompt once", score: 1 },
          { id: "b", label: "Iterate, test, and refine", score: 3 },
          { id: "c", label: "Wait until I feel fully ready", score: 1 },
        ],
      },
    ],
    []
  )

  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({})
  const [aiTouchpoints, setAiTouchpoints] = useState(["", "", ""])
  const [courseSystemChecks, setCourseSystemChecks] = useState<string[]>([])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [currentSectionIndex, sectionParam, sections])

  const assessmentAnsweredCount = Object.keys(assessmentAnswers).length
  const assessmentComplete = assessmentAnsweredCount === selfAssessmentQuestions.length
  const assessmentScore = selfAssessmentQuestions.reduce((sum, question) => {
    const selected = question.options.find((option) => option.id === assessmentAnswers[question.key])
    return sum + (selected?.score || 0)
  }, 0)

  const assessmentProfile =
    assessmentScore <= 6
      ? "Explorer profile: perfect start point. You will build confidence fast with short daily reps."
      : assessmentScore <= 9
        ? "Builder profile: strong habits forming. Focus on consistency and verification."
        : "Accelerator profile: you already think like an effective AI user. Push into advanced prompts quickly."

  const hasThreeTouchpoints = aiTouchpoints.every((entry) => entry.trim().length >= 8)
  const courseSystemReady = courseSystemChecks.length >= 2

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [3, 4],
  })

  useEffect(() => {
    if (assessmentComplete && hasThreeTouchpoints && courseSystemReady) {
      markSectionInteractionComplete(3)
    }
  }, [assessmentComplete, hasThreeTouchpoints, courseSystemReady, markSectionInteractionComplete])

  const handleSectionComplete = () => {
    if (!canAdvance) {
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
      router.push(`/course/module-0?section=${next.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const mainExplainerAttributes = getExplainerAttributes({
    type: "Module workspace",
    title: "Module 0: Welcome to AI",
    summary: currentSection
      ? `You are viewing ${currentSection.title}, section ${currentSectionIndex + 1} of ${totalSections} in Module 0.`
      : "This module introduces the course structure, learning mindset, and practical reasons to study AI now.",
    details: [
      `Completed sections so far: ${completedSectionIds.length} of ${totalSections}.`,
      "Clicks inside this page usually resolve either to the current lesson context or to the reusable learning component you selected.",
    ],
    interaction: "Work through the current section, complete the checkpoint interactions, and use the continue controls to move forward.",
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main {...mainExplainerAttributes} className="flex-1 p-8 max-w-4xl mx-auto">

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 0: Welcome to AI</h1>
            <p className="text-lg text-muted-foreground mb-4">Your beginner-friendly starting point</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <Card componentId="m0-hero-visual-guide" className="mb-8 overflow-hidden border-brand-indigo/20 bg-white/90">
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
                    src="/images/modules/module-0.jpg"
                    alt="AI technology and artificial intelligence concepts"
                    width={960}
                    height={340}
                    className="h-auto w-full rounded-xl border border-brand-indigo/10 bg-white object-cover"
                  />
                </div>
              </div>
            </Card>
          )}

          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Why AI Matters Right Now</h2>
              <TextDisplay
                variant="callout"
                content="You are not behind. You are early enough to benefit. AI is reshaping work, creativity, and decisions, and practical AI habits built now can compound quickly."
              />
              <TextDisplay content="Think of this module as your launchpad: move from uncertainty to clarity, then from clarity to action. No coding background required." />
              <Card componentId="m0-why-ai-shift" className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand-orange" /> The shift happening around you</h3>
                <ul className="space-y-3">
                  {[
                    "Search is becoming answer-first instead of link-first.",
                    "Writing is becoming draft-first instead of blank-page-first.",
                    "Coding is becoming intent-first instead of syntax-first.",
                    "Teams are hiring for AI fluency, not just years of experience.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-brand-orange" /> Fast reality check</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { stat: "100M users", detail: "Generative AI reached mass adoption faster than nearly any consumer software wave." },
                    { stat: "30+ times/day", detail: "Most people already interact with AI dozens of times daily without explicitly noticing it." },
                    { stat: "Every industry", detail: "Healthcare, law, finance, education, and retail are redesigning workflows with AI." },
                    { stat: "Beginner edge", detail: "Learners who build prompting and verification habits now create leverage that compounds." },
                  ].map(({ stat, detail }) => (
                    <Card key={stat} className="p-4 border-l-4 border-l-brand-orange">
                      <p className="text-2xl font-black text-brand-orange mb-1">{stat}</p>
                      <p className="text-sm text-muted-foreground">{detail}</p>
                    </Card>
                  ))}
                </div>
              </div>
              <Card componentId="m0-microwins-intro" className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Micro-wins in this section</h3>
                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  {[
                    "Micro-win 1: You can explain why AI matters now in one sentence.",
                    "Micro-win 2: You can name one place AI is changing your future role.",
                    "Micro-win 3: You see this course as skill-building, not theory-only.",
                    "Micro-win 4: You have a clear reason to keep going past the hype cycle.",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border bg-white p-3 text-muted-foreground">{item}</div>
                  ))}
                </div>
              </Card>
              <QuickCheckCard
                prompt="Which statement captures the biggest beginner opportunity in AI right now?"
                options={[
                  { id: "a", label: "Wait until AI tools stop changing before learning" },
                  { id: "b", label: "Build practical AI habits now while the field is still early" },
                  { id: "c", label: "AI is only relevant for software engineers" },
                  { id: "d", label: "Prompting matters less than technical jargon" },
                ]}
                correctOptionId="b"
                componentId="m0-why-ai-matters-check"
                                optionExplanations={{
          a: "Waiting makes things harder — the field will keep changing. Early movers build habits and advantages while others pause.",
          b: "Exactly. Early practical fluency compounds and creates leverage in study and work.",
          c: "AI is transforming every industry. Writers, managers, teachers, and healthcare workers all benefit from AI fluency.",
          d: "Prompting is actually one of the most important practical skills. The right framing produces dramatically better results.",
        }}
                explanation="Exactly. Early practical fluency compounds and creates leverage in study and work."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Card componentId="m0-success-by-week" className="p-6 border-brand-indigo/20 bg-gradient-to-br from-brand-indigo/5 to-brand-green/5">
                <h3 className="text-lg font-semibold mb-3 text-brand-indigo">What success looks like by the end of this week</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    "Explain AI in plain language to a friend in under 60 seconds",
                    "Identify three daily tools that already use AI behind the scenes",
                    "Run one low-risk AI workflow (summary, draft, or checklist)",
                    "Use a verification habit before trusting any important output",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border bg-white p-3 text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Got it - let's go!
              </Button>
            </div>
          )}

          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">A Day in Your Life With AI</h2>
              <TextDisplay content="You likely used AI before breakfast. Walk through this day and notice how often AI quietly shapes decisions." />
              <Card componentId="m0-day-in-life-card" className="p-5 border-brand-orange/20 bg-gradient-to-br from-brand-orange/5 to-white">
                <h3 className="font-semibold mb-4 text-brand-orange">From morning to night</h3>
                <div className="space-y-3">
                  {[
                    { icon: Search, label: "7:30 AM - Search", detail: "You type a question, and search AI interprets intent, rewrites the query, and ranks results.", id: "m0-daily-ai-search" },
                    { icon: MapPinned, label: "8:10 AM - Maps", detail: "Traffic models predict congestion and reroute you before delays happen.", id: "m0-daily-ai-maps" },
                    { icon: Users, label: "12:20 PM - Social Media", detail: "Feed ranking decides what appears first, what gets buried, and what goes viral.", id: "m0-daily-ai-social" },
                    { icon: PenSquare, label: "2:00 PM - Writing", detail: "Autocomplete, grammar suggestions, and rewrite tools help draft faster.", id: "m0-daily-ai-writing" },
                    { icon: Code2, label: "4:30 PM - Coding", detail: "Coding assistants propose snippets, tests, and refactors from your context.", id: "m0-daily-ai-coding" },
                  ].map(({ icon: Icon, label, detail, id }) => (
                    <div key={label} className="flex items-start gap-3 rounded-lg border bg-white p-3" {...(id ? { "data-explainer-id": id } : {})}>
                      <div className="mt-0.5 rounded-md bg-brand-orange/10 p-2">
                        <Icon className="h-4 w-4 text-brand-orange" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{label}</p>
                        <p className="text-sm text-muted-foreground">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
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
              <TextDisplay variant="callout" content="Key insight: AI is not one app. It is an invisible layer embedded across products you already use." />
              <MatchingChallenge
                title="Day-In-The-Life Match"
                description="Match each daily moment to the role AI plays behind the scenes."
                pairs={[
                  {
                    id: "navigation",
                    left: "Maps during commute",
                    right: "Predict traffic and suggest faster routes",
                  },
                  {
                    id: "spam",
                    left: "Inbox management",
                    right: "Classify messages as likely unwanted content",
                  },
                  {
                    id: "recommendation",
                    left: "Social or shopping feeds",
                    right: "Rank options based on similar behavior patterns",
                  },
                ]}
              />
              <Card componentId="m0-ai-visibility-categories" className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">How visible is the AI?</h3>
                <p className="text-sm text-muted-foreground mb-3">Not all AI feels the same. Sometimes it is obvious, and sometimes it disappears into the product experience.</p>
                <div className="space-y-2 text-sm">
                  {[
                    { level: "Highly visible", example: "Chat assistants, image generators, coding copilots" },
                    { level: "Partly visible", example: "Smart reply, autocomplete, writing suggestions" },
                    { level: "Mostly invisible", example: "Fraud scoring, ranking feeds, search relevance, spam detection" },
                  ].map(({ level, example }) => (
                    <div key={level} className="flex gap-3 border-b last:border-0 py-2">
                      <span className="w-32 flex-shrink-0 font-medium text-brand-orange">{level}</span>
                      <span className="text-muted-foreground">{example}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Your Transformation Arc</h2>
              <TextDisplay content="This course is a clear before-and-after journey: from curious beginner to practical AI user who can solve real tasks responsibly." />
              <Card componentId="m0-before-and-after" className="p-5 border-brand-green/20 bg-gradient-to-br from-brand-green/5 to-white">
                <h3 className="font-semibold text-brand-green mb-3">Before and After</h3>
                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  <div className="rounded-lg border bg-white p-4">
                    <p className="font-semibold mb-2 text-brand-orange">Before this course</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>AI feels impressive but confusing.</li>
                      <li>You are unsure what to trust.</li>
                      <li>You do not have a repeatable workflow.</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border bg-white p-4">
                    <p className="font-semibold mb-2 text-brand-green">After this course</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>You can prompt clearly and iterate quickly.</li>
                      <li>You verify outputs and reduce risk.</li>
                      <li>You can apply AI to study, work, and projects right away.</li>
                    </ul>
                  </div>
                </div>
              </Card>
              <div className="space-y-4">
                {[
                  { phase: "Phase 1: Understanding AI", color: "brand-green", modules: [
                    { n: 0, title: "Welcome to AI",               desc: "Orient yourself - you are here!", id: "m0-transformation-phase-1" },
                    { n: 1, title: "What Is AI?",                 desc: "Definitions, history, and types of AI" },
                    { n: 2, title: "How Machines Learn",          desc: "Training data, neural nets, and AI limits" },
                  ]},
                  { phase: "Phase 2: Using AI", color: "brand-orange", modules: [
                    { n: 3, title: "LLMs & Prompting",            desc: "How ChatGPT works and how to talk to it well", id: "m0-transformation-phase-2" },
                    { n: 4, title: "AI Tools for Everyday Life",  desc: "Writing, images, productivity tools" },
                  ]},
                  { phase: "Phase 3: Thinking & Building", color: "brand-green", modules: [
                    { n: 5, title: "AI Ethics, Safety & Society", desc: "Bias, privacy, and responsible use", id: "m0-transformation-phase-3" },
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
                    </ul>
                  </Card>
                ))}
              </div>
              <DragSortChallenge
                title="Transformation Sequence"
                description="Arrange the phases in the order that creates the strongest skill growth."
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
              <Card componentId="m0-capabilities-outcome" className="p-4 bg-brand-orange/5 border-brand-orange/20">
                <h3 className="font-semibold mb-3 text-brand-orange\">What you will be able to do after this course</h3>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  {[
                    { label: "Communication", time: "Explain AI concepts clearly to non-technical people" },
                    { label: "Execution", time: "Use AI for writing, research, and workflow acceleration" },
                    { label: "Judgment", time: "Spot weak outputs and verify before acting" },
                  ].map(({ label, time }) => (
                    <div key={label} className="text-center p-3 bg-white rounded-lg border">
                      <p className="text-muted-foreground text-xs mb-1">{label}</p>
                      <p className="font-bold text-brand-orange">{time}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card componentId="m0-microwins-transformation" className="p-5 border-brand-green/20 bg-brand-green/5\">\n                <h3 className=\"font-semibold mb-3 text-brand-green\">Micro-wins for this section</h3>
                    <div key={plan} className="rounded-lg border bg-white p-3">
                      <p className="font-medium text-brand-orange mb-1">{plan}</p>
                      <p className="text-muted-foreground text-xs">{cadence}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">How to Take This Course Effectively</h2>
              <TextDisplay content="Treat this course like a training system, not passive reading. Keep sessions short, hands-on, and consistent." />
              <Card componentId="m0-learning-system" className="p-5 border-brand-orange/20 bg-gradient-to-br from-brand-orange/5 to-white">
                <h3 className="font-semibold mb-4 text-brand-orange">Your practical system</h3>
                <div className="grid gap-3 md:grid-cols-3 text-sm">
                  <Card componentId="m0-learning-system-time" className="p-3 bg-white rounded-lg mt-0.5">
                <p className="font-medium mb-1 flex items-center gap-2"><Clock3 className="h-4 w-4 text-brand-orange" /> Time</p>
                    <p className="text-muted-foreground">20-30 minutes per session, 4-5 sessions per week.</p>
                  </div>
                  <Card componentId="m0-learning-system-pacing" className="p-3 bg-white rounded-lg mt-0.5">
                    <p className="font-medium mb-1 flex items-center gap-2"><Target className="h-4 w-4 text-brand-orange" /> Pacing</p>
                    <p className="text-muted-foreground">One section at a time. Finish interactions before moving forward.</p>
                  </div>
                  <Card componentId="m0-learning-system-mindset" className="p-3 bg-white rounded-lg mt-0.5">
                    <p className="font-medium mb-1 flex items-center gap-2"><Rocket className="h-4 w-4 text-brand-orange" /> Mindset</p>
                    <p className="text-muted-foreground">Learn by doing: prompt, test, refine, then reflect after each module.</p>
                  </div>
                </div>
              </Card>
              <div className="space-y-3">
                {[
                  { n: "1", tip: "Go in sequence", desc: "Each section compounds. Skipping fundamentals slows you down later.", id: "m0-learning-tips-sequence" },
                  { n: "2", tip: "Collect micro-wins", desc: "After each section, write one practical thing you can now do.", id: "m0-learning-tips-microwins" },
                  { n: "3", tip: "Practice immediately", desc: "Apply each concept in a real tool the same day you learn it.", id: "m0-learning-tips-practice" },
                  { n: "4", tip: "Verify before trust", desc: "Treat AI output as a draft until key facts and context are checked.", id: "m0-learning-tips-verify" },
                  { n: "5", tip: "Keep momentum", desc: "Consistency beats intensity. Short daily sessions win.", id: "m0-learning-tips-momentum" },
                ].map(({ n, tip, desc, id }) => (
                  <Card key={n} componentId={id} className="p-4 flex gap-3 items-start">
                    <span className="bg-brand-green text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{n}</span>
                    <div><p className="font-semibold">{tip}</p><p className="text-sm text-muted-foreground">{desc}</p></div>
                  </Card>
                ))}
              </div>
              <Card componentId="m0-self-assessment-form" className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold text-brand-green mb-2">Interactive self-assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">Answer all questions to reveal your current learning profile.</p>
                <p className="text-xs text-muted-foreground mb-3">Progress: {assessmentAnsweredCount}/{selfAssessmentQuestions.length}</p>
                <div className="space-y-4">
                  {selfAssessmentQuestions.map((question) => (
                    <Card key={question.key} className="p-4">
                      <p className="text-sm font-medium mb-3">{question.prompt}</p>
                      <div className="grid gap-2 md:grid-cols-3">
                        {question.options.map((option) => {
                          const isSelected = assessmentAnswers[question.key] === option.id
                          return (
                            <Button
                              key={option.id}
                              type="button"
                              variant="outline"
                              className={isSelected ? "border-green-600 bg-green-50 text-green-900 hover:bg-green-50" : "h-auto whitespace-normal text-left"}
                              onClick={() => {
                                setAssessmentAnswers((prev) => ({ ...prev, [question.key]: option.id }))
                              }}
                            >
                              {option.label}
                            </Button>
                          )
                        })}
                      </div>
                    </Card>
                  ))}
                </div>

                {assessmentComplete ? (
                  <div className="mt-4 rounded-lg border border-green-500/30 bg-green-50 p-4">
                    <p className="text-sm font-semibold text-green-800">Your current profile</p>
                    <p className="text-sm text-green-700">{assessmentProfile}</p>
                  </div>
                ) : null}
              </Card>

              <Card componentId="m0-ai-touchpoints-action" className="p-5 border-brand-indigo/20 bg-gradient-to-br from-brand-indigo/5 to-white">
                <h3 className="font-semibold text-brand-indigo mb-2">Action task: find 3 ways you already interact with AI</h3>
                <p className="text-sm text-muted-foreground mb-4">Write one specific example in each box. Be concrete, for example: "Maps rerouting my commute".</p>
                <div className="space-y-3">
                  {aiTouchpoints.map((value, index) => (
                    <Input
                      key={`touchpoint-${index}`}
                      value={value}
                      onChange={(event) => {
                        const next = [...aiTouchpoints]
                        next[index] = event.target.value
                        setAiTouchpoints(next)
                      }}
                      placeholder={`AI touchpoint ${index + 1}`}
                    />
                  ))}
                </div>
                {!hasThreeTouchpoints ? (
                  <p className="mt-3 text-xs text-muted-foreground">Add three specific examples to complete this task.</p>
                ) : (
                  <p className="mt-3 text-xs text-green-700">Nice work. You just made AI visible in your own day.</p>
                )}
              </Card>

              <Card componentId="m0-learning-commitment" className="p-5">
                <h3 className="font-semibold mb-3">Commit to your learning system</h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {[
                    "I will schedule at least four 20-30 minute sessions each week.",
                    "I will complete interactions before moving to the next section.",
                    "I will test one real-world use case each module.",
                    "I will verify important outputs before I trust them.",
                  ].map((item) => {
                    const checked = courseSystemChecks.includes(item)
                    return (
                      <Button
                        key={item}
                        type="button"
                        variant="outline"
                        className={checked ? "justify-start h-auto whitespace-normal border-green-600 bg-green-50 text-green-900 hover:bg-green-50" : "justify-start h-auto whitespace-normal text-left"}
                        onClick={() => {
                          setCourseSystemChecks((prev) =>
                            prev.includes(item) ? prev.filter((entry) => entry !== item) : [...prev, item]
                          )
                        }}
                      >
                        {item}
                      </Button>
                    )
                  })}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Select at least two commitments to unlock the next section.</p>
              </Card>
              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the self-assessment, add 3 touchpoints, and choose at least 2 commitments to continue.</p> : null}
              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Summary & Next Steps</h2>
              <TextDisplay variant="success" content="You have completed Module 0. You now have context, momentum, and a practical system for learning AI effectively." />
              <Card componentId="m0-key-takeaways" className="p-6 space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Brain className="h-5 w-5 text-brand-orange" /> Key Takeaways</h3>
                <ul className="space-y-2">
                  {[
                    "AI already shapes your day across search, maps, social, writing, and coding",
                    "You have a clear transformation path from beginner to practical AI user",
                    "Your results depend on pacing, hands-on reps, and verification habits",
                    "You have identified your own AI touchpoints and committed to a learning system",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand-orange" /> Preview: Your next leap</h3>
                <p className="text-sm text-muted-foreground mb-4">Flip each card for a quick preview of concepts you will master next.</p>
                <FlipCardGrid
                  cards={[
                    {
                      title: "Definition",
                      prompt: "What is AI, really?",
                      answer: "In this course, AI is software that performs tasks requiring human-like intelligence such as prediction, language, and pattern recognition.",
                    },
                    {
                      title: "Myth vs Reality",
                      prompt: "What trap will you avoid?",
                      answer: "You will learn to separate hype from capability so you can use AI with better judgment.",
                    },
                    {
                      title: "Prompting",
                      prompt: "What skill unlocks better output?",
                      answer: "Specific context, clear constraints, and iterative follow-up prompts create dramatically better results.",
                    },
                    {
                      title: "Safety",
                      prompt: "What keeps AI useful?",
                      answer: "Verification, privacy awareness, and responsible use habits protect you from avoidable mistakes.",
                    },
                  ]}
                />
              </div>
              <TextDisplay variant="callout" content="Up next: Module 1 - What Is Artificial Intelligence? We will give AI a real definition, look at its history, and bust some popular myths." />
              <QuickCheckCard
                prompt="Before moving on, what is the most important mindset for Module 1?"
                options={[
                  { id: "a", label: "Treat AI as distant theory only" },
                  { id: "b", label: "Focus on practical understanding and challenge common myths" },
                  { id: "c", label: "Skip fundamentals and go straight to advanced coding" },
                  { id: "d", label: "Assume all AI claims are automatically true" },
                ]}
                correctOptionId="b"
                componentId="m0-next-module-check"
                                optionExplanations={{
          a: "Treating AI as pure theory means you will never build the practical skill that makes the difference.",
          b: "Perfect. The next module builds practical understanding by defining AI clearly and separating hype from reality.",
          c: "Skipping fundamentals leads to fragile, unreliable use. Foundations make advanced work faster, not slower.",
          d: "Assuming all AI claims are true is one of the most common traps. Critical thinking about AI output is an essential skill.",
        }}
                explanation="Perfect. The next module builds practical understanding by defining AI clearly and separating hype from reality."
                onAnswered={() => {
                  markSectionInteractionComplete(4)
                }}
              />
              <Card componentId="m0-completion-checklist" className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Module 0 completion checklist</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    "I can explain what this course covers in three phases",
                    "I understand why section order and interactions matter",
                    "I can name at least three everyday AI touchpoints",
                    "I am ready to challenge myths instead of memorizing hype",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border bg-white p-3 text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the check-in to finish this module.</p> : null}
              <div className="flex gap-4">
                <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
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
