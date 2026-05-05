/**
 * MODULE 4: AI TOOLS FOR EVERYDAY LIFE
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { FlipCard } from "@/components/learning/flip-card"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { MatchingGame } from "@/components/learning/matching-game"
import { GridDisplay } from "@/components/learning/grid-display"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ExternalLink } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"

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

  const ToolCard = ({ name, url, tagline, strengths, free }: { name: string; url: string; tagline: string; strengths: string[]; free: boolean }) => (
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
        {strengths.map((s) => <li key={s} className="flex gap-1 items-start"><CheckCircle2 className="h-3 w-3 text-brand-green mt-0.5 flex-shrink-0" />{s}</li>)}
      </ul>
    </Card>
  )

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

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="The AI tool landscape is growing fast. This module gives you a map — organised by use case — so you can quickly find the right tool for any task." />
              <Card className="p-5 space-y-2">
                {["AI writing assistants — ChatGPT, Claude, Gemini","AI image generation — Midjourney, DALL·E, Firefly","AI for productivity — Notion AI, Copilot, Grammarly","AI in creative work — music, video, design","How to choose the right tool","Module Quiz"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module →</Button>
            </div>
          )}

          {/* 1: AI Writing */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Writing Assistants</h2>
              <TextDisplay content="AI writing tools can draft emails, reports, essays, code, social posts, and more. Here are the main players and when to use each." />
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
                  tagline="Google's assistant — integrates with your apps"
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
              <FlipCard
                front="When should I use Claude instead of ChatGPT?"
                back="Use Claude when you need to process very long documents (Claude handles up to 200,000 tokens — about 150,000 words), when tone and nuance matter, or when you want a more 'thoughtful' writing partner. ChatGPT is often better for code, plugins, and GPT-4o vision tasks."
              />
              <MatchingGame
                title="Match the task to the best writing or research tool"
                pairs={[
                  { left: "Fixing grammar in a Google Doc", right: "Grammarly" },
                  { left: "Research with cited sources", right: "Perplexity AI" },
                  { left: "Writing and editing a 50-page report", right: "Claude" },
                  { left: "Searching Gmail, Docs and Drive together", right: "Gemini" },
                  { left: "Brainstorming, coding, and general tasks", right: "ChatGPT" },
                ]}
                onComplete={() => handleQuizComplete("matching", true)}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 2: AI Images */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI Image Generation</h2>
              <TextDisplay content="AI image generators create photorealistic images, illustrations, concept art, and more from a text description. They have transformed design and creative work." />
              <div className="grid md:grid-cols-2 gap-4">
                <ToolCard
                  name="DALL·E 3"
                  url="https://openai.com/dall-e-3"
                  tagline="Built into ChatGPT — easy to use"
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
                  tagline="Safe for commercial use — built into Creative Cloud"
                  free={true}
                  strengths={["Trained on licensed content — commercially safe","Integrated into Photoshop and Illustrator","Generative Fill is incredibly powerful","Good for professional design workflows"]}
                />
                <ToolCard
                  name="Stable Diffusion"
                  url="https://stability.ai"
                  tagline="Open-source — run it yourself"
                  free={true}
                  strengths={["Free and open source","Highly customisable with community models","Can run locally on your own computer","Large ecosystem of fine-tuned models"]}
                />
              </div>
              <TextDisplay variant="warning" content="Important: Always check the terms of service for AI image tools before using images commercially. Ownership and rights vary significantly between platforms." />
              <div className="grid md:grid-cols-2 gap-4">
                <FlipCard
                  front="What makes Adobe Firefly 'commercially safe'?"
                  back="Firefly was trained exclusively on Adobe Stock images, openly licensed content, and public domain works — not scraped from the general internet. This means generated images are less likely to infringe existing artists' copyrights, making it the go-to choice for agencies and brands who need legally defensible creative outputs."
                />
                <FlipCard
                  front="Midjourney vs Stable Diffusion — what is the key difference?"
                  back="Midjourney is a hosted service with consistently stunning aesthetic quality — you pay a subscription and images are processed on their servers. Stable Diffusion is open-source — download it and run it free on your own computer. Midjourney wins on quality and ease; Stable Diffusion wins on control, privacy, and cost."
                />
              </div>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Pick the right image tool</h3>
                <MultipleChoice
                  question="A marketing agency needs AI-generated visuals for a major brand campaign. They need commercially safe images integrated into their existing Photoshop workflow. Which tool fits best?"
                  options={[
                    { text: "Stable Diffusion", isCorrect: false, feedback: "Stable Diffusion requires technical setup and licensing varies by model — not ideal for a client-facing commercial campaign without careful legal review." },
                    { text: "Midjourney", isCorrect: false, feedback: "Midjourney produces excellent quality but its training data and commercial licensing are more complex. Not the default choice for agencies with strict IP requirements." },
                    { text: "Adobe Firefly", isCorrect: true, feedback: "Correct! Firefly is trained on licensed material, designed for commercial use, and deeply integrated into Photoshop and Illustrator — exactly what a professional agency needs." },
                    { text: "DALL·E 3 via ChatGPT Plus", isCorrect: false, feedback: "DALL·E 3 allows commercial use per OpenAI's terms, but it is not as deeply integrated into professional design tools as Firefly, and its training data is broader." },
                  ]}
                  explanation="For professional commercial design work, Adobe Firefly is the strongest choice: trained on licensed content, integrated into Photoshop/Illustrator, and specifically built for creative professionals. Always match your tool to your legal and workflow requirements."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 3: AI Productivity */
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI for Productivity</h2>
              <TextDisplay content="AI productivity tools are embedded into the apps you already use — transforming how you write, organise, and get things done." />
              <div className="space-y-4">
                {[
                  { category: "Meeting & Notes", tools: [
                    { name: "Otter.ai", desc: "Real-time meeting transcription and AI summaries" },
                    { name: "Fireflies.ai", desc: "Records, transcribes, and summarises calls automatically" },
                    { name: "Notion AI", desc: "AI writing and summarisation built into your Notion workspace" },
                  ]},
                  { category: "Office & Docs", tools: [
                    { name: "Microsoft Copilot", desc: "AI in Word, Excel, PowerPoint, Teams, Outlook — summarise emails, draft documents, analyse data" },
                    { name: "Google Duet AI", desc: "AI in Google Docs, Sheets, Slides, Gmail — same concept as Copilot for Google Workspace users" },
                  ]},
                  { category: "Research & Browsing", tools: [
                    { name: "Perplexity AI", desc: "AI search engine that cites sources — great for research" },
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
              <MatchingGame
                title="Match each AI productivity tool to its primary job"
                pairs={[
                  { left: "Otter.ai", right: "Real-time meeting transcription & summaries" },
                  { left: "Perplexity AI", right: "Research with cited web sources" },
                  { left: "GitHub Copilot", right: "AI code completion in your editor" },
                  { left: "Microsoft Copilot", right: "AI across Word, Excel & Outlook" },
                  { left: "Notion AI", right: "Writing & summarising inside Notion" },
                ]}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 4: AI Creative */
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI in Creative Work</h2>
              <TextDisplay content="AI has entered every creative field. Here is a quick tour of what is possible today:" />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { field: "Music", tools: "Suno, Udio, Stable Audio", desc: "Generate full songs in any style from a text prompt. Suno can produce a complete song — lyrics, melody, vocals — in seconds." },
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
              <TextDisplay variant="callout" content="The creative AI space is moving extremely fast. A tool that is state-of-the-art today may be superseded in months. Focus on learning the principles — the tools change, but the skill of knowing what to ask for, and how to evaluate outputs, stays valuable." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Which creative AI tool?</h3>
                <MultipleChoice
                  question="A podcaster wants to create a professional-sounding AI voiceover with a custom voice style for their show intros. Which tool category should they use?"
                  options={[
                    { text: "Suno or Udio", isCorrect: false, feedback: "Suno and Udio generate full music tracks with vocals and instruments — great for background music, but not voiceover narration tools." },
                    { text: "ElevenLabs or Murf", isCorrect: true, feedback: "Correct! ElevenLabs and Murf specialise in AI voice generation and cloning — perfect for podcast intros, narration, and professional audio production with a consistent, customisable voice." },
                    { text: "RunwayML or Sora", isCorrect: false, feedback: "RunwayML and Sora generate video, not voiceover audio." },
                    { text: "Uizard or Framer AI", isCorrect: false, feedback: "Uizard and Framer AI generate UI designs and websites — nothing to do with audio." },
                  ]}
                  explanation="The AI voice and audio category (ElevenLabs, Murf, Adobe Enhance) is purpose-built for voiceover, narration, and audio production. ElevenLabs is particularly popular for podcast intros, audiobook narration, and custom voice cloning."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 5: Choosing Tools */
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Choosing the Right Tool</h2>
              <TextDisplay content="With hundreds of AI tools available, how do you decide which to use? Use this simple framework:" />
              <GridDisplay
                title="AI Tool Selection Framework"
                xAxis={{ label: "Task Complexity", values: ["Simple", "Moderate", "Complex"] }}
                yAxis={{ label: "How Often You Do It", values: ["Rarely", "Weekly", "Daily"] }}
                items={[
                  { x: "Simple", y: "Rarely", label: "ChatGPT (free)" },
                  { x: "Moderate", y: "Rarely", label: "ChatGPT / Claude" },
                  { x: "Complex", y: "Rarely", label: "Claude Pro" },
                  { x: "Simple", y: "Weekly", label: "ChatGPT or Gemini" },
                  { x: "Moderate", y: "Weekly", label: "Copilot / Notion AI" },
                  { x: "Complex", y: "Weekly", label: "Specialist tool" },
                  { x: "Simple", y: "Daily", label: "Grammarly / built-in" },
                  { x: "Moderate", y: "Daily", label: "Copilot (subscription)" },
                  { x: "Complex", y: "Daily", label: "Custom workflow" },
                ]}
              />
              <Card className="p-5">
                <h3 className="font-semibold mb-3">5 Questions Before Choosing an AI Tool</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  {[
                    "What exactly is the task? Be specific — different tools excel at different things.",
                    "Does it need to be free? If yes, filter your options accordingly.",
                    "Does it need internet access? Tools like Perplexity are better for current information.",
                    "How sensitive is the data? Avoid putting private company data into external AI tools without checking privacy policies.",
                    "Do I need to keep the output? Some tools do not allow commercial use or have restrictions on generated content.",
                  ].map((q, i) => <li key={i} className="text-muted-foreground">{q}</li>)}
                </ol>
              </Card>
                <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                  <h3 className="font-semibold mb-3 text-brand-green">Should I Use AI for This? — Rapid-Fire Quiz</h3>
                  <MultipleChoice
                    question="Your company asks you to summarise a confidential investor report using a free AI tool. What should you do?"
                    options={[
                      { text: "Go ahead — AI tools are designed for this kind of task", isCorrect: false, feedback: "The issue is not capability — it is privacy. Free AI tools often use inputs for training. Confidential business documents should not go into consumer AI tools without checking your company's policy and the tool's privacy terms." },
                      { text: "Check your company's AI use policy and the tool's data privacy terms before proceeding", isCorrect: true, feedback: "Correct. Many organisations have explicit policies about which AI tools are approved for sensitive data. Enterprise tiers of tools like ChatGPT or Claude offer much stronger data protection than free tiers." },
                      { text: "It is fine as long as you delete the conversation afterwards", isCorrect: false, feedback: "Deleting your end of the conversation may not prevent the data from being stored server-side. The tool's privacy policy governs what happens to your data — not the delete button." },
                      { text: "AI is never appropriate for business documents", isCorrect: false, feedback: "AI is widely used for business documents — but appropriately, with the right tools that meet data governance requirements." },
                    ]}
                    explanation="The right approach: always check (1) your employer's AI usage policy, and (2) the tool's data handling terms. Enterprise/paid tiers typically offer data processing agreements and do not train on your inputs. For sensitive data, use approved enterprise tools — not free consumer tiers."
                  />
                </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <MultipleChoice
                question="Which AI image generation tool is best suited for professional design workflows that need to be commercially safe?"
                options={[
                  { text: "Midjourney", isCorrect: false, feedback: "Midjourney produces stunning art but has more complex commercial terms." },
                  { text: "Stable Diffusion", isCorrect: false, feedback: "Stable Diffusion is open source but licensing varies by model." },
                  { text: "Adobe Firefly", isCorrect: true, feedback: "Correct! Firefly is trained on licensed content and is designed for commercial use within Adobe's Creative Cloud ecosystem." },
                  { text: "DALL·E 3", isCorrect: false, feedback: "DALL·E 3 allows commercial use via OpenAI's terms, but Firefly is specifically built for professional design workflows." },
                ]}
                explanation="Adobe Firefly was trained on Adobe Stock images and publicly licensed content, making it specifically designed for commercial use. It is also deeply integrated into Photoshop and Illustrator."
                onComplete={(c) => handleQuizComplete("quiz1", c)}
              />
              <MultipleChoice
                question="You need to research a topic and want the AI to cite its sources. Which tool is best suited for this?"
                options={[
                  { text: "Grammarly", isCorrect: false, feedback: "Grammarly is a writing assistant, not a research tool." },
                  { text: "Midjourney", isCorrect: false, feedback: "Midjourney generates images, not research summaries." },
                  { text: "Perplexity AI", isCorrect: true, feedback: "Correct! Perplexity is an AI search engine designed to answer questions with cited sources from the web." },
                  { text: "Suno", isCorrect: false, feedback: "Suno generates music." },
                ]}
                explanation="Perplexity AI is specifically designed as an AI-powered research and search tool that provides answers with clear source citations — making it ideal for research tasks."
                onComplete={(c) => handleQuizComplete("quiz2", c)}
              />
              <MultipleChoice
                question="Before entering company data into a public AI tool, what should you check?"
                options={[
                  { text: "Whether the tool has a mobile app", isCorrect: false, feedback: "Mobile availability is not a security or privacy concern." },
                  { text: "How many users the tool has", isCorrect: false, feedback: "Popularity does not determine data privacy practices." },
                  { text: "The tool's privacy policy regarding how your data is stored, used, and whether it is used for training", isCorrect: true, feedback: "Exactly right. Many free AI tools use your inputs to improve their models. Company data should only be entered into tools with appropriate enterprise data protection." },
                  { text: "Whether the interface is user-friendly", isCorrect: false, feedback: "Usability is less important than data security for company information." },
                ]}
                explanation="When using AI tools with sensitive or proprietary data, always check the privacy policy. Many consumer AI tools may use your prompts to train future models. Enterprise tiers often provide stronger data protection."
                onComplete={(c) => handleQuizComplete("quiz3", c)}
              />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Well done! You now have a solid map of the AI tool landscape. Next: we tackle the harder questions — AI ethics, bias, and how to be a responsible AI user." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-5")}>
                      Continue to Module 5 →
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
