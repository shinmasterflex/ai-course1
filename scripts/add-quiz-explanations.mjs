/**
 * Adds optionExplanations props to every QuickCheckCard across all module pages.
 * Each quiz card gets per-answer feedback keyed by option id.
 * Run: node scripts/add-quiz-explanations.mjs
 */

import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")

/**
 * Each entry matches by `explanation` (unique per card) and supplies:
 *   file         – module page path relative to ROOT
 *   explanation  – the existing explanation prop value (used as the matching anchor)
 *   optionExplanations – record of id → feedback string
 */
const QUIZ_PATCHES = [
  // ─── MODULE 0 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-0/page.tsx",
    explanation: "Exactly. Early practical fluency compounds and creates leverage in study and work.",
    optionExplanations: {
      a: "Waiting makes things harder — the field will keep changing. Early movers build habits and advantages while others pause.",
      b: "Exactly. Early practical fluency compounds and creates leverage in study and work.",
      c: "AI is transforming every industry. Writers, managers, teachers, and healthcare workers all benefit from AI fluency.",
      d: "Prompting is actually one of the most important practical skills. The right framing produces dramatically better results.",
    },
  },
  {
    file: "app/course/module-0/page.tsx",
    explanation: "Perfect. The next module builds practical understanding by defining AI clearly and separating hype from reality.",
    optionExplanations: {
      a: "Treating AI as pure theory means you will never build the practical skill that makes the difference.",
      b: "Perfect. The next module builds practical understanding by defining AI clearly and separating hype from reality.",
      c: "Skipping fundamentals leads to fragile, unreliable use. Foundations make advanced work faster, not slower.",
      d: "Assuming all AI claims are true is one of the most common traps. Critical thinking about AI output is an essential skill.",
    },
  },

  // ─── MODULE 1 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-1/page.tsx",
    explanation: "Exactly. This module is about useful mental models and practical clarity, not hype or heavy math.",
    optionExplanations: {
      a: "Memorising buzzwords without understanding is not the goal. Application and clear thinking matter far more.",
      b: "Exactly. This module is about useful mental models and practical clarity, not hype or heavy math.",
      c: "Heavy model-training math is not the focus here. This module is about practical literacy, not research engineering.",
      d: "Immediately replacing all workflows is risky and premature. Sustainable skill starts with careful, verifiable first steps.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "Pattern recognition in data is the core mechanism behind virtually all AI systems - from spam filters to image generators to language models.",
    optionExplanations: {
      a: "AI does not require a physical body. Spam filters, language models, and recommendation engines all run as software with no body.",
      b: "Pattern recognition in data is the core mechanism behind virtually all AI systems - from spam filters to image generators to language models.",
      c: "AI does not understand the world like a human. It finds statistical patterns in data and applies them — without awareness or lived experience.",
      d: "Most AI systems do not browse the internet during inference. They apply patterns learned during training, often with a knowledge cutoff date.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "AlexNet's large accuracy gap over prior approaches at the 2012 ImageNet competition convinced the entire research community to switch to deep learning. It is widely considered the starting gun for modern AI.",
    optionExplanations: {
      a: "Beating humans at chess was Deep Blue in 1997, not AlexNet. AlexNet was about image recognition, not chess.",
      b: "AlexNet's large accuracy gap over prior approaches at the 2012 ImageNet competition convinced the entire research community to switch to deep learning. It is widely considered the starting gun for modern AI.",
      c: "ChatGPT launched in 2022. AlexNet was a 2012 image recognition breakthrough, a decade earlier.",
      d: "AI winters have happened before and could happen again. AlexNet's significance was the accuracy jump it achieved, not a proof of permanence.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "Spam filtering is a classic narrow AI task: specific, pattern-based, and trainable from large numbers of examples.",
    optionExplanations: {
      a: "Diagnosing every human problem across all domains describes AGI, not narrow AI. Current AI is specialised by task and domain.",
      b: "Spam filtering is a classic narrow AI task: specific, pattern-based, and trainable from large numbers of examples.",
      c: "Understanding the world like a human child requires general intelligence, reasoning, and embodied experience — none of which current AI systems have.",
      d: "Transferring common sense instantly to any new task is a hallmark of hypothetical AGI, not today's narrow AI systems.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "Correct. Durable skill starts with one low-risk, reviewable workflow and strong verification habits.",
    optionExplanations: {
      a: "High-stakes legal decisions require qualified experts and verified sources. Using unverified AI output here creates serious risk.",
      b: "Correct. Durable skill starts with one low-risk, reviewable workflow and strong verification habits.",
      c: "Automating multiple workflows before checking quality amplifies mistakes at scale. Prove one thing works first.",
      d: "Sharing confidential documents in public AI tools can expose sensitive data and violates most organisational policies.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "This is the realistic middle path: keep productivity gains while adding safeguards where errors matter most.",
    optionExplanations: {
      a: "Completely disabling a tool because it is not perfect discards significant value. Most useful tools have some failure rate — the answer is safeguards, not removal.",
      b: "This is the realistic middle path: keep productivity gains while adding safeguards where errors matter most.",
      c: "Trusting AI for all responses without review creates accountability risk, especially for complex or sensitive customer situations.",
      d: "Limiting AI to cases where customers ask for it misses most of the efficiency benefit. The issue is oversight, not opt-in.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "This course frames AI as powerful but limited: useful for support and acceleration, but still requiring human oversight and verification.",
    optionExplanations: {
      a: "AI is neither magical nor useless — it is a capable but limited tool. Binary thinking leads to both overreliance and under-use.",
      b: "This course frames AI as powerful but limited: useful for support and acceleration, but still requiring human oversight and verification.",
      c: "AI processes tokens to predict language patterns. It does not understand meaning or intent the way humans do.",
      d: "AI outputs are starting points, not verified facts. Treating them as ground truth without checking is one of the most common beginner mistakes.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "Grammarly is the editing and tone-adjustment tool, especially for improving writing inside existing workflows.",
    optionExplanations: {
      a: "Grammarly is the editing and tone-adjustment tool, especially for improving writing inside existing workflows.",
      b: "Midjourney is an image generation tool, not a writing or grammar assistant.",
      c: "Stable Diffusion generates images from text prompts. It is not for grammar or tone improvement.",
      d: "Otter.ai focuses on transcription and meeting notes, not grammar or tone editing.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "Firefly is the strongest fit for commercially safer creative workflows tied to Adobe tools.",
    optionExplanations: {
      a: "Firefly is the strongest fit for commercially safer creative workflows tied to Adobe tools.",
      b: "Midjourney is powerful but not specifically designed for commercial safety guarantees or Adobe integration.",
      c: "Community Stable Diffusion models often use training data without clear commercial licensing — risky for commercial projects.",
      d: "Rights always matter, especially for commercial use. Ignoring copyright and licensing exposes you to legal risk.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "The video category is the direct fit for text-to-video generation. Sora and RunwayML are named specifically for that use case.",
    optionExplanations: {
      a: "The video category is the direct fit for text-to-video generation. Sora and RunwayML are named specifically for that use case.",
      b: "ElevenLabs generates synthetic voice audio, not video clips.",
      c: "Uizard is a UI/UX prototyping tool. It does not generate video from text prompts.",
      d: "Jasper is a writing assistant for text content — it does not produce video.",
    },
  },
  {
    file: "app/course/module-1/page.tsx",
    explanation: "Good tool selection starts with the job, then privacy and risk, then the simplest tool that fits, followed by output verification.",
    optionExplanations: {
      a: "Picking the newest brand first inverts the priority order. Tool choice should follow the task, not the marketing cycle.",
      b: "Good tool selection starts with the job, then privacy and risk, then the simplest tool that fits, followed by output verification.",
      c: "More advanced tools are not always better. They are often more complex and harder to verify. Choose the simplest suitable option.",
      d: "Starting with automation before proving a simple use case often results in wasted effort. Walk before you run.",
    },
  },

  // ─── MODULE 2 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-2/page.tsx",
    explanation: "Machine learning is most useful when there are lots of examples but the pattern would be difficult or fragile to capture with explicit rules.",
    optionExplanations: {
      a: "When every rule is obvious and never changes, traditional software is a better fit than machine learning.",
      b: "Machine learning is most useful when there are lots of examples but the pattern would be difficult or fragile to capture with explicit rules.",
      c: "Machine learning requires training data. With no data, there is nothing for the model to learn from.",
      d: "Most AI software runs without a physical body. Robotics is one application, but it is not a prerequisite for ML.",
    },
  },
  {
    file: "app/course/module-2/page.tsx",
    explanation: "Correct. Better data quality and coverage usually produce the biggest performance and fairness gains.",
    optionExplanations: {
      a: "A better UI does not change what a model learns or improves its accuracy.",
      b: "Correct. Better data quality and coverage usually produce the biggest performance and fairness gains.",
      c: "Longer system prompts affect inference behaviour, but do not change the trained model's underlying capabilities.",
      d: "Labels are essential for supervised learning. Removing them makes it impossible for the model to learn correct mappings.",
    },
  },
  {
    file: "app/course/module-2/page.tsx",
    explanation: "Models learn from the examples they receive. If those examples are skewed, missing context, or mislabeled, the model will reproduce those flaws.",
    optionExplanations: {
      a: "Weak data makes models less accurate and more biased — not more creative. Creativity in AI comes from diversity of training data, not from flaws in it.",
      b: "Models learn from the examples they receive. If those examples are skewed, missing context, or mislabeled, the model will reproduce those flaws.",
      c: "Models do not automatically detect and fix bad labels. Cleaning data is a deliberate human and engineering process.",
      d: "Data problems go far beyond the user interface. They affect every prediction the model makes at its core.",
    },
  },
  {
    file: "app/course/module-2/page.tsx",
    explanation: "Customer segmentation is a classic unsupervised learning problem because the system is discovering groups in unlabeled data.",
    optionExplanations: {
      a: "Supervised learning requires labeled examples with known correct outputs. Customer segments are unknown upfront, so supervised learning does not apply here.",
      b: "Customer segmentation is a classic unsupervised learning problem because the system is discovering groups in unlabeled data.",
      c: "Reinforcement learning learns through reward signals from actions in an environment, not from discovering static groups in transaction data.",
      d: "Unsupervised learning is exactly the right fit here. It is the correct answer.",
    },
  },
  {
    file: "app/course/module-2/page.tsx",
    explanation: "Training repeatedly adjusts the network's internal weights (parameters) using backpropagation so its predictions become more accurate over many examples.",
    optionExplanations: {
      a: "Memorising examples exactly causes overfitting — the model fails on new data it has not seen before.",
      b: "Training repeatedly adjusts the network's internal weights (parameters) using backpropagation so its predictions become more accurate over many examples.",
      c: "Neural networks do not browse the web. They apply learned patterns from training data, which has a knowledge cutoff date.",
      d: "Training uses labeled data examples, not human intuition. Human judgment is used to evaluate and guide the process, not replace the data.",
    },
  },
  {
    file: "app/course/module-2/page.tsx",
    explanation: "Exactly. AI is strongest as a decision-support partner, not a replacement for verification and accountability.",
    optionExplanations: {
      a: "Fluent output does not mean correct output. AI can sound completely confident while hallucinating facts or missing critical context.",
      b: "Exactly. AI is strongest as a decision-support partner, not a replacement for verification and accountability.",
      c: "Hallucinations occur regardless of prompt length. The fix is verification and human review, not shorter prompts.",
      d: "Even the latest models can fail on edge cases. Model version alone is not a substitute for domain expertise and verification.",
    },
  },
  {
    file: "app/course/module-2/page.tsx",
    explanation: "Hallucinations are especially dangerous because they often come with complete confidence and plausible-looking supporting details. AI has no internal fact-checking - fluency and accuracy are independent.",
    optionExplanations: {
      a: "Hallucinations are especially dangerous because they often come with complete confidence and plausible-looking supporting details. AI has no internal fact-checking - fluency and accuracy are independent.",
      b: "AI citations can be fabricated. A source-looking reference does not mean the source exists or that it says what the model claims.",
      c: "AI hallucinations often come with perfectly formatted citations and references. Formatting is not a reliability indicator.",
      d: "Confidence and hallucination problems exist across model sizes. Larger models can still hallucinate plausibly and convincingly.",
    },
  },

  // ─── MODULE 3 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-3/page.tsx",
    explanation: "Exactly. This module is about getting better output through better understanding and prompting habits.",
    optionExplanations: {
      a: "This module goes well beyond history and regulation — it is an applied practice module for real prompt improvement.",
      b: "Exactly. This module is about getting better output through better understanding and prompting habits.",
      c: "Building new models from scratch requires deep engineering expertise and is not the focus of this course.",
      d: "Replacing verification with automation is the opposite of what this module teaches. Human review is essential.",
    },
  },
  {
    file: "app/course/module-3/page.tsx",
    explanation: "LLMs tokenise text into chunks. 'strawberry' might become 'straw' + 'berry', making individual letter-counting difficult since the model never sees raw characters — only token sequences.",
    optionExplanations: {
      a: "Internet access would not help with letter-counting. The challenge is that LLMs process tokens, not individual characters.",
      b: "LLMs tokenise text into chunks. 'strawberry' might become 'straw' + 'berry', making individual letter-counting difficult since the model never sees raw characters — only token sequences.",
      c: "Letter-counting tasks are well represented in training data. The issue is not lack of examples — it is the tokenisation architecture.",
      d: "LLMs understand the English alphabet well enough to work with text. The specific challenge with counting letters is the token-based representation, not alphabet knowledge.",
    },
  },
  {
    file: "app/course/module-3/page.tsx",
    explanation: "Temperature controls how randomly the model samples from its output probability distribution. At default settings, the same prompt can produce different responses because sampling introduces controlled randomness.",
    optionExplanations: {
      a: "LLMs do not search the web unless given specific tools. The same model can produce different answers to the same question due to sampling randomness.",
      b: "Temperature controls how randomly the model samples from its output probability distribution. At default settings, the same prompt can produce different responses because sampling introduces controlled randomness.",
      c: "Models are not updated between individual user queries. Variation comes from the probabilistic sampling built into the generation process.",
      d: "LLMs do not forget previous answers — they produce varied outputs because generation is probabilistic, not because of memory failure.",
    },
  },
  {
    file: "app/course/module-3/page.tsx",
    explanation: "The prompt is under-specified. Adding context, constraints, and examples usually makes the response far more useful and reliable.",
    optionExplanations: {
      a: "The prompt is under-specified. Adding context, constraints, and examples usually makes the response far more useful and reliable.",
      b: "Spelling is fine in this prompt. The problem is that there is no audience, no dietary restrictions, no duration, and no goals specified.",
      c: "The model does not need updating — the prompt needs more detail. Model capability is not the limiting factor here.",
      d: "Internet access would not fix a vague prompt. Specificity and context matter more than connectivity.",
    },
  },
  {
    file: "app/course/module-3/page.tsx",
    explanation: "The safest and fastest way to build skill is to start with low-risk summarising, drafting, or organising tasks where you can easily review the result.",
    optionExplanations: {
      a: "Pasting a confidential contract into a public chatbot creates a serious privacy and data security risk.",
      b: "The safest and fastest way to build skill is to start with low-risk summarising, drafting, or organising tasks where you can easily review the result.",
      c: "Using AI for final decisions without checking is the opposite of responsible practice. Review is non-negotiable.",
      d: "Waiting until you can build a full automation means missing months of incremental benefit. A single summarising task is a better starting point.",
    },
  },

  // ─── MODULE 4 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-4/page.tsx",
    explanation: "This module is about understanding the data lifecycle - from raw collection through to the clean, structured inputs that machine learning models need.",
    optionExplanations: {
      a: "Building neural networks from scratch is a different course entirely. This module focuses on data understanding.",
      b: "This module is about understanding the data lifecycle - from raw collection through to the clean, structured inputs that machine learning models need.",
      c: "Database query syntax is not the focus. Understanding what data is and how it is prepared matters far more for AI literacy.",
      d: "Installing a pipeline tool is a technical implementation step, not the conceptual goal of this module.",
    },
  },
  {
    file: "app/course/module-4/page.tsx",
    explanation: "Text files with no fixed columns or schema are unstructured data. Spreadsheets, database tables, and CSVs are all structured.",
    optionExplanations: {
      a: "A spreadsheet of sales figures has defined rows, columns, and data types — that makes it structured data.",
      b: "A database table has a strict schema with named columns and data types — clearly structured data.",
      c: "Text files with no fixed columns or schema are unstructured data. Spreadsheets, database tables, and CSVs are all structured.",
      d: "A CSV export has delimited columns and a header row — it is structured data, even though it is a flat file.",
    },
  },
  {
    file: "app/course/module-4/page.tsx",
    explanation: "Models learn from the patterns in their training data. If the data over-represents certain groups or periods, the model inherits those biases.",
    optionExplanations: {
      a: "Data source problems affect model quality and fairness far more than storage cost — that is a minor operational concern.",
      b: "Models learn from the patterns in their training data. If the data over-represents certain groups or periods, the model inherits those biases.",
      c: "Training data source problems affect all data types including text. NLP models can carry significant social bias from their text training corpora.",
      d: "Models do not automatically correct for data source problems. Addressing bias requires deliberate curation, resampling, and auditing.",
    },
  },
  {
    file: "app/course/module-4/page.tsx",
    explanation: "Models learn the patterns in their training data. If that data has errors, gaps, or biases, the model's predictions will reflect those flaws.",
    optionExplanations: {
      a: "The phrase is not about output volume — it is about quality. The quantity of output is not the concern.",
      b: "Models learn the patterns in their training data. If that data has errors, gaps, or biases, the model's predictions will reflect those flaws.",
      c: "Models do not automatically retrain on new data unless explicitly set up to do so. Retraining is a deliberate process.",
      d: "Garbage collection in programming is unrelated. The AI context is entirely about data quality and its impact on model performance.",
    },
  },
  {
    file: "app/course/module-4/page.tsx",
    explanation: "The test set is kept completely separate until final evaluation. Using it earlier would cause you to overfit your model to those examples.",
    optionExplanations: {
      a: "Using the test set during training is a form of data leakage that inflates measured performance and produces unreliable models.",
      b: "The validation set is used for hyperparameter tuning. The test set is reserved strictly for final, unbiased evaluation.",
      c: "The test set is kept completely separate until final evaluation. Using it earlier would cause you to overfit your model to those examples.",
      d: "Discarding the test set after cleaning would make final unbiased evaluation impossible. It must be preserved separately.",
    },
  },
  {
    file: "app/course/module-4/page.tsx",
    explanation: "Feature engineering means creating new features - transforming or combining raw data into variables that better represent the underlying patterns the model should learn.",
    optionExplanations: {
      a: "Deleting irrelevant columns is feature selection or dimensionality reduction, not feature engineering.",
      b: "Feature engineering means creating new features - transforming or combining raw data into variables that better represent the underlying patterns the model should learn.",
      c: "Choosing a model architecture is a separate step that follows data preparation. It is not feature engineering.",
      d: "Scaling numerical values (normalisation) is data preprocessing, not feature engineering. Feature engineering creates new variables, not adjusts existing ranges.",
    },
  },

  // ─── MODULE 5 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-5/page.tsx",
    explanation: "Correct. A boolean expresses a yes/no state, such as whether an output should be reviewed by a human.",
    optionExplanations: {
      a: "A string prompt stores text content, not a true/false state. Booleans represent binary conditions.",
      b: "A token limit stores a numeric count — that is an integer, not a boolean.",
      c: "Correct. A boolean expresses a yes/no state, such as whether an output should be reviewed by a human.",
      d: "A list of keywords is a list (or array) data type, not a boolean.",
    },
  },
  {
    file: "app/course/module-5/page.tsx",
    explanation: "Conditionals help your workflow react intelligently to different cases.",
    optionExplanations: {
      a: "Making every input follow the same path defeats the purpose of conditionals. They exist to handle different cases differently.",
      b: "Conditionals help your workflow react intelligently to different cases.",
      c: "Conditionals do not remove variables — they use variables to make decisions about which path to take.",
      d: "Conditionals do not avoid debugging. They are one of the most common areas that require careful debugging.",
    },
  },
  {
    file: "app/course/module-5/page.tsx",
    explanation: "Exactly. Loops are ideal for repetitive tasks like evaluating many comments, prompts, or files.",
    optionExplanations: {
      a: "Loops are specifically designed to process collections. Avoiding collections would mean never using loops at all.",
      b: "Exactly. Loops are ideal for repetitive tasks like evaluating many comments, prompts, or files.",
      c: "Loops and conditionals serve different purposes. Loops iterate; conditionals branch. They complement each other.",
      d: "Loops cannot prevent runtime errors. Errors can still occur on any iteration — that is why error handling exists.",
    },
  },
  {
    file: "app/course/module-5/page.tsx",
    explanation: "Reusable functions let you avoid copy-paste and keep behavior consistent.",
    optionExplanations: {
      a: "Functions make scripts shorter and cleaner by eliminating repeated code, not longer.",
      b: "Reusable functions let you avoid copy-paste and keep behavior consistent.",
      c: "Functions are designed specifically to accept parameters. Avoiding parameters would make them far less useful.",
      d: "Return values are one of the key benefits of functions. Removing them would break the ability to use results elsewhere.",
    },
  },
  {
    file: "app/course/module-5/page.tsx",
    explanation: "Great debugging starts with evidence from the error and a reproducible failure path.",
    optionExplanations: {
      a: "Deleting and starting over discards all the progress you made and does not help you understand what went wrong.",
      b: "Great debugging starts with evidence from the error and a reproducible failure path.",
      c: "Changing random lines is the slowest and most frustrating debugging approach. It relies on luck instead of understanding.",
      d: "The Python interpreter is rarely the problem. Errors almost always come from the code itself, not the runtime.",
    },
  },

  // ─── MODULE 6 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-6/page.tsx",
    explanation: "Right. Verification plus human oversight is the core safety baseline in real-world AI use.",
    optionExplanations: {
      a: "Confidence in AI output does not mean the output is correct. Hallucinations often come with high confidence.",
      b: "Right. Verification plus human oversight is the core safety baseline in real-world AI use.",
      c: "Sharing private data to improve personalisation creates privacy and data security risks. Keep sensitive data out of public AI tools.",
      d: "Professional wording does not indicate factual accuracy. AI can present incorrect information in polished prose.",
    },
  },
  {
    file: "app/course/module-6/page.tsx",
    explanation: "In high-stakes contexts, the most important question is who could be harmed if the model learned from incomplete, biased, or unrepresentative data.",
    optionExplanations: {
      a: "Interface modernity has nothing to do with fairness, accuracy, or who might be harmed by biased outputs.",
      b: "In high-stakes contexts, the most important question is who could be harmed if the model learned from incomplete, biased, or unrepresentative data.",
      c: "Speed comparisons miss the point. In high-stakes decisions, the question is fairness and safety, not efficiency.",
      d: "Model size does not determine fairness. Large models can still encode and amplify biases present in training data.",
    },
  },
  {
    file: "app/course/module-6/page.tsx",
    explanation: "Confidential internal notes are not a casual input. The safe default is to check policy and use only approved tools with the right protections.",
    optionExplanations: {
      a: "Summarisation tasks still expose the content to the AI provider. The task type does not remove the privacy risk.",
      b: "Confidential internal notes are not a casual input. The safe default is to check policy and use only approved tools with the right protections.",
      c: "Replacing one name still exposes all other confidential details. Partial anonymisation is not a substitute for approved tooling.",
      d: "Using AI first and asking about policy later is exactly backwards. Policy and privacy must be evaluated before sharing confidential data.",
    },
  },
  {
    file: "app/course/module-6/page.tsx",
    explanation: "Urgency is a classic manipulation tactic. The safest move is to slow down and verify through a separate trusted channel.",
    optionExplanations: {
      a: "Acting quickly under pressure is exactly what social engineering and deepfake scams rely on. Urgency should increase your caution, not decrease it.",
      b: "Urgency is a classic manipulation tactic. The safest move is to slow down and verify through a separate trusted channel.",
      c: "Forwarding to friends exposes more people to potential misinformation without resolving the original uncertainty.",
      d: "High-quality deepfakes are now easy to produce. Production quality is not a reliability indicator for synthetic media.",
    },
  },
  {
    file: "app/course/module-6/page.tsx",
    explanation: "Right. Each scenario involves a tension between efficiency and responsibility. The ethical move balances results with transparency and respect for legitimate process.",
    optionExplanations: {
      a: "Prioritising speed over process often leads to outcomes that breach trust or bypass necessary accountability steps.",
      b: "Right. Each scenario involves a tension between efficiency and responsibility. The ethical move balances results with transparency and respect for legitimate process.",
      c: "AI does not remove the need for human judgment — especially in ethical dilemmas. These scenarios demonstrate exactly where judgment is essential.",
      d: "Ethical dilemmas rarely have one obviously correct answer. That ambiguity is precisely why governance, reasoning, and transparency matter.",
    },
  },
  {
    file: "app/course/module-6/page.tsx",
    explanation: "Exactly. Auditing is your legal defense. It shows regulators and courts that you knew about the risks and took steps to mitigate them.",
    optionExplanations: {
      a: "Auditing is not just nice to have — it is increasingly required by law and is the primary way to demonstrate accountability.",
      b: "Exactly. Auditing is your legal defense. It shows regulators and courts that you knew about the risks and took steps to mitigate them.",
      c: "AI teams must work with legal and compliance teams together. Treating them as separate creates gaps in accountability.",
      d: "Regulations like the EU AI Act apply to companies of all sizes depending on risk level. Size does not exempt you.",
    },
  },

  // ─── MODULE 7 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-7/page.tsx",
    explanation: "The safest high-leverage starting point is a repeatable, low-risk task where you can verify output quality and track time saved.",
    optionExplanations: {
      a: "Automating client-facing decisions immediately is high-risk. Start internally with verifiable, low-stakes tasks.",
      b: "The safest high-leverage starting point is a repeatable, low-risk task where you can verify output quality and track time saved.",
      c: "Adopting tools before identifying a task usually leads to wasted effort. The task should drive the tool choice.",
      d: "Waiting for full disruption before acting means you will be far behind others who have been building skills throughout.",
    },
  },
  {
    file: "app/course/module-7/page.tsx",
    explanation: "The section's core point is that AI fluency is turning into a baseline professional skill, not a niche specialty.",
    optionExplanations: {
      a: "AI fluency matters across writing, research, analysis, teaching, and management — not only for engineers.",
      b: "The section's core point is that AI fluency is turning into a baseline professional skill, not a niche specialty.",
      c: "Ignoring AI tools does not reduce career risk — it increases it. The risk comes from not adapting, not from using AI.",
      d: "Waiting for the market to settle means falling behind those who are building skills and track records now.",
    },
  },
  {
    file: "app/course/module-7/page.tsx",
    explanation: "Correct. Start narrow, prove measurable value, and then scale with documented workflows and guardrails.",
    optionExplanations: {
      a: "Rolling out many tools at once creates confusion, inconsistent quality, and no clear measure of what is actually working.",
      b: "Correct. Start narrow, prove measurable value, and then scale with documented workflows and guardrails.",
      c: "Waiting for a perfect strategy before trying anything delays all the learning. Start small and prove value incrementally.",
      d: "Pushing adoption without governance creates risks around data privacy, quality control, and team trust.",
    },
  },
  {
    file: "app/course/module-7/page.tsx",
    explanation: "The pattern: AI is best at generating options and handling repetitive analysis. Humans remain essential for judgment, context, and final decisions.",
    optionExplanations: {
      a: "Across all the workflows shown, humans remain central to review, personalisation, and final decisions. AI augments, not replaces.",
      b: "The pattern: AI is best at generating options and handling repetitive analysis. Humans remain essential for judgment, context, and final decisions.",
      c: "Examples in this section span legal, healthcare, marketing, and operations — not just technical roles.",
      d: "AI is not equally useful for all tasks. It works best on high-volume, pattern-rich, information-heavy work with clear outputs.",
    },
  },
  {
    file: "app/course/module-7/page.tsx",
    explanation: "Right. This task fails multiple framework tests: not repetitive, requires judgment, and data is not easily accessible. Better opportunities exist for AI.",
    optionExplanations: {
      a: "A quarterly task that requires judgment on inaccessible data fails the core AI task-selection criteria. Better opportunities exist.",
      b: "Right. This task fails multiple framework tests: not repetitive, requires judgment, and data is not easily accessible. Better opportunities exist for AI.",
      c: "Trying AI without assessing feasibility wastes effort. The framework exists to save you from low-ROI experiments.",
      d: "PDF extraction is technically possible but the underlying issues remain: infrequent task, judgment required, uncertain data quality.",
    },
  },
  {
    file: "app/course/module-7/page.tsx",
    explanation: "Your role will change. Your choice is whether you shape that change by learning AI tools, or get left behind.",
    optionExplanations: {
      a: "Hoping a job stays the same while the industry changes is not a strategy. It is a plan to fall behind.",
      b: "Your role will change. Your choice is whether you shape that change by learning AI tools, or get left behind.",
      c: "Copying others later means entering the curve after those who practised early have already built significant advantage.",
      d: "Blaming displacement without adapting leaves you without agency. The people who thrive are those who build new skills.",
    },
  },
  {
    file: "app/course/module-7/page.tsx",
    explanation: "Durable advantage comes from repeatable workflow skill in your actual domain, not from broad but shallow experimentation.",
    optionExplanations: {
      a: "Trying every tool briefly without measuring outcomes creates the impression of learning without any lasting skill.",
      b: "Durable advantage comes from repeatable workflow skill in your actual domain, not from broad but shallow experimentation.",
      c: "Following AI news without applying it creates theoretical awareness but no practical capability.",
      d: "Sharing documented wins builds team trust and collective capability. Hoarding knowledge limits your own influence.",
    },
  },
  {
    file: "app/course/module-7/page.tsx",
    explanation: "Success: measurable time/effort saved, humans retain judgment and accountability, clear ROI, low risk of error.",
    optionExplanations: {
      a: "The most advanced tool is often overkill. Workflow success depends on reliability and measurable outcomes, not tool sophistication.",
      b: "Replacing human judgment entirely creates accountability gaps and removes the oversight needed for quality and safety.",
      c: "Success: measurable time/effort saved, humans retain judgment and accountability, clear ROI, low risk of error.",
      d: "Redesigning every workflow at once creates chaos and makes it impossible to measure what is actually working.",
    },
  },

  // ─── MODULE 8 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-8/page.tsx",
    explanation: "Correct. Agents are defined by multi-step goal pursuit with observation, planning, and tool-based action.",
    optionExplanations: {
      a: "Response length is not what distinguishes agents. A chatbot can produce long answers; an agent acts across multiple steps.",
      b: "Correct. Agents are defined by multi-step goal pursuit with observation, planning, and tool-based action.",
      c: "It is the opposite — agents are autonomous and chatbots are typically manual question-answer interactions.",
      d: "There is a meaningful difference: agents pursue goals, use tools, and execute multi-step workflows. Chatbots respond to single prompts.",
    },
  },
  {
    file: "app/course/module-8/page.tsx",
    explanation: "Agents are defined by goal-directed behavior across multiple steps, often using tools and reacting to outcomes along the way.",
    optionExplanations: {
      a: "Agents are defined by goal-directed behavior across multiple steps, often using tools and reacting to outcomes along the way.",
      b: "A polished interface does not make something an agent. An agent is defined by its multi-step, goal-directed, tool-using behavior.",
      c: "Agents observe results and adjust their next steps based on those results. Observation is a core part of how they work.",
      d: "A static rules engine applies fixed rules without reasoning or adaptation. Agents reason, plan, and use tools dynamically.",
    },
  },
  {
    file: "app/course/module-8/page.tsx",
    explanation: "Splitting work into specialized roles like orchestration, research, and review often produces better results than one generalist agent doing everything.",
    optionExplanations: {
      a: "Multi-agent systems are not required by regulation. They are used because specialisation improves quality and coordination.",
      b: "Splitting work into specialized roles like orchestration, research, and review often produces better results than one generalist agent doing everything.",
      c: "Single agents can use tools. The benefit of multiple agents is specialisation and parallel execution, not tool capability.",
      d: "Multi-agent systems can and do fail. The benefit is better quality through specialisation, not guaranteed reliability.",
    },
  },
  {
    file: "app/course/module-8/page.tsx",
    explanation: "Agents create value where there is lots of information to process, a repeatable sequence of steps, and clear places for humans to review critical decisions.",
    optionExplanations: {
      a: "Agents create value where there is lots of information to process, a repeatable sequence of steps, and clear places for humans to review critical decisions.",
      b: "Agents augment human judgment rather than replacing it. They handle high-volume information work while humans handle critical decisions.",
      c: "Agents are used across legal, healthcare, customer service, and research domains — well beyond software teams.",
      d: "Today's agents are narrow AI systems. They are useful now, in the real world, without requiring AGI.",
    },
  },
  {
    file: "app/course/module-8/page.tsx",
    explanation: "Exactly. Narrow scope, least privilege, and incremental rollout produce safer agents and faster learning loops.",
    optionExplanations: {
      a: "Full inbox and CRM write access from day one creates massive risk of unrecoverable mistakes. Start with minimal permissions.",
      b: "Exactly. Narrow scope, least privilege, and incremental rollout produce safer agents and faster learning loops.",
      c: "Skipping testing and relying on real traffic means real mistakes affect real users. Always validate in a controlled environment first.",
      d: "Using the most advanced framework before proving a simple workflow wastes time and adds complexity before you understand the basics.",
    },
  },
  {
    file: "app/course/module-8/page.tsx",
    explanation: "Correct. Safe agent design starts with clear inputs and decisions, then adds feedback checks, human escalation, and stop conditions before deployment.",
    optionExplanations: {
      a: "Picking tools before defining the goal leads to building the wrong thing. Always start with the trigger, goal, and inputs.",
      b: "Correct. Safe agent design starts with clear inputs and decisions, then adds feedback checks, human escalation, and stop conditions before deployment.",
      c: "Starting with full autonomy and removing human escalation creates uncontrolled risk. Start restricted and expand carefully.",
      d: "Tool limits and stop conditions are not optional extras. They are safety-critical elements that must be designed in from the start.",
    },
  },

  // ─── MODULE 9 ──────────────────────────────────────────────────────────────
  {
    file: "app/course/module-9/page.tsx",
    explanation: "That answer is accurate, plain-English, and includes both capability and limitation.",
    optionExplanations: {
      a: "Describing AI as magic sets false expectations and leads to misuse. Good explanations ground capability in how the system actually works.",
      b: "That answer is accurate, plain-English, and includes both capability and limitation.",
      c: "AI is not one technology — it is a family of approaches including supervised learning, NLP, computer vision, and more.",
      d: "AI does not think like a human brain. It recognises statistical patterns in data — it has no consciousness or lived experience.",
    },
  },
  {
    file: "app/course/module-9/page.tsx",
    explanation: "When evidence matters, source-backed research is the right tool choice.",
    optionExplanations: {
      a: "Trusting the first chatbot answer without source checking creates serious risk when you need to cite something in a meeting.",
      b: "When evidence matters, source-backed research is the right tool choice.",
      c: "Tool marketing quality has no relationship to output accuracy or citability.",
      d: "Image generators produce visuals, not cited facts. The wrong tool entirely for this task.",
    },
  },
  {
    file: "app/course/module-9/page.tsx",
    explanation: "Prompt quality usually matters more than brand choice for everyday tasks.",
    optionExplanations: {
      a: "Exclamation marks have no effect on AI output quality. The model does not respond to emotional emphasis.",
      b: "Prompt quality usually matters more than brand choice for everyday tasks.",
      c: "Switching tools every time is inefficient. Learning to improve prompts is more effective than constant tool-hopping.",
      d: "Vague prompts produce generic and less useful output. Clarity and specificity almost always produce better results.",
    },
  },
  {
    file: "app/course/module-9/page.tsx",
    explanation: "The right habit is to treat unsourced AI output as a draft or lead, not as proof.",
    optionExplanations: {
      a: "Polished wording is not evidence of accuracy. AI can produce well-formatted misinformation confidently.",
      b: "The right habit is to treat unsourced AI output as a draft or lead, not as proof.",
      c: "Sharing quickly before verifying risks spreading misinformation. Speed should never override accuracy for consequential claims.",
      d: "Adding confidential context to a public tool creates privacy risk. It does not solve the source verification problem.",
    },
  },
  {
    file: "app/course/module-9/page.tsx",
    explanation: "Good beginner workflows are small, testable, and safe enough to evaluate quickly.",
    optionExplanations: {
      a: "Good beginner workflows are small, testable, and safe enough to evaluate quickly.",
      b: "A fully autonomous workflow with no human review removes your ability to catch and correct errors before they cause harm.",
      c: "Building a multi-tool workflow before testing is likely to fail in complex and hard-to-diagnose ways.",
      d: "Using confidential data in public tools creates serious privacy risks and likely violates your organisation's policies.",
    },
  },
  {
    file: "app/course/module-9/page.tsx",
    explanation: "That option reflects the full capstone skill set, not just tool usage.",
    optionExplanations: {
      a: "That option reflects the full capstone skill set, not just tool usage.",
      b: "A huge automation with no review process amplifies mistakes at scale and demonstrates exactly the wrong lesson from this module.",
      c: "Following trends without evaluating task fit wastes effort and produces unreliable results.",
      d: "Starting with confidential data in a public chatbot creates immediate privacy and policy risk.",
    },
  },

  // ─── MODULE 10 ─────────────────────────────────────────────────────────────
  {
    file: "app/course/module-10/page.tsx",
    explanation: "Robotics + AI brings AI capability into physical systems, especially in structured environments.",
    optionExplanations: {
      a: "Robotics + AI brings AI capability into physical systems, especially in structured environments.",
      b: "Prompt formatting is a technique for improving AI input quality, not a physical-world expansion.",
      c: "Spam filtering is a decades-old AI application in the digital domain. It does not expand AI into physical tasks.",
      d: "Grammar correction is a natural language processing application — it operates only in the digital text domain.",
    },
  },
  {
    file: "app/course/module-10/page.tsx",
    explanation: "A grounded approach captures current value while avoiding overcommitment to any single AGI prediction.",
    optionExplanations: {
      a: "Ignoring current AI while waiting for AGI means missing years of compounding productivity and skill benefits.",
      b: "Avoiding all AI tools because predictions conflict is a false choice. You can use today's AI while planning adaptively for the future.",
      c: "A grounded approach captures current value while avoiding overcommitment to any single AGI prediction.",
      d: "No single AGI forecast should be treated as certain. Locking in plans around one prediction is brittle.",
    },
  },
  {
    file: "app/course/module-10/page.tsx",
    explanation: "Governance complexity comes from cross-border technology combined with region-specific law, institutions, and priorities.",
    optionExplanations: {
      a: "AI systems vary significantly by provider, region, and application. They are far from identical everywhere.",
      b: "Governance complexity comes from cross-border technology combined with region-specific law, institutions, and priorities.",
      c: "AI governance applies to all organisations deploying AI, not just startups.",
      d: "AI has significant social impact across employment, healthcare, finance, and information integrity. That impact is exactly why governance is difficult.",
    },
  },
  {
    file: "app/course/module-10/page.tsx",
    explanation: "Durable advantage comes from domain expertise plus repeated practical adaptation, not static tool knowledge.",
    optionExplanations: {
      a: "AI tools evolve rapidly. Mastering one and stopping quickly makes your skills outdated.",
      b: "Consuming AI news without hands-on practice creates awareness without capability.",
      c: "Durable advantage comes from domain expertise plus repeated practical adaptation, not static tool knowledge.",
      d: "Waiting for certainty in a fast-moving field means waiting forever. The right move is structured, adaptive learning.",
    },
  },
]

