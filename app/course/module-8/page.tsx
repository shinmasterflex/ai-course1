/**
 * MODULE 8: THE FUTURE OF AI
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
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Rocket, Globe, Star, Brain } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"

export default function Module8Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-8"
  const { handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3"])
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
      router.push(`/course/module-8?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 8: The Future of AI</h1>
            <p className="text-lg text-muted-foreground mb-4">Where AI is heading — and how to prepare for what comes next</p>
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
                  "What AGI is — and why experts disagree about its timeline",
                  "How governments are responding to AI with policy and regulation",
                  "Career paths and opportunities in the AI era",
                  "How to orient yourself for a rapidly changing technological future",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module →</Button>
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
                    description: "AI systems that can process and generate text, images, audio, and video simultaneously — not as separate models but as unified systems. GPT-4o and Gemini Ultra can see, listen, and respond in real time.",
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
                    implications: "AI is becoming a genuine scientific collaborator — not just analysing existing data, but generating hypotheses and designing experiments. This will dramatically compress the timeline for major scientific breakthroughs.",
                  },
                  {
                    area: "Reasoning Models",
                    icon: Brain,
                    description: "Models like OpenAI o1 and o3, Google Gemini 2.0 Flash Thinking spend time 'thinking through' problems step by step before answering — dramatically improving performance on complex mathematical and logical tasks.",
                    implications: "AI moving from pattern-matching to genuine reasoning changes what tasks AI can tackle reliably. Complex analysis, strategic planning, and scientific problem-solving become increasingly AI-accessible.",
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
                <h3 className="text-xl font-semibold mb-1">Test your understanding — flip each card</h3>
                <p className="text-sm text-muted-foreground mb-3">Click each card to reveal what each frontier really means.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <FlipCard
                    front="What can Multimodal AI do that text-only AI cannot?"
                    back="Multimodal AI can see, listen, and respond across multiple input types simultaneously. GPT-4o can examine a photo of a broken appliance and explain how to fix it. Gemini Ultra can listen to a live conversation and respond in real time. The next generation of AI assistants will be voice-first, vision-enabled — not just chat boxes."
                  />
                  <FlipCard
                    front="What is an AI Agent — and how is it different from ChatGPT?"
                    back="ChatGPT responds to questions. An AI Agent takes actions. Agents can browse the web, write and execute code, send emails, fill out forms, and complete multi-step tasks autonomously — without you doing each step. The shift from AI as a tool to AI as a contractor who actually does the work."
                  />
                  <FlipCard
                    front="What did AlphaFold actually solve — and why does it matter?"
                    back="The protein folding problem. Proteins are the molecular machines that do almost everything in your body. Their function is determined by their 3D shape — but figuring out that shape from the amino acid sequence took years of expensive lab work. AlphaFold solved this in 2020, unlocking a new era of drug discovery and materials science."
                  />
                  <FlipCard
                    front="What makes Reasoning Models different from regular LLMs?"
                    back="Standard LLMs predict the next token immediately. Reasoning models like OpenAI o1/o3 and Gemini 2.0 Flash Thinking spend time 'thinking' — running through multiple internal reasoning steps before producing an answer. This dramatically improves performance on hard maths, logic, and multi-step planning. Slower, but significantly more accurate on complex problems."
                  />
                </div>
              </div>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Check your understanding</h3>
                <MultipleChoice
                  question="An AI system browses the internet, drafts a report, and emails it to your team — all triggered by a single instruction from you. What type of AI system is this?"
                  options={[
                    { text: "A Multimodal AI", isCorrect: false, feedback: "Multimodal AI processes multiple types of input (text, images, audio) — that is about perception, not taking autonomous actions." },
                    { text: "A Reasoning Model", isCorrect: false, feedback: "Reasoning models think through problems step by step before answering, but they still just produce text — they do not take actions autonomously." },
                    { text: "An AI Agent", isCorrect: true, feedback: "Correct. AI Agents are defined by their ability to take actions — browsing, writing, executing code, sending messages — not just answer questions. This is the defining capability of the agentic AI frontier." },
                    { text: "Scientific AI", isCorrect: false, feedback: "Scientific AI refers to AI applied to research problems like drug discovery and protein folding — not workflow automation." },
                  ]}
                  explanation="AI Agents represent the shift from AI as a tool (you type, AI responds) to AI as an autonomous actor (AI plans and executes multi-step workflows on your behalf). This is one of the most significant capability jumps in current AI development."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 2: AGI */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">What Is AGI?</h2>
              <TextDisplay content="AGI — Artificial General Intelligence — refers to a hypothetical AI system that can perform any intellectual task that a human can, at human level or beyond. It does not exist yet. But it is the explicit goal of several major AI labs." />
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
                        "Is a tool — it does what it is designed to do",
                        "Examples: ChatGPT, AlphaFold, DALL·E",
                      ].map((item) => <li key={item} className="flex gap-1"><span className="text-brand-green">•</span>{item}</li>)}
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
                        "Timeline: disputed — years to decades to never",
                      ].map((item) => <li key={item} className="flex gap-1"><span className="text-brand-orange">•</span>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </Card>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">What Leading Experts Believe</h3>
                <Flashcard cards={[
                  { id: "optimists", front: "The optimists (Altman, Hassabis, LeCun-ish)", back: "Sam Altman has suggested AGI may arrive within a few years. Demis Hassabis (DeepMind) believes it is within reach this decade. Optimists point to the rapid capability jumps in recent years and argue current approaches, scaled further, could reach AGI." },
                  { id: "skeptics", front: "The skeptics (Gary Marcus, Yann LeCun)", back: "Many researchers argue current LLMs are fundamentally incapable of true understanding and reasoning. They believe new architectural breakthroughs — not just scaling — are needed. Some say AGI is decades away; others question whether the concept is even coherent." },
                  { id: "safety", front: "The safety camp (Yoshua Bengio, Stuart Russell)", back: "Some who believe AGI is achievable are most concerned about whether we can make it safe. They argue the gap between 'AGI is possible' and 'AGI is aligned with human values' is the most important unsolved problem in AI research." },
                  { id: "honest", front: "What we actually know", back: "Nobody knows the timeline with confidence. AI capabilities have consistently surprised experts — both by advancing faster than expected in some areas and slower in others. The honest answer: AGI may or may not arrive in your lifetime, and the definition of what 'counts' as AGI is itself contested." },
                ]} />
              </div>
              <TextDisplay variant="callout" content="The practical takeaway: you do not need to know if or when AGI will arrive to benefit from AI today. Focus on what AI can do now, not on speculative timelines." />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
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
                    summary: "The EU AI Act (2024) is the world's first comprehensive AI law. It classifies AI systems by risk level — from minimal risk (spam filters) to unacceptable risk (social scoring). High-risk AI in healthcare, hiring, and critical infrastructure faces strict transparency and auditing requirements.",
                    significance: "Sets a global precedent. Companies worldwide must comply when serving EU users — similar to GDPR's global impact on data privacy.",
                  },
                  {
                    region: "United States",
                    icon: Globe,
                    summary: "The US has taken a lighter-touch, sector-by-sector approach. Biden's 2023 Executive Order on AI set safety requirements for frontier AI developers. The NIST AI Risk Management Framework provides voluntary guidelines. Congress has been slow to pass comprehensive legislation.",
                    significance: "The US approach prioritises innovation speed over comprehensive regulation — creating a different risk profile compared to EU-regulated markets.",
                  },
                  {
                    region: "China",
                    icon: Globe,
                    summary: "China has enacted specific regulations on generative AI, deep synthesis (deepfakes), and recommendation algorithms. Domestic AI development is heavily state-supported, with restrictions on foreign AI services and requirements for content aligned with 'socialist core values'.",
                    significance: "China's approach prioritises state control and domestic AI champions — creating a bifurcated global AI landscape.",
                  },
                  {
                    region: "International Efforts",
                    icon: Globe,
                    summary: "The UK's Bletchley Declaration (2023) brought 28 countries together on AI safety. The OECD AI Principles provide a framework adopted by 42 countries. The UN established an AI Advisory Body in 2023. G7 nations issued the Hiroshima AI Process principles.",
                    significance: "Global coordination is early and fragmented. AI governance remains primarily national — creating compliance complexity for global AI deployments.",
                  },
                ].map(({ region, icon: Icon, summary, significance }) => (
                  <Card key={region} className="p-5">
                    <h3 className="font-bold text-brand-green mb-2 flex items-center gap-2"><Icon className="h-4 w-4" />{region}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{summary}</p>
                    <p className="text-sm"><span className="font-medium text-brand-orange">Significance: </span>{significance}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Check your understanding</h3>
                <MultipleChoice
                  question="What is the primary purpose of the EU AI Act?"
                  options={[
                    { text: "To ban all AI systems that could be used for surveillance", isCorrect: false, feedback: "The EU AI Act bans specific high-risk uses like real-time biometric surveillance in public spaces, but does not ban surveillance AI broadly. It takes a risk-based approach." },
                    { text: "To regulate AI systems by risk level — imposing stricter requirements on higher-risk applications", isCorrect: true, feedback: "Correct. The EU AI Act classifies AI systems into four risk categories (unacceptable, high, limited, minimal) and imposes requirements proportionate to risk level." },
                    { text: "To promote European AI development by subsidising domestic AI companies", isCorrect: false, feedback: "The EU AI Act is primarily a regulatory framework, not an investment or subsidy programme. Separate EU initiatives address AI investment and development." },
                    { text: "To establish a single European AI company to compete with US and Chinese providers", isCorrect: false, feedback: "The EU AI Act is regulation, not an industrial policy to create a single AI company. Several EU programmes support AI research and startups separately." },
                  ]}
                  explanation="The EU AI Act uses a risk-based approach: AI applications are categorised by their potential harm, with the most rigorous requirements for AI used in high-stakes decisions about people's lives (healthcare, employment, criminal justice, critical infrastructure)."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 4: AI Careers */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AI Careers & Opportunities</h2>
              <TextDisplay content="The AI sector is creating a wide range of career opportunities — from highly technical roles to roles that bridge AI and human expertise. You do not need to be a machine learning engineer to build a career in AI." />
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
                    does: "Applies AI to accelerate work in their domain — the most accessible entry point",
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
              <TextDisplay variant="callout" content="The most accessible career move for most people: become the most AI-fluent person in your current domain. You do not need to switch careers — you need to become the bridge between AI capability and your industry's expertise." />
              <MatchingGame
                title="Match the AI career role to its core activity"
                pairs={[
                  { left: "AI/ML Engineer", right: "Builds and trains AI models" },
                  { left: "Prompt Engineer", right: "Designs prompts to get reliable outputs in specific domains" },
                  { left: "AI Ethics & Policy", right: "Ensures AI is fair, transparent, and regulation-compliant" },
                  { left: "AI Trainer / RLHF", right: "Rates AI outputs to improve model quality" },
                  { left: "AI Product Manager", right: "Bridges technical AI teams and business goals" },
                ]}
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 5: Your AI Future */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Your AI Future</h2>
              <TextDisplay variant="success" content="You have completed the full Introduction to AI course. You now understand not just where AI is today — but where it is heading and how to position yourself for what comes next." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />The mindset that matters most</h3>
                <div className="space-y-3">
                  {[
                    {
                      principle: "Stay curious, not anxious",
                      desc: "The people who will thrive in the AI era are those who approach it with curiosity rather than fear. AI is a tool — and like every powerful tool in history, it rewards those who learn to use it well.",
                    },
                    {
                      principle: "Embrace continuous learning",
                      desc: "AI capabilities are evolving too fast for any course to stay fully current. The skill is not knowing everything about AI — it is developing the habit of staying current and updating your mental model continuously.",
                    },
                    {
                      principle: "Develop judgment, not just skills",
                      desc: "The rarest and most valuable skill in the AI era is good judgment: knowing when to trust AI, when to override it, and how to deploy it ethically and responsibly. This cannot be automated.",
                    },
                    {
                      principle: "Stay human",
                      desc: "What makes you uniquely valuable will not be the tasks AI can do faster — it will be your relationships, your creativity, your ethical reasoning, and your ability to bring genuine human insight to complex situations.",
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
                <p className="text-muted-foreground mb-4">You have built the foundation. Now the real learning begins — in the real world, with real tools, on real problems.</p>
                <p className="text-lg font-semibold text-brand-orange">Go explore what is possible.</p>
              </Card>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                  onClick={handleSectionComplete}
                >
                  Complete Module 8 ✓
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
              <div className="space-y-6">
                <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                  <MultipleChoice
                    question="What is the key difference between 'narrow AI' and 'artificial general intelligence' (AGI)?"
                    options={[
                      { text: "Narrow AI can only process text, while AGI can process images and audio too", isCorrect: false, feedback: "This is not the distinction. Today's narrow AI systems (like GPT-4o) can already process text, images, and audio. The narrow/AGI distinction is about generalisation, not modality." },
                      { text: "Narrow AI excels at specific tasks it was designed for; AGI could perform any intellectual task a human can", isCorrect: true, feedback: "Correct. Narrow AI is purpose-built and cannot genuinely generalise. AGI — which does not yet exist — would be able to learn and perform any intellectual task a human can." },
                      { text: "Narrow AI is used by businesses; AGI is only used by researchers", isCorrect: false, feedback: "AGI does not currently exist in any form, commercial or research. All AI systems deployed today are narrow AI, including cutting-edge research systems." },
                      { text: "Narrow AI requires internet connectivity; AGI can work offline", isCorrect: false, feedback: "Connectivity requirements are an infrastructure detail unrelated to the narrow AI vs. AGI distinction." },
                    ]}
                    explanation="The narrow/AGI distinction is about generalisation and transfer. Narrow AI — even very powerful narrow AI like GPT-4o — is trained for specific tasks and cannot genuinely generalise the way humans do. AGI, which remains hypothetical, would have human-like general problem-solving ability across any domain."
                    onComplete={(c) => handleQuizComplete("quiz1", c)}
                  />
                </Card>
                <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                  <MultipleChoice
                    question="Which career approach is MOST accessible for someone who wants to work in AI but does not have a technical background?"
                    options={[
                      { text: "Immediately enrol in a computer science degree to learn machine learning from scratch", isCorrect: false, feedback: "This is one valid path, but it takes years and is not the most accessible option. Many impactful AI roles do not require deep technical training." },
                      { text: "Become the most AI-fluent expert in your current field, bridging AI capability and domain expertise", isCorrect: true, feedback: "Correct. This is the most accessible and often most impactful path. Organisations desperately need people who can bridge AI capability and real-world domain expertise — whether in law, medicine, education, finance, or any other field." },
                      { text: "Focus on AI ethics and wait for technical roles to become less specialised", isCorrect: false, feedback: "AI ethics is a real and growing field, but 'waiting' is not a strategy. And AI roles are not converging toward less specialisation — they are diversifying." },
                      { text: "Start a company to build competing AI models", isCorrect: false, feedback: "Building foundation models requires hundreds of millions of dollars and deep technical teams. This is not an accessible path for most people." },
                    ]}
                    explanation="The most accessible and often most valuable AI career move is becoming the bridge between AI and your existing domain. Organisations across every industry need people who deeply understand both the field and how AI can be applied to it — and this does not require becoming an ML engineer."
                    onComplete={(c) => handleQuizComplete("quiz2", c)}
                  />
                </Card>
                <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                  <MultipleChoice
                    question="An AI system that can browse the web, write code, and send emails autonomously — all from one instruction — is best described as which type of AI?"
                    options={[
                      { text: "A Multimodal AI", isCorrect: false, feedback: "Multimodal AI processes multiple input types (text, images, audio) simultaneously — that is about perception, not autonomous action-taking across external systems." },
                      { text: "A Reasoning Model", isCorrect: false, feedback: "Reasoning models like o1/o3 think through problems step by step before answering, but they still produce text responses — they do not autonomously take actions in the world." },
                      { text: "An AI Agent", isCorrect: true, feedback: "Correct! AI Agents take actions — browsing, executing code, sending messages, managing files — not just generating text. This is the defining capability of agentic AI and one of the most significant current frontiers." },
                      { text: "Artificial General Intelligence", isCorrect: false, feedback: "AGI would have human-level general intelligence across all domains and does not yet exist. Agents are a specific architecture for autonomous action — not general intelligence." },
                    ]}
                    explanation="AI Agents represent the shift from AI as a conversational tool to AI as an autonomous actor. Unlike standard LLMs that produce text, agents plan and execute multi-step workflows — browsing, writing, calling APIs, sending messages — all triggered by a single high-level instruction."
                    onComplete={(c) => handleQuizComplete("quiz3", c)}
                  />
                </Card>
              </div>
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Outstanding! You have completed Module 8 and the full course. You now have a solid grounding in AI — from the fundamentals through to the future. The real learning begins when you go apply it." />
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSectionComplete}
                      size="lg"
                      className="bg-brand-green hover:bg-brand-green/90 text-white"
                    >
                      Complete Course ✓
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
