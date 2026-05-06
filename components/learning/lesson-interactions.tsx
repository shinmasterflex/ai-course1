"use client"

import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp, CheckCircle2, HelpCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type FlipCardItem = {
  title: string
  prompt: string
  answer: string
}

type QuickCheckOption = {
  id: string
  label: string
}

type QuickCheckProps = {
  prompt: string
  options: QuickCheckOption[]
  correctOptionId: string
  explanation: string
  optionExplanations?: Record<string, string>
  accentClassName?: string
  onAnswered?: (isCorrect: boolean) => void
}

type FlipCardGridProps = {
  cards: FlipCardItem[]
}

type MatchingPair = {
  id?: string
  left: string
  right: string
}

type MatchingChallengeProps = {
  title?: string
  description?: string
  pairs: MatchingPair[]
  accentClassName?: string
  leftLabel?: string
  rightLabel?: string
}

type OrderingChallengeProps = {
  title?: string
  description?: string
  items: string[]
  correctOrder: string[]
}

type DragSortChallengeProps = {
  title?: string
  description?: string
  items: string[]
  correctOrder: string[]
  accentClassName?: string
}

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

function createSeededRandom(seed: number) {
  let current = seed || 1

  return () => {
    current = (current * 1664525 + 1013904223) >>> 0
    return current / 4294967296
  }
}

function shuffleOptions(options: QuickCheckOption[], seedSource: string) {
  const shuffled = [...options]
  const random = createSeededRandom(hashString(seedSource))

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(random() * (index + 1))
    const temp = shuffled[index]
    shuffled[index] = shuffled[nextIndex]
    shuffled[nextIndex] = temp
  }

  return shuffled
}

