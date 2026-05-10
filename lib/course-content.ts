export type SectionLearningContent = string

export type CourseContentEntry = {
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
    title: "Module 1: AI Landscape, Agents, Automation and Tools",
    description: "Models, tools, agencies, prompt workflows, and agent automation systems mapped for decisions.",
    coreThemes: [],
  },
  "module-2": {
    title: "Module 2: Business Value and ROI",
    description: "Find high-ROI use cases, calculate value honestly, and prioritize opportunities with confidence.",
    coreThemes: [],
  },
  "module-3": {
    title: "Module 3: Agency, Partner Selection & Future Positioning",
    description: "Run vendor diligence, structure pilots, and position your organization for durable AI advantage.",
    coreThemes: [],
  },
  "module-4": {
    title: "Module 4: Risk, Governance & Adoption Roadmap",
    description: "Implement guardrails for data, reliability, compliance, and vendors ??then translate strategy into pilots, change management, and a maintainable AI ecosystem.",
    coreThemes: [],
  },
}

export const COURSE_CONTENT_REGISTRY: Record<string, CourseContentEntry> = {

  // ?????????????????????????????????????????????
  // MODULE 0 ??The AI Shift: What's Actually Happening
  // ?????????????????????????????????????????????

  "module-0-welcome": {
    id: "module-0-welcome",
    moduleId: "module-0",
    sectionId: "welcome",
    cardType: "section-card",
    content: "Welcome to The AI Shift. This course is designed for business leaders, operators, and decision-makers who need a realistic, no-hype understanding of what AI means for their organizations. You won't find speculation or sci-fi here ??just practical frameworks for navigating one of the most significant operational shifts in modern business.",
    summary: "A practical, no-hype course for business leaders who need clear frameworks to navigate AI's impact on their organizations.",
    question: "Who is this course designed for, and what makes it different from other AI courses?",
    explanation: "This course is built for business leaders, operators, and decision-makers ??not data scientists or engineers. The defining difference is its grounding in operational reality. Rather than speculating about AI's future or cataloguing every tool on the market, it focuses on practical frameworks you can apply immediately: how to evaluate tools, build governance, calculate ROI, run pilots, and position your organization strategically. If you've sat through AI presentations full of buzzwords and left with no clearer sense of what to actually do, this course is the antidote.",
  },

  "module-0-ai-is-everywhere": {
    id: "module-0-ai-is-everywhere",
    moduleId: "module-0",
    sectionId: "ai-is-everywhere",
    cardType: "section-card",
    content: "AI is no longer a future trend ??it's already embedded in business tools you use daily: CRM systems, email platforms, hiring software, financial models, and customer support. The question isn't whether AI will affect your industry. It already has. The question is whether your organization is positioned to benefit from it or fall behind.",
    summary: "AI is already embedded in mainstream business tools today ??the question is no longer whether it will affect your industry, but whether you're positioned to benefit.",
    question: "Why is treating AI as a 'future trend' a strategic mistake for business leaders right now?",
    explanation: "AI isn't approaching ??it's already inside the systems your organization relies on daily. CRM platforms use AI to score leads. Email tools use it to predict replies. Hiring software ranks candidates automatically. Financial models flag anomalies. When you treat AI as a future concern, you're making decisions with an outdated map. Competitors who understand what's already deployed are making faster, better-informed decisions about hiring, budgeting, customer service, and operations. The compounding effect of this gap is what makes delayed awareness genuinely costly, not just theoretically suboptimal.",
  },

  "module-0-what-youll-learn": {
    id: "module-0-what-youll-learn",
    moduleId: "module-0",
    sectionId: "what-youll-learn",
    cardType: "section-card",
    content: "Across 5 modules, you will learn how to evaluate AI tools, build governance frameworks, calculate ROI, design adoption roadmaps, assess vendor claims, identify high-value automation opportunities, and position your organization strategically as AI capabilities evolve. Each module is grounded in operational reality ??not theory.",
    summary: "Five modules covering AI tool evaluation, ROI measurement, governance, vendor assessment, adoption roadmaps, and long-term strategic positioning.",
    question: "What concrete skills and frameworks will I walk away with after completing this course?",
    explanation: "By the end of this course, you'll be able to do things you likely can't do confidently today: evaluate an AI vendor's claims against operational criteria rather than marketing language; calculate a defensible ROI projection for an AI initiative; design a governance policy that prevents data leakage without killing adoption; run a structured pilot that produces real evidence; prioritize automation opportunities across your organization using a weighted framework; and communicate AI strategy clearly to both technical and non-technical stakeholders. These aren't abstract competencies ??each module delivers a specific tool or framework you can apply before moving to the next one.",
  },

  "module-0-how-to-use-course": {
    id: "module-0-how-to-use-course",
    moduleId: "module-0",
    sectionId: "how-to-use-course",
    cardType: "section-card",
    content: "Each module contains concept cards, knowledge checks, and applied frameworks you can use immediately. Move at your own pace. Prioritize modules most relevant to your current role or decision-making context. The course is designed for non-linear use ??if you're facing an immediate AI procurement decision, jump to Module 3. If governance is your urgent challenge, start with Module 4.",
    summary: "The course is designed for non-linear, self-paced use ??jump directly to the module most relevant to your current challenge.",
    question: "How should I navigate this course if I have an immediate AI decision to make?",
    explanation: "This course is intentionally non-linear. Each module is self-contained and immediately applicable. If you're evaluating vendors this week, start with Module 3. If the board just asked for an AI governance policy, go to Module 4. If someone handed you an AI budget and asked for ROI projections, begin with Module 2. You don't need to complete Module 1 before Module 4 produces value for you. The recommended path for someone without an immediate pressure point is sequential ??Module 0 builds the mindset that makes every subsequent module more useful. But urgency should override sequence whenever it exists.",
  },

  "module-0-summary": {
    id: "module-0-summary",
    moduleId: "module-0",
    sectionId: "summary",
    cardType: "section-card",
    content: "AI represents a genuine operational and competitive shift ??not another technology hype cycle. Organizations that develop a structured, realistic approach to AI adoption will build durable advantages. Those that react slowly, chase trends, or misunderstand the fundamentals will face compounding disadvantages. This course gives you the frameworks to act with clarity.",
    summary: "AI is a structural business shift ??organizations with structured, realistic adoption approaches build durable advantages while reactive or uninformed ones face compounding disadvantage.",
    question: "What separates organizations that build lasting AI advantages from those that fall behind?",
    explanation: "The gap isn't primarily about which tools you buy or how much you spend. It's about the quality of your approach. Organizations that build lasting AI advantages share three characteristics: they understand the fundamentals well enough to evaluate claims critically; they adopt AI through structured processes rather than trend-chasing; and they invest in governance and change management alongside tool deployment. Organizations that fall behind typically do the opposite ??they either over-invest in expensive tools without operational readiness, or they wait for certainty that never arrives. Both are reactive postures. This course is designed to give you the proactive, structured approach that compounds over time.",
  },

  // ?????????????????????????????????????????????
  // MODULE 1 ??Understanding the AI Landscape
  // ?????????????????????????????????????????????

  "module-1-module-overview-section-card": {
    id: "module-1-module-overview-section-card",
    moduleId: "module-1",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module cuts through AI marketing language to give you a working map of the actual AI industry. You'll learn how the ecosystem is structured ??from foundational model providers to SaaS wrappers to implementation agencies ??so you can make informed decisions about which layers matter for your organization.",
    summary: "A practical map of the AI ecosystem, from foundational model providers to SaaS tools to agencies, so you can make decisions at the right layer.",
    question: "Why do business leaders need to understand how the AI industry is structured, not just which tools exist?",
    explanation: "Most AI products are not what they appear to be. A 'custom AI solution' from a boutique agency is usually a thin interface built on top of OpenAI or Anthropic's foundational models. An enterprise SaaS tool marketed as proprietary AI may be GPT-4 with a branded wrapper. When you understand the three-layer structure ??foundational models, product/SaaS layer, implementation/agency layer ??you can ask better questions: Where is the actual intelligence coming from? What happens if the underlying model provider changes pricing? What am I actually paying for that I couldn't get direct? This structural literacy prevents vendor dependency, overpriced solutions, and misinformed procurement decisions.",
  },

  "module-1-defining-ai-section-card": {
    id: "module-1-defining-ai-section-card",
    moduleId: "module-1",
    sectionId: "defining-ai",
    cardType: "section-card",
    content: "Artificial Intelligence refers to software systems that perform tasks typically requiring human judgment ??pattern recognition, language understanding, decision-making, and prediction. Modern AI is primarily powered by machine learning: systems trained on large datasets to identify patterns rather than following hand-written rules. 'AI' is a broad umbrella ??most business-relevant AI today falls into a subset called generative AI and predictive ML.",
    summary: "AI is software that performs judgment-like tasks through pattern learning rather than hand-coded rules ??with generative AI and predictive ML being the most business-relevant subsets today.",
    question: "What does it actually mean for a system to 'use AI,' and why does the distinction matter for business decisions?",
    explanation: "When a vendor says their product 'uses AI,' that statement could describe anything from a simple spam filter to a sophisticated language model. The meaningful distinction is how the system works: rule-based systems follow explicit instructions written by programmers and are predictable but rigid; machine learning systems learn patterns from data and are flexible but probabilistic. This distinction matters operationally because ML systems can be wrong in unpredictable ways, degrade as data changes over time, and require quality training data to work at all. A leader who understands this asks better evaluation questions: What data was this trained on? How does it behave when inputs change? What's the error rate, and who bears the consequence of errors?",
  },

  "module-1-brief-history": {
    id: "module-1-brief-history",
    moduleId: "module-1",
    sectionId: "brief-history",
    cardType: "section-card",
    content: "AI has existed as a research field since the 1950s, but practical business applications only accelerated dramatically after 2017 with the invention of the Transformer architecture. This breakthrough enabled large language models (LLMs) like GPT, Claude, and Gemini. The release of ChatGPT in late 2022 brought generative AI into mainstream business consciousness ??compressing what might have been a decade of adoption into two years.",
    summary: "The 2017 Transformer architecture breakthrough and 2022 ChatGPT launch compressed a decade of AI adoption into two years, creating the current business urgency.",
    question: "Why did AI suddenly feel urgent for businesses around 2022??023, and what actually changed?",
    explanation: "AI research had been advancing for decades, but two specific developments collapsed the adoption timeline. First, the 2017 Transformer architecture made it possible to train much larger models on much more data with dramatically better language results. This eventually produced GPT-3, then GPT-4, Claude, and Gemini. Second, OpenAI's decision to release ChatGPT as a free consumer product in late 2022 put a powerful AI directly in the hands of hundreds of millions of people ??including employees, customers, and competitors. The combination of a genuine capability leap and sudden mass accessibility is what created the current urgency. Understanding this history helps leaders distinguish real capability advances from marketing cycles.",
  },

  "module-1-types-of-ai-section-card": {
    id: "module-1-types-of-ai-section-card",
    moduleId: "module-1",
    sectionId: "types-of-ai",
    cardType: "section-card",
    content: "Business-relevant AI falls into several categories: (1) Generative AI ??creates text, images, code, audio; (2) Predictive ML ??forecasts outcomes from historical data; (3) Computer Vision ??analyzes images and video; (4) Speech AI ??transcribes and synthesizes audio; (5) Robotic Process Automation (RPA) ??automates rule-based digital tasks. Most enterprise 'AI' projects combine multiple categories. Understanding which type solves which problem prevents expensive mismatches.",
    summary: "Five AI categories matter most for business ??generative, predictive, vision, speech, and automation ??and matching the right type to the right problem is the most critical evaluation skill.",
    question: "How do I know which type of AI is right for a specific business problem?",
    explanation: "The match between AI type and business problem is one of the most consequential decisions in any AI project ??and one of the most commonly botched. Start with the nature of the output you need: if you need to create content (text, images, code), generative AI is the right category. If you need to forecast or classify ??who's likely to churn, which invoice is fraudulent, which lead will convert ??predictive ML is the answer. If your data is visual ??quality inspection images, security footage, medical scans ??computer vision applies. If your data is audio ??call transcriptions, voice commands ??speech AI is the tool. If you're automating a repetitive rule-based digital process ??moving data between systems, filling forms ??RPA is often faster and cheaper than ML. Applying generative AI to a prediction problem, or ML to a content creation problem, is a category error that produces expensive failures.",
  },

  "module-1-ai-in-your-life": {
    id: "module-1-ai-in-your-life",
    moduleId: "module-1",
    sectionId: "ai-in-your-life",
    cardType: "section-card",
    content: "You interact with AI systems constantly without recognizing them: spam filters, recommendation engines, fraud detection, search ranking, GPS route optimization, autocomplete, and facial recognition are all AI. This ubiquity is important context ??AI is not a single product but a class of approaches embedded across digital infrastructure. The 'new' wave of generative AI sits on top of this existing foundation.",
    summary: "AI is already embedded invisibly in daily digital life ??from spam filters to GPS routing ??and generative AI is the newest visible layer of a much deeper existing infrastructure.",
    question: "If AI has been around for years in spam filters and recommendations, what's actually new about the current wave?",
    explanation: "The AI in spam filters and recommendation engines is narrow and specialized ??it does one thing well based on a specific training task. What changed with the current generative AI wave is breadth and accessibility. A large language model like Claude or GPT-4 can write code, analyze contracts, summarize research, draft emails, explain complex concepts, and reason across diverse domains ??all from a single model, accessible through a chat interface anyone can use. The combination of general-purpose capability and zero-friction access is genuinely new. Previous AI required significant technical effort to deploy for any specific task. Current generative AI can be productively used in minutes by a non-technical employee. That accessibility is what makes it a business-level shift rather than an IT-level upgrade.",
  },

  "module-1-ai-writing": {
    id: "module-1-ai-writing",
    moduleId: "module-1",
    sectionId: "ai-writing",
    cardType: "section-card",
    content: "AI writing tools (ChatGPT, Claude, Gemini, Jasper, Copy.ai) generate text from prompts. Business applications include drafting emails, summarizing documents, creating marketing copy, generating reports, and synthesizing research. Key limitations: AI writing requires human review for accuracy, can produce confident-sounding errors (hallucinations), and may reflect training data biases. Best used as a drafting accelerator, not a final publisher.",
    summary: "AI writing tools accelerate drafting and synthesis but hallucinate confidently ??human review before publication is non-negotiable for any consequential output.",
    question: "What's the right mental model for using AI writing tools in a professional business context?",
    explanation: "Think of AI writing tools as an extremely fast first-draft engine, not a publishing system. They are exceptional at getting words on the page quickly: drafting an email, sketching a proposal structure, summarizing a long document, generating five variations of a headline. Where they break down is reliability for factual claims. AI writing tools predict what text should come next based on patterns ??they don't look things up or verify facts. The result is output that sounds authoritative and reads fluently but may contain invented statistics, incorrect dates, or fabricated citations. In business contexts, an unreviewed AI output that goes to a client, regulator, or public audience carries real reputational and legal risk. The professional standard is: AI drafts, humans verify and publish.",
  },

  "module-1-ai-images": {
    id: "module-1-ai-images",
    moduleId: "module-1",
    sectionId: "ai-images",
    cardType: "section-card",
    content: "AI image generation tools (Midjourney, DALL-E, Stable Diffusion, Firefly) create images from text descriptions. Business uses include marketing assets, concept visualization, product mockups, and presentation graphics. Key considerations: IP ownership of AI-generated images is legally unsettled in many jurisdictions, outputs may contain biases from training data, and brand consistency requires careful prompting and curation.",
    summary: "AI image generation has clear marketing and design utility, but commercial use carries unsettled IP risk ??legal review and IP indemnification policies are essential before business deployment.",
    question: "What legal and governance issues should my organization resolve before using AI-generated images commercially?",
    explanation: "Three legal issues deserve attention before commercially deploying AI-generated images. First, ownership: in most jurisdictions, the copyright status of AI-generated images is contested ??courts are still determining whether AI outputs are copyrightable and by whom. Second, training data liability: several lawsuits allege that AI image generators trained on copyrighted images without consent create liability for commercial outputs. Third, disclosure requirements: some jurisdictions and platforms now require disclosure when content is AI-generated, particularly in advertising contexts. The most risk-conscious enterprise approach is to use tools that provide explicit IP indemnification (Adobe Firefly currently offers the strongest enterprise indemnification policy) and to run any significant commercial use through legal review while this regulatory landscape develops.",
  },

  "module-1-ai-productivity": {
    id: "module-1-ai-productivity",
    moduleId: "module-1",
    sectionId: "ai-productivity",
    cardType: "section-card",
    content: "AI productivity tools embed into existing workflows: Microsoft Copilot integrates with Office 365, Google Gemini with Workspace, Notion AI with notes, and Salesforce Einstein with CRM. These embedded tools reduce context-switching and accelerate common tasks like summarization, scheduling, search, and drafting. The productivity ceiling depends on workflow design, not just tool access ??most teams underutilize embedded AI by 70??0%.",
    summary: "Embedded AI productivity tools reduce workflow friction, but most teams capture only 20??0% of available value without deliberate workflow redesign and adoption investment.",
    question: "Our company bought Microsoft Copilot licenses but productivity hasn't changed. What's going wrong?",
    explanation: "This is the most common AI productivity story, and the cause is almost always the same: tool access was provided but workflow change was not. Buying AI licenses is the easy part. The hard part is changing how people work ??and that requires three things tool purchases don't provide. First, deliberate workflow redesign: identifying which specific tasks in each role AI should handle, and explicitly changing the process so AI is the default first step. Second, role-specific training: general AI awareness training doesn't create behavior change; people need to practice AI on their actual work tasks. Third, habit formation with accountability: someone needs to track whether AI is actually being used for the intended tasks and follow up when it isn't. Organizations that capture 60??0%+ of available productivity value from embedded AI invest in all three of these alongside the license.",
  },

  "module-1-ai-creative": {
    id: "module-1-ai-creative",
    moduleId: "module-1",
    sectionId: "ai-creative",
    cardType: "section-card",
    content: "AI creative tools assist with music (Suno, Udio), video (Runway, Pika), design (Adobe Firefly, Canva AI), and voice (ElevenLabs). These tools are genuine force multipliers for small creative teams and individual operators. Enterprise adoption requires governance around brand standards, legal review of outputs, and clear policies on AI disclosure ??especially as regulatory frameworks around AI-generated media develop.",
    summary: "AI creative tools multiply output capacity for small teams, but enterprise adoption requires brand governance, legal review, and proactive disclosure policies ahead of evolving regulation.",
    question: "How should an enterprise marketing team govern AI creative tool use without slowing down production?",
    explanation: "The governance challenge with AI creative tools is balancing speed ??which is the whole point ??against consistency and compliance. A practical framework has three components. First, pre-approved tool lists: vet tools for IP indemnification, data handling, and brand configuration capability, then publish an approved list so teams don't have to re-litigate tool selection each time. Second, brand configuration standards: document the style guides, color palettes, and tone parameters that should be applied across all AI-generated creative, and test each tool against them before approval. Third, disclosure protocols: decide now how your organization handles disclosure of AI-generated content ??in ad copy, social media, press materials, and internal communications ??rather than reacting when a regulator or journalist asks. Proactive governance is dramatically faster than reactive cleanup.",
  },

  "module-1-myths-vs-reality": {
    id: "module-1-myths-vs-reality",
    moduleId: "module-1",
    sectionId: "myths-vs-reality",
    cardType: "section-card",
    content: "Common AI myths in business: (1) 'AI understands what it's doing' ??it predicts patterns, not meaning; (2) 'AI will replace most jobs immediately' ??task automation differs from job elimination; (3) 'AI is always objective' ??it reflects training data biases; (4) 'More expensive AI is always better' ??fit to workflow matters more than raw capability; (5) 'We need to wait for the right moment' ??inaction has compounding competitive cost.",
    summary: "Five persistent AI myths ??understanding, immediate job replacement, objectivity, cost-quality correlation, and timing ??distort business decisions and must be replaced with accurate mental models.",
    question: "What are the most dangerous AI misconceptions, and how do they lead to bad business decisions?",
    explanation: "Each of the five major AI myths produces a specific failure mode. Believing AI 'understands' leads to over-trusting outputs without review ??the source of most AI-related errors that reach customers. Believing jobs will be immediately eliminated leads to either panic-driven policy or avoidance-driven inaction, both of which are worse than measured planning. Believing AI is objective leads to deploying biased systems without audit, creating legal exposure and unfair outcomes at scale. Believing more expensive always means better leads to overpaying for flagship models when a cheaper, smaller model would have served the workflow perfectly. And believing you need to wait for the right moment is perhaps the costliest myth of all ??because there is no stable moment to wait for; the organizations building AI literacy and operational experience now will always be ahead of those waiting for certainty.",
  },

  "module-1-choosing-tools-section-card": {
    id: "module-1-choosing-tools-section-card",
    moduleId: "module-1",
    sectionId: "choosing-tools",
    cardType: "section-card",
    content: "Choosing AI tools requires matching capability to workflow need, not chasing benchmarks. Key evaluation dimensions: (1) Does it integrate with existing systems? (2) What data does it require, store, or transmit? (3) What are the total cost of ownership implications? (4) How does it handle errors or failures? (5) Is the vendor financially stable? Most tool selection mistakes happen because teams evaluate demos rather than operational fit.",
    summary: "AI tool selection should be driven by workflow fit, integration, data governance, and vendor stability ??not benchmark rankings or demo quality.",
    question: "What's the most reliable evaluation process for choosing between competing AI tools?",
    explanation: "The most reliable AI tool evaluation process has five steps, and most organizations skip at least three of them. First, define the specific workflow problem before looking at any tools ??write down what task you're solving, who performs it today, how long it takes, and what good output looks like. Second, test with real work samples from your actual environment, not vendor-provided demo data. Third, calculate total cost of ownership including per-seat licensing at scale, implementation time, IT integration cost, training, and ongoing maintenance ??not just the advertised price. Fourth, review data handling terms specifically: what data enters the tool, where it's stored, whether it's used for training, and what the deletion policy is. Fifth, check vendor financial stability ??an AI tool built on a startup that runs out of funding is a migration project waiting to happen. The tool that wins demos almost never wins production.",
  },

  "module-1-module-quiz": {
    id: "module-1-module-quiz",
    moduleId: "module-1",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Test your understanding of the AI landscape: foundational model providers, tool categories, common myths, and evaluation criteria.",
    summary: "Module 1 knowledge check ??validate your grasp of the AI ecosystem structure, tool categories, myth-busting, and practical evaluation principles.",
    question: "A vendor says their product is 'powered by proprietary AI.' What questions should this immediately prompt?",
    explanation: "The phrase 'proprietary AI' is one of the most overused and least meaningful in the industry. The questions it should prompt are: What foundational model is this actually built on? Is the AI component the model itself, or is it the workflow integration and interface built around a third-party model? What would happen to your data and operations if this vendor were acquired or shut down? What does 'proprietary' specifically refer to ??is it the training data, the fine-tuning process, the interface, or genuinely a from-scratch model? In most cases, 'proprietary AI' means a product built on top of OpenAI, Anthropic, or Google's foundational models with custom prompting and a branded interface. This isn't necessarily bad ??but it has significant implications for vendor dependency, long-term pricing risk, and what you're actually paying for.",
  },

  // ?????????????????????????????????????????????
  // MODULE 2 ??Where AI Actually Creates Business Value
  // ?????????????????????????????????????????????

  "module-2-module-overview-section-card": {
    id: "module-2-module-overview-section-card",
    moduleId: "module-2",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module focuses on where AI generates measurable operational and financial value. Rather than reviewing technical ML theory, you'll learn to identify high-ROI workflows, recognize operational bottlenecks AI can address, and distinguish between automation (replacing tasks) and augmentation (enhancing human capability). The goal is to help you prioritize intelligently.",
    summary: "Module 2 teaches leaders to identify where AI creates measurable operational value by distinguishing high-ROI workflows from lower-leverage applications ??and automation from augmentation.",
    question: "How do I figure out where AI will actually create real value in my organization versus where it's just hype?",
    explanation: "The discipline of AI opportunity identification comes down to two filters. First, look for high-frequency, high-effort tasks with clear measurable outputs: a task performed daily, costing significant time, producing a predictable output type, and generating data you already have is almost always a better AI candidate than a complex, infrequent, judgment-heavy process. Second, distinguish between automation opportunities (where AI replaces a human task entirely) and augmentation opportunities (where AI makes a human faster or better). Augmentation is often higher-ROI early in adoption because it requires less infrastructure, carries lower risk, and generates immediate employee buy-in. The most reliable early wins are in functions with high task volume, existing digital data, and clear success metrics ??sales, marketing, customer support, and finance lead the list.",
  },

  "module-2-what-is-ml-section-card": {
    id: "module-2-what-is-ml-section-card",
    moduleId: "module-2",
    sectionId: "what-is-ml",
    cardType: "section-card",
    content: "Machine learning is the process by which AI systems learn from data rather than following explicit rules. A spam filter isn't programmed with a list of spam words ??it's trained on millions of emails labeled spam or not spam, and learns to recognize patterns. This matters operationally because ML systems require quality training data, can degrade over time as data changes, and make probabilistic rather than deterministic decisions.",
    summary: "Machine learning systems learn patterns from data rather than following rules ??making data quality and ongoing monitoring critical operational requirements, not one-time setup.",
    question: "Why does it matter that ML systems learn from data rather than following rules? What changes operationally?",
    explanation: "Rule-based systems behave exactly as programmed ??their errors are predictable, their behavior is auditable, and they don't change unless someone changes the code. ML systems behave based on patterns they learned from historical data, which creates three operational realities rules-based systems don't have. First, data quality becomes a direct determinant of system quality ??garbage training data produces unreliable models. Second, ML systems degrade as the world changes and data distributions shift, so they require ongoing monitoring and periodic retraining rather than one-time deployment. Third, ML systems make probabilistic decisions ??they give you a confidence level, not a certainty, which means they're sometimes wrong in ways that are hard to predict. Each of these has downstream implications for how you deploy, monitor, and govern ML-based AI systems.",
  },

  "module-2-neural-networks-section-card": {
    id: "module-2-neural-networks-section-card",
    moduleId: "module-2",
    sectionId: "neural-networks",
    cardType: "section-card",
    content: "Neural networks are the architectural foundation of modern AI. Loosely inspired by biological neurons, they consist of layers of mathematical operations that transform inputs into outputs. Deep learning refers to neural networks with many layers ??'deep' describes depth, not sophistication. For business leaders, the key insight is that neural networks learn representations automatically from data, which is why they excel at tasks like image recognition, language understanding, and complex pattern detection.",
    summary: "Neural networks learn internal data representations automatically through layered math ??this automatic feature learning is why they outperform older methods on complex, unstructured problems.",
    question: "What do business leaders actually need to understand about neural networks to make better AI decisions?",
    explanation: "You don't need to understand the math of neural networks to make good AI decisions, but one conceptual insight is genuinely useful: neural networks learn their own feature representations from raw data rather than requiring human experts to define what to look for. Older ML methods needed humans to manually decide which features of an email indicated spam. A neural network trained on millions of emails figures out what to look for on its own. This automatic representation learning is why neural networks excel at messy, unstructured data ??images, text, audio ??that would be nearly impossible to hand-code rules for. For business decisions, this matters because it means you don't need domain experts to pre-define every relevant signal, but you do need large quantities of clean, representative training data for the network to learn from.",
  },

  "module-2-training-data-section-card": {
    id: "module-2-training-data-section-card",
    moduleId: "module-2",
    sectionId: "training-data",
    cardType: "section-card",
    content: "Training data is the foundation of any ML system. The quality, quantity, representativeness, and labeling accuracy of training data determines the ceiling of what an AI system can achieve. Common training data problems: (1) Insufficient volume; (2) Labeling errors; (3) Unrepresentative samples (e.g., only training on data from certain demographics); (4) Historical bias embedded in labels; (5) Data leakage ??where test data bleeds into training, creating falsely optimistic performance metrics.",
    summary: "Training data quality, volume, representativeness, and label accuracy determine what any ML system can achieve ??and common data problems are the leading cause of expensive AI project failures.",
    question: "What training data problems should I audit for before committing to an AI project?",
    explanation: "Training data issues account for more AI project failures than any other single cause, and they're almost always discoverable before a project starts if you ask the right questions. Five problems are most common. Insufficient volume: most supervised learning tasks need thousands to millions of labeled examples ??if you don't have them, the model won't learn reliably. Labeling errors: inconsistent or incorrect labels are directly encoded into the model's behavior. Unrepresentative samples: a model trained on data from one customer segment, geography, or time period will underperform systematically on others. Historical bias: if past human decisions embedded in your labels were biased ??hiring decisions, credit approvals, support ticket routing ??the model will learn and perpetuate those biases. Data leakage: when information from the test set contaminated the training set, you get inflated accuracy metrics that collapse in production. Before committing to any AI project, audit your data against all five of these problems.",
  },

  "module-2-supervised-unsupervised-section-card": {
    id: "module-2-supervised-unsupervised-section-card",
    moduleId: "module-2",
    sectionId: "supervised-unsupervised",
    cardType: "section-card",
    content: "Supervised learning trains on labeled data (input ??correct output pairs): email labeled spam/not-spam, images labeled cat/dog, transactions labeled fraud/legitimate. Unsupervised learning finds structure in unlabeled data: clustering customers by behavior, detecting anomalies. Reinforcement learning trains through trial and reward signals: game-playing AI, robotics. Most business AI is supervised learning. Understanding this helps evaluate whether you have the labeled data an AI solution actually requires.",
    summary: "Most business AI uses supervised learning, which requires labeled historical examples ??understanding learning paradigms helps evaluate whether proposed AI solutions are actually feasible with your data.",
    question: "How does knowing whether a system uses supervised or unsupervised learning help me evaluate a vendor's proposal?",
    explanation: "This distinction is one of the most practical things you can know when evaluating AI vendor proposals. Supervised learning ??the most common type in business AI ??requires labeled historical examples where the correct answer is already known. If a vendor proposes a supervised learning solution, you need to immediately ask: what labeled training data does this require, and do we have it? A churn prediction model needs thousands of labeled examples of customers who did and didn't churn. A fraud detection model needs labeled examples of fraudulent and legitimate transactions. If you don't have that data, or your historical records don't include the outcome labels, the model can't be trained. Vendors sometimes gloss over this gap in proposals ??catching it early saves you from discovering mid-project that your data is incompatible with their approach.",
  },

  "module-2-what-ai-cant-do-section-card": {
    id: "module-2-what-ai-cant-do-section-card",
    moduleId: "module-2",
    sectionId: "what-ai-cant-do",
    cardType: "section-card",
    content: "Current AI has clear limitations: (1) Genuine reasoning ??AI mimics reasoning patterns but doesn't understand causality; (2) Novel domain generalization ??AI struggles outside its training distribution; (3) Physical world interaction without specialized systems; (4) Consistent factual reliability ??LLMs hallucinate; (5) Long-horizon multi-step planning ??agent systems are improving but remain brittle; (6) Judgment in ethically novel situations. Knowing these limits prevents expensive AI projects built on false assumptions.",
    summary: "AI has fundamental limits in causal reasoning, novel domain generalization, factual reliability, multi-step planning, and ethical judgment ??knowing these limits prevents costly project failures.",
    question: "What are the clearest signals that a proposed AI use case is going to fail because of current AI limitations?",
    explanation: "Five warning signs in a proposed AI use case suggest you're outside reliable current capabilities. First, the task requires understanding why something happens, not just predicting that it will ??AI predicts correlations, not causes. Second, the inputs will frequently look different from historical training data ??AI performance degrades sharply as inputs drift from the distribution it was trained on. Third, the task requires reliably accurate facts ??LLMs hallucinate, and the error rate on factual claims is too high for many business-critical applications without a retrieval layer and human review. Fourth, the task involves autonomous multi-step planning without frequent human checkpoints ??agent systems are improving rapidly but remain brittle in production. Fifth, the task involves ethical judgment in novel situations ??AI can surface considerations but cannot make ethical judgments that account for context, stakes, and values the way humans can. Any proposed project that depends on AI performing well on these dimensions needs to be restructured.",
  },

  "module-2-module-quiz": {
    id: "module-2-module-quiz",
    moduleId: "module-2",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Test your understanding of how AI creates business value ??including ML fundamentals, training data requirements, learning paradigms, and where AI breaks down.",
    summary: "Module 2 knowledge check ??validate your ability to identify high-value AI opportunities and assess whether proposed projects are feasible with your data and constraints.",
    question: "A colleague proposes using AI to automatically approve expense reports under $500. What questions should you ask to determine whether this is a good AI use case?",
    explanation: "This is a reasonable AI candidate but requires careful evaluation across several dimensions. First, data: do you have thousands of labeled historical examples of expense reports that were and weren't approved, and are those decisions consistent enough to be learnable patterns? Second, error consequence: what happens when the AI wrongly approves a fraudulent expense, or wrongly rejects a legitimate one ??who bears that cost? Third, auditability: can the system explain its decisions in a way that satisfies financial audit requirements? Fourth, edge cases: expenses close to $500 with unusual categories or new vendor types will challenge any model trained on historical patterns. Fifth, total cost comparison: if the human review of under-$500 expenses takes 2 minutes each, is the volume high enough to justify the build cost? A clear analysis of these questions will tell you whether this is a high-ROI AI opportunity or one where the risks and build cost outweigh the efficiency gain.",
  },

  // ?????????????????????????????????????????????
  // MODULE 3 CONTENT MERGED INTO MODULE 1 ??AI Tools: Which Ones Matter?
  // ?????????????????????????????????????????????

  "module-3-module-overview-section-card": {
    id: "module-3-module-overview-section-card",
    moduleId: "module-3",
    sectionId: "tools-module-overview",
    cardType: "section-card",
    content: "This module teaches strategic AI tool evaluation rather than tool chasing. You'll learn how to assess AI software categories, understand when a general-purpose assistant is sufficient versus when specialized systems are warranted, and build evaluation frameworks that account for workflow fit, governance, integration complexity, pricing traps, and vendor stability.",
    summary: "Module 3 builds a strategic AI tool evaluation framework ??so you can make principled procurement decisions instead of chasing every new release.",
    question: "How do I build an evaluation process that actually identifies the right AI tools for my organization?",
    explanation: "A strategic AI tool evaluation process starts before you look at any product. Define the specific workflow problem first ??write down what task needs solving, who does it today, what good output looks like, and what your success metric is. Then evaluate tools against five dimensions: workflow fit (does it actually solve this specific problem, not just adjacent ones?), integration complexity (what does it take to connect this to your existing systems?), total cost of ownership (per-seat pricing at scale, implementation time, training, maintenance), data governance (where does your data go, who can access it, is it used for model training?), and vendor stability (is this company financially sound?). Test with real work samples from your environment, not vendor demo data. The tool that performs best in a controlled demo rarely performs best on your actual messy data and workflows.",
  },

  "module-3-what-is-llm": {
    id: "module-3-what-is-llm",
    moduleId: "module-3",
    sectionId: "tools-what-is-llm",
    cardType: "section-card",
    content: "Large Language Models (LLMs) are AI systems trained on vast text corpora to predict and generate human-like language. They power ChatGPT, Claude, Gemini, and most modern AI assistants. LLMs don't 'know' facts ??they predict statistically likely text based on training patterns. Key business implications: they excel at drafting, summarizing, reformatting, and generating ??but they hallucinate, reflect training biases, and have knowledge cutoff dates.",
    summary: "LLMs predict statistically likely text rather than retrieving verified facts ??making them excellent drafting tools but unreliable sources of factual claims without human review.",
    question: "Why do LLMs sometimes state completely wrong things with complete confidence, and what does this mean for how I should use them?",
    explanation: "LLMs generate text by predicting which words are most likely to follow the previous ones, based on patterns learned from training data. They are not accessing a database of verified facts or running logic checks on their outputs. The result is that when the training data contained confident-sounding wrong information, or when a plausible-sounding pattern leads somewhere false, the model will generate that wrong answer as fluently and confidently as a correct one. This is called hallucination, and it's not a bug that will be fixed in the next version ??it's an architectural characteristic of how these models work. The practical implication is clear: use LLMs to accelerate work that humans will review before it matters (drafts, research starting points, brainstorming), and never use them as a final authority on facts, data, legal positions, or medical information without independent verification.",
  },

  "module-3-how-chatgpt-works": {
    id: "module-3-how-chatgpt-works",
    moduleId: "module-3",
    sectionId: "tools-how-chatgpt-works",
    cardType: "section-card",
    content: "ChatGPT (and similar tools) work in three stages: (1) Pre-training ??the model learns language patterns from billions of text documents; (2) Fine-tuning ??the model is trained to follow instructions and avoid harmful outputs; (3) RLHF (Reinforcement Learning from Human Feedback) ??human raters teach the model which responses are better. Each conversation is processed without persistent memory (by default). The model doesn't 'think' between sessions.",
    summary: "ChatGPT is built through pre-training, instruction fine-tuning, and human feedback ??with no default memory between conversations, meaning each session starts completely fresh.",
    question: "Why does knowing how ChatGPT was built change how I use it professionally?",
    explanation: "Understanding the three-stage training process produces several practically useful insights. Pre-training on billions of text documents means the model absorbed enormous breadth of knowledge ??but with a cutoff date, and with whatever biases and inaccuracies were present in that training corpus. Fine-tuning for instruction-following means the model is specifically optimized to be helpful and complete tasks you give it ??which is useful, but also means it may try to produce an answer even when the right answer is 'I don't know.' RLHF means the model was shaped by human preference ratings, which optimizes for responses that seem helpful and confident ??which can paradoxically make hallucinations harder to spot. The no-persistent-memory default means every session starts with no knowledge of previous conversations ??you need to re-provide context each time, or use features like Projects or memory that explicitly maintain it. Knowing these architectural facts makes you a significantly more effective user.",
  },

  "module-3-anatomy-of-prompt": {
    id: "module-3-anatomy-of-prompt",
    moduleId: "module-3",
    sectionId: "tools-anatomy-of-prompt",
    cardType: "section-card",
    content: "An effective prompt typically contains: (1) Role/context ??'You are a financial analyst??; (2) Task ??what you want done; (3) Format ??how the output should be structured; (4) Constraints ??what to include or avoid; (5) Examples ??showing desired output style. Prompt quality is the primary lever for improving AI output quality. Most users underspecify prompts and then blame the AI for poor results.",
    summary: "Effective prompts include five elements ??role, task, format, constraints, and examples ??and prompt quality is the single biggest lever for improving AI output quality.",
    question: "Can you walk me through how to build a high-quality prompt from scratch for a real business task?",
    explanation: "Take a concrete example: writing a competitive analysis summary. A weak prompt: 'Summarize our competitive position.' A strong prompt applies all five elements. Role: 'You are a senior strategy analyst preparing a briefing for the executive team.' Task: 'Summarize our competitive position relative to [Competitor A] and [Competitor B] in the [specific market].' Format: 'Produce a structured summary with: one paragraph on each competitor's key strengths, one paragraph on where we have differentiated advantage, and three bullet points on strategic risks.' Constraints: 'Focus only on product capabilities and pricing, not company history. Keep it under 400 words. Avoid jargon.' Examples: 'Here's an example of the tone and structure I want: [paste a sample].' The difference in output quality between these two prompts is not marginal ??it's substantial. The AI is not smarter with a better prompt; it has more information to work with, and that information narrows the solution space to what you actually need.",
  },

  "module-3-prompt-techniques": {
    id: "module-3-prompt-techniques",
    moduleId: "module-3",
    sectionId: "tools-prompt-techniques",
    cardType: "section-card",
    content: "Key prompting techniques: (1) Chain-of-thought ??ask the model to reason step by step before answering; (2) Few-shot ??provide 2?? examples of desired input/output pairs; (3) Role prompting ??assign a persona that frames the model's response style; (4) Iterative refinement ??treat first output as a draft and prompt for specific improvements; (5) Structured output ??request JSON, tables, or bullet formats for downstream processing. Each technique increases reliability for specific task types.",
    summary: "Five prompting techniques ??chain-of-thought, few-shot examples, role framing, iterative refinement, and structured output ??each improve reliability for specific task types.",
    question: "Which prompting technique should I use for analytical tasks versus creative tasks versus data extraction tasks?",
    explanation: "Different prompting techniques match different task types. For analytical tasks ??risk assessment, decision analysis, competitive evaluation ??chain-of-thought is most effective. Asking the model to 'think step by step' before giving a conclusion improves reasoning quality significantly, particularly for multi-step problems. For creative tasks ??drafting emails, writing copy, generating ideas ??role prompting and iterative refinement work best. Assigning a specific persona frames the tone, and treating the first output as a draft to improve with targeted feedback produces better final results than trying to get a perfect first draft. For data extraction and structured tasks ??pulling specific fields from documents, categorizing content, generating formatted reports ??few-shot examples and structured output formatting are most powerful. Showing the model exactly what format you want, with examples of input-output pairs, dramatically improves consistency and parsability. Mixing techniques for complex tasks is common ??a good analytical prompt might combine chain-of-thought, role assignment, and structured output.",
  },

  "module-3-hands-on-practice-section-card": {
    id: "module-3-hands-on-practice-section-card",
    moduleId: "module-3",
    sectionId: "tools-hands-on-practice",
    cardType: "section-card",
    content: "Practice is the only way to develop prompt engineering fluency. Key exercises: (1) Take a task you do weekly and write 3 different prompts for it ??compare outputs; (2) Deliberately break a prompt by making it vague ??observe how output degrades; (3) Add examples to a prompt and compare to the example-free version; (4) Ask an AI to improve your own prompt. Fluency comes from iteration, not theory.",
    summary: "Prompt engineering fluency only develops through deliberate practice ??comparing variants, studying degradation, and iterating rapidly on real work tasks.",
    question: "What's the fastest way to develop genuine skill at writing effective AI prompts?",
    explanation: "Prompt engineering skill develops through deliberate, comparative practice ??not through reading about techniques. Four exercises accelerate the learning curve faster than anything else. First, take a real task from your workweek and write three different prompts for it ??vary the specificity, the format instruction, and the constraints ??then compare outputs directly. The comparison reveals which levers actually matter. Second, intentionally write a vague, underspecified prompt and observe what breaks in the output. Understanding failure modes builds intuition for what to include. Third, add examples (few-shot prompting) to an existing prompt that produces mediocre output and compare results. The quality jump from a good few-shot example is usually striking. Fourth, ask the AI itself to critique and improve your prompt ??paste your prompt and say 'How could this prompt be more specific and effective?' Models are often quite good at identifying what's missing. Two hours of this kind of deliberate practice produces more skill than reading ten articles about prompting.",
  },

  "module-3-choosing-tools": {
    id: "module-3-choosing-tools",
    moduleId: "module-3",
    sectionId: "tools-choosing-tools",
    cardType: "section-card",
    content: "AI tool selection framework: (1) Define the workflow problem precisely before evaluating tools; (2) Test with real work samples, not demo data; (3) Evaluate total cost of ownership ??per-seat pricing compounds; (4) Assess integration complexity with existing systems; (5) Review data handling and privacy terms; (6) Check vendor financial stability; (7) Plan for vendor lock-in risk. The tool that wins demos rarely wins production.",
    summary: "Seven-step AI tool selection ??define the problem, test with real data, evaluate TCO, assess integration, review data governance, check vendor stability, and plan for lock-in risk.",
    question: "Why do AI tools that perform brilliantly in demos so often disappoint in production?",
    explanation: "Demo performance and production performance diverge because demos are controlled environments and production is not. Vendors use carefully selected, cleaned, and ideally suited data for demonstrations ??the exact conditions their product was designed and optimized for. Your production environment has messier data, edge cases the vendor didn't anticipate, integration friction with legacy systems, variation in how different employees prompt and use the tool, and performance requirements under real load. The other driver of demo-to-production failure is that demos measure what the tool can do, while production measures whether people actually use it and whether it fits into workflows that have years of existing habits. A tool that's 20% better in a demo but requires context-switching from existing systems will be used 80% less ??and the productivity math inverts completely.",
  },

  "module-3-ai-writing": {
    id: "module-3-ai-writing",
    moduleId: "module-3",
    sectionId: "tools-ai-writing",
    cardType: "section-card",
    content: "AI writing tools in business contexts are most valuable for: first drafts, email templates, meeting summaries, policy documents, sales sequences, and research synthesis. Lowest value: final customer-facing communications requiring brand voice precision, legal documents requiring verified accuracy, and content where hallucination risk is high. Build review workflows into any AI writing process ??AI accelerates drafting, not publishing.",
    summary: "AI writing tools create maximum value in first drafts, summaries, and templates ??and minimum value in brand-critical, legally sensitive, or high-accuracy final outputs without human review.",
    question: "Which specific writing tasks in my business should I prioritize for AI, and which ones should I keep human-led?",
    explanation: "The decision of where to deploy AI writing comes down to two factors: how much does accuracy of specific facts matter, and how much does precise brand voice matter? Tasks where AI creates the most value are those where the first draft is the hardest part, the content is relatively standardized, and a human will review before anything goes out: internal meeting summaries, policy document first drafts, email template libraries, proposal structures, research synthesis, RFP response outlines. Tasks where AI adds the least value ??or creates risk ??are final customer-facing communications where your brand voice must be precisely maintained, legal documents where every word creates liability, medical or financial content where factual accuracy is legally required, and any situation where the output will be published without human review. The test: if someone would be harmed by an error in this output, there should be a human review step before it leaves your organization.",
  },

  "module-3-ai-images": {
    id: "module-3-ai-images",
    moduleId: "module-3",
    sectionId: "tools-ai-images",
    cardType: "section-card",
    content: "When selecting AI image generation tools for business use, evaluate: (1) Commercial licensing terms ??can outputs be used commercially?; (2) Brand consistency capability ??can it maintain visual identity?; (3) Iteration speed ??how quickly can you refine outputs?; (4) IP indemnification ??does the vendor protect you from copyright claims?; (5) Quality for your specific use case (photography style vs illustration vs product visualization). Adobe Firefly's indemnification policy is currently the strongest in enterprise contexts.",
    summary: "Business AI image tool selection hinges on commercial licensing clarity, brand consistency, iteration speed, and IP indemnification ??with Adobe Firefly currently offering the strongest enterprise legal protection.",
    question: "How should I evaluate AI image tools specifically for enterprise commercial use rather than personal creative projects?",
    explanation: "Enterprise image AI evaluation requires a different lens than personal creative use, with legal exposure being the primary differentiator. The five enterprise-specific questions are: First, are commercial outputs explicitly licensed ??not implied, explicitly stated in the terms of service? Second, does the vendor offer IP indemnification ??meaning they will defend you if a copyright claim arises from their AI's output? Adobe Firefly currently offers the most explicit enterprise indemnification in the market because it was trained on licensed and public-domain content rather than scraped web images. Third, can the tool be configured to maintain your brand's visual identity ??specific color palettes, style guides, logo constraints? Fourth, does the tool support the specific output types you need ??photography realism, flat illustration, product visualization, infographics? Fifth, what are the disclosure and watermarking requirements, and do they align with your use cases? Enterprise procurement should answer all five before signing.",
  },

  "module-3-ai-productivity": {
    id: "module-3-ai-productivity",
    moduleId: "module-3",
    sectionId: "tools-ai-productivity",
    cardType: "section-card",
    content: "Productivity AI tools comparison: Microsoft Copilot ??strongest for Office 365 workflows, meeting summaries, email drafting; Google Gemini ??strongest for Workspace integration and collaborative documents; Notion AI ??strongest for knowledge management and structured note-taking; Otter.ai ??strongest for meeting transcription and action item extraction. Choice should follow your existing platform ecosystem rather than chasing feature lists.",
    summary: "Productivity AI tool selection should follow your existing platform ??Copilot for Microsoft shops, Gemini for Google Workspace ??because ecosystem alignment eliminates integration overhead and maintains data governance.",
    question: "We're evaluating Microsoft Copilot and Google Gemini ??how should we actually make this decision?",
    explanation: "This decision is almost always already made by your existing infrastructure, and trying to override it creates unnecessary cost and complexity. If your organization runs on Microsoft 365 ??Outlook, Teams, Word, Excel, SharePoint ??Copilot is the right choice because it operates natively within those tools, data stays within your existing Microsoft security perimeter, and there's no integration work. If your organization runs on Google Workspace ??Gmail, Docs, Sheets, Meet, Drive ??Gemini is the right choice for the same reasons. The productivity gains from AI embedded natively in your workflow are almost always higher than those from a third-party tool that requires context-switching, separate login, manual data movement, or a new security review. The 'feature list' comparison of Copilot vs. Gemini capabilities is far less important than the platform fit question ??because a tool with slightly fewer features that's embedded in your daily workflow will be used five times more than a slightly better tool that requires switching contexts.",
  },

  "module-3-ai-creative": {
    id: "module-3-ai-creative",
    moduleId: "module-3",
    sectionId: "tools-ai-creative",
    cardType: "section-card",
    content: "AI creative tool evaluation for business: assess whether the tool supports brand guidelines via style presets or reference images, what the turnaround time is for production-quality outputs, how much human curation is required, and what the content moderation policies are. For video and audio specifically, evaluate whether outputs require disclosure under current or anticipated regulatory requirements in your jurisdiction.",
    summary: "Business creative AI evaluation requires assessing brand guideline support, production-quality turnaround, curation effort, content moderation, and jurisdiction-specific disclosure requirements.",
    question: "What's the right evaluation process for AI video and audio tools before deploying them in a marketing context?",
    explanation: "AI video and audio tools carry distinct evaluation criteria that go beyond the standard tool scorecard. First, disclosure requirements: multiple jurisdictions now require disclosure of AI-generated audio and video in advertising contexts, and this regulatory landscape is moving fast ??evaluate tools against current requirements and anticipated near-term developments in your key markets. Second, deepfake and impersonation risk: evaluate the content moderation policies of each tool, including what guardrails exist against generating content that mimics real people or brands. Third, brand consistency at scale: can the tool maintain consistent visual and audio styles across a campaign without each asset requiring substantial manual refinement? Fourth, production quality threshold: what percentage of raw outputs reach production quality without additional editing ??this directly determines whether the tool actually saves time or just shifts the work to a different stage. Fifth, output rights and ownership: confirm that your commercial license to generated outputs is unconditional and not subject to platform policy changes.",
  },

  "module-3-module-quiz": {
    id: "module-3-module-quiz",
    moduleId: "module-3",
    sectionId: "tools-module-quiz",
    cardType: "section-card",
    content: "Test your ability to apply AI tool evaluation frameworks ??covering LLM mechanics, prompt techniques, tool selection criteria, and practical workflow integration.",
    summary: "Module 3 knowledge check ??validate your ability to apply tool evaluation frameworks, select the right approach for different workflows, and avoid common procurement traps.",
    question: "A department head wants to build a custom AI system on the OpenAI API instead of buying an off-the-shelf product. When does this approach make sense, and when is it a mistake?",
    explanation: "Building on a foundational model API makes sense in specific circumstances: when no off-the-shelf product adequately solves your workflow problem; when your use case requires proprietary data integration that SaaS tools can't accommodate; when you have engineering resources to build and maintain a custom system; when your usage volume makes API-first pricing significantly cheaper than per-seat SaaS at scale; or when you need flexibility to switch between model providers. It becomes a mistake when you're reinventing functionality that existing SaaS tools already do well; when you don't have dedicated engineering capacity for ongoing maintenance; when the custom build timeline delays value delivery by months; or when you're using custom development to avoid the procurement process rather than because it genuinely serves the use case better. The honest framing is: custom API development creates maximum flexibility at maximum cost ??it's the right call for unique workflows without good SaaS alternatives, and the wrong call when a $50/month SaaS tool would solve the same problem.",
  },

  // ?????????????????????????????????????????????
  // MODULE 4 ??Choosing the Right AI Agency or Partner
  // ?????????????????????????????????????????????

  "module-4-module-overview-section-card": {
    id: "module-4-module-overview-section-card",
    moduleId: "module-4",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module covers two interrelated strategic disciplines: choosing the right AI partners and positioning your organization for lasting competitive advantage. The first half helps you distinguish genuine AI implementation expertise from marketing-grade claims, design pilot projects that reveal real capability, and structure contracts that protect your interests. The second half shifts to future positioning ??building the organizational capabilities that produce durable advantage as AI tools themselves become commoditized.",
    summary: "Module 3 equips you to evaluate AI partners using operational evidence and structure protective pilots, then extends to strategic positioning for lasting competitive advantage as AI commoditizes.",
    question: "What is the connection between choosing the right AI implementation partner and building long-term competitive advantage?",
    explanation: "Partner selection and future positioning are more connected than they appear. Every implementation partner decision is also a capability-building decision: a strong partner transfers knowledge, builds internal competency, and leaves your organization better equipped to act independently. A weak partner builds dependency and leaves you further behind when the engagement ends. At the strategic level, the organizations that will maintain competitive advantage as AI commoditizes are those that have already built execution depth ??and that execution depth is built, piece by piece, through the quality of every implementation decision. Who you partner with shapes what you can do next. The discipline of partner evaluation in the near term and the discipline of strategic positioning for the long term are expressions of the same underlying capability: the ability to make high-quality AI decisions under uncertainty.",
  },

  "module-4-what-is-data-section-card": {
    id: "module-4-what-is-data-section-card",
    moduleId: "module-4",
    sectionId: "what-is-data",
    cardType: "section-card",
    content: "For AI implementation, data isn't just 'information' ??it's the operational input that determines system behavior. Relevant data types: structured (databases, CRM records, spreadsheets), unstructured (emails, documents, audio, images), semi-structured (JSON logs, XML), and real-time streaming. Understanding what data you have, where it lives, how clean it is, and who controls access is foundational before any AI implementation conversation with a vendor.",
    summary: "AI implementation readiness begins with a clear data inventory ??knowing what types you have, where they live, how clean they are, and who controls access prevents mid-project surprises.",
    question: "What does a useful data inventory look like before I start talking to AI implementation vendors?",
    explanation: "A pre-vendor data inventory should answer six questions in writing. What data do you have ??a complete list of data sources, including systems, databases, file repositories, and manual records. What format is each in ??structured tables, unstructured documents, audio files, images. How clean is it ??known quality issues, missing values, inconsistent formatting, duplicate records. How current is it ??data that's years old may not represent current patterns. Who controls access ??data governance ownership, regulatory constraints (HIPAA, GDPR, CCPA), and internal access controls. What's the historical depth ??how many years of records exist, and are outcomes labeled (did the customer churn? was the transaction fraudulent?). This inventory does two things: it gives you a realistic picture of what's actually possible with AI given your data, and it immediately differentiates capable vendors (who will work through it with you) from incapable ones (who will ignore it and make optimistic assumptions).",
  },

  "module-4-data-collection-section-card": {
    id: "module-4-data-collection-section-card",
    moduleId: "module-4",
    sectionId: "data-collection",
    cardType: "section-card",
    content: "AI projects frequently fail because of data collection gaps identified only after contracts are signed. Key questions for vendors: (1) What data do they need, in what format, and in what volume? (2) Who is responsible for data pipeline setup? (3) What happens if data quality is lower than expected? (4) How will ongoing data flows be maintained? (5) Who owns the data infrastructure built during the engagement? Answers reveal operational seriousness.",
    summary: "Data collection requirements ??format, volume, pipeline ownership, and quality contingencies ??are the most revealing questions in vendor evaluation and the most common source of mid-project cost overruns.",
    question: "What happens when data gaps are discovered after an AI implementation contract is signed?",
    explanation: "When data gaps emerge mid-project ??and they frequently do ??the consequences are predictable: scope creep as the vendor requests additional budget for data preparation work they 'didn't anticipate'; timeline extensions that delay value delivery by months; or, in the worst cases, project abandonment when the data issues prove insurmountable for the proposed approach. The way to prevent this is to require a formal data discovery phase before any implementation contract is signed. This phase ??typically 2?? weeks ??involves the vendor's team actually examining your data, documenting gaps, and specifying exactly what they need versus what you have. Any vendor reluctant to do data discovery first is either inexperienced or intentionally avoiding knowledge that would complicate their proposal. Make data discovery a contractual prerequisite for implementation, with clear go/no-go criteria.",
  },

  "module-4-data-cleaning-section-card": {
    id: "module-4-data-cleaning-section-card",
    moduleId: "module-4",
    sectionId: "data-cleaning",
    cardType: "section-card",
    content: "Real-world data is rarely AI-ready. Common data quality problems: missing values, inconsistent formatting, duplicate records, incorrect labels, stale information, and structural inconsistencies. Data cleaning is time-consuming and often accounts for 60??0% of AI project effort ??yet vendors frequently underestimate or omit it from proposals. When evaluating partners, ask for their data cleaning methodology and how they handle quality issues discovered mid-project.",
    summary: "Data cleaning absorbs 60??0% of real AI project effort but is routinely underestimated in vendor proposals ??making it the most common source of budget and timeline overruns.",
    question: "How do I prevent my AI project from turning into a multi-month data cleaning exercise without clear business output?",
    explanation: "Data cleaning sprawl is one of the most common ways AI projects lose momentum and stakeholder support. Three practices prevent it from derailing your project. First, require a data quality assessment in the proposal: vendors should document specific cleaning tasks, estimated effort for each, and what quality standard the data must reach. If cleaning effort isn't itemized, the vendor hasn't actually assessed your data. Second, negotiate a fixed-scope data cleaning phase with clear completion criteria ??not an open-ended 'we'll clean what we need.' Define what 'clean enough to train a model' means specifically before work begins. Third, assign an internal data owner who works alongside the vendor during cleaning ??not just to accelerate the work, but to ensure institutional knowledge about data anomalies is captured and the organization retains the ability to maintain clean data pipelines after the engagement ends.",
  },

  "module-4-preprocessing-section-card": {
    id: "module-4-preprocessing-section-card",
    moduleId: "module-4",
    sectionId: "preprocessing",
    cardType: "section-card",
    content: "Data preprocessing transforms raw data into AI-ready inputs. Steps include: normalization (scaling numeric values to comparable ranges), tokenization (converting text to processable units), encoding (converting categories to numeric representations), handling missing values, and splitting data into training/validation/test sets. Partners who can't explain their preprocessing choices in operational terms are likely not equipped to handle production deployment.",
    summary: "Preprocessing transforms raw data into AI-ready inputs through normalization, encoding, and splitting ??and vendors' ability to explain their preprocessing decisions is a direct proxy for their production readiness.",
    question: "Why should a business leader care about data preprocessing, and what should I ask a vendor about it?",
    explanation: "You don't need to understand the mathematics of normalization to ask questions that reveal whether a vendor has thought carefully about preprocessing. The question to ask is: 'Walk me through how our raw data gets transformed into inputs your model can use, and what decisions you're making at each step.' A capable vendor will explain: how they handle missing values in your specific dataset (imputation? exclusion? a placeholder category?), what normalization approach they're using for numerical fields and why, how they're encoding categorical variables (like customer segments or product categories), and how they're splitting your data to prevent data leakage between training and test sets. A vendor who responds with jargon without specifics, or who can't connect these decisions to your actual data structure, is signaling they may not be ready for production deployment on your specific problem.",
  },

  "module-4-feature-engineering-section-card": {
    id: "module-4-feature-engineering-section-card",
    moduleId: "module-4",
    sectionId: "feature-engineering",
    cardType: "section-card",
    content: "Feature engineering is the process of creating meaningful input variables for AI models from raw data. Example: raw transaction data becomes 'transactions in last 30 days,' 'average transaction size,' 'days since last transaction' ??features that capture behaviorally meaningful signals. Strong AI partners invest significantly in feature engineering. It often matters more than model architecture choice. Weak partners focus almost entirely on model selection.",
    summary: "Feature engineering ??transforming raw data into behaviorally meaningful model inputs ??often matters more than model choice, and strong partners invest heavily in it while weak ones skip straight to model selection.",
    question: "How can I use feature engineering questions to quickly assess a vendor's actual AI implementation depth?",
    explanation: "Feature engineering is where domain knowledge and technical skill intersect ??and it's where genuinely experienced AI implementers differentiate from those who primarily know how to plug APIs together. A revealing question to ask any AI implementation vendor is: 'Given our data, what features would you engineer and why?' A strong answer references your specific business domain, explains what behavioral signals are captured by proposed features, discusses tradeoffs between different feature representations, and acknowledges uncertainty that would need to be resolved through experimentation. A weak answer jumps to model selection ('we'd use XGBoost' or 'we'd use GPT-4') without engaging seriously with what inputs those models would receive. The amount of thought a vendor puts into features ??versus models ??is one of the strongest predictors of whether they've actually deployed AI in production environments where performance on real data matters.",
  },

  "module-4-module-quiz": {
    id: "module-4-module-quiz",
    moduleId: "module-4",
    sectionId: "module-quiz",
    cardType: "section-card",
    content: "Test your ability to evaluate AI implementation partners and apply strategic positioning frameworks ??including data readiness assessment, vendor red flags, contract structure, AI frontiers, governance readiness, and competitive differentiation.",
    summary: "Module 3 knowledge check ??validate your ability to spot vendor red flags, assess data readiness, structure contracts, and apply strategic AI positioning frameworks.",
    question: "An AI agency gives you a polished proposal, impressive demos, and references from well-known brands. What additional diligence should you do before signing?",
    explanation: "Brand-name references and polished proposals are the floor, not the ceiling, of vendor evaluation. Four additional diligence steps matter. First, call the references and ask specific questions: 'What went wrong during implementation and how did they handle it? Would you use them again and why? What was the actual timeline versus proposed timeline?' Vague positive references without specifics are less meaningful than detailed accounts. Second, request a technical review session where the vendor's actual implementation team ??not just sales ??walks through their methodology for your specific use case using your data. Third, ask for evidence of production systems: live URLs, monitoring dashboards, performance metrics from deployed systems ??not just demo environments. Fourth, run a paid discovery sprint before signing a full implementation contract. A reputable vendor will agree to a scoped, compensated discovery phase; one who insists on signing a full contract first is avoiding the scrutiny that discovery would bring.",
  },

  // ?????????????????????????????????????????????
  // MODULE 2 ??AI ROI & Decision-Making Frameworks (merged legacy Module 5)
  // ?????????????????????????????????????????????

  "module-2-module-overview-roi-section-card": {
    id: "module-2-module-overview-roi-section-card",
    moduleId: "module-2",
    sectionId: "module-overview",
    cardType: "section-card",
    content: "This module provides operational frameworks for measuring whether AI initiatives create real business value. You'll learn ROI calculation methods, cost-benefit analysis approaches, automation scoring systems, and prioritization matrices. The goal is replacing gut-feel AI investment decisions with structured, defensible analysis.",
    summary: "Module 2 replaces gut-feel AI investment decisions with structured ROI calculation, multi-year cost-benefit analysis, and prioritization frameworks you can defend to stakeholders.",
    question: "Why do so many AI investments fail to produce the ROI that was projected, and how do I avoid those mistakes?",
    explanation: "Most AI ROI projections fail for two interconnected reasons. On the cost side, organizations systematically undercount: they budget for implementation and licensing but ignore change management, training, ongoing maintenance, integration complexity, and the productivity dip during adoption. These uncounted costs often represent 40??0% of true project cost. On the benefit side, organizations count theoretical capacity savings rather than realized value ??if AI saves 10 hours per week per employee, that only creates financial value if those 10 hours are redeployed to higher-value work rather than absorbed into unstructured time. The fix is disciplined cost accounting that includes all categories and benefit measurement that tracks realized outcomes ??task completion rates, revenue metrics, cost-per-outcome ??not theoretical capacity freed.",
  },

  "module-2-roi-basics-section-card": {
    id: "module-2-roi-basics-section-card",
    moduleId: "module-2",
    sectionId: "roi-basics",
    cardType: "section-card",
    content: "AI ROI is calculated as: ROI = ((Gain ??Cost) / Cost) 횞 100. Gain includes labor savings, revenue acceleration, error reduction, and speed improvements. Cost includes implementation, licensing, maintenance, training, and change management. Most organizations undercount costs (ignoring change management and ongoing maintenance) and overcount gains (counting theoretical rather than realized savings). Both errors produce misleading ROI projections.",
    summary: "AI ROI = ((Gain ??Cost) / Cost) 횞 100 ??but accurate calculation requires counting all costs including change management and maintenance, and only counting gains that are actually realized.",
    question: "Walk me through how to build a complete, honest AI ROI calculation that will hold up under executive scrutiny.",
    explanation: "A credible AI ROI calculation requires rigor on both the numerator and denominator. For costs: implementation (vendor fees, internal engineering time, integration work), licensing (per-seat or usage-based fees at realistic scale, not the introductory price), ongoing maintenance (model monitoring, retraining, prompt updates, vendor relationship management), training (time cost of upskilling employees, not just course fees), and change management (the organizational cost of changing workflows, which is often underestimated). For gains: be disciplined about what actually generates financial value ??time savings only count if that time is verifiably redeployed, error reduction only counts if errors had a documented cost, revenue acceleration only counts if the causal link to AI is measurable. Build three versions ??conservative, base, optimistic ??and present all three. The conservative case should be the one you'd stake your credibility on; the optimistic case is what you're working toward. Year 1 ROI is often negative or marginal; multi-year ROI is where most AI investments justify themselves.",
  },

  "module-2-roi-calculation": {
    id: "module-2-roi-calculation",
    moduleId: "module-2",
    sectionId: "roi-calculation",
    cardType: "section-card",
    content: "Annual savings calculation: Annual Savings = Hours Saved 횞 Hourly Cost 횞 Frequency. Example: An AI that reduces report generation from 4 hours to 30 minutes saves 3.5 hours per report. If generated weekly with a $75/hour analyst: 3.5 횞 $75 횞 52 = $13,650/year. This must be compared against full implementation and licensing costs. Build conservative, base, and optimistic scenarios ??present all three to avoid commitment to a single projection.",
    summary: "Annual Savings = Hours Saved 횞 Hourly Cost 횞 Frequency ??always build conservative, base, and optimistic scenarios to acknowledge uncertainty and protect decision-making flexibility.",
    question: "How should I structure an AI ROI model to present to a CFO or board who will push back hard on assumptions?",
    explanation: "CFOs push back on AI ROI models for good reason ??most of them have seen inflated projections. To present credibly, structure your model around documented assumptions rather than conclusions. For each benefit line item, show the specific calculation: how many hours per week, at what fully-loaded cost per hour, at what frequency, with what confidence level. Clearly distinguish between what's already happened (pilot results, if you have them) and what's projected. For cost line items, include categories that most proposals skip: internal time allocation from IT, engineering, and management during implementation; training and adoption investment; ongoing maintenance labor; and the 10??5% contingency that almost every AI project requires for unexpected complications. Present three scenarios with explicit sensitivity analysis ??what changes if adoption is 20% lower than expected, or if implementation takes 50% longer? CFOs trust models that acknowledge uncertainty; they distrust models that present single-point precision on inherently uncertain projections.",
  },

  "module-2-effectiveness-metrics": {
    id: "module-2-effectiveness-metrics",
    moduleId: "module-2",
    sectionId: "effectiveness-metrics",
    cardType: "section-card",
    content: "Effective AI metrics measure operational outcomes, not AI activity: (1) Time saved per task (before vs. after); (2) Error rate reduction; (3) Throughput increase (tasks per person-hour); (4) Cost per outcome; (5) Customer satisfaction delta; (6) Revenue attribution. Poor metrics measure AI inputs rather than business outputs ??number of prompts sent, features used, or licenses deployed are not evidence of value creation.",
    summary: "Effective AI metrics track operational outcomes ??time saved, error reduction, throughput, cost-per-outcome ??not AI activity like prompts sent or features used.",
    question: "What's the difference between metrics that actually prove AI value and metrics that just prove AI is being used?",
    explanation: "The distinction is between measuring activity (the AI is being used) and measuring outcomes (the AI is creating value). Activity metrics ??number of prompts sent, daily active users, features accessed, licenses utilized ??tell you adoption is occurring but nothing about whether it's changing the economics of your operations. Outcome metrics are before-versus-after comparisons on the things that actually matter: How long does it take to complete the task now versus before AI? What is the error rate now versus before? How many outputs per person-hour now versus before? What is the cost-per-customer-served now versus before? The discipline of measuring outcomes rather than activity also forces clarity about what 'value' means for each use case ??which is itself a useful strategic exercise. If you can't name what operational outcome should improve because of this AI deployment, you don't have a clear enough use case to invest in yet.",
  },

  "module-2-misleading-metrics": {
    id: "module-2-misleading-metrics",
    moduleId: "module-2",
    sectionId: "misleading-metrics",
    cardType: "section-card",
    content: "Common misleading AI metrics: (1) 'Hours saved' without validating those hours produced other value; (2) 'Accuracy rates' on test sets that don't reflect production data distribution; (3) User satisfaction scores that reflect novelty rather than utility; (4) 'Tasks automated' without cost comparison to previous approach; (5) Revenue 'attributed' to AI via correlation rather than controlled measurement. Each of these can make a failing AI project appear successful.",
    summary: "Five misleading AI metrics ??unvalidated time savings, test-set accuracy, novelty-driven satisfaction, uncosted automation counts, and correlation-based revenue attribution ??can disguise failing projects as successes.",
    question: "How do I design an evaluation framework that can't be gamed by misleading metrics?",
    explanation: "The most reliable protection against misleading AI metrics is requiring a pre-established measurement protocol before deployment begins ??not after, when there's pressure to show success. The protocol should include: a baseline measurement of current performance taken before AI is introduced (time-on-task measured via time studies or system logs, error rates from quality records, throughput from operational data); outcome metrics specified with their measurement method before deployment; a controlled comparison group when feasible (a team using AI versus one not, rather than before-after which confounds other changes); a minimum observation period before declaring success (at least 60??0 days to distinguish novelty effects from sustained behavior change); and a redeployment audit on claimed time savings (confirming that hours 'saved' actually shifted to measurable higher-value work, not just disappeared into unstructured time). Requiring these elements in advance makes it much harder to present misleading metrics post-hoc.",
  },

  "module-2-adoption-framework": {
    id: "module-2-adoption-framework",
    moduleId: "module-2",
    sectionId: "adoption-framework",
    cardType: "section-card",
    content: "AI adoption framework for ROI maximization: (1) Identify highest-frequency, highest-effort tasks ??these have the most savings leverage; (2) Quantify current state with time studies or system data; (3) Pilot with a constrained team for 30??0 days; (4) Measure actual vs. projected savings; (5) Calculate true per-unit cost including all overhead; (6) Decide expand, pivot, or stop based on data. Most organizations skip steps 2 and 5, making accurate evaluation impossible.",
    summary: "A six-step AI adoption ROI framework ??identify high-frequency tasks, quantify baseline, run constrained pilots, measure actual savings, calculate true costs, then make data-driven expand/pivot/stop decisions.",
    question: "How do I run a 30-60 day AI pilot that actually produces reliable evidence for a scale decision?",
    explanation: "A reliable pilot has four non-negotiable design elements. First, a measurable baseline established before the pilot begins ??using the same metrics you'll measure during the pilot. Without a pre-pilot baseline, you can't attribute performance changes to the AI. Second, a constrained but representative test group ??large enough to generate meaningful data, small enough to manage carefully. Avoid the error of piloting only with enthusiastic volunteers (selection bias) or only with the most automated part of the workflow (the easiest case). Third, a control group or control period when feasible ??another team doing the same work without AI, or a previous period's performance data if a parallel control isn't possible. Fourth, a structured data collection plan ??not just end-of-pilot surveys, but ongoing time tracking, quality sampling, or system log analysis at regular intervals during the pilot. After 30??0 days, compare actual versus projected on your pre-specified metrics and make an explicit expand/pivot/stop decision with documented reasoning.",
  },

  // ?????????????????????????????????????????????
  // MODULE 6 ??AI Risk, Compliance & Governance
  // ?????????????????????????????????????????????

  "module-4-governance-overview-section-card": {
    id: "module-4-governance-overview-section-card",
    moduleId: "module-4",
    sectionId: "governance-overview",
    cardType: "section-card",
    content: "This module addresses practical governance rather than abstract ethics. You'll examine the operational, legal, and organizational risks of deploying AI at scale ??including data privacy, shadow AI, hallucination reliability, IP exposure, and employee misuse ??and build frameworks for managing these risks without creating bureaucratic paralysis.",
    summary: "Module 4 builds practical AI governance frameworks that manage real operational risks ??data privacy, shadow AI, hallucination, IP exposure ??without creating bureaucratic paralysis.",
    question: "How do I build AI governance that actually prevents harm without making it so restrictive that no one uses AI?",
    explanation: "The governance failure mode that organizations should worry about as much as insufficient governance is governance so burdensome that employees route around it ??creating shadow AI use that's unmonitored and ungoverned. Effective AI governance is risk-proportionate: high scrutiny for high-consequence uses (customer-facing AI, decisions affecting employees, legally sensitive outputs), lighter-touch approval for low-consequence uses (internal drafting tools, summarization, brainstorming). The practical structure that achieves this balance is a tiered framework: Tier 1 tools are pre-approved for general use with basic training and acceptable use policy acknowledgment. Tier 2 uses require manager approval and a brief data classification check. Tier 3 deployments (customer-facing, regulatory context, high-volume automation) require formal review. This tiering creates governance where it matters and removes friction where it doesn't.",
  },

  "module-4-privacy-data-section-card": {
    id: "module-4-privacy-data-section-card",
    moduleId: "module-4",
    sectionId: "privacy-data",
    cardType: "section-card",
    content: "Data privacy risks in AI deployments: (1) Employees entering confidential data into public AI tools (customer PII, trade secrets, financial data); (2) Vendor training on your data without explicit consent; (3) Data residency violations (GDPR, CCPA, HIPAA); (4) Inadequate data retention and deletion policies; (5) Third-party API integrations creating unauthorized data flows. Review AI vendor data processing terms before any deployment involving sensitive information.",
    summary: "AI data privacy risks span employee data leakage into public tools, vendor training on your data, regulatory violations, retention policy gaps, and unauthorized API data flows ??each requiring specific contractual and policy controls.",
    question: "What are the most urgent data privacy risks I need to address before deploying AI tools to my employees?",
    explanation: "Five privacy risks require immediate attention before any employee-facing AI deployment. First and most urgent: employees will enter sensitive data into consumer AI tools unless they have explicit guidance about what's permitted. Your acceptable use policy must specify which tools are approved for which data sensitivity levels, and this must be communicated before deployment, not after an incident. Second: review the data processing terms of every AI tool you're considering ??specifically, whether your inputs are used for model training (many consumer tools default to this), where data is stored, and what the retention and deletion policies are. Third: assess regulatory implications by data type ??HIPAA for health data, GDPR for EU personal data, CCPA for California consumers, PCI-DSS for payment data. These aren't theoretical ??violations carry material financial penalties. Fourth: map third-party API integrations to understand all data flows, not just direct tool use. Fifth: verify vendor contractual commitments include data processing agreements that match your regulatory requirements.",
  },

  "module-4-ai-bias": {
    id: "module-4-ai-bias",
    moduleId: "module-4",
    sectionId: "ai-bias",
    cardType: "section-card",
    content: "AI bias occurs when systems produce systematically different outcomes for different demographic groups, typically because training data reflects historical inequities. Business-critical bias risks: hiring systems that screen out protected classes, lending models that discriminate by zip code (a proxy for race), healthcare systems that perform worse for underrepresented patient populations, and content moderation systems with unequal false positive rates. Bias governance requires regular audit, not one-time review.",
    summary: "AI bias produces systematically unfair outcomes across demographic groups ??creating both legal liability and real harm ??and requires ongoing audit processes rather than one-time review.",
    question: "How do I set up a bias monitoring process that actually catches problems before they become public failures?",
    explanation: "Effective bias monitoring requires three components that most organizations implement poorly or not at all. First, pre-deployment bias testing: before any AI system goes into production for a consequential decision (hiring, lending, pricing, content moderation), run the model's outputs against demographic segmentation ??do outcomes differ by race, gender, age, zip code, or other protected characteristics? Statistical disparities require investigation and remediation before deployment, not after. Second, ongoing production monitoring: bias can emerge after deployment as inputs shift or the model drifts. Schedule regular output audits ??quarterly for high-stakes systems ??that segment results by demographic categories and flag statistically significant disparities for human review. Third, feedback mechanism: create a formal channel for affected individuals to flag suspected bias, and require investigation and response protocols. The combination of pre-deployment testing, ongoing monitoring, and accessible feedback channels catches most bias problems before they become legal or reputational crises.",
  },

  "module-4-misinformation": {
    id: "module-4-misinformation",
    moduleId: "module-4",
    sectionId: "misinformation",
    cardType: "section-card",
    content: "AI misinformation risks in business: (1) LLM hallucinations presented as facts in customer communications; (2) AI-generated reports with incorrect data cited authoritatively; (3) Deepfake content impersonating executives; (4) AI-generated phishing attacks at scale; (5) Internal AI knowledge bases contaminated with hallucinated 'facts' that propagate through the organization. Governance requires review checkpoints before AI outputs enter consequential channels.",
    summary: "AI misinformation risks span customer-facing hallucinations, authoritative incorrect reports, executive deepfakes, AI-phishing, and internal knowledge base contamination ??each requiring review checkpoints before outputs reach consequential channels.",
    question: "What's the most dangerous AI misinformation risk for a mid-sized business, and what's the minimum governance to prevent it?",
    explanation: "For most mid-sized businesses, the most practically dangerous AI misinformation risk is hallucinated facts entering customer-facing communications or internal knowledge bases. Deepfakes and large-scale phishing are real threats but primarily target enterprise scale ??the everyday risk is simpler: an employee uses AI to draft a response to a customer question, the AI confidently states an incorrect policy or data point, the employee doesn't catch it because it sounds authoritative, and the customer receives and acts on misinformation. The minimum governance to prevent this is a mandatory human review step before any AI-generated content reaches an external audience or becomes a source of record. This single control ??human review before publication ??catches the vast majority of consequential misinformation. More sophisticated governance adds factual accuracy requirements for AI-generated reports and blocks AI from being the sole contributor to any document that will be cited as authoritative.",
  },

  "module-4-responsible-ai": {
    id: "module-4-responsible-ai",
    moduleId: "module-4",
    sectionId: "responsible-ai",
    cardType: "section-card",
    content: "Responsible AI in practice requires: (1) Defined use case boundaries ??which decisions AI can make autonomously vs. require human oversight; (2) Explainability requirements for consequential decisions; (3) Audit trails for AI-influenced outcomes; (4) Incident response protocols for AI failures; (5) Clear accountability assignment ??who is responsible when AI causes harm; (6) Regular third-party audits for high-risk deployments. Abstract principles without operational implementation are insufficient.",
    summary: "Responsible AI requires six operational elements ??use case boundaries, explainability, audit trails, incident response, accountability, and third-party audits ??not just published principles.",
    question: "How do I translate 'responsible AI principles' from a poster on the wall into actual operational controls?",
    explanation: "Responsible AI principles are meaningless without operational implementation. For each principle, identify the specific control that makes it real. 'Fairness' becomes: a bias testing protocol with documented demographic segmentation before high-stakes deployments. 'Transparency' becomes: an explainability requirement for any AI-influenced decision affecting individuals ??the person affected should be able to learn that AI was used and what factors it considered. 'Accountability' becomes: named human owners for each AI system who are responsible when it fails. 'Safety' becomes: defined escalation paths for when AI outputs fall below quality thresholds or cause harm, with documented response timelines. 'Privacy' becomes: a data classification matrix mapping data sensitivity levels to permitted AI tools. 'Reliability' becomes: uptime and performance SLAs with vendor commitments and monitoring. The test of responsible AI implementation is whether these controls exist as documented, enforceable policies ??not whether your organization has published a values statement.",
  },

  "module-4-ethical-dilemmas-section-card": {
    id: "module-4-ethical-dilemmas-section-card",
    moduleId: "module-4",
    sectionId: "ethical-dilemmas",
    cardType: "section-card",
    content: "Common AI ethical dilemmas in business: (1) Surveillance vs. productivity monitoring ??where does AI performance tracking become invasive?; (2) Personalization vs. manipulation ??when does AI-driven content optimization cross into manipulation?; (3) Efficiency vs. employment ??is rapid automation without workforce transition planning ethical?; (4) Speed vs. accuracy ??is deploying an 85%-accurate AI for consequential decisions acceptable? These aren't abstract questions ??they require explicit organizational policy.",
    summary: "Business AI creates genuine ethical dilemmas around surveillance, manipulation, workforce displacement, and accuracy thresholds ??each requiring explicit organizational policy rather than case-by-case judgment.",
    question: "How should my organization decide where the line is between AI productivity tools and invasive employee surveillance?",
    explanation: "The line between productivity support and invasive surveillance is set by purpose, proportionality, consent, and consequence. Purpose: is the monitoring aimed at supporting employee performance and identifying workflow problems, or at creating leverage over individual employees? Systems designed to flag workflow bottlenecks at an aggregate level are qualitatively different from those tracking individual keystroke patterns for performance reviews. Proportionality: is the data being collected proportionate to the legitimate business need ??monitoring customer-facing quality calls for service improvement is different from tracking email response times as a productivity signal. Consent and transparency: employees should know what is being monitored, how data is used, who accesses it, and how long it's retained. Consequence: if monitoring data is used in performance evaluations, disciplinary processes, or compensation decisions, the consent, accuracy, and fairness requirements are substantially higher than if it's used only for aggregate workflow analysis. Each of these dimensions requires an explicit policy position, not a case-by-case call.",
  },

  "module-4-risk-reflection": {
    id: "module-4-risk-reflection",
    moduleId: "module-4",
    sectionId: "risk-reflection",
    cardType: "section-card",
    content: "Risk reflection exercise: For each AI initiative, assess (1) What happens if this system fails silently? (2) Who bears the consequence of errors? (3) Is the error rate acceptable given who is affected? (4) What is the worst-case failure mode, and how quickly would we detect it? (5) What is our recovery plan? Organizations that can't answer these questions for a production AI system haven't completed their risk assessment.",
    summary: "AI risk assessment requires five specific questions ??silent failure consequences, error consequence bearer, acceptable error rates, detection time, and recovery plans ??that must be answered before any production deployment.",
    question: "What does a complete AI risk assessment look like for a system I'm about to deploy?",
    explanation: "A complete AI risk assessment for a production deployment answers five questions with specificity, not vague acknowledgments. First, silent failure: can this system fail in a way that goes undetected, and for how long? An AI that returns confident wrong answers without triggering any alert is more dangerous than one that fails loudly. Define your monitoring protocol and acceptable undetected failure window. Second, consequence bearer: when this system makes a wrong decision, who is harmed ??the organization, a customer, an employee, a third party? Systems affecting external parties require higher scrutiny. Third, acceptable error rate: given the consequence and the consequence bearer, what error rate is tolerable? 5% may be fine for an internal drafting tool; 0.1% may still be too high for a medical decision support system. Fourth, worst-case detection time: in the worst scenario, how long could this system produce bad outputs before someone catches it? Design monitoring to bring this time down to an acceptable window. Fifth, recovery plan: if this system fails, how do you restore to the pre-AI process quickly, and what are the downstream consequences of that restoration?",
  },

  "module-4-governance-module-quiz": {
    id: "module-4-governance-module-quiz",
    moduleId: "module-4",
    sectionId: "governance-module-quiz",
    cardType: "section-card",
    content: "Apply AI governance frameworks ??data privacy, bias assessment, misinformation controls, and responsible deployment criteria.",
    summary: "Module 4 knowledge check ??validate your ability to identify governance gaps, assess bias and privacy risks, and build practical AI risk controls.",
    question: "Your organization has no formal AI policy, but employees are already using AI tools daily. How do you build governance without shutting down productive use?",
    explanation: "Retroactive governance ??building policy after adoption has already occurred ??requires a different approach than starting from scratch. The first step is an audit, not a ban: survey employees to understand what tools are being used, for what tasks, with what data. This reveals the actual risk surface rather than a theoretical one. From the audit, categorize current uses into: acceptable as-is, acceptable with minor guardrails (like a reminder not to include customer names), and genuinely problematic (confidential data entering unapproved tools). Address the genuinely problematic uses first with specific policy and approved alternatives. Create a clear, positive framework for what's permitted ??a short, readable acceptable use policy with concrete examples ??rather than a long list of prohibitions. Announce approved tools and use cases enthusiastically, making it easy to do the right thing. Then address the genuinely problematic use cases with targeted, specific intervention rather than blanket restrictions that drive usage underground.",
  },

  // ?????????????????????????????????????????????
  // MODULE 7 ??Building an AI Adoption Roadmap
  // ?????????????????????????????????????????????

  "module-4-adoption-overview-section-card": {
    id: "module-4-adoption-overview-section-card",
    moduleId: "module-4",
    sectionId: "adoption-overview",
    cardType: "section-card",
    content: "This module answers the question every leader asks after understanding AI: 'What do we actually do Monday morning?' You'll build a practical, sequenced adoption roadmap covering pilot design, change management, department prioritization, internal champions, employee training, and scaling criteria. The goal is structured momentum ??not analysis paralysis.",
    summary: "Module 4 translates AI understanding into a concrete adoption roadmap ??pilot design, department prioritization, change management, and scaling criteria that create structured momentum.",
    question: "I understand AI conceptually but don't know how to actually start. What are the first three concrete steps?",
    explanation: "The three most productive first steps are specific, bounded, and immediately actionable. First, conduct a current-state workflow audit in one department: document what tasks are done, by whom, at what frequency, and how long each takes. This creates the baseline you need to measure improvement and identify AI candidates ??without it, every subsequent decision is guesswork. Second, identify one high-frequency, high-effort task in that department where AI has a clear use case, run a 30-day constrained pilot with 3?? volunteers using an approved tool, and measure time-on-task before and after. Third, document what you learned ??what worked, what didn't, what the actual time savings were, what governance gaps surfaced ??and use that evidence to make a go/no-go decision on broader rollout. These three steps produce real evidence rather than theoretical plans, create early organizational wins, and build the measurement discipline that makes every subsequent AI investment more credible.",
  },

  "module-4-ai-and-jobs": {
    id: "module-4-ai-and-jobs",
    moduleId: "module-4",
    sectionId: "ai-and-jobs",
    cardType: "section-card",
    content: "AI's impact on jobs operates at the task level, not the job level. Most roles contain a mix of tasks: some highly automatable (data entry, scheduling, report formatting), others resistant to automation (relationship management, novel problem-solving, physical tasks requiring dexterity). AI adoption typically reshapes roles ??removing repetitive tasks, shifting time to higher-value work ??rather than eliminating jobs entirely in the short term. The exception is roles that are almost entirely task-automatable.",
    summary: "AI reshapes jobs at the task level ??automating repetitive work and expanding time for higher-value activities ??rather than eliminating most roles, with roles that are almost entirely task-automatable being the exception.",
    question: "How do I honestly assess which roles in my organization face the most significant AI impact?",
    explanation: "Honest AI impact assessment for specific roles requires analyzing each role's task composition rather than making job-level predictions. For any role, map the tasks that consume 80% of time and classify each on two dimensions: How rule-based and repetitive is it ??the more predictable and pattern-based, the higher the automation potential. How much does it require contextual judgment, relationship management, or physical dexterity ??the more it does, the more resistant it is to automation. Roles where 70%+ of time is spent on rule-based, repetitive digital tasks (data entry, report assembly, routine correspondence, basic scheduling) face significant task automation potential and therefore significant role transformation. Roles where most time involves relationship management, novel problem-solving, physical skill, or complex contextual judgment will be augmented by AI but are unlikely to see major headcount impact in the near term. The clearest signals of genuine job displacement risk ??not just task reshaping ??are roles where almost every task is automatable and where the automation is economically justified at the organization's scale.",
  },

  "module-4-ai-in-the-workplace": {
    id: "module-4-ai-in-the-workplace",
    moduleId: "module-4",
    sectionId: "ai-in-the-workplace",
    cardType: "section-card",
    content: "AI in the workplace changes how work gets done: faster drafting, automated summaries, real-time translation, intelligent search, and automated routing. But workplace AI also introduces new failure modes: over-reliance on AI outputs, skill atrophy in frequently delegated tasks, and homogenized thinking if everyone uses the same prompts. Healthy AI workplace cultures train employees to verify outputs, understand AI limitations, and maintain the judgment required to catch AI errors.",
    summary: "Workplace AI creates genuine productivity gains alongside new failure modes ??over-reliance, skill atrophy, and homogenized thinking ??requiring deliberate cultural design to capture benefit while managing risk.",
    question: "What does a healthy AI workplace culture look like, and how do I build it?",
    explanation: "A healthy AI workplace culture is defined by three characteristics: critical verification, maintained expertise, and strategic diversity. Critical verification means employees treat AI outputs as drafts that require judgment, not finished products that require only approval. This is a behavioral norm that must be explicitly taught and modeled by leadership ??if managers approve AI-generated content without changes, they signal that verification isn't valued. Maintained expertise means employees continue practicing the core skills that AI is augmenting, not only those skills. If AI always writes the first draft, editing skill remains strong but drafting judgment atrophies ??and when AI fails, the human who only edits can't fill the gap. Strategic diversity means teams intentionally discuss and vary their AI approaches rather than converging on a single workflow where every AI output sounds the same. The cultural design work required to build these norms is as important as the tool deployment itself ??and most organizations invest almost none of it.",
  },

  "module-4-ai-opportunities": {
    id: "module-4-ai-opportunities",
    moduleId: "module-4",
    sectionId: "ai-opportunities",
    cardType: "section-card",
    content: "Highest-ROI AI opportunities by function: Marketing ??content personalization, A/B testing acceleration, ad copy generation; Sales ??lead scoring, call summarization, proposal drafting; Operations ??process documentation, quality control, exception flagging; Finance ??report generation, anomaly detection, forecasting; HR ??resume screening, onboarding automation, policy Q&A. Prioritize functions with high task volume, clear measurability, and existing digital data.",
    summary: "Highest-ROI AI opportunities exist across marketing, sales, operations, finance, and HR ??prioritize functions with high task volume, clear measurement, and existing digital data.",
    question: "If I can only run one AI pilot in the next quarter, which business function should I choose and why?",
    explanation: "The function that produces the most reliable first AI ROI depends on your organization's specific context, but the selection criteria are universal: choose the function with the highest combination of task volume (more repetitions means more savings), data availability (existing digital records that AI can work with), measurement clarity (outcomes you can actually compare before and after), and change management readiness (a team and manager open to experimenting). For most mid-sized organizations without AI history, sales or marketing yields the fastest visible ROI because tasks like email personalization, call summarization, proposal drafting, and content generation have high frequency, immediate measurability (response rates, time-on-task), and relatively low governance complexity. Operations and finance produce larger potential savings but require more integration work. HR presents governance complexity around bias in hiring that makes it a more careful deployment. Start where the combination of frequency, measurability, and readiness is strongest ??not where the potential savings number sounds most impressive in a presentation.",
  },

  "module-4-ai-strategy": {
    id: "module-4-ai-strategy",
    moduleId: "module-4",
    sectionId: "ai-strategy",
    cardType: "section-card",
    content: "AI strategy for most organizations should follow: (1) Crawl ??internal productivity tools, employee assistance, low-risk automation with human oversight; (2) Walk ??department-level workflow automation, customer-facing AI with review processes; (3) Run ??autonomous systems, cross-functional AI integration, AI-native process design. Most organizations try to run before they've walked ??deploying autonomous customer-facing AI before they have governance, review processes, or trained employees.",
    summary: "AI adoption follows a crawl-walk-run progression ??internal productivity first, then governed automation, then autonomous systems ??and most organizations fail by skipping to run before building the foundational capability.",
    question: "How do I know which stage of AI adoption my organization is ready for right now?",
    explanation: "Your readiness for each stage has observable indicators. You're ready for Crawl (internal tools with human oversight) when you have: a basic acceptable use policy, at least one approved tool for internal use, and managers who understand AI enough to evaluate outputs critically. You're ready for Walk (department automation with review processes) when you have: documented outcomes from crawl-phase pilots, governance frameworks for the functions where you're deploying, employees with enough AI familiarity to catch errors, and review workflows that don't create bottlenecks. You're ready for Run (autonomous systems and AI-native processes) when you have: a track record of walk-phase deployments with measurable results and resolved governance issues, technical infrastructure for AI monitoring and incident response, organizational AI literacy broad enough that employees can identify and escalate AI failures, and legal/compliance review for the specific autonomous use cases you're deploying. Most organizations currently claiming to 'run' are actually still walking at best ??and the autonomous customer-facing systems deployed prematurely create the brand-damaging failures that make AI adoption harder for everyone.",
  },

  "module-4-industry-applications": {
    id: "module-4-industry-applications",
    moduleId: "module-4",
    sectionId: "industry-applications",
    cardType: "section-card",
    content: "AI applications by industry: Healthcare ??clinical documentation, diagnostic support, administrative automation; Financial Services ??fraud detection, compliance monitoring, customer service; Retail ??demand forecasting, personalization, inventory optimization; Manufacturing ??quality control, predictive maintenance, supply chain optimization; Legal ??document review, contract analysis, research; Education ??personalized tutoring, administrative automation, content generation. Each industry has distinct regulatory and governance considerations.",
    summary: "AI creates high-value applications across healthcare, finance, retail, manufacturing, legal, and education ??but each industry carries distinct regulatory requirements that must be addressed before deployment.",
    question: "My organization is in a heavily regulated industry. How should that change my AI adoption approach?",
    explanation: "Heavily regulated industries ??healthcare, financial services, legal, education ??require front-loading governance and compliance assessment in a way that unregulated industries don't. Four adaptations matter. First, regulatory mapping before tool selection: determine which regulations apply to your specific AI use cases (HIPAA for health data, SEC rules for financial AI outputs, professional conduct rules for legal AI) and let compliance requirements drive tool evaluation rather than retrofitting compliance after procurement. Second, explainability requirements for consequential decisions: regulated industries frequently require that decisions affecting individuals be explainable ??a 'black box' AI that can't articulate its decision rationale may be non-compliant regardless of performance. Third, audit trail requirements: many regulated industries require documentation of decision processes that AI doesn't provide by default ??build logging and documentation into your deployment design. Fourth, a phased approval approach: start with AI applications that are clearly outside regulatory scope (internal productivity, non-consequential automation) to build organizational capability and establish your governance process before tackling the regulated use cases.",
  },

  "module-4-real-workflows-section-card": {
    id: "module-4-real-workflows-section-card",
    moduleId: "module-4",
    sectionId: "real-workflows",
    cardType: "section-card",
    content: "Real AI workflow examples that demonstrate measurable value: (1) Weekly report generation: analyst spends 4 hours compiling ??AI aggregates data in 20 minutes, analyst reviews and adjusts in 45 minutes; (2) Customer support triage: support team manually reads and routes 500 tickets/day ??AI categorizes and prioritizes in real time, human agents handle escalations; (3) Sales email personalization: reps send generic sequences ??AI personalizes using CRM context, open rates increase 35??5%.",
    summary: "Three concrete AI workflow transformations ??report generation, support triage, and sales personalization ??demonstrate the combination of specific task identification, measurable before/after comparison, and preserved human judgment that makes AI value real.",
    question: "Can you show me what a real AI workflow transformation looks like step by step?",
    explanation: "Take the weekly report generation example as a concrete template. Before AI: an analyst spends 4 hours every Monday pulling data from three systems, formatting it into a standard template, writing narrative commentary, and distributing. Total cost: 4 hours at $75/hour = $300/week = $15,600/year. After AI workflow redesign: the analyst runs a data aggregation prompt that pulls from connected sources and populates the template structure (20 minutes), reviews the output for accuracy and adds judgment-based commentary (45 minutes), and distributes. Total cost: 1 hour 5 minutes = roughly $81/week = $4,212/year. Annual savings: ~$11,400 for one analyst on one report. The implementation: choosing an AI tool with API access to the relevant data sources, writing and testing a data aggregation prompt, training the analyst on the review workflow, and establishing a quality standard for when the AI output is acceptable to distribute. The critical design element is that human review is built in ??not because AI can't produce good output, but because the analyst's judgment about context and accuracy is what makes the report trustworthy.",
  },

  "module-4-role-transformation-section-card": {
    id: "module-4-role-transformation-section-card",
    moduleId: "module-4",
    sectionId: "role-transformation",
    cardType: "section-card",
    content: "AI transforms roles by shifting the mix of tasks, not eliminating roles entirely in most cases. A content writer with AI tools shifts from spending 60% on first-draft writing to spending 60% on editing, strategy, and quality judgment. A financial analyst shifts from 70% data compilation to 70% interpretation and recommendation. These shifts are positive ??but require retraining, role redefinition, and sometimes compensation renegotiation as the nature of expertise changes.",
    summary: "AI shifts the task mix within roles ??reducing drafting and data work, expanding editing, judgment, and strategy ??requiring retraining, role redefinition, and honest communication to be managed well.",
    question: "How do I manage the conversation with employees whose roles are changing significantly due to AI?",
    explanation: "The most effective communication about AI-driven role transformation is specific, honest, and paired with concrete support. Employees deserve to know four things. First, exactly what changes: which tasks AI will handle, which tasks remain human, and what the new workflow looks like ??not vague reassurances that 'AI will help you.' Second, what the expanded work looks like: if data compilation time drops from 70% to 30%, what should the other 40% be doing? The answer should be specific and credible ??if the honest answer is 'we're not sure yet,' that requires a different conversation than if you have a clear plan. Third, what support is available: specific training for the new responsibilities, timeline for transition, and a feedback mechanism if the new workflow creates problems. Fourth, what the career implications are: if roles are shifting toward higher-value work, what does that mean for growth, recognition, and compensation? Transparency about uncertainty ??and visible leadership commitment to navigating it fairly ??builds more trust than polished messaging that papers over real concerns.",
  },

  "module-4-workflow-redesign-section-card": {
    id: "module-4-workflow-redesign-section-card",
    moduleId: "module-4",
    sectionId: "workflow-redesign",
    cardType: "section-card",
    content: "Workflow redesign is the highest-leverage AI adoption activity most organizations skip. Instead of adding AI to existing workflows, redesign around AI capabilities: (1) Map current workflow steps; (2) Identify steps AI can handle with high reliability; (3) Identify handoff points requiring human judgment; (4) Design the new workflow with explicit AI/human responsibilities; (5) Build in quality checkpoints; (6) Define performance metrics for the redesigned workflow. Organizations that skip redesign capture 20??0% of available AI value.",
    summary: "Workflow redesign around AI capabilities captures 3??x more value than simply inserting AI into existing processes ??and it's the step most organizations skip.",
    question: "What does a proper AI workflow redesign look like, and why can't I just add AI to my existing process?",
    explanation: "Adding AI to an existing workflow without redesign typically captures 20??0% of available value ??because the existing workflow was designed around human limitations and capabilities, not AI ones. A proper redesign starts with mapping the current workflow step by step, then asks a fundamentally different question about each step: 'Is this step the way it is because of what the task requires, or because of what humans can do?' Steps that exist because humans can only process information linearly, need breaks, can't hold many variables simultaneously, or need to manually move data between systems may be restructurable entirely when AI is in the loop. The redesigned workflow places AI at entry points where it can handle high-volume pattern recognition, reserves human judgment for exception handling and contextual decisions, builds explicit quality checkpoints at handoff points, and measures performance against the redesigned process metrics ??not the original ones. The investment in redesign pays for itself rapidly; organizations that simply bolt AI onto existing processes often report 'AI didn't really help' when the real problem is that the workflow didn't change.",
  },

  "module-4-building-ai-skills": {
    id: "module-4-building-ai-skills",
    moduleId: "module-4",
    sectionId: "building-ai-skills",
    cardType: "section-card",
    content: "Building organizational AI skills requires: (1) Baseline AI literacy training for all employees ??what AI can and can't do; (2) Role-specific prompt engineering training ??focused on each function's use cases; (3) Identification of internal AI champions ??employees who develop deep expertise and coach others; (4) Ongoing learning infrastructure ??AI is evolving fast enough that one-time training becomes obsolete quickly; (5) Leadership AI fluency ??executives who can't evaluate AI claims make poor AI investment decisions.",
    summary: "Organizational AI skill-building requires layered investment ??baseline literacy, role-specific training, internal champions, ongoing learning, and executive fluency ??because one-time training becomes obsolete faster than AI evolves.",
    question: "How should I build an AI training program that actually changes behavior rather than just checking a compliance box?",
    explanation: "The training programs that actually change behavior share three characteristics that compliance-box programs lack. First, they're role-specific rather than generic: a generic 'Introduction to AI' training tells everyone the same thing at the wrong level of abstraction. Effective training shows a sales rep how to write prompts for their specific sales tasks, shows a finance analyst how to use AI for their specific analysis workflows, and shows a marketer how to use AI for their specific content creation process. Second, they include deliberate practice with real work: behavior changes through doing, not through watching. Training should include participants completing real work tasks with AI during the session and comparing results ??not passively viewing demonstrations. Third, they build in follow-through: a 30-day post-training check-in where managers ask 'how has your AI use changed' and teams share what's working creates accountability that one-time training never achieves. Combine this with internal AI champions ??employees who develop deep expertise and create peer learning loops ??and ongoing learning infrastructure, because the AI capability landscape will change significantly every 6??2 months.",
  },

  "module-4-adoption-module-quiz": {
    id: "module-4-adoption-module-quiz",
    moduleId: "module-4",
    sectionId: "adoption-module-quiz",
    cardType: "section-card",
    content: "Apply AI adoption roadmap frameworks ??sequencing, change management, role transformation, and workflow redesign.",
    summary: "Module 4 knowledge check ??validate your ability to sequence AI adoption, design effective pilots, manage role transformation, and structure workflow redesign.",
    question: "You've completed two successful AI pilots. The CEO is excited and wants to scale AI company-wide immediately. What risks does this enthusiasm create, and what's the right response?",
    explanation: "CEO enthusiasm after early pilots is an asset to manage carefully ??it creates organizational momentum that's hard to generate, but rapid unplanned scaling is how that momentum converts into costly failures. The risks of immediate company-wide scaling are real: governance frameworks that worked for two pilots may break down at 50 simultaneous deployments; training that was hands-on with 20 people becomes impractical at 500; integration and infrastructure requirements multiply; and the organizational change management required increases non-linearly with scope. The right response is to channel the enthusiasm productively: use it to accelerate governance investment, secure training budget, build the AI team, and create the infrastructure that makes scaling safe ??rather than immediately expanding deployment before those foundations exist. Present a 90-day scaling plan that includes governance expansion, training infrastructure, and three additional pilots in new departments as the next stage, with full company-wide deployment as the 12-month target. This preserves momentum while preventing the failures that would undermine it.",
  },

  // ?????????????????????????????????????????????
  // MODULE 1 (continued) ??AI Agents & Automation Systems (merged from Module 8)
  // ?????????????????????????????????????????????

  "module-1-agent-overview-section-card": {
    id: "module-1-agent-overview-section-card",
    moduleId: "module-1",
    sectionId: "agent-overview",
    cardType: "section-card",
    content: "This module separates AI agent hype from operational reality. You'll learn what AI agents actually are, how they differ from simpler automation workflows, what orchestration systems do, and where human oversight remains essential. The goal is enabling informed decisions about agent deployment rather than being swept up in marketing narratives.",
    summary: "Module 8 cuts through AI agent hype to explain what agents actually are, how they work operationally, and where human oversight is non-negotiable ??enabling informed deployment decisions.",
    question: "Every vendor is pitching 'AI agents' right now. How do I separate real agent capability from marketing language?",
    explanation: "The marketing use of 'AI agent' covers everything from sophisticated autonomous systems to a chatbot with a slightly longer context window. The operational questions that reveal real capability are: What specific actions can this agent take ??can it enumerate them precisely? Which of those actions are irreversible (sending emails, modifying records, placing orders, spending budget)? What is the approval workflow for irreversible actions ??is human approval required, and how is it implemented? What happens when the agent encounters an unexpected situation outside its training ??does it stop and escalate, guess and continue, or fail silently? What is the monitoring and logging infrastructure ??can you review every action the agent took and why? A vendor who answers all five questions specifically and credibly has a real agent system. A vendor who responds with enthusiasm but can't specify action boundaries, approval workflows, and failure handling has rebranded an existing product rather than building genuine agent capability.",
  },

  "module-1-what-are-agents-section-card": {
    id: "module-1-what-are-agents-section-card",
    moduleId: "module-1",
    sectionId: "what-are-agents",
    cardType: "section-card",
    content: "An AI agent is a system that uses an AI model to take sequences of actions toward a goal, typically with access to tools (web search, code execution, API calls, file systems). Unlike a chatbot that responds to single prompts, an agent plans multi-step actions, executes them, observes results, and adapts. The degree of autonomy varies significantly ??from 'human-in-the-loop' (approves each step) to 'fully autonomous' (runs without oversight). Most production agents today are closer to the constrained end of this spectrum.",
    summary: "AI agents take multi-step action sequences using tools to achieve goals ??distinguished from chatbots by planning and adaptation, and from each other by how much autonomy they operate with.",
    question: "What makes an AI agent fundamentally different from the AI tools I'm already using?",
    explanation: "The difference between an AI assistant and an AI agent is the difference between advice and action. When you use ChatGPT or Claude to draft an email, the AI produces text and you decide what to do with it ??the consequence of any action is in your hands. An AI agent takes the action itself: it doesn't just draft the email, it sends it. It doesn't just analyze the data, it modifies the spreadsheet. It doesn't just identify the meeting conflict, it reschedules the call. This real-world action capability is what makes agents qualitatively different from conversational AI tools ??and what makes their governance requirements qualitatively different as well. When an AI can send emails on your behalf, modify your database, or make API calls to external services, the consequences of errors are external and potentially irreversible. This is why agent deployment requires a different level of governance scrutiny, action boundary definition, and monitoring than conversational AI tool deployment.",
  },

  "module-1-types-of-agents": {
    id: "module-1-types-of-agents",
    moduleId: "module-1",
    sectionId: "types-of-agents",
    cardType: "section-card",
    content: "AI agent categories: (1) Task agents ??complete a specific defined task (research a topic, send a report); (2) Process agents ??manage ongoing workflows with recurring triggers; (3) Multi-agent systems ??networks of specialized agents coordinating on complex tasks; (4) Embodied agents ??AI controlling physical systems (robots, manufacturing equipment). Most business deployments today are task agents with constrained tool access. Multi-agent coordination is advancing rapidly but remains operationally complex.",
    summary: "Four AI agent types ??task, process, multi-agent, and embodied ??have distinct deployment complexity and governance requirements, with task agents being the most production-ready for most organizations today.",
    question: "Which type of AI agent is actually ready to deploy in a business environment today, and which should I wait on?",
    explanation: "The most production-ready agent type today is the task agent ??a system designed to complete a specific, well-defined task with constrained tool access and clear success criteria. Research compilation agents, data analysis agents, report generation agents, and single-workflow customer service routing agents fall in this category and are operating reliably in production environments. Process agents ??managing ongoing workflows with recurring triggers ??are viable for well-defined, lower-stakes workflows but require more robust monitoring infrastructure. Multi-agent systems ??where multiple specialized AI agents coordinate to complete complex tasks ??are advancing rapidly but remain operationally complex and brittle in most production environments outside of well-resourced technology organizations. Embodied agents controlling physical systems are mature only in highly specialized industrial contexts. The practical guidance: start with task agents for specific, bounded problems; build the monitoring and governance infrastructure; then evaluate whether process automation or multi-agent coordination is warranted based on demonstrated need and organizational AI maturity.",
  },

  "module-1-how-agents-work-section-card": {
    id: "module-1-how-agents-work-section-card",
    moduleId: "module-1",
    sectionId: "how-agents-work",
    cardType: "section-card",
    content: "AI agents follow a perceive-plan-act-observe loop: (1) Perceive ??receive the goal and relevant context; (2) Plan ??determine what steps to take using the LLM as a reasoning engine; (3) Act ??execute steps using available tools; (4) Observe ??examine results of actions; (5) Adapt ??revise the plan based on observations; (6) Repeat until goal achieved or failure threshold reached. The LLM provides the reasoning; tools provide the ability to affect the real world.",
    summary: "AI agents operate through a perceive-plan-act-observe loop ??the LLM provides reasoning at each step while tools provide real-world effect capability, creating a system that can adapt to intermediate results.",
    question: "What does the perceive-plan-act-observe loop mean in terms of real risks when an agent is operating in my business systems?",
    explanation: "The loop structure is what creates agents' power ??and their distinctive risks. Consider a research agent tasked with gathering competitor pricing: Perceive (read the goal and available tools), Plan (search competitor websites, extract price tables, compile comparison), Act (run web searches, navigate pages, extract data), Observe (some pages blocked, some prices in images not text), Adapt (try alternative sources, use image recognition, flag gaps). This adaptive replanning is useful ??but it also means the agent may take actions you didn't anticipate when you gave the original instruction. If the agent has write access to your systems, its adaptive actions could include modifying records based on partial information, sending requests to external systems, or storing data in places you didn't intend. The governance implication is clear: agents should have only the specific tool access required for their defined task, read access should be separated from write access wherever possible, and any irreversible action should require explicit human approval before execution.",
  },

  "module-1-real-world-applications": {
    id: "module-1-real-world-applications",
    moduleId: "module-1",
    sectionId: "real-world-applications",
    cardType: "section-card",
    content: "Practical AI agent applications in production today: (1) Research agents ??search, synthesize, and structure information from multiple sources; (2) Code generation agents ??write, test, and iterate on code with tool execution; (3) Data analysis agents ??pull data, run analysis, generate reports; (4) Customer service agents ??triage, respond, and escalate support requests; (5) Content pipeline agents ??draft, review, format, and publish content with checkpoints. Each requires defined human oversight points.",
    summary: "Five AI agent categories are operating reliably in production today ??research, code, data analysis, customer service, and content pipelines ??each with defined human oversight checkpoints built in.",
    question: "Which AI agent application would have the highest impact for a mid-sized business starting with agents for the first time?",
    explanation: "For a first agent deployment, the highest-impact applications share three characteristics: the task is well-defined with clear success criteria, the tool access required is narrow and mostly read-only, and there's a natural human review point before any output has external consequences. Research agents ??tasked with gathering, synthesizing, and structuring information from specified sources ??score well on all three. The agent searches and compiles; a human reviews and acts on the findings. Data analysis agents ??pulling data from connected systems, running specified analyses, and generating report drafts ??also score well, particularly for organizations where report generation consumes significant analyst time. For customer service, start with triage and routing (the agent classifies and prioritizes tickets; humans respond) rather than response generation (the agent drafts responses; the review step is harder to maintain at volume). Code generation agents are highest-impact for technology teams but require a developer familiar enough with the codebase to review generated code critically ??without that, they create technical debt faster than they reduce it.",
  },

  "module-1-risks-and-limits": {
    id: "module-1-risks-and-limits",
    moduleId: "module-1",
    sectionId: "risks-and-limits",
    cardType: "section-card",
    content: "AI agent risks: (1) Action cascades ??a wrong first action compounds through subsequent steps; (2) Prompt injection ??malicious content in the environment manipulates the agent's actions; (3) Tool misuse ??agent uses available tools in unintended ways; (4) Goal specification errors ??the agent achieves the literal goal while violating the intent; (5) Lack of common sense limits ??agents may take technically correct but contextually inappropriate actions. Mitigation requires constrained tool access, mandatory approval gates for consequential actions, and comprehensive logging.",
    summary: "Five AI agent risks ??action cascades, prompt injection, tool misuse, goal specification errors, and context blindness ??require constrained tools, approval gates, and comprehensive logging to manage.",
    question: "What's the most dangerous AI agent failure mode, and what control prevents it?",
    explanation: "The most dangerous and least visible agent failure mode is the action cascade: a wrong decision in step one that compounds through subsequent autonomous steps before anyone notices. Unlike a chatbot error that affects a single response, an agent error propagates ??if the agent misclassifies a customer inquiry in step one, every subsequent action (routing, response, logging, escalation) is built on that wrong foundation. By the time a human sees the outcome, multiple irreversible actions may have occurred. The most effective control is granular logging combined with mandatory human review before any action that is irreversible or externally visible. This means designing agents where the perceive-plan-observe steps can happen autonomously, but 'send email,' 'update record,' 'place order,' or any other real-world consequence requires explicit human approval. The inconvenience of approval gates is real but temporary; the damage from a cascaded error affecting dozens of customers is permanent. As trust is established through observed reliability, approval gates can be selectively relaxed ??not eliminated for high-stakes actions.",
  },

  "module-1-building-with-agents": {
    id: "module-1-building-with-agents",
    moduleId: "module-1",
    sectionId: "building-with-agents",
    cardType: "section-card",
    content: "Building with AI agents requires: (1) Define the goal precisely with success and failure criteria; (2) Enumerate required tools and their access scopes; (3) Design the approval workflow ??which actions require human confirmation; (4) Build comprehensive logging of all agent actions; (5) Implement rollback capabilities for reversible actions; (6) Start with constrained autonomy and expand as reliability is demonstrated; (7) Monitor production behavior continuously. Agents require more operational investment than chatbots.",
    summary: "Building production AI agents requires precise goal definition, scoped tool access, approval workflows, comprehensive logging, rollback capability, constrained initial autonomy, and continuous monitoring.",
    question: "What are the most important things to get right when deploying an AI agent for the first time?",
    explanation: "First-time agent deployments most often fail from two causes: insufficient goal specification and inadequate logging. Goal specification must include not just what success looks like but what failure looks like, and what edge cases should cause the agent to stop and escalate rather than continue. 'Research competitor pricing' is an insufficient specification; 'Search the pricing pages of these five specific URLs, extract the current monthly price for plans matching these criteria, and flag if any page is inaccessible ??stop and notify me if more than two pages return errors' is a deployable specification. Logging must be comprehensive enough to reconstruct exactly what the agent did, in what order, with what inputs and outputs, at every step. Without this, debugging failures is nearly impossible and establishing trustworthiness takes much longer than it should. Start with the most constrained possible version ??fewest tools, most approval gates, narrowest scope ??and expand only as logging demonstrates reliable behavior over real operational volume.",
  },

  "module-1-agents-module-quiz": {
    id: "module-1-agents-module-quiz",
    moduleId: "module-1",
    sectionId: "agents-module-quiz",
    cardType: "section-card",
    content: "Apply AI agent evaluation frameworks ??distinguishing agent types, assessing governance requirements, and identifying deployment risks.",
    summary: "Module 8 knowledge check ??validate your ability to evaluate agent claims, assess governance requirements, and identify the key risks before deploying autonomous AI systems.",
    question: "Your vendor says their AI agent will 'handle the entire customer onboarding process autonomously.' What five questions do you need answered before agreeing?",
    explanation: "Five questions reveal whether this is a production-ready system or a capability claim. First: What are the exact actions the agent takes, and which of those are irreversible ??specifically, at what points does the agent send communications, create records, or commit resources? Irreversible actions require approval gates. Second: What happens when the agent encounters a situation it wasn't designed for ??a customer with an unusual request, missing required information, or a system error? Does it stop and escalate, or does it guess and continue? The answer is critical to understanding failure mode severity. Third: What is the logging and audit trail ??can you review every action the agent took and every decision it made, with enough detail to reconstruct why? Fourth: What is the error rate in production environments, and who bears the cost of errors ??if the agent makes a mistake in customer onboarding, how do you detect and remediate it? Fifth: What's the handoff protocol to a human agent ??under what circumstances does the system hand off, and how is that transition managed? An agent system that can't answer all five specifically doesn't belong in your customer onboarding workflow.",
  },

  // ?????????????????????????????????????????????
  // MODULE 9 ??Your AI Stack & Vendor Strategy
  // ?????????????????????????????????????????????

  "module-3-ai-stack-overview-section-card": {
    id: "module-3-ai-stack-overview-section-card",
    moduleId: "module-3",
    sectionId: "ai-stack-overview",
    cardType: "section-card",
    content: "This module teaches organizations to architect and manage an AI software ecosystem without creating fragmentation, security gaps, or operational chaos. You'll examine integration strategy, procurement governance, interoperability, vendor dependency management, and how to design for long-term maintainability.",
    summary: "Module 9 teaches AI stack architecture ??integration strategy, vendor dependency management, and long-term maintainability ??to build a coherent ecosystem rather than an accidental collection of tools.",
    question: "We have 12 different AI tools purchased by different people across the organization. How do we fix this without a painful consolidation process?",
    explanation: "The fragmented AI stack problem is extremely common and doesn't require a painful all-at-once consolidation to address. A practical rationalization approach has four steps. First, audit without judgment: catalog every AI tool in use, its purpose, its cost, its data handling practices, and its active user count. Don't ban anything during the audit ??you need accurate information, which disappears if people fear the consequences of disclosure. Second, categorize: group tools by function and identify where you have three tools solving the same problem and where you have critical gaps. Third, establish a primary stack of 3?? platforms that cover 80%+ of organizational needs, and create a clear timeline for migrating off redundant tools ??not immediately, but with a committed end date. Fourth, implement a governance gate for all new tool requests: a lightweight evaluation checklist (purpose, integration, data handling, cost, approved alternative available?) that takes 30 minutes rather than six weeks. The goal is preventing future fragmentation, not punishing past decisions.",
  },

  "module-3-ai-workflows": {
    id: "module-3-ai-workflows",
    moduleId: "module-3",
    sectionId: "ai-workflows",
    cardType: "section-card",
    content: "AI workflow design determines how AI tools connect to business processes: (1) Input sources ??where does data enter the workflow? (2) Processing steps ??which AI tools transform data at each stage? (3) Output destinations ??where do AI outputs go, and in what format? (4) Human touchpoints ??where do humans review, approve, or intervene? (5) Error handling ??what happens when AI output quality falls below threshold? Documenting these explicitly prevents operational chaos when multiple AI tools are in use.",
    summary: "AI workflow design requires explicitly mapping input sources, processing steps, output destinations, human touchpoints, and error handling ??undocumented workflows become unmanageable as AI tool use scales.",
    question: "Why is workflow documentation so critical when I'm using multiple AI tools together?",
    explanation: "When you use one AI tool for one task, the workflow is simple enough to exist in someone's head. When you're using five AI tools across three departments for interconnected workflows, undocumented design creates three specific failure modes. First, single points of failure become invisible: if one tool in a multi-tool workflow goes down or produces poor quality, the downstream tools receive bad inputs and the failure propagates before anyone traces it back to the source. Second, onboarding new employees becomes nearly impossible: without documentation, AI workflows exist only in the institutional knowledge of whoever set them up ??creating fragility and concentration risk. Third, governance reviews become unactionable: you can't audit data flows, access controls, or vendor compliance for workflows that aren't documented. The solution is maintaining a simple workflow map for every AI-assisted process: input, tools used, transformation at each step, output destination, human review points, and error handling. It doesn't need to be elaborate ??a one-page diagram per workflow is sufficient.",
  },

  "module-3-tool-selection": {
    id: "module-3-tool-selection",
    moduleId: "module-3",
    sectionId: "tool-selection",
    cardType: "section-card",
    content: "AI stack tool selection criteria: (1) Interoperability ??does it connect to your other tools via API or native integration? (2) Data ownership ??who owns data stored in the tool, and can you export it? (3) Pricing structure ??per-seat, usage-based, or enterprise; which scales sustainably with your usage? (4) Vendor roadmap ??is the vendor investing in capabilities you'll need in 2 years? (5) Support quality ??do they offer SLAs and technical support for enterprise issues? (6) Security certifications ??SOC 2, GDPR compliance, etc.",
    summary: "AI stack tool selection requires evaluating interoperability, data ownership, pricing scalability, vendor roadmap alignment, support quality, and security certifications ??not just current features.",
    question: "How do I evaluate an AI tool's long-term viability as a stack component, not just its current capabilities?",
    explanation: "Evaluating long-term viability requires looking at signals that reveal whether a vendor will be a reliable partner in two years, not just an impressive demo today. Five forward-looking signals matter most. First, data portability: if you need to leave, can you export everything you've stored or built in this tool without significant data loss or reformatting work? A vendor who makes exit easy is confident in their continued value. Second, pricing trajectory: has their pricing changed significantly in the past 12??8 months, and in which direction? Vendors who raise prices sharply after establishing dependency are a well-documented pattern in SaaS. Third, funding and financial health: a VC-backed AI startup burning cash without a clear path to profitability is a migration project waiting to happen. Fourth, roadmap specificity: ask for their 12-month roadmap and compare it to your anticipated needs. Vague 'we're building amazing things' answers are less reassuring than specific feature commitments with timelines. Fifth, actual customer references beyond the reference list: seek out customers who aren't on the vendor's provided reference list ??they'll give you a more balanced picture of reliability and support.",
  },

  "module-3-prompting-assistants": {
    id: "module-3-prompting-assistants",
    moduleId: "module-3",
    sectionId: "prompting-assistants",
    cardType: "section-card",
    content: "Managing AI assistants at scale requires: (1) Shared prompt libraries ??documented, tested prompts for common tasks that employees can use rather than reinventing each time; (2) System prompt governance ??standardized configurations for AI tools with organizational context and constraints built in; (3) Version control for prompts ??treating prompts as institutional assets that evolve and require change management; (4) Quality baselines ??defined standards for acceptable AI output quality by use case.",
    summary: "Managing AI assistants at organizational scale requires shared prompt libraries, system prompt governance, version-controlled prompts, and defined quality baselines ??treating prompts as institutional assets, not individual habits.",
    question: "How do I scale effective AI use across a 200-person organization without every employee starting from scratch?",
    explanation: "The inefficiency of 200 employees independently developing AI skills and prompts for the same tasks is enormous ??and entirely avoidable. A shared prompt library is the highest-leverage investment for organizational AI scaling. For each common use case in your organization ??client proposal drafts, competitive analysis summaries, meeting recaps, technical documentation, support ticket responses ??develop and test a high-quality prompt template that produces reliably good results, document it with examples and instructions, and make it the default starting point. This alone captures most of the organizational AI value without requiring every employee to become a prompt engineering expert. Supplement with system prompt governance: configure AI tools with organizational context (your industry, your brand voice, your common terminology, your constraints) built in, so every user benefits from that context automatically. Treat significant prompt templates like code: version-control them, communicate changes, and maintain a changelog. This institutional approach to prompting scales linearly with your AI deployment.",
  },

  "module-3-ai-project": {
    id: "module-3-ai-project",
    moduleId: "module-3",
    sectionId: "ai-project",
    cardType: "section-card",
    content: "AI project management differs from traditional software projects: (1) Requirements are often discovered through iteration, not specified upfront; (2) Performance depends on data quality, not just code quality; (3) Failure modes are probabilistic, not deterministic; (4) User expectations need calibration for AI-specific behaviors (hallucinations, inconsistency); (5) Evaluation requires ongoing monitoring, not just launch testing. Agile approaches with short feedback loops generally outperform waterfall for AI projects.",
    summary: "AI project management requires iterative requirements, data-quality focus, probabilistic failure management, user expectation calibration, and ongoing monitoring ??waterfall methodology systematically fails for these reasons.",
    question: "My organization runs traditional project management. What do I need to change to manage AI projects effectively?",
    explanation: "Five adaptations make traditional project management frameworks significantly more effective for AI projects. First, replace detailed upfront requirements with a discovery phase: spend 2?? weeks exploring what the data actually supports and what the AI can reliably do before committing to a delivery specification. Second, add data quality milestones to your project plan: the quality of the data pipeline is as important as the quality of the code, and deserves the same milestone tracking and quality gates. Third, replace binary pass/fail testing with performance threshold monitoring: AI systems don't work perfectly or fail completely ??they perform at a measurable accuracy level that may be above or below your acceptable threshold. Define thresholds before launch, measure against them continuously, and plan for iterative improvement. Fourth, invest in user expectation calibration: users who expect AI to be perfect will lose trust the first time it makes a mistake; users who understand that AI provides good-but-imperfect outputs that require judgment will use it productively. Fifth, include ongoing monitoring in your project budget: AI projects aren't done at launch ??model performance changes over time and requires continued investment.",
  },

  "module-3-explain-ai-section-card": {
    id: "module-3-explain-ai-section-card",
    moduleId: "module-3",
    sectionId: "explain-ai",
    cardType: "section-card",
    content: "Explaining AI systems to stakeholders is a critical leadership skill. Effective AI communication: (1) Lead with business impact, not technical mechanism; (2) Acknowledge limitations explicitly ??this builds credibility; (3) Use analogies that match the audience's experience; (4) Avoid precision theater ??don't quote 'accuracy rates' without explaining what they mean in operational terms; (5) Be clear about what humans remain responsible for. Stakeholders who don't understand AI limitations make poor decisions about where to deploy it.",
    summary: "Explaining AI to stakeholders requires leading with business impact, acknowledging limitations credibly, using accessible analogies, avoiding misleading precision, and clearly defining human responsibility.",
    question: "How do I explain AI limitations to a skeptical board member without undermining confidence in our AI strategy?",
    explanation: "The counterintuitive truth is that explicitly acknowledging AI limitations builds more confidence in your AI strategy, not less ??because it signals that you understand what you're deploying rather than believing the marketing. The framing that works: lead with what the system demonstrably does in operational terms ('this system reduces report generation time by 3 hours per week per analyst, with human review before distribution'), acknowledge the limitations specifically and show how you've addressed them ('it produces occasional errors in complex calculations, which is why we built in the human review step'), explain the governance you have in place ('we monitor accuracy weekly and have a clear process for flagging and correcting issues'), and be clear about what remains human responsibility ('final sign-off on all external communications remains with the team lead'). This framing shows a board member that you're operating this system with eyes open and appropriate controls ??which is significantly more confidence-building than a presentation that oversells AI capability and underspecifies limitations.",
  },

  "module-3-risk-check": {
    id: "module-3-risk-check",
    moduleId: "module-3",
    sectionId: "risk-check",
    cardType: "section-card",
    content: "AI stack risk checklist: (1) Data governance ??do you know where all AI tools store data, and who can access it? (2) Vendor concentration ??what happens if your primary AI vendor has an outage or pricing change? (3) Skill dependency ??do you have internal capability to manage and adjust your AI systems, or are you dependent on a single vendor or agency? (4) Compliance coverage ??are all AI tools in scope for your relevant regulatory frameworks? (5) Audit trail ??can you explain any AI-influenced decision?",
    summary: "AI stack risk spans data governance gaps, vendor concentration, skill dependency, compliance coverage, and missing audit trails ??each requiring specific mitigation to prevent operational vulnerability.",
    question: "How do I conduct an AI stack risk audit across my organization?",
    explanation: "An AI stack risk audit has five domains, each requiring specific evidence rather than self-assessment. Data governance: pull the list of every AI tool in use and review the data processing terms of each ??where does data go, who can access it, is it used for training? Flag any tool where you don't have this information. Vendor concentration: map which business functions would be impaired if each of your top two AI vendors had a 24-hour outage or raised prices 50% ??any function with no viable alternative is a concentration risk. Skill dependency: assess whether your internal team can manage, adjust, and troubleshoot your primary AI systems without vendor involvement ??if the answer is no for any critical system, that's a dependency risk. Compliance coverage: for each AI tool, verify that its data handling, decision-making, and documentation practices meet the regulatory requirements applicable to your industry and geography. Audit trail: test whether you can reconstruct the reasoning behind an AI-influenced decision if you need to explain it to a regulator, customer, or auditor ??if you can't, you don't have an adequate audit trail. Document your findings with specific risks and remediation owners.",
  },

  "module-3-next-steps-section-card": {
    id: "module-3-next-steps-section-card",
    moduleId: "module-3",
    sectionId: "next-steps",
    cardType: "section-card",
    content: "AI stack next steps framework: (1) Audit existing tools ??catalog all AI tools in use, their costs, data handling, and usage; (2) Identify redundancy ??where do multiple tools solve the same problem? (3) Define your core stack ??select 3?? primary platforms that cover 80% of needs; (4) Establish procurement governance ??all new AI tools go through an evaluation process; (5) Build internal capability ??ensure you can operate and adjust your stack without full vendor dependency.",
    summary: "Five steps to AI stack health: tool audit, redundancy identification, core stack definition, procurement governance, and internal capability building ??creating a coherent, maintainable ecosystem.",
    question: "What does a 90-day AI stack rationalization plan look like for an organization that's never done this before?",
    explanation: "A 90-day AI stack rationalization plan has three phases. Weeks 1??: Discovery. Send an all-staff survey requesting disclosure of all AI tools used with usage frequency and primary purpose. Compile results into a complete tool inventory. Review data handling terms for each tool identified. Map tools to functions and identify obvious redundancy. Weeks 5??: Analysis and decision. Categorize tools into: keep as core stack, migrate away from (timeline TBD), immediately discontinue (data risk or redundancy with no value-add), and needs further evaluation. Develop the core stack shortlist ??typically 3?? platforms covering writing, productivity, data analysis, and image generation. Draft your AI acceptable use policy and procurement governance process. Weeks 9??2: Implementation and communication. Announce the core stack, communicate the timeline for tool migrations (6??2 months for non-urgent migrations), implement the procurement governance gate, and brief all managers on the acceptable use policy. Launch a communication plan emphasizing what employees can use, not just what's restricted. This 90-day effort creates a foundation that prevents years of compounding fragmentation.",
  },

  // ?????????????????????????????????????????????
  // MODULE 4 (continued) ??Future Positioning sections (merged from Module 10)
  // ?????????????????????????????????????????????

  "module-3-current-frontiers-section-card": {
    id: "module-3-current-frontiers-section-card",
    moduleId: "module-3",
    sectionId: "current-frontiers",
    cardType: "section-card",
    content: "Current AI frontiers with near-term business implications: (1) Multimodal AI ??models processing text, images, audio, and video simultaneously; (2) Long-context reasoning ??handling hundreds of thousands of tokens enabling document-level analysis; (3) Agentic systems ??AI taking multi-step autonomous actions; (4) AI-generated code at scale ??software development acceleration; (5) Real-time AI inference ??low-latency applications enabling interactive AI in products. Each frontier is moving from research toward production deployment.",
    summary: "Five AI frontiers ??multimodal, long-context, agentic, code generation, and real-time inference ??are transitioning from research to production, creating near-term strategic opportunities for early adopters.",
    question: "Which current AI frontier development should I be preparing for right now, even if I can't deploy it yet?",
    explanation: "Long-context reasoning is the frontier development with the broadest near-term business impact and the most immediate preparation opportunities. The ability to process hundreds of thousands of tokens ??essentially entire documents, contracts, research libraries, or correspondence histories ??in a single AI context is transforming knowledge work applications that were previously impractical. If your organization works with large documents (legal contracts, financial reports, research compilations, regulatory submissions), the workflows you currently use that involve manually chunking, summarizing, and synthesizing those documents are candidates for significant redesign as long-context models become the production standard. Start preparing now by identifying these workflows, measuring the current time and cost, and designing what the AI-assisted version would look like. Agentic systems are the second-most-urgent frontier to prepare for ??not necessarily to deploy, but to develop the governance frameworks that will allow you to deploy them safely when you're ready. Organizations that build agent governance frameworks now will be able to adopt more quickly when reliability improves.",
  },

  "module-3-agi-explained": {
    id: "module-3-agi-explained",
    moduleId: "module-3",
    sectionId: "agi-explained",
    cardType: "section-card",
    content: "AGI (Artificial General Intelligence) ??AI that matches or exceeds human cognitive capability across all domains ??is a debated concept with no consensus on definition, timeline, or likelihood. For business leaders, the operationally relevant question isn't 'when is AGI coming' but 'how do we build organizational capability that creates value as AI improves incrementally over the next 3?? years?' Planning for AGI is less valuable than executing well on current AI capabilities.",
    summary: "AGI timelines are too uncertain for operational planning ??business leaders should focus on building AI execution capability over 3?? year horizons rather than speculating about AGI.",
    question: "Should my organization's AI strategy account for AGI, and if not, what time horizon should I plan for?",
    explanation: "AGI should not be a planning variable in your AI strategy, and there are two clear reasons why. First, the definition of AGI itself is contested ??credible researchers disagree on what counts as AGI, making predictions about its arrival impossible to evaluate meaningfully. Second, the timeline estimates from serious AI researchers range from 'never' to 'within 5 years,' which is a range so wide it's operationally useless. Planning against a prediction with that uncertainty band will either make your strategy too conservative (if AGI arrives late) or panic-driven (if you take the near-term estimates at face value). Instead, plan in 18??4 month capability horizons based on what's observable: what are AI systems demonstrably able to do today, what are they likely able to do in 18??4 months based on current development trajectories, and how should my organization's workflows, governance, and talent evolve accordingly? This incremental approach adapts naturally as capabilities develop without requiring predictions about transformative but uncertain long-term events.",
  },

  "module-3-ai-governance": {
    id: "module-3-ai-governance",
    moduleId: "module-3",
    sectionId: "ai-governance",
    cardType: "section-card",
    content: "AI governance is evolving from voluntary to regulatory. Active regulatory frameworks: EU AI Act (risk-based classification of AI systems), US executive AI guidance, emerging sector-specific rules in healthcare, finance, and employment. Organizations should: (1) Track regulatory developments in their jurisdictions; (2) Inventory AI systems by risk level; (3) Maintain explainability documentation for consequential decisions; (4) Designate AI governance ownership; (5) Build regulatory readiness into AI procurement, not just as retrofit compliance.",
    summary: "AI regulation is shifting from voluntary to mandatory across multiple jurisdictions ??organizations that build compliance into AI procurement from the start avoid costly retrofit compliance when regulations take effect.",
    question: "How should my organization be preparing for AI regulation right now, even if it hasn't taken effect in my jurisdiction yet?",
    explanation: "The organizations that will handle AI regulation with minimum disruption are those that treat compliance as a design input rather than a retrofit. Three preparation activities make the biggest difference. First, inventory your AI systems by the EU AI Act's risk classifications ??even if you're not in the EU, this framework is becoming the global de facto standard and many non-EU companies are preemptively aligning to it. Identify any systems in the 'high risk' category (hiring, credit, healthcare, critical infrastructure, law enforcement) and assess your current compliance posture. Second, build explainability documentation into every new AI deployment ??record what the system does, what data it uses, what its error rates are, and what human oversight exists. This documentation is the baseline requirement for almost every emerging AI regulatory framework. Third, designate an AI governance owner ??a named individual responsible for tracking regulatory developments, maintaining the AI system inventory, and ensuring procurement processes include compliance review. Organizations that do these three things before regulation is mandatory will spend a fraction of the effort that organizations scrambling to retrofit compliance will spend.",
  },

  "module-3-ai-careers": {
    id: "module-3-ai-careers",
    moduleId: "module-3",
    sectionId: "ai-careers",
    cardType: "section-card",
    content: "AI is reshaping career trajectories across functions. Growing roles: AI prompt engineers, AI product managers, AI governance specialists, ML engineers, AI trainers. Evolving roles: data analysts (augmented by AI), software engineers (with AI coding tools), content creators (with generative tools), customer service managers (supervising AI systems). Declining task demand: data entry, routine reporting, basic content production. The career advantage goes to professionals who can work alongside AI systems effectively, not those who resist them.",
    summary: "AI creates new specialized roles while reshaping most existing ones toward judgment, oversight, and strategy ??career advantage goes to professionals who integrate AI effectively, not those who avoid it.",
    question: "How should I advise employees who are worried about their career trajectory in an AI-enabled workplace?",
    explanation: "The most useful career advice for the AI era focuses on building the capabilities that AI augments rather than replaces. Three capabilities compound in value as AI handles more tasks. First, AI fluency ??not just knowing how to use current tools, but understanding what AI can and can't do well enough to identify when to use it, when not to, and how to evaluate its outputs critically. This is the professional equivalent of spreadsheet fluency in the 1990s: the floor of competence in knowledge work, not a specialized skill. Second, judgment and interpretation ??AI accelerates data collection and pattern detection but produces output that requires human judgment to interpret, contextualize, and act on. The demand for this interpretation layer is increasing, not decreasing, as AI output volume grows. Third, relationship and communication skills ??the domains where human presence, trust, and judgment are specifically valued remain resistant to automation and increasingly scarce as lower-skilled tasks are automated. Employees who combine AI fluency with strong judgment and communication skills are positioned extremely well. Employees who avoid AI development because they find it uncomfortable are accumulating a competency gap that will compound.",
  },

  "module-3-your-ai-future": {
    id: "module-3-your-ai-future",
    moduleId: "module-3",
    sectionId: "your-ai-future",
    cardType: "section-card",
    content: "Strategic positioning in an AI-driven economy: Competitive advantage will not come from access to AI tools ??those will be commoditized. Advantage will come from: (1) Proprietary data ??unique datasets competitors can't access; (2) Workflow integration depth ??AI deeply embedded in operations rather than surface-level tools; (3) Organizational speed ??the ability to experiment, learn, and adapt faster than competitors; (4) AI talent ??people who can identify, implement, and improve AI applications; (5) Customer relationships ??trust that persists as AI enables faster service. The race is not about AI access. It's about AI execution.",
    summary: "AI competitive advantage comes from proprietary data, deep workflow integration, organizational learning speed, AI talent, and customer trust ??all of which are built through execution, not tool access.",
    question: "What is the single most important investment my organization can make right now to build lasting AI competitive advantage?",
    explanation: "The highest-leverage single investment is organizational AI learning speed ??the capability to identify promising AI applications, experiment with them, measure results, and compound learning faster than competitors. This matters more than any individual tool or system because it scales: an organization that learns from AI experiments twice as fast as its competitors will perpetually be ahead, regardless of which specific capabilities either one has today. Building this capability requires three elements: a systematic experimentation process (small pilots with clear metrics and rapid evaluation cycles), a learning infrastructure (documented outcomes, accessible to decision-makers who can act on them, not siloed in the team that ran the pilot), and organizational tolerance for experiments that don't pan out (which requires leadership framing of 'this didn't work as projected, here's what we learned' as success rather than failure). Every other source of AI competitive advantage ??proprietary data, workflow integration, talent density ??flows downstream from an organization that learns faster. It is the capability that enables all the others.",
  },

};

