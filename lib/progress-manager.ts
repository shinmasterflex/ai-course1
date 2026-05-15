/**
 * PROGRESS MANAGER - Client-side section progress tracking.
 * Persists to normalized Supabase section state rows.
 */

import { getCourseStructure } from "./course-content"
import { loadAllSectionStates, resetSectionStates, saveSectionStatesBulk } from "./supabase-learning-state"

export interface ModuleProgress {
  completedSections: number[]
  currentSection: number
  lastUpdated: string
}

export interface GlobalProgress {
  modules: Record<string, ModuleProgress>
  version: string
}

export class SaveProgressError extends Error {
  constructor(
    message: string,
    public readonly isTransient: boolean = false,
    public readonly attempt: number = 1,
  ) {
    super(message)
    this.name = "SaveProgressError"
  }
}

const courseStructure = getCourseStructure()
const sectionIdsByModule = new Map<string, string[]>()
const sectionIndexByModule = new Map<string, Map<string, number>>()

courseStructure.modules.forEach((module) => {
  const sectionIds = module.sections.map((section) => section.id)
  sectionIdsByModule.set(module.id, sectionIds)

  const indexMap = new Map<string, number>()
  sectionIds.forEach((sectionId, index) => {
    indexMap.set(sectionId, index)
  })
  sectionIndexByModule.set(module.id, indexMap)
})

function initializeProgress(): GlobalProgress {
  return {
    modules: {},
    version: "2.0",
  }
}

function mergeModuleProgress(serverState: ModuleProgress | undefined, localState: ModuleProgress): ModuleProgress {
  if (!serverState) {
    return { ...localState }
  }

  const serverCompleted = Array.isArray(serverState.completedSections) ? serverState.completedSections : []
  const localCompleted = Array.isArray(localState.completedSections) ? localState.completedSections : []
  const mergedCompleted = Array.from(new Set([...serverCompleted, ...localCompleted])).sort((a, b) => a - b)

  const serverTime = new Date(serverState.lastUpdated ?? 0).getTime()
  const localTime = new Date(localState.lastUpdated ?? 0).getTime()
  const currentSection = localTime >= serverTime ? localState.currentSection : serverState.currentSection

  return {
    completedSections: mergedCompleted,
    currentSection,
    lastUpdated: new Date().toISOString(),
  }
}

function toTransientError(error: unknown, fallbackMessage: string): SaveProgressError {
  const message = error instanceof Error ? error.message : fallbackMessage
  const isTransient =
    message.toLowerCase().includes("network") ||
    message.toLowerCase().includes("timeout") ||
    message.includes("ECONNREFUSED")

  return new SaveProgressError(message, isTransient)
}

function buildProgressFromSectionStateRows(
  rows: Array<{
    moduleId: string
    sectionId: string
    isCompleted: boolean
    lastViewedAt?: string
  }>,
): GlobalProgress {
  const progress = initializeProgress()

  rows.forEach((row) => {
    const sectionIndex = sectionIndexByModule.get(row.moduleId)?.get(row.sectionId)
    if (typeof sectionIndex !== "number") {
      return
    }

    const currentModule = progress.modules[row.moduleId] ?? {
      completedSections: [],
      currentSection: 0,
      lastUpdated: new Date(0).toISOString(),
    }

    if (row.isCompleted && !currentModule.completedSections.includes(sectionIndex)) {
      currentModule.completedSections.push(sectionIndex)
      currentModule.completedSections.sort((a, b) => a - b)
    }

    const viewedAt = row.lastViewedAt ? new Date(row.lastViewedAt).getTime() : 0
    const currentLastUpdated = new Date(currentModule.lastUpdated).getTime()
    if (viewedAt >= currentLastUpdated) {
      currentModule.currentSection = sectionIndex
      currentModule.lastUpdated = row.lastViewedAt ? row.lastViewedAt : new Date().toISOString()
    }

    progress.modules[row.moduleId] = currentModule
  })

  return progress
}

async function persistProgressToSectionState(progress: GlobalProgress): Promise<void> {
  const writes = new Map<string, { moduleId: string; sectionId: string; isCompleted: boolean; lastViewedAt?: string }>()
  const nowIso = new Date().toISOString()

  Object.entries(progress.modules).forEach(([moduleId, moduleProgress]) => {
    const sectionIds = sectionIdsByModule.get(moduleId) ?? []
    if (sectionIds.length === 0) return

    const completedSet = new Set(moduleProgress.completedSections)

    completedSet.forEach((sectionIndex) => {
      if (sectionIndex < 0 || sectionIndex >= sectionIds.length) return

      const sectionId = sectionIds[sectionIndex]
      writes.set(`${moduleId}:${sectionId}`, {
        moduleId,
        sectionId,
        isCompleted: true,
        lastViewedAt: moduleProgress.lastUpdated || nowIso,
      })
    })

    if (moduleProgress.currentSection >= 0 && moduleProgress.currentSection < sectionIds.length) {
      const sectionId = sectionIds[moduleProgress.currentSection]
      const existing = writes.get(`${moduleId}:${sectionId}`)
      writes.set(`${moduleId}:${sectionId}`, {
        moduleId,
        sectionId,
        isCompleted: existing?.isCompleted ?? false,
        lastViewedAt: moduleProgress.lastUpdated || nowIso,
      })
    }
  })

  await resetSectionStates()
  await saveSectionStatesBulk(Array.from(writes.values()))
}

