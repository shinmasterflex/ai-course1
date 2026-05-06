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
    explanation: `This opening section defines the scope of the course: understanding what modern AI systems are, how they make predictions, where they fail, and how to use them responsibly in real work.

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

  "m0-day-in-life": {
    id: "m0-day-in-life",
    title: "A Day in Your Life With AI",
    explanation: `This scenario shows that AI appears as many small decisions across a normal day: ranking search results, filtering inboxes, prioritizing notifications, generating drafts, and scoring risk.

Most of these systems are narrow models optimized for one objective, such as click-through, response speed, or spam reduction. They feel seamless because the model is embedded in product workflows rather than exposed as a visible AI feature.

Seeing these touchpoints together clarifies a core idea: AI impact is cumulative. Many low-visibility predictions can shape what information you see, which options you choose, and how quickly you complete work.`,
  },

  "m0-transformation-arc": {
    id: "m0-transformation-arc",
    title: "Your Transformation Arc",
    explanation: `This arc tracks the progression from AI awareness to AI decision quality. Early sections establish terminology and model types; middle sections explain mechanisms and prompting; later sections cover risk, governance, and real-world adoption.

That progression reflects how AI maturity develops in teams. Organizations typically fail when they jump directly to tools without shared definitions, clear limits, or evaluation criteria.

By moving from fundamentals to application, this module path builds the same dependency chain used in production work: understand what the system is, understand how it behaves, then decide where it should or should not be trusted.`,
  },

  "m0-how-to-learn": {
    id: "m0-how-to-learn",
    title: "How to Take This Course Effectively",
    explanation: `This section explains how the course content is meant to build practical AI fluency: combining concept cards, worked examples, and interactive tasks so each topic is tied to decision-making rather than isolated facts.

The sequence matters because AI competence depends on integrating several views at once: mechanism, performance limits, risk, and business context. Skipping one layer often leads to overconfidence in another.

As you move through modules, use each interaction to test whether a concept changes an actual choice, such as prompt design, tool selection, review requirements, or risk controls. That is the threshold for usable AI understanding.`,
  },

  "m0-self-assessment": {
    id: "m0-self-assessment",
    title: "What Do You Know Already?",
    explanation: `This check establishes your starting model of AI: what you believe about capabilities, limits, and risk. That baseline matters because many common assumptions about AI are inaccurate but plausible.

Typical gaps include confusing automation with machine learning, overestimating model reasoning, and underestimating data-quality effects. Identifying those gaps early prevents downstream errors in tool use and interpretation.

Use this checkpoint as a calibration reference. When you reach later modules, compare your updated answers to your initial assumptions to see which beliefs changed and why.`,
  },

  // MODULE 1: What Is AI?
  "m1-hero": {
    id: "m1-hero",
    title: "Module 1: What Is Artificial Intelligence?",
    explanation: `You're beginning the conceptual foundation of the entire course. This module answers the most fundamental question: what exactly is AI? Without a grounded definition, all subsequent learning gets fuzzy.

Notice the module is structured around history, definition, types, then applications. This is pedagogically intentional. By learning history first, you understand *why* AI developed certain characteristics. You'll see how problems drive innovation. This historical context creates deeper understanding than jumping straight to technical definitions.

      The module culminates in applications, showing you AI in concrete tools you might use. This arc from abstract (definition) to concrete (applications) helps your brain construct robust understanding that works in both directions.`,
  },

  "m1-defining-ai": {
    id: "m1-defining-ai",
    title: "Defining AI: What Makes AI Different?",
    explanation: `This definition section is fighting against common misconceptions. Many people define AI by tools (ChatGPT, robots) rather than by what actually characterizes AI: systems that learn from data and improve without being explicitly programmed for every scenario.

This section emphasizes scientific precision: definitions determine what counts as AI versus automation. A thermostat isn't AI (it follows a fixed rule: if temp < 70, heat). A learning algorithm that adapts its recommendations is AI.

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
    explanation: `This section distinguishes between what exists now (narrow AI), what theoretically could exist (general AI), and what's pure speculation (superintelligence). These distinctions matter because the media often conflates them, creating confusion and unfounded fears.

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
    explanation: `Misconceptions are notoriously sticky. Once believed, they persist even after you've learned correct information. This section directly confronts common myths-not to mock them, but to inoculate you against them.

The section combines AI literacy with media literacy. In a hype-heavy environment, distinguishing substantiated claims from exaggeration is essential for reliable decision-making.

