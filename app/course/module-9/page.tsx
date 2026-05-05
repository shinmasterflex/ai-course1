/**
 * MODULE 9: THE FUTURE OF AI
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { FlipCardGrid, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Rocket, Globe, Star, Brain } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module9Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-9"
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
      router.push(`/course/module-9?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 9: The Future of AI</h1>
            <p className="text-lg text-muted-foreground mb-4">Where AI is heading  - and how to prepare for what comes next</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="AI is evolving faster than almost any technology in history. In this final module you will look at where the field is heading: emerging capabilities, the quest for artificial general intelligence, global governance challenges, and the career opportunities this creates for you." />
              <Card className="p-5 space-y-2">
                {[
                  "The current frontiers pushing AI capability forward",
                  "What AGI is  - and why experts disagree about its timeline",
                  "How governments are responding to AI with policy and regulation",
                  "Career paths and opportunities in the AI era",
                  "How to orient yourself for a rapidly changing technological future",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: Current Frontiers */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Current AI Frontiers</h2>
              <TextDisplay content="The capabilities of AI systems are advancing on multiple fronts simultaneously. Understanding these frontiers helps you anticipate what AI will be able to do in the near future." />
              <div className="space-y-4">
                {[
                  {
                    area: "Multimodal AI",
                    icon: Brain,
                    description: "AI systems that can process and generate text, images, audio, and video simultaneously  - not as separate models but as unified systems. GPT-4o and Gemini Ultra can see, listen, and respond in real time.",
                    implications: "Expect AI assistants to become genuine all-purpose interfaces: describe a problem verbally, show it a photo, and get a detailed response. Professional tools will integrate this across design, medicine, and engineering.",
                  },
                  {
                    area: "AI Agents",
                    icon: Rocket,
                    description: "AI systems that do not just answer questions but take actions: browse the web, write and execute code, manage files, book appointments, and complete multi-step tasks autonomously.",
                    implications: "Agentic AI will automate entire workflows that previously required human oversight at each step. The shift from AI as a tool to AI as a collaborator that acts on your behalf.",
                  },
                  {
                    area: "Scientific AI",
                    icon: Star,
                    description: "AlphaFold solved the 50-year protein folding problem in 2020. AI is now being used to discover new antibiotics, design novel materials, and accelerate drug development from decades to years.",
                    implications: "AI is becoming a genuine scientific collaborator  - not just analysing existing data, but generating hypotheses and designing experiments. This will dramatically compress the timeline for major scientific breakthroughs.",
                  },
                  {
                    area: "Reasoning Models",
                    icon: Brain,
                    description: "Models like OpenAI o1 and o3, Google Gemini 2.0 Flash Thinking spend time 'thinking through' problems step by step before answering  - dramatically improving performance on complex mathematical and logical tasks.",
                    implications: "AI moving from pattern-matching to genuine reasoning changes what tasks AI can tackle reliably. Complex analysis, strategic planning, and scientific problem-solving become increasingly AI-accessible.",
                  },
                  {
                    area: "Open-Source & On-Device AI",
                    icon: Star,
                    description: "Meta's Llama series, Mistral, and DeepSeek have released models that rival closed commercial AI  - for free. Simultaneously, models are shrinking to run on laptops and phones without an internet connection. Apple Intelligence, Gemini Nano, and Copilot+ PCs all run AI entirely on-device.",
                    implications: "Frontier AI is being democratised. Smaller companies, researchers in developing countries, and privacy-conscious users can now access powerful AI without depending on API costs or internet connectivity. The concentrated power of the first generation of AI labs is being distributed.",
                  },
                ].map(({ area, icon: Icon, description, implications }) => (
                  <Card key={area} className="p-5">
                    <h3 className="font-bold text-brand-green mb-2 flex items-center gap-2"><Icon className="h-4 w-4" />{area}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{description}</p>
                    <p className="text-sm"><span className="font-medium text-brand-orange">Implication: </span>{implications}</p>
                  </Card>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Test your understanding  - flip each card</h3>
                <p className="text-sm text-muted-foreground mb-3">Click each card to reveal what each frontier really means.</p>
                <FlipCardGrid
                  cards={[
                    {
                      title: "Multimodal AI",
                      prompt: "What changes when AI can work across text, image, audio, and video together?",
                      answer: "It becomes a more general interface to real work: you can show, say, and describe the same problem in one flow instead of splitting it across tools.",
                    },
                    {
                      title: "AI agents",
                      prompt: "What is the real frontier shift with agents?",
                      answer: "The frontier is moving from AI that answers questions to AI that can execute multi-step workflows on your behalf.",
                    },
                    {
                      title: "Reasoning models",
                      prompt: "Why do reasoning models matter?",
                      answer: "They spend more effort working through hard problems step by step, which improves performance on planning, logic, and analysis tasks.",
                    },
                    {
                      title: "On-device AI",
                      prompt: "Why is local AI important?",
                      answer: "Running models on-device can improve privacy, reduce latency, and broaden access beyond constant cloud connectivity.",
                    },
                  ]}
                />
              </div>
              <QuickCheckCard
                prompt="Which frontier is most directly about AI taking actions across a workflow instead of only answering once?"
                options={[
                  { id: "a", label: "Open-source models" },
                  { id: "b", label: "AI agents" },
                  { id: "c", label: "Image generation" },
                  { id: "d", label: "Spam filtering" },
                ]}
                correctOptionId="b"
                explanation="The module frames agents as the frontier where AI moves from one-shot responses into acting across multiple steps toward a goal."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: AGI */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">What Is AGI?</h2>
              <TextDisplay content="AGI  - Artificial General Intelligence  - refers to a hypothetical AI system that can perform any intellectual task that a human can, at human level or beyond. It does not exist yet. But it is the explicit goal of several major AI labs." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-4 text-brand-orange">Narrow AI vs. AGI</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold mb-2 text-brand-green">Narrow AI (what exists today)</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {[
                        "Excels at specific, well-defined tasks",
                        "Cannot generalise to tasks outside its training",
                        "Has no genuine understanding or goals",
                        "Is a tool  - it does what it is designed to do",
                        "Examples: ChatGPT, AlphaFold, DALL·E",
                      ].map((item) => <li key={item} className="flex gap-1"><span className="text-brand-green">*</span>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold mb-2 text-brand-orange">AGI (hypothetical)</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {[
                        "Can learn any task a human can learn",
                        "Transfers knowledge across domains fluidly",
                        "Potentially has genuine goals and agency",
                        "Would represent a fundamentally different kind of AI",
                        "Timeline: disputed  - years to decades to never",
                      ].map((item) => <li key={item} className="flex gap-1"><span className="text-brand-orange">*</span>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </Card>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">What Leading Experts Believe</h3>
                
              </div>
              <TextDisplay variant="callout" content="The practical takeaway: you do not need to know if or when AGI will arrive to benefit from AI today. Focus on what AI can do now, not on speculative timelines." />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: AI Governance */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Governance & Policy</h2>
              <TextDisplay content="Governments, regulators, and international organisations are racing to create frameworks for AI. The rules being written now will shape how AI is developed and deployed for decades." />
              <div className="space-y-4">
                {[
                  {
                    region: "European Union",
                    icon: Globe,
                    summary: "The EU AI Act (2024) is the world's first comprehensive AI law. It classifies AI systems by risk level  - from minimal risk (spam filters) to unacceptable risk (social scoring). High-risk AI in healthcare, hiring, and critical infrastructure faces strict transparency and auditing requirements.",
                    significance: "Sets a global precedent. Companies worldwide must comply when serving EU users  - similar to GDPR's global impact on data privacy.",
                  },
                  {
                    region: "United States",
                    icon: Globe,
                    summary: "The US has taken a lighter-touch, sector-by-sector approach. Biden's 2023 Executive Order on AI set safety requirements for frontier AI developers. The NIST AI Risk Management Framework provides voluntary guidelines. Congress has been slow to pass comprehensive legislation.",
                    significance: "The US approach prioritises innovation speed over comprehensive regulation  - creating a different risk profile compared to EU-regulated markets.",
                  },
                  {
                    region: "China",
                    icon: Globe,
                    summary: "China has enacted specific regulations on generative AI, deep synthesis (deepfakes), and recommendation algorithms. Domestic AI development is heavily state-supported, with restrictions on foreign AI services and requirements for content aligned with 'socialist core values'.",
                    significance: "China's approach prioritises state control and domestic AI champions  - creating a bifurcated global AI landscape.",
                  },
                  {
                    region: "International Efforts",
                    icon: Globe,
                    summary: "The UK's Bletchley Declaration (2023) brought 28 countries together on AI safety. The OECD AI Principles provide a framework adopted by 42 countries. The UN established an AI Advisory Body in 2023. G7 nations issued the Hiroshima AI Process principles.",
                    significance: "Global coordination is early and fragmented. AI governance remains primarily national  - creating compliance complexity for global AI deployments.",
                  },
                ].map(({ region, icon: Icon, summary, significance }) => (
                  <Card key={region} className="p-5">
                    <h3 className="font-bold text-brand-green mb-2 flex items-center gap-2"><Icon className="h-4 w-4" />{region}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{summary}</p>
                    <p className="text-sm"><span className="font-medium text-brand-orange">Significance: </span>{significance}</p>
                  </Card>
                ))}
              </div>
              <QuickCheckCard
                prompt="Why does AI governance remain complex for global companies?"
                options={[
                  { id: "a", label: "Because every major region is converging on identical rules" },
                  { id: "b", label: "Because AI governance is primarily national and still fragmented" },
                  { id: "c", label: "Because governance only affects open-source models" },
                  { id: "d", label: "Because regulation has already fully stabilized" },
                ]}
                correctOptionId="b"
                explanation="The section highlights a fragmented landscape: different countries and regions are regulating AI in different ways, which creates compliance complexity."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: AI Careers */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI Careers & Opportunities</h2>
              <TextDisplay content="The AI sector is creating a wide range of career opportunities  - from highly technical roles to roles that bridge AI and human expertise. You do not need to be a machine learning engineer to build a career in AI." />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    role: "AI/ML Engineer",
                    requires: "Strong coding (Python), maths, ML frameworks",
                    does: "Builds and trains AI models, deploys systems to production",
                    demand: "Very high",
                  },
                  {
                    role: "AI Product Manager",
                    requires: "Product experience, AI literacy, user research skills",
                    does: "Defines what AI products should do and why, bridges technical and business teams",
                    demand: "Very high",
                  },
                  {
                    role: "Prompt Engineer",
                    requires: "Writing, analytical thinking, domain expertise",
                    does: "Designs and optimises prompts for AI systems in specific domains",
                    demand: "High (evolving role)",
                  },
                  {
                    role: "AI Ethics & Policy",
                    requires: "Policy, law, philosophy, or social science background",
                    does: "Ensures AI systems are fair, transparent, and compliant with regulations",
                    demand: "Growing rapidly",
                  },
                  {
                    role: "Data Scientist",
                    requires: "Statistics, Python or R, domain expertise",
                    does: "Analyses data, builds predictive models, surfaces insights for decisions",
                    demand: "High and stable",
                  },
                  {
                    role: "AI Trainer / RLHF Specialist",
                    requires: "Domain expertise (law, medicine, finance, etc.), careful attention to detail",
                    does: "Evaluates AI outputs, provides feedback to improve model quality",
                    demand: "High, especially with domain expertise",
                  },
                  {
                    role: "AI-Augmented Domain Expert",
                    requires: "Deep expertise in any field + AI fluency",
                    does: "Applies AI to accelerate work in their domain  - the most accessible entry point",
                    demand: "Growing across every industry",
                  },
                  {
                    role: "AI Educator & Communicator",
                    requires: "AI literacy, teaching or communication skills",
                    does: "Helps organisations and individuals understand and adopt AI effectively",
                    demand: "High and underserved",
                  },
                ].map(({ role, requires, does, demand }) => (
                  <Card key={role} className="p-4">
                    <h4 className="font-bold text-brand-orange mb-2">{role}</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><span className="font-medium text-foreground">Requires: </span>{requires}</p>
                      <p><span className="font-medium text-foreground">Does: </span>{does}</p>
                      <p><span className="font-medium text-brand-green">Demand: </span>{demand}</p>
                    </div>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The most accessible career move for most people: become the most AI-fluent person in your current domain. You do not need to switch careers  - you need to become the bridge between AI capability and your industry's expertise." />
              
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Your AI Future */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Your AI Future</h2>
              <TextDisplay variant="success" content="You have completed the full Introduction to AI course. You now understand not just where AI is today  - but where it is heading and how to position yourself for what comes next." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />The mindset that matters most</h3>
                <div className="space-y-3">
                  {[
                    {
                      principle: "Stay curious, not anxious",
                      desc: "The people who will thrive in the AI era are those who approach it with curiosity rather than fear. AI is a tool  - and like every powerful tool in history, it rewards those who learn to use it well.",
                    },
                    {
                      principle: "Embrace continuous learning",
                      desc: "AI capabilities are evolving too fast for any course to stay fully current. The skill is not knowing everything about AI  - it is developing the habit of staying current and updating your mental model continuously.",
                    },
                    {
                      principle: "Develop judgment, not just skills",
                      desc: "The rarest and most valuable skill in the AI era is good judgment: knowing when to trust AI, when to override it, and how to deploy it ethically and responsibly. This cannot be automated.",
                    },
                    {
                      principle: "Stay human",
                      desc: "What makes you uniquely valuable will not be the tasks AI can do faster  - it will be your relationships, your creativity, your ethical reasoning, and your ability to bring genuine human insight to complex situations.",
                    },
                  ].map(({ principle, desc }) => (
                    <div key={principle} className="border-l-2 border-brand-green pl-4">
                      <p className="font-semibold text-brand-green">{principle}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 text-center">
                <h3 className="text-2xl font-bold mb-3">The AI era belongs to the curious.</h3>
                <p className="text-muted-foreground mb-4">You have built the foundation. Now the real learning begins  - in the real world, with real tools, on real problems.</p>
                <p className="text-lg font-semibold text-brand-orange">Go explore what is possible.</p>
              </Card>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                  onClick={handleSectionComplete}
                >
                  Complete Module 9 ?
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/course")}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}

          {/* 6: Module Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Test your understanding of AI's future trajectory. Choose the best answer for each question." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Outstanding! You have completed Module 9 and the full course. You now have a solid grounding in AI  - from the fundamentals through to the future. The real learning begins when you go apply it." />
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSectionComplete}
                      size="lg"
                      className="bg-brand-green hover:bg-brand-green/90 text-white"
                    >
                      Complete Course
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push("/course")}>
                      Back to Dashboard
                    </Button>
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


