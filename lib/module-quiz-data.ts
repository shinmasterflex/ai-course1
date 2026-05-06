export type ModuleQuizOption = {
  id: string
  label: string
  explanation?: string
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
        { id: "a", label: "Any robot that looks human", explanation: "This focuses on physical appearance rather than capability. AI is about intelligent behavior, not humanoid form." },
        { id: "b", label: "Software that performs tasks that normally require human intelligence" },
        { id: "c", label: "A machine that can think exactly like a person", explanation: "Current AI doesn't replicate human thought. It recognizes patterns from data, which is different from true understanding." },
      ],
    },
    {
      key: "quiz2",
      prompt: "What kind of AI do we actually use today?",
      explanation: "Today's systems are narrow AI: strong at specific tasks, not general intelligence.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Narrow AI" },
        { id: "b", label: "Artificial general intelligence", explanation: "AGI (general-purpose AI across domains) remains theoretical. Today's systems excel at one task or domain, not across everything." },
        { id: "c", label: "Superintelligence", explanation: "Superintelligence doesn't exist yet. Even the most advanced AI systems today are narrow, not superintelligent." },
      ],
    },
    {
      key: "quiz3",
      prompt: "Which example is already a common everyday use of AI?",
      explanation: "Recommendation systems are one of the most common real-world AI applications.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "A household robot chef in every kitchen", explanation: "Household robot chefs are not yet practical or common. Robotics and culinary AI are still emerging technologies." },
        { id: "b", label: "A machine that understands everything like a human", explanation: "No current AI has human-level understanding across domains. This remains a future possibility, not today's reality." },
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
        { id: "b", label: "AI truly understands the world exactly like people do", explanation: "AI matches patterns without genuine understanding. This is the core misconception holding back realistic AI expectations." },
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
        { id: "b", label: "Midjourney", explanation: "Midjourney is a specialized image generation tool, not a general writing assistant." },
        { id: "c", label: "Luma AI", explanation: "Luma AI focuses on video generation, not general writing tasks." },
      ],
    },
    {
      key: "tools-quiz2",
      prompt: "What should you check before using AI-generated images commercially?",
      explanation: "Commercial rights and platform terms vary significantly across image tools.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Only whether the image looks realistic", explanation: "Realism has nothing to do with licensing rights. You could have a perfect-looking image but no legal right to use it commercially." },
        { id: "b", label: "Whether the tool has a mobile app", explanation: "Mobile app availability is irrelevant to commercial usage rights. Many tools work on web only but still grant commercial licenses." },
        { id: "c", label: "Ownership and usage terms" },
      ],
    },
    {
      key: "tools-quiz3",
      prompt: "Which tool category is best for cited research and browsing?",
      explanation: "Research-focused AI tools emphasize source-backed answers and synthesis.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "AI music generators", explanation: "Music generators create audio, not research or citations. They're for creative content, not evidence-based work." },
        { id: "b", label: "AI search and research tools" },
        { id: "c", label: "Voice cloning tools", explanation: "Voice cloning is for audio replication, not research synthesis or source verification." },
      ],
    },
    {
      key: "tools-matching",
      prompt: "What is the best first question before choosing any AI tool?",
      explanation: "The task definition comes first; tool choice follows the use case.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "What exact task am I trying to solve?" },
        { id: "b", label: "Which tool has the flashiest branding?", explanation: "Branding is marketing, not capability. A tool's popularity or appearance tells you nothing about whether it fits your actual need." },
        { id: "c", label: "Which tool is newest this week?", explanation: "Newness doesn't equal suitability. An older, stable tool often beats a trendy one that doesn't solve your problem." },
      ],
    },
    {
      key: "tools-quiz4",
      prompt: "You need repeatable quality from an AI writing workflow. Which setup is strongest?",
      explanation: "Reusable prompt templates, examples, and review criteria produce more consistent output than ad hoc prompting.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Use a different prompt style every time", explanation: "Different prompts every time lead to inconsistent outputs. Repeatable quality requires standardized approaches." },
        { id: "b", label: "Use a tested prompt template with clear quality criteria" },
        { id: "c", label: "Always choose the longest possible response", explanation: "Length doesn't equal quality. Longer responses often contain more filler and are harder to review consistently." },
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
        { id: "a", label: "It never uses data", explanation: "ML absolutely uses data—it's the foundation of learning. It learns patterns from data rather than relying on hard-coded rules." },
        { id: "b", label: "It learns from examples instead of only explicit rules" },
        { id: "c", label: "It always requires a robot body", explanation: "ML runs in software. It has nothing to do with physical robots or hardware bodies." },
      ],
    },
    {
      key: "quiz2",
      prompt: "Why is training data so important?",
      explanation: "The model learns from the examples it sees, so weak or biased data leads to weak or biased output.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "It only matters after deployment", explanation: "Training data is critical before deployment. Bad data during training ruins the model forever, regardless of later fixes." },
        { id: "b", label: "It is mostly for decoration in AI demos", explanation: "Data is the core of ML, not decoration. Poor data directly causes poor predictions." },
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
        { id: "b", label: "Learning with no data at all", explanation: "That's not learning—it's guessing. Supervised learning requires labels to guide the training process." },
        { id: "c", label: "Learning only through web browsing", explanation: "Web browsing is a data source, not a learning method. Supervised learning is a specific training methodology." },
      ],
    },
    {
      key: "matching",
      prompt: "Which limitation is true of current AI systems?",
      explanation: "Even powerful AI lacks human-style understanding, common sense, and reliable general reasoning.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "It always knows why its answer is correct", explanation: "Even sophisticated models struggle with explainability. They make correct predictions without understanding why." },
        { id: "b", label: "It can be powerful yet still fail without true understanding" },
        { id: "c", label: "It becomes unbiased automatically with more compute", explanation: "Compute alone doesn't fix bias. Biased data combined with more training just scales the bias." },
      ],
    },
    {
      key: "quiz4",
      prompt: "A model has 99% training accuracy but much lower validation accuracy. What is the strongest diagnosis?",
      explanation: "This pattern usually signals overfitting, where the model memorizes training examples instead of generalizing.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Overfitting to training data" },
        { id: "b", label: "Underfitting due to too little training", explanation: "Underfitting shows low accuracy on both training and validation. High training accuracy rules this out." },
        { id: "c", label: "A data leak in the validation set", explanation: "While possible, a data leak is rarer. The huge gap strongly suggests memorization (overfitting) instead." },
      ],
    },
    {
      key: "quiz5",
      prompt: "Which split strategy is best when evaluating a classifier with rare fraud cases?",
      explanation: "Stratified splitting preserves class proportions across train and validation sets, which is important for imbalanced labels.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Use only a random split and ignore class balance", explanation: "Random splits can accidentally create unbalanced folds. With rare events, this skews evaluation metrics." },
        { id: "b", label: "Train on all data and evaluate on the same data", explanation: "Training and testing on the same data gives fake accuracy. You'll never know how the model generalizes." },
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
        { id: "a", label: "Searches the internet every time by default", explanation: "LLMs don't automatically search the web. Most operate on learned knowledge without real-time lookup." },
        { id: "b", label: "Predicts the next token in sequence" },
        { id: "c", label: "Reads your mind to infer intent", explanation: "LLMs infer intent from your words, not directly from your mind. They're language models, not mind readers." },
      ],
    },
    {
      key: "quiz2",
      prompt: "Which prompt is most likely to get a useful result?",
      explanation: "Role, context, task, and format usually produce the clearest output.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Help me", explanation: "Too vague. The model has no context about what 'help' means. More detail always improves output." },
        { id: "b", label: "Write something good", explanation: "'Good' is undefined. Without specifics, you get generic responses. Details improve quality dramatically." },
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
        { id: "b", label: "Limiting the response to a few words", explanation: "That's output length control, not few-shot prompting. Few-shot is about showing examples of the pattern." },
        { id: "c", label: "Using AI only a few times per week", explanation: "That's about frequency of use, not a prompting technique. Few-shot is a specific method of teaching the model." },
      ],
    },
    {
      key: "exercise",
      prompt: "Which habit best improves prompting over time?",
      explanation: "Iterative refinement treats AI like a collaborator and usually produces better outcomes.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Assume the first prompt must be perfect", explanation: "Perfection on the first try is unrealistic. Iteration is how you discover what works." },
        { id: "b", label: "Refine the prompt with follow-up constraints and feedback" },
        { id: "c", label: "Avoid giving any context to keep the model unbiased", explanation: "Context actually improves focus. Less context leads to generic, unfocused responses." },
      ],
    },
    {
      key: "quiz4",
      prompt: "You need a model to return JSON only. Which prompt design is most reliable?",
      explanation: "Explicit output schema and constraints reduce ambiguity and improve format compliance.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Ask for a concise answer and hope it is valid JSON", explanation: "Hope isn't a strategy. Explicit format requirements and schema dramatically improve compliance." },
        { id: "b", label: "Provide a strict JSON schema and instruct: return valid JSON only" },
        { id: "c", label: "Use a shorter prompt to reduce token usage", explanation: "Shorter prompts often cause worse results. Format quality matters more than token savings." },
      ],
    },
    {
      key: "quiz5",
      prompt: "A response sounds confident but includes fabricated citations. Which prompting tactic helps most?",
      explanation: "Requiring verifiable sources and allowing abstention reduces hallucinated certainty.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Require source links and allow the model to say 'insufficient evidence'" },
        { id: "b", label: "Increase response length so the model can explain more", explanation: "Length doesn't fix fabrication. More text can actually embed more false claims." },
        { id: "c", label: "Remove all constraints to let the model reason freely", explanation: "Fewer constraints make hallucination worse. Constraints force verification and accountability." },
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
        { id: "b", label: "Feature engineering -> Train first -> Cleaning -> Collection", explanation: "This order is backwards. You can't train on dirty data or engineer features before collecting and cleaning data." },
        { id: "c", label: "Transformation -> Collection -> Evaluation -> Cleaning", explanation: "You can't transform data you haven't collected. Order matters: collect, clean, transform, then engineer." },
      ],
    },
    {
      key: "quiz2",
      prompt: "A churn model performs well for urban users but poorly for rural users. What is the most likely data-quality cause?",
      explanation: "This pattern often indicates representation bias: one group is well represented in training data while another is underrepresented.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Normalization was applied to the income column", explanation: "Normalization is a preprocessing step that shouldn't cause demographic performance gaps. The issue is in the data composition itself." },
        { id: "b", label: "The training data is biased toward urban examples" },
        { id: "c", label: "The model used too many epochs", explanation: "Epochs affect overfitting, not demographic bias. The problem is in what was learned, not how long it trained." },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is the best pairing of preprocessing techniques?",
      explanation: "Normalization rescales numeric values, and one-hot encoding converts categories into binary indicator columns.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Normalization removes duplicates; one-hot encoding fills missing values", explanation: "Wrong functions. Normalization scales ranges; deduplication and imputation are separate techniques." },
        { id: "b", label: "Normalization creates train/test split; one-hot encoding detects outliers", explanation: "Neither is true. Normalization scales values; splitting is sampling. One-hot encodes categories, not outliers." },
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
        { id: "b", label: "Convert country labels to one-hot vectors first", explanation: "One-hot encoding is a numeric transformation, not deduplication. Duplicates must be handled first." },
        { id: "c", label: "Increase model complexity to memorize all rows", explanation: "Memorization doesn't remove duplicates; it amplifies their effect. The data problem must be fixed, not memorized." },
      ],
    },
    {
      key: "quiz4",
      prompt: "Which metric is more informative than accuracy for a highly imbalanced medical screening dataset?",
      explanation: "With class imbalance, precision/recall tradeoffs and F1 are often more meaningful than raw accuracy.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Only training loss", explanation: "Training loss tells you about optimization, not real-world performance on imbalanced classes." },
        { id: "b", label: "Only overall accuracy", explanation: "Accuracy is misleading on imbalanced data. A model can achieve 99% accuracy by always predicting the majority class." },
        { id: "c", label: "Precision, recall, and F1" },
      ],
    },
    {
      key: "quiz5",
      prompt: "When should missing values be imputed using statistics from the training set only?",
      explanation: "Imputation parameters should come from training data to avoid leaking validation/test information.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "After combining train and test data for consistency", explanation: "Combining splits before imputation causes data leakage. You'll use test information during training." },
        { id: "b", label: "Before evaluation, fit imputers on training data and apply to other splits" },
        { id: "c", label: "Only after model deployment", explanation: "Imputation should happen during development. Waiting until after deployment means evaluating on dirty data." },
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
        { id: "a", label: "Avoid using clear names for inputs", explanation: "Variables and types actually enforce clarity. This is backwards—types prevent confusion." },
        { id: "b", label: "Store the right kind of value and use it safely" },
        { id: "c", label: "Replace all conditionals with loops", explanation: "Variables don't replace conditionals. They're separate concepts for different purposes." },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the main benefit of conditionals and loops in AI workflows?",
      explanation: "Conditionals route different cases, and loops apply the same logic across many inputs.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "They make every input follow one fixed path", explanation: "That's the opposite. Conditionals branch into multiple paths; loops repeat logic, not fix it." },
        { id: "b", label: "They remove the need for functions", explanation: "Functions, conditionals, and loops are complementary. None replaces the others." },
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
        { id: "b", label: "Rewrite the script from scratch", explanation: "Rewriting loses all progress. Understanding the error is faster and teaches you more." },
        { id: "c", label: "Change random lines until output looks right", explanation: "Random changes create new bugs and hide the root cause. This is the opposite of debugging." },
      ],
    },
    {
      key: "quiz4",
      prompt: "A function updates a global variable and causes unpredictable behavior. What is the best refactor?",
      explanation: "Returning values explicitly and passing data as parameters reduces side effects and improves testability.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Keep the global variable and add more print statements", explanation: "Print statements are debugging aids, not fixes. Globals cause the unpredictability; removing them fixes it." },
        { id: "b", label: "Wrap the function in a loop", explanation: "Loops don't fix side effects. In fact, they'd amplify the problem by calling the function repeatedly." },
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
        { id: "b", label: "Only in the database layer", explanation: "Database validation is late. Invalid data reaches business logic first, causing cascading failures." },
        { id: "c", label: "Only after model inference", explanation: "Validating after inference wastes computation on bad data. Validate first, compute later." },
      ],
    },
    {
      key: "quiz6",
      prompt: "Which test gives the fastest signal that a utility function still works after refactoring?",
      explanation: "A focused unit test checks one function's behavior quickly and isolates regressions.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "A manual end-to-end walkthrough only", explanation: "Manual tests are slow and error-prone. Automated unit tests give instant feedback on refactors." },
        { id: "b", label: "A small unit test with deterministic inputs and expected outputs" },
        { id: "c", label: "A load test against production", explanation: "Load tests check scale, not correctness. They're slow and wrong for validating refactors." },
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
        { id: "b", label: "Only after the model is deployed", explanation: "Bias starts in training data and compounds through deployment. Waiting until deployment is too late to fix." },
        { id: "c", label: "Only when users ask malicious prompts", explanation: "Users don't create bias; biased training data does. Bad prompts reveal existing bias but don't cause it." },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the safest default for sensitive personal data?",
      explanation: "Sensitive personal data should not be pasted into public AI tools without strong approval and controls.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Paste it if the response would be helpful", explanation: "Usefulness doesn't justify privacy risk. Helpful output isn't worth potential data breach." },
        { id: "b", label: "Paste it only once", explanation: "Once is too many. The number of times doesn't matter; sensitive data shouldn't go to public tools." },
        { id: "c", label: "Do not enter it into general AI chat tools" },
      ],
    },
    {
      key: "quiz3",
      prompt: "Why should AI detection tools be used carefully?",
      explanation: "They provide signals, not proof, and false positives can be serious.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "They are illegal in most countries", explanation: "AI detection tools aren't universally illegal. The real issue is reliability—they make mistakes." },
        { id: "b", label: "They are probabilistic and can wrongly flag human work" },
        { id: "c", label: "They only work on audio", explanation: "AI detection tools work on text too. The core issue is accuracy, not media type." },
      ],
    },
    {
      key: "quiz4",
      prompt: "When you discover an AI system has historical bias in its training data, what is the most responsible first step?",
      explanation: "Understanding and fixing bias at the source is better than applying surface-level workarounds. Audit the data, identify the problem, then retrain or adjust the model.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Use the system anyway and hope the bias does not show up in practice", explanation: "Ignoring known bias is irresponsible. It will show up and cause real harm." },
        { id: "b", label: "Audit the training data and adjust the model to reduce bias before deploying" },
        { id: "c", label: "Randomly change the outputs to appear more balanced", explanation: "Random changes don't fix bias; they hide it and create new unpredictable problems." },
        { id: "d", label: "Stop using the system entirely", explanation: "Complete abandonment is often too extreme. Fix the issue and use the system responsibly." },
      ],
    },
    {
      key: "quiz5",
      prompt: "What should you do if you receive a realistic deepfake video of someone you know requesting urgent action?",
      explanation: "Verify through a separate, trusted channel. Urgency and realism are classic misinformation tactics. The safest move is to slow down and confirm.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Act immediately based on the video", explanation: "Urgency is a red flag. Authentic requests can always wait for verification through another channel." },
        { id: "b", label: "Forward it to others for their opinion", explanation: "Forwarding spreads misinformation. Verify directly with the source instead." },
        { id: "c", label: "Contact the person through a different, trusted channel to verify" },
        { id: "d", label: "Assume advanced deepfakes are impossible", explanation: "Deepfakes are real and increasingly convincing. Don't assume they're impossible." },
      ],
    },
    {
      key: "quiz6",
      prompt: "A hiring model rejects one demographic at much higher rates. What is the most responsible response?",
      explanation: "Pause high-impact use, run fairness analysis, and remediate before continuing deployment decisions.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Pause deployment decisions, audit fairness metrics, and retrain with mitigation" },
        { id: "b", label: "Hide demographic fields and continue unchanged", explanation: "Hiding fields doesn't fix bias; it hides discrimination. Audit and fix the root cause." },
        { id: "c", label: "Accept the output because the model is statistically optimized", explanation: "Statistical optimization doesn't justify fairness violations. High-impact decisions need fairness, not just accuracy." },
        { id: "d", label: "Use human review only for random edge cases", explanation: "Random review misses systematic bias. High-impact hiring needs consistent fairness oversight." },
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
        { id: "b", label: "Tasks requiring judgment and relationship-building", explanation: "These require human judgment and emotional intelligence. They're the least automatable." },
        { id: "c", label: "Only physical jobs", explanation: "Physical jobs are just one category. Automation threatens routine work across all domains." },
      ],
    },
    {
      key: "quiz2",
      prompt: "What is the most practical AI career move for many people?",
      explanation: "AI fluency within your existing domain is often the highest-leverage move.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Quit immediately and become an ML researcher", explanation: "Career switches are risky and slow. You have more leverage starting from your existing expertise." },
        { id: "b", label: "Ignore AI until regulations settle", explanation: "Regulations change slowly. Waiting leaves you behind and unprepared." },
        { id: "c", label: "Become highly AI-fluent in your current domain" },
      ],
    },
    {
      key: "quiz3",
      prompt: "What is a strong first step in an individual AI strategy?",
      explanation: "Start by auditing your recurring tasks and identifying where AI can help.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Try every new AI tool you see", explanation: "Tool chasing wastes time. Understand your problems first, then choose tools." },
        { id: "b", label: "Audit your weekly tasks and identify opportunities" },
        { id: "c", label: "Automate all client-facing work immediately", explanation: "Client work is sensitive. Start with internal work and test carefully first." },
      ],
    },
    {
      key: "quiz4",
      prompt: "In the before/after workflow examples, what is the most common pattern?",
      explanation: "AI handles research and drafting; humans handle review and personalization.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "AI completely replaces the worker", explanation: "Real workflows use AI for heavy lifting. Workers aren't replaced; their work is redirected." },
        { id: "b", label: "AI handles heavy lifting; humans add judgment and finalize" },
        { id: "c", label: "AI only works for technical roles", explanation: "AI helps across all roles: writing, analysis, design, customer service, and more." },
        { id: "d", label: "There is no consistent pattern", explanation: "The pattern is consistent: humans move from routine work to judgment and quality work." },
      ],
    },
    {
      key: "quiz5",
      prompt: "According to the AI opportunities framework, what makes a task suitable for automation?",
      explanation: "Good candidates are repetitive, have easy-to-evaluate output, and involve digital data.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Repetitive, easy to evaluate output, digital data available" },
        { id: "b", label: "Any task that humans find boring", explanation: "Boring doesn't mean automatable. The task must have clear criteria and digital inputs." },
        { id: "c", label: "Only technical or analytical work", explanation: "Automation applies to writing, design, customer service, and many non-technical tasks." },
        { id: "d", label: "Tasks that happen only once per year", explanation: "One-off tasks often aren't worth automating. Repetition is key to ROI." },
      ],
    },
    {
      key: "quiz6",
      prompt: "How are professional roles actually changing as AI advances?",
      explanation: "Roles shift toward judgment, strategy, and creativity. Rote work gets eliminated or shifts to lower-wage positions.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Most jobs will disappear entirely", explanation: "Most jobs transform, not disappear. Routine components are automated; judgment components remain." },
        { id: "b", label: "Jobs shift: rote work decreases, judgment and strategy become more central" },
        { id: "c", label: "Jobs will stay exactly the same as before", explanation: "Jobs are already changing. Ignoring this leaves you uncompetitive." },
        { id: "d", label: "Only junior positions are affected", explanation: "All levels are affected. Executives face AI for analysis; managers for delegation; everyone adapts." },
      ],
    },
    {
      key: "quiz7",
      prompt: "Which KPI best shows that AI is improving team performance rather than just adding activity?",
      explanation: "Outcome metrics like cycle time, quality, and error rate are stronger signals than raw prompt volume.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Number of AI chats started per employee", explanation: "Chat volume is busywork, not impact. More chats doesn't mean better outcomes." },
        { id: "b", label: "Total tools subscribed this quarter", explanation: "Tool count is infrastructure spending, not performance improvement." },
        { id: "c", label: "Reduced cycle time and rework while quality holds or improves" },
        { id: "d", label: "Average message length in prompts", explanation: "Message length is effort, not impact. Short, focused prompts are often better." },
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
        { id: "a", label: "Agents always have a voice interface", explanation: "Voice is an interface, not a defining feature. Agents work with text, code, APIs, and more." },
        { id: "b", label: "Agents can use tools and act toward a goal" },
        { id: "c", label: "Agents are always open source", explanation: "Source code licensing is irrelevant to what an agent does. Both open and closed agents can plan and act." },
      ],
    },
    {
      key: "quiz2",
      prompt: "What role does memory play in an agent?",
      explanation: "Memory helps the agent preserve context across steps or sessions.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "It preserves context and history" },
        { id: "b", label: "It replaces all need for tools", explanation: "Memory and tools are different. Memory recalls information; tools take action." },
        { id: "c", label: "It guarantees perfect accuracy", explanation: "Memory doesn't guarantee accuracy. Retrieved information can still be wrong or incomplete." },
      ],
    },
    {
      key: "quiz3",
      prompt: "Why is least privilege important for agents?",
      explanation: "Agents should only access the minimum tools and data needed for a task.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "It makes the UI look cleaner", explanation: "UI aesthetics are unrelated to security. Limiting tools is about risk control, not design." },
        { id: "b", label: "It improves model creativity", explanation: "Creativity isn't improved by fewer tools. Creativity comes from the model, not tool count." },
        { id: "c", label: "It reduces harm if the agent makes a mistake or is attacked" },
      ],
    },
    {
      key: "quiz4",
      prompt: "What is a multi-agent system?",
      explanation: "A multi-agent system coordinates several specialized agents on parts of the overall task.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "One large model with a dark mode UI", explanation: "Dark mode is cosmetic. Multi-agent systems are about architecture, not UI themes." },
        { id: "b", label: "Several specialized agents working together" },
        { id: "c", label: "An agent that runs on multiple monitors", explanation: "Multiple monitors are a user setup issue. Multi-agent is about multiple specialized systems." },
      ],
    },
    {
      key: "quiz5",
      prompt: "What is the safest way to start deploying an agent?",
      explanation: "Start with narrow scope, minimal permissions, and strong monitoring.",
      correctOptionId: "a",
      options: [
        { id: "a", label: "Start small with clear limits and logging" },
        { id: "b", label: "Give it full write access immediately", explanation: "Full access from day one is dangerous. Start with read-only or minimal mutations." },
        { id: "c", label: "Skip human review because agents are faster", explanation: "Speed doesn't replace oversight. Critical decisions need human review even with fast agents." },
      ],
    },
    {
      key: "quiz6",
      prompt: "Which architecture best reduces risk for an agent that can spend money on purchases?",
      explanation: "High-risk actions should require policy checks and explicit human approval before execution.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "Give one agent end-to-end authority for speed", explanation: "Speed isn't worth the risk. Financial decisions need governance and approval gates." },
        { id: "b", label: "Separate planning from execution and gate purchases with human approval" },
        { id: "c", label: "Rely only on post-action logs", explanation: "Logs are useful for auditing but don't prevent damage. Approval before execution is required." },
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
        { id: "a", label: "Static expert systems", explanation: "Expert systems are rules-based, not action-oriented. They reason but don't take initiative." },
        { id: "b", label: "AI agents" },
        { id: "c", label: "Spreadsheet macros", explanation: "Macros are scripted automation. Agents reason and decide dynamically." },
      ],
    },
    {
      key: "quiz2",
      prompt: "What best describes AGI in this module?",
      explanation: "AGI is a hypothetical system that could perform across domains at human level or beyond.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "A proven technology already in widespread use", explanation: "AGI is purely theoretical. No proven AGI systems exist today." },
        { id: "b", label: "Any chatbot with internet access", explanation: "Internet access doesn't make a system general. Chatbots are still narrow and specialized." },
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
        { id: "b", label: "Wait until the technology stops changing", explanation: "Technology never stops changing. Waiting is falling behind. Continuous learning is the strategy." },
        { id: "c", label: "Memorize a single tool and ignore the rest", explanation: "Single tools become obsolete. Adaptability across multiple tools is what matters." },
      ],
    },
    {
      key: "quiz4",
      prompt: "Why do alignment and governance remain critical as models become more capable?",
      explanation: "Capability growth without constraints can increase real-world risk; governance sets boundaries for safe use.",
      correctOptionId: "c",
      options: [
        { id: "a", label: "Because bigger models always become unbiased automatically", explanation: "Scale doesn't fix bias. Larger models can amplify bias if data is biased." },
        { id: "b", label: "Because regulation removes all technical risk", explanation: "Regulation helps but doesn't eliminate risk. Technical safeguards are also necessary." },
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
        { id: "b", label: "Freeze tooling for two years to avoid disruption", explanation: "Freezing for two years means missing innovation and falling behind competitors." },
        { id: "c", label: "Adopt every new model immediately without evaluation", explanation: "Adopting everything immediately creates chaos. Evaluation is necessary before commitment." },
      ],
    },
    {
      key: "quiz6",
      prompt: "Which statement best reflects a balanced view of AGI timelines?",
      explanation: "Timelines are uncertain, so practical preparation should focus on adaptability rather than rigid predictions.",
      correctOptionId: "b",
      options: [
        { id: "a", label: "AGI will definitely arrive within exactly five years", explanation: "No one can predict exactly. Overconfident timelines lead to poor planning." },
        { id: "b", label: "No one can predict precisely, so build adaptable skills and governance now" },
        { id: "c", label: "AGI is impossible, so no preparation is needed", explanation: "Dismissing AGI outright is also overconfident. Reasonable preparation is prudent regardless." },
      ],
    },
  ],
} as const satisfies Record<string, readonly ModuleQuizQuestion[]>

