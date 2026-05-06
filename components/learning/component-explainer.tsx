"use client"

import { useRef, useState, type PointerEvent, type ReactNode } from "react"
import { Blocks, Clock3, Layers3, MousePointerClick, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getComponentExplanation } from "@/lib/component-explanations"

export type ExplainerDescriptor = {
  id?: string
  type: string
  title: string
  explanation: string
}

const DEFAULT_DESCRIPTOR: ExplainerDescriptor = {
  type: "Learning support",
  title: "Explanation Panel",
  explanation: `This panel provides deeper educational context about concepts in your course modules. Hover over any interactive component - a quiz question, a matching exercise, a concept explanation, or a progress indicator - and this panel will expand on that topic with additional explanation and context.

The Explanation Panel functions like a textbook sidebar. Where the module component itself teaches a concept through interaction, this panel provides supplementary reading that deepens your understanding. You'll find connections to broader ideas, underlying principles, and practical applications that complement your active learning.

Use this panel whenever you want more context beyond what the interactive component provides. It's designed to be read alongside your engagement with the course material, helping you build a richer mental model of AI concepts.`,
}

function compactText(value: string | null | undefined, maxLength = 180) {
  if (!value) {
    return ""
  }

  const normalized = value.replace(/\s+/g, " ").trim()
  if (!normalized) {
    return ""
  }

  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 48)
}

function simpleHash(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash.toString(16).slice(0, 8)
}

function sentenceList(value: string, maxItems: number) {
  const sentences = value
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 20)
  return sentences.slice(0, maxItems)
}

function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0).length
}

function conceptExpansionByIntent(intent: CardIntent, title: string) {
  if (intent === "timeline") {
    return `${title} becomes more useful when you read each milestone as a dependency shift instead of a date. Ask which constraint changed first-data volume, compute cost, model architecture, or distribution channel-because that dependency usually explains why progress accelerated at that exact moment.`
  }

  if (intent === "comparison") {
    return `${title} should change decisions, not just definitions. Strong comparisons stay anchored to constraints such as latency, cost, reliability, and governance. In practice, the best option is usually the one whose weaknesses are acceptable for the current objective, not the one that appears strongest in the abstract.`
  }

  if (intent === "risk") {
    return `${title} matters most when connected to operational controls. Risk claims become actionable only when paired with detection, escalation, and rollback paths. In AI systems, prevention usually depends on process design as much as model quality.`
  }

  if (intent === "process") {
    return `${title} is valuable because sequence changes outcomes. Ordering determines what information is available at each step, and early errors propagate quickly through AI workflows. Reliable execution comes from explicit checkpoints rather than from confidence in a single model output.`
  }

  if (intent === "tooling") {
    return `${title} is most useful when tied to system boundaries. Tools differ not only by output quality but by data handling, integration overhead, observability, and compliance fit. Choosing well means matching the tool to both the task and the surrounding operating environment.`
  }

  return `${title} becomes durable knowledge when it is used as a lens for evaluating real outputs. In AI work, strong judgment comes from tracing claims back to evidence, assumptions, and known failure modes, then adapting decisions as context changes.`
}

function ensureConceptDepth(text: string, minimumWords: number, title: string, intent: CardIntent) {
  let output = text.trim()
  while (countWords(output) < minimumWords) {
    output += `\n\n${conceptExpansionByIntent(intent, title)}`
  }
  return output
}

