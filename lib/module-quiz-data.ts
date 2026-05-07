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