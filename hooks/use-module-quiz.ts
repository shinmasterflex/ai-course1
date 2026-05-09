/**
 * USE MODULE QUIZ HOOK
 * Centralized quiz state management for module assessments
 * Handles quiz results, localStorage persistence, and completion tracking
 */

import { useState, useEffect, useMemo } from "react"
import { getCompatibleModuleIds } from "@/lib/course-module-id-map"

/**
 * Custom hook for managing module quiz state
 * @param moduleId - The module identifier (e.g., "module-1")
 * @param quizKeys - Array of quiz question keys (e.g., ["matching", "quiz1", "quiz2"])
 * @returns Quiz state and handlers
 */
export function useModuleQuiz<T extends string>(moduleId: string, quizKeys: T[]) {
  // Initialize quiz results with all keys set to false
  const initialResults = useMemo(
    () => Object.fromEntries(quizKeys.map((key) => [key, false])) as Record<T, boolean>,
    [quizKeys]
  )

  const [quizResults, setQuizResults] = useState<Record<T, boolean>>(initialResults)

  // Load saved quiz results from localStorage on mount
  useEffect(() => {
    const savedQuiz = getCompatibleModuleIds(moduleId)
      .map((compatibleModuleId) => ({
        key: `${compatibleModuleId}-quiz-results`,
        value: localStorage.getItem(`${compatibleModuleId}-quiz-results`),
      }))
      .find((entry) => entry.value)

    if (savedQuiz?.value) {
      try {
        const parsed = JSON.parse(savedQuiz.value)
        setQuizResults(parsed)
        if (savedQuiz.key !== `${moduleId}-quiz-results`) {
          localStorage.setItem(`${moduleId}-quiz-results`, savedQuiz.value)
        }
      } catch (error) {
        console.error(`[useModuleQuiz] Failed to parse saved quiz for ${moduleId}:`, error)
      }
    }
  }, [moduleId])

  // Persist quiz results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`${moduleId}-quiz-results`, JSON.stringify(quizResults))
  }, [quizResults, moduleId])

  // Handler to update quiz results
  const handleQuizComplete = (quizKey: T, correct: boolean) => {
    setQuizResults((prev) => ({
      ...prev,
      [quizKey]: correct,
    }))
  }

  // Check if all quizzes are complete
  const allQuizComplete = useMemo(
    () => Object.values(quizResults).every((result) => result === true),
    [quizResults]
  )

  return {
    quizResults,
    handleQuizComplete,
    allQuizComplete,
    setQuizResults, // For advanced use cases
  }
}
