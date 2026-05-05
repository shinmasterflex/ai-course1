/**
 * MODULE 4: AI TOOLS FOR EVERYDAY LIFE
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
import { CheckCircle2, ExternalLink } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

type ToolCardProps = {
  name: string
  url: string
  tagline: string
  strengths: string[]
  free: boolean
}

function ToolCard({ name, url, tagline, strengths, free }: ToolCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-muted-foreground">{tagline}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${free ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
          {free ? "Free tier" : "Paid"}
        </span>
      </div>
      <ul className="text-sm space-y-1">
        {strengths.map((strength) => (
          <li key={strength} className="flex gap-1 items-start">
            <CheckCircle2 className="h-3 w-3 text-brand-green mt-0.5 flex-shrink-0" />
            {strength}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default function Module4Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-4"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "matching"])
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
      router.push(`/course/module-4?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 4: AI Tools for Everyday Life</h1>
            <p className="text-lg text-muted-foreground mb-4">A guided tour of the best AI tools available today</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 4"
              title="Turn AI tools into daily practical leverage"
              description="Use-case first guidance to pick the right tool quickly for writing, research, creativity, and automation."
              imageSrc="/images/modules/module-4.jpg"
              imageAlt="AI tools for creative and productive work"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="The AI tool landscape is growing fast. This module gives you a map - organised by use case - so you can quickly find the right tool for any task." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-4 text-brand-green">Start with the job, not the brand</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {[
                    { job: "Summarise", desc: "Turn long inputs into key points, action items, or highlights." },
                    { job: "Draft", desc: "Create a first version of an email, report, agenda, or post." },
                    { job: "Research", desc: "Gather, compare, and synthesize information from multiple sources." },
                    { job: "Create", desc: "Generate images, music, video, or design concepts." },
                    { job: "Organise", desc: "Convert messy notes or data into structure, categories, or plans." },
                    { job: "Automate", desc: "Trigger repeatable actions across tools with minimal manual work." },
                  ].map(({ job, desc }) => (
                    <div key={job} className="rounded-lg border bg-background p-3">
                      <p className="font-semibold text-brand-orange mb-1">{job}</p>
                      <p className="text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5 space-y-2">
                {["AI writing assistants - ChatGPT, Claude, Gemini","AI image generation - Midjourney, DALL-E, Firefly","AI for productivity - Notion AI, Copilot, Grammarly","AI in creative work - music, video, design","How to choose the right tool","Module Quiz"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: AI Writing */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Writing Assistants</h2>
              <TextDisplay content="AI writing tools can draft emails, reports, essays, code, social posts, and more. Here are the main players and when to use each." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Which writing job are you trying to do?</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    "Draft something from scratch",
                    "Rewrite something to improve tone or clarity",
                    "Summarise a long document",
                    "Brainstorm ideas or outlines",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border bg-background p-3 text-muted-foreground">{item}</div>
                  ))}
                </div>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                <ToolCard
                  name="ChatGPT"
                  url="https://chat.openai.com"
                  tagline="Most versatile general-purpose assistant"
                  free={true}
                  strengths={["Great for long-form writing and brainstorming","Strong code generation","Wide knowledge base","Plugins and GPT-4o multimodal"]}
                />
                <ToolCard
                  name="Claude"
                  url="https://claude.ai"
                  tagline="Best for nuanced writing and long documents"
                  free={true}
                  strengths={["Extremely long context window","Nuanced, natural tone","Excellent at following complex instructions","Strong ethical guardrails"]}
                />
                <ToolCard
                  name="Gemini"
                  url="https://gemini.google.com"
                  tagline="Google's assistant - integrates with your apps"
                  free={true}
                  strengths={["Connects to Gmail, Docs, Drive","Real-time web search","Great for research tasks","Strong at multimodal tasks"]}
                />
                <ToolCard
                  name="Grammarly"
                  url="https://grammarly.com"
                  tagline="Grammar and writing quality assistant"
                  free={true}
                  strengths={["Real-time suggestions in any browser","Tone detection and adjustment","Best for editing, not drafting","Works inside Gmail, Docs, etc."]}
                />
              </div>
              <QuickCheckCard
                prompt="If your main task is polishing tone and grammar inside apps you already use, which tool in this section is the most direct fit?"
                options={[
                  { id: "a", label: "Grammarly" },
                  { id: "b", label: "Midjourney" },
                  { id: "c", label: "Stable Diffusion" },
                  { id: "d", label: "Otter.ai" },
                ]}
                correctOptionId="a"
                explanation="Grammarly is positioned here as the editing and tone-adjustment tool, especially for improving writing inside existing workflows."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: AI Images */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI Image Generation</h2>
              <TextDisplay content="AI image generators create photorealistic images, illustrations, concept art, and more from a text description. They have transformed design and creative work." />
              <div className="grid md:grid-cols-2 gap-4">
                <ToolCard
                  name="DALL-E 3"
                  url="https://openai.com/dall-e-3"
                  tagline="Built into ChatGPT - easy to use"
                  free={false}
                  strengths={["Accessible via ChatGPT Plus","Great at following detailed text descriptions","Strong at photorealistic and artistic styles","No separate account needed"]}
                />
                <ToolCard
                  name="Midjourney"
                  url="https://midjourney.com"
                  tagline="Highest quality art and photorealism"
                  free={false}
                  strengths={["Widely considered the best aesthetic quality","Excellent for concept art and stylised images","Strong community and style library","Web interface now available"]}
                />
                <ToolCard
                  name="Adobe Firefly"
                  url="https://firefly.adobe.com"
                  tagline="Safe for commercial use - built into Creative Cloud"
                  free={true}
                  strengths={["Trained on licensed content - commercially safe","Integrated into Photoshop and Illustrator","Generative Fill is incredibly powerful","Good for professional design workflows"]}
                />
                <ToolCard
                  name="Stable Diffusion"
                  url="https://stability.ai"
                  tagline="Open-source - run it yourself"
                  free={true}
                  strengths={["Free and open source","Highly customisable with community models","Can run locally on your own computer","Large ecosystem of fine-tuned models"]}
                />
              </div>
              <TextDisplay variant="warning" content="Important: Always check the terms of service for AI image tools before using images commercially. Ownership and rights vary significantly between platforms." />
              <FlipCardGrid
                cards={[
                  {
                    title: "Midjourney",
                    prompt: "When is Midjourney usually the right fit?",
                    answer: "Use it when you want striking, stylized visuals quickly and are comfortable working through Discord-based prompting.",
                  },
                  {
                    title: "Adobe Firefly",
                    prompt: "When is Firefly the safer choice?",
                    answer: "It is a strong fit when you care about commercial workflow compatibility and tight integration with Adobe creative tools.",
                  },
                  {
                    title: "Stable Diffusion",
                    prompt: "Why would someone choose Stable Diffusion?",
                    answer: "It offers the most flexibility for customization, local control, and community models if you are willing to manage more setup.",
                  },
                  {
                    title: "Usage rights",
                    prompt: "Why should rights be part of tool selection?",
                    answer: "Because a good-looking result is not enough if the platform's terms or licensing rules make the image risky for commercial use.",
                  },
                ]}
              />
              <QuickCheckCard
                prompt="If you need commercially safer image generation inside an existing Adobe workflow, which tool is the best match from this section?"
                options={[
                  { id: "a", label: "Adobe Firefly" },
                  { id: "b", label: "Midjourney" },
                  { id: "c", label: "Stable Diffusion with random community models" },
                  { id: "d", label: "Any tool, because rights never matter" },
                ]}
                correctOptionId="a"
                explanation="The section positions Firefly as the strongest fit for commercially safer creative workflows tied to Adobe tools."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: AI Productivity */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI for Productivity</h2>
              <TextDisplay content="AI productivity tools are embedded into the apps you already use - transforming how you write, organise, and get things done." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">A beginner-friendly capability map</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Summarising", example: "Meeting transcripts, articles, long emails" },
                    { label: "Drafting", example: "Replies, memos, proposals, slide outlines" },
                    { label: "Researching", example: "Compare options, gather sources, build briefings" },
                    { label: "Organising", example: "Turn notes into checklists, tables, categories" },
                  ].map(({ label, example }) => (
                    <div key={label} className="rounded-lg border bg-background p-3">
                      <p className="font-semibold text-brand-orange mb-1">{label}</p>
                      <p className="text-muted-foreground">{example}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="space-y-4">
                {[
                  { category: "Meeting & Notes", tools: [
                    { name: "Otter.ai", desc: "Real-time meeting transcription and AI summaries" },
                    { name: "Fireflies.ai", desc: "Records, transcribes, and summarises calls automatically" },
                    { name: "Notion AI", desc: "AI writing and summarisation built into your Notion workspace" },
                  ]},
                  { category: "Office & Docs", tools: [
                    { name: "Microsoft Copilot", desc: "AI in Word, Excel, PowerPoint, Teams, Outlook - summarise emails, draft documents, analyse data" },
                    { name: "Google Duet AI", desc: "AI in Google Docs, Sheets, Slides, Gmail - same concept as Copilot for Google Workspace users" },
                  ]},
                  { category: "Research & Browsing", tools: [
                    { name: "Perplexity AI", desc: "AI search engine that cites sources - great for research" },
                    { name: "ChatGPT + Browse", desc: "Real-time web browsing with source citations" },
                    { name: "Elicit", desc: "AI research tool that searches academic papers" },
                  ]},
                  { category: "Coding", tools: [
                    { name: "GitHub Copilot", desc: "AI code completion and generation inside VS Code and other editors" },
                    { name: "Cursor", desc: "AI-first code editor built around an LLM" },
                    { name: "ChatGPT", desc: "Excellent for explaining code, debugging, and writing scripts" },
                  ]},
                ].map(({ category, tools }) => (
                  <Card key={category} className="p-4">
                    <h3 className="font-bold text-brand-green mb-3">{category}</h3>
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
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Good first uses at work</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Summarise a meeting transcript into decisions and action items",
                    "Turn bullet notes into a polished status update",
                    "Research a topic and return cited pros, cons, and recommendations",
                    "Organise survey responses or customer feedback into categories",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <DragSortChallenge
                title="Workflow Conveyor"
                description="Drag tasks into a practical beginner sequence from safest to more advanced usage."
                items={[
                  "Automate multi-step workflows across tools",
                  "Summarise meetings into action items",
                  "Run cited research comparisons",
                  "Draft and edit status updates",
                ]}
                correctOrder={[
                  "Summarise meetings into action items",
                  "Draft and edit status updates",
                  "Run cited research comparisons",
                  "Automate multi-step workflows across tools",
                ]}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: AI Creative */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI in Creative Work</h2>
              <TextDisplay content="AI has entered every creative field. Here is a quick tour of what is possible today:" />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { field: "Music", tools: "Suno, Udio, Stable Audio", desc: "Generate full songs in any style from a text prompt. Suno can produce a complete song - lyrics, melody, vocals - in seconds." },
                  { field: "Video", tools: "Sora (OpenAI), RunwayML, Pika", desc: "Generate video clips from text descriptions. Sora produces cinematic quality video. RunwayML is used by professional filmmakers." },
                  { field: "Design / UI", tools: "Uizard, Framer AI, Locofy", desc: "Generate UI mockups, websites, and app screens from text descriptions or rough sketches." },
                  { field: "Voice / Audio", tools: "ElevenLabs, Murf, Adobe Enhance", desc: "Clone voices, create realistic AI narration, clean up audio recordings, generate sound effects." },
                  { field: "3D & Animation", tools: "Luma AI, Meshy, Spline AI", desc: "Generate 3D models and scenes from images or text. Create animations with AI motion generation." },
                  { field: "Writing", tools: "Sudowrite, NovelAI, Jasper", desc: "Specialised writing assistants for fiction, marketing copy, and long-form content with style control." },
                ].map(({ field, tools, desc }) => (
                  <Card key={field} className="p-4">
                    <h4 className="font-bold text-brand-orange">{field}</h4>
                    <p className="text-xs text-muted-foreground mb-1 font-mono">{tools}</p>
                    <p className="text-sm">{desc}</p>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The creative AI space is moving extremely fast. A tool that is state-of-the-art today may be superseded in months. Focus on learning the principles - the tools change, but the skill of knowing what to ask for, and how to evaluate outputs, stays valuable." />
              <QuickCheckCard
                prompt="If you want to generate short cinematic video clips from text prompts, which category of tool is the best fit from this section?"
                options={[
                  { id: "a", label: "Video tools like Sora or RunwayML" },
                  { id: "b", label: "Voice tools like ElevenLabs" },
                  { id: "c", label: "UI tools like Uizard" },
                  { id: "d", label: "Writing tools like Jasper" },
                ]}
                correctOptionId="a"
                explanation="The video category is the direct fit for text-to-video generation. The section names Sora and RunwayML specifically for that use case."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Choosing Tools */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Choosing the Right Tool</h2>
              <TextDisplay content="With hundreds of AI tools available, how do you decide which to use? Use this simple framework:" />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">The decision order that keeps beginners out of trouble</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">1. Define the job:</span> summarise, draft, research, create, organise, or automate.</p>
                  <p><span className="font-medium text-foreground">2. Check the data:</span> if it is sensitive, stop and check policy before pasting it anywhere.</p>
                  <p><span className="font-medium text-foreground">3. Choose the lightest tool that fits:</span> use a simple assistant before adopting a full workflow or platform.</p>
                  <p><span className="font-medium text-foreground">4. Verify the output:</span> especially facts, numbers, citations, or anything going to a client or boss.</p>
                </div>
              </Card>
              
              <Card className="p-5">
                <h3 className="font-semibold mb-3">5 Questions Before Choosing an AI Tool</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  {[
                    "What exactly is the task? Be specific - different tools excel at different things.",
                    "Does it need to be free? If yes, filter your options accordingly.",
                    "Does it need internet access? Tools like Perplexity are better for current information.",
                    "How sensitive is the data? Avoid putting private company data into external AI tools without checking privacy policies.",
                    "Do I need to keep the output? Some tools do not allow commercial use or have restrictions on generated content.",
                  ].map((q, i) => <li key={i} className="text-muted-foreground">{q}</li>)}
                </ol>
              </Card>
              <FlipCardGrid
                cards={[
                  {
                    title: "Use AI",
                    prompt: "You need a first draft of a project update from your own notes.",
                    answer: "Yes. This is a strong use case: low risk, easy to review, and time-saving.",
                  },
                  {
                    title: "Be careful",
                    prompt: "You want AI to summarize internal strategy notes with confidential details.",
                    answer: "Only if your approved tools and company policy allow it. Sensitivity matters before convenience.",
                  },
                  {
                    title: "Do not rely blindly",
                    prompt: "You want AI to make the final legal or medical decision for you.",
                    answer: "No. AI can support research or drafting, but high-stakes judgment still needs expert human review.",
                  },
                  {
                    title: "Best first step",
                    prompt: "You are unsure which tool to try first.",
                    answer: "Start by naming the job to be done. Once you know the task clearly, tool selection becomes much easier.",
                  },
                ]}
              />
              <MatchingChallenge
                title="Tool Selection Match"
                description="Match the situation to the best first decision."
                pairs={[
                  {
                    id: "sensitive",
                    left: "Input contains confidential strategy",
                    right: "Check approved tools and privacy policy before use",
                  },
                  {
                    id: "unknown",
                    left: "You do not know where to start",
                    right: "Define the exact job-to-be-done first",
                  },
                  {
                    id: "output",
                    left: "Output is going to leadership",
                    right: "Verify facts, numbers, and claims before sending",
                  },
                ]}
              />
              <QuickCheckCard
                prompt="What is the best beginner sequence for choosing an AI tool?"
                options={[
                  { id: "a", label: "Pick the newest brand, then look for a task" },
                  { id: "b", label: "Define the task, check the data sensitivity, choose the simplest suitable tool, then verify the output" },
                  { id: "c", label: "Always use the most advanced tool available" },
                  { id: "d", label: "Start with automation before trying any simple use case" },
                ]}
                correctOptionId="b"
                explanation="Good tool selection starts with the job, then privacy and risk, then the simplest tool that fits, followed by output verification."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
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
                  <TextDisplay variant="success" content="Well done! You now have a solid map of the AI tool landscape. Next: we tackle the harder questions - AI ethics, bias, and how to be a responsible AI user." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-5")}>
                      Continue to Module 5
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

