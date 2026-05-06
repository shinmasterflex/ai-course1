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
  const [attemptedQuestions, setAttemptedQuestions] = useState<Record<T, boolean>>({} as Record<T, boolean>)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)

  const answeredCount = useMemo(
    () => Object.values(results).filter(Boolean).length,
    [results]
  )

  const progressPct = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0

  return (
    <div className="space-y-6">
      <Card className="p-4 border-brand-orange/20 bg-gradient-to-r from-brand-orange/10 to-brand-green/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-brand-indigo">Quiz Mission Stats</p>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white px-2 py-1 text-brand-green">XP: {xp}</span>
            <span className="rounded-full bg-white px-2 py-1 text-brand-orange">Streak: {streak}</span>
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
          <div className="h-full bg-brand-green transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </Card>

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
                      const isFirstAttempt = !attemptedQuestions[question.key]
                      const isCorrectAnswer = option.id === question.correctOptionId

                      if (isFirstAttempt) {
                        setAttemptedQuestions((prev) => ({ ...prev, [question.key]: true }))
                        if (isCorrectAnswer) {
                          setXp((prev) => prev + 10)
                          setStreak((prev) => prev + 1)
                        } else {
                          setStreak(0)
                        }
                      }

                      setSelectedAnswers((prev) => ({ ...prev, [question.key]: option.id }))
                      onAnswer(question.key, isCorrectAnswer)
                    }}
                  >
                    {option.label}
                  </Button>
                )
              })}
            </div>

            {isAnswered ? (
              <div className="mt-4 space-y-2">
                {isCorrect ? (
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Correct!</span> {question.explanation}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-red-700 font-semibold">Not quite.</p>
                    {(() => {
                      const selectedOption = question.options.find((opt) => opt.id === selected)
                      const selectedExplanation = selectedOption?.explanation
                      const correctOption = question.options.find((opt) => opt.id === question.correctOptionId)
                      
                      return (
                        <>
                          {selectedExplanation && (
                            <p className="text-sm text-red-600">{selectedExplanation}</p>
                          )}
                          <p className="text-sm text-green-700">
                            <span className="font-semibold">The correct answer:</span> {correctOption?.label}
                          </p>
                          <p className="text-sm text-green-600">{question.explanation}</p>
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>
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
