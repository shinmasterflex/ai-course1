/**
 * TEXT DISPLAY COMPONENT
 * Renders formatted text content with different variants
 * Supports both string content and React children
 */

"use client"

import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, CheckIcon, Info, XCircle } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import { useId, useMemo, useState } from "react"

interface TextDisplayProps {
  title?: string
  subtitle?: string
  content?: string
  children?: ReactNode
  variant?: "default" | "callout" | "warning" | "success" | "info"
  interactive?: boolean
  xpReward?: number
  className?: string
}

/**
 * Parse markdown-like bold syntax (**text**) and return React elements
 * This safely handles text without XSS vulnerabilities
 */
function parseBoldText(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const regex = /\*\*(.*?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    // Add the bold text
    parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>)
    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

function toSentence(text: string) {
  const trimmed = text.trim()
  if (!trimmed) {
    return ""
  }

  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

type InferentialStatement = {
  statement: string
  explanation: string
  isTrue: boolean
}

const usedStatementsByScope = new Map<string, Set<string>>()
const statementByScopeAndInstance = new Map<string, InferentialStatement>()

function pickUnusedStatement(candidates: InferentialStatement[], sourceText: string, scopeKey: string, instanceKey: string) {
  const assignmentKey = `${scopeKey}::${instanceKey}`
  const assignedStatement = statementByScopeAndInstance.get(assignmentKey)
  if (assignedStatement) {
    return assignedStatement
  }

  if (!usedStatementsByScope.has(scopeKey)) {
    usedStatementsByScope.set(scopeKey, new Set<string>())
  }

  const usedStatements = usedStatementsByScope.get(scopeKey)!
  const seed = hashString(`${sourceText}::${instanceKey}`)
  const startIndex = seed % candidates.length

  for (let offset = 0; offset < candidates.length; offset += 1) {
    const candidate = candidates[(startIndex + offset) % candidates.length]
    if (!usedStatements.has(candidate.statement)) {
      usedStatements.add(candidate.statement)
      statementByScopeAndInstance.set(assignmentKey, candidate)
      return candidate
    }
  }

  const fallbackCandidate = candidates[startIndex]
  usedStatements.add(fallbackCandidate.statement)
  statementByScopeAndInstance.set(assignmentKey, fallbackCandidate)
  return fallbackCandidate
}

function pickInferentialStatement(sourceText: string, scopeKey: string, instanceKey: string) {
  const normalized = sourceText.toLowerCase()

  const sectionBanks: Array<{ keywords: string[]; statements: InferentialStatement[] }> = [
    {
      keywords: [
        "types of ai",
        "types-of-ai",
        "ani",
        "agi",
        "asi",
        "three levels",
        "narrow ai",
        "defining ai",
        "defining-ai",
        "brief history",
        "brief-history",
      ],
      statements: [
        {
          statement: "Researchers commonly distinguish narrow AI, AGI, and ASI, but only narrow AI is widely deployed today.",
          explanation: "Current real-world systems are mostly task-specific narrow AI.",
          isTrue: true,
        },
        {
          statement: "AGI is already the default type of AI used in everyday apps.",
          explanation: "This is not accurate. Everyday applications are mainly narrow AI.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["myths", "myths vs", "myths-vs-reality", "reality", "hype"],
      statements: [
        {
          statement: "Separating AI myths from reality helps teams make better implementation decisions.",
          explanation: "Clear understanding prevents unrealistic expectations and poor planning.",
          isTrue: true,
        },
        {
          statement: "Most AI myths are harmless and do not affect business or learning choices.",
          explanation: "Myths can distort priorities, risk assessment, and tool selection.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["choosing the right tool", "choosing-tools", "tool selection", "tool-selection", "choose the right ai tool"],
      statements: [
        {
          statement: "Good tool selection starts with the task requirements, not with which tool is currently trending.",
          explanation: "Fit-for-purpose tool choice usually outperforms popularity-driven choice.",
          isTrue: true,
        },
        {
          statement: "Using one AI tool for every task is always the most effective strategy.",
          explanation: "Different tasks benefit from different capabilities and controls.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "what is machine learning",
        "what-is-ml",
        "training data",
        "training-data",
        "supervised",
        "unsupervised",
        "supervised-unsupervised",
        "neural networks",
        "neural-networks",
        "what ai can't do",
        "what-ai-cant-do",
        "data quality",
        "data cleaning",
        "data-cleaning",
        "preprocessing",
        "feature engineering",
        "feature-engineering",
      ],
      statements: [
        {
          statement: "Training data quality is a major driver of model quality.",
          explanation: "Poor data quality can limit performance regardless of model size.",
          isTrue: true,
        },
        {
          statement: "Preprocessing can be skipped safely because modern models auto-correct bad input data.",
          explanation: "Preprocessing remains important for consistency and accuracy.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "what is a language model",
        "what-is-llm",
        "how chatgpt works",
        "how-chatgpt-works",
        "anatomy of a prompt",
        "anatomy-of-prompt",
        "effective prompting",
        "prompting techniques",
        "prompt-techniques",
        "hands-on practice",
        "hands-on-practice",
        "role",
        "constraints",
        "target format",
      ],
      statements: [
        {
          statement: "Prompt quality improves when you specify role, task, constraints, and output format.",
          explanation: "Structure reduces ambiguity and improves consistency.",
          isTrue: true,
        },
        {
          statement: "Prompting technique matters less than luck when trying to improve output quality.",
          explanation: "Deliberate prompt structure generally outperforms guesswork.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "think like a programmer",
        "programming-mindset",
        "variables and data",
        "variables-data",
        "control flow",
        "control-flow",
        "functions and reuse",
        "functions-reuse",
        "debugging",
        "debugging fundamentals",
        "debugging-fundamentals",
      ],
      statements: [
        {
          statement: "Debugging gets easier when logic is split into small, well-named functions.",
          explanation: "Clear decomposition improves traceability and issue isolation.",
          isTrue: true,
        },
        {
          statement: "When code fails, adding more code is usually the fastest fix.",
          explanation: "Unfocused additions often increase complexity and hide root causes.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "ai bias",
        "ai-bias",
        "fairness",
        "privacy",
        "privacy-data",
        "misinformation",
        "deepfakes",
        "responsible ai",
        "responsible-ai",
        "ethical dilemmas",
        "ethical-dilemmas",
        "risk assessment",
        "risk-reflection",
        "safeguards",
      ],
      statements: [
        {
          statement: "Responsible AI use includes bias checks, privacy protection, and misinformation safeguards.",
          explanation: "These checks reduce harm and improve trustworthiness.",
          isTrue: true,
        },
        {
          statement: "If an AI response is useful, safety and fairness checks are optional.",
          explanation: "Usefulness does not remove ethical and safety responsibilities.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "ai in the workplace",
        "ai-in-the-workplace",
        "future of jobs",
        "ai-and-jobs",
        "industry applications",
        "industry-applications",
        "ai strategy",
        "ai-strategy",
        "real-world workflows",
        "real-workflows",
        "ai opportunities framework",
        "ai-opportunities",
        "role transformation",
        "role-transformation",
        "workflow redesign",
        "workflow-redesign",
        "building your ai skills",
        "building-ai-skills",
        "workflows",
      ],
      statements: [
        {
          statement: "Strong AI strategy ties workflow changes to measurable outcomes.",
          explanation: "Outcome-focused planning helps avoid shallow experimentation.",
          isTrue: true,
        },
        {
          statement: "AI adoption is successful when teams maximize tool count, even without workflow redesign.",
          explanation: "Without process design, additional tools often add friction.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "what are ai agents",
        "what-are-agents",
        "how agents work",
        "how-agents-work",
        "types of ai agents",
        "types-of-agents",
        "real-world applications",
        "real-world-applications",
        "building your first agent",
        "building-with-agents",
        "risks & limitations",
        "risks-and-limits",
        "stopping condition",
        "guardrails",
      ],
      statements: [
        {
          statement: "Effective agents need clear goals, tool boundaries, and stopping conditions.",
          explanation: "Guardrails and controls reduce runaway behavior and errors.",
          isTrue: true,
        },
        {
          statement: "After launch, agents can run safely without monitoring or evaluation.",
          explanation: "Agents should be monitored for failures, drift, and unsafe outputs.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "explain ai clearly",
        "explain-ai",
        "choose the right ai tool",
        "tool-selection",
        "prompt chatgpt",
        "prompting-assistants",
        "claude",
        "gemini",
        "bias, privacy, and misinformation checks",
        "risk-check",
        "building simple ai workflows",
        "ai-workflows",
        "your first ai mini-project",
        "ai-project",
        "next steps & resources",
        "next-steps",
      ],
      statements: [
        {
          statement: "Clear explanation and reusable prompting patterns transfer across major assistant tools.",
          explanation: "Core communication principles are portable even when model interfaces differ.",
          isTrue: true,
        },
        {
          statement: "Prompting skill only works on one specific model and cannot transfer to others.",
          explanation: "Prompt design principles are broadly transferable.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: [
        "current ai frontiers",
        "current-frontiers",
        "what is agi",
        "agi-explained",
        "ai governance",
        "ai-governance",
        "ai policy",
        "ai careers",
        "ai-careers",
        "your ai future",
        "your-ai-future",
      ],
      statements: [
        {
          statement: "Future AI impact depends on both technical progress and governance quality.",
          explanation: "Policy, standards, and oversight shape real-world outcomes.",
          isTrue: true,
        },
        {
          statement: "AGI timelines are fixed, so career planning in AI has little uncertainty.",
          explanation: "Timelines are uncertain, so adaptable planning is more robust.",
          isTrue: false,
        },
      ],
    },
  ]

  const inferredBanks: Array<{ keywords: string[]; statements: InferentialStatement[] }> = [
    {
      keywords: ["module 0", "welcome", "why ai matters", "day in your life", "transformation arc", "how to take this course", "next steps"],
      statements: [
        {
          statement: "AI literacy is becoming a practical workplace skill, not just a technical specialty.",
          explanation: "The opening module frames AI as relevant to daily work and decisions.",
          isTrue: true,
        },
        {
          statement: "This course is designed only for professional developers with prior coding experience.",
          explanation: "The welcome content is intended for broad learners, including beginners.",
          isTrue: false,
        },
        {
          statement: "Small, repeatable AI wins in everyday tasks are emphasized over one-time experimentation.",
          explanation: "The module focuses on practical adoption and consistent habits.",
          isTrue: true,
        },
        {
          statement: "The best way to use this course is to read passively without applying the lessons.",
          explanation: "The course guidance encourages active practice and implementation.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 1", "defining ai", "brief history", "types of ai", "myths vs. reality", "writing assistants", "image generation", "choosing tools", "narrow ai", "agi", "asi"],
      statements: [
        {
          statement: "Only one level of AI is widely deployed today, while stronger forms remain mostly theoretical.",
          explanation: "Current systems are mainly narrow AI built for specific tasks.",
          isTrue: true,
        },
        {
          statement: "AI is a single technology category, so tool choice does not depend on the task.",
          explanation: "Different AI tools fit different goals and constraints.",
          isTrue: false,
        },
        {
          statement: "Common AI myths can lead to poor decisions if they are not challenged with evidence.",
          explanation: "The module explicitly contrasts myths with reality.",
          isTrue: true,
        },
        {
          statement: "Image generation, writing assistance, and productivity tools are unrelated to practical AI use.",
          explanation: "These are core examples of practical AI applications.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 2", "how machines learn", "machine learning", "training data", "supervised", "unsupervised", "neural networks", "what ai can't do"],
      statements: [
        {
          statement: "Model performance depends heavily on training data quality and labeling choices.",
          explanation: "Data quality is foundational to reliable machine learning.",
          isTrue: true,
        },
        {
          statement: "Supervised and unsupervised learning are identical approaches with different names.",
          explanation: "They differ in whether labeled outcomes are provided during training.",
          isTrue: false,
        },
        {
          statement: "Neural networks are useful for pattern learning but still have limitations.",
          explanation: "The module covers both capabilities and boundaries of modern ML.",
          isTrue: true,
        },
        {
          statement: "If a model is accurate once, it can be trusted in every context forever.",
          explanation: "Generalization limits and distribution changes can break model performance.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 3", "large language models", "language model", "chatgpt", "anatomy of a prompt", "prompting techniques", "hands-on practice", "token", "context window"],
      statements: [
        {
          statement: "Large language models generate text by predicting likely next tokens based on context.",
          explanation: "Token prediction is the core mechanism behind text generation.",
          isTrue: true,
        },
        {
          statement: "Prompt structure has little impact as long as your request is short.",
          explanation: "Instruction quality and structure strongly affect output quality.",
          isTrue: false,
        },
        {
          statement: "Clear role, task, and format constraints usually improve response consistency.",
          explanation: "Well-structured prompts reduce ambiguity and variance.",
          isTrue: true,
        },
        {
          statement: "Hands-on prompting practice is optional because theory alone is enough.",
          explanation: "Practical experimentation is essential to develop prompting skill.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 4", "data", "preprocessing", "data collection", "data cleaning", "data quality", "feature engineering"],
      statements: [
        {
          statement: "Data cleaning and preprocessing directly influence downstream model performance.",
          explanation: "No model can consistently overcome low-quality input data.",
          isTrue: true,
        },
        {
          statement: "Feature engineering is mostly cosmetic and rarely affects outcomes.",
          explanation: "Relevant features often improve model learning significantly.",
          isTrue: false,
        },
        {
          statement: "Data collection choices can introduce bias before training even begins.",
          explanation: "Sampling and measurement decisions shape the quality of the dataset.",
          isTrue: true,
        },
        {
          statement: "Preprocessing steps are unnecessary if you use a modern model.",
          explanation: "Even strong models benefit from clean, consistent inputs.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 5", "variables", "conditionals", "loops", "functions", "debug"],
      statements: [
        {
          statement: "Clear variable names and structure make debugging easier because you can trace what data flows where.",
          explanation: "Good naming and organization let you isolate problems faster instead of guessing.",
          isTrue: true,
        },
        {
          statement: "More code always fixes broken automation logic.",
          explanation: "Adding more code without understanding the problem usually makes things worse, not better.",
          isTrue: false,
        },
        {
          statement: "Functions help reduce duplication by packaging reusable logic.",
          explanation: "Reusable function design improves maintainability and clarity.",
          isTrue: true,
        },
        {
          statement: "Control flow is only relevant for advanced software and not for beginner scripts.",
          explanation: "Even simple programs rely on conditionals and loops.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 6", "ethics", "bias", "privacy", "risk", "safeguard"],
      statements: [
        {
          statement: "AI systems can inherit biases from their training data, which can cause unfair outcomes across different groups.",
          explanation: "Bias often starts in training data. High average accuracy doesn't guarantee fairness for all groups.",
          isTrue: true,
        },
        {
          statement: "Sensitive personal data is safe to paste into any public AI tool.",
          explanation: "Public AI services store and may retain your data. Sensitive information should never be entered without approval.",
          isTrue: false,
        },
        {
          statement: "Responsible AI use includes checks for misinformation and harmful outputs.",
          explanation: "Safety review is part of ethical AI deployment.",
          isTrue: true,
        },
        {
          statement: "If an AI output is helpful, ethical considerations no longer matter.",
          explanation: "Utility does not remove fairness, privacy, or safety obligations.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 7", "productivity", "workflow", "assistant", "execution"],
      statements: [
        {
          statement: "Repeatable AI workflows produce more consistent results than asking the same question different ways each time.",
          explanation: "Standardized prompts, templates, and processes reduce variability and improve reliability.",
          isTrue: true,
        },
        {
          statement: "AI productivity is maximized by using a different tool for every single task.",
          explanation: "Tool fragmentation creates friction. Standardized workflows across tasks compound gains.",
          isTrue: false,
        },
        {
          statement: "AI strategy should connect to measurable business outcomes, not just experimentation volume.",
          explanation: "Business impact requires clear objectives and evaluation criteria.",
          isTrue: true,
        },
        {
          statement: "AI in the workplace always replaces entire roles instead of changing tasks within roles.",
          explanation: "Role transformation is usually more nuanced than full replacement.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 8", "agent", "goal-driven", "loop", "guardrails", "stopping condition"],
      statements: [
        {
          statement: "AI agents that can plan, use tools, and iterate are more powerful than systems that give one-shot answers.",
          explanation: "Loop-based agents persist toward goals; one-shot systems are limited to single responses.",
          isTrue: true,
        },
        {
          statement: "Agents should be given unlimited power and no stopping conditions.",
          explanation: "Agents need clear guardrails, stopping conditions, and feedback loops to stay aligned and safe.",
          isTrue: false,
        },
        {
          statement: "Different agent types are chosen based on task needs and risk profile.",
          explanation: "Agent design should fit workload complexity and control requirements.",
          isTrue: true,
        },
        {
          statement: "Real-world agent deployment requires no monitoring once it starts.",
          explanation: "Monitoring is required to detect drift, failures, and unsafe behavior.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 9", "your ai toolkit", "explain ai clearly", "tool selection", "prompt chatgpt", "claude", "gemini", "mini-project", "resources"],
      statements: [
        {
          statement: "Explaining AI decisions clearly to stakeholders helps validate whether the system is actually working as intended.",
          explanation: "Clear explanation is both ethical and practical: it catches problems and builds trust.",
          isTrue: true,
        },
        {
          statement: "The best AI implementation requires no human review or oversight.",
          explanation: "Responsible AI includes human checks. Output usefulness and risk assessment both need review.",
          isTrue: false,
        },
        {
          statement: "Choosing tools based on task fit and risk constraints is better than picking one tool for everything.",
          explanation: "Different tools have different strengths and trade-offs.",
          isTrue: true,
        },
        {
          statement: "Prompting skills only transfer to one assistant and cannot be reused across models.",
          explanation: "Core prompting principles are portable across major assistants.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 10", "frontier", "agi", "governance", "career", "future"],
      statements: [
        {
          statement: "Being AI-fluent in your current profession gives you more career resilience than waiting for AGI predictions.",
          explanation: "Applied AI skills in your domain are immediately valuable, while AGI timelines remain speculative.",
          isTrue: true,
        },
        {
          statement: "The best career strategy is to abandon your current expertise and become a full-time AI researcher.",
          explanation: "Domain depth combined with AI fluency is stronger than chasing pure AI careers without context.",
          isTrue: false,
        },
        {
          statement: "AI governance and policy decisions shape how safely and fairly advanced systems are deployed.",
          explanation: "Future AI impact depends on both technology and governance quality.",
          isTrue: true,
        },
        {
          statement: "Career planning in AI has no uncertainty because AGI timelines are already fixed.",
          explanation: "Timelines are uncertain, so adaptable skill-building is more robust.",
          isTrue: false,
        },
      ],
    },
  ]

  const allBanks = [...sectionBanks, ...inferredBanks]
  let bestScore = -1
  let bestBankIndex = -1

  for (let bankIndex = 0; bankIndex < allBanks.length; bankIndex += 1) {
    const matchedKeywords = allBanks[bankIndex].keywords.filter((keyword) => normalized.includes(keyword))
    const matches = matchedKeywords.length
    const longestMatchLength = matchedKeywords.reduce((maxLength, keyword) => Math.max(maxLength, keyword.length), 0)
    const score = matches * 100 + longestMatchLength

    if (score > bestScore) {
      bestScore = score
      bestBankIndex = bankIndex
    }
  }

  if (bestScore >= 100 && bestBankIndex >= 0) {
    const statements = allBanks[bestBankIndex].statements
    return pickUnusedStatement(statements, sourceText, scopeKey, instanceKey)
  }

  const fallbackStatements: InferentialStatement[] = [
    {
      statement: "Reliable AI outcomes improve when teams test prompts and workflows incrementally.",
      explanation: "Iterative testing surfaces issues early and improves consistency.",
      isTrue: true,
    },
    {
      statement: "A single impressive demo is enough to prove an AI system is ready for production.",
      explanation: "Production readiness needs repeated validation across edge cases.",
      isTrue: false,
    },
    {
      statement: "Documenting assumptions makes AI behavior easier to debug and explain.",
      explanation: "Explicit assumptions make failures easier to diagnose and fix.",
      isTrue: true,
    },
    {
      statement: "If an AI output sounds confident, it does not need verification.",
      explanation: "Confidence is not evidence. Outputs should still be checked.",
      isTrue: false,
    },
    {
      statement: "Structured workflows usually outperform ad-hoc prompting for repeatable tasks.",
      explanation: "Consistency improves when teams standardize process and quality checks.",
      isTrue: true,
    },
    {
      statement: "Adding more features without evaluating failure modes always improves AI quality.",
      explanation: "Unchecked complexity often increases instability and risk.",
      isTrue: false,
    },
  ]

  const sentences = sourceText
    .split(/[.!?\n]/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 20)
  const firstSentence = sentences[0]

  if (firstSentence) {
    const cleaned = firstSentence.replace(/\s+/g, " ").trim()
    const contextualFallback: InferentialStatement[] = [
      {
        statement: `This section emphasizes that ${toSentence(cleaned).replace(/[.!?]$/, "")}.`,
        explanation: "The statement mirrors the central claim introduced in this section.",
        isTrue: true,
      },
      {
        statement: `${toSentence(cleaned).replace(/[.!?]$/, "")} is not important when designing AI workflows.`,
        explanation: "The section presents this idea as important, not optional.",
        isTrue: false,
      },
    ]
    const contextualCandidates = [...contextualFallback, ...fallbackStatements]
    return pickUnusedStatement(contextualCandidates, sourceText, scopeKey, instanceKey)
  }

  return pickUnusedStatement(fallbackStatements, sourceText, scopeKey, instanceKey)
}

function getTrueFalseStatement(title?: string, content?: string, scopeKey = "global", instanceKey = "default") {
  const source = [title, content]
    .filter((part): part is string => Boolean(part && part.trim().length > 0))
    .join("\n") || "AI systems require human judgment"
  const statementData = pickInferentialStatement(`${title ?? ""} ${source}`, scopeKey, instanceKey)

  return {
    statement: toSentence(statementData.statement),
    explanation: statementData.explanation,
    isTrue: statementData.isTrue,
  }
}

export function TextDisplay({
  title,
  subtitle,
  content,
  children,
  variant = "default",
  interactive = true,
  className,
}: TextDisplayProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const instanceId = useId()

  // Icon mapping for different variants
  const icons = {
    callout: <Info className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
  }

  // Style mapping for variants
  const variantStyles = {
    default: "bg-card text-card-foreground",
    callout: "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500",
    info: "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500",
    warning: "bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100 border-l-4 border-yellow-500",
    success: "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 border-l-4 border-green-500",
  }

  const hasChildren = children !== undefined
  const hasContent = content !== undefined
  const [isDragging, setIsDragging] = useState(false)
  const [dropTarget, setDropTarget] = useState<"true" | "false" | null>(null)

  const sectionId = searchParams?.get("section") || "no-section"
  const scopeKey = `${pathname || "unknown-path"}::${sectionId}`
  const statementData = useMemo(() => getTrueFalseStatement(title, content, scopeKey, instanceId), [content, instanceId, scopeKey, title])
  const dragPayload = statementData.statement
  const isCorrectDrop = dropTarget === null ? null : (dropTarget === "true") === statementData.isTrue
  const primarySummary = content?.split("\n").find((line) => line.trim().length > 0) ?? subtitle ?? title ?? "This lesson block explains the concept shown in the current section."
  const explainerAttributes = getExplainerAttributes({
    type: variant === "default" ? "Concept explanation" : `${variant} emphasizer`,
    title: title ?? "Learning text",
    explanation: `This text block presents conceptual material—the ideas and principles you need to understand. Reading comprehension in learning isn't passive. Your brain needs to actively construct meaning from words.

Here's how to read actively: First, scan the title and subtitle to establish context. Second, read a section and pause to ask yourself: What's the main idea? Can I explain this in my own words? If you struggle, that's a signal to read again or look for related examples. Third, look for how this concept connects to previous material you've learned. This elaboration—connecting new ideas to existing knowledge—is where deep understanding forms.

${interactive ? "This section includes a check-in question. These questions interrupt passive reading and force retrieval. Even if you're not sure of your answer, the attempt to retrieve strengthens memory more than re-reading would." : "Use this as reference material while you work through the interactive components. Switching between reading and doing—called interleaving—creates stronger learning than doing only activities without conceptual grounding."} Pay attention to examples; they're not ornamental. Examples are how abstract principles become concrete in your mind.`,
  })

  return (
    <div {...explainerAttributes} className={cn("p-6 rounded-lg", variantStyles[variant], className)}>
      {title && (
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-1 font-heading">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground italic">{subtitle}</p>}
        </div>
      )}

      {variant !== "default" && (
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{icons[variant]}</div>
          <div className="flex-1">
            {hasChildren ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">{children}</div>
            ) : hasContent ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {content.split("\n").map((line, index) => {
                  const trimmedLine = line.trim()
                  // Handle bullet points
                  if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
                    return (
                      <li key={`bullet-${index}`} className="ml-4">
                        {parseBoldText(trimmedLine.substring(1).trim())}
                      </li>
                    )
                  }
                  // Handle regular paragraphs with bold text support
                  return (
                    <p key={`para-${index}`} className="mb-2">
                      {parseBoldText(line)}
                    </p>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      )}
      {variant === "default" && (
        <>
          {hasChildren ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">{children}</div>
          ) : hasContent ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {content.split("\n").map((line, index) => {
                const trimmedLine = line.trim()
                if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
                  return (
                    <li key={`bullet-${index}`} className="ml-4">
                      {parseBoldText(trimmedLine.substring(1).trim())}
                    </li>
                  )
                }
                return (
                  <p key={`para-${index}`} className="mb-2">
                    {parseBoldText(line)}
                  </p>
                )
              })}
            </div>
          ) : null}
        </>
      )}

      {interactive && (
        <div className="mt-5 rounded-lg border border-brand-orange/20 bg-background/60 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-orange">
              <CheckIcon className="h-4 w-4" />
              True or False Check
            </p>
            {isCorrectDrop ? <span className="text-xs font-semibold text-green-700">Corrected</span> : null}
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Drag this statement</p>
              <div
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", dragPayload)
                  setIsDragging(true)
                  setDropTarget(null)
                }}
                onDragEnd={() => setIsDragging(false)}
                className={cn(
                  "flex w-full cursor-grab items-center rounded-md border border-brand-orange/40 bg-brand-orange/10 px-3 py-2 text-sm text-foreground active:cursor-grabbing",
                  isDragging && "opacity-70"
                )}
              >
                {dragPayload}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  if (event.dataTransfer.getData("text/plain")) {
                    setDropTarget("true")
                  }
                }}
                className={cn(
                  "rounded-md border p-3 text-sm transition-colors",
                  dropTarget === "true" ? "border-green-700 bg-green-200 text-green-950" : "border-green-300 bg-green-50/50"
                )}
              >
                <p className="flex items-center gap-1 font-semibold">
                  <CheckIcon className="h-4 w-4" />
                  TRUE
                </p>
                <p className="text-xs">Drop here if the statement is true.</p>
              </div>

              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  if (event.dataTransfer.getData("text/plain")) {
                    setDropTarget("false")
                  }
                }}
                className={cn(
                  "rounded-md border p-3 text-sm transition-colors",
                  dropTarget === "false" ? "border-red-700 bg-red-200 text-red-950" : "border-red-300 bg-red-50/50"
                )}
              >
                <p className="flex items-center gap-1 font-semibold">
                  <XCircle className="h-4 w-4" />
                  FALSE
                </p>
                <p className="text-xs">Drop here if the statement is false.</p>
              </div>
            </div>

            {dropTarget !== null && (
              <div className="space-y-3 rounded-md bg-gray-50 dark:bg-gray-900 p-3">
                {isCorrectDrop ? (
                  <div>
                    <p className="flex items-center gap-1 text-sm font-semibold text-green-700 mb-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Correct!
                    </p>
                    <p className="text-sm text-green-700">This statement is <strong>{statementData.isTrue ? "TRUE" : "FALSE"}</strong>.</p>
                    <p className="text-sm text-green-600 mt-1">{statementData.explanation}</p>
                  </div>
                ) : (
                  <div>
                    <p className="flex items-center gap-1 text-sm font-semibold text-red-700 mb-2">
                      <XCircle className="h-4 w-4" />
                      Not quite. Try again.
                    </p>
                    <p className="text-sm text-gray-700">This statement is actually <strong>{statementData.isTrue ? "TRUE" : "FALSE"}</strong>.</p>
                    <p className="text-sm text-gray-600 mt-1">{statementData.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
