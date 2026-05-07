import { courseStructure } from "@/lib/course-structure"
import { extractSentences, hashString, toSentence } from "@/lib/text-content-utils"

export type SectionKnowledgePattern = {
  keywords: string[]
  briefParagraphs: string[]
  trueStatement: string
  falseStatement: string
  trueExplanation: string
  falseExplanation: string
}

export const SECTION_KNOWLEDGE_PATTERNS: SectionKnowledgePattern[] = [
  {
    keywords: ["model", "tool", "automation", "agent", "taxonomy", "category"],
    briefParagraphs: [
      "A rigorous taxonomy reduces category errors by separating concepts that behave differently in practice. Distinguishing model capability from product behavior is a core analytical skill.",
      "In comparative evaluation, category clarity improves decision quality because options become commensurable across cost, control, integration burden, and risk.",
      "This card should be read as conceptual infrastructure for later decisions, not as isolated terminology.",
    ],
    trueStatement: "Clear category boundaries improve AI decisions by making trade-offs explicit.",
    falseStatement: "Different AI categories can be treated as interchangeable with little impact on decision quality.",
    trueExplanation: "The lesson treats category distinctions as decision-critical, not cosmetic.",
    falseExplanation: "Interchangeability hides material differences in capability, risk, and implementation effort.",
  },
  {
    keywords: ["roi", "metric", "impact", "baseline", "measurement", "value"],
    briefParagraphs: [
      "Educationally sound ROI analysis links outcomes to baselines and context. Metrics without baseline comparison are weak evidence for improvement.",
      "Measurement systems should include adoption effort, quality effects, and risk-adjusted outcomes to avoid overstating value.",
      "This card contributes to evidence literacy by clarifying what counts as valid performance proof.",
    ],
    trueStatement: "Outcome-linked metrics with baseline comparison provide stronger evidence than activity counts alone.",
    falseStatement: "High usage activity is usually sufficient to prove business value, even without outcome metrics.",
    trueExplanation: "The content prioritizes evidence quality and measurement validity.",
    falseExplanation: "Usage intensity is not equivalent to demonstrated impact.",
  },
  {
    keywords: ["risk", "safety", "privacy", "bias", "misinformation", "governance"],
    briefParagraphs: [
      "Risk governance is a design-time responsibility. Controls are most effective when embedded before scale, not appended after incidents.",
      "Bias, privacy, and misinformation checks address different failure modes and should be treated as complementary safeguards.",
      "This card teaches preventive control logic: utility does not override safety obligations.",
    ],
    trueStatement: "Responsible AI deployment requires preventive controls for bias, privacy, and harmful output risks.",
    falseStatement: "If AI output is useful, governance checks can usually be deferred until after rollout.",
    trueExplanation: "The lesson emphasizes preventive control architecture.",
    falseExplanation: "Usefulness does not replace governance duties or risk review.",
  },
  {
    keywords: ["agent", "autonomy", "loop", "guardrail", "stopping", "monitoring"],
    briefParagraphs: [
      "Agentic systems add iterative autonomy, which expands both capability and potential failure surface.",
      "Control design for agents requires bounded objectives, permission limits, and explicit stopping conditions.",
      "This card positions monitoring as a structural requirement for safe agent operation.",
    ],
    trueStatement: "Agent workflows need bounded goals and monitoring because autonomy increases both power and risk.",
    falseStatement: "Autonomous agents are typically safest when run without stopping conditions or ongoing monitoring.",
    trueExplanation: "The content links autonomy to stronger control requirements.",
    falseExplanation: "Unbounded autonomy conflicts with the lesson's guardrail model.",
  },
  {
    keywords: ["workflow", "rollout", "adoption", "change", "roadmap", "execution"],
    briefParagraphs: [
      "Operational gains from AI depend on workflow redesign and adoption sequencing, not just tool access.",
      "Change execution improves when review rhythms, role ownership, and support mechanisms are explicit.",
      "This card frames implementation as a systems problem where process quality determines sustained outcomes.",
    ],
    trueStatement: "Sustained AI adoption depends on workflow design, ownership, and staged execution.",
    falseStatement: "Rapid tool distribution alone is usually enough for successful AI adoption.",
    trueExplanation: "The lesson ties implementation quality to process and governance.",
    falseExplanation: "Tool access without process design tends to increase variance and rework.",
  },
]

export interface InferentialStatement {
  statement: string
  explanation: string
  isTrue: boolean
}

