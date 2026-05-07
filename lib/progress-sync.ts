/**
 * PROGRESS SYNC UTILITIES
 * Helper functions for managing server-first progress sync
 */

import { loadProgress, saveProgress, flushProgress, type GlobalProgress } from './progress-manager'

const STORAGE_KEY = 'cognijin_progress'
const LEGACY_STORAGE_KEY = 'cognijin-progress'
const ACTIVE_USER_KEY = 'cognijin_active_user'

type UnloadSnapshot = {
  modules?: Array<{
    slug?: string
    sections?: Array<{ completed?: boolean }>
  }>
}

function normalizeModulesForApi(progressJson: unknown): Record<string, { status: string; completionRate: number }> {
  if (!progressJson || typeof progressJson !== 'object') {
    return {}
  }

  const progress = progressJson as Record<string, unknown>
  const modules = progress.modules
  const normalized: Record<string, { status: string; completionRate: number }> = {}

  if (modules && typeof modules === 'object' && !Array.isArray(modules)) {
    Object.entries(modules).forEach(([moduleSlug, moduleData]) => {
      if (!moduleData || typeof moduleData !== 'object') {
        return
      }

      const typedModuleData = moduleData as Record<string, unknown>
      const status = typeof typedModuleData.status === 'string' ? typedModuleData.status : 'not-started'
      const completionRate = typeof typedModuleData.completionRate === 'number' ? typedModuleData.completionRate : 0

      normalized[moduleSlug] = {
        status,
        completionRate: Math.min(Math.max(completionRate, 0), 100),
      }
    })

    return normalized
  }

  if (Array.isArray((progress as UnloadSnapshot).modules)) {
    ;(progress as UnloadSnapshot).modules?.forEach((module) => {
      if (!module?.slug) {
        return
      }

      const sections = Array.isArray(module.sections) ? module.sections : []
      const completedCount = sections.filter((section) => section?.completed).length
      const completionRate = sections.length > 0 ? Math.round((completedCount / sections.length) * 100) : 0
      const status = completionRate === 0 ? 'not-started' : completionRate === 100 ? 'completed' : 'in-progress'

      normalized[module.slug] = { status, completionRate }
    })
  }

  return normalized
}

/**
 * Initialize progress on app mount
 * Call this in your root layout or auth guard to warm the cache
 */
export async function initializeProgressSync(): Promise<void> {
  try {
    await loadProgress()
  } catch (error) {
    console.error('[ProgressSync] Failed to initialize:', error)
  }
}

/**
 * Sync progress before navigation/logout
 * Ensures all pending changes are persisted
 */
export async function syncProgressBeforeExit(): Promise<void> {
  try {
    await flushProgress()
  } catch (error) {
    console.error('[ProgressSync] Failed to flush on exit:', error)
  }
}

/**
 * Hook into window unload to sync before tab close
 */
export function setupProgressSyncOnUnload(): () => void {
  if (typeof window === 'undefined') return () => {}

  const handler = () => {
    // Try sendBeacon first (most reliable for unload), then sync XHR.
    const activeUserValue = localStorage.getItem(ACTIVE_USER_KEY)
    const activeUser = activeUserValue ? activeUserValue : 'anonymous'
    const namespacedKey = `${STORAGE_KEY}:${activeUser}`
    const legacyNamespacedKey = `${LEGACY_STORAGE_KEY}:${activeUser}`
    const progress =
      localStorage.getItem(namespacedKey)
      ? localStorage.getItem(namespacedKey)
      : localStorage.getItem(legacyNamespacedKey)
        ? localStorage.getItem(legacyNamespacedKey)
        : localStorage.getItem(STORAGE_KEY)
          ? localStorage.getItem(STORAGE_KEY)
          : localStorage.getItem(LEGACY_STORAGE_KEY)

    if (!progress) return

    let parsedProgress: unknown = null
    try {
      parsedProgress = JSON.parse(progress)
    } catch {
      return
    }

    const modules = normalizeModulesForApi(parsedProgress)
    if (Object.keys(modules).length === 0) {
      return
    }

    const payload = JSON.stringify({ progress: { modules } })

    const blob = new Blob([payload], {
      type: 'application/json',
    })

    const sent = navigator.sendBeacon('/api/progress', blob)
    
    if (!sent) {
      // Synchronous fetch with keepalive
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Silently fail - best effort sync
      })
    }
  }

  window.addEventListener('beforeunload', handler)

  return () => {
    window.removeEventListener('beforeunload', handler)
  }
}
