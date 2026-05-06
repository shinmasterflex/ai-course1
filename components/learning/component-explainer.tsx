"use client"

import { useState, type MouseEvent, type ReactNode } from "react"
import { Blocks, Clock3, Layers3, MousePointerClick, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getComponentExplanation } from "@/lib/component-explanations"

export type ExplainerDescriptor = {
  type: string
  title: string
  explanation: string
}

const DEFAULT_DESCRIPTOR: ExplainerDescriptor = {
  type: "Learning support",
  title: "Explanation Panel",
  explanation: `This panel provides deeper educational context about concepts in your course modules. Click on any interactive component—a quiz question, a matching exercise, a concept explanation, a progress indicator—and this panel will expand on that topic with additional explanation and context.

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

function expandText(value: string | null | undefined) {
  if (!value) {
    return ""
  }
  return value.replace(/\s+/g, " ").trim()
}

export function getExplainerAttributes(descriptor: ExplainerDescriptor) {
  const normalizedDescriptor: ExplainerDescriptor = {
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
    return {
      type: "Learning block",
      title: label || "Key material",
      explanation: `This section packages important concepts into digestible units. The structure isn't arbitrary—it's designed around how your brain learns best.

When information is grouped into meaningful chunks, your brain can hold multiple pieces together in working memory. Contrast this with walls of undifferentiated text: your brain has to work harder to find the pattern, and much is lost. Here, the grouping helps you see the forest and the trees simultaneously.

As you read this section, look for the underlying pattern. What's the main idea? How do the details support it? This active pattern-seeking strengthens your mental model far more than passive consumption.`,
    } satisfies ExplainerDescriptor
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
        return {
          type: customExplanation.id.substring(0, customExplanation.id.indexOf("-", 2)), // Extract module prefix
          title: customExplanation.title,
          explanation: customExplanation.explanation,
        } satisfies ExplainerDescriptor
      }
    }
    current = current.parentElement
  }

  // Fall back to explicit descriptors
  current = target
  while (current) {
    const explicitDescriptor = parseDescriptor(current.getAttribute("data-explainer"))
    if (explicitDescriptor) {
      return explicitDescriptor
    }
    current = current.parentElement
  }

  // Finally, fall back to inferred descriptors based on element type
  current = target
  while (current) {
    const fallbackDescriptor = buildFallbackDescriptor(current)
    if (fallbackDescriptor) {
      return fallbackDescriptor
    }
    current = current.parentElement
  }

  return null
}

function ExplanationPanelContent({ descriptor }: { descriptor: ExplainerDescriptor; history: ExplainerDescriptor[] }) {
  return (
    <Card className="h-full overflow-hidden border-brand-indigo/20 bg-white/95 shadow-xl backdrop-blur">
      <div className="flex h-full flex-col gap-5 p-6 overflow-y-auto">
        <div className="space-y-4 pb-4 border-b border-border">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
            <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
            Explanation Panel
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/80">{descriptor.type}</p>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          {descriptor.explanation.split("\n\n").map((paragraph, index) => (
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

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null

    if (!target || target.closest('[data-explainer-panel="true"]')) {
      return
    }

    const descriptor = resolveDescriptor(target)
    if (descriptor) {
      setSelectedDescriptor(descriptor)
      setSelectionHistory((previous) => {
        const nextHistory = previous.filter((item) => !(item.type === descriptor.type && item.title === descriptor.title))
        return [descriptor, ...nextHistory].slice(0, 4)
      })
    }
  }

  return (
    <div className="xl:pr-[23.5rem]" onClickCapture={handleClickCapture}>
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