/**
 * Comprehensive mapping of course components to detailed educational explanations.
 * Each component in every module has a unique explanation that deepens understanding
 * of why that specific element is there and how to engage with it effectively.
 */

import { courseStructure } from "@/lib/course-structure"

export interface ComponentExplanation {
  id: string
  question: string
  explanation: string
}

export const COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> = {
  // MODULE 0: Welcome to AI
  "m0-hero": {
    id: "m0-hero",
    question: "I'm confused about this part: 'Modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight...' Could you unpack this in plain language and include one real-world example? (Focus: m0-hero)",
    explanation: `m0-hero framing: In AI practice, "Modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight..." should be read as a decision prompt with explicit criteria.

m0-hero reasoning depth: modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight in real work.

m0-hero next action: test AI output tied to "Modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight..." with one metric, one risk check, and one fallback.`,
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
    explanation: `m1-hero decision lens: In AI execution, "AI adoption decisions improve when teams distinguish models, tools, automations, and agents instead of treating everything as one category." is a trigger to verify assumptions explicitly.

m1-hero decision depth: m1-hero adoption meaning: Operational implication: aI adoption decisions improve when teams distinguish models, tools, automations, and agents instead of treating everything as one category.

m1-hero next action: for "AI adoption decisions improve when teams distinguish models, tools, automations, and agents instead of treating everything as one category.", assign human ownership for approving or rejecting AI-supported outputs.`,
  },

  "m1-module-overview-check": {
    id: "m1-module-overview-check",
    question: "I'm confused about this part: 'Practical AI literacy begins with strong definitions and mental models, not buzzwords or premature technical depth.' Can you decode this with a concrete scenario I might face at work? (Focus: m1-module-overview-check)",
    explanation: `m1-module-overview-check concept-to-action view: "Practical AI literacy begins with strong definitions and mental models, not buzzwords or premature technical depth." translates AI theory into accountable choices.

m1-module-overview-check implementation depth: m1-module-overview-check governance angle: Why this improves AI judgment: practical AI literacy begins with strong definitions and mental models, not buzzwords or premature technical depth.

m1-module-overview-check next action: use "Practical AI literacy begins with strong definitions and mental models, not buzzwords or premature technical depth." to decide which AI steps are automatable and which remain judgment-heavy.`,
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
    explanation: `m1-choosing-tools strategic interpretation: "For day-to-day adoption capstone section in the applications section teaches decision-making frameworks." in AI work supports repeatable, defensible decisions.

m1-choosing-tools synthesis depth: m1-choosing-tools evaluation cue: Actionable meaning: for day-to-day adoption capstone section in the applications section teaches decision-making frameworks.

m1-choosing-tools next action: for "For day-to-day adoption capstone section in the applications section teaches decision-making frameworks.", choose one low-risk AI use case and one non-negotiable safeguard.`,
  },

  "m1-quiz": {
    id: "m1-quiz",
    question: "I'm confused about this part: 'Separating AI categories and claims under ambiguity is the first real test of AI literacy.' Could you unpack this in plain language and include one real-world example? (Focus: m1-quiz)",
    explanation: `m1-quiz framing: In AI practice, "Separating AI categories and claims under ambiguity is the first real test of AI literacy." should be read as a decision prompt with explicit criteria.

m1-quiz reasoning depth: separating AI categories and claims under ambiguity is the first real test of AI literacy.

m1-quiz next action: test AI output tied to "Separating AI categories and claims under ambiguity is the first real test of AI literacy." with one metric, one risk check, and one fallback.`,
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
    explanation: `m3-module-overview realistic interpretation: In AI practice, "You will learn what an LLM is, how ChatGPT generates responses token by token, and how to structure prompts that produce reliable, high-quality..." emphasizes tradeoffs over hype.

m3-module-overview operational depth: m3-module-overview mechanism check: Mechanism-level takeaway: you will learn what an LLM is, how ChatGPT generates responses token by token, and how to structure prompts that produce reliable, high-quality outputs.

m3-module-overview next action: for "You will learn what an LLM is, how ChatGPT generates responses token by token, and how to structure prompts that produce reliable, high-quality...", establish a repeatable AI evaluation routine with traceable evidence.`,
  },

  "m3-hero": {
    id: "m3-hero",
    question: "I'm confused about this part: 'Tool selection quality depends on fit, risk, and workflow impact, not launch buzz or feature count.' Could you simplify this and contrast a good vs bad way to interpret it? (Focus: m3-hero)",
    explanation: `m3-hero execution framing: "Tool selection quality depends on fit, risk, and workflow impact, not launch buzz or feature count." indicates where AI can help and where human review must remain.

m3-hero strategic depth: m3-hero operational takeaway: Implementation lens: tool selection quality depends on fit, risk, and workflow impact, not launch buzz or feature count.

m3-hero next action: translate "Tool selection quality depends on fit, risk, and workflow impact, not launch buzz or feature count." into prompt constraints that reduce ambiguous AI behavior.`,
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
    explanation: `m3-quiz workflow reading: "Reliable prompting depends on controlling context, constraints, examples, and evaluation criteria rather than guessing until something works." identifies a step where AI output must be evaluated, not copied.

m3-quiz model depth: m3-quiz capability note: Workflow consequence: reliable prompting depends on controlling context, constraints, examples, and evaluation criteria rather than guessing until something works.

m3-quiz next action: convert "Reliable prompting depends on controlling context, constraints, examples, and evaluation criteria rather than guessing until something works." into a risk-weighted AI decision protocol for your workflow.`,
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
    question: "I'm confused about this part: 'Writing assistance has evolved from spell-check to generating entire paragraphs.' Could you unpack this in plain language and include one real-world example? (Focus: m4-writing-tools)",
    explanation: `m4-writing-tools framing: In AI practice, "Writing assistance has evolved from spell-check to generating entire paragraphs." should be read as a decision prompt with explicit criteria.

m4-writing-tools reasoning depth: writing assistance has evolved from spell-check to generating entire paragraphs.

m4-writing-tools next action: test AI output tied to "Writing assistance has evolved from spell-check to generating entire paragraphs." with one metric, one risk check, and one fallback.`,
  },

  "m4-image-tools": {
    id: "m4-image-tools",
    question: "I'm confused about this part: 'Image generation tools let you create visuals from text descriptions. The capability is impressive, but understanding what it actually does-learning...' What is the core idea here, and how would you teach it to a beginner? (Focus: m4-image-tools)",
    explanation: `m4-image-tools translation: For AI work, "Image generation tools let you create visuals from text descriptions. The capability is impressive, but understanding what it actually does-learning..." is a cue to connect concept understanding to concrete choices.

m4-image-tools practical depth: m4-image-tools reasoning layer: image generation tools let you create visuals from text descriptions. Treat

m4-image-tools next action: for "Image generation tools let you create visuals from text descriptions. The capability is impressive, but understanding what it actually does-learning...", validate a core assumption before AI output informs any real decision.`,
  },

  "m4-productivity-tools": {
    id: "m4-productivity-tools",
    question: "I'm confused about this part: 'AI productivity tools include code generation, research summarization, email drafting, and more.' Can you translate this into everyday language and show why it matters? (Focus: m4-productivity-tools)",
    explanation: `m4-productivity-tools plain-language view: "AI productivity tools include code generation, research summarization, email drafting, and more." marks an AI judgment moment, not just a vocabulary check.

m4-productivity-tools mechanism depth: m4-productivity-tools practical meaning: aI productivity tools include code generation, research summarization, email drafting, and more.

m4-productivity-tools next action: map "AI productivity tools include code generation, research summarization, email drafting, and more." to a small AI pilot, then compare benefit, effort, and failure risk.`,
  },

  "m4-quiz": {
    id: "m4-quiz",
    question: "I'm confused about this part: 'Tool selection improves when you compare tasks by risk, privacy, speed, and review burden instead of by brand familiarity.' Could you restate this without jargon and highlight the practical takeaway? (Focus: m4-quiz)",
    explanation: `m4-quiz core reading: Within AI workflows, "Tool selection improves when you compare tasks by risk, privacy, speed, and review burden instead of by brand familiarity." means reasoning quality matters as much as output speed.

m4-quiz risk depth: m4-quiz execution view: Reasoning behind the point: tool selection improves when you compare tasks by risk, privacy, speed, and review burden instead of by brand familiarity.

m4-quiz next action: use "Tool selection improves when you compare tasks by risk, privacy, speed, and review burden instead of by brand familiarity." to set review gates so AI drafts and final decisions stay separated.`,
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

m7-workplace-ai next action: test AI output tied to "A radiologist with an AI diagnostic tool is more effective than one without." with one metric, one risk check, and one fallback.`,
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

m4-feature-engineering next action: test AI output tied to "AI partner pricing becomes predictable when teams separate fixed scope fees, variable usage costs, and change-order exposure." with one metric, one risk check, and one fallback.`,
  },

  // MODULE 5 (actual): Evaluating the Business Impact of AI
  "m5-module-overview": {
    id: "m5-module-overview",
    question: "I'm confused about this part: 'At this stage module teaches a practical approach to evaluating whether AI tools are worth adopting.' What is the core idea here, and how would you teach it to a beginner? (Focus: m5-module-overview)",
    explanation: `m5-module-overview translation: For AI work, "At this stage module teaches a practical approach to evaluating whether AI tools are worth adopting." is a cue to connect concept understanding to concrete choices.

m5-module-overview practical depth: m5-module-overview reasoning layer: at this stage module teaches a practical approach to evaluating whether AI tools are worth adopting. Treat

m5-module-overview next action: for "At this stage module teaches a practical approach to evaluating whether AI tools are worth adopting.", validate a core assumption before AI output informs any real decision.`,
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
    question: "I'm confused about this part: 'Effective AI measurement focuses on outcome metrics linked to business goals: conversion, cycle time, error rate, quality consistency, and risk...' What does this actually mean in practice, and when should I apply it? (Focus: m5-effectiveness)",
    explanation: `m5-effectiveness interpretation: In an AI context, "Effective AI measurement focuses on outcome metrics linked to business goals: conversion, cycle time, error rate, quality consistency, and risk..." asks for evidence-aware decision making.

m5-effectiveness execution depth: m5-effectiveness decision context: Practical significance: effective AI measurement focuses on outcome metrics linked to business goals: conversion, cycle time, error rate, quality consistency, and risk reduction.

m5-effectiveness next action: for "Effective AI measurement focuses on outcome metrics linked to business goals: conversion, cycle time, error rate, quality consistency, and risk...", document what evidence raises trust and what evidence lowers trust in AI.`,
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
    question: "I'm confused about this part: 'AI adoption should follow structured evaluation criteria: expected impact, security fit, integration effort, team readiness, reliability, and time to...' Could you simplify this and point out the most important decision it affects? (Focus: m5-adoption)",
    explanation: `m5-adoption applied meaning: "AI adoption should follow structured evaluation criteria: expected impact, security fit, integration effort, team readiness, reliability, and time to..." signals that AI value depends on mechanism, context, and safeguards.

m5-adoption oversight depth: m5-adoption risk context: Applied interpretation: aI adoption should follow structured evaluation criteria: expected impact, security fit, integration effort, team readiness, reliability, and time to measurable value.

m5-adoption next action: turn "AI adoption should follow structured evaluation criteria: expected impact, security fit, integration effort, team readiness, reliability, and time to..." into an AI checklist covering context, constraints, and safety.`,
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
    question: "I'm confused about this part: 'The m7-module-overview context topic module connects AI capability to practical business and career contexts: how AI is already changing workplaces,...' Could you explain the intent behind this and the mistake it helps avoid? (Focus: m7-module-overview)",
    explanation: `m7-module-overview operational reading: "The m7-module-overview context topic module connects AI capability to practical business and career contexts: how AI is already changing workplaces,..." frames AI output as input to judgment, not a final verdict.

m7-module-overview evaluation depth: m7-module-overview learning takeaway: Use-case relevance: the m7-module-overview context topic module connects AI capability to practical business and career contexts: how AI is already changing workplaces, which jobs and industries are affected first, how to build an AI strategy, and how to redesign workflows with AI assistance.

m7-module-overview next action: evaluate "The m7-module-overview context topic module connects AI capability to practical business and career contexts: how AI is already changing workplaces,..." with a pre-mortem so AI failure modes are explicit early.`,
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
    question: "I'm confused about this part: 'Redesigning workflows with AI means identifying which steps benefit from automation or assistance, adding appropriate verification steps, and...' How would you explain this if you only had 30 seconds? (Focus: m7-workflow-redesign)",
    explanation: `m7-workflow-redesign quality framing: For AI decisions, "Redesigning workflows with AI means identifying which steps benefit from automation or assistance, adding appropriate verification steps, and..." requires clearer standards before action.

m7-workflow-redesign learning depth: m7-workflow-redesign implementation meaning: Risk-aware reading: redesigning workflows with AI means identifying which steps benefit from automation or assistance, adding appropriate verification steps, and building feedback loops that catch errors before they compound.

m7-workflow-redesign next action: for "Redesigning workflows with AI means identifying which steps benefit from automation or assistance, adding appropriate verification steps, and...", compare AI recommendations against a non-AI baseline before adoption.`,
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

m8-building-agents next action: test AI output tied to "Building agent systems requires choosing a framework (LangChain, AutoGen, CrewAI), defining tools the agent can call, designing prompts that guide..." with one metric, one risk check, and one fallback.`,
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
    question: "I'm confused about this part: 'The m9-module-overview context topic capstone module synthesises everything into practical judgment: how to explain AI to others, how to choose the...' Can you translate this into everyday language and show why it matters? (Focus: m9-module-overview)",
    explanation: `m9-module-overview plain-language view: "The m9-module-overview context topic capstone module synthesises everything into practical judgment: how to explain AI to others, how to choose the..." marks an AI judgment moment, not just a vocabulary check.

m9-module-overview mechanism depth: m9-module-overview practical meaning: the m9-module-overview context topic capstone module synthesises everything into practical judgment: how to explain AI to others, how to choose the right tool for a task, how to prompt the major models, how to apply safety checks, and how to build simple AI workflows.

m9-module-overview next action: map "The m9-module-overview context topic capstone module synthesises everything into practical judgment: how to explain AI to others, how to choose the..." to a small AI pilot, then compare benefit, effort, and failure risk.`,
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
    question: "I'm confused about this part: 'An AI workflow is a repeatable sequence of steps where AI assists with one or more stages.' Could you simplify this and point out the most important decision it affects? (Focus: m9-workflows)",
    explanation: `m9-workflows applied meaning: "An AI workflow is a repeatable sequence of steps where AI assists with one or more stages." signals that AI value depends on mechanism, context, and safeguards.

m9-workflows oversight depth: m9-workflows risk context: Applied interpretation: an AI workflow is a repeatable sequence of steps where AI assists with one or more stages.

m9-workflows next action: turn "An AI workflow is a repeatable sequence of steps where AI assists with one or more stages." into an AI checklist covering context, constraints, and safety.`,
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

m0-reality-check-stat-3 next action: test AI output tied to "AI is not changing one industry; it" with one metric, one risk check, and one fallback.`,
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

Apply this model to other AI tools: accept predictions as decision support, then add a lightweight contingency plan. For example, choose a recommended route but keep a fallback threshold for switching if conditions diverge from expected timing.`,
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

m0-learning-system next action: test AI output tied to "The m0-learning-system focus lesson lesson element introduces the three pillars of effective AI learning in this course: Time (short, consistent..." with one metric, one risk check, and one fallback.`,
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

m1-prompting-challenge next action: test AI output tied to "You" with one metric, one risk check, and one fallback.`,
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
      const moduleEntries = module.sections.flatMap((section) => {
        const baseId = `${module.id}-${section.id}`
        const summary = section.summary ?? `${section.title} in ${module.title}.`
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
          explanation: `Direct answer: This module quiz checks whether you can apply the core reasoning of ${module.title} under ambiguity.\n\nWhy this matters: ${module.description ?? module.title}\n\nHow to apply it: Identify the claim, map it to the module principle, and choose the option with the strongest evidence and lowest avoidable risk.`,
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

  return /[.!?]$/.test(compact) ? compact : `${compact}.`
}

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
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

  const questionCore = trimmedQuestion.split("?")[0] ?? trimmedQuestion
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
      moduleDescription: normalizeSentence(module.description ?? module.title),
      sectionTitle: section.title,
      sectionSummary: normalizeSentence(section.summary ?? `${section.title} matters in ${module.title}.`),
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
    moduleDescription: normalizeSentence(module.description ?? module.title),
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



