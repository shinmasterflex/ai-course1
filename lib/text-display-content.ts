import { COMPONENT_CARD_REGISTRY, getCourseStructure } from "@/lib/course-content"
import { hashString, toSentence } from "@/lib/text-content-utils"

const courseStructure = getCourseStructure()

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

function buildSectionCardKnowledge(scopeKey: string): SectionCardKnowledge {
  const fallbackKnowledge: SectionCardKnowledge = {
    briefParagraphs: [
      "Section context is unavailable, so this card uses the default hardcoded course guidance.",
      "Interpret this interaction as a quick comprehension check tied to practical AI decision quality.",
      "Strong AI learning focuses on clear decisions, explicit trade-offs, and responsible execution.",
      "Use each section to improve judgment quality before scaling workflows or tooling.",
    ],
    statements: [
      {
        statement: "Clear section objectives improve AI decisions by making trade-offs explicit before execution.",
        explanation: "The course consistently emphasizes practical clarity before rollout.",
        isTrue: true,
      },
      {
        statement: "AI rollout quality usually depends only on tool selection, not on workflow, ownership, or review.",
        explanation: "The curriculum treats process design and review controls as essential implementation factors.",
        isTrue: false,
      },
      {
        statement: "Clear section objectives improve AI decisions by making trade-offs explicit before execution.",
        explanation: "The course consistently emphasizes practical clarity before rollout.",
        isTrue: true,
      },
      {
        statement: "AI rollout quality usually depends only on tool selection, not on workflow, ownership, or review.",
        explanation: "The curriculum treats process design and review controls as essential implementation factors.",
        isTrue: false,
      },
    ],
  }

  const { moduleId, sectionId } = getScopeContext(scopeKey)
  if (!moduleId || !sectionId) {
    return fallbackKnowledge
  }

  const moduleData = courseStructure.modules.find((module) => module.id === moduleId)
  const sectionCard = Object.values(COMPONENT_CARD_REGISTRY).find(
    (card) => card.moduleId === moduleId && card.sectionId === sectionId,
  )
  if (!moduleData || !sectionCard) {
    return fallbackKnowledge
  }

  const sectionTitle = sectionId
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
  const rawSectionSummary = sectionCard.summary?.trim() || `${sectionTitle} improves practical AI decision quality.`
  const sectionSummary = toSentence(rawSectionSummary)
  const moduleTitle = moduleData.title.replace(/^Module\s+\d+:\s*/i, "").trim()
  const cardSeed = hashString(`${moduleId}::${sectionId}`)

  const titleTrueStatement = createSectionTitleTrueStatement(sectionTitle)
  const titleFalseStatement = createSectionTitleFalseStatement(sectionTitle)
  const summaryFalseStatement = createSectionFalseStatement(sectionTitle, sectionSummary)

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
      statement: `${moduleTitle} requires evidence-based AI choices that connect capability, workflow, and risk controls.`,
      explanation: "The curriculum repeatedly links AI value to measurable outcomes and implementation discipline.",
      isTrue: true,
    },
    {
      statement: `${moduleTitle} can be completed effectively through intuition alone without explicit criteria or review.`,
      explanation: "The course emphasizes structured evaluation and governance over ad-hoc judgment.",
      isTrue: false,
    },
  ]

  const baseBriefParagraphs = [
    `Section context: ${sectionTitle}. Core idea: ${sectionSummary}`,
    `Module context: ${moduleTitle}. Apply this section to practical choices, not abstract recall.`,
    "Focus on turning concepts into concrete decisions with clear ownership and measurable outcomes.",
    "Treat AI adoption as an operating model decision, not just a tool selection task.",
    `Interpret this card as applied guidance connected to ${moduleTitle}, not as isolated wording practice.`,
  ]

  const briefParagraphs = [baseBriefParagraphs[0], ...rotateBySeed(baseBriefParagraphs.slice(1), cardSeed)]
  const rotatedStatements = rotateBySeed(statements, cardSeed)

  return {
    briefParagraphs,
    statements: rotatedStatements,
  }
}

function pickUnusedStatement(candidates: InferentialStatement[], sourceText: string, scopeKey: string, instanceKey: string) {
  const seed = hashString(`${sourceText}::${instanceKey}`)
  return candidates[seed % candidates.length]
}

function pickInferentialStatement(title: string | undefined, content: string | undefined, sourceText: string, scopeKey: string, instanceKey: string) {
  const sectionKnowledge = buildSectionCardKnowledge(scopeKey)

  const sectionStatements = sectionKnowledge.statements
  return pickUnusedStatement(sectionStatements, sourceText, scopeKey, instanceKey)
}

export function getTextDisplayInstructionalBriefParagraphs(scopeKey: string, title?: string, content?: string) {
  return buildSectionCardKnowledge(scopeKey).briefParagraphs
}

export function getTextDisplayTrueFalseStatement(title: string | undefined, content: string | undefined, scopeKey: string, instanceKey: string) {
  const sourceParts = [title, content]
    .filter((part): part is string => Boolean(part && part.trim().length > 0))
  const source = sourceParts.length > 0 ? sourceParts.join("\n") : scopeKey
  const statementData = pickInferentialStatement(title, content, `${title ? `${title} ` : ""}${source}`, scopeKey, instanceKey)

  return {
    statement: toSentence(statementData.statement),
    explanation: statementData.explanation,
    isTrue: statementData.isTrue,
  }
}

