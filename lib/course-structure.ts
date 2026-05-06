/**
 * COURSE STRUCTURE
 * Centralized definition of all modules and sections
 * Single source of truth for course content
 */

export interface Section {
  id: string
  title: string
  summary?: string
  completed: boolean
}

export interface Module {
  id: string
  slug: string
  title: string
  description?: string
  sections: Section[]
  status?: string
  completionRate?: number
}

export interface CourseStructure {
  modules: Module[]
}

export const courseStructure: CourseStructure = {
  modules: [
    {
      id: "module-0",
      slug: "module-0",
      title: "Module 0: The AI Shift: What Is Actually Happening",
      description: "Understand the market shift, separate hype from reality, and set an executive baseline for action.",
      sections: [
        { id: "welcome", title: "Why the AI Shift Is Different", summary: "Review why this wave is moving faster than prior tech cycles and why leaders cannot treat it as a side project.", completed: false },
        { id: "ai-is-everywhere", title: "Hype vs. Reality in Executive Terms", summary: "Use a simple filter to distinguish meaningful capabilities from vendor theater and trend noise.", completed: false },
        { id: "what-youll-learn", title: "Common Leadership Misconceptions", summary: "Identify the mindset traps that cause delayed decisions, poor pilots, and weak implementation outcomes.", completed: false },
        { id: "how-to-use-course", title: "Risk of Inaction vs. Risk of Bad Adoption", summary: "Compare two strategic risk profiles and define the minimum viable AI posture for your organization.", completed: false },
        { id: "summary", title: "Executive Decision Brief and Next Steps", summary: "Leave with a one-page brief: strategic goals, guardrails, and what to evaluate in the next 90 days.", completed: false },
      ],
    },
    {
      id: "module-1",
      slug: "module-1",
      title: "Module 1: Understanding the AI Landscape",
      description: "Decode models, tools, vendors, and service models so you can buy and build with confidence.",
      sections: [
        { id: "module-overview", title: "Landscape Map for Decision-Makers", summary: "Frame the ecosystem so teams stop mixing up models, apps, automations, and agents.", completed: false },
        { id: "defining-ai", title: "Models vs. Tools vs. Automations vs. Agents", summary: "Learn a practical taxonomy you can reuse in procurement and roadmap discussions.", completed: false },
        { id: "brief-history", title: "OpenAI, Anthropic, Google, and Open Source", summary: "Understand where major providers differ in strengths, risks, and business fit.", completed: false },
        { id: "types-of-ai", title: "SaaS Products vs. Agencies vs. Internal Teams", summary: "Choose the right delivery model based on speed, control, cost, and internal capability.", completed: false },
        { id: "ai-in-your-life", title: "What Custom AI Usually Means in Practice", summary: "Decode custom AI claims and spot when vendors are repackaging standard components.", completed: false },
        { id: "myths-vs-reality", title: "AI Wrappers Explained", summary: "Evaluate wrapper value honestly: interface convenience, workflow fit, or margin stacking.", completed: false },
        { id: "ai-writing", title: "Where Platform Lock-In Shows Up", summary: "Spot pricing and workflow dependencies before they become expensive migration problems.", completed: false },
        { id: "ai-images", title: "Evaluating Product Maturity Signals", summary: "Use reliability, support, and release quality as operating signals beyond demo quality.", completed: false },
        { id: "ai-productivity", title: "Integration Readiness Snapshot", summary: "Assess whether a tool can plug into your stack without brittle manual workarounds.", completed: false },
        { id: "ai-creative", title: "Security and Data Exposure Baseline", summary: "Run a lightweight data-risk check before expanding usage across functions.", completed: false },
        { id: "choosing-tools", title: "Landscape Scoring Worksheet", summary: "Score vendors by capability, cost, risk, and execution fit to shortlist what deserves a pilot.", completed: false },
        { id: "module-quiz", title: "Leadership Checkpoint", summary: "Validate your ability to explain the AI landscape and defend procurement choices.", completed: false },
      ],
    },
    {
      id: "module-2",
      slug: "module-2",
      title: "Module 2: Where AI Actually Creates Business Value",
      description: "Identify high-ROI use cases and prioritize initiatives that move revenue, margin, or speed.",
      sections: [
        { id: "module-overview", title: "Value Creation Framework", summary: "Use a practical model for identifying where AI creates measurable business outcomes.", completed: false },
        { id: "what-is-ml", title: "Automation vs. Augmentation Decisions", summary: "Decide when to replace tasks, assist teams, or redesign work around human judgment.", completed: false },
        { id: "training-data", title: "Department-by-Department Opportunity Scan", summary: "Map opportunities in sales, support, operations, finance, marketing, and HR.", completed: false },
        { id: "supervised-unsupervised", title: "Quick Wins vs. Platform Investments", summary: "Separate short-cycle pilots from strategic bets requiring deeper change management.", completed: false },
        { id: "neural-networks", title: "Bottleneck and Throughput Analysis", summary: "Find repetitive decision points and queue bottlenecks where AI can unlock capacity.", completed: false },
        { id: "what-ai-cant-do", title: "Revenue Lift vs. Cost Reduction Matrix", summary: "Balance growth opportunities against efficiency gains using a unified scoring lens.", completed: false },
        { id: "module-quiz", title: "Prioritization Checkpoint", summary: "Test your ability to pick high-value use cases and reject low-leverage initiatives.", completed: false },
      ],
    },
    {
      id: "module-3",
      slug: "module-3",
      title: "Module 3: AI Tools: Which Ones Matter",
      description: "Evaluate tool categories, avoid pricing traps, and select systems that fit your operations.",
      sections: [
        { id: "module-overview", title: "Tool Categories That Matter", summary: "Organize the market into decision-ready categories linked to clear business outcomes.", completed: false },
        { id: "what-is-llm", title: "When a General Assistant Is Enough", summary: "Define thresholds for staying with ChatGPT-class tools versus buying specialized software.", completed: false },
        { id: "how-chatgpt-works", title: "When Specialized Tools Win", summary: "Identify scenarios where domain workflows, controls, and integrations justify niche products.", completed: false },
        { id: "anatomy-of-prompt", title: "Tool Evaluation Scorecard", summary: "Apply a repeatable framework across accuracy, speed, onboarding, support, and reliability.", completed: false },
        { id: "prompt-techniques", title: "Pricing, Integration, and Security Traps", summary: "Surface hidden cost drivers, lock-in risks, and compliance issues before procurement.", completed: false },
        { id: "hands-on-practice", title: "Decision Tree: Buy, Wait, or Pilot", summary: "Use a practical go/no-go tree to prevent shiny-object purchases and fragmented adoption.", completed: false },
        { id: "module-quiz", title: "Procurement Checkpoint", summary: "Demonstrate the ability to defend a tool recommendation in executive review.", completed: false },
      ],
    },
    {
      id: "module-4",
      slug: "module-4",
      title: "Module 4: Choosing the Right AI Agency or Partner",
      description: "Select credible implementation partners, structure pilots well, and avoid expensive misalignment.",
      sections: [
        { id: "module-overview", title: "Partner Selection Framework", summary: "Understand when to use agencies, freelancers, systems integrators, or internal teams.", completed: false },
        { id: "what-is-data", title: "Questions to Ask Before Signing", summary: "Use a structured diligence checklist covering scope, outcomes, staffing, and governance.", completed: false },
        { id: "data-collection", title: "Red Flags and Fake Expertise", summary: "Spot warning signs in proposals, demos, references, and vague technical claims.", completed: false },
        { id: "data-cleaning", title: "Pilot Design vs. Full Deployment", summary: "Structure pilot phases that produce decision-grade evidence rather than vanity wins.", completed: false },
        { id: "preprocessing", title: "Build vs. Buy vs. Partner", summary: "Choose an execution model based on internal capacity, urgency, and long-term ownership.", completed: false },
        { id: "feature-engineering", title: "How AI Pricing Models Really Work", summary: "Decode retainers, usage pricing, fixed-fee projects, and change-order risk.", completed: false },
        { id: "module-quiz", title: "Vendor Diligence Checkpoint", summary: "Pressure-test your ability to evaluate an agency proposal with confidence.", completed: false },
      ],
    },
    // Position 5
    {
      id: "module-5",
      slug: "module-5",
      title: "Module 5: AI ROI and Decision-Making Frameworks",
      description: "Quantify value, prioritize bets, and report impact with executive-ready metrics.",
      sections: [
        { id: "module-overview", title: "ROI Operating Model", summary: "Set the metrics model for estimating, tracking, and validating AI impact.", completed: false },
        { id: "roi-basics", title: "ROI Calculation Methods", summary: "Use baseline, uplift, and time-saved conversion methods to estimate value credibly.", completed: false },
        { id: "effectiveness-metrics", title: "Automation Scoring and Cost-Benefit Analysis", summary: "Rank opportunities by value, effort, and confidence to allocate budget effectively.", completed: false },
        { id: "roi-calculation", title: "Prioritization Matrix and Budget Strategy", summary: "Build a quarterly portfolio with quick wins and strategic bets in balance.", completed: false },
        { id: "misleading-metrics", title: "Misleading Metrics and False Positives", summary: "Avoid vanity metrics that overstate impact and hide operational drag.", completed: false },
        { id: "adoption-framework", title: "Executive Reporting and Experiment Governance", summary: "Report progress with risk-adjusted outcomes and transparent assumptions.", completed: false },
        { id: "module-quiz", title: "ROI Decision Checkpoint", summary: "Validate your ability to defend AI investments with business-first evidence.", completed: false },
      ],
    },
    // Position 6
    {
      id: "module-6",
      slug: "module-6",
      title: "Module 6: AI Risk, Compliance and Governance",
      description: "Reduce implementation risk with practical policies for data, vendors, and responsible use.",
      sections: [
        { id: "module-overview", title: "Risk and Governance Baseline", summary: "Establish minimum controls required before scaling AI usage across teams.", completed: false },
        { id: "ai-bias", title: "Reliability, Hallucinations, and Human Oversight", summary: "Define when human review is mandatory and how to handle output uncertainty.", completed: false },
        { id: "privacy-data", title: "Data Privacy and Security Controls", summary: "Apply practical controls for sensitive data, access boundaries, and vendor policies.", completed: false },
        { id: "misinformation", title: "Misinformation, Brand Risk, and Incident Response", summary: "Prepare playbooks for harmful output, public risk, and operational escalation.", completed: false },
        { id: "responsible-ai", title: "Internal AI Use Policy", summary: "Create clear usage guidance by role, risk tier, and approved workflows.", completed: false },
        { id: "ethical-dilemmas", title: "Vendor Risk, IP Exposure, and Contract Guardrails", summary: "Negotiate risk protections around data rights, model usage, and liability.", completed: false },
        { id: "risk-reflection", title: "Governance Scorecard", summary: "Use a lightweight scorecard to monitor risk posture as adoption expands.", completed: false },
        { id: "module-quiz", title: "Governance Checkpoint", summary: "Confirm your readiness to deploy AI responsibly at organization scale.", completed: false },
      ],
    },
    // Position 7
    {
      id: "module-7",
      slug: "module-7",
      title: "Module 7: Building an AI Adoption Roadmap",
      description: "Turn strategy into execution with pilots, change management, and phased implementation.",
      sections: [
        { id: "module-overview", title: "Roadmap Architecture", summary: "Design a practical rollout path tied to business outcomes and operating constraints.", completed: false },
        { id: "ai-in-the-workplace", title: "How to Start: First 30 Days", summary: "Launch a focused start plan with scope, leadership cadence, and early proof points.", completed: false },
        { id: "ai-and-jobs", title: "Pilot Project Strategy", summary: "Choose pilots that are meaningful enough to matter and small enough to execute well.", completed: false },
        { id: "industry-applications", title: "Change Management for Teams", summary: "Address adoption resistance with role clarity, training, and transparent communication.", completed: false },
        { id: "ai-strategy", title: "Building Internal AI Champions", summary: "Create a cross-functional champion network to support implementation and governance.", completed: false },
        { id: "real-workflows", title: "Sequencing the Rollout", summary: "Sequence initiatives to avoid change overload while preserving delivery momentum.", completed: false },
        { id: "ai-opportunities", title: "AI Maturity Model", summary: "Assess your organization from experimentation to scaled operations with measurable capability milestones.", completed: false },
        { id: "role-transformation", title: "Role and Process Redesign", summary: "Redesign decision rights, workflows, and accountability as AI systems come online.", completed: false },
        { id: "workflow-redesign", title: "Operating Cadence and Governance Rhythm", summary: "Set recurring reviews for outcomes, risk, and reinvestment decisions.", completed: false },
        { id: "building-ai-skills", title: "Long-Term Transformation Planning", summary: "Build a 12-month roadmap that blends operational wins with strategic capability building.", completed: false },
        { id: "module-quiz", title: "Roadmap Checkpoint", summary: "Demonstrate a realistic, sequenced plan your leadership team can execute.", completed: false },
      ],
    },
    // Position 8
    {
      id: "module-8",
      slug: "module-8",
      title: "Module 8: AI Agents and Automation Systems",
      description: "Separate agent hype from real workflow automation and design systems with proper control.",
      sections: [
        { id: "module-overview", title: "Agent Reality Check", summary: "Clarify what an agent is, what a workflow is, and why the difference matters for execution.", completed: false },
        { id: "what-are-agents", title: "Workflows vs. True Agents", summary: "Map capabilities to the correct architecture so teams avoid over-engineering.", completed: false },
        { id: "how-agents-work", title: "Human-in-the-Loop Design", summary: "Place approval gates and escalation paths where mistakes carry material risk.", completed: false },
        { id: "types-of-agents", title: "Automation Platforms and Orchestration", summary: "Evaluate orchestration tools by observability, reliability, and maintainability.", completed: false },
        { id: "real-world-applications", title: "Realistic Capabilities and Limitations", summary: "Use real-world constraints to scope what can be automated today.", completed: false },
        { id: "building-with-agents", title: "Multi-Agent Hype vs. Practical Deployment", summary: "Decide when single-agent or workflow-first designs outperform complex multi-agent setups.", completed: false },
        { id: "risks-and-limits", title: "Operational Automation Blueprint", summary: "Build a production-ready blueprint with ownership, monitoring, and rollback plans.", completed: false },
        { id: "module-quiz", title: "Automation Design Checkpoint", summary: "Validate your ability to design automation with control, resilience, and ROI.", completed: false },
      ],
    },
    // Position 9
    {
      id: "module-9",
      slug: "module-9",
      title: "Module 9: Designing Your AI Stack",
      description: "Build a sustainable stack strategy that avoids sprawl and supports long-term ownership.",
      sections: [
        { id: "module-overview", title: "Stack Strategy Principles", summary: "Define the design principles for a scalable, maintainable, and cost-aware AI stack.", completed: false },
        { id: "explain-ai", title: "Avoiding Tool Sprawl", summary: "Implement governance rules that prevent duplicate tools and fragmented ownership.", completed: false },
        { id: "tool-selection", title: "Integration and Architecture Decisions", summary: "Choose integration patterns that reduce manual work and increase operational reliability.", completed: false },
        { id: "prompting-assistants", title: "Vendor Consolidation Strategy", summary: "Consolidate where practical while preserving flexibility and negotiation leverage.", completed: false },
        { id: "risk-check", title: "Procurement Framework and Controls", summary: "Standardize procurement criteria for legal, security, and operational approval.", completed: false },
        { id: "ai-workflows", title: "Long-Term Maintainability", summary: "Assign ownership models for administration, model updates, and cross-team support.", completed: false },
        { id: "ai-project", title: "Internal Ownership Blueprint", summary: "Define who owns strategy, tooling, operations, and performance outcomes.", completed: false },
        { id: "next-steps", title: "Stack Decision Worksheet and Next Actions", summary: "Finalize your stack plan with clear priorities, owners, and implementation timelines.", completed: false },
      ],
    },
    // Position 10
    {
      id: "module-10",
      slug: "module-10",
      title: "Module 10: The Future of AI and Strategic Positioning",
      description: "Prepare for industry shifts and position your business for durable AI advantage.",
      sections: [
        { id: "module-overview", title: "Future Signals That Matter", summary: "Focus on high-impact shifts and ignore speculative noise that distracts execution.", completed: false },
        { id: "current-frontiers", title: "Model Commoditization and Margin Pressure", summary: "Understand how falling model costs change competitive dynamics and vendor economics.", completed: false },
        { id: "agi-explained", title: "The Future of AI Agencies and Service Models", summary: "Anticipate how agencies will evolve as tooling improves and delivery expectations rise.", completed: false },
        { id: "ai-governance", title: "AI-Native Operating Models", summary: "Explore how AI-native companies redesign teams, decisions, and speed-to-market.", completed: false },
        { id: "ai-careers", title: "Workforce and Leadership Implications", summary: "Plan role shifts, capability development, and leadership expectations for the AI era.", completed: false },
        { id: "your-ai-future", title: "Strategic Positioning Playbook", summary: "Build your long-range positioning plan: where to compete, partner, and differentiate.", completed: false },
        { id: "module-quiz", title: "Executive Strategy Checkpoint", summary: "Validate your ability to make forward-looking AI decisions with strategic clarity.", completed: false },
      ],
    },
  ],
}

export function getCourseStructure(): CourseStructure {
  return courseStructure
}
