/**
 * USE MODULE QUIZ HOOK
 * Centralized quiz state management for module assessments.
 * Persists quiz results to Supabase with unload protection.
 */

import { useEffect, useMemo, useRef, useState } from "react"
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
  const pendingSaveRef = useRef<NodeJS.Timeout | null>(null)

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

    // Debounce quiz saves (1s)
    if (pendingSaveRef.current) {
      clearTimeout(pendingSaveRef.current)
    }

    const timeout = setTimeout(() => {
      void saveQuizResults(moduleId, quizResults).catch((error) => {
        console.error(`[useModuleQuiz] Failed to save quiz for ${moduleId}:`, error)
      })
    }, 1000)

    pendingSaveRef.current = timeout

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
      if (pendingSaveRef.current === timeout) {
        pendingSaveRef.current = null
      }
    }
  }, [isHydrated, moduleId, quizResults])

  // Flush quiz results on page unload
  useEffect(() => {
    const handler = async () => {
      if (pendingSaveRef.current) {
        clearTimeout(pendingSaveRef.current)
        pendingSaveRef.current = null
      }
      
      // Attempt one final save on page close
      try {
        await saveQuizResults(moduleId, quizResults)
      } catch (error) {
        console.warn(`[useModuleQuiz] Failed to flush quiz results on page close:`, error)
      }
    }

    if (typeof window === "undefined") {
      return
    }

    window.addEventListener("pagehide", handler)
    window.addEventListener("beforeunload", handler)

    return () => {
      window.removeEventListener("pagehide", handler)
      window.removeEventListener("beforeunload", handler)
    }
  }, [moduleId, quizResults])

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
