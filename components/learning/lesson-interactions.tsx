"use client"

import { useState } from "react"
import { CheckCircle2, HelpCircle, RotateCcw } from "lucide-react"
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

export function FlipCardGrid({ cards }: FlipCardGridProps) {
  const [openCard, setOpenCard] = useState<string | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {cards.map((card) => {
        const isOpen = openCard === card.title

        return (
          <button
            key={card.title}
            type="button"
            onClick={() => setOpenCard(isOpen ? null : card.title)}
            className="text-left"
          >
            <Card className={cn(
              "h-full min-h-40 p-5 transition-colors",
              isOpen ? "border-brand-orange bg-brand-orange/5" : "hover:border-brand-green/30 hover:bg-brand-green/5"
            )}>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">{card.title}</p>
              <p className="mt-3 text-sm font-medium text-foreground">{card.prompt}</p>
              <div className="mt-4 text-sm text-muted-foreground">
                {isOpen ? card.answer : "Click to reveal"}
              </div>
            </Card>
          </button>
        )
      })}
    </div>
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
                "h-auto justify-start whitespace-normal px-4 py-3 text-left",
                isAnswered && isRightAnswer && "border-green-600 bg-green-50 text-green-900 hover:bg-green-50",
                isAnswered && isSelected && !isRightAnswer && "border-red-500 bg-red-50 text-red-900 hover:bg-red-50"
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
