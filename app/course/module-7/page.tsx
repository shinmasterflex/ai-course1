/**
 * MODULE 7: AI FOR BUSINESS & WORK
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
import { CheckCircle2, Briefcase, TrendingUp, Users, ArrowRight, Zap, Target, Brain, PenTool } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module7Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-7"
  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5", "quiz6"])
  const questions = moduleQuizData[MODULE_ID]
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [currentSectionIndex, sectionParam, sections])

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [4, 8],
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
      router.push(`/course/module-7?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 7: AI for Business & Work</h1>
            <p className="text-lg text-muted-foreground mb-4">How AI is transforming the workplace  - and how to stay ahead</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 7"
              title="Translate AI trends into career advantage"
              description="Understand where AI creates value at work and shape a personal strategy for skills, impact, and adaptability."
              imageSrc="/images/modules/module-7.jpg"
              imageAlt="Professional business and AI technology"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="AI is not just a technology trend  - it is fundamentally reshaping how work gets done. In this module you will learn how AI is being applied across industries, what it means for your career, and how to build a practical AI strategy for your professional life." />
              <Card className="p-5 space-y-2">
                {[
                  "How AI is changing the workplace right now",
                  "What AI means for jobs  - and which skills matter most",
                  "AI applications across major industries",
                  "How to build your own AI strategy at work",
                  "Practical steps to build AI skills in your career",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: AI in the Workplace */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI in the Workplace</h2>
              <TextDisplay content="AI is already embedded in the tools most professionals use every day  - often without people realising it. Email filtering, meeting transcription, document summarisation, sales forecasting, and code completion are all AI features now standard in mainstream products." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Your first workplace use should pass this test</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "The task is repetitive and low-risk",
                    "The output is easy for you to review",
                    "You can measure time saved in a week",
                    "No sensitive data is shared outside approved tools",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <div className="space-y-4">
                {[
                  {
                    category: "Communication & Collaboration",
                    icon: Users,
                    examples: [
                      { name: "Meeting summaries", desc: "Tools like Otter.ai, Fireflies, and Microsoft Copilot auto-transcribe and summarise meetings, extracting action items." },
                      { name: "Email assistance", desc: "Gmail's Smart Compose, Outlook Copilot, and Superhuman draft replies and surface important emails automatically." },
                      { name: "Instant translation", desc: "DeepL and Google Translate now produce near-human quality for business documents and real-time conversations." },
                    ],
                  },
                  {
                    category: "Knowledge Work",
                    icon: Briefcase,
                    examples: [
                      { name: "Document drafting", desc: "Claude, ChatGPT, and Notion AI draft reports, proposals, and presentations from bullet points." },
                      { name: "Research & analysis", desc: "Perplexity and ChatGPT with web access can synthesise information from hundreds of sources in seconds." },
                      { name: "Code generation", desc: "GitHub Copilot and Cursor write, review, and debug code - boosting developer productivity by 30-50%." },
                    ],
                  },
                  {
                    category: "Business Operations",
                    icon: TrendingUp,
                    examples: [
                      { name: "Customer service", desc: "AI chatbots now handle 60-70% of tier-1 support queries, with human escalation for complex cases." },
                      { name: "Forecasting", desc: "AI models predict sales, inventory demand, and customer churn with greater accuracy than traditional methods." },
                      { name: "Hiring & HR", desc: "AI screens CVs, schedules interviews, and analyses employee engagement  - raising questions about bias." },
                    ],
                  },
                ].map(({ category, icon: Icon, examples }) => (
                  <Card key={category} className="p-5">
                    <h3 className="font-bold text-brand-green mb-3 flex items-center gap-2"><Icon className="h-4 w-4" />{category}</h3>
                    <div className="space-y-2">
                      {examples.map(({ name, desc }) => (
                        <div key={name} className="flex gap-3 text-sm">
                          <span className="font-medium w-40 flex-shrink-0">{name}</span>
                          <span className="text-muted-foreground">{desc}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
              <FlipCardGrid
                cards={[
                  {
                    title: "Low Risk",
                    prompt: "What work tasks are best for first AI adoption?",
                    answer: "Repetitive, low-risk tasks with outputs you can review quickly, like summaries and draft updates.",
                  },
                  {
                    title: "Human Review",
                    prompt: "Why keep a human in the loop at work?",
                    answer: "Because accountability, context, and final judgment remain human responsibilities in professional settings.",
                  },
                  {
                    title: "Measurement",
                    prompt: "How do teams prove AI value?",
                    answer: "Track outcomes like hours saved, faster turnaround, and fewer repetitive manual steps.",
                  },
                  {
                    title: "Scope",
                    prompt: "Why start with small pilot workflows?",
                    answer: "Small pilots reduce risk and create evidence for what should scale across the team.",
                  },
                ]}
              />
              <QuickCheckCard
                prompt="What is the best first AI use for most professionals?"
                options={[
                  { id: "a", label: "Automate every client-facing decision immediately" },
                  { id: "b", label: "Start with a low-risk repetitive task and keep human review" },
                  { id: "c", label: "Adopt the newest tool first and find a task later" },
                  { id: "d", label: "Wait until your role is fully disrupted" },
                ]}
                correctOptionId="b"
                explanation="The safest high-leverage starting point is a repeatable, low-risk task where you can verify output quality and track time saved."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: AI & Jobs */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI & the Future of Jobs</h2>
              <TextDisplay content="The relationship between AI and employment is nuanced. History shows that major technological shifts eliminate some jobs and create many others  - but the transition is uneven and can be disruptive for individuals." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-4 text-brand-orange">The Three-Category Framework</h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "High displacement risk",
                      color: "text-red-500",
                      examples: "Routine data entry, basic document review, simple customer support scripts, rote translation, basic image captioning",
                      insight: "Tasks that are repetitive, rule-based, and text or data-driven are easiest to automate. If a task can be described as a clear procedure, AI can likely do it.",
                    },
                    {
                      label: "Augmentation (most roles)",
                      color: "text-brand-orange",
                      examples: "Lawyers, doctors, teachers, marketers, accountants, engineers, designers, writers",
                      insight: "AI handles research, drafting, and analysis  - humans focus on judgement, relationships, creativity, and accountability. Productivity rises; headcount may shrink modestly.",
                    },
                    {
                      label: "High growth & new roles",
                      color: "text-brand-green",
                      examples: "AI trainers, prompt engineers, AI ethicists, AI product managers, data curators, human-AI interaction designers",
                      insight: "New roles that did not exist five years ago are growing rapidly. Organisations need people who can bridge AI capability and human context.",
                    },
                  ].map(({ label, color, examples, insight }) => (
                    <div key={label} className="border-l-2 border-muted pl-4">
                      <p className={`font-bold mb-1 ${color}`}>{label}</p>
                      <p className="text-sm text-muted-foreground mb-1"><span className="font-medium">Examples:</span> {examples}</p>
                      <p className="text-sm text-muted-foreground"><span className="font-medium">Insight:</span> {insight}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <DragSortChallenge
                title="Career Priority Order"
                description="Drag these actions into a practical sequence for building AI career resilience."
                items={[
                  "Lead a team-wide AI initiative",
                  "Document one workflow that works",
                  "Apply AI to two repeatable tasks",
                  "Measure quality and time saved",
                ]}
                correctOrder={[
                  "Apply AI to two repeatable tasks",
                  "Measure quality and time saved",
                  "Document one workflow that works",
                  "Lead a team-wide AI initiative",
                ]}
              />
              <TextDisplay variant="callout" content="The most important career insight: AI fluency is becoming a baseline expectation across almost every professional role  - just as digital literacy and spreadsheet skills became baseline expectations in the 1990s. This is not optional." />
              <QuickCheckCard
                prompt="What is the most durable career takeaway from this section?"
                options={[
                  { id: "a", label: "Only technical workers need AI fluency" },
                  { id: "b", label: "AI fluency is becoming a baseline expectation across many roles" },
                  { id: "c", label: "Career risk disappears if you ignore AI tools" },
                  { id: "d", label: "The safest move is to wait for the market to settle" },
                ]}
                correctOptionId="b"
                explanation="The section's core point is that AI fluency is turning into a baseline professional skill, not a niche specialty."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Industry Applications */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Across Industries</h2>
              <TextDisplay content="AI is being deployed in every major industry. The applications vary, but the underlying pattern is the same: AI handles analysis and prediction at scale, freeing humans for higher-value work." />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    industry: "Healthcare",
                    color: "text-blue-600",
                    applications: [
                      "Medical image analysis  - AI detects cancers in scans with radiologist-level accuracy",
                      "Drug discovery  - AI reduces new drug development from decades to years",
                      "Clinical documentation  - AI transcribes patient notes automatically",
                      "Personalised treatment  - AI analyses genomic data to recommend targeted therapies",
                    ],
                  },
                  {
                    industry: "Finance",
                    color: "text-green-600",
                    applications: [
                      "Fraud detection  - AI flags suspicious transactions in real time",
                      "Algorithmic trading  - AI executes trades at speeds humans cannot match",
                      "Credit scoring  - AI analyses thousands of data points beyond credit history",
                      "Regulatory compliance  - AI monitors transactions for suspicious activity",
                    ],
                  },
                  {
                    industry: "Education",
                    color: "text-purple-600",
                    applications: [
                      "Personalised learning paths  - AI adapts content to each student's pace",
                      "Automated grading  - AI grades essays with detailed feedback",
                      "Intelligent tutoring  - AI provides one-on-one tutoring at scale",
                      "Early intervention  - AI identifies students at risk of falling behind",
                    ],
                  },
                  {
                    industry: "Retail & E-commerce",
                    color: "text-orange-600",
                    applications: [
                      "Product recommendations  - AI drives 35% of Amazon's revenue",
                      "Demand forecasting  - AI optimises inventory to reduce waste",
                      "Visual search  - AI lets shoppers search by uploading photos",
                      "Dynamic pricing  - AI adjusts prices in real time based on demand",
                    ],
                  },
                  {
                    industry: "Legal",
                    color: "text-red-600",
                    applications: [
                      "Contract review  - AI reviews thousands of pages in minutes",
                      "Legal research  - AI finds relevant precedents and case law",
                      "Due diligence  - AI analyses documents in M&A transactions",
                      "Litigation prediction  - AI estimates case outcomes from historical data",
                    ],
                  },
                  {
                    industry: "Manufacturing",
                    color: "text-yellow-600",
                    applications: [
                      "Predictive maintenance  - AI prevents machine failures before they happen",
                      "Quality control  - AI vision systems detect defects at speed and scale",
                      "Supply chain optimisation  - AI reduces delays and costs",
                      "Generative design  - AI generates optimal product designs for given constraints",
                    ],
                  },
                ].map(({ industry, color, applications }) => (
                  <Card key={industry} className="p-4">
                    <h4 className={`font-bold mb-2 ${color}`}>{industry}</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {applications.map((a) => <li key={a} className="flex gap-1"><span className="text-brand-orange flex-shrink-0">*</span>{a}</li>)}
                    </ul>
                  </Card>
                ))}
              </div>
              <MatchingChallenge
                title="Industry Match Round"
                description="Match each industry to a representative AI application."
                pairs={[
                  {
                    id: "healthcare",
                    left: "Healthcare",
                    right: "Medical image analysis and clinical documentation",
                  },
                  {
                    id: "finance",
                    left: "Finance",
                    right: "Fraud detection and compliance monitoring",
                  },
                  {
                    id: "manufacturing",
                    left: "Manufacturing",
                    right: "Predictive maintenance and quality control",
                  },
                ]}
              />
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: AI Strategy */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Building an AI Strategy</h2>
              <TextDisplay content="Whether you are an individual contributor or a business leader, having a deliberate AI strategy  - rather than reacting randomly to new tools  - puts you in control." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-4 text-brand-orange">The Individual AI Strategy Framework</h3>
                <div className="space-y-4">
                  {[
                    { step: "1. Audit", action: "List the top 10 tasks you spend time on each week. Estimate hours per task." },
                    { step: "2. Identify", action: "For each task, ask: could AI do this, assist with this, or does it need to stay fully human?" },
                    { step: "3. Experiment", action: "Pick 2-3 tasks where AI could help. Spend one week testing AI tools on those specific tasks." },
                    { step: "4. Measure", action: "Track time saved and quality. Did AI help? If not, why not? Adjust your approach." },
                    { step: "5. Systematise", action: "Turn your best AI workflows into repeatable habits. Document what works for your role." },
                    { step: "6. Share", action: "Teach colleagues what you have learned. Being the person who raises AI fluency in your team is a career advantage." },
                  ].map(({ step, action }) => (
                    <div key={step} className="flex gap-3 items-start">
                      <span className="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">{step}</span>
                      <p className="text-sm text-muted-foreground pt-0.5">{action}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <TextDisplay variant="callout" content="The biggest mistake people make with AI at work: trying every new tool that launches instead of going deep on a few tools that actually fit their workflow. Depth beats breadth." />
              
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-4 text-brand-orange">How to Champion AI at Your Organisation</h3>
                <p className="text-sm text-muted-foreground mb-4">Being the person who helps their team adopt AI well is one of the most valuable roles you can play right now. Here is how to do it without overstepping or creating resistance:</p>
                <div className="space-y-3">
                  {[
                    {
                      stage: "Start with a small, visible win",
                      detail: "Pick one task that everyone finds tedious and show how AI handles it. A 10-minute demonstration beats a 10-page proposal every time. Seeing is believing.",
                    },
                    {
                      stage: "Lead with the problem, not the technology",
                      detail: "Do not say 'We should use AI.' Say 'We spend 6 hours every week on status reports  - I found a way to cut that to 45 minutes.' People care about outcomes, not tools.",
                    },
                    {
                      stage: "Address the fears directly",
                      detail: "Colleagues often worry about job security. Acknowledge it honestly: AI is changing jobs, and learning it is the best career protection available. The goal is to free people from drudgework, not replace them.",
                    },
                    {
                      stage: "Create a safe space to experiment",
                      detail: "Share your failures alongside your successes. When people see that AI sometimes gets it wrong and that is okay, they feel safe trying it themselves. Perfection culture kills experimentation.",
                    },
                    {
                      stage: "Document and share what works",
                      detail: "Build a simple shared doc of prompts, workflows, and tools that work for your team&apos;s specific tasks. A prompt library tailored to your organisation is far more valuable than generic advice.",
                    },
                    {
                      stage: "Raise the governance conversation early",
                      detail: "Proactively ask: which tools are approved? What data can we put in AI systems? Who reviews AI-generated outputs before they go to clients? Being the person who asks these questions earns trust from leadership.",
                    },
                  ].map(({ stage, detail }) => (
                    <div key={stage} className="flex gap-3 items-start">
                      <span className="bg-brand-green text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5">*</span>
                      <div>
                        <p className="font-medium text-sm">{stage}</p>
                        <p className="text-sm text-muted-foreground">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <QuickCheckCard
                prompt="Your team spends six hours weekly on repetitive status updates. What is the strongest first AI strategy move?"
                options={[
                  { id: "a", label: "Roll out many tools at once to everyone" },
                  { id: "b", label: "Pilot one narrow workflow, measure time saved, then document and share results" },
                  { id: "c", label: "Wait for a perfect enterprise strategy before trying anything" },
                  { id: "d", label: "Push adoption without governance discussion" },
                ]}
                correctOptionId="b"
                explanation="Correct. Start narrow, prove measurable value, and then scale with documented workflows and guardrails."
                onAnswered={() => {
                  markSectionInteractionComplete(4)
                }}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the strategy checkpoint to unlock the next section.</p> : null}
              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Real-World Workflows */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Real-World Workflows: Before vs. After AI</h2>
              <TextDisplay content="AI does not just save time - it transforms how work flows across your day. Here are concrete workflows with before/after comparisons." />
              
              <div className="space-y-5">
                {[
                  {
                    role: "Marketing Manager",
                    task: "Generating 5 social media posts per week + audience analysis",
                    before: {
                      time: "3-4 hours",
                      process: [
                        "Brainstorm post ideas based on gut feeling",
                        "Write and edit each post manually",
                        "Research competitor posts individually",
                        "Manually check analytics across platforms"
                      ]
                    },
                    after: {
                      time: "45 minutes",
                      process: [
                        "Brief ChatGPT on brand voice and share top-performing post templates",
                        "AI generates 10 variations; pick 5 best ones + edit in 2 minutes each",
                        "Perplexity AI summarises competitor social trends in one query",
                        "Copy-paste data into ChatGPT for instant performance summary + recommendations"
                      ]
                    },
                    tools: ["ChatGPT or Claude", "Perplexity", "Native platform analytics"],
                    savings: "~87% time reduction | Same or better quality | More data-driven"
                  },
                  {
                    role: "Sales Development Representative",
                    task: "Personalised outreach to 30 prospects per week",
                    before: {
                      time: "4-5 hours",
                      process: [
                        "Research each prospect manually on LinkedIn and company site",
                        "Write 30 unique custom emails from memory",
                        "Fact-check yourself and worry about mistakes",
                        "Track responses in spreadsheet manually"
                      ]
                    },
                    after: {
                      time: "1 hour",
                      process: [
                        "Paste prospect list into AI tool; get instant company/industry context summaries",
                        "AI drafts 30 templates using prospect context; you personalize each in 30 seconds",
                        "AI flags risky claims and common errors before sending",
                        "Automated follow-up sequences triggered on no-response"
                      ]
                    },
                    tools: ["Clay or Hunter.io (enrichment)", "ChatGPT or email copy generators", "HubSpot or Outreach"],
                    savings: "~80% time reduction | 3x more outreach | Higher reply rates"
                  },
                  {
                    role: "Customer Support Agent",
                    task: "Handling 50 customer emails per day",
                    before: {
                      time: "6-7 hours",
                      process: [
                        "Read each ticket from start to finish",
                        "Search internal docs for relevant info",
                        "Compose response from scratch",
                        "Proofread and send"
                      ]
                    },
                    after: {
                      time: "2-3 hours",
                      process: [
                        "AI scans ticket and categorizes issue in seconds",
                        "AI searches docs and suggests relevant knowledge articles",
                        "AI drafts response based on templates + ticket context",
                        "You review and personalize in 1 minute, then send"
                      ]
                    },
                    tools: ["Zendesk Copilot or Help Scout", "Internal knowledge base", "ChatGPT"],
                    savings: "~65% time reduction | More consistent tone | Better knowledge reuse"
                  },
                  {
                    role: "Software Engineer",
                    task: "Building new API endpoint with tests",
                    before: {
                      time: "2-3 hours",
                      process: [
                        "Design endpoint structure in your head",
                        "Type code line by line",
                        "Manually write test cases",
                        "Debug through trial and error",
                        "Review and refactor"
                      ]
                    },
                    after: {
                      time: "20-30 minutes",
                      process: [
                        "Describe the endpoint in plain English to Copilot",
                        "AI generates 80% of the code scaffolding",
                        "AI generates test cases automatically",
                        "You review, fix edge cases, and add domain logic",
                        "AI refactors for style and efficiency"
                      ]
                    },
                    tools: ["GitHub Copilot", "Cursor IDE", "ChatGPT for architecture"],
                    savings: "~85% time reduction | Fewer bugs | Code follows team patterns"
                  },
                ].map(({ role, task, before, after, tools, savings }) => (
                  <Card key={role} className="p-5 space-y-4">
                    <div>
                      <h3 className="font-bold text-brand-orange mb-1">{role}</h3>
                      <p className="text-sm text-muted-foreground">{task}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2">Without AI</h4>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">{before.time}</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {before.process.map((p) => <li key={p} className="flex gap-1"><span className="flex-shrink-0">•</span>{p}</li>)}
                        </ul>
                      </div>
                      
                      <div className="bg-brand-green/10 border border-brand-green/30 rounded-lg p-3">
                        <h4 className="text-sm font-bold text-brand-green mb-2">With AI</h4>
                        <p className="text-xs font-semibold text-brand-green mb-2">{after.time}</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {after.process.map((p) => <li key={p} className="flex gap-1"><span className="flex-shrink-0">✓</span>{p}</li>)}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                      <Zap className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Impact: {savings}</p>
                        <p className="text-muted-foreground"><span className="font-medium text-foreground">Tools:</span> {tools.join(", ")}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <QuickCheckCard
                prompt="What is the most common pattern across these workflows?"
                options={[
                  { id: "a", label: "AI completely replaces the worker" },
                  { id: "b", label: "AI handles research and drafting; humans handle review and personalization" },
                  { id: "c", label: "AI only works for technical roles" },
                  { id: "d", label: "AI is equally useful for all tasks" },
                ]}
                correctOptionId="b"
                explanation="The pattern: AI is best at generating options and handling repetitive analysis. Humans remain essential for judgment, context, and final decisions."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 6: AI Opportunities Framework */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI Opportunities Framework</h2>
              <TextDisplay content="Not all tasks are good candidates for AI. Here is a practical framework to identify which tasks in any job should be AI-assisted, automated, or left fully human." />
              
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-4 text-brand-orange flex items-center gap-2"><Target className="h-5 w-5" />The Task Analysis Matrix</h3>
                <p className="text-sm text-muted-foreground mb-4">Use these three questions to evaluate any task:</p>
                <div className="space-y-4">
                  {[
                    {
                      q: "Is it repetitive?",
                      yes: "Same structure, similar inputs  - ideal for AI",
                      no: "One-off, unique every time  - probably not"
                    },
                    {
                      q: "Is the output easy to evaluate?",
                      yes: "Clear right/wrong, or you spot issues quickly  - good AI candidate",
                      no: "Requires deep domain expertise to judge  - AI needs careful review"
                    },
                    {
                      q: "Is data already available in digital form?",
                      yes: "Structured info, docs, emails  - AI can work with it",
                      no: "Information locked in heads or paper  - AI cannot help"
                    },
                  ].map(({ q, yes, no }) => (
                    <div key={q} className="border-b pb-3 last:border-0">
                      <p className="font-semibold text-sm mb-2">{q}</p>
                      <div className="flex gap-3 text-xs">
                        <div className="flex gap-1"><span className="text-brand-green font-bold">✓</span><span className="text-muted-foreground">{yes}</span></div>
                        <div className="flex gap-1"><span className="text-red-500 font-bold">✗</span><span className="text-muted-foreground">{no}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Task Categories</h3>
                {[
                  {
                    category: "Pure Automation",
                    desc: "AI can do this end-to-end; human reviews for exceptions",
                    examples: ["Data entry from forms", "Email categorization", "Report formatting", "Social media scheduling"],
                    color: "bg-brand-green/5 border-brand-green/30"
                  },
                  {
                    category: "Augmentation (Most Common)",
                    desc: "AI handles heavy lifting; human adds judgment, personalization, and accountability",
                    examples: ["AI drafts email; you customize", "AI suggests insights; you decide strategy", "AI finds candidates; you interview"],
                    color: "bg-brand-orange/5 border-brand-orange/30"
                  },
                  {
                    category: "Research & Acceleration",
                    desc: "AI synthesises info; human interprets and acts",
                    examples: ["Competitor research", "Industry trend summaries", "Legal precedent finding", "Market data synthesis"],
                    color: "bg-blue-500/5 border-blue-500/30"
                  },
                  {
                    category: "Keep Fully Human",
                    desc: "AI not ready or inappropriate for this work",
                    examples: ["Client relationship building", "Strategic decision-making", "Performance reviews", "Handling crises"],
                    color: "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  },
                ].map(({ category, desc, examples, color }) => (
                  <Card key={category} className={`p-4 border ${color}`}>
                    <div className="flex items-start gap-3">
                      <Brain className="h-4 w-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm mb-1">{category}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {examples.map((e) => <span key={e} className="text-xs bg-background/50 px-2 py-1 rounded">{e}</span>)}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><PenTool className="h-4 w-4" />Your Turn: Apply the Framework</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Pick one task</span> from your typical week that takes 2+ hours.</p>
                  <p><span className="font-medium text-foreground">Ask three questions:</span> Is it repetitive? Is output easy to evaluate? Is data digital?</p>
                  <p><span className="font-medium text-foreground">Classify it:</span> Pure automation, augmentation, research, or keep human?</p>
                  <p><span className="font-medium text-foreground">Next step:</span> If automation or augmentation, spend 30 minutes testing with a tool. If not, move to next task.</p>
                </div>
              </Card>

              <QuickCheckCard
                prompt="A task is done once a quarter, requires judgment about which data matters, and data is locked in old PDF reports. Is it a good AI candidate?"
                options={[
                  { id: "a", label: "Yes - use AI immediately" },
                  { id: "b", label: "No - fails the repetition, evaluation, and digital data tests" },
                  { id: "c", label: "Maybe - try AI anyway and see" },
                  { id: "d", label: "AI can extract from PDFs, so it definitely works" },
                ]}
                correctOptionId="b"
                explanation="Right. This task fails multiple framework tests: not repetitive, requires judgment, and data is not easily accessible. Better opportunities exist for AI."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 7: Role Transformation */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">How AI is Changing Roles (Not Just Replacing Them)</h2>
              <TextDisplay content="The narrative 'AI will replace jobs' misses the real story. AI is redefining what specific roles entail. Some jobs shrink. Others grow. Most change shape fundamentally." />
              
              <div className="space-y-4">
                {[
                  {
                    role: "Software Developer",
                    shift: "From 'writing all code' to 'architecting + reviewing + problem-solving'",
                    impact: [
                      "Boilerplate and routine code is AI-generated; developers focus on architecture and tricky algorithms",
                      "Code review shifts from style/correctness to logic and edge cases",
                      "New skill: prompt engineering for code  - telling AI exactly what you need",
                      "Demand for developers rises (5-10% more code gets written per developer) but role itself changes"
                    ],
                    skills_gained: ["Prompt engineering", "Systems thinking", "AI tool mastery"],
                    skills_less_critical: ["Manual syntax", "Routine debugging"]
                  },
                  {
                    role: "Lawyer",
                    shift: "From 'research + document review' to 'strategy + judgment + client relationship'",
                    impact: [
                      "AI handles contract review, legal research, due diligence at scale",
                      "Associates no longer spend weeks on document review  - done in days",
                      "Lawyer skill becomes: ask better questions, spot what AI missed, advise clients on risks",
                      "Fewer junior associates hired to do rote work  - but experienced lawyers become more valuable for judgment"
                    ],
                    skills_gained: ["AI quality assessment", "Client communication", "Strategic thinking"],
                    skills_less_critical: ["Legal research tooling", "Manual document review"]
                  },
                  {
                    role: "Marketer",
                    shift: "From 'content creation' to 'brand strategy + audience insight + optimization'",
                    impact: [
                      "Blog posts, social media, ad copy are AI-drafted; marketers focus on strategy and targeting",
                      "Personalisation at scale  - every customer sees AI-optimised messaging",
                      "Marketing productivity increases; campaigns launch 3-5x faster",
                      "Skill gap: marketers who cannot use AI tools become less competitive"
                    ],
                    skills_gained: ["AI prompt craft", "Data analysis", "Audience psychology"],
                    skills_less_critical: ["Copywriting speed", "Manual audience research"]
                  },
                  {
                    role: "Radiologist",
                    shift: "From 'image interpretation' to 'AI validation + complex cases + patient communication'",
                    impact: [
                      "AI reads and flags routine imaging (X-rays, simple CT scans) faster than humans",
                      "Radiologists focus on complex cases, multi-modality interpretation, and unusual presentations",
                      "Work becomes less rote, more interesting, but supply of routine radiology jobs shrinks",
                      "Radiologists who work well with AI tools remain valuable; those who resist are replaced by AI+technician teams"
                    ],
                    skills_gained: ["AI tool trust and skepticism", "Complex diagnosis", "Research"],
                    skills_less_critical: ["Routine case volume", "Speed on standard cases"]
                  },
                ].map(({ role, shift, impact, skills_gained, skills_less_critical }) => (
                  <Card key={role} className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-brand-orange">{role}</h3>
                      <p className="text-sm text-muted-foreground italic">{shift}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">What changes:</p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {impact.map((i) => <li key={i} className="flex gap-2"><span className="flex-shrink-0">→</span>{i}</li>)}
                      </ul>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="bg-brand-green/5 p-3 rounded-lg">
                        <p className="text-xs font-bold text-brand-green mb-1">↑ Skills to build</p>
                        <ul className="text-xs space-y-0.5 text-muted-foreground">
                          {skills_gained.map((s) => <li key={s}>• {s}</li>)}
                        </ul>
                      </div>
                      <div className="bg-amber-100/30 p-3 rounded-lg">
                        <p className="text-xs font-bold text-amber-700 mb-1">↓ Less critical</p>
                        <ul className="text-xs space-y-0.5 text-muted-foreground">
                          {skills_less_critical.map((s) => <li key={s}>• {s}</li>)}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-5 bg-gradient-to-br from-blue-50 to-brand-green/5 dark:from-blue-950/30 dark:to-brand-green/10">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">The Pattern</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Roles are not disappearing.</span> Roles are shifting toward judgment, strategy, and creativity  - the things humans do better than AI.</p>
                  <p><span className="font-medium text-foreground">But rote work is disappearing.</span> If your job is 80% routine and 20% judgment, that will flip  - or the routine part becomes AI+lower-wage technician work.</p>
                  <p><span className="font-medium text-foreground">Adaptability is the key skill.</span> People who learn AI tools quickly and apply them to their domain will thrive. People who resist will struggle.</p>
                </div>
              </Card>

              <QuickCheckCard
                prompt="Based on this section, what career bet are you making?"
                options={[
                  { id: "a", label: "Hide from AI and hope my job stays the same" },
                  { id: "b", label: "Learn to work effectively with AI tools in my specific role" },
                  { id: "c", label: "Wait for someone else to figure out AI and copy them" },
                  { id: "d", label: "Blame my job loss on AI instead of adapting" },
                ]}
                correctOptionId="b"
                explanation="Your role will change. Your choice is whether you shape that change by learning AI tools, or get left behind."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 8: Workflow Redesign Exercise */}
          {currentSectionIndex === 8 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Hands-On: Redesign Your Workflow</h2>
              <TextDisplay content="This is your practical capstone. You will audit a real workflow from your job, apply the AI opportunities framework, and design a new AI-enhanced version." />
              
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-4 text-brand-orange flex items-center gap-2"><Zap className="h-5 w-5" />The Exercise (takes 30 minutes)</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "Step 1: Pick a workflow (5 min)",
                      action: "Choose a work process that takes 2-4 hours per week. Something you do regularly.",
                      examples: ["Weekly status report", "Customer outreach emails", "Code review process", "Meeting prep", "Content writing"]
                    },
                    {
                      step: "Step 2: Break it down (5 min)",
                      action: "List 5-7 sub-tasks in order. E.g., 'research company' → 'draft email' → 'review for tone' → 'send'",
                      examples: ["Document current steps exactly as they happen, not how they should happen"]
                    },
                    {
                      step: "Step 3: Apply the framework (5 min)",
                      action: "For each sub-task, ask: repetitive? Easy to evaluate? Digital data?",
                      examples: ["Mark each task as: Pure automation, Augmentation, Research, or Keep Human"]
                    },
                    {
                      step: "Step 4: Design the AI version (10 min)",
                      action: "For automation/augmentation tasks, write down: What AI tool? What prompt? How does human review happen?",
                      examples: ["'ChatGPT to draft email based on prospect research, I spend 1 min personalizing, then send'"]
                    },
                    {
                      step: "Step 5: Estimate impact (5 min)",
                      action: "How much time saved? What stays the same (quality, risk, human judgment)?",
                      examples: ["'Original: 45 min. AI version: 10 min. Same quality. I keep final approval.'"]
                    },
                  ].map(({ step, action, examples }) => (
                    <div key={step} className="border-l-2 border-brand-orange pl-4">
                      <p className="font-bold text-sm text-brand-orange mb-1">{step}</p>
                      <p className="text-sm text-muted-foreground mb-1">{action}</p>
                      <div className="text-xs text-muted-foreground italic">
                        {examples.map((e) => <div key={e}>→ {e}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Example: Sales Outreach Workflow Redesign</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-foreground mb-1">Current (45 min/week):</p>
                    <p className="text-muted-foreground">1. Research company (LinkedIn, website) → 2. Draft email → 3. Review grammar → 4. Check CRM for prior contact → 5. Send</p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="font-semibold text-foreground mb-1">Framework applied:</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>1. Research: <span className="font-medium">Research & Acceleration</span> (AI can do fast)</li>
                      <li>2. Draft: <span className="font-medium">Augmentation</span> (AI drafts, you personalize)</li>
                      <li>3. Grammar: <span className="font-medium">Pure Automation</span> (AI checks automatically)</li>
                      <li>4. CRM check: <span className="font-medium">Keep Human</span> (relationship context)</li>
                      <li>5. Send: <span className="font-medium">Pure Automation</span> (tool sends when approved)</li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="font-semibold text-foreground mb-1">Redesigned (12 min/week):</p>
                    <p className="text-muted-foreground text-xs">Paste prospect list into Clay → Enrichment gives company background → Copy into ChatGPT prompt "Write 50 personalised outreach emails for [context]" → AI generates drafts → You spend 30 sec personalizing top 5 → Spell-check auto-runs → Check CRM relationships manually for top 3 → Send from outreach tool</p>
                  </div>
                  
                  <div className="bg-background p-2 rounded border border-blue-200 dark:border-blue-800">
                    <p className="font-bold text-xs text-blue-700 dark:text-blue-400">Result: 73% faster. Same quality. More volume.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5 border-brand-green/20">
                <h3 className="font-bold text-brand-orange mb-3">Now your turn:</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Workflow name & current time:</span> (e.g., "Weekly newsletter: 120 min")</p>
                  <p><span className="font-medium text-foreground">Current steps (5-7 tasks):</span></p>
                  <p><span className="font-medium text-foreground">Framework classification:</span> (which are automation/augmentation/research/human?)</p>
                  <p><span className="font-medium text-foreground">Redesigned workflow:</span> (which tools? how does AI fit? where do humans review?)</p>
                  <p><span className="font-medium text-foreground">Time saved:</span> (estimate %)</p>
                  <p><span className="font-medium text-foreground">Risk or quality impact?:</span> (stays same / improves / needs careful review)</p>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-green-50 to-brand-green/10 dark:from-green-950/20 dark:to-brand-green/5 border border-brand-green/20">
                <h3 className="font-bold text-brand-green mb-2 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />After this exercise, you have:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ A concrete AI application you can implement this week</li>
                  <li>✓ Experience with the AI opportunities framework</li>
                  <li>✓ Proof of concept you can share with your team or manager</li>
                  <li>✓ A practicalway to measure ROI</li>
                </ul>
              </Card>

              <QuickCheckCard
                prompt="What makes a workflow redesign successful?"
                options={[
                  { id: "a", label: "Using the most advanced AI tool available" },
                  { id: "b", label: "Replacing human judgment entirely" },
                  { id: "c", label: "Keeping humans in charge while AI handles heavy lifting, with measurable time savings" },
                  { id: "d", label: "Redesigning every workflow at once" },
                ]}
                correctOptionId="c"
                explanation="Success: measurable time/effort saved, humans retain judgment and accountability, clear ROI, low risk of error."
                onAnswered={() => {
                  markSectionInteractionComplete(8)
                }}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the workflow redesign exercise to unlock the next section.</p> : null}

              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 9: Building AI Skills */}
          {currentSectionIndex === 9 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Building Your AI Skills</h2>
              <TextDisplay content="AI fluency is a competitive advantage right now  - and will be a baseline expectation within three years. The good news: you do not need a technical background to build genuinely useful AI skills." />
              <div className="space-y-4">
                <h3 className="text-xl font-bold">The AI Skills Stack</h3>
                <div className="space-y-3">
                  {[
                    {
                      level: "Foundation (everyone needs this)",
                      skills: ["Understanding what AI can and cannot do", "Effective prompting across major LLMs", "Identifying AI-generated content and misinformation", "Basic AI ethics and bias awareness"],
                      bg: "bg-brand-green/5 border-brand-green/20",
                    },
                    {
                      level: "Professional (for knowledge workers)",
                      skills: ["Integrating AI into your specific role's workflow", "Using AI for research, analysis, and drafting", "Building simple no-code AI automations", "Evaluating AI outputs critically for your domain"],
                      bg: "bg-brand-orange/5 border-brand-orange/20",
                    },
                    {
                      level: "Advanced (for those who want to lead)",
                      skills: ["Designing AI strategies for teams or organisations", "Understanding AI model selection and limitations in depth", "Managing AI projects and vendor relationships", "Developing AI governance policies"],
                      bg: "bg-blue-500/5 border-blue-500/20",
                    },
                  ].map(({ level, skills, bg }) => (
                    <Card key={level} className={`p-4 border ${bg}`}>
                      <h4 className="font-bold mb-2">{level}</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {skills.map((s) => <li key={s} className="flex gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand-green flex-shrink-0 mt-0.5" />{s}</li>)}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">A practical 90-day career plan</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Days 1-30:</span> pick two recurring tasks and use AI on them daily. Track time saved and output quality.</p>
                  <p><span className="font-medium text-foreground">Days 31-60:</span> standardize your best prompts and workflow steps into a mini playbook for your role.</p>
                  <p><span className="font-medium text-foreground">Days 61-90:</span> share one documented workflow with your team and gather feedback to improve it.</p>
                </div>
              </Card>
              <QuickCheckCard
                prompt="Which approach best builds durable AI career advantage?"
                options={[
                  { id: "a", label: "Try every tool briefly without measuring outcomes" },
                  { id: "b", label: "Go deep on specific tasks in your domain and document what works" },
                  { id: "c", label: "Focus only on AI news and skip practical application" },
                  { id: "d", label: "Avoid sharing what you learn with your team" },
                ]}
                correctOptionId="b"
                explanation="Durable advantage comes from repeatable workflow skill in your actual domain, not from broad but shallow experimentation."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
              
            </div>
          )}

          {/* 10: Module Quiz */}
          {currentSectionIndex === 10 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Six questions to lock in what you have learned. All six must be answered to complete the module." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent work! You now understand how AI is reshaping the workplace, which skills matter most, and how to build a deliberate AI strategy for your career. Up next: AI Agents." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white" onClick={() => router.push("/course/module-8")}>
                      Continue to Module 8
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push("/course")}>Dashboard</Button>
                  </div>
                </div>
              )}
              {!allQuizComplete && (
                <p className="text-sm text-muted-foreground">Answer all three questions above to complete the module.</p>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}



