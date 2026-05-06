/**
 * MODULE 10: THE FUTURE OF AI
 */

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DragSortChallenge, FlipCardGrid, MatchingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Brain, Briefcase, CheckCircle2, Globe, Rocket, Shield } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module10Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-10"
  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3"])
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
      if (idx !== -1 && idx !== currentSectionIndex) {
        setCurrentSectionIndex(idx)
      }
    }
  }, [currentSectionIndex, sectionParam, sections])

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [4],
  })

  const handleSectionComplete = () => {
    if (!canAdvance) {
      return
    }

    const current = sections[currentSectionIndex]
    if (current) {
      markSectionComplete(MODULE_ID, current.id)
      setCurrentPosition(MODULE_ID, current.id)
    }

    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-10?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 10: The Future of AI</h1>
            <p className="text-lg text-muted-foreground mb-4">A forward-looking but grounded guide to what AI may become and how you can prepare.</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 10"
              title="Think clearly about what comes next"
              description="Explore frontier AI trends, AGI uncertainty, policy challenges, and realistic pathways to stay valuable in an AI-shaped economy."
              imageSrc="/images/modules/module-10.jpg"
              imageAlt="Future of AI and innovation"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay
                variant="callout"
                content="This final module does not try to predict one perfect future. Instead, it helps you reason under uncertainty: what is already changing, what is still unknown, and what actions make sense either way."
              />
              <Card className="p-5 space-y-2">
                {[
                  "Current frontiers: multimodal AI, agents, and robotics",
                  "AGI explained carefully: definition, uncertainty, and practical stance",
                  "Governance and policy challenges that shape deployment",
                  "Career pathways in AI for technical and non-technical learners",
                  "A stay-relevant framework plus your personal 1-3 year AI strategy",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Start Module
              </Button>
            </div>
          )}

          {/* 1: Current Frontiers */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Current Frontiers: What Is Advancing Now</h2>
              <TextDisplay content="Think of frontiers as edges where capability is improving quickly. You do not need to be a researcher to track them. You need simple mental models for what each frontier changes in real work." />
              <div className="space-y-4">
                {[
                  {
                    area: "Multimodal AI",
                    icon: Brain,
                    description: "One model handles text, images, audio, and video in a single conversation. You can talk, show a screenshot, and ask for a structured output in one flow.",
                    implications: "Work becomes more natural. AI moves closer to being an all-purpose interface instead of separate single-mode tools.",
                  },
                  {
                    area: "AI Agents",
                    icon: Rocket,
                    description: "Agents can plan and execute multi-step tasks: gather data, call tools, update files, and report progress. They are still imperfect and need guardrails.",
                    implications: "The shift is from AI that answers once to AI that performs workflow chunks with human supervision.",
                  },
                  {
                    area: "Robotics + AI",
                    icon: Bot,
                    description: "Robots are gaining stronger perception and decision-making through foundation models. Warehouses, labs, and factories are leading adoption first.",
                    implications: "Physical-world automation grows gradually. Most near-term impact is in structured environments, not general-purpose home robots.",
                  },
                  {
                    area: "Reasoning and Planning Models",
                    icon: Brain,
                    description: "Some models spend extra compute to reason through harder problems, improving performance on planning, coding, and analysis tasks.",
                    implications: "Higher reliability on complex work, but still not perfect truth machines. Verification remains essential.",
                  },
                  {
                    area: "Smaller and Local Models",
                    icon: Shield,
                    description: "More capable models now run on laptops and phones. That can reduce latency, lower cost, and improve privacy for sensitive tasks.",
                    implications: "Expect a hybrid future: cloud for heavy tasks, local AI for fast or private tasks.",
                  },
                ].map(({ area, icon: Icon, description, implications }) => (
                  <Card key={area} className="p-5">
                    <h3 className="font-bold text-brand-green mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {area}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{description}</p>
                    <p className="text-sm">
                      <span className="font-medium text-brand-orange">Practical impact: </span>
                      {implications}
                    </p>
                  </Card>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-1">Quick frontier recap</h3>
                <p className="text-sm text-muted-foreground mb-3">Hover each card to connect each frontier with its real-world consequence.</p>
                <FlipCardGrid
                  cards={[
                    {
                      title: "Multimodal",
                      prompt: "What changes when one model handles text, image, and audio together?",
                      answer: "AI becomes a more natural interface for real tasks, because you can combine ways of communicating in one workflow.",
                    },
                    {
                      title: "Agents",
                      prompt: "What is the key shift with agentic AI?",
                      answer: "The system can execute task sequences toward a goal, not only provide one-shot answers.",
                    },
                    {
                      title: "Robotics",
                      prompt: "Where is robotics + AI strongest in the near term?",
                      answer: "Structured environments like logistics, manufacturing, and controlled operations.",
                    },
                    {
                      title: "Local models",
                      prompt: "Why does on-device AI matter?",
                      answer: "It can improve privacy and speed, and it reduces dependence on constant cloud access.",
                    },
                  ]}
                />
              </div>

              <QuickCheckCard
                prompt="Which frontier most directly expands AI from digital tasks into physical-world tasks?"
                options={[
                  { id: "a", label: "Robotics + AI" },
                  { id: "b", label: "Prompt formatting" },
                  { id: "c", label: "Spam filtering" },
                  { id: "d", label: "Grammar correction" },
                ]}
                correctOptionId="a"
                                optionExplanations={{
          a: "Robotics + AI brings AI capability into physical systems, especially in structured environments.",
          b: "Prompt formatting is a technique for improving AI input quality, not a physical-world expansion.",
          c: "Spam filtering is a decades-old AI application in the digital domain. It does not expand AI into physical tasks.",
          d: "Grammar correction is a natural language processing application — it operates only in the digital text domain.",
        }}
                explanation="Robotics + AI brings AI capability into physical systems, especially in structured environments."
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {/* 2: AGI */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">AGI: Useful Concept, Uncertain Reality</h2>
              <TextDisplay content="AGI means Artificial General Intelligence: a hypothetical system that can learn and perform most intellectual tasks at human level across domains. It is not a single feature upgrade. It would be a major shift in capability." />

              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-4 text-brand-orange">Narrow AI today vs AGI concept</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold mb-2 text-brand-green">Narrow AI (today)</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {[
                        "Strong at specific tasks with clear prompts",
                        "Can fail outside familiar patterns",
                        "Needs human goals, context, and checks",
                        "Examples: coding copilots, image models, recommendation systems",
                      ].map((item) => (
                        <li key={item} className="flex gap-1">
                          <span className="text-brand-green">*</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold mb-2 text-brand-orange">AGI (hypothetical)</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {[
                        "General capability across many domains",
                        "Flexible transfer of knowledge to new tasks",
                        "More autonomous long-horizon problem solving",
                        "Timeline and feasibility remain debated",
                      ].map((item) => (
                        <li key={item} className="flex gap-1">
                          <span className="text-brand-orange">*</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Why uncertainty is normal (not a failure)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Definition uncertainty:</span> People mean different things by AGI.</p>
                  <p><span className="font-medium text-foreground">Technical uncertainty:</span> We do not know if current methods scale to full generality.</p>
                  <p><span className="font-medium text-foreground">Measurement uncertainty:</span> Benchmarks can improve faster than real-world reliability.</p>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">A no-hype stance you can use</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. Use AI that works today for real productivity.</p>
                  <p>2. Track capabilities and risks quarterly, not hourly.</p>
                  <p>3. Make plans that stay useful across multiple futures.</p>
                </div>
              </Card>

              <QuickCheckCard
                prompt="What is the strongest practical response to AGI uncertainty?"
                options={[
                  { id: "a", label: "Ignore current AI until AGI is proven" },
                  { id: "b", label: "Adopt no AI tools because predictions conflict" },
                  { id: "c", label: "Use present-day AI while planning for multiple future scenarios" },
                  { id: "d", label: "Assume one forecast is certainly correct" },
                ]}
                correctOptionId="c"
                                optionExplanations={{
          a: "Ignoring current AI while waiting for AGI means missing years of compounding productivity and skill benefits.",
          b: "Avoiding all AI tools because predictions conflict is a false choice. You can use today's AI while planning adaptively for the future.",
          c: "A grounded approach captures current value while avoiding overcommitment to any single AGI prediction.",
          d: "No single AGI forecast should be treated as certain. Locking in plans around one prediction is brittle.",
        }}
                explanation="A grounded approach captures current value while avoiding overcommitment to any single AGI prediction."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {/* 3: AI Governance */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Governance and Policy Challenges</h2>
              <TextDisplay content="AI policy is hard because innovation is global and fast, while law is local and slower. Good governance tries to reduce harm without blocking useful innovation." />

              <div className="space-y-4">
                {[
                  {
                    challenge: "Safety and reliability",
                    detail: "How do we test frontier systems before deployment in high-stakes use cases like healthcare or infrastructure?",
                    lever: "Pre-deployment evaluations, incident reporting, and sector-specific standards.",
                  },
                  {
                    challenge: "Accountability",
                    detail: "When AI causes harm, who is responsible: model provider, integrator, or deploying organization?",
                    lever: "Clear liability rules, audit trails, and documented human oversight.",
                  },
                  {
                    challenge: "Jobs and transition",
                    detail: "Automation can displace tasks unevenly across sectors and regions.",
                    lever: "Reskilling funds, transition support, and education reform for AI-era skills.",
                  },
                  {
                    challenge: "Power concentration",
                    detail: "Compute, data, and top talent are concentrated in a small number of firms and countries.",
                    lever: "Competition policy, open standards, and public-interest research access.",
                  },
                  {
                    challenge: "Information integrity",
                    detail: "Synthetic media can improve creativity but also increase fraud, deepfakes, and trust erosion.",
                    lever: "Content provenance standards, platform safeguards, and digital literacy at scale.",
                  },
                ].map(({ challenge, detail, lever }) => (
                  <Card key={challenge} className="p-5">
                    <h3 className="font-bold text-brand-green mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {challenge}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{detail}</p>
                    <p className="text-sm">
                      <span className="font-medium text-brand-orange">Policy response: </span>
                      {lever}
                    </p>
                  </Card>
                ))}
              </div>

              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">What this means for practitioners</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Expect more evidence requirements for high-risk AI use.</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Design for auditability: document prompts, data sources, and human review steps.</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Global products must handle different regional rules, not one universal policy playbook.</li>
                </ul>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-1">Match challenge to policy response</h3>
                <p className="text-sm text-muted-foreground mb-4">Click a challenge, then click its most direct policy lever.</p>
                <MatchingChallenge
                  pairs={[
                    { left: "Safety and reliability", right: "Pre-deployment evaluations and incident reporting" },
                    { left: "Accountability", right: "Liability rules and audit trails" },
                    { left: "Jobs and transition", right: "Reskilling and education support" },
                    { left: "Power concentration", right: "Competition policy and open standards" },
                    { left: "Information integrity", right: "Provenance tools and platform safeguards" },
                  ]}
                  accentClassName="border-brand-green/20 bg-brand-green/5"
                />
              </div>

              <QuickCheckCard
                prompt="Why is AI governance difficult to standardize globally?"
                options={[
                  { id: "a", label: "Because AI systems are already identical everywhere" },
                  { id: "b", label: "Because innovation is global, but legal systems and values differ by region" },
                  { id: "c", label: "Because policy applies only to startups" },
                  { id: "d", label: "Because AI has no social impact" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "AI systems vary significantly by provider, region, and application. They are far from identical everywhere.",
          b: "Governance complexity comes from cross-border technology combined with region-specific law, institutions, and priorities.",
          c: "AI governance applies to all organisations deploying AI, not just startups.",
          d: "AI has significant social impact across employment, healthcare, finance, and information integrity. That impact is exactly why governance is difficult.",
        }}
                explanation="Governance complexity comes from cross-border technology combined with region-specific law, institutions, and priorities."
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {/* 4: Careers and Relevance */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Career Pathways and Staying Relevant</h2>
              <TextDisplay content="AI careers are broader than many learners assume. The strongest path is often your existing domain expertise plus practical AI fluency, not a total reinvention overnight." />

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                  <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Briefcase className="h-4 w-4" />Technical pathways</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">ML Engineer:</span> model training, evaluation, and deployment.</p>
                    <p><span className="font-medium text-foreground">AI Application Engineer:</span> building agentic and multimodal products.</p>
                    <p><span className="font-medium text-foreground">MLOps / Platform:</span> reliability, tooling, monitoring, and cost control.</p>
                    <p><span className="font-medium text-foreground">AI Research Support:</span> benchmarking, datasets, and experimentation pipelines.</p>
                  </div>
                </Card>

                <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Non-technical pathways</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">AI Product Manager:</span> aligning use cases, users, and delivery.</p>
                    <p><span className="font-medium text-foreground">AI Policy / Governance:</span> risk controls, compliance, and accountability.</p>
                    <p><span className="font-medium text-foreground">Operations + Automation Lead:</span> redesigning workflows with AI tools.</p>
                    <p><span className="font-medium text-foreground">Domain AI Specialist:</span> applying AI deeply in law, health, finance, education, and more.</p>
                  </div>
                </Card>
              </div>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">How to stay relevant: the C-T-A framework</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">C - Continuous learning:</span> run a weekly learning loop (new capability, one test, one note, one takeaway).</p>
                  <p><span className="font-medium text-foreground">T - Tool fluency:</span> be competent with at least one chat model, one automation tool, and one domain-specific AI workflow.</p>
                  <p><span className="font-medium text-foreground">A - Adaptability:</span> redesign your role around higher-value decisions and collaboration, not only current tasks.</p>
                </div>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-1">Build the monthly relevance loop</h3>
                <p className="text-sm text-muted-foreground mb-4">Arrange the sequence that keeps your skills current and practical.</p>
                <DragSortChallenge
                  items={[
                    "Run one focused experiment with a new AI capability",
                    "Pick one role-relevant workflow to improve",
                    "Document what worked, failed, and why",
                    "Apply the best change to real work",
                    "Review impact and set next month's focus",
                  ]}
                  correctOrder={[
                    "Pick one role-relevant workflow to improve",
                    "Run one focused experiment with a new AI capability",
                    "Document what worked, failed, and why",
                    "Apply the best change to real work",
                    "Review impact and set next month's focus",
                  ]}
                  accentClassName="border-brand-orange/20 bg-brand-orange/5"
                />
              </div>

              <QuickCheckCard
                prompt="Which strategy is most resilient for long-term AI career growth?"
                options={[
                  { id: "a", label: "Master one tool once and stop updating" },
                  { id: "b", label: "Rely only on AI news without hands-on practice" },
                  { id: "c", label: "Combine domain depth with continuous tool experimentation" },
                  { id: "d", label: "Wait for certainty before building any AI skills" },
                ]}
                correctOptionId="c"
                                optionExplanations={{
          a: "AI tools evolve rapidly. Mastering one and stopping quickly makes your skills outdated.",
          b: "Consuming AI news without hands-on practice creates awareness without capability.",
          c: "Durable advantage comes from domain expertise plus repeated practical adaptation, not static tool knowledge.",
          d: "Waiting for certainty in a fast-moving field means waiting forever. The right move is structured, adaptive learning.",
        }}
                explanation="Durable advantage comes from domain expertise plus repeated practical adaptation, not static tool knowledge."
                onAnswered={() => {
                  markSectionInteractionComplete(4)
                }}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the careers checkpoint to unlock the final strategy section.</p> : null}

              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Next
              </Button>
            </div>
          )}

          {/* 5: Personal AI Strategy */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Reflective Exercise: Your 1-3 Year AI Strategy</h2>
              <TextDisplay variant="success" content="You now have the concepts. This final exercise turns them into a personal plan you can actually execute." />

              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Part 1: Clarify your direction</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Role target:</span> What role or capability do you want to be known for in 12-36 months?</p>
                  <p><span className="font-medium text-foreground">Value focus:</span> Which business or human problem do you want to solve better with AI?</p>
                  <p><span className="font-medium text-foreground">Risk boundary:</span> What types of AI use are off-limits for you ethically or legally?</p>
                </div>
              </Card>

              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Part 2: Build a timeline</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Next 90 days:</span> one concrete project, one measurable outcome, one accountability partner.</p>
                  <p><span className="font-medium text-foreground">1 year:</span> portfolio evidence of applied AI (case study, workflow, or shipped feature).</p>
                  <p><span className="font-medium text-foreground">3 years:</span> clear positioning as a specialist, builder, or leader in AI-enabled work.</p>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Part 3: Define your operating cadence</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. Weekly: learn and test one new capability.</p>
                  <p>2. Monthly: improve one workflow and document impact.</p>
                  <p>3. Quarterly: update your plan based on what is changing in tools, policy, and your industry.</p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-bold mb-2">Personal strategy prompt</h3>
                <p className="text-muted-foreground mb-3">Complete this sentence in your own words:</p>
                <p className="text-lg font-semibold text-brand-orange">"Over the next 1-3 years, I will use AI to create value in <span className="underline decoration-brand-green/50">[my domain]</span> by building <span className="underline decoration-brand-green/50">[specific capabilities]</span> while maintaining <span className="underline decoration-brand-green/50">[ethical and quality standards]</span>."</p>
              </Card>

              <div className="flex gap-4">
                <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white" onClick={handleSectionComplete}>
                  Complete Module 10
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/course")}>Back to Dashboard</Button>
              </div>
            </div>
          )}

          {/* 6: Module Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Test your understanding of frontier AI, AGI uncertainty, governance, and career strategy." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent work. You have completed Module 10 and the full course with a practical strategy for what comes next." />
                  <div className="flex gap-4">
                    <Button onClick={handleSectionComplete} size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white">
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
