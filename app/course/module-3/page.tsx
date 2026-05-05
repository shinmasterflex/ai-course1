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
import { Flashcard } from "@/components/learning/flashcard"
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
              <div>
                <h3 className="text-xl font-semibold mb-2">LLM Vocabulary — Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These terms come up constantly when reading about AI. Click each card to reveal the definition.</p>
                <Flashcard cards={[
                  { id: "token", front: "Token", back: "The basic unit an LLM processes — roughly 3/4 of a word. 'Hello world' is 2 tokens. GPT-4 can process up to 128,000 tokens at once (about a 100,000-word book). Your cost to use AI APIs is usually measured in tokens." },
                  { id: "context-window", front: "Context Window", back: "The total amount of text an LLM can 'see' at once — including your conversation history and the AI's previous responses. Once you exceed the context window, the model forgets earlier parts of the conversation." },
                  { id: "temperature", front: "Temperature", back: "A setting that controls how creative or random an AI's outputs are. Low temperature (0.1) = predictable, consistent, factual. High temperature (0.9) = creative, varied, sometimes surprising. For coding or facts, use low temperature; for brainstorming, use higher." },
                  { id: "hallucination-llm", front: "Hallucination", back: "When an LLM generates factually incorrect information with complete confidence. Happens because the model predicts likely text — not true text. The model has no way to know the difference between something it learned from a reliable source vs a pattern it invented." },
                  { id: "fine-tuning", front: "Fine-tuning", back: "Training a pre-existing large model on a smaller, specialised dataset to improve its performance in a specific domain. E.g., taking GPT-4 and fine-tuning it on thousands of legal documents to make it better at legal tasks than the base model." },
                  { id: "embeddings", front: "Embeddings", back: "A way of representing words and concepts as lists of numbers so that similar meanings are mathematically close together. 'King' minus 'Man' plus 'Woman' famously equals 'Queen' in embedding space. The foundation of how AI understands semantic similarity." },
                ]} />
              </div>
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
              <MultipleChoice
                question="You ask ChatGPT: 'What are the three tallest buildings in the world?' It gives you a confident, well-formatted list. What should you do before relying on this answer?"
                options={[
                  { text: "Trust it — ChatGPT is trained on internet data and buildings are well-documented", isCorrect: false, feedback: "Even well-documented facts can be wrong in ChatGPT's output. Rankings change as new buildings are completed, and the model's training data has a cutoff date. It cannot know about buildings completed after training." },
                  { text: "Verify the answer with a current source — ChatGPT has a training cutoff and can hallucinate specific facts", isCorrect: true, feedback: "Correct. Specific facts — rankings, statistics, dates, names — are exactly where hallucination happens most. ChatGPT predicts the most likely answer based on training data, but rankings change over time and specific details can be wrong even within the training window." },
                  { text: "Ask ChatGPT to confirm the answer a second time — if it gives the same answer, it is correct", isCorrect: false, feedback: "Asking the same question twice does not verify accuracy. ChatGPT will confidently repeat an incorrect answer because it has no internal fact-checking mechanism — it just predicts likely text." },
                  { text: "The question is too simple for ChatGPT to get wrong", isCorrect: false, feedback: "Simplicity does not protect against hallucination. ChatGPT gets simple, well-known facts wrong regularly — especially when rankings, numbers, or dates are involved." },
                ]}
                explanation="ChatGPT predicts statistically likely text — not verified facts. Specific claims (rankings, statistics, citations, current events) are highest risk for hallucination. The rule: use AI for ideas, structure, and drafts; always verify specific facts from authoritative sources."
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
              <div>
                <h3 className="text-xl font-semibold mb-1">Why each component matters — flip to find out</h3>
                <p className="text-sm text-muted-foreground mb-3">Click each card to reveal the reasoning behind the component.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <FlipCard
                    front="Why assign a Role in your prompt?"
                    back="Role-setting dramatically shifts the style, depth, and framing of AI responses. An 'expert nutritionist' gives specific, confident dietary advice. A 'supportive friend' gives the same information warmly. A 'sceptical scientist' challenges assumptions. The role is a lens — choose it deliberately."
                  />
                  <FlipCard
                    front="Why does Context matter so much?"
                    back="Context is everything AI cannot guess about your situation. Without it, the model makes assumptions — and those assumptions are often wrong. The more precise your context (age, goal, constraints, background), the more targeted the response. Think of it as briefing a consultant who knows nothing about you yet."
                  />
                  <FlipCard
                    front="What makes a Task description strong?"
                    back="A strong task is specific, bounded, and unambiguous. 'Help me with writing' is weak. 'Write a 200-word introduction for a blog post aimed at first-time investors that explains compound interest without jargon' is strong. Vague tasks produce vague outputs — every time."
                  />
                  <FlipCard
                    front="Why bother specifying Format?"
                    back="Without a format instruction, AI will choose one — and it may not suit your needs. Specifying a format (bullet list, table, numbered steps, code block, paragraph) makes the output immediately useful. Bonus: format instructions often sharpen the AI's reasoning too, because structure forces clarity."
                  />
                </div>
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Spot the missing component</h3>
                <MultipleChoice
                  question='"Write me a cover letter." Which ESSENTIAL component is most obviously missing?'
                  options={[
                    { text: "Role — the AI was not told to act as a hiring expert", isCorrect: false, feedback: "Role is useful but not the most critical missing piece here. The bigger problem is the AI has no idea who you are or what job you are applying for." },
                    { text: "Context — the AI has no idea about you, the role, or the company", isCorrect: true, feedback: "Exactly. 'Write me a cover letter' is almost useless as a prompt — the AI does not know your name, background, the role you want, the company, or why you are a strong fit. Context is the fuel of a good prompt." },
                    { text: "Task — the task is unclear", isCorrect: false, feedback: "The task ('write a cover letter') is actually quite clear — it is everything else that is missing." },
                    { text: "Format — the AI does not know how long it should be", isCorrect: false, feedback: "Format matters but is not the most critical omission here. Without context, even a perfectly formatted cover letter will be completely generic." },
                  ]}
                  explanation="Context is often the most underused component. Without it, you get generic outputs no matter how good the rest of your prompt is. Before writing any prompt, ask: what does the AI need to know about ME and my SITUATION to give a genuinely useful answer?"
                />
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
                  {
                    technique: "Meta-Prompting",
                    how: "Ask the AI to critique and improve its own output — or to help you write a better prompt.",
                    example: "Here is my prompt: [paste your prompt]. What is wrong with it? Rewrite it to get a better result. Then use the improved version.",
                    why: "AI can often identify what is missing or unclear in a prompt better than you can. Using AI to improve your AI prompts is one of the highest-leverage habits you can develop.",
                  },
                  {
                    technique: "Structured Output Prompting",
                    how: "Explicitly request a specific output format — JSON, markdown table, numbered list, bullet points with headers.",
                    example: "Return your answer as a JSON object with keys: 'recommendation', 'reasoning', and 'confidence_score' (0–10).",
                    why: "When AI output feeds into another system, a spreadsheet, or a template, having a predictable structure saves enormous time. Naming the exact format you want all but guarantees you get it.",
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
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-blue-500/5 border-brand-green/20">
                <h3 className="font-semibold mb-4 text-brand-green">Prompt Quick Reference — Copy, Paste, Adapt</h3>
                <p className="text-sm text-muted-foreground mb-4">These six templates cover the most common professional prompting scenarios. Adapt the specifics to your situation.</p>
                <div className="space-y-3">
                  {[
                    {
                      label: "Summarise a long document",
                      prompt: "You are a professional editor. I will paste a [document type] below. Summarise it in exactly 5 bullet points, each under 25 words. Focus on the most actionable insights. Do not include background or context the reader already knows.",
                    },
                    {
                      label: "Write a first draft",
                      prompt: "You are an expert [role — e.g. 'B2B copywriter' / 'technical writer' / 'HR professional']. Write a [document type] for [audience]. Context: [2–3 sentences of background]. Tone: [professional/conversational/formal]. Length: [target word count]. Do not use filler phrases like 'In conclusion' or 'It goes without saying'.",
                    },
                    {
                      label: "Analyse a decision or situation",
                      prompt: "Think step by step. I am trying to decide [decision]. Here is my situation: [context]. What are the 3 strongest arguments FOR and 3 strongest arguments AGAINST? End with a recommendation and your reasoning.",
                    },
                    {
                      label: "Generate ideas",
                      prompt: "You are a creative strategist. Generate 10 ideas for [goal/problem]. For each idea, provide: the idea in one sentence, one concrete example of it working, and one major risk. Be bold — include at least 3 ideas that feel unconventional.",
                    },
                    {
                      label: "Improve existing writing",
                      prompt: "You are a senior editor. Improve the following text. Goals: [list 2–3 goals e.g. 'make it more concise', 'improve flow', 'make the argument stronger']. Preserve the author's voice. Highlight every change you made and explain why.",
                    },
                    {
                      label: "Research a topic",
                      prompt: "You are an expert in [field]. Give me a structured overview of [topic]. Include: what it is, why it matters, 3 key things most people misunderstand, and 3 recommended next steps for someone who wants to learn more. Cite specific examples where possible.",
                    },
                  ].map(({ label, prompt }) => (
                    <div key={label} className="border rounded-lg p-3">
                      <p className="text-xs font-bold text-brand-orange uppercase tracking-wide mb-2">{label}</p>
                      <p className="text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded text-muted-foreground leading-relaxed">{prompt}</p>
                    </div>
                  ))}
                </div>
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
