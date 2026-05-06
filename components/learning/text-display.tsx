/**
 * TEXT DISPLAY COMPONENT
 * Renders formatted text content with different variants
 * Supports both string content and React children
 */

"use client"

import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, CheckIcon, Info, XCircle } from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"

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

function pickInferentialStatement(sourceText: string) {
  const normalized = sourceText.toLowerCase()

  const inferredBanks: Array<{ keywords: string[]; statements: string[] }> = [
    {
      keywords: ["module 0", "history", "not new", "1950", "foundations"],
      statements: [
        "Because AI predates modern chatbots, today's progress is mostly acceleration of long-running research, not invention from zero.",
        "Seeing AI as a decades-long field helps explain why core ideas persist even when interfaces change quickly.",
        "If AI seems sudden, the better explanation is infrastructure maturity, not a lack of earlier theoretical work.",
      ],
    },
    {
      keywords: ["module 1", "ml", "machine learning", "training", "data"],
      statements: [
        "In machine learning, better labels and data coverage often improve outcomes more reliably than swapping to a larger model.",
        "If a model fails on edge cases, that usually signals a data distribution gap rather than a purely algorithmic bug.",
        "Model quality is constrained by what the training data represents, not just by compute scale.",
      ],
    },
    {
      keywords: ["module 2", "llm", "language model", "token", "context window"],
      statements: [
        "When context windows are limited, prioritizing relevant context is a stronger tactic than adding more generic instructions.",
        "LLM reliability is often a retrieval and framing problem, not only a raw capability problem.",
        "Token limits force trade-offs, so concise structure can outperform exhaustive but noisy prompts.",
      ],
    },
    {
      keywords: ["module 3", "prompt", "constraints", "format", "role"],
      statements: [
        "Prompt quality is mostly a specification problem: clearer constraints reduce variance more than extra stylistic language.",
        "If outputs fluctuate, tightening task boundaries usually helps more than repeating the same request louder.",
        "Strong prompting behaves like interface design: ambiguity in inputs becomes inconsistency in outputs.",
      ],
    },
    {
      keywords: ["module 4", "tool", "tooling", "workflow", "no-code", "automation"],
      statements: [
        "Tool choice should follow failure tolerance and handoff needs, not trend cycles.",
        "A simpler workflow with explicit checkpoints often outperforms a complex one that hides state transitions.",
        "No-code systems become robust when they make assumptions visible and testable at each step.",
      ],
    },
    {
      keywords: ["module 5", "variables", "conditionals", "loops", "functions", "debug"],
      statements: [
        "Automation becomes dependable when each step has clear inputs and outputs, so debugging can isolate where expectation and reality diverge.",
        "In beginner automation, naming and structure errors often cause more failures than syntax itself.",
        "If logic branches are unclear, adding more code usually increases fragility instead of fixing behavior.",
      ],
    },
    {
      keywords: ["module 6", "ethics", "bias", "privacy", "risk", "safeguard"],
      statements: [
        "When bias is systemic, improving average accuracy alone does not guarantee fair outcomes across groups.",
        "If users cannot see what data is retained, consent quality drops even when legal terms are accepted.",
        "In AI ethics, the key question is often who bears downside risk when the model is wrong at scale.",
      ],
    },
    {
      keywords: ["module 7", "productivity", "workflow", "assistant", "execution"],
      statements: [
        "AI productivity gains compound when teams standardize reusable workflows, not when individuals rely on ad hoc prompts.",
        "The fastest path to practical value is usually reducing repeatable friction, not maximizing novelty per task.",
        "Consistent execution frameworks matter more than isolated clever outputs.",
      ],
    },
    {
      keywords: ["module 8", "agent", "goal-driven", "loop", "guardrails", "stopping condition"],
      statements: [
        "If a system can plan, use tools, and continue until a stopping condition, its edge is persistent execution rather than one-shot answers.",
        "In loop-based agent workflows, feedback is the control signal that keeps actions aligned with goals.",
        "Starting with a narrow, reversible agent often improves adoption because reliability can be validated before scaling.",
      ],
    },
    {
      keywords: ["module 9", "explain", "tool choice", "framework", "responsible use"],
      statements: [
        "Explaining AI clearly to non-experts is a practical test of understanding, not merely a communication add-on.",
        "Responsible use improves when teams pair output usefulness checks with explicit risk checks.",
        "Framework-based prompting tends to outperform intuition-only prompting in repeatable business contexts.",
      ],
    },
    {
      keywords: ["module 10", "frontier", "agi", "governance", "career", "future"],
      statements: [
        "Tracking frontier AI is most useful when converted into near-term capability bets rather than abstract speculation.",
        "In uncertain AGI timelines, robust strategy favors optionality and review loops over single irreversible bets.",
        "Career resilience in AI often comes from combining domain depth with applied fluency, not chasing every new model release.",
      ],
    },
  ]

  for (const bank of inferredBanks) {
    const matches = bank.keywords.filter((keyword) => normalized.includes(keyword)).length
    if (matches >= 2) {
      const index = hashString(sourceText) % bank.statements.length
      return bank.statements[index]
    }
  }

  const fallbackStatements = [
    "A strong practical implication is that method matters as much as tool choice: clearer structure usually produces more reliable outcomes than chasing novelty.",
    "When outcomes feel inconsistent, making assumptions explicit usually improves quality faster than adding more complexity.",
    "In applied AI, repeatable process design tends to create more value than isolated one-off wins.",
  ]

  return fallbackStatements[hashString(sourceText) % fallbackStatements.length]
}

function getTrueFalseStatement(title?: string, content?: string) {
  const source = content?.split("\n").find((line) => line.trim().length > 0)?.trim() || title || "AI systems require human judgment"
  const statement = toSentence(pickInferentialStatement(`${title ?? ""} ${source}`))

  return {
    statement,
    isTrue: true,
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

  const statementData = getTrueFalseStatement(title, content)
  const dragPayload = statementData.statement
  const isCorrectDrop = dropTarget === null ? null : (dropTarget === "true") === statementData.isTrue

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

            {isCorrectDrop ? (
              <p className="flex items-center gap-1 text-sm font-medium text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Corrected. You matched the statement to the right True/False target.
              </p>
            ) : null}

            {isCorrectDrop === false ? (
              <p className="flex items-center gap-1 text-sm font-medium text-red-700">
                <XCircle className="h-4 w-4" />
                Wrong drop. Try moving it to the correct answer.
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
