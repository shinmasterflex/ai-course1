/**
 * MODULE 2: HOW MACHINES LEARN
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { FlipCardGrid, OrderingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

const MANUAL_CLASSIFICATION_ITEMS = [
  {
    id: "item-1",
    sample: "Subject: Win a free iPhone now! Click this mystery link.",
    label: "spam",
    why: "Urgent promise + suspicious link pattern.",
  },
  {
    id: "item-2",
    sample: "Team update: meeting moved from 2:00 PM to 3:00 PM.",
    label: "not_spam",
    why: "Normal workplace context and specific details.",
  },
  {
    id: "item-3",
    sample: "Your account is locked. Send your password to unlock instantly.",
    label: "spam",
    why: "Requests sensitive info and uses pressure tactics.",
  },
  {
    id: "item-4",
    sample: "Receipt: Your grocery order has been delivered.",
    label: "not_spam",
    why: "Expected service message with no manipulation language.",
  },
] as const

type ManualClass = "spam" | "not_spam"

export default function Module2Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-2"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "matching", "quiz4", "quiz5"])
  const questions = moduleQuizData[MODULE_ID]
  const [manualLabels, setManualLabels] = useState<Record<string, ManualClass>>({})

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [currentSectionIndex, sectionParam, sections])

  useEffect(() => {
    if (allQuizComplete && currentSectionIndex === totalSections - 1) {
      const last = sections[totalSections - 1]
      if (last) { markSectionComplete(MODULE_ID, last.id); setCurrentPosition(MODULE_ID, last.id) }
    }
  }, [allQuizComplete, currentSectionIndex, markSectionComplete, sections, setCurrentPosition, totalSections])

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [5],
  })

  const hasLabeledAllItems = MANUAL_CLASSIFICATION_ITEMS.every((item) => Boolean(manualLabels[item.id]))
  const manualCorrectCount = MANUAL_CLASSIFICATION_ITEMS.filter((item) => manualLabels[item.id] === item.label).length

  const handleSectionComplete = () => {
    if (!canAdvance) {
      return
    }

    const current = sections[currentSectionIndex]
    if (current) { markSectionComplete(MODULE_ID, current.id); setCurrentPosition(MODULE_ID, current.id) }
    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-2?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 2: How Machines Learn</h1>
            <p className="text-lg text-muted-foreground mb-4">Peek inside the black box - no equations required</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 2"
              title="Understand how models learn from data"
              description="Explore machine learning fundamentals with intuitive analogies that make core concepts click quickly."
              imageSrc="/images/modules/module-2.jpg"
              imageAlt="Neural networks and data visualization"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="In this module you will understand how AI systems actually learn - using intuitive analogies instead of math. By the end, the phrase 'machine learning' will make complete sense to you." />
              <Card className="p-5 space-y-2">
                {[
                  "How machine learning is like studying from worked examples",
                  "How pattern recognition works (like sorting photos into folders)",
                  "Supervised vs. unsupervised learning in daily-life scenarios",
                  "Neural networks as layers of decision-making, not heavy math",
                  "The full learning loop: input -> training -> prediction -> feedback",
                  "Limitations in plain language: overfitting, bias, and hallucination",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: What Is ML */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What Is Machine Learning?</h2>
              <TextDisplay content="Machine learning is a type of AI where the system learns from data instead of following hand-written rules." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3">The Old Way vs. Machine Learning</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg border border-brand-orange/20 bg-background p-4">
                    <h4 className="font-semibold text-brand-orange mb-3 flex items-center gap-2"><XCircle className="h-4 w-4" /> Traditional software</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <p>You write explicit rules.</p>
                      <p>Example: "If an email contains these words, mark it as spam."</p>
                      <p>Works well when the rules are stable and easy to define.</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-brand-green/20 bg-background p-4">
                    <h4 className="font-semibold text-brand-green mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Machine learning</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <p>You show the system many examples.</p>
                      <p>Example: millions of emails already labeled as spam or not spam.</p>
                      <p>The model learns the pattern instead of you writing every rule by hand.</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">A simple analogy</h3>
                <p className="text-sm text-muted-foreground">Traditional software is like giving someone a strict recipe. Machine learning is like showing them 10,000 examples until they begin to recognize the pattern for themselves.</p>
              </Card>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Three signs a task is a strong ML candidate</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">High variability:</span> the same intent appears in many forms (emails, accents, writing styles, photos).</p>
                  <p><span className="font-medium text-foreground">Large historical dataset:</span> you already have examples and outcomes to learn from.</p>
                  <p><span className="font-medium text-foreground">Patterns change over time:</span> rules become stale quickly, so learning systems are more robust.</p>
                </div>
              </Card>
              <QuickCheckCard
                prompt="When does machine learning make the most sense?"
                options={[
                  { id: "a", label: "When every rule is obvious and never changes" },
                  { id: "b", label: "When you have many examples and the pattern is too complex to hand-code" },
                  { id: "c", label: "When no data exists at all" },
                  { id: "d", label: "Only when you are building a robot body" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "When every rule is obvious and never changes, traditional software is a better fit than machine learning.",
          b: "Machine learning is most useful when there are lots of examples but the pattern would be difficult or fragile to capture with explicit rules.",
          c: "Machine learning requires training data. With no data, there is nothing for the model to learn from.",
          d: "Most AI software runs without a physical body. Robotics is one application, but it is not a prerequisite for ML.",
        }}
                explanation="Machine learning is most useful when there are lots of examples but the pattern would be difficult or fragile to capture with explicit rules."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: Training Data */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Training Data Explained</h2>
              <TextDisplay content="Training data is the collection of examples used to teach an AI model. It is the most important ingredient in any AI system." />
              <TextDisplay variant="callout" content="A great analogy: imagine learning to cook by reading 10,000 recipes. The more diverse, accurate, and well-written those recipes are, the better cook you become. AI works the same way." />
              <QuickCheckCard
                prompt="If you wanted to improve an AI model quickly, what would usually matter most first?"
                options={[
                  { id: "a", label: "A flashier UI" },
                  { id: "b", label: "Higher-quality and more representative training data" },
                  { id: "c", label: "Longer system prompts only" },
                  { id: "d", label: "Avoiding labels in all datasets" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "A better UI does not change what a model learns or improves its accuracy.",
          b: "Correct. Better data quality and coverage usually produce the biggest performance and fairness gains.",
          c: "Longer system prompts affect inference behaviour, but do not change the trained model's underlying capabilities.",
          d: "Labels are essential for supervised learning. Removing them makes it impossible for the model to learn correct mappings.",
        }}
                explanation="Correct. Better data quality and coverage usually produce the biggest performance and fairness gains."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">What training data looks like for different AI tasks:</h3>
                  <div className="space-y-2">
                    {[
                      { task: "Image recognition", data: "Millions of labelled photos (e.g., 'this is a cat', 'this is not a cat')" },
                      { task: "Language models (ChatGPT)", data: "Hundreds of billions of words of text from books, websites, and articles" },
                      { task: "Spam detection", data: "Millions of emails labelled as spam or not spam" },
                      { task: "Speech recognition", data: "Thousands of hours of recorded speech paired with written transcripts" },
                      { task: "Self-driving cars", data: "Millions of miles of driving footage with labels for objects, road markings, etc." },
                    ].map(({ task, data }) => (
                      <div key={task} className="flex gap-3 text-sm py-1 border-b last:border-0">
                        <span className="font-medium w-48 flex-shrink-0 text-brand-green">{task}</span>
                        <span className="text-muted-foreground">{data}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                <TextDisplay variant="warning" content="Important: If training data is biased, incomplete, or wrong - the AI will be too. Garbage in, garbage out. This is why data quality is a major ethical concern in AI." />
              </div>
              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Spot the Bad Training Data</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Bad example 1:</span> a hiring model trained mostly on past successful hires from one narrow demographic.</p>
                  <p><span className="font-medium text-foreground">Bad example 2:</span> a medical model trained mostly on data from one country, hospital system, or age group.</p>
                  <p><span className="font-medium text-foreground">Bad example 3:</span> a customer support model trained on tickets that were mislabeled or inconsistently categorized.</p>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Data quality checklist for beginners</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { item: "Coverage", tip: "Include varied geographies, devices, ages, and edge cases." },
                    { item: "Label consistency", tip: "Use clear labeling guidelines and periodic audits." },
                    { item: "Recency", tip: "Refresh data so the model does not learn outdated behavior." },
                    { item: "Leakage", tip: "Keep future-only fields out of training to avoid fake accuracy." },
                  ].map(({ item, tip }) => (
                    <div key={item} className="rounded-lg border bg-background p-3">
                      <p className="font-medium text-brand-orange mb-1">{item}</p>
                      <p className="text-muted-foreground text-xs">{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <QuickCheckCard
                prompt="What is the biggest risk in weak training data?"
                options={[
                  { id: "a", label: "The AI becomes more creative" },
                  { id: "b", label: "The model learns the wrong patterns and repeats them in output" },
                  { id: "c", label: "The model automatically corrects bad labels later" },
                  { id: "d", label: "Only the user interface is affected" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Weak data makes models less accurate and more biased — not more creative. Creativity in AI comes from diversity of training data, not from flaws in it.",
          b: "Models learn from the examples they receive. If those examples are skewed, missing context, or mislabeled, the model will reproduce those flaws.",
          c: "Models do not automatically detect and fix bad labels. Cleaning data is a deliberate human and engineering process.",
          d: "Data problems go far beyond the user interface. They affect every prediction the model makes at its core.",
        }}
                explanation="Models learn from the examples they receive. If those examples are skewed, missing context, or mislabeled, the model will reproduce those flaws."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Supervised vs Unsupervised */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Supervised vs. Unsupervised Learning</h2>
              <TextDisplay content="Think of supervised and unsupervised learning as two classroom styles: one with answer keys, one without answer keys." />
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                  <h3 className="font-semibold mb-3 text-brand-green">Supervised learning</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">Mental model:</span> like a student practicing with flashcards that already have correct answers.</p>
                    <p><span className="font-medium text-foreground">What it gets:</span> labeled examples (input + correct output).</p>
                    <p><span className="font-medium text-foreground">Relatable examples:</span> email spam filters, handwriting recognition, predicting house prices from past sales.</p>
                  </div>
                </Card>
                <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                  <h3 className="font-semibold mb-3 text-brand-orange">Unsupervised learning</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">Mental model:</span> like sorting a box of photos into piles without knowing names first.</p>
                    <p><span className="font-medium text-foreground">What it gets:</span> unlabeled data only.</p>
                    <p><span className="font-medium text-foreground">Relatable examples:</span> customer segmentation, grouping similar songs, spotting unusual transactions.</p>
                  </div>
                </Card>
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Quick rule of thumb</h3>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Supervised:</span> you already know correct answers for many examples. <span className="font-medium text-foreground">Unsupervised:</span> you only have raw data and want the model to discover hidden groups.</p>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Interactive Activity: Be the Model Trainer</h3>
                <p className="text-sm text-muted-foreground mb-4">Classify each message as <span className="font-medium text-foreground">Spam</span> or <span className="font-medium text-foreground">Not Spam</span>. This is exactly what supervised training looks like: examples + labels.</p>
                <div className="space-y-3">
                  {MANUAL_CLASSIFICATION_ITEMS.map((item, index) => {
                    const selected = manualLabels[item.id]
                    return (
                      <div key={item.id} className="rounded-lg border bg-background p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Example {index + 1}</p>
                        <p className="text-sm text-foreground mb-3">{item.sample}</p>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant={selected === "spam" ? "default" : "outline"}
                            className={selected === "spam" ? "bg-brand-orange hover:bg-brand-orange/90 text-white" : ""}
                            onClick={() => setManualLabels((prev) => ({ ...prev, [item.id]: "spam" }))}
                          >
                            Spam
                          </Button>
                          <Button
                            type="button"
                            variant={selected === "not_spam" ? "default" : "outline"}
                            className={selected === "not_spam" ? "bg-brand-green hover:bg-brand-green/90 text-white" : ""}
                            onClick={() => setManualLabels((prev) => ({ ...prev, [item.id]: "not_spam" }))}
                          >
                            Not Spam
                          </Button>
                        </div>
                        {selected ? (
                          <p className="mt-2 text-xs text-muted-foreground">Why the expected label is <span className="font-medium text-foreground">{item.label === "spam" ? "Spam" : "Not Spam"}</span>: {item.why}</p>
                        ) : null}
                      </div>
                    )
                  })}
                </div>

                {hasLabeledAllItems ? (
                  <div className="mt-4 rounded-lg border border-brand-green/30 bg-brand-green/5 p-3">
                    <p className="text-sm font-medium text-brand-green">Your labeling score: {manualCorrectCount}/{MANUAL_CLASSIFICATION_ITEMS.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">In real ML projects, better labels usually mean better model behavior.</p>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">Label all examples to simulate a complete mini training set.</p>
                )}

                <div className="mt-4 flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setManualLabels({})}>Reset Activity</Button>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">From labels to learning: the core loop</h3>
                <p className="text-sm text-muted-foreground mb-3">After we label examples, model learning follows the same repeatable cycle:</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Input:</span> Give the model data (email text, photo, audio, etc.).</p>
                  <p><span className="font-medium text-foreground">Training:</span> Compare the model guess to the known label.</p>
                  <p><span className="font-medium text-foreground">Prediction:</span> Use the trained model on new unseen examples.</p>
                  <p><span className="font-medium text-foreground">Feedback loop:</span> Track mistakes, add better data, retrain, repeat.</p>
                </div>
              </Card>

              <OrderingChallenge
                title="Learning Loop Builder"
                description="Move the cards to model the learning cycle: input -> training -> prediction -> feedback loop."
                items={[
                  "Feedback loop: review mistakes and improve data",
                  "Training: learn from examples",
                  "Prediction: answer on new data",
                  "Input: provide examples or signals",
                ]}
                correctOrder={[
                  "Input: provide examples or signals",
                  "Training: learn from examples",
                  "Prediction: answer on new data",
                  "Feedback loop: review mistakes and improve data",
                ]}
              />
              <QuickCheckCard
                prompt="A retailer wants to group customers into segments without pre-labeling them. Which learning style fits best?"
                options={[
                  { id: "a", label: "Supervised learning" },
                  { id: "b", label: "Unsupervised learning" },
                  { id: "c", label: "Only reinforcement learning" },
                  { id: "d", label: "None of the above" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Supervised learning requires labeled examples with known correct outputs. Customer segments are unknown upfront, so supervised learning does not apply here.",
          b: "Customer segmentation is a classic unsupervised learning problem because the system is discovering groups in unlabeled data.",
          c: "Reinforcement learning learns through reward signals from actions in an environment, not from discovering static groups in transaction data.",
          d: "Unsupervised learning is exactly the right fit here. It is the correct answer.",
        }}
                explanation="Customer segmentation is a classic unsupervised learning problem because the system is discovering groups in unlabeled data."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: Neural Networks */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Neural Networks: Layers of Decision-Making</h2>
              <TextDisplay content="A neural network is a stack of decision layers. Each layer asks a slightly more refined question than the one before it." />
              <TextDisplay variant="callout" content="Think of it like a panel of assistants: the first assistant notices simple clues, the next combines clues, and the final assistant makes the decision." />

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Photo-sorting metaphor</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Layer 1:</span> notices basic shapes and colors.</p>
                  <p><span className="font-medium text-foreground">Layer 2:</span> combines shapes into parts (eyes, wheels, corners).</p>
                  <p><span className="font-medium text-foreground">Layer 3:</span> combines parts into likely objects (cat, car, tree).</p>
                  <p><span className="font-medium text-foreground">Output:</span> picks the most likely category.</p>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">How learning happens (without heavy math)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">1. Predict:</span> the network makes its best guess.</p>
                  <p><span className="font-medium text-foreground">2. Compare:</span> it checks the guess against the correct answer.</p>
                  <p><span className="font-medium text-foreground">3. Adjust:</span> it nudges internal settings so similar mistakes happen less often.</p>
                  <p><span className="font-medium text-foreground">4. Repeat:</span> this loop runs over huge numbers of examples.</p>
                </div>
              </Card>

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">What to remember</h3>
                <p className="text-sm text-muted-foreground">Neural networks are not magic and they are not conscious. They are pattern-learning systems built from many small decisions layered together.</p>
              </Card>

              <QuickCheckCard
                prompt="What is the main job of a neural network during training?"
                options={[
                  { id: "a", label: "Memorize every input exactly once and never adjust" },
                  { id: "b", label: "Adjust internal weights so predictions improve over many examples" },
                  { id: "c", label: "Browse the web for the correct answer each time" },
                  { id: "d", label: "Replace training data with human intuition" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Memorising examples exactly causes overfitting — the model fails on new data it has not seen before.",
          b: "Training repeatedly adjusts the network's internal weights (parameters) using backpropagation so its predictions become more accurate over many examples.",
          c: "Neural networks do not browse the web. They apply learned patterns from training data, which has a knowledge cutoff date.",
          d: "Training uses labeled data examples, not human intuition. Human judgment is used to evaluate and guide the process, not replace the data.",
        }}
                explanation="Training repeatedly adjusts the network's internal weights (parameters) using backpropagation so its predictions become more accurate over many examples."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: What AI Can't Do */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Limitations You Should Know</h2>
              <TextDisplay content="Even strong models have predictable failure modes. Three are especially important for beginners: overfitting, bias, and hallucination." />
              <TextDisplay variant="callout" content="Use this as your safety lens: when outputs look impressive, ask where they might break." />

              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">1. Overfitting: memorizing instead of generalizing</h3>
                  <p className="text-sm text-muted-foreground">Overfitting is like a student who memorizes practice questions but freezes on the real test. The model performs well on familiar training examples but struggles on new data.</p>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-green">2. Bias: learning skewed patterns</h3>
                  <p className="text-sm text-muted-foreground">Bias happens when training data over-represents some groups and under-represents others. The model can then make unfair or inaccurate decisions because its "experience" was unbalanced.</p>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">3. Hallucination: confident but wrong</h3>
                  <p className="text-sm text-muted-foreground">Hallucination means the model generates an answer that sounds fluent and certain but is factually wrong. It is pattern completion, not guaranteed truth checking.</p>
                </Card>

                <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                  <h3 className="font-semibold mb-3 text-brand-green">Simple prevention habits</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">For overfitting:</span> test on unseen examples, not just training data.</p>
                    <p><span className="font-medium text-foreground">For bias:</span> use more representative datasets and review outcomes across groups.</p>
                    <p><span className="font-medium text-foreground">For hallucination:</span> verify important facts with trusted sources.</p>
                  </div>
                </Card>
              </div>

              <QuickCheckCard
                prompt="For high-stakes tasks, what is the safest way to use AI given these limitations?"
                options={[
                  { id: "a", label: "Treat fluent answers as final decisions" },
                  { id: "b", label: "Use AI for drafts and analysis, then verify critical facts and keep human judgment in control" },
                  { id: "c", label: "Ask shorter prompts so hallucinations disappear" },
                  { id: "d", label: "Assume newer models cannot fail in edge cases" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Fluent output does not mean correct output. AI can sound completely confident while hallucinating facts or missing critical context.",
          b: "Exactly. AI is strongest as a decision-support partner, not a replacement for verification and accountability.",
          c: "Hallucinations occur regardless of prompt length. The fix is verification and human review, not shorter prompts.",
          d: "Even the latest models can fail on edge cases. Model version alone is not a substitute for domain expertise and verification.",
        }}
                explanation="Exactly. AI is strongest as a decision-support partner, not a replacement for verification and accountability."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Red-flag checklist: when to slow down immediately</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  {[
                    "The model looks perfect on old examples but fails on new examples (overfitting signal)",
                    "One group of users gets consistently worse results (bias signal)",
                    "The response is very confident but cannot be verified (hallucination signal)",
                    "The output includes precise numbers or citations without trustworthy sources",
                    "The answer changes wildly when you slightly reword the prompt",
                    "The recommendation is high-stakes but nobody checks it before use",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border bg-white p-3">{item}</div>
                  ))}
                </div>
              </Card>

              <TextDisplay variant="callout" content="Flip each card to test your understanding of why each limitation exists." />
              <FlipCardGrid
                cards={[
                  {
                    title: "Common sense",
                    prompt: "Why can AI still fail at obvious real-world judgment?",
                    answer: "Because it learns statistical patterns from data, not lived experience. Fluent output is not the same as understanding.",
                  },
                  {
                    title: "Overfitting",
                    prompt: "Why can a model score high in training but fail in real use?",
                    answer: "It may memorize quirks of training examples instead of learning broad patterns that generalize.",
                  },
                  {
                    title: "Bias",
                    prompt: "Why can AI be unfair even if no one intended it?",
                    answer: "If the training data is unbalanced, the model learns those imbalances and repeats them.",
                  },
                  {
                    title: "Hallucination",
                    prompt: "Why can AI sound sure while being wrong?",
                    answer: "The model is optimized to produce plausible language, not guaranteed factual truth.",
                  },
                ]}
              />

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">Best beginner mindset</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Use AI for support and first drafts, not blind final decisions",
                    "Check important claims in external, trustworthy sources",
                    "Test models on new real-world data to detect overfitting",
                    "Watch outcomes across user groups to catch bias early",
                    "Keep human review in all high-stakes workflows",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Response audit workflow (60 seconds)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">1. Mark claims:</span> highlight names, numbers, dates, and citations.</p>
                  <p><span className="font-medium text-foreground">2. Verify externally:</span> confirm high-impact claims with trusted sources.</p>
                  <p><span className="font-medium text-foreground">3. Stress test:</span> ask the model to state assumptions and potential failure cases.</p>
                  <p><span className="font-medium text-foreground">4. Decide owner:</span> assign a human owner for any final decision.</p>
                </div>
              </Card>

              <QuickCheckCard
                prompt="A colleague says 'The AI gave me a very confident answer with several citations, so it must be correct.' What is the problem with this reasoning?"
                options={[
                  { id: "a", label: "Confidence and citation formatting do not guarantee accuracy - hallucination is exactly the case where AI sounds most sure but is wrong" },
                  { id: "b", label: "Nothing is wrong - AI citations are always accurate" },
                  { id: "c", label: "The only issue is that AI cannot format citations correctly" },
                  { id: "d", label: "Confidence is only a problem in small models" },
                ]}
                correctOptionId="a"
                                optionExplanations={{
          a: "Hallucinations are especially dangerous because they often come with complete confidence and plausible-looking supporting details. AI has no internal fact-checking - fluency and accuracy are independent.",
          b: "AI citations can be fabricated. A source-looking reference does not mean the source exists or that it says what the model claims.",
          c: "AI hallucinations often come with perfectly formatted citations and references. Formatting is not a reliability indicator.",
          d: "Confidence and hallucination problems exist across model sizes. Larger models can still hallucinate plausibly and convincingly.",
        }}
                explanation="Hallucinations are especially dangerous because they often come with complete confidence and plausible-looking supporting details. AI has no internal fact-checking - fluency and accuracy are independent."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
                onAnswered={() => {
                  markSectionInteractionComplete(5)
                }}
              />

              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the limitations checkpoint to unlock the next section.</p> : null}

              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="This quiz checks your understanding of how machines learn, not your ability to memorize technical terms." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Fast refresh before submitting</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Machine learning uses examples to learn patterns instead of hand-written rules.",
                    "Training data quality strongly determines model behavior and fairness.",
                    "Supervised learning uses labels; unsupervised learning discovers structure.",
                    "Neural networks improve by refining layered decisions through repeated feedback.",
                    "AI limitations are structural, so verification is always required for high-stakes use.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Well done! You now understand the fundamentals of how AI learns. Next up: we go hands-on with Large Language Models and learn how to communicate with AI effectively." />
                  <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                    <h3 className="font-semibold mb-2 text-brand-green">You are ready for Module 3 if you can:</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      {[
                        "Explain training data quality in plain language",
                        "Differentiate supervised and unsupervised learning",
                        "Describe weights and backpropagation conceptually",
                        "List at least two AI limitations that affect real workflows",
                      ].map((item) => (
                        <div key={item} className="rounded-lg border bg-white p-3 text-muted-foreground">{item}</div>
                      ))}
                    </div>
                  </Card>
                  <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course")}>
                    Complete Module
                  </Button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

