/**
 * PROGRESS MANAGER - Client-side section progress tracking.
 * Persists to Supabase instead of localStorage.
 */

import { loadSectionProgressState, resetSectionProgressState, saveSectionProgressState } from "./supabase-learning-state"

export interface ModuleProgress {
  completedSections: number[]
  currentSection: number
  lastUpdated: string
}

export interface GlobalProgress {
  modules: Record<string, ModuleProgress>
  version: string
}

function normalizeProgress(progress: GlobalProgress): GlobalProgress {
  return {
    ...progress,
    modules: progress.modules ?? {},
  }
}

function initializeProgress(): GlobalProgress {
  return {
    modules: {},
    version: "1.0",
  }
}

function normalizeSectionState(state: unknown): GlobalProgress {
  if (!state || typeof state !== "object") {
    return initializeProgress()
  }

  const typedState = state as Partial<GlobalProgress>
  return normalizeProgress({
    modules: typedState.modules ?? {},
    version: typeof typedState.version === "string" ? typedState.version : "1.0",
  })
}

let pendingSave: NodeJS.Timeout | null = null
let cachedProgress: GlobalProgress | null = null
// Deduplicates concurrent calls to loadProgress() that arrive before cachedProgress is populated.
let loadInFlight: Promise<GlobalProgress> | null = null
// Serializes all writes so concurrent read-modify-write operations don't overwrite each other.
let writeQueue: Promise<void> = Promise.resolve()

function enqueueWrite(fn: () => Promise<void>): Promise<void> {
  // Chain onto the tail of the queue; always advance even if fn throws.
  writeQueue = writeQueue.then(fn, fn)
  return writeQueue
}

export async function loadProgress(): Promise<GlobalProgress> {
  if (typeof window === "undefined") return initializeProgress()

  if (cachedProgress) {
    return cachedProgress
  }

  // Return the same in-flight fetch to all concurrent callers instead of issuing N requests.
  if (loadInFlight) {
    return loadInFlight
  }

  loadInFlight = (async () => {
    try {
      const savedState = await loadSectionProgressState()

      if (savedState) {
        cachedProgress = normalizeSectionState(savedState)
        return cachedProgress
      }
    } catch (error) {
      console.error("[Progress] Failed to load section progress from Supabase:", error)
    }

    cachedProgress = initializeProgress()
    return cachedProgress
  })().finally(() => {
    loadInFlight = null
  })

  return loadInFlight
}

export async function saveProgress(progress: GlobalProgress): Promise<void> {
  if (typeof window === "undefined") return

  const normalizedProgress = normalizeProgress(progress)
  cachedProgress = normalizedProgress

  if (pendingSave) {
    clearTimeout(pendingSave)
  }

  pendingSave = setTimeout(async () => {
    try {
      await saveSectionProgressState(normalizedProgress)
    } catch (error) {
      console.error("[Progress] Failed to save section progress to Supabase:", error)
    }
  }, 1000)
}

export async function flushProgress(): Promise<void> {
  if (pendingSave) {
    clearTimeout(pendingSave)
    pendingSave = null
  }

  if (!cachedProgress) return

  try {
    await saveSectionProgressState(cachedProgress)
  } catch (error) {
    console.error("[Progress] Failed to flush section progress to Supabase:", error)
  }
}

export async function refreshProgress(): Promise<GlobalProgress> {
  cachedProgress = null
  return loadProgress()
}

export async function getModuleProgress(moduleId: string): Promise<ModuleProgress> {
  const progress = await loadProgress()

  const moduleData = progress.modules[moduleId]

  if (!moduleData) {
    return {
      completedSections: [],
      currentSection: 0,
      lastUpdated: new Date().toISOString(),
    }
  }

  return {
    ...moduleData,
    completedSections: Array.isArray(moduleData.completedSections) ? moduleData.completedSections : [],
    currentSection: typeof moduleData.currentSection === "number" ? moduleData.currentSection : 0,
  }
}

export function getModuleProgressSync(moduleId: string): ModuleProgress {
  const progress = cachedProgress ? cachedProgress : initializeProgress()

  const moduleData = progress.modules[moduleId]

  if (!moduleData) {
    return {
      completedSections: [],
      currentSection: 0,
      lastUpdated: new Date().toISOString(),
    }
  }

  return {
    ...moduleData,
    completedSections: Array.isArray(moduleData.completedSections) ? moduleData.completedSections : [],
    currentSection: typeof moduleData.currentSection === "number" ? moduleData.currentSection : 0,
  }
}

export async function updateModuleProgress(moduleId: string, updates: Partial<ModuleProgress>): Promise<void> {
  return enqueueWrite(async () => {
    const progress = cachedProgress ?? (await loadProgress())

    progress.modules[moduleId] = {
      ...progress.modules[moduleId],
      ...updates,
      lastUpdated: new Date().toISOString(),
    }

    await saveProgress(progress)
  })
}

export async function markSectionComplete(moduleId: string, sectionIndex: number): Promise<void> {
  // Runs inside the write queue so it sees the latest cachedProgress
  // without a separate read-then-update that could race with a concurrent write.
  return enqueueWrite(async () => {
    const progress = cachedProgress ?? (await loadProgress())
    const moduleData = progress.modules[moduleId]
    const completedSections = Array.isArray(moduleData?.completedSections) ? [...moduleData.completedSections] : []

    if (!completedSections.includes(sectionIndex)) {
      completedSections.push(sectionIndex)
      completedSections.sort((a, b) => a - b)
    }

    progress.modules[moduleId] = {
      ...moduleData,
      completedSections,
      currentSection: moduleData?.currentSection ?? 0,
      lastUpdated: new Date().toISOString(),
    }

    await saveProgress(progress)
  })
}

export async function setCurrentSection(moduleId: string, sectionIndex: number): Promise<void> {
  await updateModuleProgress(moduleId, { currentSection: sectionIndex })
}

export function getModuleCompletionPercentage(moduleId: string, totalSections: number): number {
  const moduleProgress = getModuleProgressSync(moduleId)
  return Math.round((moduleProgress.completedSections.length / totalSections) * 100)
}

export function isModuleComplete(moduleId: string, totalSections: number): boolean {
  const moduleProgress = getModuleProgressSync(moduleId)
  return moduleProgress.completedSections.length >= totalSections
}

export function getOverallCompletion(moduleTotals: Record<string, number>): {
  completedModules: number
  totalModules: number
  percentage: number
} {
  const moduleIds = Object.keys(moduleTotals)

  const completedModules = moduleIds.filter((id) => isModuleComplete(id, moduleTotals[id])).length

  return {
    completedModules,
    totalModules: moduleIds.length,
    percentage: Math.round((completedModules / moduleIds.length) * 100),
  }
}

export async function resetAllProgress(): Promise<void> {
  if (typeof window === "undefined") return

  return enqueueWrite(async () => {
    try {
      if (pendingSave) {
        clearTimeout(pendingSave)
        pendingSave = null
      }

      // Clear in DB first; only update the in-memory cache after the reset succeeds
      // to prevent a window where concurrent writes run against an empty cache
      // and get wiped by the subsequent saveSectionProgressState call.
      await resetSectionProgressState()
      cachedProgress = initializeProgress()
      await saveSectionProgressState(cachedProgress)
    } catch (error) {
      console.error("[Progress] Failed to reset section progress:", error)
    }
  })
}