function toInstructorExplanation(descriptor: ExplainerDescriptor) {
  const base = expandText(descriptor.explanation)
  const keySentences = sentenceList(base, 6)
  const mainIdea = keySentences[0] || `${descriptor.title} introduces a core AI concept in this module.`
  const mechanism = keySentences[1] || "The underlying mechanism explains why this concept works in some contexts and fails in others."
  const practical = keySentences[2] || "In practice, this concept should shape concrete decisions about tool choice, validation, and oversight."
  const limitation = keySentences[3] || "Its limits are part of the concept itself, not edge trivia, because limits determine where confidence is justified."
  const connection = keySentences[4] || "This idea links directly to later tasks that require tradeoff reasoning rather than memorized definitions."
  const intent = detectCardIntent(descriptor.title, mainIdea, keySentences.slice(1))
  const toneSeed = simpleHash(`${descriptor.id ?? descriptor.title}:${descriptor.type}`)
  const openingVariants = [
    `${mainIdea} The important move is to separate the core claim from surrounding examples so the same logic can transfer to new AI scenarios.`,
    `At its core, ${descriptor.title} describes a claim about system behavior. Treat examples as evidence for that claim, not as the claim itself.`,
    `${descriptor.title} is most useful when interpreted causally: what drives the outcome, what assumptions are required, and what breaks when assumptions fail.`,
  ]
  const opening = openingVariants[parseInt(toneSeed.slice(0, 1), 16) % openingVariants.length]
  const whyVariants = [
    `${mechanism} In AI, causal understanding is what lets you predict error patterns before they appear in production.`,
    `${mechanism} Mechanism-level clarity prevents cargo-cult usage and supports adaptation when data, constraints, or goals change.`,
    `${mechanism} This is the difference between copying demonstrations and making defensible decisions under uncertainty.`,
  ]
  const whySection = whyVariants[parseInt(toneSeed.slice(1, 2), 16) % whyVariants.length]
  const practicalVariants = [
    `${practical} Decisions should reference objective, constraints, and acceptable failure cost, not tool familiarity alone.`,
    `${practical} In real workflows, this usually appears as a tradeoff among speed, quality, cost, and risk exposure.`,
    `${practical} The strongest application is explicit: what changed in the decision once this concept was considered.`,
  ]
  const practicalSection = practicalVariants[parseInt(toneSeed.slice(2, 3), 16) % practicalVariants.length]
  const boundaryVariants = [
    `${limitation} Over-generalizing from one successful case is a common failure mode in AI adoption.`,
    `${limitation} Changes in task type, data quality, or governance constraints can invalidate earlier conclusions.`,
    `${limitation} Confidence should be tied to evidence quality, not to fluent outputs or familiar wording.`,
  ]
  const boundarySection = boundaryVariants[parseInt(toneSeed.slice(3, 4), 16) % boundaryVariants.length]
  const wrapVariants = [
    `${connection} Carry it forward by using it to explain one downstream decision in the next activity.`,
    `${connection} The value here is transfer: the same reasoning should hold even when examples and tools change.`,
    `${connection} Treat this as operating logic for later sections, not as an isolated definition card.`,
  ]
  const wrapSection = wrapVariants[parseInt(toneSeed.slice(4, 5), 16) % wrapVariants.length]

  const instructorText = [
    opening,
    whySection,
    practicalSection,
    boundarySection,
    wrapSection,
  ].join("\n\n")

  return {
    ...descriptor,
    explanation: ensureConceptDepth(instructorText, 85, descriptor.title, intent),
  } satisfies ExplainerDescriptor
}

type CardIntent = "timeline" | "comparison" | "risk" | "process" | "tooling" | "definition"

function detectCardIntent(title: string, summary: string, details: string[]) {
  const haystack = `${title} ${summary} ${details.join(" ")}`.toLowerCase()

  if (/\b(19\d{2}|20\d{2}|timeline|history|era|winter|present|milestone)\b/.test(haystack)) {
    return "timeline" satisfies CardIntent
  }
  if (/\b(compare|versus|vs\.?|tradeoff|pros|cons|table|difference|choose)\b/.test(haystack)) {
    return "comparison" satisfies CardIntent
  }
  if (/\b(risk|bias|harm|safety|security|failure|liability|mitigation|deepfake)\b/.test(haystack)) {
    return "risk" satisfies CardIntent
  }
  if (/\b(step|workflow|loop|sequence|checklist|process|protocol|order)\b/.test(haystack)) {
    return "process" satisfies CardIntent
  }
  if (/\b(tool|platform|app|api|stack|workflow|automation)\b/.test(haystack)) {
    return "tooling" satisfies CardIntent
  }
  return "definition" satisfies CardIntent
}

function buildWhySection(intent: CardIntent, title: string, details: string[]) {
  const firstDetail = details[0] || "the specific examples listed in this card"

  if (intent === "timeline") {
    return `${title} is not just a historical note - it explains cause and effect in AI progress. When you see the sequence of shifts over time, you can separate durable breakthroughs from short-lived hype cycles and make better predictions about what will matter next.`
  }

  if (intent === "comparison") {
    return `${title} gives you a decision framework, not just facts. By comparing options side by side (for example: ${firstDetail}), you reduce vague judgment and can choose methods based on constraints, quality needs, and risk tolerance.`
  }

  if (intent === "risk") {
    return `${title} protects quality, trust, and safety outcomes. Risk concepts only become useful when paired with concrete safeguards; this card helps you move from awareness to prevention before errors become costly.`
  }

  if (intent === "process") {
    return `${title} turns good intentions into repeatable execution. Process clarity lowers cognitive load, prevents skipped steps, and improves consistency when tasks become complex or time-constrained.`
  }

  if (intent === "tooling") {
    return `${title} connects capability to implementation. Understanding tool roles helps you pick the right system for the job instead of forcing one tool to solve every problem.`
  }

  return `${title} is a foundational concept. If this idea is unclear, later techniques become mechanical. If this idea is clear, you can explain tradeoffs, spot weak outputs, and reason through unfamiliar AI scenarios.`
}