function findSectionCourseContentEntries(moduleId: string, sectionId: string) {
  return Object.values(COURSE_CONTENT_REGISTRY).filter(
    (entry) => entry.moduleId === moduleId && entry.sectionId === sectionId,
  )
}

export function getSectionCourseContentEntries(moduleId: string, sectionId: string | undefined, maxCards = 3) {
  if (!sectionId) {
    return []
  }

  const safeLimit = Math.max(0, Math.min(3, maxCards))
  if (safeLimit === 0) {
    return []
  }

  return findSectionCourseContentEntries(moduleId, sectionId).slice(0, safeLimit)
}

export function getSectionLearningContents(moduleId: string, sectionId: string | undefined, maxCards = 3): SectionLearningContent[] {
  return getSectionCourseContentEntries(moduleId, sectionId, maxCards)
    .map((entry) => entry.content)
    .filter((content): content is SectionLearningContent => typeof content === "string" && content.trim().length > 0)
}

// --- Migrated component explanation content ---
export interface ComponentExplanation {
  id: string
  question: string | null
  explanation: string | null
}

function buildExplanationFromCardEntry(entry: CourseContentEntry): ComponentExplanation {
  return {
    id: entry.id,
    question: entry.question,
    explanation: entry.explanation,
  }
}

export const COMPONENT_CARD_REGISTRY = COURSE_CONTENT_REGISTRY

