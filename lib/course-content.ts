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

type CardKnowledgeEntry = {
  id: string
  moduleId: string
  sectionId: string
  cardType: "section-card" | "manual-explainer"
  content: SectionLearningContent
  summary: string
  question: string
  explanation: string
}

const CARD_KNOWLEDGE_REGISTRY_BY_ID: Record<string, CardKnowledgeEntry> = 

{
"module-0-ai-is-everywhere": {
    id: "module-0-ai-is-everywhere",
    moduleId: "module-0",
    sectionId: "ai-is-everywhere",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-is-everywhere through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-0-ai-is-everywhere?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-0-how-to-use-course": {
    id: "module-0-how-to-use-course",
    moduleId: "module-0",
    sectionId: "how-to-use-course",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in how-to-use-course through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-0-how-to-use-course?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-0-summary": {
    id: "module-0-summary",
    moduleId: "module-0",
    sectionId: "summary",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in summary through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-0-summary?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-0-welcome": {
    id: "module-0-welcome",
    moduleId: "module-0",
    sectionId: "welcome",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in welcome through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-0-welcome?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-0-what-youll-learn": {
    id: "module-0-what-youll-learn",
    moduleId: "module-0",
    sectionId: "what-youll-learn",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in what-youll-learn through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-0-what-youll-learn?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-ai-creative": {
    id: "module-1-ai-creative",
    moduleId: "module-1",
    sectionId: "ai-creative",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-creative through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-ai-creative?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-ai-images": {
    id: "module-1-ai-images",
    moduleId: "module-1",
    sectionId: "ai-images",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-images through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-ai-images?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-ai-in-your-life": {
    id: "module-1-ai-in-your-life",
    moduleId: "module-1",
    sectionId: "ai-in-your-life",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-in-your-life through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-ai-in-your-life?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-ai-productivity": {
    id: "module-1-ai-productivity",
    moduleId: "module-1",
    sectionId: "ai-productivity",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-productivity through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-ai-productivity?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-ai-writing": {
    id: "module-1-ai-writing",
    moduleId: "module-1",
    sectionId: "ai-writing",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-writing through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-ai-writing?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-brief-history": {
    id: "module-1-brief-history",
    moduleId: "module-1",
    sectionId: "brief-history",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in brief-history through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-brief-history?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-choosing-tools-section-card": {
    id: "module-1-choosing-tools-section-card",
    moduleId: "module-1",
    sectionId: "choosing-tools",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in choosing-tools through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-choosing-tools?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-defining-ai-section-card": {
    id: "module-1-defining-ai-section-card",
    moduleId: "module-1",
    sectionId: "defining-ai",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in defining-ai through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-defining-ai?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-module-overview-section-card": {
    id: "module-1-module-overview-section-card",
    moduleId: "module-1",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-module-quiz": {
    id: "module-1-module-quiz",
    moduleId: "module-1",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-myths-vs-reality": {
    id: "module-1-myths-vs-reality",
    moduleId: "module-1",
    sectionId: "myths-vs-reality",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in myths-vs-reality through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-myths-vs-reality?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-1-types-of-ai-section-card": {
    id: "module-1-types-of-ai-section-card",
    moduleId: "module-1",
    sectionId: "types-of-ai",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in types-of-ai through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-1-types-of-ai?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-10-agi-explained": {
    id: "module-10-agi-explained",
    moduleId: "module-10",
    sectionId: "agi-explained",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in agi-explained through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-10-agi-explained?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-10-ai-careers": {
    id: "module-10-ai-careers",
    moduleId: "module-10",
    sectionId: "ai-careers",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-careers through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-10-ai-careers?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-10-ai-governance": {
    id: "module-10-ai-governance",
    moduleId: "module-10",
    sectionId: "ai-governance",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-governance through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-10-ai-governance?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-10-current-frontiers-section-card": {
    id: "module-10-current-frontiers-section-card",
    moduleId: "module-10",
    sectionId: "current-frontiers",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in current-frontiers through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-10-current-frontiers?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-10-module-overview-section-card": {
    id: "module-10-module-overview-section-card",
    moduleId: "module-10",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-10-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-10-module-quiz": {
    id: "module-10-module-quiz",
    moduleId: "module-10",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-10-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-10-your-ai-future": {
    id: "module-10-your-ai-future",
    moduleId: "module-10",
    sectionId: "your-ai-future",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in your-ai-future through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-10-your-ai-future?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-2-module-overview-section-card": {
    id: "module-2-module-overview-section-card",
    moduleId: "module-2",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-2-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-2-module-quiz": {
    id: "module-2-module-quiz",
    moduleId: "module-2",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-2-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-2-neural-networks-section-card": {
    id: "module-2-neural-networks-section-card",
    moduleId: "module-2",
    sectionId: "neural-networks",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in neural-networks through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-2-neural-networks?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-2-supervised-unsupervised-section-card": {
    id: "module-2-supervised-unsupervised-section-card",
    moduleId: "module-2",
    sectionId: "supervised-unsupervised",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in supervised-unsupervised through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-2-supervised-unsupervised?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-2-training-data-section-card": {
    id: "module-2-training-data-section-card",
    moduleId: "module-2",
    sectionId: "training-data",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in training-data through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-2-training-data?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-2-what-ai-cant-do-section-card": {
    id: "module-2-what-ai-cant-do-section-card",
    moduleId: "module-2",
    sectionId: "what-ai-cant-do",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in what-ai-cant-do through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-2-what-ai-cant-do?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-2-what-is-ml-section-card": {
    id: "module-2-what-is-ml-section-card",
    moduleId: "module-2",
    sectionId: "what-is-ml",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in what-is-ml through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-2-what-is-ml?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-ai-creative": {
    id: "module-3-ai-creative",
    moduleId: "module-3",
    sectionId: "ai-creative",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-creative through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-ai-creative?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-ai-images": {
    id: "module-3-ai-images",
    moduleId: "module-3",
    sectionId: "ai-images",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-images through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-ai-images?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-ai-productivity": {
    id: "module-3-ai-productivity",
    moduleId: "module-3",
    sectionId: "ai-productivity",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-productivity through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-ai-productivity?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-ai-writing": {
    id: "module-3-ai-writing",
    moduleId: "module-3",
    sectionId: "ai-writing",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-writing through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-ai-writing?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-anatomy-of-prompt": {
    id: "module-3-anatomy-of-prompt",
    moduleId: "module-3",
    sectionId: "anatomy-of-prompt",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in anatomy-of-prompt through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-anatomy-of-prompt?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-choosing-tools": {
    id: "module-3-choosing-tools",
    moduleId: "module-3",
    sectionId: "choosing-tools",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in choosing-tools through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-choosing-tools?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-hands-on-practice-section-card": {
    id: "module-3-hands-on-practice-section-card",
    moduleId: "module-3",
    sectionId: "hands-on-practice",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in hands-on-practice through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-hands-on-practice?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-how-chatgpt-works": {
    id: "module-3-how-chatgpt-works",
    moduleId: "module-3",
    sectionId: "how-chatgpt-works",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in how-chatgpt-works through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-how-chatgpt-works?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-module-overview-section-card": {
    id: "module-3-module-overview-section-card",
    moduleId: "module-3",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-module-quiz": {
    id: "module-3-module-quiz",
    moduleId: "module-3",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-prompt-techniques": {
    id: "module-3-prompt-techniques",
    moduleId: "module-3",
    sectionId: "prompt-techniques",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in prompt-techniques through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-prompt-techniques?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-3-what-is-llm": {
    id: "module-3-what-is-llm",
    moduleId: "module-3",
    sectionId: "what-is-llm",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in what-is-llm through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-3-what-is-llm?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-4-data-cleaning-section-card": {
    id: "module-4-data-cleaning-section-card",
    moduleId: "module-4",
    sectionId: "data-cleaning",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in data-cleaning through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-4-data-cleaning?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-4-data-collection-section-card": {
    id: "module-4-data-collection-section-card",
    moduleId: "module-4",
    sectionId: "data-collection",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in data-collection through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-4-data-collection?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-4-feature-engineering-section-card": {
    id: "module-4-feature-engineering-section-card",
    moduleId: "module-4",
    sectionId: "feature-engineering",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in feature-engineering through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-4-feature-engineering?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-4-module-overview-section-card": {
    id: "module-4-module-overview-section-card",
    moduleId: "module-4",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-4-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-4-module-quiz": {
    id: "module-4-module-quiz",
    moduleId: "module-4",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-4-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-4-preprocessing-section-card": {
    id: "module-4-preprocessing-section-card",
    moduleId: "module-4",
    sectionId: "preprocessing",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in preprocessing through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-4-preprocessing?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-4-what-is-data-section-card": {
    id: "module-4-what-is-data-section-card",
    moduleId: "module-4",
    sectionId: "what-is-data",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in what-is-data through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-4-what-is-data?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-5-adoption-framework": {
    id: "module-5-adoption-framework",
    moduleId: "module-5",
    sectionId: "adoption-framework",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in adoption-framework through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-5-adoption-framework?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-5-effectiveness-metrics": {
    id: "module-5-effectiveness-metrics",
    moduleId: "module-5",
    sectionId: "effectiveness-metrics",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in effectiveness-metrics through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-5-effectiveness-metrics?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-5-misleading-metrics": {
    id: "module-5-misleading-metrics",
    moduleId: "module-5",
    sectionId: "misleading-metrics",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in misleading-metrics through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-5-misleading-metrics?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-5-module-overview-section-card": {
    id: "module-5-module-overview-section-card",
    moduleId: "module-5",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-5-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-5-module-quiz": {
    id: "module-5-module-quiz",
    moduleId: "module-5",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-5-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-5-roi-basics-section-card": {
    id: "module-5-roi-basics-section-card",
    moduleId: "module-5",
    sectionId: "roi-basics",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in roi-basics through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-5-roi-basics?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-5-roi-calculation": {
    id: "module-5-roi-calculation",
    moduleId: "module-5",
    sectionId: "roi-calculation",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in roi-calculation through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-5-roi-calculation?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-ai-bias": {
    id: "module-6-ai-bias",
    moduleId: "module-6",
    sectionId: "ai-bias",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-bias through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-ai-bias?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-ethical-dilemmas-section-card": {
    id: "module-6-ethical-dilemmas-section-card",
    moduleId: "module-6",
    sectionId: "ethical-dilemmas",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ethical-dilemmas through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-ethical-dilemmas?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-misinformation": {
    id: "module-6-misinformation",
    moduleId: "module-6",
    sectionId: "misinformation",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in misinformation through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-misinformation?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-module-overview-section-card": {
    id: "module-6-module-overview-section-card",
    moduleId: "module-6",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-module-quiz": {
    id: "module-6-module-quiz",
    moduleId: "module-6",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-privacy-data-section-card": {
    id: "module-6-privacy-data-section-card",
    moduleId: "module-6",
    sectionId: "privacy-data",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in privacy-data through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-privacy-data?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-responsible-ai": {
    id: "module-6-responsible-ai",
    moduleId: "module-6",
    sectionId: "responsible-ai",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in responsible-ai through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-responsible-ai?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-6-risk-reflection": {
    id: "module-6-risk-reflection",
    moduleId: "module-6",
    sectionId: "risk-reflection",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in risk-reflection through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-6-risk-reflection?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-ai-and-jobs": {
    id: "module-7-ai-and-jobs",
    moduleId: "module-7",
    sectionId: "ai-and-jobs",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-and-jobs through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-ai-and-jobs?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-ai-in-the-workplace": {
    id: "module-7-ai-in-the-workplace",
    moduleId: "module-7",
    sectionId: "ai-in-the-workplace",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-in-the-workplace through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-ai-in-the-workplace?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-ai-opportunities": {
    id: "module-7-ai-opportunities",
    moduleId: "module-7",
    sectionId: "ai-opportunities",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-opportunities through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-ai-opportunities?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-ai-strategy": {
    id: "module-7-ai-strategy",
    moduleId: "module-7",
    sectionId: "ai-strategy",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-strategy through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-ai-strategy?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-building-ai-skills": {
    id: "module-7-building-ai-skills",
    moduleId: "module-7",
    sectionId: "building-ai-skills",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in building-ai-skills through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-building-ai-skills?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-industry-applications": {
    id: "module-7-industry-applications",
    moduleId: "module-7",
    sectionId: "industry-applications",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in industry-applications through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-industry-applications?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-module-overview-section-card": {
    id: "module-7-module-overview-section-card",
    moduleId: "module-7",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-module-quiz": {
    id: "module-7-module-quiz",
    moduleId: "module-7",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-real-workflows-section-card": {
    id: "module-7-real-workflows-section-card",
    moduleId: "module-7",
    sectionId: "real-workflows",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in real-workflows through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-real-workflows?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-role-transformation-section-card": {
    id: "module-7-role-transformation-section-card",
    moduleId: "module-7",
    sectionId: "role-transformation",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in role-transformation through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-role-transformation?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-7-workflow-redesign-section-card": {
    id: "module-7-workflow-redesign-section-card",
    moduleId: "module-7",
    sectionId: "workflow-redesign",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in workflow-redesign through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-7-workflow-redesign?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-building-with-agents": {
    id: "module-8-building-with-agents",
    moduleId: "module-8",
    sectionId: "building-with-agents",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in building-with-agents through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-building-with-agents?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-how-agents-work-section-card": {
    id: "module-8-how-agents-work-section-card",
    moduleId: "module-8",
    sectionId: "how-agents-work",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in how-agents-work through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-how-agents-work?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-module-overview-section-card": {
    id: "module-8-module-overview-section-card",
    moduleId: "module-8",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-module-quiz": {
    id: "module-8-module-quiz",
    moduleId: "module-8",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-real-world-applications": {
    id: "module-8-real-world-applications",
    moduleId: "module-8",
    sectionId: "real-world-applications",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in real-world-applications through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-real-world-applications?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-risks-and-limits": {
    id: "module-8-risks-and-limits",
    moduleId: "module-8",
    sectionId: "risks-and-limits",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in risks-and-limits through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-risks-and-limits?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-types-of-agents": {
    id: "module-8-types-of-agents",
    moduleId: "module-8",
    sectionId: "types-of-agents",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in types-of-agents through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-types-of-agents?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-8-what-are-agents-section-card": {
    id: "module-8-what-are-agents-section-card",
    moduleId: "module-8",
    sectionId: "what-are-agents",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in what-are-agents through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-8-what-are-agents?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-ai-project": {
    id: "module-9-ai-project",
    moduleId: "module-9",
    sectionId: "ai-project",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-project through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-ai-project?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-ai-workflows": {
    id: "module-9-ai-workflows",
    moduleId: "module-9",
    sectionId: "ai-workflows",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in ai-workflows through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-ai-workflows?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-explain-ai-section-card": {
    id: "module-9-explain-ai-section-card",
    moduleId: "module-9",
    sectionId: "explain-ai",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in explain-ai through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-explain-ai?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-module-overview-section-card": {
    id: "module-9-module-overview-section-card",
    moduleId: "module-9",
    sectionId: "module-overview",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-overview through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-module-overview?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-module-quiz": {
    id: "module-9-module-quiz",
    moduleId: "module-9",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in module-quiz through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-module-quiz?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-next-steps-section-card": {
    id: "module-9-next-steps-section-card",
    moduleId: "module-9",
    sectionId: "next-steps",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in next-steps through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-next-steps?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-prompting-assistants": {
    id: "module-9-prompting-assistants",
    moduleId: "module-9",
    sectionId: "prompting-assistants",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in prompting-assistants through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-prompting-assistants?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-risk-check": {
    id: "module-9-risk-check",
    moduleId: "module-9",
    sectionId: "risk-check",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in risk-check through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-risk-check?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },"module-9-tool-selection": {
    id: "module-9-tool-selection",
    moduleId: "module-9",
    sectionId: "tool-selection",
    cardType: "section-card",
    content: {
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
    summary: "Teach the learner how to apply AI concepts in tool-selection through scenario-based reasoning, actionable checklists, and evidence-based decision making.",
    question: "What should I learn from module-9-tool-selection?",
    explanation: "Use the attached section learning content for scenario context, checklist actions, and quick-check logic.",
  },
}

const MODULE_SECTION_LEARNING_CONTENT: Record<string, Record<string, SectionLearningContent>> =
  Object.values(CARD_KNOWLEDGE_REGISTRY_BY_ID).reduce(
    (acc, entry) => {
      const moduleSections = acc[entry.moduleId] ?? (acc[entry.moduleId] = {})
      // Scenario and quick-check cards share section content; keep first seen value.
      if (!moduleSections[entry.sectionId]) {
        moduleSections[entry.sectionId] = entry.content
      }

      return acc
    },
    {} as Record<string, Record<string, SectionLearningContent>>,
  )

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

type ComponentCardMetadata = {
  moduleId?: string
  sectionId?: string
  content?: SectionLearningContent
  summary?: string
}

export class ComponentCard implements ComponentExplanation {
  id: string
  question: string
  explanation: string
  moduleId?: string
  sectionId?: string
  content?: SectionLearningContent
  summary?: string

  constructor(explanation: ComponentExplanation, metadata: ComponentCardMetadata = {}) {
    this.id = explanation.id
    this.question = explanation.question
    this.explanation = explanation.explanation
    this.moduleId = metadata.moduleId
    this.sectionId = metadata.sectionId
    this.content = metadata.content
    this.summary = metadata.summary
  }

  withExplanation(explanation: string): ComponentCard {
    return new ComponentCard(
      {
        id: this.id,
        question: this.question,
        explanation,
      },
      {
        moduleId: this.moduleId,
        sectionId: this.sectionId,
        content: this.content,
        summary: this.summary,
      },
    )
  }

  toExplanation(): ComponentExplanation {
    return {
      id: this.id,
      question: this.question,
      explanation: this.explanation,
    }
  }
}



function buildExplanationFromCardEntry(entry: CardKnowledgeEntry): ComponentExplanation {
  return {
    id: entry.id,
    question: entry.question,
    explanation: entry.explanation,
  }
}

export const COMPONENT_CARD_REGISTRY: Record<string, ComponentCard> = Object.fromEntries(
  Object.values(CARD_KNOWLEDGE_REGISTRY_BY_ID)
    .map((entry) => {
    const explanation = buildExplanationFromCardEntry(entry)
    return [
      entry.id,
      new ComponentCard(explanation, {
        moduleId: entry.moduleId,
        sectionId: entry.sectionId,
        content: entry.content,
        summary: entry.summary,
      }),
    ]
    }),
)

export const COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> = Object.fromEntries(
  Object.entries(COMPONENT_CARD_REGISTRY).map(([componentId, card]) => [
    componentId,
    card.toExplanation(),
  ]),
)

export function getComponentCard(componentId: string): ComponentCard | undefined {
  return COMPONENT_CARD_REGISTRY[componentId]
}


/**
 * Get an explanation for a component by searching the mapping.
 */
export function getComponentExplanation(componentId: string): ComponentExplanation | undefined {
  const card = getComponentCard(componentId)
  return card ? card.toExplanation() : undefined
}

/**
 * Get all explanations for a specific module
 */
export function getModuleExplanations(moduleNumber: number): ComponentExplanation[] {
  const prefix = `module-${moduleNumber}-`
  return Object.values(COMPONENT_CARD_REGISTRY)
    .filter((exp) => exp.id.startsWith(prefix))
    .map((card) => card.toExplanation())
}

/**
 * Search for explanations by keyword
 */
export function searchExplanations(query: string): ComponentExplanation[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(COMPONENT_CARD_REGISTRY)
    .map((card) => card.toExplanation())
    .filter((exp) => exp.question.toLowerCase().includes(lowerQuery) || exp.explanation.toLowerCase().includes(lowerQuery))
}

export type Section = {
  id: string
  title: string
  summary?: string
  completed: boolean
}

export type Module = {
  id: string
  slug: string
  title: string
  description?: string
  sections: Section[]
  status?: string
  completionRate?: number
}

export type CourseStructure = {
  modules: Module[]
}

function toTitleCaseFromSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function getModuleSortKey(moduleId: string) {
  const match = moduleId.match(/module-(\d+)/)
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER
}

function getSectionSortKey(sectionId: string) {
  if (sectionId === "welcome" || sectionId === "module-overview") return 0
  if (sectionId === "module-quiz") return 9999
  if (sectionId === "summary") return 9998
  return 100
}

export function getCourseStructure(): CourseStructure {
  const moduleIds = new Set<string>()
  const moduleSectionIds = new Map<string, Set<string>>()

  Object.values(CARD_KNOWLEDGE_REGISTRY_BY_ID).forEach((entry) => {
    moduleIds.add(entry.moduleId)

    const sectionIds = moduleSectionIds.get(entry.moduleId) ?? new Set<string>()
    sectionIds.add(entry.sectionId)
    moduleSectionIds.set(entry.moduleId, sectionIds)
  })

  Object.keys(moduleQuizData).forEach((moduleId) => {
    moduleIds.add(moduleId)
  })

  const modules = Array.from(moduleIds)
    .sort((a, b) => getModuleSortKey(a) - getModuleSortKey(b))
    .map((moduleId) => {
      const moduleNumber = getModuleSortKey(moduleId)
      const sectionIds = Array.from(moduleSectionIds.get(moduleId) ?? [])
        .sort((a, b) => {
          const aKey = getSectionSortKey(a)
          const bKey = getSectionSortKey(b)
          if (aKey !== bKey) return aKey - bKey
          return a.localeCompare(b)
        })

      return {
        id: moduleId,
        slug: moduleId,
        title: Number.isFinite(moduleNumber)
          ? `Module ${moduleNumber}`
          : toTitleCaseFromSlug(moduleId),
        sections: sectionIds.map((sectionId) => ({
          id: sectionId,
          title: toTitleCaseFromSlug(sectionId),
          completed: false,
        })),
      }
    })

  return { modules }
}



// Module quiz content registry (moved from lib/module-quiz-data.ts).
export type ModuleQuizOption = {
  id: string
  label: string
  explanation?: string
}

export type ModuleQuizQuestion<T extends string = string> = {
  key: T
  prompt: string
  explanation: string
  options: ModuleQuizOption[]
  correctOptionId: string
}

export const moduleQuizData: Record<string, ModuleQuizQuestion[]> = {
  "module-0": [
    {
      key: "quiz1",
      prompt: "What is the best first move after finishing Module 0?",
      explanation: "Beginners should start with a focused, low-risk pilot tied to one measurable outcome.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Adopt AI broadly across all teams immediately" },
        { id: "b", label: "Run one scoped pilot with a metric and guardrail" },
        { id: "c", label: "Wait until the AI market is fully stable" },
      ],
    },
    {
      key: "quiz2",
      prompt: "Which statement best separates AI hype from practical value?",
      explanation: "Practical value is proven by measurable workflow improvement in real operations.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "The tool has polished demos and strong social buzz" },
        { id: "b", label: "The vendor is popular and recently funded" },
        { id: "c", label: "The workflow impact is measurable in speed, quality, or cost" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Which beginner misconception is most dangerous?",
      explanation: "Confident AI output can still be wrong, so verification is essential.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "If AI sounds confident, it is probably correct" },
        { id: "b", label: "AI can help with repetitive tasks" },
        { id: "c", label: "A small pilot is safer than broad rollout" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What should your Module 0 output include?",
      explanation: "A decision-ready starter plan includes a use case, owner, metric, and review point.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "A long list of AI tools to evaluate later" },
        { id: "b", label: "A 30-day starter plan with guardrails and a review date" },
        { id: "c", label: "A strategy memo recommending no experimentation yet" },
      ],
    },
  ],
  "module-1": [
    {
      key: "quiz1",
      prompt: "Which distinction is most important in AI adoption planning?",
      explanation: "Learners need to distinguish infrastructure models from business-facing tools to avoid procurement confusion.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Color theme of each product" },
        { id: "b", label: "Models vs tools vs automations vs agents" },
        { id: "c", label: "Which vendor has the largest social following" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What does 'custom AI' most often mean in the market?",
      explanation: "Most custom AI offers combine existing models with integration, workflow logic, and domain-specific tuning.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Integration and workflow tailoring on top of existing models" },
        { id: "b", label: "Training a frontier model from scratch for every client" },
        { id: "c", label: "Replacing all internal systems immediately" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is the best first filter when shortlisting AI vendors?",
      explanation: "Business-fit criteria should come before brand, hype, or novelty.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Which product launched this week" },
        { id: "b", label: "Which demo looked most cinematic" },
        { id: "c", label: "Capability fit, integration fit, and risk profile" },
      ],
    },
    {
      key: "quiz4",
      prompt: "Which option best reduces lock-in risk?",
      explanation: "Portable workflows and clear data export terms preserve strategic flexibility.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Rely only on proprietary features with no migration plan" },
        { id: "b", label: "Require exportability and document contingency architecture" },
        { id: "c", label: "Avoid contracts and run everything ad hoc" },
      ],
    },
  ],
  "module-2": [
    {
      key: "quiz1",
      prompt: "Which use case is usually highest ROI early in adoption?",
      explanation: "Repetitive, high-volume workflows with measurable outcomes usually create the fastest value.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Frequent process bottleneck with clear baseline metrics" },
        { id: "b", label: "Ambiguous moonshot with no owner" },
        { id: "c", label: "Highly complex initiative with no process map" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the strongest way to prioritize AI opportunities?",
      explanation: "A scoring model balancing value, effort, confidence, and risk leads to better portfolio choices.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Pick whatever the loudest stakeholder requests" },
        { id: "b", label: "Start only with the most advanced technology" },
        { id: "c", label: "Use a weighted prioritization matrix" },
      ],
    },
    {
      key: "quiz3",
      prompt: "When should augmentation be favored over full automation?",
      explanation: "Human-in-the-loop augmentation is best when judgment quality and risk controls matter.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "When no human oversight is required" },
        { id: "b", label: "When decisions involve context, nuance, or risk" },
        { id: "c", label: "When there is no clear business objective" },
      ],
    },
    {
      key: "quiz4",
      prompt: "Which framing best connects AI initiatives to business goals?",
      explanation: "Teams should tie AI initiatives to revenue, margin, speed, risk, or customer outcomes.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Map each initiative to concrete business outcomes" },
        { id: "b", label: "Measure only model novelty" },
        { id: "c", label: "Focus mostly on tool popularity" },
      ],
    },
  ],
  "module-3": [
    {
      key: "quiz1",
      prompt: "When is a general assistant often enough?",
      explanation: "General assistants fit early exploration and lightweight cross-functional tasks.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "When strict domain controls are mandatory" },
        { id: "b", label: "When deep system integration is required" },
        { id: "c", label: "When use cases are broad and low-risk" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the biggest procurement trap in AI tools?",
      explanation: "Buying from demos without evaluating operations, integration, and governance creates expensive rework.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Demo-driven buying without operational validation" },
        { id: "b", label: "Requiring measurable pilot outcomes" },
        { id: "c", label: "Comparing total cost of ownership" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Which item belongs in a practical tool scorecard?",
      explanation: "Decision-grade scorecards include reliability, integration effort, security posture, and support quality.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Mascot quality and marketing style" },
        { id: "b", label: "Reliability, integration, security, and support" },
        { id: "c", label: "Only headline model benchmarks" },
      ],
    },
    {
      key: "quiz4",
      prompt: "How should teams handle shiny-object pressure?",
      explanation: "A predefined buy-wait-pilot framework keeps teams focused on business value.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Approve every new tool request quickly" },
        { id: "b", label: "Ban all experimentation" },
        { id: "c", label: "Use a standardized buy-wait-pilot decision tree" },
      ],
    },
  ],
  "module-4": [
    {
      key: "quiz1",
      prompt: "Which agency signal is most credible?",
      explanation: "Evidence of measurable outcomes and clear delivery mechanics matters more than buzzwords.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Frequent use of vague technical jargon" },
        { id: "b", label: "Documented outcomes with references and implementation details" },
        { id: "c", label: "Guaranteed claims with no assumptions listed" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the best pilot design principle?",
      explanation: "Good pilots have narrow scope, clear owners, measurable success criteria, and explicit stop conditions.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Small scope, clear metrics, clear ownership" },
        { id: "b", label: "Enterprise-wide rollout on day one" },
        { id: "c", label: "Open-ended trial with no review date" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is a common red flag in vendor proposals?",
      explanation: "Lack of assumptions, governance, and delivery detail is a major warning sign.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Risk log and mitigation plan included" },
        { id: "b", label: "Named implementation team and timeline" },
        { id: "c", label: "Promises of transformation with no operating plan" },
      ],
    },
    {
      key: "quiz4",
      prompt: "Which pricing approach needs close review?",
      explanation: "Low initial pricing with undefined change-order terms can create hidden long-term cost.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Transparent fixed scope and milestone pricing" },
        { id: "b", label: "Low entry price plus unclear expansion charges" },
        { id: "c", label: "Usage tiers with documented thresholds" },
      ],
    },
  ],
  "module-5": [
    {
      key: "quiz1",
      prompt: "Which ROI approach is most trustworthy?",
      explanation: "Baseline-vs-post measurement tied to operating outcomes is more credible than vanity metrics.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Compare baseline and post-implementation business outcomes" },
        { id: "b", label: "Count prompt volume as primary ROI" },
        { id: "c", label: "Use only anecdotal team feedback" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is a misleading metric in AI reporting?",
      explanation: "Activity metrics alone rarely indicate business impact.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Cycle-time reduction on a critical workflow" },
        { id: "b", label: "Margin improvement in target function" },
        { id: "c", label: "Total number of AI chats across teams" },
      ],
    },
    {
      key: "quiz3",
      prompt: "How should experimentation risk be handled in budgeting?",
      explanation: "Teams should budget by stage-gated experiments with explicit risk-adjusted thresholds.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Single annual commitment without checkpoints" },
        { id: "b", label: "Stage-gated funding with milestone reviews" },
        { id: "c", label: "Unlimited pilot budget to maximize learning" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What belongs in an AI progress scorecard?",
      explanation: "Progress reporting should combine value outcomes and risk posture.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Outcome metrics, risk indicators, and next decisions" },
        { id: "b", label: "Only model benchmark rankings" },
        { id: "c", label: "Only qualitative user comments" },
      ],
    },
  ],
  "module-6": [
    {
      key: "quiz1",
      prompt: "What is the minimum governance baseline before scaling AI use?",
      explanation: "Scaling safely requires policy, risk ownership, and approval controls.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Trust each department to self-govern informally" },
        { id: "b", label: "Rely solely on vendor promises" },
        { id: "c", label: "Documented policy, role-based controls, and risk review" },
      ],
    },
    {
      key: "quiz2",
      prompt: "How should hallucination risk be managed?",
      explanation: "High-risk workflows require human review and escalation paths.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Mandate human validation for material decisions" },
        { id: "b", label: "Assume newer models eliminate hallucinations" },
        { id: "c", label: "Ignore low-frequency errors in customer workflows" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Which contract item best protects data and IP?",
      explanation: "Clear clauses on data usage, retention, and model training rights are essential.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "General references to industry standards" },
        { id: "b", label: "Explicit terms on data rights, retention, and training use" },
        { id: "c", label: "Verbal assurances during sales calls" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What is the best response framework for AI incidents?",
      explanation: "Teams need predefined incident handling playbooks with owners and communication paths.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Handle issues ad hoc as they appear" },
        { id: "b", label: "Wait for quarterly governance meetings" },
        { id: "c", label: "Use a documented incident response playbook" },
      ],
    },
  ],
  "module-7": [
    {
      key: "quiz1",
      prompt: "What should the first 30 days of AI adoption focus on?",
      explanation: "Early momentum comes from scoped pilots tied to business outcomes and governance.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Define pilot scope, ownership, metrics, and guardrails" },
        { id: "b", label: "Buy multiple enterprise licenses immediately" },
        { id: "c", label: "Wait for full enterprise architecture redesign" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is a common adoption failure mode?",
      explanation: "Tool access without workflow redesign and role clarity leads to low impact.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Defining clear adoption owners" },
        { id: "b", label: "Sequencing initiatives by readiness" },
        { id: "c", label: "Launching tools without process and change plans" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Why build internal AI champions?",
      explanation: "Champion networks accelerate adoption and support local implementation quality.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "To replace all managers" },
        { id: "b", label: "To drive cross-functional adoption and support" },
        { id: "c", label: "To avoid governance reviews" },
      ],
    },
    {
      key: "quiz4",
      prompt: "How should roadmap sequencing be decided?",
      explanation: "Sequence by business value, readiness, dependency risk, and change capacity.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Use value-readiness-dependency sequencing" },
        { id: "b", label: "Prioritize whichever team asks first" },
        { id: "c", label: "Run all pilots in parallel regardless of capacity" },
      ],
    },
  ],
  "module-8": [
    {
      key: "quiz1",
      prompt: "What is the most practical distinction for teams designing automation?",
      explanation: "Teams should separate deterministic workflows from autonomous agent behavior.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Single-agent vs multi-agent branding" },
        { id: "b", label: "Workflow automation vs true autonomous agents" },
        { id: "c", label: "Open-source vs closed-source preference" },
      ],
    },
    {
      key: "quiz2",
      prompt: "When is human-in-the-loop mandatory?",
      explanation: "Material financial, legal, or customer-impact decisions need human checkpoints.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Only for low-risk formatting tasks" },
        { id: "b", label: "Never, if confidence is high" },
        { id: "c", label: "For high-impact decisions and exception handling" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What causes many automation deployments to fail?",
      explanation: "Lack of monitoring, ownership, and rollback design creates fragile systems.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "No observability and no contingency plan" },
        { id: "b", label: "Excessive documentation" },
        { id: "c", label: "Starting with one constrained workflow" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What is the best first step for agent adoption?",
      explanation: "Start with narrow, high-frequency workflows where outcomes are measurable and reversible.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Deploy broad autonomy across departments" },
        { id: "b", label: "Pilot one constrained workflow with clear controls" },
        { id: "c", label: "Prioritize architectural novelty over reliability" },
      ],
    },
  ],
  "module-9": [
    {
      key: "quiz1",
      prompt: "What is the strongest defense against AI tool sprawl?",
      explanation: "A clear intake and evaluation process prevents duplicate purchases and fragmented ownership.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Centralized intake, scoring, and governance gates" },
        { id: "b", label: "Allow each team to buy tools independently" },
        { id: "c", label: "Ban all new tools" },
      ],
    },
    {
      key: "quiz2",
      prompt: "Why does integration strategy matter in stack design?",
      explanation: "Integration quality determines whether AI capability becomes repeatable operational value.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "It does not matter if tools are powerful" },
        { id: "b", label: "Only IT should care about integrations" },
        { id: "c", label: "Poor integration creates manual work and inconsistency" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is a practical consolidation criterion?",
      explanation: "Consolidate when tools overlap heavily and ownership can be simplified without harming outcomes.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Consolidate only based on vendor popularity" },
        { id: "b", label: "Consolidate based on overlap, cost, and maintainability" },
        { id: "c", label: "Never consolidate to maximize optionality" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What should internal ownership clarify in an AI stack?",
      explanation: "Clear ownership for strategy, operations, governance, and support prevents delivery gaps.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Who owns outcomes, operations, risk, and vendor management" },
        { id: "b", label: "Only who signed the original purchase order" },
        { id: "c", label: "Only which department uses the tool most" },
      ],
    },
  ],
  "module-10": [
    {
      key: "quiz1",
      prompt: "Which future signal should teams prioritize most?",
      explanation: "Teams should prioritize signals that materially affect margins, customer value, or operating speed.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Social media excitement about new model launches" },
        { id: "b", label: "Shifts affecting economics, competitiveness, and execution" },
        { id: "c", label: "Speculative timelines with no business relevance" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What does model commoditization usually imply?",
      explanation: "As models commoditize, advantage shifts toward workflow design, data leverage, and execution discipline.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Differentiation moves up the stack to execution and integration" },
        { id: "b", label: "Model choice becomes the only strategy" },
        { id: "c", label: "AI strategy stops mattering" },
      ],
    },
    {
      key: "quiz3",
      prompt: "How should teams approach workforce implications?",
      explanation: "Teams should redesign roles around AI-assisted workflows and invest in capability transitions.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Assume role design remains unchanged" },
        { id: "b", label: "Delay workforce planning until disruption is complete" },
        { id: "c", label: "Plan role evolution, training, and decision-right updates" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What defines a strong strategic positioning response to AI?",
      explanation: "Strong positioning combines clear market focus, capability bets, and disciplined execution.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Following every trend equally" },
        { id: "b", label: "Selecting focused bets aligned to competitive advantage" },
        { id: "c", label: "Outsourcing all strategic decisions to vendors" },
      ],
    },
  ],
}