function buildDecisionSection(intent: CardIntent, title: string) {
  if (intent === "timeline") {
    return `Use this context to evaluate new AI claims by asking where they fit in the long-term pattern and what dependency (data, compute, method, or distribution) actually changed.`
  }
  if (intent === "comparison") {
    return `Use ${title} to justify choices explicitly: what option fits your objective, what compromise you accept, and what metric you will track after implementation.`
  }
  if (intent === "risk") {
    return `Translate this card into operating rules: what must be reviewed by a human, what gets logged, and which failure conditions trigger escalation.`
  }
  if (intent === "process") {
    return `Convert this into a checklist you can run under pressure. If a step cannot be measured or verified, refine it before relying on it in production work.`
  }
  if (intent === "tooling") {
    return `Match tools to workload characteristics (speed, accuracy, cost, privacy, and maintainability) before choosing a stack.`
  }
  return `Use this concept as a lens when judging outputs: what assumptions are being made, what evidence is missing, and what human oversight is still required.`
}

function expandText(value: string | null | undefined) {
  if (!value) {
    return ""
  }
  return value.replace(/\s+/g, " ").trim()
}

export function getExplainerAttributes(descriptor: ExplainerDescriptor) {
  const normalizedDescriptor: ExplainerDescriptor = {
    id: descriptor.id,
    type: compactText(descriptor.type, 40),
    title: compactText(descriptor.title, 90),
    explanation: expandText(descriptor.explanation),
  }

  return {
    "data-explainer": JSON.stringify(normalizedDescriptor),
  }
}

export function ExplainerTarget({ descriptor, className, children }: { descriptor: ExplainerDescriptor; className?: string; children: ReactNode }) {
  return (
    <div {...getExplainerAttributes(descriptor)} className={className}>
      {children}
    </div>
  )
}

function parseDescriptor(value: string | null) {
  if (!value) {
    return null
  }

  try {
    const parsed = JSON.parse(value) as Partial<ExplainerDescriptor>
    if (!parsed.type || !parsed.title || !parsed.explanation) {
      return null
    }

    return {
      id: parsed.id,
      type: parsed.type,
      title: parsed.title,
      explanation: parsed.explanation,
    } satisfies ExplainerDescriptor
  } catch {
    return null
  }
}

