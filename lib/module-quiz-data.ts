export type ModuleQuizOption = {
  id: string
  label: string
}

export type ModuleQuizQuestion<T extends string = string> = {
  key: T
  prompt: string
  explanation: string
  options: ModuleQuizOption[]
  correctOptionId: string
}

export const moduleQuizData = {
  "module-1": [
    {
      key: "quiz1",
      prompt: "Which definition best matches AI in this course?",
      explanation: "AI refers to software designed to perform tasks that normally require human intelligence.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Any robot that looks human" },
        { id: "b", label: "Software that performs tasks that normally require human intelligence" },
        { id: "c", label: "A machine that can think exactly like a person" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What kind of AI do we actually use today?",
      explanation: "Today's systems are narrow AI: strong at specific tasks, not general intelligence.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Narrow AI" },
        { id: "b", label: "Artificial general intelligence" },
        { id: "c", label: "Superintelligence" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Which example is already a common everyday use of AI?",
      explanation: "Recommendation systems are one of the most common real-world AI applications.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "A household robot chef in every kitchen" },
        { id: "b", label: "A machine that understands everything like a human" },
        { id: "c", label: "Streaming recommendations and spam filters" },
      ],
    },
    {
      key: "matching",
      prompt: "Which statement is a myth rather than reality?",
      explanation: "Current AI does not understand the world like a human; it recognizes patterns within data.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "AI systems are already embedded in many digital tools" },
        { id: "b", label: "AI truly understands the world exactly like people do" },
        { id: "c", label: "Most AI today is specialized for specific tasks" },
      ],
    },
  ],
  "module-2": [
    {
      key: "quiz1",
      prompt: "What makes machine learning different from traditional software?",
      explanation: "Machine learning learns patterns from examples rather than following only hand-written rules.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "It never uses data" },
        { id: "b", label: "It learns from examples instead of only explicit rules" },
        { id: "c", label: "It always requires a robot body" },
      ],
    },
    {
      key: "quiz2",
      prompt: "Why is training data so important?",
      explanation: "The model learns from the examples it sees, so weak or biased data leads to weak or biased output.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "It only matters after deployment" },
        { id: "b", label: "It is mostly for decoration in AI demos" },
        { id: "c", label: "It shapes what patterns the model can learn" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is supervised learning?",
      explanation: "Supervised learning uses labeled examples, so the system learns from input-output pairs.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Learning from labeled examples" },
        { id: "b", label: "Learning with no data at all" },
        { id: "c", label: "Learning only through web browsing" },
      ],
    },
    {
      key: "matching",
      prompt: "Which limitation is true of current AI systems?",
      explanation: "Even powerful AI lacks human-style understanding, common sense, and reliable general reasoning.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "It always knows why its answer is correct" },
        { id: "b", label: "It can be powerful yet still fail without true understanding" },
        { id: "c", label: "It becomes unbiased automatically with more compute" },
      ],
    },
  ],
  "module-3": [
    {
      key: "quiz1",
      prompt: "What does an LLM primarily do when generating a response?",
      explanation: "An LLM predicts the next token based on context from previous tokens.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Searches the internet every time by default" },
        { id: "b", label: "Predicts the next token in sequence" },
        { id: "c", label: "Reads your mind to infer intent" },
      ],
    },
    {
      key: "quiz2",
      prompt: "Which prompt is most likely to get a useful result?",
      explanation: "Role, context, task, and format usually produce the clearest output.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Help me" },
        { id: "b", label: "Write something good" },
        { id: "c", label: "You are a hiring coach. Review my resume for a product role and return 5 bullet improvements." },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is few-shot prompting?",
      explanation: "Few-shot prompting gives the model examples before asking it to perform the task.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Giving the AI a few examples of the desired output" },
        { id: "b", label: "Limiting the response to a few words" },
        { id: "c", label: "Using AI only a few times per week" },
      ],
    },
    {
      key: "exercise",
      prompt: "Which habit best improves prompting over time?",
      explanation: "Iterative refinement treats AI like a collaborator and usually produces better outcomes.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Assume the first prompt must be perfect" },
        { id: "b", label: "Refine the prompt with follow-up constraints and feedback" },
        { id: "c", label: "Avoid giving any context to keep the model unbiased" },
      ],
    },
  ],
  "module-4": [
    {
      key: "quiz1",
      prompt: "Which tool is best known as a general writing assistant?",
      explanation: "ChatGPT is positioned in this module as a versatile general-purpose assistant.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "ChatGPT" },
        { id: "b", label: "Midjourney" },
        { id: "c", label: "Luma AI" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What should you check before using AI-generated images commercially?",
      explanation: "Commercial rights and platform terms vary significantly across image tools.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Only whether the image looks realistic" },
        { id: "b", label: "Whether the tool has a mobile app" },
        { id: "c", label: "Ownership and usage terms" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Which tool category is best for cited research and browsing?",
      explanation: "Research-focused AI tools emphasize source-backed answers and synthesis.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "AI music generators" },
        { id: "b", label: "AI search and research tools" },
        { id: "c", label: "Voice cloning tools" },
      ],
    },
    {
      key: "matching",
      prompt: "What is the best first question before choosing any AI tool?",
      explanation: "The task definition comes first; tool choice follows the use case.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "What exact task am I trying to solve?" },
        { id: "b", label: "Which tool has the flashiest branding?" },
        { id: "c", label: "Which tool is newest this week?" },
      ],
    },
  ],
  "module-5": [
    {
      key: "quiz1",
      prompt: "Where does AI bias often begin?",
      explanation: "Bias often starts in the data, labels, and assumptions used to train the system.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "In biased or incomplete training data" },
        { id: "b", label: "Only after the model is deployed" },
        { id: "c", label: "Only when users ask malicious prompts" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the safest default for sensitive personal data?",
      explanation: "Sensitive personal data should not be pasted into public AI tools without strong approval and controls.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Paste it if the response would be helpful" },
        { id: "b", label: "Paste it only once" },
        { id: "c", label: "Do not enter it into general AI chat tools" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Why should AI detection tools be used carefully?",
      explanation: "They provide signals, not proof, and false positives can be serious.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "They are illegal in most countries" },
        { id: "b", label: "They are probabilistic and can wrongly flag human work" },
        { id: "c", label: "They only work on audio" },
      ],
    },
  ],
  "module-7": [
    {
      key: "quiz1",
      prompt: "Which tasks are most exposed to automation risk?",
      explanation: "Routine, repeatable, rule-based work is usually most exposed to automation.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Routine, repetitive, rule-based tasks" },
        { id: "b", label: "Tasks requiring judgment and relationship-building" },
        { id: "c", label: "Only physical jobs" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the most practical AI career move for many people?",
      explanation: "AI fluency within your existing domain is often the highest-leverage move.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Quit immediately and become an ML researcher" },
        { id: "b", label: "Ignore AI until regulations settle" },
        { id: "c", label: "Become highly AI-fluent in your current domain" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is a strong first step in an individual AI strategy?",
      explanation: "Start by auditing your recurring tasks and identifying where AI can help.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Try every new AI tool you see" },
        { id: "b", label: "Audit your weekly tasks and identify opportunities" },
        { id: "c", label: "Automate all client-facing work immediately" },
      ],
    },
  ],
  "module-8": [
    {
      key: "quiz1",
      prompt: "What most clearly distinguishes an agent from a simple chatbot?",
      explanation: "Agents can plan and take actions using tools rather than only responding once.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Agents always have a voice interface" },
        { id: "b", label: "Agents can use tools and act toward a goal" },
        { id: "c", label: "Agents are always open source" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What role does memory play in an agent?",
      explanation: "Memory helps the agent preserve context across steps or sessions.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "It preserves context and history" },
        { id: "b", label: "It replaces all need for tools" },
        { id: "c", label: "It guarantees perfect accuracy" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Why is least privilege important for agents?",
      explanation: "Agents should only access the minimum tools and data needed for a task.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "It makes the UI look cleaner" },
        { id: "b", label: "It improves model creativity" },
        { id: "c", label: "It reduces harm if the agent makes a mistake or is attacked" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What is a multi-agent system?",
      explanation: "A multi-agent system coordinates several specialized agents on parts of the overall task.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "One large model with a dark mode UI" },
        { id: "b", label: "Several specialized agents working together" },
        { id: "c", label: "An agent that runs on multiple monitors" },
      ],
    },
    {
      key: "quiz5",
      prompt: "What is the safest way to start deploying an agent?",
      explanation: "Start with narrow scope, minimal permissions, and strong monitoring.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Start small with clear limits and logging" },
        { id: "b", label: "Give it full write access immediately" },
        { id: "c", label: "Skip human review because agents are faster" },
      ],
    },
  ],
  "module-9": [
    {
      key: "quiz1",
      prompt: "Which frontier focuses on systems that can act for you across steps?",
      explanation: "Agentic AI is about planning and taking actions, not just responding once.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Static expert systems" },
        { id: "b", label: "AI agents" },
        { id: "c", label: "Spreadsheet macros" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What best describes AGI in this module?",
      explanation: "AGI is a hypothetical system that could perform across domains at human level or beyond.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "A proven technology already in widespread use" },
        { id: "b", label: "Any chatbot with internet access" },
        { id: "c", label: "A hypothetical general-purpose intelligence across domains" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is the most practical preparation for the future of AI?",
      explanation: "Staying curious, adaptive, and capable of critical judgment is the recurring lesson of the module.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Build adaptable judgment and keep learning" },
        { id: "b", label: "Wait until the technology stops changing" },
        { id: "c", label: "Memorize a single tool and ignore the rest" },
      ],
    },
  ],
} as const satisfies Record<string, readonly ModuleQuizQuestion[]>
