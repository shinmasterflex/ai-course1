/**
 * FLASHCARD COMPONENT
 * Interactive flip cards for memorization and concept learning
 * Click to flip between front and back
 */

"use client"

import { useState, CSSProperties, useEffect } from "react"
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

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === " ") {
        e.preventDefault()
        handleFlip()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  // 3D flip animation styles using CSS transforms
  const flipContainerStyle: CSSProperties = {
    perspective: "1000px",
  }

  const flipCardStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 500ms ease-in-out",
  }

  const cardFaceStyle: CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  }

  const frontStyle: CSSProperties = {
    ...cardFaceStyle,
  }

  const backStyle: CSSProperties = {
    ...cardFaceStyle,
    transform: "rotateY(180deg)",
  }

  return (
    <div className="space-y-4">
      {/* Card Counter */}
      <div className="text-center text-sm text-muted-foreground">
        Card {currentIndex + 1} of {cards.length}
      </div>

      {/* Flashcard */}
      <div
        style={flipContainerStyle}
        className="h-64"
        role="article"
        aria-label={`Flashcard ${currentIndex + 1} of ${cards.length}`}
        aria-live="polite"
      >
        <div
          style={flipCardStyle}
          onClick={handleFlip}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleFlip()
            }
          }}
          tabIndex={0}
          role="button"
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-lg"
          aria-pressed={isFlipped}
          aria-label={isFlipped ? "Card is flipped, press Space to flip back" : "Card is not flipped, press Space to flip"}
        >
          {/* Front of card */}
          <Card
            style={frontStyle}
            className={cn(
              "p-8 bg-gradient-to-br from-primary/10 to-primary/5",
            )}
            aria-hidden={isFlipped}
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Front</p>
              <p className="text-xl font-semibold text-balance">{currentCard.front}</p>
            </div>
          </Card>

          {/* Back of card */}
          <Card
            style={backStyle}
            className={cn(
              "p-8 bg-gradient-to-br from-accent/10 to-accent/5",
            )}
            aria-hidden={!isFlipped}
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Back</p>
              <p className="text-lg text-balance">{currentCard.back}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <RotateCw className="h-4 w-4" />
        Click card or press Space to flip, Arrow keys to navigate
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="icon"
          disabled={cards.length <= 1}
          aria-label="Previous flashcard (Left Arrow)"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          disabled={cards.length <= 1}
          aria-label="Next flashcard (Right Arrow)"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
