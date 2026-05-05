"use client"

import { useEffect, useState, useCallback } from "react"
import { progressManager } from "@/lib/global-progress"

export function useProgress() {
  const [updateCount, setUpdateCount] = useState(0)

  useEffect(() => {
    // Subscribe to progress changes
    const unsubscribe = progressManager.subscribe(() => {
      setUpdateCount((prev) => prev + 1)
    })

    return unsubscribe
  }, []) // Empty dependency array - only subscribe once

  const getCourseStructure = useCallback(() => {
    return progressManager.getCourseStructure()
  }, []) // No dependencies - always returns current structure

  const markSectionComplete = useCallback((moduleId: string, sectionId: string) => {
    progressManager.markSectionComplete(moduleId, sectionId)
  }, [])

  const setCurrentPosition = useCallback((moduleId: string, sectionId: string) => {
    progressManager.setCurrentPosition(moduleId, sectionId)
  }, [])

  const resetProgress = useCallback(() => {
    progressManager.resetProgress()
  }, [])

  const getModuleProgress = useCallback((moduleId: string) => {
    return progressManager.getModuleProgress(moduleId)
  }, [])

  const getOverallProgress = useCallback(() => {
    return progressManager.getOverallProgress()
  }, [])

  const getCompletedSections = useCallback((moduleId: string) => {
    return progressManager.getCompletedSections(moduleId)
  }, [])

  const courseStructure = progressManager.getCourseStructure()

  return {
    progressManager,
    modules: courseStructure.modules,
    currentModule: progressManager.currentModule,
    currentSection: progressManager.currentSection,
    getModuleProgress,
    getOverallProgress,
    getCompletedSections,
    markSectionComplete,
    setCurrentPosition,
    resetProgress,
    getCourseStructure,
  }
}
