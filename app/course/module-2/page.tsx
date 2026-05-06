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

export default function Module2Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-2"
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

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [5],
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
                {["What is machine learning - and how it differs from regular software","Training data - the fuel that makes AI possible","Supervised vs. unsupervised learning - two different approaches","Neural networks - the architecture behind modern AI","What AI genuinely cannot do"].map((item) => (
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
                explanation="Models learn from the examples they receive. If those examples are skewed, missing context, or mislabeled, the model will reproduce those flaws."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Supervised vs Unsupervised */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Supervised vs. Unsupervised Learning</h2>
              <TextDisplay content="There are two main ways machines learn from data. The difference comes down to whether the training examples have labels." />
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                  <h3 className="font-semibold mb-3 text-brand-green">Supervised learning</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">What it gets:</span> labeled examples.</p>
                    <p><span className="font-medium text-foreground">Typical question:</span> "Given this input, what is the correct answer?"</p>
                    <p><span className="font-medium text-foreground">Examples:</span> spam detection, fraud detection, house-price prediction, medical image classification.</p>
                  </div>
                </Card>
                <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                  <h3 className="font-semibold mb-3 text-brand-orange">Unsupervised learning</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">What it gets:</span> unlabeled data.</p>
                    <p><span className="font-medium text-foreground">Typical question:</span> "What patterns or groups can be found here?"</p>
                    <p><span className="font-medium text-foreground">Examples:</span> customer segmentation, anomaly detection, grouping similar products or documents.</p>
                  </div>
                </Card>
              </div>
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Fast rule of thumb</h3>
                <p className="text-sm text-muted-foreground">If humans already know the right answer for many examples, supervised learning is usually the better fit. If you want the system to discover hidden structure in messy data, unsupervised learning is the better starting point.</p>
              </Card>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-2 text-brand-green">A Third Type - Reinforcement Learning</h3>
                <p className="text-sm text-muted-foreground mb-3">There is a third major learning style that powers some of AI&apos;s most impressive achievements:</p>
                <div className="text-sm space-y-3">
                  <p><span className="font-semibold text-brand-orange">Reinforcement Learning (RL)</span> - the AI learns by trial and error in a simulated environment, receiving rewards for correct actions and penalties for wrong ones. Like training a dog with treats, but for software at superhuman speed.</p>
                  <div className="space-y-2 pl-3 border-l-2 border-brand-orange/30">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">AlphaGo (2016):</span> DeepMind&apos;s AI played millions of Go games against itself, getting a +1 reward for wins and -1 for losses. After enough iterations, it discovered strategies no human had ever conceived - including the legendary Move 37.</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">RLHF - how ChatGPT got its personality:</span> After initial training on text, OpenAI used Reinforcement Learning from Human Feedback. Human raters compared pairs of responses and marked which was more helpful, accurate, and safe. The model was then trained to produce the kind of responses humans preferred. This is why ChatGPT sounds helpful and coherent rather than just statistically likely - humans taught it what &apos;good&apos; means.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">Bonus: Transfer Learning - Why Fine-Tuning Works</h3>
                <p className="text-sm text-muted-foreground mb-3">There is a fourth concept worth understanding because it explains a huge amount of modern AI:</p>
                <div className="text-sm space-y-3">
                  <p><span className="font-semibold text-brand-orange">Transfer Learning</span> - instead of training a model from scratch for every task, you take a model already trained on a huge general dataset and fine-tune it on a smaller, specific dataset for your new task.</p>
                  <p className="text-muted-foreground">Think of it like hiring an experienced doctor and training them in a specialist area - versus training a brand new medical student from scratch. The specialist training takes months; starting from zero takes a decade.</p>
                  <div className="space-y-2 pl-3 border-l-2 border-blue-500/30">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Example:</span> GPT-4 is trained on hundreds of billions of words of general text. To create a medical AI, you then fine-tune it on medical literature - it already understands language, so you just need to teach it domain knowledge. This process takes days and thousands of examples, not years and billions of examples.</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Why it matters:</span> Transfer learning is why the AI revolution accelerated so sharply after 2017. The same base model (called a foundation model) can be adapted into a legal AI, a coding assistant, a customer service bot, or a medical tool - all using the same foundation, just with specialised training on top.</p>
                  </div>
                </div>
              </Card>
              <OrderingChallenge
                title="Learning Loop Builder"
                description="Move the cards to model the machine-learning loop from data to improvement."
                items={[
                  "Evaluate errors and adjust parameters",
                  "Collect and label representative training data",
                  "Run model on new input and predict",
                  "Train model to learn patterns",
                ]}
                correctOrder={[
                  "Collect and label representative training data",
                  "Train model to learn patterns",
                  "Run model on new input and predict",
                  "Evaluate errors and adjust parameters",
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
                explanation="Customer segmentation is a classic unsupervised learning problem because the system is discovering groups in unlabeled data."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: Neural Networks */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Neural Networks Simply Explained</h2>
              <TextDisplay content="A neural network is the architecture used by most modern AI systems, including ChatGPT, image generators, and voice assistants." />
              <TextDisplay variant="callout" content="The name comes from the brain. Just like neurons in your brain connect to each other to process information, a neural network is made of artificial 'neurons' (simple math functions) connected in layers." />

              <Card className="p-5">
                <h3 className="font-semibold mb-3">How it works - a simple example</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { step: "1. Input", desc: "You show the network an image of an animal. Each pixel becomes a number that the network can process." },
                    { step: "2. Layers", desc: "The image passes through many layers of artificial neurons. Early layers detect edges and basic shapes. Middle layers combine those into features like eyes or fur. Later layers recognise high-level objects." },
                    { step: "3. Output", desc: "The final layer outputs a probability for each possible label: 'dog: 94%, cat: 4%, rabbit: 2%.' The highest wins." },
                    { step: "4. Learning", desc: "If it is wrong, the error is fed back through the network - this is called backpropagation - and the connection strengths (weights) are nudged slightly to reduce the mistake. Repeat millions of times." },
                  ].map(({ step, desc }) => (
                    <div key={step} className="flex gap-3">
                      <span className="font-bold text-brand-orange w-20 flex-shrink-0">{step}</span>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">What Are Weights? The Key Concept</h3>
                <p className="text-sm text-muted-foreground mb-3">Every connection between neurons has a number attached to it called a <strong>weight</strong>. Weights determine how strongly one neuron influences the next. A high weight means "this connection matters a lot." A weight near zero means "ignore this connection."</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Before training:</span> all weights are random noise. The network produces useless outputs.</p>
                  <p><span className="font-medium text-foreground">During training:</span> the network sees an example, makes a prediction, measures how wrong it was (the "loss"), then nudges weights slightly in the direction that would have made the prediction less wrong. This is repeated billions of times.</p>
                  <p><span className="font-medium text-foreground">After training:</span> weights have been tuned to encode the patterns found in all the training data. A GPT-4-scale model has approximately 1.8 trillion parameters - 1.8 trillion carefully tuned numbers, all working together to generate text.</p>
                </div>
                <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded border text-sm">
                  <p className="font-medium text-brand-orange mb-1">Analogy: tuning a mixing board</p>
                  <p className="text-muted-foreground">Imagine a mixing board with 1.8 trillion sliders. Before training, all sliders are at random positions and the music sounds terrible. Training nudges each slider a tiny amount after every song, until the combination produces something that sounds right. At the end, you have a mixing board that reliably produces good output - even though no one deliberately set each slider by hand.</p>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-4 text-brand-orange">The Training Loop - Step by Step</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { step: "Forward pass", desc: "Feed an input (e.g. an image, a sentence) through the network from input layer to output layer. Get a prediction." },
                    { step: "Measure the loss", desc: "Compare the prediction to the correct answer. The 'loss' is a number measuring how wrong the prediction was. Large loss = very wrong. Zero loss = perfect." },
                    { step: "Backpropagation", desc: "Work backwards through the network, calculating how much each weight contributed to the error. This uses calculus (chain rule), but you do not need to know the math - just the concept." },
                    { step: "Weight update", desc: "Nudge every weight slightly in the direction that reduces the loss. The size of each nudge is controlled by the 'learning rate' - a setting that prevents overshooting." },
                    { step: "Repeat", desc: "Run this loop for billions of training examples across thousands of compute hours. The loss gradually decreases as the model gets better at the task." },
                  ].map(({ step, desc }) => (
                    <div key={step} className="flex gap-3 border-b last:border-0 py-2">
                      <span className="font-bold text-brand-green w-36 flex-shrink-0">{step}</span>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Why "Deep" Learning? Different Architectures</h3>
                <p className="text-sm text-muted-foreground mb-4">"Deep" simply refers to networks with many layers (dozens to hundreds). More layers allow the network to learn increasingly complex and abstract features. Different tasks call for different architectures:</p>
                <div className="space-y-3 text-sm">
                  {[
                    { arch: "CNNs - Convolutional Neural Networks", use: "Images and video", how: "Specialised layers that scan across an image looking for features at each position. Excellent at spatial tasks because the same feature-detector can find a cat's ear anywhere in the image, not just where it was in training." },
                    { arch: "RNNs - Recurrent Neural Networks", use: "Sequences (older text/audio models)", how: "Process inputs one step at a time while passing a 'memory' forward. Good for sequences but struggles with long-range dependencies - what was said 500 words ago still affects meaning now." },
                    { arch: "Transformers", use: "Modern language models, GPT, Claude, Gemini", how: "Use an 'attention' mechanism that lets every word look directly at every other word in the context to decide what to pay attention to. This is why modern LLMs can handle very long documents and capture subtle long-range relationships. Transformers are the reason modern AI made its big leap forward after 2017." },
                    { arch: "Diffusion Models", use: "Image generation (DALL-E, Midjourney, Stable Diffusion)", how: "Learn to reverse a noisy-scrambling process. Starting from random noise, they gradually remove noise in the direction of a meaningful image that matches the text prompt." },
                  ].map(({ arch, use, how }) => (
                    <div key={arch} className="border-l-2 border-blue-500/30 pl-4">
                      <p className="font-semibold text-blue-700 dark:text-blue-400">{arch}</p>
                      <p className="text-xs text-brand-orange mb-1">Best for: {use}</p>
                      <p className="text-muted-foreground">{how}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Scale Matters: Why Bigger Models Are Different</h3>
                <p className="text-sm text-muted-foreground mb-3">One of the surprising discoveries of the last decade is that when neural networks get large enough, new capabilities emerge that were not explicitly trained for:</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { size: "Small model (millions of params)", cap: "Translate between specific language pairs with decent quality" },
                    { size: "Medium model (billions of params)", cap: "Translate many languages, follow basic instructions, answer simple questions" },
                    { size: "Large model (100B+ params)", cap: "Reason through multi-step problems, write code, understand nuanced context, handle complex instructions" },
                    { size: "Very large model (1T+ params)", cap: "Sophisticated reasoning, creative writing, professional-level analysis across many domains simultaneously" },
                  ].map(({ size, cap }) => (
                    <div key={size} className="border rounded-lg p-3 bg-background">
                      <p className="font-medium text-brand-orange text-xs mb-1">{size}</p>
                      <p className="text-muted-foreground text-xs">{cap}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">This "emergent capabilities" phenomenon - where quantitative scale produces qualitative leaps - is one reason AI progress has felt so sudden and surprising.</p>
              </Card>
              <TextDisplay variant="callout" content="Memory aid: input flows forward to make a prediction, error flows backward to improve weights. Forward for output, backward for learning." />

              <QuickCheckCard
                prompt="What is the main job of a neural network during training?"
                options={[
                  { id: "a", label: "Memorize every input exactly once and never adjust" },
                  { id: "b", label: "Adjust internal weights so predictions improve over many examples" },
                  { id: "c", label: "Browse the web for the correct answer each time" },
                  { id: "d", label: "Replace training data with human intuition" },
                ]}
                correctOptionId="b"
                explanation="Training repeatedly adjusts the network's internal weights (parameters) using backpropagation so its predictions become more accurate over many examples."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: What AI Can't Do */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What AI Can&apos;t Do</h2>
              <TextDisplay content="AI is remarkably powerful - but it has fundamental limitations that are important to understand. Many of these limitations are structural: they come from how AI learns, not from a lack of effort by developers." />
              <TextDisplay variant="callout" content="Knowing these limitations is not about being pessimistic about AI. It is about using AI intelligently - getting real value while avoiding the specific failure modes that trip people up." />

              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">1. Hallucination - The Confidence Problem</h3>
                  <p className="text-sm text-muted-foreground mb-3">Hallucination is when an AI generates false information with full confidence. It is not lying - it does not know what it does not know. Because the model&apos;s job is to generate plausible text, it will sometimes produce a fluent, convincing-sounding answer that is simply wrong.</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Real examples that have happened:</p>
                    <div className="space-y-2 pl-4 border-l-2 border-brand-orange/30">
                      <p className="text-muted-foreground">A lawyer submitted a legal brief with fake case citations that ChatGPT generated. The cases did not exist - but the citations looked entirely real.</p>
                      <p className="text-muted-foreground">A journalist used an AI to check biographies. The AI invented plausible-sounding but false publishing credits for real authors.</p>
                      <p className="text-muted-foreground">A student asked an AI for sources on a topic. The AI generated convincing-looking journal articles with DOI numbers - that did not exist.</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-brand-green/5 rounded border border-brand-green/20 text-sm">
                    <p className="font-medium text-brand-green mb-1">Why it happens:</p>
                    <p className="text-muted-foreground">The model learns that certain types of content (citations, statistics, biographies) follow certain patterns. It produces pattern-matching output - plausible structure filled with plausible-sounding content. It has no mechanism to check whether the content is real.</p>
                  </div>
                  <p className="text-sm font-medium mt-2">Rule: always verify specific facts, names, dates, statistics, and citations from AI before using them.</p>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-green">2. Knowledge Cutoff - Living in the Past</h3>
                  <p className="text-sm text-muted-foreground mb-3">Most AI models have a training data cutoff date. They know nothing about events that happened after that date - and they will not tell you they do not know unless you ask explicitly.</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm mt-3">
                    <div className="p-3 border rounded bg-background">
                      <p className="font-medium text-brand-orange mb-1">What this means practically</p>
                      <p className="text-muted-foreground">If you ask about a recent news event, the latest software version, current prices, or who won the last election, the model may either say it does not know, give outdated information, or worse - confidently fabricate an answer.</p>
                    </div>
                    <div className="p-3 border rounded bg-background">
                      <p className="font-medium text-brand-green mb-1">What helps</p>
                      <p className="text-muted-foreground">Use AI tools with real-time web access (Perplexity, ChatGPT with Browse) for current information. Always state the date in your prompt if recency matters. Ask the AI explicitly: "Is your knowledge current on this topic?"</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">3. Lack of True Understanding - Pattern Without Meaning</h3>
                  <p className="text-sm text-muted-foreground mb-3">AI can produce text that sounds deeply knowledgeable about philosophy, grief, physics, or human relationships - without having experienced or understood any of it. This is the difference between statistical pattern-matching and genuine comprehension.</p>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p><span className="font-medium text-foreground">The classic test:</span> ask an AI "If you move a bathtub to a different room, how many inches of hot water would it take to make soup?" A human immediately recognises this is nonsensical. Many AI systems will attempt to answer seriously, because the sentence uses known words in plausible-sounding structures.</p>
                    <p><span className="font-medium text-foreground">More practical version:</span> AI can describe empathy fluently but cannot actually feel it. It can explain physical constraints convincingly but may fail at simple spatial reasoning. It can write legal arguments without understanding the spirit of the law.</p>
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-green">4. Brittleness - Breaking at the Edges</h3>
                  <p className="text-sm text-muted-foreground mb-3">AI systems can be excellent within their training distribution but break unexpectedly outside it. Small changes that would not confuse a human can completely derail an AI.</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">Image example:</span> an image recognition model trained on front-facing cats may fail to classify a cat seen from behind or in unusual lighting - even though a toddler would have no trouble.</p>
                    <p><span className="font-medium text-foreground">Language example:</span> changing one word in a question can sometimes completely change an LLM&apos;s answer - not because the meaning changed, but because the exact phrasing triggers a different pattern association.</p>
                    <p><span className="font-medium text-foreground">Adversarial example:</span> placing a small, carefully crafted sticker on a stop sign can fool some autonomous driving models into misreading it - because the sticker creates a pattern the model was not trained to ignore.</p>
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">5. The Black Box Problem - Limited Explainability</h3>
                  <p className="text-sm text-muted-foreground mb-3">For most neural networks, we cannot easily explain why a specific prediction was made. The model has billions of weights working together in complex combinations - there is no simple "reason" to point to.</p>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p><span className="font-medium text-foreground">Why this matters:</span> in healthcare, when an AI recommends a treatment, doctors want to know why. In finance, when a loan is denied, regulators require an explanation. In criminal justice, when a risk assessment tool is used, defendants deserve to know how they were scored.</p>
                    <p><span className="font-medium text-foreground">Current state:</span> a growing field called "Explainable AI" (XAI) is working on this - tools like SHAP values and attention visualisation can give partial explanations - but deep neural networks remain fundamentally opaque compared to simple rule-based systems.</p>
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
                explanation="Exactly. AI is strongest as a decision-support partner, not a replacement for verification and accountability."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Red-flag checklist: when to slow down immediately</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  {[
                    "The output includes precise citations or statistics without verifiable sources",
                    "The answer sounds very certain on a topic with legal, medical, or financial consequences",
                    "The response ignores key constraints from your prompt",
                    "A small wording change produces a completely different answer",
                    "The model gives real-time claims but cannot show data freshness",
                    "The recommendation cannot be explained in plain language",
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
                    answer: "Because it learns statistical patterns from data, not grounded lived experience. It can sound convincing without truly understanding the physical or social world.",
                  },
                  {
                    title: "Hallucination",
                    prompt: "Why can AI confidently give wrong answers?",
                    answer: "Its goal is to generate plausible text, not to verify truth. It has no mechanism to check whether the specific facts it generates are real.",
                  },
                  {
                    title: "Knowledge cutoff",
                    prompt: "Why can AI give outdated information?",
                    answer: "Models are trained on data up to a certain date. They have no memory of events after that cutoff and may not know what they do not know.",
                  },
                  {
                    title: "Judgment",
                    prompt: "Why should humans stay responsible for important decisions?",
                    answer: "AI can support analysis and drafting, but it lacks accountability, values, and the broader context needed for high-stakes judgment.",
                  },
                ]}
              />

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">Best beginner mindset</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Use AI for support, acceleration, and first drafts - not final authority",
                    "Verify important facts, numbers, citations, and dates from external sources",
                    "Expect errors when tasks require deep judgment, live data, or real-world understanding",
                    "Be especially careful when AI sounds most confident - that is when it hallucinate most dangerously",
                    "Keep a human in the loop for anything consequential",
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
                    "Neural networks improve by adjusting weights through repeated error correction.",
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
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-3")}>
                      Continue to Module 3
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

