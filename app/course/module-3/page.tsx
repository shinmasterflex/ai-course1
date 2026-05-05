/**
 * MODULE 3: LARGE LANGUAGE MODELS & PROMPTING
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DragSortChallenge, FlipCardGrid, MatchingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

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
            <p className="text-lg text-muted-foreground mb-4">Learn how ChatGPT works - and how to use it brilliantly</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 3"
              title="Move from curiosity to effective prompting"
              description="Learn the mechanics behind LLMs and apply prompting patterns that produce sharper, more reliable outputs."
              imageSrc="/images/modules/module-3.jpg"
              imageAlt="Language models and conversation AI"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="This is where things get practical. You will learn exactly how ChatGPT and similar tools work - and more importantly, how to communicate with them to get genuinely useful results." />
              <Card className="p-5 space-y-2">
                {["What is a Large Language Model (LLM)?","How ChatGPT generates responses","The anatomy of a good prompt","Prompting techniques: role, chain-of-thought, few-shot","Hands-on practice exercises","Module Quiz"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: What Is an LLM */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What Is a Language Model?</h2>
              <TextDisplay content="A Large Language Model (LLM) is an AI trained on massive amounts of text to understand and generate human language. But to use these tools effectively - and to avoid being misled by them - you need to understand something about how they work internally." />
              <TextDisplay variant="callout" content="The word 'large' refers to the number of parameters (adjustable values) in the model - modern LLMs have hundreds of billions. The more parameters, the more nuance and complexity the model can capture." />

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">What is a token? The fundamental unit of LLMs</h3>
                <p className="text-sm text-muted-foreground mb-3">LLMs do not read text character by character or word by word. They split text into <strong>tokens</strong> — chunks of text that are typically 3-4 characters long. About 750 words equals approximately 1,000 tokens.</p>
                <div className="p-3 bg-brand-orange/5 border border-brand-orange/20 rounded-lg mb-3">
                  <p className="text-sm font-medium mb-2">Example: how &ldquo;ChatGPT is amazing!&rdquo; becomes tokens</p>
                  <div className="flex flex-wrap gap-2 font-mono text-sm">
                    {["Chat", "G", "PT", " is", " am", "azing", "!"].map((tok, i) => (
                      <span key={i} className={`px-2 py-1 rounded border text-xs font-bold ${i % 2 === 0 ? "bg-brand-orange/20 border-brand-orange/40 text-brand-orange" : "bg-brand-green/20 border-brand-green/40 text-brand-green"}`}>{tok}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">7 tokens — not 3 words. Common words like &ldquo;is&rdquo; are single tokens. Long or rare words split into multiple tokens.</p>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">Why this matters:</span> LLMs process tokens, not words or meanings. They learn which sequences of tokens tend to follow other sequences. This is why LLMs sometimes struggle with letter-counting (&ldquo;how many r&apos;s in strawberry?&rdquo;) — they see "strawb" + "erry" as two tokens, not individual letters.</p>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">The context window — what the model can &ldquo;see&rdquo; at once</h3>
                <p className="text-sm text-muted-foreground mb-3">The <strong>context window</strong> is the amount of text the model can read and use at any one time. Think of it as the model&apos;s working memory. Everything outside the context window does not exist to the model.</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 border rounded bg-background">
                    <p className="font-medium text-brand-orange mb-1">Small context windows (early models ~4K tokens)</p>
                    <p className="text-muted-foreground">Could handle a short conversation or a few pages of text. Would &ldquo;forget&rdquo; the beginning of a long document when processing the end.</p>
                  </div>
                  <div className="p-3 border rounded bg-background">
                    <p className="font-medium text-brand-green mb-1">Large context windows (modern models ~128K-1M+ tokens)</p>
                    <p className="text-muted-foreground">Can handle entire books, long codebases, or hours of meeting transcripts. Claude and Gemini support over 1 million tokens in some configurations.</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3"><span className="font-medium text-foreground">Analogy:</span> Imagine you have to summarise a book, but you can only look at the pages that fit on your desk at one time. A small context window is a tiny desk. A large one is a warehouse floor. The model can only reason about what it can currently &ldquo;see.&rdquo;</p>
              </Card>

              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Attention — how the model decides what matters</h3>
                <p className="text-sm text-muted-foreground mb-3">The key innovation of the Transformer architecture (the T in ChatGPT) is the <strong>attention mechanism</strong>. When processing any word or token, the model asks: &ldquo;which other tokens in the context should I pay attention to right now?&rdquo;</p>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <p><span className="font-medium text-foreground">Example:</span> In the sentence &ldquo;The animal didn&apos;t cross the street because it was too tired,&rdquo; what does &ldquo;it&rdquo; refer to? The attention mechanism allows the model to connect &ldquo;it&rdquo; directly to &ldquo;animal&rdquo; — even if they are far apart in the sentence.</p>
                  <p><span className="font-medium text-foreground">Why this is revolutionary:</span> Previous architectures processed text sequentially, like reading letter by letter. Attention allows every token to simultaneously look at every other token and decide which ones are relevant. This is why Transformers handle nuance, context, and long-range relationships so much better than older approaches.</p>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Famous LLMs and who makes them</h3>
                <div className="space-y-2">
                  {[
                    { model: "GPT-4o / ChatGPT", company: "OpenAI", params: "~1.8T (GPT-4)", note: "Most widely known — launched AI into the mainstream" },
                    { model: "Claude 3.5 / 4", company: "Anthropic", params: "Unknown", note: "Safety-focused design, large context windows, strong at analysis" },
                    { model: "Gemini 2.0 / 2.5", company: "Google DeepMind", params: "Unknown", note: "Google&apos;s flagship LLM, integrated into Search and Workspace" },
                    { model: "Llama 3.x", company: "Meta", params: "8B-405B", note: "Open-source — free to download and run on your own hardware" },
                    { model: "Mistral / Mixtral", company: "Mistral AI", params: "7B-141B", note: "European LLM known for efficiency relative to size" },
                  ].map(({ model, company, params, note }) => (
                    <div key={model} className="flex gap-3 text-sm py-1 border-b last:border-0 flex-wrap md:flex-nowrap">
                      <span className="font-semibold w-36 flex-shrink-0 text-brand-green">{model}</span>
                      <span className="text-muted-foreground w-28 flex-shrink-0">{company}</span>
                      <span className="text-muted-foreground w-24 flex-shrink-0 text-xs pt-0.5">{params}</span>
                      <span className="text-muted-foreground text-xs pt-0.5">{note}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Why &ldquo;large&rdquo; parameters create new capabilities</h3>
                <p className="text-sm text-muted-foreground mb-3">Scale is not just about doing the same things better — it creates <em>qualitatively</em> different capabilities through emergence:</p>
                <div className="space-y-2 text-sm">
                  {[
                    { size: "~1 billion parameters", cap: "Decent text generation, basic Q&A, simple summarisation" },
                    { size: "~7-13 billion parameters", cap: "Can follow complex instructions, multi-step reasoning, writing assistance" },
                    { size: "~70 billion parameters", cap: "Professional-level writing, code generation, nuanced understanding of context" },
                    { size: "~100B+ parameters", cap: "Sophisticated reasoning, novel problem-solving, creative synthesis across domains" },
                  ].map(({ size, cap }) => (
                    <div key={size} className="flex gap-3 border-b last:border-0 py-2">
                      <span className="font-medium text-brand-orange w-44 flex-shrink-0 text-xs pt-0.5">{size}</span>
                      <span className="text-muted-foreground text-xs">{cap}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-2">LLM Vocabulary — Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These terms come up constantly when reading about AI. Click each card to reveal the definition.</p>
                <FlipCardGrid
                  cards={[
                    {
                      title: "Token",
                      prompt: "What is a token in LLMs?",
                      answer: "A token is a small text unit the model processes, often part of a word rather than a full word. ~750 words ≈ 1,000 tokens. LLMs count tokens, not words.",
                    },
                    {
                      title: "Context window",
                      prompt: "Why does context window size matter?",
                      answer: "It sets how much text the model can keep in active memory. Text outside the window is invisible to the model — it cannot refer back to it.",
                    },
                    {
                      title: "Parameter",
                      prompt: "What are model parameters?",
                      answer: "Parameters are the learned internal weights — billions of numbers tuned during training that determine how the model maps input to output.",
                    },
                    {
                      title: "Fine-tuning",
                      prompt: "What does fine-tuning do?",
                      answer: "Fine-tuning continues training a pre-trained model on a smaller, specialised dataset to adapt its behaviour to a specific domain or task.",
                    },
                    {
                      title: "Attention",
                      prompt: "What does 'attention' mean in Transformers?",
                      answer: "Attention is the mechanism that allows each token to selectively look at all other tokens in the context and decide how much weight to give each one when generating the next token.",
                    },
                    {
                      title: "Embedding",
                      prompt: "What is an embedding in AI?",
                      answer: "An embedding converts a word, sentence, or image into a list of numbers (a vector) that represents its meaning. Similar things have similar vectors, so 'king' and 'queen' are numerically close.",
                    },
                  ]}
                />
              </div>

              <QuickCheckCard
                prompt="Why might an LLM get confused when asked 'how many r's are in the word strawberry?'"
                options={[
                  { id: "a", label: "Because LLMs are not connected to the internet to look it up" },
                  { id: "b", label: "Because LLMs process tokens (text chunks), not individual letters — 'strawberry' is split across multiple tokens" },
                  { id: "c", label: "Because letter-counting was not in the training data" },
                  { id: "d", label: "Because LLMs do not understand the English alphabet" },
                ]}
                correctOptionId="b"
                explanation="LLMs tokenise text into chunks. 'strawberry' might become 'straw' + 'berry', making individual letter-counting difficult since the model never sees raw characters — only token sequences."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: How ChatGPT Works */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">How ChatGPT Works</h2>
              <TextDisplay content="ChatGPT does not think. It predicts. Here is the simplified version of what is actually happening when you chat with it — and some important mechanics that explain why it behaves the way it does." />
              <div className="space-y-3">
                {[
                  { step: "Step 1: Pre-training", desc: "The base model reads hundreds of billions of words from the internet, books, code, and articles. It learns which tokens tend to follow other tokens in context — but at this stage it has no instructions, no personality, and no ability to have a conversation. It is just a next-token predictor." },
                  { step: "Step 2: Instruction tuning", desc: "The raw base model is then fine-tuned on examples of conversations. Human contractors wrote thousands of example dialogues demonstrating helpful, correct, and safe responses. The model learns to respond as a helpful assistant rather than just completing text patterns." },
                  { step: "Step 3: RLHF", desc: "Reinforcement Learning from Human Feedback (RLHF) is the process that shaped ChatGPT's personality. Humans rated pairs of responses and preferred the better one. A reward model was trained to predict human preference. The LLM was then tuned to produce outputs that the reward model would rate highly — making it more helpful, honest, and safe." },
                  { step: "Step 4: Tokenisation and prediction", desc: "At inference time (when you send a message), your prompt is tokenised. The model processes every token, the attention mechanism decides which tokens to focus on, and the model outputs a probability distribution over the entire vocabulary for the next token. It samples from this distribution to choose the next word." },
                ].map(({ step, desc }) => (
                  <Card key={step} className="p-4 flex gap-3">
                    <span className="font-bold text-brand-orange w-24 flex-shrink-0 text-sm pt-0.5">{step}</span>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Temperature — why ChatGPT is not deterministic</h3>
                <p className="text-sm text-muted-foreground mb-3">Ask ChatGPT the same question twice and you will get different answers. This is intentional. A setting called <strong>temperature</strong> controls how randomly the model samples from its probability distribution:</p>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 border rounded bg-background">
                    <p className="font-semibold text-brand-green mb-1">Low temperature (0.0-0.3)</p>
                    <p className="text-muted-foreground">Picks the highest-probability next token almost every time. Predictable, consistent, deterministic. Good for factual Q&A, code, and structured outputs.</p>
                  </div>
                  <div className="p-3 border rounded bg-background border-brand-orange/30">
                    <p className="font-semibold text-brand-orange mb-1">Medium temperature (0.7-1.0)</p>
                    <p className="text-muted-foreground">Default for ChatGPT. Balances coherence with variety. Each response is slightly different even to the same prompt.</p>
                  </div>
                  <div className="p-3 border rounded bg-background">
                    <p className="font-semibold text-brand-green mb-1">High temperature (1.5+)</p>
                    <p className="text-muted-foreground">More random sampling. Outputs become surprising and creative — but also less coherent and more likely to produce nonsense. Good for brainstorming, bad for accuracy.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">System prompt vs user prompt — a key distinction</h3>
                <p className="text-sm text-muted-foreground mb-3">When you use ChatGPT or any AI tool, there are actually two types of input the model receives:</p>
                <div className="space-y-3 text-sm">
                  <div className="p-3 border-l-4 border-l-brand-orange pl-4">
                    <p className="font-semibold text-brand-orange">System prompt (you usually cannot see this)</p>
                    <p className="text-muted-foreground mt-1">Instructions from the developer that run before your message. These tell the model its role, constraints, tone, and rules. &ldquo;You are a helpful assistant. Do not discuss competitors. Always respond in English.&rdquo; When you use a custom GPT or a company&apos;s AI assistant, they are injecting a system prompt.</p>
                  </div>
                  <div className="p-3 border-l-4 border-l-brand-green pl-4">
                    <p className="font-semibold text-brand-green">User prompt (your message)</p>
                    <p className="text-muted-foreground mt-1">The message you actually type. The model sees the system prompt + all previous conversation + your new message as a single combined context.</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">Understanding this explains why the same underlying AI (e.g. GPT-4) can seem very different when used through different products — the system prompt shapes the entire personality and behaviour.</p>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Why hallucination happens mechanistically</h3>
                <p className="text-sm text-muted-foreground mb-3">Now that you know ChatGPT predicts the next token based on probability, hallucination makes sense:</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">The core problem:</span> the model&apos;s job is to generate a likely continuation — not to verify facts. It has no internal search engine, no live database, no mechanism to say &ldquo;I need to check this.&rdquo;</p>
                  <p><span className="font-medium text-foreground">When you ask for a citation:</span> the model generates text that pattern-matches to what citations look like (author names + title + journal + year). It may produce something that looks real and is completely fabricated.</p>
                  <p><span className="font-medium text-foreground">Confidence and correctness are unrelated:</span> the model produces fluent, confident-sounding text whether the content is true or false. Fluency is a property of language modelling. Accuracy requires external grounding that the base model does not have.</p>
                </div>
                <div className="mt-3 p-3 bg-brand-orange/5 border border-brand-orange/20 rounded text-sm">
                  <p className="font-medium text-brand-orange mb-1">The key insight</p>
                  <p className="text-muted-foreground">ChatGPT is essentially a very sophisticated autocomplete system. When it answers a question, it is generating the most plausible-sounding continuation of your prompt — not retrieving stored facts. This is a feature (it can reason and synthesise) and a limitation (it can synthesise false things just as fluently).</p>
                </div>
              </Card>

              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Why ChatGPT cannot access real-time information by default</h3>
                <p className="text-sm text-muted-foreground">The base model is a static snapshot of everything it was trained on up to its knowledge cutoff date. At inference time, it has no internet connection, no ability to run code by default, and no live data feeds. It is like consulting a very knowledgeable person who has been in isolation since a specific date — they know a lot, but nothing that happened after they went in.</p>
                <p className="text-sm text-muted-foreground mt-2">Some versions of ChatGPT can browse the web or run code — but these are external tools connected to the model, not native capabilities. When those tools are turned off, the model reverts to its training snapshot.</p>
              </Card>

              <DragSortChallenge
                title="Build the Pipeline"
                description="Drag each stage to build the correct order of how ChatGPT produces a response."
                items={[
                  "Model samples next token from probability distribution",
                  "RLHF tunes model to produce human-preferred responses",
                  "Base model pre-trains on hundreds of billions of tokens",
                  "User prompt is tokenised and combined with system prompt",
                  "Instruction tuning teaches the model to follow directions",
                ]}
                correctOrder={[
                  "Base model pre-trains on hundreds of billions of tokens",
                  "Instruction tuning teaches the model to follow directions",
                  "RLHF tunes model to produce human-preferred responses",
                  "User prompt is tokenised and combined with system prompt",
                  "Model samples next token from probability distribution",
                ]}
              />

              <QuickCheckCard
                prompt="Why does asking ChatGPT the same question twice sometimes produce different answers?"
                options={[
                  { id: "a", label: "Because ChatGPT searches the web and finds different articles each time" },
                  { id: "b", label: "Because the model randomly samples from a probability distribution (controlled by temperature), not a fixed lookup table" },
                  { id: "c", label: "Because OpenAI updates the model between queries" },
                  { id: "d", label: "Because the model forgets previous answers" },
                ]}
                correctOptionId="b"
                explanation="Temperature controls how randomly the model samples from its output probability distribution. At default settings, the same prompt can produce different responses because sampling introduces controlled randomness."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
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
                <h3 className="text-xl font-semibold mb-1">Why each component matters - flip to find out</h3>
                <p className="text-sm text-muted-foreground mb-3">Click each card to reveal the reasoning behind the component.</p>
                <FlipCardGrid
                  cards={[
                    {
                      title: "Role",
                      prompt: "Why tell the model who it should be?",
                      answer: "A role narrows the model's frame of reference and helps it adopt the right perspective, tone, and standards for the task.",
                    },
                    {
                      title: "Context",
                      prompt: "Why add details about your situation?",
                      answer: "Context reduces ambiguity. The more the model understands your constraints, audience, and goals, the less generic the output becomes.",
                    },
                    {
                      title: "Task",
                      prompt: "Why state the task explicitly?",
                      answer: "A clear task tells the model exactly what success looks like, which improves relevance and reduces drift.",
                    },
                    {
                      title: "Format",
                      prompt: "Why specify the output format?",
                      answer: "Format instructions turn a decent answer into a usable one by shaping the structure you actually need, like bullets, tables, or steps.",
                    },
                  ]}
                />
              </div>
              <QuickCheckCard
                prompt="If a prompt says 'Write a meal plan' but gives no audience, constraints, or output structure, what is it mainly missing?"
                options={[
                  { id: "a", label: "Mostly context and format" },
                  { id: "b", label: "Only spelling corrections" },
                  { id: "c", label: "A model update" },
                  { id: "d", label: "Internet access" },
                ]}
                correctOptionId="a"
                explanation="The prompt is under-specified. Adding context and a target format usually makes the response much more useful and tailored."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
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
                    example: "Convert these sentences to formal English. Example: 'gonna' -> 'going to'. Example: 'wanna' -> 'want to'. Now convert: 'kinda'",
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
                    how: "Ask the AI to critique and improve its own output - or to help you write a better prompt.",
                    example: "Here is my prompt: [paste your prompt]. What is wrong with it? Rewrite it to get a better result. Then use the improved version.",
                    why: "AI can often identify what is missing or unclear in a prompt better than you can. Using AI to improve your AI prompts is one of the highest-leverage habits you can develop.",
                  },
                  {
                    technique: "Structured Output Prompting",
                    how: "Explicitly request a specific output format - JSON, markdown table, numbered list, bullet points with headers.",
                    example: "Return your answer as a JSON object with keys: 'recommendation', 'reasoning', and 'confidence_score' (0?10).",
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
                <MatchingChallenge
                  title="Technique Match"
                  description="Match each prompt technique to its strongest benefit."
                  pairs={[
                    {
                      id: "fewshot",
                      left: "Few-shot prompting",
                      right: "Calibrates style and format with examples",
                    },
                    {
                      id: "constraints",
                      left: "Constraint setting",
                      right: "Limits rambling and off-target output",
                    },
                    {
                      id: "iterative",
                      left: "Iterative refinement",
                      right: "Improves quality over multiple targeted passes",
                    },
                  ]}
                />
              </Card>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-blue-500/5 border-brand-green/20">
                <h3 className="font-semibold mb-4 text-brand-green">Prompt Quick Reference - Copy, Paste, Adapt</h3>
                <p className="text-sm text-muted-foreground mb-4">These six templates cover the most common professional prompting scenarios. Adapt the specifics to your situation.</p>
                <div className="space-y-3">
                  {[
                    {
                      label: "Summarise a long document",
                      prompt: "You are a professional editor. I will paste a [document type] below. Summarise it in exactly 5 bullet points, each under 25 words. Focus on the most actionable insights. Do not include background or context the reader already knows.",
                    },
                    {
                      label: "Write a first draft",
                      prompt: "You are an expert [role - e.g. 'B2B copywriter' / 'technical writer' / 'HR professional']. Write a [document type] for [audience]. Context: [2?3 sentences of background]. Tone: [professional/conversational/formal]. Length: [target word count]. Do not use filler phrases like 'In conclusion' or 'It goes without saying'.",
                    },
                    {
                      label: "Analyse a decision or situation",
                      prompt: "Think step by step. I am trying to decide [decision]. Here is my situation: [context]. What are the 3 strongest arguments FOR and 3 strongest arguments AGAINST? End with a recommendation and your reasoning.",
                    },
                    {
                      label: "Generate ideas",
                      prompt: "You are a creative strategist. Generate 10 ideas for [goal/problem]. For each idea, provide: the idea in one sentence, one concrete example of it working, and one major risk. Be bold - include at least 3 ideas that feel unconventional.",
                    },
                    {
                      label: "Improve existing writing",
                      prompt: "You are a senior editor. Improve the following text. Goals: [list 2?3 goals e.g. 'make it more concise', 'improve flow', 'make the argument stronger']. Preserve the author's voice. Highlight every change you made and explain why.",
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
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Hands-On Practice */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Hands-On Practice</h2>
              <TextDisplay content="Now it is your turn. For each scenario below, write a high-quality prompt using what you have learned." />
              <TextDisplay variant="callout" content="There are no wrong answers here - the goal is to practice the habit of thinking carefully about role, context, task, and format before you type your prompt." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Beginner adoption framework</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-brand-orange mb-2">Start here</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Summarising</li>
                      <li>Drafting</li>
                      <li>Organising</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-orange mb-2">Avoid for now</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Sensitive personal data</li>
                      <li>Confidential company information</li>
                      <li>High-stakes decisions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-orange mb-2">Always do this</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Review the output</li>
                      <li>Verify important facts</li>
                      <li>Rewrite in your own judgment</li>
                    </ul>
                  </div>
                </div>
              </Card>
              <div className="space-y-4">
                {[
                  {
                    title: "Scenario 1: Draft a clearer client update",
                    situation: "You have rough notes from a project call and need to send a concise update email to a client by the end of the day.",
                    weakPrompt: "Write an email to my client.",
                    strongPrompt: "You are a project manager. Draft a professional client update email based on the notes below. Audience: a busy client stakeholder. Goals: be clear, calm, and specific. Include 1) progress made, 2) risks or blockers, and 3) next steps by Friday. Keep it under 180 words. Notes: [paste notes].",
                  },
                  {
                    title: "Scenario 2: Summarise a long article for your team",
                    situation: "You found a long industry article and want to post only the key takeaways in Slack so teammates can scan it quickly.",
                    weakPrompt: "Summarise this article.",
                    strongPrompt: "You are an analyst writing for a busy internal team. Summarise the article below in exactly 5 bullet points. Focus on implications for our team, not general background. Then add a final bullet called 'Why this matters now'. Use plain English and mention uncertainty where the article is speculative. Article: [paste article].",
                  },
                  {
                    title: "Scenario 3: Turn messy notes into an action plan",
                    situation: "You have unstructured notes from a meeting and need a usable checklist with owners and deadlines.",
                    weakPrompt: "Organise these notes.",
                    strongPrompt: "Act as an operations assistant. Convert the notes below into a table with columns for task, owner, deadline, and open question. If the owner or deadline is missing, mark it as 'unknown' instead of inventing one. After the table, list the top 3 decisions that still need clarification. Notes: [paste notes].",
                  },
                ].map(({ title, situation, weakPrompt, strongPrompt }) => (
                  <Card key={title} className="p-5">
                    <h3 className="font-semibold text-brand-green mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{situation}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-brand-orange/20 bg-brand-orange/5 p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-2">Too weak</p>
                        <p className="text-xs font-mono text-muted-foreground leading-relaxed">{weakPrompt}</p>
                      </div>
                      <div className="rounded-lg border border-brand-green/20 bg-brand-green/5 p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-brand-green mb-2">Model answer</p>
                        <p className="text-xs font-mono text-muted-foreground leading-relaxed">{strongPrompt}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Simple prompt review rubric</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    "Role: did you tell the AI what perspective to use?",
                    "Context: did you include the situation, audience, or constraints?",
                    "Task: is the requested outcome specific and concrete?",
                    "Format: did you say how the answer should be structured?",
                    "Guardrails: did you tell it what not to guess or invent?",
                    "Usability: could you copy the result directly into your workflow?",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border bg-background p-3 text-muted-foreground">{item}</div>
                  ))}
                </div>
              </Card>
              <QuickCheckCard
                prompt="A beginner wants to use AI at work tomorrow. Which starting point is strongest?"
                options={[
                  { id: "a", label: "Paste a confidential contract into a public chatbot and ask for legal advice" },
                  { id: "b", label: "Start with a low-risk summarising or drafting task, then verify the output" },
                  { id: "c", label: "Use AI for final decisions without checking the result" },
                  { id: "d", label: "Wait until you can build a full automation" },
                ]}
                correctOptionId="b"
                explanation="The safest and fastest way to build skill is to start with low-risk summarising, drafting, or organising tasks where you can easily review the result."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Outstanding! You now understand how LLMs work and how to prompt them effectively. Next: a tour of the best AI tools available today." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-4")}>
                      Continue to Module 4
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

