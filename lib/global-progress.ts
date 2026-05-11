/**
 * GLOBAL PROGRESS MANAGER
 * Server-first progress tracking with observer pattern and optimistic updates.
 */

import { getCourseStructure } from "./course-content"
import { createClient } from "./supabase"
import { loadCourseProgressState, resetAllLearningState, saveCourseProgressState } from "./supabase-learning-state"

const courseStructure = getCourseStructure()

type ProgressListener = () => void

class GlobalProgressManager {
  private listeners: ProgressListener[] = []
  public currentModule: string | null = null
  public currentSection: string | null = null
  private isInitialized = false
  private pendingRollbackSnapshot: string | null = null
  private lastStableSnapshot: string | null = null
  private activeUserId: string | null = null
  private authUnsubscribe: (() => void) | null = null
  // Moved from module scope so multiple instances (e.g. HMR) don't share a single timer.
  private saveTimeout: NodeJS.Timeout | null = null
  // Incremented on every user switch; in-flight syncs compare against their captured
  // generation and silently discard results that belong to a previous session.
  private initGeneration = 0

  constructor() {
    if (typeof window !== "undefined") {
      this.setupAuthListener()
      void this.init()
    }
  }

  private async init() {
    this.activeUserId = await this.getCurrentUserId()

    try {
      const savedProgress = await loadCourseProgressState()

      if (savedProgress) {
        this.mergeProgress(savedProgress)
      }
    } catch (error) {
      console.error("[Progress] Failed to load from Supabase:", error)
    }

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

  private async switchActiveUser(nextUserId: string | null) {
    this.initGeneration++ // invalidate any in-flight syncToServer calls from the previous session
    this.activeUserId = nextUserId
    this.resetInMemoryProgressState()
    await this.init()
  }

  private resetInMemoryProgressState() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
      this.saveTimeout = null
    }

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

  private createSnapshot() {
    return JSON.stringify({
      courseStructure,
      currentModule: this.currentModule,
      currentSection: this.currentSection,
    })
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
      this.notifyListeners()
      console.warn("[Progress] Rolled back optimistic progress state")
    } catch (error) {
      console.error("[Progress] Failed to rollback progress state:", error)
    }
  }

  private mergeProgress(savedProgress: unknown) {
    if (!savedProgress || typeof savedProgress !== "object") return

    const snapshot = savedProgress as Record<string, any>
    const courseSnapshot = snapshot.courseStructure
    if (!courseSnapshot || typeof courseSnapshot !== "object") return

    const modulesData = (courseSnapshot as { modules?: unknown }).modules

    if (typeof snapshot.currentModule === "string" || snapshot.currentModule === null) {
      this.currentModule = snapshot.currentModule
    }

    if (typeof snapshot.currentSection === "string" || snapshot.currentSection === null) {
      this.currentSection = snapshot.currentSection
    }

    if (Array.isArray(modulesData)) {
      const savedModulesById = new Map<string, any>()

      modulesData.forEach((savedModule) => {
        if (!savedModule || typeof savedModule !== "object") return
        if (typeof savedModule.id === "string") {
          savedModulesById.set(savedModule.id, savedModule)
        }
      })

      courseStructure.modules.forEach((module) => {
        const savedModule = savedModulesById.get(module.id)
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

  }

  setCurrentPosition(moduleId: string, sectionId: string) {
    this.currentModule = moduleId
    this.currentSection = sectionId

    this.queuePersist()
    this.notifyListeners()
  }

  markSectionComplete(moduleId: string, sectionId: string) {
    console.log("[Progress] Marking complete:", { moduleId, sectionId })
    const module = courseStructure.modules.find((m) => m.id === moduleId)
    if (module) {
      const section = module.sections.find((s) => s.id === sectionId)
      if (section) {
        const rollbackSnapshot = this.createSnapshot()
        section.completed = true
        console.log("[Progress] Section marked, triggering save")
        this.queuePersist(rollbackSnapshot)

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
        this.queuePersist(rollbackSnapshot)
        this.notifyListeners()
      }
    }
  }

  private queuePersist(rollbackSnapshot?: string) {
    console.log("[Progress] Saving optimistically")

    if (rollbackSnapshot && !this.pendingRollbackSnapshot) {
      this.pendingRollbackSnapshot = rollbackSnapshot
    }

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
    }

    this.saveTimeout = setTimeout(() => {
      console.log("[Progress] Debounce timeout fired, syncing to Supabase")
      void this.syncToServer()
    }, 1000)
  }

  private async syncToServer() {
    const generation = this.initGeneration

    if (!this.activeUserId) {
      this.lastStableSnapshot = this.createSnapshot()
      this.pendingRollbackSnapshot = null
      return
    }

    try {
      await saveCourseProgressState({
        courseStructure,
        currentModule: this.currentModule,
        currentSection: this.currentSection,
      })

      // Discard results that arrived after a user switch.
      if (this.initGeneration !== generation) return

      console.log("[Progress] Supabase sync successful")
      this.lastStableSnapshot = this.createSnapshot()
      this.pendingRollbackSnapshot = null
    } catch (error) {
      console.error("[Progress] Failed to sync to Supabase:", error)
      // Don't roll back state that belongs to the new session.
      if (this.initGeneration !== generation) return
      this.rollbackProgressState()
    }
  }

  async forceSync() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
      this.saveTimeout = null
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

    if (currentSectionIndex !== undefined && currentSectionIndex < currentModule.sections.length - 1) {
      return {
        moduleId: this.currentModule!,
        sectionId: currentModule.sections[currentSectionIndex + 1].id,
      }
    }

    if (currentModuleIndex < courseStructure.modules.length - 1) {
      const nextModule = courseStructure.modules[currentModuleIndex + 1]
      return {
        moduleId: nextModule.id,
        sectionId: nextModule.sections[0].id,
      }
    }

    return null
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

    this.resetInMemoryProgressState()
    const resetSnapshot = this.createSnapshot()
    this.lastStableSnapshot = resetSnapshot

    await resetAllLearningState()
    await this.syncToServer()
    this.notifyListeners()
  }

  getCourseStructure() {
    return courseStructure
  }

  async waitForInitialization() {
    if (this.isInitialized) return

    return new Promise<void>((resolve) => {
      const checkInit = () => {
        if (this.isInitialized) {
          resolve()
        } else {
          setTimeout(checkInit, 50)
        }
      }
      checkInit()
    })
  }
}

export const progressManager = new GlobalProgressManager()