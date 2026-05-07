/**
 * GLOBAL PROGRESS MANAGER
 * Server-first progress tracking with observer pattern and optimistic updates
 * API is the source of truth; in-memory state synced via debounced API calls
 */

import { courseStructure } from "./course-content"
import { createClient } from "./supabase"

const STORAGE_KEY = "cognijin_progress"
const POSITION_KEY = "cognijin_position"
const ACTIVE_USER_KEY = "cognijin_active_user"
const LEGACY_STORAGE_KEY = "cognijin_progress"
const LEGACY_POSITION_KEY = "cognijin_position"

type ProgressListener = () => void

let saveTimeout: NodeJS.Timeout | null = null

class GlobalProgressManager {
  private listeners: ProgressListener[] = []
  public currentModule: string | null = null
  public currentSection: string | null = null
  private isInitialized = false
  private pendingRollbackSnapshot: string | null = null
  private lastStableSnapshot: string | null = null
  private activeUserId: string | null = null
  private authUnsubscribe: (() => void) | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.setupAuthListener()
      this.init()
    }
  }

  private async init() {
    this.activeUserId = await this.getCurrentUserId()
    localStorage.setItem(ACTIVE_USER_KEY, this.activeUserId ? this.activeUserId : "anonymous")
    this.migrateLegacyKeys()

    const savedProgress = localStorage.getItem(this.getScopedStorageKey(STORAGE_KEY))

    if (savedProgress) {
      try {
        this.mergeProgress(JSON.parse(savedProgress))
      } catch (error) {
        console.error("[Progress] Failed to parse cached progress:", error)
      }
    }

    try {
      // Load from server first
      const response = await fetch("/api/progress", {
        method: "GET",
        credentials: "same-origin",
      })

      if (response.ok) {
        const data = await response.json()
        const serverProgress = data.progress

        if (serverProgress?.modules) {
          this.mergeProgress({ modules: serverProgress.modules })
        }
      }
    } catch (error) {
      console.error("[Progress] Failed to load from server, using cache:", error)
    }

    // Load current position from localStorage (not critical for server sync)
    this.loadCurrentPosition()
    this.lastStableSnapshot = this.createSnapshot()
    this.isInitialized = true
    this.notifyListeners()
  }

  private setupAuthListener() {
    const supabase = createClient()
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUserId = session?.user?.id ? session.user.id : null
      if (nextUserId !== this.activeUserId) {
        void this.switchActiveUser(nextUserId)
      }
    })

    this.authUnsubscribe = () => {
      data.subscription.unsubscribe()
    }
  }

  private async getCurrentUserId(): Promise<string | null> {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      return user?.id ? user.id : null
    } catch {
      return null
    }
  }

  private getScopedStorageKey(baseKey: string): string {
    return `${baseKey}:${this.activeUserId ? this.activeUserId : "anonymous"}`
  }

  private migrateLegacyKeys() {
    const scopedProgressKey = this.getScopedStorageKey(STORAGE_KEY)
    const scopedPositionKey = this.getScopedStorageKey(POSITION_KEY)

    const legacyProgress = localStorage.getItem(LEGACY_STORAGE_KEY)
    const legacyPosition = localStorage.getItem(LEGACY_POSITION_KEY)

    if (legacyProgress && !localStorage.getItem(scopedProgressKey)) {
      localStorage.setItem(scopedProgressKey, legacyProgress)
      localStorage.removeItem(LEGACY_STORAGE_KEY)
    }

    if (legacyPosition && !localStorage.getItem(scopedPositionKey)) {
      localStorage.setItem(scopedPositionKey, legacyPosition)
      localStorage.removeItem(LEGACY_POSITION_KEY)
    }
  }

  private resetInMemoryProgressState() {
    courseStructure.modules.forEach((module) => {
      module.status = "not-started"
      module.completionRate = 0
      module.sections.forEach((section) => {
        section.completed = false
      })
    })

    this.currentModule = null
    this.currentSection = null
    this.pendingRollbackSnapshot = null
    this.lastStableSnapshot = null
  }

  private async switchActiveUser(nextUserId: string | null) {
    this.activeUserId = nextUserId
    localStorage.setItem(ACTIVE_USER_KEY, this.activeUserId ? this.activeUserId : "anonymous")
    this.migrateLegacyKeys()
    this.resetInMemoryProgressState()
    await this.init()
  }

  private createSnapshot() {
    return JSON.stringify(courseStructure)
  }

  private rollbackProgressState() {
    const rollbackSnapshot = this.pendingRollbackSnapshot ? this.pendingRollbackSnapshot : this.lastStableSnapshot
    this.pendingRollbackSnapshot = null

    if (!rollbackSnapshot) {
      console.warn("[Progress] Sync failed and no rollback snapshot was available")
      return
    }

    try {
      this.mergeProgress(JSON.parse(rollbackSnapshot))
      localStorage.setItem(this.getScopedStorageKey(STORAGE_KEY), rollbackSnapshot)
      this.notifyListeners()
      console.warn("[Progress] Rolled back optimistic progress state")
    } catch (error) {
      console.error("[Progress] Failed to rollback progress state:", error)
    }
  }

  private mergeProgress(savedProgress: any) {
    if (!savedProgress || typeof savedProgress !== "object") return

    const modulesData = savedProgress.modules

    if (Array.isArray(modulesData)) {
      const savedModulesBySlug = new Map<string, any>()
      const savedModulesById = new Map<string, any>()

      modulesData.forEach((savedModule) => {
        if (!savedModule || typeof savedModule !== "object") return
        if (typeof savedModule.slug === "string") {
          savedModulesBySlug.set(savedModule.slug, savedModule)
        }
        if (typeof savedModule.id === "string") {
          savedModulesById.set(savedModule.id, savedModule)
        }
      })

      courseStructure.modules.forEach((module) => {
        const savedModule = savedModulesBySlug.get(module.slug) ? savedModulesBySlug.get(module.slug) : savedModulesById.get(module.id)
        if (!savedModule) return

        if (typeof savedModule.status === "string") {
          module.status = savedModule.status
        }

        if (typeof savedModule.completionRate === "number" && !isNaN(savedModule.completionRate)) {
          module.completionRate = Math.min(Math.max(savedModule.completionRate, 0), 100)
        }

        if (Array.isArray(savedModule.sections)) {
          const completedById = new Map<string, boolean>()

          savedModule.sections.forEach((savedSection: any) => {
            if (
              savedSection &&
              typeof savedSection === "object" &&
              typeof savedSection.id === "string" &&
              typeof savedSection.completed === "boolean"
            ) {
              completedById.set(savedSection.id, savedSection.completed)
            }
          })

          module.sections.forEach((section) => {
            const completed = completedById.get(section.id)
            if (typeof completed === "boolean") {
              section.completed = completed
            }
          })
        }
      })

      return
    }

    if (!modulesData || typeof modulesData !== "object") return

    courseStructure.modules.forEach((module) => {
      // Look up by module slug from the API response
      const savedModule = savedProgress.modules?.[module.slug]

      if (savedModule) {
        // Update module completion from API
        module.status = typeof savedModule.status === 'string' ? savedModule.status : 'not-started'
        
        const rawCompletionRate = typeof savedModule.completionRate === 'number' && !isNaN(savedModule.completionRate)
          ? savedModule.completionRate
          : 0
        module.completionRate = Math.min(Math.max(rawCompletionRate, 0), 100)

        const hasAnyCompletedSection = module.sections.some((section) => section.completed)
        const targetCompletedSections = Math.max(
          0,
          Math.min(
            module.sections.length,
            Math.round((module.completionRate / 100) * module.sections.length),
          ),
        )

        if (!hasAnyCompletedSection && targetCompletedSections > 0) {
          module.sections.forEach((section, index) => {
            section.completed = index < targetCompletedSections
          })
        }
      }
    })
  }

  private loadCurrentPosition() {
    const saved = localStorage.getItem(this.getScopedStorageKey(POSITION_KEY))
    if (saved) {
      const { moduleId, sectionId } = JSON.parse(saved)
      this.currentModule = moduleId
      this.currentSection = sectionId
    }
  }

  setCurrentPosition(moduleId: string, sectionId: string) {
    this.currentModule = moduleId
    this.currentSection = sectionId

    localStorage.setItem(this.getScopedStorageKey(POSITION_KEY), JSON.stringify({ moduleId, sectionId }))
    this.notifyListeners()
  }

  markSectionComplete(moduleId: string, sectionId: string) {
    console.log('[Progress] Marking complete:', { moduleId, sectionId })
    const module = courseStructure.modules.find((m) => m.id === moduleId)
    if (module) {
      const section = module.sections.find((s) => s.id === sectionId)
      if (section) {
        const rollbackSnapshot = this.createSnapshot()
        section.completed = true
        console.log('[Progress] Section marked, triggering save')
        this.saveProgressOptimistic(rollbackSnapshot)

        const isModuleNowComplete = module.sections.length > 0 && module.sections.every((moduleSection) => moduleSection.completed)
        if (isModuleNowComplete) {
          void this.forceSync()
        }

        this.notifyListeners()
      }
    }
  }

  markSectionIncomplete(moduleId: string, sectionId: string) {
    const module = courseStructure.modules.find((m) => m.id === moduleId)
    if (module) {
      const section = module.sections.find((s) => s.id === sectionId)
      if (section) {
        const rollbackSnapshot = this.createSnapshot()
        section.completed = false
        this.saveProgressOptimistic(rollbackSnapshot)
        this.notifyListeners()
      }
    }
  }

  private saveProgressOptimistic(rollbackSnapshot?: string) {
    console.log('[Progress] Saving optimistically')

    if (rollbackSnapshot && !this.pendingRollbackSnapshot) {
      this.pendingRollbackSnapshot = rollbackSnapshot
    }

    // Optimistic: immediately save to localStorage
    localStorage.setItem(this.getScopedStorageKey(STORAGE_KEY), JSON.stringify(courseStructure))

    // Debounce server sync
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    saveTimeout = setTimeout(() => {
      console.log('[Progress] Debounce timeout fired, syncing to server')
      this.syncToServer()
    }, 1000)
  }

  private async syncToServer() {
    try {
      // Transform course structure to module-level progress
      const modules: Record<
        string,
        {
          status: string
          completionRate: number
        }
      > = {}

      courseStructure.modules.forEach((module) => {
        const completedCount = module.sections.filter((s) => s.completed).length

        const completionRate =
          module.sections.length > 0
            ? Math.round((completedCount / module.sections.length) * 100)
            : 0

        const status =
          completionRate === 0
            ? "not-started"
            : completionRate === 100
              ? "completed"
              : "in-progress"

        modules[module.slug] = { status, completionRate }
      })

      console.log('[Progress] Syncing to server with payload:', { progress: { modules } })

      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ progress: { modules } }),
      })

      console.log('[Progress] Server response:', { status: response.status, ok: response.ok })
      let responseData: unknown = null
      const responseText = await response.text()

      if (responseText) {
        try {
          responseData = JSON.parse(responseText)
        } catch {
          responseData = responseText
        }
      }

      console.log('[Progress] Server response data:', responseData)

      if (!response.ok) {
        console.error("[Progress] Server sync failed:", response.status, responseData)
        this.rollbackProgressState()
      } else {
        console.log('[Progress] Server sync successful')
        this.lastStableSnapshot = this.createSnapshot()
        this.pendingRollbackSnapshot = null
        localStorage.setItem(this.getScopedStorageKey(STORAGE_KEY), this.lastStableSnapshot)
      }
    } catch (error) {
      console.error("[Progress] Failed to sync to server:", error)
      this.rollbackProgressState()
    }
  }

  async forceSync() {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
      saveTimeout = null
    }
    await this.syncToServer()
  }

  getModuleProgress(moduleId: string): number {
    const module = courseStructure.modules.find((m) => m.id === moduleId)
    if (!module) return 0

    const completed = module.sections.filter((s) => s.completed).length
    const total = module.sections.length
    return Math.round((completed / total) * 100)
  }

  getOverallProgress(): number {
    let totalSections = 0
    let completedSections = 0

    courseStructure.modules.forEach((module) => {
      totalSections += module.sections.length
      completedSections += module.sections.filter((s) => s.completed).length
    })

    return Math.round((completedSections / totalSections) * 100)
  }

  getCompletedSections(moduleId: string): string[] {
    const module = courseStructure.modules.find((m) => m.id === moduleId)
    if (!module) return []

    return module.sections.filter((s) => s.completed).map((s) => s.id)
  }

  getNextSection(): { moduleId: string; sectionId: string } | null {
    const currentModuleIndex = courseStructure.modules.findIndex((m) => m.id === this.currentModule)
    const currentModule = courseStructure.modules[currentModuleIndex]
    const currentSectionIndex = currentModule?.sections.findIndex((s) => s.id === this.currentSection)

    // Next section in current module
    if (currentSectionIndex !== undefined && currentSectionIndex < currentModule.sections.length - 1) {
      return {
        moduleId: this.currentModule!,
        sectionId: currentModule.sections[currentSectionIndex + 1].id,
      }
    }

    // First section of next module
    if (currentModuleIndex < courseStructure.modules.length - 1) {
      const nextModule = courseStructure.modules[currentModuleIndex + 1]
      return {
        moduleId: nextModule.id,
        sectionId: nextModule.sections[0].id,
      }
    }

    return null // Course complete
  }

  subscribe(callback: ProgressListener) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((callback) => callback())
  }

  async resetProgress() {
    if (typeof window === "undefined") return

    localStorage.removeItem(this.getScopedStorageKey(STORAGE_KEY))
    localStorage.removeItem(this.getScopedStorageKey(POSITION_KEY))

    // Reset in-memory structure
    courseStructure.modules.forEach((module) => {
      module.status = "not-started"
      module.completionRate = 0
      module.sections.forEach((section) => {
        section.completed = false
      })
    })

    this.currentModule = null
    this.currentSection = null

    const resetSnapshot = this.createSnapshot()
    this.pendingRollbackSnapshot = null
    this.lastStableSnapshot = resetSnapshot
    localStorage.setItem(this.getScopedStorageKey(STORAGE_KEY), resetSnapshot)

    // Sync reset to server
    await this.syncToServer()
    this.notifyListeners()
  }

  getCourseStructure() {
    return courseStructure
  }

  async waitForInitialization() {
    if (this.isInitialized) return
    
    // Poll until initialized (with timeout)
    const maxWait = 5000
    const startTime = Date.now()
    
    while (!this.isInitialized && Date.now() - startTime < maxWait) {
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
}

export const progressManager = new GlobalProgressManager()

export const GlobalProgress = progressManager

