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
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><Brain className="h-5 w-5 text-brand-green" /> The Five Categories of AI Capability</h3>
                <p className="text-sm text-muted-foreground mb-4">When researchers say AI can perform "human-level tasks," they mean five broad categories. Modern AI systems are strong in some and weak in others:</p>
                <div className="space-y-3">
                  {[
                    { category: "Perception", examples: "Face recognition, speech recognition, reading handwriting, detecting objects in photos", how: "The AI is trained on millions of labelled examples until it can reliably identify what it sees or hears." },
                    { category: "Language", examples: "Translation, summarisation, answering questions, writing, code generation", how: "Large language models learn patterns across billions of words and can generate fluent, contextually appropriate text." },
                    { category: "Reasoning & Problem-Solving", examples: "Playing chess, diagnosing a disease from symptoms, recommending the best route", how: "AI reasons within a defined problem space using learned patterns, logic rules, or search algorithms - not lived understanding." },
                    { category: "Learning", examples: "A spam filter that improves as you mark more emails; a recommendation engine that refines over time", how: "Machine learning algorithms adjust model weights based on new data and feedback, improving performance without being reprogrammed." },
                    { category: "Action", examples: "Self-driving cars braking for a pedestrian, a robot arm sorting packages, an AI agent booking a flight", how: "Combines perception and reasoning to control physical or digital systems in real time." },
                  ].map(({ category, examples, how }) => (
                    <Card key={category} className="p-4">
                      <div className="flex gap-3 items-start">
                        <span className="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5">{category}</span>
                        <div className="space-y-1">
                          <p className="text-sm"><span className="font-medium">Examples:</span> <span className="text-muted-foreground">{examples}</span></p>
                          <p className="text-sm"><span className="font-medium">How AI does it:</span> <span className="text-muted-foreground">{how}</span></p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

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

              <div className="space-y-4">
                <Card className="p-5 border-l-4 border-l-brand-green">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">1950 — The founding question</p>
                  <h3 className="font-semibold mb-2">Alan Turing asks &ldquo;Can machines think?&rdquo;</h3>
                  <p className="text-sm text-muted-foreground">Alan Turing published <em>Computing Machinery and Intelligence</em>, introducing the <strong>Turing Test</strong>: a machine passes if a human cannot distinguish it from another human in text conversation. This single paper defined the goal of AI research for decades.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-brand-orange">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">1956 — The Dartmouth Conference</p>
                  <h3 className="font-semibold mb-2">The field is officially born</h3>
                  <p className="text-sm text-muted-foreground">John McCarthy, Marvin Minsky, Claude Shannon, and others gathered at Dartmouth College for a summer workshop. McCarthy coined the term "Artificial Intelligence." They confidently believed machines would reach human-level intelligence within 20 years. They were off by at least 70 years.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-brand-green">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">1966 — The first chatbot</p>
                  <h3 className="font-semibold mb-2">ELIZA - a mirror that felt like a mind</h3>
                  <p className="text-sm text-muted-foreground">Joseph Weizenbaum at MIT built ELIZA, a program that reflected users&apos; sentences back to them as questions. When given the therapist script "DOCTOR," people formed emotional attachments to it and confided personal secrets — even knowing it was just a program. Weizenbaum was disturbed by this and spent the rest of his career warning about human over-trust in AI.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-red-400 bg-red-50 dark:bg-red-950/20">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-500 mb-1">1974-1980 and 1987-1993 — The Two AI Winters</p>
                  <h3 className="font-semibold mb-2">Funding collapses, hype dies</h3>
                  <p className="text-sm text-muted-foreground mb-2">An <strong>AI Winter</strong> is a period when AI funding dried up and public interest collapsed after promises were not met. There were two major ones:</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">First Winter (1974-1980):</span> Early AI programs couldn&apos;t scale. Translation software needed to understand context to work — and no one knew how to give machines context. Government funding was cut. Progress stalled.</p>
                    <p><span className="font-medium text-foreground">Second Winter (1987-1993):</span> The "expert systems" boom ended. These systems required experts to hand-write thousands of rules — they were expensive, fragile, and couldn&apos;t keep up with changing real-world conditions. Companies lost billions. The field became unfashionable again.</p>
                  </div>
                  <p className="text-sm font-medium mt-2">This is why AI researchers today are careful about hype — the field has been burned before.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-brand-orange">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">1986 — The algorithm that changed everything</p>
                  <h3 className="font-semibold mb-2">Backpropagation - teaching networks to learn from mistakes</h3>
                  <p className="text-sm text-muted-foreground">David Rumelhart, Geoffrey Hinton, and Ronald Williams published a practical method for training neural networks called <strong>backpropagation</strong>. It made multi-layer neural networks trainable for the first time. But computers of the era were too slow to make full use of it. The idea sat waiting for the hardware to catch up — which would take 25 more years.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-brand-green">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">1997 — Narrow AI outperforms the world&apos;s best</p>
                  <h3 className="font-semibold mb-2">Deep Blue defeats Garry Kasparov</h3>
                  <p className="text-sm text-muted-foreground">IBM&apos;s Deep Blue became the first computer to defeat a reigning world chess champion in a standard match. This proved that narrow AI could beat human experts — at least within a perfectly defined domain. Deep Blue evaluated 200 million chess positions per second, using hand-crafted rules, not learning.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-brand-orange">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">2012 — The deep learning revolution</p>
                  <h3 className="font-semibold mb-2">AlexNet and the ImageNet moment</h3>
                  <p className="text-sm text-muted-foreground">Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton entered a global image-recognition competition (ImageNet) with a deep neural network trained on GPUs. Their system achieved a 26% error rate when the next best was 26.2% — crushing all previous approaches. This moment is often called the "Big Bang" of modern AI. Within 2 years, every major tech company switched to deep learning. Within 10 years, almost all AI was built on the same core ideas.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-brand-green">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">2017 — The architecture of modern AI</p>
                  <h3 className="font-semibold mb-2">&ldquo;Attention Is All You Need&rdquo; — the Transformer paper</h3>
                  <p className="text-sm text-muted-foreground">A team at Google Brain published a 12-page paper introducing the <strong>Transformer architecture</strong>. It replaced recurrent networks with an "attention mechanism" that allows every word to directly interact with every other word in a sentence. This solved the long-range dependency problem that had limited previous language models. ChatGPT, Claude, Gemini, and LLaMA are all Transformers. The paper has since been cited over 100,000 times.</p>
                </Card>

                <Card className="p-5 border-l-4 border-l-brand-orange">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-1">2022-present — AI for everyone</p>
                  <h3 className="font-semibold mb-2">ChatGPT launches and AI goes mainstream</h3>
                  <p className="text-sm text-muted-foreground">OpenAI released ChatGPT in November 2022. It reached 100 million users in 2 months — the fastest product adoption in history. For the first time, a general-purpose AI interface was accessible to people with no technical background. Since then, every major technology company has released competing models. The current era is defined by rapid capability improvement, widespread deployment, and significant societal debate about consequences.</p>
                </Card>
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