/**
 * Insert `optionExplanations={{ ... }}` between `correctOptionId` and `explanation`
 * in each matching QuickCheckCard block.
 */
function buildOptExStr(optionExplanations) {
  const entries = Object.entries(optionExplanations)
    .map(([id, text]) => `          ${id}: "${text.replace(/"/g, '\\"')}",`)
    .join("\n")
  return `        optionExplanations={{\n${entries}\n        }}`
}

let patchCount = 0
let skipCount = 0

for (const patch of QUIZ_PATCHES) {
  const filePath = join(ROOT, patch.file)
  let src = readFileSync(filePath, "utf8")

  // The anchor we search for: correctOptionId line followed (eventually) by the explanation line.
  // We'll use a simple string-based insertion — find `explanation="<unique-text>"` that is NOT
  // already preceded by `optionExplanations` within the preceding 10 lines.
  const escapedExpl = patch.explanation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const pattern = new RegExp(`([ \\t]+correctOptionId="[^"]*"\\n)([ \\t]+explanation="${escapedExpl}")`, "g")

  const ALREADY_PATCHED_CHECK = `optionExplanations={`

  // Find position of this explanation in the file
  const explIndex = src.indexOf(`explanation="${patch.explanation}"`)
  if (explIndex === -1) {
    console.warn(`⚠  SKIP (not found): ${patch.file} | ${patch.explanation.slice(0, 60)}`)
    skipCount++
    continue
  }

  // Check 500 chars before to see if already patched
  const preceding = src.slice(Math.max(0, explIndex - 500), explIndex)
  if (preceding.includes(ALREADY_PATCHED_CHECK)) {
    console.log(`✓  ALREADY DONE: ${patch.file} | ${patch.explanation.slice(0, 60)}`)
    skipCount++
    continue
  }

  // Detect indentation from the explanation line
  const lineStart = src.lastIndexOf("\n", explIndex) + 1
  const indentMatch = src.slice(lineStart, explIndex).match(/^(\s+)/)
  const indent = indentMatch?.[1] ? indentMatch[1] : "                "

  const optStr = buildOptExStr(patch.optionExplanations)
    .split("\n")
    .map((line, i) => (i === 0 ? indent + line.trimStart() : line))
    .join("\n")

  const insertTarget = `explanation="${patch.explanation}"`
  src = src.slice(0, explIndex) + optStr + "\n" + indent + src.slice(explIndex)
  writeFileSync(filePath, src, "utf8")
  console.log(`✓  PATCHED: ${patch.file} | ${patch.explanation.slice(0, 60)}`)
  patchCount++
}

console.log(`\nDone. Patched: ${patchCount}  Already done / skipped: ${skipCount}`)
