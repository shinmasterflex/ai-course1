/**
 * MODULE 6: YOUR AI TOOLKIT
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
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Wrench, ArrowRight, BookOpen, Code, Zap } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"

export default function Module6Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

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
            <p className="text-lg text-muted-foreground mb-4">Put it all together - build your first AI-powered workflow</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 6"
              title="Design your first repeatable AI workflow"
              description="Move from concepts to execution by combining no-code tools into a practical system you can deploy this week."
              imageSrc="/images/modules/module-6.jpg"
              imageAlt="Workflow automation and AI integration"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="This is the final module - and the most hands-on. You will explore no-code AI tools, design a simple AI workflow, complete a mini-project, and leave with a curated list of resources for going deeper." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">What success looks like here</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Not:</span> building the most advanced automation you can imagine.</p>
                  <p><span className="font-medium text-foreground">Yes:</span> choosing one small repeatable task, mapping the trigger and output, and leaving with a workflow you could realistically build this week.</p>
                </div>
              </Card>
              <Card className="p-5 space-y-2">
                {["No-code AI platforms you can use today","Building a simple AI workflow (no coding required)","Your first AI mini-project","Next steps & resources for continued learning"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: No-Code AI */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">No-Code AI Tools</h2>
              <TextDisplay content="You do not need to write a single line of code to build powerful AI-powered tools. Here are the best platforms for non-technical builders:" />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Choose by build goal</h3>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-brand-green mb-1">Automate steps</p>
                    <p className="text-muted-foreground">Use Zapier, Make, or n8n when you want triggers, actions, and integrations between apps.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-brand-green mb-1">Build an app</p>
                    <p className="text-muted-foreground">Use Bubble, Glide, or Retool when you want a front-end product or internal tool.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-brand-green mb-1">Build a chatbot</p>
                    <p className="text-muted-foreground">Use Chatbase, CustomGPT.ai, or Botpress when the main job is answering questions from your content.</p>
                  </div>
                </div>
              </Card>
              <div className="space-y-4">
                {[
                  {
                    category: "Automation & Workflows",
                    icon: Zap,
                    tools: [
                      { name: "Zapier with AI", desc: "Connect apps and automate tasks - add AI steps that summarise, classify, or generate content as part of any automation." },
                      { name: "Make (formerly Integromat)", desc: "Visual workflow builder with AI modules - more powerful than Zapier for complex workflows." },
                      { name: "n8n", desc: "Open-source automation with AI nodes. Self-hostable. Used by technical non-coders who want more control." },
                    ],
                  },
                  {
                    category: "Build AI Apps Without Code",
                    icon: Wrench,
                    tools: [
                      { name: "Bubble + AI Plugins", desc: "Full-featured no-code web app builder with AI integration for building consumer-facing AI products." },
                      { name: "Glide", desc: "Build mobile apps with AI features from spreadsheet data - no code required." },
                      { name: "Retool", desc: "Build internal tools with AI capabilities. Popular for data-heavy business tools." },
                    ],
                  },
                  {
                    category: "Custom Chatbots & AI Assistants",
                    icon: BookOpen,
                    tools: [
                      { name: "Chatbase", desc: "Upload your documents and create a custom chatbot trained on your content - no code, minutes to set up." },
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
              <MatchingChallenge
                title="No-Code Tool Match"
                description="Match the build goal to the strongest no-code tool category."
                pairs={[
                  {
                    id: "automate",
                    left: "Connect apps + trigger actions",
                    right: "Automation workflow tools",
                  },
                  {
                    id: "app",
                    left: "Create a front-end internal tool",
                    right: "No-code app builders",
                  },
                  {
                    id: "chatbot",
                    left: "Answer questions from your docs",
                    right: "Custom chatbot builders",
                  },
                ]}
              />
              <QuickCheckCard
                prompt="A beginner wants to connect Gmail, Notion, and Slack with one AI step in the middle. Which tool category is the best fit?"
                options={[
                  { id: "a", label: "Automation and workflow tools" },
                  { id: "b", label: "Image generation tools" },
                  { id: "c", label: "Standalone chatbot builders only" },
                  { id: "d", label: "3D modeling tools" },
                ]}
                correctOptionId="a"
                explanation="This is a classic workflow-automation use case: connect existing apps, add one AI step, and route the result somewhere useful."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: AI Workflows */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Building Simple AI Workflows</h2>
              <TextDisplay content="An AI workflow is a series of steps where AI performs tasks automatically in response to a trigger. You connect existing tools - no coding required." />
              <Card className="p-5">
                <h3 className="font-semibold mb-4 text-brand-orange">The easiest first workflow recipe</h3>
                <div className="space-y-3 text-sm">
                  {[
                    "1. Pick one repeatable task you already do every week.",
                    "2. Choose a clear trigger such as a new email, saved article, or scheduled time.",
                    "3. Add one AI action only: summarise, classify, extract, or draft.",
                    "4. Send the result somewhere useful: email, Slack, Notion, spreadsheet.",
                    "5. Review the output for a week before making the workflow more complex.",
                  ].map((step) => (
                    <div key={step} className="rounded-lg border bg-background p-3 text-muted-foreground">{step}</div>
                  ))}
                </div>
              </Card>
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
                <p className="text-xs text-muted-foreground mt-3">Result: Every newsletter you receive is automatically summarised and filed - without you doing anything.</p>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Content repurposing", desc: "Trigger: new blog post published -> AI rewrites as 5 social posts -> auto-schedules to Buffer" },
                  { title: "Meeting prep", desc: "Trigger: calendar event in 1 hour -> AI pulls LinkedIn profiles of attendees -> sends you a briefing email" },
                  { title: "Customer feedback triage", desc: "Trigger: new review arrives -> AI classifies as positive/neutral/negative -> routes to the right Slack channel" },
                  { title: "Personal knowledge base", desc: "Trigger: save article to Pocket -> AI generates summary + tags -> adds to Notion database" },
                ].map(({ title, desc }) => (
                  <Card key={title} className="p-4">
                    <p className="font-semibold text-brand-green mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">If you built this in Zapier or Make, what would you do first?</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Step 1:</span> create the trigger in Gmail for labeled newsletter emails.</p>
                  <p><span className="font-medium text-foreground">Step 2:</span> pass the email body into one AI summary step.</p>
                  <p><span className="font-medium text-foreground">Step 3:</span> send the summary to one destination only, such as Notion.</p>
                  <p><span className="font-medium text-foreground">Step 4:</span> test with 3-5 real examples before adding Slack or other outputs.</p>
                </div>
              </Card>
              <DragSortChallenge
                title="Workflow Sequence"
                description="Drag the workflow pieces into the best first-build order."
                items={[
                  "Send summaries to a destination",
                  "Define one clear trigger",
                  "Test with real examples",
                  "Add one AI action",
                ]}
                correctOrder={[
                  "Define one clear trigger",
                  "Add one AI action",
                  "Send summaries to a destination",
                  "Test with real examples",
                ]}
              />
              <QuickCheckCard
                prompt="What makes a good first AI workflow to build for yourself?"
                options={[
                  { id: "a", label: "A small repeatable task with a clear trigger and output" },
                  { id: "b", label: "The biggest possible workflow with many dependencies" },
                  { id: "c", label: "A workflow that has no measurable outcome" },
                  { id: "d", label: "Anything that requires full automation immediately" },
                ]}
                correctOptionId="a"
                explanation="The strongest starting workflows are narrow, repeatable, and easy to evaluate so you can learn quickly without creating operational risk."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Mini Project */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Your First AI Mini-Project</h2>
              <TextDisplay variant="callout" content="The best way to learn is by doing. Your task: design a real AI-powered workflow you could actually use in your own life or work." />
              <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="font-semibold mb-3">Mini-Project: Design Your Workflow</h3>
                <p className="text-sm text-muted-foreground mb-4">Answer the four questions below to design your workflow. There are no wrong answers - this is about thinking it through concretely.</p>
                <div className="space-y-3 text-sm">
                  {[
               FlipCardGrid
                cards={[
                  {
                    title: "Trigger",
                    prompt: "What makes a trigger strong?",
                    answer: "It is specific, observable, and easy to test, such as a labeled email or a scheduled time.",
                  },
                  {
                    title: "AI Step",
                    prompt: "How many AI steps should beginners start with?",
                    answer: "One. Keep the first version simple and reliable before adding complexity.",
                  },
                  {
                    title: "Output",
                    prompt: "Where should output go first?",
                    answer: "Send it to one destination you already use daily, like Notion, email, or Slack.",
                  },
                  {
                    title: "Measurement",
                    prompt: "How do you know it works?",
                    answer: "Track time saved and quality for one week, then iterate based on real results.",
                  },
                ]}
              />
              <     "1. What repetitive or time-consuming task in your life could AI automate or assist with?",
                    "2. What would the trigger be? (e.g., receiving an email, saving a file, a daily schedule)",
                    "3. What AI action would be most useful? (e.g., summarise, classify, draft a reply, extract information)",
                    "4. Where should the output go? (e.g., Notion, email, Slack, a spreadsheet)",
                  ].map((q) => <p key={q} className="text-muted-foreground">{q}</p>)}
                </div>
              </Card>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Three starter project ideas</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Inbox helper:</span> when a new email arrives, AI classifies it and drafts a reply outline.</p>
                  <p><span className="font-medium text-foreground">Reading assistant:</span> when you save an article, AI creates a summary and three takeaways in Notion.</p>
                  <p><span className="font-medium text-foreground">Meeting follow-up:</span> when notes are uploaded, AI extracts action items and sends them to the team.</p>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Mini-project success checklist</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "The task is specific and repeatable",
                    "The trigger is clear",
                    "The AI step does one job only",
                    "The output goes somewhere you already use",
                    "You can tell in one week whether it saves time or not",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <QuickCheckCard
                prompt="Which mini-project idea is strongest for a beginner?"
                options={[
                  { id: "a", label: "A narrow workflow with one trigger, one AI action, and one clear output" },
                  { id: "b", label: "A fully autonomous system that handles all work tasks immediately" },
                  { id: "c", label: "A project with no clear trigger or measurable result" },
                  { id: "d", label: "A workflow that starts by using confidential data in public tools" },
                ]}
                correctOptionId="a"
                explanation="The best beginner project is intentionally small, testable, and safe enough to evaluate quickly."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: Next Steps */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Next Steps & Resources</h2>
              <TextDisplay variant="success" content="You have built your practical AI toolkit! You can automate workflows, build simple no-code agents, and have a clear plan for the next 30 days. Up next: AI Ethics, Safety & Society." />
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
                <p className="text-sm text-muted-foreground">The fastest way to build real AI skill is daily practice. Here is a one-month challenge - each card reveals a daily micro-task that takes under 15 minutes.</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {[
                    "Week 1: use AI once per day to summarise or draft something you were already doing.",
                    "Week 2: test three prompt variations on the same task and compare the results.",
                    "Week 3: automate one tiny workflow with a trigger, one AI step, and one output.",
                    "Week 4: document what worked, what failed, and what you would keep using.",
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
                    { category: "Free Courses", icon: BookOpen, resources: [
                      "fast.ai - Practical Deep Learning for Coders (free, hands-on)",
                      "Google's AI Essentials - free certificate course",
                      "DeepLearning.AI Short Courses - free 1-hour deep dives",
                      "Coursera: AI for Everyone by Andrew Ng (highly recommended)",
                    ]},
                    { category: "Books (Non-Technical)", icon: BookOpen, resources: [
                      "The Age of AI - Henry Kissinger, Eric Schmidt & Daniel Huttenlocher",
                      "Human Compatible - Stuart Russell (AI safety perspective)",
                      "Atlas of AI - Kate Crawford (critical perspective)",
                      "Co-Intelligence - Ethan Mollick (practical AI use)",
                    ]},
                    { category: "Stay Current", icon: Zap, resources: [
                      "Ben's Bites newsletter - daily AI news, beginner-friendly",
                      "The AI Breakdown podcast - news and analysis",
                      "Simon Willison's blog - technical but accessible AI updates",
                      "MIT Technology Review AI section",
                    ]},
                    { category: "If You Want to Code", icon: Code, resources: [
                      "Python.org beginner tutorials (Python is the AI language)",
                      "fast.ai's Practical Deep Learning course",
                      "Hugging Face tutorials - work with real AI models",
                      "LangChain documentation - build AI applications",
                    ]},
                  ].map(({ category, icon: Icon, resources }) => (
                    <Card key={category} className="p-4">
                      <h4 className="font-bold text-brand-green mb-2 flex items-center gap-1"><Icon className="h-4 w-4" />{category}</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {resources.map((r) => <li key={r} className="flex gap-1"><span className="text-brand-orange">?</span>{r}</li>)}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 text-center">
                <h3 className="text-2xl font-bold mb-3">You are ready.</h3>
                <p className="text-muted-foreground mb-4">The AI era is not something that is coming - it is already here. You now have the foundation to navigate it with confidence, curiosity, and critical thinking.</p>
                <p className="text-lg font-semibold text-brand-orange">Go build something.</p>
              </Card>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                  onClick={() => router.push("/course/module-7")}
                >
                  Continue to Module 7
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

