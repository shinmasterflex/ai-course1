export type SectionLearningContent = string

type CardKnowledgeEntry = {
  id: string
  moduleId: string
  sectionId: string
  cardType: "section-card" | "manual-explainer"
  content: SectionLearningContent | null
  summary: string | null
  question: string | null
  explanation: string | null
}

type ModuleBlueprint = {
  title: string
  description: string
  coreThemes: string[]
}

const MODULE_BLUEPRINTS: Record<string, ModuleBlueprint> = {
  "module-0": {
    title: "Module 0: The AI Shift",
    description: "Separate hype from reality and define your leadership posture.",
    coreThemes: [],
  },
  "module-1": {
    title: "Module 1: AI Landscape",
    description: "Models, tools, agencies, and delivery models mapped for decisions.",
    coreThemes: [],
  },
  "module-2": {
    title: "Module 2: Business Value",
    description: "Find high-ROI use cases and prioritize opportunities with confidence.",
    coreThemes: [],
  },
  "module-3": {
    title: "Module 3: Tools That Matter",
    description: "Evaluate tool categories, integration fit, pricing, and security.",
    coreThemes: [],
  },
  "module-4": {
    title: "Module 4: Agency and Partner Selection",
    description: "Run vendor diligence and structure pilots that produce real evidence.",
    coreThemes: [],
  },
  "module-5": {
    title: "Module 5: ROI Frameworks",
    description: "Build credible ROI models, prioritization matrices, and reporting.",
    coreThemes: [],
  },
  "module-6": {
    title: "Module 6: Risk and Governance",
    description: "Implement guardrails for data, reliability, compliance, and vendors.",
    coreThemes: [],
  },
  "module-7": {
    title: "Module 7: Adoption Roadmap",
    description: "Translate strategy into pilots, change management, and phased rollout.",
    coreThemes: [],
  },
  "module-8": {
    title: "Module 8: Agents and Automation Systems",
    description: "Design practical automation with human oversight and operational control.",
    coreThemes: [],
  },
  "module-9": {
    title: "Module 9: AI Stack Design",
    description: "Avoid tool sprawl and build a maintainable, owned AI ecosystem.",
    coreThemes: [],
  },
  "module-10": {
    title: "Module 10: Future Positioning",
    description: "Anticipate industry shifts and position for durable AI advantage.",
    coreThemes: [],
  },
}

