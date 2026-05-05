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
import { FlipCard } from "@/components/learning/flip-card"
import { Flashcard } from "@/components/learning/flashcard"
import { ComparisonCard } from "@/components/learning/comparison-card"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { MatchingGame } from "@/components/learning/matching-game"
import { GridDisplay } from "@/components/learning/grid-display"
import { TextInputExercise } from "@/components/learning/text-input-exercise"
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
            <p className="text-lg text-muted-foreground mb-4">Peek inside the black box — no equations required</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="In this module you will understand how AI systems actually learn — using intuitive analogies instead of math. By the end, the phrase 'machine learning' will make complete sense to you." />
              <Card className="p-5 space-y-2">
                {["What is machine learning — and how it differs from regular software","Training data — the fuel that makes AI possible","Supervised vs. unsupervised learning — two different approaches","Neural networks — the architecture behind modern AI","What AI genuinely cannot do"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module →</Button>
            </div>
          )}

          {/* 1: What Is ML */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What Is Machine Learning?</h2>
              <TextDisplay content="Machine learning is a type of AI where the system learns from data instead of following hand-written rules." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3">The Old Way vs. Machine Learning</h3>
                <ComparisonCard
                  leftTitle="Traditional Programming"
                  rightTitle="Machine Learning"
                  items={[
                    { left: "Programmer writes rules: IF spam word THEN block email", right: "System learns from 1,000,000 examples of spam and non-spam emails" },
                    { left: "Rules are fixed — someone must update them manually", right: "Model improves as it sees more data" },
                    { left: "Easy to explain exactly why a decision was made", right: "Can be hard to explain why the model made a specific decision" },
                    { left: "Great for simple, well-defined tasks", right: "Great for complex tasks with many variables" },
                  ]}
                />
              </Card>
              <FlipCard
                front="What is the simplest way to describe machine learning?"
                back="Instead of telling the computer exactly what to do, you show it thousands of examples and let it figure out the pattern itself. Just like a child learns to recognise cats not from a rule book, but from seeing many cats."
              />
              <MultipleChoice
                question="A bank wants to automatically approve or reject loan applications. Using a traditional rule-based approach, which of the following would they write?"
                options={[
                  { text: "Show the system 1 million past loan decisions and let it figure out the pattern", isCorrect: false, feedback: "That is machine learning — learning from examples. Traditional programming requires writing the rules explicitly." },
                  { text: "IF income > $50,000 AND credit score > 700 AND debt-to-income ratio < 0.4 THEN approve", isCorrect: true, feedback: "Correct! Traditional programming means a human expert writes explicit rules that the computer follows exactly. Every scenario must be anticipated and coded in advance." },
                  { text: "Train the algorithm on historical approval data to find correlations", isCorrect: false, feedback: "Finding correlations in historical data is machine learning — the system learns the rules from data rather than having rules written explicitly." },
                  { text: "Let the AI observe human loan officers and copy their behaviour", isCorrect: false, feedback: "Observing and copying behaviour to learn patterns is a form of machine learning (imitation learning), not traditional rule-based programming." },
                ]}
                explanation="Traditional programming requires a human expert to explicitly write every rule. Machine learning flips this: instead of writing rules, you provide examples — and the system learns the rules automatically. The bank example is perfect: manually writing every approval rule is impractical, but training on millions of past decisions is very effective."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
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
                <TextDisplay variant="warning" content="Important: If training data is biased, incomplete, or wrong — the AI will be too. Garbage in, garbage out. This is why data quality is a major ethical concern in AI." />
              </div>
              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Spot the Bad Training Data</h3>
                <MultipleChoice
                  question="A hospital wants to train an AI to predict which patients are likely to need urgent care. They collect 10 years of patient records — but 90% of their patients are over 60. What is the problem?"
                  options={[
                    { text: "10 years is not enough data — they need 20 years", isCorrect: false, feedback: "More data helps, but the age imbalance is the critical problem here. 10 years of skewed data is still skewed data." },
                    { text: "The AI will likely be less accurate for younger patients because they are underrepresented in training", isCorrect: true, feedback: "Correct! If 90% of training examples are elderly patients, the AI learns patterns from that group. It will perform poorly on younger patients whose health patterns differ significantly." },
                    { text: "Patient records are too private to use as training data", isCorrect: false, feedback: "Privacy is a legitimate concern, but with proper de-identification it can be managed. The underrepresentation is the bigger problem here." },
                    { text: "There is no problem — more training data is always better regardless of balance", isCorrect: false, feedback: "Quantity does not fix quality. Biased data — even in large quantities — produces biased AI." },
                  ]}
                  explanation="This is a classic example of sampling bias in training data. The AI will be optimised for the majority group and underperform for underrepresented groups. In healthcare, this is not just a technical problem — it can cost lives."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 3: Supervised vs Unsupervised */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Supervised vs. Unsupervised Learning</h2>
              <TextDisplay content="There are two main ways machines learn from data. The difference comes down to whether the training examples have labels." />
              <ComparisonCard
                leftTitle="Supervised Learning"
                rightTitle="Unsupervised Learning"
                items={[
                  { left: "Data is labelled — every example comes with the right answer", right: "Data is unlabelled — the system finds patterns on its own" },
                  { left: "Like studying with an answer key", right: "Like organising a pile of books by finding similarities yourself" },
                  { left: "Used for: spam detection, image classification, language translation", right: "Used for: customer segmentation, anomaly detection, topic clustering" },
                  { left: "More predictable results", right: "Can discover unexpected patterns" },
                  { left: "Requires a lot of labelled data (expensive to create)", right: "Works with raw, unlabelled data" },
                ]}
              />
              <MatchingGame
                title="Match each AI task to its learning type"
                pairs={[
                  { left: "Detecting fraudulent bank transactions", right: "Supervised Learning" },
                  { left: "Grouping news articles by topic", right: "Unsupervised Learning" },
                  { left: "Translating text from English to French", right: "Supervised Learning" },
                  { left: "Finding unusual patterns in network traffic", right: "Unsupervised Learning" },
                ]}
                onComplete={() => handleQuizComplete("matching", true)}
              />
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-2 text-brand-green">A Third Type — Reinforcement Learning</h3>
                <p className="text-sm text-muted-foreground mb-3">There is a third major learning style that powers some of AI&apos;s most impressive achievements:</p>
                <div className="text-sm space-y-3">
                  <p><span className="font-semibold text-brand-orange">Reinforcement Learning (RL)</span> — the AI learns by trial and error in a simulated environment, receiving rewards for correct actions and penalties for wrong ones. Like training a dog with treats, but for software at superhuman speed.</p>
                  <div className="space-y-2 pl-3 border-l-2 border-brand-orange/30">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">AlphaGo (2016):</span> DeepMind&apos;s AI played millions of Go games against itself, getting a +1 reward for wins and -1 for losses. After enough iterations, it discovered strategies no human had ever conceived — including the legendary Move 37.</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">RLHF — how ChatGPT got its personality:</span> After initial training on text, OpenAI used Reinforcement Learning from Human Feedback. Human raters compared pairs of responses and marked which was more helpful, accurate, and safe. The model was then trained to produce the kind of responses humans preferred. This is why ChatGPT sounds helpful and coherent rather than just statistically likely — humans taught it what &apos;good&apos; means.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">Bonus: Transfer Learning — Why Fine-Tuning Works</h3>
                <p className="text-sm text-muted-foreground mb-3">There is a fourth concept worth understanding because it explains a huge amount of modern AI:</p>
                <div className="text-sm space-y-3">
                  <p><span className="font-semibold text-brand-orange">Transfer Learning</span> — instead of training a model from scratch for every task, you take a model already trained on a huge general dataset and fine-tune it on a smaller, specific dataset for your new task.</p>
                  <p className="text-muted-foreground">Think of it like hiring an experienced doctor and training them in a specialist area — versus training a brand new medical student from scratch. The specialist training takes months; starting from zero takes a decade.</p>
                  <div className="space-y-2 pl-3 border-l-2 border-blue-500/30">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Example:</span> GPT-4 is trained on hundreds of billions of words of general text. To create a medical AI, you then fine-tune it on medical literature — it already understands language, so you just need to teach it domain knowledge. This process takes days and thousands of examples, not years and billions of examples.</p>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Why it matters:</span> Transfer learning is why the AI revolution accelerated so sharply after 2017. The same base model (called a foundation model) can be adapted into a legal AI, a coding assistant, a customer service bot, or a medical tool — all using the same foundation, just with specialised training on top.</p>
                  </div>
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
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
                  <h3 className="font-semibold mb-3">How it works — a simple example</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { step: "1. Input", desc: "You show the network an image of an animal." },
                      { step: "2. Layers", desc: "The image passes through many layers of neurons. Early layers detect edges. Middle layers detect shapes. Later layers detect features like ears, snouts, fur texture." },
                      { step: "3. Output", desc: "The final layer outputs a guess: 'This is a dog with 94% confidence.'" },
                      { step: "4. Learning", desc: "If it is wrong, the error is fed back through the network and the connections are adjusted — millions of times, until it gets good at the task." },
                    ].map(({ step, desc }) => (
                      <div key={step} className="flex gap-3">
                        <span className="font-bold text-brand-orange w-20 flex-shrink-0">{step}</span>
                        <span className="text-muted-foreground">{desc}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                <FlipCard
                  front="Why are modern AI models so large?"
                  back="ChatGPT-4 has hundreds of billions of 'neurons' and connections. More connections = more ability to represent complex patterns in language. The training required thousands of powerful computers running for months — and cost tens of millions of dollars."
                />
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Quick check</h3>
                <MultipleChoice
                  question="In a neural network, what happens when the model makes a wrong prediction during training?"
                  options={[
                    { text: "The wrong answer is deleted and the model moves on", isCorrect: false, feedback: "Neural networks do not just delete errors — they learn from them by adjusting the strength of connections." },
                    { text: "The error is fed back through the network and the connections are adjusted to reduce future mistakes", isCorrect: true, feedback: "Correct! This is called backpropagation. The model adjusts millions of connection weights slightly each time it sees an error — eventually getting much better at the task through millions of repetitions." },
                    { text: "A human programmer manually fixes the error", isCorrect: false, feedback: "Neural network training is automated — humans define the training setup but do not manually correct individual errors." },
                    { text: "The model restarts from the beginning with different data", isCorrect: false, feedback: "Models do not restart for each error. They continuously update through the whole training dataset many times over." },
                  ]}
                  explanation="The learning loop in a neural network is: predict → compare to correct answer → calculate error → adjust connection weights slightly to reduce that error → repeat millions of times. This process (gradient descent + backpropagation) is how neural networks get good at tasks."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 5: What AI Can't Do */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What AI Can&apos;t Do</h2>
              <TextDisplay content="AI is remarkably powerful — but it has fundamental limitations that are important to understand." />
              <TextDisplay variant="callout" content="Flip each card to discover WHY AI has this limitation. Understanding the reason is more useful than just knowing the fact." />
              <Flashcard cards={[
                { id: "meaning", front: "Can AI understand the meaning of words?", back: "No. Language AI predicts statistically likely next tokens — it does not know what words mean the way you do. It can write a convincing essay about heartbreak without ever having felt anything. Understanding and pattern-matching look similar from the outside, but they are fundamentally different." },
                { id: "reasoning", front: "Can AI reliably reason through novel logical problems?", back: "No. AI often fails at logic puzzles and math problems it has not seen before — producing confident-sounding but completely wrong answers. It is very good at recognising patterns from training data, but genuine first-principles reasoning is still a major unsolved challenge." },
                { id: "uncertainty", front: "Can AI know when it doesn't know something?", back: "No — and this is called hallucination. AI can state incorrect facts with total confidence because it has no internal mechanism to detect its own uncertainty. It produces the most statistically plausible output, regardless of whether that output is true. Always verify important AI-generated claims." },
                { id: "learning", front: "Does AI learn from your conversation with it?", back: "Usually not. Most AI models do not permanently update from individual interactions — each conversation starts fresh from the same base model. Some systems (like Copilot with memory enabled) store summaries, but the underlying model weights do not change from your chat." },
                { id: "goals", front: "Does AI have goals, desires, or intentions of its own?", back: "No. Current AI has no motivation, agenda, or consciousness. It processes your input and produces the statistically most likely output. There is no 'it' that wants anything — just mathematics operating on pattern-matched representations of language." },
                { id: "judgment", front: "Can AI replace human judgment in high-stakes decisions?", back: "It should not — at least not yet. AI can assist with medical diagnosis, legal research, and financial decisions, but the final call must involve human accountability. AI errors in high-stakes contexts can cause real harm, and unlike a human professional, AI cannot be held responsible." },
              ]} />
              <TextInputExercise
                title="Reflect: AI limitations in the real world"
                prompt="Think of a time you (or someone you know) encountered an AI limitation from this section — a hallucination, a confident wrong answer, or a situation where AI clearly did not 'understand' what it was saying. Describe what happened and what it revealed about how AI actually works."
                placeholder="Example: I asked ChatGPT about a local restaurant and it described the menu in detail — but the restaurant had closed two years ago. The AI had no way to know its training data was outdated, and presented stale information with complete confidence. This made me realise AI's knowledge has a cutoff date and it cannot know what it does not know..."
                onComplete={() => {}}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <MultipleChoice
                question="What is the key difference between traditional programming and machine learning?"
                options={[
                  { text: "Machine learning uses faster computers", isCorrect: false, feedback: "Speed is not the key difference." },
                  { text: "Machine learning learns rules from data; traditional programming uses hand-written rules", isCorrect: true, feedback: "Exactly! ML discovers patterns in data instead of following explicit rules." },
                  { text: "Machine learning only works for images", isCorrect: false, feedback: "ML is used for text, speech, images, and much more." },
                  { text: "Traditional programming cannot make decisions", isCorrect: false, feedback: "Traditional programs make decisions via if/else logic." },
                ]}
                explanation="Machine learning is about learning from examples. You give the system data, and it figures out the patterns itself — without a programmer writing specific rules."
                onComplete={(c) => handleQuizComplete("quiz1", c)}
              />
              <MultipleChoice
                question="Why is training data quality so important in AI?"
                options={[
                  { text: "More data always means better AI", isCorrect: false, feedback: "Quantity matters less than quality — biased or incorrect data leads to poor AI." },
                  { text: "AI can only work with data from the internet", isCorrect: false, feedback: "AI can be trained on any data — images, audio, text, sensor readings, etc." },
                  { text: "If training data is biased or incorrect, the AI model will also be biased or incorrect", isCorrect: true, feedback: "Correct! 'Garbage in, garbage out' is a fundamental principle of AI." },
                  { text: "Training data is not important — the algorithm is what matters", isCorrect: false, feedback: "Both data and algorithm matter, but data quality is foundational." },
                ]}
                explanation="AI learns from its training data. Biased data produces biased AI. This is why data collection and curation is a critical — and ethically loaded — part of AI development."
                onComplete={(c) => handleQuizComplete("quiz2", c)}
              />
              <MultipleChoice
                question="What does it mean when an AI model 'hallucinates'?"
                options={[
                  { text: "The AI becomes confused and shuts down", isCorrect: false, feedback: "Hallucination does not cause a shutdown." },
                  { text: "The AI generates creative, imaginative content", isCorrect: false, feedback: "Hallucination is not a positive term in AI — it means generating false information." },
                  { text: "The AI produces confident-sounding but factually incorrect information", isCorrect: true, feedback: "Correct! Hallucination is a major limitation of language models." },
                  { text: "The AI sees images that are not there", isCorrect: false, feedback: "While the word 'hallucination' suggests this, in AI it refers specifically to generating false factual claims." },
                ]}
                explanation="AI hallucination is when a language model generates statements that sound credible but are factually wrong — and presents them with complete confidence. This is why you should always verify important AI-generated information."
                onComplete={(c) => handleQuizComplete("quiz3", c)}
              />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Well done! You now understand the fundamentals of how AI learns. Next up: we go hands-on with Large Language Models and learn how to communicate with AI effectively." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-3")}>
                      Continue to Module 3 →
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