function buildFallbackDescriptor(element: HTMLElement) {
  const slot = element.getAttribute("data-slot")
  const tagName = element.tagName.toLowerCase()
  const label = compactText(
    element.getAttribute("aria-label") ?? element.getAttribute("placeholder") ?? element.textContent,
    120,
  )

  if (slot === "button" || tagName === "button" || element.getAttribute("role") === "button") {
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, " ").trim()
    const isNavigationButton =
      normalizedLabel === "next" ||
      normalizedLabel === "next >" ||
      normalizedLabel.startsWith("next ") ||
      normalizedLabel === "previous" ||
      normalizedLabel.startsWith("previous ") ||
      normalizedLabel === "back" ||
      normalizedLabel.startsWith("back ") ||
      normalizedLabel === "continue" ||
      normalizedLabel.startsWith("continue ")

    if (isNavigationButton) {
      return null
    }

    return {
      type: "Action checkpoint",
      title: label || "Next step",
      explanation: `This button represents a key moment in your learning. Buttons in this course are never busy-work—each one marks a transition point where you're either solidifying understanding, moving to a new concept, or checking your thinking.

In learning science, these transition moments matter. When you deliberately choose to move forward, you're making an active commitment to the new material. This conscious choice increases engagement and retention compared to passively scrolling through content.

When you click this button, pay attention to what happens next. The course is designed so each action builds on what you've already learned.`,
    } satisfies ExplainerDescriptor
  }

  if (slot === "input" || tagName === "input" || tagName === "textarea") {
    return {
      type: "Active learning",
      title: label || "Your input",
      explanation: `This input field is where you express your thinking. Writing about what you're learning—even in an informal way—is one of the most powerful learning techniques available. When you articulate ideas in your own words, you reveal gaps in your understanding that reading alone never would.

Cognitive scientists call this the "generation effect." Information you produce is remembered much better than information you receive. So when this course asks you to type something, it's not collecting data—it's giving you a cognitive tool for deeper learning.

Don't worry about writing perfectly. The goal is to translate the concepts you're encountering into your own language. That translation process is where learning actually happens.`,
    } satisfies ExplainerDescriptor
  }

  if (slot === "card" || slot === "card-header" || slot === "card-content" || tagName === "article" || tagName === "section") {
    // Pull the card's own heading for the panel title
    const headingEl = element.querySelector("h1,h2,h3,h4,h5,h6")
    const headingText = compactText(headingEl?.textContent, 90)
    // Pull category badge / coloured label spans that sit at the top of many cards
    const badgeEl = element.querySelector(
      'span[class*="rounded"][class*="bg-"], span[class*="rounded"][class*="text-white"]',
    )
    const badgeText = compactText(badgeEl?.textContent, 60)

    // Gather rich content from the card itself
    const paragraphs = Array.from(element.querySelectorAll("p"))
      .map((p) => p.textContent?.replace(/\s+/g, " ").trim())
      .filter((t): t is string => !!t && t.length > 10)

    const listItems = Array.from(element.querySelectorAll("li"))
      .map((li) => li.textContent?.replace(/\s+/g, " ").trim())
      .filter((t): t is string => !!t && t.length > 10)
      .slice(0, 5)

    const tableRows = Array.from(element.querySelectorAll("tr"))
      .map((row) =>
        Array.from(row.querySelectorAll("th,td"))
          .map((cell) => cell.textContent?.replace(/\s+/g, " ").trim())
          .filter((cell): cell is string => !!cell && cell.length > 0)
          .join(" -> "),
      )
      .filter((row) => row.length > 0)
      .slice(0, 4)

    const cardTitle = headingText || badgeText || compactText(label, 90) || "Key concept"
    const summarySource = [...paragraphs.slice(0, 2), ...listItems.slice(0, 2), ...tableRows.slice(0, 1)].join(" ")
    const summarySentences = sentenceList(summarySource, 2)
    const summary = summarySentences.length > 0 ? summarySentences.join(" ") : compactText(summarySource, 220)

    const detailPool = [...listItems, ...tableRows, ...paragraphs.slice(3)]
    const uniqueDetails: string[] = []
    for (const detail of detailPool) {
      const normalized = detail.toLowerCase()
      if (!uniqueDetails.some((existing) => existing.toLowerCase() === normalized)) {
        uniqueDetails.push(detail)
      }
      if (uniqueDetails.length === 4) {
        break
      }
    }

    const contextualSection =
      uniqueDetails.length > 0
        ? `The surrounding details suggest concrete constraints such as ${uniqueDetails
            .slice(0, 2)
            .map((item) => item.replace(/[.!?]+$/, ""))
            .join(" and ")}. Those constraints are usually what determine whether the concept succeeds in practice.`
        : ""

    const intent = detectCardIntent(cardTitle, summary, uniqueDetails)
    const framingSection = summary
      ? `${cardTitle} is presented through a compact example. The deeper value is the underlying logic: ${summary}`
      : `${cardTitle} introduces an idea that should be interpreted as decision logic, not just descriptive content.`
    const whySection = buildWhySection(intent, cardTitle, uniqueDetails)
    const decisionSection = buildDecisionSection(intent, cardTitle)

    const explanationSections = [
      framingSection,
      whySection,
      contextualSection,
      decisionSection,
    ].filter((section) => section.length > 0)

    const explanation = explanationSections.join("\n\n")
    const explicitId = element.getAttribute("data-explainer-id")
    const cardId = explicitId || `card-${slugify(cardTitle || "item")}-${simpleHash(explanation)}`

    return { id: cardId, type: "Course content", title: cardTitle, explanation } satisfies ExplainerDescriptor
  }

  if (/^h[1-6]$/.test(tagName)) {
    return {
      type: "Concept boundary",
      title: label || "New topic",
      explanation: `This heading marks a transition. In learning, transitions matter—they're moments when your brain shifts from one conceptual framework to another.

Good learners pause at transitions. They might take a moment to summarize what they just learned, or preview what's coming next. This conscious transition makes the memory boundaries clearer and helps prevent concepts from bleeding into each other.

When you see a heading like this, it's a good moment to check: Do I understand the previous section? What question am I approaching now? This meta-cognitive moment—thinking about your own thinking—is what separates surface learning from deep learning.`,
    } satisfies ExplainerDescriptor
  }

  if (tagName === "img") {
    return {
      type: "Visual learning",
      title: compactText(element.getAttribute("alt"), 90) || "Diagram or chart",
      explanation: `This visual is here for a reason: images activate different parts of your brain than words do. When text and image work together, you remember better and understand more deeply than either alone.

If this is a diagram, spend time understanding its structure. How are the parts arranged? What do the connections mean? If it's a chart or graph, read it carefully—ask yourself what pattern it's showing. Visuals reward careful attention.

The surrounding text explains the image's relevance, but the best learning happens when you study the image itself. What would you say it shows? How does it connect to the concepts being explained? These questions activate your visual-spatial reasoning in ways that deepen comprehension.`,
    } satisfies ExplainerDescriptor
  }

  return null
}