const CARD_KNOWLEDGE_REGISTRY_BY_ID: Record<string, CardKnowledgeEntry> = {

  // ─────────────────────────────────────────────
  // MODULE 0 — The AI Shift: What's Actually Happening
  // ─────────────────────────────────────────────

  "module-0-welcome": {
    id: "module-0-welcome",
    moduleId: "module-0",
    sectionId: "welcome",
    cardType: "section-card",
    content: "Welcome to The AI Shift. This course is designed for business leaders, operators, and decision-makers who need a realistic, no-hype understanding of what AI means for their organizations. You won't find speculation or sci-fi here — just practical frameworks for navigating one of the most significant operational shifts in modern business.",
    summary: "This course equips leaders with a grounded, practical understanding of AI's impact on business operations.",
    question: null,
    explanation: null,
  },

  "module-0-ai-is-everywhere": {
    id: "module-0-ai-is-everywhere",
    moduleId: "module-0",
    sectionId: "ai-is-everywhere",
    cardType: "section-card",
    content: "AI is no longer a future trend — it's already embedded in business tools you use daily: CRM systems, email platforms, hiring software, financial models, and customer support. The question isn't whether AI will affect your industry. It already has. The question is whether your organization is positioned to benefit from it or fall behind.",
    summary: "AI is already embedded in mainstream business tools and workflows, making organizational readiness a present-day imperative.",
    question: "Which of the following best describes AI's current state in business?",
    explanation: "AI is not a future technology waiting to arrive — it is already integrated into everyday enterprise software. Leaders who treat it as a 'future consideration' are likely already behind competitors who have operationalized it.",
  },

  "module-0-what-youll-learn": {
    id: "module-0-what-youll-learn",
    moduleId: "module-0",
    sectionId: "what-youll-learn",
    cardType: "section-card",
    content: "Over 10 modules, you will learn how to evaluate AI tools, build governance frameworks, calculate ROI, design adoption roadmaps, assess vendor claims, identify high-value automation opportunities, and position your organization strategically as AI capabilities evolve. Each module is grounded in operational reality — not theory.",
    summary: "The course covers AI tools, ROI measurement, governance, vendor evaluation, and strategic positioning across 10 modules.",
    question: null,
    explanation: null,
  },

  "module-0-how-to-use-course": {
    id: "module-0-how-to-use-course",
    moduleId: "module-0",
    sectionId: "how-to-use-course",
    cardType: "section-card",
    content: "Each module contains concept cards, knowledge checks, and applied frameworks you can use immediately. Move at your own pace. Prioritize modules most relevant to your current role or decision-making context. The course is designed for non-linear use — if you're facing an immediate AI procurement decision, jump to Module 4. If governance is your urgent challenge, start with Module 6.",
    summary: "The course is designed for flexible, non-linear use — learners should prioritize modules relevant to their immediate business challenges.",
    question: null,
    explanation: null,
  },

  "module-0-summary": {
    id: "module-0-summary",
    moduleId: "module-0",
    sectionId: "summary",
    cardType: "section-card",
    content: "AI represents a genuine operational and competitive shift — not another technology hype cycle. Organizations that develop a structured, realistic approach to AI adoption will build durable advantages. Those that react slowly, chase trends, or misunderstand the fundamentals will face compounding disadvantages. This course gives you the frameworks to act with clarity.",
    summary: "AI is a structural business shift requiring clear frameworks — not hype-chasing or reactive adoption.",
    question: "What distinguishes companies that successfully adopt AI from those that don't?",
    explanation: "Successful AI adoption isn't primarily about having the newest tools. It comes from having a structured approach: clear use case identification, realistic ROI expectations, proper governance, and intentional change management. Most failures stem from misunderstanding the fundamentals — not from lack of access to technology.",
  },

  // ─────────────────────────────────────────────
  // MODULE 1 — Understanding the AI Landscape
  // ─────────────────────────────────────────────

  "module-1-module-overview-section-card": {
    id: "module-1-module-overview-section-card",
    moduleId: "module-1",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module cuts through AI marketing language to give you a working map of the actual AI industry. You'll learn how the ecosystem is structured — from foundational model providers to SaaS wrappers to implementation agencies — so you can make informed decisions about which layers matter for your organization.",
    summary: "Module 1 builds a practical map of the AI ecosystem beneath the marketing language.",
    question: null,
    explanation: null,
  },

  "module-1-defining-ai-section-card": {
    id: "module-1-defining-ai-section-card",
    moduleId: "module-1",
    sectionId: "defining-ai",
    cardType: "section-card",
    content: "Artificial Intelligence refers to software systems that perform tasks typically requiring human judgment — pattern recognition, language understanding, decision-making, and prediction. Modern AI is primarily powered by machine learning: systems trained on large datasets to identify patterns rather than following hand-written rules. 'AI' is a broad umbrella — most business-relevant AI today falls into a subset called generative AI and predictive ML.",
    summary: "AI is software that performs judgment-like tasks through pattern recognition, primarily powered by machine learning.",
    question: "What is the primary mechanism behind most modern business AI systems?",
    explanation: "Modern AI doesn't follow explicit rules written by programmers. Instead, it learns patterns from massive datasets through a process called machine learning. This distinction matters operationally — it means AI systems can be wrong in unpredictable ways, require quality training data, and behave differently as inputs change.",
  },

  "module-1-brief-history": {
    id: "module-1-brief-history",
    moduleId: "module-1",
    sectionId: "brief-history",
    cardType: "section-card",
    content: "AI has existed as a research field since the 1950s, but practical business applications only accelerated dramatically after 2017 with the invention of the Transformer architecture. This breakthrough enabled large language models (LLMs) like GPT, Claude, and Gemini. The release of ChatGPT in late 2022 brought generative AI into mainstream business consciousness — compressing what might have been a decade of adoption into two years.",
    summary: "The 2017 Transformer breakthrough and 2022 ChatGPT release compressed AI's business adoption timeline dramatically.",
    question: "What architectural breakthrough enabled the current wave of large language models?",
    explanation: "The Transformer architecture, introduced in the 2017 paper 'Attention Is All You Need,' revolutionized how AI models process sequences of data — especially language. This enabled training on vastly larger datasets with dramatically better results, leading directly to GPT, Claude, Gemini, and the current generative AI wave.",
  },

  "module-1-types-of-ai-section-card": {
    id: "module-1-types-of-ai-section-card",
    moduleId: "module-1",
    sectionId: "types-of-ai",
    cardType: "section-card",
    content: "Business-relevant AI falls into several categories: (1) Generative AI — creates text, images, code, audio; (2) Predictive ML — forecasts outcomes from historical data; (3) Computer Vision — analyzes images and video; (4) Speech AI — transcribes and synthesizes audio; (5) Robotic Process Automation (RPA) — automates rule-based digital tasks. Most enterprise 'AI' projects combine multiple categories. Understanding which type solves which problem prevents expensive mismatches.",
    summary: "Business AI includes generative, predictive, vision, speech, and automation categories — each suited to different operational problems.",
    question: "A company wants to predict which customers are likely to churn next month. Which type of AI is most appropriate?",
    explanation: "Churn prediction is a classic predictive ML problem — the system is trained on historical customer behavior patterns and learns to predict future outcomes. Generative AI (like ChatGPT) is designed to produce content, not predict structured outcomes from data. Using the wrong AI category is one of the most common and expensive enterprise mistakes.",
  },

  "module-1-ai-in-your-life": {
    id: "module-1-ai-in-your-life",
    moduleId: "module-1",
    sectionId: "ai-in-your-life",
    cardType: "section-card",
    content: "You interact with AI systems constantly without recognizing them: spam filters, recommendation engines, fraud detection, search ranking, GPS route optimization, autocomplete, and facial recognition are all AI. This ubiquity is important context — AI is not a single product but a class of approaches embedded across digital infrastructure. The 'new' wave of generative AI sits on top of this existing foundation.",
    summary: "AI is already ubiquitous in daily digital life — generative AI is the newest visible layer of a much broader existing infrastructure.",
    question: null,
    explanation: null,
  },

  "module-1-ai-writing": {
    id: "module-1-ai-writing",
    moduleId: "module-1",
    sectionId: "ai-writing",
    cardType: "section-card",
    content: "AI writing tools (ChatGPT, Claude, Gemini, Jasper, Copy.ai) generate text from prompts. Business applications include drafting emails, summarizing documents, creating marketing copy, generating reports, and synthesizing research. Key limitations: AI writing requires human review for accuracy, can produce confident-sounding errors (hallucinations), and may reflect training data biases. Best used as a drafting accelerator, not a final publisher.",
    summary: "AI writing tools accelerate drafting but require human review — they produce confident errors and should not publish autonomously.",
    question: "What is the primary risk of using AI-generated content without human review?",
    explanation: "AI writing tools are prone to 'hallucinations' — confidently stated information that is factually incorrect. This is a fundamental limitation of how LLMs work: they predict likely text, not verified truth. In business contexts, unreviewed AI output can create legal exposure, reputation damage, and misinformation. Human review is non-negotiable for any consequential content.",
  },

  "module-1-ai-images": {
    id: "module-1-ai-images",
    moduleId: "module-1",
    sectionId: "ai-images",
    cardType: "section-card",
    content: "AI image generation tools (Midjourney, DALL-E, Stable Diffusion, Firefly) create images from text descriptions. Business uses include marketing assets, concept visualization, product mockups, and presentation graphics. Key considerations: IP ownership of AI-generated images is legally unsettled in many jurisdictions, outputs may contain biases from training data, and brand consistency requires careful prompting and curation.",
    summary: "AI image tools have real marketing utility but carry unsettled IP risk and require careful brand governance.",
    question: "What is a key legal consideration when using AI-generated images in commercial contexts?",
    explanation: "The intellectual property status of AI-generated images remains legally contested in most jurisdictions. Questions about who owns the output, whether training on copyrighted images creates liability, and commercial use rights are actively being litigated and legislated. Organizations using AI-generated images commercially should have legal review and monitor regulatory developments.",
  },

  "module-1-ai-productivity": {
    id: "module-1-ai-productivity",
    moduleId: "module-1",
    sectionId: "ai-productivity",
    cardType: "section-card",
    content: "AI productivity tools embed into existing workflows: Microsoft Copilot integrates with Office 365, Google Gemini with Workspace, Notion AI with notes, and Salesforce Einstein with CRM. These embedded tools reduce context-switching and accelerate common tasks like summarization, scheduling, search, and drafting. The productivity ceiling depends on workflow design, not just tool access — most teams underutilize embedded AI by 70–80%.",
    summary: "Embedded AI productivity tools reduce friction in existing workflows, but most teams significantly underutilize them without deliberate workflow redesign.",
    question: "Why do most teams fail to realize significant productivity gains from embedded AI tools?",
    explanation: "Access to AI tools doesn't automatically change how people work. Without deliberate workflow redesign, training, and habit formation, employees use AI for marginal tasks while continuing existing processes unchanged. The organizations that capture substantial productivity gains invest in change management alongside tool deployment.",
  },

  "module-1-ai-creative": {
    id: "module-1-ai-creative",
    moduleId: "module-1",
    sectionId: "ai-creative",
    cardType: "section-card",
    content: "AI creative tools assist with music (Suno, Udio), video (Runway, Pika), design (Adobe Firefly, Canva AI), and voice (ElevenLabs). These tools are genuine force multipliers for small creative teams and individual operators. Enterprise adoption requires governance around brand standards, legal review of outputs, and clear policies on AI disclosure — especially as regulatory frameworks around AI-generated media develop.",
    summary: "AI creative tools multiply creative capacity but require brand governance, legal review, and clear disclosure policies.",
    question: null,
    explanation: null,
  },

  "module-1-myths-vs-reality": {
    id: "module-1-myths-vs-reality",
    moduleId: "module-1",
    sectionId: "myths-vs-reality",
    cardType: "section-card",
    content: "Common AI myths in business: (1) 'AI understands what it's doing' — it predicts patterns, not meaning; (2) 'AI will replace most jobs immediately' — task automation differs from job elimination; (3) 'AI is always objective' — it reflects training data biases; (4) 'More expensive AI is always better' — fit to workflow matters more than raw capability; (5) 'We need to wait for the right moment' — inaction has compounding competitive cost.",
    summary: "Five persistent AI myths distort business decision-making — AI predicts patterns rather than understanding, and workflow fit matters more than raw capability.",
    question: "A manager argues that their AI system is more objective than human decision-makers because 'it's just math.' What is the critical flaw in this reasoning?",
    explanation: "AI systems learn from historical data, which encodes the biases, inequities, and blind spots of past human decisions. An AI trained on biased hiring data will perpetuate hiring bias — often invisibly and at scale. 'Objective' is not an accurate description of any machine learning system trained on human-generated data. Governance frameworks must account for this.",
  },

  "module-1-choosing-tools-section-card": {
    id: "module-1-choosing-tools-section-card",
    moduleId: "module-1",
    sectionId: "choosing-tools",
    cardType: "section-card",
    content: "Choosing AI tools requires matching capability to workflow need, not chasing benchmarks. Key evaluation dimensions: (1) Does it integrate with existing systems? (2) What data does it require, store, or transmit? (3) What are the total cost of ownership implications? (4) How does it handle errors or failures? (5) Is the vendor financially stable? Most tool selection mistakes happen because teams evaluate demos rather than operational fit.",
    summary: "AI tool selection should prioritize workflow fit, integration, data governance, and operational reliability over benchmark performance.",
    question: null,
    explanation: null,
  },

  "module-1-module-quiz": {
    id: "module-1-module-quiz",
    moduleId: "module-1",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Test your understanding of the AI landscape: foundational model providers, tool categories, common myths, and evaluation criteria.",
    summary: "Module 1 knowledge check covering the AI ecosystem, tool categories, and practical evaluation principles.",
    question: "Which of the following best describes the relationship between a foundational model (like GPT-4) and an AI SaaS product built on top of it?",
    explanation: "Most AI SaaS products are 'wrappers' — interfaces and workflow integrations built on top of foundational models provided by companies like OpenAI, Anthropic, or Google. The underlying intelligence is the foundational model; the SaaS product adds a user interface, integration layer, and domain-specific prompting. This distinction matters for evaluating vendor differentiation and long-term pricing risk.",
  },

  // ─────────────────────────────────────────────
  // MODULE 2 — Where AI Actually Creates Business Value
  // ─────────────────────────────────────────────

  "module-2-module-overview-section-card": {
    id: "module-2-module-overview-section-card",
    moduleId: "module-2",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module focuses on where AI generates measurable operational and financial value. Rather than reviewing technical ML theory, you'll learn to identify high-ROI workflows, recognize operational bottlenecks AI can address, and distinguish between automation (replacing tasks) and augmentation (enhancing human capability). The goal is to help you prioritize intelligently.",
    summary: "Module 2 teaches leaders to identify where AI creates measurable operational value — prioritizing high-ROI workflows over technical curiosity.",
    question: null,
    explanation: null,
  },

  "module-2-what-is-ml-section-card": {
    id: "module-2-what-is-ml-section-card",
    moduleId: "module-2",
    sectionId: "what-is-ml",
    cardType: "section-card",
    content: "Machine learning is the process by which AI systems learn from data rather than following explicit rules. A spam filter isn't programmed with a list of spam words — it's trained on millions of emails labeled spam or not spam, and learns to recognize patterns. This matters operationally because ML systems require quality training data, can degrade over time as data changes, and make probabilistic rather than deterministic decisions.",
    summary: "Machine learning systems learn patterns from data rather than following rules — making data quality and distribution shift critical operational concerns.",
    question: "An ML-based fraud detection system was trained on 2022 transaction data and starts missing new fraud patterns in 2025. What is the most likely cause?",
    explanation: "This is called 'model drift' or 'data drift' — when real-world patterns change in ways not represented in training data, model performance degrades. Fraud patterns evolve continuously as fraudsters adapt. Production ML systems require ongoing monitoring and periodic retraining. This is a core operational cost that many organizations underestimate when deploying ML.",
  },

  "module-2-neural-networks-section-card": {
    id: "module-2-neural-networks-section-card",
    moduleId: "module-2",
    sectionId: "neural-networks",
    cardType: "section-card",
    content: "Neural networks are the architectural foundation of modern AI. Loosely inspired by biological neurons, they consist of layers of mathematical operations that transform inputs into outputs. Deep learning refers to neural networks with many layers — 'deep' describes depth, not sophistication. For business leaders, the key insight is that neural networks learn representations automatically from data, which is why they excel at tasks like image recognition, language understanding, and complex pattern detection.",
    summary: "Neural networks learn data representations automatically through layered mathematical operations — enabling complex pattern recognition without hand-coded rules.",
    question: null,
    explanation: null,
  },

  "module-2-training-data-section-card": {
    id: "module-2-training-data-section-card",
    moduleId: "module-2",
    sectionId: "training-data",
    cardType: "section-card",
    content: "Training data is the foundation of any ML system. The quality, quantity, representativeness, and labeling accuracy of training data determines the ceiling of what an AI system can achieve. Common training data problems: (1) Insufficient volume; (2) Labeling errors; (3) Unrepresentative samples (e.g., only training on data from certain demographics); (4) Historical bias embedded in labels; (5) Data leakage — where test data bleeds into training, creating falsely optimistic performance metrics.",
    summary: "Training data quality determines AI performance ceilings — volume, representativeness, label accuracy, and bias are the critical dimensions.",
    question: "A healthcare AI system trained primarily on patient data from large urban hospitals is deployed at rural clinics. What risk is most significant?",
    explanation: "This is a representativeness problem. Rural patient populations often have different health profiles, access patterns, and demographic characteristics than urban populations. An AI trained on non-representative data will make systematic errors on underrepresented groups. This is both an ethical risk and a patient safety risk — and a preview of how deployment context must match training context.",
  },

  "module-2-supervised-unsupervised-section-card": {
    id: "module-2-supervised-unsupervised-section-card",
    moduleId: "module-2",
    sectionId: "supervised-unsupervised",
    cardType: "section-card",
    content: "Supervised learning trains on labeled data (input → correct output pairs): email labeled spam/not-spam, images labeled cat/dog, transactions labeled fraud/legitimate. Unsupervised learning finds structure in unlabeled data: clustering customers by behavior, detecting anomalies. Reinforcement learning trains through trial and reward signals: game-playing AI, robotics. Most business AI is supervised learning. Understanding this helps evaluate whether you have the labeled data an AI solution actually requires.",
    summary: "Most business AI uses supervised learning, which requires labeled training data — understanding this helps assess whether proposed AI solutions are actually feasible.",
    question: "A vendor proposes an AI system to automatically categorize your support tickets into 12 issue types. What data requirement is most critical to evaluate?",
    explanation: "This is a supervised classification problem. The AI needs thousands of labeled examples of support tickets already correctly categorized into each of the 12 issue types. If you don't have that historical labeled data (or if your categories aren't well-defined), the model can't learn the task. Evaluating data readiness before vendor commitment is one of the highest-leverage questions in AI procurement.",
  },

  "module-2-what-ai-cant-do-section-card": {
    id: "module-2-what-ai-cant-do-section-card",
    moduleId: "module-2",
    sectionId: "what-ai-cant-do",
    cardType: "section-card",
    content: "Current AI has clear limitations: (1) Genuine reasoning — AI mimics reasoning patterns but doesn't understand causality; (2) Novel domain generalization — AI struggles outside its training distribution; (3) Physical world interaction without specialized systems; (4) Consistent factual reliability — LLMs hallucinate; (5) Long-horizon multi-step planning — agent systems are improving but remain brittle; (6) Judgment in ethically novel situations. Knowing these limits prevents expensive AI projects built on false assumptions.",
    summary: "AI has fundamental limits in genuine reasoning, novel domain generalization, factual consistency, and ethical judgment — understanding these prevents costly misapplication.",
    question: "Which task is LEAST suited to current AI capabilities?",
    explanation: "AI performs poorly at tasks requiring genuine causal understanding, ethical judgment in novel situations, or reliable performance far outside its training distribution. Pattern-recognition tasks with well-defined inputs and outputs in familiar domains are where AI creates the most reliable value. The goal is matching the task to the AI type, not trying to use AI everywhere.",
  },

  "module-2-module-quiz": {
    id: "module-2-module-quiz",
    moduleId: "module-2",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Test your understanding of how AI creates business value — including ML fundamentals, training data requirements, learning paradigms, and where AI breaks down.",
    summary: "Module 2 knowledge check covering ML fundamentals, data requirements, learning paradigms, and AI limitations.",
    question: "An organization wants to use AI to identify which sales leads are most likely to convert. They have 3 years of CRM data with outcomes. What type of ML approach is most appropriate?",
    explanation: "This is a supervised learning classification or scoring problem — the model learns from historical labeled examples (leads that converted vs. didn't) to predict future outcomes. The 3 years of CRM data with known outcomes provides the labeled training signal required. This is one of the highest-ROI AI use cases in sales organizations when done with quality data.",
  },

  // ─────────────────────────────────────────────
  // MODULE 3 — AI Tools: Which Ones Matter?
  // ─────────────────────────────────────────────

  "module-3-module-overview-section-card": {
    id: "module-3-module-overview-section-card",
    moduleId: "module-3",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module teaches strategic AI tool evaluation rather than tool chasing. You'll learn how to assess AI software categories, understand when a general-purpose assistant is sufficient versus when specialized systems are warranted, and build evaluation frameworks that account for workflow fit, governance, integration complexity, pricing traps, and vendor stability.",
    summary: "Module 3 builds a strategic framework for AI tool evaluation — prioritizing workflow fit over feature lists and benchmark performance.",
    question: null,
    explanation: null,
  },

  "module-3-what-is-llm": {
    id: "module-3-what-is-llm",
    moduleId: "module-3",
    sectionId: "what-is-llm",
    cardType: "section-card",
    content: "Large Language Models (LLMs) are AI systems trained on vast text corpora to predict and generate human-like language. They power ChatGPT, Claude, Gemini, and most modern AI assistants. LLMs don't 'know' facts — they predict statistically likely text based on training patterns. Key business implications: they excel at drafting, summarizing, reformatting, and generating — but they hallucinate, reflect training biases, and have knowledge cutoff dates.",
    summary: "LLMs predict statistically likely text — they excel at generative tasks but hallucinate and don't reliably 'know' facts.",
    question: "Why can an LLM confidently state an incorrect fact?",
    explanation: "LLMs are not databases or search engines. They generate text by predicting what tokens (words/subwords) are statistically likely to follow previous ones, based on patterns in training data. A model can generate plausible-sounding but factually wrong content because 'sounds right' and 'is right' are different criteria. This is a fundamental architectural characteristic, not a bug to be fixed with a software update.",
  },

  "module-3-how-chatgpt-works": {
    id: "module-3-how-chatgpt-works",
    moduleId: "module-3",
    sectionId: "how-chatgpt-works",
    cardType: "section-card",
    content: "ChatGPT (and similar tools) work in three stages: (1) Pre-training — the model learns language patterns from billions of text documents; (2) Fine-tuning — the model is trained to follow instructions and avoid harmful outputs; (3) RLHF (Reinforcement Learning from Human Feedback) — human raters teach the model which responses are better. Each conversation is processed without persistent memory (by default). The model doesn't 'think' between sessions.",
    summary: "ChatGPT is trained in three stages — pre-training, fine-tuning, and RLHF — and has no persistent memory between default sessions.",
    question: null,
    explanation: null,
  },

  "module-3-anatomy-of-prompt": {
    id: "module-3-anatomy-of-prompt",
    moduleId: "module-3",
    sectionId: "anatomy-of-prompt",
    cardType: "section-card",
    content: "An effective prompt typically contains: (1) Role/context — 'You are a financial analyst…'; (2) Task — what you want done; (3) Format — how the output should be structured; (4) Constraints — what to include or avoid; (5) Examples — showing desired output style. Prompt quality is the primary lever for improving AI output quality. Most users underspecify prompts and then blame the AI for poor results.",
    summary: "Effective prompts include role, task, format, constraints, and examples — prompt quality is the primary lever for AI output quality.",
    question: "A team member complains that AI keeps giving generic answers. Which prompt element is most likely missing?",
    explanation: "Generic outputs typically result from generic prompts. Adding role context ('As a senior product manager reviewing a B2B SaaS feature request...'), specific constraints, and format requirements dramatically improves output specificity. The AI can only work with what you give it — the more context and constraint you provide, the more targeted the output.",
  },

  "module-3-prompt-techniques": {
    id: "module-3-prompt-techniques",
    moduleId: "module-3",
    sectionId: "prompt-techniques",
    cardType: "section-card",
    content: "Key prompting techniques: (1) Chain-of-thought — ask the model to reason step by step before answering; (2) Few-shot — provide 2–3 examples of desired input/output pairs; (3) Role prompting — assign a persona that frames the model's response style; (4) Iterative refinement — treat first output as a draft and prompt for specific improvements; (5) Structured output — request JSON, tables, or bullet formats for downstream processing. Each technique increases reliability for specific task types.",
    summary: "Chain-of-thought, few-shot examples, role prompting, and structured output are the core techniques for improving AI reliability.",
    question: "You need an AI to evaluate a legal contract and identify risks. Which prompting technique would most improve output reliability?",
    explanation: "Chain-of-thought prompting — asking the model to reason step by step — significantly improves performance on analytical tasks that require multi-step reasoning. For contract review, you'd ask the model to first identify clause types, then evaluate each against specified risk criteria, then summarize. This structured reasoning approach catches more issues than a single 'review this contract' prompt.",
  },

  "module-3-hands-on-practice-section-card": {
    id: "module-3-hands-on-practice-section-card",
    moduleId: "module-3",
    sectionId: "hands-on-practice",
    cardType: "section-card",
    content: "Practice is the only way to develop prompt engineering fluency. Key exercises: (1) Take a task you do weekly and write 3 different prompts for it — compare outputs; (2) Deliberately break a prompt by making it vague — observe how output degrades; (3) Add examples to a prompt and compare to the example-free version; (4) Ask an AI to improve your own prompt. Fluency comes from iteration, not theory.",
    summary: "Prompt engineering fluency requires deliberate iteration — comparing prompt variants, studying failures, and practicing regularly.",
    question: null,
    explanation: null,
  },

  "module-3-choosing-tools": {
    id: "module-3-choosing-tools",
    moduleId: "module-3",
    sectionId: "choosing-tools",
    cardType: "section-card",
    content: "AI tool selection framework: (1) Define the workflow problem precisely before evaluating tools; (2) Test with real work samples, not demo data; (3) Evaluate total cost of ownership — per-seat pricing compounds; (4) Assess integration complexity with existing systems; (5) Review data handling and privacy terms; (6) Check vendor financial stability; (7) Plan for vendor lock-in risk. The tool that wins demos rarely wins production.",
    summary: "Effective AI tool selection requires defining the problem first, testing with real work, evaluating total cost, and assessing data governance before committing.",
    question: "An organization is evaluating two AI tools: Tool A performs better on vendor benchmarks; Tool B integrates seamlessly with existing systems. Which factor should carry more weight?",
    explanation: "Integration with existing systems almost always outweighs benchmark performance for enterprise AI tools. A superior tool that requires manual data export/import, doesn't connect to your CRM or ERP, or creates workflow friction will be underused. The measurable business value comes from how deeply a tool embeds into actual workflows — not how it scores on controlled benchmarks.",
  },

  "module-3-ai-writing": {
    id: "module-3-ai-writing",
    moduleId: "module-3",
    sectionId: "ai-writing",
    cardType: "section-card",
    content: "AI writing tools in business contexts are most valuable for: first drafts, email templates, meeting summaries, policy documents, sales sequences, and research synthesis. Lowest value: final customer-facing communications requiring brand voice precision, legal documents requiring verified accuracy, and content where hallucination risk is high. Build review workflows into any AI writing process — AI accelerates drafting, not publishing.",
    summary: "AI writing tools excel at drafts and synthesis but require human review — hallucination risk makes autonomous publishing dangerous.",
    question: null,
    explanation: null,
  },

  "module-3-ai-images": {
    id: "module-3-ai-images",
    moduleId: "module-3",
    sectionId: "ai-images",
    cardType: "section-card",
    content: "When selecting AI image generation tools for business use, evaluate: (1) Commercial licensing terms — can outputs be used commercially?; (2) Brand consistency capability — can it maintain visual identity?; (3) Iteration speed — how quickly can you refine outputs?; (4) IP indemnification — does the vendor protect you from copyright claims?; (5) Quality for your specific use case (photography style vs illustration vs product visualization). Adobe Firefly's indemnification policy is currently the strongest in enterprise contexts.",
    summary: "Business image AI selection requires evaluating commercial licensing, brand consistency, IP indemnification, and use-case-specific quality.",
    question: null,
    explanation: null,
  },

  "module-3-ai-productivity": {
    id: "module-3-ai-productivity",
    moduleId: "module-3",
    sectionId: "ai-productivity",
    cardType: "section-card",
    content: "Productivity AI tools comparison: Microsoft Copilot — strongest for Office 365 workflows, meeting summaries, email drafting; Google Gemini — strongest for Workspace integration and collaborative documents; Notion AI — strongest for knowledge management and structured note-taking; Otter.ai — strongest for meeting transcription and action item extraction. Choice should follow your existing platform ecosystem rather than chasing feature lists.",
    summary: "Productivity AI tool selection should follow existing platform ecosystems — Copilot for Microsoft shops, Gemini for Google Workspace users.",
    question: "An organization runs entirely on Google Workspace. Which AI productivity tool should they evaluate first?",
    explanation: "Platform alignment is the primary selection criterion for embedded productivity AI. Google Gemini is natively integrated with Gmail, Docs, Sheets, and Meet — eliminating integration overhead and keeping data within an already-governed environment. Adopting a competing productivity AI in a single-platform environment creates unnecessary complexity and typically lower adoption rates.",
  },

  "module-3-ai-creative": {
    id: "module-3-ai-creative",
    moduleId: "module-3",
    sectionId: "ai-creative",
    cardType: "section-card",
    content: "AI creative tool evaluation for business: assess whether the tool supports brand guidelines via style presets or reference images, what the turnaround time is for production-quality outputs, how much human curation is required, and what the content moderation policies are. For video and audio specifically, evaluate whether outputs require disclosure under current or anticipated regulatory requirements in your jurisdiction.",
    summary: "Business creative AI evaluation requires assessing brand guideline support, production quality time, curation requirements, and disclosure obligations.",
    question: null,
    explanation: null,
  },

  "module-3-module-quiz": {
    id: "module-3-module-quiz",
    moduleId: "module-3",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Test your ability to apply AI tool evaluation frameworks — covering LLM mechanics, prompt techniques, tool selection criteria, and practical workflow integration.",
    summary: "Module 3 knowledge check on LLM mechanics, prompting, tool evaluation, and workflow integration.",
    question: "A startup is choosing between building a custom AI system on top of an API (like OpenAI or Anthropic) versus buying an off-the-shelf SaaS AI product. What is the strongest argument for the API-first approach?",
    explanation: "Building directly on foundational model APIs provides maximum flexibility, avoids SaaS markup pricing, and prevents vendor lock-in to a specific product layer. However, it requires engineering resources and ongoing maintenance. The correct answer depends on whether the organization has engineering capacity and whether any off-the-shelf product adequately solves the specific problem. For unique workflows with no good SaaS match, API-first is often the better long-term investment.",
  },

  // ─────────────────────────────────────────────
  // MODULE 4 — Choosing the Right AI Agency or Partner
  // ─────────────────────────────────────────────

  "module-4-module-overview-section-card": {
    id: "module-4-module-overview-section-card",
    moduleId: "module-4",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module helps organizations distinguish genuine AI implementation expertise from marketing-grade AI claims. As AI adoption accelerated, a wave of agencies and consultants repositioned as 'AI experts' with minimal actual implementation experience. You'll learn to evaluate partners using operational criteria, design pilot projects that reveal real capability, and structure contracts that protect your interests.",
    summary: "Module 4 teaches leaders to distinguish genuine AI implementation expertise from repositioned consultants using operational evaluation criteria.",
    question: null,
    explanation: null,
  },

  "module-4-what-is-data-section-card": {
    id: "module-4-what-is-data-section-card",
    moduleId: "module-4",
    sectionId: "what-is-data",
    cardType: "section-card",
    content: "For AI implementation, data isn't just 'information' — it's the operational input that determines system behavior. Relevant data types: structured (databases, CRM records, spreadsheets), unstructured (emails, documents, audio, images), semi-structured (JSON logs, XML), and real-time streaming. Understanding what data you have, where it lives, how clean it is, and who controls access is foundational before any AI implementation conversation with a vendor.",
    summary: "AI-relevant data includes structured, unstructured, semi-structured, and streaming types — understanding your data inventory is foundational before vendor evaluation.",
    question: "Before engaging an AI implementation partner, what data audit should an organization conduct?",
    explanation: "Organizations should document: what data they have, where it's stored, its quality and completeness, access controls and data governance policies, any regulatory constraints (GDPR, HIPAA), and historical depth. Without this audit, vendors will either discover problems mid-project (increasing cost) or make promises based on assumptions about data that turn out to be wrong.",
  },

  "module-4-data-collection-section-card": {
    id: "module-4-data-collection-section-card",
    moduleId: "module-4",
    sectionId: "data-collection",
    cardType: "section-card",
    content: "AI projects frequently fail because of data collection gaps identified only after contracts are signed. Key questions for vendors: (1) What data do they need, in what format, and in what volume? (2) Who is responsible for data pipeline setup? (3) What happens if data quality is lower than expected? (4) How will ongoing data flows be maintained? (5) Who owns the data infrastructure built during the engagement? Answers reveal operational seriousness.",
    summary: "Data collection requirements revealed by vendors — format, volume, pipeline ownership, and quality contingencies — expose their operational maturity.",
    question: "An AI vendor says they'll 'handle the data side.' What follow-up question best reveals their actual capability?",
    explanation: "Asking 'Who on your team will build and maintain the data pipelines, and what's your approach if our data quality doesn't meet your requirements?' forces specificity. Capable vendors will name team members, describe their data engineering process, and have clear protocols for data quality issues. Vague answers indicate they may be overselling capabilities.",
  },

  "module-4-data-cleaning-section-card": {
    id: "module-4-data-cleaning-section-card",
    moduleId: "module-4",
    sectionId: "data-cleaning",
    cardType: "section-card",
    content: "Real-world data is rarely AI-ready. Common data quality problems: missing values, inconsistent formatting, duplicate records, incorrect labels, stale information, and structural inconsistencies. Data cleaning is time-consuming and often accounts for 60–80% of AI project effort — yet vendors frequently underestimate or omit it from proposals. When evaluating partners, ask for their data cleaning methodology and how they handle quality issues discovered mid-project.",
    summary: "Data cleaning accounts for 60–80% of AI project effort but is frequently underestimated in vendor proposals — making it a key evaluation criterion.",
    question: "A vendor quotes a 3-month AI implementation timeline. You know your data is fragmented across 6 legacy systems. What risk does this timeline most likely reflect?",
    explanation: "Fragmented legacy data almost always requires significant data cleaning, consolidation, and standardization work that vendors often underscope in initial proposals. A 3-month timeline is likely optimistic unless the vendor has accounted for full data discovery, cleaning, and pipeline development. This is a common source of project overruns. Require vendors to detail their data preparation plan specifically.",
  },

  "module-4-preprocessing-section-card": {
    id: "module-4-preprocessing-section-card",
    moduleId: "module-4",
    sectionId: "preprocessing",
    cardType: "section-card",
    content: "Data preprocessing transforms raw data into AI-ready inputs. Steps include: normalization (scaling numeric values to comparable ranges), tokenization (converting text to processable units), encoding (converting categories to numeric representations), handling missing values, and splitting data into training/validation/test sets. Partners who can't explain their preprocessing choices in operational terms are likely not equipped to handle production deployment.",
    summary: "Preprocessing transforms raw data into AI-ready inputs — partners who can't explain their preprocessing methodology lack production readiness.",
    question: null,
    explanation: null,
  },

  "module-4-feature-engineering-section-card": {
    id: "module-4-feature-engineering-section-card",
    moduleId: "module-4",
    sectionId: "feature-engineering",
    cardType: "section-card",
    content: "Feature engineering is the process of creating meaningful input variables for AI models from raw data. Example: raw transaction data becomes 'transactions in last 30 days,' 'average transaction size,' 'days since last transaction' — features that capture behaviorally meaningful signals. Strong AI partners invest significantly in feature engineering. It often matters more than model architecture choice. Weak partners focus almost entirely on model selection.",
    summary: "Feature engineering — creating meaningful input variables from raw data — often matters more than model choice and reveals partner sophistication.",
    question: "What does it mean when an AI vendor says they'll 'just plug in GPT-4' to solve your workflow problem?",
    explanation: "Most enterprise AI problems require significant data preparation, feature engineering, and system integration work before any model can be applied. A vendor who leads with 'we'll plug in GPT-4' is signaling they may not have the depth to solve the actual operational problem — they're focused on the model rather than the workflow engineering. This is a red flag for complex enterprise deployments.",
  },

  "module-4-module-quiz": {
    id: "module-4-module-quiz",
    moduleId: "module-4",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Test your ability to evaluate AI implementation partners — including data readiness assessment, vendor red flags, and contract structure.",
    summary: "Module 4 knowledge check on AI partner evaluation, data readiness, and implementation risk.",
    question: "Which of the following is the strongest red flag when evaluating an AI implementation agency?",
    explanation: "The clearest sign of an agency without genuine implementation experience is the inability to show production-deployed case studies with measurable operational outcomes. Any agency can create demos and slide decks. Real implementation experience produces: live systems, before/after metrics, client references willing to speak in detail, and documented lessons from failures. Require this evidence before signing contracts.",
  },

  // ─────────────────────────────────────────────
  // MODULE 5 — AI ROI & Decision-Making Frameworks
  // ─────────────────────────────────────────────

  "module-5-module-overview-section-card": {
    id: "module-5-module-overview-section-card",
    moduleId: "module-5",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module provides operational frameworks for measuring whether AI initiatives create real business value. You'll learn ROI calculation methods, cost-benefit analysis approaches, automation scoring systems, and prioritization matrices. The goal is replacing gut-feel AI investment decisions with structured, defensible analysis.",
    summary: "Module 5 replaces gut-feel AI investment decisions with structured ROI calculation, cost-benefit analysis, and prioritization frameworks.",
    question: null,
    explanation: null,
  },

  "module-5-roi-basics-section-card": {
    id: "module-5-roi-basics-section-card",
    moduleId: "module-5",
    sectionId: "roi-basics",
    cardType: "section-card",
    content: "AI ROI is calculated as: ROI = ((Gain − Cost) / Cost) × 100. Gain includes labor savings, revenue acceleration, error reduction, and speed improvements. Cost includes implementation, licensing, maintenance, training, and change management. Most organizations undercount costs (ignoring change management and ongoing maintenance) and overcount gains (counting theoretical rather than realized savings). Both errors produce misleading ROI projections.",
    summary: "AI ROI = ((Gain − Cost) / Cost) × 100 — most organizations undercount costs and overcount gains, producing misleading projections.",
    question: "An AI system costs $50,000 to implement and $10,000/year to maintain. It saves 20 hours/week of staff time at $50/hour. What is the first-year ROI?",
    explanation: "Annual savings = 20 hours × $50 × 52 weeks = $52,000. Total first-year cost = $50,000 (implementation) + $10,000 (maintenance) = $60,000. ROI = (($52,000 − $60,000) / $60,000) × 100 = −13.3%. The first year is ROI-negative. Year 2 ROI = (($52,000 − $10,000) / $10,000) × 100 = 320%. This multi-year view is critical for AI investment decisions.",
  },

  "module-5-roi-calculation": {
    id: "module-5-roi-calculation",
    moduleId: "module-5",
    sectionId: "roi-calculation",
    cardType: "section-card",
    content: "Annual savings calculation: Annual Savings = Hours Saved × Hourly Cost × Frequency. Example: An AI that reduces report generation from 4 hours to 30 minutes saves 3.5 hours per report. If generated weekly with a $75/hour analyst: 3.5 × $75 × 52 = $13,650/year. This must be compared against full implementation and licensing costs. Build conservative, base, and optimistic scenarios — present all three to avoid commitment to a single projection.",
    summary: "Annual Savings = Hours Saved × Hourly Cost × Frequency — always model conservative, base, and optimistic scenarios rather than a single projection.",
    question: "Why should AI ROI calculations include three scenarios (conservative, base, optimistic) rather than a single projection?",
    explanation: "AI implementations frequently encounter unexpected complications — data quality issues, adoption challenges, integration complexity, and performance gaps. A single 'expected' ROI projection creates false confidence and removes decision-making flexibility. Three scenarios force explicit acknowledgment of uncertainty, create decision thresholds ('we proceed if conservative case ROI exceeds X'), and protect against over-committing to optimistic assumptions.",
  },

  "module-5-effectiveness-metrics": {
    id: "module-5-effectiveness-metrics",
    moduleId: "module-5",
    sectionId: "effectiveness-metrics",
    cardType: "section-card",
    content: "Effective AI metrics measure operational outcomes, not AI activity: (1) Time saved per task (before vs. after); (2) Error rate reduction; (3) Throughput increase (tasks per person-hour); (4) Cost per outcome; (5) Customer satisfaction delta; (6) Revenue attribution. Poor metrics measure AI inputs rather than business outputs — number of prompts sent, features used, or licenses deployed are not evidence of value creation.",
    summary: "Effective AI metrics measure operational outcomes — time saved, error reduction, throughput — not AI usage activity like prompts sent or features used.",
    question: "A team reports their AI tool is 'used daily by 90% of employees.' Why is this an insufficient metric for evaluating AI value?",
    explanation: "Usage frequency measures adoption, not value creation. An AI tool used daily could be saving 5 minutes per person or creating no measurable operational benefit while adding cognitive overhead. Effective measurement requires before/after comparison on operational outcomes: task completion time, error rates, throughput, and cost per outcome. Adoption is a prerequisite for value, not evidence of it.",
  },

  "module-5-misleading-metrics": {
    id: "module-5-misleading-metrics",
    moduleId: "module-5",
    sectionId: "misleading-metrics",
    cardType: "section-card",
    content: "Common misleading AI metrics: (1) 'Hours saved' without validating those hours produced other value; (2) 'Accuracy rates' on test sets that don't reflect production data distribution; (3) User satisfaction scores that reflect novelty rather than utility; (4) 'Tasks automated' without cost comparison to previous approach; (5) Revenue 'attributed' to AI via correlation rather than controlled measurement. Each of these can make a failing AI project appear successful.",
    summary: "Misleading AI metrics — hours saved without redeployment, test accuracy vs production, novelty satisfaction — can mask failing projects.",
    question: "An AI system shows 95% accuracy in testing but 71% in production. What most likely explains this gap?",
    explanation: "This is a test set distribution mismatch — the test data doesn't accurately represent real production inputs. This is one of the most common and dangerous evaluation errors. Production data has more variation, edge cases, and distribution shifts than curated test sets. Always validate AI performance on held-out production data sampled from real operational conditions before declaring a system production-ready.",
  },

  "module-5-adoption-framework": {
    id: "module-5-adoption-framework",
    moduleId: "module-5",
    sectionId: "adoption-framework",
    cardType: "section-card",
    content: "AI adoption framework for ROI maximization: (1) Identify highest-frequency, highest-effort tasks — these have the most savings leverage; (2) Quantify current state with time studies or system data; (3) Pilot with a constrained team for 30–60 days; (4) Measure actual vs. projected savings; (5) Calculate true per-unit cost including all overhead; (6) Decide expand, pivot, or stop based on data. Most organizations skip steps 2 and 5, making accurate evaluation impossible.",
    summary: "A six-step AI adoption ROI framework: identify high-frequency tasks, quantify current state, pilot constrained, measure actual savings, calculate true costs, then decide.",
    question: null,
    explanation: null,
  },

  "module-5-module-quiz": {
    id: "module-5-module-quiz",
    moduleId: "module-5",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Apply ROI frameworks, identify misleading metrics, and evaluate AI investment decisions using the tools from this module.",
    summary: "Module 5 knowledge check on ROI calculation, metric evaluation, and structured AI investment decision-making.",
    question: "An organization spent $200,000 on an AI implementation. After 12 months, they have documented $180,000 in realized savings. The team argues the project was 'basically a success.' What is the correct assessment?",
    explanation: "ROI = (($180,000 − $200,000) / $200,000) × 100 = −10%. The project produced a negative first-year ROI. Whether this is acceptable depends on the multi-year projections — if Year 2 produces $180,000 in savings with minimal maintenance cost, the 2-year ROI becomes strongly positive. The team should present this in a multi-year context rather than calling Year 1 a success. The 'basically a success' framing is a warning sign of sloppy ROI thinking.",
  },

  // ─────────────────────────────────────────────
  // MODULE 6 — AI Risk, Compliance & Governance
  // ─────────────────────────────────────────────

  "module-6-module-overview-section-card": {
    id: "module-6-module-overview-section-card",
    moduleId: "module-6",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module addresses practical governance rather than abstract ethics. You'll examine the operational, legal, and organizational risks of deploying AI at scale — including data privacy, shadow AI, hallucination reliability, IP exposure, and employee misuse — and build frameworks for managing these risks without creating bureaucratic paralysis.",
    summary: "Module 6 builds practical AI governance frameworks covering data privacy, shadow AI, hallucination risk, IP exposure, and incident response.",
    question: null,
    explanation: null,
  },

  "module-6-privacy-data-section-card": {
    id: "module-6-privacy-data-section-card",
    moduleId: "module-6",
    sectionId: "privacy-data",
    cardType: "section-card",
    content: "Data privacy risks in AI deployments: (1) Employees entering confidential data into public AI tools (customer PII, trade secrets, financial data); (2) Vendor training on your data without explicit consent; (3) Data residency violations (GDPR, CCPA, HIPAA); (4) Inadequate data retention and deletion policies; (5) Third-party API integrations creating unauthorized data flows. Review AI vendor data processing terms before any deployment involving sensitive information.",
    summary: "AI data privacy risks include employee data leakage into public tools, vendor training on your data, regulatory residency violations, and unauthorized API data flows.",
    question: "An employee uses ChatGPT to summarize a confidential client contract. What is the primary governance risk?",
    explanation: "By default, content entered into consumer AI tools may be used for model training, stored in vendor systems, and accessed by vendor employees. Inputting confidential client contracts potentially violates client NDAs, creates trade secret exposure, and may breach professional confidentiality obligations. Organizations need explicit AI acceptable use policies that specify which tools are approved for which data sensitivity levels.",
  },

  "module-6-ai-bias": {
    id: "module-6-ai-bias",
    moduleId: "module-6",
    sectionId: "ai-bias",
    cardType: "section-card",
    content: "AI bias occurs when systems produce systematically different outcomes for different demographic groups, typically because training data reflects historical inequities. Business-critical bias risks: hiring systems that screen out protected classes, lending models that discriminate by zip code (a proxy for race), healthcare systems that perform worse for underrepresented patient populations, and content moderation systems with unequal false positive rates. Bias governance requires regular audit, not one-time review.",
    summary: "AI bias produces systematically different outcomes across demographic groups — requiring ongoing audit processes, not one-time review, before and after deployment.",
    question: "A company deploys an AI hiring tool that shows a statistically significant lower acceptance rate for candidates from certain universities. What is the appropriate first response?",
    explanation: "The appropriate first response is to pause the tool and conduct a bias audit — not to assume the disparity is acceptable or performance-based. University attended can be a proxy for socioeconomic background or race, creating disparate impact liability under employment law even without intent to discriminate. Bias governance requires investigating and resolving statistical disparities before continued deployment in consequential decisions.",
  },

  "module-6-misinformation": {
    id: "module-6-misinformation",
    moduleId: "module-6",
    sectionId: "misinformation",
    cardType: "section-card",
    content: "AI misinformation risks in business: (1) LLM hallucinations presented as facts in customer communications; (2) AI-generated reports with incorrect data cited authoritatively; (3) Deepfake content impersonating executives; (4) AI-generated phishing attacks at scale; (5) Internal AI knowledge bases contaminated with hallucinated 'facts' that propagate through the organization. Governance requires review checkpoints before AI outputs enter consequential channels.",
    summary: "AI misinformation risks span hallucinations in customer comms, deepfake executive impersonation, AI-phishing, and hallucinated facts in internal knowledge bases.",
    question: "An organization allows AI to automatically post responses to customer reviews. What governance control is most critical?",
    explanation: "Human review before publication is the minimum viable control for AI-generated customer-facing content. AI responses can contain factually incorrect information, inappropriate commitments, or tone mismatches that create legal, reputational, or regulatory exposure. Automation of customer-facing communication without review is high-risk regardless of AI quality — because the consequences of errors are external and visible.",
  },

  "module-6-responsible-ai": {
    id: "module-6-responsible-ai",
    moduleId: "module-6",
    sectionId: "responsible-ai",
    cardType: "section-card",
    content: "Responsible AI in practice requires: (1) Defined use case boundaries — which decisions AI can make autonomously vs. require human oversight; (2) Explainability requirements for consequential decisions; (3) Audit trails for AI-influenced outcomes; (4) Incident response protocols for AI failures; (5) Clear accountability assignment — who is responsible when AI causes harm; (6) Regular third-party audits for high-risk deployments. Abstract principles without operational implementation are insufficient.",
    summary: "Responsible AI requires defined use-case boundaries, explainability, audit trails, incident response, accountability, and regular audits — not just principles.",
    question: null,
    explanation: null,
  },

  "module-6-ethical-dilemmas-section-card": {
    id: "module-6-ethical-dilemmas-section-card",
    moduleId: "module-6",
    sectionId: "ethical-dilemmas",
    cardType: "section-card",
    content: "Common AI ethical dilemmas in business: (1) Surveillance vs. productivity monitoring — where does AI performance tracking become invasive?; (2) Personalization vs. manipulation — when does AI-driven content optimization cross into manipulation?; (3) Efficiency vs. employment — is rapid automation without workforce transition planning ethical?; (4) Speed vs. accuracy — is deploying an 85%-accurate AI for consequential decisions acceptable? These aren't abstract questions — they require explicit organizational policy.",
    summary: "Business AI ethical dilemmas — surveillance, manipulation, workforce displacement, and accuracy thresholds — require explicit organizational policy, not case-by-case judgment.",
    question: "A company wants to use AI to monitor employee email and Slack messages for productivity signals. What governance framework should be established before deployment?",
    explanation: "Employee monitoring AI requires: legal review of consent requirements by jurisdiction, explicit disclosure to employees, defined data access controls (who sees what), retention limits, prohibition of use in performance reviews without additional oversight, and an employee grievance mechanism. Deploying surveillance AI without this framework creates legal exposure, erodes trust, and typically reduces the productivity it's meant to measure.",
  },

  "module-6-risk-reflection": {
    id: "module-6-risk-reflection",
    moduleId: "module-6",
    sectionId: "risk-reflection",
    cardType: "section-card",
    content: "Risk reflection exercise: For each AI initiative, assess (1) What happens if this system fails silently? (2) Who bears the consequence of errors? (3) Is the error rate acceptable given who is affected? (4) What is the worst-case failure mode, and how quickly would we detect it? (5) What is our recovery plan? Organizations that can't answer these questions for a production AI system haven't completed their risk assessment.",
    summary: "AI risk reflection requires assessing silent failure consequences, error bearer, acceptable error rates, worst-case detection time, and recovery plans.",
    question: null,
    explanation: null,
  },

  "module-6-module-quiz": {
    id: "module-6-module-quiz",
    moduleId: "module-6",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Apply AI governance frameworks — data privacy, bias assessment, misinformation controls, and responsible deployment criteria.",
    summary: "Module 6 knowledge check on AI governance, bias, privacy risk, and responsible deployment.",
    question: "An employee asks their manager: 'Can I use Claude to help draft proposals?' The manager says yes without additional guidance. What governance gap does this create?",
    explanation: "Without explicit policy, the employee doesn't know: which data they can include in prompts, whether Claude's terms allow commercial use for their purposes, how to handle Claude-generated content that may contain errors, whether to disclose AI use to clients, or what to do if Claude produces problematic output. 'Yes' without governance creates liability. The answer should reference the organization's AI acceptable use policy — or flag that one needs to be created.",
  },

  // ─────────────────────────────────────────────
  // MODULE 7 — Building an AI Adoption Roadmap
  // ─────────────────────────────────────────────

  "module-7-module-overview-section-card": {
    id: "module-7-module-overview-section-card",
    moduleId: "module-7",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module answers the question every leader asks after understanding AI: 'What do we actually do Monday morning?' You'll build a practical, sequenced adoption roadmap covering pilot design, change management, department prioritization, internal champions, employee training, and scaling criteria. The goal is structured momentum — not analysis paralysis.",
    summary: "Module 7 answers 'what do we do Monday morning?' with a sequenced AI adoption roadmap covering pilots, change management, and scaling criteria.",
    question: null,
    explanation: null,
  },

  "module-7-ai-and-jobs": {
    id: "module-7-ai-and-jobs",
    moduleId: "module-7",
    sectionId: "ai-and-jobs",
    cardType: "section-card",
    content: "AI's impact on jobs operates at the task level, not the job level. Most roles contain a mix of tasks: some highly automatable (data entry, scheduling, report formatting), others resistant to automation (relationship management, novel problem-solving, physical tasks requiring dexterity). AI adoption typically reshapes roles — removing repetitive tasks, shifting time to higher-value work — rather than eliminating jobs entirely in the short term. The exception is roles that are almost entirely task-automatable.",
    summary: "AI reshapes jobs at the task level — automating repetitive tasks and shifting humans toward higher-value work — rather than eliminating most roles entirely.",
    question: "A company is implementing AI for invoice processing. What is the most likely workforce outcome?",
    explanation: "AI invoice processing automates data extraction, matching, and routing — the repetitive tasks in accounts payable. The likely outcome is that AP staff spend less time on manual data entry and more time on exception handling, vendor relationships, and process improvement. Headcount may not change initially, but role composition shifts. Communicating this clearly to affected employees is essential change management.",
  },

  "module-7-ai-in-the-workplace": {
    id: "module-7-ai-in-the-workplace",
    moduleId: "module-7",
    sectionId: "ai-in-the-workplace",
    cardType: "section-card",
    content: "AI in the workplace changes how work gets done: faster drafting, automated summaries, real-time translation, intelligent search, and automated routing. But workplace AI also introduces new failure modes: over-reliance on AI outputs, skill atrophy in frequently delegated tasks, and homogenized thinking if everyone uses the same prompts. Healthy AI workplace cultures train employees to verify outputs, understand AI limitations, and maintain the judgment required to catch AI errors.",
    summary: "AI workplace adoption creates productivity gains alongside new risks — over-reliance, skill atrophy, and homogenized thinking — requiring deliberate cultural design.",
    question: null,
    explanation: null,
  },

  "module-7-ai-opportunities": {
    id: "module-7-ai-opportunities",
    moduleId: "module-7",
    sectionId: "ai-opportunities",
    cardType: "section-card",
    content: "Highest-ROI AI opportunities by function: Marketing — content personalization, A/B testing acceleration, ad copy generation; Sales — lead scoring, call summarization, proposal drafting; Operations — process documentation, quality control, exception flagging; Finance — report generation, anomaly detection, forecasting; HR — resume screening, onboarding automation, policy Q&A. Prioritize functions with high task volume, clear measurability, and existing digital data.",
    summary: "Highest-ROI AI opportunities exist in marketing, sales, operations, finance, and HR — prioritize high-volume, measurable, data-rich functions first.",
    question: "Which organizational function typically offers the fastest AI ROI for a mid-sized company?",
    explanation: "Customer-facing functions like sales and marketing typically show faster AI ROI because they have high-volume repetitive tasks (email drafting, content creation, lead qualification), clear measurable outcomes (conversion rates, response times), and existing digital data to work with. Internal operations AI often has longer implementation cycles and less immediately visible impact, though the long-term savings can be larger.",
  },

  "module-7-ai-strategy": {
    id: "module-7-ai-strategy",
    moduleId: "module-7",
    sectionId: "ai-strategy",
    cardType: "section-card",
    content: "AI strategy for most organizations should follow: (1) Crawl — internal productivity tools, employee assistance, low-risk automation with human oversight; (2) Walk — department-level workflow automation, customer-facing AI with review processes; (3) Run — autonomous systems, cross-functional AI integration, AI-native process design. Most organizations try to run before they've walked — deploying autonomous customer-facing AI before they have governance, review processes, or trained employees.",
    summary: "AI strategy follows a crawl-walk-run progression — most organizations fail by deploying autonomous systems before establishing governance and employee capability.",
    question: "An organization with no AI governance, no AI-trained employees, and no existing AI tools wants to deploy an autonomous customer service chatbot. What is the primary risk?",
    explanation: "Without governance frameworks, employees can't identify when the chatbot fails. Without AI-trained staff, they can't improve prompts or escalation logic. Without existing AI familiarity, they lack the judgment to evaluate chatbot quality. The likely outcome is customer-facing failures that damage relationships and reputation. The crawl phase — internal tools with trained employees — should precede any autonomous customer-facing deployment.",
  },

  "module-7-industry-applications": {
    id: "module-7-industry-applications",
    moduleId: "module-7",
    sectionId: "industry-applications",
    cardType: "section-card",
    content: "AI applications by industry: Healthcare — clinical documentation, diagnostic support, administrative automation; Financial Services — fraud detection, compliance monitoring, customer service; Retail — demand forecasting, personalization, inventory optimization; Manufacturing — quality control, predictive maintenance, supply chain optimization; Legal — document review, contract analysis, research; Education — personalized tutoring, administrative automation, content generation. Each industry has distinct regulatory and governance considerations.",
    summary: "AI creates value across healthcare, finance, retail, manufacturing, legal, and education — each with distinct regulatory and governance requirements.",
    question: null,
    explanation: null,
  },

  "module-7-real-workflows-section-card": {
    id: "module-7-real-workflows-section-card",
    moduleId: "module-7",
    sectionId: "real-workflows",
    cardType: "section-card",
    content: "Real AI workflow examples that demonstrate measurable value: (1) Weekly report generation: analyst spends 4 hours compiling → AI aggregates data in 20 minutes, analyst reviews and adjusts in 45 minutes; (2) Customer support triage: support team manually reads and routes 500 tickets/day → AI categorizes and prioritizes in real time, human agents handle escalations; (3) Sales email personalization: reps send generic sequences → AI personalizes using CRM context, open rates increase 35–45%.",
    summary: "Real AI workflows show measurable impact in report generation, support triage, and sales personalization — each with clear before/after metrics.",
    question: null,
    explanation: null,
  },

  "module-7-role-transformation-section-card": {
    id: "module-7-role-transformation-section-card",
    moduleId: "module-7",
    sectionId: "role-transformation",
    cardType: "section-card",
    content: "AI transforms roles by shifting the mix of tasks, not eliminating roles entirely in most cases. A content writer with AI tools shifts from spending 60% on first-draft writing to spending 60% on editing, strategy, and quality judgment. A financial analyst shifts from 70% data compilation to 70% interpretation and recommendation. These shifts are positive — but require retraining, role redefinition, and sometimes compensation renegotiation as the nature of expertise changes.",
    summary: "AI role transformation shifts task mix — reducing drafting and data compilation, increasing editing, judgment, and strategy — requiring proactive retraining.",
    question: "How should an organization communicate AI role transformation to affected employees?",
    explanation: "Effective communication of AI-driven role transformation should: explain specifically which tasks AI will handle and which remain human; describe what the expanded higher-value work looks like; provide training for new responsibilities; address compensation and career path implications honestly; and create a feedback mechanism for employees to flag implementation problems. Vague 'AI will help you' messaging without specifics creates anxiety and resistance.",
  },

  "module-7-workflow-redesign-section-card": {
    id: "module-7-workflow-redesign-section-card",
    moduleId: "module-7",
    sectionId: "workflow-redesign",
    cardType: "section-card",
    content: "Workflow redesign is the highest-leverage AI adoption activity most organizations skip. Instead of adding AI to existing workflows, redesign around AI capabilities: (1) Map current workflow steps; (2) Identify steps AI can handle with high reliability; (3) Identify handoff points requiring human judgment; (4) Design the new workflow with explicit AI/human responsibilities; (5) Build in quality checkpoints; (6) Define performance metrics for the redesigned workflow. Organizations that skip redesign capture 20–30% of available AI value.",
    summary: "Workflow redesign around AI capabilities — not just adding AI to existing workflows — captures 3–5x more value than tool deployment alone.",
    question: null,
    explanation: null,
  },

  "module-7-building-ai-skills": {
    id: "module-7-building-ai-skills",
    moduleId: "module-7",
    sectionId: "building-ai-skills",
    cardType: "section-card",
    content: "Building organizational AI skills requires: (1) Baseline AI literacy training for all employees — what AI can and can't do; (2) Role-specific prompt engineering training — focused on each function's use cases; (3) Identification of internal AI champions — employees who develop deep expertise and coach others; (4) Ongoing learning infrastructure — AI is evolving fast enough that one-time training becomes obsolete quickly; (5) Leadership AI fluency — executives who can't evaluate AI claims make poor AI investment decisions.",
    summary: "Organizational AI skill-building requires baseline literacy, role-specific training, internal champions, ongoing learning, and executive AI fluency.",
    question: null,
    explanation: null,
  },

  "module-7-module-quiz": {
    id: "module-7-module-quiz",
    moduleId: "module-7",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Apply AI adoption roadmap frameworks — sequencing, change management, role transformation, and workflow redesign.",
    summary: "Module 7 knowledge check on AI adoption sequencing, change management, and workflow redesign.",
    question: "An organization wants to maximize AI adoption success. Which action should come FIRST?",
    explanation: "Before deploying any AI tool, organizations should conduct a current-state workflow audit: documenting what tasks are done, by whom, at what frequency, and at what cost. Without this baseline, you can't measure improvement, can't prioritize where AI creates the most value, and can't detect whether adoption is actually changing behavior. The audit is the foundation that makes every subsequent step measurable.",
  },

  // ─────────────────────────────────────────────
  // MODULE 8 — AI Agents & Automation Systems
  // ─────────────────────────────────────────────

  "module-8-module-overview-section-card": {
    id: "module-8-module-overview-section-card",
    moduleId: "module-8",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module separates AI agent hype from operational reality. You'll learn what AI agents actually are, how they differ from simpler automation workflows, what orchestration systems do, and where human oversight remains essential. The goal is enabling informed decisions about agent deployment rather than being swept up in marketing narratives.",
    summary: "Module 8 distinguishes AI agent reality from hype — covering agent mechanics, orchestration, limitations, and human oversight requirements.",
    question: null,
    explanation: null,
  },

  "module-8-what-are-agents-section-card": {
    id: "module-8-what-are-agents-section-card",
    moduleId: "module-8",
    sectionId: "what-are-agents",
    cardType: "section-card",
    content: "An AI agent is a system that uses an AI model to take sequences of actions toward a goal, typically with access to tools (web search, code execution, API calls, file systems). Unlike a chatbot that responds to single prompts, an agent plans multi-step actions, executes them, observes results, and adapts. The degree of autonomy varies significantly — from 'human-in-the-loop' (approves each step) to 'fully autonomous' (runs without oversight). Most production agents today are closer to the constrained end of this spectrum.",
    summary: "AI agents execute multi-step action sequences with tool access — distinguishable from chatbots by planning and adaptation, and from each other by autonomy level.",
    question: "What is the primary operational difference between a chatbot and an AI agent?",
    explanation: "A chatbot responds to prompts and returns text. An agent executes sequences of actions — calling APIs, reading files, running code, searching the web — to accomplish a multi-step goal. This distinction matters because agents can have consequential real-world effects (sending emails, modifying databases, making API calls) rather than just producing text for human action. Governance for agents is fundamentally different from governance for chatbots.",
  },

  "module-8-types-of-agents": {
    id: "module-8-types-of-agents",
    moduleId: "module-8",
    sectionId: "types-of-agents",
    cardType: "section-card",
    content: "AI agent categories: (1) Task agents — complete a specific defined task (research a topic, send a report); (2) Process agents — manage ongoing workflows with recurring triggers; (3) Multi-agent systems — networks of specialized agents coordinating on complex tasks; (4) Embodied agents — AI controlling physical systems (robots, manufacturing equipment). Most business deployments today are task agents with constrained tool access. Multi-agent coordination is advancing rapidly but remains operationally complex.",
    summary: "AI agent types include task agents, process agents, multi-agent systems, and embodied agents — with task agents being the most common current business deployment.",
    question: null,
    explanation: null,
  },

  "module-8-how-agents-work-section-card": {
    id: "module-8-how-agents-work-section-card",
    moduleId: "module-8",
    sectionId: "how-agents-work",
    cardType: "section-card",
    content: "AI agents follow a perceive-plan-act-observe loop: (1) Perceive — receive the goal and relevant context; (2) Plan — determine what steps to take using the LLM as a reasoning engine; (3) Act — execute steps using available tools; (4) Observe — examine results of actions; (5) Adapt — revise the plan based on observations; (6) Repeat until goal achieved or failure threshold reached. The LLM provides the reasoning; tools provide the ability to affect the real world.",
    summary: "AI agents follow a perceive-plan-act-observe loop where the LLM provides reasoning and tools provide real-world effect capability.",
    question: "An AI agent is tasked with scheduling a meeting with 5 stakeholders. It checks calendars, identifies a conflict, and automatically moves a previously scheduled call to resolve it. What governance concern does this raise?",
    explanation: "The agent's autonomous action — moving an existing meeting without human approval — could conflict with priorities the agent doesn't know about, violate stakeholder expectations, or create downstream scheduling problems. This illustrates the core governance challenge of agent autonomy: the more authority the agent has to take real-world actions, the more critical it is to define what actions require human approval. Autonomous calendar modification is a low-stakes example; autonomous contract signing or financial transactions are high-stakes versions of the same problem.",
  },

  "module-8-real-world-applications": {
    id: "module-8-real-world-applications",
    moduleId: "module-8",
    sectionId: "real-world-applications",
    cardType: "section-card",
    content: "Practical AI agent applications in production today: (1) Research agents — search, synthesize, and structure information from multiple sources; (2) Code generation agents — write, test, and iterate on code with tool execution; (3) Data analysis agents — pull data, run analysis, generate reports; (4) Customer service agents — triage, respond, and escalate support requests; (5) Content pipeline agents — draft, review, format, and publish content with checkpoints. Each requires defined human oversight points.",
    summary: "Production AI agents handle research, code generation, data analysis, customer service, and content pipelines — each requiring defined human oversight checkpoints.",
    question: null,
    explanation: null,
  },

  "module-8-risks-and-limits": {
    id: "module-8-risks-and-limits",
    moduleId: "module-8",
    sectionId: "risks-and-limits",
    cardType: "section-card",
    content: "AI agent risks: (1) Action cascades — a wrong first action compounds through subsequent steps; (2) Prompt injection — malicious content in the environment manipulates the agent's actions; (3) Tool misuse — agent uses available tools in unintended ways; (4) Goal specification errors — the agent achieves the literal goal while violating the intent; (5) Lack of common sense limits — agents may take technically correct but contextually inappropriate actions. Mitigation requires constrained tool access, mandatory approval gates for consequential actions, and comprehensive logging.",
    summary: "AI agent risks include action cascades, prompt injection, tool misuse, goal specification errors, and context blindness — requiring constrained tools and approval gates.",
    question: "An AI agent with access to your company's email system is asked to 'clean up old emails.' What risk does this illustrate?",
    explanation: "This is a goal specification error risk. 'Clean up old emails' is ambiguous — does it mean archive, delete, or reorganize? An agent optimizing for the literal goal might delete emails that are legally required for retention, eliminate correspondence needed for ongoing deals, or remove emails that employees consider important. Consequential agent actions require precise goal specification, explicit exclusion criteria, and human approval before irreversible actions.",
  },

  "module-8-building-with-agents": {
    id: "module-8-building-with-agents",
    moduleId: "module-8",
    sectionId: "building-with-agents",
    cardType: "section-card",
    content: "Building with AI agents requires: (1) Define the goal precisely with success and failure criteria; (2) Enumerate required tools and their access scopes; (3) Design the approval workflow — which actions require human confirmation; (4) Build comprehensive logging of all agent actions; (5) Implement rollback capabilities for reversible actions; (6) Start with constrained autonomy and expand as reliability is demonstrated; (7) Monitor production behavior continuously. Agents require more operational investment than chatbots.",
    summary: "Building production AI agents requires precise goal definition, scoped tools, approval workflows, comprehensive logging, rollback capability, and continuous monitoring.",
    question: null,
    explanation: null,
  },

  "module-8-module-quiz": {
    id: "module-8-module-quiz",
    moduleId: "module-8",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Apply AI agent evaluation frameworks — distinguishing agent types, assessing governance requirements, and identifying deployment risks.",
    summary: "Module 8 knowledge check on AI agent mechanics, types, risks, and governance requirements.",
    question: "A vendor claims their 'autonomous AI agent' can handle your entire procurement process without human involvement. What evaluation question should you ask first?",
    explanation: "Ask: 'What actions can the agent take, and which of those actions are irreversible?' Irreversible actions — placing purchase orders, committing budget, signing contracts — should never be fully autonomous without human approval checkpoints. A vendor who can't clearly enumerate the action boundaries of their 'autonomous' agent doesn't have a production-ready system. The degree of claimed autonomy should always be matched by an equally detailed governance specification.",
  },

  // ─────────────────────────────────────────────
  // MODULE 9 — Your AI Stack & Vendor Strategy
  // ─────────────────────────────────────────────

  "module-9-module-overview-section-card": {
    id: "module-9-module-overview-section-card",
    moduleId: "module-9",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module teaches organizations to architect and manage an AI software ecosystem without creating fragmentation, security gaps, or operational chaos. You'll examine integration strategy, procurement governance, interoperability, vendor dependency management, and how to design for long-term maintainability.",
    summary: "Module 9 teaches AI stack architecture — integration strategy, vendor dependency management, and long-term maintainability — to avoid fragmentation and chaos.",
    question: null,
    explanation: null,
  },

  "module-9-ai-workflows": {
    id: "module-9-ai-workflows",
    moduleId: "module-9",
    sectionId: "ai-workflows",
    cardType: "section-card",
    content: "AI workflow design determines how AI tools connect to business processes: (1) Input sources — where does data enter the workflow? (2) Processing steps — which AI tools transform data at each stage? (3) Output destinations — where do AI outputs go, and in what format? (4) Human touchpoints — where do humans review, approve, or intervene? (5) Error handling — what happens when AI output quality falls below threshold? Documenting these explicitly prevents operational chaos when multiple AI tools are in use.",
    summary: "AI workflow design maps input sources, processing steps, output destinations, human touchpoints, and error handling — preventing chaos in multi-tool deployments.",
    question: null,
    explanation: null,
  },

  "module-9-tool-selection": {
    id: "module-9-tool-selection",
    moduleId: "module-9",
    sectionId: "tool-selection",
    cardType: "section-card",
    content: "AI stack tool selection criteria: (1) Interoperability — does it connect to your other tools via API or native integration? (2) Data ownership — who owns data stored in the tool, and can you export it? (3) Pricing structure — per-seat, usage-based, or enterprise; which scales sustainably with your usage? (4) Vendor roadmap — is the vendor investing in capabilities you'll need in 2 years? (5) Support quality — do they offer SLAs and technical support for enterprise issues? (6) Security certifications — SOC 2, GDPR compliance, etc.",
    summary: "AI stack tool selection requires evaluating interoperability, data ownership, pricing scalability, vendor roadmap, support quality, and security certifications.",
    question: "An organization has 8 different AI tools purchased by different departments, each with separate data stores. What is the primary operational risk?",
    explanation: "Fragmented AI tool adoption creates data silos where tools can't share context or outputs, duplicates vendor spend, creates inconsistent governance and security policies, and makes it impossible to get a unified view of AI usage and risk. This is 'shadow AI stack' — the departmental equivalent of shadow IT. Centralized AI procurement governance with a defined tool evaluation process prevents this fragmentation from compounding.",
  },

  "module-9-prompting-assistants": {
    id: "module-9-prompting-assistants",
    moduleId: "module-9",
    sectionId: "prompting-assistants",
    cardType: "section-card",
    content: "Managing AI assistants at scale requires: (1) Shared prompt libraries — documented, tested prompts for common tasks that employees can use rather than reinventing each time; (2) System prompt governance — standardized configurations for AI tools with organizational context and constraints built in; (3) Version control for prompts — treating prompts as institutional assets that evolve and require change management; (4) Quality baselines — defined standards for acceptable AI output quality by use case.",
    summary: "AI assistant management at scale requires shared prompt libraries, system prompt governance, prompt version control, and quality baselines.",
    question: null,
    explanation: null,
  },

  "module-9-ai-project": {
    id: "module-9-ai-project",
    moduleId: "module-9",
    sectionId: "ai-project",
    cardType: "section-card",
    content: "AI project management differs from traditional software projects: (1) Requirements are often discovered through iteration, not specified upfront; (2) Performance depends on data quality, not just code quality; (3) Failure modes are probabilistic, not deterministic; (4) User expectations need calibration for AI-specific behaviors (hallucinations, inconsistency); (5) Evaluation requires ongoing monitoring, not just launch testing. Agile approaches with short feedback loops generally outperform waterfall for AI projects.",
    summary: "AI projects require iterative requirements, data-quality focus, probabilistic failure management, user expectation calibration, and ongoing monitoring — not waterfall methodology.",
    question: "Why does a traditional requirements-first project management approach often fail for AI implementations?",
    explanation: "AI capabilities and limitations are often discovered through iteration with real data, not predictable from upfront requirements. What seemed feasible before data inspection may prove difficult; unexpected capabilities may emerge. Detailed upfront requirements lock in assumptions that data will invalidate. Short agile cycles — 2-week sprints with concrete measurable deliverables — allow course correction before significant investment is locked in.",
  },

  "module-9-explain-ai-section-card": {
    id: "module-9-explain-ai-section-card",
    moduleId: "module-9",
    sectionId: "explain-ai",
    cardType: "section-card",
    content: "Explaining AI systems to stakeholders is a critical leadership skill. Effective AI communication: (1) Lead with business impact, not technical mechanism; (2) Acknowledge limitations explicitly — this builds credibility; (3) Use analogies that match the audience's experience; (4) Avoid precision theater — don't quote 'accuracy rates' without explaining what they mean in operational terms; (5) Be clear about what humans remain responsible for. Stakeholders who don't understand AI limitations make poor decisions about where to deploy it.",
    summary: "Explaining AI to stakeholders requires leading with business impact, acknowledging limitations, using accessible analogies, and clarifying human responsibility boundaries.",
    question: null,
    explanation: null,
  },

  "module-9-risk-check": {
    id: "module-9-risk-check",
    moduleId: "module-9",
    sectionId: "risk-check",
    cardType: "section-card",
    content: "AI stack risk checklist: (1) Data governance — do you know where all AI tools store data, and who can access it? (2) Vendor concentration — what happens if your primary AI vendor has an outage or pricing change? (3) Skill dependency — do you have internal capability to manage and adjust your AI systems, or are you dependent on a single vendor or agency? (4) Compliance coverage — are all AI tools in scope for your relevant regulatory frameworks? (5) Audit trail — can you explain any AI-influenced decision?",
    summary: "AI stack risk includes data governance gaps, vendor concentration, skill dependency, compliance coverage, and missing audit trails.",
    question: "An organization relies entirely on a single AI vendor for all automation, analytics, and generative AI needs. What risk does this create?",
    explanation: "Single-vendor dependency creates multiple risks: pricing leverage (vendor can increase costs once you're locked in), outage concentration (one failure affects all AI operations), roadmap alignment (vendor prioritizes features for their market, not yours), and switching cost accumulation (the longer you're locked in, the harder it is to leave). Diversification across 2–3 strategic vendors, combined with portable data practices, reduces this risk.",
  },

  "module-9-next-steps-section-card": {
    id: "module-9-next-steps-section-card",
    moduleId: "module-9",
    sectionId: "next-steps",
    cardType: "section-card",
    content: "AI stack next steps framework: (1) Audit existing tools — catalog all AI tools in use, their costs, data handling, and usage; (2) Identify redundancy — where do multiple tools solve the same problem? (3) Define your core stack — select 3–5 primary platforms that cover 80% of needs; (4) Establish procurement governance — all new AI tools go through an evaluation process; (5) Build internal capability — ensure you can operate and adjust your stack without full vendor dependency.",
    summary: "Building a sustainable AI stack requires auditing existing tools, eliminating redundancy, defining a core stack, establishing procurement governance, and building internal capability.",
    question: null,
    explanation: null,
  },

  "module-9-module-quiz": {
    id: "module-9-module-quiz",
    moduleId: "module-9",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Apply AI stack architecture principles — evaluating tool selection, vendor dependency, workflow integration, and governance.",
    summary: "Module 9 knowledge check on AI stack design, vendor risk, procurement governance, and workflow integration.",
    question: "A CFO asks why the company needs a formal AI procurement process when department heads can evaluate tools themselves. What is the strongest argument for centralization?",
    explanation: "Decentralized AI procurement creates inconsistent data governance (different tools with different privacy terms handling the same data types), uncontrolled vendor spend (duplicate tools purchased independently), fragmented security posture (tools approved without security review), and inability to negotiate enterprise pricing. Centralization doesn't mean slowing down procurement — it means creating a fast, clear process that includes data governance, security review, and cost governance as standard checkboxes.",
  },

  // ─────────────────────────────────────────────
  // MODULE 10 — The Future of AI & Strategic Positioning
  // ─────────────────────────────────────────────

  "module-10-module-overview-section-card": {
    id: "module-10-module-overview-section-card",
    moduleId: "module-10",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This final module examines where the AI industry is likely heading from a strategic and operational perspective. The focus is on organizational positioning as AI capabilities commoditize — not speculative AGI scenarios. You'll develop frameworks for maintaining competitive advantage in an environment where AI itself becomes table stakes.",
    summary: "Module 10 focuses on strategic positioning as AI commoditizes — building sustainable advantages beyond tool access.",
    question: null,
    explanation: null,
  },

  "module-10-current-frontiers-section-card": {
    id: "module-10-current-frontiers-section-card",
    moduleId: "module-10",
    sectionId: "current-frontiers",
    cardType: "section-card",
    content: "Current AI frontiers with near-term business implications: (1) Multimodal AI — models processing text, images, audio, and video simultaneously; (2) Long-context reasoning — handling hundreds of thousands of tokens enabling document-level analysis; (3) Agentic systems — AI taking multi-step autonomous actions; (4) AI-generated code at scale — software development acceleration; (5) Real-time AI inference — low-latency applications enabling interactive AI in products. Each frontier is moving from research toward production deployment.",
    summary: "Near-term AI frontiers — multimodal, long-context, agentic, code generation, and real-time inference — are moving from research to production deployment.",
    question: "Which current AI capability shift most significantly changes how organizations can use AI for knowledge work?",
    explanation: "Long-context reasoning — the ability to process and reason over very large documents — is transforming knowledge work AI applications. AI can now analyze entire legal contracts, full financial reports, complete research libraries, or lengthy correspondence threads in a single context. This eliminates the chunking limitations that previously required complex preprocessing for document analysis, making many previously impractical applications viable.",
  },

  "module-10-agi-explained": {
    id: "module-10-agi-explained",
    moduleId: "module-10",
    sectionId: "agi-explained",
    cardType: "section-card",
    content: "AGI (Artificial General Intelligence) — AI that matches or exceeds human cognitive capability across all domains — is a debated concept with no consensus on definition, timeline, or likelihood. For business leaders, the operationally relevant question isn't 'when is AGI coming' but 'how do we build organizational capability that creates value as AI improves incrementally over the next 3–5 years?' Planning for AGI is less valuable than executing well on current AI capabilities.",
    summary: "AGI timelines are uncertain and debated — business leaders should focus on 3–5 year incremental AI capability planning rather than AGI speculation.",
    question: "Why should business leaders focus on near-term AI capabilities rather than AGI planning?",
    explanation: "AGI timelines range from 'never' to '5 years' among credible researchers — the uncertainty is too high for operational planning. Meanwhile, current AI capabilities are already creating measurable competitive advantage and disadvantage. Organizations that build AI literacy, governance, and workflow integration now will be positioned to adopt more powerful capabilities as they emerge. Organizations waiting for AGI are already falling behind on current capabilities.",
  },

  "module-10-ai-governance": {
    id: "module-10-ai-governance",
    moduleId: "module-10",
    sectionId: "ai-governance",
    cardType: "section-card",
    content: "AI governance is evolving from voluntary to regulatory. Active regulatory frameworks: EU AI Act (risk-based classification of AI systems), US executive AI guidance, emerging sector-specific rules in healthcare, finance, and employment. Organizations should: (1) Track regulatory developments in their jurisdictions; (2) Inventory AI systems by risk level; (3) Maintain explainability documentation for consequential decisions; (4) Designate AI governance ownership; (5) Build regulatory readiness into AI procurement, not just as retrofit compliance.",
    summary: "AI regulation is shifting from voluntary to mandatory — organizations should track jurisdiction-specific frameworks and build compliance into AI procurement from the start.",
    question: "Under risk-based AI governance frameworks like the EU AI Act, which AI application category typically faces the highest compliance burden?",
    explanation: "High-risk AI applications — those affecting employment decisions, credit, healthcare, law enforcement, critical infrastructure, and education — face the most stringent requirements including mandatory risk assessments, human oversight, transparency documentation, and conformity assessments. Organizations deploying AI in these domains should assess their compliance obligations before deployment, not after regulatory enforcement begins.",
  },

  "module-10-ai-careers": {
    id: "module-10-ai-careers",
    moduleId: "module-10",
    sectionId: "ai-careers",
    cardType: "section-card",
    content: "AI is reshaping career trajectories across functions. Growing roles: AI prompt engineers, AI product managers, AI governance specialists, ML engineers, AI trainers. Evolving roles: data analysts (augmented by AI), software engineers (with AI coding tools), content creators (with generative tools), customer service managers (supervising AI systems). Declining task demand: data entry, routine reporting, basic content production. The career advantage goes to professionals who can work alongside AI systems effectively, not those who resist them.",
    summary: "AI creates new roles in governance, product, and engineering while reshaping most existing roles — career advantage goes to professionals who work effectively alongside AI.",
    question: null,
    explanation: null,
  },

  "module-10-your-ai-future": {
    id: "module-10-your-ai-future",
    moduleId: "module-10",
    sectionId: "your-ai-future",
    cardType: "section-card",
    content: "Strategic positioning in an AI-driven economy: Competitive advantage will not come from access to AI tools — those will be commoditized. Advantage will come from: (1) Proprietary data — unique datasets competitors can't access; (2) Workflow integration depth — AI deeply embedded in operations rather than surface-level tools; (3) Organizational speed — the ability to experiment, learn, and adapt faster than competitors; (4) AI talent — people who can identify, implement, and improve AI applications; (5) Customer relationships — trust that persists as AI enables faster service. The race is not about AI access. It's about AI execution.",
    summary: "AI competitive advantage comes from proprietary data, workflow integration depth, organizational speed, AI talent, and customer trust — not tool access.",
    question: "As AI capabilities become widely accessible commodities, what will be the primary source of competitive advantage?",
    explanation: "When every competitor has access to the same AI tools, the differentiator becomes execution: How fast do you identify valuable applications? How deeply do you integrate AI into workflows? How quickly do you build organizational learning? How well do you govern AI deployments? The organizations that win will be those that build AI execution capability as a core competency — not those that have the best AI tools in a world where AI tools are increasingly uniform.",
  },

  "module-10-module-quiz": {
    id: "module-10-module-quiz",
    moduleId: "module-10",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Apply strategic AI positioning frameworks — evaluating AI frontiers, governance readiness, and competitive differentiation in an AI-commoditized environment.",
    summary: "Module 10 knowledge check on AI strategic positioning, governance readiness, and competitive differentiation.",
    question: "A competitor announces they have deployed the same AI tools your organization uses. What is the most strategically significant response?",
    explanation: "Tool parity means the competitive battle shifts entirely to execution: workflow integration depth, employee AI capability, governance that enables rather than blocks, and speed of continuous improvement. The response is not to find new tools — it's to go deeper with existing ones, move faster on adoption, and invest in proprietary data and workflow integration that can't be replicated by simply purchasing the same software licenses.",
  },
};