Myths that feel initially plausible are often the most operationally risky. Tracking those patterns helps prevent future misjudgments when evaluating new AI claims.`,
  },

  "m1-writing-assistants": {
    id: "m1-writing-assistants",
    title: "In Practice: AI Writing Assistants",
    explanation: `This section transitions from abstract concepts to concrete tools. Research shows that abstract knowledge is much harder to retain than knowledge anchored to examples. By seeing AI writing assistants as specific instances of the broader AI concepts you've learned, you're consolidating abstract knowledge into concrete understanding.

A key outcome is separating marketing claims from actual capability. A writing assistant may claim to "write perfect emails," but it generates text from training patterns and lacks real situational understanding. That precision prevents over-reliance.

    Consider: Where could you use a writing assistant? Where would it fail? This critical application of knowledge-recognizing both possibilities and limitations-is advanced learning.`,
  },

  "m1-image-generation": {
    id: "m1-image-generation",
    title: "In Practice: AI Image Generation",
    explanation: `Image generation is conceptually similar to text generation-predicting the next pixel based on patterns-but feels qualitatively different to users. This section helps you understand that the underlying mechanism is consistent even when outputs feel different.

The important move is seeing through surface differences to underlying mechanisms. DALL-E and ChatGPT use related statistical learning principles even though outputs differ by modality.

    There's also an ethical dimension here: AI-generated images raise questions about copyright, authenticity, and labor. By understanding how these systems work, you can form more informed ethical positions rather than reacting emotionally to the existence of the technology.`,
  },

  "m1-productivity": {
    id: "m1-productivity",
    title: "In Practice: AI for Productivity",
    explanation: `This section makes a crucial point: AI's most immediate value for individuals isn't replacing jobs; it's augmenting existing work. A programmer using Copilot doesn't become obsolete; they become more productive. A researcher using AI literature summaries can explore broader terrain.

The section frames AI as workflow augmentation rather than cognitive replacement. That framing supports realistic adoption: use models for leverage while preserving human judgment.

For each productivity example, the practical question is where the tool fits in an existing workflow and what verification burden it introduces. That mapping is what enables implementation.`,
  },

  "m1-creative-work": {
    id: "m1-creative-work",
    title: "In Practice: AI in Creative Work",
    explanation: `This section tackles an emotionally charged topic: Can AI be creative? The answer depends on how you define creativity. If creativity means "generating novel combinations," then yes. If it means "expressing human intentionality and emotion," then it's more complicated.

It pushes beyond "AI can create / AI cannot create." Current systems perform some creative sub-tasks well and others poorly. A musician using AI-generated backing tracks is augmenting process, not replacing authorship.

This section also touches on fundamental questions about authorship and ownership. By engaging with these questions thoughtfully, you're preparing yourself for ethical decisions you'll make in the future. These aren't abstract questions; they're increasingly real as AI tools become commonplace.`,
  },

  "m1-choosing-tools": {
    id: "m1-choosing-tools",
    title: "Choosing the Right Tool for the Job",
    explanation: `This capstone section in the applications section teaches decision-making frameworks. You have ChatGPT, DALL-E, Copilot, and others. When do you use which? How do you choose?

The focus is meta-strategy: select tools by task requirements, tradeoffs, and privacy constraints rather than memorizing point-in-time tool lists. As tools change, this framework remains stable.

      This section also connects back to conceptual foundations: each tool has particular strengths because of its underlying architecture and training data. By reasoning from principles (what each tool is good at) rather than memorizing (tool X is for task Y), you're building knowledge that actually transfers to new situations.`,
  },

  "m1-quiz": {
    id: "m1-quiz",
    title: "Module 1 Mastery Check",
    explanation: `This checkpoint tests whether you can separate core AI categories and claims under realistic ambiguity. The key outcomes are distinguishing automation from learning systems, narrow AI from speculative AGI, and capability from marketing language.

Strong performance here means you can evaluate statements about AI without relying on brand names or hype narratives. You should be able to justify why a claim is accurate, overstated, or unsupported based on definitions and historical evidence.

The same reasoning appears in later modules when choosing tools and setting risk controls. If category boundaries are unclear at this stage, downstream decisions become noisy and harder to defend.`,
  },

  // MODULE 2: How Machines Learn
  "m2-hero": {
    id: "m2-hero",
    title: "Module 2: How Machines Learn",
    explanation: `You now move from "what is AI" to "how does AI actually work?" This mechanistic understanding is crucial. Without it, AI seems like magic. With it, you can reason about possibilities and limitations.

This module focuses on learning itself. How does a system improve from experience? What role does data play? What can go wrong? These questions are the foundation of machine learning literacy.

The module is structured around problem-solving: we pose a learning challenge, then show you how machines approach it. This problem-first structure means you understand the *why* behind each technique, not just the what. That makes the knowledge much more memorable and transferable.`,
  },

  "m2-what-is-ml": {
    id: "m2-what-is-ml",
    title: "What Is Machine Learning?",
    explanation: `Machine learning is fundamentally about learning from data rather than following explicit rules. A programmer writes 100 rules for how to detect spam; a machine learning system learns patterns from thousands of spam and non-spam examples.

This distinction-rules vs. patterns-is crucial. It determines what's possible. Rules are interpretable but brittle; they break when new situations arise that weren't foreseen. Patterns are flexible but less interpretable; they work well on typical cases, but you might not understand exactly why they made a particular decision.

This builds your ability to think about trade-offs. There's no universally "best" approach; different approaches make different sacrifices. Understanding this prevents naive thinking like "just use machine learning for everything." Sometimes explicit rules are better. Sometimes you don't have enough data. Critical thinking means considering which approach suits which problem.`,
  },

  "m2-training-data": {
    id: "m2-training-data",
    title: "Training Data: The Fuel of Learning",
    explanation: `Here's a critical insight: the quality and characteristics of training data directly determine what a machine learning system can learn. Garbage in, garbage out. But also: patterns of the training data, biases of the training data, and limitations of the training data all directly show up in the system's behavior.

This understanding is crucial for your future. When someone says "AI has bias," they're often pointing to training data bias that's been learned by the system. When AI fails on edge cases, it's often because the training data didn't include those cases.

You're also learning to think critically about data collection. Who collected the data? For what purpose? What perspective does it reflect? These questions turn data from a neutral resource into an artifact with history and bias baked in. That's sophisticated thinking.`,
  },

  "m2-supervised-unsupervised": {
    id: "m2-supervised-unsupervised",
    title: "Supervised vs. Unsupervised Learning",
    explanation: `Supervised learning requires labeled data: examples where you know the right answer. Unsupervised learning finds patterns without labels. This distinction determines what's possible and how expensive the learning is.

Supervised learning is more accurate but requires labeled training data (expensive). Unsupervised learning is cheaper but finds patterns rather than answering specific questions. Different problems call for different approaches.

This section also teaches you to reason about practical constraints. Sometimes you don't have enough labeled data. Sometimes you want to discover new patterns, not just predict existing ones. Understanding these trade-offs means you can navigate real-world machine learning projects intelligently, even if you never write the code yourself.`,
  },

  "m2-neural-networks": {
    id: "m2-neural-networks",
    title: "Neural Networks Simply Explained",
    explanation: `Neural networks are inspired by (but very different from) biological brains. This section strips away the mystique. A neural network is a collection of mathematical functions that learn how to transform inputs into outputs by adjusting internal parameters based on training data.

That's less mysterious than it sounds. And that's the point. By understanding that neural networks are fundamentally sophisticated pattern-matchers, not thinking systems, you avoid anthropomorphizing them. They're powerful tools, not intelligence.

Understanding neural networks helps you reason about their limitations. They can learn complex patterns but are bad at novel situations. They need lots of data. They can be opaque-you don't always know why they made a particular decision. Knowing these limitations prevents overconfidence in their recommendations.`,
  },

  "m2-what-ai-cant-do": {
    id: "m2-what-ai-cant-do",
    title: "What AI Can't Do: Important Limitations",
    explanation: `This section is psychologically crucial: understanding limitations prevents disillusionment. Many AI disappointments come from people expecting more than is possible given current technology.

AI systems are pattern-matchers. They can't reason through novel logical problems from first principles. They can't understand causation-only correlation in training data. They can't truly generalize beyond their training distribution. They can't explain their reasoning in the way humans can.

These aren't fixable bugs; they're fundamental characteristics of how these systems work. By understanding them deeply, you set realistic expectations. And realistic expectations are the foundation of wise tool use. You don't ask AI to do things it can't do. You use it for what it's good at.`,
  },

  "m2-classification-exercise": {
    id: "m2-classification-exercise",
    title: "Hands-On Classification Challenge",
    explanation: `You're now learning by doing. You'll attempt to classify emails as spam or not spam, thereby experiencing the machine learning challenge firsthand. This experiential learning creates memory and intuition in ways that reading alone cannot.

Notice how even as a human, you're using pattern-matching to classify emails. You're looking for markers: misspellings, financial language, and formatting oddities. A machine learning system is doing something similar-learning what markers correlate with spam. By doing this classification yourself, you're building empathy for what the algorithm is learning.

When you make mistakes, pay attention to them. Why did you misclassify an email? What information would you need to make the right decision? This metacognitive reflection about your own classification process actually teaches you how machine learning systems learn.`,
  },

  "m2-quiz": {
    id: "m2-quiz",
    title: "Module 2 Mastery Check",
    explanation: `This checkpoint verifies mechanistic understanding of machine learning: how training data shapes behavior, why supervised and unsupervised approaches solve different problem types, and where model performance breaks down.

The questions are designed to test causal reasoning, not memorized terms. You should be able to trace a failure back to data coverage, label quality, objective mismatch, or distribution shift.

That diagnostic ability is essential for real AI work. Teams rarely fail because they forgot vocabulary; they fail because they cannot identify why a model underperformed and what constraint must change.`,
  },

  // MODULE 3: Large Language Models & Prompting
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
    explanation: `This section takes the abstract concept of language models and shows the mechanism. Text goes in, gets broken into tokens, passes through neural network layers, and emerges as predicted tokens. That process repeats until the model outputs a complete response.

You build the ability to reason about how systems transform information. Understanding this mechanism helps you predict behavior. If the model is pattern-matching from training data, then it will be good at questions similar to its training data and bad at novel questions. If it's predicting token by token, then errors can cascade (one wrong word biases subsequent predictions).

This mechanistic understanding makes you less gullible. When someone claims ChatGPT "understands" something, you know it's actually "very good at predicting text related to that topic." Those are very different claims with different implications.`,
  },

  "m3-prompt-anatomy": {
    id: "m3-prompt-anatomy",
    title: "The Anatomy of a Prompt: Structure Matters",
    explanation: `Not all prompts are equal. A well-structured prompt includes: context (what the system should know), the task (what you're asking for), constraints (limitations on the response), and examples (if helpful).

This section teaches you to craft prompts deliberately rather than casually. Good prompting is a skill that improves with practice. The difference between a vague prompt and a precise prompt can be enormous in output quality.

You're also learning to reason about why structure matters. Language models predict text based on patterns. By providing clear structure and examples, you're helping the model understand the pattern you want. Clear instructions work better than vague requests because they align better with training data patterns the model learned.`,
  },

  "m3-prompting-techniques": {
    id: "m3-prompting-techniques",
    title: "Effective Prompting Techniques: Chain-of-Thought and Beyond",
    explanation: `This section introduces techniques backed by research. Chain-of-thought prompting, for example, works because asking the model to "think step by step" produces more structured reasoning, which produces better results.

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
    explanation: `This checkpoint tests whether you can control model behavior through prompt design rather than trial-and-error guessing. Expected skills include specifying context, constraints, output format, and evaluation criteria.

You should be able to diagnose weak outputs by identifying which prompt component failed: missing context, ambiguous task definition, weak constraints, or absent examples.

This is foundational for reliable generative AI use. In production settings, prompt quality directly affects cost, consistency, and downstream review burden.`,
  },

  // MODULE 4: AI Tools for Everyday Life
  "m4-hero": {
    id: "m4-hero",
    title: "Module 4: AI Tools for Everyday Life",
    explanation: `You've learned foundations. Now you apply them. This module surveys the AI landscape of practical tools designed for everyday tasks: writing, images, productivity.

Rather than overwhelming you with every tool that exists, this module focuses on understanding tool categories and decision frameworks. New tools will emerge constantly. By understanding categories and how to evaluate tools, you'll be able to navigate new tools independently.

This section emphasizes transfer: taking abstract principles you've learned and applying them to concrete situations. This is where learning becomes powerful-not just knowing concepts but being able to use them.`,
  },

  "m4-writing-tools": {
    id: "m4-writing-tools",
    title: "Writing Tools: Beyond Spelling Checks",
    explanation: `Writing assistance has evolved from spell-check to generating entire paragraphs. This section shows you the range of capabilities and helps you think about when each is useful.

A spell-checker catches errors. A grammar tool suggests better phrasing. A generation tool creates content from prompts. These are qualitatively different capabilities with different use cases and different ethical implications.

This section builds discernment in tool use. Not every situation requires an AI assistant. Sometimes writing the email yourself is faster. Sometimes it's clearer. Understanding when tools help and when they don't is practical wisdom that makes you more effective.`,
  },

  "m4-image-tools": {
    id: "m4-image-tools",
    title: "Image Generation: Creating from Description",
    explanation: `Image generation tools let you create visuals from text descriptions. The capability is impressive, but understanding what it actually does-learning patterns in images and text to generate new images-prevents overvaluing the technology.

This helps you distinguish between "impressive" and "transformative." Image generation is impressive. But most businesses still need real photography and design. Understanding where generation fits into workflows (quick mockups, inspiration, prototyping) versus where it doesn't (final marketing materials, copyrighted images) is practical judgment.

This section also touches on ethical considerations: copyright issues, labor implications, authenticity in media. By engaging with these thoughtfully, you're preparing yourself to make ethical decisions about how to use these tools.`,
  },

  "m4-productivity-tools": {
    id: "m4-productivity-tools",
    title: "Productivity Assistants: Working Faster and Smarter",
    explanation: `AI productivity tools include code generation, research summarization, email drafting, and more. The common thread: they augment human capability. A programmer using Copilot doesn't write less code; they write more code and focus on higher-level decisions.

This augmentation model is crucial for your future. Rather than AI replacing work, you're using AI to do existing work differently and more effectively. That shift in perspective-from threat to tool-is empowering.

You're also learning to evaluate trade-offs. Does this tool save me time? At what cost? What quality issues might arise? What skills might I lose from not doing this manually? These practical questions matter more than theoretical AI capabilities.`,
  },

  "m4-quiz": {
    id: "m4-quiz",
    title: "Module 4 Mastery Check",
    explanation: `This checkpoint measures tool-selection judgment across writing, image, and productivity systems. The target is choosing based on task requirements, risk tolerance, and operational constraints rather than brand familiarity.

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
    explanation: `Before any analysis, you must collect data. This section shows how the collection process itself introduces bias. Who collects the data? What are they measuring? What are they not measuring?

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
    explanation: `This checkpoint validates whether you can reason through the data pipeline that drives model behavior: collection choices, quality controls, preprocessing, and feature construction.

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

This section moves beyond abstract ethics to practical decision-making. How do you decide whether to use a tool? What questions should you ask? What values matter to you? These personal questions don't have universal answers, but working through them is important.

It strengthens ethical reasoning skills. You won't agree with everyone on every issue. But you can reason carefully, consider different perspectives, and make principled decisions. That's what responsible use looks like.`,
  },

  "m6-ethical-dilemmas": {
    id: "m6-ethical-dilemmas",
    title: "Ethical Dilemmas: Real Scenarios with Competing Values",
    explanation: `This section presents realistic scenarios with no clean answers. A company wants to use AI to optimize hiring; it's cheaper but introduces bias. A government wants to use facial recognition for security; it's effective but violates privacy. What do you do?

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
    explanation: `This checkpoint evaluates whether you can identify and reason through AI risk domains such as bias, privacy loss, misinformation, and unsafe automation.

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

You're also learning that AI adoption requires more than the technology. Training, change management, and addressing worker concerns-these organizational factors often determine whether AI implementation succeeds or fails. Technology alone doesn't create value.`,
  },

  "m7-future-jobs": {
    id: "m7-future-jobs",
    title: "AI and the Future of Jobs: Disruption and Opportunity",
    explanation: `Some jobs will be disrupted by AI. Others will emerge. This section moves beyond fear-based thinking to strategic thinking. Which types of jobs are most vulnerable? Why? What new opportunities emerge?

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
    explanation: `This section moves from theoretical to practical. Real teams use AI in specific ways that solve specific problems. Understanding their workflows gives you concrete mental models to draw on.

This section uses examples. Case studies show what's possible and what's realistic. They show that AI adoption is messy and iterative, not clean and predetermined. Teams experiment. Some experiments work. Others fail. Learning continues.

Studying real workflows builds transferable pattern knowledge: where AI adds value, what blocks adoption, and how organizations adapt execution over time.`,
  },

  "m7-quiz": {
    id: "m7-quiz",
    title: "Module 7 Mastery Check",
    explanation: `This checkpoint measures strategic AI reasoning in organizational contexts: where AI creates measurable value, what adoption barriers exist, and which capabilities remain human-critical.

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
    explanation: `This section tackles a philosophical question. Creativity means novel, valuable productions. Does AI qualify? It generates novel combinations of patterns. Is that creativity?

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
    explanation: `This checkpoint tests whether you can reason about AI in creative and knowledge workflows without collapsing into either hype or dismissal.

The central distinction is augmentation versus replacement: where models accelerate exploration, drafting, and synthesis, and where human intent, taste, accountability, and context remain decisive.

Strong answers integrate mechanism and culture at once, recognizing both the technical capability of generative systems and the authorship, quality, and trust questions they introduce.`,
  },
};

/**
 * Get an explanation for a component by searching the mapping.
 * Can search by exact ID or by partial matching.
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
  return Object.values(COMPONENT_EXPLANATIONS).filter(
    (exp) =>
      exp.title.toLowerCase().includes(lowerQuery) || exp.explanation.toLowerCase().includes(lowerQuery),
  );
}




