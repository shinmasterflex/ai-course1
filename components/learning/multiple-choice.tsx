/**
 * MULTIPLE CHOICE COMPONENT
 * Interactive quiz question with instant feedback
 * Provides visual feedback and explanations
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

interface Option {
  id: string
  text: string
  isCorrect: boolean
  feedback?: string
}

interface MultipleChoiceProps {
  question: string
  options: Option[]
  explanation?: string
  onAnswer?: (correct: boolean) => void
}

export function MultipleChoice({ question, options, explanation, onAnswer }: MultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return // Prevent changing answer after submission

    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    setShowFeedback(true)
    const selected = options.find((opt) => opt.id === selectedOption)
    if (selected && onAnswer) {
      onAnswer(selected.isCorrect)
    }
  }

  const handleReset = () => {
    setSelectedOption(null)
    setShowFeedback(false)
  }

  const selectedOptionData = options.find((opt) => opt.id === selectedOption)

  return (
    <Card className="p-6">
      {/* Question */}
      <h3 className="text-xl font-semibold mb-6 text-balance">{question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selectedOption === option.id
          const showCorrect = showFeedback && option.isCorrect
          const showIncorrect = showFeedback && isSelected && !option.isCorrect

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={showFeedback}
              className={cn(
                "w-full p-4 text-left rounded-lg border-2 transition-all",
                "hover:border-primary hover:bg-primary/5",
                isSelected && !showFeedback && "border-primary bg-primary/10",
                showCorrect && "border-green-500 bg-green-50 dark:bg-green-950",
                showIncorrect && "border-red-500 bg-red-50 dark:bg-red-950",
                showFeedback && !isSelected && !option.isCorrect && "opacity-50",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option.text}</span>
                {showCorrect && <Check className="h-5 w-5 text-green-600" />}
                {showIncorrect && <X className="h-5 w-5 text-red-600" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selectedOptionData && (
        <div
          className={cn(
            "p-4 rounded-lg mb-4",
            selectedOptionData.isCorrect
              ? "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100"
              : "bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100",
          )}
        >
          <p className="font-medium mb-2">{selectedOptionData.isCorrect ? "✓ Correct!" : "✗ Incorrect"}</p>
          {selectedOptionData.feedback && <p className="text-sm">{selectedOptionData.feedback}</p>}
          {explanation && (
            <div className="mt-3 pt-3 border-t border-current/20">
              <p className="text-sm font-medium mb-1">Explanation:</p>
              <p className="text-sm">{explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!showFeedback ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="bg-brand-orange hover:bg-[#e64a19] text-white"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  )
}
