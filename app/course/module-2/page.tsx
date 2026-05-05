/**
 * MODULE 2: HOW MACHINES LEARN
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"

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
            <p className="text-lg text-muted-foreground mb-4">Peek inside the black box ? no equations required</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="In this module you will understand how AI systems actually learn ? using intuitive analogies instead of math. By the end, the phrase 'machine learning' will make complete sense to you." />
              <Card className="p-5 space-y-2">
                {["What is machine learning ? and how it differs from regular software","Training data ? the fuel that makes AI possible","Supervised vs. unsupervised learning ? two different approaches","Neural networks ? the architecture behind modern AI","What AI genuinely cannot do"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module ¡æ</Button>
            </div>
          )}

          {/* 1: What Is ML */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What Is Machine Learning?</h2>
              <TextDisplay content="Machine learning is a type of AI where the system learns from data instead of following hand-written rules." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3">The Old Way vs. Machine Learning</h3>
                
              </Card>
              
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ¡æ</Button>
            </div>
          )}

          {/* 2: Training Data */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Training Data Explained</h2>
              <TextDisplay content="Training data is the collection of examples used to teach an AI model. It is the most important ingredient in any AI system." />
              <TextDisplay variant="callout" content="A great analogy: imagine learning to cook by reading 10,000 recipes. The more diverse, accurate, and well-written those recipes are, the better cook you become. AI works the same way." />
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
                <TextDisplay variant="warning" content="Important: If training data is biased, incomplete, or wrong ? the AI will be too. Garbage in, garbage out. This is why data quality is a major ethical concern in AI." />
              </div>
              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Spot the Bad Training Data</h3>
                
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ¡æ</Button>
            </div>
          )}

          {/* 3: Supervised vs Unsupervised */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Supervised vs. Unsupervised Learning</h2>
              <TextDisplay content="There are two main ways machines learn from data. The difference comes down to whether the training examples have labels." />
              
              
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-2 text-brand-green">A Third Type ? Reinforcement Learning</h3>
                <p className="text-sm text-muted-foreground mb-3">There is a third major learning style that powers some of AI&apos;s most impressive achievements:</p>
                <div className="text-sm space-y-3">
                  <p><span className="font-semibold text-brand-orange">Reinforcement Learning (RL)</span> ? the AI learns by trial and error in a simulated environment, receiving rewards for correct actions and penalties for wrong ones. Like training a dog with treats, but for software at superhuman speed.</p>
                  <div className="space-y-2 pl-3 border-l-2 border-brand-orange/30">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">AlphaGo (2016):</span> DeepMind&apos;s AI played millions of Go games against itself, getting a +1 reward for wins and -1 for losses. After enough iterations, it discovered strategies no human had ever conceived ? including the legendary Move 37.</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">RLHF ? how ChatGPT got its personality:</span> After initial training on text, OpenAI used Reinforcement Learning from Human Feedback. Human raters compared pairs of responses and marked which was more helpful, accurate, and safe. The model was then trained to produce the kind of responses humans preferred. This is why ChatGPT sounds helpful and coherent rather than just statistically likely ? humans taught it what &apos;good&apos; means.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">Bonus: Transfer Learning ? Why Fine-Tuning Works</h3>
                <p className="text-sm text-muted-foreground mb-3">There is a fourth concept worth understanding because it explains a huge amount of modern AI:</p>
                <div className="text-sm space-y-3">
                  <p><span className="font-semibold text-brand-orange">Transfer Learning</span> ? instead of training a model from scratch for every task, you take a model already trained on a huge general dataset and fine-tune it on a smaller, specific dataset for your new task.</p>
                  <p className="text-muted-foreground">Think of it like hiring an experienced doctor and training them in a specialist area ? versus training a brand new medical student from scratch. The specialist training takes months; starting from zero takes a decade.</p>
                  <div className="space-y-2 pl-3 border-l-2 border-blue-500/30">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Example:</span> GPT-4 is trained on hundreds of billions of words of general text. To create a medical AI, you then fine-tune it on medical literature ? it already understands language, so you just need to teach it domain knowledge. This process takes days and thousands of examples, not years and billions of examples.</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Why it matters:</span> Transfer learning is why the AI revolution accelerated so sharply after 2017. The same base model (called a foundation model) can be adapted into a legal AI, a coding assistant, a customer service bot, or a medical tool ? all using the same foundation, just with specialised training on top.</p>
                  </div>
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ¡æ</Button>
            </div>
          )}

          {/* 4: Neural Networks */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Neural Networks Simply Explained</h2>
              <TextDisplay content="A neural network is the architecture used by most modern AI systems, including ChatGPT, image generators, and voice assistants." />
              <TextDisplay variant="callout" content="The name comes from the brain. Just like neurons in your brain connect to each other to process information, a neural network is made of artificial 'neurons' (simple math functions) connected in layers." />
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3">How it works ? a simple example</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { step: "1. Input", desc: "You show the network an image of an animal." },
                      { step: "2. Layers", desc: "The image passes through many layers of neurons. Early layers detect edges. Middle layers detect shapes. Later layers detect features like ears, snouts, fur texture." },
                      { step: "3. Output", desc: "The final layer outputs a guess: 'This is a dog with 94% confidence.'" },
                      { step: "4. Learning", desc: "If it is wrong, the error is fed back through the network and the connections are adjusted ? millions of times, until it gets good at the task." },
                    ].map(({ step, desc }) => (
                      <div key={step} className="flex gap-3">
                        <span className="font-bold text-brand-orange w-20 flex-shrink-0">{step}</span>
                        <span className="text-muted-foreground">{desc}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Quick check</h3>
                
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ¡æ</Button>
            </div>
          )}

          {/* 5: What AI Can't Do */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What AI Can&apos;t Do</h2>
              <TextDisplay content="AI is remarkably powerful ? but it has fundamental limitations that are important to understand." />
              <TextDisplay variant="callout" content="Flip each card to discover WHY AI has this limitation. Understanding the reason is more useful than just knowing the fact." />
              
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ¡æ</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              
              
              
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Well done! You now understand the fundamentals of how AI learns. Next up: we go hands-on with Large Language Models and learn how to communicate with AI effectively." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-3")}>
                      Continue to Module 3 ¡æ
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
