/**
 * USE MODULE QUIZ HOOK
 * Centralized quiz state management for module assessments.
 * Persists quiz results to Supabase.
 */

import { useEffect, useMemo, useState } from "react"
import { loadQuizResults, saveQuizResults } from "@/lib/supabase-learning-state"

/**
 * Custom hook for managing module quiz state
 * @param moduleId - The module identifier (e.g., "module-1")
 * @param quizKeys - Array of quiz question keys (e.g., ["matching", "quiz1", "quiz2"])
 * @returns Quiz state and handlers
 */
export function useModuleQuiz<T extends string>(moduleId: string, quizKeys: T[]) {
  const initialResults = useMemo(
    () => Object.fromEntries(quizKeys.map((key) => [key, false])) as Record<T, boolean>,
    [quizKeys]
  )

  const [quizResults, setQuizResults] = useState<Record<T, boolean>>(initialResults)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    let isActive = true

    setIsHydrated(false)
    setQuizResults(initialResults)

    const hydrate = async () => {
      try {
        const savedResults = await loadQuizResults(moduleId)

        if (!isActive) {
          return
        }

        if (savedResults) {
          setQuizResults({
            ...initialResults,
            ...savedResults,
          })
        }
      } catch (error) {
        console.error(`[useModuleQuiz] Failed to load saved quiz for ${moduleId}:`, error)
      } finally {
        if (isActive) {
          setIsHydrated(true)
        }
      }
    }

    void hydrate()

    return () => {
      isActive = false
    }
  }, [initialResults, moduleId])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    void saveQuizResults(moduleId, quizResults).catch((error) => {
      console.error(`[useModuleQuiz] Failed to save quiz for ${moduleId}:`, error)
    })
  }, [isHydrated, moduleId, quizResults])

  const handleQuizComplete = (quizKey: T, correct: boolean) => {
    setQuizResults((prev) => ({
      ...prev,
      [quizKey]: correct,
    }))
  }

  const allQuizComplete = useMemo(
    () => Object.values(quizResults).every((result) => result === true),
    [quizResults]
  )

  return {
    quizResults,
    handleQuizComplete,
    allQuizComplete,
    setQuizResults,
  }
}
