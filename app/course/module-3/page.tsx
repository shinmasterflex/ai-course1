/**
 * MODULE 3: LARGE LANGUAGE MODELS & PROMPTING
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { FlipCard } from "@/components/learning/flip-card"
import { ComparisonCard } from "@/components/learning/comparison-card"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { TextInputExercise } from "@/components/learning/text-input-exercise"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"

export default function Module3Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-3"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "exercise"])

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
      router.push(`/course/module-3?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 3: Large Language Models & Prompting</h1>
            <p className="text-lg text-muted-foreground mb-4">Learn how ChatGPT works — and how to use it brilliantly</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="This is where things get practical. You will learn exactly how ChatGPT and similar tools work — and more importantly, how to communicate with them to get genuinely useful results." />
              <Card className="p-5 space-y-2">
                {["What is a Large Language Model (LLM)?","How ChatGPT generates responses","The anatomy of a good prompt","Prompting techniques: role, chain-of-thought, few-shot","Hands-on practice exercises","Module Quiz"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module →</Button>
            </div>
          )}

          {/* 1: What Is an LLM */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What Is a Language Model?</h2>
              <TextDisplay content="A Large Language Model (LLM) is an AI trained on massive amounts of text to understand and generate human language." />
              <TextDisplay variant="callout" content="The word 'large' refers to the number of parameters (adjustable values) in the model — modern LLMs have hundreds of billions. The more parameters, the more nuance and complexity the model can capture." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Famous LLMs and who makes them</h3>
                <div className="space-y-2">
                  {[
                    { model: "GPT-4 / ChatGPT", company: "OpenAI", note: "The most widely known — launched AI into the mainstream" },
                    { model: "Claude", company: "Anthropic", note: "Known for safety-focused design and long context windows" },
                    { model: "Gemini", company: "Google DeepMind", note: "Google's flagship LLM, integrated into Search and Workspace" },
                    { model: "Llama", company: "Meta", note: "Open-source LLM — free to download and run yourself" },
                    { model: "Mistral", company: "Mistral AI", note: "European LLM, known for efficiency" },
                  ].map(({ model, company, note }) => (
                    <div key={model} className="flex gap-3 text-sm py-1 border-b last:border-0">
                      <span className="font-semibold w-32 flex-shrink-0 text-brand-green">{model}</span>
                      <span className="text-muted-foreground w-28 flex-shrink-0">{company}</span>
                      <span className="text-muted-foreground">{note}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 2: How ChatGPT Works */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">How ChatGPT Works</h2>
              <TextDisplay content="ChatGPT does not think. It predicts. Here is the simplified version of what is actually happening when you chat with it:" />
              <div className="space-y-3">
                {[
                  { step: "Step 1: Training", desc: "The model reads hundreds of billions of words from the internet, books, code, and articles. It learns which words tend to follow other words in context." },
                  { step: "Step 2: Tokenisation", desc: "Your message is broken into small chunks called tokens (roughly 3/4 of a word on average). The model sees a sequence of numbers representing your text." },
                  { step: "Step 3: Prediction", desc: "The model predicts the most likely next token, then the next, then the next — building a response word by word based on all the text it was trained on." },
                  { step: "Step 4: RLHF", desc: "After base training, humans rated thousands of responses. The model was fine-tuned to produce outputs that humans rated highly. This is why it sounds helpful and coherent." },
                ].map(({ step, desc }) => (
                  <Card key={step} className="p-4 flex gap-3">
                    <span className="font-bold text-brand-orange w-20 flex-shrink-0 text-sm pt-0.5">{step}</span>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
              <FlipCard
                front="Does ChatGPT know it is wrong when it makes mistakes?"
                back="No. ChatGPT has no mechanism to detect its own errors. It predicts likely next words — if the likely next word happens to be wrong, it says it confidently anyway. This is why you must fact-check important AI-generated information."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 3: Anatomy of a Prompt */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">The Anatomy of a Prompt</h2>
              <TextDisplay content="A prompt is the message you send to an AI. The quality of your prompt directly determines the quality of the response. A good prompt has four parts:" />
              <div className="space-y-3">
                {[
                  { part: "Role", example: "You are an expert nutritionist...", why: "Telling the AI what role to play dramatically improves the relevance of its response." },
                  { part: "Context", example: "...I am a 35-year-old who runs 5km three times a week...", why: "The more context you provide, the more tailored the answer." },
                  { part: "Task", example: "...Create a 7-day meal plan...", why: "Be specific about exactly what you want. Vague tasks get vague answers." },
                  { part: "Format", example: "...Present it as a table with breakfast, lunch, and dinner columns.", why: "Specify how you want the output structured: list, table, paragraph, code, etc." },
                ].map(({ part, example, why }) => (
                  <Card key={part} className="p-4">
                    <div className="flex gap-3">
                      <span className="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded h-fit flex-shrink-0">{part}</span>
                      <div>
                        <p className="text-sm font-mono bg-gray-50 p-2 rounded mb-2 italic text-gray-700">{example}</p>
                        <p className="text-sm text-muted-foreground">{why}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Card className="p-4 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-2 text-brand-green">Full example prompt</h3>
                <p className="text-sm font-mono bg-white p-3 rounded border italic text-gray-700">
                  You are an expert nutritionist. I am a 35-year-old who runs 5km three times a week and wants to lose 5kg. Create a 7-day meal plan for me. Present it as a table with breakfast, lunch, and dinner columns. Keep each meal simple and under 10 minutes to prepare.
                </p>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 4: Prompt Techniques */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Effective Prompting Techniques</h2>
              <TextDisplay content="Beyond the basic anatomy, here are four powerful techniques to get dramatically better results:" />
              <div className="space-y-4">
                {[
                  {
                    technique: "Chain-of-Thought Prompting",
                    how: "Ask the AI to think step by step before giving you an answer.",
                    example: "Solve this problem step by step: A train leaves Chicago at 9am going 60mph...",
                    why: "Forces the model to reason through the problem instead of guessing. Dramatically improves accuracy on logic and math problems.",
                  },
                  {
                    technique: "Few-Shot Prompting",
                    how: "Give the AI 2-3 examples of what you want before asking it to do the task.",
                    example: "Convert these sentences to formal English. Example: 'gonna' → 'going to'. Example: 'wanna' → 'want to'. Now convert: 'kinda'",
                    why: "Examples calibrate exactly what format, style, and depth you expect. Works extremely well for formatting and style tasks.",
                  },
                  {
                    technique: "Iterative Refinement",
                    how: "Start with a basic request, then follow up with specific improvements.",
                    example: "First: 'Write a short email declining a meeting.' Then: 'Make it warmer and suggest a future date.' Then: 'Make the opening stronger.'",
                    why: "Treats AI like a collaborator. Often yields much better results than trying to nail the perfect prompt on the first try.",
                  },
                  {
                    technique: "Constraint Setting",
                    how: "Tell the AI what NOT to do, and set explicit limits.",
                    example: "Summarise this article in 3 bullet points. Do not use jargon. Do not exceed 50 words per bullet.",
                    why: "AI responds well to negative constraints. Explicit limits prevent rambling, off-topic content, or overly complex outputs.",
                  },
                ].map(({ technique, how, example, why }) => (
                  <Card key={technique} className="p-5">
                    <h3 className="font-bold text-brand-orange mb-2">{technique}</h3>
                    <p className="text-sm mb-2"><span className="font-medium">How:</span> {how}</p>
                    <p className="text-sm font-mono bg-gray-50 p-2 rounded mb-2 italic text-gray-700">{example}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium">Why it works:</span> {why}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Spot the better prompt</h3>
                <p className="text-sm text-muted-foreground mb-3">You want AI to help plan a team offsite. Which prompt will get the best result?</p>
                <MultipleChoice
                  question="Which of these prompts will get the most useful response?"
                  options={[
                    { text: "Help me plan an offsite.", isCorrect: false, feedback: "Way too vague. How many people? What budget? What goals? What location? The AI has to guess everything and will produce a generic template." },
                    { text: "You are an expert corporate event planner. I need to plan a 1-day offsite for my 12-person product team in Austin, TX. Budget is $3,000. Goals: team bonding and aligning on our Q3 roadmap. Suggest a schedule from 9am-5pm, including 2 team-building activities and a working session format.", isCorrect: true, feedback: "Excellent prompt! Role, context, constraints, goals, format — all present. You'll get a specific, actionable plan on the first try." },
                    { text: "What are some good offsite ideas for a team?", isCorrect: false, feedback: "Better than nothing, but still generic. No team size, no budget, no goals, no location. The output will be a generic list." },
                    { text: "Plan a fun team offsite in Austin for about 12 people.", isCorrect: false, feedback: "This adds helpful context (location, size) but is missing goals, budget, timeframe, and the expert role assignment." },
                  ]}
                  explanation="The best prompts are specific: they assign a role, provide context, set a clear task, specify the format, and include constraints. Every extra detail you give is an instruction the AI can follow."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 5: Hands-On Practice */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Hands-On Practice</h2>
              <TextDisplay content="Now it is your turn. For each scenario below, write a high-quality prompt using what you have learned." />
              <TextDisplay variant="callout" content="There are no wrong answers here — the goal is to practice the habit of thinking carefully about role, context, task, and format before you type your prompt." />
              <TextInputExercise
                prompt="Scenario 1: You need to write a LinkedIn post announcing a new job. Write a prompt that would get you a great draft. Include role, context, task, and format."
                placeholder="You are a professional copywriter. I just started a new role as Senior Product Manager at Acme Corp after 5 years in consulting. Write a LinkedIn post announcing this. Keep it under 150 words, sound genuine not braggy, and end with a question to encourage comments."
                onComplete={() => handleQuizComplete("exercise", true)}
              />
              <TextInputExercise
                prompt="Scenario 2: You want to prepare for a difficult conversation with your manager about a missed deadline. Write a chain-of-thought prompt that would help you think through the conversation in advance."
                placeholder="You are an expert executive coach. I need to have a difficult conversation with my manager tomorrow about missing a product launch deadline. Think step by step: first identify the key concerns my manager might have, then help me take accountability without being defensive, then suggest 3 talking points that demonstrate I have a clear plan to prevent this in future. End with a suggested opening sentence for the conversation."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <MultipleChoice
                question="What does an LLM actually do when it generates text?"
                options={[
                  { text: "It looks up answers in a database", isCorrect: false, feedback: "LLMs do not search a database — they generate text based on learned patterns." },
                  { text: "It understands your question and thinks about the answer", isCorrect: false, feedback: "LLMs do not 'understand' or 'think' in a human sense — they predict tokens." },
                  { text: "It predicts the most likely next word, then the next, building a response token by token", isCorrect: true, feedback: "Exactly right! This token-prediction approach is the core mechanism of all LLMs." },
                  { text: "It compiles a response from pre-written text snippets", isCorrect: false, feedback: "LLMs generate new text — they don't stitch together pre-written chunks." },
                ]}
                explanation="LLMs work by predicting the next most likely token (roughly a word or word fragment), then the next, and so on — building a response that statistically resembles patterns in its training data."
                onComplete={(c) => handleQuizComplete("quiz1", c)}
              />
              <MultipleChoice
                question="Which prompting technique involves giving the AI 2-3 examples before asking it to complete a task?"
                options={[
                  { text: "Chain-of-thought prompting", isCorrect: false, feedback: "Chain-of-thought asks the AI to reason step by step — no examples required." },
                  { text: "Few-shot prompting", isCorrect: true, feedback: "Correct! 'Few-shot' means giving a few examples (shots) to calibrate the output format and style." },
                  { text: "Constraint setting", isCorrect: false, feedback: "Constraint setting tells the AI what NOT to do and sets explicit limits." },
                  { text: "Role prompting", isCorrect: false, feedback: "Role prompting assigns the AI a persona ('You are an expert...')." },
                ]}
                explanation="Few-shot prompting provides examples of the desired input/output pattern before the actual task, which helps calibrate the AI's output format, style, and depth precisely."
                onComplete={(c) => handleQuizComplete("quiz2", c)}
              />
              <MultipleChoice
                question="What is the RLHF step in training a model like ChatGPT?"
                options={[
                  { text: "A compression technique to make the model smaller", isCorrect: false, feedback: "RLHF is a training technique, not compression." },
                  { text: "Reinforcement Learning from Human Feedback — humans rate outputs and the model is fine-tuned to produce higher-rated responses", isCorrect: true, feedback: "Correct! RLHF is why ChatGPT sounds helpful, safe, and coherent — humans taught it what 'good' responses look like." },
                  { text: "A safety filter that blocks harmful responses", isCorrect: false, feedback: "While RLHF improves safety, it is a full training technique — not just a filter." },
                  { text: "A method to train the model faster using less data", isCorrect: false, feedback: "RLHF is about quality of outputs, not training speed." },
                ]}
                explanation="RLHF (Reinforcement Learning from Human Feedback) is the training step where human raters evaluate model responses, and the model is fine-tuned to produce outputs people prefer. It is a key reason modern LLMs feel so fluent and helpful."
                onComplete={(c) => handleQuizComplete("quiz3", c)}
              />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Outstanding! You now understand how LLMs work and how to prompt them effectively. Next: a tour of the best AI tools available today." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-4")}>
                      Continue to Module 4 →
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
