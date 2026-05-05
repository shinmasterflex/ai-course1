/**
 * PERSONALITY QUIZ COMPONENT
 * OCEAN/Big Five personality assessment
 * Uses Likert scale (1-5) for responses
 */

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PersonalityQuestion {
  id: string
  text: string
  trait: string
  aspect: string
  reversed?: boolean
}

interface PersonalityQuizProps {
  questions: PersonalityQuestion[]
  trait: string
  onComplete?: (results: Record<string, number>) => void
}

/**
 * Likert scale options (1-5)
 * 1 = Strongly Disagree, 5 = Strongly Agree
 */
const scaleOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
]

export function PersonalityQuiz({ questions, trait, onComplete }: PersonalityQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleSelectOption = (value: number) => {
    setSelectedValue(value)
  }

  const handleNext = () => {
    if (selectedValue === null) return

    // Save answer
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedValue,
    }
    setAnswers(newAnswers)

    if (isLastQuestion) {
      // Quiz complete
      if (onComplete) {
        onComplete(newAnswers)
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedValue(null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      // Load previous answer if exists
      const previousQuestion = questions[currentQuestionIndex - 1]
      setSelectedValue(answers[previousQuestion.id] || null)
    }
  }

  return (
    <Card className="p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-brand-green">{trait} Assessment</span>
          <span className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #1a4d3e, #ff5722)",
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-balance">{currentQuestion.text}</h3>
        <p className="text-sm text-muted-foreground">Rate how much you agree with this statement</p>
      </div>

      {/* Scale Options */}
      <div className="space-y-3 mb-8">
        {scaleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelectOption(option.value)}
            className={cn(
              "w-full p-4 text-left rounded-lg border-2 transition-all",
              "hover:border-primary hover:bg-primary/5",
              selectedValue === option.value && "border-primary bg-primary/10",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              <span className="text-sm text-muted-foreground">{option.value}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button onClick={handlePrevious} variant="outline" disabled={currentQuestionIndex === 0}>
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={selectedValue === null}
          className="bg-brand-orange hover:bg-[#e64a19] text-white"
        >
          {isLastQuestion ? "Complete" : "Next"}
        </Button>
      </div>
    </Card>
  )
}
