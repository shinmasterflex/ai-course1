/**
 * MODULE 3: LARGE LANGUAGE MODELS & PROMPTING
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DragSortChallenge, FlipCardGrid, MatchingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const currentSection = sections[currentSectionIndex]
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "exercise", "quiz4", "quiz5"])
  const questions = moduleQuizData[MODULE_ID]
  const [challengePrompt, setChallengePrompt] = useState("")

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

  const challengeEvaluation = useMemo(() => {
    const normalized = challengePrompt.trim().toLowerCase()
    const hasRole = /\byou are\b|\bact as\b|\bas a\b/.test(normalized)
    const hasContext = /\bcontext\b|\bi run\b|\bi am\b|\baudience\b|\bsituation\b|\bmy business\b/.test(normalized)
    const hasTask = /\bcreate\b|\bdraft\b|\bpropose\b|\bgenerate\b|\bwrite\b|\banalyze\b|\bsummarize\b|\bsummarise\b/.test(normalized)
    const hasConstraints = /\bunder\b|\bmax\b|\bmust\b|\bexactly\b|\blimit\b|\bdo not\b|\bno\b|\bat least\b/.test(normalized)
    const hasExamples = /\bexample\b|\bfor example\b|\bstyle\b|\buse this format\b/.test(normalized)
    const hasAdvanced = /\bstep by step\b|\bchain[- ]of[- ]thought\b|\bfew[- ]shot\b|\bthink step by step\b/.test(normalized)

    const checklist = [
      { id: "role", label: "Role", pass: hasRole },
      { id: "context", label: "Context", pass: hasContext },
      { id: "task", label: "Task", pass: hasTask },
      { id: "constraints", label: "Constraints", pass: hasConstraints },
      { id: "examples", label: "Examples", pass: hasExamples },
      { id: "advanced", label: "Advanced technique", pass: hasAdvanced },
    ]

    const score = checklist.filter((item) => item.pass).length
    return { checklist, score, hasInput: normalized.length > 0 }
  }, [challengePrompt])

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

  const mainExplainerAttributes = getExplainerAttributes({
    type: "Module workspace",
    title: "Module 3: Large Language Models and Prompting",
    summary: currentSection
      ? `You are viewing ${currentSection.title}, section ${currentSectionIndex + 1} of ${totalSections} in Module 3.`
      : "This module explains language models, prompt structure, and how to get more reliable output from chat assistants.",
    details: [
      `Completed sections so far: ${completedSectionIds.length} of ${totalSections}.`,
      "The exercises here are designed to turn prompting theory into repeatable habits.",
    ],
    interaction: "Read the prompt guidance, test the examples, and compare outputs as you move through the module.",
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main {...mainExplainerAttributes} className="flex-1 p-8 max-w-4xl mx-auto">
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
              componentId="m3-hero"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="This is where things get practical. You will learn exactly how ChatGPT and similar tools work - and more importantly, how to communicate with them to get genuinely useful results." />
              <Card componentId="m3-module-overview" className="p-5 space-y-2">
                {["What is a Large Language Model (LLM)?","How ChatGPT generates responses","The anatomy of a good prompt","Prompting techniques: role, chain-of-thought, few-shot","Hands-on practice exercises","Module Quiz"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <QuickCheckCard
                prompt="What is the practical focus of this module?"
                options={[
                  { id: "a", label: "Only AI history and regulation" },
                  { id: "b", label: "Understanding LLM mechanics and writing stronger prompts" },
                  { id: "c", label: "Building new models from scratch" },
                  { id: "d", label: "Replacing verification with automation" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "This module goes well beyond history and regulation — it is an applied practice module for real prompt improvement.",
          b: "Exactly. This module is about getting better output through better understanding and prompting habits.",
          c: "Building new models from scratch requires deep engineering expertise and is not the focus of this course.",
          d: "Replacing verification with automation is the opposite of what this module teaches. Human review is essential.",
        }}
                explanation="Exactly. This module is about getting better output through better understanding and prompting habits."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: What Is an LLM */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What Is a Language Model?</h2>
              <TextDisplay content="A Large Language Model (LLM) is an AI trained on massive amounts of text to understand and generate human language. But to use these tools effectively - and to avoid being misled by them - you need to understand something about how they work internally." />
              <Card componentId="m3-language-models" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Core mental model: a next-word prediction engine</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>An LLM&apos;s core job is simple: given all text so far, predict the next most likely token. It does this again and again, one token at a time, until it produces a full response.</p>
                  <p><span className="font-medium text-foreground">Analogy 1 - autocomplete on steroids:</span> your phone predicts one next word from a tiny history. An LLM predicts from a massive context window using patterns learned from internet-scale text.</p>
                  <p><span className="font-medium text-foreground">Analogy 2 - librarian with pattern memory:</span> imagine a librarian who has read millions of books and can continue any paragraph in a plausible style, but does not inherently verify facts unless you ask for verification steps.</p>
                </div>
              </Card>
              <TextDisplay variant="callout" content="The word 'large' refers to the number of parameters (adjustable values) in the model - modern LLMs have hundreds of billions. The more parameters, the more nuance and complexity the model can capture." />

              <Card componentId="m3-language-models" className="p-5">
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

              <Card componentId="m3-language-models" className="p-5">
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

              <Card componentId="m3-language-models" className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Attention — how the model decides what matters</h3>
                <p className="text-sm text-muted-foreground mb-3">The key innovation of the Transformer architecture (the T in ChatGPT) is the <strong>attention mechanism</strong>. When processing any word or token, the model asks: &ldquo;which other tokens in the context should I pay attention to right now?&rdquo;</p>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <p><span className="font-medium text-foreground">Example:</span> In the sentence &ldquo;The animal didn&apos;t cross the street because it was too tired,&rdquo; what does &ldquo;it&rdquo; refer to? The attention mechanism allows the model to connect &ldquo;it&rdquo; directly to &ldquo;animal&rdquo; — even if they are far apart in the sentence.</p>
                  <p><span className="font-medium text-foreground">Why this is revolutionary:</span> Previous architectures processed text sequentially, like reading letter by letter. Attention allows every token to simultaneously look at every other token and decide which ones are relevant. This is why Transformers handle nuance, context, and long-range relationships so much better than older approaches.</p>
                </div>
              </Card>

              <Card componentId="m3-language-models" className="p-5">
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

              <Card componentId="m3-language-models" className="p-5 bg-brand-green/5 border-brand-green/20">
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
                                optionExplanations={{
          a: "Internet access would not help with letter-counting. The challenge is that LLMs process tokens, not individual characters.",
          b: "LLMs tokenise text into chunks. 'strawberry' might become 'straw' + 'berry', making individual letter-counting difficult since the model never sees raw characters — only token sequences.",
          c: "Letter-counting tasks are well represented in training data. The issue is not lack of examples — it is the tokenisation architecture.",
          d: "LLMs understand the English alphabet well enough to work with text. The specific challenge with counting letters is the token-based representation, not alphabet knowledge.",
        }}
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
                  <Card key={step} componentId="m3-how-llms-work" className="p-4 flex gap-3">
                    <span className="font-bold text-brand-orange w-24 flex-shrink-0 text-sm pt-0.5">{step}</span>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>

              <Card componentId="m3-how-llms-work" className="p-5">
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

              <Card componentId="m3-how-llms-work" className="p-5 bg-brand-green/5 border-brand-green/20">
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

              <Card componentId="m3-how-llms-work" className="p-5">
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

              <Card componentId="m3-how-llms-work" className="p-5 border-blue-500/20 bg-blue-500/5">
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
                                optionExplanations={{
          a: "LLMs do not search the web unless given specific tools. The same model can produce different answers to the same question due to sampling randomness.",
          b: "Temperature controls how randomly the model samples from its output probability distribution. At default settings, the same prompt can produce different responses because sampling introduces controlled randomness.",
          c: "Models are not updated between individual user queries. Variation comes from the probabilistic sampling built into the generation process.",
          d: "LLMs do not forget previous answers — they produce varied outputs because generation is probabilistic, not because of memory failure.",
        }}
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
              <TextDisplay content="A prompt is the message you send to an AI. The quality of your prompt directly determines the quality of the response. A high-quality prompt usually has five parts:" />
              <div className="space-y-3">
                {[
                  { part: "Role", example: "You are an expert nutrition coach...", why: "Role prompting activates the right perspective, tone, and standards." },
                  { part: "Context", example: "I am a busy parent with 20 minutes for dinner prep...", why: "Context makes outputs tailored instead of generic." },
                  { part: "Task", example: "Create a 7-day dinner plan...", why: "Specific tasks produce specific outputs." },
                  { part: "Constraints", example: "Each meal under 600 calories, no shellfish, max 20 minutes...", why: "Constraints prevent unusable answers and reduce ambiguity." },
                  { part: "Examples", example: "Here is the style I want: 'Mon: Chicken stir-fry (15 min)'...", why: "Examples calibrate style, depth, and format quickly." },
                ].map(({ part, example, why }) => (
                  <Card key={part} componentId="m3-prompt-anatomy" className="p-4">
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
              <Card componentId="m3-prompt-anatomy" className="p-4 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-2 text-brand-green">Full example prompt</h3>
                <p className="text-sm font-mono bg-white p-3 rounded border italic text-gray-700">
                  You are an expert nutrition coach. I am a 35-year-old who runs 5km three times a week and wants to lose 5kg. Create a 7-day meal plan. Constraints: no shellfish, each meal under 10 minutes to prepare, and keep each day near 1,900 calories. Use this style example: &ldquo;Monday - Breakfast: Greek yogurt + berries.&rdquo; Return the result as a table with breakfast, lunch, dinner, and estimated calories.
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
                      title: "Constraints",
                      prompt: "Why define boundaries and limits?",
                      answer: "Constraints block common failure modes like rambling, missing requirements, or invented assumptions.",
                    },
                    {
                      title: "Examples",
                      prompt: "Why include examples in prompts?",
                      answer: "Examples are one of the fastest ways to align style and quality. The model imitates the pattern you demonstrate.",
                    },
                  ]}
                />
              </div>
              <QuickCheckCard
                prompt="If a prompt says 'Write a meal plan' but gives no audience, constraints, or examples, what is it mainly missing?"
                options={[
                  { id: "a", label: "Mostly context, constraints, and examples" },
                  { id: "b", label: "Only spelling corrections" },
                  { id: "c", label: "A model update" },
                  { id: "d", label: "Internet access" },
                ]}
                correctOptionId="a"
                                optionExplanations={{
          a: "The prompt is under-specified. Adding context, constraints, and examples usually makes the response far more useful and reliable.",
          b: "Spelling is fine in this prompt. The problem is that there is no audience, no dietary restrictions, no duration, and no goals specified.",
          c: "The model does not need updating — the prompt needs more detail. Model capability is not the limiting factor here.",
          d: "Internet access would not fix a vague prompt. Specificity and context matter more than connectivity.",
        }}
                explanation="The prompt is under-specified. Adding context, constraints, and examples usually makes the response far more useful and reliable."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: Prompt Techniques */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Prompting Progression: Basic to Advanced</h2>
              <TextDisplay content="Great prompting is a skill ladder. Start simple, then add structure, then use advanced techniques when needed." />
              <div className="space-y-4">
                {[
                  {
                    level: "Level 1: Basic prompting",
                    technique: "Clear task + plain language",
                    how: "State exactly what you want in one sentence.",
                    example: "Summarise this article in 3 bullet points.",
                    why: "Good for fast low-stakes tasks and first drafts.",
                  },
                  {
                    level: "Level 2: Structured prompting",
                    technique: "Role + context + constraints + format",
                    how: "Use prompt anatomy to make outputs reliable and reusable.",
                    example: "You are a product analyst. Summarise this article for a leadership audience in 3 bullets plus 1 risk, each under 20 words.",
                    why: "Reduces ambiguity and improves consistency across outputs.",
                  },
                  {
                    level: "Level 3: Advanced prompting",
                    technique: "Role prompting + chain-of-thought + few-shot",
                    how: "Assign a specialist role, request explicit reasoning, and show examples when precision matters.",
                    example: "You are a senior data scientist. Think step by step before giving your final recommendation. Use the two examples below to match style.",
                    why: "Improves performance on complex reasoning, analysis, and high-value workflows.",
                  },
                ].map(({ level, technique, how, example, why }) => (
                  <Card key={level} componentId="m3-prompting-techniques" className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-2">{level}</p>
                    <h3 className="font-bold text-brand-green mb-2">{technique}</h3>
                    <p className="text-sm mb-2"><span className="font-medium">How:</span> {how}</p>
                    <p className="text-sm font-mono bg-gray-50 p-2 rounded mb-2 italic text-gray-700">{example}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium">Why it works:</span> {why}</p>
                  </Card>
                ))}
              </div>
              <Card componentId="m3-prompting-techniques" className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5 border-brand-orange/20">
                <h3 className="font-semibold mb-4 text-brand-orange">Before vs after: same task, better prompt, better output</h3>
                <div className="space-y-4 text-sm">
                  <div className="border rounded-lg p-3 bg-background">
                    <p className="font-semibold text-brand-orange mb-2">Example A: Summarising for executives</p>
                    <p className="text-xs font-mono text-muted-foreground mb-2">Before prompt: &ldquo;Summarise this report.&rdquo;</p>
                    <p className="text-xs text-muted-foreground mb-2">Typical output: long generic summary with no priorities.</p>
                    <p className="text-xs font-mono text-muted-foreground mb-2">After prompt: &ldquo;You are a strategy analyst. Summarise this report for execs in 4 bullets: key finding, business impact, risk, recommended action. Max 18 words per bullet.&rdquo;</p>
                    <p className="text-xs text-muted-foreground">Improved output: concise, decision-ready bullets with action and risk clearly separated.</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-background">
                    <p className="font-semibold text-brand-orange mb-2">Example B: Coding help</p>
                    <p className="text-xs font-mono text-muted-foreground mb-2">Before prompt: &ldquo;Fix this code.&rdquo;</p>
                    <p className="text-xs text-muted-foreground mb-2">Typical output: partial guess, missing root cause explanation.</p>
                    <p className="text-xs font-mono text-muted-foreground mb-2">After prompt: &ldquo;Act as a senior TypeScript engineer. Debug this function. First explain root cause in one paragraph, then provide a patched version, then list 3 regression tests.&rdquo;</p>
                    <p className="text-xs text-muted-foreground">Improved output: diagnosis + corrected code + validation plan in one response.</p>
                  </div>
                </div>
              </Card>
              <Card componentId="m3-prompting-techniques" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
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
              <Card componentId="m3-prompting-techniques" className="p-5 bg-gradient-to-br from-brand-green/5 to-blue-500/5 border-brand-green/20">
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
              <TextDisplay content="Now it is your turn. For each scenario below, write a high-quality prompt using role, context, task, constraints, and examples where helpful." />
              <TextDisplay variant="callout" content="There are no wrong answers here - the goal is to practice the habit of thinking carefully about role, context, task, and format before you type your prompt." />
              <Card componentId="m3-hands-on-practice" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
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
                    title: "Scenario 1: Writing - draft a clearer client update",
                    situation: "You have rough notes from a project call and need to send a concise update email to a client by the end of the day.",
                    weakPrompt: "Write an email to my client.",
                    strongPrompt: "You are a project manager. Draft a professional client update email based on the notes below. Audience: a busy client stakeholder. Goals: be clear, calm, and specific. Include 1) progress made, 2) risks or blockers, and 3) next steps by Friday. Keep it under 180 words. Notes: [paste notes].",
                    outputShift: "Output improves from generic text to a ready-to-send update with clear structure and next steps.",
                  },
                  {
                    title: "Scenario 2: Summarizing - extract decision-ready takeaways",
                    situation: "You found a long industry article and want to post only the key takeaways in Slack so teammates can scan it quickly.",
                    weakPrompt: "Summarise this article.",
                    strongPrompt: "You are an analyst writing for a busy internal team. Summarise the article below in exactly 5 bullet points. Focus on implications for our team, not general background. Then add a final bullet called 'Why this matters now'. Use plain English and mention uncertainty where the article is speculative. Article: [paste article].",
                    outputShift: "Output improves from broad recap to concise team-relevant insights with explicit urgency.",
                  },
                  {
                    title: "Scenario 3: Coding help - debug faster",
                    situation: "A function is throwing runtime errors. You want AI help that is diagnostic and testable, not vague.",
                    weakPrompt: "Fix my code.",
                    strongPrompt: "You are a senior JavaScript engineer. Analyze the code and error log below. 1) Explain the root cause in plain language, 2) provide a patched function, 3) list 3 unit tests for edge cases, 4) note any performance risks. Code: [paste code]. Error: [paste error].",
                    outputShift: "Output improves from guesswork to root-cause analysis, concrete patch, and a verification plan.",
                  },
                  {
                    title: "Scenario 4: Ideation - generate useful, varied ideas",
                    situation: "You need campaign ideas for a product launch and want variety without fluff.",
                    weakPrompt: "Give me ideas for a launch campaign.",
                    strongPrompt: "You are a creative strategist for SaaS launches. Generate 12 campaign ideas for [product]. Constraints: at least 4 low-budget ideas, at least 3 unconventional ideas, and no repeated channels. For each idea include target audience, hook, and one measurable KPI.",
                    outputShift: "Output improves from repetitive suggestions to diverse, execution-ready ideas with measurable outcomes.",
                  },
                ].map(({ title, situation, weakPrompt, strongPrompt, outputShift }) => (
                  <Card key={title} componentId="m3-hands-on-practice" className="p-5">
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
                    <p className="text-xs text-muted-foreground mt-3"><span className="font-medium text-foreground">Why this is better:</span> {outputShift}</p>
                  </Card>
                ))}
              </div>
              <Card componentId="m3-hands-on-practice" className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Prompt debugging: why outputs fail and how to fix them</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Failure: too generic.</span> Cause: weak context. <span className="font-medium text-foreground">Fix:</span> add audience, purpose, and situation.</p>
                  <p><span className="font-medium text-foreground">Failure: rambling output.</span> Cause: no constraints. <span className="font-medium text-foreground">Fix:</span> set length, structure, and exclusions.</p>
                  <p><span className="font-medium text-foreground">Failure: wrong format.</span> Cause: unspecified output shape. <span className="font-medium text-foreground">Fix:</span> demand JSON/table/bullets with required fields.</p>
                  <p><span className="font-medium text-foreground">Failure: hallucinated details.</span> Cause: model is filling gaps. <span className="font-medium text-foreground">Fix:</span> instruct &ldquo;if unsure, say unknown&rdquo; and request assumptions explicitly.</p>
                  <p><span className="font-medium text-foreground">Failure: shallow reasoning.</span> Cause: complex task with simple prompt. <span className="font-medium text-foreground">Fix:</span> ask for step-by-step reasoning and final recommendation.</p>
                </div>
              </Card>
              <Card componentId="m3-hands-on-practice" className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Mini challenge: upgrade a weak prompt</h3>
                <p className="text-sm text-muted-foreground mb-3">Take this weak prompt and refine it using the full anatomy plus advanced techniques.</p>
                <div className="rounded-lg border bg-background p-3 mb-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange mb-2">Weak prompt</p>
                  <p className="text-sm font-mono text-muted-foreground">Tell me how to improve my business.</p>
                </div>
                <div className="rounded-lg border bg-background p-3 mb-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-green mb-2">Your objective</p>
                  <p className="text-sm text-muted-foreground">Rewrite this into a high-quality prompt that includes role, context, task, constraints, examples, and one advanced technique (role prompting, few-shot, or chain-of-thought).</p>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-green mb-2">Sample high-quality version</p>
                  <p className="text-xs font-mono text-muted-foreground leading-relaxed">You are a small-business growth advisor. I run a neighborhood cafe with declining weekday foot traffic. Context: average ticket is $12, marketing budget is $800/month, and I can only launch 2 initiatives this quarter. Think step by step and propose the 5 highest-impact growth ideas. For each idea include expected effort (low/medium/high), estimated cost, and one KPI. Use this output format: markdown table with columns Idea | Why it works | Cost | KPI. If information is missing, state assumptions explicitly.</p>
                </div>
                <div className="rounded-lg border bg-background p-3 mt-3 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-orange">Try it yourself</p>
                  <Textarea
                    value={challengePrompt}
                    onChange={(e) => setChallengePrompt(e.target.value)}
                    rows={6}
                    placeholder="Write your improved prompt here..."
                    className="text-sm"
                  />
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-xs text-muted-foreground">Checklist score: <span className="font-semibold text-foreground">{challengeEvaluation.score}/6</span></p>
                    <Button type="button" variant="outline" size="sm" onClick={() => setChallengePrompt("")}>Reset attempt</Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-xs">
                    {challengeEvaluation.checklist.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded border px-2 py-1 ${item.pass ? "border-brand-green/30 bg-brand-green/5 text-brand-green" : "border-brand-orange/30 bg-brand-orange/5 text-muted-foreground"}`}
                      >
                        {item.pass ? "Pass" : "Missing"}: {item.label}
                      </div>
                    ))}
                  </div>
                  {challengeEvaluation.hasInput ? (
                    <p className="text-xs text-muted-foreground">
                      {challengeEvaluation.score >= 5
                        ? "Strong prompt. You are close to production-ready quality."
                        : "Keep iterating: add missing checklist items to improve precision and output quality."}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Paste your refined prompt to get instant feedback.</p>
                  )}
                </div>
              </Card>
              <Card componentId="m3-hands-on-practice" className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Simple prompt review rubric</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    "Role: did you tell the AI what perspective to use?",
                    "Context: did you include the situation, audience, or constraints?",
                    "Task: is the requested outcome specific and concrete?",
                    "Constraints: did you set limits or define what to avoid?",
                    "Examples: did you provide a style or structure sample if needed?",
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
                                optionExplanations={{
          a: "Pasting a confidential contract into a public chatbot creates a serious privacy and data security risk.",
          b: "The safest and fastest way to build skill is to start with low-risk summarising, drafting, or organising tasks where you can easily review the result.",
          c: "Using AI for final decisions without checking is the opposite of responsible practice. Review is non-negotiable.",
          d: "Waiting until you can build a full automation means missing months of incremental benefit. A single summarising task is a better starting point.",
        }}
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
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} componentId="m3-quiz" />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Outstanding! You now understand how LLMs work and how to prompt them effectively. Next: a tour of the best AI tools available today." />
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

