/**
 * MODULE 5: AI ETHICS, SAFETY & SOCIETY
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, Shield } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-5"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3"])
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
      router.push(`/course/module-5?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 5: AI Ethics, Safety & Society</h1>
            <p className="text-lg text-muted-foreground mb-4">Become an informed, responsible AI user</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="Using AI responsibly requires more than just knowing how to operate the tools. It requires understanding the risks ? to yourself, to others, and to society. This module gives you that foundation." />
              <Card className="p-5 space-y-2">
                {["AI bias ? how it forms and who it hurts","Privacy ? what AI systems collect about you","Misinformation ? deepfakes and AI-generated content","Responsible AI use ? principles and practices","The future of AI ? what comes next"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module ��</Button>
            </div>
          )}

          {/* 1: Bias */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Bias & Fairness</h2>
              <TextDisplay content="AI bias occurs when an AI system produces systematically unfair or discriminatory outcomes for certain groups of people." />
              <TextDisplay variant="warning" content="This is not a minor or theoretical problem. AI bias has denied people loans, led to wrongful arrests, screened out job applicants, and produced medical recommendations that work better for some demographics than others." />
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">How AI bias forms</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { source: "Biased training data", desc: "If historical hiring data reflects past discrimination (e.g., fewer women in senior roles), an AI trained on it will perpetuate those patterns." },
                      { source: "Underrepresentation", desc: "Facial recognition AI trained mostly on white male faces performs significantly worse on darker skin tones and women ? because those groups were underrepresented in training data." },
                      { source: "Feedback loops", desc: "AI that recommends content may amplify extreme or sensational content because users engage with it more ? creating a feedback loop that reinforces harmful patterns." },
                      { source: "Measurement bias", desc: "What you measure reflects your values. If a 'good employee' is defined as someone who works 60+ hours a week, the AI will disadvantage people with caregiving responsibilities." },
                    ].map(({ source, desc }) => (
                      <div key={source} className="flex gap-3 border-b last:border-0 pb-3 last:pb-0">
                        <AlertTriangle className="h-4 w-4 text-brand-orange mt-0.5 flex-shrink-0" />
                        <div><p className="font-medium">{source}</p><p className="text-muted-foreground">{desc}</p></div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                  <h3 className="font-semibold mb-2 text-brand-green flex items-center gap-2"><Shield className="h-4 w-4" />What is being done about it</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>? Bias auditing tools that test AI systems for disparate outcomes</li>
                    <li>? Diverse and representative training datasets</li>
                    <li>? Regulatory frameworks (EU AI Act) requiring bias assessment for high-risk AI</li>
                    <li>? Fairness metrics built into model evaluation pipelines</li>
                  </ul>
                </Card>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real-World AI Bias Cases ? Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These are real documented cases. Click each card for what happened and what we learned.</p>
                
              </div>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ��</Button>
            </div>
          )}

          {/* 2: Privacy */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Privacy & Your Data</h2>
              <TextDisplay content="When you use AI tools, you are sharing data ? sometimes more than you realise. Understanding what is collected helps you protect yourself." />
              
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Practical privacy guidelines</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Never enter personal information (SSN, passwords, financial data) into AI chat tools",
                    "Read the privacy policy before using a new AI service with sensitive information",
                    "For work-related tasks, check if your employer has approved specific AI tools",
                    "Use the 'temporary chat' or 'no training' options if available (ChatGPT has this)",
                    "Enterprise/paid tiers usually have stronger data protection than free tiers",
                  ].map((item) => (
                    <li key={item} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ��</Button>
            </div>
          )}

          {/* 3: Misinformation */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Misinformation & Deepfakes</h2>
              <TextDisplay content="AI has dramatically lowered the cost of producing convincing fake content ? from text to images to video to audio." />
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">Types of AI-generated misinformation</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { type: "Deepfake video", desc: "Realistic video of a real person saying or doing things they never did. Used in political manipulation, fraud, and non-consensual content." },
                      { type: "Voice cloning", desc: "AI can replicate any voice from just a few seconds of audio. Used in phone scams where the AI 'sounds like' a family member or executive." },
                      { type: "AI-written disinformation", desc: "LLMs can produce thousands of realistic-sounding false news articles, social media posts, or product reviews at near-zero cost." },
                      { type: "Synthetic images", desc: "Fake but photorealistic images of events that never happened ? protests, disasters, crimes, celebrities." },
                    ].map(({ type, desc }) => (
                      <div key={type} className="flex gap-3 border-b last:border-0 pb-3 last:pb-0">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                        <div><p className="font-medium">{type}</p><p className="text-muted-foreground">{desc}</p></div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                  <h3 className="font-semibold mb-3 text-brand-green">How to spot and resist AI misinformation</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Verify with primary sources before sharing ? if it is surprising, check it</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Use reverse image search to check if images are authentic</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Look for watermarks, distortions, or inconsistencies in video (odd lighting, blurry edges)</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Be suspicious of unexpected calls requesting urgent action or money, even from known voices</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Use tools like Google Fact Check, Snopes, AFP Fact Check for viral claims</li>
                  </ul>
                </Card>
                <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                  <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">AI Detection Tools ? and Their Limits</h3>
                  <p className="text-sm text-muted-foreground mb-3">A category of tools has emerged to detect AI-generated content. They are useful ? but imperfect. Understanding both is important.</p>
                  <div className="space-y-3 text-sm">
                    {[
                      { tool: "GPTZero", type: "Text detection", desc: "Analyses writing patterns and perplexity (how predictable the word choices are) to estimate whether text was AI-generated. Widely used by educators. Works reasonably well on clearly AI-generated text; struggles with heavily edited or mixed human/AI content." },
                      { tool: "Originality.ai", type: "Text detection", desc: "Designed for publishers and content teams. Scans for AI content alongside plagiarism checking. Offers sentence-level highlighting to show which parts look AI-generated. Paid tool." },
                      { tool: "Hive Moderation", type: "Image & video detection", desc: "Classifies whether images were AI-generated, with confidence scores. Used by platforms for content moderation. More reliable on images from known AI generators." },
                      { tool: "Deepware Scanner / Reality Defender", type: "Deepfake detection", desc: "Analyses video for manipulation artefacts invisible to the human eye ? inconsistent blinking, unnatural skin texture, audio-visual sync issues. Used by media organisations and governments." },
                      { tool: "C2PA / Content Credentials", type: "Provenance standard", desc: "Not a detection tool but a prevention standard. Adobe, Microsoft, Google, and camera makers are building cryptographic provenance into images and videos ? a digital signature that records how content was created and modified. Look for the 'cr' icon in supported apps." },
                    ].map(({ tool, type, desc }) => (
                      <div key={tool} className="flex gap-3 border-b last:border-0 pb-3 last:pb-0">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{tool}</p>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">{type}</span>
                          </div>
                          <p className="text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Critical limitation to understand</p>
                    <p className="text-xs text-muted-foreground">No detection tool is reliable enough to serve as proof in high-stakes situations. They provide probability scores, not verdicts. False positives (flagging human writing as AI) are common ? students have been wrongly accused. Use detection tools as one signal in a broader investigation, never as definitive evidence.</p>
                  </div>
                </Card>
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Real scenario ? what would you do?</h3>
                
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ��</Button>
            </div>
          )}

          {/* 4: Responsible AI */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Responsible AI Use</h2>
              <TextDisplay content="Being a responsible AI user does not mean being afraid of AI ? it means using it thoughtfully, with awareness of its limitations and impact." />
              <div className="space-y-3">
                {[
                  { principle: "Verify before you trust", desc: "AI can be confidently wrong. For anything important ? medical, legal, financial, factual ? always verify AI outputs with authoritative sources." },
                  { principle: "Disclose when relevant", desc: "If you use AI to write something that will be presented as your own work or expertise, consider whether disclosure is appropriate. Academic, professional, and journalistic contexts often require it." },
                  { principle: "Do not automate consequential decisions blindly", desc: "AI should augment human judgment, not replace it, for high-stakes decisions (hiring, lending, medical treatment, legal judgments)." },
                  { principle: "Be aware of your own 'automation bias'", desc: "People tend to over-trust AI outputs because they come from computers. Actively question AI suggestions rather than accepting them by default." },
                  { principle: "Consider impact on others", desc: "AI-generated content, images, and audio can harm real people. Think about downstream effects before you create or share AI content." },
                    { principle: "Protect privacy", desc: "Do not use AI tools to collect, analyse, or share personal information about others without consent." },
                  ].map(({ principle, desc }) => (
                    <Card key={principle} className="p-4">
                      <p className="font-semibold text-brand-orange mb-1">{principle}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </Card>
                  ))}
              </div>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">Responsible AI Scenario</h3>
                
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ��</Button>
            </div>
          )}

          {/* 5: The Future */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">The Future of AI</h2>
              <TextDisplay content="AI is evolving faster than almost any technology in history. Here is what experts are currently watching:" />
              <div className="space-y-4">
                {[
                  { trend: "AI Agents", desc: "AI that can take multi-step actions autonomously ? browse the web, write code, make purchases, manage your calendar. Moving from 'chat' to 'do'." },
                  { trend: "Multimodal AI", desc: "Models that can see, hear, speak, and code ? not just text. GPT-4o, Gemini Ultra, and Claude 3.5 are already multimodal." },
                  { trend: "AI in Healthcare", desc: "AI is matching or exceeding specialists in reading radiology scans, identifying skin cancers, predicting drug interactions, and discovering new molecules." },
                  { trend: "Regulation", desc: "The EU AI Act is the first major AI regulation globally. The US, UK, China, and others are developing frameworks. This will reshape how AI is built and deployed." },
                  { trend: "AI and Employment", desc: "Research suggests AI will transform most knowledge work jobs ? augmenting some, displacing others. The effect will be uneven across roles and sectors." },
                  { trend: "AI Safety Research", desc: "A growing field working on the 'alignment problem': ensuring AI systems do what humans actually intend. Organisations like Anthropic, DeepMind Safety, and MIRI are leading this work." },
                ].map(({ trend, desc }) => (
                  <Card key={trend} className="p-4 flex gap-3">
                    <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-1 rounded h-fit flex-shrink-0 whitespace-nowrap">{trend}</span>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The most important skill in an AI-driven world is not knowing how to use any specific tool ? it is knowing how to think critically, adapt quickly, and use AI as a collaborator rather than a crutch." />
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Think it through</h3>
                
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next ��</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent! You are now an informed, critical AI user. Up next: AI Agents ? how autonomous AI systems plan, act, and complete multi-step tasks on your behalf." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-6")}>
                      Continue to Module 6 ��
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
