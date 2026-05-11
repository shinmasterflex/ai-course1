"use client"

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { Blocks, Clock3, Layers3, MousePointerClick, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getComponentExplanation } from "@/lib/course-content"

export type ExplainerDescriptor = {
  id?: string
  type: string
  title: string
  explanation?: string
  questions?: Array<{
    question: string
    explanation: string
  }>
  summary?: string
  details?: string[]
  interaction?: string
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

export function formatExplainerDescriptor(descriptor: ExplainerDescriptor) {
  return descriptor
}

function expandText(value: string | null | undefined) {
  if (!value) {
    return ""
  }
  return value.replace(/\s+/g, " ").trim()
}

export function getExplainerAttributes(descriptor: ExplainerDescriptor) {
  const explanation = descriptor.explanation
    ? descriptor.explanation
    : [descriptor.summary, ...(descriptor.details ?? []), descriptor.interaction].filter(Boolean).join(" ")

  const normalizedDescriptor: ExplainerDescriptor = {
    id: descriptor.id,
    type: compactText(descriptor.type, 40),
    title: compactText(descriptor.title, 90),
    explanation,
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
      questions: Array.isArray(parsed.questions)
        ? parsed.questions
            .filter(
              (item): item is { question: string; explanation: string } =>
                Boolean(item && typeof item === "object" && typeof item.question === "string" && typeof item.explanation === "string"),
            )
        : undefined,
    } satisfies ExplainerDescriptor
  } catch {
    return null
  }
}


function resolveDescriptor(target: HTMLElement | null) {
  let current = target

  // First, use explicit descriptor attributes attached directly to cards.
  while (current) {
    const explicitDescriptor = parseDescriptor(current.getAttribute("data-explainer"))
    if (explicitDescriptor) {
      return formatExplainerDescriptor(explicitDescriptor)
    }
    current = current.parentElement
  }

  // Then, fall back to ID-based explanation lookup.
  current = target
  while (current) {
    const componentId = current.getAttribute("data-explainer-id")
    if (componentId) {
      const customExplanation = getComponentExplanation(componentId)
      if (customExplanation?.question && customExplanation.explanation) {
        return formatExplainerDescriptor({
          id: customExplanation.id,
          type: customExplanation.id.substring(0, customExplanation.id.indexOf("-", 2)), // Extract module prefix
          title: customExplanation.question,
          explanation: customExplanation.explanation,
          questions: customExplanation.questions,
        } satisfies ExplainerDescriptor)
      }
    }
    current = current.parentElement
  }

  return null
}

function ExplanationPanelContent({ descriptor }: { descriptor: ExplainerDescriptor; history: ExplainerDescriptor[] }) {
  const hasQuestionChoices = (descriptor.questions?.length ?? 0) > 0
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)

  useEffect(() => {
    setSelectedQuestionIndex(0)
  }, [descriptor.id, descriptor.title])

  const selectedQuestion = hasQuestionChoices ? descriptor.questions?.[selectedQuestionIndex] : null
  const explanationText = selectedQuestion?.explanation ?? descriptor.explanation ?? ""
  const paragraphs = explanationText
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
          {hasQuestionChoices ? (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">Pick a question</p>
              <div className="grid gap-2">
                {descriptor.questions?.map((item, index) => {
                  const isActive = index === selectedQuestionIndex
                  return (
                    <button
                      key={`${descriptor.id ?? descriptor.title}-question-${index}`}
                      type="button"
                      onClick={() => setSelectedQuestionIndex(index)}
                      className={[
                        "rounded-lg border px-3 py-2 text-left text-xs leading-relaxed transition-colors",
                        isActive
                          ? "border-brand-indigo/40 bg-brand-indigo/10 text-foreground"
                          : "border-border bg-background/70 text-muted-foreground hover:border-brand-orange/40 hover:text-foreground",
                      ].join(" ")}
                    >
                      {item.question}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}
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
    const descriptorSignature = descriptor
      ? `${descriptor.id ? descriptor.id : descriptor.type}:${descriptor.title}:${(descriptor.explanation ?? "").slice(0, 80)}`
      : ""
    if (descriptor && descriptorSignature !== lastDescriptorRef.current) {
      lastDescriptorRef.current = descriptorSignature
      setSelectedDescriptor(descriptor)
      setSelectionHistory((previous) => {
        const nextHistory = previous.filter((item) => {
          const previousKey = `${item.id ? item.id : item.type}:${item.title}`
          const descriptorKey = `${descriptor.id ? descriptor.id : descriptor.type}:${descriptor.title}`
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