export function FlipCardGrid({ cards }: FlipCardGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {cards.map((card) => {
        const isOpen = hoveredCard === card.title

        return (
          <div
            key={card.title}
            onMouseEnter={() => setHoveredCard(card.title)}
            onMouseLeave={() => setHoveredCard(null)}
            className="text-left perspective-1000 cursor-default"
          >
            <div
              className={cn(
                "relative min-h-44 w-full transform-style-3d transition-transform duration-500",
                isOpen && "rotate-y-180"
              )}
            >
              <Card
                className={cn(
                  "absolute inset-0 h-full p-5 backface-hidden",
                  "border-brand-green/30 bg-gradient-to-br from-white to-brand-green/5",
                  !isOpen && "hover:border-brand-green/40"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">{card.title}</p>
                <p className="mt-3 text-sm font-medium text-foreground">{card.prompt}</p>
              </Card>

              <Card
                className={cn(
                  "absolute inset-0 h-full p-5 backface-hidden rotate-y-180",
                  "border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 to-white"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">Answer</p>
                <p className="mt-3 text-sm text-foreground">{card.answer}</p>
              </Card>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function MatchingChallenge({ title = "Matching Challenge", description, pairs, accentClassName, leftLabel = "Terms", rightLabel = "Matches" }: MatchingChallengeProps) {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [attempts, setAttempts] = useState(0)
  const [lastIncorrectAttempt, setLastIncorrectAttempt] = useState<{ leftId: string; rightId: string } | null>(null)

  const normalizedPairs = pairs.map((p, i) => ({ ...p, id: p.id ?? String(i) }))
  const rightItems = [...normalizedPairs].sort((a, b) => a.right.localeCompare(b.right))
  const reverseMatches = Object.fromEntries(
    Object.entries(matches).map(([leftId, rightId]) => [rightId, leftId])
  )
  const matchedCount = Object.keys(matches).length
  const isComplete = matchedCount === normalizedPairs.length

  const tryMatch = (rightId: string) => {
    if (!selectedLeftId) {
      return
    }

    setAttempts((prev) => prev + 1)

    if (selectedLeftId === rightId) {
      setMatches((prev) => ({ ...prev, [selectedLeftId]: rightId }))
      setLastIncorrectAttempt(null)
    } else {
      setLastIncorrectAttempt({ leftId: selectedLeftId, rightId })
    }

    setSelectedLeftId(null)
  }

  return (
    <Card className={cn("p-5 border-brand-green/20 bg-gradient-to-br from-brand-green/5 to-brand-orange/5", accentClassName)}>
      <div className="mb-4">
        <h3 className="font-semibold text-brand-green">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">{leftLabel}</p>
          {normalizedPairs.map((pair) => {
            const isMatched = Boolean(matches[pair.id])
            const isSelected = selectedLeftId === pair.id
            const isWrong = lastIncorrectAttempt?.leftId === pair.id

            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => {
                  setSelectedLeftId(pair.id)
                  setLastIncorrectAttempt(null)
                }}
                className={cn(
                  "w-full rounded-lg border px-3 py-2 text-left text-sm text-foreground transition-all",
                  "hover:-translate-y-0.5 hover:shadow-sm",
                  isMatched && "border-green-600 bg-green-50 text-green-900",
                  !isMatched && isWrong && "border-red-500 bg-red-50 text-red-900",
                  !isMatched && !isWrong && isSelected && "border-brand-orange bg-brand-orange/10",
                  !isMatched && !isWrong && !isSelected && "bg-white"
                )}
              >
                {pair.left}
              </button>
            )
          })}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">{rightLabel}</p>
          {rightItems.map((pair) => {
            const matchedLeftId = reverseMatches[pair.id]
            const isMatched = Boolean(matchedLeftId)
            const isWrong = lastIncorrectAttempt?.rightId === pair.id

            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => tryMatch(pair.id)}
                className={cn(
                  "w-full rounded-lg border px-3 py-2 text-left text-sm text-foreground transition-all",
                  "hover:-translate-y-0.5 hover:shadow-sm",
                  isMatched && "border-green-600 bg-green-50 text-green-900",
                  !isMatched && isWrong && "border-red-500 bg-red-50 text-red-900",
                  !isMatched && !isWrong && "bg-white"
                )}
              >
                {pair.right}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Progress: {matchedCount}/{pairs.length} matches. Attempts: {attempts}
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() => {
            setSelectedLeftId(null)
            setMatches({})
            setAttempts(0)
            setLastIncorrectAttempt(null)
          }}
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      </div>

      {isComplete ? (
        <p className="mt-3 text-sm font-medium text-green-700">Perfect run. You matched every pair.</p>
      ) : null}
    </Card>
  )
}

export function OrderingChallenge({
  title = "Order the Steps",
  description,
  items,
  correctOrder,
}: OrderingChallengeProps) {
  const [currentOrder, setCurrentOrder] = useState(items)

  const moveItem = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= currentOrder.length) {
      return
    }

    setCurrentOrder((prev) => {
      const copy = [...prev]
      const temp = copy[index]
      copy[index] = copy[nextIndex]
      copy[nextIndex] = temp
      return copy
    })
  }

  const isCorrect = currentOrder.every((item, idx) => item === correctOrder[idx])

  return (
    <Card className="p-5 border-brand-orange/20 bg-gradient-to-br from-brand-orange/5 to-white">
      <div className="mb-4">
        <h3 className="font-semibold text-brand-orange">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>

      <div className="space-y-2">
        {currentOrder.map((item, index) => (
          <div key={item} className="flex items-center gap-2 rounded-lg border bg-white p-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green/10 text-xs font-semibold text-brand-green">
              {index + 1}
            </span>
            <p className="flex-1 text-sm">{item}</p>
            <div className="flex gap-1">
              <Button type="button" size="icon-sm" variant="outline" onClick={() => moveItem(index, -1)} disabled={index === 0}>
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                onClick={() => moveItem(index, 1)}
                disabled={index === currentOrder.length - 1}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isCorrect && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-50 px-4 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-800">Correct order!</p>
            <p className="text-sm text-green-700">You built the right sequence. That's the full machine-learning loop.</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {isCorrect ? "" : "Move cards up/down to build the right order."}
        </p>
        <Button type="button" variant="ghost" size="sm" className="gap-1" onClick={() => setCurrentOrder(items)}>
          <RotateCcw className="h-3 w-3" />
          Shuffle Back
        </Button>
      </div>
    </Card>
  )
}

export function DragSortChallenge({
  title = "Drag to Arrange",
  description,
  items,
  correctOrder,
  accentClassName,
}: DragSortChallengeProps) {
  const [currentOrder, setCurrentOrder] = useState(items)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [hasCheckedOrder, setHasCheckedOrder] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleDrop = (targetItem: string) => {
    if (isDone || !draggedItem || draggedItem === targetItem) {
      return
    }

    setCurrentOrder((prev) => {
      const draggedIndex = prev.indexOf(draggedItem)
      const targetIndex = prev.indexOf(targetItem)
      if (draggedIndex < 0 || targetIndex < 0) {
        return prev
      }

      const copy = [...prev]
      copy.splice(draggedIndex, 1)
      copy.splice(targetIndex, 0, draggedItem)
      return copy
    })

    // Re-ordering means the user should re-check the answer state.
    setHasCheckedOrder(false)
  }

  const isCorrect = currentOrder.every((item, idx) => item === correctOrder[idx])

  const handleCheckOrder = () => {
    setHasCheckedOrder(true)
    if (isCorrect) {
      setIsDone(true)
    }
  }

  return (
    <Card className={cn("p-5 border-brand-green/20 bg-gradient-to-br from-brand-green/5 to-white", accentClassName)}>
      <div className="mb-4">
        <h3 className="font-semibold text-brand-green">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>

      <div className="space-y-2">
        {currentOrder.map((item, index) => (
          <div
            key={item}
            draggable={!isDone}
            onDragStart={() => {
              if (!isDone) {
                setDraggedItem(item)
              }
            }}
            onDragOver={(event) => {
              if (!isDone) {
                event.preventDefault()
              }
            }}
            onDrop={() => {
              handleDrop(item)
              setDraggedItem(null)
            }}
            onDragEnd={() => setDraggedItem(null)}
            className={cn(
              "flex cursor-grab items-center gap-3 rounded-lg border bg-white p-3 text-sm transition-all",
              "hover:-translate-y-0.5 hover:shadow-sm active:cursor-grabbing",
              isDone && "cursor-default hover:translate-y-0 hover:shadow-none",
              draggedItem === item && "border-brand-orange bg-brand-orange/10"
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-semibold text-brand-orange">
              {index + 1}
            </span>
            <span className="flex-1">{item}</span>
            <span className="text-xs text-muted-foreground">Drag</span>
          </div>
        ))}
      </div>

      {hasCheckedOrder && !isCorrect ? (
        <p className="mt-4 text-sm font-medium text-brand-orange">Not quite yet. Reorder the steps and check again.</p>
      ) : null}

      {isDone ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-50 px-4 py-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-800">Correct order!</p>
            <p className="text-sm text-green-700">Challenge complete. This sequence is correct.</p>
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("text-sm", isDone ? "text-green-700" : "text-muted-foreground")}>
          {isDone ? "Done. Reset to try again." : "Drag rows to reorder the flow, then check your order."}
        </p>
        <div className="flex items-center gap-2">
          <Button type="button" size="sm" onClick={handleCheckOrder} disabled={isDone}>
            {isDone ? "Done" : "Check order"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => {
              setCurrentOrder(items)
              setHasCheckedOrder(false)
              setIsDone(false)
            }}
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function QuickCheckCard({
  prompt,
  options,
  correctOptionId,
  explanation,
  optionExplanations,
  accentClassName,
  onAnswered,
}: QuickCheckProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const shuffledOptions = useMemo(
    () => shuffleOptions(options, `${prompt}:${options.map((option) => `${option.id}:${option.label}`).join("|")}`),
    [options, prompt]
  )
  const isAnswered = selectedOptionId !== null
  const isCorrect = selectedOptionId === correctOptionId
  const selectedOption = options.find((option) => option.id === selectedOptionId)
  const correctOption = options.find((option) => option.id === correctOptionId)

  const feedbackText = useMemo(() => {
    if (!selectedOptionId) {
      return ""
    }

    const optionSpecificFeedback = optionExplanations?.[selectedOptionId]

    if (optionSpecificFeedback) {
      return optionSpecificFeedback
    }

    if (isCorrect) {
      return explanation
    }

    const explanationWithoutPrefix = explanation.replace(/^Correct\.\s*/i, "")
    const pickedAnswerText = selectedOption?.label ?? "your selected option"
    const bestAnswerText = correctOption?.label ?? "the highlighted option"

    return `Not quite. You selected: ${pickedAnswerText}. The best answer is: ${bestAnswerText}. ${explanationWithoutPrefix}`
  }, [correctOption?.label, explanation, isCorrect, optionExplanations, selectedOption?.label, selectedOptionId])

  return (
    <Card className={cn("p-5 border-brand-green/20 bg-brand-green/5", accentClassName)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold mb-3 text-brand-green">Check your understanding</h3>
          <p className="text-sm text-foreground">{prompt}</p>
        </div>
        {isAnswered ? (
          <CheckCircle2 className={cn("h-5 w-5 flex-shrink-0", isCorrect ? "text-green-600" : "text-brand-orange")} />
        ) : (
          <HelpCircle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        )}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {shuffledOptions.map((option) => {
          const isSelected = selectedOptionId === option.id
          const isRightAnswer = option.id === correctOptionId

          return (
            <Button
              key={option.id}
              type="button"
              variant="outline"
              className={cn(
                "h-auto justify-start whitespace-normal px-4 py-3 text-left text-foreground hover:bg-muted hover:text-foreground",
                isAnswered && isRightAnswer && "border-green-600 bg-green-50 text-green-900 hover:bg-green-50 hover:text-green-900",
                isAnswered && isSelected && !isRightAnswer && "border-red-500 bg-red-50 text-red-900 hover:bg-red-50 hover:text-red-900"
              )}
              onClick={() => {
                setSelectedOptionId(option.id)
                onAnswered?.(isRightAnswer)
              }}
            >
              {option.label}
            </Button>
          )
        })}
      </div>

      {isAnswered ? (
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className={cn("text-sm", isCorrect ? "text-green-700" : "text-brand-orange")}>{feedbackText}</p>
          <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedOptionId(null)} className="gap-1">
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      ) : null}
    </Card>
  )
}
