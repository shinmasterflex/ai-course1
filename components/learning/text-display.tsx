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
        {
          statement: "AI research has been developing since the 1950s, long before today's popular chatbots.",
          explanation: "The course traces AI roots back decades. Current advances build on decades of theoretical and practical work.",
          isTrue: true,
        },
        {
          statement: "Recent AI tools like ChatGPT represent the first-ever attempt at creating intelligent machines.",
          explanation: "This is historically inaccurate. AI research goes back to the 1950s Dartmouth conference and beyond.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 1", "ml", "machine learning", "training", "data"],
      statements: [
        {
          statement: "Machine learning models learn patterns from training data rather than following only hand-written rules.",
          explanation: "This is the core distinction: ML adapts from examples, while traditional software follows explicit rules.",
          isTrue: true,
        },
        {
          statement: "The quality of a machine learning model depends mostly on how powerful the computer running it is.",
          explanation: "Model quality depends more on data quality and relevance than raw computing power.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 2", "llm", "language model", "token", "context window"],
      statements: [
        {
          statement: "LLMs predict the next token in a sequence based on previous tokens.",
          explanation: "Token prediction is the fundamental mechanism by which language models generate text.",
          isTrue: true,
        },
        {
          statement: "Language models understand meaning the same way humans do.",
          explanation: "Models recognize statistical patterns; they don't have human-like understanding or consciousness.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 3", "prompt", "constraints", "format", "role"],
      statements: [
        {
          statement: "Clear prompts with specific constraints produce more consistent outputs than vague requests.",
          explanation: "Specificity in prompts reduces ambiguity and helps the model generate more predictable, aligned responses.",
          isTrue: true,
        },
        {
          statement: "The length of your prompt has no effect on output quality.",
          explanation: "Prompt structure matters, but so does clarity. Longer prompts with bad structure don't help.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 4", "tool", "tooling", "workflow", "no-code", "automation"],
      statements: [
        {
          statement: "The right tool choice depends on your specific task and failure tolerance, not just what's trendy.",
          explanation: "Practical tool selection is based on your actual needs, not marketing hype or popularity.",
          isTrue: true,
        },
        {
          statement: "You should always choose the newest AI tool available for any task.",
          explanation: "Novelty doesn't equal fitness for your use case. Reliable, proven tools often outperform flashy new ones.",
          isTrue: false,
        },
      ],
    },
    {
      keywords: ["module 5", "variables", "conditionals", "loops", "functions", "debug"],
      statements: [
        {
          statement: "Clear variable names and structure make debugging easier because you can trace what data flows where.",
          explanation: "Good naming and organization let you isolate problems faster instead of guessing.",
          isTrue: true,
        },
        {
          statement: "More code always fixes broken automation logic.",
          explanation: "Adding more code without understanding the problem usually makes things worse, not better.",
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
      ],
    },
    {
      keywords: ["module 9", "explain", "tool choice", "framework", "responsible use"],
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

  const fallbackStatements: Array<{ statement: string; explanation: string; isTrue: boolean }> = [
    {
      statement: "Clear structure and explicit assumptions produce more reliable AI workflows than complex, hidden logic.",
      explanation: "Transparent, well-organized systems are easier to debug and maintain.",
      isTrue: true,
    },
    {
      statement: "The best way to improve an AI system is to add more features without testing each one.",
      explanation: "Incremental testing and validation are essential. Adding untested features creates risk.",
      isTrue: false,
    },
  ]

  return fallbackStatements[hashString(sourceText) % fallbackStatements.length]
}

function getTrueFalseStatement(title?: string, content?: string) {
  const source = content?.split("\n").find((line) => line.trim().length > 0)?.trim() || title || "AI systems require human judgment"
  const statementData = pickInferentialStatement(`${title ?? ""} ${source}`)

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
