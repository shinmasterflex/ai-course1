/**
 * MODULE 9: YOUR AI TOOLKIT
 */

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DragSortChallenge, FlipCardGrid, MatchingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { ModuleHero } from "@/components/learning/module-hero"
import { ProgressBar } from "@/components/learning/progress-bar"
import { TextDisplay } from "@/components/learning/text-display"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useProgress } from "@/hooks/use-progress"
import { ArrowRight, BookOpen, CheckCircle2, Code, MessageSquare, Search, Shield, Wrench, Zap } from "lucide-react"

const learningOutcomes = [
  "Explain what AI is and how it works to anyone",
  "Use ChatGPT, Claude, and Gemini effectively with well-structured prompts",
  "Navigate the AI tool landscape and choose the right tool for any task",
  "Identify AI bias, misinformation, and privacy risks",
  "Design no-code AI workflows to automate repetitive tasks",
  "Think critically about AI claims in the media and in products",
]

const workflowToolGroups = [
  {
    category: "Automation & Workflows",
    icon: Zap,
    tools: [
      { name: "Zapier with AI", desc: "Connect apps and add one AI step for summarising, classifying, extracting, or drafting." },
      { name: "Make", desc: "Visual workflow builder that is stronger when you need branching logic or multi-step flows." },
      { name: "n8n", desc: "Open-source automation with more control and lower cost if you want flexibility." },
    ],
  },
  {
    category: "No-Code App Builders",
    icon: Wrench,
    tools: [
      { name: "Bubble", desc: "Build a full web app when you need a front end, database, and custom user flows." },
      { name: "Glide", desc: "Turn spreadsheet-style data into lightweight mobile or internal apps quickly." },
      { name: "Retool", desc: "Build internal business tools that connect to APIs and data sources." },
    ],
  },
  {
    category: "Custom Chatbots",
    icon: BookOpen,
    tools: [
      { name: "Chatbase", desc: "Turn documents or a website into a support or knowledge assistant." },
      { name: "CustomGPT.ai", desc: "Create a domain-specific chatbot around your own content." },
      { name: "Botpress", desc: "Build more structured assistants with flows, integrations, and guardrails." },
    ],
  },
]

const toolComparisonRows = [
  {
    task: "Daily drafting and iteration",
    bestTool: "ChatGPT",
    reason: "Fast iteration for writing, brainstorming, rewriting, and coding assistance.",
    output: "Drafts, outlines, emails, first-pass code",
  },
  {
    task: "Long document synthesis",
    bestTool: "Claude",
    reason: "Strong at structured analysis and careful summary of large text inputs.",
    output: "Executive summaries, comparison memos",
  },
  {
    task: "Google workspace-heavy tasks",
    bestTool: "Gemini",
    reason: "Fits naturally into Google-centered workflows and multimodal inputs.",
    output: "Docs-ready summaries, collaborative updates",
  },
  {
    task: "Fact-finding with citations",
    bestTool: "Research tool (Perplexity or browsing mode)",
    reason: "Source visibility and recency matter more than fluent prose.",
    output: "Source-backed notes and evidence lists",
  },
  {
    task: "Cross-app automation",
    bestTool: "Zapier / Make / n8n",
    reason: "Best for triggers, multi-step actions, and repeatable operations.",
    output: "Automated workflows and routed outputs",
  },
]

const assistantPromptComparisonRows = [
  {
    assistant: "ChatGPT",
    bestFor: "Rapid drafts and fast iteration",
    promptShape: "Ask for concise drafts, options, and iterations with a strict format.",
    caution: "Can sound confident before facts are verified.",
  },
  {
    assistant: "Claude",
    bestFor: "Careful synthesis and nuanced writing",
    promptShape: "Give clear structure, ask to separate confirmed facts from assumptions.",
    caution: "Still requires independent verification for claims.",
  },
  {
    assistant: "Gemini",
    bestFor: "Multimodal and Google ecosystem workflows",
    promptShape: "Specify destination format (Docs, slides, project updates) and audience.",
    caution: "Do not treat generated text as source evidence.",
  },
]

