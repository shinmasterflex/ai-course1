/**
 * SLIDESHOW COMPONENT
 * Carousel for presenting chunked information
 * Allows users to navigate through slides at their own pace
 */

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Slide {
  id: string
  title: string
  content: string
  image?: string
}

interface SlideshowProps {
  slides: Slide[]
}

export function Slideshow({ slides }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentSlide = slides[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="space-y-4">
      {/* Slide */}
      <Card className="p-8">
        {currentSlide.image && (
          <div className="mb-6 relative h-48 rounded-lg overflow-hidden">
            <Image
              src={currentSlide.image || "/placeholder.svg"}
              alt={currentSlide.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h3 className="text-2xl font-bold mb-4 text-balance">{currentSlide.title}</h3>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {currentSlide.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-3">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button onClick={handlePrevious} variant="outline" disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {slides.length}
        </span>

        <Button onClick={handleNext} variant="outline" disabled={currentIndex === slides.length - 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
