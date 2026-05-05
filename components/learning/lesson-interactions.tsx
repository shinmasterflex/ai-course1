"use client"

import { useState } from "react"
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
  accentClassName?: string
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
                <div className="mt-4 text-xs font-medium text-brand-green">Hover to flip</div>
              </Card>

              <Card
                className={cn(
                  "absolute inset-0 h-full p-5 backface-hidden rotate-y-180",
                  "border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 to-white"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">Answer</p>
                <p className="mt-3 text-sm text-foreground">{card.answer}</p>
                <div className="mt-4 text-xs font-medium text-muted-foreground">Move away to flip back</div>
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

            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => setSelectedLeftId(pair.id)}
                className={cn(
                  "w-full rounded-lg border px-3 py-2 text-left text-sm text-foreground transition-all",
                  "hover:-translate-y-0.5 hover:shadow-sm",
                  isMatched && "border-green-600 bg-green-50 text-green-900",
                  !isMatched && isSelected && "border-brand-orange bg-brand-orange/10",
                  !isMatched && !isSelected && "bg-white"
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
                  !isMatched && "bg-white"
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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("text-sm", isCorrect ? "text-green-700" : "text-muted-foreground")}>
          {isCorrect ? "Nice. You built the correct sequence." : "Move cards up/down to build the right order."}
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

  const handleDrop = (targetItem: string) => {
    if (!draggedItem || draggedItem === targetItem) {
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
  }

  const isCorrect = currentOrder.every((item, idx) => item === correctOrder[idx])

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
            draggable
            onDragStart={() => setDraggedItem(item)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              handleDrop(item)
              setDraggedItem(null)
            }}
            onDragEnd={() => setDraggedItem(null)}
            className={cn(
              "flex cursor-grab items-center gap-3 rounded-lg border bg-white p-3 text-sm transition-all",
              "hover:-translate-y-0.5 hover:shadow-sm active:cursor-grabbing",
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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("text-sm", isCorrect ? "text-green-700" : "text-muted-foreground")}>
          {isCorrect ? "Perfect order. Nice move." : "Drag rows to reorder the flow."}
        </p>
        <Button type="button" variant="ghost" size="sm" className="gap-1" onClick={() => setCurrentOrder(items)}>
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      </div>
    </Card>
  )
}

export function QuickCheckCard({
  prompt,
  options,
  correctOptionId,
  explanation,
  accentClassName,
}: QuickCheckProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const isAnswered = selectedOptionId !== null
  const isCorrect = selectedOptionId === correctOptionId

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
        {options.map((option) => {
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
              onClick={() => setSelectedOptionId(option.id)}
            >
              {option.label}
            </Button>
          )
        })}
      </div>

      {isAnswered ? (
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className={cn("text-sm", isCorrect ? "text-green-700" : "text-brand-orange")}>{explanation}</p>
          <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedOptionId(null)} className="gap-1">
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      ) : null}
    </Card>
  )
}