async function mergeProgressWithServer(localProgress: GlobalProgress): Promise<GlobalProgress> {
  try {
    const serverRows = await loadAllSectionStates()
    if (serverRows.length === 0) {
      return localProgress
    }

    const serverProgress = buildProgressFromSectionStateRows(serverRows)
    const merged: GlobalProgress = {
      modules: {},
      version: "2.0",
    }

    const allModuleIds = new Set([...Object.keys(localProgress.modules), ...Object.keys(serverProgress.modules)])
    allModuleIds.forEach((moduleId) => {
      const localState = localProgress.modules[moduleId] ?? {
        completedSections: [],
        currentSection: 0,
        lastUpdated: new Date().toISOString(),
      }

      merged.modules[moduleId] = mergeModuleProgress(serverProgress.modules[moduleId], localState)
    })

    return merged
  } catch (error) {
    console.warn("[Progress] Merge with server failed, using local state:", error)
    return localProgress
  }
}

let pendingSave: NodeJS.Timeout | null = null
let cachedProgress: GlobalProgress | null = null
let loadInFlight: Promise<GlobalProgress> | null = null
let writeQueue: Promise<void> = Promise.resolve()
let lastSaveError: SaveProgressError | null = null

function enqueueWrite(fn: () => Promise<void>): Promise<void> {
  writeQueue = writeQueue.then(fn, fn)
  return writeQueue
}

export async function loadProgress(): Promise<GlobalProgress> {
  if (typeof window === "undefined") return initializeProgress()

  if (cachedProgress) {
    return cachedProgress
  }

  if (loadInFlight) {
    return loadInFlight
  }

  loadInFlight = (async () => {
    try {
      const rows = await loadAllSectionStates()
      cachedProgress = buildProgressFromSectionStateRows(rows)
      return cachedProgress
    } catch (error) {
      console.error("[Progress] Failed to load section progress from Supabase:", error)
      cachedProgress = initializeProgress()
      return cachedProgress
    }
  })().finally(() => {
    loadInFlight = null
  })

  return loadInFlight
}

async function saveSectionProgressStateWithRetry(
  progress: GlobalProgress,
  attempt: number = 1,
  maxAttempts: number = 3,
): Promise<void> {
  try {
    await persistProgressToSectionState(progress)
  } catch (error) {
    const saveError = toTransientError(error, "Failed to save progress")

    if (saveError.isTransient && attempt < maxAttempts) {
      const backoffMs = 100 * Math.pow(2, attempt - 1)
      console.warn(`[Progress] Transient error on attempt ${attempt}, retrying in ${backoffMs}ms`)

      await new Promise((resolve) => setTimeout(resolve, backoffMs))
      return saveSectionProgressStateWithRetry(progress, attempt + 1, maxAttempts)
    }

    throw saveError
  }
}

export async function saveProgress(progress: GlobalProgress): Promise<void> {
  if (typeof window === "undefined") return

  cachedProgress = progress

  if (pendingSave) {
    clearTimeout(pendingSave)
  }

  return new Promise((resolve) => {
    pendingSave = setTimeout(async () => {
      try {
        const mergedProgress = await mergeProgressWithServer(progress)
        cachedProgress = mergedProgress
        await saveSectionProgressStateWithRetry(mergedProgress)
        lastSaveError = null
        resolve()
      } catch (error) {
        const saveError = toTransientError(error, "Failed to save progress")
        lastSaveError = saveError
        console.error("[Progress] Failed to save section progress:", saveError)
        resolve()
      }
    }, 1000)
  })
}

export async function flushProgress(): Promise<void> {
  if (pendingSave) {
    clearTimeout(pendingSave)
    pendingSave = null
  }

  if (!cachedProgress) return

  try {
    const mergedProgress = await mergeProgressWithServer(cachedProgress)
    cachedProgress = mergedProgress

    await saveSectionProgressStateWithRetry(mergedProgress)
    lastSaveError = null
  } catch (error) {
    const saveError = toTransientError(error, "Failed to flush progress")
    lastSaveError = saveError
    console.error("[Progress] Failed to flush section progress:", saveError)
    throw saveError
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
  if (totalSections <= 0) return 0
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
    percentage: moduleIds.length > 0 ? Math.round((completedModules / moduleIds.length) * 100) : 0,
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

      await resetSectionStates()
      cachedProgress = initializeProgress()
      lastSaveError = null
    } catch (error) {
      console.error("[Progress] Failed to reset section progress:", error)
      throw error
    }
  })
}

export function getLastSaveError(): SaveProgressError | null {
  return lastSaveError
}
