/**
 * PROGRESS MANAGER - Client-Side Progress Tracking
 * Tracks module/section completion state (no quiz data)
 * Syncs with Prisma Progress model via /api/progress
 */

import { courseStructure } from "./course-structure"
import { createClient } from "./supabase"

// Storage key for session caching
const STORAGE_KEY = "swiftcourse-progress"
const ACTIVE_USER_KEY = "swiftcourse_active_user"

// Type definitions for progress data (section-level only, no quiz)
export interface ModuleProgress {
  completedSections: number[]
  currentSection: number
  lastUpdated: string
}

export interface GlobalProgress {
  modules: Record<string, ModuleProgress>
  version: string
}

/**
 * Initialize progress data structure
 */
function initializeProgress(): GlobalProgress {
  return {
    modules: {},
    version: "1.0",
  }
}

let pendingSave: NodeJS.Timeout | null = null
let cachedProgress: GlobalProgress | null = null
let activeUserId: string | null = null
let authInitialized = false
let authListenerInitialized = false

function getScopedStorageKey(): string {
  return `${STORAGE_KEY}:${activeUserId ?? "anonymous"}`
}

function migrateLegacyCache() {
  if (typeof window === "undefined") return

  const scopedKey = getScopedStorageKey()
  const legacyValue = localStorage.getItem(STORAGE_KEY)

  if (legacyValue && !localStorage.getItem(scopedKey)) {
    localStorage.setItem(scopedKey, legacyValue)
    localStorage.removeItem(STORAGE_KEY)
  }
}

async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return user?.id ?? null
  } catch {
    return null
  }
}

function setupAuthListener() {
  if (typeof window === "undefined" || authListenerInitialized) return

  authListenerInitialized = true
  const supabase = createClient()

  supabase.auth.onAuthStateChange((_event, session) => {
    const nextUserId = session?.user?.id ?? null
    if (nextUserId !== activeUserId) {
      activeUserId = nextUserId
      localStorage.setItem(ACTIVE_USER_KEY, activeUserId ?? "anonymous")
      migrateLegacyCache()
      cachedProgress = null
    }
  })
}

async function ensureUserContext(): Promise<void> {
  if (typeof window === "undefined") return

  setupAuthListener()

  if (authInitialized) return

  activeUserId = await getCurrentUserId()
  localStorage.setItem(ACTIVE_USER_KEY, activeUserId ?? "anonymous")
  migrateLegacyCache()
  authInitialized = true
}

/**
 * Load progress from server (with session cache fallback)
 */
export async function loadProgress(): Promise<GlobalProgress> {
  if (typeof window === "undefined") return initializeProgress()

  await ensureUserContext()

  // Return in-memory cache if available
  if (cachedProgress) {
    return cachedProgress
  }

  try {
    // Try loading from server first
    const response = await fetch("/api/progress", {
      method: "GET",
      credentials: "same-origin",
    })

    if (response.ok) {
      const data = await response.json()
      const serverProgress = data.progress || initializeProgress()
      
      // Cache in memory and localStorage
      cachedProgress = serverProgress
      localStorage.setItem(getScopedStorageKey(), JSON.stringify(serverProgress))
      
      return serverProgress
    }

    // If unauthorized or error, fall back to localStorage cache
    const stored = localStorage.getItem(getScopedStorageKey())
    if (stored) {
      const parsed = JSON.parse(stored) as GlobalProgress
      cachedProgress = parsed
      return parsed
    }
  } catch (error) {
    console.error("[Progress] Failed to load from server:", error)
    
    // Fall back to localStorage
    const stored = localStorage.getItem(getScopedStorageKey())
    if (stored) {
      const parsed = JSON.parse(stored) as GlobalProgress
      cachedProgress = parsed
      return parsed
    }
  }

  const fallback = initializeProgress()
  cachedProgress = fallback
  return fallback
}

/**
 * Save progress to server (optimistic with debouncing)
 * Transforms section-level state into module-level status/completionRate
 */