const MODULE_SECTION_LEARNING_CONTENT: Record<string, Record<string, SectionLearningContent>> =
  Object.values(CARD_KNOWLEDGE_REGISTRY_BY_ID).reduce(
    (acc, entry) => {
      const moduleSections = acc[entry.moduleId] ?? (acc[entry.moduleId] = {})
      // Scenario and quick-check cards share section content; keep first seen value.
      if (!moduleSections[entry.sectionId] && entry.content) {
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
  question: string | null
  explanation: string | null
}

type ComponentCardMetadata = {
  moduleId?: string
  sectionId?: string
  content?: SectionLearningContent | null
  summary?: string | null
}

export class ComponentCard implements ComponentExplanation {
  id: string
  question: string | null
  explanation: string | null
  moduleId?: string
  sectionId?: string
  content?: SectionLearningContent | null
  summary?: string | null

  constructor(explanation: ComponentExplanation, metadata: ComponentCardMetadata = {}) {
    this.id = explanation.id
    this.question = explanation.question
    this.explanation = explanation.explanation
    this.moduleId = metadata.moduleId
    this.sectionId = metadata.sectionId
    this.content = metadata.content
    this.summary = metadata.summary
  }

  withExplanation(explanation: string | null): ComponentCard {
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
  if (card) {
    return card.toExplanation()
  }

  const sectionMatch = componentId.match(/^(module-\d+)-(.+)-(scenario|quick-check)$/)
  if (sectionMatch) {
    const moduleId = sectionMatch[1]
    const sectionId = sectionMatch[2]
    const sectionCard = Object.values(COMPONENT_CARD_REGISTRY).find(
      (entry) => entry.moduleId === moduleId && entry.sectionId === sectionId,
    )
    return sectionCard ? sectionCard.toExplanation() : undefined
  }

  const courseQuizMatch = componentId.match(/^(module-\d+)-course-quiz$/)
  if (courseQuizMatch) {
    const moduleId = courseQuizMatch[1]
    const moduleQuizCard = Object.values(COMPONENT_CARD_REGISTRY).find(
      (entry) => entry.moduleId === moduleId && entry.sectionId === "module-quiz",
    )
    if (moduleQuizCard) {
      return moduleQuizCard.toExplanation()
    }

    const moduleCardWithExplanation = Object.values(COMPONENT_CARD_REGISTRY).find(
      (entry) => entry.moduleId === moduleId && entry.explanation,
    )
    return moduleCardWithExplanation ? moduleCardWithExplanation.toExplanation() : undefined
  }

  return undefined
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
    .filter((exp) => (exp.question ?? "").toLowerCase().includes(lowerQuery) || (exp.explanation ?? "").toLowerCase().includes(lowerQuery))
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
        title: MODULE_BLUEPRINTS[moduleId]?.title ?? (
          Number.isFinite(moduleNumber)
            ? `Module ${moduleNumber}`
            : toTitleCaseFromSlug(moduleId)
        ),
        description: MODULE_BLUEPRINTS[moduleId]?.description,
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
  explanation: string | null
  options: ModuleQuizOption[]
  correctOptionId: string
}

export const moduleQuizData: Record<string, ModuleQuizQuestion[]> = {
  "module-0": [
    {
      key: "quiz1",
      prompt: "What is the best first move after finishing Module 0?",
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
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
      explanation: null,
      correctOptionId: "b",
      options: [
        { id: "a", label: "Following every trend equally" },
        { id: "b", label: "Selecting focused bets aligned to competitive advantage" },
        { id: "c", label: "Outsourcing all strategic decisions to vendors" },
      ],
    },
  ],
}




