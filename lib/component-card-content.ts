import { courseStructure } from "@/lib/course-structure"
import { hashString, toSentence } from "@/lib/text-content-utils"
import { SECTION_KNOWLEDGE_PATTERNS, type SectionKnowledgePattern } from "@/lib/text-display-content"

export type SectionLearningContent = {
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
      "You are new to AI and are hearing conflicting opinions. Your goal is to build a clear mental model of what changed recently and why this wave is more practical than earlier AI hype cycles.",
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
      "You are evaluating AI tools and are seeing bold claims everywhere. You need a simple way to separate truly useful capabilities from hype before spending time or money.",
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
      "You are deciding how to run your first 2-week AI adoption sprint. The objective is to test one workflow, capture evidence, and define next decisions without overcommitting.",
    checklistTitle: "Safe start checklist",
    checklistItems: [
      "Pick one repeatable workflow with clear before-and-after comparison.",
      "Choose one existing tool and note why it fits your current constraints.",
      "Set a 2-week test window with a single review meeting and owner.",
    ],
    quickCheckPrompt: "What is the best first adoption move for beginners?",
    quickCheckOptions: [
      { id: "a", label: "Run one short, scoped sprint in a single workflow with clear ownership" },
      { id: "b", label: "Run parallel pilots in multiple workflows to maximize early coverage" },
      { id: "c", label: "Delay all experiments until a full enterprise AI policy is complete" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "A single scoped sprint creates credible learning while keeping risk and coordination cost low.",
    quickCheckOptionExplanations: {
      a: "This is the best beginner pattern for disciplined adoption.",
      b: "Too much scope early makes results harder to trust or compare.",
      c: "Over-delaying slows capability building and decision confidence.",
    },
  },
  summary: {
    scenarioTitle: "Wrap-up scenario",
    scenarioBody:
      "You are finishing Module 0 and preparing to brief your manager. You need a simple 30-day adoption plan that names what to test, who owns decisions, and which partner support is required.",
    checklistTitle: "30-day starter checklist",
    checklistItems: [
      "Name one workflow, one tool candidate, and one contingency option.",
      "Document selection criteria, required partner capabilities, and budget boundary.",
      "Assign owner, success metric, and guardrail for the first 30 days.",
    ],
    quickCheckPrompt: "What should you leave Module 0 with?",
    quickCheckOptions: [
      { id: "a", label: "A ranked list of AI products without ownership, budget, or partner criteria" },
      { id: "b", label: "A decision-ready 30-day plan with owner, tool criteria, partner path, metric, and guardrail" },
      { id: "c", label: "A research memo that postpones decisions until the next quarter" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Module 0 should conclude with a decision-ready plan, not disconnected research or shopping lists.",
    quickCheckOptionExplanations: {
      a: "Lists without owners and constraints rarely move into execution.",
      b: "This is the intended outcome of the module wrap-up.",
      c: "Deferring decisions weakens momentum and slows validated learning.",
    },
  },
}

const module1SectionLearningContent: Record<string, SectionLearningContent> = {
  "module-overview": {
    scenarioTitle: "Concept map scenario",
    scenarioBody:
      "Your team uses AI language inconsistently, so conversations collapse into buzzwords. You need a shared conceptual map before discussing vendors, costs, or implementation plans.",
    checklistTitle: "Concept map checklist",
    checklistItems: [
      "Define core layers: model, application, workflow automation, and agent behavior.",
      "Write one plain-language definition for each layer.",
      "Capture two terms your team currently confuses and resolve them.",
    ],
    quickCheckPrompt: "Why start Module 1 with a landscape map?",
    quickCheckOptions: [
      { id: "a", label: "To establish shared conceptual language before making downstream decisions" },
      { id: "b", label: "To choose a preferred vendor early and align quickly" },
      { id: "c", label: "To avoid discussing uncertainty until implementation begins" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Conceptual alignment improves judgment quality before any tool decision is made.",
    quickCheckOptionExplanations: {
      a: "This is the primary objective of the section.",
      b: "Vendor choice without shared definitions increases confusion.",
      c: "Avoiding uncertainty reduces learning quality.",
    },
  },
  "defining-ai": {
    scenarioTitle: "Classification scenario",
    scenarioBody:
      "A teammate labels every AI product an agent, even when it only generates responses. You need to classify capabilities accurately so claims match reality.",
    checklistTitle: "Capability classification checklist",
    checklistItems: [
      "Separate perception, reasoning, and action capabilities.",
      "Distinguish single-response tools from systems that execute multi-step tasks.",
      "Document one misclassification and explain why it matters.",
    ],
    quickCheckPrompt: "Which distinction most improves conceptual accuracy?",
    quickCheckOptions: [
      { id: "a", label: "Model vs tool vs automation vs agent" },
      { id: "b", label: "Open-source vs closed-source branding" },
      { id: "c", label: "Desktop UI vs mobile UI" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Correct category labels prevent capability confusion and weak reasoning.",
    quickCheckOptionExplanations: {
      a: "This is the foundational taxonomy for the module.",
      b: "Licensing choices do not replace capability classification.",
      c: "Interface style is unrelated to AI system type.",
    },
  },
  "brief-history": {
    scenarioTitle: "History interpretation scenario",
    scenarioBody:
      "Your team is overreacting to current AI hype cycles. You need a historical lens that explains why capability progress, infrastructure readiness, and adoption timing do not move at the same speed.",
    checklistTitle: "AI history reasoning checklist",
    checklistItems: [
      "Identify one hype wave and one AI winter pattern.",
      "Explain what changed in data, compute, and tooling since earlier cycles.",
      "Describe one lesson history gives for present-day decisions.",
    ],
    quickCheckPrompt: "Why is AI history useful for current strategy?",
    quickCheckOptions: [
      { id: "a", label: "It helps distinguish durable shifts from temporary hype cycles" },
      { id: "b", label: "It removes uncertainty by predicting exact winners" },
      { id: "c", label: "It proves every AI wave follows the same adoption path" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Historical context improves calibration and reduces reactive decisions.",
    quickCheckOptionExplanations: {
      a: "This is the strongest strategic use of history.",
      b: "History can reduce uncertainty, not eliminate it.",
      c: "Patterns repeat partially, not mechanically.",
    },
  },
  "types-of-ai": {
    scenarioTitle: "Capability-claim scenario",
    scenarioBody:
      "A discussion mixes narrow AI, AGI, and superintelligence as if they were interchangeable. You need to separate these claims so the team can reason about realistic capabilities.",
    checklistTitle: "Capability claim checklist",
    checklistItems: [
      "Define narrow AI with one concrete workplace example.",
      "Explain why AGI is a broader, unresolved capability claim.",
      "Name one decision that changes when these categories are confused.",
    ],
    quickCheckPrompt: "Why does distinguishing AI types matter?",
    quickCheckOptions: [
      { id: "a", label: "It prevents unrealistic expectations and policy mistakes" },
      { id: "b", label: "It mainly improves interface design choices" },
      { id: "c", label: "It removes the need for uncertainty planning" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Category confusion leads to weak planning and distorted risk judgments.",
    quickCheckOptionExplanations: {
      a: "This captures the core reason the distinction matters.",
      b: "UI choices are secondary to capability framing.",
      c: "Uncertainty planning remains essential.",
    },
  },
  "ai-in-your-life": {
    scenarioTitle: "Everyday AI visibility scenario",
    scenarioBody:
      "People on your team think AI only means chatbots. You need to show how recommendation, ranking, filtering, and prediction systems already shape daily work.",
    checklistTitle: "Visibility checklist",
    checklistItems: [
      "Identify three invisible AI touchpoints in a normal workday.",
      "Describe what each system predicts or prioritizes.",
      "Note one failure mode for each touchpoint.",
    ],
    quickCheckPrompt: "What is the main value of mapping AI in daily life?",
    quickCheckOptions: [
      { id: "a", label: "It makes hidden decision systems visible for better oversight" },
      { id: "b", label: "It proves all workflows need full automation" },
      { id: "c", label: "It reduces the need for human review" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Visibility is the first step toward responsible use and better judgment.",
    quickCheckOptionExplanations: {
      a: "This is the intended learning outcome.",
      b: "The section is about visibility, not blanket automation.",
      c: "Human review remains critical.",
    },
  },
  "myths-vs-reality": {
    scenarioTitle: "Myth correction scenario",
    scenarioBody:
      "Your team repeats common claims like 'AI is always objective' and 'AI understands like humans.' You need a method to challenge myths using mechanism-level reasoning.",
    checklistTitle: "Myth correction checklist",
    checklistItems: [
      "List two common myths and the mechanism that disproves each one.",
      "Separate confidence in wording from evidence quality.",
      "Write one verification step that addresses each myth.",
    ],
    quickCheckPrompt: "What is the strongest way to debunk AI myths?",
    quickCheckOptions: [
      { id: "a", label: "Use mechanism and evidence instead of slogans" },
      { id: "b", label: "Replace old myths with optimistic new assumptions" },
      { id: "c", label: "Avoid discussing failure modes to reduce resistance" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Reliable correction uses claims, mechanisms, and verifiable evidence.",
    quickCheckOptionExplanations: {
      a: "This is the core literacy method for this section.",
      b: "Replacing one assumption with another is not analysis.",
      c: "Ignoring failure modes weakens decisions.",
    },
  },
  "ai-writing": {
    scenarioTitle: "Writing assistant capability scenario",
    scenarioBody:
      "A team member treats writing output quality as proof of factual reliability. You need to distinguish fluency from truth and define responsible editing behavior.",
    checklistTitle: "Writing assistant checklist",
    checklistItems: [
      "Identify where the assistant helps structure versus where facts must be verified.",
      "Add a source-check step for claims with external consequences.",
      "Define one red-line case where human rewrite is mandatory.",
    ],
    quickCheckPrompt: "What is the key risk with AI writing assistants?",
    quickCheckOptions: [
      { id: "a", label: "Confusing polished wording with validated accuracy" },
      { id: "b", label: "Using templates to improve draft structure" },
      { id: "c", label: "Reducing first-draft writing time" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Fluency is not evidence; high-impact claims still require verification.",
    quickCheckOptionExplanations: {
      a: "This is the most common reasoning failure.",
      b: "This can be useful when quality controls are present.",
      c: "Efficiency gains are beneficial but not the core risk.",
    },
  },
  "ai-images": {
    scenarioTitle: "Image generation interpretation scenario",
    scenarioBody:
      "A generated image looks highly realistic, and a teammate assumes it is factual. You need to explain why realism and authenticity are different claims.",
    checklistTitle: "Image reasoning checklist",
    checklistItems: [
      "Separate visual plausibility from source verifiability.",
      "List one misuse risk and one responsible-use control.",
      "Define when synthetic images require explicit disclosure.",
    ],
    quickCheckPrompt: "What is the most important judgment in AI image use?",
    quickCheckOptions: [
      { id: "a", label: "Whether an image appears realistic at first glance" },
      { id: "b", label: "Whether authenticity claims are independently verifiable" },
      { id: "c", label: "Whether style quality improves audience engagement" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Authenticity requires evidence beyond visual quality.",
    quickCheckOptionExplanations: {
      a: "Realism can be synthetic and misleading.",
      b: "Verification is the strongest standard for authenticity claims.",
      c: "Aesthetic quality does not establish truth.",
    },
  },
  "ai-productivity": {
    scenarioTitle: "Productivity framing scenario",
    scenarioBody:
      "A team interprets AI productivity as pure speed. You need to reframe value as improved quality-adjusted throughput with review discipline.",
    checklistTitle: "Productivity framing checklist",
    checklistItems: [
      "Define the task outcome, not just time saved.",
      "Measure rework burden after AI assistance.",
      "Track one quality metric and one risk metric together.",
    ],
    quickCheckPrompt: "What is the best productivity metric pattern for AI?",
    quickCheckOptions: [
      { id: "a", label: "Time saved only" },
      { id: "b", label: "Time saved plus error/rework impact" },
      { id: "c", label: "Number of prompts generated per day" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Productivity without quality and risk measures can hide net losses.",
    quickCheckOptionExplanations: {
      a: "Speed alone can conceal downstream defects.",
      b: "Balanced metrics reflect real operational value.",
      c: "Volume metrics do not indicate outcome quality.",
    },
  },
  "ai-creative": {
    scenarioTitle: "Creative evaluation scenario",
    scenarioBody:
      "A creative team uses AI output directly without clarifying authorship, intent, or editing standards. You need a framework for judging creative collaboration quality.",
    checklistTitle: "Creative evaluation checklist",
    checklistItems: [
      "Separate ideation assistance from final authored output.",
      "Define attribution and disclosure norms for team artifacts.",
      "Require one human intention statement for final deliverables.",
    ],
    quickCheckPrompt: "What is the strongest principle for AI in creative work?",
    quickCheckOptions: [
      { id: "a", label: "Treat model output as final creative judgment" },
      { id: "b", label: "Use AI as augmentation while preserving human intent and accountability" },
      { id: "c", label: "Optimize only for novelty regardless of context" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Creative quality improves when AI supports, rather than replaces, human judgment.",
    quickCheckOptionExplanations: {
      a: "This removes accountability from creative decisions.",
      b: "This is the intended collaboration model.",
      c: "Novelty without context often degrades quality.",
    },
  },
  "choosing-tools": {
    scenarioTitle: "High-level comparison scenario",
    scenarioBody:
      "You are not ready for full procurement yet, but you need a basic way to compare categories of tools and identify what to study next.",
    checklistTitle: "Foundational comparison checklist",
    checklistItems: [
      "Compare by task fit, user burden, and review requirements.",
      "Document one clear benefit and one clear limitation per category.",
      "Identify which category needs deeper evaluation in Module 3.",
    ],
    quickCheckPrompt: "What is the right level of tool comparison in Module 1?",
    quickCheckOptions: [
      { id: "a", label: "A foundational map of fit and constraints, not final procurement scoring" },
      { id: "b", label: "Immediate weighted vendor scorecards with purchase recommendations" },
      { id: "c", label: "No comparison until pilot execution is complete" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Module 1 should build conceptual clarity, while deeper selection mechanics are handled later.",
    quickCheckOptionExplanations: {
      a: "This matches the module's learning objective.",
      b: "That level of rigor belongs in Module 3.",
      c: "You still need basic comparative reasoning now.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Conceptual readiness checkpoint",
    scenarioBody:
      "You are about to brief your team on the AI landscape. You need to demonstrate clear definitions, realistic capability framing, and myth-resistant reasoning.",
    checklistTitle: "Module 1 readiness checklist",
    checklistItems: [
      "Use consistent model/tool/automation/agent distinctions.",
      "Explain one historical lesson that improves present judgment.",
      "Demonstrate one myth correction using mechanism plus evidence.",
    ],
    quickCheckPrompt: "What does strong Module 1 readiness look like?",
    quickCheckOptions: [
      { id: "a", label: "Clear conceptual framing and evidence-based literacy checks" },
      { id: "b", label: "Final procurement recommendation across all tool categories" },
      { id: "c", label: "A vendor shortlist without explicit capability definitions" },
    ],
    quickCheckCorrectOptionId: "a",
    quickCheckExplanation: "Module 1 readiness is conceptual rigor, not procurement completion.",
    quickCheckOptionExplanations: {
      a: "This is the correct module outcome.",
      b: "Final tool procurement belongs to later modules.",
      c: "Shortlists without definitions are brittle.",
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
    quickCheckExplanation: "Augmentation preserves human judgment while improving speed and consistency.",
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
    scenarioTitle: "Operational selection kickoff",
    scenarioBody:
      "You already built conceptual clarity in Module 1. Now you must convert that understanding into defensible tool decisions using measurable criteria and explicit risk controls.",
    checklistTitle: "Decision framework kickoff checklist",
    checklistItems: [
      "Define decision criteria before evaluating vendors.",
      "Separate required capabilities from nice-to-have features.",
      "Set evidence standards for buy, pilot, and wait outcomes.",
    ],
    quickCheckPrompt: "What is the best first move in tool selection?",
    quickCheckOptions: [
      { id: "a", label: "Compare all vendors at once" },
      { id: "b", label: "Start with category-level outcome mapping" },
      { id: "c", label: "Choose the most popular brand immediately" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Category-first evaluation creates a defensible bridge from strategy to procurement.",
    quickCheckOptionExplanations: {
      a: "This is usually too broad and inefficient early on.",
      b: "This creates a clean decision structure.",
      c: "Popularity is not a reliable fit signal.",
    },
  },
  "what-is-llm": {
    scenarioTitle: "General assistant threshold",
    scenarioBody:
      "A team requests a specialized product, but an existing general assistant might already satisfy requirements. You need a threshold test that prevents premature complexity.",
    checklistTitle: "Fit threshold checklist",
    checklistItems: [
      "Run a baseline trial with a general assistant.",
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
    quickCheckExplanation: "General tools should be the default baseline unless evidence shows persistent capability gaps.",
    quickCheckOptionExplanations: {
      a: "This is the practical baseline decision.",
      b: "Governance can still be applied to general tools.",
      c: "Specialization should be justified by real gaps, not assumption.",
    },
  },
  "how-chatgpt-works": {
    scenarioTitle: "Specialized tool trigger",
    scenarioBody:
      "You are deciding whether to move from general assistants to specialized products. The decision must be based on repeatable workflow failures, not feature excitement.",
    checklistTitle: "Specialization trigger checklist",
    checklistItems: [
      "Document repeated failure modes and their business impact.",
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
    quickCheckExplanation: "Specialization should be justified by measurable uplift, not perceived sophistication.",
    quickCheckOptionExplanations: {
      a: "Demo quality alone is insufficient.",
      b: "This is the strongest procurement rationale.",
      c: "Preference should not override outcome evidence.",
    },
  },
  "anatomy-of-prompt": {
    scenarioTitle: "Scorecard design",
    scenarioBody:
      "Your team compares tools inconsistently and reaches different conclusions from the same demo. You need a weighted scorecard that can survive leadership scrutiny.",
    checklistTitle: "Tool comparison scorecard checklist",
    checklistItems: [
      "Define weighted criteria: reliability, integration fit, security posture, support quality.",
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
    quickCheckExplanation: "Weighted criteria and shared tests make decisions auditable and comparable.",
    quickCheckOptionExplanations: {
      a: "Preference without criteria is hard to defend.",
      b: "This is the decision-grade approach.",
      c: "Benchmarks alone miss operational realities.",
    },
  },
  "prompt-techniques": {
    scenarioTitle: "Commercial and security risk screening",
    scenarioBody:
      "A product tool appears affordable at first glance, but hidden SaaS cost drivers and data governance liabilities may emerge after rollout. You need a pre-purchase risk screen for product contracts.",
    checklistTitle: "Risk screen checklist",
    checklistItems: [
      "Map seat, API, and expansion costs under realistic usage scenarios.",
      "Review data handling, retention, access controls, and training reuse terms in product policies.",
      "Flag dependencies that could create lock-in exposure.",
    ],
    quickCheckPrompt: "Which pricing pattern deserves extra scrutiny?",
    quickCheckOptions: [
      { id: "a", label: "Clear milestone-based pricing with terms" },
      { id: "b", label: "Low entry cost with unclear expansion terms" },
      { id: "c", label: "Published usage tiers with thresholds" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Opaque expansion terms are a leading indicator of long-run cost risk.",
    quickCheckOptionExplanations: {
      a: "This is usually more transparent.",
      b: "This is a common hidden-cost risk pattern.",
      c: "Documented tiers are generally easier to model.",
    },
  },
  "ai-writing": {
    scenarioTitle: "Lock-in risk scenario",
    scenarioBody:
      "A candidate tool performs well in pilots, but export and migration pathways are unclear. You need to avoid lock-in that can inflate switching costs later.",
    checklistTitle: "Lock-in prevention checklist",
    checklistItems: [
      "Confirm exportability for data, prompts, and workflow artifacts.",
      "Identify any proprietary features that have no contingency path.",
      "Define one migration trigger and one rollback option before adoption.",
    ],
    quickCheckPrompt: "What is the strongest early safeguard against platform lock-in?",
    quickCheckOptions: [
      { id: "a", label: "Rely on premium proprietary features to accelerate adoption" },
      { id: "b", label: "Require portability and contingency architecture from the start" },
      { id: "c", label: "Defer migration planning until after full rollout" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Portability and contingency planning preserve strategic flexibility.",
    quickCheckOptionExplanations: {
      a: "This can increase long-run dependency risk.",
      b: "This is the core lock-in mitigation pattern.",
      c: "Late planning makes migration harder and costlier.",
    },
  },
  "ai-images": {
    scenarioTitle: "Maturity signal scenario",
    scenarioBody:
      "A vendor demo is polished, but production readiness is uncertain. You need criteria for distinguishing launch polish from operational maturity.",
    checklistTitle: "Maturity signal checklist",
    checklistItems: [
      "Check reliability history and incident response behavior.",
      "Review support quality and release discipline over time.",
      "Validate one real workflow before broad approval.",
    ],
    quickCheckPrompt: "Which indicator best predicts real product maturity?",
    quickCheckOptions: [
      { id: "a", label: "Demo aesthetics and presentation quality" },
      { id: "b", label: "Operational reliability and support consistency" },
      { id: "c", label: "Social buzz and community excitement" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Operational performance indicators are stronger than launch-day impressions.",
    quickCheckOptionExplanations: {
      a: "Presentation quality can mask production weaknesses.",
      b: "This is the best predictor of sustained usability.",
      c: "Popularity is not a stability guarantee.",
    },
  },
  "ai-productivity": {
    scenarioTitle: "Integration fit scenario",
    scenarioBody:
      "A tool appears valuable, but your current systems have strict workflows and controls. You need to test integration fit before making a procurement decision.",
    checklistTitle: "Integration fit checklist",
    checklistItems: [
      "Map required systems, APIs, identity, and permission boundaries.",
      "Run one full end-to-end workflow test in your environment.",
      "Measure manual workaround burden and failure points.",
    ],
    quickCheckPrompt: "What is the strongest signal that a tool fits your stack?",
    quickCheckOptions: [
      { id: "a", label: "Strong team enthusiasm after a demo" },
      { id: "b", label: "Successful end-to-end workflow execution in your stack" },
      { id: "c", label: "A broad library of prebuilt templates" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Real workflow tests reveal integration viability better than claims.",
    quickCheckOptionExplanations: {
      a: "Excitement is not integration evidence.",
      b: "This is the strongest practical readiness signal.",
      c: "Templates do not guarantee stack compatibility.",
    },
  },
  "ai-creative": {
    scenarioTitle: "Security baseline scenario",
    scenarioBody:
      "Before scaling adoption, you need a minimal security baseline for data classes, approvals, and permitted usage boundaries.",
    checklistTitle: "Security baseline checklist",
    checklistItems: [
      "Define approved and prohibited data classes for tool input.",
      "Confirm retention, access, and training-use policy controls.",
      "Assign ownership for periodic policy and vendor review.",
    ],
    quickCheckPrompt: "What is the right first security move before scaling usage?",
    quickCheckOptions: [
      { id: "a", label: "Let each team create independent usage rules" },
      { id: "b", label: "Create a shared data-risk baseline and usage policy" },
      { id: "c", label: "Delay controls until tooling is fully deployed" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "A shared baseline prevents inconsistent high-risk behavior.",
    quickCheckOptionExplanations: {
      a: "Inconsistent rules create governance gaps.",
      b: "This is the minimum practical safeguard for scale.",
      c: "Delayed controls increase avoidable risk.",
    },
  },
  "choosing-tools": {
    scenarioTitle: "Decision scorecard scenario",
    scenarioBody:
      "You have limited pilot capacity and multiple candidates. You need a scorecard that supports defensible prioritization decisions.",
    checklistTitle: "Decision scorecard checklist",
    checklistItems: [
      "Score candidates on capability fit, risk, cost, and integration burden.",
      "Weight criteria according to business priorities.",
      "Define explicit buy, wait, and pilot thresholds.",
    ],
    quickCheckPrompt: "What makes a tool comparison framework decision-ready?",
    quickCheckOptions: [
      { id: "a", label: "A list of favored tools based on general team preference" },
      { id: "b", label: "Weighted criteria tied to outcomes and risk thresholds" },
      { id: "c", label: "An equal-weight checklist without decision thresholds" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Weighted criteria plus thresholds produce defensible selection decisions.",
    quickCheckOptionExplanations: {
      a: "Preference-only ranking is difficult to defend.",
      b: "This is the strongest operational selection method.",
      c: "Without thresholds, decisions remain ambiguous.",
    },
  },
  "hands-on-practice": {
    scenarioTitle: "Decision tree application",
    scenarioBody:
      "Your team has three candidate tools and limited pilot capacity. You need a clear buy-wait-pilot path tied to owners, metrics, and time-bound review checkpoints.",
    checklistTitle: "Buy-wait-pilot checklist",
    checklistItems: [
      "Mark each candidate as buy, wait, or pilot using scorecard thresholds.",
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
    quickCheckExplanation: "A decision tree turns analysis into execution-ready commitments.",
    quickCheckOptionExplanations: {
      a: "Speed without structure increases risk.",
      b: "This is exactly the intended outcome.",
      c: "Pilots remain critical for evidence generation.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Procurement readiness checkpoint",
    scenarioBody:
      "You are presenting a Module 3 recommendation to leadership. You need to show that recommendations are evidence-backed, risk-adjusted, and executable.",
    checklistTitle: "Procurement readiness checklist",
    checklistItems: [
      "Prepare top candidates with weighted scorecard evidence.",
      "Include one buy, one pilot, and one wait rationale with thresholds.",
      "Define expected pilot outcomes and review criteria.",
    ],
    quickCheckPrompt: "What demonstrates strong Module 3 readiness?",
    quickCheckOptions: [
      { id: "a", label: "Selecting a tool based on stakeholder enthusiasm and early usability signals" },
      { id: "b", label: "Defensible recommendations grounded in scorecard evidence" },
      { id: "c", label: "Expanding pilot discovery before issuing buy or wait recommendations" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Readiness means defensible recommendations and clear execution logic.",
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
    scenarioTitle: "Partner operating model scenario",
    scenarioBody:
      "You already decided to use an external partner. Now you must choose the right operating model: advisory support, project delivery, or managed service.",
    checklistTitle: "Partner operating model checklist",
    checklistItems: [
      "Assess internal staffing and governance capacity for partner oversight.",
      "Define desired ownership boundary between your team and the partner.",
      "Select advisory, project, or managed-service mode based on control and speed needs.",
    ],
    quickCheckPrompt: "How should teams choose a partner operating model?",
    quickCheckOptions: [
      { id: "a", label: "Pick whichever model the partner recommends first" },
      { id: "b", label: "Match operating model to ownership, oversight, and delivery constraints" },
      { id: "c", label: "Default to managed service for all use cases" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Operating model should fit your governance capacity and desired ownership outcomes.",
    quickCheckOptionExplanations: {
      a: "Partner preference alone is not a governance framework.",
      b: "This is the most defensible operating-model method.",
      c: "Managed service is useful in some cases, not all cases.",
    },
  },
  "feature-engineering": {
    scenarioTitle: "Contract and pricing negotiation scenario",
    scenarioBody:
      "A partner proposal looks affordable at entry but scope boundaries and change-order mechanics are vague. You need to de-risk contract structure before signing.",
    checklistTitle: "Contract review checklist",
    checklistItems: [
      "Break down fixed fees, variable fees, and change-order triggers.",
      "Tie payment milestones to accepted deliverables and measurable outcomes.",
      "Require explicit language for scope boundaries, acceptance criteria, and escalation paths.",
    ],
    quickCheckPrompt: "Which contract pattern deserves the closest scrutiny?",
    quickCheckOptions: [
      { id: "a", label: "Milestone contract with explicit acceptance criteria" },
      { id: "b", label: "Low entry fee with unclear scope-change and expansion terms" },
      { id: "c", label: "Fixed retainer with clearly defined included services" },
    ],
    quickCheckCorrectOptionId: "b",
    quickCheckExplanation: "Ambiguous change-order and expansion clauses are a primary source of partner cost overruns.",
    quickCheckOptionExplanations: {
      a: "This is usually easier to govern.",
      b: "This is the high-risk partner contract pattern.",
      c: "Clear service boundaries reduce ambiguity.",
    },
  },
  "module-quiz": {
    scenarioTitle: "Diligence readiness checkpoint",
    scenarioBody:
      "You are defending an external delivery partner recommendation in an executive review. You need to show that diligence depth, pilot design, and contract controls are all decision-ready.",
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
      "You have more AI ideas than budget. You need a measurement model that compares expected value confidence and cost of evidence generation.",
    checklistTitle: "Prioritization scoring checklist",
    checklistItems: [
      "Score opportunities on expected outcome impact, measurement confidence, and implementation cost.",
      "Use shared metric definitions so comparisons remain consistent across teams.",
      "Prioritize initiatives with the strongest evidence-adjusted value.",
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
    scenarioTitle: "Financial planning scenario",
    scenarioBody:
      "You need a quarterly investment plan for AI initiatives. Budget allocation must reflect payback timing, downside exposure, and uncertainty in assumptions.",
    checklistTitle: "Financial planning checklist",
    checklistItems: [
      "Separate fixed implementation costs from variable operating costs.",
      "Estimate payback windows under conservative and expected cases.",
      "Define funding release triggers tied to measured milestones.",
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
      "Run tabletop exercises for likely failure scenarios.",
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
      "Sequence initiatives by dependency order and organizational readiness.",
      "Limit concurrent rollout load to avoid adoption fatigue.",
      "Publish prerequisite completion rules before each phase launch.",
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
      "Present phased roadmap with dependency-readiness rationale.",
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
      "Your team is comparing automation platforms. You need to evaluate observability, contingency behavior, and ownership model before deployment.",
    checklistTitle: "Platform evaluation checklist",
    checklistItems: [
      "Assess workflow visibility and error tracing features.",
      "Validate contingency paths and rollback behavior.",
      "Confirm who owns operations, incidents, and maintenance.",
    ],
    quickCheckPrompt: "What causes many automation deployments to fail?",
    quickCheckOptions: [
      { id: "a", label: "No observability and no contingency plan" },
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
      { id: "b", label: "Ownership, observability, contingency, and incident response" },
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
      c: "No contingency model is a major production risk.",
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
    scenarioTitle: "Stack governance control scenario",
    scenarioBody:
      "Stack decisions vary by team and approvals are inconsistent. You need a unified governance framework that manages lifecycle, ownership, and control gates across the stack.",
    checklistTitle: "Stack governance checklist",
    checklistItems: [
      "Standardize lifecycle controls for add, retain, consolidate, and retire decisions.",
      "Require operating owner sign-off for stack changes, not just purchases.",
      "Create exception process with explicit risk acceptance and sunset date.",
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
    scenarioTitle: "Stack lifecycle checkpoint",
    scenarioBody:
      "You are presenting Module 9 recommendations and must justify stack lifecycle decisions with ownership clarity and governance controls.",
    checklistTitle: "Stack lifecycle readiness checklist",
    checklistItems: [
      "Show keep, consolidate, and pilot decisions with rationale.",
      "Clarify ownership for operations, governance, and vendor management.",
      "Include lifecycle controls for onboarding, consolidation, and retirement.",
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

const MODULE_SECTION_LEARNING_CONTENT: Record<string, Record<string, SectionLearningContent>> = {
  "module-0": module0SectionLearningContent,
  "module-1": module1SectionLearningContent,
  "module-2": module2SectionLearningContent,
  "module-3": module3SectionLearningContent,
  "module-4": module4SectionLearningContent,
  "module-5": module5SectionLearningContent,
  "module-6": module6SectionLearningContent,
  "module-7": module7SectionLearningContent,
  "module-8": module8SectionLearningContent,
  "module-9": module9SectionLearningContent,
  "module-10": module10SectionLearningContent,
}

export function getSectionLearningContent(moduleId: string, sectionId: string | undefined): SectionLearningContent | undefined {
  if (!sectionId) {
    return undefined
  }

  const moduleContent = MODULE_SECTION_LEARNING_CONTENT[moduleId]
  return moduleContent ? moduleContent[sectionId] : undefined
}

// --- Migrated component explanation content ---
export interface ComponentExplanation {
  id: string
  question: string
  explanation: string
}



function requireNonEmptyValue(value: string | undefined, label: string): string {
  const normalized = typeof value === "string" ? value.trim() : ""
  if (!normalized) {
    throw new Error(`[component-explanations] ${label}`)
  }

  return normalized
}

export const COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> = {
  // MODULE 0: Welcome to AI
  "m0-hero": {
    id: "m0-hero",
    question: "I'm confused about this part: 'Modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight...' Could you unpack this in plain language and include one real-world example? (Focus: m0-hero)",
    explanation: `m0-hero framing: In AI practice, "Modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight..." should be read as a decision prompt with explicit criteria.

m0-hero reasoning depth: modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight in real work.

m0-hero next action: test AI output tied to "Modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight..." with one metric, one risk check, and one contingency path.`,
  },

  "m0-why-ai-matters": {
    id: "m0-why-ai-matters",
    question: "I'm confused about this part: 'AI now influences ranking, recommendation, hiring filters, fraud controls, and productivity tooling, so even non-technical roles are increasingly...' What is the core idea here, and how would you teach it to a beginner? (Focus: m0-why-ai-matters)",
    explanation: `m0-why-ai-matters translation: For AI work, "AI now influences ranking, recommendation, hiring filters, fraud controls, and productivity tooling, so even non-technical roles are increasingly..." is a cue to connect concept understanding to concrete choices.

m0-why-ai-matters practical depth: m0-why-ai-matters reasoning layer: aI now influences ranking, recommendation, hiring filters, fraud controls, and productivity tooling, so even non-technical roles are increasingly affected by model behavior. Treat

m0-why-ai-matters next action: for "AI now influences ranking, recommendation, hiring filters, fraud controls, and productivity tooling, so even non-technical roles are increasingly...", validate a core assumption before AI output informs any real decision.`,
  },

  "m0-why-ai-matters-check": {
    id: "m0-why-ai-matters-check",
    question: "I'm confused about this part: 'Early AI fluency creates leverage because habits of prompting, verification, and tool choice improve while the ecosystem is still changing fast.' Can you translate this into everyday language and show why it matters? (Focus: m0-why-ai-matters-check)",
    explanation: `m0-why-ai-matters-check plain-language view: "Early AI fluency creates leverage because habits of prompting, verification, and tool choice improve while the ecosystem is still changing fast." marks an AI judgment moment, not just a vocabulary check.

m0-why-ai-matters-check mechanism depth: m0-why-ai-matters-check practical meaning: early AI fluency creates leverage because habits of prompting, verification, and tool choice improve while the ecosystem is still changing fast.

m0-why-ai-matters-check next action: map "Early AI fluency creates leverage because habits of prompting, verification, and tool choice improve while the ecosystem is still changing fast." to a small AI pilot, then compare benefit, effort, and failure risk.`,
  },

  "m0-day-in-life": {
    id: "m0-day-in-life",
    question: "I'm confused about this part: 'AI influences an ordinary day through many small predictions: ranking search results, filtering inboxes, prioritizing notifications, generating...' Could you restate this without jargon and highlight the practical takeaway? (Focus: m0-day-in-life)",
    explanation: `m0-day-in-life core reading: Within AI workflows, "AI influences an ordinary day through many small predictions: ranking search results, filtering inboxes, prioritizing notifications, generating..." means reasoning quality matters as much as output speed.

m0-day-in-life risk depth: m0-day-in-life execution view: Reasoning behind the point: aI influences an ordinary day through many small predictions: ranking search results, filtering inboxes, prioritizing notifications, generating drafts, and scoring risk.

m0-day-in-life next action: use "AI influences an ordinary day through many small predictions: ranking search results, filtering inboxes, prioritizing notifications, generating..." to set review gates so AI drafts and final decisions stay separated.`,
  },

  "m0-transformation-arc": {
    id: "m0-transformation-arc",
    question: "I'm confused about this part: 'Practical AI growth moves from awareness to decision quality: first you learn terms and system types, then mechanisms and prompting, then risk,...' What does this actually mean in practice, and when should I apply it? (Focus: m0-transformation-arc)",
    explanation: `m0-transformation-arc interpretation: In an AI context, "Practical AI growth moves from awareness to decision quality: first you learn terms and system types, then mechanisms and prompting, then risk,..." asks for evidence-aware decision making.

m0-transformation-arc execution depth: m0-transformation-arc decision context: Practical significance: practical AI growth moves from awareness to decision quality: first you learn terms and system types, then mechanisms and prompting, then risk, governance, and adoption.

m0-transformation-arc next action: for "Practical AI growth moves from awareness to decision quality: first you learn terms and system types, then mechanisms and prompting, then risk,...", document what evidence raises trust and what evidence lowers trust in AI.`,
  },

  "m0-how-to-learn": {
    id: "m0-how-to-learn",
    question: "I'm confused about this part: 'Practical AI fluency grows when concept explanations, worked examples, and interactions all change how you make decisions rather than leaving...' Can you break this into simple steps and show how to use it correctly? (Focus: m0-how-to-learn)",
    explanation: `m0-how-to-learn practical reading: "Practical AI fluency grows when concept explanations, worked examples, and interactions all change how you make decisions rather than leaving..." highlights where AI assistance needs boundaries and review.

m0-how-to-learn quality depth: m0-how-to-learn model insight: Execution meaning: practical AI fluency grows when concept explanations, worked examples, and interactions all change how you make decisions rather than leaving knowledge as isolated facts.

m0-how-to-learn next action: operationalize "Practical AI fluency grows when concept explanations, worked examples, and interactions all change how you make decisions rather than leaving..." by defining stop conditions when AI quality degrades.`,
  },

  "m0-self-assessment": {
    id: "m0-self-assessment",
    question: "I'm confused about this part: 'Your starting mental model of AI shapes everything that follows: what you trust, what you question, and which mistakes you are likely to make.' How would you explain this to someone with zero AI background? (Focus: m0-self-assessment)",
    explanation: `m0-self-assessment action lens: For AI users, "Your starting mental model of AI shapes everything that follows: what you trust, what you question, and which mistakes you are likely to make." points to disciplined evaluation before trust.

m0-self-assessment adoption depth: m0-self-assessment quality signal: How to think about it: your starting mental model of AI shapes everything that follows: what you trust, what you question, and which mistakes you are likely to make. Use

m0-self-assessment next action: for "Your starting mental model of AI shapes everything that follows: what you trust, what you question, and which mistakes you are likely to make.", pair AI speed goals with verification requirements before scaling.`,
  },

  "m0-next-module-check": {
    id: "m0-next-module-check",
    question: "I'm confused about this part: 'Useful AI learning starts with skepticism toward hype and a commitment to test claims against real definitions and limits.' Could you simplify this and point out the most important decision it affects? (Focus: m0-next-module-check)",
    explanation: `m0-next-module-check applied meaning: "Useful AI learning starts with skepticism toward hype and a commitment to test claims against real definitions and limits." signals that AI value depends on mechanism, context, and safeguards.

m0-next-module-check oversight depth: m0-next-module-check risk context: Applied interpretation: useful AI learning starts with skepticism toward hype and a commitment to test claims against real definitions and limits.

m0-next-module-check next action: turn "Useful AI learning starts with skepticism toward hype and a commitment to test claims against real definitions and limits." into an AI checklist covering context, constraints, and safety.`,
  },

  // MODULE 1: What Is AI?
  "m1-hero": {
    id: "m1-hero",
    question: "I'm confused about this part: 'AI adoption decisions improve when teams distinguish models, tools, automations, and agents instead of treating everything as one category.' What is the one thing I should remember from this, in plain English? (Focus: m1-hero)",
    explanation: `Module 1 is about conceptual clarity before operational choice. When teams confuse models, tools, automations, and agents, they reason with unstable categories and make avoidable interpretation errors.

The key skill here is classification discipline. A model predicts, a tool packages capability for users, an automation executes predefined workflow logic, and an agent can pursue goals across steps with greater autonomy. Keeping those boundaries clear improves communication and reduces strategic noise.

Apply this by adding one language checkpoint to team discussions: before evaluating any AI claim, identify which category is being described and what capability is actually being asserted.`,
  },

  "m1-module-overview-check": {
    id: "m1-module-overview-check",
    question: "I'm confused about this part: 'Practical AI literacy begins with strong definitions and mental models, not buzzwords or premature technical depth.' Can you decode this with a concrete scenario I might face at work? (Focus: m1-module-overview-check)",
    explanation: `Strong AI literacy starts with mental models that survive ambiguity. Buzzwords create false certainty, while clear definitions help teams reason about capability, risk, and limits using the same conceptual frame.

This section is intentionally pre-procurement. The goal is to build language and interpretation quality so later decisions in Module 3 are grounded in evidence rather than marketing narratives.

A practical test is simple: if your team cannot explain a claim in plain language and place it in the correct category, the claim is not ready for operational evaluation.`,
  },

  "m1-defining-ai": {
    id: "m1-defining-ai",
    question: "I'm confused about this part: 'Many people define AI by tools (ChatGPT, robots) rather than by what actually characterizes AI: systems that learn from data and improve without...' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m1-defining-ai)",
    explanation: `m1-defining-ai operational reading: "Many people define AI by tools (ChatGPT, robots) rather than by what actually characterizes AI: systems that learn from data and improve without..." frames AI output as input to judgment, not a final verdict.

m1-defining-ai evaluation depth: m1-defining-ai learning takeaway: Use-case relevance: many people define AI by tools (ChatGPT, robots) rather than by what actually characterizes AI: systems that learn from data and improve without being explicitly programmed for every scenario.

m1-defining-ai next action: evaluate "Many people define AI by tools (ChatGPT, robots) rather than by what actually characterizes AI: systems that learn from data and improve without..." with a pre-mortem so AI failure modes are explicit early.`,
  },

  "m1-ai-history": {
    id: "m1-ai-history",
    question: "I'm confused about this part: 'By seeing how AI developed in waves-periods of excitement followed by 'AI winters,' where progress seemed to stall-you understand something crucial:...' Can you reframe this as a quick rule I can apply immediately? (Focus: m1-ai-history)",
    explanation: `m1-ai-history realistic interpretation: In AI practice, "By seeing how AI developed in waves-periods of excitement followed by" emphasizes tradeoffs over hype.

m1-ai-history operational depth: m1-ai-history mechanism check: Mechanism-level takeaway: history teaches you patterns.

m1-ai-history next action: for "By seeing how AI developed in waves-periods of excitement followed by", establish a repeatable AI evaluation routine with traceable evidence.`,
  },

  "m1-types-of-ai": {
    id: "m1-types-of-ai",
    question: "I'm confused about this part: 'Narrow AI, general AI, and superintelligence name fundamentally different claims about capability, and confusing them distorts nearly every public AI...' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m1-types-of-ai)",
    explanation: `m1-types-of-ai execution framing: "Narrow AI, general AI, and superintelligence name fundamentally different claims about capability, and confusing them distorts nearly every public AI..." indicates where AI can help and where human review must remain.

m1-types-of-ai strategic depth: m1-types-of-ai operational takeaway: Implementation lens: narrow AI, general AI, and superintelligence name fundamentally different claims about capability, and confusing them distorts nearly every public AI debate.

m1-types-of-ai next action: translate "Narrow AI, general AI, and superintelligence name fundamentally different claims about capability, and confusing them distorts nearly every public AI..." into prompt constraints that reduce ambiguous AI behavior.`,
  },

  "m1-first-win": {
    id: "m1-first-win",
    question: "I'm confused about this part: 'Cognitive psychology shows that moving to application dramatically increases retention, perhaps 4x better than reading alone.' How would you explain this if you only had 30 seconds? (Focus: m1-first-win)",
    explanation: `m1-first-win quality framing: For AI decisions, "Cognitive psychology shows that moving to application dramatically increases retention, perhaps 4x better than reading alone." requires clearer standards before action.

m1-first-win learning depth: m1-first-win implementation meaning: Risk-aware reading: cognitive psychology shows that moving to application dramatically increases retention, perhaps 4x better than reading alone.

m1-first-win next action: for "Cognitive psychology shows that moving to application dramatically increases retention, perhaps 4x better than reading alone.", compare AI recommendations against a non-AI baseline before adoption.`,
  },

  "m1-myths-reality": {
    id: "m1-myths-reality",
    question: "I'm confused about this part: 'Once believed, they persist even after you've learned correct information.' Can you turn this into a practical checklist I can use right away? (Focus: m1-myths-reality)",
    explanation: `m1-myths-reality mechanism view: "Once believed, they persist even after you" in AI terms is about why outputs happen, not only what they say.

m1-myths-reality accountability depth: m1-myths-reality reliability lens: Quality-control angle: misconceptions are notoriously sticky.

m1-myths-reality next action: use "Once believed, they persist even after you" to design oversight points for high-impact AI decisions.`,
  },

  "m1-writing-assistants": {
    id: "m1-writing-assistants",
    question: "I'm confused about this part: 'The lesson transitions from abstract concepts to concrete tools. Research shows that abstract knowledge is much harder to retain than knowledge...' Could you break this down using an analogy and one actionable example? (Focus: m1-writing-assistants)",
    explanation: `m1-writing-assistants reliability framing: "The lesson transitions from abstract concepts to concrete tools. Research shows that abstract knowledge is much harder to retain than knowledge..." points to AI confidence calibration under uncertainty.

m1-writing-assistants governance depth: m1-writing-assistants workflow implication: Performance insight: the lesson transitions from abstract concepts to concrete tools.

m1-writing-assistants next action: for "The lesson transitions from abstract concepts to concrete tools. Research shows that abstract knowledge is much harder to retain than knowledge...", tie AI output acceptance to transparency and reproducibility criteria.`,
  },

  "m1-image-generation": {
    id: "m1-image-generation",
    question: "I'm confused about this part: 'Image generation is conceptually similar to text generation-predicting the next pixel based on patterns-but feels qualitatively different to users.' What does this imply for real decisions, not just theory? (Focus: m1-image-generation)",
    explanation: `m1-image-generation governance reading: "Image generation is conceptually similar to text generation-predicting the next pixel based on patterns-but feels qualitatively different to users." connects AI capability with accountability requirements.

m1-image-generation performance depth: m1-image-generation applied insight: Evidence-focused reading: image generation is conceptually similar to text generation-predicting the next pixel based on patterns-but feels qualitatively different to users.

m1-image-generation next action: apply "Image generation is conceptually similar to text generation-predicting the next pixel based on patterns-but feels qualitatively different to users." by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m1-productivity": {
    id: "m1-productivity",
    question: "I'm confused about this part: 'A crucial point here is that AI's most immediate value for individuals isn't replacing jobs; it's augmenting existing work.' Can you simplify this and show what success looks like in practice? (Focus: m1-productivity)",
    explanation: `m1-productivity evidence-first view: "A crucial point here is that AI" means AI claims should be checked against context and risk.

m1-productivity context depth: m1-productivity strategic signal: Human-oversight implication: a crucial point here is that AI's most immediate value for individuals isn't replacing jobs; it's augmenting existing work.

m1-productivity next action: for "A crucial point here is that AI", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m1-creative-work": {
    id: "m1-creative-work",
    question: "I'm confused about this part: 'Creative AI becomes easier to judge when you ask a sharper question than 'can it create': which parts of creativity come from pattern recombination,...' Could you explain this as if coaching a teammate through it? (Focus: m1-creative-work)",
    explanation: `m1-creative-work workflow reading: "Creative AI becomes easier to judge when you ask a sharper question than" identifies a step where AI output must be evaluated, not copied.

m1-creative-work model depth: m1-creative-work capability note: Workflow consequence: creative AI becomes easier to judge when you ask a sharper question than "can it create": which parts of creativity come from pattern recombination, and which depend on human intention, taste, and authorship?

m1-creative-work next action: convert "Creative AI becomes easier to judge when you ask a sharper question than" into a risk-weighted AI decision protocol for your workflow.`,
  },

  "m1-choosing-tools": {
    id: "m1-choosing-tools",
    question: "I'm confused about this part: 'For day-to-day adoption capstone section in the applications section teaches decision-making frameworks.' Can you restate this clearly and show what changes in my workflow? (Focus: m1-choosing-tools)",
    explanation: `In Module 1, tool comparison is intentionally lightweight. You are learning a foundational filter, not building a final procurement scorecard.

The right question at this stage is conceptual fit: what category of tool matches the task, what limitation is obvious now, and what uncertainty must be tested later. Detailed vendor scoring, pricing analysis, and buy-pilot-wait decisions are handled in Module 3.

Use this section to prepare, not finalize. Produce a short list of categories to evaluate further and carry those candidates into the structured evaluation workflow in the next module.`,
  },

  "m1-quiz": {
    id: "m1-quiz",
    question: "I'm confused about this part: 'Separating AI categories and claims under ambiguity is the first real test of AI literacy.' Could you unpack this in plain language and include one real-world example? (Focus: m1-quiz)",
    explanation: `m1-quiz framing: In AI practice, "Separating AI categories and claims under ambiguity is the first real test of AI literacy." should be read as a decision prompt with explicit criteria.

m1-quiz reasoning depth: separating AI categories and claims under ambiguity is the first real test of AI literacy.

m1-quiz next action: test AI output tied to "Separating AI categories and claims under ambiguity is the first real test of AI literacy." with one metric, one risk check, and one contingency path.`,
  },

  "m1-ai-vocabulary-cards": {
    id: "m1-ai-vocabulary-cards",
    question: "I'm confused about this part: 'Core AI vocabulary gives you labels for the moving parts you will analyze throughout the course: AI, model, training data, prompt, algorithm,...' What is the core idea here, and how would you teach it to a beginner? (Focus: m1-ai-vocabulary-cards)",
    explanation: `Core AI vocabulary matters because each term names a different part of the system. If you mix up words like model, training data, prompt, and output, you will diagnose problems incorrectly and choose weak fixes.

Start by reading one generated response and labeling it in sequence: prompt, model behavior, output quality, and likely data influence. That simple labeling habit teaches you where to intervene, whether by rewriting instructions, changing examples, or selecting a different tool.

Practice by taking one daily AI task and writing a two-line post-check: what term explains the behavior you saw, and what change you will test next. Repeating that loop turns vocabulary into operational skill instead of memorized definitions.`,
  },

  // MODULE 2: How Machines Learn
  "m2-hero": {
    id: "m2-hero",
    question: "I'm confused about this part: 'High-impact AI adoption starts with opportunity selection, not tool shopping.' Can you translate this into everyday language and show why it matters? (Focus: m2-hero)",
    explanation: `m2-hero plain-language view: "High-impact AI adoption starts with opportunity selection, not tool shopping." marks an AI judgment moment, not just a vocabulary check.

m2-hero mechanism depth: m2-hero practical meaning: high-impact AI adoption starts with opportunity selection, not tool shopping.

m2-hero next action: map "High-impact AI adoption starts with opportunity selection, not tool shopping." to a small AI pilot, then compare benefit, effort, and failure risk.`,
  },

  "m2-module-overview": {
    id: "m2-module-overview",
    question: "I'm confused about this part: 'From an execution viewpoint lesson element previews the module structure and sets expectations for learning machine learning basics.' Could you restate this without jargon and highlight the practical takeaway? (Focus: m2-module-overview)",
    explanation: `m2-module-overview core reading: Within AI workflows, "From an execution viewpoint lesson element previews the module structure and sets expectations for learning machine learning basics." means reasoning quality matters as much as output speed.

m2-module-overview risk depth: m2-module-overview execution view: Reasoning behind the point: from an execution viewpoint lesson element previews the module structure and sets expectations for learning machine learning basics.

m2-module-overview next action: use "From an execution viewpoint lesson element previews the module structure and sets expectations for learning machine learning basics." to set review gates so AI drafts and final decisions stay separated.`,
  },

  "m2-what-is-ml": {
    id: "m2-what-is-ml",
    question: "I'm confused about this part: 'Machine learning is fundamentally about learning from data rather than following explicit rules.' What does this actually mean in practice, and when should I apply it? (Focus: m2-what-is-ml)",
    explanation: `m2-what-is-ml interpretation: In an AI context, "Machine learning is fundamentally about learning from data rather than following explicit rules." asks for evidence-aware decision making.

m2-what-is-ml execution depth: m2-what-is-ml decision context: Practical significance: machine learning is fundamentally about learning from data rather than following explicit rules.

m2-what-is-ml next action: for "Machine learning is fundamentally about learning from data rather than following explicit rules.", document what evidence raises trust and what evidence lowers trust in AI.`,
  },

  "m2-training-data": {
    id: "m2-training-data",
    question: "I'm confused about this part: 'Here's a critical insight: the quality and characteristics of training data directly determine what a machine learning system can learn.' Can you break this into simple steps and show how to use it correctly? (Focus: m2-training-data)",
    explanation: `m2-training-data practical reading: "Here" highlights where AI assistance needs boundaries and review.

m2-training-data quality depth: m2-training-data model insight: Execution meaning: here's a critical insight: the quality and characteristics of training data directly determine what a machine learning system can learn.

m2-training-data next action: operationalize "Here" by defining stop conditions when AI quality degrades.`,
  },

  "m2-supervised-unsupervised": {
    id: "m2-supervised-unsupervised",
    question: "I'm confused about this part: 'Supervised learning requires labeled data: examples where you know the right answer.' How would you explain this to someone with zero AI background? (Focus: m2-supervised-unsupervised)",
    explanation: `m2-supervised-unsupervised action lens: For AI users, "Supervised learning requires labeled data: examples where you know the right answer." points to disciplined evaluation before trust.

m2-supervised-unsupervised adoption depth: m2-supervised-unsupervised quality signal: How to think about it: supervised learning requires labeled data: examples where you know the right answer. Use

m2-supervised-unsupervised next action: for "Supervised learning requires labeled data: examples where you know the right answer.", pair AI speed goals with verification requirements before scaling.`,
  },

  "m2-neural-networks": {
    id: "m2-neural-networks",
    question: "I'm confused about this part: 'Neural networks are inspired by (but very different from) biological brains.' Could you simplify this and point out the most important decision it affects? (Focus: m2-neural-networks)",
    explanation: `m2-neural-networks applied meaning: "Neural networks are inspired by (but very different from) biological brains." signals that AI value depends on mechanism, context, and safeguards.

m2-neural-networks oversight depth: m2-neural-networks risk context: Applied interpretation: neural networks are inspired by (but very different from) biological brains.

m2-neural-networks next action: turn "Neural networks are inspired by (but very different from) biological brains." into an AI checklist covering context, constraints, and safety.`,
  },

  "m2-what-ai-cant-do": {
    id: "m2-what-ai-cant-do",
    question: "I'm confused about this part: 'Understanding AI limits prevents one of the most common beginner mistakes: expecting present-day systems to reason, generalize, and understand like...' What is the one thing I should remember from this, in plain English? (Focus: m2-what-ai-cant-do)",
    explanation: `m2-what-ai-cant-do decision lens: In AI execution, "Understanding AI limits prevents one of the most common beginner mistakes: expecting present-day systems to reason, generalize, and understand like..." is a trigger to verify assumptions explicitly.

m2-what-ai-cant-do decision depth: m2-what-ai-cant-do adoption meaning: Operational implication: understanding AI limits prevents one of the most common beginner mistakes: expecting present-day systems to reason, generalize, and understand like humans do.

m2-what-ai-cant-do next action: for "Understanding AI limits prevents one of the most common beginner mistakes: expecting present-day systems to reason, generalize, and understand like...", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m2-classification-exercise": {
    id: "m2-classification-exercise",
    question: "I'm confused about this part: 'You'll attempt to classify emails as spam or not spam, thereby experiencing the machine learning challenge firsthand.' Can you decode this with a concrete scenario I might face at work? (Focus: m2-classification-exercise)",
    explanation: `m2-classification-exercise concept-to-action view: "You" translates AI theory into accountable choices.

m2-classification-exercise implementation depth: m2-classification-exercise governance angle: Why this improves AI judgment: you're now learning by doing.

m2-classification-exercise next action: use "You" to decide which AI steps are automatable and which remain judgment-heavy.`,
  },

  "m2-quiz": {
    id: "m2-quiz",
    question: "I'm confused about this part: 'Machine learning becomes easier to debug when you can trace outcomes back to data, labels, objectives, and distribution shifts.' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m2-quiz)",
    explanation: `m2-quiz operational reading: "Machine learning becomes easier to debug when you can trace outcomes back to data, labels, objectives, and distribution shifts." frames AI output as input to judgment, not a final verdict.

m2-quiz evaluation depth: m2-quiz learning takeaway: Use-case relevance: machine learning becomes easier to debug when you can trace outcomes back to data, labels, objectives, and distribution shifts.

m2-quiz next action: evaluate "Machine learning becomes easier to debug when you can trace outcomes back to data, labels, objectives, and distribution shifts." with a pre-mortem so AI failure modes are explicit early.`,
  },

  // MODULE 3: Large Language Models & Prompting
  "m3-module-overview": {
    id: "m3-module-overview",
    question: "I'm confused about this part: 'You will learn what an LLM is, how ChatGPT generates responses token by token, and how to structure prompts that produce reliable, high-quality...' Can you reframe this as a quick rule I can apply immediately? (Focus: m3-module-overview)",
    explanation: `Module 3 converts conceptual literacy into operational decision quality. The focus shifts from naming categories to running structured evaluations: baseline tests, scorecards, pilot logic, and explicit risk controls.

LLM understanding matters here because mechanism informs practice. Prompt design, failure analysis, and output evaluation are not isolated skills; they feed directly into how teams compare tools under real workflow constraints.

Use a simple rule: no recommendation without comparable evidence. Every candidate should be tested against the same task set, evaluated with the same criteria, and reviewed with the same risk thresholds.`,
  },

  "m3-hero": {
    id: "m3-hero",
    question: "I'm confused about this part: 'Tool selection quality depends on fit, risk, and workflow impact, not launch buzz or feature count.' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m3-hero)",
    explanation: `Good tool selection is an evidence problem, not a trend problem. A tool is strong only when it improves a defined workflow outcome under acceptable risk and manageable integration cost.

Bad interpretation prioritizes surface signals: launch attention, feature breadth, or polished demos. Good interpretation prioritizes operational signals: reliability in your context, review burden, data handling fit, and measurable uplift over baseline.

Make this concrete with a weighted rubric. Assign criteria, run comparable tests, and require a written rationale for buy, pilot, or wait. If rationale cannot be defended with evidence, selection is premature.`,
  },

  "m3-language-models": {
    id: "m3-language-models",
    question: "I'm confused about this part: 'A language model is trained to predict the next word given previous words.' How would you explain this if you only had 30 seconds? (Focus: m3-language-models)",
    explanation: `m3-language-models quality framing: For AI decisions, "A language model is trained to predict the next word given previous words." requires clearer standards before action.

m3-language-models learning depth: m3-language-models implementation meaning: Risk-aware reading: a language model is trained to predict the next word given previous words.

m3-language-models next action: for "A language model is trained to predict the next word given previous words.", compare AI recommendations against a non-AI baseline before adoption.`,
  },

  "m3-how-llms-work": {
    id: "m3-how-llms-work",
    question: "I'm confused about this part: 'A language model response is produced by turning text into tokens, passing them through learned network layers, and predicting the next token...' Can you turn this into a practical checklist I can use right away? (Focus: m3-how-llms-work)",
    explanation: `m3-how-llms-work mechanism view: "A language model response is produced by turning text into tokens, passing them through learned network layers, and predicting the next token..." in AI terms is about why outputs happen, not only what they say.

m3-how-llms-work accountability depth: m3-how-llms-work reliability lens: Quality-control angle: a language model response is produced by turning text into tokens, passing them through learned network layers, and predicting the next token repeatedly until a full answer emerges.

m3-how-llms-work next action: use "A language model response is produced by turning text into tokens, passing them through learned network layers, and predicting the next token..." to design oversight points for high-impact AI decisions.`,
  },

  "m3-prompt-anatomy": {
    id: "m3-prompt-anatomy",
    question: "I'm confused about this part: 'A well-structured prompt includes: context (what the system should know), the task (what you're asking for), constraints (limitations on the...' Could you break this down using an analogy and one actionable example? (Focus: m3-prompt-anatomy)",
    explanation: `m3-prompt-anatomy reliability framing: "A well-structured prompt includes: context (what the system should know), the task (what you" points to AI confidence calibration under uncertainty.

m3-prompt-anatomy governance depth: m3-prompt-anatomy workflow implication: Performance insight: not all prompts are equal.

m3-prompt-anatomy next action: for "A well-structured prompt includes: context (what the system should know), the task (what you", tie AI output acceptance to transparency and reproducibility criteria.`,
  },

  "m3-prompting-techniques": {
    id: "m3-prompting-techniques",
    question: "I'm confused about this part: 'Prompting techniques work when they align the model with useful reasoning patterns it has already seen in training.' What does this imply for real decisions, not just theory? (Focus: m3-prompting-techniques)",
    explanation: `m3-prompting-techniques governance reading: "Prompting techniques work when they align the model with useful reasoning patterns it has already seen in training." connects AI capability with accountability requirements.

m3-prompting-techniques performance depth: m3-prompting-techniques applied insight: Evidence-focused reading: prompting techniques work when they align the model with useful reasoning patterns it has already seen in training.

m3-prompting-techniques next action: apply "Prompting techniques work when they align the model with useful reasoning patterns it has already seen in training." by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m3-hands-on-practice": {
    id: "m3-hands-on-practice",
    question: "I'm confused about this part: 'Now you write prompts and iterate based on results. This experiential learning is crucial because prompting is a skill that improves dramatically...' Can you simplify this and show what success looks like in practice? (Focus: m3-hands-on-practice)",
    explanation: `m3-hands-on-practice evidence-first view: "Now you write prompts and iterate based on results. This experiential learning is crucial because prompting is a skill that improves dramatically..." means AI claims should be checked against context and risk.

m3-hands-on-practice context depth: m3-hands-on-practice strategic signal: Human-oversight implication: now you write prompts and iterate based on results.

m3-hands-on-practice next action: for "Now you write prompts and iterate based on results. This experiential learning is crucial because prompting is a skill that improves dramatically...", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m3-quiz": {
    id: "m3-quiz",
    question: "I'm confused about this part: 'Reliable prompting depends on controlling context, constraints, examples, and evaluation criteria rather than guessing until something works.' Could you explain this as if coaching a teammate through it? (Focus: m3-quiz)",
    explanation: `The quiz is testing disciplined evaluation, not trial-and-error intuition. Reliable prompting comes from controlled inputs and explicit success criteria, the same logic used in defensible tool procurement.

When context, constraints, and examples are specified, output differences become interpretable. You can compare candidates fairly, diagnose failure causes, and decide whether issues are fixable through prompt design or require a different tool class.

Treat the checkpoint as procurement rehearsal. Show that you can define a prompt protocol, run consistent comparisons, and justify decisions using observable evidence rather than preference.`,
  },

  // MODULE 4: AI Tools for Everyday Life
  "m4-hero": {
    id: "m4-hero",
    question: "I'm confused about this part: 'Partner selection has outsized impact on AI adoption outcomes because execution quality depends on scope clarity, accountability, and delivery...' Can you restate this clearly and show what changes in my workflow? (Focus: m4-hero)",
    explanation: `m4-hero strategic interpretation: "Partner selection has outsized impact on AI adoption outcomes because execution quality depends on scope clarity, accountability, and delivery..." in AI work supports repeatable, defensible decisions.

m4-hero synthesis depth: m4-hero evaluation cue: Actionable meaning: partner selection has outsized impact on AI adoption outcomes because execution quality depends on scope clarity, accountability, and delivery discipline.

m4-hero next action: for "Partner selection has outsized impact on AI adoption outcomes because execution quality depends on scope clarity, accountability, and delivery...", choose one low-risk AI use case and one non-negotiable safeguard.`,
  },

  "m4-writing-tools": {
    id: "m4-writing-tools",
    question: "I'm confused about this part: 'Pre-contract questions should clarify scope, outcomes, staffing, and accountability before work begins.' Could you unpack this in plain language and include one practical example? (Focus: m4-writing-tools)",
    explanation: `Partner selection quality depends on question quality before signature. Teams that skip pre-contract clarity usually discover misalignment only after budget and timeline risk has already expanded.

Strong pre-contract questions establish execution reality: who delivers what, by when, under which constraints, and with which acceptance criteria. Without this structure, proposals remain persuasive narratives rather than accountable delivery commitments.

Apply this by creating a diligence script for partner calls. Require explicit answers on scope boundaries, staffing continuity, reporting cadence, and escalation ownership before moving to commercial negotiation.`,
  },

  "m4-image-tools": {
    id: "m4-image-tools",
    question: "I'm confused about this part: 'Strong partner pilots should be small, measurable, and tied to clear go/no-go criteria.' What is the core idea here, and how would you teach it to a beginner? (Focus: m4-image-tools)",
    explanation: `A partner pilot is a decision instrument, not a symbolic launch. Its purpose is to generate evidence that reduces uncertainty about delivery quality, integration friction, and governance fit.

Pilot quality comes from constraint. Small scope, explicit success thresholds, and pre-defined stop conditions make results interpretable and prevent momentum from replacing evidence.

Use this practically by writing go/no-go criteria before kickoff. If the partner cannot commit to measurable outcomes and review dates, the pilot is unlikely to produce decision-grade evidence.`,
  },

  "m4-productivity-tools": {
    id: "m4-productivity-tools",
    question: "I'm confused about this part: 'Contract structure determines whether partner pricing stays predictable or drifts through vague change orders.' Can you translate this into everyday language and show why it matters? (Focus: m4-productivity-tools)",
    explanation: `Partner pricing risk is usually a contract-design problem, not a math problem. Low entry price can be attractive, but unclear scope boundaries and change-order clauses often create hidden long-run cost.

Predictable pricing requires explicit mechanics: what is included, what triggers extra charges, how acceptance is determined, and who approves scope adjustments. These details create governance leverage during delivery.

Operationalize this by requiring a pricing stress test before signature. Model best case, expected case, and scope-change case so leadership sees total exposure before approval.`,
  },

  "m4-quiz": {
    id: "m4-quiz",
    question: "I'm confused about this part: 'Partner decisions improve when proposals are compared by scope clarity, accountability, pilot evidence, and contract risk rather than by confidence in sales messaging.' Could you restate this without jargon and highlight the practical takeaway? (Focus: m4-quiz)",
    explanation: `Module 4 evaluates delivery partners, not product demos. Strong partner judgment depends on evidence about execution capacity, governance fit, and contractual clarity.

The practical rule is simple: do not reward narrative confidence without operating detail. Compare candidates on verifiable scope definition, measurable pilot outcomes, escalation design, and commercial transparency.

Use the checkpoint as a diligence simulation. Present one recommendation with explicit risk controls and one rejection with documented reasons, then verify both decisions can be defended under executive scrutiny.`,
  },

  // MODULE 5: Data and Learning
  "m5-hero": {
    id: "m5-hero",
    question: "I'm confused about this part: 'AI adoption becomes sustainable when teams can show measurable value, not just activity.' What does this actually mean in practice, and when should I apply it? (Focus: m5-hero)",
    explanation: `m5-hero interpretation: In an AI context, "AI adoption becomes sustainable when teams can show measurable value, not just activity." asks for evidence-aware decision making.

m5-hero execution depth: m5-hero decision context: Practical significance: aI adoption becomes sustainable when teams can show measurable value, not just activity.

m5-hero next action: for "AI adoption becomes sustainable when teams can show measurable value, not just activity.", document what evidence raises trust and what evidence lowers trust in AI.`,
  },

  "m5-what-is-data": {
    id: "m5-what-is-data",
    question: "I'm confused about this part: 'Data is information encoded in a form machines can process. But data isn't neutral.' Can you break this into simple steps and show how to use it correctly? (Focus: m5-what-is-data)",
    explanation: `Data is not just raw input for an AI model. It is a representation of real-world behavior produced by specific systems, incentives, and measurement choices. That means every dataset carries assumptions about who was observed, which events were captured, and what was excluded.

When people say data is not neutral, they mean collection design shapes outcomes before training begins. Sampling bias, missing groups, label ambiguity, and historical inequities can all be encoded into the training set. A model that performs well on average can still fail systematically for specific populations if the underlying data distribution is uneven.

Use this concept operationally by documenting data provenance before deployment. Track source, time window, known blind spots, and acceptable use boundaries. Treat dataset review as a governance step, not a technical afterthought, because model behavior will inherit unresolved data problems.`,
  },

  "m5-data-collection": {
    id: "m5-data-collection",
    question: "I'm confused about this part: 'The collection process itself can introduce bias before modeling starts.' How would you explain this to someone with zero AI background? (Focus: m5-data-collection)",
    explanation: `Bias often appears before any algorithm runs. Collection decisions determine who is represented, how often they appear, and which outcomes are visible to the system. If your pipeline under-samples certain users or contexts, the model will learn a distorted map of reality.

Collection bias is usually structural rather than malicious. Common causes include convenience sampling, instrument limitations, regional skew, and self-selection effects. The important point is causal: flawed collection produces flawed training signals, and no amount of model tuning can fully recover missing perspectives.

To reduce risk, audit collection strategy explicitly. Define target populations, minimum coverage thresholds, and data quality checks at ingestion time. If representational gaps are found, pause scale-up and correct collection first, because downstream evaluation will otherwise normalize preventable bias.`,
  },

  "m5-data-cleaning": {
    id: "m5-data-cleaning",
    question: "I'm confused about this part: 'Missing values, typos, outliers, and inconsistent formatting create problems.' Could you simplify this and point out the most important decision it affects? (Focus: m5-data-cleaning)",
    explanation: `m5-data-cleaning applied meaning: "Missing values, typos, outliers, and inconsistent formatting create problems." signals that AI value depends on mechanism, context, and safeguards.

m5-data-cleaning oversight depth: m5-data-cleaning risk context: Applied interpretation: real-world data is messy.

m5-data-cleaning next action: turn "Missing values, typos, outliers, and inconsistent formatting create problems." into an AI checklist covering context, constraints, and safety.`,
  },

  "m5-preprocessing": {
    id: "m5-preprocessing",
    question: "I'm confused about this part: 'After cleaning, data is preprocessed-transformed into a format that learning algorithms can use effectively.' What is the one thing I should remember from this, in plain English? (Focus: m5-preprocessing)",
    explanation: `m5-preprocessing decision lens: In AI execution, "After cleaning, data is preprocessed-transformed into a format that learning algorithms can use effectively." is a trigger to verify assumptions explicitly.

m5-preprocessing decision depth: m5-preprocessing adoption meaning: Operational implication: after cleaning, data is preprocessed-transformed into a format that learning algorithms can use effectively.

m5-preprocessing next action: for "After cleaning, data is preprocessed-transformed into a format that learning algorithms can use effectively.", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m5-feature-engineering": {
    id: "m5-feature-engineering",
    question: "I'm confused about this part: 'Feature engineering means creating new variables from raw data that help learning algorithms find patterns.' Can you decode this with a concrete scenario I might face at work? (Focus: m5-feature-engineering)",
    explanation: `m5-feature-engineering concept-to-action view: "Feature engineering means creating new variables from raw data that help learning algorithms find patterns." translates AI theory into accountable choices.

m5-feature-engineering implementation depth: m5-feature-engineering governance angle: Why this improves AI judgment: feature engineering means creating new variables from raw data that help learning algorithms find patterns.

m5-feature-engineering next action: use "Feature engineering means creating new variables from raw data that help learning algorithms find patterns." to decide which AI steps are automatable and which remain judgment-heavy.`,
  },

  "m5-quiz": {
    id: "m5-quiz",
    question: "I'm confused about this part: 'Data pipelines shape model behavior long before an architecture makes a prediction.' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m5-quiz)",
    explanation: `m5-quiz operational reading: "Data pipelines shape model behavior long before an architecture makes a prediction." frames AI output as input to judgment, not a final verdict.

m5-quiz evaluation depth: m5-quiz learning takeaway: Use-case relevance: data pipelines shape model behavior long before an architecture makes a prediction.

m5-quiz next action: evaluate "Data pipelines shape model behavior long before an architecture makes a prediction." with a pre-mortem so AI failure modes are explicit early.`,
  },

  // MODULE 6: AI Ethics and Society
  "m6-hero": {
    id: "m6-hero",
    question: "I'm confused about this part: 'AI's power creates ethical questions: How do we ensure fairness? Now you engage with implications.' Can you reframe this as a quick rule I can apply immediately? (Focus: m6-hero)",
    explanation: `Ethical AI reasoning starts with tradeoff recognition. Every system that increases speed, scale, or personalization also redistributes risk across users, teams, and institutions. The relevant question is not whether harm is possible, but where it is most likely and who absorbs it.

In practice, ethics is an operational discipline. Fairness, privacy, explainability, and accountability must be translated into design constraints, review checkpoints, and escalation policies. Without explicit mechanisms, ethical intent remains a slogan rather than a property of the system.

Use a simple rule in decisions: no high-impact AI output should move directly into action without a documented impact check. Require evidence for performance, bias exposure, and failure handling before deployment scope expands.`,
  },

  "m6-bias-fairness": {
    id: "m6-bias-fairness",
    question: "I'm confused about this part: 'AI systems trained on biased data learn and perpetuate that bias. Hiring algorithms trained on historical hiring data learn to discriminate like...' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m6-bias-fairness)",
    explanation: `m6-bias-fairness execution framing: "AI systems trained on biased data learn and perpetuate that bias. Hiring algorithms trained on historical hiring data learn to discriminate like..." indicates where AI can help and where human review must remain.

m6-bias-fairness strategic depth: m6-bias-fairness operational takeaway: Implementation lens: aI systems trained on biased data learn and perpetuate that bias.

m6-bias-fairness next action: translate "AI systems trained on biased data learn and perpetuate that bias. Hiring algorithms trained on historical hiring data learn to discriminate like..." into prompt constraints that reduce ambiguous AI behavior.`,
  },

  "m6-privacy-data": {
    id: "m6-privacy-data",
    question: "I'm confused about this part: 'That data is often personal information about you: your searches, your location, your purchases, your communications.' How would you explain this if you only had 30 seconds? (Focus: m6-privacy-data)",
    explanation: `m6-privacy-data quality framing: For AI decisions, "That data is often personal information about you: your searches, your location, your purchases, your communications." requires clearer standards before action.

m6-privacy-data learning depth: m6-privacy-data implementation meaning: Risk-aware reading: aI systems require data.

m6-privacy-data next action: for "That data is often personal information about you: your searches, your location, your purchases, your communications.", compare AI recommendations against a non-AI baseline before adoption.`,
  },

  "m6-misinformation-deepfakes": {
    id: "m6-misinformation-deepfakes",
    question: "I'm confused about this part: 'Deepfake technology can make videos of people saying things they never said.' Can you turn this into a practical checklist I can use right away? (Focus: m6-misinformation-deepfakes)",
    explanation: `m6-misinformation-deepfakes mechanism view: "Deepfake technology can make videos of people saying things they never said." in AI terms is about why outputs happen, not only what they say.

m6-misinformation-deepfakes accountability depth: m6-misinformation-deepfakes reliability lens: Quality-control angle: aI enables new forms of misinformation.

m6-misinformation-deepfakes next action: use "Deepfake technology can make videos of people saying things they never said." to design oversight points for high-impact AI decisions.`,
  },

  "m6-responsible-use": {
    id: "m6-responsible-use",
    question: "I'm confused about this part: 'Responsibility means thinking about consequences. When you use or build AI systems, you're making choices with implications for real people.' Could you break this down using an analogy and one actionable example? (Focus: m6-responsible-use)",
    explanation: `Responsible AI use means owning the decision context, not outsourcing judgment to model output. A helpful analogy is clinical triage: decision tools can prioritize attention, but professionals remain accountable for outcomes, especially in ambiguous or high-stakes cases.

Consequence awareness requires pre-commitment to standards. Teams should define what counts as acceptable evidence, when human override is mandatory, and how errors are reported and corrected. Responsibility is measurable when these rules are explicit and consistently enforced.

Apply this immediately by adding an approval gate for consequential outputs. Before action, require one reviewer to verify source evidence, boundary conditions, and potential downstream harm. This converts responsibility from abstract principle into repeatable workflow behavior.`,
  },

  "m6-ethical-dilemmas": {
    id: "m6-ethical-dilemmas",
    question: "I'm confused about this part: 'Real AI ethics decisions rarely offer clean answers. A company may want AI hiring because it is cheaper even if it introduces bias, and a government...' What does this imply for real decisions, not just theory? (Focus: m6-ethical-dilemmas)",
    explanation: `m6-ethical-dilemmas governance reading: "Real AI ethics decisions rarely offer clean answers. A company may want AI hiring because it is cheaper even if it introduces bias, and a government..." connects AI capability with accountability requirements.

m6-ethical-dilemmas performance depth: m6-ethical-dilemmas applied insight: Evidence-focused reading: real AI ethics decisions rarely offer clean answers.

m6-ethical-dilemmas next action: apply "Real AI ethics decisions rarely offer clean answers. A company may want AI hiring because it is cheaper even if it introduces bias, and a government..." by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m6-risk-safeguards": {
    id: "m6-risk-safeguards",
    question: "I'm confused about this part: 'Safeguards-redundancies, fail-safes, and monitoring systems-exist because failure is inevitable.' Can you simplify this and show what success looks like in practice? (Focus: m6-risk-safeguards)",
    explanation: `m6-risk-safeguards evidence-first view: "Safeguards-redundancies, fail-safes, and monitoring systems-exist because failure is inevitable." means AI claims should be checked against context and risk.

m6-risk-safeguards context depth: m6-risk-safeguards strategic signal: Human-oversight implication: if something can go wrong, it probably will.

m6-risk-safeguards next action: for "Safeguards-redundancies, fail-safes, and monitoring systems-exist because failure is inevitable.", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m6-quiz": {
    id: "m6-quiz",
    question: "I'm confused about this part: 'AI risk analysis requires you to reason across bias, privacy, misinformation, and unsafe automation at the same time.' Could you explain this as if coaching a teammate through it? (Focus: m6-quiz)",
    explanation: `m6-quiz workflow reading: "AI risk analysis requires you to reason across bias, privacy, misinformation, and unsafe automation at the same time." identifies a step where AI output must be evaluated, not copied.

m6-quiz model depth: m6-quiz capability note: Workflow consequence: aI risk analysis requires you to reason across bias, privacy, misinformation, and unsafe automation at the same time.

m6-quiz next action: convert "AI risk analysis requires you to reason across bias, privacy, misinformation, and unsafe automation at the same time." into a risk-weighted AI decision protocol for your workflow.`,
  },

  // MODULE 7: AI for Business & Work
  "m7-hero": {
    id: "m7-hero",
    question: "I'm confused about this part: 'Adoption roadmaps convert isolated AI experiments into coordinated implementation progress across teams.' Can you restate this clearly and show what changes in my workflow? (Focus: m7-hero)",
    explanation: `m7-hero strategic interpretation: "Adoption roadmaps convert isolated AI experiments into coordinated implementation progress across teams." in AI work supports repeatable, defensible decisions.

m7-hero synthesis depth: m7-hero evaluation cue: Actionable meaning: adoption roadmaps convert isolated AI experiments into coordinated implementation progress across teams.

m7-hero next action: for "Adoption roadmaps convert isolated AI experiments into coordinated implementation progress across teams.", choose one low-risk AI use case and one non-negotiable safeguard.`,
  },

  "m7-workplace-ai": {
    id: "m7-workplace-ai",
    question: "I'm confused about this part: 'A radiologist with an AI diagnostic tool is more effective than one without.' Could you unpack this in plain language and include one real-world example? (Focus: m7-workplace-ai)",
    explanation: `m7-workplace-ai framing: In AI practice, "A radiologist with an AI diagnostic tool is more effective than one without." should be read as a decision prompt with explicit criteria.

m7-workplace-ai reasoning depth: aI isn't replacing most jobs yet.

m7-workplace-ai next action: test AI output tied to "A radiologist with an AI diagnostic tool is more effective than one without." with one metric, one risk check, and one contingency path.`,
  },

  "m7-future-jobs": {
    id: "m7-future-jobs",
    question: "I'm confused about this part: 'The discussion moves beyond fear-based thinking to strategic thinking.' What is the core idea here, and how would you teach it to a beginner? (Focus: m7-future-jobs)",
    explanation: `m7-future-jobs translation: For AI work, "The discussion moves beyond fear-based thinking to strategic thinking." is a cue to connect concept understanding to concrete choices.

m7-future-jobs practical depth: m7-future-jobs reasoning layer: some jobs will be disrupted by AI. Treat

m7-future-jobs next action: for "The discussion moves beyond fear-based thinking to strategic thinking.", validate a core assumption before AI output informs any real decision.`,
  },

  "m7-industries": {
    id: "m7-industries",
    question: "I'm confused about this part: 'Different industries are adopting AI at different rates. Healthcare, finance, manufacturing, and retail are leading.' Can you translate this into everyday language and show why it matters? (Focus: m7-industries)",
    explanation: `m7-industries plain-language view: "Different industries are adopting AI at different rates. Healthcare, finance, manufacturing, and retail are leading." marks an AI judgment moment, not just a vocabulary check.

m7-industries mechanism depth: m7-industries practical meaning: different industries are adopting AI at different rates.

m7-industries next action: map "Different industries are adopting AI at different rates. Healthcare, finance, manufacturing, and retail are leading." to a small AI pilot, then compare benefit, effort, and failure risk.`,
  },

  "m7-business-strategy": {
    id: "m7-business-strategy",
    question: "I'm confused about this part: 'Having AI is different from using AI effectively. A strategy requires understanding: What problem are we solving?' Could you restate this without jargon and highlight the practical takeaway? (Focus: m7-business-strategy)",
    explanation: `m7-business-strategy core reading: Within AI workflows, "Having AI is different from using AI effectively. A strategy requires understanding: What problem are we solving?" means reasoning quality matters as much as output speed.

m7-business-strategy risk depth: m7-business-strategy execution view: Reasoning behind the point: having AI is different from using AI effectively.

m7-business-strategy next action: use "Having AI is different from using AI effectively. A strategy requires understanding: What problem are we solving?" to set review gates so AI drafts and final decisions stay separated.`,
  },

  "m7-real-workflows": {
    id: "m7-real-workflows",
    question: "I'm confused about this part: 'The focus moves from theoretical to practical. Real teams use AI in specific ways that solve specific problems.' What does this actually mean in practice, and when should I apply it? (Focus: m7-real-workflows)",
    explanation: `m7-real-workflows interpretation: In an AI context, "The focus moves from theoretical to practical. Real teams use AI in specific ways that solve specific problems." asks for evidence-aware decision making.

m7-real-workflows execution depth: m7-real-workflows decision context: Practical significance: the focus moves from theoretical to practical.

m7-real-workflows next action: for "The focus moves from theoretical to practical. Real teams use AI in specific ways that solve specific problems.", document what evidence raises trust and what evidence lowers trust in AI.`,
  },

  "m7-quiz": {
    id: "m7-quiz",
    question: "I'm confused about this part: 'Strategic AI reasoning starts with business value, adoption barriers, and human-critical capabilities rather than technical novelty.' Can you break this into simple steps and show how to use it correctly? (Focus: m7-quiz)",
    explanation: `m7-quiz practical reading: "Strategic AI reasoning starts with business value, adoption barriers, and human-critical capabilities rather than technical novelty." highlights where AI assistance needs boundaries and review.

m7-quiz quality depth: m7-quiz model insight: Execution meaning: strategic AI reasoning starts with business value, adoption barriers, and human-critical capabilities rather than technical novelty.

m7-quiz next action: operationalize "Strategic AI reasoning starts with business value, adoption barriers, and human-critical capabilities rather than technical novelty." by defining stop conditions when AI quality degrades.`,
  },

  // MODULE 8: Creative AI Applications
  "m8-hero": {
    id: "m8-hero",
    question: "I'm confused about this part: 'Agent systems add autonomy over time, which creates both higher leverage and higher operational risk than single-step AI assistance.' How would you explain this to someone with zero AI background? (Focus: m8-hero)",
    explanation: `m8-hero action lens: For AI users, "Agent systems add autonomy over time, which creates both higher leverage and higher operational risk than single-step AI assistance." points to disciplined evaluation before trust.

m8-hero adoption depth: m8-hero quality signal: How to think about it: agent systems add autonomy over time, which creates both higher leverage and higher operational risk than single-step AI assistance. Use

m8-hero next action: for "Agent systems add autonomy over time, which creates both higher leverage and higher operational risk than single-step AI assistance.", pair AI speed goals with verification requirements before scaling.`,
  },

  "m8-ai-creativity": {
    id: "m8-ai-creativity",
    question: "I'm confused about this part: 'AI and creativity become clearer when you separate novelty from intention, authorship, and taste.' Could you simplify this and point out the most important decision it affects? (Focus: m8-ai-creativity)",
    explanation: `m8-ai-creativity applied meaning: "AI and creativity become clearer when you separate novelty from intention, authorship, and taste." signals that AI value depends on mechanism, context, and safeguards.

m8-ai-creativity oversight depth: m8-ai-creativity risk context: Applied interpretation: aI and creativity become clearer when you separate novelty from intention, authorship, and taste.

m8-ai-creativity next action: turn "AI and creativity become clearer when you separate novelty from intention, authorship, and taste." into an AI checklist covering context, constraints, and safety.`,
  },

  "m8-ai-augmented-creativity": {
    id: "m8-ai-augmented-creativity",
    question: "I'm confused about this part: 'Rather than replacing humans, AI augments creativity. Musicians use AI to generate backing tracks.' What is the one thing I should remember from this, in plain English? (Focus: m8-ai-augmented-creativity)",
    explanation: `m8-ai-augmented-creativity decision lens: In AI execution, "Rather than replacing humans, AI augments creativity. Musicians use AI to generate backing tracks." is a trigger to verify assumptions explicitly.

m8-ai-augmented-creativity decision depth: m8-ai-augmented-creativity adoption meaning: Operational implication: rather than replacing humans, AI augments creativity.

m8-ai-augmented-creativity next action: for "Rather than replacing humans, AI augments creativity. Musicians use AI to generate backing tracks.", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m8-ai-knowledge": {
    id: "m8-ai-knowledge",
    question: "I'm confused about this part: 'Knowledge workers-researchers, analysts, and educators-increasingly use AI for information processing.' Can you decode this with a concrete scenario I might face at work? (Focus: m8-ai-knowledge)",
    explanation: `m8-ai-knowledge concept-to-action view: "Knowledge workers-researchers, analysts, and educators-increasingly use AI for information processing." translates AI theory into accountable choices.

m8-ai-knowledge implementation depth: m8-ai-knowledge governance angle: Why this improves AI judgment: knowledge workers-researchers, analysts, and educators-increasingly use AI for information processing.

m8-ai-knowledge next action: use "Knowledge workers-researchers, analysts, and educators-increasingly use AI for information processing." to decide which AI steps are automatable and which remain judgment-heavy.`,
  },

  "m8-collaboration": {
    id: "m8-collaboration",
    question: "I'm confused about this part: 'The most powerful model isn't humans alone or AI alone but humans and AI collaborating.' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m8-collaboration)",
    explanation: `Human-AI collaboration works because each side contributes complementary strengths. Models can process large volumes of text, patterns, and alternatives quickly, while humans provide context, values, domain judgment, and accountability for consequences.

The common failure mode is role confusion. Teams either over-automate judgment tasks that require nuance or underuse AI on tasks where structured acceleration is safe and valuable. Effective collaboration begins with role design: specify what AI drafts, what humans decide, and which checkpoints prevent silent error propagation.

Use collaboration as a system architecture choice. Map your workflow into generation, evaluation, and decision stages, then assign ownership at each stage. Treat AI outputs as proposals that improve throughput, not as self-validating conclusions.`,
  },

  "m8-quiz": {
    id: "m8-quiz",
    question: "I'm confused about this part: 'Creative and knowledge-work AI decisions are strongest when you can separate productive augmentation from empty hype.' Can you reframe this as a quick rule I can apply immediately? (Focus: m8-quiz)",
    explanation: `m8-quiz realistic interpretation: In AI practice, "Creative and knowledge-work AI decisions are strongest when you can separate productive augmentation from empty hype." emphasizes tradeoffs over hype.

m8-quiz operational depth: m8-quiz mechanism check: Mechanism-level takeaway: creative and knowledge-work AI decisions are strongest when you can separate productive augmentation from empty hype.

m8-quiz next action: for "Creative and knowledge-work AI decisions are strongest when you can separate productive augmentation from empty hype.", establish a repeatable AI evaluation routine with traceable evidence.`,
  },

  // MODULE 9: Your AI Toolkit
  "m9-hero": {
    id: "m9-hero",
    question: "I'm confused about this part: 'AI stack design determines whether adoption stays manageable or collapses into duplicate tools, unclear ownership, and rising operational cost.' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m9-hero)",
    explanation: `m9-hero execution framing: "AI stack design determines whether adoption stays manageable or collapses into duplicate tools, unclear ownership, and rising operational cost." indicates where AI can help and where human review must remain.

m9-hero strategic depth: m9-hero operational takeaway: Implementation lens: aI stack design determines whether adoption stays manageable or collapses into duplicate tools, unclear ownership, and rising operational cost.

m9-hero next action: translate "AI stack design determines whether adoption stays manageable or collapses into duplicate tools, unclear ownership, and rising operational cost." into prompt constraints that reduce ambiguous AI behavior.`,
  },

  // MODULE 10: The Future of AI
  "m10-hero": {
    id: "m10-hero",
    question: "I'm confused about this part: 'At this stage final module is about reasoning under uncertainty. Instead of predicting one inevitable future, it helps you evaluate frontier...' How would you explain this if you only had 30 seconds? (Focus: m10-hero)",
    explanation: `m10-hero quality framing: For AI decisions, "At this stage final module is about reasoning under uncertainty. Instead of predicting one inevitable future, it helps you evaluate frontier..." requires clearer standards before action.

m10-hero learning depth: m10-hero implementation meaning: Risk-aware reading: at this stage final module is about reasoning under uncertainty.

m10-hero next action: for "At this stage final module is about reasoning under uncertainty. Instead of predicting one inevitable future, it helps you evaluate frontier...", compare AI recommendations against a non-AI baseline before adoption.`,
  },

  "m10-quiz": {
    id: "m10-quiz",
    question: "I'm confused about this part: 'Future-facing AI judgment depends on connecting frontier capability, governance friction, and career strategy without pretending uncertainty is gone.' Can you turn this into a practical checklist I can use right away? (Focus: m10-quiz)",
    explanation: `m10-quiz mechanism view: "Future-facing AI judgment depends on connecting frontier capability, governance friction, and career strategy without pretending uncertainty is gone." in AI terms is about why outputs happen, not only what they say.

m10-quiz accountability depth: m10-quiz reliability lens: Quality-control angle: future-facing AI judgment depends on connecting frontier capability, governance friction, and career strategy without pretending uncertainty is gone.

m10-quiz next action: use "Future-facing AI judgment depends on connecting frontier capability, governance friction, and career strategy without pretending uncertainty is gone." to design oversight points for high-impact AI decisions.`,
  },

  // MODULE 4 (actual): Choosing an AI Partner
  "m4-module-overview": {
    id: "m4-module-overview",
    question: "I'm confused about this part: 'External AI delivery works best when partner selection is based on execution fit, not branding or sales confidence.' Could you break this down using an analogy and one actionable example? (Focus: m4-module-overview)",
    explanation: `m4-module-overview reliability framing: "External AI delivery works best when partner selection is based on execution fit, not branding or sales confidence." points to AI confidence calibration under uncertainty.

m4-module-overview governance depth: m4-module-overview workflow implication: Performance insight: external AI delivery works best when partner selection is based on execution fit, not branding or sales confidence.

m4-module-overview next action: for "External AI delivery works best when partner selection is based on execution fit, not branding or sales confidence.", tie AI output acceptance to transparency and reproducibility criteria.`,
  },

  "m4-what-is-data": {
    id: "m4-what-is-data",
    question: "I'm confused about this part: 'Pre-contract diligence quality is a strong predictor of AI partner outcomes.' What does this imply for real decisions, not just theory? (Focus: m4-what-is-data)",
    explanation: `m4-what-is-data governance reading: "Pre-contract diligence quality is a strong predictor of AI partner outcomes." connects AI capability with accountability requirements.

m4-what-is-data performance depth: m4-what-is-data applied insight: Evidence-focused reading: pre-contract diligence quality is a strong predictor of AI partner outcomes.

m4-what-is-data next action: apply "Pre-contract diligence quality is a strong predictor of AI partner outcomes." by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m4-data-collection": {
    id: "m4-data-collection",
    question: "I'm confused about this part: 'Proposal red flags usually appear as confidence without operating detail: vague timelines, unclear staffing, missing risk plans, or outcomes that...' Can you simplify this and show what success looks like in practice? (Focus: m4-data-collection)",
    explanation: `m4-data-collection evidence-first view: "Proposal red flags usually appear as confidence without operating detail: vague timelines, unclear staffing, missing risk plans, or outcomes that..." means AI claims should be checked against context and risk.

m4-data-collection context depth: m4-data-collection strategic signal: Human-oversight implication: proposal red flags usually appear as confidence without operating detail: vague timelines, unclear staffing, missing risk plans, or outcomes that cannot be measured.

m4-data-collection next action: for "Proposal red flags usually appear as confidence without operating detail: vague timelines, unclear staffing, missing risk plans, or outcomes that...", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m4-data-cleaning": {
    id: "m4-data-cleaning",
    question: "I'm confused about this part: 'Pilot structure determines whether a partner evaluation produces evidence or confusion.' Could you explain this as if coaching a teammate through it? (Focus: m4-data-cleaning)",
    explanation: `m4-data-cleaning workflow reading: "Pilot structure determines whether a partner evaluation produces evidence or confusion." identifies a step where AI output must be evaluated, not copied.

m4-data-cleaning model depth: m4-data-cleaning capability note: Workflow consequence: pilot structure determines whether a partner evaluation produces evidence or confusion.

m4-data-cleaning next action: convert "Pilot structure determines whether a partner evaluation produces evidence or confusion." into a risk-weighted AI decision protocol for your workflow.`,
  },

  "m4-preprocessing": {
    id: "m4-preprocessing",
    question: "I'm confused about this part: 'Execution-model choice should reflect internal capability, urgency, and desired long-term ownership.' Can you restate this clearly and show what changes in my workflow? (Focus: m4-preprocessing)",
    explanation: `m4-preprocessing strategic interpretation: "Execution-model choice should reflect internal capability, urgency, and desired long-term ownership." in AI work supports repeatable, defensible decisions.

m4-preprocessing synthesis depth: m4-preprocessing evaluation cue: Actionable meaning: execution-model choice should reflect internal capability, urgency, and desired long-term ownership.

m4-preprocessing next action: for "Execution-model choice should reflect internal capability, urgency, and desired long-term ownership.", choose one low-risk AI use case and one non-negotiable safeguard.`,
  },

  "m4-feature-engineering": {
    id: "m4-feature-engineering",
    question: "I'm confused about this part: 'AI partner pricing becomes predictable when teams separate fixed scope fees, variable usage costs, and change-order exposure.' Could you unpack this in plain language and include one real-world example? (Focus: m4-feature-engineering)",
    explanation: `m4-feature-engineering framing: In AI practice, "AI partner pricing becomes predictable when teams separate fixed scope fees, variable usage costs, and change-order exposure." should be read as a decision prompt with explicit criteria.

m4-feature-engineering reasoning depth: aI partner pricing becomes predictable when teams separate fixed scope fees, variable usage costs, and change-order exposure.

m4-feature-engineering next action: test AI output tied to "AI partner pricing becomes predictable when teams separate fixed scope fees, variable usage costs, and change-order exposure." with one metric, one risk check, and one contingency path.`,
  },

  // MODULE 5 (actual): Evaluating the Business Impact of AI
  "m5-module-overview": {
    id: "m5-module-overview",
    question: "I'm confused about this part: 'Module 5 treats AI adoption as a measurement design problem, not a hype decision.' What does that mean in practice for a team deciding where to invest first? (Focus: m5-module-overview)",
    explanation: `m5-module-overview translation: Module 5 is about building a defensible measurement system before scaling AI. The core move is to define outcomes, baselines, and owners first, then judge tools by observed impact.

m5-module-overview reasoning depth: Teams often confuse activity with value. Usage metrics, demo quality, and internal excitement are not enough. This module asks: what business outcome should improve, how will we measure the change, and what evidence threshold justifies more investment?

m5-module-overview next action: Write one ROI measurement brief for a pilot: baseline metric, target delta, cost categories, review cadence, and a stop rule if evidence is weak.`,
  },

  "m5-roi-basics": {
    id: "m5-roi-basics",
    question: "I'm confused about this part: 'AI ROI compares the measurable value created by AI against the total cost of adoption, including software spend, setup effort, team onboarding,...' Can you translate this into everyday language and show why it matters? (Focus: m5-roi-basics)",
    explanation: `m5-roi-basics plain-language view: "AI ROI compares the measurable value created by AI against the total cost of adoption, including software spend, setup effort, team onboarding,..." marks an AI judgment moment, not just a vocabulary check.

m5-roi-basics mechanism depth: m5-roi-basics practical meaning: aI ROI compares the measurable value created by AI against the total cost of adoption, including software spend, setup effort, team onboarding, quality checks, and operational overhead.

m5-roi-basics next action: map "AI ROI compares the measurable value created by AI against the total cost of adoption, including software spend, setup effort, team onboarding,..." to a small AI pilot, then compare benefit, effort, and failure risk.`,
  },

  "m5-leverage": {
    id: "m5-leverage",
    question: "I'm confused about this part: 'Leverage means AI increases capability, not just speed. Examples include creating more high-quality outputs, improving conversion performance,...' Could you restate this without jargon and highlight the practical takeaway? (Focus: m5-leverage)",
    explanation: `m5-leverage core reading: Within AI workflows, "Leverage means AI increases capability, not just speed. Examples include creating more high-quality outputs, improving conversion performance,..." means reasoning quality matters as much as output speed.

m5-leverage risk depth: m5-leverage execution view: Reasoning behind the point: leverage means AI increases capability, not just speed.

m5-leverage next action: use "Leverage means AI increases capability, not just speed. Examples include creating more high-quality outputs, improving conversion performance,..." to set review gates so AI drafts and final decisions stay separated.`,
  },

  "m5-effectiveness": {
    id: "m5-effectiveness",
    question: "I'm confused about this part: 'Measure outcomes, not just activity.' How do I separate useful performance signals from vanity metrics in an AI rollout? (Focus: m5-effectiveness)",
    explanation: `m5-effectiveness interpretation: Outcome metrics track whether business performance improved; activity metrics only show that people touched the tool. Both are useful, but only outcome movement proves value.

m5-effectiveness execution depth: A good metric stack uses three lenses: efficiency (time/cost), effectiveness (quality/results), and risk (error or compliance exposure). If one lens improves while another deteriorates, scale decisions should pause.

m5-effectiveness next action: For one workflow, define one metric per lens and set acceptable ranges. Review weekly and treat conflicting signals as a decision checkpoint, not a reporting footnote.`,
  },

  "m5-roi-formula": {
    id: "m5-roi-formula",
    question: "I'm confused about this part: 'The module uses a transparent baseline formula: ROI (%) = ((Value - Cost) / Cost) * 100.' Can you break this into simple steps and show how to use it correctly? (Focus: m5-roi-formula)",
    explanation: `m5-roi-formula practical reading: "The module uses a transparent baseline formula: ROI (%) = ((Value - Cost) / Cost) * 100." highlights where AI assistance needs boundaries and review.

m5-roi-formula quality depth: m5-roi-formula model insight: Execution meaning: the module uses a transparent baseline formula: ROI (%) = ((Value - Cost) / Cost) * 100.

m5-roi-formula next action: operationalize "The module uses a transparent baseline formula: ROI (%) = ((Value - Cost) / Cost) * 100." by defining stop conditions when AI quality degrades.`,
  },

  "m5-metrics": {
    id: "m5-metrics",
    question: "I'm confused about this part: 'A strong metric stack combines efficiency, effectiveness, and risk signals so teams avoid optimizing for one dimension while harming another.' How would you explain this to someone with zero AI background? (Focus: m5-metrics)",
    explanation: `m5-metrics action lens: For AI users, "A strong metric stack combines efficiency, effectiveness, and risk signals so teams avoid optimizing for one dimension while harming another." points to disciplined evaluation before trust.

m5-metrics adoption depth: m5-metrics quality signal: How to think about it: vanity metrics can hide poor outcomes. Use

m5-metrics next action: for "A strong metric stack combines efficiency, effectiveness, and risk signals so teams avoid optimizing for one dimension while harming another.", pair AI speed goals with verification requirements before scaling.`,
  },

  "m5-adoption": {
    id: "m5-adoption",
    question: "I'm confused about this part: 'Adoption criteria should be evidence-weighted.' Which criteria matter most before we commit budget to an AI initiative? (Focus: m5-adoption)",
    explanation: `m5-adoption applied meaning: Structured criteria protect teams from chasing novelty. The strongest early criteria are measurable outcome potential, evidence quality, implementation cost clarity, and operational reliability.

m5-adoption oversight depth: Security and integration fit are required constraints, but they are not value proof. Value proof comes from whether the initiative can credibly move a business metric within a known time window.

m5-adoption next action: Build a weighted decision sheet with explicit scoring rules and required evidence for each criterion. If evidence is missing, the score should not be estimated optimistically.`,
  },

  // MODULE 6 additions (m6-module-overview and m6-future-ai)
  "m6-module-overview": {
    id: "m6-module-overview",
    question: "I'm confused about this part: 'Using m6-module-overview practical lens module covers the human consequences of AI: where systems are unfair, how personal data gets misused, how...' What is the one thing I should remember from this, in plain English? (Focus: m6-module-overview)",
    explanation: `m6-module-overview decision lens: In AI execution, "Using m6-module-overview practical lens module covers the human consequences of AI: where systems are unfair, how personal data gets misused, how..." is a trigger to verify assumptions explicitly.

m6-module-overview decision depth: m6-module-overview adoption meaning: Operational implication: using m6-module-overview practical lens module covers the human consequences of AI: where systems are unfair, how personal data gets misused, how misinformation spreads at scale, and what responsible deployment looks like.

m6-module-overview next action: for "Using m6-module-overview practical lens module covers the human consequences of AI: where systems are unfair, how personal data gets misused, how...", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m6-future-ai": {
    id: "m6-future-ai",
    question: "I'm confused about this part: 'AI development is accelerating across capability, access, and regulation simultaneously.' Can you decode this with a concrete scenario I might face at work? (Focus: m6-future-ai)",
    explanation: `m6-future-ai concept-to-action view: "AI development is accelerating across capability, access, and regulation simultaneously." translates AI theory into accountable choices.

m6-future-ai implementation depth: m6-future-ai governance angle: Why this improves AI judgment: aI development is accelerating across capability, access, and regulation simultaneously.

m6-future-ai next action: use "AI development is accelerating across capability, access, and regulation simultaneously." to decide which AI steps are automatable and which remain judgment-heavy.`,
  },

  // MODULE 7 additions
  "m7-module-overview": {
    id: "m7-module-overview",
    question: "I'm confused about this part: 'Module 7 is about rollout orchestration.' How is that different from choosing tools or measuring ROI? (Focus: m7-module-overview)",
    explanation: `m7-module-overview operational reading: Module 7 assumes you already have candidate use cases and basic value evidence. The focus shifts to execution: sequencing work, assigning owners, preparing teams, and sustaining adoption.

m7-module-overview evaluation depth: This module answers deployment questions: What should launch first? Which dependencies must be complete? Who resolves blockers? How do we prevent rollout fatigue? It is less about proving value and more about delivering value reliably.

m7-module-overview next action: Draft a phased rollout map with dependency gates, owner names, change-support actions, and weekly operating rhythm for decisions and escalation.`,
  },

  "m7-opportunities": {
    id: "m7-opportunities",
    question: "I'm confused about this part: 'Not all tasks benefit equally An opportunities framework helps you identify where AI creates the most value: high-volume repetitive tasks, pattern...' Can you reframe this as a quick rule I can apply immediately? (Focus: m7-opportunities)",
    explanation: `m7-opportunities realistic interpretation: In AI practice, "Not all tasks benefit equally An opportunities framework helps you identify where AI creates the most value: high-volume repetitive tasks, pattern..." emphasizes tradeoffs over hype.

m7-opportunities operational depth: m7-opportunities mechanism check: Mechanism-level takeaway: not all tasks benefit equally An opportunities framework helps you identify where AI creates the most value: high-volume repetitive tasks, pattern recognition at scale, drafting first versions, and summarising large information sets.

m7-opportunities next action: for "Not all tasks benefit equally An opportunities framework helps you identify where AI creates the most value: high-volume repetitive tasks, pattern...", establish a repeatable AI evaluation routine with traceable evidence.`,
  },

  "m7-role-transformation": {
    id: "m7-role-transformation",
    question: "I'm confused about this part: 'AI does not simply replace jobs - it transforms them. The mix of tasks within a role shifts: routine information processing declines while judgment,...' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m7-role-transformation)",
    explanation: `m7-role-transformation execution framing: "AI does not simply replace jobs - it transforms them. The mix of tasks within a role shifts: routine information processing declines while judgment,..." indicates where AI can help and where human review must remain.

m7-role-transformation strategic depth: m7-role-transformation operational takeaway: Implementation lens: aI does not simply replace jobs - it transforms them.

m7-role-transformation next action: translate "AI does not simply replace jobs - it transforms them. The mix of tasks within a role shifts: routine information processing declines while judgment,..." into prompt constraints that reduce ambiguous AI behavior.`,
  },

  "m7-workflow-redesign": {
    id: "m7-workflow-redesign",
    question: "I'm confused about this part: 'Workflow redesign is a sequencing problem.' What exactly should be redesigned first when introducing AI into an existing process? (Focus: m7-workflow-redesign)",
    explanation: `m7-workflow-redesign quality framing: Start by redesigning handoffs and checkpoints, not just individual tasks. AI changes where work is reviewed, approved, and corrected, so sequence design is as important as prompt quality.

m7-workflow-redesign learning depth: A practical redesign pattern is: map current workflow, mark automation candidates, identify irreversible decisions, insert human checkpoints, and define escalation for exceptions. This prevents silent error propagation.

m7-workflow-redesign next action: Redraw one target workflow with phase ownership, entry criteria, exit criteria, and exception routing. Use it as the rollout template for similar teams.`,
  },

  "m7-building-skills": {
    id: "m7-building-skills",
    question: "I'm confused about this part: 'AI capabilities are evolving faster than traditional skill development cycles.' Can you turn this into a practical checklist I can use right away? (Focus: m7-building-skills)",
    explanation: `m7-building-skills mechanism view: "AI capabilities are evolving faster than traditional skill development cycles." in AI terms is about why outputs happen, not only what they say.

m7-building-skills accountability depth: m7-building-skills reliability lens: Quality-control angle: aI capabilities are evolving faster than traditional skill development cycles.

m7-building-skills next action: use "AI capabilities are evolving faster than traditional skill development cycles." to design oversight points for high-impact AI decisions.`,
  },

  // MODULE 8 (actual): AI Agents
  "m8-module-overview": {
    id: "m8-module-overview",
    question: "I'm confused about this part: 'From an execution viewpoint module covers AI agents - systems that perceive their environment, reason, and take actions to achieve goals.' Could you break this down using an analogy and one actionable example? (Focus: m8-module-overview)",
    explanation: `m8-module-overview reliability framing: "From an execution viewpoint module covers AI agents - systems that perceive their environment, reason, and take actions to achieve goals." points to AI confidence calibration under uncertainty.

m8-module-overview governance depth: m8-module-overview workflow implication: Performance insight: from an execution viewpoint module covers AI agents - systems that perceive their environment, reason, and take actions to achieve goals.

m8-module-overview next action: for "From an execution viewpoint module covers AI agents - systems that perceive their environment, reason, and take actions to achieve goals.", tie AI output acceptance to transparency and reproducibility criteria.`,
  },

  "m8-what-are-agents": {
    id: "m8-what-are-agents",
    question: "I'm confused about this part: 'An AI agent is a system that takes actions in pursuit of a goal, not just responds to a single prompt.' What does this imply for real decisions, not just theory? (Focus: m8-what-are-agents)",
    explanation: `m8-what-are-agents governance reading: "An AI agent is a system that takes actions in pursuit of a goal, not just responds to a single prompt." connects AI capability with accountability requirements.

m8-what-are-agents performance depth: m8-what-are-agents applied insight: Evidence-focused reading: an AI agent is a system that takes actions in pursuit of a goal, not just responds to a single prompt.

m8-what-are-agents next action: apply "An AI agent is a system that takes actions in pursuit of a goal, not just responds to a single prompt." by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m8-how-agents-work": {
    id: "m8-how-agents-work",
    question: "I'm confused about this part: 'Agents operate in a loop: perceive the current state, reason about what action to take next, execute the action, observe the result, and repeat.' Can you simplify this and show what success looks like in practice? (Focus: m8-how-agents-work)",
    explanation: `m8-how-agents-work evidence-first view: "Agents operate in a loop: perceive the current state, reason about what action to take next, execute the action, observe the result, and repeat." means AI claims should be checked against context and risk.

m8-how-agents-work context depth: m8-how-agents-work strategic signal: Human-oversight implication: agents operate in a loop: perceive the current state, reason about what action to take next, execute the action, observe the result, and repeat.

m8-how-agents-work next action: for "Agents operate in a loop: perceive the current state, reason about what action to take next, execute the action, observe the result, and repeat.", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m8-agent-types": {
    id: "m8-agent-types",
    question: "I'm confused about this part: 'Agents vary in complexity: simple reflex agents react to immediate inputs; goal-based agents plan sequences of actions; learning agents improve from...' Could you explain this as if coaching a teammate through it? (Focus: m8-agent-types)",
    explanation: `m8-agent-types workflow reading: "Agents vary in complexity: simple reflex agents react to immediate inputs; goal-based agents plan sequences of actions; learning agents improve from..." identifies a step where AI output must be evaluated, not copied.

m8-agent-types model depth: m8-agent-types capability note: Workflow consequence: agents vary in complexity: simple reflex agents react to immediate inputs; goal-based agents plan sequences of actions; learning agents improve from experience; and multi-agent systems have multiple agents collaborating or competing to solve problems.

m8-agent-types next action: convert "Agents vary in complexity: simple reflex agents react to immediate inputs; goal-based agents plan sequences of actions; learning agents improve from..." into a risk-weighted AI decision protocol for your workflow.`,
  },

  "m8-agent-applications": {
    id: "m8-agent-applications",
    question: "I'm confused about this part: 'AI agents are already being used for software development (coding agents that write, run, and debug code), research (agents that search the web and...' Can you restate this clearly and show what changes in my workflow? (Focus: m8-agent-applications)",
    explanation: `m8-agent-applications strategic interpretation: "AI agents are already being used for software development (coding agents that write, run, and debug code), research (agents that search the web and..." in AI work supports repeatable, defensible decisions.

m8-agent-applications synthesis depth: m8-agent-applications evaluation cue: Actionable meaning: aI agents are already being used for software development (coding agents that write, run, and debug code), research (agents that search the web and synthesise findings), customer support (agents that look up records and take actions), and workflow automation (agents that orchestrate multi-step business processes).

m8-agent-applications next action: for "AI agents are already being used for software development (coding agents that write, run, and debug code), research (agents that search the web and...", choose one low-risk AI use case and one non-negotiable safeguard.`,
  },

  "m8-building-agents": {
    id: "m8-building-agents",
    question: "I'm confused about this part: 'Building agent systems requires choosing a framework (LangChain, AutoGen, CrewAI), defining tools the agent can call, designing prompts that guide...' Could you unpack this in plain language and include one real-world example? (Focus: m8-building-agents)",
    explanation: `m8-building-agents framing: In AI practice, "Building agent systems requires choosing a framework (LangChain, AutoGen, CrewAI), defining tools the agent can call, designing prompts that guide..." should be read as a decision prompt with explicit criteria.

m8-building-agents reasoning depth: building agent systems requires choosing a framework (LangChain, AutoGen, CrewAI), defining tools the agent can call, designing prompts that guide reasoning, and implementing verification steps for high-stakes actions.

m8-building-agents next action: test AI output tied to "Building agent systems requires choosing a framework (LangChain, AutoGen, CrewAI), defining tools the agent can call, designing prompts that guide..." with one metric, one risk check, and one contingency path.`,
  },

  "m8-agent-risks": {
    id: "m8-agent-risks",
    question: "I'm confused about this part: 'Agents introduce risks that single-turn models do not: errors compound over steps; agents with tool access can take irreversible real-world actions;...' What is the core idea here, and how would you teach it to a beginner? (Focus: m8-agent-risks)",
    explanation: `m8-agent-risks translation: For AI work, "Agents introduce risks that single-turn models do not: errors compound over steps; agents with tool access can take irreversible real-world actions;..." is a cue to connect concept understanding to concrete choices.

m8-agent-risks practical depth: m8-agent-risks reasoning layer: agents introduce risks that single-turn models do not: errors compound over steps; agents with tool access can take irreversible real-world actions; and agents can be manipulated through prompt injection in content they retrieve from the web or other sources. Treat

m8-agent-risks next action: for "Agents introduce risks that single-turn models do not: errors compound over steps; agents with tool access can take irreversible real-world actions;...", validate a core assumption before AI output informs any real decision.`,
  },

  // MODULE 9 (actual): Your AI Toolkit
  "m9-module-overview": {
    id: "m9-module-overview",
    question: "I'm confused about this part: 'Module 9 is stack governance, not tool shopping.' What does a governance mindset change in day-to-day decisions? (Focus: m9-module-overview)",
    explanation: `m9-module-overview plain-language view: Module 9 treats your AI stack as a long-lived operating system for the business. The key question is not "which tool is best today," but "which stack decisions stay reliable, affordable, and governable over time."

m9-module-overview mechanism depth: Governance mindset adds lifecycle logic: who can introduce tools, how overlap is evaluated, when consolidation is required, and what retirement criteria prevent tool sprawl.

m9-module-overview next action: Define stack principles and ownership first, then run every add/retain/retire decision through the same governance rubric.`,
  },

  "m9-explain-ai": {
    id: "m9-explain-ai",
    question: "I'm confused about this part: 'Explaining AI well requires translating capability, limitation, and risk into plain language without over-simplifying or over-promising.' Could you restate this without jargon and highlight the practical takeaway? (Focus: m9-explain-ai)",
    explanation: `m9-explain-ai core reading: Within AI workflows, "Explaining AI well requires translating capability, limitation, and risk into plain language without over-simplifying or over-promising." means reasoning quality matters as much as output speed.

m9-explain-ai risk depth: m9-explain-ai execution view: Reasoning behind the point: explaining AI well requires translating capability, limitation, and risk into plain language without over-simplifying or over-promising.

m9-explain-ai next action: use "Explaining AI well requires translating capability, limitation, and risk into plain language without over-simplifying or over-promising." to set review gates so AI drafts and final decisions stay separated.`,
  },

  "m9-choose-tools": {
    id: "m9-choose-tools",
    question: "I'm confused about this part: 'Text generation models excel at drafting and summarising; image models excel at visual creation; code assistants excel at completion and debugging;...' What does this actually mean in practice, and when should I apply it? (Focus: m9-choose-tools)",
    explanation: `m9-choose-tools interpretation: In an AI context, "Text generation models excel at drafting and summarising; image models excel at visual creation; code assistants excel at completion and debugging;..." asks for evidence-aware decision making.

m9-choose-tools execution depth: m9-choose-tools decision context: Practical significance: different AI tools have different strengths.

m9-choose-tools next action: for "Text generation models excel at drafting and summarising; image models excel at visual creation; code assistants excel at completion and debugging;...", document what evidence raises trust and what evidence lowers trust in AI.`,
  },

  "m9-prompting": {
    id: "m9-prompting",
    question: "I'm confused about this part: 'The major models (ChatGPT/GPT-4o, Claude, Gemini) have different strengths and behaviours.' Can you break this into simple steps and show how to use it correctly? (Focus: m9-prompting)",
    explanation: `m9-prompting practical reading: "The major models (ChatGPT/GPT-4o, Claude, Gemini) have different strengths and behaviours." highlights where AI assistance needs boundaries and review.

m9-prompting quality depth: m9-prompting model insight: Execution meaning: the major models (ChatGPT/GPT-4o, Claude, Gemini) have different strengths and behaviours.

m9-prompting next action: operationalize "The major models (ChatGPT/GPT-4o, Claude, Gemini) have different strengths and behaviours." by defining stop conditions when AI quality degrades.`,
  },

  "m9-safety-checks": {
    id: "m9-safety-checks",
    question: "I'm confused about this part: 'Every AI output needs a minimum safety check before use: is there potential bias in the output that could disadvantage a group?' How would you explain this to someone with zero AI background? (Focus: m9-safety-checks)",
    explanation: `m9-safety-checks action lens: For AI users, "Every AI output needs a minimum safety check before use: is there potential bias in the output that could disadvantage a group?" points to disciplined evaluation before trust.

m9-safety-checks adoption depth: m9-safety-checks quality signal: How to think about it: every AI output needs a minimum safety check before use: is there potential bias in the output that could disadvantage a group? Use

m9-safety-checks next action: for "Every AI output needs a minimum safety check before use: is there potential bias in the output that could disadvantage a group?", pair AI speed goals with verification requirements before scaling.`,
  },

  "m9-workflows": {
    id: "m9-workflows",
    question: "I'm confused about this part: 'Workflow quality depends on maintainability ownership.' Why is ownership such a big deal after a workflow already works? (Focus: m9-workflows)",
    explanation: `m9-workflows applied meaning: A workflow that works once is not a production capability. In Module 9, the priority is maintainability: ownership for updates, monitoring, incident response, and retirement decisions.

m9-workflows oversight depth: Without ownership, reliability degrades silently as models, integrations, and business rules drift. Governance turns one-time success into repeatable performance.

m9-workflows next action: Attach each production workflow to a named operating owner, review cadence, and deprecation trigger so lifecycle decisions are explicit rather than ad hoc.`,
  },

  "m9-mini-project": {
    id: "m9-mini-project",
    question: "I'm confused about this part: 'The mini-project synthesises skills from the course: identify a real task you do regularly, build an AI-assisted workflow for it, apply appropriate...' What is the one thing I should remember from this, in plain English? (Focus: m9-mini-project)",
    explanation: `m9-mini-project decision lens: In AI execution, "The mini-project synthesises skills from the course: identify a real task you do regularly, build an AI-assisted workflow for it, apply appropriate..." is a trigger to verify assumptions explicitly.

m9-mini-project decision depth: m9-mini-project adoption meaning: Operational implication: the mini-project synthesises skills from the course: identify a real task you do regularly, build an AI-assisted workflow for it, apply appropriate prompting, and document what the AI handled and what required human judgment.

m9-mini-project next action: for "The mini-project synthesises skills from the course: identify a real task you do regularly, build an AI-assisted workflow for it, apply appropriate...", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m9-next-steps": {
    id: "m9-next-steps",
    question: "I'm confused about this part: 'The next steps after this course: explore the tools mentioned, build a personal library of effective prompts for your most common tasks, follow a...' Can you decode this with a concrete scenario I might face at work? (Focus: m9-next-steps)",
    explanation: `m9-next-steps concept-to-action view: "The next steps after this course: explore the tools mentioned, build a personal library of effective prompts for your most common tasks, follow a..." translates AI theory into accountable choices.

m9-next-steps implementation depth: m9-next-steps governance angle: Why this improves AI judgment: aI is a fast-moving field.

m9-next-steps next action: use "The next steps after this course: explore the tools mentioned, build a personal library of effective prompts for your most common tasks, follow a..." to decide which AI steps are automatable and which remain judgment-heavy.`,
  },

  // MODULE 10 additions
  "m10-module-overview": {
    id: "m10-module-overview",
    question: "I'm confused about this part: 'At this stage final module addresses AI's trajectory: what is currently at the research frontier, what AGI means and when it might arrive, how AI is...' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m10-module-overview)",
    explanation: `m10-module-overview operational reading: "At this stage final module addresses AI" frames AI output as input to judgment, not a final verdict.

m10-module-overview evaluation depth: m10-module-overview learning takeaway: Use-case relevance: at this stage final module addresses AI's trajectory: what is currently at the research frontier, what AGI means and when it might arrive, how AI is being governed, and how to build a personal strategy for a field that will keep changing after this course ends.

m10-module-overview next action: evaluate "At this stage final module addresses AI" with a pre-mortem so AI failure modes are explicit early.`,
  },

  "m10-current-frontiers": {
    id: "m10-current-frontiers",
    question: "I'm confused about this part: 'Active research frontiers include multimodal models (combining text, image, audio, video), reasoning and planning improvements, AI agents,...' Can you reframe this as a quick rule I can apply immediately? (Focus: m10-current-frontiers)",
    explanation: `m10-current-frontiers realistic interpretation: In AI practice, "Active research frontiers include multimodal models (combining text, image, audio, video), reasoning and planning improvements, AI agents,..." emphasizes tradeoffs over hype.

m10-current-frontiers operational depth: m10-current-frontiers mechanism check: Mechanism-level takeaway: active research frontiers include multimodal models (combining text, image, audio, video), reasoning and planning improvements, AI agents, long-context understanding, and more efficient training at lower cost.

m10-current-frontiers next action: for "Active research frontiers include multimodal models (combining text, image, audio, video), reasoning and planning improvements, AI agents,...", establish a repeatable AI evaluation routine with traceable evidence.`,
  },

  "m10-agi": {
    id: "m10-agi",
    question: "I'm confused about this part: 'AGI is typically defined as AI that can perform any intellectual task a human can perform at human level or above.' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m10-agi)",
    explanation: `m10-agi execution framing: "AGI is typically defined as AI that can perform any intellectual task a human can perform at human level or above." indicates where AI can help and where human review must remain.

m10-agi strategic depth: m10-agi operational takeaway: Implementation lens: aGI is typically defined as AI that can perform any intellectual task a human can perform at human level or above.

m10-agi next action: translate "AGI is typically defined as AI that can perform any intellectual task a human can perform at human level or above." into prompt constraints that reduce ambiguous AI behavior.`,
  },

  "m10-governance": {
    id: "m10-governance",
    question: "I'm confused about this part: 'AI governance covers the laws, standards, and institutional structures that shape how AI is developed and deployed.' How would you explain this if you only had 30 seconds? (Focus: m10-governance)",
    explanation: `m10-governance quality framing: For AI decisions, "AI governance covers the laws, standards, and institutional structures that shape how AI is developed and deployed." requires clearer standards before action.

m10-governance learning depth: m10-governance implementation meaning: Risk-aware reading: aI governance covers the laws, standards, and institutional structures that shape how AI is developed and deployed.

m10-governance next action: for "AI governance covers the laws, standards, and institutional structures that shape how AI is developed and deployed.", compare AI recommendations against a non-AI baseline before adoption.`,
  },

  "m10-careers": {
    id: "m10-careers",
    question: "I'm confused about this part: 'AI is creating new roles (AI engineer, prompt engineer, AI ethics analyst, ML ops engineer) while transforming existing ones.' Can you turn this into a practical checklist I can use right away? (Focus: m10-careers)",
    explanation: `m10-careers mechanism view: "AI is creating new roles (AI engineer, prompt engineer, AI ethics analyst, ML ops engineer) while transforming existing ones." in AI terms is about why outputs happen, not only what they say.

m10-careers accountability depth: m10-careers reliability lens: Quality-control angle: aI is creating new roles (AI engineer, prompt engineer, AI ethics analyst, ML ops engineer) while transforming existing ones.

m10-careers next action: use "AI is creating new roles (AI engineer, prompt engineer, AI ethics analyst, ML ops engineer) while transforming existing ones." to design oversight points for high-impact AI decisions.`,
  },

  "m10-personal-strategy": {
    id: "m10-personal-strategy",
    question: "I'm confused about this part: 'A personal AI strategy answers: which AI tools will I invest in learning deeply, which workflows will I rebuild with AI assistance, how will I stay...' Could you break this down using an analogy and one actionable example? (Focus: m10-personal-strategy)",
    explanation: `m10-personal-strategy reliability framing: "A personal AI strategy answers: which AI tools will I invest in learning deeply, which workflows will I rebuild with AI assistance, how will I stay..." points to AI confidence calibration under uncertainty.

m10-personal-strategy governance depth: m10-personal-strategy workflow implication: Performance insight: a personal AI strategy answers: which AI tools will I invest in learning deeply, which workflows will I rebuild with AI assistance, how will I stay current without being overwhelmed, and what are my non-negotiables around privacy and responsible use?

m10-personal-strategy next action: for "A personal AI strategy answers: which AI tools will I invest in learning deeply, which workflows will I rebuild with AI assistance, how will I stay...", tie AI output acceptance to transparency and reproducibility criteria.`,
  },

  // MODULE 0: Card Components
  "m0-hero-visual-guide": {
    id: "m0-hero-visual-guide",
    question: "I'm confused about this part: 'From an execution viewpoint module overview card sets the structure and pace for your AI learning journey.' What does this imply for real decisions, not just theory? (Focus: m0-hero-visual-guide)",
    explanation: `m0-hero-visual-guide governance reading: "From an execution viewpoint module overview card sets the structure and pace for your AI learning journey." connects AI capability with accountability requirements.

m0-hero-visual-guide performance depth: m0-hero-visual-guide applied insight: Evidence-focused reading: from an execution viewpoint module overview card sets the structure and pace for your AI learning journey.

m0-hero-visual-guide next action: apply "From an execution viewpoint module overview card sets the structure and pace for your AI learning journey." by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m0-why-ai-shift": {
    id: "m0-why-ai-shift",
    question: "I'm confused about this part: 'The m0-why-ai-shift focus lesson lesson element highlights the three biggest shifts in how AI changes work and thinking: search becoming...' Can you simplify this and show what success looks like in practice? (Focus: m0-why-ai-shift)",
    explanation: `m0-why-ai-shift evidence-first view: "The m0-why-ai-shift focus lesson lesson element highlights the three biggest shifts in how AI changes work and thinking: search becoming..." means AI claims should be checked against context and risk.

m0-why-ai-shift context depth: m0-why-ai-shift strategic signal: Human-oversight implication: the m0-why-ai-shift focus lesson lesson element highlights the three biggest shifts in how AI changes work and thinking: search becoming answer-first, writing becoming draft-first, and coding becoming intent-first.

m0-why-ai-shift next action: for "The m0-why-ai-shift focus lesson lesson element highlights the three biggest shifts in how AI changes work and thinking: search becoming...", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m0-reality-check-stat-1": {
    id: "m0-reality-check-stat-1",
    question: "I'm confused about this part: 'Generative AI reached 100 million users faster than nearly any consumer technology wave-faster than the internet, faster than smartphones.' Could you explain this as if coaching a teammate through it? (Focus: m0-reality-check-stat-1)",
    explanation: `m0-reality-check-stat-1 workflow reading: "Generative AI reached 100 million users faster than nearly any consumer technology wave-faster than the internet, faster than smartphones." identifies a step where AI output must be evaluated, not copied.

m0-reality-check-stat-1 model depth: m0-reality-check-stat-1 capability note: Workflow consequence: generative AI reached 100 million users faster than nearly any consumer technology wave-faster than the internet, faster than smartphones.

m0-reality-check-stat-1 next action: convert "Generative AI reached 100 million users faster than nearly any consumer technology wave-faster than the internet, faster than smartphones." into a risk-weighted AI decision protocol for your workflow.`,
  },

  "m0-reality-check-stat-2": {
    id: "m0-reality-check-stat-2",
    question: "I'm confused about this part: 'Most people interact with AI 30+ times daily without noticing. This matters because it shows AI's true invisibility.' Can you restate this clearly and show what changes in my workflow? (Focus: m0-reality-check-stat-2)",
    explanation: `m0-reality-check-stat-2 strategic interpretation: "Most people interact with AI 30+ times daily without noticing. This matters because it shows AI" in AI work supports repeatable, defensible decisions.

m0-reality-check-stat-2 synthesis depth: m0-reality-check-stat-2 evaluation cue: Actionable meaning: most people interact with AI 30+ times daily without noticing.

m0-reality-check-stat-2 next action: for "Most people interact with AI 30+ times daily without noticing. This matters because it shows AI", choose one low-risk AI use case and one non-negotiable safeguard.`,
  },

  "m0-reality-check-stat-3": {
    id: "m0-reality-check-stat-3",
    question: "I'm confused about this part: 'AI is not changing one industry; it's changing every industry. Healthcare, law, finance, education, and retail are all redesigning workflows...' Could you unpack this in plain language and include one real-world example? (Focus: m0-reality-check-stat-3)",
    explanation: `m0-reality-check-stat-3 framing: In AI practice, "AI is not changing one industry; it" should be read as a decision prompt with explicit criteria.

m0-reality-check-stat-3 reasoning depth: aI is not changing one industry; it's changing every industry.

m0-reality-check-stat-3 next action: test AI output tied to "AI is not changing one industry; it" with one metric, one risk check, and one contingency path.`,
  },

  "m0-reality-check-stat-4": {
    id: "m0-reality-check-stat-4",
    question: "I'm confused about this part: 'Learners who build prompting and verification habits now create leverage that compounds.' What is the core idea here, and how would you teach it to a beginner? (Focus: m0-reality-check-stat-4)",
    explanation: `m0-reality-check-stat-4 translation: For AI work, "Learners who build prompting and verification habits now create leverage that compounds." is a cue to connect concept understanding to concrete choices.

m0-reality-check-stat-4 practical depth: m0-reality-check-stat-4 reasoning layer: learners who build prompting and verification habits now create leverage that compounds. Treat

m0-reality-check-stat-4 next action: for "Learners who build prompting and verification habits now create leverage that compounds.", validate a core assumption before AI output informs any real decision.`,
  },

  "m0-microwins-intro": {
    id: "m0-microwins-intro",
    question: "How should I use the idea of micro-wins, small verifiable gains, in real AI decisions? (Focus: m0-microwins-intro)",
    explanation: `Micro-wins create momentum without sacrificing rigor. Instead of chasing a large transformation claim, you validate one concrete capability at a time, such as reducing drafting time while maintaining quality controls.

This approach improves learning quality because each win is observable and testable. You can attribute outcomes to specific workflow changes, compare against a baseline, and identify where AI adds value versus where it introduces new risk.

In practice, define each micro-win with three fields: target behavior, measurable indicator, and review condition. If the indicator improves and review standards hold, keep the change. If not, revise scope before expanding adoption.`,
  },

  "m0-success-by-week": {
    id: "m0-success-by-week",
    question: "I'm confused about this part: 'In operational terms lesson element sets clear operational endpoints. 'Explain AI in plain language,' 'identify three daily tools,' 'run one low-risk...' Can you translate this into everyday language and show why it matters? (Focus: m0-success-by-week)",
    explanation: `m0-success-by-week core reading: Within AI workflows, "In operational terms lesson element sets clear operational endpoints." means reasoning quality matters as much as output speed.

m0-success-by-week risk depth: m0-success-by-week execution view: Reasoning behind the point: in operational terms lesson element sets clear operational endpoints.

m0-success-by-week next action: use "In operational terms lesson element sets clear operational endpoints." to set review gates so AI drafts and final decisions stay separated.`,
  },

  "m0-day-in-life-card": {
    id: "m0-day-in-life-card",
    question: "I'm confused about this part: 'Starting with 7:30 AM search all the way through 4:30 PM coding, you see AI is not one app.' Could you restate this without jargon and highlight the practical takeaway? (Focus: m0-day-in-life-card)",
    explanation: `A normal workday uses many AI systems, not one assistant window. Search ranking, map routing, inbox filtering, recommendation feeds, and coding suggestions are separate tools with different goals and failure patterns.

Treat each touchpoint as a decision checkpoint. Ask three quick questions: what prediction is the system making, what could be wrong here, and what low-cost verification can I do before acting.

Build one daily log for a week with columns for tool, decision, and verification result. That exercise makes hidden AI dependencies visible and trains you to apply oversight where mistakes would carry real cost.`,
  },

  "m0-daily-ai-search": {
    id: "m0-daily-ai-search",
    question: "I'm confused about this part: 'Search AI doesn't just return links anymore; it interprets your intent, rewrites your query, and ranks results by relevance.' What does this actually mean in practice, and when should I apply it? (Focus: m0-daily-ai-search)",
    explanation: `Modern search systems infer intent, not just keywords. They predict what you likely mean, expand or rewrite your query internally, and rank outputs using learned relevance signals rather than simple lexical matching.

This is useful for speed, but it introduces interpretation risk. If the inferred intent is wrong, the ranking can confidently prioritize irrelevant or biased results. The error is subtle because users often evaluate only top results instead of inspecting retrieval logic.

Use search AI effectively by combining convenience with verification. For consequential decisions, run a contrast query, inspect source diversity, and check whether ranking assumptions match your true objective. Treat rank position as a hypothesis, not proof.`,
  },

  "m0-daily-ai-maps": {
    id: "m0-daily-ai-maps",
    question: "I'm confused about this part: 'Traffic prediction is a concrete example of how AI predicts future states you can't predict yourself.' Can you break this into simple steps and show how to use it correctly? (Focus: m0-daily-ai-maps)",
    explanation: `Traffic prediction illustrates probabilistic AI in everyday life. The system combines historical flow patterns, live sensor signals, and contextual factors to estimate travel time under uncertainty.

The key lesson is calibration, not blind trust. A prediction can be directionally useful while still wrong in edge conditions such as sudden incidents, weather changes, or atypical events. Good users interpret outputs as forecasts with confidence limits, not deterministic truths.

Apply this model to other AI tools: accept predictions as decision support, then add a lightweight contingency plan. For example, choose a recommended route but keep a contingency threshold for switching if conditions diverge from expected timing.`,
  },

  "m0-daily-ai-social": {
    id: "m0-daily-ai-social",
    question: "I'm confused about this part: 'Feed ranking decides what you see, what gets buried, and what goes viral.' How would you explain this to someone with zero AI background? (Focus: m0-daily-ai-social)",
    explanation: `m0-daily-ai-social applied meaning: "Feed ranking decides what you see, what gets buried, and what goes viral." signals that AI value depends on mechanism, context, and safeguards.

m0-daily-ai-social oversight depth: m0-daily-ai-social risk context: Applied interpretation: feed ranking decides what you see, what gets buried, and what goes viral.

m0-daily-ai-social next action: turn "Feed ranking decides what you see, what gets buried, and what goes viral." into an AI checklist covering context, constraints, and safety.`,
  },

  "m0-daily-ai-writing": {
    id: "m0-daily-ai-writing",
    question: "I'm confused about this part: 'Writing assistants have moved from spell-checking to suggesting entire sentences.' Could you simplify this and point out the most important decision it affects? (Focus: m0-daily-ai-writing)",
    explanation: `m0-daily-ai-writing decision lens: In AI execution, "Writing assistants have moved from spell-checking to suggesting entire sentences." is a trigger to verify assumptions explicitly.

m0-daily-ai-writing decision depth: m0-daily-ai-writing adoption meaning: Operational implication: writing assistants have moved from spell-checking to suggesting entire sentences.

m0-daily-ai-writing next action: for "Writing assistants have moved from spell-checking to suggesting entire sentences.", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m0-daily-ai-coding": {
    id: "m0-daily-ai-coding",
    question: "I'm confused about this part: 'Code generation is where AI reads context and generates relevant code suggestions.' What is the one thing I should remember from this, in plain English? (Focus: m0-daily-ai-coding)",
    explanation: `m0-daily-ai-coding concept-to-action view: "Code generation is where AI reads context and generates relevant code suggestions." translates AI theory into accountable choices.

m0-daily-ai-coding implementation depth: m0-daily-ai-coding governance angle: Why this improves AI judgment: code generation is where AI reads context and generates relevant code suggestions.

m0-daily-ai-coding next action: use "Code generation is where AI reads context and generates relevant code suggestions." to decide which AI steps are automatable and which remain judgment-heavy.`,
  },

  "m0-ai-visibility-categories": {
    id: "m0-ai-visibility-categories",
    question: "I'm confused about this part: 'this lesson element categorizes by visibility level-from highly visible (chat assistants) to mostly invisible (fraud detection).' Can you decode this with a concrete scenario I might face at work? (Focus: m0-ai-visibility-categories)",
    explanation: `m0-ai-visibility-categories operational reading: "this lesson element categorizes by visibility level-from highly visible (chat assistants) to mostly invisible (fraud detection)." frames AI output as input to judgment, not a final verdict.

m0-ai-visibility-categories evaluation depth: m0-ai-visibility-categories learning takeaway: Use-case relevance: not all AI is equally visible to users.

m0-ai-visibility-categories next action: evaluate "this lesson element categorizes by visibility level-from highly visible (chat assistants) to mostly invisible (fraud detection)." with a pre-mortem so AI failure modes are explicit early.`,
  },

  "m0-before-and-after": {
    id: "m0-before-and-after",
    question: "I'm confused about this part: 'Using m0-before-and-after practical lens lesson element shows the before-and-after contrast: before the course, AI feels impressive but confusing;...' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m0-before-and-after)",
    explanation: `The before-and-after contrast highlights a shift from impression-based use to evidence-based use. At the beginning, AI may feel impressive but opaque. After structured learning, you can articulate why an output is useful, where it is fragile, and how to verify it.

The mistake this avoids is superficial adoption. Teams often mistake fluent language for reliable reasoning and move directly from demo success to operational dependence. The course reframes success as improved decision quality, not just faster output generation.

Turn this into practice by defining your personal before-and-after metrics. Track one capability in each category: prompt clarity, verification discipline, and workflow integration. Measured improvement in these areas is a stronger indicator than subjective confidence.`,
  },

  "m0-transformation-phase-1": {
    id: "m0-transformation-phase-1",
    question: "I'm confused about this part: 'Phase 1 covers the foundational layer: What is AI, how did it develop, what are its types, and what can and cannot it do.' Can you reframe this as a quick rule I can apply immediately? (Focus: m0-transformation-phase-1)",
    explanation: `m0-transformation-phase-1 execution framing: "Phase 1 covers the foundational layer: What is AI, how did it develop, what are its types, and what can and cannot it do." indicates where AI can help and where human review must remain.

m0-transformation-phase-1 strategic depth: m0-transformation-phase-1 operational takeaway: Implementation lens: phase 1 covers the foundational layer: What is AI, how did it develop, what are its types, and what can and cannot it do.

m0-transformation-phase-1 next action: translate "Phase 1 covers the foundational layer: What is AI, how did it develop, what are its types, and what can and cannot it do." into prompt constraints that reduce ambiguous AI behavior.`,
  },

  "m0-transformation-phase-2": {
    id: "m0-transformation-phase-2",
    question: "I'm confused about this part: 'Phase 2 shifts from concept to practice: how do language models actually work, how do you talk to them effectively, and what tools exist for everyday...' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m0-transformation-phase-2)",
    explanation: `m0-transformation-phase-2 quality framing: For AI decisions, "Phase 2 shifts from concept to practice: how do language models actually work, how do you talk to them effectively, and what tools exist for everyday..." requires clearer standards before action.

m0-transformation-phase-2 learning depth: m0-transformation-phase-2 implementation meaning: Risk-aware reading: phase 2 shifts from concept to practice: how do language models actually work, how do you talk to them effectively, and what tools exist for everyday use.

m0-transformation-phase-2 next action: for "Phase 2 shifts from concept to practice: how do language models actually work, how do you talk to them effectively, and what tools exist for everyday...", compare AI recommendations against a non-AI baseline before adoption.`,
  },

  "m0-transformation-phase-3": {
    id: "m0-transformation-phase-3",
    question: "I'm confused about this part: 'Phase 3 integrates everything: ethics, safety, workflow design, your first project.' How would you explain this if you only had 30 seconds? (Focus: m0-transformation-phase-3)",
    explanation: `m0-transformation-phase-3 mechanism view: "Phase 3 integrates everything: ethics, safety, workflow design, your first project." in AI terms is about why outputs happen, not only what they say.

m0-transformation-phase-3 accountability depth: m0-transformation-phase-3 reliability lens: Quality-control angle: phase 3 integrates everything: ethics, safety, workflow design, your first project.

m0-transformation-phase-3 next action: use "Phase 3 integrates everything: ethics, safety, workflow design, your first project." to design oversight points for high-impact AI decisions.`,
  },

  "m0-capabilities-outcome": {
    id: "m0-capabilities-outcome",
    question: "I'm confused about this part: 'The m0-capabilities-outcome context topic lesson element names three concrete capabilities: Communication (explain AI to others), Execution (use AI...' Can you turn this into a practical checklist I can use right away? (Focus: m0-capabilities-outcome)",
    explanation: `m0-capabilities-outcome reliability framing: "The m0-capabilities-outcome context topic lesson element names three concrete capabilities: Communication (explain AI to others), Execution (use AI..." points to AI confidence calibration under uncertainty.

m0-capabilities-outcome governance depth: m0-capabilities-outcome workflow implication: Performance insight: the m0-capabilities-outcome context topic lesson element names three concrete capabilities: Communication (explain AI to others), Execution (use AI for productivity), Judgment (spot weak outputs).

m0-capabilities-outcome next action: for "The m0-capabilities-outcome context topic lesson element names three concrete capabilities: Communication (explain AI to others), Execution (use AI...", tie AI output acceptance to transparency and reproducibility criteria.`,
  },

  "m0-microwins-transformation": {
    id: "m0-microwins-transformation",
    question: "I'm confused about this part: 'After the transformation section, your micro-wins are: describe your before-and-after state, know the exact sequence, name three concrete gains.' Could you break this down using an analogy and one actionable example? (Focus: m0-microwins-transformation)",
    explanation: `m0-microwins-transformation governance reading: "After the transformation section, your micro-wins are: describe your before-and-after state, know the exact sequence, name three concrete gains." connects AI capability with accountability requirements.

m0-microwins-transformation performance depth: m0-microwins-transformation applied insight: Evidence-focused reading: after the transformation section, your micro-wins are: describe your before-and-after state, know the exact sequence, name three concrete gains.

m0-microwins-transformation next action: apply "After the transformation section, your micro-wins are: describe your before-and-after state, know the exact sequence, name three concrete gains." by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m0-learning-system-time": {
    id: "m0-learning-system-time",
    question: "I'm confused about this part: 'The m0-learning-system-time focus lesson lesson element specifies 20-30 minutes per session, 4-5 sessions per week.' What does this imply for real decisions, not just theory? (Focus: m0-learning-system-time)",
    explanation: `m0-learning-system-time evidence-first view: "The m0-learning-system-time focus lesson lesson element specifies 20-30 minutes per session, 4-5 sessions per week." means AI claims should be checked against context and risk.

m0-learning-system-time context depth: m0-learning-system-time strategic signal: Human-oversight implication: the m0-learning-system-time focus lesson lesson element specifies 20-30 minutes per session, 4-5 sessions per week.

m0-learning-system-time next action: for "The m0-learning-system-time focus lesson lesson element specifies 20-30 minutes per session, 4-5 sessions per week.", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m0-learning-system-pacing": {
    id: "m0-learning-system-pacing",
    question: "How does taking one section at a time improve my real AI decision quality? (Focus: m0-learning-system-pacing)",
    explanation: `Pacing is a quality-control strategy, not just a comfort strategy. Learning one section at a time reduces cognitive overload and improves retention of decision rules, especially when concepts include tradeoffs, failure modes, and verification steps.

In AI work, rushed learning often produces shallow confidence: people can repeat terms but cannot apply them under pressure. Structured pacing creates spaced repetition, which strengthens transfer from theory to operational judgment.

Use pacing in practice by setting bounded learning cycles. Complete one concept, apply it once in a real tool, and review the result before moving forward. This prevents accumulation of unresolved misunderstandings that later become workflow risks.`,
  },

  "m0-learning-system-mindset": {
    id: "m0-learning-system-mindset",
    question: "How does a learn-by-doing mindset improve real AI decisions instead of just theory knowledge? (Focus: m0-learning-system-mindset)",
    explanation: `A learn-by-doing mindset accelerates competence because decision skill is procedural, not purely conceptual. You build reliable judgment by running real prompts, observing failure patterns, and refining methods with feedback.

Passive understanding is often brittle under uncertainty. Active practice exposes hidden assumptions about tool capability, context boundaries, and verification workload. Each iteration strengthens your ability to distinguish plausible output from trustworthy output.

Operationalize this mindset with a simple loop: attempt, evaluate, adjust, and document. Keep one short reflection after each exercise that captures what worked, what failed, and which safeguard prevented error escalation.`,
  },

  "m0-learning-system": {
    id: "m0-learning-system",
    question: "I'm confused about this part: 'The m0-learning-system focus lesson lesson element introduces the three pillars of effective AI learning in this course: Time (short, consistent...' Can you simplify this and show what success looks like in practice? (Focus: m0-learning-system)",
    explanation: `m0-learning-system framing: In AI practice, "The m0-learning-system focus lesson lesson element introduces the three pillars of effective AI learning in this course: Time (short, consistent..." should be read as a decision prompt with explicit criteria.

m0-learning-system reasoning depth: the m0-learning-system focus lesson lesson element introduces the three pillars of effective AI learning in this course: Time (short, consistent sessions), Pacing (spaced learning), and Mindset (learn by doing).

m0-learning-system next action: test AI output tied to "The m0-learning-system focus lesson lesson element introduces the three pillars of effective AI learning in this course: Time (short, consistent..." with one metric, one risk check, and one contingency path.`,
  },

  "m0-learning-tips-sequence": {
    id: "m0-learning-tips-sequence",
    question: "I'm confused about this part: 'This tip addresses a common temptation: skipping sections to jump to the interesting part.' Could you explain this as if coaching a teammate through it? (Focus: m0-learning-tips-sequence)",
    explanation: `m0-learning-tips-sequence translation: For AI work, "This tip addresses a common temptation: skipping sections to jump to the interesting part." is a cue to connect concept understanding to concrete choices.

m0-learning-tips-sequence practical depth: m0-learning-tips-sequence reasoning layer: each section compounds on the previous one. Treat

m0-learning-tips-sequence next action: for "This tip addresses a common temptation: skipping sections to jump to the interesting part.", validate a core assumption before AI output informs any real decision.`,
  },

  "m0-learning-tips-microwins": {
    id: "m0-learning-tips-microwins",
    question: "I'm confused about this part: 'After each section, write one practical thing you can now do. This captures the concrete value you gained.' Can you restate this clearly and show what changes in my workflow? (Focus: m0-learning-tips-microwins)",
    explanation: `m0-learning-tips-microwins plain-language view: "After each section, write one practical thing you can now do. This captures the concrete value you gained." marks an AI judgment moment, not just a vocabulary check.

m0-learning-tips-microwins mechanism depth: m0-learning-tips-microwins practical meaning: after each section, write one practical thing you can now do.

m0-learning-tips-microwins next action: map "After each section, write one practical thing you can now do. This captures the concrete value you gained." to a small AI pilot, then compare benefit, effort, and failure risk.`,
  },

  "m0-learning-tips-practice": {
    id: "m0-learning-tips-practice",
    question: "I'm confused about this part: 'Apply each concept in a real tool the same day you learn it. This addresses the forgetting curve: immediate application locks concepts into memory...' Could you unpack this in plain language and include one real-world example? (Focus: m0-learning-tips-practice)",
    explanation: `m0-learning-tips-practice core reading: Within AI workflows, "Apply each concept in a real tool the same day you learn it. This addresses the forgetting curve: immediate application locks concepts into memory..." means reasoning quality matters as much as output speed.

m0-learning-tips-practice risk depth: m0-learning-tips-practice execution view: Reasoning behind the point: apply each concept in a real tool the same day you learn it.

m0-learning-tips-practice next action: use "Apply each concept in a real tool the same day you learn it. This addresses the forgetting curve: immediate application locks concepts into memory..." to set review gates so AI drafts and final decisions stay separated.`,
  },

  "m0-learning-tips-verify": {
    id: "m0-learning-tips-verify",
    question: "I'm confused about this part: 'Treat AI output as draft until key facts are checked. This tip embeds verification as a habit from By making verification a learning habit, not an...' What is the core idea here, and how would you teach it to a beginner? (Focus: m0-learning-tips-verify)",
    explanation: `m0-learning-tips-verify interpretation: In an AI context, "Treat AI output as draft until key facts are checked. This tip embeds verification as a habit from By making verification a learning habit, not an..." asks for evidence-aware decision making.

m0-learning-tips-verify execution depth: m0-learning-tips-verify decision context: Practical significance: treat AI output as draft until key facts are checked.

m0-learning-tips-verify next action: for "Treat AI output as draft until key facts are checked. This tip embeds verification as a habit from By making verification a learning habit, not an...", document what evidence raises trust and what evidence lowers trust in AI.`,
  },

  "m0-learning-tips-momentum": {
    id: "m0-learning-tips-momentum",
    question: "I'm confused about this part: 'This tip acknowledges that learning complex topics requires repetition and spacing, not marathon efforts.' Can you translate this into everyday language and show why it matters? (Focus: m0-learning-tips-momentum)",
    explanation: `m0-learning-tips-momentum practical reading: "This tip acknowledges that learning complex topics requires repetition and spacing, not marathon efforts." highlights where AI assistance needs boundaries and review.

m0-learning-tips-momentum quality depth: m0-learning-tips-momentum model insight: Execution meaning: consistency beats intensity.

m0-learning-tips-momentum next action: operationalize "This tip acknowledges that learning complex topics requires repetition and spacing, not marathon efforts." by defining stop conditions when AI quality degrades.`,
  },

  "m0-self-assessment-form": {
    id: "m0-self-assessment-form",
    question: "I'm confused about this part: 'In operational terms self-assessment card measures your current AI confidence and habits: how confident you are explaining AI, how you treat good...' Could you restate this without jargon and highlight the practical takeaway? (Focus: m0-self-assessment-form)",
    explanation: `m0-self-assessment-form action lens: For AI users, "In operational terms self-assessment card measures your current AI confidence and habits: how confident you are explaining AI, how you treat good..." points to disciplined evaluation before trust.

m0-self-assessment-form adoption depth: m0-self-assessment-form quality signal: How to think about it: in operational terms self-assessment card measures your current AI confidence and habits: how confident you are explaining AI, how you treat good outputs, how often you experiment, and what mindset you hold. Use

m0-self-assessment-form next action: for "In operational terms self-assessment card measures your current AI confidence and habits: how confident you are explaining AI, how you treat good...", pair AI speed goals with verification requirements before scaling.`,
  },

  "m0-ai-touchpoints-action": {
    id: "m0-ai-touchpoints-action",
    question: "I'm confused about this part: 'In operational terms lesson element asks you to name three specific ways you interact with AI already.' What does this actually mean in practice, and when should I apply it? (Focus: m0-ai-touchpoints-action)",
    explanation: `m0-ai-touchpoints-action applied meaning: "In operational terms lesson element asks you to name three specific ways you interact with AI already." signals that AI value depends on mechanism, context, and safeguards.

m0-ai-touchpoints-action oversight depth: m0-ai-touchpoints-action risk context: Applied interpretation: in operational terms lesson element asks you to name three specific ways you interact with AI already.

m0-ai-touchpoints-action next action: turn "In operational terms lesson element asks you to name three specific ways you interact with AI already." into an AI checklist covering context, constraints, and safety.`,
  },

  "m0-learning-commitment": {
    id: "m0-learning-commitment",
    question: "I'm confused about this part: 'Within this context lesson element asks you to commit to specific learning behaviors: four 20-30 minute sessions per week, completing interactions...' Can you break this into simple steps and show how to use it correctly? (Focus: m0-learning-commitment)",
    explanation: `m0-learning-commitment decision lens: In AI execution, "Within this context lesson element asks you to commit to specific learning behaviors: four 20-30 minute sessions per week, completing interactions..." is a trigger to verify assumptions explicitly.

m0-learning-commitment decision depth: m0-learning-commitment adoption meaning: Operational implication: within this context lesson element asks you to commit to specific learning behaviors: four 20-30 minute sessions per week, completing interactions before moving on, testing real use cases, and verifying outputs.

m0-learning-commitment next action: for "Within this context lesson element asks you to commit to specific learning behaviors: four 20-30 minute sessions per week, completing interactions...", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m0-key-takeaways": {
    id: "m0-key-takeaways",
    question: "I'm confused about this part: 'Using m0-key-takeaways practical lens lesson element summarizes the four big ideas: AI is embedded in your day already, you have a clear...' How would you explain this to someone with zero AI background? (Focus: m0-key-takeaways)",
    explanation: `The key takeaway is that AI literacy is a decision skill built through structure and repetition. You are already interacting with AI systems daily, so the goal is not exposure but better control over when and how to rely on them.

The module's four ideas form a coherent framework: visibility of current AI touchpoints, practical execution habits, verification discipline, and staged progression from awareness to application. Together, these reduce avoidable errors and improve confidence grounded in evidence.

To apply the takeaway, choose one recurring task and redesign it with explicit safeguards. Document the baseline, run a bounded AI-assisted version, and compare quality, speed, and risk indicators before scaling to broader workflows.`,
  },

  "m0-capabilities-after-course": {
    id: "m0-capabilities-after-course",
    question: "I'm confused about this part: 'These three represent the full arc: understanding, skill, and critical thinking.' Could you simplify this and point out the most important decision it affects? (Focus: m0-capabilities-after-course)",
    explanation: `m0-capabilities-after-course operational reading: "These three represent the full arc: understanding, skill, and critical thinking." frames AI output as input to judgment, not a final verdict.

m0-capabilities-after-course evaluation depth: m0-capabilities-after-course learning takeaway: Use-case relevance: communication, Execution, Judgment.

m0-capabilities-after-course next action: evaluate "These three represent the full arc: understanding, skill, and critical thinking." with a pre-mortem so AI failure modes are explicit early.`,
  },

  "m0-completion-checklist": {
    id: "m0-completion-checklist",
    question: "I'm confused about this part: 'The final checklist asks: can you explain the three-phase arc, understand why order matters, name three AI touchpoints, and challenge myths instead...' What is the one thing I should remember from this, in plain English? (Focus: m0-completion-checklist)",
    explanation: `m0-completion-checklist realistic interpretation: In AI practice, "The final checklist asks: can you explain the three-phase arc, understand why order matters, name three AI touchpoints, and challenge myths instead..." emphasizes tradeoffs over hype.

m0-completion-checklist operational depth: m0-completion-checklist mechanism check: Mechanism-level takeaway: the final checklist asks: can you explain the three-phase arc, understand why order matters, name three AI touchpoints, and challenge myths instead of memorizing hype.

m0-completion-checklist next action: for "The final checklist asks: can you explain the three-phase arc, understand why order matters, name three AI touchpoints, and challenge myths instead...", establish a repeatable AI evaluation routine with traceable evidence.`,
  },

  // MODULE 1: Card Components
  "m1-defining-ai-five-buckets": {
    id: "m1-defining-ai-five-buckets",
    question: "I'm confused about this part: 'AI systems cluster into five capability areas: Perception (seeing images), Language (understanding text), Reasoning (solving problems), Learning...' Can you decode this with a concrete scenario I might face at work? (Focus: m1-defining-ai-five-buckets)",
    explanation: `m1-defining-ai-five-buckets execution framing: "AI systems cluster into five capability areas: Perception (seeing images), Language (understanding text), Reasoning (solving problems), Learning..." indicates where AI can help and where human review must remain.

m1-defining-ai-five-buckets strategic depth: m1-defining-ai-five-buckets operational takeaway: Implementation lens: aI systems cluster into five capability areas: Perception (seeing images), Language (understanding text), Reasoning (solving problems), Learning (improving from data), and Action (controlling systems).

m1-defining-ai-five-buckets next action: translate "AI systems cluster into five capability areas: Perception (seeing images), Language (understanding text), Reasoning (solving problems), Learning..." into prompt constraints that reduce ambiguous AI behavior.`,
  },

  "m1-ai-vs-traditional": {
    id: "m1-ai-vs-traditional",
    question: "I'm confused about this part: 'Traditional software follows explicit rules written by programmers. AI software learns patterns This fundamental difference determines what's...' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m1-ai-vs-traditional)",
    explanation: `m1-ai-vs-traditional quality framing: For AI decisions, "Traditional software follows explicit rules written by programmers. AI software learns patterns This fundamental difference determines what" requires clearer standards before action.

m1-ai-vs-traditional learning depth: m1-ai-vs-traditional implementation meaning: Risk-aware reading: traditional software follows explicit rules written by programmers.

m1-ai-vs-traditional next action: for "Traditional software follows explicit rules written by programmers. AI software learns patterns This fundamental difference determines what", compare AI recommendations against a non-AI baseline before adoption.`,
  },

  "m1-real-world-cases": {
    id: "m1-real-world-cases",
    question: "I'm confused about this part: 'Real examples ground abstract concepts in concrete outcomes. When you see how Netflix uses AI for recommendations, how hospitals use AI for...' Can you reframe this as a quick rule I can apply immediately? (Focus: m1-real-world-cases)",
    explanation: `m1-real-world-cases mechanism view: "Real examples ground abstract concepts in concrete outcomes. When you see how Netflix uses AI for recommendations, how hospitals use AI for..." in AI terms is about why outputs happen, not only what they say.

m1-real-world-cases accountability depth: m1-real-world-cases reliability lens: Quality-control angle: real examples ground abstract concepts in concrete outcomes.

m1-real-world-cases next action: use "Real examples ground abstract concepts in concrete outcomes. When you see how Netflix uses AI for recommendations, how hospitals use AI for..." to design oversight points for high-impact AI decisions.`,
  },

  "m1-module-overview": {
    id: "m1-module-overview",
    question: "I'm confused about this part: 'Inside this concept lesson element previews the module structure and sets expectations.' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m1-module-overview)",
    explanation: `m1-module-overview reliability framing: "Inside this concept lesson element previews the module structure and sets expectations." points to AI confidence calibration under uncertainty.

m1-module-overview governance depth: m1-module-overview workflow implication: Performance insight: inside this concept lesson element previews the module structure and sets expectations.

m1-module-overview next action: for "Inside this concept lesson element previews the module structure and sets expectations.", tie AI output acceptance to transparency and reproducibility criteria.`,
  },

  "m1-three-key-words": {
    id: "m1-three-key-words",
    question: "I'm confused about this part: 'Machine learning, neural networks, and model are three foundational terms you'll master.' How would you explain this if you only had 30 seconds? (Focus: m1-three-key-words)",
    explanation: `m1-three-key-words governance reading: "Machine learning, neural networks, and model are three foundational terms you" connects AI capability with accountability requirements.

m1-three-key-words performance depth: m1-three-key-words applied insight: Evidence-focused reading: machine learning, neural networks, and model are three foundational terms you'll master.

m1-three-key-words next action: apply "Machine learning, neural networks, and model are three foundational terms you" by iterating prompts and scoring AI output against fixed standards.`,
  },

  "m1-two-truths": {
    id: "m1-two-truths",
    question: "I'm confused about this part: 'AI is already reshaping work and thinking AND it remains deeply limited.' Can you turn this into a practical checklist I can use right away? (Focus: m1-two-truths)",
    explanation: `m1-two-truths evidence-first view: "AI is already reshaping work and thinking AND it remains deeply limited." means AI claims should be checked against context and risk.

m1-two-truths context depth: m1-two-truths strategic signal: Human-oversight implication: aI is already reshaping work and thinking AND it remains deeply limited.

m1-two-truths next action: for "AI is already reshaping work and thinking AND it remains deeply limited.", define escalation paths if AI output conflicts with domain evidence.`,
  },

  "m1-ai-history-timeline": {
    id: "m1-ai-history-timeline",
    question: "I'm confused about this part: 'AI history teaches you patterns: hype cycles, AI winters where progress stalled, breakthroughs requiring data and computation maturity.' Could you break this down using an analogy and one actionable example? (Focus: m1-ai-history-timeline)",
    explanation: `m1-ai-history-timeline workflow reading: "AI history teaches you patterns: hype cycles, AI winters where progress stalled, breakthroughs requiring data and computation maturity." identifies a step where AI output must be evaluated, not copied.

m1-ai-history-timeline model depth: m1-ai-history-timeline capability note: Workflow consequence: aI history teaches you patterns: hype cycles, AI winters where progress stalled, breakthroughs requiring data and computation maturity.

m1-ai-history-timeline next action: convert "AI history teaches you patterns: hype cycles, AI winters where progress stalled, breakthroughs requiring data and computation maturity." into a risk-weighted AI decision protocol for your workflow.`,
  },

  "m1-ai-narrow-general-super": {
    id: "m1-ai-narrow-general-super",
    question: "I'm confused about this part: 'Narrow AI (good at specific tasks), General AI (theoretical, human-level reasoning), and Superintelligence (hypothetical, beyond human) are...' What does this imply for real decisions, not just theory? (Focus: m1-ai-narrow-general-super)",
    explanation: `m1-ai-narrow-general-super strategic interpretation: "Narrow AI (good at specific tasks), General AI (theoretical, human-level reasoning), and Superintelligence (hypothetical, beyond human) are..." in AI work supports repeatable, defensible decisions.

m1-ai-narrow-general-super synthesis depth: m1-ai-narrow-general-super evaluation cue: Actionable meaning: narrow AI (good at specific tasks), General AI (theoretical, human-level reasoning), and Superintelligence (hypothetical, beyond human) are fundamentally different capability levels.

m1-ai-narrow-general-super next action: for "Narrow AI (good at specific tasks), General AI (theoretical, human-level reasoning), and Superintelligence (hypothetical, beyond human) are...", choose one low-risk AI use case and one non-negotiable safeguard.`,
  },

  "m1-prompting-challenge": {
    id: "m1-prompting-challenge",
    question: "I'm confused about this part: 'You'll prompt an AI system, inspect results, refine constraints, and rerun-a cycle that builds operational skill.' Can you simplify this and show what success looks like in practice? (Focus: m1-prompting-challenge)",
    explanation: `m1-prompting-challenge framing: In AI practice, "You" should be read as a decision prompt with explicit criteria.

m1-prompting-challenge reasoning depth: you'll prompt an AI system, inspect results, refine constraints, and rerun-a cycle that builds operational skill.

m1-prompting-challenge next action: test AI output tied to "You" with one metric, one risk check, and one contingency path.`,
  },

  "m1-myths-vs-reality-card": {
    id: "m1-myths-vs-reality-card",
    question: "I'm confused about this part: 'Once you believe them, they persist even after learning this lesson element directly confronts myths: AI understands versus AI predicts text, AI...' Could you explain this as if coaching a teammate through it? (Focus: m1-myths-vs-reality-card)",
    explanation: `Myths persist because they feel intuitive, especially the belief that fluent text means true understanding. In practice, an AI model predicts likely next tokens from data patterns, so confident wording can still hide weak reasoning.

Coach your team to replace vague beliefs with testable statements. Instead of saying "the model understands policy," ask "can the model apply policy rules to edge cases we define in advance" and then score the results.

Use a myth-to-test routine during reviews: write the claim, define evidence that would support it, then run a short adversarial prompt set. That method shifts discussion from opinions to measurable reliability.`,
  },

  "m1-writing-assistants-card": {
    id: "m1-writing-assistants-card",
    question: "I'm confused about this part: 'Writing assistants are concrete applications that demonstrate text generation capability without anthropomorphizing.' Can you restate this clearly and show what changes in my workflow? (Focus: m1-writing-assistants-card)",
    explanation: `Writing assistants are best understood as pattern engines, not thinking partners. They can draft, rephrase, summarize, and tone-shift quickly, but they do not own goals, accountability, or factual responsibility.

Update your workflow by separating drafting from approving. Let the AI generate options first, then run a human pass for facts, audience fit, compliance constraints, and voice consistency before anything is sent.

Create a repeatable prompt template with context, audience, and quality criteria, then keep an edit checklist beside it. Over time you will reduce revision cycles while maintaining control over accuracy and intent.`,
  },

  "m1-image-generation-card": {
    id: "m1-image-generation-card",
    question: "I'm confused about this part: 'Image generation uses the same underlying principle as text generation: predicting patterns learned from training data, applied to a new modality.' Could you unpack this in plain language and include one real-world example? (Focus: m1-image-generation-card)",
    explanation: `Image models and text models both learn statistical patterns from large datasets and generate likely outputs from your prompt. The format changes from words to pixels, but the core behavior is still prediction rather than understanding.

In a real workflow, think of generated images as fast concept drafts. For example, a marketing team can explore ad directions quickly, then pass selected outputs through brand, legal, and authenticity checks before public use.

Improve quality by iterating prompts in layers: subject, composition, style, then constraints. Keep a review rubric for factual accuracy, visual consistency, and policy risk so selection stays systematic instead of taste-only.`,
  },

  "m1-productivity-card": {
    id: "m1-productivity-card",
    question: "I'm confused about this part: 'AI's immediate value is augmentation, not replacement. Programmers using Copilot don't become obsolete; they become more productive.' What is the core idea here, and how would you teach it to a beginner? (Focus: m1-productivity-card)",
    explanation: `Augmentation means AI handles parts of the workflow so people can focus on judgment-heavy work. In coding, that often looks like faster scaffolding, quick refactors, and suggestion-based exploration while humans still own architecture and correctness.

Teach beginners to assign AI to bounded tasks with clear acceptance criteria. Ask for one function, one test, or one explanation at a time, then verify behavior before merging anything into production.

Track impact with simple metrics like cycle time, defect rate, and review effort. Productivity gains are real when speed rises without sacrificing reliability, security, or maintainability.`,
  },

  "m1-creative-work-card": {
    id: "m1-creative-work-card",
    question: "I'm confused about this part: 'Creative AI becomes less mysterious when you ask: which parts of creativity come from pattern recombination, and which depend on human intention?' Can you translate this into everyday language and show why it matters? (Focus: m1-creative-work-card)",
    explanation: `Creative AI is strongest at recombining patterns it has seen in training data, while humans provide direction, taste, and intent. That distinction helps you decide when to use the model for exploration and when to rely on human authorship.

Run creative work in two passes. First, generate broad variations for themes, structures, or visual language; second, curate and reshape outputs based on audience, brand goals, and ethical boundaries.

When evaluating ideas, ask whether the piece expresses your message or merely imitates familiar patterns. Keeping that filter in place preserves originality while still benefiting from AI speed during ideation.`,
  },
};

const GENERATED_COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> =
  Object.fromEntries(
    courseStructure.modules.flatMap((module) => {
      const requiredModuleDescription = requireNonEmptyValue(
        module.description,
        `Missing module description for ${module.id}`,
      )

      const moduleEntries = module.sections.flatMap((section) => {
        const baseId = `${module.id}-${section.id}`
        const summary = requireNonEmptyValue(
          section.summary,
          `Missing section summary for ${baseId}`,
        )
        const scenarioId = `${baseId}-scenario`
        const quickCheckId = `${baseId}-quick-check`

        return [
          [
            scenarioId,
            {
              id: scenarioId,
              question: `I'm confused about this section card: '${section.title}'. What should I understand first before moving on?`,
              explanation: `Direct answer: This scenario card checks whether you can explain the core idea of ${section.title} in plain language.\n\nWhy this matters: ${summary}\n\nHow to apply it: Name the concept, give one practical use case, and state one limitation before moving on.`,
            } satisfies ComponentExplanation,
          ],
          [
            quickCheckId,
            {
              id: quickCheckId,
              question: `I'm not sure how to reason through the quick check for '${section.title}'. What concept is it testing?`,
              explanation: `Direct answer: This quick check tests whether you can reason through ${section.title}, not just recall terms.\n\nWhy this matters: ${summary}\n\nHow to apply it: State the concept, explain one cause-and-effect link, and identify what evidence would change your answer.`,
            } satisfies ComponentExplanation,
          ],
        ]
      })

      const quizId = `${module.id}-course-quiz`
      const quizEntry: [string, ComponentExplanation] = [
        quizId,
        {
          id: quizId,
          question: `I'm confused about the module quiz in ${module.title}. How should I interpret what this checkpoint is validating?`,
          explanation: `Direct answer: This module quiz checks whether you can apply the core reasoning of ${module.title} under ambiguity.\n\nWhy this matters: ${requiredModuleDescription}\n\nHow to apply it: Identify the claim, map it to the module principle, and choose the option with the strongest evidence and lowest avoidable risk.`,
        },
      ]

      return [...moduleEntries, quizEntry]
    })
  )

const EXPLANATION_REGISTRY: Record<string, ComponentExplanation> = {
  ...GENERATED_COMPONENT_EXPLANATIONS,
  ...COMPONENT_EXPLANATIONS,
}

type ExplanationIntent =
  | "plain"
  | "contrast"
  | "checklist"
  | "example"
  | "coach"
  | "brief"
  | "decision"
  | "default"

type GeneratedExplanationContext =
  | {
      kind: "scenario" | "quick-check"
      moduleTitle: string
      moduleDescription: string
      sectionTitle: string
      sectionSummary: string
    }
  | {
      kind: "course-quiz"
      moduleTitle: string
      moduleDescription: string
    }

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function normalizeSentence(value: string) {
  const compact = normalizeWhitespace(value).replace(/^["'`\s]+|["'`\s]+$/g, "")

  if (!compact) {
    return ""
  }

  return toSentence(compact)
}

function pickVariant<T>(key: string, options: T[]) {
  return options[hashString(key) % options.length]
}

function stripModulePrefix(value: string) {
  return value.replace(/^Module\s+\d+:\s*/i, "").trim()
}

function inferIntent(question: string): ExplanationIntent {
  const lowerQuestion = question.toLowerCase()

  if (/good vs bad|contrast a good vs bad|contrast a good vs/i.test(lowerQuestion)) {
    return "contrast"
  }

  if (/checklist|simple steps|use it correctly|practical checklist/i.test(lowerQuestion)) {
    return "checklist"
  }

  if (/real-world example|concrete scenario|actionable example|analogy/i.test(lowerQuestion)) {
    return "example"
  }

  if (/coaching a teammate|coach a teammate/i.test(lowerQuestion)) {
    return "coach"
  }

  if (/30 seconds|quick rule/i.test(lowerQuestion)) {
    return "brief"
  }

  if (/mistake it helps avoid|important decision it affects|imply for real decisions|changes in my workflow/i.test(lowerQuestion)) {
    return "decision"
  }

  if (/plain language|everyday language|without jargon|simplify|translate|teach it to a beginner|zero ai background/i.test(lowerQuestion)) {
    return "plain"
  }

  return "default"
}

function extractFocusText(question: string, explanation: string) {
  const quotedFromExplanation = explanation.match(/"([^"]{18,})"/)
  if (quotedFromExplanation?.[1]) {
    return normalizeSentence(quotedFromExplanation[1])
  }

  const generatedTitleMatch = question.match(/for '([^']+)'/i)
  if (generatedTitleMatch?.[1]) {
    return normalizeSentence(generatedTitleMatch[1])
  }

  const trimmedQuestion = question
    .replace(/\s*\(Focus:\s*[^)]+\)\s*$/i, "")
    .replace(/^I'm\s+confused\s+about\s+this\s+part:\s*/i, "")
    .replace(/^I'm\s+not\s+sure\s+how\s+to\s+reason\s+through\s+/i, "")

  const splitQuestion = trimmedQuestion.split("?")
  const questionCore = splitQuestion[0] ? splitQuestion[0] : trimmedQuestion
  return normalizeSentence(questionCore)
}

function explainClaimMechanism(claim: string) {
  const lowerClaim = claim.toLowerCase()

  if (lowerClaim.includes(" because ")) {
    const [beforeBecause, ...afterBecauseParts] = claim.split(/\bbecause\b/i)
    const before = normalizeSentence(beforeBecause)
    const after = normalizeSentence(afterBecauseParts.join(" because "))
    return `${before.replace(/[.!?]$/, "")}. The reason attached to it is ${after.charAt(0).toLowerCase()}${after.slice(1)}`
  }

  if (lowerClaim.includes(" rather than ")) {
    return "The contrast matters because the point is to choose the stronger framing instead of sliding back into the weaker one."
  }

  if (claim.includes(":")) {
    return "The list inside the statement is there to separate the moving parts, not to give you more jargon to memorize."
  }

  if (lowerClaim.includes(" not ")) {
    return "The negative phrasing is doing real work here: it is redirecting you away from a common but shallow interpretation."
  }

  if (claim.includes(",")) {
    return "The examples bundled into the sentence are meant to show the same idea appearing across multiple contexts, not as an isolated case."
  }

  return "Treat it as a practical judgment rule that should change how you classify, compare, or review AI work."
}

function buildTopicConsequence(claim: string, entryId: string) {
  const lower = `${entryId} ${claim}`.toLowerCase()

  if (/(models|tools|automations|agents)/.test(lower)) {
    return "Different categories create different expectations around cost, control, tool access, and human review, so lumping them together leads to bad buying and rollout decisions."
  }

  if (/(prompt|language model|llm|chatgpt|token)/.test(lower)) {
    return "Small changes to context, constraints, and examples can change output quality a lot, which means prompt design is part of the operating process rather than a cosmetic extra."
  }

  if (/(data|training|label|feature|pipeline)/.test(lower)) {
    return "Upstream data choices shape downstream behavior long before a model output appears, so teams need to inspect inputs instead of blaming the interface alone."
  }

  if (/(bias|privacy|risk|ethic|safety|governance|misinformation)/.test(lower)) {
    return "The operational consequence is that AI can create harm at scale unless review, access control, and escalation paths are built in early."
  }

  if (/(roi|metric|impact|value|adoption|budget|cost)/.test(lower)) {
    return "Without a business-facing view of value, teams end up rewarding visible activity instead of measurable improvement."
  }

  if (/(agent|automation|workflow|autonomy)/.test(lower)) {
    return "Autonomy and workflow design change failure modes, monitoring needs, and who has to approve the next step."
  }

  if (/(partner|vendor|proposal|pricing|tool|provider|stack)/.test(lower)) {
    return "The practical effect shows up in procurement and operations: fit, ownership, and integration quality matter more than surface polish."
  }

  return "In practice, the payoff is better judgment: clearer framing leads to better decisions about where AI helps, where it misleads, and where a person must stay accountable."
}

function buildAppliedParagraph(intent: ExplanationIntent, claim: string, entryId: string) {
  const lower = `${entryId} ${claim}`.toLowerCase()

  if (intent === "contrast") {
    return "A strong answer keeps the trade-off explicit and shows what you would prefer instead. A weak answer repeats the words but never says what decision changes because of them."
  }

  if (intent === "checklist") {
    return "A reliable way to use it is to name the claim, identify the operational trade-off, and then ask what evidence would make you revise your first answer before acting on it."
  }

  if (intent === "example") {
    if (/(models|tools|automations|agents)/.test(lower)) {
      return "A concrete example is comparing a chatbot model, a customer-support tool built on top of that model, a ticket-routing automation, and an agent that can decide which actions to take next. They may all look like 'AI,' but they demand different oversight and create different risks."
    }

    if (/(data|training|label|feature|pipeline)/.test(lower)) {
      return "A practical example is a hiring or fraud system: if the training data is skewed or messy, the model learns that skew no matter how polished the interface looks later."
    }

    if (/(bias|privacy|risk|ethic|safety|governance|misinformation)/.test(lower)) {
      return "A real-world example is an AI assistant summarizing sensitive customer data. The useful part is speed, but the real decision is whether the workflow has the permissions, review steps, and logging needed to make that safe."
    }

    return "A simple example is using AI to draft first-pass work and then reviewing it against a domain-specific standard. The value appears when the draft speeds you up without being mistaken for final judgment."
  }

  if (intent === "coach") {
    return "If you were coaching a teammate, the key move would be to restate the claim in plain language, connect it to one decision they already make, and then show what kind of mistake the section is trying to prevent."
  }

  if (intent === "brief") {
    return "The short version is: use the statement as a filter for better choices. If it does not change classification, oversight, cost, or risk, you probably have not extracted the real lesson yet."
  }

  if (intent === "decision") {
    return "The decision it usually changes is not whether AI exists, but how you scope it: what category it belongs to, what level of trust it deserves, and where a human needs to stay in the loop."
  }

  if (intent === "plain") {
    return "When you explain it simply, the goal is to replace vague hype with a claim you could defend in a real meeting. If someone asked 'so what do we do differently now?', you should be able to answer that directly."
  }

  return "Use it by turning the statement into a decision rule: identify the claim, connect it to a real workflow, and check what evidence would increase or decrease your confidence before you move on."
}

function buildManualExplanation(entry: ComponentExplanation) {
  const claim = extractFocusText(entry.question, entry.explanation)
  const intent = inferIntent(entry.question)
  const opening = pickVariant(`${entry.id}:opening`, [
    `The central idea here is ${claim}`,
    `What this is really telling you is ${claim}`,
    `At bottom, this question is asking you to work with ${claim}`,
    `The statement to focus on is ${claim}`,
  ])
  const followThrough = explainClaimMechanism(claim)
  const consequence = pickVariant(`${entry.id}:consequence`, [
    `In practice, ${buildTopicConsequence(claim, entry.id)}`,
    `The practical consequence is straightforward: ${buildTopicConsequence(claim, entry.id).charAt(0).toLowerCase()}${buildTopicConsequence(claim, entry.id).slice(1)}`,
    `${buildTopicConsequence(claim, entry.id)}`,
  ])

  return [
    `${opening} ${followThrough}`,
    consequence,
    buildAppliedParagraph(intent, claim, entry.id),
  ]
    .map((paragraph) => normalizeSentence(paragraph))
    .join("\n\n")
}

function resolveGeneratedContext(componentId: string): GeneratedExplanationContext | null {
  const scenarioOrCheckMatch = componentId.match(/^(module-\d+)-(.+)-(scenario|quick-check)$/)
  if (scenarioOrCheckMatch) {
    const [, moduleId, sectionId, kind] = scenarioOrCheckMatch
    const module = courseStructure.modules.find((candidate) => candidate.id === moduleId)
    const section = module?.sections.find((candidate) => candidate.id === sectionId)

    if (!module || !section) {
      return null
    }

    return {
      kind: kind as "scenario" | "quick-check",
      moduleTitle: stripModulePrefix(module.title),
      moduleDescription: normalizeSentence(
        requireNonEmptyValue(module.description, `Missing module description for ${module.id}`),
      ),
      sectionTitle: section.title,
      sectionSummary: normalizeSentence(
        requireNonEmptyValue(section.summary, `Missing section summary for ${module.id}-${section.id}`),
      ),
    }
  }

  const quizMatch = componentId.match(/^(module-\d+)-course-quiz$/)
  if (!quizMatch) {
    return null
  }

  const module = courseStructure.modules.find((candidate) => candidate.id === quizMatch[1])
  if (!module) {
    return null
  }

  return {
    kind: "course-quiz",
    moduleTitle: stripModulePrefix(module.title),
    moduleDescription: normalizeSentence(
      requireNonEmptyValue(module.description, `Missing module description for ${module.id}`),
    ),
  }
}

function buildGeneratedExplanation(componentId: string, context: GeneratedExplanationContext) {
  if (context.kind === "scenario") {
    const opening = pickVariant(`${componentId}:scenario:opening`, [
      `${context.sectionTitle} is meant to leave you with a working explanation, not just recognition of a phrase. ${context.sectionSummary}`,
      `This scenario is checking whether you can explain ${context.sectionTitle} in your own words. ${context.sectionSummary}`,
      `The point of ${context.sectionTitle} is applied understanding. ${context.sectionSummary}`,
    ])
    const middle = pickVariant(`${componentId}:scenario:middle`, [
      `What matters in ${context.moduleTitle} is whether you can connect that idea to a real choice, trade-off, or operating habit instead of repeating the headline back.`,
      `Inside ${context.moduleTitle}, the goal is to turn the section's idea into judgment: you should be able to say what it changes in practice and why that change matters.`,
      `The section only counts as learned when you can explain what the idea means for a real workflow, tool decision, or review habit in ${context.moduleTitle}.`,
    ])
    const closing = pickVariant(`${componentId}:scenario:closing`, [
      `A strong response names the concept, gives one concrete example, and adds one limit or condition that would make you revise the explanation.`,
      `If you can restate the idea, tie it to a practical example, and mention where it stops being true, you have answered the card the right way.`,
      `The useful standard here is simple: explain the idea plainly, show where it applies, and note one boundary that keeps you from overstating it.`,
    ])

    return [opening, middle, closing].map((paragraph) => normalizeSentence(paragraph)).join("\n\n")
  }

  if (context.kind === "quick-check") {
    const opening = pickVariant(`${componentId}:quick-check:opening`, [
      `This quick check is testing your reasoning about ${context.sectionTitle}, not your ability to echo a definition. ${context.sectionSummary}`,
      `The concept under test is ${context.sectionTitle}. The question is asking whether you can use the section's logic instead of guessing from surface wording.`,
      `${context.sectionTitle} appears here as a reasoning checkpoint. ${context.sectionSummary}`,
      `Start with the logic behind ${context.sectionTitle}. This prompt is checking whether you can explain the section's reasoning, not whether you remember a phrase.`,
      `The fastest way into this question is to ask what ${context.sectionTitle} is trying to prove. ${context.sectionSummary}`,
    ])
    const middle = pickVariant(`${componentId}:quick-check:middle`, [
      `A good answer identifies the cause-and-effect logic inside the section and rules out options that sound plausible but break that logic.`,
      `The check becomes easier when you ask what would have to be true for an option to fit the section and what evidence would make that option collapse.`,
      `What the panel wants from you is causal reasoning: explain why the best answer follows from the section and why the weaker answers miss the key condition.`,
      `Your job here is to trace the mechanism: what causes the outcome in the section, and which answer actually respects that chain instead of borrowing familiar words.`,
      `The strongest way to reason through it is to separate signal from wording. The correct option should match the section's logic, not just its vocabulary.`,
    ])
    const closing = pickVariant(`${componentId}:quick-check:closing`, [
      `If you can explain the concept, point to the mechanism behind it, and name what evidence would change your mind, you are using the idea the way the course intends.`,
      `The strongest response is the one that states the principle, connects it to the section, and stays open to different evidence instead of treating the first instinct as final.`,
      `Think of it as a short reasoning audit: name the principle, justify the option, and say what would make you reconsider.`,
      `A useful self-check is whether you can defend the winning answer, reject a tempting wrong one, and say what new evidence would force you to revisit the call.`,
      `Once you can name the principle, justify the option, and say what would falsify your answer, the card has done its job.`,
    ])

    return [opening, middle, closing].map((paragraph) => normalizeSentence(paragraph)).join("\n\n")
  }

  const opening = pickVariant(`${componentId}:quiz:opening`, [
    `This module quiz is validating whether you can use the core judgment from ${context.moduleTitle} when the answer is not obvious. ${context.moduleDescription}`,
    `The checkpoint for ${context.moduleTitle} is about applied judgment under ambiguity, not isolated recall. ${context.moduleDescription}`,
    `${context.moduleTitle} ends with a quiz because the real test is whether you can transfer the module's reasoning into a less scripted decision.`,
  ])
  const middle = pickVariant(`${componentId}:quiz:middle`, [
    `That means comparing claims by fit, evidence, and avoidable risk instead of picking the option that merely sounds the most sophisticated.`,
    `The right answer is usually the one that best matches the module principle while staying honest about trade-offs, ownership, and downside.`,
    `What separates a strong answer from a weak one here is evidence discipline: you need to distinguish real support from surface plausibility.`,
  ])
  const closing = pickVariant(`${componentId}:quiz:closing`, [
    `A dependable way to approach it is to name the claim being tested, map it to the module principle, and reject options that ignore obvious constraints.`,
    `Work through it by identifying the decision, matching it to the module's core idea, and discarding answers that create unnecessary risk or hand-wave the trade-offs.`,
    `If you can explain why one option fits the module's logic better than the others, you are treating the quiz as a judgment checkpoint rather than a memory game.`,
  ])

  return [opening, middle, closing].map((paragraph) => normalizeSentence(paragraph)).join("\n\n")
}

function resolveExplanation(entry: ComponentExplanation): ComponentExplanation {
  const generatedContext = resolveGeneratedContext(entry.id)
  const explanation = generatedContext
    ? buildGeneratedExplanation(entry.id, generatedContext)
    : buildManualExplanation(entry)

  return {
    ...entry,
    explanation,
  }
}


/**
 * Get an explanation for a component by searching the mapping.
 */
export function getComponentExplanation(componentId: string): ComponentExplanation | undefined {
  const explanation = EXPLANATION_REGISTRY[componentId]
  return explanation ? resolveExplanation(explanation) : undefined
}

/**
 * Get all explanations for a specific module
 */
export function getModuleExplanations(moduleNumber: number): ComponentExplanation[] {
  const prefix = `m${moduleNumber}-`
  return Object.values(EXPLANATION_REGISTRY)
    .filter((exp) => exp.id.startsWith(prefix))
    .map(resolveExplanation)
}

/**
 * Search for explanations by keyword
 */
export function searchExplanations(query: string): ComponentExplanation[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(EXPLANATION_REGISTRY)
    .map(resolveExplanation)
    .filter((exp) => exp.question.toLowerCase().includes(lowerQuery) || exp.explanation.toLowerCase().includes(lowerQuery))
}

// Text-display content generation lives in a dedicated module; this file re-exports the public API.
export {
  getTextDisplayInstructionalBriefParagraphs,
  getTextDisplayTrueFalseStatement,
  SECTION_KNOWLEDGE_PATTERNS,
  type InferentialStatement,
  type SectionKnowledgePattern,
} from "@/lib/text-display-content"

