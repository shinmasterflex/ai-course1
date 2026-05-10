/**
 * PROGRESS SYNC UTILITIES
 * Helper functions for managing Supabase-backed progress sync.
 */

import { progressManager } from "./global-progress"
import { flushProgress, loadProgress } from "./progress-manager"

/**
 * Initialize progress on app mount
 * Call this in your root layout or auth guard to warm the cache
 */
export async function initializeProgressSync(): Promise<void> {
  try {
    await loadProgress()
    await progressManager.waitForInitialization()
  } catch (error) {
    console.error("[ProgressSync] Failed to initialize:", error)
  }
}

/**
 * Hook into window unload to sync before tab close
 */
export function setupProgressSyncOnUnload(): () => void {
  if (typeof window === "undefined") return () => {}

  const handler = () => {
    void progressManager.forceSync().catch(() => {
      // Best-effort only.
    })

    void flushProgress().catch(() => {
      // Best-effort only.
    })
  }

  window.addEventListener("pagehide", handler)
  window.addEventListener("beforeunload", handler)

  return () => {
    window.removeEventListener("pagehide", handler)
    window.removeEventListener("beforeunload", handler)
  }
}