export default function Module9Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-9"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) {
        setCurrentSectionIndex(idx)
      }
    }
  }, [currentSectionIndex, sectionParam, sections])

  const handleSectionComplete = () => {
    const current = sections[currentSectionIndex]
    if (current) {
      markSectionComplete(MODULE_ID, current.id)
      setCurrentPosition(MODULE_ID, current.id)
    }

    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-9?section=${next.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 9: Your AI Toolkit</h1>
            <p className="text-lg text-muted-foreground mb-4">Turn everything you have learned so far into practical judgment, better prompting, and a workflow you can actually use.</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 9"
              title="Build practical AI judgment, not just tool familiarity"
              description="This capstone module ties the course together so learners can explain AI clearly, choose the right tools, use major assistants well, spot risks, and design one repeatable workflow."
              imageSrc="/images/modules/module-9.jpg"
              imageAlt="Workflow automation and AI integration"
            />
          )}

          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay
                variant="callout"
                content="This module is now a capstone, not just a tools tour. You will revisit the core ideas of the course, apply them to real products like ChatGPT, Claude, and Gemini, and finish by designing a safe no-code workflow."
              />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">What success looks like here</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Not:</span> memorising a random list of AI products.</p>
                  <p><span className="font-medium text-foreground">Yes:</span> being able to explain AI simply, choose tools deliberately, write stronger prompts, challenge weak claims, and design one workflow with clear guardrails.</p>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">What you should be able to do by the end</h3>
                <ul className="space-y-2 text-sm">
                  {learningOutcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Start Module
              </Button>
            </div>
          )}

          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Explain AI Clearly</h2>
              <TextDisplay content="A real sign of understanding is being able to explain AI to someone else without hiding behind jargon. Here is a simple explanation structure you can actually reuse." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">A plain-English explanation of AI</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Artificial intelligence</span> is software trained on large amounts of data so it can recognise patterns and produce useful outputs such as predictions, recommendations, summaries, or generated content.</p>
                  <p><span className="font-medium text-foreground">Machine learning</span> is the method that lets systems improve from examples instead of being programmed rule by rule.</p>
                  <p><span className="font-medium text-foreground">Large language models</span> like ChatGPT, Claude, and Gemini are trained on huge text datasets and generate responses by predicting likely next tokens based on the prompt and context.</p>
                </div>
              </Card>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "What goes in", body: "Training data, prompts, and context. Weak inputs lead to weak outputs." },
                  { title: "What happens", body: "The model detects patterns and predicts a response based on probability, not human understanding." },
                  { title: "What comes out", body: "An answer, image, classification, recommendation, or draft that still needs human judgment." },
                ].map(({ title, body }) => (
                  <Card key={title} className="p-4">
                    <p className="font-semibold text-brand-green mb-2">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">The 30-second teach-back formula</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. Start with the job: AI systems recognise patterns and generate outputs.</p>
                  <p>2. Explain the method: they learn from examples rather than fixed rules alone.</p>
                  <p>3. Explain the limitation: they can be wrong, biased, or overconfident if data or prompts are weak.</p>
                  <p>4. Explain the human role: people still choose the task, check the result, and decide what to trust.</p>
                </div>
              </Card>
              <QuickCheckCard
                prompt="Which explanation of AI is strongest for a beginner audience?"
                options={[
                  { id: "a", label: "AI is basically magic software that knows everything" },
                  { id: "b", label: "AI is software trained on data to recognise patterns and produce outputs, but humans still need to verify and guide it" },
                  { id: "c", label: "AI is only one technology and it always uses the same model" },
                  { id: "d", label: "AI thinks exactly like a human brain, only faster" },
                ]}
                correctOptionId="b"
                explanation="That answer is accurate, plain-English, and includes both capability and limitation."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Choose the Right AI Tool</h2>
              <TextDisplay content="Tool choice should follow the task. Good AI users do not ask 'What tool is trending?' They ask 'What kind of work am I actually trying to do?'" />

              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Tool Selection Table: task - tool - why</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">Task Type</th>
                        <th className="text-left p-2 font-semibold">Best Starting Tool</th>
                        <th className="text-left p-2 font-semibold">Why This Fit</th>
                        <th className="text-left p-2 font-semibold">Typical Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toolComparisonRows.map((row) => (
                        <tr key={row.task} className="border-b align-top">
                          <td className="p-2 font-medium">{row.task}</td>
                          <td className="p-2 text-brand-orange">{row.bestTool}</td>
                          <td className="p-2 text-muted-foreground">{row.reason}</td>
                          <td className="p-2 text-muted-foreground">{row.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-4 text-brand-orange">A practical toolkit map</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { tool: "ChatGPT", use: "Versatile everyday assistant", note: "Strong for drafting, brainstorming, tutoring, coding help, and general-purpose work." },
                    { tool: "Claude", use: "Careful analysis and long documents", note: "Often a strong fit for synthesis, tone-sensitive writing, and working through lengthy material." },
                    { tool: "Gemini", use: "Google ecosystem and multimodal tasks", note: "Useful when your work lives in Google tools or when you want broad multimodal capability." },
                    { tool: "Perplexity or cited search tools", use: "Research with sources", note: "Best when citations, recency, and evidence matter more than pure drafting." },
                    { tool: "Zapier, Make, or n8n", use: "Automation and workflows", note: "Best when the real goal is moving information between tools with a trigger and output." },
                  ].map(({ tool, use, note }) => (
                    <div key={tool} className="grid gap-1 rounded-lg border bg-background p-3 md:grid-cols-[140px_180px_1fr]">
                      <p className="font-semibold text-foreground">{tool}</p>
                      <p className="text-brand-green">{use}</p>
                      <p className="text-muted-foreground">{note}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><MessageSquare className="h-4 w-4" />When to use a chat assistant</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Drafting, summarising, brainstorming, tutoring, rewriting, or explaining.</li>
                    <li>The task can tolerate iteration and human review.</li>
                    <li>You are still deciding what the answer should look like.</li>
                  </ul>
                </Card>
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Search className="h-4 w-4" />When to use research tools</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>You need recent facts, citations, or independent sources.</li>
                    <li>You need evidence, not just fluent wording.</li>
                    <li>You want to verify a claim before repeating it.</li>
                  </ul>
                </Card>
              </div>
              <div className="space-y-4">
                {workflowToolGroups.map(({ category, icon: Icon, tools }) => (
                  <Card key={category} className="p-5">
                    <h3 className="font-bold text-brand-green mb-3 flex items-center gap-2"><Icon className="h-4 w-4" />{category}</h3>
                    <div className="space-y-2">
                      {tools.map(({ name, desc }) => (
                        <div key={name} className="flex gap-3 text-sm">
                          <span className="font-medium w-36 flex-shrink-0">{name}</span>
                          <span className="text-muted-foreground">{desc}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
              <MatchingChallenge
                title="Tool Selection Match"
                description="Match the task to the best starting tool or tool category."
                pairs={[
                  { id: "sources", left: "Compare current options with citations", right: "Research tool" },
                  { id: "long-doc", left: "Analyse a long report and rewrite it", right: "General chat assistant" },
                  { id: "automation", left: "Move data between apps with one AI step", right: "Automation workflow tool" },
                ]}
              />
              <QuickCheckCard
                prompt="You need an answer you can cite in a meeting this afternoon. What is the best first move?"
                options={[
                  { id: "a", label: "Ask any chatbot and trust the first answer" },
                  { id: "b", label: "Use a research tool or browsing mode that surfaces sources, then verify them" },
                  { id: "c", label: "Pick the tool with the best marketing" },
                  { id: "d", label: "Use an image generator to brainstorm" },
                ]}
                correctOptionId="b"
                explanation="When evidence matters, source-backed research is the right tool choice."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Prompt ChatGPT, Claude, and Gemini</h2>
              <TextDisplay content="The model changes, but the structure of a strong prompt stays mostly the same. Good prompting is about giving the system a clear job, useful context, constraints, and a target format." />

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Assistant Prompting Comparison Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">Assistant</th>
                        <th className="text-left p-2 font-semibold">Best For</th>
                        <th className="text-left p-2 font-semibold">Prompt Shape That Works</th>
                        <th className="text-left p-2 font-semibold">Watch-Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assistantPromptComparisonRows.map((row) => (
                        <tr key={row.assistant} className="border-b align-top">
                          <td className="p-2 font-medium text-brand-orange">{row.assistant}</td>
                          <td className="p-2">{row.bestFor}</td>
                          <td className="p-2 text-muted-foreground">{row.promptShape}</td>
                          <td className="p-2 text-muted-foreground">{row.caution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">A reliable prompt structure</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Role:</span> who the assistant should act like.</p>
                  <p><span className="font-medium text-foreground">Task:</span> the exact job to do.</p>
                  <p><span className="font-medium text-foreground">Context:</span> background, audience, or source material.</p>
                  <p><span className="font-medium text-foreground">Constraints:</span> length, tone, exclusions, and quality bar.</p>
                  <p><span className="font-medium text-foreground">Format:</span> bullets, table, email draft, checklist, JSON, and so on.</p>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-4 text-brand-green">One task, three assistants</h3>
                <div className="space-y-3 text-sm">
                  {[
                    {
                      assistant: "ChatGPT",
                      bestUse: "Fast iteration and drafting",
                      prompt: "You are an operations assistant. Summarise this 1,200-word meeting transcript into: 1) 5 bullet decisions, 2) 3 open questions, 3) an action list with owners. Keep it concise and businesslike.",
                    },
                    {
                      assistant: "Claude",
                      bestUse: "Longer documents and careful synthesis",
                      prompt: "Review the transcript below and produce a structured summary for executives. Separate confirmed decisions from assumptions, highlight unresolved risks, and quote the most important evidence from the text.",
                    },
                    {
                      assistant: "Gemini",
                      bestUse: "Google-centered and multimodal workflows",
                      prompt: "Create a summary for a Google Docs follow-up. Use headings for decisions, action items, and blockers. Write so the team can paste it directly into a project update.",
                    },
                  ].map(({ assistant, bestUse, prompt }) => (
                    <Card key={assistant} className="p-4 bg-background">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <p className="font-semibold text-brand-green">{assistant}</p>
                        <span className="text-xs rounded bg-brand-orange/10 px-2 py-1 text-brand-orange">{bestUse}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{prompt}</p>
                    </Card>
                  ))}
                </div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">Prompt upgrade example</h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium mb-1">Weak prompt</p>
                    <p className="text-muted-foreground">Summarise this meeting.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium mb-1">Stronger prompt</p>
                    <p className="text-muted-foreground">You are my chief of staff. Summarise this meeting transcript for a busy executive. Return 5 bullets, then a table with action items, owners, and deadlines. Flag any statements that sound uncertain.</p>
                  </div>
                </div>
              </Card>
              <DragSortChallenge
                title="Prompt Builder"
                description="Put the ingredients of a strong prompt in a sensible order."
                items={[
                  "Specify the output format",
                  "State the exact task",
                  "Add useful context",
                  "Set role or perspective",
                  "Add constraints or quality requirements",
                ]}
                correctOrder={[
                  "Set role or perspective",
                  "State the exact task",
                  "Add useful context",
                  "Add constraints or quality requirements",
                  "Specify the output format",
                ]}
              />
              <QuickCheckCard
                prompt="What most improves a prompt when you want better output from any major assistant?"
                options={[
                  { id: "a", label: "Using more exclamation marks" },
                  { id: "b", label: "Giving clearer task details, context, constraints, and target format" },
                  { id: "c", label: "Switching tools every time the first prompt is weak" },
                  { id: "d", label: "Keeping the prompt vague so the model can be creative" },
                ]}
                correctOptionId="b"
                explanation="Prompt quality usually matters more than brand choice for everyday tasks."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Bias, Privacy, and Misinformation Checks</h2>
              <TextDisplay content="Using AI well is not just about getting useful outputs. It is also about knowing when a tool could mislead you, expose sensitive data, or package bias in convincing language." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Risk Checklist (use before shipping output)</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground mb-1">Bias</p>
                    <p>- Did the output assume stereotypes or miss key stakeholder perspectives?</p>
                    <p>- Would this recommendation affect groups unfairly?</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground mb-1">Privacy</p>
                    <p>- Did I include personal, confidential, or regulated data?</p>
                    <p>- Is this tool approved for this class of information?</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground mb-1">Misinformation</p>
                    <p>- Are key claims supported by inspectable evidence?</p>
                    <p>- Did I verify uncertain or surprising statements with reliable sources?</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-medium text-foreground mb-1">Escalation Rule</p>
                    <p>- If wrong, could this cause legal, financial, or reputational harm?</p>
                    <p>- If yes, require human review before action.</p>
                  </div>
                </div>
              </Card>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Bias</h3>
                  <p className="text-sm text-muted-foreground">Ask who might be missing from the data, whose perspective the model favors, and who could be harmed if the output is wrong.</p>
                </Card>
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Privacy</h3>
                  <p className="text-sm text-muted-foreground">Do not paste confidential, regulated, or personally sensitive data into general AI tools without approved protections.</p>
                </Card>
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Misinformation</h3>
                  <p className="text-sm text-muted-foreground">Treat confident wording as presentation, not proof. Verify claims, especially when they are surprising, urgent, or emotionally charged.</p>
                </Card>
              </div>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">A five-question critical thinking filter</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. What is the claim, exactly?</p>
                  <p>2. What evidence supports it, and can I inspect that evidence myself?</p>
                  <p>3. Could the model be hallucinating, simplifying, or reflecting bias from its training data?</p>
                  <p>4. Is any sensitive information involved in this task?</p>
                  <p>5. What is the cost if this answer is wrong and I act on it?</p>
                </div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Red flags that should slow you down</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "The answer sounds highly confident but gives no source or evidence.",
                    "The task involves legal, medical, financial, or confidential decisions.",
                    "The claim is surprising, viral, emotional, or designed to create urgency.",
                    "The output makes assumptions about people, groups, or intent without support.",
                    "The workflow depends on fully automated action with no review point.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <DragSortChallenge
                title="Verify Before You Trust"
                description="Arrange the safest sequence for handling an uncertain AI claim."
                items={[
                  "Share or act on the claim",
                  "Check whether sensitive data or high stakes are involved",
                  "Find evidence or source material",
                  "Pause and define the exact claim",
                  "Decide whether human review is required",
                ]}
                correctOrder={[
                  "Pause and define the exact claim",
                  "Check whether sensitive data or high stakes are involved",
                  "Find evidence or source material",
                  "Decide whether human review is required",
                  "Share or act on the claim",
                ]}
              />
              <QuickCheckCard
                prompt="An AI tool gives you a polished answer about a breaking news event, but it provides no sources. What is the best response?"
                options={[
                  { id: "a", label: "Treat the polished wording as evidence that it is accurate" },
                  { id: "b", label: "Use it as a lead, then verify the claim with reliable sources before repeating it" },
                  { id: "c", label: "Share it quickly before the story changes" },
                  { id: "d", label: "Paste confidential company context into the tool to get more detail" },
                ]}
                correctOptionId="b"
                explanation="The right habit is to treat unsourced AI output as a draft or lead, not as proof."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Building Simple AI Workflows</h2>
              <TextDisplay content="Now apply the earlier lessons. A good workflow starts with a real task, uses the right tool for one narrow AI step, and includes a review point if errors would matter." />
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Workflow Blueprint: research {"->"} summarize {"->"} generate output</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">Stage</th>
                        <th className="text-left p-2 font-semibold">What You Do</th>
                        <th className="text-left p-2 font-semibold">Recommended Tool Type</th>
                        <th className="text-left p-2 font-semibold">Quality Check</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b align-top">
                        <td className="p-2 font-medium">1. Research</td>
                        <td className="p-2 text-muted-foreground">Collect source material and claims with citations.</td>
                        <td className="p-2">Research assistant / browsing mode</td>
                        <td className="p-2 text-muted-foreground">Confirm at least two reliable sources.</td>
                      </tr>
                      <tr className="border-b align-top">
                        <td className="p-2 font-medium">2. Summarize</td>
                        <td className="p-2 text-muted-foreground">Condense source material into key facts and uncertainties.</td>
                        <td className="p-2">ChatGPT / Claude / Gemini</td>
                        <td className="p-2 text-muted-foreground">Mark assumptions and unanswered questions.</td>
                      </tr>
                      <tr className="border-b align-top">
                        <td className="p-2 font-medium">3. Generate Output</td>
                        <td className="p-2 text-muted-foreground">Create final deliverable: memo, email, brief, or action plan.</td>
                        <td className="p-2">Chat assistant or workflow automation</td>
                        <td className="p-2 text-muted-foreground">Human review for tone, facts, and risk before sharing.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-4 text-brand-green">The easiest first workflow recipe</h3>
                <div className="space-y-3 text-sm">
                  {[
                    "1. Pick one repeatable task you already do every week.",
                    "2. Choose a clear trigger such as a new email, saved article, form submission, or scheduled time.",
                    "3. Add one AI action only: summarise, classify, extract, or draft.",
                    "4. Send the result somewhere useful: Notion, Slack, email, spreadsheet, CRM.",
                    "5. Decide whether a human should review before anything is sent externally or acted on.",
                    "6. Test with real examples for a week before adding complexity.",
                  ].map((step) => (
                    <div key={step} className="rounded-lg border bg-background p-3 text-muted-foreground">{step}</div>
                  ))}
                </div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-4 text-brand-orange">Example Workflow: Auto-summarise a newsletter</h3>
                <div className="space-y-3">
                  {[
                    { step: "Trigger", tool: "Gmail", action: "A new email arrives with the label 'Newsletter'" },
                    { step: "Action 1", tool: "Zapier AI", action: "Summarise the email into 3 bullet points and 1 key takeaway" },
                    { step: "Action 2", tool: "Notion", action: "Append the summary to a reading notes database" },
                    { step: "Review", tool: "You", action: "Skim the output during your next reading block and correct anything weak" },
                  ].map(({ step, tool, action }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="rounded bg-brand-orange px-2 py-0.5 text-xs font-bold text-white">{step}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{tool}:</span> <span className="text-muted-foreground">{action}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">Result: you save time, keep a searchable record, and still retain human quality control.</p>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Content repurposing", desc: "Trigger: new blog post published. AI rewrites it as 5 social posts. Human reviews before publishing." },
                  { title: "Customer feedback triage", desc: "Trigger: new review arrives. AI classifies sentiment and theme. Team reviews edge cases before escalation." },
                  { title: "Personal knowledge base", desc: "Trigger: save article to Pocket. AI creates a summary and tags. Output lands in Notion." },
                  { title: "Meeting follow-up", desc: "Trigger: transcript uploaded. AI extracts decisions and action items. Owner approves before sending." },
                ].map(({ title, desc }) => (
                  <Card key={title} className="p-4">
                    <p className="font-semibold text-brand-green mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
              <MatchingChallenge
                title="Workflow Tool Match"
                description="Match the workflow goal to the best no-code tool category."
                pairs={[
                  { id: "automate", left: "Connect apps and trigger actions", right: "Automation workflow tools" },
                  { id: "app", left: "Create a front-end internal tool", right: "No-code app builder" },
                  { id: "chatbot", left: "Answer questions from your own content", right: "Custom chatbot builder" },
                ]}
              />
              <QuickCheckCard
                prompt="What makes a strong first AI workflow?"
                options={[
                  { id: "a", label: "A narrow repeatable task with one clear trigger, one AI step, and an output you can evaluate" },
                  { id: "b", label: "A fully autonomous workflow with no human review anywhere" },
                  { id: "c", label: "A workflow that depends on many tools before you test it" },
                  { id: "d", label: "A workflow built around confidential data in public tools" },
                ]}
                correctOptionId="a"
                explanation="Good beginner workflows are small, testable, and safe enough to evaluate quickly."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Your First AI Mini-Project</h2>
              <TextDisplay variant="callout" content="This project now asks you to combine the whole toolkit: explain the task, choose the tool, write the prompt, check the risks, and map the workflow." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Step-by-step capstone project (real problem)</h3>
                <p className="text-sm text-muted-foreground mb-3">Scenario: You are a team lead preparing a weekly market update for non-technical stakeholders.</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Step 1 - Define the outcome:</span> "Deliver a one-page weekly AI market brief with 3 verified trends and 3 actions for our team."</p>
                  <p><span className="font-medium text-foreground">Step 2 - Choose tools:</span> Use a research tool for evidence, then ChatGPT/Claude/Gemini for summarization and drafting.</p>
                  <p><span className="font-medium text-foreground">Step 3 - Run research prompt:</span> "Find this week's top AI business updates with links to primary sources only. Return 5 candidates with publication date and why each matters."</p>
                  <p><span className="font-medium text-foreground">Step 4 - Run synthesis prompt:</span> "Using only the verified sources below, create a brief with: key trend, business implication, confidence level, and open risks."</p>
                  <p><span className="font-medium text-foreground">Step 5 - Risk check:</span> Apply bias, privacy, misinformation checklist before finalizing.</p>
                  <p><span className="font-medium text-foreground">Step 6 - Generate final output:</span> Produce a one-page summary plus a 5-bullet executive email version.</p>
                  <p><span className="font-medium text-foreground">Step 7 - Review and measure:</span> Ask one colleague to score usefulness (1-5) and track time saved versus manual process.</p>
                </div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="font-semibold mb-3">Mini-Project: Design One Safe, Useful Workflow</h3>
                <p className="text-sm text-muted-foreground mb-4">Answer these prompts as if you had to pitch the workflow to a teammate who is smart but skeptical.</p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>1. What repetitive task are you solving, and how would you explain it in plain English?</p>
                  <p>2. Which tool is the best fit for the job: chat assistant, research tool, or automation platform?</p>
                  <p>3. What exact prompt or AI instruction will you use?</p>
                  <p>4. What could go wrong: bias, privacy exposure, hallucination, or misinformation?</p>
                  <p>5. Where will human review happen before the result is used or shared?</p>
                  <p>6. What metric will tell you after one week whether the workflow is actually useful?</p>
                </div>
              </Card>
              <FlipCardGrid
                cards={[
                  {
                    title: "Explain",
                    prompt: "What should you be able to say first?",
                    answer: "The task, the input, and the output in plain language so another person immediately understands the workflow.",
                  },
                  {
                    title: "Choose",
                    prompt: "How do you pick the tool?",
                    answer: "Match the tool to the job: drafting, research, or automation. Do not start from the brand.",
                  },
                  {
                    title: "Protect",
                    prompt: "What safety question comes before launch?",
                    answer: "Ask what data is involved, who could be harmed by mistakes, and where a human must review the output.",
                  },
                  {
                    title: "Measure",
                    prompt: "How do you know it worked?",
                    answer: "Define one real metric such as time saved, response quality, reduced backlog, or fewer manual steps.",
                  },
                ]}
              />
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Three stronger starter project ideas</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Inbox helper:</span> classify incoming emails, draft a reply outline, and hold for human review.</p>
                  <p><span className="font-medium text-foreground">Reading assistant:</span> summarise saved articles, extract three takeaways, and store them in a searchable notes system.</p>
                  <p><span className="font-medium text-foreground">Meeting follow-up:</span> turn notes into action items with owners and deadlines, then send for approval before distribution.</p>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Capstone checklist</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "I can explain the workflow in plain English",
                    "I chose the tool because it fits the task",
                    "My prompt has context, constraints, and a target format",
                    "I identified the main risk before automating anything",
                    "There is a human review step if mistakes would matter",
                    "I know how I will measure whether the workflow helps",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <QuickCheckCard
                prompt="Which mini-project proposal best matches the learning goals of this module?"
                options={[
                  { id: "a", label: "A small workflow with a clear task, chosen tool, strong prompt, risk check, and success metric" },
                  { id: "b", label: "A huge automation with no review process because speed matters most" },
                  { id: "c", label: "A project driven only by whichever AI app is newest" },
                  { id: "d", label: "A workflow that starts by pasting confidential data into a public chatbot" },
                ]}
                correctOptionId="a"
                explanation="That option reflects the full capstone skill set, not just tool usage."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {currentSectionIndex === 7 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Next Steps & Resources</h2>
              <TextDisplay
                variant="success"
                content="You now have a more complete AI toolkit: conceptual understanding, tool selection judgment, stronger prompting habits, safer evaluation habits, and a workflow design process you can reuse. Up next: The Future of AI."
              />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />What you can now do</h3>
                <ul className="space-y-2 text-sm">
                  {learningOutcomes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Your 30-Day AI Challenge</h3>
                <p className="text-sm text-muted-foreground">Use the next month to turn this module from understanding into habit.</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {[
                    "Week 1: explain one AI concept out loud each day in plain English until it sounds natural.",
                    "Week 2: run the same task through ChatGPT, Claude, and Gemini, then compare prompt quality and results.",
                    "Week 3: build one tiny workflow with a trigger, one AI step, one output, and one review point.",
                    "Week 4: document what worked, where the risks showed up, and what you would trust AI to do next.",
                  ].map((item) => (
                    <Card key={item} className="p-4">
                      <p className="text-muted-foreground">{item}</p>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Curated Resources for Going Deeper</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      category: "Free Courses",
                      icon: BookOpen,
                      resources: [
                        "Google AI Essentials",
                        "DeepLearning.AI short courses",
                        "AI for Everyone by Andrew Ng",
                        "fast.ai for hands-on learners",
                      ],
                    },
                    {
                      category: "Critical Reading",
                      icon: Shield,
                      resources: [
                        "Co-Intelligence by Ethan Mollick",
                        "Atlas of AI by Kate Crawford",
                        "Human Compatible by Stuart Russell",
                        "Reliable AI newsletters and fact-checking sources",
                      ],
                    },
                    {
                      category: "Stay Current",
                      icon: Zap,
                      resources: [
                        "Ben's Bites",
                        "The AI Breakdown",
                        "Simon Willison's blog",
                        "MIT Technology Review AI coverage",
                      ],
                    },
                    {
                      category: "If You Want to Build",
                      icon: Code,
                      resources: [
                        "Zapier and Make tutorials",
                        "n8n templates and docs",
                        "Bubble academy",
                        "Hugging Face tutorials if you want to go deeper technically",
                      ],
                    },
                  ].map(({ category, icon: Icon, resources }) => (
                    <Card key={category} className="p-4">
                      <h4 className="font-bold text-brand-green mb-2 flex items-center gap-1"><Icon className="h-4 w-4" />{category}</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {resources.map((resource) => (
                          <li key={resource} className="flex gap-1"><span className="text-brand-orange">-</span>{resource}</li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 text-center">
                <h3 className="text-2xl font-bold mb-3">You are ready to use AI with judgment.</h3>
                <p className="text-muted-foreground mb-4">That matters more than knowing the newest product name. Tools will change. The ability to explain, evaluate, prompt, and verify will keep compounding.</p>
                <p className="text-lg font-semibold text-brand-orange">Now use it deliberately.</p>
              </Card>
              <div className="flex gap-4">
                <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white" onClick={() => router.push("/course/module-10")}>
                  Continue to Module 10
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/course")}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}


