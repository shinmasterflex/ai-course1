"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Circle, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ModuleQuizQuestion } from "@/lib/module-quiz-data"

type ModuleQuizProps<T extends string> = {
  questions: readonly ModuleQuizQuestion<T>[]
  results: Record<T, boolean>
  onAnswer: (quizKey: T, correct: boolean) => void
}

export function ModuleQuiz<T extends string>({ questions, results, onAnswer }: ModuleQuizProps<T>) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<T, string>>({} as Record<T, string>)

  const answeredCount = useMemo(
    () => Object.values(results).filter(Boolean).length,
    [results]
  )

  return (
    <div className="space-y-6">
      {questions.map((question, index) => {
        const selected = selectedAnswers[question.key]
        const isAnswered = Boolean(selected)
        const isCorrect = results[question.key] === true

        return (
          <Card key={question.key} className="p-5 border-brand-green/20 bg-brand-green/5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">Question {index + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{question.prompt}</h3>
              </div>
              {isAnswered ? (
                isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
                )
              ) : (
                <Circle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = selected === option.id
                const showCorrect = isAnswered && option.id === question.correctOptionId
                const showIncorrect = isSelected && isAnswered && option.id !== question.correctOptionId

                return (
                  <Button
                    key={option.id}
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-auto w-full justify-start whitespace-normal px-4 py-3 text-left text-foreground",
                      showCorrect && "border-green-600 bg-green-50 text-green-900 hover:bg-green-50 hover:text-green-900",
                      showIncorrect && "border-red-500 bg-red-50 text-red-900 hover:bg-red-50 hover:text-red-900",
                      !showCorrect && !showIncorrect && "hover:border-brand-orange hover:bg-orange-50 hover:text-foreground",
                    )}
                    onClick={() => {
                      setSelectedAnswers((prev) => ({ ...prev, [question.key]: option.id }))
                      onAnswer(question.key, option.id === question.correctOptionId)
                    }}
                  >
                    {option.label}
                  </Button>
                )
              })}
            </div>

            {isAnswered ? (
              <p className={cn("mt-4 text-sm", isCorrect ? "text-green-700" : "text-red-700")}>
                {isCorrect ? "Correct. " : "Not quite. "}
                {question.explanation}
              </p>
            ) : null}
          </Card>
        )
      })}

      <p className="text-sm text-muted-foreground">
        Correct answers recorded: {answeredCount} / {questions.length}
      </p>
    </div>
  )
}