type ScopeContext = {
  moduleId: string | null
  sectionId: string | null
}

type SectionCardKnowledge = {
  briefParagraphs: string[]
  statements: InferentialStatement[]
}

function rotateBySeed<T>(items: T[], seed: number) {
  if (items.length <= 1) {
    return items
  }

  const shift = seed % items.length
  if (shift === 0) {
    return items
  }

  return [...items.slice(shift), ...items.slice(0, shift)]
}

function extractCardFocusTerms(text: string, maxTerms = 3) {
  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "into",
    "when",
    "where",
    "your",
    "their",
    "about",
    "have",
    "has",
    "will",
    "can",
    "should",
    "could",
    "would",
    "also",
    "than",
    "through",
    "using",
    "used",
    "more",
    "most",
    "over",
    "under",
    "between",
    "across",
    "each",
    "only",
    "real",
    "work",
    "card",
    "section",
    "lesson",
    "module",
  ])

  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 4 && !stopWords.has(token))

  const unique: string[] = []
  for (const token of tokens) {
    if (!unique.includes(token)) {
      unique.push(token)
    }
    if (unique.length >= maxTerms) {
      break
    }
  }

  return unique
}

function getModuleIdFromScope(scopeKey: string) {
  const [pathFragment] = scopeKey.split("::")
  const moduleMatch = pathFragment.match(/module-\d+/)
  return moduleMatch ? moduleMatch[0] : null
}

function getSectionIdFromScope(scopeKey: string) {
  const [, sectionId] = scopeKey.split("::")
  const trimmedSectionId = sectionId?.trim()
  return trimmedSectionId && trimmedSectionId.length > 0 ? trimmedSectionId : null
}

function getScopeContext(scopeKey: string): ScopeContext {
  return {
    moduleId: getModuleIdFromScope(scopeKey),
    sectionId: getSectionIdFromScope(scopeKey),
  }
}

function pickSectionKnowledgePattern(normalizedContext: string) {
  let bestPattern: SectionKnowledgePattern | null = null
  let bestScore = 0

  for (const pattern of SECTION_KNOWLEDGE_PATTERNS) {
    const matches = pattern.keywords.filter((keyword) => normalizedContext.includes(keyword)).length
    if (matches > bestScore) {
      bestScore = matches
      bestPattern = pattern
    }
  }

  return bestScore > 0 ? bestPattern : null
}

