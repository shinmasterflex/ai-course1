/**
 * MODULE 1: WHAT IS ARTIFICIAL INTELLIGENCE?
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DragSortChallenge, FlipCardGrid, MatchingChallenge, OrderingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { CheckCircle2, Brain, Clock, ExternalLink, Lightbulb } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

type ToolCardProps = {
  name: string
  url: string
  tagline: string
  strengths: string[]
  free: boolean
}

function ToolCard({ name, url, tagline, strengths, free }: ToolCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-muted-foreground">{tagline}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${free ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
          {free ? "Free tier" : "Paid"}
        </span>
      </div>
      <ul className="text-sm space-y-1">
        {strengths.map((strength) => (
          <li key={strength} className="flex gap-1 items-start">
            <CheckCircle2 className="h-3 w-3 text-brand-green mt-0.5 flex-shrink-0" />
            {strength}
          </li>
        ))}
      </ul>
    </Card>
  )
}

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
  const [historyCarouselApi, setHistoryCarouselApi] = useState<CarouselApi>()
  const [historySlideIndex, setHistorySlideIndex] = useState(0)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "matching", "tools-quiz1", "tools-quiz2", "tools-quiz3", "tools-matching"])
  const questions = moduleQuizData[MODULE_ID]
  const historyMilestones = [
    {
      year: "1950",
      label: "The founding question",
      title: "Alan Turing asks \"Can machines think?\"",
      summary: "Alan Turing published Computing Machinery and Intelligence and introduced the Turing Test: a machine passes if a human cannot distinguish it from another human in text conversation.",
      whyItMatters: "This paper set the benchmark for AI research for decades: not raw calculation, but human-like performance in language.",
      accent: "brand-green",
      markerClassName: "bg-brand-green",
      borderClassName: "border-brand-green/30",
      surfaceClassName: "bg-gradient-to-br from-brand-green/10 via-background to-background",
    },
    {
      year: "1956",
      label: "The field is born",
      title: "The Dartmouth Conference gives AI its name",
      summary: "John McCarthy, Marvin Minsky, Claude Shannon, and others gathered for a summer workshop where McCarthy coined the term Artificial Intelligence.",
      whyItMatters: "The ambition was enormous: they thought human-level intelligence might be solved within 20 years. That optimism shaped decades of funding and disappointment.",
      accent: "brand-orange",
      markerClassName: "bg-brand-orange",
      borderClassName: "border-brand-orange/30",
      surfaceClassName: "bg-gradient-to-br from-brand-orange/10 via-background to-background",
    },
    {
      year: "1966",
      label: "The first chatbot",
      title: "ELIZA shows how easily humans project intelligence",
      summary: "Joseph Weizenbaum built ELIZA, a program that reflected users' sentences back as questions. People still formed emotional attachments to it.",
      whyItMatters: "ELIZA exposed a lasting pattern: even simple systems can feel intelligent if they mimic the right conversational cues.",
      accent: "brand-green",
      markerClassName: "bg-brand-green",
      borderClassName: "border-brand-green/30",
      surfaceClassName: "bg-gradient-to-br from-brand-green/10 via-background to-background",
    },
    {
      year: "1974-1993",
      label: "The AI winters",
      title: "Hype collapses twice when promises outrun reality",
      summary: "Funding and public interest crashed during two long AI winters after early systems failed to scale and expert systems proved brittle and expensive.",
      whyItMatters: "This is why serious AI work still treats hype with caution. The field has already survived multiple boom-and-bust cycles.",
      accent: "red",
      markerClassName: "bg-red-500",
      borderClassName: "border-red-300 dark:border-red-800",
      surfaceClassName: "bg-gradient-to-br from-red-50 via-background to-background dark:from-red-950/30 dark:via-background dark:to-background",
    },
    {
      year: "1986",
      label: "The missing algorithm",
      title: "Backpropagation makes neural networks trainable",
      summary: "Rumelhart, Hinton, and Williams published a practical method for teaching multi-layer neural networks by learning from mistakes.",
      whyItMatters: "The core idea of modern deep learning existed decades early. The hardware just was not ready yet.",
      accent: "brand-orange",
      markerClassName: "bg-brand-orange",
      borderClassName: "border-brand-orange/30",
      surfaceClassName: "bg-gradient-to-br from-brand-orange/10 via-background to-background",
    },
    {
      year: "1997",
      label: "Narrow AI wins big",
      title: "Deep Blue defeats world chess champion Garry Kasparov",
      summary: "IBM's system beat the reigning champion by evaluating 200 million positions per second using handcrafted chess rules.",
      whyItMatters: "It proved machines could outperform top humans in tightly defined domains, even without human-like understanding.",
      accent: "brand-green",
      markerClassName: "bg-brand-green",
      borderClassName: "border-brand-green/30",
      surfaceClassName: "bg-gradient-to-br from-brand-green/10 via-background to-background",
    },
    {
      year: "2012",
      label: "Deep learning takes over",
      title: "AlexNet turns ImageNet into a watershed moment",
      summary: "A GPU-trained deep neural network dramatically outperformed every other image-recognition approach in the ImageNet competition.",
      whyItMatters: "This was the tipping point that pushed the whole industry toward deep learning as the default approach for AI.",
      accent: "brand-orange",
      markerClassName: "bg-brand-orange",
      borderClassName: "border-brand-orange/30",
      surfaceClassName: "bg-gradient-to-br from-brand-orange/10 via-background to-background",
    },
    {
      year: "2017",
      label: "The transformer era",
      title: "Attention Is All You Need rewrites modern AI",
      summary: "Google Brain introduced the Transformer architecture, replacing older recurrent models with attention mechanisms that scale far better.",
      whyItMatters: "ChatGPT, Claude, Gemini, and LLaMA all build on this same architectural shift.",
      accent: "brand-green",
      markerClassName: "bg-brand-green",
      borderClassName: "border-brand-green/30",
      surfaceClassName: "bg-gradient-to-br from-brand-green/10 via-background to-background",
    },
    {
      year: "2022-present",
      label: "AI goes mainstream",
      title: "ChatGPT brings general-purpose AI to the public",
      summary: "Consumer chat interfaces made advanced AI instantly usable for people with no technical background, and adoption exploded.",
      whyItMatters: "The current era is defined by rapid deployment, capability jumps, and an active fight over how these systems should be used and governed.",
      accent: "brand-orange",
      markerClassName: "bg-brand-orange",
      borderClassName: "border-brand-orange/30",
      surfaceClassName: "bg-gradient-to-br from-brand-orange/10 via-background to-background",
    },
  ]

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

  useEffect(() => {
    if (!historyCarouselApi) return

    const updateHistorySlide = () => {
      setHistorySlideIndex(historyCarouselApi.selectedScrollSnap())
    }

    updateHistorySlide()
    historyCarouselApi.on("select", updateHistorySlide)
    historyCarouselApi.on("reInit", updateHistorySlide)

    return () => {
      historyCarouselApi.off("select", updateHistorySlide)
      historyCarouselApi.off("reInit", updateHistorySlide)
    }
  }, [historyCarouselApi])

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [4],
  })

  const handleSectionComplete = () => {
    if (!canAdvance) {
      return
    }

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

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 1"
              title="Build the foundation for everything that follows"
              description="Get clear on what AI is, where it came from, and how to separate practical reality from hype."
              imageSrc="/images/modules/module-1.jpg"
              imageAlt="Machine learning and artificial intelligence concepts"
            />
          )}

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
              <QuickCheckCard
                prompt="What is the primary goal of this module?"
                options={[
                  { id: "a", label: "Memorize AI buzzwords without application" },
                  { id: "b", label: "Build a practical foundation and separate AI reality from hype" },
                  { id: "c", label: "Learn advanced model training math" },
                  { id: "d", label: "Replace all workflows with automation immediately" },
                ]}
                correctOptionId="b"
                explanation="Exactly. This module is about useful mental models and practical clarity, not hype or heavy math."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: Defining AI */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Defining AI</h2>
              <TextDisplay content="Artificial Intelligence (AI) is software that performs specific tasks that used to require human intelligence, such as understanding language, spotting patterns, making predictions, or helping with decisions." />
              <TextDisplay variant="callout" content="Useful analogy: think of a human expert as a seasoned chef who understands ingredients, taste, context, and tradeoffs. Think of modern AI as an extremely fast prep assistant trained on millions of recipes. It can slice, sort, and suggest at scale, but it does not truly taste, care, or understand consequences the way the chef does." />
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

              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Two truths to hold at the same time</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-brand-orange mb-1">Truth 1: AI is genuinely useful</p>
                    <p className="text-muted-foreground">It can save hours on drafting, search, classification, and routine analysis when tasks are pattern-heavy and goals are clear.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-brand-orange mb-1">Truth 2: AI is not human understanding</p>
                    <p className="text-muted-foreground">It can sound confident while missing context, values, and real-world constraints. Human judgment is still required for quality and accountability.</p>
                  </div>
                </div>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><Brain className="h-5 w-5 text-brand-green" /> The Five Capability Buckets</h3>
                <p className="text-sm text-muted-foreground mb-4">When people say AI can do "intelligent tasks," they usually mean one of these five buckets. Most systems are very good in one or two buckets, not all five:</p>
                <div className="space-y-3">
                  {[
                    { category: "Perception", examples: "Face recognition, speech recognition, reading handwriting, detecting objects in photos", how: "The AI is trained on millions of labelled examples until it can reliably identify what it sees or hears." },
                    { category: "Language", examples: "Translation, summarisation, answering questions, writing, code generation", how: "Large language models learn patterns across billions of words and can generate fluent, contextually appropriate text." },
                    { category: "Reasoning & Problem-Solving", examples: "Playing chess, diagnosing a disease from symptoms, recommending the best route", how: "AI reasons within a defined problem space using learned patterns, logic rules, or search algorithms - not lived understanding." },
                    { category: "Learning", examples: "A spam filter that improves as you mark more emails; a recommendation engine that refines over time", how: "Machine learning algorithms adjust model weights based on new data and feedback, improving performance without being reprogrammed." },
                    { category: "Action", examples: "Self-driving cars braking for a pedestrian, a robot arm sorting packages, an AI agent booking a flight", how: "Combines perception and reasoning to control physical or digital systems in real time." },
                  ].map(({ category, examples, how }) => (
                    <Card key={category} className="p-4">
                      <div className="space-y-3">
                        <span className="inline-flex w-fit rounded bg-brand-orange px-2 py-1 text-xs font-bold text-white">{category}</span>
                        <div className="space-y-1">
                          <p className="text-sm"><span className="font-medium">Examples:</span> <span className="text-muted-foreground">{examples}</span></p>
                          <p className="text-sm"><span className="font-medium">How AI does it:</span> <span className="text-muted-foreground">{how}</span></p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Three core AI categories you will see everywhere</h3>
                <div className="space-y-3 text-sm">
                  {[
                    {
                      name: "Computer Vision",
                      in: "Pixels from images or video",
                      out: "Labels, detections, or generated visuals",
                      examples: "Phone face unlock, quality inspection in factories, radiology image support, self-checkout cameras",
                      limit: "Strong on repeated visual patterns; weaker when context is unusual or ambiguous.",
                    },
                    {
                      name: "Natural Language Processing (NLP)",
                      in: "Text or speech",
                      out: "Summaries, translations, classifications, answers, drafts",
                      examples: "Customer support chatbots, email summarizers, translation apps, contract clause extraction",
                      limit: "Can produce fluent but incorrect statements, especially when facts are uncertain.",
                    },
                    {
                      name: "Recommendation Systems",
                      in: "Behavior data (clicks, views, purchases, likes)",
                      out: "Ranked suggestions",
                      examples: "Netflix watch lists, Spotify playlists, Amazon product suggestions, YouTube home feed",
                      limit: "Can over-personalize and create filter bubbles if not designed carefully.",
                    },
                  ].map((item) => (
                    <div key={item.name} className="rounded-lg border bg-background p-3">
                      <p className="font-semibold text-brand-green mb-1">{item.name}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Input:</span> {item.in}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Output:</span> {item.out}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Common examples:</span> {item.examples}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Reality check:</span> {item.limit}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">AI vs. Traditional Software vs. Human Intelligence</h3>
                <p className="text-sm text-muted-foreground mb-3">One of the most useful mental models is understanding how these three differ in practice:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">Dimension</th>
                        <th className="text-left py-2 pr-4 font-semibold text-brand-orange">Traditional Software</th>
                        <th className="text-left py-2 pr-4 font-semibold text-brand-green">AI / Machine Learning</th>
                        <th className="text-left py-2 font-semibold text-blue-600">Human Intelligence</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {[
                        { dim: "How it learns", trad: "Rules written by a programmer", ai: "Learns patterns from examples in data", human: "Experience, reflection, teaching" },
                        { dim: "Handles new situations", trad: "Breaks if rules do not cover it", ai: "Generalises from training - may fail unexpectedly", human: "Adapts flexibly with common sense" },
                        { dim: "Knows what it does not know", trad: "Throws a predictable error", ai: "Often answers confidently even when wrong", human: "Usually aware of own uncertainty" },
                        { dim: "Speed", trad: "Very fast, deterministic", ai: "Fast; can be real-time or near-real-time", human: "Slow compared to computing" },
                        { dim: "Best for", trad: "Clear, rule-based tasks that never change", ai: "Pattern-heavy tasks with lots of example data", human: "Judgment, ethics, novelty, relationships" },
                      ].map(({ dim, trad, ai, human }) => (
                        <tr key={dim} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-medium text-foreground">{dim}</td>
                          <td className="py-2 pr-4">{trad}</td>
                          <td className="py-2 pr-4">{ai}</td>
                          <td className="py-2">{human}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Key takeaway: AI fills the gap between rigid traditional software and flexible human thinking - but it is not the same as human thinking.</p>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Mini case studies from the real world</h3>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  {[
                    {
                      title: "Hospital imaging triage",
                      setup: "A radiology team receives thousands of scans weekly.",
                      aiRole: "A vision model flags scans likely to need urgent review first.",
                      humanRole: "Radiologists still make diagnosis and final clinical decision.",
                      result: "Faster triage, but only safe with expert oversight and auditing.",
                    },
                    {
                      title: "Retail recommendations",
                      setup: "An online store has too many products for users to browse manually.",
                      aiRole: "A recommender ranks products based on similar user behavior.",
                      humanRole: "Teams set business rules, fairness constraints, and promotion strategy.",
                      result: "Higher conversion rates, but risk of over-personalization.",
                    },
                    {
                      title: "Support inbox summarization",
                      setup: "A customer support team receives long multi-message threads.",
                      aiRole: "An NLP model summarizes intent and proposes a response draft.",
                      humanRole: "Agent verifies details, adjusts tone, and sends final answer.",
                      result: "Shorter handling time with better consistency when reviewed.",
                    },
                  ].map(({ title, setup, aiRole, humanRole, result }) => (
                    <div key={title} className="rounded-lg border p-3 bg-background">
                      <p className="font-semibold text-brand-orange mb-2">{title}</p>
                      <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">Situation:</span> {setup}</p>
                      <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">AI does:</span> {aiRole}</p>
                      <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">Humans do:</span> {humanRole}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Outcome:</span> {result}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Why "Pattern Recognition" Is the Core Idea</h3>
                <p className="text-sm text-muted-foreground mb-3">Everything AI does comes down to finding patterns in data and applying them to new inputs. Here is what that looks like in three real examples:</p>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3 border-b pb-3">
                    <span className="font-medium w-36 flex-shrink-0 text-brand-green">Email spam filter</span>
                    <span className="text-muted-foreground">Trained on millions of labeled emails, the model learns that certain words, sender patterns, and link structures strongly predict spam. It applies that pattern to every new email arriving in your inbox.</span>
                  </div>
                  <div className="flex gap-3 border-b pb-3">
                    <span className="font-medium w-36 flex-shrink-0 text-brand-green">Face unlock</span>
                    <span className="text-muted-foreground">Trained on thousands of photos of your face from different angles and lighting, the model learns your unique facial geometry. At unlock time, it compares the camera image to that learned pattern.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium w-36 flex-shrink-0 text-brand-green">ChatGPT reply</span>
                    <span className="text-muted-foreground">Trained on hundreds of billions of words of text, the model learns patterns of language: what words follow other words, how arguments are structured, what a good answer looks like. It then applies those patterns to complete your sentence or answer your question.</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">A practical test: is this actually an AI problem?</h3>
                <p className="text-sm text-muted-foreground mb-3">Use this quick filter whenever someone claims a product is "AI-powered":</p>
                <div className="space-y-2 text-sm">
                  {[
                    "Does it improve after seeing more examples or feedback?",
                    "Is the task pattern-heavy (language, images, prediction, ranking)?",
                    "Would hand-written rules be fragile or too complex to maintain?",
                    "Can outputs vary probabilistically instead of always being deterministic?",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 rounded border bg-background p-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-green" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <QuickCheckCard
                prompt="What is the single most important thing AI systems have in common across all their different tasks?"
                options={[
                  { id: "a", label: "They all use a robot body to interact with the world" },
                  { id: "b", label: "They all find patterns in large amounts of data and apply them to new inputs" },
                  { id: "c", label: "They all genuinely understand the world the same way humans do" },
                  { id: "d", label: "They all browse the internet in real time before answering" },
                ]}
                correctOptionId="b"
                explanation="Pattern recognition in data is the core mechanism behind virtually all AI systems - from spam filters to image generators to language models."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

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
                    {
                      title: "Algorithm",
                      prompt: "What is an algorithm in the context of AI?",
                      answer: "A set of mathematical rules or procedures the AI uses to find patterns in data and improve its predictions over time.",
                    },
                    {
                      title: "Inference",
                      prompt: "What does 'inference' mean when an AI is deployed?",
                      answer: "Inference is when a trained model applies what it learned to new inputs - generating text, classifying an image, or making a prediction in real time.",
                    },
                    {
                      title: "Parameters",
                      prompt: "What are parameters in an AI model?",
                      answer: "Parameters are the millions or billions of numerical values inside a model that were adjusted during training to encode patterns from data. More parameters usually means more capacity to learn.",
                    },
                    {
                      title: "Output",
                      prompt: "What is the 'output' of an AI system?",
                      answer: "The result the AI produces - a text response, an image, a prediction, a classification, or an action. Every AI maps inputs to outputs through its learned patterns.",
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
              <TextDisplay content="AI is not new - researchers have been working on it since the 1950s. The story matters because each wave of progress came from a combination of better ideas, more data, and more computing power. Crucially, the path was not smooth - there were decades of failure, funding collapses, and near-total abandonment before the breakthroughs we see today." />

              <div className="rounded-3xl border border-brand-green/20 bg-gradient-to-br from-brand-green/5 via-background to-brand-orange/5 p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">Interactive Timeline</p>
                    <h3 className="mt-1 text-xl font-semibold text-foreground">Swipe through the turning points that shaped modern AI</h3>
                  </div>
                  <div className="rounded-full border border-brand-green/20 bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                    {historySlideIndex + 1} / {historyMilestones.length}
                  </div>
                </div>

                <Carousel setApi={setHistoryCarouselApi} opts={{ align: "start", loop: false }} className="w-full">
                  <CarouselContent>
                    {historyMilestones.map((milestone) => (
                      <CarouselItem key={milestone.year}>
                        <Card className={`overflow-hidden border ${milestone.borderClassName} ${milestone.surfaceClassName}`}>
                          <div className="grid gap-6 p-6 md:grid-cols-[140px_minmax(0,1fr)] md:p-8">
                            <div className="space-y-3">
                              <div className={`h-2.5 w-16 rounded-full ${milestone.markerClassName}`} />
                              <p className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{milestone.year}</p>
                              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{milestone.label}</p>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="text-2xl font-semibold text-foreground">{milestone.title}</h4>
                                <p className="mt-3 text-base leading-7 text-muted-foreground">{milestone.summary}</p>
                              </div>

                              <div className="rounded-2xl border border-white/60 bg-background/80 p-4 shadow-sm backdrop-blur-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">Why it matters</p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">{milestone.whyItMatters}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-3 top-6 h-10 w-10 translate-y-0 border-brand-green/20 bg-background text-brand-green hover:bg-brand-green/10 md:left-auto md:right-16" />
                  <CarouselNext className="right-3 top-6 h-10 w-10 translate-y-0 border-brand-green/20 bg-background text-brand-green hover:bg-brand-green/10" />
                </Carousel>

                <div className="mt-6 overflow-x-auto pb-2">
                  <div className="flex min-w-max items-start px-2">
                    {historyMilestones.map((milestone, index) => {
                      const isActive = index === historySlideIndex
                      const isCompleted = index < historySlideIndex

                      return (
                        <div key={milestone.year} className="flex min-w-[104px] flex-1 items-start last:flex-none">
                          <button
                            type="button"
                            onClick={() => historyCarouselApi?.scrollTo(index)}
                            className="group flex flex-col items-center text-center"
                            aria-label={`Go to ${milestone.year}: ${milestone.title}`}
                            aria-pressed={isActive}
                          >
                            <span
                              className={isActive
                                ? "flex h-5 w-5 items-center justify-center rounded-full border-4 border-brand-green bg-white shadow-sm transition-all"
                                : isCompleted
                                  ? "flex h-5 w-5 items-center justify-center rounded-full border-4 border-brand-green bg-brand-green transition-all"
                                  : "flex h-5 w-5 items-center justify-center rounded-full border-4 border-brand-green/25 bg-background transition-all group-hover:border-brand-green/50"
                              }
                            />
                            <span
                              className={isActive
                                ? "mt-3 text-sm font-semibold text-foreground"
                                : "mt-3 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground"
                              }
                            >
                              {milestone.year}
                            </span>
                            <span className="mt-1 max-w-[92px] text-[11px] leading-4 text-muted-foreground/80">
                              {milestone.label}
                            </span>
                          </button>

                          {index < historyMilestones.length - 1 && (
                            <div className="mt-2 flex flex-1 items-center px-2">
                              <div className="h-px w-full bg-brand-green/20">
                                <div
                                  className={index < historySlideIndex ? "h-px w-full bg-brand-green" : "h-px w-0 bg-brand-green transition-all"}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">The key figures — AI&apos;s &ldquo;Founding Fathers&rdquo;</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { name: "Alan Turing", role: "Defined the question", detail: "Mathematician who first formally asked whether machines could think. Invented the concept of a universal computing machine." },
                    { name: "John McCarthy", role: "Named the field", detail: "Coined the term 'Artificial Intelligence' at the 1956 Dartmouth Conference. Created the Lisp programming language used in early AI." },
                    { name: "Geoffrey Hinton", role: "Backpropagation & deep learning", detail: "Sometimes called 'The Godfather of Deep Learning.' Spent decades advocating neural networks when they were unfashionable. Won the 2024 Nobel Prize in Physics for his work on neural networks." },
                    { name: "Yann LeCun", role: "Convolutional networks", detail: "Developed CNNs — the architecture that made image recognition practical. Chief AI Scientist at Meta. Vocal skeptic of AGI timelines." },
                    { name: "Yoshua Bengio", role: "Deep learning foundations", detail: "With Hinton and LeCun, won the 2018 Turing Award for deep learning contributions. Has become one of the loudest voices calling for AI safety research." },
                    { name: "Vaswani et al. (8 authors)", role: "The Transformer paper", detail: "The 2017 Google team who invented the Transformer architecture that underpins all modern LLMs. Most have since left Google to found AI companies." },
                  ].map(({ name, role, detail }) => (
                    <div key={name} className="border rounded-lg p-3 bg-background">
                      <p className="font-semibold text-brand-orange">{name}</p>
                      <p className="text-xs text-brand-green font-medium mb-1">{role}</p>
                      <p className="text-muted-foreground text-xs">{detail}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">The pattern to remember</h3>
                <p className="text-sm text-muted-foreground mb-2">AI progress did not follow a straight line. It has been driven by three compounding forces:</p>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  {[
                    { force: "Better algorithms", desc: "From hand-coded rules, to shallow networks, to deep networks, to Transformers - each era found a better way to represent learning." },
                    { force: "More data", desc: "The internet created billions of pages of text, images, and code that could be used for training at a scale previously impossible." },
                    { force: "Cheaper compute", desc: "GPU costs have fallen by 1000x in 20 years. What required a supercomputer in 2000 runs on a consumer graphics card today." },
                  ].map(({ force, desc }) => (
                    <div key={force} className="border rounded-lg p-3 bg-background text-center">
                      <p className="font-semibold text-brand-orange mb-1">{force}</p>
                      <p className="text-muted-foreground text-xs">{desc}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Why history matters for everyday users</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { title: "Expect capability jumps", detail: "Major breakthroughs often look sudden to the public, but they usually come from years of compounding research." },
                    { title: "Expect failures too", detail: "Periods of hype are often followed by disappointment. Build workflows that survive model changes." },
                    { title: "Follow incentives", detail: "Products evolve quickly because research, funding, and competition reinforce one another." },
                    { title: "Stay tool-agnostic", detail: "Core concepts outlast specific apps. Learn principles so your skills transfer to new tools." },
                  ].map(({ title, detail }) => (
                    <div key={title} className="rounded-lg border p-3 bg-background">
                      <p className="font-medium text-brand-green mb-1">{title}</p>
                      <p className="text-muted-foreground text-xs">{detail}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <QuickCheckCard
                prompt="What was the significance of the 2012 AlexNet result?"
                options={[
                  { id: "a", label: "It was the first time any computer beat a human at chess" },
                  { id: "b", label: "A deep neural network dramatically outperformed all previous image recognition approaches, triggering the modern deep learning era" },
                  { id: "c", label: "It was the launch of ChatGPT and the first public LLM" },
                  { id: "d", label: "It proved that AI winters would never happen again" },
                ]}
                correctOptionId="b"
                explanation="AlexNet's large accuracy gap over prior approaches at the 2012 ImageNet competition convinced the entire research community to switch to deep learning. It is widely considered the starting gun for modern AI."
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
              <TextDisplay variant="callout" content="Analogy: Narrow AI is like a world-class specialist with one narrow job description. AGI would be like a flexible generalist teammate who can learn and transfer skills across completely different tasks. Today we have specialists, not true generalists." />
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
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Concrete examples: narrow vs speculative</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-brand-orange mb-1">Definitely Narrow AI today</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Credit-card fraud detection</li>
                      <li>Speech-to-text transcription</li>
                      <li>Image moderation filters</li>
                      <li>Route optimization for delivery fleets</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-brand-orange mb-1">Would suggest AGI if real</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Learns a brand-new profession end-to-end without domain retraining</li>
                      <li>Shows robust common sense across unrelated domains</li>
                      <li>Plans long-term autonomously while aligning with human values</li>
                      <li>Transfers learning from medicine to law to engineering like a human polymath</li>
                    </ul>
                  </div>
                </div>
              </Card>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Four AI agent types emerging right now</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground">Consumer chatbots</p>
                    <p>ChatGPT, Claude, Gemini -- cloud-based and easy to use.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground">Local/open-source agents</p>
                    <p>OpenClaw -- runs on your own machine, but technical setup is usually required.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground">Cloud task agents</p>
                    <p>Manus, ChatGPT Agent -- autonomous systems that run tasks in a cloud sandbox.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground">Embedded/enterprise agents</p>
                    <p>Microsoft Copilot, Google Gemini in Workspace, Claude in Excel -- built into existing tools your team already uses.</p>
                  </div>
                </div>
              </Card>
              <TextDisplay variant="callout" content="Key insight: When you read scary headlines about AI 'taking over,' they are almost always talking about AGI or superintelligence - things that do not exist. The AI you use today is Narrow AI, which is powerful but limited to specific tasks." />
              <Card className="p-5 bg-brand-orange/5 border-brand-orange/20">
                <h3 className="font-semibold mb-3 text-brand-orange">Reality check: how to classify any AI headline</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Step 1:</span> Identify the system type (chatbot, recommender, vision model, autonomous system).</p>
                  <p><span className="font-medium text-foreground">Step 2:</span> Ask whether it is domain-limited (almost always yes today = Narrow AI).</p>
                  <p><span className="font-medium text-foreground">Step 3:</span> Separate current capability from future speculation (AGI/superintelligence claims).</p>
                  <p><span className="font-medium text-foreground">Step 4:</span> Look for benchmarks or real evidence, not just marketing language.</p>
                </div>
              </Card>
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
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Prompt upgrade ladder (same task, better output)</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Level 1 - basic:</span> "Summarise this text."</p>
                  <p><span className="font-medium text-foreground">Level 2 - structured:</span> "Summarise in 5 bullets and list 3 next actions."</p>
                  <p><span className="font-medium text-foreground">Level 3 - role and audience:</span> "Summarise for a busy manager in plain language with one risk and one recommendation."</p>
                  <p><span className="font-medium text-foreground">Level 4 - quality control:</span> "If any detail is uncertain, label it clearly and ask one follow-up question before finalising."</p>
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
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Starter workflows you can repeat this week</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { name: "Inbox reset", how: "Paste 5 unread emails and ask for priority order plus one-line replies." },
                    { name: "Meeting prep", how: "Paste notes and ask for agenda, decisions needed, and fallback options." },
                    { name: "Study support", how: "Paste a chapter and request a glossary plus 5 self-test questions." },
                    { name: "Writing sprint", how: "Draft a first version, then ask AI to tighten clarity and tone for your audience." },
                  ].map(({ name, how }) => (
                    <div key={name} className="rounded-lg border p-3 bg-background">
                      <p className="font-medium text-brand-orange mb-1">{name}</p>
                      <p className="text-muted-foreground text-xs">{how}</p>
                    </div>
                  ))}
                </div>
              </Card>
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
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">A simple quality scorecard (use after every AI output)</h3>
                <div className="grid md:grid-cols-4 gap-3 text-xs">
                  {[
                    { label: "Accuracy", note: "Are facts and names correct?" },
                    { label: "Clarity", note: "Is it understandable for your audience?" },
                    { label: "Completeness", note: "Did it miss anything important?" },
                    { label: "Actionability", note: "Can you act on it right now?" },
                  ].map(({ label, note }) => (
                    <div key={label} className="rounded border bg-white p-3">
                      <p className="font-semibold text-brand-orange mb-1">{label}</p>
                      <p className="text-muted-foreground">{note}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <QuickCheckCard
                prompt="What is the strongest first AI win for a beginner in this module?"
                options={[
                  { id: "a", label: "Use AI for high-stakes legal decisions immediately" },
                  { id: "b", label: "Pick one low-risk recurring task, use AI for a draft or summary, then verify before using" },
                  { id: "c", label: "Automate multiple workflows before testing any output quality" },
                  { id: "d", label: "Share confidential documents in any public AI tool for speed" },
                ]}
                correctOptionId="b"
                explanation="Correct. Durable skill starts with one low-risk, reviewable workflow and strong verification habits."
                onAnswered={() => {
                  markSectionInteractionComplete(4)
                }}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the first-win checkpoint to unlock the next section.</p> : null}

              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Myths vs Reality */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Myths vs. Reality</h2>
              <TextDisplay content="AI gets a lot of hype and a lot of fear. This section is a practice lab: test each claim, challenge your first instinct, and back your conclusion with evidence." />
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
              <FlipCardGrid
                cards={[
                  {
                    title: "Claim Drill 1",
                    prompt: "\"This chatbot sounds empathetic, so it truly understands my life situation.\" Myth or reality?",
                    answer: "Myth. Fluent language can simulate empathy, but current systems do not have lived experience or human emotional understanding.",
                  },
                  {
                    title: "Claim Drill 2",
                    prompt: "\"If recommendation quality improved after collecting feedback, that is a real AI behavior.\" Myth or reality?",
                    answer: "Reality. Learning from behavior data and feedback over time is a core AI pattern.",
                  },
                  {
                    title: "Claim Drill 3",
                    prompt: "\"Because the model is mathematical, its output is automatically unbiased.\" Myth or reality?",
                    answer: "Myth. Models can encode dataset bias, labeling bias, and design assumptions.",
                  },
                  {
                    title: "Claim Drill 4",
                    prompt: "\"The strongest AI workflow includes verification before taking action.\" Myth or reality?",
                    answer: "Reality. Reliable usage means draft, review, verify, and then apply.",
                  },
                ]}
              />
              <MatchingChallenge
                title="Myth Match Sprint"
                description="Select a myth on the left, then tap its matching reality on the right."
                leftLabel="Myths"
                rightLabel="Realities"
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
                  {
                    id: "first-answer",
                    left: "First answer is usually good enough for important work",
                    right: "High-quality use requires review, correction, and evidence checks",
                  },
                ]}
              />
              <QuickCheckCard
                prompt="Scenario: A team uses AI to summarize support tickets. It saves 40% time, but occasionally misses critical details. What is the strongest response?"
                options={[
                  { id: "a", label: "Disable AI completely because one tool cannot be perfect" },
                  { id: "b", label: "Use AI drafts, then require human verification for high-impact cases" },
                  { id: "c", label: "Trust AI for all customer responses to maximize speed" },
                  { id: "d", label: "Only use AI when customers explicitly ask for it" },
                ]}
                correctOptionId="b"
                explanation="This is the realistic middle path: keep productivity gains while adding safeguards where errors matter most."
                accentClassName="border-brand-green/20 bg-brand-green/5"
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
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Mini case studies: myth to reality in practice</h3>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-brand-green mb-1">Hiring screen tool</p>
                    <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">Myth:</span> "Machine scoring is automatically fair."</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Reality:</span> Historical bias in hiring data can carry forward. Teams need bias testing, transparent criteria, and human review.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-brand-green mb-1">Content recommendation feed</p>
                    <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">Myth:</span> "Recommendations only show what is best for me."</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Reality:</span> Recommendations optimize for objectives like engagement, which may not equal long-term user value.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-brand-green mb-1">Medical note drafting</p>
                    <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">Myth:</span> "If AI draft looks professional, it is clinically reliable."</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Reality:</span> Clinical use needs strict validation, source checks, and clinician accountability.</p>
                  </div>
                </div>
              </Card>
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

          {/* 6: AI Writing */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Writing Assistants</h2>
              <TextDisplay content="AI writing tools can draft emails, reports, essays, code, social posts, and more. Here are the main players and when to use each." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Which writing job are you trying to do?</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    "Draft something from scratch",
                    "Rewrite something to improve tone or clarity",
                    "Summarise a long document",
                    "Brainstorm ideas or outlines",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border bg-background p-3 text-muted-foreground">{item}</div>
                  ))}
                </div>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                <ToolCard
                  name="ChatGPT"
                  url="https://chat.openai.com"
                  tagline="Most versatile general-purpose assistant"
                  free={true}
                  strengths={["Great for long-form writing and brainstorming","Strong code generation","Wide knowledge base","Plugins and GPT-4o multimodal"]}
                />
                <ToolCard
                  name="Claude"
                  url="https://claude.ai"
                  tagline="Best for nuanced writing and long documents"
                  free={true}
                  strengths={["Extremely long context window","Nuanced, natural tone","Excellent at following complex instructions","Strong ethical guardrails"]}
                />
                <ToolCard
                  name="Gemini"
                  url="https://gemini.google.com"
                  tagline="Google's assistant - integrates with your apps"
                  free={true}
                  strengths={["Connects to Gmail, Docs, Drive","Real-time web search","Great for research tasks","Strong at multimodal tasks"]}
                />
                <ToolCard
                  name="Grammarly"
                  url="https://grammarly.com"
                  tagline="Grammar and writing quality assistant"
                  free={true}
                  strengths={["Real-time suggestions in any browser","Tone detection and adjustment","Best for editing, not drafting","Works inside Gmail, Docs, etc."]}
                />
              </div>
              <QuickCheckCard
                prompt="If your main task is polishing tone and grammar inside apps you already use, which tool is the most direct fit?"
                options={[
                  { id: "a", label: "Grammarly" },
                  { id: "b", label: "Midjourney" },
                  { id: "c", label: "Stable Diffusion" },
                  { id: "d", label: "Otter.ai" },
                ]}
                correctOptionId="a"
                explanation="Grammarly is the editing and tone-adjustment tool, especially for improving writing inside existing workflows."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 7: AI Images */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI Image Generation</h2>
              <TextDisplay content="AI image generators create photorealistic images, illustrations, concept art, and more from a text description. They have transformed design and creative work." />
              <div className="grid md:grid-cols-2 gap-4">
                <ToolCard
                  name="DALL-E 3"
                  url="https://openai.com/dall-e-3"
                  tagline="Built into ChatGPT - easy to use"
                  free={false}
                  strengths={["Accessible via ChatGPT Plus","Great at following detailed text descriptions","Strong at photorealistic and artistic styles","No separate account needed"]}
                />
                <ToolCard
                  name="Midjourney"
                  url="https://midjourney.com"
                  tagline="Highest quality art and photorealism"
                  free={false}
                  strengths={["Widely considered the best aesthetic quality","Excellent for concept art and stylised images","Strong community and style library","Web interface now available"]}
                />
                <ToolCard
                  name="Adobe Firefly"
                  url="https://firefly.adobe.com"
                  tagline="Safe for commercial use - built into Creative Cloud"
                  free={true}
                  strengths={["Trained on licensed content - commercially safe","Integrated into Photoshop and Illustrator","Generative Fill is incredibly powerful","Good for professional design workflows"]}
                />
                <ToolCard
                  name="Stable Diffusion"
                  url="https://stability.ai"
                  tagline="Open-source - run it yourself"
                  free={true}
                  strengths={["Free and open source","Highly customisable with community models","Can run locally on your own computer","Large ecosystem of fine-tuned models"]}
                />
              </div>
              <TextDisplay variant="warning" content="Important: Always check the terms of service for AI image tools before using images commercially. Ownership and rights vary significantly between platforms." />
              <FlipCardGrid
                cards={[
                  { title: "Midjourney", prompt: "When is Midjourney usually the right fit?", answer: "Use it when you want striking, stylized visuals quickly and are comfortable working through Discord-based prompting." },
                  { title: "Adobe Firefly", prompt: "When is Firefly the safer choice?", answer: "It is a strong fit when you care about commercial workflow compatibility and tight integration with Adobe creative tools." },
                  { title: "Stable Diffusion", prompt: "Why would someone choose Stable Diffusion?", answer: "It offers the most flexibility for customization, local control, and community models if you are willing to manage more setup." },
                  { title: "Usage rights", prompt: "Why should rights be part of tool selection?", answer: "Because a good-looking result is not enough if the platform's terms or licensing rules make the image risky for commercial use." },
                ]}
              />
              <QuickCheckCard
                prompt="If you need commercially safer image generation inside an existing Adobe workflow, which tool is the best match?"
                options={[
                  { id: "a", label: "Adobe Firefly" },
                  { id: "b", label: "Midjourney" },
                  { id: "c", label: "Stable Diffusion with random community models" },
                  { id: "d", label: "Any tool, because rights never matter" },
                ]}
                correctOptionId="a"
                explanation="Firefly is the strongest fit for commercially safer creative workflows tied to Adobe tools."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 8: AI Productivity */}
          {currentSectionIndex === 8 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI for Productivity</h2>
              <TextDisplay content="AI productivity tools are embedded into the apps you already use - transforming how you write, organise, and get things done." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">A beginner-friendly capability map</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Summarising", example: "Meeting transcripts, articles, long emails" },
                    { label: "Drafting", example: "Replies, memos, proposals, slide outlines" },
                    { label: "Researching", example: "Compare options, gather sources, build briefings" },
                    { label: "Organising", example: "Turn notes into checklists, tables, categories" },
                  ].map(({ label, example }) => (
                    <div key={label} className="rounded-lg border bg-background p-3">
                      <p className="font-semibold text-brand-orange mb-1">{label}</p>
                      <p className="text-muted-foreground">{example}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="space-y-4">
                {[
                  { category: "Meeting & Notes", tools: [
                    { name: "Otter.ai", desc: "Real-time meeting transcription and AI summaries" },
                    { name: "Fireflies.ai", desc: "Records, transcribes, and summarises calls automatically" },
                    { name: "Notion AI", desc: "AI writing and summarisation built into your Notion workspace" },
                  ]},
                  { category: "Office & Docs", tools: [
                    { name: "Microsoft Copilot", desc: "AI in Word, Excel, PowerPoint, Teams, Outlook - summarise emails, draft documents, analyse data" },
                    { name: "Google Duet AI", desc: "AI in Google Docs, Sheets, Slides, Gmail - same concept as Copilot for Google Workspace users" },
                  ]},
                  { category: "Research & Browsing", tools: [
                    { name: "Perplexity AI", desc: "AI search engine that cites sources - great for research" },
                    { name: "ChatGPT + Browse", desc: "Real-time web browsing with source citations" },
                    { name: "Elicit", desc: "AI research tool that searches academic papers" },
                  ]},
                  { category: "Coding", tools: [
                    { name: "GitHub Copilot", desc: "AI code completion and generation inside VS Code and other editors" },
                    { name: "Cursor", desc: "AI-first code editor built around an LLM" },
                    { name: "ChatGPT", desc: "Excellent for explaining code, debugging, and writing scripts" },
                  ]},
                ].map(({ category, tools }) => (
                  <Card key={category} className="p-4">
                    <h3 className="font-bold text-brand-green mb-3">{category}</h3>
                    <div className="space-y-2">
                      {tools.map(({ name, desc }) => (
                        <div key={name} className="flex gap-3 text-sm">
                          <span className="font-medium w-36 flex-shrink-0">{name}</span>
                          <span className="text-muted-foreground">{desc}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
              <DragSortChallenge
                title="Workflow Conveyor"
                description="Drag tasks into a practical beginner sequence from safest to more advanced usage."
                items={[
                  "Automate multi-step workflows across tools",
                  "Summarise meetings into action items",
                  "Run cited research comparisons",
                  "Draft and edit status updates",
                ]}
                correctOrder={[
                  "Summarise meetings into action items",
                  "Draft and edit status updates",
                  "Run cited research comparisons",
                  "Automate multi-step workflows across tools",
                ]}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 9: AI Creative */}
          {currentSectionIndex === 9 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI in Creative Work</h2>
              <TextDisplay content="AI has entered every creative field. Here is a quick tour of what is possible today:" />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { field: "Music", tools: "Suno, Udio, Stable Audio", desc: "Generate full songs in any style from a text prompt. Suno can produce a complete song - lyrics, melody, vocals - in seconds." },
                  { field: "Video", tools: "Sora (OpenAI), RunwayML, Pika", desc: "Generate video clips from text descriptions. Sora produces cinematic quality video. RunwayML is used by professional filmmakers." },
                  { field: "Design / UI", tools: "Uizard, Framer AI, Locofy", desc: "Generate UI mockups, websites, and app screens from text descriptions or rough sketches." },
                  { field: "Voice / Audio", tools: "ElevenLabs, Murf, Adobe Enhance", desc: "Clone voices, create realistic AI narration, clean up audio recordings, generate sound effects." },
                  { field: "3D & Animation", tools: "Luma AI, Meshy, Spline AI", desc: "Generate 3D models and scenes from images or text. Create animations with AI motion generation." },
                  { field: "Writing", tools: "Sudowrite, NovelAI, Jasper", desc: "Specialised writing assistants for fiction, marketing copy, and long-form content with style control." },
                ].map(({ field, tools, desc }) => (
                  <Card key={field} className="p-4">
                    <h4 className="font-bold text-brand-orange">{field}</h4>
                    <p className="text-xs text-muted-foreground mb-1 font-mono">{tools}</p>
                    <p className="text-sm">{desc}</p>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The creative AI space is moving extremely fast. A tool that is state-of-the-art today may be superseded in months. Focus on learning the principles - the tools change, but the skill of knowing what to ask for, and how to evaluate outputs, stays valuable." />
              <QuickCheckCard
                prompt="If you want to generate short cinematic video clips from text prompts, which category of tool is the best fit?"
                options={[
                  { id: "a", label: "Video tools like Sora or RunwayML" },
                  { id: "b", label: "Voice tools like ElevenLabs" },
                  { id: "c", label: "UI tools like Uizard" },
                  { id: "d", label: "Writing tools like Jasper" },
                ]}
                correctOptionId="a"
                explanation="The video category is the direct fit for text-to-video generation. Sora and RunwayML are named specifically for that use case."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 10: Choosing Tools */}
          {currentSectionIndex === 10 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Choosing the Right Tool</h2>
              <TextDisplay content="With hundreds of AI tools available, how do you decide which to use? Use this simple framework:" />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">The decision order that keeps beginners out of trouble</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">1. Define the job:</span> summarise, draft, research, create, organise, or automate.</p>
                  <p><span className="font-medium text-foreground">2. Check the data:</span> if it is sensitive, stop and check policy before pasting it anywhere.</p>
                  <p><span className="font-medium text-foreground">3. Choose the lightest tool that fits:</span> use a simple assistant before adopting a full workflow or platform.</p>
                  <p><span className="font-medium text-foreground">4. Verify the output:</span> especially facts, numbers, citations, or anything going to a client or boss.</p>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3">5 Questions Before Choosing an AI Tool</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  {[
                    "What exactly is the task? Be specific - different tools excel at different things.",
                    "Does it need to be free? If yes, filter your options accordingly.",
                    "Does it need internet access? Tools like Perplexity are better for current information.",
                    "How sensitive is the data? Avoid putting private company data into external AI tools without checking privacy policies.",
                    "Do I need to keep the output? Some tools do not allow commercial use or have restrictions on generated content.",
                  ].map((q, i) => <li key={i} className="text-muted-foreground">{q}</li>)}
                </ol>
              </Card>
              <FlipCardGrid
                cards={[
                  { title: "Use AI", prompt: "You need a first draft of a project update from your own notes.", answer: "Yes. This is a strong use case: low risk, easy to review, and time-saving." },
                  { title: "Be careful", prompt: "You want AI to summarize internal strategy notes with confidential details.", answer: "Only if your approved tools and company policy allow it. Sensitivity matters before convenience." },
                  { title: "Do not rely blindly", prompt: "You want AI to make the final legal or medical decision for you.", answer: "No. AI can support research or drafting, but high-stakes judgment still needs expert human review." },
                  { title: "Best first step", prompt: "You are unsure which tool to try first.", answer: "Start by naming the job to be done. Once you know the task clearly, tool selection becomes much easier." },
                ]}
              />
              <MatchingChallenge
                title="Tool Selection Match"
                description="Match the situation to the best first decision."
                pairs={[
                  { id: "sensitive", left: "Input contains confidential strategy", right: "Check approved tools and privacy policy before use" },
                  { id: "unknown", left: "You do not know where to start", right: "Define the exact job-to-be-done first" },
                  { id: "output", left: "Output is going to leadership", right: "Verify facts, numbers, and claims before sending" },
                ]}
              />
              <QuickCheckCard
                prompt="What is the best beginner sequence for choosing an AI tool?"
                options={[
                  { id: "a", label: "Pick the newest brand, then look for a task" },
                  { id: "b", label: "Define the task, check the data sensitivity, choose the simplest suitable tool, then verify the output" },
                  { id: "c", label: "Always use the most advanced tool available" },
                  { id: "d", label: "Start with automation before trying any simple use case" },
                ]}
                correctOptionId="b"
                explanation="Good tool selection starts with the job, then privacy and risk, then the simplest tool that fits, followed by output verification."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 11: Quiz */}
          {currentSectionIndex === 11 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Let us check your understanding. Answer all three questions correctly to complete the module." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Before you start, sanity-check these ideas</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Definition:</span> AI is software that performs tasks that normally require human intelligence.</p>
                  <p><span className="font-medium text-foreground">History:</span> modern progress came from better algorithms, more data, and more compute.</p>
                  <p><span className="font-medium text-foreground">Types:</span> everything you use today is Narrow AI, not AGI or superintelligence.</p>
                  <p><span className="font-medium text-foreground">Practice mindset:</span> use AI as support, then verify before relying on output.</p>
                </div>
              </Card>
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent work! You have completed Module 1. You now have a solid foundation for understanding what AI is." />
                  <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                    <h3 className="font-semibold mb-3 text-brand-green">Confidence check before Module 2</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      {[
                        "I can explain AI without using jargon",
                        "I can distinguish narrow AI from AGI claims",
                        "I can spot hype and ask for evidence",
                        "I can choose one low-risk AI task to practice",
                      ].map((item) => (
                        <div key={item} className="rounded-lg border bg-white p-3 text-muted-foreground">
                          {item}
                        </div>
                      ))}
                    </div>
                  </Card>
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

