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
      title: "Module 0: AI Adoption Foundations for Beginners",
      description: "Build a beginner-friendly foundation for AI adoption by understanding the shift, avoiding hype, and choosing safe first steps.",
      sections: [
        { id: "welcome", title: "Why This AI Shift Matters for Beginners", summary: "Understand why AI is moving quickly, what changed in the last few years, and why beginners can still catch up with the right learning path.", completed: false },
        { id: "ai-is-everywhere", title: "AI Around You: Hype vs. Reality", summary: "Learn how to spot practical AI use cases in daily work and separate real capability from marketing noise.", completed: false },
        { id: "what-youll-learn", title: "Common Beginner Misconceptions", summary: "Identify early myths that create confusion, unrealistic expectations, and poor first adoption decisions.", completed: false },
        { id: "how-to-use-course", title: "Safe First Steps for AI Adoption", summary: "Compare doing nothing versus adopting carelessly, then choose a low-risk, high-learning starting strategy.", completed: false },
        { id: "summary", title: "Module Wrap-Up and 30-Day Starter Plan", summary: "Finish with a practical action plan: one workflow to test, one risk guardrail, and one outcome metric to track.", completed: false },
      ],
    },
    {
      id: "module-1",
      slug: "module-1",
      title: "Module 1: Making Sense of the AI World",
      description: "Learn the basics of models, tools, vendors, and service options so you can talk about AI clearly and choose wisely.",
      sections: [
        { id: "module-overview", title: "Your Simple Map of the AI Space", summary: "Get a clear overview so models, apps, automations, and agents stop blending together.", completed: false },
        { id: "defining-ai", title: "Models, Tools, Automations, and Agents", summary: "Learn the basic categories so you can describe AI products in plain language.", completed: false },
        { id: "brief-history", title: "Who the Major AI Providers Are", summary: "Compare the big players and understand where their strengths and trade-offs differ.", completed: false },
        { id: "types-of-ai", title: "Software, Agencies, or Internal Help?", summary: "Learn when it makes sense to buy software, hire a partner, or build with your own team.", completed: false },
        { id: "ai-in-your-life", title: "What People Mean by Custom AI", summary: "See what is truly custom and what is usually just a packaged version of standard AI tools.", completed: false },
        { id: "myths-vs-reality", title: "What AI Wrappers Really Add", summary: "Understand when a wrapper adds helpful workflow value and when it mostly adds cost.", completed: false },
        { id: "module-quiz", title: "Learning Checkpoint", summary: "Validate your ability to explain the AI landscape and defend procurement choices.", completed: false },
      ],
    },
    {
      id: "module-2",
      slug: "module-2",
      title: "Module 2: Finding Useful AI Opportunities",
      description: "Learn where AI can save time, reduce busywork, and create clear value for your team or business.",
      sections: [
        { id: "module-overview", title: "A Simple Way to Spot Value", summary: "Use a practical framework to find where AI can make a measurable difference.", completed: false },
        { id: "what-is-ml", title: "When AI Should Help vs. Do the Work", summary: "Decide when AI should assist people, automate a task, or stay out of the workflow.", completed: false },
        { id: "training-data", title: "Scanning for Opportunities Across Teams", summary: "Look for useful AI opportunities in sales, support, operations, finance, marketing, and HR.", completed: false },
        { id: "supervised-unsupervised", title: "Quick Wins vs. Bigger Investments", summary: "Separate small early wins from longer projects that need more time and change.", completed: false },
        { id: "neural-networks", title: "Finding Bottlenecks and Repetitive Work", summary: "Spot slow steps, queues, and repeated decisions where AI could save time or effort.", completed: false },
        { id: "what-ai-cant-do", title: "Comparing Growth vs. Efficiency Ideas", summary: "Balance ideas that may grow revenue with ideas that may save time or cost.", completed: false },
        { id: "module-quiz", title: "Prioritization Checkpoint", summary: "Test your ability to pick high-value use cases and reject low-leverage initiatives.", completed: false },
      ],
    },
    {
      id: "module-3",
      slug: "module-3",
      title: "Module 3: Picking AI Tools Without the Hype",
      description: "Compare tool types, avoid common buying mistakes, and choose tools that genuinely fit your team.",
      sections: [
        { id: "module-overview", title: "The Main Tool Categories to Know", summary: "Organize the tool market into clear buckets so it is easier to compare your options.", completed: false },
        { id: "what-is-llm", title: "When a General AI Assistant Is Enough", summary: "Learn when a broad tool like ChatGPT may already cover your needs.", completed: false },
        { id: "how-chatgpt-works", title: "When a Specialized Tool Is Worth It", summary: "See when a more focused tool becomes useful because of workflow, controls, or integrations.", completed: false },
        { id: "anatomy-of-prompt", title: "A Simple Tool Scorecard", summary: "Use one repeatable checklist to compare accuracy, ease of use, support, and reliability.", completed: false },
        { id: "prompt-techniques", title: "Common Pricing, Integration, and Security Pitfalls", summary: "Catch hidden costs and setup problems before you commit to a tool.", completed: false },
        { id: "ai-writing", title: "How Tool Lock-In Happens", summary: "Spot the signs that a tool may become hard or expensive to replace later.", completed: false },
        { id: "ai-images", title: "How to Tell If a Product Is Mature", summary: "Look past the demo and check for reliability, support, and steady product quality.", completed: false },
        { id: "ai-productivity", title: "Will This Tool Fit Your Current Setup?", summary: "Check whether a tool works with your existing systems without creating extra manual steps.", completed: false },
        { id: "ai-creative", title: "A Simple Security and Data Check", summary: "Do a basic safety review before sharing data or rolling a tool out more widely.", completed: false },
        { id: "choosing-tools", title: "Tool Comparison Guide", summary: "Compare vendors by usefulness, cost, risk, and fit so you know what is worth testing.", completed: false },
        { id: "hands-on-practice", title: "Buy, Wait, or Pilot?", summary: "Use a simple decision tree to avoid rushing into tools that are not ready for your needs.", completed: false },
        { id: "module-quiz", title: "Procurement Checkpoint", summary: "Demonstrate the ability to defend a tool recommendation in a practical review.", completed: false },
      ],
    },
    {
      id: "module-4",
      slug: "module-4",
      title: "Module 4: Choosing an AI Partner",
      description: "Learn how to compare agencies and partners, ask better questions, and run safer pilot projects.",
      sections: [
        { id: "module-overview", title: "What Kind of Partner Do You Need?", summary: "Understand when an agency, freelancer, integrator, or internal team is the best fit.", completed: false },
        { id: "what-is-data", title: "Questions to Ask Before You Sign", summary: "Use a simple checklist to ask about scope, outcomes, staffing, and accountability.", completed: false },
        { id: "data-collection", title: "Red Flags to Watch For", summary: "Learn how to spot weak proposals, vague claims, and fake expertise early.", completed: false },
        { id: "data-cleaning", title: "How to Run a Safe Pilot First", summary: "Structure a pilot so you learn something useful before committing to a bigger rollout.", completed: false },
        { id: "preprocessing", title: "Build, Buy, or Partner?", summary: "Choose the best path based on your time, internal skills, and long-term ownership goals.", completed: false },
        { id: "feature-engineering", title: "Understanding AI Pricing", summary: "Break down retainers, usage fees, fixed-fee projects, and change-order risk in plain language.", completed: false },
        { id: "module-quiz", title: "Vendor Diligence Checkpoint", summary: "Pressure-test your ability to evaluate an agency proposal with confidence.", completed: false },
      ],
    },
    // Position 5
    {
      id: "module-5",
      slug: "module-5",
      title: "Module 5: Measuring AI Results",
      description: "Track value, compare opportunities, and report progress with clear metrics that beginners can actually use.",
      sections: [
        { id: "module-overview", title: "A Simple Way to Measure Impact", summary: "Set up a practical way to estimate, track, and confirm whether AI is helping.", completed: false },
        { id: "roi-basics", title: "Easy ROI Methods to Start With", summary: "Use simple baseline, improvement, and time-saved methods to estimate value more clearly.", completed: false },
        { id: "effectiveness-metrics", title: "Comparing Ideas by Value and Effort", summary: "Rank opportunities by usefulness, effort, and confidence so you know what to try first.", completed: false },
        { id: "roi-calculation", title: "Planning a Balanced Budget", summary: "Build a simple mix of quick wins and longer bets without overcommitting too early.", completed: false },
        { id: "misleading-metrics", title: "Metrics That Can Mislead You", summary: "Avoid numbers that look impressive but do not prove real improvement.", completed: false },
        { id: "adoption-framework", title: "Reporting Progress Clearly", summary: "Share results, risks, and assumptions in a way that is honest and easy to understand.", completed: false },
        { id: "module-quiz", title: "ROI Decision Checkpoint", summary: "Validate your ability to defend AI investments with business-first evidence.", completed: false },
      ],
    },
    // Position 6
    {
      id: "module-6",
      slug: "module-6",
      title: "Module 6: Keeping AI Safe and Responsible",
      description: "Use simple rules and safeguards for data, vendors, and day-to-day AI use so you can adopt with more confidence.",
      sections: [
        { id: "module-overview", title: "Your Basic Safety Baseline", summary: "Set the minimum rules and controls you want in place before expanding AI use.", completed: false },
        { id: "ai-bias", title: "Mistakes, Hallucinations, and Human Review", summary: "Learn when people should double-check AI output and when extra oversight is essential.", completed: false },
        { id: "privacy-data", title: "Protecting Data and Privacy", summary: "Apply simple controls for sensitive data, access limits, and vendor handling rules.", completed: false },
        { id: "misinformation", title: "Handling Bad Output and Incidents", summary: "Prepare for harmful responses, public mistakes, and the actions your team should take next.", completed: false },
        { id: "responsible-ai", title: "Creating a Simple Internal AI Policy", summary: "Write clear guidance for who can use AI, how they can use it, and when to ask for help.", completed: false },
        { id: "ethical-dilemmas", title: "Vendor Risks, IP, and Contract Basics", summary: "Understand the contract points that protect your data, content, and responsibilities.", completed: false },
        { id: "risk-reflection", title: "A Simple Risk Scorecard", summary: "Use a lightweight scorecard to keep an eye on safety as adoption grows.", completed: false },
        { id: "module-quiz", title: "Governance Checkpoint", summary: "Confirm your readiness to deploy AI responsibly at organization scale.", completed: false },
      ],
    },
    // Position 7
    {
      id: "module-7",
      slug: "module-7",
      title: "Module 7: Building Your AI Adoption Roadmap",
      description: "Turn early ideas into a step-by-step plan with pilots, team support, and realistic rollout milestones.",
      sections: [
        { id: "module-overview", title: "What a Good Roadmap Looks Like", summary: "Design a practical rollout path that matches your goals, timing, and team capacity.", completed: false },
        { id: "ai-in-the-workplace", title: "How to Start: First 30 Days", summary: "Launch a focused start plan with scope, review cadence, and early proof points.", completed: false },
        { id: "ai-and-jobs", title: "Choosing the Right Pilot Projects", summary: "Pick pilots that are useful enough to matter and small enough to run well.", completed: false },
        { id: "industry-applications", title: "Helping Teams Through the Change", summary: "Reduce resistance with clearer roles, practical training, and steady communication.", completed: false },
        { id: "ai-strategy", title: "Finding Your Internal AI Champions", summary: "Build a group of helpers across teams who can support adoption and good habits.", completed: false },
        { id: "real-workflows", title: "Choosing What to Roll Out First", summary: "Sequence your initiatives so people are not overloaded and progress stays manageable.", completed: false },
        { id: "ai-opportunities", title: "Tracking Your AI Maturity", summary: "See how your organization can grow from early experiments to more confident, repeatable use.", completed: false },
        { id: "role-transformation", title: "Adjusting Roles and Processes", summary: "Update responsibilities, workflows, and decision points as AI becomes part of daily work.", completed: false },
        { id: "workflow-redesign", title: "Setting a Review Rhythm", summary: "Create a regular cadence for checking progress, risk, and what to do next.", completed: false },
        { id: "building-ai-skills", title: "Planning Beyond the First Few Months", summary: "Build a 12-month plan that combines early wins with longer-term skill and process growth.", completed: false },
        { id: "module-quiz", title: "Roadmap Checkpoint", summary: "Demonstrate a realistic, sequenced plan your team can execute.", completed: false },
      ],
    },
    // Position 8
    {
      id: "module-8",
      slug: "module-8",
      title: "Module 8: AI Agents and Automation Basics",
      description: "Understand what agents can really do, where simpler workflows work better, and how to automate safely.",
      sections: [
        { id: "module-overview", title: "A Reality Check on AI Agents", summary: "Understand what counts as an agent, what is just a workflow, and why the difference matters.", completed: false },
        { id: "what-are-agents", title: "Workflows vs. Real Agents", summary: "Match the problem to the right setup so you do not add more complexity than you need.", completed: false },
        { id: "how-agents-work", title: "When Humans Should Stay in the Loop", summary: "Place review steps and escalation paths wherever mistakes could cause real harm.", completed: false },
        { id: "types-of-agents", title: "Picking Automation Platforms", summary: "Compare automation tools by visibility, reliability, and ease of upkeep.", completed: false },
        { id: "real-world-applications", title: "What Can Be Automated Right Now?", summary: "Use real-world limits to decide what is practical today and what is not.", completed: false },
        { id: "building-with-agents", title: "When Simpler Automation Beats Agent Hype", summary: "See when a basic workflow is better than a more complicated multi-agent setup.", completed: false },
        { id: "risks-and-limits", title: "Your Automation Blueprint", summary: "Build a practical rollout plan with ownership, monitoring, and a way to recover from failures.", completed: false },
        { id: "module-quiz", title: "Automation Design Checkpoint", summary: "Validate your ability to design automation with control, resilience, and ROI.", completed: false },
      ],
    },
    // Position 9
    {
      id: "module-9",
      slug: "module-9",
      title: "Module 9: Building a Simple AI Stack",
      description: "Choose a manageable mix of tools that stays useful, affordable, and easy for your team to own.",
      sections: [
        { id: "module-overview", title: "What a Good AI Stack Looks Like", summary: "Learn the simple design principles behind a useful, maintainable, and cost-aware tool stack.", completed: false },
        { id: "explain-ai", title: "How to Avoid Tool Sprawl", summary: "Prevent duplicate tools and messy ownership before your stack becomes hard to manage.", completed: false },
        { id: "tool-selection", title: "Choosing Tools That Fit Together", summary: "Pick tools and integrations that reduce manual work instead of adding more of it.", completed: false },
        { id: "prompting-assistants", title: "When to Consolidate Vendors", summary: "Simplify your stack where it makes sense without giving up flexibility you still need.", completed: false },
        { id: "risk-check", title: "Simple Buying Rules and Controls", summary: "Use a repeatable checklist for legal, security, and operational approval.", completed: false },
        { id: "ai-workflows", title: "Keeping the Stack Manageable Over Time", summary: "Plan who maintains the tools, reviews changes, and supports the teams using them.", completed: false },
        { id: "ai-project", title: "Who Owns What Internally?", summary: "Clarify who owns strategy, tooling, day-to-day operations, and results.", completed: false },
        { id: "next-steps", title: "Your Stack Plan and Next Steps", summary: "Finish with a simple stack plan, clear priorities, named owners, and next actions.", completed: false },
        { id: "module-quiz", title: "Stack Strategy Checkpoint", summary: "Validate your ability to design a maintainable AI stack with clear ownership, controls, and consolidation logic.", completed: false },
      ],
    },
    // Position 10
    {
      id: "module-10",
      slug: "module-10",
      title: "Module 10: Preparing for the Future of AI",
      description: "Follow the big AI changes that matter and decide how your team should adapt over time.",
      sections: [
        { id: "module-overview", title: "Which Future Signals Matter Most?", summary: "Focus on the changes that are likely to affect real work and ignore distracting speculation.", completed: false },
        { id: "current-frontiers", title: "What Happens as Models Get Cheaper?", summary: "Understand how lower model costs can change tools, vendors, and competition.", completed: false },
        { id: "agi-explained", title: "How AI Services and Agencies May Change", summary: "Look at how outside help may evolve as tools improve and clients expect more.", completed: false },
        { id: "ai-governance", title: "How AI Could Change the Way Teams Operate", summary: "Explore how companies may redesign workflows, decisions, and speed as AI becomes more common.", completed: false },
        { id: "ai-careers", title: "What This Means for Teams and Roles", summary: "Plan for role changes, new skills, and shifting expectations as AI becomes part of daily work.", completed: false },
        { id: "your-ai-future", title: "Your Long-Term AI Plan", summary: "Build a practical long-range plan for where to focus, partner, and improve over time.", completed: false },
        { id: "module-quiz", title: "Future Strategy Checkpoint", summary: "Validate your ability to make forward-looking AI decisions with strategic clarity.", completed: false },
      ],
    },
  ],
}

export function getCourseStructure(): CourseStructure {
  return courseStructure
}
