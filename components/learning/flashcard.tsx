/**
 * FLASHCARD COMPONENT
 * Interactive flip cards for memorization and concept learning
 * Click to flip between front and back
 */

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlashcardData {
  id: string
  front: string
  back: string
}

interface FlashcardProps {
  cards: FlashcardData[]
}

export function Flashcard({ cards }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = cards[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div className="space-y-4">
      {/* Card Counter */}
      <div className="text-center text-sm text-muted-foreground">
        Card {currentIndex + 1} of {cards.length}
      </div>

      {/* Flashcard */}
      <div className="perspective-1000">
        <Card
          onClick={handleFlip}
          className={cn(
            "relative h-64 cursor-pointer transition-transform duration-500 transform-style-3d",
            isFlipped && "rotate-y-180",
          )}
        >
          {/* Front of card */}
          <div
            className={cn(
              "absolute inset-0 p-8 flex items-center justify-center backface-hidden",
              "bg-gradient-to-br from-primary/10 to-primary/5",
            )}
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Front</p>
              <p className="text-xl font-semibold text-balance">{currentCard.front}</p>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={cn(
              "absolute inset-0 p-8 flex items-center justify-center backface-hidden rotate-y-180",
              "bg-gradient-to-br from-accent/10 to-accent/5",
            )}
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Back</p>
              <p className="text-lg text-balance">{currentCard.back}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <RotateCw className="h-4 w-4" />
        Click card to flip
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button onClick={handlePrevious} variant="outline" size="icon" disabled={cards.length <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button onClick={handleNext} variant="outline" size="icon" disabled={cards.length <= 1}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