export const COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> = Object.fromEntries(
  Object.values(COURSE_CONTENT_REGISTRY).map((entry) => [entry.id, buildExplanationFromCardEntry(entry)]),
)

export function getComponentCard(componentId: string): CourseContentEntry | undefined {
  return COURSE_CONTENT_REGISTRY[componentId]
}

export function getCourseContentEntry(componentId: string): CourseContentEntry | undefined {
  const directEntry = getComponentCard(componentId)
  if (directEntry) {
    return directEntry
  }

  const sectionMatch = componentId.match(/^(module-\d+)-(.+)-(scenario|quick-check)$/)
  if (sectionMatch) {
    const moduleId = sectionMatch[1]
    const sectionId = sectionMatch[2]
    return findSectionCourseContentEntries(moduleId, sectionId)[0]
  }

  const courseQuizMatch = componentId.match(/^(module-\d+)-course-quiz$/)
  if (courseQuizMatch) {
    const moduleId = courseQuizMatch[1]
    return findSectionCourseContentEntries(moduleId, "module-quiz")[0]
      ?? Object.values(COURSE_CONTENT_REGISTRY).find((entry) => entry.moduleId === moduleId && entry.explanation)
  }

  return undefined
}


/**
 * Get an explanation for a component by searching the mapping.
 */
