/**
 * MODULE 7: AI FOR BUSINESS & WORK
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Briefcase, TrendingUp, Users, ArrowRight } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module7Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-7"
  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3"])
  const questions = moduleQuizData[MODULE_ID]
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [sectionParam])

  const handleSectionComplete = () => {
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
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Building AI Skills */}
          {currentSectionIndex === 5 && (
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

          {/* 6: Module Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Three questions to lock in what you have learned. All three must be answered to complete the module." />
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


