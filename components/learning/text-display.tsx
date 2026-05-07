/**
 * TEXT DISPLAY COMPONENT
 * Renders formatted text content with different variants
 * Supports both string content and React children
 */

"use client"

import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { getCourseStructure } from "@/lib/course-structure"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, CheckIcon, Info, XCircle } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect, useId, useMemo, useState } from "react"

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

function extractSentences(text: string | undefined) {
  if (!text) {
    return []
  }

  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

function clipTitle(text: string, maxWords = 8) {
  const words = text
    .replace(/["']/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maxWords)

  return words.join(" ")
}

function deriveTextDisplayTitle(title: string | undefined, subtitle: string | undefined, content: string | undefined) {
  if (title?.trim()) {
    return title.trim()
  }

  if (subtitle?.trim()) {
    return subtitle.trim()
  }

  const [leadSentence] = extractSentences(content)
  if (leadSentence) {
    return clipTitle(leadSentence.replace(/[.!?]+$/, ""))
  }

  return "Concept focus"
}

function buildTextDisplayExplanation(content: string | undefined, subtitle: string | undefined, interactive: boolean) {
  const sentences = extractSentences(content)
  const leadSentence = sentences[0] ?? subtitle?.trim() ?? "AI understanding becomes useful only when you can explain the idea clearly and apply it in context."
  const supportSentence = sentences[1] ?? "In AI work, strong mental models let you predict likely behavior, notice weak outputs, and choose the right level of verification before acting."

  return `${toSentence(leadSentence)} ${toSentence(supportSentence)}

As you read, look for the decision rule inside the passage. Ask what pattern, limitation, tradeoff, or workflow principle the text is naming, and how that idea would change a real task such as prompting, checking an output, choosing a tool, or spotting risk.

Before moving on, restate the point in your own words and test it against one concrete AI example. ${interactive ? "Use the follow-up question as retrieval practice: answer from memory first, then compare your answer to the text and revise what was missing." : "Use the surrounding exercises to see whether the idea changes how you would act in a real workflow rather than leaving it as a passive definition."}`
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

type ScopeContext = {
  moduleId: string | null
  sectionId: string | null
}

const courseStructure = getCourseStructure()

const moduleStatementBanks: Record<string, InferentialStatement[]> = {
  "module-0": [
    {
      statement: "Beginners make faster progress with one low-risk workflow, a named owner, and a simple success metric.",
      explanation: "The course starts with practical first steps rather than broad, abstract AI theory.",
      isTrue: true,
    },
    {
      statement: "The safest beginner strategy is to wait until the AI market fully stabilizes before trying anything.",
      explanation: "The module argues for careful, small-scale experimentation now instead of indefinite delay.",
      isTrue: false,
    },
    {
      statement: "Separating hype from practical use helps beginners choose safer first AI experiments.",
      explanation: "Clear mental models improve early adoption decisions.",
      isTrue: true,
    },
    {
      statement: "A strong start to AI adoption means collecting tools first and deciding on goals later.",
      explanation: "The course emphasizes outcomes, guardrails, and ownership before shopping for tools.",
      isTrue: false,
    },
  ],
  "module-1": [
    {
      statement: "AI decisions improve when teams distinguish models, tools, automations, agents, and service options.",
      explanation: "Module 1 is about building clear language and decision categories before buying.",
      isTrue: true,
    },
    {
      statement: "The best AI tool is usually the one with the most hype, even if task fit is weak.",
      explanation: "The course emphasizes fit, maturity, lock-in risk, and security over popularity.",
      isTrue: false,
    },
    {
      statement: "A useful tool comparison includes workflow fit, cost, risk, and integration quality.",
      explanation: "Those are core decision lenses in this module.",
      isTrue: true,
    },
    {
      statement: "Security and data checks can wait until after a tool is widely adopted.",
      explanation: "Basic safety review is positioned as part of early evaluation, not an afterthought.",
      isTrue: false,
    },
  ],
  "module-2": [
    {
      statement: "AI opportunity discovery should start with business outcomes and the workflows tied to them.",
      explanation: "The module prioritizes measurable value over idea collection alone.",
      isTrue: true,
    },
    {
      statement: "Whichever department asks first should usually get the first AI investment.",
      explanation: "Requests are weaker signals than impact, effort, and readiness.",
      isTrue: false,
    },
    {
      statement: "Quick wins and bigger AI bets should be separated because they require different levels of effort and change.",
      explanation: "The module teaches structured prioritization, not one-size-fits-all sequencing.",
      isTrue: true,
    },
    {
      statement: "Repetitive work and bottlenecks are poor places to look for AI value.",
      explanation: "Those are often high-leverage places to save time or improve quality.",
      isTrue: false,
    },
  ],
  "module-3": [
    {
      statement: "A defensible AI tool recommendation uses a scorecard covering fit, risk, cost, and operational practicality.",
      explanation: "Module 3 focuses on evidence-based tool selection.",
      isTrue: true,
    },
    {
      statement: "If a tool demo is impressive, pricing, integration, and security details become secondary.",
      explanation: "The module explicitly teaches learners to check those issues before committing.",
      isTrue: false,
    },
    {
      statement: "Sometimes a general assistant is enough, and sometimes a specialized tool is worth the added complexity.",
      explanation: "The decision depends on workflow needs and controls, not category prestige.",
      isTrue: true,
    },
    {
      statement: "The right procurement move is always to buy immediately rather than pilot or wait.",
      explanation: "The module includes buy, wait, or pilot as distinct paths for a reason.",
      isTrue: false,
    },
  ],
  "module-4": [
    {
      statement: "Choosing an AI partner should reflect urgency, capability gaps, ownership goals, and delivery risk.",
      explanation: "This module is about selecting the right partner model for the stage and outcome.",
      isTrue: true,
    },
    {
      statement: "A strong agency reputation is enough evidence to skip scope and accountability questions.",
      explanation: "The course teaches detailed diligence, pilot structure, and explicit success criteria.",
      isTrue: false,
    },
    {
      statement: "A safe pilot is meant to create learning before a larger rollout, not to guarantee a full commitment.",
      explanation: "Pilot design is framed as a risk-reduction and evidence-gathering step.",
      isTrue: true,
    },
    {
      statement: "AI pricing is easiest to manage when change-order risk and expansion terms stay vague.",
      explanation: "Hidden pricing and vague terms are treated as diligence risks, not advantages.",
      isTrue: false,
    },
  ],
  "module-5": [
    {
      statement: "AI ROI should be tied to business outcomes, baseline comparisons, and realistic adoption effort.",
      explanation: "Module 5 focuses on measurable value rather than abstract enthusiasm.",
      isTrue: true,
    },
    {
      statement: "High AI activity counts are enough to prove business impact on their own.",
      explanation: "The course calls out activity-only metrics as potentially misleading.",
      isTrue: false,
    },
    {
      statement: "A balanced AI portfolio can include quick wins and longer bets when funding is stage-gated.",
      explanation: "That is the module's recommended budgeting pattern.",
      isTrue: true,
    },
    {
      statement: "Once expected impact looks strong, risks and assumptions do not need to appear in progress reporting.",
      explanation: "Credible reporting combines outcomes, risk indicators, and next decisions.",
      isTrue: false,
    },
  ],
  "module-6": [
    {
      statement: "Responsible AI use includes checks for bias, privacy, misinformation, and human oversight.",
      explanation: "Those safeguards define the module's safety baseline.",
      isTrue: true,
    },
    {
      statement: "Sensitive personal or confidential data is usually safe to paste into public AI tools if the task is helpful enough.",
      explanation: "Usefulness does not remove privacy and policy obligations.",
      isTrue: false,
    },
    {
      statement: "Verification through trusted sources matters even when AI content looks polished or urgent.",
      explanation: "The module teaches learners to slow down and verify before acting.",
      isTrue: true,
    },
    {
      statement: "If an AI system saves time, fairness and governance checks can be postponed until after rollout.",
      explanation: "Risk controls are presented as part of safe adoption, not optional later work.",
      isTrue: false,
    },
  ],
  "module-7": [
    {
      statement: "A strong AI roadmap sequences pilots, rollout decisions, and review points around real team capacity.",
      explanation: "The module is about staged adoption, not overloaded launch plans.",
      isTrue: true,
    },
    {
      statement: "AI adoption succeeds mainly by giving teams tools quickly, even without process or change planning.",
      explanation: "The course treats workflow design and change support as essential.",
      isTrue: false,
    },
    {
      statement: "Internal champions can help adoption scale when they are tied to real workflows and local support.",
      explanation: "Champion networks are included to improve implementation quality across functions.",
      isTrue: true,
    },
    {
      statement: "Review rhythms matter less than tool choice once rollout has started.",
      explanation: "Regular review is part of keeping the roadmap adaptive and controlled.",
      isTrue: false,
    },
  ],
  "module-8": [
    {
      statement: "A workflow should only become an agent when the task actually needs planning, tool use, or iteration.",
      explanation: "Module 8 separates agent use cases from simpler automation patterns.",
      isTrue: true,
    },
    {
      statement: "More autonomous automation is always better than a simpler workflow with clearer controls.",
      explanation: "The course explicitly challenges unnecessary agent complexity.",
      isTrue: false,
    },
    {
      statement: "Human review and recovery paths are important wherever automation mistakes could cause material harm.",
      explanation: "Human-in-the-loop design is a core operating principle in this module.",
      isTrue: true,
    },
    {
      statement: "Once automation is live, monitoring and ownership are mostly optional.",
      explanation: "The automation blueprint includes monitoring, accountability, and failure handling.",
      isTrue: false,
    },
  ],
  "module-9": [
    {
      statement: "A good AI stack reduces sprawl by choosing tools that fit together, stay governable, and have clear owners.",
      explanation: "This module is about maintainability as much as capability.",
      isTrue: true,
    },
    {
      statement: "The healthiest AI stack usually has overlapping tools for the same job because redundancy always improves operations.",
      explanation: "Unnecessary overlap often increases cost and ownership confusion.",
      isTrue: false,
    },
    {
      statement: "Vendor consolidation should be based on overlap, maintainability, and switching trade-offs, not just discounts.",
      explanation: "The course frames consolidation as a structured decision.",
      isTrue: true,
    },
    {
      statement: "Tool ownership becomes less important as the stack grows and more teams get access.",
      explanation: "Growing stacks need clearer ownership, not less.",
      isTrue: false,
    },
  ],
  "module-10": [
    {
      statement: "Future-aware AI strategy focuses on signals that materially change competition, workflows, or capability economics.",
      explanation: "Module 10 teaches learners to separate real strategic signals from noise.",
      isTrue: true,
    },
    {
      statement: "Lower model costs mostly remove the need for strategy because AI markets become self-explanatory.",
      explanation: "Cheaper models change the basis of competition; they do not eliminate strategic choices.",
      isTrue: false,
    },
    {
      statement: "AI planning should adapt as roles, partner models, and operating assumptions change over time.",
      explanation: "The module emphasizes future readiness through disciplined adaptation.",
      isTrue: true,
    },
    {
      statement: "The best future plan is broad trend awareness without focused bets or ownership.",
      explanation: "The course argues for focused strategic bets with execution discipline.",
      isTrue: false,
    },
  ],
}

function getModuleIdFromScope(scopeKey: string) {
  const [pathFragment] = scopeKey.split("::")
  const moduleMatch = pathFragment.match(/module-\d+/)
  return moduleMatch?.[0] ?? null
}

function getSectionIdFromScope(scopeKey: string) {
  const [, sectionId] = scopeKey.split("::")
  return sectionId?.trim() || null
}

function getScopeContext(scopeKey: string): ScopeContext {
  return {
    moduleId: getModuleIdFromScope(scopeKey),
    sectionId: getSectionIdFromScope(scopeKey),
  }
}

function createSectionFalseStatement(sectionTitle: string, sectionSummary: string) {
  const normalizedSummary = sectionSummary.replace(/[.!?]+$/, "").trim().toLowerCase()

  if (normalizedSummary.startsWith("understand when ")) {
    const rest = normalizedSummary.replace(/^understand when\s+/, "")
    return `There is no need to distinguish when ${rest}; the same AI approach works in every case.`
  }

  if (normalizedSummary.startsWith("learn when ")) {
    const rest = normalizedSummary.replace(/^learn when\s+/, "")
    return `You do not need to think carefully about when ${rest}; quick intuition is usually enough.`
  }

  if (normalizedSummary.startsWith("learn how to ")) {
    const rest = normalizedSummary.replace(/^learn how to\s+/, "")
    return `You can skip learning how to ${rest} and still make strong AI decisions.`
  }

  if (normalizedSummary.startsWith("use a ") || normalizedSummary.startsWith("use an ") || normalizedSummary.startsWith("use simple ")) {
    return `This section implies structured checklists are unnecessary because ad-hoc judgment is usually good enough.`
  }

  if (normalizedSummary.startsWith("compare ")) {
    const rest = normalizedSummary.replace(/^compare\s+/, "")
    return `There is little value in comparing ${rest}; the fastest choice is usually the best one.`
  }

  if (normalizedSummary.startsWith("spot ")) {
    const rest = normalizedSummary.replace(/^spot\s+/, "")
    return `You do not need to spot ${rest}; those signals rarely affect AI outcomes.`
  }

  if (normalizedSummary.startsWith("avoid ")) {
    const rest = normalizedSummary.replace(/^avoid\s+/, "")
    return `The section suggests relying on ${rest} because they are usually strong evidence.`
  }

  if (normalizedSummary.startsWith("build ")) {
    const rest = normalizedSummary.replace(/^build\s+/, "")
    return `There is no need to build ${rest}; improvised decisions are usually enough.`
  }

  if (normalizedSummary.startsWith("separate ")) {
    const rest = normalizedSummary.replace(/^separate\s+/, "")
    return `It is usually better not to separate ${rest}; one AI approach fits every situation.`
  }

  if (normalizedSummary.startsWith("match ")) {
    return `The most complex AI setup is usually the right choice, even when the task does not require it.`
  }

  if (normalizedSummary.startsWith("choose ")) {
    return `The section suggests choosing quickly without clarifying trade-offs, ownership, or fit.`
  }

  if (normalizedSummary.startsWith("set ")) {
    return `You can usually expand AI use without setting clear rules, controls, or review points first.`
  }

  return `${sectionTitle} is mostly background theory and does not materially change AI choices, workflow design, or risk management.`
}

function createSectionTitleTrueStatement(sectionTitle: string) {
  const normalizedTitle = sectionTitle.trim().toLowerCase()

  if (normalizedTitle.includes("models, tools, automations, and agents")) {
    return "Distinguishing models, tools, automations, and agents leads to clearer AI evaluation and procurement decisions."
  }

  if (normalizedTitle.includes("metrics")) {
    return `Choosing the right metrics in ${normalizedTitle} changes whether teams measure real value or vanity activity.`
  }

  if (normalizedTitle.includes("workflow")) {
    return `Getting ${normalizedTitle} right helps teams choose a better operating model instead of adding avoidable complexity.`
  }

  if (normalizedTitle.includes("agent")) {
    return `Understanding ${normalizedTitle} helps teams match autonomy to the actual task instead of overbuilding.`
  }

  if (normalizedTitle.includes("tool")) {
    return `Understanding ${normalizedTitle} improves tool selection by making fit, trade-offs, and constraints more explicit.`
  }

  if (normalizedTitle.includes("risk") || normalizedTitle.includes("safety") || normalizedTitle.includes("privacy")) {
    return `Working through ${normalizedTitle} helps teams make safer AI decisions before scaling usage.`
  }

  if (/^how to /i.test(sectionTitle)) {
    return `A repeatable approach to ${normalizedTitle.replace(/^how to\s+/i, "")} improves AI judgment more than improvising each time.`
  }

  if (/^when /i.test(sectionTitle)) {
    return `Knowing ${normalizedTitle} prevents teams from using the same AI approach in the wrong situations.`
  }

  if (/^what /i.test(sectionTitle)) {
    return `Clarifying ${normalizedTitle} makes AI choices easier to explain and defend in practice.`
  }

  if (/^why /i.test(sectionTitle)) {
    return `Understanding ${normalizedTitle} helps teams make stronger AI decisions with less confusion.`
  }

  if (/^a simple /i.test(sectionTitle)) {
    return `${sectionTitle} is meant to make AI decisions more repeatable and usable, not more abstract.`
  }

  return `${sectionTitle} is meant to improve a practical AI decision, workflow choice, or rollout judgment.`
}

function createSectionTitleFalseStatement(sectionTitle: string) {
  const normalizedTitle = sectionTitle.trim().toLowerCase()

  if (normalizedTitle.includes("models, tools, automations, and agents")) {
    return "You can treat models, tools, automations, and agents as interchangeable without hurting AI buying decisions."
  }

  if (normalizedTitle.includes("metrics")) {
    return "Impressive-looking AI activity metrics are usually enough on their own to prove real improvement."
  }

  if (normalizedTitle.includes("workflow")) {
    return `Workflow design matters less than adding more AI capability, so ${normalizedTitle} rarely changes outcomes.`
  }

  if (normalizedTitle.includes("agent")) {
    return `The most autonomous agent setup is usually the best option, so ${normalizedTitle} does not need much analysis.`
  }

  if (normalizedTitle.includes("tool")) {
    return `Tool choice is mostly obvious from popularity, so ${normalizedTitle} adds little practical value.`
  }

  if (normalizedTitle.includes("risk") || normalizedTitle.includes("safety") || normalizedTitle.includes("privacy")) {
    return `Risk and safety checks can usually wait until after rollout, so ${normalizedTitle} is not critical early on.`
  }

  if (/^how to /i.test(sectionTitle)) {
    return `There is no real need to learn ${normalizedTitle.replace(/^how to\s+/i, "")}; quick intuition is usually enough.`
  }

  if (/^when /i.test(sectionTitle)) {
    return `Teams do not need to think hard about ${normalizedTitle}; the same AI approach usually works everywhere.`
  }

  if (/^what /i.test(sectionTitle)) {
    return `${sectionTitle} is mostly definitional and rarely changes real AI choices or trade-offs.`
  }

  if (/^why /i.test(sectionTitle)) {
    return `The reasons behind ${normalizedTitle} matter less than moving quickly with AI adoption.`
  }

  if (/^a simple /i.test(sectionTitle)) {
    return `${sectionTitle} is mostly optional because ad-hoc judgment is usually sufficient for AI decisions.`
  }

  return `${sectionTitle} adds little practical value because AI decisions usually work out without this level of reasoning.`
}

function createSectionStatementBank(scopeKey: string): InferentialStatement[] | null {
  const { moduleId, sectionId } = getScopeContext(scopeKey)

  if (!moduleId || !sectionId) {
    return null
  }

  const moduleData = courseStructure.modules.find((module) => module.id === moduleId)
  const sectionData = moduleData?.sections.find((section) => section.id === sectionId)

  if (!moduleData || !sectionData) {
    return null
  }

  const sectionTitle = sectionData.title.trim()
  const sectionSummary = toSentence(sectionData.summary?.trim() || `This section explains ${sectionTitle.toLowerCase()}`)
  const moduleTitle = moduleData.title.replace(/^Module\s+\d+:\s*/i, "").trim()
  const falseStatement = createSectionFalseStatement(sectionTitle, sectionSummary)
  const titleTrueStatement = createSectionTitleTrueStatement(sectionTitle)
  const titleFalseStatement = createSectionTitleFalseStatement(sectionTitle)

  return [
    {
      statement: titleTrueStatement,
      explanation: `${sectionTitle} is included to sharpen applied decision-making, not just to add background reading.`,
      isTrue: true,
    },
    {
      statement: titleFalseStatement,
      explanation: `The lesson treats ${sectionTitle} as decision-relevant, so reducing it to intuition or popularity goes against the section's purpose.`,
      isTrue: false,
    },
    {
      statement: sectionSummary,
      explanation: `This statement matches the stated goal of ${sectionTitle} in ${moduleTitle}.`,
      isTrue: true,
    },
    {
      statement: falseStatement,
      explanation: `The section summary points in the opposite direction. ${sectionTitle} is meant to sharpen applied judgment, not bypass it.`,
      isTrue: false,
    },
  ]
}

const usedStatementsByScope = new Map<string, Set<string>>()
const statementByScopeAndInstance = new Map<string, InferentialStatement>()
const USED_STATEMENTS_STORAGE_KEY = "ai-course:used-statements-by-scope:v1"
let hasHydratedUsedStatements = false

function hydrateUsedStatementsFromStorage() {
  if (hasHydratedUsedStatements || typeof window === "undefined") {
    return
  }

  hasHydratedUsedStatements = true

  try {
    const raw = window.sessionStorage.getItem(USED_STATEMENTS_STORAGE_KEY)
    if (!raw) {
      return
    }

    const parsed = JSON.parse(raw) as Record<string, string[]>
    for (const [scope, statements] of Object.entries(parsed)) {
      if (Array.isArray(statements) && statements.length > 0) {
        usedStatementsByScope.set(scope, new Set(statements))
      }
    }
  } catch {
    // Ignore malformed storage and fall back to in-memory state.
  }
}

function persistUsedStatementsToStorage() {
  if (typeof window === "undefined") {
    return
  }

  try {
    const serializable: Record<string, string[]> = {}
    for (const [scope, statements] of usedStatementsByScope.entries()) {
      serializable[scope] = [...statements]
    }
    window.sessionStorage.setItem(USED_STATEMENTS_STORAGE_KEY, JSON.stringify(serializable))
  } catch {
    // Ignore storage write failures.
  }
}

function pickUnusedStatement(candidates: InferentialStatement[], sourceText: string, scopeKey: string, instanceKey: string) {
  const assignmentKey = `${scopeKey}::${instanceKey}`
  const assignedStatement = statementByScopeAndInstance.get(assignmentKey)
  if (assignedStatement) {
    return assignedStatement
  }

  hydrateUsedStatementsFromStorage()

  // `scopeKey` is `${pathname}::${sectionId}`.
  // Deduplicate across sections within the same module/page path.
  const usedScopeKey = scopeKey.split("::")[0] || scopeKey

  if (!usedStatementsByScope.has(usedScopeKey)) {
    usedStatementsByScope.set(usedScopeKey, new Set<string>())
  }

  const usedStatements = usedStatementsByScope.get(usedScopeKey)!
  const seed = hashString(`${sourceText}::${instanceKey}`)
  const startIndex = seed % candidates.length

  for (let offset = 0; offset < candidates.length; offset += 1) {
    const candidate = candidates[(startIndex + offset) % candidates.length]
    if (!usedStatements.has(candidate.statement)) {
      usedStatements.add(candidate.statement)
      persistUsedStatementsToStorage()
      statementByScopeAndInstance.set(assignmentKey, candidate)
      return candidate
    }
  }

  const fallbackCandidate = candidates[startIndex]
  usedStatements.add(fallbackCandidate.statement)
  persistUsedStatementsToStorage()
  statementByScopeAndInstance.set(assignmentKey, fallbackCandidate)
  return fallbackCandidate
}

function pickInferentialStatement(sourceText: string, scopeKey: string, instanceKey: string) {
  const normalized = sourceText.toLowerCase()
  const { moduleId } = getScopeContext(scopeKey)

  const sectionStatements = createSectionStatementBank(scopeKey)
  if (sectionStatements) {
    return pickUnusedStatement(sectionStatements, sourceText, scopeKey, instanceKey)
  }

  if (moduleId) {
    const currentModuleStatements = moduleStatementBanks[moduleId]
    if (currentModuleStatements) {
      return pickUnusedStatement(currentModuleStatements, sourceText, scopeKey, instanceKey)
    }
  }

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
      keywords: ["module 5", "roi", "business impact", "metrics", "adoption", "leverage"],
      statements: [
        {
          statement: "A useful AI ROI estimate should include implementation and onboarding effort, not just subscription cost.",
          explanation: "Ignoring adoption overhead can make weak tools look profitable.",
          isTrue: true,
        },
        {
          statement: "Prompt count is a reliable standalone metric for AI business value.",
          explanation: "Prompt volume is usually a vanity metric unless tied to clear outcome improvements.",
          isTrue: false,
        },
        {
          statement: "AI leverage can matter more than time savings if output quality and strategic capacity increase.",
          explanation: "Leverage compounds when AI helps teams produce better results at larger scale.",
          isTrue: true,
        },
        {
          statement: "If a tool has high expected impact, security and compliance fit can be ignored until later.",
          explanation: "Risk controls are part of adoption quality and must be evaluated before scaling.",
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
  const explainerTitle = deriveTextDisplayTitle(title, subtitle, content)
  const explainerAttributes = getExplainerAttributes({
    type: variant === "default" ? "Concept explanation" : `${variant} emphasizer`,
    title: explainerTitle,
    explanation: buildTextDisplayExplanation(content, subtitle, interactive),
  })

  useEffect(() => {
    setDropTarget(null)
    setIsDragging(false)
  }, [content, scopeKey, statementData.statement, title])

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
            <div className="rounded-md border border-brand-orange/25 bg-brand-orange/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">Instructional brief</p>
              <div className="mt-2 space-y-2 text-sm text-foreground">
                <p>
                  This challenge evaluates inferential judgment. Your task is to classify whether a statement is warranted by the lesson's claims and evidence, not whether the wording feels familiar or persuasive.
                </p>
                <p>
                  Apply a claim-evidence-reasoning method before you drop. First, identify the precise proposition being asserted. Second, locate textual evidence that either supports or contradicts that proposition. Third, evaluate whether the inference is valid or whether it introduces hidden assumptions.
                </p>
                <p>
                  Mark a statement as true only when the section justifies it with direct support and consistent logic. Mark it as false when it overgeneralizes, ignores stated limits, reverses causality, or smuggles in certainty that the source material does not provide.
                </p>
                <p>
                  Distinguish linguistic confidence from epistemic strength. High-confidence language can still be weakly grounded. In analytical reading, evidence hierarchy outranks rhetorical tone.
                </p>
                <p>
                  The objective is disciplined reasoning under uncertainty. Use each attempt to improve calibration: align decisions more closely with what is actually justified by the text.
                </p>
              </div>
            </div>

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
