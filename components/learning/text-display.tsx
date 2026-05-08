/**
 * TEXT DISPLAY COMPONENT
 * Renders formatted text content with different variants
 * Supports both string content and React children
 */

"use client"

import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { getSectionCourseContentEntry } from "@/lib/course-content"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import { useMemo } from "react"

interface TextDisplayProps {
  title?: string
  subtitle?: string
  content?: string
  children?: ReactNode
  variant?: "default" | "callout" | "warning" | "success" | "info"
  interactive?: boolean
  xpReward?: number
  className?: string
  scopeKey?: string
}

function parseBoldText(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const regex = /\*\*(.*?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>)
    lastIndex = regex.lastIndex
  }

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

  return ""
}

function buildTextDisplayExplanation(content: string | undefined, subtitle: string | undefined, interactive: boolean) {
  const sentences = extractSentences(content)
  const leadSentence = sentences[0] ? sentences[0] : subtitle?.trim()
  const supportSentence = sentences[1]

  if (!leadSentence || !supportSentence) {
    return ""
  }

  return `${toSentence(leadSentence)} ${toSentence(supportSentence)}

As you read, look for the decision rule inside the passage. Ask what pattern, limitation, tradeoff, or workflow principle the text is naming, and how that idea would change a real task such as prompting, checking an output, choosing a tool, or spotting risk.

Before moving on, restate the point in your own words and test it against one concrete AI example. ${interactive ? "Use the follow-up question as retrieval practice: answer from memory first, then compare your answer to the text and revise what was missing." : "Use the surrounding exercises to see whether the idea changes how you would act in a real workflow rather than leaving it as a passive definition."}`
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

export function TextDisplay({
  title,
  subtitle,
  content,
  children,
  variant = "default",
  interactive = true,
  className,
  scopeKey,
}: TextDisplayProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const icons = {
    callout: <Info className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
  }

  const variantStyles = {
    default: "bg-card text-card-foreground",
    callout: "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500",
    info: "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500",
    warning: "bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100 border-l-4 border-yellow-500",
    success: "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 border-l-4 border-green-500",
  }

  const hasChildren = children !== undefined
  const hasContent = content !== undefined

  const sectionId = searchParams?.get("section")
  const safePath = pathname ? pathname : ""
  const safeSectionId = sectionId ? sectionId : ""
  const resolvedScopeKey = scopeKey ?? `${safePath}::${safeSectionId}`
  const resolvedModuleId = getModuleIdFromScope(resolvedScopeKey)
  const resolvedSectionId = getSectionIdFromScope(resolvedScopeKey)
  const sectionEntry = useMemo(
    () => (resolvedModuleId && resolvedSectionId ? getSectionCourseContentEntry(resolvedModuleId, resolvedSectionId) : undefined),
    [resolvedModuleId, resolvedSectionId],
  )

  const explainerTitle = deriveTextDisplayTitle(title, subtitle, content)
  const registryExplanation = sectionEntry?.explanation?.trim()
  const explainerAttributes = getExplainerAttributes(
    sectionEntry && registryExplanation
      ? {
          id: sectionEntry.id,
          type: variant === "default" ? "Concept explanation" : `${variant} emphasizer`,
          title: title?.trim() || subtitle?.trim() || sectionEntry.question?.trim() || explainerTitle,
          explanation: registryExplanation,
        }
      : {
          type: variant === "default" ? "Concept explanation" : `${variant} emphasizer`,
          title: explainerTitle,
          explanation: buildTextDisplayExplanation(content, subtitle, interactive),
        },
  )

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
    </div>
  )
}