function resolveDescriptor(target: HTMLElement | null) {
  let current = target

  // First, check if the component has an ID that maps to a custom explanation
  while (current) {
    const componentId = current.getAttribute("data-explainer-id")
    if (componentId) {
      const customExplanation = getComponentExplanation(componentId)
      if (customExplanation) {
        return toInstructorExplanation({
          id: customExplanation.id,
          type: customExplanation.id.substring(0, customExplanation.id.indexOf("-", 2)), // Extract module prefix
          title: customExplanation.title,
          explanation: customExplanation.explanation,
        } satisfies ExplainerDescriptor)
      }
    }
    current = current.parentElement
  }

  // Fall back to explicit descriptors
  current = target
  while (current) {
    const explicitDescriptor = parseDescriptor(current.getAttribute("data-explainer"))
    if (explicitDescriptor) {
      return toInstructorExplanation(explicitDescriptor)
    }
    current = current.parentElement
  }

  // Finally, fall back to inferred descriptors based on element type
  current = target
  while (current) {
    const fallbackDescriptor = buildFallbackDescriptor(current)
    if (fallbackDescriptor) {
      return toInstructorExplanation(fallbackDescriptor)
    }
    current = current.parentElement
  }

  return null
}

function ExplanationPanelContent({ descriptor }: { descriptor: ExplainerDescriptor; history: ExplainerDescriptor[] }) {
  const paragraphs = descriptor.explanation
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)

  return (
    <Card className="h-full overflow-hidden border-brand-indigo/20 bg-white/95 shadow-xl backdrop-blur">
      <div className="flex h-full flex-col gap-5 p-6 overflow-y-auto">
        <div className="space-y-4 pb-4 border-b border-border">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
            <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
            Explanation Panel
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/80">{descriptor.type}</p>
          <h3 className="text-base font-semibold leading-tight text-brand-indigo">{descriptor.title}</h3>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-sm">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function CourseExplainerLayout({ children }: { children: ReactNode }) {
  const [selectedDescriptor, setSelectedDescriptor] = useState(DEFAULT_DESCRIPTOR)
  const [selectionHistory, setSelectionHistory] = useState<ExplainerDescriptor[]>([])

  const lastDescriptorRef = useRef<string>("")

  const handlePointerOver = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null

    if (!target || target.closest('[data-explainer-panel="true"]')) {
      return
    }

    const descriptor = resolveDescriptor(target)
    const descriptorSignature = descriptor ? `${descriptor.id ?? descriptor.type}:${descriptor.title}:${descriptor.explanation.slice(0, 80)}` : ""
    if (descriptor && descriptorSignature !== lastDescriptorRef.current) {
      lastDescriptorRef.current = descriptorSignature
      setSelectedDescriptor(descriptor)
      setSelectionHistory((previous) => {
        const nextHistory = previous.filter((item) => {
          const previousKey = `${item.id ?? item.type}:${item.title}`
          const descriptorKey = `${descriptor.id ?? descriptor.type}:${descriptor.title}`
          return previousKey !== descriptorKey
        })
        return [descriptor, ...nextHistory].slice(0, 4)
      })
    }
  }

  return (
    <div className="xl:pr-[23.5rem]" data-course-content="true" onPointerOver={handlePointerOver}>
      {children}

      <div className="border-t border-border bg-background/95 p-4 backdrop-blur xl:hidden" data-explainer-panel="true">
        <ExplanationPanelContent descriptor={selectedDescriptor} history={selectionHistory.slice(1)} />
      </div>

      <aside
        className="fixed right-4 top-24 z-40 hidden h-[calc(100vh-7rem)] w-[22rem] xl:block"
        data-explainer-panel="true"
      >
        <ExplanationPanelContent descriptor={selectedDescriptor} history={selectionHistory.slice(1)} />
      </aside>
    </div>
  )
}