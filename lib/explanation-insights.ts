/**
 * EXPLANATION INSIGHTS DATABASE
 * 
 * Comprehensive educational content that powers the Explanation Panel.
 * These insights provide deeper context, conceptual understanding, and
 * practical applications for learning elements across the course.
 */

export type InsightCategory = 
  | "ai-fundamentals"
  | "prompt-engineering"
  | "workflow-design"
  | "ethics-safety"
  | "advanced-techniques"
  | "tool-selection"
  | "practical-application"
  | "thinking-patterns"
  | "risk-management"

export interface EducationalInsight {
  title: string
  category: InsightCategory
  summary: string
  keyPoints: string[]
  deeperExplanation: string
  practicalApplication: string
  commonMisunderstandings: string[]
  relatedConcepts: string[]
}

export const explanationInsights: Record<string, EducationalInsight> = {
  // ============================================================
  // AI FUNDAMENTALS
  // ============================================================

  "what-is-ai": {
    title: "What Is Artificial Intelligence?",
    category: "ai-fundamentals",
    summary: "AI represents systems that can perform tasks requiring human-like intelligence, but through completely different mechanisms.",
    keyPoints: [
      "AI predicts patterns from training data rather than following hardcoded rules",
      "Modern AI (like large language models) operates through statistical relationships, not consciousness",
      "AI performance varies dramatically based on input quality, task design, and use case",
    ],
    deeperExplanation: `AI systems don't 'understand' in the human sense. They recognize statistical patterns in data and generate outputs that continue those patterns. A language model doesn't think through problems step-by-step the way humans do—it predicts the statistically most likely next word based on billions of examples. This is why AI can seem brilliant at some tasks and completely fail at others that seem simple to humans.

The key insight: AI is pattern-matching at scale, not understanding. This fundamentally changes how you design prompts and verify outputs. You're not communicating with intelligence; you're working with a probabilistic system that responds to patterns in your language.`,
    practicalApplication: `When you ask AI for help, frame your request to match patterns in its training data. If you want accuracy, provide examples or step-by-step frameworks. If you want creative output, use language that matches creative writing patterns. Understanding that AI works through pattern completion helps you write better prompts and set realistic expectations.`,
    commonMisunderstandings: [
      "AI isn't thinking or reasoning—it's very advanced pattern prediction",
      "AI doesn't know when it's wrong; it can confidently generate false information",
      "AI isn't conscious, sentient, or aware—these are anthropomorphic misinterpretations",
    ],
    relatedConcepts: ["prompt-engineering", "ai-limitations", "verification-importance"],
  },

  "how-llms-work": {
    title: "How Language Models Work",
    category: "ai-fundamentals",
    summary: "Language models are trained on vast amounts of text to predict patterns in language, then extended to solve various tasks.",
    keyPoints: [
      "Models are trained by predicting the next word in a sequence billions of times",
      "This training creates internal representations of language, concepts, and relationships",
      "The model then applies these representations to new tasks through prompt-based learning",
    ],
    deeperExplanation: `Large language models (LLMs) start with a deceptively simple task: predict the next word. During training on billions of text examples, they develop internal patterns that capture grammar, facts, reasoning, and relationships. These patterns aren't explicit rules—they're statistical distributions across millions of parameters.

When you give an LLM a prompt, it's not retrieving stored knowledge like a database. It's predicting what should come next based on patterns in training data. This is why LLMs can:
- Write coherently in multiple styles
- Solve problems they weren't explicitly trained on
- But also hallucinate facts and fail at logic

The model's "knowledge" is really pattern recognition frozen at training time. It can't learn from your conversation or access real-time information unless explicitly provided.`,
    practicalApplication: `Use this understanding to design prompts strategically. Provide examples to establish the pattern you want the model to follow. Give step-by-step frameworks to push it toward procedural thinking. Include relevant context so the model has the right patterns active. Verify outputs rigorously because the model's confidence doesn't indicate accuracy.`,
    commonMisunderstandings: [
      "LLMs don't retrieve facts from a database—they generate text based on patterns",
      "LLMs don't improve during conversation—they don't learn or remember between conversations",
      "High-confidence outputs can still be completely false ('hallucinations')",
    ],
    relatedConcepts: ["prompt-design", "context-window", "temperature-sampling"],
  },

  "ai-limitations": {
    title: "Critical AI Limitations You Must Know",
    category: "ai-fundamentals",
    summary: "AI is powerful but has fundamental constraints that affect reliability, creativity, and safety.",
    keyPoints: [
      "AI lacks real-time knowledge and can't access the internet unless explicitly enabled",
      "AI can confidently generate false information (hallucinations) indistinguishable from truth",
      "AI can amplify biases present in training data",
      "Context window limits how much information AI can consider at once",
    ],
    deeperExplanation: `Every AI system has hard limitations built into its design. These aren't bugs to be fixed—they're fundamental constraints:

**Knowledge cutoff**: Models trained on data up to a specific date have no knowledge of events after that point. They can't access the internet or current information unless you provide it.

**Hallucinations**: When an LLM doesn't know an answer, it doesn't say 'I don't know.' It generates plausible-sounding but false information. This isn't dishonesty—it's the system doing exactly what it's trained to do: predict probable continuations.

**Context limitations**: Each model has a maximum context window (e.g., 4K, 128K tokens). Beyond that, it can't consider information, even if provided in the prompt.

**Reasoning gaps**: Modern AI excels at pattern completion but struggles with novel logical reasoning. It's great at tasks similar to its training data but fails on unfamiliar problems.

**Bias amplification**: If training data contains biases, the model learns and reproduces them, sometimes in subtle ways hard to detect.

Understanding these limitations isn't pessimistic—it's pragmatic. It helps you use AI effectively by working within its strengths and designing around its weaknesses.`,
    practicalApplication: `Always verify AI outputs against authoritative sources, especially for facts. Use AI for brainstorming and exploration, but don't trust it for critical decisions without verification. Provide current context when you need up-to-date information. Break complex novel problems into steps. Explicitly test for bias in high-stakes outputs. Design your workflow so AI limitations don't cause harm.`,
    commonMisunderstandings: [
      "AI doesn't know when it's hallucinating—it's equally confident about false and true statements",
      "AI limitations aren't bugs that will be fixed soon—some are fundamental to how neural networks work",
      "Better prompts can't overcome all limitations; some tasks are fundamentally beyond current AI capabilities",
    ],
    relatedConcepts: ["verification", "prompt-design", "risk-management"],
  },

  "hallucination-explained": {
    title: "Why AI Hallucinations Happen and How to Prevent Them",
    category: "ai-fundamentals",
    summary: "Hallucinations occur when AI generates plausible-sounding but false information. Understanding why helps you design workflows to prevent them.",
    keyPoints: [
      "Hallucinations aren't bugs—they're the model doing exactly what it was trained to do: predict probable continuations",
      "The model has no awareness of truth or falsity; it only knows pattern probability",
      "High confidence is no indicator of accuracy; the model is equally certain about fabrications",
      "Hallucinations are especially common when answering questions outside training data or about specific facts",
    ],
    deeperExplanation: `Language models are trained to predict the next word. When they don't actually know an answer, they don't say "I don't know"—they continue predicting plausible words. This generates text that sounds authoritative but is completely false.

This isn't a model flaw being fixed—it's fundamental to how neural networks work. The tradeoff is: general capability in exchange for occasional confident falsehoods.

Common hallucination scenarios:
- Making up facts about topics beyond training data
- Inventing citations that don't exist
- Confident wrong answers when multiple plausible options exist
- Confusing knowledge cutoff dates with recent events

The key insight: You can't prevent hallucinations through better prompts alone. You prevent them through verification and workflow design.`,
    practicalApplication: `For any factual output from AI, assume hallucinations are possible. Verify facts against authoritative sources. For citations, trace them back to verify they exist. For analysis, ask the model to cite its reasoning. Design workflows where verification happens automatically.`,
    commonMisunderstandings: [
      "Better prompts can't eliminate hallucinations—they're inherent to how LLMs work",
      "Hallucinations aren't random—they're statistically probable based on training data",
      "Asking for certainty doesn't help—hallucinations sound equally confident as accurate information",
    ],
    relatedConcepts: ["verification-importance", "ai-limitations", "prompt-patterns"],
  },

  "overfitting-generalization": {
    title: "Overfitting: Why AI Performs Differently in Real Use",
    category: "ai-fundamentals",
    summary: "Models can perform perfectly in training but fail in real-world use. Understanding overfitting helps you evaluate AI systems critically.",
    keyPoints: [
      "Overfitting occurs when a model memorizes training data rather than learning generalizable patterns",
      "A model can achieve 99% accuracy on training data while performing poorly on new data",
      "Overfitting is most common with small training sets or very complex models",
      "Real-world performance matters more than training performance",
    ],
    deeperExplanation: `Imagine training a model to recognize cats using 100 images. If those images all have brown cats in living rooms, the model might learn "brown in living room = cat" rather than recognizing cat features. It achieves perfect training accuracy but fails on black cats or cats in other settings.

This is overfitting. The model memorized the training data instead of learning the underlying pattern.

Why it matters:
- High training accuracy is misleading if generalization is poor
- Models that perform well in labs often fail in production
- High-performing models on benchmarks sometimes fail on real data

How to detect it:
- Performance is much better on training data than test data
- Model works well on examples similar to training data but poorly on novel cases
- Model seems "too perfect"—99.9% accuracy is often a red flag

Prevention strategies:
- Use diverse training data representing real-world variety
- Use validation sets to test generalization during training
- Use regularization that penalizes overly complex solutions
- Start simple and add complexity only if needed`,
    practicalApplication: `When evaluating AI systems, always ask: "On what data? Training data or held-out test data?" Always measure performance on data the model hasn't seen. If accuracy drops significantly on new data, overfitting is likely. Real-world testing matters more than benchmark results.`,
    commonMisunderstandings: [
      "High training accuracy means good model—it often means overfitting instead",
      "More complex models are better—they're more prone to overfitting",
      "If it works great on benchmarks, it will work great in production—not always true",
    ],
    relatedConcepts: ["model-validation", "ai-limitations", "verification-importance"],
  },

  "learning-mindset": {
    title: "The Learning Mindset for AI Mastery",
    category: "thinking-patterns",
    summary: "AI effectiveness depends more on your thinking approach than on memorizing techniques. This mindset accelerates your learning.",
    keyPoints: [
      "Iteration and experimentation beat perfect planning",
      "Understanding patterns matters more than following templates",
      "Failure in prompts teaches you more than success",
      "Building intuition comes from hands-on practice, not lectures",
    ],
    deeperExplanation: `The fastest way to get good with AI isn't reading about it—it's using it repeatedly and paying attention to what works.

This mindset shift is critical:
- From: "I need to learn the right way" → To: "I'll try something and adjust"
- From: "I need to understand all limitations first" → To: "I'll encounter them and learn"
- From: "There's a perfect prompt for this" → To: "I'll iterate toward something good"

Why this matters: AI tools change constantly. Rigidity locks you into yesterday's knowledge. Adaptability positions you for continuous growth.

The compounding effect: Each iteration sharpens your intuition. After 10 experiments, patterns emerge. After 50, you predict outcomes. After 100, you're ahead of people who read about AI without building.

This course emphasizes doing over telling. Interactive challenges aren't entertainment—iteration is your learning mechanism. Each checkpoint tests your understanding and reveals gaps. That's how competence builds.`,
    practicalApplication: `Commit to hands-on experimentation. Try a prompt, observe the output, ask why you got that result, adjust one element, and try again. Do this daily. Build a collection of prompts that work for your specific tasks. Share prompts with others and compare results. The intuition muscle you build will serve you across all AI tools.`,
    commonMisunderstandings: [
      "You need to fully understand AI before using it—you'll learn faster by using it first",
      "Trial and error is inefficient—it's actually the most efficient learning path",
      "Experts got here through study—they got here through thousands of experiments",
    ],
    relatedConcepts: ["prompt-iteration", "verification-importance", "workflow-principles"],
  },

  // ============================================================
  // PROMPT ENGINEERING & DESIGN
  // ============================================================

  "prompt-anatomy": {
    title: "The Anatomy of Effective Prompts",
    category: "prompt-engineering",
    summary: "Effective prompts have clear structure: role, context, task, constraints, and examples.",
    keyPoints: [
      "Role establishes the perspective and expertise level the model should adopt",
      "Context provides relevant information the model needs to complete the task",
      "Task clearly specifies what output you want and in what format",
      "Constraints define limits and guardrails for the response",
      "Examples show the model the pattern of input-output relationships you want",
    ],
    deeperExplanation: `Great prompts aren't magic—they follow a predictable structure that aligns with how language models work. Because LLMs predict patterns, you need to establish the pattern you want.

**Role**: "Act as a [specific role]" primes the model to adopt patterns associated with that role. A prompt starting with "You are a software architect" activates different patterns than "You are a casual helper."

**Context**: Background information narrows the model's focus. Instead of generating generic content, it generates content tailored to your situation. The more specific the context, the better the response.

**Task**: Explicitly state what you want. "Explain X" is vaguer than "Explain X in 3 bullet points suitable for a 10-year-old."

**Constraints**: Set boundaries. "Don't mention Y," "Keep it under 500 words," "Use technical language" all narrow the response space.

**Examples**: Showing input-output pairs is incredibly powerful. One example often does more than pages of instruction.

The reason this structure works: You're essentially providing training data to the model in-context. Each component trains the model toward the specific output pattern you want.`,
    practicalApplication: `Structure your prompts deliberately. Start by establishing role and context. Be specific about what you want. Add examples if the task is unusual or requires a specific style. Use constraints to eliminate undesired outputs. Test your prompt with slight variations and see how the output changes—this teaches you which elements matter for your use case.`,
    commonMisunderstandings: [
      "Politeness doesn't affect LLM performance—'please' doesn't make outputs better",
      "More context doesn't always help—sometimes it introduces noise or conflicting patterns",
      "Detailed prompts aren't always better—sometimes simple, clear prompts outperform complex ones",
    ],
    relatedConcepts: ["few-shot-learning", "prompt-patterns", "role-clarity"],
  },

  "few-shot-learning": {
    title: "Few-Shot Learning: Teaching Through Examples",
    category: "prompt-engineering",
    summary: "Providing examples teaches an LLM the pattern you want without needing explicit rules.",
    keyPoints: [
      "One to five examples often dramatically improve output quality",
      "Examples work because LLMs are fundamentally pattern-matching systems",
      "Diverse examples help the model generalize better than similar examples",
      "The quality of examples matters more than the quantity",
    ],
    deeperExplanation: `Few-shot prompting is powerful because it leverages how LLMs actually work. Rather than trying to explain rules, you show examples of input-output pairs. The model recognizes the pattern and applies it to new inputs.

This is especially valuable when:
- The task is hard to describe in words
- You want a specific style or format
- The pattern is non-obvious
- Standard instructions aren't producing the right output

Why it works: During training, the model learned to recognize patterns from examples. In-context few-shot learning reactivates this ability. You're essentially showing the model "here's the pattern I want you to follow."

Quality matters more than quantity. One well-chosen example often beats five poor ones. Choose examples that illustrate the core pattern you want, not edge cases or special situations.`,
    practicalApplication: `When a basic prompt isn't working, add examples. Start with one clear example. If the output is still off, add 2-3 more examples that illustrate different aspects of the pattern. Make examples diverse so the model learns the underlying pattern rather than memorizing similar cases. Test whether examples improve output—sometimes they do, sometimes they introduce noise.`,
    commonMisunderstandings: [
      "Few-shot learning isn't teaching in the traditional sense—the model doesn't learn permanently, only in that context",
      "More examples aren't always better—diminishing returns set in quickly",
      "Example quality matters more than finding the 'perfect' amount",
    ],
    relatedConcepts: ["prompt-anatomy", "pattern-recognition", "in-context-learning"],
  },

  "prompt-patterns": {
    title: "Common Prompt Patterns That Work Well",
    category: "prompt-engineering",
    summary: "Certain prompt structures consistently produce better results across different tasks.",
    keyPoints: [
      "The Persona Pattern: Establishing a specific role improves relevant outputs",
      "The Format Pattern: Explicitly requesting format (JSON, bullet points, etc.) improves structure",
      "The Chain-of-Thought Pattern: Asking the model to explain reasoning improves accuracy",
      "The Constraint Pattern: Setting clear boundaries reduces unwanted outputs",
    ],
    deeperExplanation: `Across thousands of use cases, certain prompt structures reliably outperform others. These aren't random—they work because they align with how language models process information.

**Persona Pattern**: Asking the model to adopt a specific expertise level, perspective, or role activates more relevant patterns from its training. "Explain as if to a PhD" produces different output than "Explain as if to a 5-year-old."

**Format Pattern**: Specifying the output format (JSON, markdown, bullet points, etc.) often improves both structure and quality. The model has training data for these formats and follows them more reliably when explicitly requested.

**Chain-of-Thought Pattern**: Asking the model to show its reasoning ("Think step-by-step," "Show your work") often improves accuracy, especially on complex problems. This works because step-by-step reasoning activates more deliberate patterns rather than quick surface-level predictions.

**Constraint Pattern**: Explicitly stating what NOT to do or setting clear limits reduces hallucinations and unwanted outputs. "Don't mention proprietary technology" or "Keep it under 100 words" are more effective than hoping the model infers your limits.

**Reference Pattern**: Providing reference material, previous context, or specific sources helps the model ground its output. This is why copy-pasting relevant information into prompts often improves results.

These patterns aren't mysterious. They work because they help you guide the model's pattern-matching toward your specific need.`,
    practicalApplication: `Build a collection of prompt patterns that work for your common tasks. Test patterns systematically. If a prompt isn't working, try adding a persona, requesting a specific format, or asking for step-by-step thinking. Most prompts can be improved by combining 2-3 of these patterns strategically.`,
    commonMisunderstandings: [
      "Patterns that work in one case might not work in another—context matters",
      "Using all patterns simultaneously doesn't always help; sometimes it adds conflicting instructions",
      "The 'best' pattern depends on the specific task and model",
    ],
    relatedConcepts: ["prompt-anatomy", "few-shot-learning", "iterative-refinement"],
  },

  // ============================================================
  // WORKFLOW DESIGN & DECISION-MAKING
  // ============================================================

  "workflow-principles": {
    title: "Principles of Effective AI Workflows",
    category: "workflow-design",
    summary: "Effective workflows decompose complex goals into discrete AI tasks with verification between steps.",
    keyPoints: [
      "Breaking complex tasks into steps reduces error and improves quality",
      "Verification between steps catches problems early before they compound",
      "Clear input/output definition for each step prevents ambiguity",
      "Feedback loops and iteration improve results more than bigger prompts",
    ],
    deeperExplanation: `The most effective way to use AI isn't asking it to solve everything in one prompt. It's decomposing your goal into a workflow where each step has a single, clear objective.

Why decomposition works:
1. **Reduced error complexity**: Complex multi-step tasks have many failure points. Splitting them creates verification opportunities.
2. **Better prompts**: A prompt for one discrete task is clearer and more effective than a prompt trying to do everything.
3. **Quality control**: You can verify outputs after each step, catching problems before they cascade.
4. **Iteration**: If Step 2 produces a poor result, you can iterate on Step 2 without re-running Step 1.
5. **Reasoning stacking**: Each step can build on the previous step's output, creating emerging capability.

Example: Instead of "Write a proposal," use:
- Step 1: Outline key points
- Step 2: Verify outline against requirements (verification)
- Step 3: Write each section
- Step 4: Review for tone and accuracy (verification)
- Step 5: Compile and format

Each step is more focused, verification ensures quality, and the final output is usually better than one-shot generation.`,
    practicalApplication: `Map out your workflow. Identify decision points and verification steps. Ask: "What could go wrong here?" and "How would I catch it?" Design workflows where verification is built in, not added afterward. This shifts you from "hope AI does this right" to "I've structured a process where quality is built in."`,
    commonMisunderstandings: [
      "Bigger, longer prompts aren't better—focused, single-purpose prompts usually outperform them",
      "Verification isn't extra work that slows things down—it prevents re-work that's much slower",
      "Perfect prompts can't overcome poor workflow design; structure matters more than individual prompts",
    ],
    relatedConcepts: ["verification-importance", "risk-management", "iterative-refinement"],
  },

  "decision-framework": {
    title: "Decision Framework: When to Use AI and How",
    category: "workflow-design",
    summary: "Not every task benefits from AI. Strategic decisions about when and how to use AI improve outcomes.",
    keyPoints: [
      "High-risk decisions require heavy human involvement and AI verification",
      "Exploratory tasks benefit from AI's generative capabilities",
      "Repetitive tasks with clear patterns are ideal AI applications",
      "Novel creative work needs human judgment alongside AI output",
    ],
    deeperExplanation: `The best AI practitioners don't use AI for every task. They strategically apply it where it adds value while maintaining human oversight where it matters.

**High-risk tasks** (legal decisions, medical guidance, financial advice): AI can help research and draft, but humans must make final decisions. AI is fallible, and the cost of error is high.

**Exploratory tasks** (brainstorming, research, learning): AI excels here. It can generate ideas, provide perspective, and help you think through problems. Human judgment refines the output.

**Routine, pattern-based tasks** (summarization, categorization, formatting): AI is reliable here because the task has clear rules and low downside risk if something goes wrong.

**Creative tasks** (writing, design, strategy): AI helps with ideation and rough drafts, but human judgment determines what's actually good. "Good" creativity requires understanding context, audience, and goal—things that need human insight.

**Verification and quality tasks**: Humans are often better than AI at catching errors, evaluating nuance, and determining whether something actually solves the problem.

The framework: Use AI for its strengths (pattern recognition, generation, research), but keep humans in the loop for judgment, verification, and high-stakes decisions.`,
    practicalApplication: `For each task, ask: "What's the cost of error? What's the benefit of AI help?" High cost + low error tolerance = heavy human involvement. Low cost + clear patterns = more AI autonomy. Design workflows with appropriate human checkpoints. Don't over-automate critical decisions. Don't under-use AI for routine tasks where it's reliable.`,
    commonMisunderstandings: [
      "Using AI doesn't mean removing humans—it means using humans strategically",
      "More AI automation isn't always better; sometimes human involvement improves outcomes",
      "Human judgment and AI capability aren't opposed—they work best together",
    ],
    relatedConcepts: ["verification-importance", "risk-management", "workflow-principles"],
  },

  "tool-selection": {
    title: "Choosing the Right Tool for the Task",
    category: "tool-selection",
    summary: "Different AI tools have different strengths. Matching tool to task dramatically improves results.",
    keyPoints: [
      "Generalist models (ChatGPT, Claude) excel at diverse tasks but lack depth",
      "Specialized models (coding, image generation, voice) outperform generalists in their domain",
      "Reasoning models perform better on complex logical tasks",
      "Speed/cost vs. quality tradeoffs exist—choose based on your requirements",
    ],
    deeperExplanation: `Not all AI tools are interchangeable. Different models have different training, architecture, and optimization for different tasks.

**Generalist models** are trained on broad data to handle any task. They're flexible and convenient but often sub-optimal for specific domains.

**Specialized models** are optimized for specific domains (code generation, image creation, voice synthesis). They significantly outperform generalists in their specialty because their training and architecture are tailored to that domain.

**Reasoning models** are optimized for complex multi-step thinking. They perform better on logic puzzles, math, and complex analysis because they're designed to "think through" problems step-by-step rather than generate quick surface-level responses.

**Speed/quality tradeoff**: Faster models have lower latency and cost but often lower quality. Slower models are better for complex tasks but expensive for routine tasks.

Choosing the right tool:
- **Research task**: Broad access to information favors generalist models
- **Code generation**: Specialized coding models consistently outperform generalists
- **Complex analysis**: Reasoning models often outperform standard models
- **Speed-critical**: Lightweight models trade quality for latency
- **Cost-critical**: Smaller models or specialized APIs reduce cost`,
    practicalApplication: `Test your task with different tools before committing to one. A task that performs poorly with one model might perform excellently with another. Keep updated on new models and tools—the landscape changes rapidly. For critical tasks, benchmark performance across tools. For routine tasks, choose based on cost and speed. Don't assume your current tool is optimal—experiment periodically.`,
    commonMisunderstandings: [
      "Bigger models aren't always better—sometimes smaller models are better for specific tasks",
      "The 'best' tool depends on your specific requirements, not on marketing or popularity",
      "You should use different tools for different tasks—one-tool-fits-all is usually suboptimal",
    ],
    relatedConcepts: ["workflow-design", "decision-framework", "verification-importance"],
  },

  // ============================================================
  // VERIFICATION & QUALITY
  // ============================================================

  "verification-importance": {
    title: "Why Verification Is Non-Negotiable",
    category: "practical-application",
    summary: "AI output looks confident but can be confidently wrong. Verification catches errors before they cause harm.",
    keyPoints: [
      "AI can't distinguish between true and false—it generates plausible-sounding outputs",
      "Hallucinations are indistinguishable from accurate information to the model",
      "Verification isn't optional for high-stakes information—it's mandatory",
      "Verification builds trust and makes you a better AI practitioner",
    ],
    deeperExplanation: `This might be the most important concept in this entire course. AI doesn't have a truth sense. It has a plausibility sense.

An LLM isn't trying to tell you true things. It's predicting what words are likely to come next based on training data. If something sounds plausible, the model will confidently generate it, even if it's completely false.

Example: Ask an LLM "What's the population of Nepal?" and it will give you a specific number with confidence. That number might be accurate, outdated, or completely wrong—the model doesn't know. It just knows that "Nepal's population is approximately [X] million" follows patterns in its training data.

This means:
- **Facts require verification**: Don't trust AI facts without checking sources
- **Code requires testing**: Don't assume code works without running it
- **Writing requires review**: Don't assume structure and tone match your needs
- **Analysis requires validation**: Don't assume conclusions are supported by data

High-stakes mistakes happen when people trust AI output without verification. Medical advice, legal guidance, financial recommendations—all require expert human verification.`,
    practicalApplication: `Build verification into your workflow from the start. For facts, cross-check sources. For code, test outputs. For writing, review critically. For analysis, validate methodology and conclusions. Ask: "What's the cost of error here?" If the cost is high, verification is mandatory. If the cost is low, you might skip it, but don't be surprised when occasional errors slip through.`,
    commonMisunderstandings: [
      "AI confidence doesn't indicate accuracy—the model is equally confident about false information",
      "Verification isn't optional for 'important' tasks—it's important for any task where accuracy matters",
      "One verification pass might not be enough—multiple checks catch more errors",
    ],
    relatedConcepts: ["ai-limitations", "workflow-principles", "risk-management"],
  },

  "quality-metrics": {
    title: "How to Evaluate AI Output Quality",
    category: "practical-application",
    summary: "Quality isn't subjective. Defining metrics helps you assess whether AI output actually solves your problem.",
    keyPoints: [
      "Clear success criteria determine whether output is actually good",
      "Comparing outputs (A/B testing) often reveals quality differences better than absolute judgment",
      "Domain-specific criteria matter more than general quality signals",
      "Iteration based on quality feedback produces better results than one-shot generation",
    ],
    deeperExplanation: `Many people evaluate AI output by gut feeling: "Does it seem good?" That's unreliable. Better practitioners define specific quality metrics before asking for output.

**Define success criteria upfront**:
- For copywriting: Is the tone right? Does it match the brand voice? Would the target audience respond?
- For code: Does it solve the problem? Are there bugs? Is it efficient? Is it readable?
- For analysis: Is the methodology sound? Are conclusions supported? Are limitations acknowledged?
- For research: Are sources credible? Is information current? Is it complete?

**Use comparative evaluation**: Sometimes you can't judge absolute quality, but you can compare two options and say "B is better than A because [specific reason]."

**Recognize domain differences**: What's good marketing copy would be terrible scientific writing. What's excellent code for a prototype would be terrible for production. Quality depends entirely on purpose.

**Iterate based on feedback**: "That was good but missing X" is more actionable than "That's okay." Specific feedback produces rapid improvement in follow-up outputs.`,
    practicalApplication: `Before asking for output, define what "good" means for your specific task. Write down 3-5 concrete criteria. After you get output, evaluate against those criteria. If it falls short, identify the specific gap and ask for revision. Use A/B comparisons when direct evaluation is hard. Over time, your quality assessment gets faster and more reliable.`,
    commonMisunderstandings: [
      "Quality is subjective, but success criteria are objective—defining them upfront improves evaluation",
      "Generic quality (clarity, grammar) isn't the same as task-specific quality (meeting your requirements)",
      "One evaluation pass often misses quality issues—multiple passes and perspectives catch more",
    ],
    relatedConcepts: ["verification-importance", "iterative-refinement", "decision-framework"],
  },

  // ============================================================
  // ETHICS & SAFETY
  // ============================================================

  "bias-and-fairness": {
    title: "Understanding Bias in AI Systems",
    category: "ethics-safety",
    summary: "AI systems inherit and sometimes amplify biases from training data. Awareness prevents harm.",
    keyPoints: [
      "Training data biases transfer to model outputs",
      "Biases can be subtle and hard to detect without systematic checking",
      "Marginalized groups are often underrepresented or misrepresented in training data",
      "Testing for bias requires intentional effort—it doesn't happen by default",
    ],
    deeperExplanation: `AI systems don't create bias from nothing. They learn patterns from training data. If training data contains biases, the model learns and reproduces them.

Common sources of bias:
- **Representation bias**: If training data underrepresents a group, the model performs worse for that group
- **Stereotyping bias**: If training data contains stereotypes, the model reproduces them
- **Historical bias**: If training data reflects past discrimination, the model perpetuates it
- **Measurement bias**: If how we measure outcomes is biased, the model optimizes for biased metrics

Why it matters: AI systems are increasingly used in high-stakes decisions (hiring, lending, criminal justice). Biased AI can systematically harm marginalized groups.

Example: Hiring models trained on historical hiring decisions might perpetuate gender bias if historical hiring was biased. The model isn't intentionally discriminating—it's learning patterns in the data.

Important nuance: Bias in AI isn't always caused by intentional discrimination. It often emerges from underrepresentation, measurement issues, or historical patterns in data. But the impact is the same regardless of cause.`,
    practicalApplication: `When using AI for consequential decisions (hiring, lending, criminal justice, medical care), systematically test for bias. Get feedback from people in the affected groups. Question assumptions about neutrality. If you're not actively testing for bias, you're probably missing it. Bias work isn't one-time—it requires ongoing attention as you use systems with real people.`,
    commonMisunderstandings: [
      "AI bias isn't caused by intentionally discriminatory algorithms—it emerges from biased training data",
      "Bias isn't always obvious—systematic testing is required to find it",
      "Acknowledging bias doesn't mean accepting it—it means you can work to mitigate it",
    ],
    relatedConcepts: ["ethics-framework", "ai-limitations", "responsibility"],
  },

  "responsible-use": {
    title: "Using AI Responsibly: Guardrails and Ethics",
    category: "ethics-safety",
    summary: "Power comes with responsibility. Using AI responsibly means thinking about impacts beyond immediate output.",
    keyPoints: [
      "Don't use AI for deception (deepfakes, impersonation, misinformation)",
      "Protect privacy by not feeding sensitive data to AI systems",
      "Be transparent about AI use—don't hide that AI was involved",
      "Consider downstream impacts—who might be harmed by your use?",
    ],
    deeperExplanation: `AI is powerful, and power requires responsibility. This isn't abstract ethics—it's practical decisions that affect real people.

**Deception is categorically harmful**: Using AI to create deepfakes of real people, impersonate individuals, or generate misinformation causes concrete harm. These uses aren't gray areas—they're clearly harmful.

**Privacy matters**: Don't feed proprietary, confidential, or personal data into AI systems, especially cloud-based systems where you don't control who sees it. Your company's strategy, customer data, and personal information are valuable and should be protected.

**Transparency is required**: If you use AI to write content, generate code, or create media, disclose it. People deserve to know when AI was involved. Hidden AI use erodes trust.

**Downstream impacts matter**: Ask: Who might be affected by this output? Could it cause harm? Is it fair to those people? Am I considering all stakeholders or just my immediate goals?

**Consent is important**: If you're using data about people to train or improve AI systems, ideally they should consent. At minimum, you should be transparent about how their data is used.`,
    practicalApplication: `Ask ethical questions before using AI: "Am I being deceptive? Am I protecting privacy? Should I disclose AI involvement? Could this harm someone?" If the answer to the first three is "no, yes, yes," you're probably fine. If you're unsure about downstream impacts, consult with people who might be affected. Ethics isn't about being perfect—it's about thinking carefully about impact.`,
    commonMisunderstandings: [
      "Ethics isn't about rules—it's about thinking carefully about impacts",
      "Ignoring ethics doesn't make it go away—it just means you haven't thought through consequences",
      "Ethical AI use isn't a luxury—it's the baseline for responsible practitioners",
    ],
    relatedConcepts: ["bias-and-fairness", "responsible-disclosure", "impact-thinking"],
  },

  // ============================================================
  // ADVANCED TECHNIQUES
  // ============================================================

  "chain-of-thought": {
    title: "Chain-of-Thought: Making AI Reasoning Explicit",
    category: "advanced-techniques",
    summary: "Asking AI to show its reasoning step-by-step often improves accuracy and transparency.",
    keyPoints: [
      "Explicit reasoning improves accuracy, especially on complex logic tasks",
      "Step-by-step thinking makes errors easier to spot and correct",
      "Transparency into reasoning helps you understand limitations",
      "This technique doesn't work equally well for all tasks",
    ],
    deeperExplanation: `Chain-of-thought prompting asks the model to explain its reasoning step-by-step rather than jumping to conclusions. This activates different patterns in the model and often produces better results.

Why it works:
- **Slows down thinking**: Instead of quick surface-level prediction, step-by-step reasoning encourages more deliberate patterns
- **Exposes reasoning flaws**: Errors in step-by-step reasoning are easier to catch than errors in direct conclusions
- **Engages relevant knowledge**: Breaking a problem into steps activates more detailed patterns than direct generation

When it helps most:
- **Logic puzzles**: Multi-step problems where reasoning matters
- **Math**: Breaking into calculation steps improves accuracy
- **Complex analysis**: Exploring reasoning catches gaps
- **Error diagnosis**: Asking why helps surface underlying problems

When it might not help:
- **Factual retrieval**: "What's the capital of France?" doesn't benefit from step-by-step thinking
- **Creative tasks**: Asking for reasoning might constrain creativity
- **Simple tasks**: Overhead of step-by-step doesn't justify the benefit`,
    practicalApplication: `When a task involves reasoning or multi-step logic, add "Let me think through this step-by-step" or "Show your work." Then examine each step for errors. If errors appear midway, you can correct the reasoning and continue. This technique is especially valuable for math, logic, and analysis where you want to understand not just the answer but the reasoning.`,
    commonMisunderstandings: [
      "Chain-of-thought isn't a magic fix—it helps with reasoning tasks but not all tasks",
      "Showing reasoning doesn't guarantee correctness—the reasoning itself can be flawed",
      "Chain-of-thought adds latency—use it where improved quality justifies slower responses",
    ],
    relatedConcepts: ["prompt-patterns", "reasoning", "verification-importance"],
  },

  "retrieval-augmented": {
    title: "Retrieval-Augmented Generation: Grounding AI in Reality",
    category: "advanced-techniques",
    summary: "Providing AI with current, specific information dramatically improves reliability and relevance.",
    keyPoints: [
      "RAG systems retrieve relevant information before generating responses",
      "This solves knowledge cutoff problems and hallucinations about specific data",
      "Quality of retrieval dramatically affects output quality",
      "RAG requires structured data and effective search mechanisms",
    ],
    deeperExplanation: `One of AI's key limitations is that it doesn't know current information and can hallucinate about specific facts. Retrieval-augmented generation (RAG) solves this by combining retrieval and generation:

1. **Retrieve**: Search for relevant information from your knowledge base
2. **Augment**: Include that information in the prompt
3. **Generate**: Ask the model to generate using the retrieved information

Example: Instead of asking a model "What's our Q2 revenue?" (which it doesn't know), RAG would:
1. Retrieve Q2 financial data from your database
2. Include that data in the prompt: "Here's our Q2 data: [specific numbers]"
3. Ask the model to analyze or summarize based on that data

Why it works:
- **Solves knowledge cutoff**: Current data is included in the prompt
- **Reduces hallucinations**: The model grounds output in retrieved facts
- **Enables personalization**: Retrieved data can be specific to your context
- **Adds verification**: Retrieved data comes from authoritative sources

The challenge: Quality depends entirely on retrieval quality. If retrieval doesn't find relevant information, RAG produces hallucinated content based on general patterns.`,
    practicalApplication: `If you have specific data you want AI to reference (company information, current events, specific documents), set up retrieval. Provide AI with that data in the prompt. This is more reliable than hoping the model knows the information. For customer-specific interactions, retrieve their information and include it. For analysis, retrieve relevant documents and ask the model to analyze them.`,
    commonMisunderstandings: [
      "RAG doesn't eliminate hallucinations—it only helps with information you explicitly provide",
      "RAG quality depends entirely on retrieval quality—good retrieval is critical",
      "RAG adds complexity—use it when retrieval value justifies the added infrastructure",
    ],
    relatedConcepts: ["ai-limitations", "context-window", "verification-importance"],
  },

  "prompt-iteration": {
    title: "Iterative Prompt Refinement: Getting Better Results",
    category: "advanced-techniques",
    summary: "The best prompts aren't written once—they evolve through testing and refinement.",
    keyPoints: [
      "Test prompts systematically to see what works",
      "Small changes in wording often produce significant output differences",
      "A/B testing reveals which elements matter most",
      "Collecting data on prompt performance helps identify patterns",
    ],
    deeperExplanation: `Prompt engineering isn't mystical. It's engineering: test, measure, iterate.

The process:
1. **Start with a hypothesis**: "This prompt structure should produce better results"
2. **Test with examples**: Run it on several inputs and evaluate quality
3. **Measure**: Define specific metrics (accuracy, relevance, tone, etc.)
4. **Compare**: Try variations and see which performs better
5. **Iterate**: Based on results, refine and test again

Why this works:
- **Reveals what actually matters**: You might think X helps when it doesn't, or miss that Y is critical
- **Builds intuition**: After testing many variations, patterns emerge
- **Documents learning**: You create a repository of what works for different tasks

Example testing plan:
- Test with 5-10 diverse examples
- Try baseline prompt
- Try variation 1 (add role)
- Try variation 2 (add examples)
- Try variation 3 (different format request)
- Measure performance on each
- Choose best, then iterate further

This is exactly how professional prompt engineers work—not by intuition, but by systematic testing.`,
    practicalApplication: `Pick a task you do regularly. Write a prompt for it. Test with 5-10 examples and score output quality. Make one change (add a constraint, change the role, add an example). Test again. Did quality improve? Keep the change if it did, revert if it didn't. Continue iterating. After 5-10 iterations, you'll have a prompt much better than your starting point. Document what you learned.`,
    commonMisunderstandings: [
      "Great prompts aren't written perfectly on the first try—they evolve through testing",
      "Small wording changes can dramatically affect output—test before assuming things don't matter",
      "Your intuition about what works is sometimes wrong—testing reveals reality",
    ],
    relatedConcepts: ["prompt-anatomy", "prompt-patterns", "quality-metrics"],
  },
}

/**
 * Get insights for a specific concept or search across all insights
 */
export function getInsight(conceptId: string): EducationalInsight | undefined {
  return explanationInsights[conceptId]
}

export function searchInsights(query: string): EducationalInsight[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(explanationInsights).filter(
    (insight) =>
      insight.title.toLowerCase().includes(lowerQuery) ||
      insight.summary.toLowerCase().includes(lowerQuery) ||
      insight.category.includes(lowerQuery) ||
      insight.keyPoints.some((point) => point.toLowerCase().includes(lowerQuery)) ||
      insight.relatedConcepts.some((concept) => concept.toLowerCase().includes(lowerQuery)),
  )
}

export function getRelatedInsights(conceptId: string): EducationalInsight[] {
  const insight = getInsight(conceptId)
  if (!insight) return []

  return insight.relatedConcepts
    .map((conceptName) => {
      const relatedId = Object.keys(explanationInsights).find((id) =>
        explanationInsights[id].title.toLowerCase().includes(conceptName.toLowerCase()),
      )
      return relatedId ? explanationInsights[relatedId] : undefined
    })
    .filter((insight): insight is EducationalInsight => insight !== undefined)
}
