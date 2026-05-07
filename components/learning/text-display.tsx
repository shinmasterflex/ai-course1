/**
 * TEXT DISPLAY COMPONENT
 * Renders formatted text content with different variants
 * Supports both string content and React children
 */

"use client"

import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { getTextDisplayInstructionalBriefParagraphs, getTextDisplayTrueFalseStatement } from "@/lib/component-explanations"
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
  const statementData = useMemo(() => getTextDisplayTrueFalseStatement(title, content, scopeKey, instanceId), [content, instanceId, scopeKey, title])
  const dragPayload = statementData.statement
  const isCorrectDrop = dropTarget === null ? null : (dropTarget === "true") === statementData.isTrue
  const instructionalBriefParagraphs = useMemo(() => getTextDisplayInstructionalBriefParagraphs(scopeKey, title, content), [content, scopeKey, title])
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
                {instructionalBriefParagraphs.map((paragraph, index) => (
                  <p key={`instructional-brief-${index}`}>{paragraph}</p>
                ))}
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
