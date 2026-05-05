/**
 * MODULE 1: WHAT IS ARTIFICIAL INTELLIGENCE?
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
import { Slideshow } from "@/components/learning/slideshow"
import { ComparisonCard } from "@/components/learning/comparison-card"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { MatchingGame } from "@/components/learning/matching-game"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Brain, Clock, Lightbulb } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"

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

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="By the end of this module you will be able to define AI in plain language, explain its history, distinguish between types of AI, spot AI in your daily life, and confidently correct common myths." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4" /> What is in this module</h3>
                <ul className="space-y-2 text-sm">
                  {["Defining AI — what it actually means","A brief history — from 1950 to today","Types of AI — narrow, general, super","AI in your daily life — real examples","Myths vs. Reality — what AI can and cannot do","Module Quiz"].map((item) => (
                    <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" />{item}</li>
                  ))}
                </ul>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module →</Button>
            </div>
          )}

          {/* 1: Defining AI */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Defining AI</h2>
              <TextDisplay content="Artificial Intelligence (AI) is software that is designed to perform tasks that would normally require human intelligence." />
              <TextDisplay variant="callout" content="Think of it this way: human intelligence lets you recognise faces, understand language, solve problems, and learn from experience. AI is software engineered to do the same kinds of things — not by thinking the way humans do, but by finding patterns in massive amounts of data." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3">Three Key Words in the Definition</h3>
                <div className="space-y-3">
                  {[
                    { word: "Artificial", meaning: "Made by people, not nature. AI is built by engineers and researchers — not something that emerges spontaneously from the universe." },
                    { word: "Intelligence", meaning: "The ability to learn, reason, understand language, or make decisions — tasks that previously required human minds to perform." },
                    { word: "Software", meaning: "AI runs on computers. It is not a robot body (though robots can use AI) — it is code running on chips, servers, and devices you already own." },
                  ].map(({ word, meaning }) => (
                    <div key={word} className="flex gap-3">
                      <span className="font-bold text-brand-orange w-32 flex-shrink-0">{word}</span>
                      <span className="text-muted-foreground">{meaning}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <FlipCard front="Is AI the same as a computer program?" back="Not exactly. All AI is software, but not all software is AI. A basic calculator follows fixed rules you wrote. AI learns its own rules from data — you show it millions of examples and it figures out the pattern itself." />
              <FlipCard front="Is robotics the same as AI?" back="No — though they often work together. A robot is the physical body (motors, sensors, arms). AI is the software that decides what to do. A robot vacuum uses AI to navigate; the wheels and motor are just robotics. Many robots have no AI at all — they follow fixed programmed routines." />
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-brand-orange" /> Core AI Vocabulary — Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These terms will appear throughout the course. Click each card to reveal the definition.</p>
                <Flashcard cards={[
                  { id: "ai-def", front: "Artificial Intelligence", back: "Software that performs tasks normally requiring human intelligence — learning from data, recognising patterns, understanding language, making decisions." },
                  { id: "algo", front: "Algorithm", back: "A step-by-step set of instructions for solving a problem. Traditional software uses hand-written algorithms. AI learns its own algorithms by finding patterns in data." },
                  { id: "model", front: "AI Model", back: "The end product of training an AI system — the file or service that takes inputs and produces outputs. ChatGPT, the spam filter in your email, and face-unlock on your phone are all AI models." },
                  { id: "inference", front: "Inference", back: "When an AI model is actually used to make predictions or generate outputs. Training is how a model learns; inference is when it applies what it learned to new data in real time." },
                  { id: "parameter", front: "Parameter", back: "A numeric value inside an AI model adjusted during training to capture patterns. GPT-4 reportedly has ~1.8 trillion parameters. More parameters = more capacity to learn complex patterns." },
                  { id: "accuracy", front: "Accuracy", back: "How often an AI model gets the correct answer on a test dataset. 95% accuracy means correct 95 out of 100 times. But accuracy alone can be misleading — the type of errors matters too." },
                ]} />
              </div>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 2: History */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">A Brief History of AI</h2>
              <TextDisplay content="AI is not new — researchers have been working on it since the 1950s. Click through the timeline below to see how we got here:" />
              <Slideshow slides={[
                { id: "1950", title: "1950 — Alan Turing asks: Can machines think?", content: "Alan Turing published his landmark paper 'Computing Machinery and Intelligence' and proposed the famous Turing Test: if a machine could carry on a conversation indistinguishable from a human, it should be considered intelligent.\n\nThis single question has driven AI research for over 70 years." },
                { id: "1956", title: "1956 — The word 'Artificial Intelligence' is born", content: "John McCarthy coined the term 'Artificial Intelligence' at the Dartmouth Conference — the official birth of AI as a research field.\n\nMcCarthy's ambition: build machines that can think. Researchers were optimistic that human-level AI was just a few decades away. (It took longer than expected.)" },
                { id: "1997", title: "1997 — Deep Blue defeats the world chess champion", content: "IBM's Deep Blue beat Garry Kasparov in a six-game match — a stunning moment that showed AI could outperform the world's best human in a complex strategic game.\n\nKasparov accused IBM of cheating. A rematch was denied. The result stood." },
                { id: "2011", title: "2011 — IBM Watson wins Jeopardy!", content: "Watson competed against two Jeopardy! champions — and won decisively. The impressive part: Jeopardy! requires understanding wordplay, puns, and cultural references. Watson had to process natural language in real time.\n\nThis was a huge leap for AI and natural language understanding." },
                { id: "2012", title: "2012 — The deep learning revolution", content: "A neural network called AlexNet entered the ImageNet computer vision competition and utterly demolished the competition — cutting the error rate nearly in half.\n\nThis moment launched the deep learning era. Every major AI advance since — ChatGPT, image generators, voice assistants — traces back to this breakthrough." },
                { id: "2016", title: "2016 — AlphaGo beats the world Go champion", content: "Go was considered the holy grail of AI challenges — the number of possible board positions exceeds the atoms in the observable universe.\n\nDeepMind's AlphaGo beat Lee Sedol 4-1 using strategies that surprised even professional Go players. One move (Move 37) became legendary — no human would have played it." },
                { id: "2022", title: "2022 — ChatGPT goes mainstream", content: "OpenAI's ChatGPT reached 100 million users in just two months — faster than any product in history. For the first time, anyone could have a natural, open-ended conversation with AI.\n\nAI moved from research labs to kitchen tables overnight. The world has not been the same since." },
                { id: "2023", title: "2023 — The multimodal race begins", content: "GPT-4 launched with vision capabilities. Claude 2 extended context to 100,000 tokens. Google launched Gemini. AI could now see images, analyse documents, and understand far longer conversations.\n\nThe year AI stopped being a text-only technology and became truly multimodal." },
                { id: "now", title: "Today — AI is everywhere", content: "From medical diagnosis to music generation, legal research to software development — AI is woven into nearly every industry.\n\nAnd the pace is accelerating. The models available today are more capable than anything that existed just two years ago. You are living through one of the fastest technological shifts in human history." },
              ]} />
              <FlipCard
                front="Who coined the term 'Artificial Intelligence'?"
                back="John McCarthy, at the Dartmouth Conference in 1956. But Alan Turing's 1950 question — 'Can machines think?' — laid the philosophical foundation. McCarthy gave AI its name; Turing gave it its purpose."
              />
              <FlipCard
                front="What was special about the 2012 AlexNet moment?"
                back="AlexNet — a deep neural network — entered the ImageNet visual recognition challenge and halved the previous best error rate. This shocked the field and triggered a massive shift to deep learning. Almost every major AI achievement since then (ChatGPT, DALL-E, self-driving cars) is built on neural network approaches pioneered in that era."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 3: Types of AI */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Types of AI</h2>
              <TextDisplay content="Not all AI is the same. Researchers distinguish between three levels — and only one of them actually exists today." />
              <div className="space-y-4">
                <Card className="p-5 border-2 border-brand-green/40 bg-brand-green/5">
                  <h3 className="font-bold text-lg text-brand-green mb-2">Narrow AI (Weak AI) — This is real, and it exists today</h3>
                  <p className="text-muted-foreground">Narrow AI is designed to do one specific task very well. It cannot go beyond what it was trained for. Examples: spam filters, face recognition, ChatGPT, Netflix recommendations, Google Translate.</p>
                  <p className="mt-2 font-medium">Every AI you have ever used is Narrow AI.</p>
                </Card>
                <Card className="p-5 border-2 border-brand-orange/40 bg-brand-orange/5">
                  <h3 className="font-bold text-lg text-brand-orange mb-2">General AI (AGI) — Theoretical, does not exist yet</h3>
                  <p className="text-muted-foreground">AGI would be an AI that can do any intellectual task a human can do — reasoning across domains, learning new skills from scratch, understanding context the way people do. Scientists disagree on when (or if) this will happen.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Notable: Sam Altman (OpenAI CEO) has said AGI could arrive within a few years. Other leading researchers say decades away — or never.</p>
                </Card>
                <Card className="p-5 border-2 border-gray-300 bg-gray-50">
                  <h3 className="font-bold text-lg text-gray-600 mb-2">Superintelligence — Science fiction for now</h3>
                  <p className="text-muted-foreground">A hypothetical AI far smarter than all humans combined. This is what science fiction movies are about. It does not exist, and most researchers consider it very far away — if it is possible at all.</p>
                </Card>
              </div>
              <TextDisplay variant="callout" content="Key insight: When you read scary headlines about AI 'taking over,' they are almost always talking about AGI or superintelligence — things that do not exist. The AI you use today is Narrow AI, which is powerful but limited to specific tasks." />
              <h3 className="text-lg font-semibold">Test your understanding — Can Narrow AI do this?</h3>
              <MultipleChoice
                question="ChatGPT just wrote a brilliant essay on climate change. Can it also give you turn-by-turn driving directions?"
                options={[
                  { text: "Yes — it is an advanced AI so it can do anything", isCorrect: false, feedback: "This is a common misconception about Narrow AI. ChatGPT was not trained as a navigation system and cannot access your location or real-time map data." },
                  { text: "No — ChatGPT is Narrow AI trained for language tasks, not navigation", isCorrect: true, feedback: "Correct! Even though ChatGPT is impressively capable at language tasks, it is Narrow AI — it cannot do things outside its design. Google Maps is a separate Narrow AI trained specifically for navigation." },
                  { text: "It depends on whether you have the paid version", isCorrect: false, feedback: "The paid version adds capabilities like web browsing, but GPS navigation is not within ChatGPT's design regardless of tier." },
                  { text: "Yes — it can look up directions in its training data", isCorrect: false, feedback: "ChatGPT cannot access real-time data or your location. Even if it had street knowledge from training, that is not the same as live navigation." },
                ]}
                explanation="This illustrates why Narrow AI is 'narrow.' ChatGPT is extraordinary at language tasks but cannot navigate, control hardware, or do tasks outside what it was designed and trained for. You need a different Narrow AI (like Google Maps) for navigation."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 4: AI in Your Life */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI in Your Daily Life</h2>
              <TextDisplay content="Let us look at specific categories where AI is already working for you — right now." />
              <MatchingGame
                title="Match the AI application to its category"
                pairs={[
                  { left: "Spotify recommending songs", right: "Recommendation Systems" },
                  { left: "Gmail auto-completing sentences", right: "Natural Language Processing" },
                  { left: "Unlocking phone with your face", right: "Computer Vision" },
                  { left: "Google Maps re-routing for traffic", right: "Predictive Algorithms" },
                  { left: "Alexa understanding your voice", right: "Speech Recognition" },
                  { left: "Instagram showing you relevant ads", right: "Targeting AI" },
                ]}
                onComplete={() => handleQuizComplete("matching", true)}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 5: Myths vs Reality */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Myths vs. Reality</h2>
              <TextDisplay content="AI gets a lot of hype — and a lot of fear. Most of it comes from misunderstanding what AI actually is. Let us set the record straight:" />
              <ComparisonCard
                leftTitle="Common Myths"
                rightTitle="The Reality"
                items={[
                  { left: "AI thinks and feels like humans", right: "AI recognises patterns. It has no thoughts, feelings, or consciousness — it is sophisticated statistics, not a mind." },
                  { left: "AI knows everything", right: "AI only knows what it was trained on. It can be — and frequently is — confidently wrong about things outside its training." },
                  { left: "AI will take over the world", right: "Narrow AI cannot even switch between tasks. It only does what it was specifically designed and trained for." },
                  { left: "AI is always objective and unbiased", right: "AI learns from human-created data, so it inherits and can amplify human biases and historical inequalities." },
                  { left: "Only tech experts can use AI", right: "Modern AI tools are designed for anyone. ChatGPT, Claude, and Gemini require no coding or technical background." },
                  { left: "AI understands what it says", right: "Language AI predicts statistically likely next words. It does not understand meaning the way you do — it mimics understanding." },
                  { left: "AI will replace all jobs", right: "AI is transforming jobs — automating some tasks while creating new ones. The net effect is complex and varies enormously by industry and role." },
                  { left: "If AI is wrong, it is rare and obvious", right: "AI can be wrong in subtle, confident ways. Hallucinations — false but plausible-sounding statements — are a genuine and ongoing challenge." },
                ]}
              />
              <MultipleChoice
                question="True or false: AI is objective because computers don't have feelings or personal opinions."
                options={[
                  { text: "True — AI uses pure math, so the output must be unbiased", isCorrect: false, feedback: "The math is only as objective as the data it was trained on. Biased data produces biased AI, regardless of the algorithm." },
                  { text: "False — AI inherits and can amplify the biases present in its training data", isCorrect: true, feedback: "Exactly right. AI learns patterns from human-generated data — and if that data reflects historical inequalities, the AI will reflect them too." },
                  { text: "It depends — some AI is unbiased and some is not", isCorrect: false, feedback: "While bias varies in severity, virtually all AI trained on real-world human data carries some form of bias. The question is degree, not whether." },
                  { text: "True — computers cannot be prejudiced because they have no emotions", isCorrect: false, feedback: "Prejudice in AI does not come from emotions — it comes from patterns in data. Emotionless does not mean fair." },
                ]}
                explanation="This is one of the most important AI myths to understand. AI does not 'think' or 'feel' bias — it statistically mirrors the patterns in its training data. Real-world data often contains historical inequalities, so AI can perpetuate and amplify them."
              />
              <MultipleChoice
                question="A friend says: 'ChatGPT told me the capital of Australia is Sydney, so it must be right.' What is wrong with this reasoning?"
                options={[
                  { text: "Nothing — ChatGPT is always right about geography", isCorrect: false, feedback: "ChatGPT is not always right. The capital of Australia is Canberra, not Sydney. Sydney is the largest city — a common confusion that AI makes too." },
                  { text: "AI can be confidently wrong — always verify important facts with reliable sources", isCorrect: true, feedback: "Correct! ChatGPT does make this specific mistake. The capital of Australia is Canberra. AI confidence does not equal accuracy." },
                  { text: "AI is never wrong about well-known facts", isCorrect: false, feedback: "AI makes factual errors all the time, including on well-known facts. It produces the statistically likely output, which is not always the correct one." },
                  { text: "ChatGPT knows it is wrong but says Sydney anyway", isCorrect: false, feedback: "AI has no awareness of its own errors. It does not know when it is wrong — it generates the most statistically likely text." },
                ]}
                explanation="The capital of Australia is Canberra — not Sydney, which is the largest city. This is a classic AI hallucination. Language models predict statistically likely text, and 'capital of Australia... Sydney' is a common enough pattern to confuse the model. Always verify important AI outputs."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Let us check your understanding. Answer all three questions correctly to complete the module." />
              <MultipleChoice
                question="Which type of AI actually exists and is in use today?"
                options={[
                  { text: "Superintelligent AI", isCorrect: false, feedback: "Superintelligence is theoretical and does not exist." },
                  { text: "Artificial General Intelligence (AGI)", isCorrect: false, feedback: "AGI is theoretical — it does not exist yet." },
                  { text: "Narrow AI", isCorrect: true, feedback: "Correct! Every AI you use today — ChatGPT, Siri, spam filters — is Narrow AI." },
                  { text: "Conscious AI", isCorrect: false, feedback: "No AI has consciousness. This is a science fiction concept." },
                ]}
                explanation="Narrow AI is AI designed to do one specific task very well. All practical AI today falls into this category."
                onComplete={(correct) => handleQuizComplete("quiz1", correct)}
              />
              <MultipleChoice
                question="Why does AI sometimes produce incorrect or biased results?"
                options={[
                  { text: "AI is programmed to lie sometimes", isCorrect: false, feedback: "AI is not programmed to lie. This is a myth." },
                  { text: "AI learns from human-created data, which can contain biases and errors", isCorrect: true, feedback: "Exactly right! AI reflects the biases in its training data." },
                  { text: "AI does not have enough computing power", isCorrect: false, feedback: "Bias is not a computing power issue — it is a data quality issue." },
                  { text: "AI thinks for itself and makes mistakes on purpose", isCorrect: false, feedback: "AI does not think for itself. It finds patterns in data." },
                ]}
                explanation="AI models learn by finding patterns in training data. If that data is biased or incorrect, the AI will be too — regardless of how powerful the computer is."
                onComplete={(correct) => handleQuizComplete("quiz2", correct)}
              />
              <MultipleChoice
                question="In what year did ChatGPT launch and bring AI to mainstream public attention?"
                options={[
                  { text: "2016", isCorrect: false, feedback: "2016 was when AlphaGo beat the Go champion — a major milestone, but not ChatGPT." },
                  { text: "2019", isCorrect: false, feedback: "ChatGPT launched in late 2022." },
                  { text: "2022", isCorrect: true, feedback: "Correct! ChatGPT launched in November 2022 and reached 100 million users in just two months." },
                  { text: "2024", isCorrect: false, feedback: "ChatGPT launched in 2022, though newer versions have come out since." },
                ]}
                explanation="ChatGPT launched in November 2022 and became the fastest-growing consumer product in history, reaching 100 million users in just two months."
                onComplete={(correct) => handleQuizComplete("quiz3", correct)}
              />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent work! You have completed Module 1. You now have a solid foundation for understanding what AI is." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-2")}>
                      Continue to Module 2 →
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
