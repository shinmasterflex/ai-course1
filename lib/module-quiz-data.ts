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
    {
      key: "tools-quiz1",
      prompt: "Which tool is best known as a general writing assistant?",
      explanation: "ChatGPT is positioned as a versatile general-purpose assistant for writing and brainstorming.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "ChatGPT" },
        { id: "b", label: "Midjourney" },
        { id: "c", label: "Luma AI" },
      ],
    },
    {
      key: "tools-quiz2",
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
      key: "tools-quiz3",
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
      key: "tools-matching",
      prompt: "What is the best first question before choosing any AI tool?",
      explanation: "The task definition comes first; tool choice follows the use case.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "What exact task am I trying to solve?" },
        { id: "b", label: "Which tool has the flashiest branding?" },
        { id: "c", label: "Which tool is newest this week?" },
      ],
    },
    {
      key: "tools-quiz4",
      prompt: "You need repeatable quality from an AI writing workflow. Which setup is strongest?",
      explanation: "Reusable prompt templates, examples, and review criteria produce more consistent output than ad hoc prompting.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Use a different prompt style every time" },
        { id: "b", label: "Use a tested prompt template with clear quality criteria" },
        { id: "c", label: "Always choose the longest possible response" },
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
    {
      key: "quiz4",
      prompt: "A model has 99% training accuracy but much lower validation accuracy. What is the strongest diagnosis?",
      explanation: "This pattern usually signals overfitting, where the model memorizes training examples instead of generalizing.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Overfitting to training data" },
        { id: "b", label: "Underfitting due to too little training" },
        { id: "c", label: "A data leak in the validation set" },
      ],
    },
    {
      key: "quiz5",
      prompt: "Which split strategy is best when evaluating a classifier with rare fraud cases?",
      explanation: "Stratified splitting preserves class proportions across train and validation sets, which is important for imbalanced labels.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Use only a random split and ignore class balance" },
        { id: "b", label: "Train on all data and evaluate on the same data" },
        { id: "c", label: "Use a stratified train/validation split" },
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
    {
      key: "quiz4",
      prompt: "You need a model to return JSON only. Which prompt design is most reliable?",
      explanation: "Explicit output schema and constraints reduce ambiguity and improve format compliance.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Ask for a concise answer and hope it is valid JSON" },
        { id: "b", label: "Provide a strict JSON schema and instruct: return valid JSON only" },
        { id: "c", label: "Use a shorter prompt to reduce token usage" },
      ],
    },
    {
      key: "quiz5",
      prompt: "A response sounds confident but includes fabricated citations. Which prompting tactic helps most?",
      explanation: "Requiring verifiable sources and allowing abstention reduces hallucinated certainty.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Require source links and allow the model to say 'insufficient evidence'" },
        { id: "b", label: "Increase response length so the model can explain more" },
        { id: "c", label: "Remove all constraints to let the model reason freely" },
      ],
    },
  ],
  "module-4": [
    {
      key: "quiz1",
      prompt: "Which statement best describes the practical pipeline before model training?",
      explanation: "A reliable workflow is collection, then cleaning, then transformation, then feature engineering before training and evaluation.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Collection -> Cleaning -> Transformation -> Feature engineering" },
        { id: "b", label: "Feature engineering -> Train first -> Cleaning -> Collection" },
        { id: "c", label: "Transformation -> Collection -> Evaluation -> Cleaning" },
      ],
    },
    {
      key: "quiz2",
      prompt: "A churn model performs well for urban users but poorly for rural users. What is the most likely data-quality cause?",
      explanation: "This pattern often indicates representation bias: one group is well represented in training data while another is underrepresented.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Normalization was applied to the income column" },
        { id: "b", label: "The training data is biased toward urban examples" },
        { id: "c", label: "The model used too many epochs" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is the best pairing of preprocessing techniques?",
      explanation: "Normalization rescales numeric values, and one-hot encoding converts categories into binary indicator columns.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Normalization removes duplicates; one-hot encoding fills missing values" },
        { id: "b", label: "Normalization creates train/test split; one-hot encoding detects outliers" },
        { id: "c", label: "Normalization rescales numeric ranges; one-hot encoding turns categories into 0/1 columns" },
      ],
    },
    {
      key: "matching",
      prompt: "In the mini messy email dataset, which fix is most directly about handling duplicates?",
      explanation: "Duplicate records should be merged or removed using a stable identifier like email to avoid over-weighting repeated examples.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Keep one record per unique email and remove repeated rows" },
        { id: "b", label: "Convert country labels to one-hot vectors first" },
        { id: "c", label: "Increase model complexity to memorize all rows" },
      ],
    },
    {
      key: "quiz4",
      prompt: "Which metric is more informative than accuracy for a highly imbalanced medical screening dataset?",
      explanation: "With class imbalance, precision/recall tradeoffs and F1 are often more meaningful than raw accuracy.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Only training loss" },
        { id: "b", label: "Only overall accuracy" },
        { id: "c", label: "Precision, recall, and F1" },
      ],
    },
    {
      key: "quiz5",
      prompt: "When should missing values be imputed using statistics from the training set only?",
      explanation: "Imputation parameters should come from training data to avoid leaking validation/test information.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "After combining train and test data for consistency" },
        { id: "b", label: "Before evaluation, fit imputers on training data and apply to other splits" },
        { id: "c", label: "Only after model deployment" },
      ],
    },
  ],
  "module-5": [
    {
      key: "quiz1",
      prompt: "In an AI script, what do variables and data types help you do?",
      explanation: "They make your inputs explicit and prevent invalid operations, such as mixing numbers and text incorrectly.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Avoid using clear names for inputs" },
        { id: "b", label: "Store the right kind of value and use it safely" },
        { id: "c", label: "Replace all conditionals with loops" },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the main benefit of conditionals and loops in AI workflows?",
      explanation: "Conditionals route different cases, and loops apply the same logic across many inputs.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "They make every input follow one fixed path" },
        { id: "b", label: "They remove the need for functions" },
        { id: "c", label: "They let code choose paths and process many items efficiently" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is the strongest debugging first step for a beginner?",
      explanation: "Read the exact error, reproduce it, and isolate the failing step before changing multiple things.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Read the error carefully and reproduce the failure path" },
        { id: "b", label: "Rewrite the script from scratch" },
        { id: "c", label: "Change random lines until output looks right" },
      ],
    },
    {
      key: "quiz4",
      prompt: "A function updates a global variable and causes unpredictable behavior. What is the best refactor?",
      explanation: "Returning values explicitly and passing data as parameters reduces side effects and improves testability.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Keep the global variable and add more print statements" },
        { id: "b", label: "Wrap the function in a loop" },
        { id: "c", label: "Pass inputs as arguments and return the updated value" },
      ],
    },
    {
      key: "quiz5",
      prompt: "In an API pipeline, where should input validation happen?",
      explanation: "Validate at boundaries before processing so downstream logic receives clean, expected data.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "At the boundary before core business logic" },
        { id: "b", label: "Only in the database layer" },
        { id: "c", label: "Only after model inference" },
      ],
    },
    {
      key: "quiz6",
      prompt: "Which test gives the fastest signal that a utility function still works after refactoring?",
      explanation: "A focused unit test checks one function's behavior quickly and isolates regressions.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "A manual end-to-end walkthrough only" },
        { id: "b", label: "A small unit test with deterministic inputs and expected outputs" },
        { id: "c", label: "A load test against production" },
      ],
    },
  ],
  "module-6": [
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
    {
      key: "quiz4",
      prompt: "When you discover an AI system has historical bias in its training data, what is the most responsible first step?",
      explanation: "Understanding and fixing bias at the source is better than applying surface-level workarounds. Audit the data, identify the problem, then retrain or adjust the model.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Use the system anyway and hope the bias does not show up in practice" },
        { id: "b", label: "Audit the training data and adjust the model to reduce bias before deploying" },
        { id: "c", label: "Randomly change the outputs to appear more balanced" },
        { id: "d", label: "Stop using the system entirely" },
      ],
    },
    {
      key: "quiz5",
      prompt: "What should you do if you receive a realistic deepfake video of someone you know requesting urgent action?",
      explanation: "Verify through a separate, trusted channel. Urgency and realism are classic misinformation tactics. The safest move is to slow down and confirm.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Act immediately based on the video" },
        { id: "b", label: "Forward it to others for their opinion" },
        { id: "c", label: "Contact the person through a different, trusted channel to verify" },
        { id: "d", label: "Assume advanced deepfakes are impossible" },
      ],
    },
    {
      key: "quiz6",
      prompt: "A hiring model rejects one demographic at much higher rates. What is the most responsible response?",
      explanation: "Pause high-impact use, run fairness analysis, and remediate before continuing deployment decisions.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Pause deployment decisions, audit fairness metrics, and retrain with mitigation" },
        { id: "b", label: "Hide demographic fields and continue unchanged" },
        { id: "c", label: "Accept the output because the model is statistically optimized" },
        { id: "d", label: "Use human review only for random edge cases" },
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
    {
      key: "quiz4",
      prompt: "In the before/after workflow examples, what is the most common pattern?",
      explanation: "AI handles research and drafting; humans handle review and personalization.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "AI completely replaces the worker" },
        { id: "b", label: "AI handles heavy lifting; humans add judgment and finalize" },
        { id: "c", label: "AI only works for technical roles" },
        { id: "d", label: "There is no consistent pattern" },
      ],
    },
    {
      key: "quiz5",
      prompt: "According to the AI opportunities framework, what makes a task suitable for automation?",
      explanation: "Good candidates are repetitive, have easy-to-evaluate output, and involve digital data.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Repetitive, easy to evaluate output, digital data available" },
        { id: "b", label: "Any task that humans find boring" },
        { id: "c", label: "Only technical or analytical work" },
        { id: "d", label: "Tasks that happen only once per year" },
      ],
    },
    {
      key: "quiz6",
      prompt: "How are professional roles actually changing as AI advances?",
      explanation: "Roles shift toward judgment, strategy, and creativity. Rote work gets eliminated or shifts to lower-wage positions.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Most jobs will disappear entirely" },
        { id: "b", label: "Jobs shift: rote work decreases, judgment and strategy become more central" },
        { id: "c", label: "Jobs will stay exactly the same as before" },
        { id: "d", label: "Only junior positions are affected" },
      ],
    },
    {
      key: "quiz7",
      prompt: "Which KPI best shows that AI is improving team performance rather than just adding activity?",
      explanation: "Outcome metrics like cycle time, quality, and error rate are stronger signals than raw prompt volume.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Number of AI chats started per employee" },
        { id: "b", label: "Total tools subscribed this quarter" },
        { id: "c", label: "Reduced cycle time and rework while quality holds or improves" },
        { id: "d", label: "Average message length in prompts" },
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
    {
      key: "quiz6",
      prompt: "Which architecture best reduces risk for an agent that can spend money on purchases?",
      explanation: "High-risk actions should require policy checks and explicit human approval before execution.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Give one agent end-to-end authority for speed" },
        { id: "b", label: "Separate planning from execution and gate purchases with human approval" },
        { id: "c", label: "Rely only on post-action logs" },
      ],
    },
  ],
  "module-10": [
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
    {
      key: "quiz4",
      prompt: "Why do alignment and governance remain critical as models become more capable?",
      explanation: "Capability growth without constraints can increase real-world risk; governance sets boundaries for safe use.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Because bigger models always become unbiased automatically" },
        { id: "b", label: "Because regulation removes all technical risk" },
        { id: "c", label: "Because powerful systems need safeguards, oversight, and clear accountability" },
      ],
    },
    {
      key: "quiz5",
      prompt: "In a fast-changing AI landscape, which team behavior is most resilient?",
      explanation: "Teams that run small experiments, measure outcomes, and adapt quickly tend to outperform static plans.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Continuous learning with iterative experiments and reviews" },
        { id: "b", label: "Freeze tooling for two years to avoid disruption" },
        { id: "c", label: "Adopt every new model immediately without evaluation" },
      ],
    },
    {
      key: "quiz6",
      prompt: "Which statement best reflects a balanced view of AGI timelines?",
      explanation: "Timelines are uncertain, so practical preparation should focus on adaptability rather than rigid predictions.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "AGI will definitely arrive within exactly five years" },
        { id: "b", label: "No one can predict precisely, so build adaptable skills and governance now" },
        { id: "c", label: "AGI is impossible, so no preparation is needed" },
      ],
    },
  ],
} as const satisfies Record<string, readonly ModuleQuizQuestion[]>