export function getComponentExplanation(componentId: string): ComponentExplanation | undefined {
  const entry = getCourseContentEntry(componentId)
  return entry ? buildExplanationFromCardEntry(entry) : undefined
}

/**
 * Get all explanations for a specific module
 */
export function getModuleExplanations(moduleNumber: number): ComponentExplanation[] {
  return Object.values(COURSE_CONTENT_REGISTRY)
    .filter((entry) => entry.moduleId === `module-${moduleNumber}`)
    .map(buildExplanationFromCardEntry)
}

/**
 * Search for explanations by keyword
 */
export function searchExplanations(query: string): ComponentExplanation[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(COURSE_CONTENT_REGISTRY)
    .map(buildExplanationFromCardEntry)
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
  if (sectionId === "ai-stack-overview") return 1
  if (sectionId === "module-quiz") return 9999
  if (sectionId === "summary") return 9998
  return 100
}

export function getCourseStructure(): CourseStructure {
  const moduleIds = new Set<string>()
  const moduleSectionIds = new Map<string, Set<string>>()

  Object.values(COURSE_CONTENT_REGISTRY).forEach((entry) => {
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
          summary: findSectionCourseContentEntries(moduleId, sectionId)[0]?.summary ?? undefined,
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
    {
      key: "quiz5",
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
      key: "quiz6",
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
      key: "quiz7",
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
      key: "quiz8",
      prompt: "What is the best first step for agent adoption?",
      explanation: null,
      correctOptionId: "b",
      options: [
        { id: "a", label: "Deploy broad autonomy across departments" },
        { id: "b", label: "Pilot one constrained workflow with clear controls" },
        { id: "c", label: "Prioritize architectural novelty over reliability" },
      ],
    },
    {
      key: "tools-quiz1",
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
      key: "tools-quiz2",
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
      key: "tools-quiz3",
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
      key: "tools-quiz4",
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
    {
      key: "quiz5",
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
      key: "quiz6",
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
      key: "quiz7",
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
      key: "quiz8",
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
  "module-3": [
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
    {
      key: "quiz5",
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
      key: "quiz6",
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
      key: "quiz7",
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
      key: "quiz8",
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
  "module-4": [
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
    {
      key: "quiz5",
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
      key: "quiz6",
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
      key: "quiz7",
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
      key: "quiz8",
      prompt: "How should roadmap sequencing be decided?",
      explanation: null,
      correctOptionId: "a",
      options: [
        { id: "a", label: "Use value-readiness-dependency sequencing" },
        { id: "b", label: "Prioritize whichever team asks first" },
        { id: "c", label: "Run all pilots in parallel regardless of capacity" },
      ],
    },
    {
      key: "quiz9",
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
      key: "quiz10",
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
      key: "quiz11",
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
      key: "quiz12",
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
}

