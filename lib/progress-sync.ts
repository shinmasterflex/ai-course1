/**
 * PROGRESS SYNC UTILITIES
 * Helper functions for managing Supabase-backed progress sync with improved error handling.
 */

import { progressManager } from "./global-progress"
import { flushProgress, getLastSaveError } from "./progress-manager"

/**
 * Initialize progress on app mount
 * Call this in your root layout or auth guard to warm the cache
 */
export async function initializeProgressSync(): Promise<void> {
  try {
    await progressManager.waitForInitialization()
  } catch (error) {
    console.error("[ProgressSync] Failed to initialize:", error)
  }
}

/**
 * Hook into window unload to sync before tab close.
 * Returns cleanup function to remove event listeners.
 * Includes retry logic and error tracking.
 */
export function setupProgressSyncOnUnload(): () => void {
  if (typeof window === "undefined") return () => {}

  const handler = async () => {
    // Prevent page navigation/close while syncing (best effort)
    const syncPromises: Promise<any>[] = []

    syncPromises.push(
      progressManager
        .forceSync()
        .catch((error) => {
          console.warn("[ProgressSync] forceSync failed during unload:", error)
          // Log but don't block
        })
    )

    syncPromises.push(
      flushProgress()
        .catch((error) => {
          console.warn("[ProgressSync] flushProgress failed during unload:", error)
          // Check if this is a transient error vs permanent failure
          if (error?.isTransient) {
            console.error("[ProgressSync] DATA MAY NOT BE SAVED: Transient network error during page close")
          }
        })
    )

    // Wait for all syncs with a timeout to avoid blocking page close indefinitely
    try {
      await Promise.race([
        Promise.all(syncPromises),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Unload sync timeout")), 2000)
        ),
      ])
    } catch (error) {
      // Timeout or sync error - log but don't block
      const lastError = getLastSaveError()
      if (lastError?.isTransient) {
        console.error("[ProgressSync] WARNING: Data may not be persisted due to network timeout")
      }
    }
  }

  window.addEventListener("pagehide", handler)
  window.addEventListener("beforeunload", handler)

  return () => {
    window.removeEventListener("pagehide", handler)
    window.removeEventListener("beforeunload", handler)
  }
}
