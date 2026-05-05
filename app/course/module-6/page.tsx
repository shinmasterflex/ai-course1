/**
 * MODULE 6: YOUR AI TOOLKIT
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
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { MatchingGame } from "@/components/learning/matching-game"
import { TextInputExercise } from "@/components/learning/text-input-exercise"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Wrench, ArrowRight, BookOpen, Code, Zap } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"

export default function Module6Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [projectComplete, setProjectComplete] = useState(false)

  const MODULE_ID = "module-6"
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
      router.push(`/course/module-6?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 6: Your AI Toolkit</h1>
            <p className="text-lg text-muted-foreground mb-4">Put it all together — build your first AI-powered workflow</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="This is the final module — and the most hands-on. You will explore no-code AI tools, design a simple AI workflow, complete a mini-project, and leave with a curated list of resources for going deeper." />
              <Card className="p-5 space-y-2">
                {["No-code AI platforms you can use today","Building a simple AI workflow (no coding required)","Your first AI mini-project","Next steps & resources for continued learning"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module →</Button>
            </div>
          )}

          {/* 1: No-Code AI */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">No-Code AI Tools</h2>
              <TextDisplay content="You do not need to write a single line of code to build powerful AI-powered tools. Here are the best platforms for non-technical builders:" />
              <div className="space-y-4">
                {[
                  {
                    category: "Automation & Workflows",
                    icon: Zap,
                    tools: [
                      { name: "Zapier with AI", desc: "Connect apps and automate tasks — add AI steps that summarise, classify, or generate content as part of any automation." },
                      { name: "Make (formerly Integromat)", desc: "Visual workflow builder with AI modules — more powerful than Zapier for complex workflows." },
                      { name: "n8n", desc: "Open-source automation with AI nodes. Self-hostable. Used by technical non-coders who want more control." },
                    ],
                  },
                  {
                    category: "Build AI Apps Without Code",
                    icon: Wrench,
                    tools: [
                      { name: "Bubble + AI Plugins", desc: "Full-featured no-code web app builder with AI integration for building consumer-facing AI products." },
                      { name: "Glide", desc: "Build mobile apps with AI features from spreadsheet data — no code required." },
                      { name: "Retool", desc: "Build internal tools with AI capabilities. Popular for data-heavy business tools." },
                    ],
                  },
                  {
                    category: "Custom Chatbots & AI Assistants",
                    icon: BookOpen,
                    tools: [
                      { name: "Chatbase", desc: "Upload your documents and create a custom chatbot trained on your content — no code, minutes to set up." },
                      { name: "CustomGPT.ai", desc: "Build GPT-powered chatbots trained on your website or documents." },
                      { name: "Botpress", desc: "More advanced chatbot builder with AI, flows, and integrations." },
                    ],
                  },
                ].map(({ category, icon: Icon, tools }) => (
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
              <MatchingGame
                title="Match each no-code AI tool to its primary use case"
                pairs={[
                  { left: "Zapier with AI", right: "Automate tasks between apps with AI steps" },
                  { left: "Chatbase", right: "Build a chatbot trained on your documents" },
                  { left: "Bubble", right: "Create full web apps without coding" },
                  { left: "n8n", right: "Open-source self-hostable automation" },
                  { left: "Retool", right: "Build internal business data tools" },
                  { left: "Glide", right: "Turn a spreadsheet into a mobile app" },
                ]}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 2: AI Workflows */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Building Simple AI Workflows</h2>
              <TextDisplay content="An AI workflow is a series of steps where AI performs tasks automatically in response to a trigger. You connect existing tools — no coding required." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-4 text-brand-orange">Example Workflow: Auto-summarise any email newsletter</h3>
                <div className="space-y-3">
                  {[
                    { step: "Trigger", tool: "Gmail", action: "New email arrives with label 'Newsletter'" },
                    { step: "Action 1", tool: "Zapier AI", action: "Summarise the email into 3 bullet points" },
                    { step: "Action 2", tool: "Notion", action: "Append the summary to your reading notes database" },
                    { step: "Action 3", tool: "Slack", action: "Send the summary to your #reading channel" },
                  ].map(({ step, tool, action }) => (
                    <div key={step} className="flex gap-3 items-start">
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="bg-brand-orange text-white text-xs font-bold px-2 py-0.5 rounded">{step}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="text-sm"><span className="font-medium">{tool}:</span> <span className="text-muted-foreground">{action}</span></div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">Result: Every newsletter you receive is automatically summarised and filed — without you doing anything.</p>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Content repurposing", desc: "Trigger: new blog post published → AI rewrites as 5 social posts → auto-schedules to Buffer" },
                  { title: "Meeting prep", desc: "Trigger: calendar event in 1 hour → AI pulls LinkedIn profiles of attendees → sends you a briefing email" },
                  { title: "Customer feedback triage", desc: "Trigger: new review arrives → AI classifies as positive/neutral/negative → routes to the right Slack channel" },
                  { title: "Personal knowledge base", desc: "Trigger: save article to Pocket → AI generates summary + tags → adds to Notion database" },
                ].map(({ title, desc }) => (
                  <Card key={title} className="p-4">
                    <p className="font-semibold text-brand-green mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
              <FlipCard
                front="Do I need to know how to code to build these workflows?"
                back="No. Tools like Zapier, Make, and n8n are visual — you connect boxes with lines. The AI steps are built-in. Start with Zapier's free tier: connect Gmail → AI Formatter → Notion and you will have a working workflow in under 30 minutes."
              />
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Check your understanding</h3>
                <MultipleChoice
                  question="In an AI workflow, what is a 'trigger'?"
                  options={[
                    { text: "A button you press to start the AI", isCorrect: false, feedback: "Close, but triggers are usually automatic events — not manual button presses. The whole point is that the workflow runs itself." },
                    { text: "An event that automatically starts the workflow, like a new email arriving", isCorrect: true, feedback: "Exactly right. Triggers are automatic events: a new file saved, an email received, a form submitted, a time of day reached. No manual action required." },
                    { text: "The AI model that processes the data", isCorrect: false, feedback: "That is the AI action step, not the trigger. The trigger is what initiates the workflow in the first place." },
                    { text: "The final output destination for your workflow", isCorrect: false, feedback: "The output destination is the last action in the workflow. The trigger is the starting event." },
                  ]}
                  explanation="In automation tools like Zapier and Make, every workflow begins with a trigger — an event that fires automatically. Common triggers: new email received, file uploaded to Drive, form submitted, row added to spreadsheet, or a time/schedule (e.g. every morning at 8am)."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 3: Mini Project */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Your First AI Mini-Project</h2>
              <TextDisplay variant="callout" content="The best way to learn is by doing. Your task: design a real AI-powered workflow you could actually use in your own life or work." />
              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="font-semibold mb-3">Mini-Project: Design Your Workflow</h3>
                <p className="text-sm text-muted-foreground mb-4">Answer the four questions below to design your workflow. There are no wrong answers — this is about thinking it through concretely.</p>
                <div className="space-y-3 text-sm">
                  {[
                    "1. What repetitive or time-consuming task in your life could AI automate or assist with?",
                    "2. What would the trigger be? (e.g., receiving an email, saving a file, a daily schedule)",
                    "3. What AI action would be most useful? (e.g., summarise, classify, draft a reply, extract information)",
                    "4. Where should the output go? (e.g., Notion, email, Slack, a spreadsheet)",
                  ].map((q) => <p key={q} className="text-muted-foreground">{q}</p>)}
                </div>
              </Card>
              <TextInputExercise
                prompt="Describe your AI workflow mini-project. What is the trigger, what does the AI do, and where does the output go?"
                placeholder="Example: Trigger — when I save an article to Pocket. AI action — summarise in 3 bullet points and extract the main insight. Output — append to my Notion 'What I'm Reading' database. I want to do this because I save lots of articles but rarely go back and re-read them."
                onComplete={() => {
                  setProjectComplete(true)
                  const current = sections[currentSectionIndex]
                  if (current) { markSectionComplete(MODULE_ID, current.id); setCurrentPosition(MODULE_ID, current.id) }
                }}
              />
              {projectComplete && (
                <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
              )}
            </div>
          )}

          {/* 4: Next Steps */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Next Steps & Resources</h2>
              <TextDisplay variant="success" content="Congratulations! You have completed Introduction to AI. You now have a genuine understanding of what AI is, how it works, and how to use it responsibly." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />What you can now do</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Explain what AI is and how it works to anyone",
                    "Use ChatGPT, Claude, and Gemini effectively with well-structured prompts",
                    "Navigate the AI tool landscape and choose the right tool for any task",
                    "Identify AI bias, misinformation, and privacy risks",
                    "Design no-code AI workflows to automate repetitive tasks",
                    "Think critically about AI claims in the media and in products",
                  ].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />{item}</li>)}
                </ul>
              </Card>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Your 30-Day AI Challenge</h3>
                <p className="text-sm text-muted-foreground">The fastest way to build real AI skill is daily practice. Here is a one-month challenge — each card reveals a daily micro-task that takes under 15 minutes.</p>
                <Flashcard cards={[
                  { id: "week1", front: "Week 1 — Foundation (Days 1–7)", back: "Day 1: Start a free ChatGPT account and have a 10-minute conversation about any topic.\nDay 2: Try Claude at claude.ai. Compare how it responds differently to the same question.\nDay 3: Use Gemini to help you draft an email you have been putting off.\nDay 4: Try the Role + Context + Task + Format prompt structure for something you need.\nDay 5: Ask an AI to explain something confusing from your work or study.\nDay 6: Use Perplexity to research a topic and check its sources.\nDay 7: Reflect — what was most useful? What did not work?" },
                  { id: "week2", front: "Week 2 — Productivity (Days 8–14)", back: "Day 8: Summarise a long article or document using AI.\nDay 9: Let AI draft a first version of something you have to write.\nDay 10: Use chain-of-thought prompting to think through a real decision.\nDay 11: Have AI play devil's advocate on an idea you are developing.\nDay 12: Use AI to create a template you use regularly (meeting agenda, email format).\nDay 13: Try Grammarly or an AI editor on something you wrote.\nDay 14: Set up a basic Zapier automation — start with the free tier." },
                  { id: "week3", front: "Week 3 — Creative & Learning (Days 15–21)", back: "Day 15: Ask an AI to tutor you on one topic you have always wanted to understand better.\nDay 16: Use few-shot prompting — give AI 3 examples, then ask it to continue the pattern.\nDay 17: Try an AI image generator (DALL·E via ChatGPT, or Adobe Firefly).\nDay 18: Ask AI to critique something you created — a plan, a design, a piece of writing.\nDay 19: Use AI to generate ideas — give it a problem and ask for 10 unconventional solutions.\nDay 20: Try a specialised AI tool in your field (legal, medical, financial, coding).\nDay 21: Share what you have learned with someone — explaining deepens understanding." },
                  { id: "week4", front: "Week 4 — Systems (Days 22–30)", back: "Day 22: Design a custom AI workflow for a recurring task in your life.\nDay 23: Create a Chatbase or CustomGPT chatbot trained on a document you own.\nDay 24: Practice iterative prompting — start simple, then refine 5 times.\nDay 25: Use AI to learn something in a field completely outside your expertise.\nDay 26: Test an AI's limits — find something it gets wrong, then understand why.\nDay 27: Explore one AI ethics topic from Module 5 in more depth.\nDay 28: Build a simple personal knowledge base using Notion AI or a similar tool.\nDay 29: Identify one thing in your professional life AI could meaningfully improve.\nDay 30: Write a brief reflection — how has your thinking about AI changed over this month?" },
                ]} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Curated Resources for Going Deeper</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { category: "Free Courses", icon: BookOpen, resources: [
                      "fast.ai — Practical Deep Learning for Coders (free, hands-on)",
                      "Google's AI Essentials — free certificate course",
                      "DeepLearning.AI Short Courses — free 1-hour deep dives",
                      "Coursera: AI for Everyone by Andrew Ng (highly recommended)",
                    ]},
                    { category: "Books (Non-Technical)", icon: BookOpen, resources: [
                      "The Age of AI — Henry Kissinger, Eric Schmidt & Daniel Huttenlocher",
                      "Human Compatible — Stuart Russell (AI safety perspective)",
                      "Atlas of AI — Kate Crawford (critical perspective)",
                      "Co-Intelligence — Ethan Mollick (practical AI use)",
                    ]},
                    { category: "Stay Current", icon: Zap, resources: [
                      "Ben's Bites newsletter — daily AI news, beginner-friendly",
                      "The AI Breakdown podcast — news and analysis",
                      "Simon Willison's blog — technical but accessible AI updates",
                      "MIT Technology Review AI section",
                    ]},
                    { category: "If You Want to Code", icon: Code, resources: [
                      "Python.org beginner tutorials (Python is the AI language)",
                      "fast.ai's Practical Deep Learning course",
                      "Hugging Face tutorials — work with real AI models",
                      "LangChain documentation — build AI applications",
                    ]},
                  ].map(({ category, icon: Icon, resources }) => (
                    <Card key={category} className="p-4">
                      <h4 className="font-bold text-brand-green mb-2 flex items-center gap-1"><Icon className="h-4 w-4" />{category}</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {resources.map((r) => <li key={r} className="flex gap-1"><span className="text-brand-orange">•</span>{r}</li>)}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 text-center">
                <h3 className="text-2xl font-bold mb-3">You are ready.</h3>
                <p className="text-muted-foreground mb-4">The AI era is not something that is coming — it is already here. You now have the foundation to navigate it with confidence, curiosity, and critical thinking.</p>
                <p className="text-lg font-semibold text-brand-orange">Go build something.</p>
              </Card>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                  onClick={handleSectionComplete}
                >
                  Complete Course ✓
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
