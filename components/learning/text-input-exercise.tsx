/**
 * TEXT INPUT EXERCISE COMPONENT
 * Free-form text input for reflective exercises
 * Used for writing exercises like the 3x5 card exercise
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"

interface TextInputExerciseProps {
  title: string
  prompt: string
  placeholder?: string
  minLength?: number
  onComplete?: (text: string) => void
}

export function TextInputExercise({
  title,
  prompt,
  placeholder = "Start writing...",
  minLength = 50,
  onComplete,
}: TextInputExerciseProps) {
  const [text, setText] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (text.length >= minLength) {
      setIsSubmitted(true)
      if (onComplete) {
        onComplete(text)
      }
    }
  }

  const handleReset = () => {
    setText("")
    setIsSubmitted(false)
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const charCount = text.length
  const meetsMinimum = charCount >= minLength

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-balance">{title}</h3>
      <p className="text-muted-foreground mb-6">{prompt}</p>

      {!isSubmitted ? (
        <>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] mb-4 resize-none"
            disabled={isSubmitted}
          />

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              <span className={meetsMinimum ? "text-green-600" : ""}>
                {charCount} characters ({wordCount} words)
              </span>
              {!meetsMinimum && <span className="ml-2">• Minimum {minLength} characters required</span>}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!meetsMinimum}
            className="bg-brand-orange hover:bg-[#e64a19] text-white"
          >
            Submit Response
          </Button>
        </>
      ) : (
        <>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5" />
              <p className="font-medium">Response Submitted!</p>
            </div>
            <p className="text-sm">Your reflection has been saved. Great work on completing this exercise!</p>
          </div>

          <div className="p-4 rounded-lg bg-muted mb-4">
            <p className="text-sm font-medium mb-2">Your Response:</p>
            <p className="text-sm whitespace-pre-wrap">{text}</p>
          </div>

          <Button onClick={handleReset} variant="outline">
            Write Another Response
          </Button>
        </>
      )}
    </Card>
  )
}