export async function saveProgress(progress: GlobalProgress): Promise<void> {
  if (typeof window === "undefined") return

  await ensureUserContext()

  // Optimistic update: immediately update cache
  cachedProgress = progress
  localStorage.setItem(getScopedStorageKey(), JSON.stringify(progress))

  // Debounce server saves (avoid hammering API on rapid updates)
  if (pendingSave) {
    clearTimeout(pendingSave)
  }

  pendingSave = setTimeout(async () => {
    try {
      // Transform to Prisma Progress format (module-level only)
      const modules: Record<
        string,
        { status: string; completionRate: number }
      > = {}

      Object.entries(progress.modules).forEach(([moduleSlug, moduleData]) => {
        // Look up actual total sections from courseStructure
        const module = courseStructure.modules.find((m) => m.slug === moduleSlug)
        const totalSections = module?.sections.length || 1 // Avoid divide by zero

        // Calculate actual completion rate
        const completedCount = moduleData.completedSections?.length || 0
        const completionRate = Math.round((completedCount / totalSections) * 100)

        const status =
          completionRate === 0
            ? "not-started"
            : completionRate < 100
              ? "in-progress"
              : "completed"

        modules[moduleSlug] = { status, completionRate }
      })

      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ progress: { modules } }),
      })

      if (!response.ok) {
        console.error("[Progress] Server save failed:", response.status)
      }
    } catch (error) {
      console.error("[Progress] Failed to save to server:", error)
    }
  }, 1000) // 1 second debounce
}

/**
 * Force immediate server sync
 */
export async function flushProgress(): Promise<void> {
  if (pendingSave) {
    clearTimeout(pendingSave)
    pendingSave = null
  }

  if (!cachedProgress) return

  await saveProgress(cachedProgress)
}

/**
 * Invalidate cache and reload from server
 */
export async function refreshProgress(): Promise<GlobalProgress> {
  cachedProgress = null
  return loadProgress()
}

/**
 * Get progress for a specific module (async)
 */
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
    currentSection: moduleData.currentSection ?? 0,
  }
}

/**
 * Synchronous version for immediate reads (uses cache)
 */
export function getModuleProgressSync(moduleId: string): ModuleProgress {
  const progress = cachedProgress || initializeProgress()

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
    currentSection: moduleData.currentSection ?? 0,
  }
}

/**
 * Update progress for a specific module (optimistic)
 */
export async function updateModuleProgress(moduleId: string, updates: Partial<ModuleProgress>): Promise<void> {
  const progress = await loadProgress()

  progress.modules[moduleId] = {
    ...progress.modules[moduleId],
    ...updates,
    lastUpdated: new Date().toISOString(),
  }

  await saveProgress(progress)
}

/**
 * Mark a section as complete (optimistic)
 */
export async function markSectionComplete(moduleId: string, sectionIndex: number): Promise<void> {
  const moduleProgress = await getModuleProgress(moduleId)

  const completedSections = Array.isArray(moduleProgress.completedSections) ? moduleProgress.completedSections : []

  if (!completedSections.includes(sectionIndex)) {
    completedSections.push(sectionIndex)
    completedSections.sort((a, b) => a - b)
  }

  await updateModuleProgress(moduleId, { ...moduleProgress, completedSections })
}

/**
 * Set current section (optimistic)
 */
export async function setCurrentSection(moduleId: string, sectionIndex: number): Promise<void> {
  await updateModuleProgress(moduleId, { currentSection: sectionIndex })
}

/**
 * Get completion percentage for a module (uses cache)
 */
export function getModuleCompletionPercentage(moduleId: string, totalSections: number): number {
  const moduleProgress = getModuleProgressSync(moduleId)
  return Math.round((moduleProgress.completedSections.length / totalSections) * 100)
}

/**
 * Check if a module is complete (uses cache)
 */
export function isModuleComplete(moduleId: string, totalSections: number): boolean {
  const moduleProgress = getModuleProgressSync(moduleId)
  return moduleProgress.completedSections.length >= totalSections
}

/**
 * Get overall course completion (uses cache)
 */
export function getOverallCompletion(moduleTotals: Record<string, number>): {
  completedModules: number
  totalModules: number
  percentage: number
} {
  const progress = cachedProgress || initializeProgress()
  const moduleIds = Object.keys(moduleTotals)

  const completedModules = moduleIds.filter((id) => isModuleComplete(id, moduleTotals[id])).length

  return {
    completedModules,
    totalModules: moduleIds.length,
    percentage: Math.round((completedModules / moduleIds.length) * 100),
  }
}

/**
 * Reset all progress (server + cache)
 */
export async function resetAllProgress(): Promise<void> {
  if (typeof window === "undefined") return

  await ensureUserContext()

  try {
    // Clear cache
    cachedProgress = null
    localStorage.removeItem(getScopedStorageKey())

    // Save empty progress to server
    await saveProgress(initializeProgress())
    await flushProgress()
  } catch (error) {
    console.error("[Progress] Failed to reset progress:", error)
  }
}
