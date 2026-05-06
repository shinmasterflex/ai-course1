"use client"

import { useCallback, useMemo, useState } from "react"

interface UseSectionInteractionGateOptions {
  currentSectionIndex: number
  requiredSections: number[]
}

export function useSectionInteractionGate({ currentSectionIndex, requiredSections }: UseSectionInteractionGateOptions) {
  const [sectionInteractionCompletion, setSectionInteractionCompletion] = useState<Record<number, boolean>>({})

  const canAdvance = useMemo(
    () => !requiredSections.includes(currentSectionIndex) || Boolean(sectionInteractionCompletion[currentSectionIndex]),
    [currentSectionIndex, requiredSections, sectionInteractionCompletion]
  )

  const markSectionInteractionComplete = useCallback((sectionIndex = currentSectionIndex) => {
    setSectionInteractionCompletion((prev) => ({ ...prev, [sectionIndex]: true }))
  }, [currentSectionIndex])

  return {
    canAdvance,
    markSectionInteractionComplete,
  }
}