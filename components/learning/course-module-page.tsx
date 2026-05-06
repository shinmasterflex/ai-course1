"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { TextDisplay } from "@/components/learning/text-display"
import { QuickCheckCard } from "@/components/learning/lesson-interactions"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { moduleQuizData } from "@/lib/module-quiz-data"

type CourseModulePageProps = {
  moduleId: string
}

type SectionLearningContent = {
  scenarioTitle: string
  scenarioBody: string
  checklistTitle: string
  checklistItems: string[]
  quickCheckPrompt: string
  quickCheckOptions: { id: string; label: string }[]
  quickCheckCorrectOptionId: string
  quickCheckExplanation: string
  quickCheckOptionExplanations: Record<string, string>
}

const module0SectionLearningContent: Record<string, SectionLearningContent> = {
  welcome: {
    scenarioTitle: "Beginner scenario",
    scenarioBody:
      "You are new to AI and hearing conflicting opinions. Your goal is to build a clear mental model of what changed recently and why this wave is more practical than earlier AI hype cycles.",
    checklistTitle: "Foundations checklist",
    checklistItems: [
      "Explain in one sentence what changed in AI since 2022.",
      "List two practical outcomes AI can improve in your context.",
      "Write one reason AI adoption matters even for beginners.",
    ],
    quickCheckPrompt: "What is the strongest beginner takeaway from this section?",
    quickCheckOptions: [
      { id: "a", label: "AI is important, but teams should wait for standards to stabilize before beginning" },
      { id: "b", label: "AI is moving fast, and beginners should start with practical learning" },
      { id: "c", label: "Begin with awareness only and defer hands-on practice to technical specialists" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "The fastest path for beginners is practical, low-risk experimentation with clear learning goals.",
    quickCheckOptionExplanations: {
      a: "Ignoring the shift increases future catch-up costs.",
      b: "This is the right mindset for a beginner adoption journey.",
      c: "AI affects operations, communication, and decision support across roles.",
    },
  },
  "ai-is-everywhere": {
    scenarioTitle: "Practical scenario",
    scenarioBody:
      "You are evaluating AI tools and keep seeing bold claims. You need a simple way to separate truly useful capabilities from hype before spending time or money.",
    checklistTitle: "Hype filter checklist",
    checklistItems: [
      "Ask what specific workflow problem the tool solves.",
      "Check whether results are measurable in time, quality, or output.",
      "Confirm whether the feature works in your real process, not only in demos.",
    ],
    quickCheckPrompt: "Which question best filters hype from real value?",
    quickCheckOptions: [
      { id: "a", label: "How polished are the demo outputs compared with competitors?" },
      { id: "b", label: "Can this improve a real workflow with measurable outcomes?" },
      { id: "c", label: "How many teams have already adopted the tool this quarter?" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Real value is tied to workflow improvement and measurable outcomes, not novelty.",
    quickCheckOptionExplanations: {
      a: "Marketing quality does not prove operational value.",
      b: "This is the strongest practical filter for beginners.",
      c: "Newness is not the same as usefulness.",
    },
  },
  "what-youll-learn": {
    scenarioTitle: "Mindset scenario",
    scenarioBody:
      "Your team expects instant results from AI. You need to correct common misconceptions so adoption stays realistic, safe, and focused on learning.",
    checklistTitle: "Misconception reset checklist",
    checklistItems: [
      "Replace 'AI will solve everything' with one clear use case.",
      "Replace 'AI is always right' with a verification step.",
      "Replace 'We must automate everything' with a phased approach.",
    ],
    quickCheckPrompt: "Which beginner misconception is most risky?",
    quickCheckOptions: [
      { id: "a", label: "AI outputs should always be reviewed before decisions" },
      { id: "b", label: "AI can support work but still needs context" },
      { id: "c", label: "If AI sounds confident, it is probably correct" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Confidence in wording is not proof of accuracy; verification is required.",
    quickCheckOptionExplanations: {
      a: "This is a healthy and correct beginner habit.",
      b: "This is a realistic and useful expectation.",
      c: "This misconception leads to preventable errors and trust issues.",
    },
  },
  "how-to-use-course": {
    scenarioTitle: "Adoption strategy scenario",
    scenarioBody:
      "You must choose your first adoption move: do nothing, automate everything, or run a small safe pilot. You need a strategy that maximizes learning and minimizes risk.",
    checklistTitle: "Safe start checklist",
    checklistItems: [
      "Select one repeatable low-risk workflow to test first.",
      "Define one success metric and one quality checkpoint.",
      "Set a short pilot timeline and review point.",
    ],
    quickCheckPrompt: "What is the best first adoption move for beginners?",
    quickCheckOptions: [
      { id: "a", label: "Run a focused pilot with clear guardrails and review" },
      { id: "b", label: "Launch pilots in several workflows at once to accelerate learning" },
      { id: "c", label: "Wait until internal policy is fully mature before any experimentation" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "A focused pilot creates learning quickly without exposing the team to unnecessary risk.",
    quickCheckOptionExplanations: {
      a: "This is the most practical and safest beginner strategy.",
      b: "Broad automation too early creates quality and governance problems.",
      c: "Waiting removes momentum and delays capability building.",
    },
  },
  summary: {
    scenarioTitle: "Wrap-up scenario",
    scenarioBody:
      "You are finishing Module 0 and preparing to start the rest of the course. Your goal is to leave with one clear plan you can execute in the next 30 days.",
    checklistTitle: "30-day starter checklist",
    checklistItems: [
      "Choose one workflow for your first AI pilot.",
      "Define one measurable outcome and one risk guardrail.",
      "Schedule one review meeting to decide next steps.",
    ],
    quickCheckPrompt: "What should you leave Module 0 with?",
    quickCheckOptions: [
      { id: "a", label: "A prioritized tool shortlist with high-level notes but no execution owner" },
      { id: "b", label: "A practical 30-day starter plan with metrics and guardrails" },
      { id: "c", label: "A strategy memo that recommends further research before committing to action" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Module 0 should end with an actionable beginner plan, not abstract theory.",
    quickCheckOptionExplanations: {
      a: "Lists without execution plans rarely produce results.",
      b: "This is the intended outcome of the module wrap-up.",
      c: "Delaying learning increases long-term adoption risk.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Foundations readiness checkpoint",
    scenarioBody:
      "You are finalizing Module 0 and need to show that your first AI steps are practical, low-risk, and measurable.",
    checklistTitle: "Foundations readiness checklist",
    checklistItems: [
      "Define one workflow for a focused starter pilot.",
      "Specify one measurable outcome and one risk guardrail.",
      "Set a review date and owner for next-step decisions.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 0 readiness?",
    quickCheckOptions: [
      { id: "a", label: "A broad list of tools to evaluate without ownership or metrics" },
      { id: "b", label: "A scoped starter plan with measurable outcomes and guardrails" },
      { id: "c", label: "A recommendation to delay experimentation until policy is fully mature" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness means moving from awareness to a safe, measurable first pilot plan.",
    quickCheckOptionExplanations: {
      a: "Lists alone do not create execution readiness.",
      b: "This is the expected Module 0 outcome.",
      c: "Delaying all experimentation slows learning and capability growth.",
    },
  },
}

const module1SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Landscape orientation scenario",
    scenarioBody:
      "Your team keeps mixing terms like models, tools, and agents. You need one shared map so everyone can discuss AI decisions with consistent language.",
    checklistTitle: "Orientation checklist",
    checklistItems: [
      "Define the four layers: model, app/tool, workflow automation, agent.",
      "Identify where your current tools sit on that map.",
      "Document one confusion point to fix in team language.",
    ],
    quickCheckPrompt: "Why start Module 1 with a landscape map?",
    quickCheckOptions: [
      { id: "a", label: "To establish a shared vocabulary for vendor conversations and internal alignment" },
      { id: "b", label: "To create shared decision language before buying tools" },
      { id: "c", label: "To postpone vendor decisions until architecture standards are finalized" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Shared language prevents procurement mistakes and accelerates better decisions.",
    quickCheckOptionExplanations: {
      a: "Shared vocabulary helps, but language alignment alone is not enough for tool selection quality.",
      b: "This is the core purpose of the module overview section.",
      c: "The goal is better evaluation, not avoiding decisions.",
    },
  },
  "defining-ai": {
    scenarioTitle: "Taxonomy scenario",
    scenarioBody:
      "A vendor says they sell a custom AI agent, but the demo looks like a simple chatbot wrapper. You need to classify what it really is.",
    checklistTitle: "Classification checklist",
    checklistItems: [
      "Ask what foundation model powers the system.",
      "Check whether it only generates responses or performs actions.",
      "Verify if workflows are deterministic or autonomous.",
    ],
    quickCheckPrompt: "Which distinction most improves procurement quality?",
    quickCheckOptions: [
      { id: "a", label: "Model vs tool vs automation vs agent" },
      { id: "b", label: "Dark mode vs light mode" },
      { id: "c", label: "Launch date vs number of followers" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Correct classification reduces overpayment and mismatched expectations.",
    quickCheckOptionExplanations: {
      a: "This taxonomy is essential for making grounded decisions.",
      b: "UI preferences do not indicate capability class.",
      c: "Popularity signals are weak proxies for operational fit.",
    },
  },
  "brief-history": {
    scenarioTitle: "Provider comparison scenario",
    scenarioBody:
      "Leadership asks which model provider to standardize on. You need to compare providers by operational fit, not hype.",
    checklistTitle: "Provider evaluation checklist",
    checklistItems: [
      "List your top 3 use cases and risk constraints.",
      "Compare providers on reliability, policy controls, and integration support.",
      "Pilot with measurable criteria before standardizing.",
    ],
    quickCheckPrompt: "What is the strongest provider-selection approach?",
    quickCheckOptions: [
      { id: "a", label: "Pick the provider with the strongest headline benchmark and broadest model catalog" },
      { id: "b", label: "Match provider strengths to your use cases and controls" },
      { id: "c", label: "Standardize early on one vendor to simplify procurement and integration" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Provider selection should be use-case and risk-fit driven.",
    quickCheckOptionExplanations: {
      a: "Trend signals are not operational evidence.",
      b: "This is the defensible and practical decision method.",
      c: "Immediate full standardization increases risk without evidence.",
    },
  },
  "types-of-ai": {
    scenarioTitle: "Delivery-model scenario",
    scenarioBody:
      "You must choose between buying SaaS, hiring an agency, or building internally. Each path has speed, control, and cost trade-offs.",
    checklistTitle: "Delivery model checklist",
    checklistItems: [
      "Define urgency, internal capability, and desired ownership level.",
      "Estimate total cost of ownership across 12 months.",
      "Select the model with best fit for current maturity stage.",
    ],
    quickCheckPrompt: "How should teams choose SaaS vs agency vs internal build?",
    quickCheckOptions: [
      { id: "a", label: "Default to internal build for prestige" },
      { id: "b", label: "Use speed-control-capability trade-off analysis" },
      { id: "c", label: "Always outsource fully" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Delivery model should match maturity, urgency, and ownership goals.",
    quickCheckOptionExplanations: {
      a: "Prestige-driven choices often create avoidable delays.",
      b: "This is the most balanced and practical method.",
      c: "Full outsourcing can weaken internal capability over time.",
    },
  },
  "ai-in-your-life": {
    scenarioTitle: "Custom AI claim scenario",
    scenarioBody:
      "A proposal promises fully custom AI. You need to determine whether it is true customization or standard tooling with light integration.",
    checklistTitle: "Custom-claim checklist",
    checklistItems: [
      "Ask what is truly custom: model, data layer, workflow, or interface.",
      "Request architecture and integration details in plain language.",
      "Validate whether outcomes require custom build at all.",
    ],
    quickCheckPrompt: "In most cases, what does custom AI mean?",
    quickCheckOptions: [
      { id: "a", label: "Training frontier models from scratch" },
      { id: "b", label: "Tailored workflows and integrations on existing models" },
      { id: "c", label: "Replacing every internal system" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Most implementations customize workflows and integration, not base models.",
    quickCheckOptionExplanations: {
      a: "This is uncommon and usually unnecessary for most teams.",
      b: "This reflects real market delivery patterns.",
      c: "Total system replacement is rarely practical as a first move.",
    },
  },
  "myths-vs-reality": {
    scenarioTitle: "Wrapper evaluation scenario",
    scenarioBody:
      "You are reviewing a wrapper product with polished UX. You need to decide whether it adds real value or just extra margin on top of a base model.",
    checklistTitle: "Wrapper value checklist",
    checklistItems: [
      "Identify the unique workflow or integration advantage.",
      "Compare cost against direct model/API usage alternatives.",
      "Assess lock-in risk and portability before committing.",
    ],
    quickCheckPrompt: "When is an AI wrapper worth paying for?",
    quickCheckOptions: [
      { id: "a", label: "When it adds measurable workflow and integration value" },
      { id: "b", label: "When it simplifies onboarding even if switching costs are not yet clear" },
      { id: "c", label: "When it packages the same model with stronger branding and reporting" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Wrappers should be evaluated on practical operating value, not aesthetics.",
    quickCheckOptionExplanations: {
      a: "This is the right value test.",
      b: "Marketing quality is not product utility.",
      c: "Novelty alone is a weak procurement signal.",
    },
  },
  "ai-writing": {
    scenarioTitle: "Lock-in risk scenario",
    scenarioBody:
      "Your team likes a new tool, but migration paths are unclear. You need to avoid dependency that makes future switching expensive.",
    checklistTitle: "Lock-in prevention checklist",
    checklistItems: [
      "Require exportable data and documented integration interfaces.",
      "Avoid critical workflows that depend on one proprietary feature.",
      "Define fallback options before broad rollout.",
    ],
    quickCheckPrompt: "What best reduces platform lock-in risk?",
    quickCheckOptions: [
      { id: "a", label: "Use only proprietary features without backup" },
      { id: "b", label: "Plan exportability and fallback architecture" },
      { id: "c", label: "Avoid contracts entirely" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Portability and fallback planning preserve strategic flexibility.",
    quickCheckOptionExplanations: {
      a: "This increases migration cost and dependency risk.",
      b: "This is the core lock-in mitigation strategy.",
      c: "No contract does not remove technical dependency.",
    },
  },
  "ai-images": {
    scenarioTitle: "Maturity signal scenario",
    scenarioBody:
      "A product demo looks impressive, but you need confidence it will perform in real operations with stable support and predictable quality.",
    checklistTitle: "Maturity signal checklist",
    checklistItems: [
      "Review reliability history and support responsiveness.",
      "Check release quality and incident transparency.",
      "Validate onboarding friction with a real workflow test.",
    ],
    quickCheckPrompt: "Which signal is most reliable for product maturity?",
    quickCheckOptions: [
      { id: "a", label: "Demo polish and animation quality" },
      { id: "b", label: "Operational reliability and support consistency" },
      { id: "c", label: "How often the product trends online" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Operational performance signals are stronger than launch-day impressions.",
    quickCheckOptionExplanations: {
      a: "A strong demo can hide production weaknesses.",
      b: "This best predicts long-term usability.",
      c: "Popularity does not guarantee operational fit.",
    },
  },
  "ai-productivity": {
    scenarioTitle: "Integration readiness scenario",
    scenarioBody:
      "Your team wants to adopt a tool quickly, but your current stack has strict data flow and compliance needs. Integration fit must be validated first.",
    checklistTitle: "Integration readiness checklist",
    checklistItems: [
      "Map required systems, APIs, and identity controls.",
      "Test one end-to-end workflow before rollout.",
      "Measure manual workaround burden during pilot.",
    ],
    quickCheckPrompt: "What is the strongest integration-readiness signal?",
    quickCheckOptions: [
      { id: "a", label: "Team excitement after demo" },
      { id: "b", label: "Successful end-to-end workflow test in your stack" },
      { id: "c", label: "Large number of built-in templates" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Real workflow tests reveal integration friction better than claims.",
    quickCheckOptionExplanations: {
      a: "Excitement is not operational evidence.",
      b: "This is the best indicator of practical readiness.",
      c: "Templates do not guarantee compatibility with your environment.",
    },
  },
  "ai-creative": {
    scenarioTitle: "Security baseline scenario",
    scenarioBody:
      "Before expanding usage, you need a lightweight security and data exposure baseline that every team can follow.",
    checklistTitle: "Security baseline checklist",
    checklistItems: [
      "Define approved data classes and prohibited inputs.",
      "Confirm vendor controls for retention, access, and model training use.",
      "Assign ownership for periodic policy review.",
    ],
    quickCheckPrompt: "What is the right first security move before scaling tool usage?",
    quickCheckOptions: [
      { id: "a", label: "Let each team decide data rules independently" },
      { id: "b", label: "Create a shared data-risk baseline and approved usage rules" },
      { id: "c", label: "Skip controls until after broad rollout" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Shared baseline controls prevent inconsistent high-risk behavior.",
    quickCheckOptionExplanations: {
      a: "Inconsistent rules create governance gaps.",
      b: "This is the practical minimum for safe scaling.",
      c: "Delayed controls increase preventable risk.",
    },
  },
  "choosing-tools": {
    scenarioTitle: "Scoring comparison scenario",
    scenarioBody:
      "You have multiple candidate tools and limited pilot bandwidth. You need a consistent scoring model to choose what deserves testing.",
    checklistTitle: "Scoring checklist",
    checklistItems: [
      "Score each option on capability, risk, cost, and integration fit.",
      "Weight criteria by business priority, not vendor strength.",
      "Select top pilot candidates with explicit assumptions.",
    ],
    quickCheckPrompt: "What makes a tool scorecard decision-ready?",
    quickCheckOptions: [
      { id: "a", label: "Prioritize user adoption signals, then add technical screening in phase two" },
      { id: "b", label: "Use weighted criteria tied to business outcomes and risk" },
      { id: "c", label: "Use an equal-weight checklist to keep scoring simple across stakeholders" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Weighted business-fit criteria create defensible shortlist decisions.",
    quickCheckOptionExplanations: {
      a: "Design quality is useful but insufficient.",
      b: "This is the strongest method for practical selection.",
      c: "Popularity rankings often miss operational realities.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Checkpoint scenario",
    scenarioBody:
      "You are about to present your Module 1 recommendations. You need to show that your classifications, vendor filters, and pilot shortlist are coherent and evidence-based.",
    checklistTitle: "Landscape readiness checklist",
    checklistItems: [
      "Confirm your model/tool/automation/agent distinctions are consistent.",
      "Document top 2 vendor options with rationale and risks.",
      "Define one pilot decision and one hold decision with reasons.",
    ],
    quickCheckPrompt: "What does strong Module 1 readiness look like?",
    quickCheckOptions: [
      { id: "a", label: "A broad shortlist with informal rationale and no explicit hold criteria" },
      { id: "b", label: "A clear classification model and defensible pilot shortlist" },
      { id: "c", label: "A recommendation to run broad discovery before narrowing to pilot candidates" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness means clear reasoning, not maximum option count.",
    quickCheckOptionExplanations: {
      a: "Unfiltered lists are not decision-ready.",
      b: "This is the correct outcome for Module 1.",
      c: "Postponement delays learning and strategic clarity.",
    },
  },
}

const module2SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Value discovery scenario",
    scenarioBody:
      "Leadership wants AI value this quarter, but opportunities are scattered. You need a simple framework to find where AI can move real business outcomes.",
    checklistTitle: "Value framework checklist",
    checklistItems: [
      "List top business outcomes to improve: revenue, margin, speed, or risk.",
      "Map key workflows tied to those outcomes.",
      "Identify where repetitive decisions or bottlenecks exist.",
    ],
    quickCheckPrompt: "What is the best starting point for AI value planning?",
    quickCheckOptions: [
      { id: "a", label: "Start with outcomes and map workflows" },
      { id: "b", label: "Start with high-performing foundation models, then identify suitable use cases" },
      { id: "c", label: "Start with low-cost tools to gather usage data before defining outcomes" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Outcome-first planning prevents random tool adoption and clarifies where AI can help.",
    quickCheckOptionExplanations: {
      a: "This creates the strongest foundation for prioritization.",
      b: "Model novelty does not define business value.",
      c: "Tool-first decisions often produce low-impact pilots.",
    },
  },
  "what-is-ml": {
    scenarioTitle: "Automation vs augmentation scenario",
    scenarioBody:
      "A team asks whether AI should replace a workflow or assist staff. You need to choose between automation and augmentation based on risk and judgment needs.",
    checklistTitle: "Decision mode checklist",
    checklistItems: [
      "Identify where human judgment is mandatory.",
      "Mark low-risk repetitive tasks suitable for automation.",
      "Use augmentation where context and quality trade-offs matter.",
    ],
    quickCheckPrompt: "When is augmentation usually better than full automation?",
    quickCheckOptions: [
      { id: "a", label: "When tasks involve nuance, context, or risk" },
      { id: "b", label: "When process variance is low and exception rates are predictable" },
      { id: "c", label: "When teams are still defining quality thresholds and operating standards" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Augmentation preserves human judgment while still improving speed and consistency.",
    quickCheckOptionExplanations: {
      a: "This is the strongest practical criterion.",
      b: "No-review workflows are better candidates for automation.",
      c: "Unclear objectives should be resolved before either choice.",
    },
  },
  "training-data": {
    scenarioTitle: "Opportunity scan scenario",
    scenarioBody:
      "You are evaluating opportunities across functions. Each department claims AI can help, but you need a structured way to compare value.",
    checklistTitle: "Department scan checklist",
    checklistItems: [
      "List one high-friction workflow per department.",
      "Estimate potential impact and implementation effort.",
      "Rank opportunities by measurable business contribution.",
    ],
    quickCheckPrompt: "What makes a cross-functional AI opportunity scan useful?",
    quickCheckOptions: [
      { id: "a", label: "Capturing only creative ideas" },
      { id: "b", label: "Comparing impact, effort, and owner readiness" },
      { id: "c", label: "Prioritizing whichever team asks first" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Structured comparison supports better sequencing and budget decisions.",
    quickCheckOptionExplanations: {
      a: "Ideas without prioritization criteria are hard to execute.",
      b: "This yields decision-ready portfolio inputs.",
      c: "Request order is a weak prioritization method.",
    },
  },
  "supervised-unsupervised": {
    scenarioTitle: "Quick wins vs strategic bets scenario",
    scenarioBody:
      "Your roadmap has both easy wins and larger transformation bets. You need to balance short-term results with long-term capability building.",
    checklistTitle: "Portfolio balance checklist",
    checklistItems: [
      "Identify initiatives that can show value in 30-90 days.",
      "Identify strategic bets requiring process redesign.",
      "Allocate resources across both time horizons.",
    ],
    quickCheckPrompt: "What is the strongest portfolio pattern for early AI adoption?",
    quickCheckOptions: [
      { id: "a", label: "Prioritize strategic bets first and absorb slower early ROI" },
      { id: "b", label: "Prioritize quick wins first and defer larger transformation work" },
      { id: "c", label: "A balanced mix of quick wins and strategic bets" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Balanced portfolios maintain momentum while building durable capability.",
    quickCheckOptionExplanations: {
      a: "This delays evidence and weakens support.",
      b: "This limits long-term advantage.",
      c: "This is the best execution balance.",
    },
  },
  "neural-networks": {
    scenarioTitle: "Bottleneck analysis scenario",
    scenarioBody:
      "Operational delays are increasing, but root causes are unclear. You need to locate throughput bottlenecks where AI can reduce queue time.",
    checklistTitle: "Throughput checklist",
    checklistItems: [
      "Measure where work waits longest in the process.",
      "Identify repetitive decision or triage points.",
      "Pilot AI on one bottleneck and track cycle-time change.",
    ],
    quickCheckPrompt: "Where should AI be piloted first in process-heavy operations?",
    quickCheckOptions: [
      { id: "a", label: "At the biggest queue bottleneck with repeatable decisions" },
      { id: "b", label: "At random points to spread experimentation" },
      { id: "c", label: "Only at the final reporting step" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Bottleneck-first pilots tend to generate clear, measurable value quickly.",
    quickCheckOptionExplanations: {
      a: "This is the highest-leverage targeting approach.",
      b: "Random placement reduces learning quality.",
      c: "Reporting steps may not address core throughput limits.",
    },
  },
  "what-ai-cant-do": {
    scenarioTitle: "Revenue vs cost matrix scenario",
    scenarioBody:
      "Your team is split between growth-focused and efficiency-focused initiatives. You need one matrix to evaluate both consistently.",
    checklistTitle: "Unified scoring checklist",
    checklistItems: [
      "Score each opportunity on revenue impact potential.",
      "Score each opportunity on cost reduction potential.",
      "Add confidence and risk scores before prioritizing.",
    ],
    quickCheckPrompt: "Why use a revenue-vs-cost matrix in AI prioritization?",
    quickCheckOptions: [
      { id: "a", label: "To simplify prioritization by focusing on upside before risk weighting" },
      { id: "b", label: "To compare growth and efficiency opportunities on one view" },
      { id: "c", label: "To separate near-term efficiency projects from revenue initiatives entirely" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "A unified matrix improves transparency across competing investment priorities.",
    quickCheckOptionExplanations: {
      a: "Risk should be included, not ignored.",
      b: "This enables balanced and defensible prioritization.",
      c: "Quick wins can still be high-value entries in the matrix.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Prioritization checkpoint scenario",
    scenarioBody:
      "You are presenting a Module 2 recommendation to leadership. You need to show why your selected opportunities are highest value and realistically executable.",
    checklistTitle: "Opportunity prioritization readiness checklist",
    checklistItems: [
      "Prepare top 3 opportunities with score rationale.",
      "Document expected outcomes and ownership per opportunity.",
      "Define one pilot metric and one risk guardrail for each.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 2 readiness?",
    quickCheckOptions: [
      { id: "a", label: "A shortlist of ideas with qualitative rationale but no numeric scoring" },
      { id: "b", label: "A prioritized, scored opportunity set with measurable outcomes" },
      { id: "c", label: "A discovery roadmap that postpones selection until broader cross-team input is collected" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Strong readiness means evidence-based prioritization linked to measurable business outcomes.",
    quickCheckOptionExplanations: {
      a: "Unscored ideas are not decision-ready.",
      b: "This is the expected result of the module.",
      c: "Deferral delays learning and business value.",
    },
  },
}

const module3SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Tool evaluation kickoff",
    scenarioBody:
      "You need to shortlist AI tools for a beginner adoption program. The goal is to avoid noise and evaluate only categories that can create measurable business outcomes.",
    checklistTitle: "Category map checklist",
    checklistItems: [
      "Group options by use case category before comparing vendors.",
      "Define one success metric for each category.",
      "Identify one category to defer until readiness improves.",
    ],
    quickCheckPrompt: "What is the best first move in tool selection?",
    quickCheckOptions: [
      { id: "a", label: "Compare all vendors at once" },
      { id: "b", label: "Start with category-level outcome mapping" },
      { id: "c", label: "Choose the most popular brand immediately" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Category-first evaluation improves focus and prevents vendor-driven confusion.",
    quickCheckOptionExplanations: {
      a: "This is usually too broad and inefficient early on.",
      b: "This creates a clean decision structure.",
      c: "Popularity is not a reliable fit signal.",
    },
  },
  "what-is-llm": {
    scenarioTitle: "General assistant threshold",
    scenarioBody:
      "A team requests a specialized product, but existing general assistants may already solve the workflow. You need criteria for when general tools are enough.",
    checklistTitle: "Fit threshold checklist",
    checklistItems: [
      "Test the workflow with a general assistant first.",
      "Measure quality, speed, and review burden.",
      "Escalate to specialized tools only if gaps are persistent.",
    ],
    quickCheckPrompt: "When should teams stay with a general assistant?",
    quickCheckOptions: [
      { id: "a", label: "When results are acceptable and risk remains low" },
      { id: "b", label: "When governance needs are moderate and can be handled with process controls" },
      { id: "c", label: "When scale requirements are likely to increase within the next two quarters" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "General tools are often enough for broad, low-risk, early-stage workflows.",
    quickCheckOptionExplanations: {
      a: "This is the practical baseline decision.",
      b: "Governance can still be applied to general tools.",
      c: "Specialization should be justified by real gaps, not assumption.",
    },
  },
  "how-chatgpt-works": {
    scenarioTitle: "Specialized tool trigger",
    scenarioBody:
      "You are deciding whether to move from general assistants to specialized products. The decision should be based on workflow demands, not novelty.",
    checklistTitle: "Specialization trigger checklist",
    checklistItems: [
      "Document repeated failure modes in the current workflow.",
      "Check if specialized controls or integrations are required.",
      "Validate incremental value through pilot comparisons.",
    ],
    quickCheckPrompt: "What best justifies a specialized tool purchase?",
    quickCheckOptions: [
      { id: "a", label: "A high-quality pilot showed better user satisfaction and interface adoption" },
      { id: "b", label: "Documented workflow gaps and measurable pilot uplift" },
      { id: "c", label: "Cross-functional stakeholders prefer the tool's governance and admin controls" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Specialized tool adoption should be evidence-led and workflow-specific.",
    quickCheckOptionExplanations: {
      a: "Demo quality alone is insufficient.",
      b: "This is the strongest procurement rationale.",
      c: "Preference should not override outcome evidence.",
    },
  },
  "anatomy-of-prompt": {
    scenarioTitle: "Scorecard design",
    scenarioBody:
      "Your team compares tools inconsistently. You need a shared scorecard so evaluations are repeatable and defendable in leadership reviews.",
    checklistTitle: "Tool comparison scorecard checklist",
    checklistItems: [
      "Define weighted criteria: reliability, integration, security, support.",
      "Use the same test cases across all tools.",
      "Record assumptions and unresolved risks per candidate.",
    ],
    quickCheckPrompt: "What makes a tool scorecard trustworthy?",
    quickCheckOptions: [
      { id: "a", label: "Subjective team preference ratings" },
      { id: "b", label: "Weighted criteria and consistent test cases" },
      { id: "c", label: "Only benchmark leaderboard results" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Consistent criteria and test conditions reduce bias in selection decisions.",
    quickCheckOptionExplanations: {
      a: "Preference without criteria is hard to defend.",
      b: "This is the decision-grade approach.",
      c: "Benchmarks alone miss operational realities.",
    },
  },
  "prompt-techniques": {
    scenarioTitle: "Commercial risk screening",
    scenarioBody:
      "A tool appears affordable at first glance, but hidden cost drivers and data risks may emerge later. You need a pre-purchase risk screen.",
    checklistTitle: "Risk screen checklist",
    checklistItems: [
      "Map all cost components, including expansion and usage spikes.",
      "Review data handling, retention, and access controls.",
      "Flag dependencies that could create lock-in exposure.",
    ],
    quickCheckPrompt: "Which pricing pattern deserves extra scrutiny?",
    quickCheckOptions: [
      { id: "a", label: "Clear milestone-based pricing with terms" },
      { id: "b", label: "Low entry cost with unclear expansion terms" },
      { id: "c", label: "Published usage tiers with thresholds" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Unclear expansion terms often drive unexpected long-term cost.",
    quickCheckOptionExplanations: {
      a: "This is usually more transparent.",
      b: "This is a common hidden-cost risk pattern.",
      c: "Documented tiers are generally easier to model.",
    },
  },
  "hands-on-practice": {
    scenarioTitle: "Decision tree application",
    scenarioBody:
      "Your team has three candidate tools and limited pilot capacity. You need a clear buy-wait-pilot decision path to avoid overcommitment.",
    checklistTitle: "Buy-wait-pilot checklist",
    checklistItems: [
      "Mark each candidate as buy, wait, or pilot based on scorecard results.",
      "Assign pilot owner, metric, and timeframe for pilot options.",
      "Document why deferred options were paused.",
    ],
    quickCheckPrompt: "What is the purpose of a buy-wait-pilot decision tree?",
    quickCheckOptions: [
      { id: "a", label: "Shorten procurement cycles while keeping all options active" },
      { id: "b", label: "Standardize tool decisions with clear next actions" },
      { id: "c", label: "Reduce experimentation overhead by standardizing on one default tool" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "The decision tree creates consistent decisions and clear execution steps.",
    quickCheckOptionExplanations: {
      a: "Speed without structure increases risk.",
      b: "This is exactly the intended outcome.",
      c: "Pilots remain critical for evidence generation.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Procurement readiness checkpoint",
    scenarioBody:
      "You are presenting a Module 3 recommendation to leadership. You need to show your shortlist is based on fit, risk, and measurable impact.",
    checklistTitle: "Procurement readiness checklist",
    checklistItems: [
      "Prepare top candidates with scorecard evidence.",
      "Include one buy, one pilot, and one wait rationale.",
      "Define expected pilot outcomes and review criteria.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 3 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Selecting a tool based on stakeholder enthusiasm and early usability signals" },
      { id: "b", label: "Defensible recommendations grounded in scorecard evidence" },
      { id: "c", label: "Expanding pilot discovery before issuing buy or wait recommendations" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness means evidence-backed recommendations with clear next actions.",
    quickCheckOptionExplanations: {
      a: "Excitement is not a procurement framework.",
      b: "This is the target outcome for Module 3.",
      c: "Deferral without evaluation slows capability building.",
    },
  },
}

const module4SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Partner selection kickoff",
    scenarioBody:
      "You need outside help for AI implementation but are unsure whether to use an agency, freelancer, or internal team expansion. You must choose a fit-for-stage partner model.",
    checklistTitle: "Partner model checklist",
    checklistItems: [
      "Define delivery urgency and internal capability gaps.",
      "List required outcomes for the next 90 days.",
      "Pick partner model based on speed, control, and ownership needs.",
    ],
    quickCheckPrompt: "What should guide partner model choice first?",
    quickCheckOptions: [
      { id: "a", label: "Proven category reputation and a strong portfolio of similar clients" },
      { id: "b", label: "Business outcomes, timeline, and internal capacity" },
      { id: "c", label: "Fastest mobilization plan even if long-term ownership remains unclear" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Fit-to-outcome and capability constraints should drive partner decisions.",
    quickCheckOptionExplanations: {
      a: "References and reputation matter, but they are not enough without fit-to-outcome analysis.",
      b: "This is the strongest decision basis.",
      c: "Cost is one factor, not a quality proxy.",
    },
  },
  "what-is-data": {
    scenarioTitle: "Pre-contract diligence scenario",
    scenarioBody:
      "You are evaluating proposals and need to ask high-leverage questions before signing. The goal is to prevent vague scopes and misaligned delivery.",
    checklistTitle: "Diligence question checklist",
    checklistItems: [
      "Request explicit scope, timeline, and ownership model.",
      "Ask how success will be measured and reported.",
      "Confirm staffing plan and escalation process.",
    ],
    quickCheckPrompt: "Which pre-signing question is most important?",
    quickCheckOptions: [
      { id: "a", label: "How quickly the partner can begin execution with a named team" },
      { id: "b", label: "How outcomes, scope, and accountability are defined" },
      { id: "c", label: "How detailed their architecture narrative sounds during workshops" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Outcome, scope, and accountability clarity is foundational for delivery quality.",
    quickCheckOptionExplanations: {
      a: "Fast mobilization is useful, but it does not replace clear scope and accountability definitions.",
      b: "This directly reduces delivery risk.",
      c: "Buzzwords are weak competence signals.",
    },
  },
  "data-collection": {
    scenarioTitle: "Red flag detection scenario",
    scenarioBody:
      "A proposal sounds impressive but lacks concrete delivery mechanics. You need to detect false expertise before committing budget.",
    checklistTitle: "Red flag checklist",
    checklistItems: [
      "Look for missing assumptions and vague success claims.",
      "Request references with comparable implementation scope.",
      "Verify technical approach can be explained in plain language.",
    ],
    quickCheckPrompt: "What is a high-confidence red flag in AI proposals?",
    quickCheckOptions: [
      { id: "a", label: "Named timeline and risk log" },
      { id: "b", label: "Clear implementation team and governance plan" },
      { id: "c", label: "Transformation promises without operating detail" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Bold claims without delivery detail are a common failure indicator.",
    quickCheckOptionExplanations: {
      a: "This is usually a positive signal.",
      b: "This is generally a positive diligence marker.",
      c: "This should trigger deeper verification or rejection.",
    },
  },
  "data-cleaning": {
    scenarioTitle: "Pilot structuring scenario",
    scenarioBody:
      "Leadership wants immediate scale, but evidence is thin. You need to structure a pilot that creates decision-grade data before broader rollout.",
    checklistTitle: "Pilot design checklist",
    checklistItems: [
      "Define narrow scope, owner, baseline, and target metric.",
      "Set explicit stop/scale criteria before launch.",
      "Schedule pilot review with go/no-go decision date.",
    ],
    quickCheckPrompt: "What makes a pilot useful for real business decisions?",
    quickCheckOptions: [
      { id: "a", label: "Moderate scope with flexible goals so teams can adapt during execution" },
      { id: "b", label: "Small scope, measurable outcomes, explicit stop conditions" },
      { id: "c", label: "Small scope with owner assigned but no pre-defined stop or scale thresholds" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Decision-grade pilots are constrained, measurable, and time-bound.",
    quickCheckOptionExplanations: {
      a: "This increases ambiguity and risk.",
      b: "This is the strongest pilot pattern.",
      c: "Unowned experiments rarely produce actionable outcomes.",
    },
  },
  preprocessing: {
    scenarioTitle: "Execution model trade-off scenario",
    scenarioBody:
      "You must decide whether to build internally, buy productized capability, or partner for delivery. The decision must reflect capability and speed constraints.",
    checklistTitle: "Build-buy-partner checklist",
    checklistItems: [
      "Assess internal delivery maturity and staffing capacity.",
      "Model 12-month ownership and maintenance implications.",
      "Choose model aligned to target pace and control level.",
    ],
    quickCheckPrompt: "How should teams decide build vs buy vs partner?",
    quickCheckOptions: [
      { id: "a", label: "Prioritize internal build when long-term differentiation is expected" },
      { id: "b", label: "Use speed, capability, and ownership trade-offs" },
      { id: "c", label: "Prefer partner-led delivery initially to reduce early execution burden" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Trade-off analysis creates realistic execution choices.",
    quickCheckOptionExplanations: {
      a: "Optics-driven choices often underperform.",
      b: "This is the strongest practical framework.",
      c: "Full outsourcing can reduce long-term control.",
    },
  },
  "feature-engineering": {
    scenarioTitle: "Commercial terms scenario",
    scenarioBody:
      "Pricing appears attractive at entry but future costs are unclear. You need to decode model, scope, and change-order implications before approval.",
    checklistTitle: "Commercial review checklist",
    checklistItems: [
      "Break down fixed, variable, and change-order pricing.",
      "Model cost under realistic growth and usage scenarios.",
      "Tie payment milestones to measurable delivery outcomes.",
    ],
    quickCheckPrompt: "Which pricing pattern deserves the closest scrutiny?",
    quickCheckOptions: [
      { id: "a", label: "Transparent fixed-scope milestone pricing" },
      { id: "b", label: "Low entry pricing with unclear expansion charges" },
      { id: "c", label: "Documented usage tiers with explicit thresholds" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Unclear expansion charges are a common source of hidden long-term cost.",
    quickCheckOptionExplanations: {
      a: "This is often easier to govern.",
      b: "This is the high-risk commercial pattern.",
      c: "Documented tiers are generally easier to forecast.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Diligence readiness checkpoint",
    scenarioBody:
      "You are presenting a partner recommendation to leadership. You need to show the shortlist and contracting approach are evidence-based and risk-aware.",
    checklistTitle: "Partner diligence readiness checklist",
    checklistItems: [
      "Present top partner options with risk-adjusted rationale.",
      "Include pilot structure and success thresholds.",
      "Highlight pricing and contract guardrails before approval.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 4 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Selecting a partner based on references and implementation velocity" },
      { id: "b", label: "Defensible recommendation with diligence evidence and pilot plan" },
      { id: "c", label: "Approving phased expansion before pilot review milestones are completed" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Strong readiness combines partner diligence, controlled pilots, and commercial safeguards.",
    quickCheckOptionExplanations: {
      a: "Brand alone is not sufficient decision evidence.",
      b: "This is the expected outcome of the module.",
      c: "Skipping pilot evidence increases execution risk.",
    },
  },
}

const module5SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "ROI operating model kickoff",
    scenarioBody:
      "Leadership wants proof that AI investments are producing value. You need an operating model that tracks outcomes, costs, and risks consistently.",
    checklistTitle: "ROI model checklist",
    checklistItems: [
      "Define business outcomes the ROI model must track.",
      "Set baseline metrics before implementation starts.",
      "Assign reporting cadence and owner accountability.",
    ],
    quickCheckPrompt: "What is the strongest first step in AI ROI design?",
    quickCheckOptions: [
      { id: "a", label: "Start with usage intensity metrics to establish adoption baselines" },
      { id: "b", label: "Set baseline outcomes and ownership first" },
      { id: "c", label: "Start with high-visibility KPI snapshots and add cost attribution later" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Baseline and ownership are required for credible ROI tracking.",
    quickCheckOptionExplanations: {
      a: "Usage metrics do not equal value outcomes.",
      b: "This creates decision-grade measurement.",
      c: "Selective reporting weakens trust and accuracy.",
    },
  },
  "roi-basics": {
    scenarioTitle: "Calculation method scenario",
    scenarioBody:
      "Different teams report ROI differently, creating confusion. You need one consistent method to compare initiatives fairly.",
    checklistTitle: "Method selection checklist",
    checklistItems: [
      "Choose baseline-vs-post as the primary measurement structure.",
      "Include both direct and indirect implementation costs.",
      "Separate assumptions from measured outcomes clearly.",
    ],
    quickCheckPrompt: "Which ROI method is most credible for leadership review?",
    quickCheckOptions: [
      { id: "a", label: "Standardized manager assessments paired with periodic productivity sampling" },
      { id: "b", label: "Baseline-vs-post outcome measurement" },
      { id: "c", label: "Forecasted efficiency gains using benchmark assumptions and adoption rates" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Baseline comparison is the most defensible way to show impact.",
    quickCheckOptionExplanations: {
      a: "Anecdotes are useful context but weak core evidence.",
      b: "This supports transparent and repeatable reporting.",
      c: "No baseline means no reliable attribution.",
    },
  },
  "effectiveness-metrics": {
    scenarioTitle: "Scoring and cost-benefit scenario",
    scenarioBody:
      "You have more AI ideas than budget. You need a scoring model that balances value, implementation effort, and execution confidence.",
    checklistTitle: "Prioritization scoring checklist",
    checklistItems: [
      "Score opportunities on value, effort, confidence, and risk.",
      "Normalize scoring criteria across teams.",
      "Select top candidates based on weighted total score.",
    ],
    quickCheckPrompt: "What improves AI prioritization quality most?",
    quickCheckOptions: [
      { id: "a", label: "Weighting projects by executive sponsorship and change readiness" },
      { id: "b", label: "Using a weighted value-effort-confidence model" },
      { id: "c", label: "Applying an equal-weight rubric across all proposals to reduce bias" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Weighted scoring improves consistency and portfolio quality.",
    quickCheckOptionExplanations: {
      a: "Sponsorship strength is not a value metric.",
      b: "This is the strongest practical prioritization method.",
      c: "Equal approval dilutes resources and impact.",
    },
  },
  "roi-calculation": {
    scenarioTitle: "Portfolio budgeting scenario",
    scenarioBody:
      "You need a quarterly roadmap that includes quick wins and strategic initiatives. Budget allocation must reflect risk and payoff horizon.",
    checklistTitle: "Portfolio mix checklist",
    checklistItems: [
      "Allocate budget across short-term and long-term bets.",
      "Set expected payback windows for each initiative.",
      "Define stage gates for continuation or pause.",
    ],
    quickCheckPrompt: "How should AI budgets be structured for sustainable impact?",
    quickCheckOptions: [
      { id: "a", label: "Majority budget to short-term wins, with optional funding for strategic bets" },
      { id: "b", label: "Majority budget to long-term transformation, with minimal quick-win coverage" },
      { id: "c", label: "Balanced portfolio with stage-gated funding" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Balanced, stage-gated budgeting supports both momentum and strategic capability.",
    quickCheckOptionExplanations: {
      a: "This may limit long-term competitiveness.",
      b: "This may delay visible progress and support.",
      c: "This is the strongest operating pattern.",
    },
  },
  "misleading-metrics": {
    scenarioTitle: "Vanity metric risk scenario",
    scenarioBody:
      "A dashboard shows rising AI activity, but business outcomes are flat. You need to identify and remove misleading metrics.",
    checklistTitle: "Metric quality checklist",
    checklistItems: [
      "Flag activity-only metrics that lack outcome linkage.",
      "Pair each metric with a business result indicator.",
      "Drop metrics that do not influence decisions.",
    ],
    quickCheckPrompt: "Which metric is most likely misleading on its own?",
    quickCheckOptions: [
      { id: "a", label: "Cycle-time reduction on a bottleneck process" },
      { id: "b", label: "Margin change in a target workflow" },
      { id: "c", label: "Total AI chats across teams" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Activity without outcome linkage is a weak impact signal.",
    quickCheckOptionExplanations: {
      a: "This can indicate real operational improvement.",
      b: "This can indicate measurable business value.",
      c: "This often inflates progress without proving impact.",
    },
  },
  "adoption-framework": {
    scenarioTitle: "Progress reporting scenario",
    scenarioBody:
      "Leadership needs transparent updates on AI progress. Your report must show impact, uncertainty, and next decisions in one view.",
    checklistTitle: "Reporting discipline checklist",
    checklistItems: [
      "Report outcomes, risks, and assumptions together.",
      "Include continuation, pivot, or stop recommendation per initiative.",
      "Track experiment governance and decision dates.",
    ],
    quickCheckPrompt: "What makes AI progress reporting credible?",
    quickCheckOptions: [
      { id: "a", label: "Adoption rates, benchmark rank shifts, and periodic success narratives" },
      { id: "b", label: "Outcome metrics, risk indicators, and explicit next decisions" },
      { id: "c", label: "Quarterly success summaries with exceptions handled in separate risk reviews" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Decision-grade reporting combines value, risk, and concrete next actions.",
    quickCheckOptionExplanations: {
      a: "This lacks operational decision context.",
      b: "This is the expected governance reporting standard.",
      c: "One-sided reporting weakens decision quality.",
    },
  },
  "module-quiz": {
    scenarioTitle: "ROI readiness checkpoint",
    scenarioBody:
      "You are presenting Module 5 outputs to decision-makers. You need to show that your prioritization and ROI case are measurable, realistic, and risk-aware.",
    checklistTitle: "ROI readiness checklist",
    checklistItems: [
      "Prepare top opportunities with scorecard and ROI assumptions.",
      "Show baseline-to-post measurement design.",
      "Include risk-adjusted recommendation and next review date.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 5 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Strong utilization and adoption trends supported by stakeholder testimonials" },
      { id: "b", label: "Defensible ROI model tied to business outcomes and risk" },
      { id: "c", label: "A staged ROI approach with assumptions to be validated after broader deployment" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness means outcome-based ROI logic with explicit governance controls.",
    quickCheckOptionExplanations: {
      a: "Activity alone does not prove value.",
      b: "This is the module's expected output quality.",
      c: "Lack of timeline reduces execution accountability.",
    },
  },
}

const module6SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Governance baseline kickoff",
    scenarioBody:
      "AI usage is expanding, but controls are inconsistent across teams. You need a minimum governance baseline before scaling to additional workflows.",
    checklistTitle: "Baseline governance checklist",
    checklistItems: [
      "Define core policy requirements for approved AI usage.",
      "Assign risk ownership and review accountability.",
      "Set mandatory approval gates by risk tier.",
    ],
    quickCheckPrompt: "What is the minimum baseline before scaling AI use?",
    quickCheckOptions: [
      { id: "a", label: "Let each function tailor policy to its workflows with light central guidance" },
      { id: "b", label: "Adopt vendor frameworks as a baseline and adapt internal controls over time" },
      { id: "c", label: "Policy, role-based controls, and risk review" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Safe scale needs explicit policy, controls, and clear ownership.",
    quickCheckOptionExplanations: {
      a: "Decentralized rules often create compliance gaps.",
      b: "Vendor assurances cannot replace internal governance.",
      c: "This is the practical minimum baseline.",
    },
  },
  "ai-bias": {
    scenarioTitle: "Reliability and oversight scenario",
    scenarioBody:
      "A workflow looks efficient but occasionally produces confident errors. You need to define where human validation is mandatory and how exceptions are handled.",
    checklistTitle: "Oversight design checklist",
    checklistItems: [
      "Classify workflow decisions by business impact.",
      "Require human review for material outputs.",
      "Define escalation path for uncertain or conflicting outputs.",
    ],
    quickCheckPrompt: "How should hallucination risk be handled in high-impact workflows?",
    quickCheckOptions: [
      { id: "a", label: "Mandate human validation for material decisions" },
      { id: "b", label: "Use confidence thresholds to reduce human review volume in most decisions" },
      { id: "c", label: "Monitor low-frequency errors and intervene only when trend thresholds are exceeded" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "High-impact workflows require explicit human checkpoints.",
    quickCheckOptionExplanations: {
      a: "This is the strongest reliability control.",
      b: "Model upgrades reduce but do not eliminate risk.",
      c: "Low-frequency failures can still cause severe harm.",
    },
  },
  "privacy-data": {
    scenarioTitle: "Data control scenario",
    scenarioBody:
      "Teams want to move faster with AI tools, but sensitive data handling is unclear. You need enforceable controls for access, retention, and approved use.",
    checklistTitle: "Data protection checklist",
    checklistItems: [
      "Define allowed and prohibited data classes for AI tools.",
      "Require vendor evidence on retention and training-use terms.",
      "Apply role-based access for sensitive workflows.",
    ],
    quickCheckPrompt: "Which control best protects data and IP in vendor relationships?",
    quickCheckOptions: [
      { id: "a", label: "Third-party certifications and compliance attestations as primary evidence" },
      { id: "b", label: "Explicit clauses on data rights and retention" },
      { id: "c", label: "Security addendums with broad language and annual review commitments" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Contract-level clarity is essential for enforceable protections.",
    quickCheckOptionExplanations: {
      a: "Standards language is useful but often too vague.",
      b: "This creates concrete legal and operational safeguards.",
      c: "Verbal assurances are not durable controls.",
    },
  },
  misinformation: {
    scenarioTitle: "Incident response scenario",
    scenarioBody:
      "A model-generated output creates customer risk. The team is unsure who should act first. You need a documented incident response framework.",
    checklistTitle: "Incident readiness checklist",
    checklistItems: [
      "Define incident severity levels and response timelines.",
      "Assign owner roles for containment, comms, and remediation.",
      "Run tabletop drills for likely failure scenarios.",
    ],
    quickCheckPrompt: "What is the best response model for AI incidents?",
    quickCheckOptions: [
      { id: "a", label: "Handle incidents with team-level playbooks and escalate only severe events" },
      { id: "b", label: "Use weekly triage meetings before formalizing response actions" },
      { id: "c", label: "Use a documented response playbook" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Prepared playbooks improve speed, consistency, and accountability under pressure.",
    quickCheckOptionExplanations: {
      a: "Ad hoc response increases inconsistency and risk.",
      b: "Routine triage without predefined playbooks often slows containment and creates ownership confusion.",
      c: "This is the strongest operational pattern.",
    },
  },
  "responsible-ai": {
    scenarioTitle: "Internal policy scenario",
    scenarioBody:
      "Teams are using AI differently with unclear boundaries. You need an internal policy that is practical by role and risk tier.",
    checklistTitle: "Policy rollout checklist",
    checklistItems: [
      "Define approved use cases and prohibited behaviors.",
      "Map policy rules by role and workflow type.",
      "Publish escalation and exception request process.",
    ],
    quickCheckPrompt: "What makes an internal AI policy usable in practice?",
    quickCheckOptions: [
      { id: "a", label: "Principle-led policy with optional role annexes developed later" },
      { id: "b", label: "Role-specific rules and clear escalation paths" },
      { id: "c", label: "A central policy with periodic reminders and manager discretion for exceptions" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Usable policy combines clarity, role fit, and operating procedures.",
    quickCheckOptionExplanations: {
      a: "Values are important but insufficient for daily decisions.",
      b: "This is the practical implementation standard.",
      c: "Policy adoption requires operational reinforcement.",
    },
  },
  "ethical-dilemmas": {
    scenarioTitle: "Vendor contract guardrail scenario",
    scenarioBody:
      "A vendor agreement looks favorable on price but weak on liability and data terms. You need to negotiate guardrails before signing.",
    checklistTitle: "Contract guardrail checklist",
    checklistItems: [
      "Define liability and remediation obligations for failures.",
      "Confirm restrictions on model training with your data.",
      "Add auditability and termination clauses for risk events.",
    ],
    quickCheckPrompt: "What is the strongest contract safeguard pattern?",
    quickCheckOptions: [
      { id: "a", label: "Trust vendor standard terms without edits" },
      { id: "b", label: "Negotiate explicit rights, limits, and accountability" },
      { id: "c", label: "Prioritize speed over legal review" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Explicit, negotiated terms reduce downstream legal and operational exposure.",
    quickCheckOptionExplanations: {
      a: "Default terms may not match your risk requirements.",
      b: "This is the strongest risk management approach.",
      c: "Skipping review creates avoidable risk.",
    },
  },
  "risk-reflection": {
    scenarioTitle: "Governance scorecard scenario",
    scenarioBody:
      "Leadership requests a snapshot of governance maturity. You need a lightweight scorecard that tracks posture as adoption grows.",
    checklistTitle: "Governance posture scorecard checklist",
    checklistItems: [
      "Track policy coverage, incident readiness, and control adherence.",
      "Set threshold triggers for corrective action.",
      "Review scorecard trend monthly with accountable owners.",
    ],
    quickCheckPrompt: "What is the best use of a governance scorecard?",
    quickCheckOptions: [
      { id: "a", label: "One-time audit artifact" },
      { id: "b", label: "Recurring posture tracking with action triggers" },
      { id: "c", label: "Public marketing collateral" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Scorecards are most valuable when used continuously to drive corrective action.",
    quickCheckOptionExplanations: {
      a: "Static audits miss evolving risk conditions.",
      b: "This supports ongoing governance effectiveness.",
      c: "Governance scorecards are operational tools, not promotional assets.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Governance readiness checkpoint",
    scenarioBody:
      "You are presenting Module 6 outputs to leadership. You must show that policy, controls, contracts, and incident response are ready for scaled adoption.",
    checklistTitle: "Governance readiness checklist",
    checklistItems: [
      "Present baseline policy and approval controls.",
      "Show incident response ownership and response timelines.",
      "Confirm contract guardrails for data, IP, and liability.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 6 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Rapid usage growth with quarterly governance reporting and ad hoc enforcement" },
      { id: "b", label: "Documented controls, playbooks, and risk ownership" },
      { id: "c", label: "Comprehensive policy draft with phased enforcement once adoption stabilizes" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness requires operating controls, clear ownership, and enforcement mechanisms.",
    quickCheckOptionExplanations: {
      a: "Adoption scale without controls increases exposure.",
      b: "This is the expected governance maturity output.",
      c: "Policy without execution is insufficient.",
    },
  },
}

const module7SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Roadmap planning kickoff",
    scenarioBody:
      "You have an AI strategy but no execution sequence. The priority is to turn strategy into a phased roadmap with realistic ownership and timing.",
    checklistTitle: "Roadmap kickoff checklist",
    checklistItems: [
      "Define roadmap outcomes for the next two quarters.",
      "Identify initiative dependencies and critical constraints.",
      "Assign accountable owners by phase.",
    ],
    quickCheckPrompt: "What is the core purpose of a Module 7 roadmap?",
    quickCheckOptions: [
      { id: "a", label: "Capture initiatives broadly first, then sequence after stakeholder alignment" },
      { id: "b", label: "Convert strategy into phased, owned execution" },
      { id: "c", label: "Run readiness discovery in parallel before assigning phase ownership" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Roadmaps create execution structure, accountability, and pacing.",
    quickCheckOptionExplanations: {
      a: "Broad discovery can help early alignment, but it does not replace phased ownership and execution sequencing.",
      b: "This is the intended outcome of the section.",
      c: "Waiting for certainty usually delays learning and impact.",
    },
  },
  "ai-in-the-workplace": {
    scenarioTitle: "First 30 days scenario",
    scenarioBody:
      "Leadership asks for visible progress in one month. You need a practical 30-day start plan with guardrails and measurable outcomes.",
    checklistTitle: "30-day start checklist",
    checklistItems: [
      "Select one pilot workflow with clear business relevance.",
      "Define baseline, target metric, and owner.",
      "Set weekly review rhythm for progress and risks.",
    ],
    quickCheckPrompt: "What should the first 30 days focus on?",
    quickCheckOptions: [
      { id: "a", label: "Launch two pilots in adjacent workflows to accelerate comparative learning" },
      { id: "b", label: "Define pilot scope, metrics, and guardrails" },
      { id: "c", label: "Begin team training broadly, then choose pilot scope after baseline capability assessment" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Early momentum comes from scoped pilots with clear controls.",
    quickCheckOptionExplanations: {
      a: "Broad rollout before proof often creates rework.",
      b: "This is the most reliable first-month pattern.",
      c: "Training-first can help readiness, but early momentum still requires a scoped pilot with measurable guardrails.",
    },
  },
  "ai-and-jobs": {
    scenarioTitle: "Pilot strategy scenario",
    scenarioBody:
      "You have several pilot candidates and limited resources. You need to choose pilots that are meaningful but still executable.",
    checklistTitle: "Pilot strategy checklist",
    checklistItems: [
      "Prioritize pilots with visible business value and low coordination overhead.",
      "Define stop/scale thresholds before launch.",
      "Reserve capacity for post-pilot process integration.",
    ],
    quickCheckPrompt: "What makes a pilot strategically useful?",
    quickCheckOptions: [
      { id: "a", label: "High visibility and stakeholder momentum, even with moderate business fit uncertainty" },
      { id: "b", label: "Clear value signal with realistic execution scope" },
      { id: "c", label: "Broader pilot scope where cross-team impact can justify the added coordination load" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Strong pilots balance impact and feasibility.",
    quickCheckOptionExplanations: {
      a: "Novelty is weak without value evidence.",
      b: "This is the most practical pilot design principle.",
      c: "Overscoped pilots often stall and underdeliver.",
    },
  },
  "industry-applications": {
    scenarioTitle: "Change management scenario",
    scenarioBody:
      "Teams are uncertain about how AI affects their roles. You need a change plan that improves adoption without creating confusion or resistance.",
    checklistTitle: "Change management checklist",
    checklistItems: [
      "Clarify role impacts and decision rights early.",
      "Provide training tied to real team workflows.",
      "Address concerns through regular communication loops.",
    ],
    quickCheckPrompt: "What is a common adoption failure mode?",
    quickCheckOptions: [
      { id: "a", label: "Launching tools without process and change plans" },
      { id: "b", label: "Assigning ownership without giving managers time for workflow redesign" },
      { id: "c", label: "Sequencing by technical readiness while underestimating frontline adoption friction" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Tool access without workflow and change design usually underperforms.",
    quickCheckOptionExplanations: {
      a: "This is a major source of adoption failure.",
      b: "This generally improves implementation quality.",
      c: "Readiness sequencing is a strong practice.",
    },
  },
  "ai-strategy": {
    scenarioTitle: "Champion network scenario",
    scenarioBody:
      "Central teams cannot support every workflow. You need internal champions across functions to accelerate local adoption quality.",
    checklistTitle: "Champion network checklist",
    checklistItems: [
      "Nominate champions in each major function.",
      "Define champion responsibilities and escalation path.",
      "Set a monthly cross-champion review forum.",
    ],
    quickCheckPrompt: "Why build internal AI champions?",
    quickCheckOptions: [
      { id: "a", label: "To replace functional managers" },
      { id: "b", label: "To drive cross-functional adoption and support" },
      { id: "c", label: "To bypass governance processes" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Champion networks scale implementation support without losing local context.",
    quickCheckOptionExplanations: {
      a: "Champions support managers; they do not replace them.",
      b: "This is the right operating purpose.",
      c: "Champions should reinforce governance, not bypass it.",
    },
  },
  "real-workflows": {
    scenarioTitle: "Sequencing scenario",
    scenarioBody:
      "Multiple teams request immediate rollout. You need a sequencing model that balances value, readiness, and implementation capacity.",
    checklistTitle: "Sequencing checklist",
    checklistItems: [
      "Score initiatives on value, readiness, and dependencies.",
      "Sequence by capacity to avoid change overload.",
      "Publish phase gates and prerequisite completion rules.",
    ],
    quickCheckPrompt: "How should roadmap sequencing be decided?",
    quickCheckOptions: [
      { id: "a", label: "Prioritize whichever team asks first" },
      { id: "b", label: "Run all pilots in parallel by default" },
      { id: "c", label: "Use value-readiness-dependency sequencing" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Sequencing with dependencies and readiness improves delivery reliability.",
    quickCheckOptionExplanations: {
      a: "Request order is a weak prioritization method.",
      b: "Parallel overload often reduces quality.",
      c: "This is the strongest rollout logic.",
    },
  },
  "ai-opportunities": {
    scenarioTitle: "Maturity model scenario",
    scenarioBody:
      "Leadership asks where the organization stands on AI maturity. You need a model that distinguishes experimentation from scalable operations.",
    checklistTitle: "Maturity assessment checklist",
    checklistItems: [
      "Define maturity stages with observable criteria.",
      "Score current stage by function.",
      "Set target stage milestones for next 12 months.",
    ],
    quickCheckPrompt: "What is the purpose of an AI maturity model?",
    quickCheckOptions: [
      { id: "a", label: "Rank teams by enthusiasm" },
      { id: "b", label: "Track capability progression toward scalable operations" },
      { id: "c", label: "Replace roadmap planning" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Maturity models help plan capability growth with clear stage targets.",
    quickCheckOptionExplanations: {
      a: "Enthusiasm is not a capability measure.",
      b: "This is the primary strategic use.",
      c: "Maturity models inform roadmaps; they do not replace them.",
    },
  },
  "role-transformation": {
    scenarioTitle: "Role redesign scenario",
    scenarioBody:
      "As AI workflows go live, responsibilities become unclear. You need to redesign roles, approvals, and accountability boundaries.",
    checklistTitle: "Role redesign checklist",
    checklistItems: [
      "Map existing vs future responsibilities by role.",
      "Clarify decision rights in human-AI workflows.",
      "Update performance expectations and support plans.",
    ],
    quickCheckPrompt: "What should role redesign focus on first?",
    quickCheckOptions: [
      { id: "a", label: "Reducing headcount targets only" },
      { id: "b", label: "Clarifying responsibilities and decision rights" },
      { id: "c", label: "Deferring role changes indefinitely" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Clear accountability is essential for reliable operation.",
    quickCheckOptionExplanations: {
      a: "This narrows transformation to a single dimension.",
      b: "This creates execution clarity and safety.",
      c: "Delayed clarity increases operational friction.",
    },
  },
  "workflow-redesign": {
    scenarioTitle: "Cadence and governance rhythm scenario",
    scenarioBody:
      "Execution is active but decisions are ad hoc. You need a repeatable operating cadence for outcomes, risks, and investment adjustments.",
    checklistTitle: "Operating cadence checklist",
    checklistItems: [
      "Set weekly delivery review and monthly governance review.",
      "Track outcome and risk indicators in one operating view.",
      "Define reinvest, pause, or pivot rules per initiative.",
    ],
    quickCheckPrompt: "Why establish a governance rhythm during rollout?",
    quickCheckOptions: [
      { id: "a", label: "To reduce visibility into results" },
      { id: "b", label: "To support consistent decisions as conditions change" },
      { id: "c", label: "To delay course correction" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Cadence improves decision quality and responsiveness during change.",
    quickCheckOptionExplanations: {
      a: "Governance should increase, not reduce, clarity.",
      b: "This is the core value of operating rhythm.",
      c: "Rhythm should accelerate adjustments, not delay them.",
    },
  },
  "building-ai-skills": {
    scenarioTitle: "12-month transformation scenario",
    scenarioBody:
      "You need a long-range plan that combines near-term wins with capability building. The roadmap must remain executable with current team capacity.",
    checklistTitle: "Long-term plan checklist",
    checklistItems: [
      "Set quarterly capability milestones and ownership.",
      "Balance training, tooling, and process redesign investments.",
      "Review plan quarterly against execution evidence.",
    ],
    quickCheckPrompt: "What defines a strong long-term AI transformation plan?",
    quickCheckOptions: [
      { id: "a", label: "One-time rollout with no revision cycle" },
      { id: "b", label: "Quarterly-updated plan tied to execution outcomes" },
      { id: "c", label: "Tool purchasing plan only" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Long-term plans must adapt based on measured progress and constraints.",
    quickCheckOptionExplanations: {
      a: "Static plans usually drift from reality.",
      b: "This is the practical transformation pattern.",
      c: "Tooling alone does not create capability.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Roadmap readiness checkpoint",
    scenarioBody:
      "You are presenting Module 7 to leadership. You must show a realistic, sequenced roadmap with clear ownership and change management support.",
    checklistTitle: "Roadmap execution readiness checklist",
    checklistItems: [
      "Present phased roadmap with value-readiness rationale.",
      "Show ownership model, champion network, and governance cadence.",
      "Include 30-day actions and 12-month capability milestones.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 7 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Aggressive multi-phase rollout with ownership assigned as initiatives mature" },
      { id: "b", label: "Sequenced, owned roadmap with operating rhythm" },
      { id: "c", label: "Sequenced technical roadmap with change management to be designed after early pilots" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Strong readiness combines sequencing, ownership, and governance rhythm.",
    quickCheckOptionExplanations: {
      a: "This often exceeds execution capacity.",
      b: "This is the expected outcome of Module 7.",
      c: "Change planning is essential to adoption success.",
    },
  },
}

const module8SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Automation architecture kickoff",
    scenarioBody:
      "Your team wants to deploy AI agents quickly, but architecture language is inconsistent. You need a grounded view of workflows, agents, and control boundaries before building.",
    checklistTitle: "Architecture kickoff checklist",
    checklistItems: [
      "Define the problem as workflow automation, autonomous behavior, or hybrid.",
      "Document success criteria and acceptable failure thresholds.",
      "Set control points for approval, escalation, and rollback.",
    ],
    quickCheckPrompt: "What is the first goal of Module 8?",
    quickCheckOptions: [
      { id: "a", label: "Choose a platform first, then define controls later" },
      { id: "b", label: "Clarify architecture choices and control requirements" },
      { id: "c", label: "Treat workflows and agents as the same architecture problem" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Strong automation programs begin with clear architecture and control design.",
    quickCheckOptionExplanations: {
      a: "This usually expands risk before design maturity exists.",
      b: "This is the intended foundation for the module.",
      c: "Reliability should come before novelty in production contexts.",
    },
  },
  "what-are-agents": {
    scenarioTitle: "Workflow versus agent decision",
    scenarioBody:
      "A business unit requests an agent for a repeatable process that has deterministic steps. You need to decide if an agent is necessary or if a workflow is a better fit.",
    checklistTitle: "Design choice checklist",
    checklistItems: [
      "Map deterministic versus open-ended decision points.",
      "Choose workflow automation for stable repeatable steps.",
      "Reserve true agent autonomy for high-variance tasks with safeguards.",
    ],
    quickCheckPrompt: "What distinction matters most when designing automation?",
    quickCheckOptions: [
      { id: "a", label: "Single-agent branding versus multi-agent branding" },
      { id: "b", label: "Workflow automation versus true autonomous agents" },
      { id: "c", label: "Open-source versus closed-source preference" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Correctly separating workflow and agent patterns avoids over-engineering.",
    quickCheckOptionExplanations: {
      a: "Naming style does not define architecture fit.",
      b: "This is the primary design distinction.",
      c: "Licensing model is secondary to behavior design.",
    },
  },
  "how-agents-work": {
    scenarioTitle: "Human-in-the-loop checkpoint design",
    scenarioBody:
      "You are automating a process with financial and customer impact. You must place human checkpoints where risk exceeds acceptable limits.",
    checklistTitle: "Checkpoint design checklist",
    checklistItems: [
      "Classify decision points by impact and reversibility.",
      "Require human approval for high-impact outcomes.",
      "Define escalation paths for uncertain model behavior.",
    ],
    quickCheckPrompt: "When is human-in-the-loop mandatory?",
    quickCheckOptions: [
      { id: "a", label: "Only for low-risk formatting tasks" },
      { id: "b", label: "Never if model confidence is high" },
      { id: "c", label: "For high-impact decisions and exception handling" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "High-impact automation must include human control for risk containment.",
    quickCheckOptionExplanations: {
      a: "Low-risk tasks usually need less manual intervention.",
      b: "Confidence scores are not substitutes for governance controls.",
      c: "This is the correct operating standard.",
    },
  },
  "types-of-agents": {
    scenarioTitle: "Orchestration platform evaluation",
    scenarioBody:
      "Your team is comparing automation platforms. You need to evaluate observability, fallback behavior, and ownership model before deployment.",
    checklistTitle: "Platform evaluation checklist",
    checklistItems: [
      "Assess workflow visibility and error tracing features.",
      "Validate fallback paths and rollback behavior.",
      "Confirm who owns operations, incidents, and maintenance.",
    ],
    quickCheckPrompt: "What causes many automation deployments to fail?",
    quickCheckOptions: [
      { id: "a", label: "No observability and no fallback plan" },
      { id: "b", label: "Constrained pilot scope with strong monitoring" },
      { id: "c", label: "Clear owners but no tested rollback path" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Without monitoring and rollback, automation systems become brittle and costly.",
    quickCheckOptionExplanations: {
      a: "This is a frequent root cause of production instability.",
      b: "Constrained pilots are usually a strong start pattern.",
      c: "Clear ownership generally improves resilience.",
    },
  },
  "real-world-applications": {
    scenarioTitle: "Capability scoping scenario",
    scenarioBody:
      "Stakeholders expect full autonomy immediately. You need to scope realistic capabilities based on reversibility, exception rates, and process maturity.",
    checklistTitle: "Capability scoping checklist",
    checklistItems: [
      "Pick one high-frequency workflow with measurable outcomes.",
      "Define exception thresholds and manual handoff rules.",
      "Set staged autonomy levels by reliability evidence.",
    ],
    quickCheckPrompt: "What is the best first step for agent adoption?",
    quickCheckOptions: [
      { id: "a", label: "Roll out to two high-visibility teams at once for faster learning" },
      { id: "b", label: "Pilot one constrained workflow with controls" },
      { id: "c", label: "Start with broad autonomy and add controls after the first month" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Constrained pilots create measurable evidence while limiting exposure.",
    quickCheckOptionExplanations: {
      a: "Broad autonomy too early often creates operational failures.",
      b: "This is the strongest initial execution strategy.",
      c: "Reliability should lead design decisions.",
    },
  },
  "building-with-agents": {
    scenarioTitle: "Multi-agent trade-off scenario",
    scenarioBody:
      "A vendor proposes a complex multi-agent system, but your use case may not require it. You need a decision rule for when complexity is justified.",
    checklistTitle: "Complexity control checklist",
    checklistItems: [
      "Start with the simplest architecture that meets requirements.",
      "Add agent roles only for clear functional separation needs.",
      "Measure reliability impact before expanding architecture complexity.",
    ],
    quickCheckPrompt: "When should multi-agent design be considered?",
    quickCheckOptions: [
      { id: "a", label: "By default for all automation projects" },
      { id: "b", label: "Only when simpler workflows cannot meet requirements" },
      { id: "c", label: "Whenever stakeholders ask for advanced architecture" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Complexity should be added only when justified by measurable needs.",
    quickCheckOptionExplanations: {
      a: "Default complexity creates avoidable maintenance burden.",
      b: "This keeps systems understandable and resilient.",
      c: "Preference alone is not an architecture criterion.",
    },
  },
  "risks-and-limits": {
    scenarioTitle: "Production blueprint scenario",
    scenarioBody:
      "Your pilot worked, and leadership wants production rollout. You need an operational blueprint that includes ownership, monitoring, and recovery procedures.",
    checklistTitle: "Production blueprint checklist",
    checklistItems: [
      "Define runtime ownership, support SLAs, and escalation trees.",
      "Instrument monitoring for accuracy, latency, and failure modes.",
      "Document rollback triggers and restoration procedures.",
    ],
    quickCheckPrompt: "What belongs in a production-ready automation blueprint?",
    quickCheckOptions: [
      { id: "a", label: "Model choice only" },
      { id: "b", label: "Ownership, observability, fallback, and incident response" },
      { id: "c", label: "A demo script and feature list" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Production readiness depends on operating controls, not just capability.",
    quickCheckOptionExplanations: {
      a: "Model selection is only one part of production design.",
      b: "This is the required operational foundation.",
      c: "Demo materials do not establish runtime resilience.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Automation design checkpoint",
    scenarioBody:
      "You are presenting Module 8 outputs. Leadership expects a practical automation plan with architecture fit, control gates, and operational safeguards.",
    checklistTitle: "Automation design readiness checklist",
    checklistItems: [
      "Show workflow-versus-agent rationale for the selected use case.",
      "Include human checkpoint design and exception escalation paths.",
      "Present production blueprint with ownership and rollback criteria.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 8 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Ambitious multi-agent design with governance to be defined in phase two" },
      { id: "b", label: "Constrained design with clear controls and operating ownership" },
      { id: "c", label: "High-autonomy rollout with manual review only for severe incidents" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness means reliable design, governance controls, and operational accountability.",
    quickCheckOptionExplanations: {
      a: "Complexity without controls increases risk.",
      b: "This is the expected quality bar for the module.",
      c: "No fallback model is a major production risk.",
    },
  },
}

const module9SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Stack strategy kickoff",
    scenarioBody:
      "Your organization has multiple AI tools and unclear ownership. You need stack design principles that reduce sprawl and improve long-term maintainability.",
    checklistTitle: "Strategy kickoff checklist",
    checklistItems: [
      "Define stack objectives: reliability, cost control, and governance.",
      "Document current tool overlap and ownership gaps.",
      "Set decision criteria for keeping, replacing, or consolidating tools.",
    ],
    quickCheckPrompt: "What is the first objective of Module 9?",
    quickCheckOptions: [
      { id: "a", label: "Maximize the number of tools in use" },
      { id: "b", label: "Define sustainable stack principles and ownership" },
      { id: "c", label: "Decentralize every purchasing decision" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "A durable stack starts with design principles and clear accountability.",
    quickCheckOptionExplanations: {
      a: "Tool volume is not a strategy outcome.",
      b: "This is the core framing for the module.",
      c: "Uncoordinated purchasing often creates sprawl.",
    },
  },
  "explain-ai": {
    scenarioTitle: "Tool sprawl containment scenario",
    scenarioBody:
      "Teams are buying overlapping AI products independently. You need intake and governance gates that prevent duplicate capability and fragmented risk ownership.",
    checklistTitle: "Sprawl control checklist",
    checklistItems: [
      "Create a centralized intake process for new AI tool requests.",
      "Require scoring against existing stack capabilities.",
      "Add governance gates for legal, security, and operations.",
    ],
    quickCheckPrompt: "What is the strongest defense against tool sprawl?",
    quickCheckOptions: [
      { id: "a", label: "Centralized intake, scoring, and governance gates" },
      { id: "b", label: "Independent team-level purchasing" },
      { id: "c", label: "A blanket ban on new tools" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Centralized intake preserves flexibility while controlling duplication and risk.",
    quickCheckOptionExplanations: {
      a: "This is the most practical anti-sprawl pattern.",
      b: "Independent buying tends to increase overlap.",
      c: "Total bans can block necessary innovation.",
    },
  },
  "tool-selection": {
    scenarioTitle: "Integration architecture scenario",
    scenarioBody:
      "A new tool has strong features but weak integration support. You need to decide whether adoption will reduce or increase manual operations.",
    checklistTitle: "Integration decision checklist",
    checklistItems: [
      "Map data flow and API fit to existing systems.",
      "Estimate manual workaround burden at scale.",
      "Prioritize options with stable integration and low operational friction.",
    ],
    quickCheckPrompt: "Why does integration strategy matter in stack design?",
    quickCheckOptions: [
      { id: "a", label: "Integration can be handled later if the model output quality is high" },
      { id: "b", label: "Integration assessment should be owned only by IT, not workflow teams" },
      { id: "c", label: "Poor integration creates manual work and inconsistency" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Integration quality determines whether AI capability becomes repeatable operational value.",
    quickCheckOptionExplanations: {
      a: "This underestimates long-term operating cost.",
      b: "Integration affects business outcomes across functions.",
      c: "This is the practical reason integration strategy is critical.",
    },
  },
  "prompting-assistants": {
    scenarioTitle: "Consolidation trade-off scenario",
    scenarioBody:
      "Your stack has overlapping tools with rising costs. You need to consolidate where sensible without reducing needed capability or resilience.",
    checklistTitle: "Consolidation checklist",
    checklistItems: [
      "Identify overlap in feature sets and workflow usage.",
      "Compare total ownership cost and support overhead.",
      "Consolidate only when maintainability gains outweigh switching risk.",
    ],
    quickCheckPrompt: "What is a practical consolidation criterion?",
    quickCheckOptions: [
      { id: "a", label: "Consolidate primarily where procurement discounts are largest" },
      { id: "b", label: "Consolidate based on overlap, cost, and maintainability" },
      { id: "c", label: "Preserve every tool to avoid any migration effort" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Consolidation should be evidence-based and tied to operating simplicity.",
    quickCheckOptionExplanations: {
      a: "Popularity is a weak optimization criterion.",
      b: "This is the strongest practical approach.",
      c: "No consolidation can increase cost and complexity.",
    },
  },
  "risk-check": {
    scenarioTitle: "Procurement control scenario",
    scenarioBody:
      "Procurement standards vary by team and approvals are inconsistent. You need a unified framework that enforces legal, security, and operational controls.",
    checklistTitle: "Procurement framework checklist",
    checklistItems: [
      "Standardize legal, security, and data-rights requirements.",
      "Require operating owner sign-off before purchase.",
      "Create exception process with explicit risk acceptance.",
    ],
    quickCheckPrompt: "What is the purpose of procurement controls in AI stack design?",
    quickCheckOptions: [
      { id: "a", label: "To force a single approval speed for all use cases" },
      { id: "b", label: "To reduce avoidable legal and operational risk" },
      { id: "c", label: "To centralize every experiment under one procurement cycle" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Controls create consistency and reduce downstream failure risk.",
    quickCheckOptionExplanations: {
      a: "Good controls should guide, not block, progress.",
      b: "This is the main governance objective.",
      c: "Experimentation should continue within guardrails.",
    },
  },
  "ai-workflows": {
    scenarioTitle: "Maintainability operations scenario",
    scenarioBody:
      "Tools are running but no one owns upgrades, model drift checks, or support pathways. You need a maintainability model with clear responsibilities.",
    checklistTitle: "Maintainability checklist",
    checklistItems: [
      "Assign ownership for updates, monitoring, and user support.",
      "Define routine review cadence for cost, quality, and risk posture.",
      "Document deprecation and replacement process for aging tools.",
    ],
    quickCheckPrompt: "What is essential for long-term stack maintainability?",
    quickCheckOptions: [
      { id: "a", label: "Relying on original purchase team only" },
      { id: "b", label: "Defined operational ownership and lifecycle processes" },
      { id: "c", label: "Avoiding all tool changes after deployment" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Durable stacks require explicit lifecycle ownership and review discipline.",
    quickCheckOptionExplanations: {
      a: "Purchase ownership is not enough for operations.",
      b: "This is the required operating baseline.",
      c: "Static stacks usually degrade over time.",
    },
  },
  "ai-project": {
    scenarioTitle: "Ownership blueprint scenario",
    scenarioBody:
      "Leadership asks who owns outcomes, governance, and vendor relationships. You need a clear ownership blueprint across strategic and operational layers.",
    checklistTitle: "Ownership blueprint checklist",
    checklistItems: [
      "Define owners for strategy, operations, risk, and vendor management.",
      "Map accountability handoffs across lifecycle stages.",
      "Publish escalation and decision-right pathways.",
    ],
    quickCheckPrompt: "What should internal ownership clarify in an AI stack?",
    quickCheckOptions: [
      { id: "a", label: "Who owns outcomes, operations, risk, and vendors" },
      { id: "b", label: "Only who signed the original purchase order" },
      { id: "c", label: "Only which team uses the tool most" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Complete ownership models prevent delivery and governance gaps.",
    quickCheckOptionExplanations: {
      a: "This is the full accountability framework needed for scale.",
      b: "Procurement ownership alone is insufficient.",
      c: "Usage concentration does not define end-to-end accountability.",
    },
  },
  "next-steps": {
    scenarioTitle: "Stack plan finalization scenario",
    scenarioBody:
      "You are finalizing your stack decisions for the next two quarters. You need a structured plan with priorities, owners, and implementation dates.",
    checklistTitle: "Next-step planning checklist",
    checklistItems: [
      "Finalize keep, consolidate, and pilot decisions by tool category.",
      "Assign owners and timelines for each stack initiative.",
      "Schedule governance checkpoints for implementation tracking.",
    ],
    quickCheckPrompt: "What makes a stack decision plan actionable?",
    quickCheckOptions: [
      { id: "a", label: "High-level recommendations without owners" },
      { id: "b", label: "Prioritized actions with ownership and timelines" },
      { id: "c", label: "A vendor list without implementation plan" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Actionability depends on specific owners, sequencing, and review cadence.",
    quickCheckOptionExplanations: {
      a: "Without owners, execution accountability is weak.",
      b: "This creates operational follow-through.",
      c: "Lists are not equivalent to plans.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Stack strategy checkpoint",
    scenarioBody:
      "You are presenting Module 9 recommendations and must justify stack design decisions with ownership clarity and governance controls.",
    checklistTitle: "Stack strategy readiness checklist",
    checklistItems: [
      "Show keep, consolidate, and pilot decisions with rationale.",
      "Clarify ownership for operations, governance, and vendor management.",
      "Include integration and risk controls in the rollout plan.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 9 readiness?",
    quickCheckOptions: [
      { id: "a", label: "A broad tool catalog with phased ownership to be finalized later" },
      { id: "b", label: "A prioritized stack plan with owners, controls, and consolidation logic" },
      { id: "c", label: "Independent team-level purchasing with optional governance reviews" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness requires clear operating ownership, control design, and evidence-based stack decisions.",
    quickCheckOptionExplanations: {
      a: "Catalogs are not enough without execution structure.",
      b: "This is the module's expected decision-ready output.",
      c: "Decentralized buying without controls increases sprawl risk.",
    },
  },
}

const module10SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Future strategy kickoff",
    scenarioBody:
      "Leadership needs a forward-looking AI strategy, but attention is fragmented by hype cycles. You need to prioritize signals that materially affect competitiveness.",
    checklistTitle: "Future strategy checklist",
    checklistItems: [
      "Identify high-impact market and capability shifts.",
      "Separate speculative noise from decision-relevant signals.",
      "Tie each signal to potential strategic action.",
    ],
    quickCheckPrompt: "Which future signal should leaders prioritize most?",
    quickCheckOptions: [
      { id: "a", label: "Audience growth and social buzz around model announcements" },
      { id: "b", label: "Shifts affecting economics and execution" },
      { id: "c", label: "Speculative timelines without direct implication for your strategy" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Decision-relevant signals are those that materially affect margin, value, or speed.",
    quickCheckOptionExplanations: {
      a: "Attention signals are weaker than operating impact signals.",
      b: "This is the strongest strategic filter.",
      c: "Speculation should not dominate planning.",
    },
  },
  "current-frontiers": {
    scenarioTitle: "Commoditization response scenario",
    scenarioBody:
      "Model costs are dropping and differentiation is shifting. You need to reposition strategy toward workflow excellence and integration quality.",
    checklistTitle: "Commoditization response checklist",
    checklistItems: [
      "Identify where differentiation can move up the stack.",
      "Strengthen integration and workflow design capabilities.",
      "Adjust vendor strategy based on pricing and portability trends.",
    ],
    quickCheckPrompt: "What does model commoditization usually imply?",
    quickCheckOptions: [
      { id: "a", label: "Differentiation moves to execution and integration" },
      { id: "b", label: "Differentiation should remain centered on selecting one premium model" },
      { id: "c", label: "Lower model pricing means stack and workflow design can be deprioritized" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "As core models commoditize, execution discipline becomes the main advantage source.",
    quickCheckOptionExplanations: {
      a: "This reflects the most likely competitive shift.",
      b: "Model choice remains important but not sufficient.",
      c: "Strategic positioning becomes more important, not less.",
    },
  },
  "agi-explained": {
    scenarioTitle: "Service model evolution scenario",
    scenarioBody:
      "You rely on external agencies for AI execution, but service models are changing quickly. You need to decide what capabilities to keep internal versus externalize.",
    checklistTitle: "Service model checklist",
    checklistItems: [
      "Map strategic capabilities to internal ownership priorities.",
      "Identify execution tasks suitable for external partners.",
      "Design transition plan as tooling and agency models evolve.",
    ],
    quickCheckPrompt: "What is the best way to respond to changing service models?",
    quickCheckOptions: [
      { id: "a", label: "Outsource all strategic capabilities" },
      { id: "b", label: "Use a hybrid model with clear capability boundaries" },
      { id: "c", label: "Freeze capability decisions for one year" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Hybrid capability models improve adaptability while preserving strategic control.",
    quickCheckOptionExplanations: {
      a: "Full outsourcing can weaken long-term differentiation.",
      b: "This is a resilient and practical response pattern.",
      c: "Freezing decisions slows competitiveness.",
    },
  },
  "ai-governance": {
    scenarioTitle: "AI-native operating model scenario",
    scenarioBody:
      "Competitors are redesigning operations around AI-assisted decisions. You need to evaluate which operating model changes are necessary for speed and quality.",
    checklistTitle: "Operating model checklist",
    checklistItems: [
      "Identify decision cycles that can be accelerated with AI.",
      "Redesign workflow ownership for AI-assisted execution.",
      "Align governance with faster iteration rhythms.",
    ],
    quickCheckPrompt: "What defines an AI-native operating model?",
    quickCheckOptions: [
      { id: "a", label: "Adding AI tools without process redesign" },
      { id: "b", label: "Redesigning teams and decision flows around AI capabilities" },
      { id: "c", label: "Keeping operating cadence unchanged" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "AI-native models require structural workflow and decision redesign, not just tooling.",
    quickCheckOptionExplanations: {
      a: "Tooling alone does not create operating transformation.",
      b: "This is the module's intended strategic standard.",
      c: "Unchanged cadence may limit realized value.",
    },
  },
  "ai-careers": {
    scenarioTitle: "Workforce transition scenario",
    scenarioBody:
      "AI adoption is changing task composition across roles. You need a workforce transition plan that addresses role evolution, capability building, and leadership expectations.",
    checklistTitle: "Workforce transition checklist",
    checklistItems: [
      "Map role changes by function and decision responsibility.",
      "Define targeted training and support pathways.",
      "Update leadership expectations for AI-assisted performance.",
    ],
    quickCheckPrompt: "How should leaders approach workforce implications?",
    quickCheckOptions: [
      { id: "a", label: "Assume role design remains unchanged" },
      { id: "b", label: "Delay planning until disruption is complete" },
      { id: "c", label: "Plan role evolution, training, and decision-right updates" },
    ],
    quickCheckCorrectOptionId: "c",
    quickCheckExplanation: "Proactive workforce redesign reduces transition risk and improves adoption quality.",
    quickCheckOptionExplanations: {
      a: "Static role assumptions often fail under transformation.",
      b: "Delayed planning increases disruption cost.",
      c: "This is the strongest leadership response.",
    },
  },
  "your-ai-future": {
    scenarioTitle: "Strategic positioning playbook scenario",
    scenarioBody:
      "You need to choose where your organization should differentiate in an AI-shaped market. The plan must focus bets, partnerships, and execution priorities.",
    checklistTitle: "Positioning playbook checklist",
    checklistItems: [
      "Define focused strategic bets aligned to competitive advantage.",
      "Decide where to partner versus build capabilities internally.",
      "Set measurable milestones for strategic execution.",
    ],
    quickCheckPrompt: "What defines a strong strategic positioning response to AI?",
    quickCheckOptions: [
      { id: "a", label: "Following every trend equally" },
      { id: "b", label: "Selecting focused bets aligned to advantage" },
      { id: "c", label: "Outsourcing all strategy decisions" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Focused positioning and disciplined execution create durable advantage.",
    quickCheckOptionExplanations: {
      a: "Diffuse bets dilute execution and competitiveness.",
      b: "This is the strongest strategic pattern.",
      c: "Strategy ownership cannot be fully delegated.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Future readiness checkpoint",
    scenarioBody:
      "You are presenting Module 10 outputs to leadership. You must show a future-aware strategy grounded in market signals, capability bets, and execution discipline.",
    checklistTitle: "Future strategy readiness checklist",
    checklistItems: [
      "Prioritize high-impact future signals with clear implications.",
      "Present focused strategic bets and partnership choices.",
      "Include workforce and operating model transition actions.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 10 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Broad trend coverage with optional initiatives and evolving ownership" },
      { id: "b", label: "Focused strategic bets with execution plan and ownership" },
      { id: "c", label: "Compelling future narrative without near-term operating commitments" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness requires strategic focus, role clarity, and actionable execution plans.",
    quickCheckOptionExplanations: {
      a: "Trend chasing weakens strategic coherence.",
      b: "This is the expected outcome of the module.",
      c: "Vision without execution is not decision-ready.",
    },
  },
}

export function CourseModulePage({ moduleId }: CourseModulePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((item) => item.id === moduleId)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const currentSection = sections[currentSectionIndex]
  const completedSectionIds = getCompletedSections(moduleId)

  const questions = moduleQuizData[moduleId] ?? []
  const quizKeys = useMemo(() => questions.map((question) => question.key), [questions])
  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz<string>(moduleId, quizKeys)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((section) => section.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) {
        setCurrentSectionIndex(idx)
      }
    }
  }, [currentSectionIndex, sectionParam, sections])

  const goToSection = (index: number) => {
    const target = sections[index]
    if (!target) return

    setCurrentSectionIndex(index)
    setCurrentPosition(moduleId, target.id)
    router.push(`/course/${moduleId}?section=${target.id}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSectionComplete = () => {
    if (!currentSection) return

    markSectionComplete(moduleId, currentSection.id)
    setCurrentPosition(moduleId, currentSection.id)

    if (currentSectionIndex < totalSections - 1) {
      goToSection(currentSectionIndex + 1)
      return
    }

    router.push("/course")
  }

  const explainerAttributes = getExplainerAttributes({
    type: "AI adoption learning workspace",
    title: module?.title ?? "AI adoption module",
    explanation: currentSection
      ? `You are viewing ${currentSection.title}, section ${currentSectionIndex + 1} of ${totalSections}. Completed sections: ${completedSectionIds.length} of ${totalSections}. Review the scenario, use the checklist, answer the checkpoint, and continue to the next section.`
      : "Work through each section to build your implementation-ready AI strategy.",
  })

  if (!module) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <p>Module not found.</p>
        </main>
      </div>
    )
  }

  const completionReady = completedSectionIds.length === totalSections
  const sectionLearningContent =
    currentSection && moduleId === "module-0"
      ? module0SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-1"
      ? module1SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-2"
      ? module2SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-3"
      ? module3SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-4"
      ? module4SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-5"
      ? module5SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-6"
      ? module6SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-7"
      ? module7SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-8"
      ? module8SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-9"
      ? module9SectionLearningContent[currentSection.id]
      : currentSection && moduleId === "module-10"
      ? module10SectionLearningContent[currentSection.id]
      : undefined

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main {...explainerAttributes} className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{module.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{module.description ?? "Practical frameworks for AI adoption and confident decision-making."}</p>
            <ProgressBar current={completedSectionIds.length} total={Math.max(totalSections, 1)} label="Module Progress" />
          </div>

          {currentSection ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">{currentSection.title}</h2>
              <TextDisplay
                variant="callout"
                content={currentSection.summary ?? "Use this section to sharpen your decision quality and implementation discipline."}
              />

              {sectionLearningContent ? (
                <Card className="p-5 border-brand-indigo/20 bg-brand-indigo/5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-indigo/80">Scenario</p>
                    <p className="text-lg font-semibold text-brand-indigo">{sectionLearningContent.scenarioTitle}</p>
                    <p className="text-sm text-muted-foreground mt-1">{sectionLearningContent.scenarioBody}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-indigo/80">Action Checklist</p>
                    <p className="text-sm font-medium text-foreground mt-1">{sectionLearningContent.checklistTitle}</p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                      {sectionLearningContent.checklistItems.map((item) => (
                        <li key={`${moduleId}-${currentSection.id}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ) : null}

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green/80">Checkpoint</p>
                  <p className="text-sm text-muted-foreground">Use this quick check to confirm you can apply the section in a real situation.</p>
                </div>
                <QuickCheckCard
                  key={`${moduleId}-${currentSection.id}-quick-check`}
                  prompt={sectionLearningContent?.quickCheckPrompt ?? `What is the strongest next move after completing "${currentSection.title}"?`}
                  options={sectionLearningContent?.quickCheckOptions ?? [
                    { id: "a", label: "Buy a tool immediately based on a demo" },
                    { id: "b", label: "Translate insights into a scoped decision plan with owners and metrics" },
                    { id: "c", label: "Wait until the market is fully stable" },
                  ]}
                  correctOptionId={sectionLearningContent?.quickCheckCorrectOptionId ?? "b"}
                  explanation={sectionLearningContent?.quickCheckExplanation ?? "High-quality AI decisions require a scoped plan, clear owners, measurable outcomes, and risk controls."}
                  optionExplanations={sectionLearningContent?.quickCheckOptionExplanations ?? {
                    a: "Demo quality alone is a weak signal. Procurement should follow structured evaluation.",
                    b: "This is the implementation-focused, beginner-friendly approach.",
                    c: "Delays often increase strategic risk without improving decision quality.",
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={currentSectionIndex === 0}
                  onClick={() => goToSection(currentSectionIndex - 1)}
                >
                  Previous Section
                </Button>
                <Button type="button" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={handleSectionComplete}>
                  {currentSectionIndex === totalSections - 1 ? "Complete Section" : "Complete and Continue"}
                </Button>
              </div>
            </div>
          ) : (
            <p>No sections configured for this module yet.</p>
          )}

          {completionReady && questions.length > 0 && (
            <div className="mt-10 space-y-5">
              <h3 className="text-2xl font-semibold text-brand-indigo">Module checkpoint</h3>
              <TextDisplay content="Use this checkpoint to validate what you learned before moving to the next module." />
              <ModuleQuiz
                key={`${moduleId}-course-quiz`}
                questions={questions}
                results={quizResults}
                onAnswer={handleQuizComplete}
                componentId={`${moduleId}-course-quiz`}
              />
              {allQuizComplete ? (
                <Card className="p-4 border-brand-green/30 bg-brand-green/10 text-sm text-brand-indigo">
                  Checkpoint complete. You have validated readiness to apply this module in real business decisions.
                </Card>
              ) : null}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
