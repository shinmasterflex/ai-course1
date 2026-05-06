/**
 * TEXT DISPLAY COMPONENT
 * Renders formatted text content with different variants
 * Supports both string content and React children
 */

"use client"

import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, Sparkles, Target, Trophy } from "lucide-react"
import type { ReactNode } from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

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

function getChallengePrompt(title?: string, content?: string) {
  if (title) {
    return `In one sentence, explain: ${title}`
  }

  if (content) {
    const firstSentence = content.split(/[.!?]/)[0]?.trim()
    if (firstSentence) {
      return `Rewrite this idea in your own words: ${firstSentence}`
    }
  }

  return "Write one practical takeaway from this lesson block."
}

export function TextDisplay({
  title,
  subtitle,
  content,
  children,
  variant = "default",
  interactive = true,
  xpReward = 10,
  className,
}: TextDisplayProps) {
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
  const [challengeAnswer, setChallengeAnswer] = useState("")
  const [challengeSubmitted, setChallengeSubmitted] = useState(false)
  const [masteryState, setMasteryState] = useState<"review" | "mastered" | null>(null)

  const totalXp = useMemo(() => {
    let points = 0
    if (challengeSubmitted) {
      points += xpReward
    }
    if (masteryState === "mastered") {
      points += 5
    }
    return points
  }, [challengeSubmitted, masteryState, xpReward])

  const challengePrompt = useMemo(() => getChallengePrompt(title, content), [title, content])
  const hasPassedChallenge = challengeAnswer.trim().length >= 20

  return (
    <div className={cn("p-6 rounded-lg", variantStyles[variant], className)}>
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
              <Sparkles className="h-4 w-4" />
              Interaction Checkpoint
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-2 py-1 text-xs font-semibold text-brand-green">
              <Trophy className="h-3 w-3" />
              XP: {totalXp}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Target className="h-3.5 w-3.5" />
                Mini challenge
              </p>
              <p className="text-sm text-foreground">{challengePrompt}</p>
              <textarea
                value={challengeAnswer}
                onChange={(event) => {
                  setChallengeAnswer(event.target.value)
                  if (challengeSubmitted) {
                    setChallengeSubmitted(false)
                  }
                }}
                className="mt-2 min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Write your answer here..."
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">Tip: 20+ characters unlock the XP bonus.</p>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setChallengeSubmitted(hasPassedChallenge)}
                  disabled={!hasPassedChallenge}
                >
                  Claim +{xpReward} XP
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button type="button" size="sm" variant="outline" onClick={() => setMasteryState("review")}>
                I need a review
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setMasteryState("mastered")}>
                I mastered this (+5 XP)
              </Button>
              {masteryState === "mastered" ? (
                <span className="text-xs font-medium text-green-700">Checkpoint complete.</span>
              ) : null}
              {masteryState === "review" ? (
                <span className="text-xs font-medium text-brand-orange">Marked for review.</span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
