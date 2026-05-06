/**
 * Comprehensive mapping of course components to detailed educational explanations.
 * Each component in every module has a unique explanation that deepens understanding
 * of why that specific element is there and how to engage with it effectively.
 */

export interface ComponentExplanation {
  id: string
  title: string
  explanation: string
}

export const COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> = {
  // MODULE 0: Welcome to AI
  "m0-hero": {
    id: "m0-hero",
    title: "Course Welcome",
    explanation: `Modern AI matters as a system, not a single app: models make predictions, shape decisions, fail in patterned ways, and still require human oversight in real work.

The sequence of modules mirrors how AI decisions are made in practice. You begin with definitions and historical context, move into model behavior and prompting, then evaluate tools, data quality, risk, and organizational adoption. Each layer adds constraints that make AI judgment more realistic.

Treat this as a map of the full AI stack from concept to deployment. The value is not memorizing terms, but seeing how technical capability, data limitations, and human oversight interact in one system.`,
  },

  "m0-why-ai-matters": {
    id: "m0-why-ai-matters",
    title: "Why AI Matters Right Now",
    explanation: `AI now influences ranking, recommendation, hiring filters, fraud controls, and productivity tooling, so even non-technical roles are increasingly affected by model behavior.

The important shift is that AI systems increasingly mediate decisions rather than just automate repetitive tasks. That means model errors, bias, and data gaps can directly change outcomes for people, customers, and teams.

Understanding AI is therefore operational, not optional: it lets you evaluate claims, set realistic expectations, and choose where human review is required before model output becomes action.`,
  },

  "m0-why-ai-matters-check": {
    id: "m0-why-ai-matters-check",
    title: "Why AI Matters Check-In",
    explanation: `Early AI fluency creates leverage because habits of prompting, verification, and tool choice improve while the ecosystem is still changing fast.

The key judgment is temporal. When a technology is changing quickly, early learners gain leverage by building habits that transfer across tools. The value is not memorizing today\'s interface but learning how to test outputs, judge claims, and integrate AI into real work.

A strong answer here shows you understand that AI skill compounds. People who practice now develop intuition about prompting, verification, and workflow fit before those expectations become standard in their field.`,
  },

  "m0-day-in-life": {
    id: "m0-day-in-life",
    title: "A Day in Your Life With AI",
    explanation: `AI influences an ordinary day through many small predictions: ranking search results, filtering inboxes, prioritizing notifications, generating drafts, and scoring risk.

Most of these systems are narrow models optimized for one objective, such as click-through, response speed, or spam reduction. They feel seamless because the model is embedded in product workflows rather than exposed as a visible AI feature.

Seeing these touchpoints together clarifies a core idea: AI impact is cumulative. Many low-visibility predictions can shape what information you see, which options you choose, and how quickly you complete work.`,
  },

  "m0-transformation-arc": {
    id: "m0-transformation-arc",
    title: "Your Transformation Arc",
    explanation: `Practical AI growth moves from awareness to decision quality: first you learn terms and system types, then mechanisms and prompting, then risk, governance, and adoption.

That progression reflects how AI maturity develops in teams. Organizations typically fail when they jump directly to tools without shared definitions, clear limits, or evaluation criteria.

By moving from fundamentals to application, this module path builds the same dependency chain used in production work: understand what the system is, understand how it behaves, then decide where it should or should not be trusted.`,
  },

  "m0-how-to-learn": {
    id: "m0-how-to-learn",
    title: "How to Take This Course Effectively",
    explanation: `Practical AI fluency grows when concept explanations, worked examples, and interactions all change how you make decisions rather than leaving knowledge as isolated facts.

The sequence matters because AI competence depends on integrating several views at once: mechanism, performance limits, risk, and business context. Skipping one layer often leads to overconfidence in another.

As you move through modules, use each interaction to test whether a concept changes an actual choice, such as prompt design, tool selection, review requirements, or risk controls. That is the threshold for usable AI understanding.`,
  },

  "m0-self-assessment": {
    id: "m0-self-assessment",
    title: "What Do You Know Already?",
    explanation: `Your starting mental model of AI shapes everything that follows: what you trust, what you question, and which mistakes you are likely to make.

Typical gaps include confusing automation with machine learning, overestimating model reasoning, and underestimating data-quality effects. Identifying those gaps early prevents downstream errors in tool use and interpretation.

Use this checkpoint as a calibration reference. When you reach later modules, compare your updated answers to your initial assumptions to see which beliefs changed and why.`,
  },

  "m0-next-module-check": {
    id: "m0-next-module-check",
    title: "Ready for Module 1 Check-In",
    explanation: `Useful AI learning starts with skepticism toward hype and a commitment to test claims against real definitions and limits.

That mindset matters because the next module builds conceptual foundations. If you approach AI as marketing language or distant theory, you miss the operational logic that later modules depend on. If you approach it with curiosity and critical thinking, the definitions become useful decision tools.

Answering correctly here shows you are prepared to learn AI as a working discipline. You are not just asking what AI is called, but what it can do, where it fails, and how to reason about those boundaries.`,
  },

  // MODULE 1: What Is AI?
  "m1-hero": {
    id: "m1-hero",
    title: "Module 1: What Is Artificial Intelligence?",
    explanation: `You're beginning the conceptual foundation of the entire course. This module answers the most fundamental question: what exactly is AI? Without a grounded definition, all subsequent learning gets fuzzy.

Notice the module is structured around history, definition, types, then applications. This is pedagogically intentional. By learning history first, you understand *why* AI developed certain characteristics. You'll see how problems drive innovation. This historical context creates deeper understanding than jumping straight to technical definitions.

      The module culminates in applications, showing you AI in concrete tools you might use. This arc from abstract (definition) to concrete (applications) helps your brain construct robust understanding that works in both directions.`,
  },

  "m1-module-overview-check": {
    id: "m1-module-overview-check",
    title: "Module 1 Overview Check",
    explanation: `Practical AI literacy begins with strong definitions and mental models, not buzzwords or premature technical depth.

The important distinction is between vocabulary and mental models. AI literacy becomes useful only when definitions help you classify systems, question exaggerated claims, and predict where tools will succeed or fail. That is why the module emphasizes reality over hype.

Getting this question right shows you are aligned with the course method. You are here to build usable judgment about AI, not to memorize jargon or assume every new system deserves trust.`,
  },

  "m1-defining-ai": {
    id: "m1-defining-ai",
    title: "Defining AI: What Makes AI Different?",
    explanation: `This definition section is fighting against common misconceptions. Many people define AI by tools (ChatGPT, robots) rather than by what actually characterizes AI: systems that learn from data and improve without being explicitly programmed for every scenario.

The focus here is scientific precision: definitions determine what counts as AI versus automation. A thermostat isn't AI (it follows a fixed rule: if temp < 70, heat). A learning algorithm that adapts its recommendations is AI.

This precision matters because in industry, people often misuse the term. By understanding the definition deeply, you can think clearly about what's actually possible and what's hype.`,
  },

  "m1-ai-history": {
    id: "m1-ai-history",
    title: "A Brief History of AI: From Dreams to Disappointment to Breakthrough",
    explanation: `History teaches you patterns. By seeing how AI developed in waves-periods of excitement followed by "AI winters," where progress seemed to stall-you understand something crucial: breakthroughs require not just ideas but technology maturity and data availability.

This historical perspective inoculates you against hype. When someone claims AI will replace all jobs by 2025, your historical knowledge says: "Experts have made premature predictions before." This isn't cynicism; it's calibrated realism.

    The pattern you'll see: computing power increases -> data availability increases -> algorithms improve -> new applications become possible. This virtuous cycle is the engine of recent AI progress. Understanding it helps you predict where AI will and won't go next.`,
  },

  "m1-types-of-ai": {
    id: "m1-types-of-ai",
    title: "Types of AI: Narrow vs. General vs. Super",
    explanation: `Narrow AI, general AI, and superintelligence name fundamentally different claims about capability, and confusing them distorts nearly every public AI debate.

Understanding these categories is intellectually honest. We can discuss AI's current limitations without being defensive. Narrow AI can be remarkably capable at specific tasks while being unable to perform simple tasks outside its training domain. That's not a flaw; it's reality.

This clarity also improves decision quality. If someone sells a "general AI" tool, the claim is either terminologically incorrect or misleading. These distinctions are recurring intellectual tools in real AI discussions.`,
  },

  "m1-first-win": {
    id: "m1-first-win",
    title: "Your First Useful Win: An AI Prompt Challenge",
    explanation: `This interactive section shifts from passive reading to active doing. Cognitive psychology shows that moving to application dramatically increases retention, perhaps 4x better than reading alone.

Writing a prompt for an AI system is a deliberate diagnostic exercise. It tests how instruction structure changes output quality and builds intuition for what current models can and cannot reliably follow.

    Iteration is the core loop: write a prompt, inspect output, refine constraints, and rerun. That cycle builds operational skill more effectively than static reading alone.`,
  },

  "m1-myths-reality": {
    id: "m1-myths-reality",
    title: "Myths vs. Reality: Separating Hype from Truth",
    explanation: `Misconceptions are notoriously sticky. Once believed, they persist even after you've learned correct information. This lesson directly confronts common myths-not to mock them, but to inoculate you against them.

The section combines AI literacy with media literacy. In a hype-heavy environment, distinguishing substantiated claims from exaggeration is essential for reliable decision-making.

Myths that feel initially plausible are often the most operationally risky. Tracking those patterns helps prevent future misjudgments when evaluating new AI claims.`,
  },

  "m1-writing-assistants": {
    id: "m1-writing-assistants",
    title: "In Practice: AI Writing Assistants",
    explanation: `The lesson transitions from abstract concepts to concrete tools. Research shows that abstract knowledge is much harder to retain than knowledge anchored to examples. By seeing AI writing assistants as specific instances of the broader AI concepts you've learned, you're consolidating abstract knowledge into concrete understanding.

A key outcome is separating marketing claims from actual capability. A writing assistant may claim to "write perfect emails," but it generates text from training patterns and lacks real situational understanding. That precision prevents over-reliance.

    Consider: Where could you use a writing assistant? Where would it fail? This critical application of knowledge-recognizing both possibilities and limitations-is advanced learning.`,
  },

  "m1-image-generation": {
    id: "m1-image-generation",
    title: "In Practice: AI Image Generation",
    explanation: `Image generation is conceptually similar to text generation-predicting the next pixel based on patterns-but feels qualitatively different to users. This comparison helps you understand that the underlying mechanism is consistent even when outputs feel different.

The important move is seeing through surface differences to underlying mechanisms. DALL-E and ChatGPT use related statistical learning principles even though outputs differ by modality.

    There's also an ethical dimension here: AI-generated images raise questions about copyright, authenticity, and labor. By understanding how these systems work, you can form more informed ethical positions rather than reacting emotionally to the existence of the technology.`,
  },

  "m1-productivity": {
    id: "m1-productivity",
    title: "In Practice: AI for Productivity",
    explanation: `A crucial point here is that AI's most immediate value for individuals isn't replacing jobs; it's augmenting existing work. A programmer using Copilot doesn't become obsolete; they become more productive. A researcher using AI literature summaries can explore broader terrain.

The section frames AI as workflow augmentation rather than cognitive replacement. That framing supports realistic adoption: use models for leverage while preserving human judgment.

For each productivity example, the practical question is where the tool fits in an existing workflow and what verification burden it introduces. That mapping is what enables implementation.`,
  },

  "m1-creative-work": {
    id: "m1-creative-work",
    title: "In Practice: AI in Creative Work",
    explanation: `Creative AI becomes easier to judge when you ask a sharper question than "can it create": which parts of creativity come from pattern recombination, and which depend on human intention, taste, and authorship?

It pushes beyond "AI can create / AI cannot create." Current systems perform some creative sub-tasks well and others poorly. A musician using AI-generated backing tracks is augmenting process, not replacing authorship.

It also explores fundamental questions about authorship and ownership. By engaging with these questions thoughtfully, you're preparing yourself for ethical decisions you'll make in the future. These aren't abstract questions; they're increasingly real as AI tools become commonplace.`,
  },

  "m1-choosing-tools": {
    id: "m1-choosing-tools",
    title: "Choosing the Right Tool for the Job",
    explanation: `This capstone section in the applications section teaches decision-making frameworks. You have ChatGPT, DALL-E, Copilot, and others. When do you use which? How do you choose?

The focus is meta-strategy: select tools by task requirements, tradeoffs, and privacy constraints rather than memorizing point-in-time tool lists. As tools change, this framework remains stable.

      It also connects back to conceptual foundations: each tool has particular strengths because of its underlying architecture and training data. By reasoning from principles (what each tool is good at) rather than memorizing (tool X is for task Y), you're building knowledge that actually transfers to new situations.`,
  },

  "m1-quiz": {
    id: "m1-quiz",
    title: "Module 1 Mastery Check",
    explanation: `Separating AI categories and claims under ambiguity is the first real test of AI literacy.

Strong performance here means you can evaluate statements about AI without relying on brand names or hype narratives. You are expected to justify why a claim is accurate, overstated, or unsupported based on definitions and historical evidence.

The same reasoning appears in later modules when choosing tools and setting risk controls. If category boundaries are unclear at this stage, downstream decisions become noisy and harder to defend.`,
  },

  "m1-ai-vocabulary-cards": {
    id: "m1-ai-vocabulary-cards",
    title: "Core AI Vocabulary Flashcards",
    explanation: `Core AI vocabulary gives you labels for the moving parts you will analyze throughout the course: AI, model, training data, prompt, algorithm, inference, parameters, and output.

Each term matters because it anchors a different part of how AI systems work in practice. If you confuse models with algorithms, or prompts with outputs, later explanations become harder to interpret and tool behavior feels more mysterious than it actually is.

The goal is not rote memorization. The value is having reliable language for describing what goes into a system, what changes during training, what happens at runtime, and what kind of result you should evaluate afterward.`,
  },

  // MODULE 2: How Machines Learn
  "m2-hero": {
    id: "m2-hero",
    title: "Module 2: How Machines Learn",
    explanation: `You now move from "what is AI" to "how does AI actually work?" This mechanistic understanding is crucial. Without it, AI seems like magic. With it, you can reason about possibilities and limitations.

This module focuses on learning itself. How does a system improve from experience? What role does data play? What can go wrong? These questions are the foundation of machine learning literacy.

The module is structured around problem-solving: we pose a learning challenge, then show you how machines approach it. This problem-first structure means you understand the *why* behind each technique, not just the what. That makes the knowledge much more memorable and transferable.`,
  },

  "m2-module-overview": {
    id: "m2-module-overview",
    title: "Module 2 Overview Checklist",
    explanation: `This card previews the module structure and sets expectations for learning machine learning basics. You'll understand what training data is, how supervised and unsupervised learning differ, and what limitations AI systems have.

Overview checklists improve learning by activating prior knowledge and creating anticipation. Your brain is now ready to filter for these specific topics as you move through the module.`,
  },

  "m2-what-is-ml": {
    id: "m2-what-is-ml",
    title: "What Is Machine Learning?",
    explanation: `Machine learning is fundamentally about learning from data rather than following explicit rules. A programmer writes 100 rules for how to detect spam; an ML model learns patterns from thousands of spam and non-spam examples.

This distinction-rules vs. patterns-is crucial. It determines what's possible. Rules are interpretable but brittle; they break when new situations arise that weren't foreseen. Patterns are flexible but less interpretable; they work well on typical cases, but you might not understand exactly why they made a particular decision.

This builds your ability to think about trade-offs. There's no universally "best" approach; different approaches make different sacrifices. Understanding this prevents naive thinking like "just use machine learning for everything." Sometimes explicit rules are better. Sometimes you don't have enough data. Critical thinking means considering which approach suits which problem.`,
  },

  "m2-training-data": {
    id: "m2-training-data",
    title: "Training Data: The Fuel of Learning",
    explanation: `Here's a critical insight: the quality and characteristics of training data directly determine what a machine learning system can learn. Garbage in, garbage out. But also: patterns of the training data, biases of the training data, and limitations of the training data all directly show up in the system's behavior.

This understanding is crucial for your future. When someone says "AI has bias," they're often pointing to training data bias that's been learned by the system. When AI fails on edge cases, it's often because the training data didn't include those cases.

You are also practicing critical thinking about data collection. Who collected the data? For what purpose? What perspective does it reflect? These questions turn data from a neutral resource into an artifact with history and bias baked in. That's sophisticated thinking.`,
  },

  "m2-supervised-unsupervised": {
    id: "m2-supervised-unsupervised",
    title: "Supervised vs. Unsupervised Learning",
    explanation: `Supervised learning requires labeled data: examples where you know the right answer. Unsupervised learning finds patterns without labels. This distinction determines what's possible and how expensive the learning is.

Supervised learning is more accurate but requires labeled training data (expensive). Unsupervised learning is cheaper but finds patterns rather than answering specific questions. Different problems call for different approaches.

It also teaches you to reason about practical constraints. Sometimes you don't have enough labeled data. Sometimes you want to discover new patterns, not just predict existing ones. Understanding these trade-offs means you can navigate real-world machine learning projects intelligently, even if you never write the code yourself.`,
  },

  "m2-neural-networks": {
    id: "m2-neural-networks",
    title: "Neural Networks Simply Explained",
    explanation: `Neural networks are inspired by (but very different from) biological brains. The lesson strips away the mystique. A neural network is a collection of mathematical functions that learn how to transform inputs into outputs by adjusting internal parameters based on training data.

That's less mysterious than it sounds. And that's the point. By understanding that neural networks are fundamentally sophisticated pattern-matchers, not thinking systems, you avoid anthropomorphizing them. They're powerful tools, not intelligence.

Understanding neural networks helps you reason about their limitations. They can learn complex patterns but are bad at novel situations. They need lots of data. They can be opaque-you don't always know why they made a particular decision. Knowing these limitations prevents overconfidence in their recommendations.`,
  },

  "m2-what-ai-cant-do": {
    id: "m2-what-ai-cant-do",
    title: "What AI Can't Do: Important Limitations",
    explanation: `Understanding AI limits prevents one of the most common beginner mistakes: expecting present-day systems to reason, generalize, and understand like humans do.

AI systems are pattern-matchers. They can't reason through novel logical problems from first principles. They can't understand causation-only correlation in training data. They can't truly generalize beyond their training distribution. They can't explain their reasoning in the way humans can.

These aren't fixable bugs; they're fundamental characteristics of how these systems work. By understanding them deeply, you set realistic expectations. And realistic expectations are the foundation of wise tool use. You don't ask AI to do things it can't do. You use it for what it's good at.`,
  },

  "m2-classification-exercise": {
    id: "m2-classification-exercise",
    title: "Hands-On Classification Challenge",
    explanation: `You're now learning by doing. You'll attempt to classify emails as spam or not spam, thereby experiencing the machine learning challenge firsthand. This experiential learning creates memory and intuition in ways that reading alone cannot.

Notice how even as a human, you're using pattern-matching to classify emails. You're looking for markers: misspellings, financial language, and formatting oddities. The model is doing something similar-learning what markers correlate with spam. By doing this classification yourself, you're building empathy for what the algorithm is learning.

When you make mistakes, pay attention to them. Why did you misclassify an email? What information would you need to make the right decision? This metacognitive reflection about your own classification process actually teaches you how machine learning systems learn.`,
  },

  "m2-quiz": {
    id: "m2-quiz",
    title: "Module 2 Mastery Check",
    explanation: `Machine learning becomes easier to debug when you can trace outcomes back to data, labels, objectives, and distribution shifts.

The questions are designed to test causal reasoning, not memorized terms. You should be able to trace a failure back to data coverage, label quality, objective mismatch, or distribution shift.

That diagnostic ability is essential for real AI work. Teams rarely fail because they forgot vocabulary; they fail because they cannot identify why a model underperformed and what constraint must change.`,
  },

  // MODULE 3: Large Language Models & Prompting
  "m3-module-overview": {
    id: "m3-module-overview",
    title: "Module 3: Overview",
    explanation: `This module covers the practical mechanics of large language models and how to communicate with them effectively. You will learn what an LLM is, how ChatGPT generates responses token by token, and how to structure prompts that produce reliable, high-quality outputs.

By the end you should understand why prompts succeed or fail at a mechanistic level — not just pattern-match on prompt templates.`,
  },

  "m3-hero": {
    id: "m3-hero",
    title: "Module 3: Large Language Models & Prompting",
    explanation: `You now move from general machine learning to a specific, incredibly important type: language models. These are the systems behind ChatGPT, Claude, and other generative AI tools you're likely already using.

This module tackles two interrelated questions: How do language models work? And how do you use them effectively? The second question is more immediately practical, but understanding the first makes you much better at the second.

Language models are pattern-matching engines that have learned to predict text convincingly. By understanding this, you'll know what they're good at (generating plausible text on almost any topic), what they're not good at (actual reasoning, novel calculation, true creativity), and how to prompt them effectively.`,
  },

  "m3-language-models": {
    id: "m3-language-models",
    title: "What Is a Language Model?",
    explanation: `A language model is trained to predict the next word given previous words. That simple task, applied to billions of text examples, creates a system that can discuss almost any topic.

Think of it like autocomplete on your phone, but exponentially more sophisticated. Your phone learned from your personal text history. A large language model learns from terabytes of internet text. The underlying principle is the same: predict what comes next.

This understanding is grounding. Language models aren't thinking. They're sophisticated pattern-matchers. They might sound intelligent because they're predicting text patterns learned from intelligent human writing, but there's a difference between sounding intelligent and being intelligent. Keeping this distinction clear prevents magical thinking about AI.`,
  },

  "m3-how-llms-work": {
    id: "m3-how-llms-work",
    title: "How ChatGPT Works: The Mechanism",
    explanation: `A language model response is produced by turning text into tokens, passing them through learned network layers, and predicting the next token repeatedly until a full answer emerges.

You build the ability to reason about how systems transform information. Understanding this mechanism helps you predict behavior. If the model is pattern-matching from training data, then it will be good at questions similar to its training data and bad at novel questions. If it's predicting token by token, then errors can cascade (one wrong word biases subsequent predictions).

This mechanistic understanding makes you less gullible. When someone claims ChatGPT "understands" something, you know it's actually "very good at predicting text related to that topic." Those are very different claims with different implications.`,
  },

  "m3-prompt-anatomy": {
    id: "m3-prompt-anatomy",
    title: "The Anatomy of a Prompt: Structure Matters",
    explanation: `Not all prompts are equal. A well-structured prompt includes: context (what the system should know), the task (what you're asking for), constraints (limitations on the response), and examples (if helpful).

This part teaches you to craft prompts deliberately rather than casually. Good prompting is a skill that improves with practice. The difference between a vague prompt and a precise prompt can be enormous in output quality.

You're also practicing reasoning about why structure matters. Language models predict text based on patterns. By providing clear structure and examples, you're helping the model understand the pattern you want. Clear instructions work better than vague requests because they align better with training data patterns the model learned.`,
  },

  "m3-prompting-techniques": {
    id: "m3-prompting-techniques",
    title: "Effective Prompting Techniques: Chain-of-Thought and Beyond",
    explanation: `Prompting techniques work when they align the model with useful reasoning patterns it has already seen in training.

These techniques aren't mystical. They work because they align with patterns in the training data. Most text about complex reasoning involves showing reasoning steps. So when you ask for step-by-step thinking, the model is tapping into patterns it learned from human reasoning examples.

Understanding *why* techniques work matters. It means you can invent new techniques when standard ones don't work. You're not just following a recipe; you're understanding the underlying principles that make prompting effective.`,
  },

  "m3-hands-on-practice": {
    id: "m3-hands-on-practice",
    title: "Hands-On Prompting Challenge",
    explanation: `Now you write prompts and iterate based on results. This experiential learning is crucial because prompting is a skill that improves dramatically with practice. Reading about effective prompting is necessary but insufficient.

The section reinforces skill through iteration and consequence tracking. Different prompt structures produce different outputs, and better structure produces better results.

Track what works and what fails. When a prompt fails, it's usually not because the AI "doesn't understand." It's because you didn't structure the request in a way that aligns with patterns in training data. Debugging failed prompts-understanding why they didn't work-teaches you how language models actually respond.`,
  },

  "m3-quiz": {
    id: "m3-quiz",
    title: "Module 3 Mastery Check",
    explanation: `Reliable prompting depends on controlling context, constraints, examples, and evaluation criteria rather than guessing until something works.

You should be able to diagnose weak outputs by identifying which prompt component failed: missing context, ambiguous task definition, weak constraints, or absent examples.

This is foundational for reliable generative AI use. In production settings, prompt quality directly affects cost, consistency, and downstream review burden.`,
  },

  // MODULE 4: AI Tools for Everyday Life
  "m4-hero": {
    id: "m4-hero",
    title: "Module 4: AI Tools for Everyday Life",
    explanation: `You've learned foundations. Now you apply them. This module surveys the AI landscape of practical tools designed for everyday tasks: writing, images, productivity.

Rather than overwhelming you with every tool that exists, this module focuses on understanding tool categories and decision frameworks. New tools will emerge constantly. By understanding categories and how to evaluate tools, you'll be able to navigate new tools independently.

The emphasis here is transfer: taking abstract principles you've learned and applying them to concrete situations. This is where learning becomes powerful-not just knowing concepts but being able to use them.`,
  },

  "m4-writing-tools": {
    id: "m4-writing-tools",
    title: "Writing Tools: Beyond Spelling Checks",
    explanation: `Writing assistance has evolved from spell-check to generating entire paragraphs. This lesson shows you the range of capabilities and helps you think about when each is useful.

A spell-checker catches errors. A grammar tool suggests better phrasing. A generation tool creates content from prompts. These are qualitatively different capabilities with different use cases and different ethical implications.

This builds discernment in tool use. Not every situation requires an AI assistant. Sometimes writing the email yourself is faster. Sometimes it's clearer. Understanding when tools help and when they don't is practical wisdom that makes you more effective.`,
  },

  "m4-image-tools": {
    id: "m4-image-tools",
    title: "Image Generation: Creating from Description",
    explanation: `Image generation tools let you create visuals from text descriptions. The capability is impressive, but understanding what it actually does-learning patterns in images and text to generate new images-prevents overvaluing the technology.

This helps you distinguish between "impressive" and "transformative." Image generation is impressive. But most businesses still need real photography and design. Understanding where generation fits into workflows (quick mockups, inspiration, prototyping) versus where it doesn't (final marketing materials, copyrighted images) is practical judgment.

It also touches on ethical considerations: copyright issues, labor implications, authenticity in media. By engaging with these thoughtfully, you're preparing yourself to make ethical decisions about how to use these tools.`,
  },

  "m4-productivity-tools": {
    id: "m4-productivity-tools",
    title: "Productivity Assistants: Working Faster and Smarter",
    explanation: `AI productivity tools include code generation, research summarization, email drafting, and more. The common thread: they augment human capability. A programmer using Copilot doesn't write less code; they write more code and focus on higher-level decisions.

This augmentation model is crucial for your future. Rather than AI replacing work, you're using AI to do existing work differently and more effectively. That shift in perspective-from threat to tool-is empowering.

You're also building trade-off judgment. Does this tool save me time? At what cost? What quality issues might arise? What skills might I lose from not doing this manually? These practical questions matter more than theoretical AI capabilities.`,
  },

  "m4-quiz": {
    id: "m4-quiz",
    title: "Module 4 Mastery Check",
    explanation: `Tool selection improves when you compare tasks by risk, privacy, speed, and review burden instead of by brand familiarity.

Correct answers depend on recognizing tradeoffs: speed versus accuracy, convenience versus privacy, and output quality versus verification effort.

This decision framework transfers to new tools as the ecosystem changes. Names and interfaces evolve quickly, but constraint-based selection logic remains stable.`,
  },

  // MODULE 5: Data and Learning
  "m5-hero": {
    id: "m5-hero",
    title: "Module 5: Data and Learning",
    explanation: `Data is the fuel of machine learning. Without quality data, you can't build effective AI systems. This module focuses on understanding data: how it's collected, how it's cleaned, and how it's prepared for learning algorithms.

This module is more technical than previous ones and introduces core data engineering concepts. If you're not planning to work in AI engineering, you might wonder why this matters. The answer: understanding data limitations helps you use AI systems wisely and critically.

The module is structured around a realistic workflow: collect data, clean it, prepare it, then use it. This progression mirrors real data science operations rather than isolated concept study.`,
  },

  "m5-what-is-data": {
    id: "m5-what-is-data",
    title: "What Is Data? From Raw Records to Insights",
    explanation: `Data is information encoded in a form machines can process. But data isn't neutral. Every dataset reflects choices: what to measure, how to measure it, what to exclude, what interpretation to embed.

This encourages critical thinking about data. "We have the data" doesn't mean "the data answers the question." Data might be incomplete, biased, or not measure what you think it measures.

This critical perspective is increasingly important. Companies make decisions based on data. Governments set policy based on data. Understanding that data is constructed (not discovered) and reflects human choices is foundational to critical data literacy.`,
  },

  "m5-data-collection": {
    id: "m5-data-collection",
    title: "Data Collection: Choosing What to Measure",
    explanation: `Before any analysis, you must collect data. This segment shows how the collection process itself introduces bias. Who collects the data? What are they measuring? What are they not measuring?

If you want to understand language, you collect text. But what text? Social media? Books? Academic papers? Transcribed conversations? Each choice leads to different learned patterns. A language model trained primarily on academic text will behave differently from one trained on social media.

It establishes that data collection is a design choice with consequences. Understanding this prevents naive thinking like "we just let the algorithm figure it out from data." The data itself embeds human choices and biases.`,
  },

  "m5-data-cleaning": {
    id: "m5-data-cleaning",
    title: "Data Cleaning and Quality: Preparing for Learning",
    explanation: `Real-world data is messy. Missing values, typos, outliers, and inconsistent formatting create problems. Cleaning data is unglamorous but crucial. Garbage in, garbage out. A machine learning system trained on messy data will learn the mess, not the underlying pattern.

Data scientists spend enormous time on data cleaning. It's not the fun part-the fun part is analyzing clean data or building models. But the foundation work of cleaning is essential.

It establishes that effective work is often invisible. Nobody celebrates data cleaning. But systems that work well are usually built on well-cleaned data. Understanding this unglamorous side of AI development prevents romantic views of AI as pure algorithmic innovation. Much of the work is actually data preparation.`,
  },

  "m5-preprocessing": {
    id: "m5-preprocessing",
    title: "Preprocessing Techniques: Transforming Data",
    explanation: `After cleaning, data is preprocessed-transformed into a format that learning algorithms can use effectively. This might mean scaling numbers to similar ranges, encoding categories as numbers, or splitting text into tokens.

Preprocessing choices affect results. A poorly scaled dataset might cause learning algorithms to focus on large-scale variables and ignore small-scale ones, even if the small ones are important. Preprocessing isn't mindless transformation; it's intentional preparation.

It establishes that machine learning success depends on countless small decisions before the algorithm ever runs. These decisions are often invisible in final results, but they determine whether results are good or misleading.`,
  },

  "m5-feature-engineering": {
    id: "m5-feature-engineering",
    title: "Feature Engineering: Teaching the Algorithm What Matters",
    explanation: `Feature engineering means creating new variables from raw data that help learning algorithms find patterns. If you're predicting house prices, the raw data might be square footage, bedrooms, and location. You might engineer a feature: price per square foot. This new feature directly captures what matters-value density.

Feature engineering is part science, part art. It requires domain knowledge. What features would a real estate agent focus on? Those are probably the features that matter for predicting prices.

It establishes that machine learning isn't fully automated. It requires human judgment about what matters. Feature engineering represents your knowledge being embedded in the system. A system with good features learns well. A system with poor features struggles regardless of algorithm sophistication.`,
  },

  "m5-quiz": {
    id: "m5-quiz",
    title: "Module 5 Mastery Check",
    explanation: `Data pipelines shape model behavior long before an architecture makes a prediction.

The key capability is linking upstream data decisions to downstream model outcomes. A model with poor inputs, weak labels, or inconsistent preprocessing will produce unreliable predictions regardless of architecture.

Strong performance indicates you can evaluate AI outputs as data artifacts, not just algorithm artifacts, which is essential for debugging and governance.`,
  },

  // MODULE 6: AI Ethics and Society
  "m6-hero": {
    id: "m6-hero",
    title: "Module 6: AI Ethics, Safety & Society",
    explanation: `You've learned technical foundations. Now you engage with implications. AI's power creates ethical questions: How do we ensure fairness? How do we protect privacy? How do we prevent misuse?

This module addresses questions without clean answers. There's no algorithm for ethics. Different stakeholders have different values. Your job is to think carefully and make principled decisions.

The module covers concrete problems: bias in hiring algorithms, privacy violations through data collection, misinformation through deepfakes, misuse through automation. By engaging with real problems, you build judgment about how to navigate them in your work.`,
  },

  "m6-bias-fairness": {
    id: "m6-bias-fairness",
    title: "AI Bias and Fairness: Whose Values Are Embedded?",
    explanation: `AI systems trained on biased data learn and perpetuate that bias. Hiring algorithms trained on historical hiring data learn to discriminate like humans did historically. Image classification systems trained on mostly light-skinned faces fail on dark-skinned faces.

Understanding bias is crucial because biased systems feel objective. The algorithm is "just following the data," right? But data reflects human choices and prejudices. Calling it objective doesn't make it fair.

You are encouraged to question automated systems. If an algorithm is making decisions that affect people, asking "is this biased?" should be automatic. And usually, the answer is "probably somewhat." The question becomes: Is it acceptable? Can it be fixed? Should we use this system at all?`,
  },

  "m6-privacy-data": {
    id: "m6-privacy-data",
    title: "Privacy and Your Data: Who Owns Information About You?",
    explanation: `AI systems require data. That data is often personal information about you: your searches, your location, your purchases, your communications. Who collects it? Who controls it? Who benefits from it?

Privacy is increasingly valuable and threatened. This framing encourages you to treat your digital footprint as valuable information that should be protected. Terms of service let companies collect enormous amounts of data, often without meaningful consent.

You can also make informed choices about privacy. What information are you comfortable sharing? With whom? For what purposes? These are increasingly important personal decisions that shape your digital life.`,
  },

  "m6-misinformation-deepfakes": {
    id: "m6-misinformation-deepfakes",
    title: "Misinformation and Deepfakes: Can You Trust What You See?",
    explanation: `AI enables new forms of misinformation. Deepfake technology can make videos of people saying things they never said. Generative AI can create convincing false news stories. Your ability to trust media is eroding.

Understanding how these technologies work helps you develop skepticism. If a video seems shocking, where did it come from? Can I verify the source? Is this plausible given what I know about the person or situation? These critical questions are increasingly necessary.

This builds media literacy for the AI age. You'll encounter AI-generated content. Your job is to think critically: Is this real? Is this reliable? What's the source? What might be the motivation for creating or sharing this? This skeptical thinking protects you from manipulation.`,
  },

  "m6-responsible-use": {
    id: "m6-responsible-use",
    title: "Responsible AI Use: Ethical Decision-Making",
    explanation: `Responsibility means thinking about consequences. When you use or build AI systems, you're making choices with implications for real people. Responsible use means considering those implications.

This part moves beyond abstract ethics to practical decision-making. How do you decide whether to use a tool? What questions should you ask? What values matter to you? These personal questions don't have universal answers, but working through them is important.

It strengthens ethical reasoning skills. You won't agree with everyone on every issue. But you can reason carefully, consider different perspectives, and make principled decisions. That's what responsible use looks like.`,
  },

  "m6-ethical-dilemmas": {
    id: "m6-ethical-dilemmas",
    title: "Ethical Dilemmas: Real Scenarios with Competing Values",
    explanation: `Real AI ethics decisions rarely offer clean answers. A company may want AI hiring because it is cheaper even if it introduces bias, and a government may want facial recognition because it improves security even if it violates privacy.

The section practices ethical reasoning. Different stakeholders value different things. Your job is to recognize the trade-offs, understand different perspectives, and make decisions aligned with your values. That's harder than following rules, but it's more honest.

Scenarios are unreliable predictors of what you'll actually do when facing pressure. But practicing ethical reasoning now means you're more likely to make thoughtful decisions when real pressure comes. You're building ethical reflexes.`,
  },

  "m6-risk-safeguards": {
    id: "m6-risk-safeguards",
    title: "Risk Assessment and Safeguards: Preventing Harm",
    explanation: `If something can go wrong, it probably will. Safeguards-redundancies, fail-safes, and monitoring systems-exist because failure is inevitable. Rather than hoping systems work perfectly, you assume they won't and plan accordingly.

Risk assessment means thinking about what could go wrong and what the consequences would be. High-consequence failures require more safeguards than low-consequence failures. A banking system that makes occasional errors is unacceptable. A recommendation system that occasionally makes poor recommendations is acceptable.

A defensive mindset about systems is essential. What could fail? What would be the impact? How can we reduce risk? This careful thinking prevents disasters. It's not glamorous, but it's crucial for responsible AI development and use.`,
  },

  "m6-quiz": {
    id: "m6-quiz",
    title: "Module 6 Mastery Check",
    explanation: `AI risk analysis requires you to reason across bias, privacy, misinformation, and unsafe automation at the same time.

Good answers require balancing competing constraints: utility, fairness, transparency, legal exposure, and potential harm. The goal is not moral certainty but defensible reasoning under tradeoffs.

This capability is critical in deployment decisions where technical feasibility alone is insufficient and governance requirements determine whether a system should launch at all.`,
  },

  // MODULE 7: AI for Business & Work
  "m7-hero": {
    id: "m7-hero",
    title: "Module 7: AI for Business & Work",
    explanation: `You've learned individual skills and ethics. Now you understand AI in organizational context. How is AI actually being used in businesses? What opportunities exist? What skills matter?

This module helps you think strategically about AI for careers and business. It's not about specific tools but about understanding how AI creates value and where opportunities emerge.

You learn to think like a strategist. Technical AI skills matter, but understanding business application, change management, and organizational strategy is equally important. This broader perspective is valuable regardless of career path.`,
  },

  "m7-workplace-ai": {
    id: "m7-workplace-ai",
    title: "AI in the Workplace: Current Applications",
    explanation: `AI isn't replacing most jobs yet. It's augmenting them. A radiologist with an AI diagnostic tool is more effective than one without. A writer with an AI assistant drafts content faster. A developer with a code generation tool builds features quicker.

Understanding current applications helps you see where AI might benefit your work. It also builds operational thinking: What could this tool do in my workflow? What would change? What would stay the same?

Another takeaway is that AI adoption requires more than the technology. Training, change management, and addressing worker concerns-these organizational factors often determine whether AI implementation succeeds or fails. Technology alone doesn't create value.`,
  },

  "m7-future-jobs": {
    id: "m7-future-jobs",
    title: "AI and the Future of Jobs: Disruption and Opportunity",
    explanation: `Some jobs will be disrupted by AI. Others will emerge. The discussion moves beyond fear-based thinking to strategic thinking. Which types of jobs are most vulnerable? Why? What new opportunities emerge?

Jobs involving routine decision-making are most vulnerable to automation. Jobs requiring complex judgment, emotional intelligence, creativity, and adaptability are more resilient. Understanding this helps you think about your career strategy.

It establishes that technological disruption is real but not predetermined. Society makes choices about how to manage disruption. Workers who understand AI and adapt are better positioned than those who resist. This is not simplistic reassurance, but it is empowering: you have agency in responding to change.`,
  },

  "m7-industries": {
    id: "m7-industries",
    title: "AI Across Industries: Where Is AI Already Changing Work?",
    explanation: `Different industries are adopting AI at different rates. Healthcare, finance, manufacturing, and retail are leading. Understanding where AI is already having impact helps you see patterns and predict where it's headed.

It trains you to observe and extrapolate. What enables AI adoption in healthcare? (High stakes motivate investment. Data-rich environment. Clear metrics.) Are these conditions present in other industries? If so, expect AI adoption there too.

This pattern-recognition skill is valuable across domains because it supports prediction and adaptation during technological change.`,
  },

  "m7-business-strategy": {
    id: "m7-business-strategy",
    title: "Building an AI Strategy: From Vision to Reality",
    explanation: `Having AI is different from using AI effectively. A strategy requires understanding: What problem are we solving? How does AI help? What infrastructure do we need? What's the timeline? What are the risks?

Strategic thinking about technology adoption matters here. Enthusiasm for new technology is common. Wise adoption requires careful planning. Understanding this prevents naive technology purchases that create more problems than they solve.

Even if you never build corporate strategy, understanding these questions helps you evaluate opportunities. When someone proposes an AI solution, you can ask: What problem are we solving? Is AI necessary? What are the risks? This critical evaluation protects you from hype.`,
  },

  "m7-real-workflows": {
    id: "m7-real-workflows",
    title: "Real-World Workflows: How Teams Actually Use AI",
    explanation: `The focus moves from theoretical to practical. Real teams use AI in specific ways that solve specific problems. Understanding their workflows gives you concrete mental models to draw on.

It uses examples. Case studies show what's possible and what's realistic. They show that AI adoption is messy and iterative, not clean and predetermined. Teams experiment. Some experiments work. Others fail. Learning continues.

Studying real workflows builds transferable pattern knowledge: where AI adds value, what blocks adoption, and how organizations adapt execution over time.`,
  },

  "m7-quiz": {
    id: "m7-quiz",
    title: "Module 7 Mastery Check",
    explanation: `Strategic AI reasoning starts with business value, adoption barriers, and human-critical capabilities rather than technical novelty.

You should be able to evaluate proposals by problem definition, implementation risk, data readiness, and change-management requirements rather than by technical novelty alone.

These judgments shape real business outcomes because failed AI initiatives are usually strategy and execution failures, not model-architecture failures.`,
  },

  // MODULE 8: Creative AI Applications
  "m8-hero": {
    id: "m8-hero",
    title: "Module 8: AI in Creative and Knowledge Work",
    explanation: `You've learned AI in business contexts. Now you explore AI in creative and intellectual work. Can AI create art? Can it advance science? Can it augment human creativity?

These are emotionally charged questions because creativity feels uniquely human. By engaging seriously with what AI can and cannot do in creative contexts, you develop nuanced perspectives.

The module shows real examples: AI music, AI visual art, AI writing, AI-assisted research. In each domain, AI is a tool within human workflows, not a replacement for human creativity. Understanding that distinction matters.`,
  },

  "m8-ai-creativity": {
    id: "m8-ai-creativity",
    title: "Creativity and AI: Can Machines Be Creative?",
    explanation: `AI and creativity become clearer when you separate novelty from intention, authorship, and taste.

The answer depends on your definition. If creativity is novel pattern combination, then yes. If it requires intentionality or emotional expression, then it's complicated. Most honest assessment: AI can do some things creative humans do but lacks other essential elements of human creativity.

This builds philosophical nuance beyond binary framing. AI is a tool humans can use creatively, even when debates about the label "creative" remain unresolved.`,
  },

  "m8-ai-augmented-creativity": {
    id: "m8-ai-augmented-creativity",
    title: "AI-Augmented Creativity: Using AI Within Creative Processes",
    explanation: `Rather than replacing humans, AI augments creativity. Musicians use AI to generate backing tracks. Visual artists use AI for initial concept exploration. Writers use AI for brainstorming and editing suggestions.

This augmentation model transforms the creative process. It establishes that tools always change their domain. Photography changed visual art not by replacing painters but by offering new capabilities. AI is similarly transformative-not replacing human creativity but expanding possibilities.

You'll be prompted to think about your own creative process. Where might AI help? Brainstorming? Iteration? Technical execution? Where is human judgment essential? This thoughtful integration is how tools serve humans.`,
  },

  "m8-ai-knowledge": {
    id: "m8-ai-knowledge",
    title: "AI in Knowledge Work: Research, Analysis, and Learning",
    explanation: `Knowledge workers-researchers, analysts, and educators-increasingly use AI for information processing. AI summarizes research, identifies patterns in data, and helps organize and synthesize information.

This augmentation is powerful because knowledge work is limited by human attention and time. An AI that processes large document collections and identifies patterns can expand what's possible. Researchers can explore broader terrain. Analysts can consider more information.

It establishes that knowledge work isn't being replaced; it's being transformed. The worker's role shifts from information processing toward judgment: evaluating AI summaries, deciding what patterns matter, synthesizing insights. That's arguably more valuable work than pre-AI information processing.`,
  },

  "m8-collaboration": {
    id: "m8-collaboration",
    title: "Human-AI Collaboration: Building Better Together",
    explanation: `The most powerful model isn't humans alone or AI alone but humans and AI collaborating. Humans provide judgment, creativity, and contextual understanding. AI provides pattern recognition, tireless information processing, and novel combinations.

An increasingly important skill is collaborating with AI systems. How do you use feedback from an AI system effectively? How do you verify its output? How do you combine AI capability with human judgment?

This collaborative model requires humans to understand AI limitations and strengths. You can't just trust AI blindly. But you also can't ignore its output. Effective collaboration means balancing skepticism with openness-trusting enough to benefit while maintaining critical evaluation.`,
  },

  "m8-quiz": {
    id: "m8-quiz",
    title: "Module 8 Mastery Check",
    explanation: `Creative and knowledge-work AI decisions are strongest when you can separate productive augmentation from empty hype.

The central distinction is augmentation versus replacement: where models accelerate exploration, drafting, and synthesis, and where human intent, taste, accountability, and context remain decisive.

Strong answers integrate mechanism and culture at once, recognizing both the technical capability of generative systems and the authorship, quality, and trust questions they introduce.`,
  },

  // MODULE 9: Your AI Toolkit
  "m9-hero": {
    id: "m9-hero",
    title: "Module 9: Your AI Toolkit",
    explanation: `This capstone module turns earlier concepts into practical AI judgment. The focus is no longer on isolated definitions or single tools, but on choosing assistants, designing workflows, and making tradeoffs that hold up in real use.

The module matters because tool familiarity expires quickly, while decision frameworks persist. To work effectively with AI, you need to explain it clearly, compare products by constraints, and build repeatable workflows that include verification and guardrails.

Treat this module as an integration point. It asks you to connect prompting, model limitations, evaluation habits, and workflow design into one usable operating approach.`,
  },

  // MODULE 10: The Future of AI
  "m10-hero": {
    id: "m10-hero",
    title: "Module 10: The Future of AI",
    explanation: `This final module is about reasoning under uncertainty. Instead of predicting one inevitable future, it helps you evaluate frontier capabilities, AGI claims, policy debates, and personal career choices with a grounded framework.

The core skill here is disciplined foresight. Future-facing AI discussion is full of speculation, but useful strategy comes from separating what is already changing from what remains unclear and then planning actions that stay sensible across multiple scenarios.

By the end of the module, you should be able to think clearly about future AI without drifting into hype or paralysis. The goal is preparation, not prophecy.`,
  },

  "m10-quiz": {
    id: "m10-quiz",
    title: "Module 10 Mastery Check",
    explanation: `Future-facing AI judgment depends on connecting frontier capability, governance friction, and career strategy without pretending uncertainty is gone.

Strong performance requires connecting present capability, policy friction, and personal strategy. You should be able to distinguish what is already actionable from what is still speculative, and choose responses that remain useful even if predictions change.

This matters because the future of AI will reward people who can make decisions under uncertainty. The point is not to guess perfectly, but to plan intelligently with incomplete information.`,
  },

  // MODULE 4 (actual): Data and Preprocessing
  "m4-module-overview": {
    id: "m4-module-overview",
    title: "Module 4: Data and Preprocessing Overview",
    explanation: `This module covers what happens before model training: how data is collected, cleaned, transformed, and engineered into features a model can learn from. Every AI model is only as good as its training data, so data quality is a prerequisite for model quality.

By the end you should understand the full data pipeline from raw collection through to model-ready features, and be able to identify where data quality issues enter and how to fix them.`,
  },

  "m4-what-is-data": {
    id: "m4-what-is-data",
    title: "What Is Data? Structured, Unstructured, and Types",
    explanation: `Data in AI is any recorded observation a model can learn from. It comes in two main categories: structured (organised into rows and columns with a fixed schema, like spreadsheets) and unstructured (no fixed format, like emails, photos, or audio).

Understanding data types — numerical, categorical, text, image, audio, time series — matters because each type requires different preprocessing before a model can use it. Most real-world data is unstructured, which is why data preparation is so significant.`,
  },

  "m4-data-collection": {
    id: "m4-data-collection",
    title: "Data Collection: Sources, Methods, and the Labelling Bottleneck",
    explanation: `Data comes from internal systems, web scraping, APIs, human labelling, surveys, and sensors. Where data comes from and how it is collected directly determines what a model can and cannot learn — including what biases it absorbs.

The labelling bottleneck is a critical constraint: supervised learning requires labelled data, but labelling is expensive. Approaches like active learning and semi-supervised learning reduce annotation cost without sacrificing quality.`,
  },

  "m4-data-cleaning": {
    id: "m4-data-cleaning",
    title: "Data Cleaning: Missing Values, Duplicates, Bias, and Consistency",
    explanation: `Dirty data produces unreliable models. Data cleaning addresses missing values (impute or drop), duplicate records, inconsistent formats (date strings, capitalisation), and systematic bias introduced by collection gaps.

The key insight is that cleaning decisions are modelling decisions. How you handle missing values or outliers changes what the model learns. Cleaning is not neutral — it embeds assumptions about the domain.`,
  },

  "m4-preprocessing": {
    id: "m4-preprocessing",
    title: "Preprocessing: Normalisation, Encoding, and Splits",
    explanation: `Preprocessing transforms raw, cleaned data into a format models can process: normalising numerical ranges so no feature dominates by scale, encoding categorical variables (one-hot or ordinal), and splitting data into training, validation, and test sets.

These transformations are not optional. Most models assume input features on comparable scales. Encoding converts categories into numbers without implying false ordering. The train/test split prevents the model from memorising answers it will see at evaluation time.`,
  },

  "m4-feature-engineering": {
    id: "m4-feature-engineering",
    title: "Feature Engineering: Building Better Predictors",
    explanation: `Feature engineering creates new, more informative columns from raw data. For example, deriving recency_days from a last_purchase_date, or avg_spend_per_order from total_spend and order_count. Good features encode domain knowledge that raw columns cannot capture.

This is where subject-matter expertise translates into model performance. A model trained on well-engineered features often outperforms a more complex model trained on raw fields. Feature engineering is where humans teach the model what signals matter.`,
  },

  // MODULE 5 (actual): Coding Crash Course for AI
  "m5-module-overview": {
    id: "m5-module-overview",
    title: "Module 5: Coding Crash Course Overview",
    explanation: `This module introduces the programming concepts that appear most often in AI work: variables and data types, conditionals, loops, functions, and debugging. You do not need to become a software engineer, but understanding these building blocks lets you read, adapt, and reason about AI code.

By the end you should be able to follow a Python script, understand what it does, and modify simple variables or conditions to change behaviour.`,
  },

  "m5-variables": {
    id: "m5-variables",
    title: "Variables and Data Types: The Building Blocks",
    explanation: `A variable stores a value that a program can use and change. Data types (string, integer, float, boolean, list, dictionary) tell the program what operations are valid. Assigning the wrong type causes errors; understanding types helps you read error messages.

In AI contexts, variables hold everything from model hyperparameters to training data paths. Understanding how values are stored and typed is the first step to reading and modifying AI scripts.`,
  },

  "m5-conditionals": {
    id: "m5-conditionals",
    title: "Conditionals: if/else Decision Logic",
    explanation: `Conditionals (if/else, elif) let a program take different paths based on conditions. They are how AI pipelines handle edge cases, route different inputs, and implement thresholds — for example, flagging a prediction as low-confidence if the score is below 0.6.

Reading conditional logic tells you what assumptions a system makes about its inputs and what exceptional cases it handles (or ignores).`,
  },

  "m5-loops": {
    id: "m5-loops",
    title: "Loops: Repeating Operations Over Data",
    explanation: `Loops (for, while) apply operations repeatedly — iterating over dataset rows, batching training examples, or running an evaluation across a test set. Most AI data processing is loop-based.

Understanding loops explains how large datasets are processed: not all at once, but one item or batch at a time. This is why training takes time proportional to data size and why batching matters for memory efficiency.`,
  },

  "m5-functions": {
    id: "m5-functions",
    title: "Functions: Reusable, Modular Code",
    explanation: `Functions package a block of code under a name so it can be reused without repetition. In AI codebases, functions encapsulate preprocessing steps, model calls, evaluation metrics, and utility operations.

Understanding functions lets you see how a pipeline is composed from smaller reusable parts. When something breaks, functions tell you where to look: the problem is in whichever function the error traces back to.`,
  },

  "m5-debugging": {
    id: "m5-debugging",
    title: "Debugging Mindset and Mini Project",
    explanation: `Debugging is the process of finding and fixing errors in code. The debugging mindset — read the error message, locate the failing line, check assumptions, isolate the variable — is more valuable than memorising syntax.

In AI work, bugs are often silent: code runs without crashing but produces wrong results because a data transformation was applied incorrectly. The debugging habit of checking intermediate outputs catches these issues before they corrupt a model's training.`,
  },

  // MODULE 6 additions (m6-module-overview and m6-future-ai)
  "m6-module-overview": {
    id: "m6-module-overview",
    title: "Module 6: AI Ethics, Safety and Society Overview",
    explanation: `This module covers the human consequences of AI: where systems are unfair, how personal data gets misused, how misinformation spreads at scale, and what responsible deployment looks like. Ethics is not an afterthought — it is a design constraint.

By the end you should be able to identify ethical risks in AI deployments, apply a basic risk-assessment framework, and articulate what responsible AI use looks like in practice.`,
  },

  "m6-future-ai": {
    id: "m6-future-ai",
    title: "The Future of AI: Societal Trajectory",
    explanation: `AI development is accelerating across capability, access, and regulation simultaneously. Understanding likely near-term trajectories — more powerful models, broader tool access, tightening governance — helps you make better decisions about where to invest learning and when to apply caution.

The future is not predetermined. The choices societies, organisations, and individuals make now about how to build, deploy, and regulate AI will shape outcomes over the next decade.`,
  },

  // MODULE 7 additions
  "m7-module-overview": {
    id: "m7-module-overview",
    title: "Module 7: AI for Business and Work Overview",
    explanation: `This module connects AI capability to practical business and career contexts: how AI is already changing workplaces, which jobs and industries are affected first, how to build an AI strategy, and how to redesign workflows with AI assistance.

By the end you should be able to evaluate AI adoption opportunities in a business context, identify where automation adds value versus where human judgment is essential, and plan your own professional adaptation.`,
  },

  "m7-opportunities": {
    id: "m7-opportunities",
    title: "AI Opportunities Framework: Where AI Creates Value",
    explanation: `Not all tasks benefit equally from AI. An opportunities framework helps you identify where AI creates the most value: high-volume repetitive tasks, pattern recognition at scale, drafting first versions, and summarising large information sets.

The framework also identifies where AI adds little value or introduces risk: high-stakes irreversible decisions, tasks requiring deep contextual judgment, and work where errors have significant consequences. Knowing both sides prevents both under-adoption and over-reliance.`,
  },

  "m7-role-transformation": {
    id: "m7-role-transformation",
    title: "Role Transformation: How AI Changes Job Functions",
    explanation: `AI does not simply replace jobs — it transforms them. The mix of tasks within a role shifts: routine information processing declines while judgment, communication, and oversight of AI outputs increase in proportion.

Understanding role transformation helps you identify which parts of your current work are most automatable and which require development. The goal is not to avoid AI but to position yourself to do the higher-value work that AI reveals by automating the lower-value work.`,
  },

  "m7-workflow-redesign": {
    id: "m7-workflow-redesign",
    title: "Workflow Redesign: Building AI-Assisted Processes",
    explanation: `Redesigning workflows with AI means identifying which steps benefit from automation or assistance, adding appropriate verification steps, and building feedback loops that catch errors before they compound.

Effective workflow redesign is not just inserting AI into existing steps — it often means rethinking the sequence entirely. The best AI-assisted workflows are designed around AI's strengths (speed, scale, recall) while preserving human oversight at decision points.`,
  },

  "m7-building-skills": {
    id: "m7-building-skills",
    title: "Building AI Skills: Continuous Learning for a Changing Field",
    explanation: `AI capabilities are evolving faster than traditional skill development cycles. Building AI skills requires a different learning approach: shorter cycles, hands-on experimentation, and continuous updating rather than one-time credential acquisition.

The skills that age most slowly are not tool-specific but capability-general: prompt engineering principles, evaluation habits, workflow design, and the ability to identify where AI is and is not appropriate. These persist across model generations.`,
  },

  // MODULE 8 (actual): AI Agents
  "m8-module-overview": {
    id: "m8-module-overview",
    title: "Module 8: AI Agents Overview",
    explanation: `This module covers AI agents — systems that perceive their environment, reason, and take actions to achieve goals. Agents go beyond single-turn responses to multi-step autonomous workflows: browsing the web, writing and running code, calling APIs, and coordinating with other agents.

By the end you should understand how agents work architecturally, what makes them powerful, and why they introduce new risks that single-turn models do not.`,
  },

  "m8-what-are-agents": {
    id: "m8-what-are-agents",
    title: "What Are AI Agents?",
    explanation: `An AI agent is a system that takes actions in pursuit of a goal, not just responds to a single prompt. Agents can use tools (search, code execution, APIs), maintain memory across steps, and adapt their plan based on intermediate results.

The key distinction from a chatbot is autonomy over time: an agent makes multiple decisions in sequence to accomplish a longer-horizon task, rather than answering a single question and stopping.`,
  },

  "m8-how-agents-work": {
    id: "m8-how-agents-work",
    title: "How AI Agents Work: The Perception-Reasoning-Action Loop",
    explanation: `Agents operate in a loop: perceive the current state, reason about what action to take next, execute the action, observe the result, and repeat. This loop continues until the goal is achieved or a stopping condition is met.

The reasoning step is typically handled by an LLM (the agent's brain), while actions are handled by tools the LLM can call. Understanding this loop explains why agents can fail: errors accumulate across steps, and a wrong early decision can cascade into a completely wrong final result.`,
  },

  "m8-agent-types": {
    id: "m8-agent-types",
    title: "Types of AI Agents",
    explanation: `Agents vary in complexity: simple reflex agents react to immediate inputs; goal-based agents plan sequences of actions; learning agents improve from experience; and multi-agent systems have multiple agents collaborating or competing to solve problems.

In practice, most current AI agents are goal-based systems built on LLMs with tool access. Multi-agent orchestration — where a planner agent delegates to specialist agents — is an emerging pattern for complex long-horizon tasks.`,
  },

  "m8-agent-applications": {
    id: "m8-agent-applications",
    title: "Real-World Applications of AI Agents",
    explanation: `AI agents are already being used for software development (coding agents that write, run, and debug code), research (agents that search the web and synthesise findings), customer support (agents that look up records and take actions), and workflow automation (agents that orchestrate multi-step business processes).

Understanding real applications helps you identify where agent technology is mature enough to be reliable today versus where it remains experimental and requires significant human oversight.`,
  },

  "m8-building-agents": {
    id: "m8-building-agents",
    title: "Building with Agents: Tools and Practical Considerations",
    explanation: `Building agent systems requires choosing a framework (LangChain, AutoGen, CrewAI), defining tools the agent can call, designing prompts that guide reasoning, and implementing verification steps for high-stakes actions.

The most important practical consideration is guardrails: agents with broad tool access can take irreversible actions. Production agent systems need confirmation steps, audit logs, and scope limits that prevent agents from causing damage when they misinterpret a goal.`,
  },

  "m8-agent-risks": {
    id: "m8-agent-risks",
    title: "Agent Risks and Limitations",
    explanation: `Agents introduce risks that single-turn models do not: errors compound over steps; agents with tool access can take irreversible real-world actions; and agents can be manipulated through prompt injection in content they retrieve from the web or other sources.

The alignment problem is especially acute for agents because they have more autonomy. An agent pursuing a proxy goal incorrectly can cause significant damage before a human can intervene. Responsible agent deployment requires careful scope definition, monitoring, and intervention capability.`,
  },

  // MODULE 9 (actual): Your AI Toolkit
  "m9-module-overview": {
    id: "m9-module-overview",
    title: "Module 9: Your AI Toolkit Overview",
    explanation: `This capstone module synthesises everything into practical judgment: how to explain AI to others, how to choose the right tool for a task, how to prompt the major models, how to apply safety checks, and how to build simple AI workflows.

The focus shifts from concepts to habits. By the end you should have a repeatable approach to incorporating AI into your work that balances capability with appropriate caution.`,
  },

  "m9-explain-ai": {
    id: "m9-explain-ai",
    title: "Explaining AI Clearly to Non-Technical Audiences",
    explanation: `Explaining AI well requires translating capability, limitation, and risk into plain language without over-simplifying or over-promising. The key is analogies (LLMs as sophisticated autocomplete), concrete examples, and honest acknowledgment of what AI cannot do reliably.

Being able to explain AI clearly is a professional skill. Teams that understand AI tools make better decisions about when to use them, how much to trust their outputs, and when to escalate for human review.`,
  },

  "m9-choose-tools": {
    id: "m9-choose-tools",
    title: "Choosing the Right AI Tool for the Task",
    explanation: `Different AI tools have different strengths. Text generation models excel at drafting and summarising; image models excel at visual creation; code assistants excel at completion and debugging; specialised models exist for transcription, translation, and data extraction.

The right framework for tool selection: what is the task type, what quality of output is required, what are the privacy constraints, and what is the cost of errors? Tool choice is a design decision, not just a preference.`,
  },

  "m9-prompting": {
    id: "m9-prompting",
    title: "Prompting ChatGPT, Claude, and Gemini Effectively",
    explanation: `The major models (ChatGPT/GPT-4o, Claude, Gemini) have different strengths and behaviours. ChatGPT is the most widely used with broad capability; Claude is strong at analysis and maintains long context well; Gemini is deeply integrated with Google Workspace and excels at multimodal tasks.

Effective prompting across all three follows the same principles (role, context, task, constraints, examples) but with model-specific tuning: Claude benefits from explicit instruction to think step by step; Gemini integrates well with document uploads; ChatGPT has the richest plugin/tool ecosystem.`,
  },

  "m9-safety-checks": {
    id: "m9-safety-checks",
    title: "Bias, Privacy, and Misinformation Checks",
    explanation: `Every AI output needs a minimum safety check before use: is there potential bias in the output that could disadvantage a group? Does the output contain personal or confidential information that should not be shared? Does the output contain claims that should be verified before repeating?

These checks take seconds but prevent significant downstream harm. Building them into your workflow as automatic habits — not optional reviews — is what distinguishes responsible AI use from careless use.`,
  },

  "m9-workflows": {
    id: "m9-workflows",
    title: "Building Simple AI Workflows",
    explanation: `An AI workflow is a repeatable sequence of steps where AI assists with one or more stages. Simple examples: research → AI summarise → human review → draft → AI improve → human edit → publish. Or: data export → AI analysis → human interpretation → action.

Good workflows make AI assistance explicit and auditable: you know which parts were AI-generated and which were human-verified. This transparency is essential for professional contexts where you are accountable for the output.`,
  },

  "m9-mini-project": {
    id: "m9-mini-project",
    title: "Your First AI Mini-Project",
    explanation: `The mini-project synthesises skills from the course: identify a real task you do regularly, build an AI-assisted workflow for it, apply appropriate prompting, and document what the AI handled and what required human judgment.

This application exercise is where learning becomes capability. You are not just understanding AI — you are building a muscle memory for how to approach new tasks with AI assistance. That habit, once established, compounds over time.`,
  },

  "m9-next-steps": {
    id: "m9-next-steps",
    title: "Next Steps and Resources",
    explanation: `AI is a fast-moving field. The next steps after this course: explore the tools mentioned, build a personal library of effective prompts for your most common tasks, follow a small number of high-signal sources for capability updates, and revisit your AI workflows every few months as models improve.

The most important next step is continued practice. Reading about AI has declining marginal returns after a point; doing things with AI compounds indefinitely.`,
  },

  // MODULE 10 additions
  "m10-module-overview": {
    id: "m10-module-overview",
    title: "Module 10: The Future of AI Overview",
    explanation: `This final module addresses AI's trajectory: what is currently at the research frontier, what AGI means and when it might arrive, how AI is being governed, and how to build a personal strategy for a field that will keep changing after this course ends.

The goal is not to make predictions but to reason well under uncertainty — understanding what is already determined, what remains open, and how to make decisions that stay sensible across multiple possible futures.`,
  },

  "m10-current-frontiers": {
    id: "m10-current-frontiers",
    title: "Current Frontiers in AI Research",
    explanation: `Active research frontiers include multimodal models (combining text, image, audio, video), reasoning and planning improvements, AI agents, long-context understanding, and more efficient training at lower cost. These frontiers matter because they signal where capability will grow fastest in the near term.

Understanding frontiers also reveals where AI is still weak: reliable long-horizon planning, causal reasoning, genuine novelty beyond recombination, and robust performance on truly out-of-distribution inputs. Knowing the limits prevents over-reliance.`,
  },

  "m10-agi": {
    id: "m10-agi",
    title: "Artificial General Intelligence: Definitions and Timelines",
    explanation: `AGI is typically defined as AI that can perform any intellectual task a human can perform at human level or above. Current AI systems are narrow: extremely capable within domains but brittle outside them. Whether and when AGI will arrive is genuinely uncertain — expert estimates range from years to never.

The productive framing is not "when is AGI coming" but "what capabilities are still missing from today's systems, and how quickly are those gaps closing?" That question has a more tractable answer and is more useful for near-term planning.`,
  },

  "m10-governance": {
    id: "m10-governance",
    title: "AI Governance: Regulation and Oversight",
    explanation: `AI governance covers the laws, standards, and institutional structures that shape how AI is developed and deployed. The EU AI Act, the US Executive Order on AI, and emerging international frameworks are setting rules around transparency, safety testing, and high-risk use cases.

For practitioners, governance means two things: knowing which regulations apply to your use case, and building systems that can demonstrate compliance (documentation, audit trails, human oversight). Governance is becoming a product requirement, not just a legal formality.`,
  },

  "m10-careers": {
    id: "m10-careers",
    title: "AI Careers and Professional Relevance",
    explanation: `AI is creating new roles (AI engineer, prompt engineer, AI ethics analyst, ML ops engineer) while transforming existing ones. Roles most at risk are those centred on routine information processing; roles gaining value are those requiring judgment, creativity, oversight, and communication.

Staying relevant requires building an AI-literacy layer on top of your existing domain expertise, not replacing your expertise with AI knowledge. The combination of deep domain knowledge plus AI capability is more valuable than either alone.`,
  },

  "m10-personal-strategy": {
    id: "m10-personal-strategy",
    title: "Personal AI Strategy: Planning for a Changing Field",
    explanation: `A personal AI strategy answers: which AI tools will I invest in learning deeply, which workflows will I rebuild with AI assistance, how will I stay current without being overwhelmed, and what are my non-negotiables around privacy and responsible use?

Good strategy is specific and revisable. Commit to two or three tools, build habits, and schedule a quarterly review. The goal is a durable practice of human-AI collaboration, not a one-time adoption event.`,
  },

  // MODULE 0: Card Components
  "m0-hero-visual-guide": {
    id: "m0-hero-visual-guide",
    title: "Module Visual Guide Hero",
    explanation: `This module overview card sets the structure and pace for your AI learning journey. Visual guides work because they give your brain a map before diving into details. When you know the full sequence-Welcome, What is AI, How machines learn, through to the Future of AI-you understand not just individual concepts but how they connect.

This layout signal means "follow this sequence; each section builds on the last." That structure is not arbitrary. It mirrors how professionals actually learn AI: definitions first, mechanisms second, applications third, then future considerations.`,
  },

  "m0-why-ai-shift": {
    id: "m0-why-ai-shift",
    title: "The Shift Happening Around You",
    explanation: `This card highlights the three biggest shifts in how AI changes work and thinking: search becoming answer-first, writing becoming draft-first, and coding becoming intent-first. These shifts matter because they signal capability changes, not just feature updates.

When search becomes answer-first instead of link-first, it means you trust the AI to synthesize instead of you doing the synthesis. That's a behavior change. When writing becomes draft-first, it means your role shifts from blank-page paralysis to refinement and iteration. Understanding these shifts helps you adapt faster than peers who treat AI as a simple tool instead of a mindset change.`,
  },

  "m0-reality-check-stat-1": {
    id: "m0-reality-check-stat-1",
    title: "100M Users Adoption Speed",
    explanation: `This statistic grounds you in the speed of AI adoption. Generative AI reached 100 million users faster than nearly any consumer technology wave-faster than the internet, faster than smartphones. Understanding adoption speed matters for your career planning: if everyone else is learning AI slowly, your early fluency creates unusual advantage.

But adoption speed also comes with hype cycles. Fast adoption means rapid claims, rapid failures, and rapid iteration. Being an early learner means tolerating uncertainty and building habits that transfer when specific tools change.`,
  },

  "m0-reality-check-stat-2": {
    id: "m0-reality-check-stat-2",
    title: "30+ Times Per Day AI Interaction",
    explanation: `Most people interact with AI 30+ times daily without noticing. This matters because it shows AI's true invisibility. You're not choosing to use AI; you're encountering it embedded in products you already use.

Understanding this widespread invisibility helps you recognize that "learning AI" isn't optional or niche. It's about understanding systems that already shape your information, recommendations, and decisions. This invisibility also means most people remain unaware of AI's influence, which puts early learners at an advantage.`,
  },

  "m0-reality-check-stat-3": {
    id: "m0-reality-check-stat-3",
    title: "Every Industry Redesign",
    explanation: `AI is not changing one industry; it's changing every industry. Healthcare, law, finance, education, and retail are all redesigning workflows simultaneously. This universality means no matter your field, AI literacy translates directly to your work.

The implication for your learning is that this course concepts-not tool names-are what transfer. You're learning principles that apply from healthcare to retail to education. Master those principles now, and you're prepared for change in any industry context.`,
  },

  "m0-reality-check-stat-4": {
    id: "m0-reality-check-stat-4",
    title: "Beginner Edge and Leverage",
    explanation: `Learners who build prompting and verification habits now create leverage that compounds. This is the core value proposition of early learning. You're not learning AI to impress people with jargon. You're learning AI to build habits while the field is still young enough that your choices compound.

In 5 years, everyone will expect AI literacy the way they now expect email literacy. Learning now, while habits are still being formed, means you develop intuition instead of mechanical training on standardized tools. That intuition is what transfers when tools change.`,
  },

  "m0-microwins-intro": {
    id: "m0-microwins-intro",
    title: "Micro-Wins for Introduction Section",
    explanation: `"Micro-wins" are small, verifiable achievements you can point to after each section. They matter for learning because big goals feel abstract, but micro-wins feel concrete. Instead of "learn AI," it's "explain why AI matters in one sentence." Instead of "understand AI," it's "name one place AI is changing my role."

Cognitive psychology shows that concrete, achievable milestones improve motivation and retention far more than abstract goals. After this section, you should feel like you've accomplished something specific, not just consumed content. That feeling compounds across modules.`,
  },

  "m0-success-by-week": {
    id: "m0-success-by-week",
    title: "Success Criteria by End of Week",
    explanation: `This card sets clear operational endpoints. "Explain AI in plain language," "identify three daily tools," "run one low-risk workflow," "use verification habits." These aren't feelings; they're doable actions.

By tying your learning to concrete actions, you shift from passive reading to active practice. Research shows people remember 10% of what they read but 70% of what they practice. These success criteria are your practice checklist.`,
  },

  "m0-day-in-life-card": {
    id: "m0-day-in-life-card",
    title: "From Morning to Night Daily AI Interactions",
    explanation: `This card walks you through a realistic day and shows where AI appears. Starting with 7:30 AM search all the way through 4:30 PM coding, you see AI is not one app. It's embedded across your entire day in search, navigation, social, writing, and coding.

Understanding this pervasiveness helps you recognize that learning AI is not learning a tool; it's understanding a principle-predicting and ranking and generating-that appears everywhere. By seeing the principle under different surfaces, you build transfer knowledge that works beyond any single application.`,
  },

  "m0-daily-ai-search": {
    id: "m0-daily-ai-search",
    title: "7:30 AM - Search Daily Touchpoint",
    explanation: `Search AI doesn't just return links anymore; it interprets your intent, rewrites your query, and ranks results by relevance. This touchpoint shows how AI shifts your role from "do research" to "ask and evaluate." Understanding this shift helps you see what's already different in your day.`,
  },

  "m0-daily-ai-maps": {
    id: "m0-daily-ai-maps",
    title: "8:10 AM - Maps Daily Touchpoint",
    explanation: `Traffic prediction is a concrete example of how AI predicts future states you can't predict yourself. Knowing that models predict congestion ahead of time shows you a realistic AI capability: predicting patterns from historical data, not reasoning from first principles.`,
  },

  "m0-daily-ai-social": {
    id: "m0-daily-ai-social",
    title: "12:20 PM - Social Media Daily Touchpoint",
    explanation: `Feed ranking decides what you see, what gets buried, and what goes viral. This is the most consequential AI in your day, but also the most invisible. Understanding that your information diet is shaped by ranking algorithms helps you think critically about what you're seeing online.`,
  },

  "m0-daily-ai-writing": {
    id: "m0-daily-ai-writing",
    title: "2:00 PM - Writing Daily Touchpoint",
    explanation: `Writing assistants have moved from spell-checking to suggesting entire sentences. This represents a shift in how AI augments creative work: not doing the work but accelerating thinking. Understanding this augmentation model helps you use these tools effectively without losing your voice.`,
  },

  "m0-daily-ai-coding": {
    id: "m0-daily-ai-coding",
    title: "4:30 PM - Coding Daily Touchpoint",
    explanation: `Code generation is where AI reads context and generates relevant code suggestions. Even if you're not a programmer, understanding that AI can "understand" code context shows how AI works across different domains-it learns patterns, not just language.`,
  },

  "m0-ai-visibility-categories": {
    id: "m0-ai-visibility-categories",
    title: "How Visible Is the AI?",
    explanation: `Not all AI is equally visible to users. This card categorizes by visibility level-from highly visible (chat assistants) to mostly invisible (fraud detection). Understanding visibility helps you recognize that the most consequential AI often disappears into product experience.

This matters for your future because invisible AI systems may have more impact on your life than visible ones. Learning to question and understand systems you can't see directly is an advanced but essential skill.`,
  },

  "m0-before-and-after": {
    id: "m0-before-and-after",
    title: "Before and After Transformation",
    explanation: `This card shows the before-and-after contrast: before the course, AI feels impressive but confusing; after, you can prompt, verify, and apply. Showing this contrast motivates learning by making the endpoint concrete.

The before-and-after structure works because it gives your brain a goal post. You're not learning abstract concepts; you're moving from one state to another. That framing improves motivation and retention.`,
  },

  "m0-transformation-phase-1": {
    id: "m0-transformation-phase-1",
    title: "Phase 1: Understanding AI",
    explanation: `Phase 1 covers the foundational layer: What is AI, how did it develop, what are its types, and what can and cannot it do. These foundations matter because without them, using AI is like using a tool you don't understand.

Understanding this phase is intentional scaffolding. You cannot effectively prompt models without understanding what prompts do, and you cannot understand that without knowing how models work. Foundations come first for a reason.`,
  },

  "m0-transformation-phase-2": {
    id: "m0-transformation-phase-2",
    title: "Phase 2: Using AI",
    explanation: `Phase 2 shifts from concept to practice: how do language models actually work, how do you talk to them effectively, and what tools exist for everyday use. This phase is where theory becomes action.

The shift from Phase 1 to Phase 2 represents a learning transition: from reading about AI to doing with AI. This transition is where real skill develops-not from knowing definitions but from practicing prompting and learning from feedback.`,
  },

  "m0-transformation-phase-3": {
    id: "m0-transformation-phase-3",
    title: "Phase 3: Thinking & Building",
    explanation: `Phase 3 integrates everything: ethics, safety, workflow design, your first project. This phase assumes you understand AI and can use it; now you need to use it responsibly and strategically.

Phase 3 is where AI learning becomes adult. You're not just learning capability; you're learning judgment, accountability, and strategic thinking about when and how to apply AI.`,
  },

  "m0-capabilities-outcome": {
    id: "m0-capabilities-outcome",
    title: "Three Capabilities After Course",
    explanation: `This card names three concrete capabilities: Communication (explain AI to others), Execution (use AI for productivity), Judgment (spot weak outputs). These three represent the full stack: knowledge, skill, and judgment.

By naming these three specifically, you're moving from vague goals ("learn AI") to measurable ones. At the end, you should be able to point to each of these three and say you've improved meaningfully.`,
  },

  "m0-microwins-transformation": {
    id: "m0-microwins-transformation",
    title: "Micro-Wins for Transformation Section",
    explanation: `After the transformation section, your micro-wins are: describe your before-and-after state, know the exact sequence, name three concrete gains. These are all verifiable, not aspirational.

Breaking learning into micro-wins makes progress visible and compounds confidence. Each small win signals that the next section is achievable.`,
  },

  "m0-learning-system-time": {
    id: "m0-learning-system-time",
    title: "Learning System: Time Commitment",
    explanation: `This card specifies 20-30 minutes per session, 4-5 sessions per week. Being explicit about time commitment sets expectations and makes the course achievable rather than overwhelming.

Realistic time expectations improve completion rates and skill retention. You're not committing to "learning AI"; you're committing to specific, achievable time blocks.`,
  },

  "m0-learning-system-pacing": {
    id: "m0-learning-system-pacing",
    title: "Learning System: Pacing",
    explanation: `"One section at a time" prevents overwhelm. Chunking learning into sections with clear endpoints improves retention and keeps motivation high. This pacing card signals that the course expects steady, sequential progress rather than cramming.`,
  },

  "m0-learning-system-mindset": {
    id: "m0-learning-system-mindset",
    title: "Learning System: Mindset",
    explanation: `"Learn by doing" is the core. The mindset card explicitly endorses a practice-based approach: prompt, test, refine, reflect. This mindset is critical because passive reading without application is one of the least effective ways to learn complex skills.

By framing the mindset card, you're setting expectations that this course values iteration and practice over passive consumption.`,
  },

  "m0-learning-system": {
    id: "m0-learning-system",
    title: "Your Practical Learning System",
    explanation: `This card introduces the three pillars of effective AI learning in this course: Time (short, consistent sessions), Pacing (spaced learning), and Mindset (learn by doing). Understanding this system helps you optimize your learning approach and build sustainable habits rather than cramming knowledge passively.`,
  },

  "m0-learning-tips-sequence": {
    id: "m0-learning-tips-sequence",
    title: "Learning Tip 1: Go in Sequence",
    explanation: `Each section compounds on the previous one. This tip addresses a common temptation: skipping sections to jump to the interesting part. The card explains why sequence matters: without foundations, later sections are harder to understand.

This structure forces deeper thinking than non-linear learning because you build on scaffolding rather than trying to learn in isolation.`,
  },

  "m0-learning-tips-microwins": {
    id: "m0-learning-tips-microwins",
    title: "Learning Tip 2: Collect Micro-Wins",
    explanation: `After each section, write one practical thing you can now do. This captures the concrete value you gained. The repetition of the micro-win concept across the module signals its importance.

Collecting micro-wins forces metacognition: you're asking yourself what actually changed, not just what you consumed. That self-reflection improves retention.`,
  },

  "m0-learning-tips-practice": {
    id: "m0-learning-tips-practice",
    title: "Learning Tip 3: Practice Immediately",
    explanation: `Apply each concept in a real tool the same day you learn it. This addresses the forgetting curve: immediate application locks concepts into memory far better than delayed practice.

By making immediate application a specific tip, the course is telling you that reading alone is insufficient. You need to close the feedback loop the same day.`,
  },

  "m0-learning-tips-verify": {
    id: "m0-learning-tips-verify",
    title: "Learning Tip 4: Verify Before Trust",
    explanation: `Treat AI output as draft until key facts are checked. This tip embeds verification as a habit from the start. By making verification a learning habit, not an afterthought, you're training yourself for safe AI use from day one.`,
  },

  "m0-learning-tips-momentum": {
    id: "m0-learning-tips-momentum",
    title: "Learning Tip 5: Keep Momentum",
    explanation: `Consistency beats intensity. Short daily sessions win over cramming. This tip acknowledges that learning complex topics requires repetition and spacing, not marathon efforts.

By valuing consistency explicitly, the course is setting expectations that align with learning science, not with how people usually approach online courses (sporadic, heavy, then abandonment).`,
  },

  "m0-self-assessment-form": {
    id: "m0-self-assessment-form",
    title: "Interactive Self-Assessment",
    explanation: `This self-assessment card measures your current AI confidence and habits: how confident you are explaining AI, how you treat good outputs, how often you experiment, and what mindset you hold.

Self-assessment works because it forces reflection rather than passive answering. By categorizing yourself early (Explorer, Builder, or Accelerator profile), you're setting a baseline you can track as you progress through the course.`,
  },

  "m0-ai-touchpoints-action": {
    id: "m0-ai-touchpoints-action",
    title: "Action Task: Find 3 AI Touchpoints",
    explanation: `This card asks you to name three specific ways you interact with AI already. Making it specific ("Maps rerouting my commute") instead of vague forces real reflection. You can't complete this task through passive reading; you have to think about your actual day.

This is where learning becomes personal. By forcing you to map AI onto your own life, the card transforms abstract AI concepts into concrete reality.`,
  },

  "m0-learning-commitment": {
    id: "m0-learning-commitment",
    title: "Commit to Learning System",
    explanation: `This card asks you to commit to specific learning behaviors: four 20-30 minute sessions per week, completing interactions before moving on, testing real use cases, and verifying outputs.

Commitment cards work because they ask for explicit choice rather than implicit intention. You're making a public commitment to yourself, which increases follow-through.`,
  },

  "m0-key-takeaways": {
    id: "m0-key-takeaways",
    title: "Module 0 Key Takeaways",
    explanation: `This card summarizes the four big ideas: AI is embedded in your day already, you have a clear transformation path, results depend on pacing and habits, and you've made personal AI touchpoints visible.

Summary cards work because they anchor learning. Instead of trying to remember 50 small points, you remember four big ideas. Those four ideas then organize the smaller points.`,
  },

  "m0-capabilities-after-course": {
    id: "m0-capabilities-after-course",
    title: "What You Will Be Able to Do",
    explanation: `Communication, Execution, Judgment. These three represent the full arc: understanding, skill, and critical thinking. By stating these upfront in Module 0, the course is creating anchor points you'll reference through all 10 modules.

Stating desired outcomes upfront improves learning because your brain filters for relevant information. You'll notice things that connect to these three outcomes more readily than random content.`,
  },

  "m0-completion-checklist": {
    id: "m0-completion-checklist",
    title: "Module 0 Completion Checklist",
    explanation: `The final checklist asks: can you explain the three-phase arc, understand why order matters, name three AI touchpoints, and challenge myths instead of memorizing hype. These four questions verify that you've internalized the module's core messages.

Checklists work because they're concrete. You either can or cannot explain the three phases. That binary clarity helps you know when you've actually learned versus when you've just consumed content.`,
  },

  // MODULE 1: Card Components
  "m1-defining-ai-five-buckets": {
    id: "m1-defining-ai-five-buckets",
    title: "Five Capability Buckets for AI Tasks",
    explanation: `AI systems cluster into five capability areas: Perception (seeing images), Language (understanding text), Reasoning (solving problems), Learning (improving from data), and Action (controlling systems). This categorization helps you think about what different AI systems are trained to do.

Understanding these buckets prevents confusion when comparing AI systems. A system excellent at perception might be weak at reasoning. Recognizing this differentiation helps you evaluate claims and choose appropriate tools for specific problems.`,
  },

  "m1-ai-vs-traditional": {
    id: "m1-ai-vs-traditional",
    title: "AI vs Traditional Software Comparison",
    explanation: `Traditional software follows explicit rules written by programmers. AI software learns patterns from data. This fundamental difference determines what's possible: rule-based systems are interpretable but brittle; AI systems are flexible but less interpretable.

This comparison card teaches decision-making: when should you use rules, and when should you use AI? The answer depends on whether your problem is well-defined (use rules) or complex and pattern-rich (use AI).`,
  },

  "m1-real-world-cases": {
    id: "m1-real-world-cases",
    title: "Real-World Case Studies",
    explanation: `Real case studies ground abstract concepts in concrete outcomes. When you see how Netflix uses AI for recommendations, how hospitals use AI for diagnosis, how banks use AI for fraud detection, you understand that AI is not theoretical. It's already reshaping industries.

Case studies also teach risk awareness: case studies should include failures and limitations, not just successes. Understanding where AI fails in real situations is as important as understanding where it succeeds.`,
  },

  "m1-module-overview": {
    id: "m1-module-overview",
    title: "Module 1 Overview Checklist",
    explanation: `This card previews the module structure and sets expectations. You'll learn definitions, history, types, and applications-moving from abstract to concrete.

Overview checklists improve learning because they activate prior knowledge and create anticipation. Your brain is now ready to filter for these specific topics as you move through the module.`,
  },

  "m1-three-key-words": {
    id: "m1-three-key-words",
    title: "Three Key Words You Will Know",
    explanation: `Machine learning, neural networks, and model are three foundational terms you'll master. Defining these early helps you build terminology scaffolding for the rest of the module.

Introducing key terms upfront improves reading comprehension. As you encounter these words throughout the module, they're not novel; they're reinforcement of familiar concepts.`,
  },

  "m1-two-truths": {
    id: "m1-two-truths",
    title: "Two Truths to Hold",
    explanation: `AI is already reshaping work and thinking AND it remains deeply limited. This framing prevents two common errors: dismissing AI as insignificant or treating it as omnipotent.

Holding two seemingly contradictory truths simultaneously is cognitively harder than picking one. But this cognitive complexity is where realistic thinking happens. The module is training you to think in nuance.`,
  },

  "m1-ai-history-timeline": {
    id: "m1-ai-history-timeline",
    title: "AI History Timeline",
    explanation: `AI history teaches you patterns: hype cycles, AI winters where progress stalled, breakthroughs requiring data and computation maturity. Understanding these cycles inoculates you against present-day hype.

History is a thinking tool. When someone makes a future prediction, you evaluate it against historical patterns. This is how history teaches judgment, not just facts.`,
  },

  "m1-ai-narrow-general-super": {
    id: "m1-ai-narrow-general-super",
    title: "Narrow vs General vs Super AI",
    explanation: `Narrow AI (good at specific tasks), General AI (theoretical, human-level reasoning), and Superintelligence (hypothetical, beyond human) are fundamentally different capability levels. Confusing these categories is the source of most AI hype and fear.

Understanding these categories helps you parse public AI debates. When someone claims AGI is coming, you can ask precisely: what evidence are they presenting, and does it suggest narrow AI progress or genuine general intelligence? That distinction changes everything.`,
  },

  "m1-prompting-challenge": {
    id: "m1-prompting-challenge",
    title: "Your First Useful Win: AI Prompt Challenge",
    explanation: `This interactive exercise tests how instruction structure changes output quality. You'll prompt an AI system, inspect results, refine constraints, and rerun-a cycle that builds operational skill.

Interactive exercises are more memorable than reading. This hands-on challenge creates muscle memory for prompting before you even reach the prompting module.`,
  },

  "m1-myths-vs-reality-card": {
    id: "m1-myths-vs-reality-card",
    title: "Myths vs Reality: Key Distinctions",
    explanation: `Misconceptions are sticky. Once you believe them, they persist even after learning the truth. This card directly confronts myths: AI understands versus AI predicts text, AI reasons versus AI patterns, AI is conscious versus AI is statistical.

This confrontation works because it primes your brain to notice the distinction. When you encounter claims later, you'll filter them through these myth-reality distinctions.`,
  },

  "m1-writing-assistants-card": {
    id: "m1-writing-assistants-card",
    title: "In Practice: AI Writing Assistants",
    explanation: `Writing assistants are concrete applications that demonstrate text generation capability without anthropomorphizing. A writing assistant may claim to "write perfect emails," but it generates text from training patterns, not from situation understanding.

This practical grounding prevents magical thinking. You can evaluate a writing assistant's capabilities without assuming it has comprehension.`,
  },

  "m1-image-generation-card": {
    id: "m1-image-generation-card",
    title: "In Practice: AI Image Generation",
    explanation: `Image generation uses the same underlying principle as text generation: predicting patterns learned from training data, applied to a new modality. This comparison helps you generalize: the principle (pattern prediction) is stable; the surface (text, image, code) varies.

Understanding the principle underneath different applications is what lets you transfer knowledge to new tools as they emerge.`,
  },

  "m1-productivity-card": {
    id: "m1-productivity-card",
    title: "In Practice: AI for Productivity",
    explanation: `AI's immediate value is augmentation, not replacement. Programmers using Copilot don't become obsolete; they become more productive. Researchers using AI literature summaries explore broader terrain. This reframing from threat to tool is essential for realistic adoption.

Understanding augmentation helps you use these tools wisely instead of fearing them or overrelying on them.`,
  },

  "m1-creative-work-card": {
    id: "m1-creative-work-card",
    title: "In Practice: AI in Creative Work",
    explanation: `Creative AI becomes less mysterious when you ask: which parts of creativity come from pattern recombination, and which depend on human intention? Current systems are strong at pattern recombination, weak at intentionality and taste.

This analysis helps you use creative AI realistically-for ideation and exploration, not for final authorship.`,
  },
};


/**
 * Get an explanation for a component by searching the mapping.
 */
export function getComponentExplanation(componentId: string): ComponentExplanation | undefined {
  return COMPONENT_EXPLANATIONS[componentId];
}

/**
 * Get all explanations for a specific module
 */
export function getModuleExplanations(moduleNumber: number): ComponentExplanation[] {
  const prefix = `m${moduleNumber}-`;
  return Object.values(COMPONENT_EXPLANATIONS).filter((exp) => exp.id.startsWith(prefix));
}

/**
 * Search for explanations by keyword
 */
export function searchExplanations(query: string): ComponentExplanation[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(COMPONENT_EXPLANATIONS).filter((exp) => exp.title.toLowerCase().includes(lowerQuery) || exp.explanation.toLowerCase().includes(lowerQuery));
}