function pickCardPattern(normalizedContext: string, cardSeed: number) {
  const matchedPatterns = SECTION_KNOWLEDGE_PATTERNS.filter((pattern) =>
    pattern.keywords.some((keyword) => normalizedContext.includes(keyword))
  )

  if (matchedPatterns.length === 0) {
    return null
  }

  return matchedPatterns[cardSeed % matchedPatterns.length]
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
    return "This section implies structured checklists are unnecessary because ad-hoc judgment is usually good enough."
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
    return "The most complex AI setup is usually the right choice, even when the task does not require it."
  }

  if (normalizedSummary.startsWith("choose ")) {
    return "The section suggests choosing quickly without clarifying trade-offs, ownership, or fit."
  }

  if (normalizedSummary.startsWith("set ")) {
    return "You can usually expand AI use without setting clear rules, controls, or review points first."
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

function buildSectionCardKnowledge(scopeKey: string, title?: string, content?: string): SectionCardKnowledge | null {
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
  const rawSectionSummary = sectionData.summary?.trim()
  if (!rawSectionSummary) {
    return null
  }

  const sectionSummary = toSentence(rawSectionSummary)
  const moduleTitle = moduleData.title.replace(/^Module\s+\d+:\s*/i, "").trim()
  const cardTitle = title?.trim()
  if (!cardTitle) {
    return null
  }

  const cardLead = extractSentences(content)[0]
  if (!cardLead) {
    return null
  }

  const cardSeed = hashString(`${scopeKey}::${cardTitle}::${cardLead}`)
  const normalizedContext = [sectionTitle, sectionSummary, cardTitle, cardLead].join(" ").toLowerCase()
  const matchedPattern = pickCardPattern(normalizedContext, cardSeed)
  if (!matchedPattern) {
    return null
  }

  const focusTerms = extractCardFocusTerms(`${cardTitle} ${cardLead}`)
  if (focusTerms.length === 0) {
    return null
  }

  const focusPhrase = focusTerms.join(", ")

  const titleTrueStatement = createSectionTitleTrueStatement(sectionTitle)
  const titleFalseStatement = createSectionTitleFalseStatement(sectionTitle)
  const summaryFalseStatement = createSectionFalseStatement(sectionTitle, sectionSummary)
  const cardTrueStatement = `${cardTitle} reinforces the practical meaning of ${sectionTitle.toLowerCase()} in real AI work.`
  const cardFalseStatement = `${cardTitle} is mostly theoretical and does not materially influence implementation decisions.`
  const leadTrueStatement = `The core claim in this card is that ${toSentence(cardLead).replace(/[.!?]$/, "")}.`
  const leadFalseStatement = `${toSentence(cardLead).replace(/[.!?]$/, "")} is not important for AI decision quality.`

  const patternStatements: InferentialStatement[] = [
    {
      statement: matchedPattern.trueStatement,
      explanation: matchedPattern.trueExplanation,
      isTrue: true,
    },
    {
      statement: matchedPattern.falseStatement,
      explanation: matchedPattern.falseExplanation,
      isTrue: false,
    },
  ]

  const statements: InferentialStatement[] = [
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
      statement: summaryFalseStatement,
      explanation: `The section summary points in the opposite direction. ${sectionTitle} is meant to sharpen applied judgment, not bypass it.`,
      isTrue: false,
    },
    {
      statement: cardTrueStatement,
      explanation: `${cardTitle} extends the section concept into a concrete decision context.`,
      isTrue: true,
    },
    {
      statement: cardFalseStatement,
      explanation: `The card is positioned to inform action, not to remain detached from implementation.`,
      isTrue: false,
    },
    {
      statement: leadTrueStatement,
      explanation: "This mirrors the central emphasis of the current component card text.",
      isTrue: true,
    },
    {
      statement: leadFalseStatement,
      explanation: "The card presents this concept as decision-relevant rather than optional.",
      isTrue: false,
    },
    ...patternStatements,
  ]

  const baseBriefParagraphs = [
    `Section context: ${sectionTitle}. Core idea: ${sectionSummary}`,
    ...matchedPattern.briefParagraphs,
    `Card focus: ${toSentence(cardLead)} Priority concepts in this card include ${focusPhrase}.`,
    `Interpret this card as applied guidance connected to ${moduleTitle}, not as isolated wording practice.`,
  ]

  const briefParagraphs = [baseBriefParagraphs[0], ...rotateBySeed(baseBriefParagraphs.slice(1), cardSeed)]
  const rotatedStatements = rotateBySeed(statements, cardSeed)

  return {
    briefParagraphs,
    statements: rotatedStatements,
  }
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
    // Ignore malformed storage and keep current in-memory state.
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

  const [usedScopeKey] = scopeKey.split("::")

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

  usedStatements.clear()
  const recycledCandidate = candidates[startIndex]
  usedStatements.add(recycledCandidate.statement)
  persistUsedStatementsToStorage()
  statementByScopeAndInstance.set(assignmentKey, recycledCandidate)
  return recycledCandidate
}

function pickInferentialStatement(title: string | undefined, content: string | undefined, sourceText: string, scopeKey: string, instanceKey: string) {
  const normalized = sourceText.toLowerCase()

  const sectionKnowledge = buildSectionCardKnowledge(scopeKey, title, content)
  if (!sectionKnowledge) {
    throw new Error("Unable to generate section knowledge without complete context.")
  }

  const sectionStatements = sectionKnowledge.statements
  return pickUnusedStatement(sectionStatements, sourceText, scopeKey, instanceKey)
}

export function getTextDisplayInstructionalBriefParagraphs(scopeKey: string, title?: string, content?: string) {
  const knowledge = buildSectionCardKnowledge(scopeKey, title, content)
  if (!knowledge) {
    throw new Error("Instructional brief requires complete section and card context.")
  }

  return knowledge.briefParagraphs
}

export function getTextDisplayTrueFalseStatement(title: string | undefined, content: string | undefined, scopeKey: string, instanceKey: string) {
  const sourceParts = [title, content]
    .filter((part): part is string => Boolean(part && part.trim().length > 0))
  if (sourceParts.length === 0) {
    throw new Error("True/false statement generation requires title or content.")
  }

  const source = sourceParts.join("\n")
  const statementData = pickInferentialStatement(title, content, `${title ? `${title} ` : ""}${source}`, scopeKey, instanceKey)

  return {
    statement: toSentence(statementData.statement),
    explanation: statementData.explanation,
    isTrue: statementData.isTrue,
  }
}
