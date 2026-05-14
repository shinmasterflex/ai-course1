import { createClient } from "@/lib/supabase"

const COURSE_SLUG = "ai-course"
const COURSE_TABLE = "user_course_progress"
const MODULE_TABLE = "user_module_progress"
const SECTION_TABLE = "user_section_state"
const QUIZ_TABLE = "user_quiz_attempts"

// Module enrollment tracking
export type CourseEnrollment = {
  userId: string
  hasEnrolled: boolean
  hasPaid: boolean
  enrolledAt: string
}

// Normalized course-level progress
export type CourseProgressState = {
  currentModule?: string | null
  currentSection?: string | null
  modulesCompleted?: number
  completionPercentage?: number
}

// Normalized module-level progress
export type ModuleProgressState = {
  moduleId: string
  status: "not_started" | "in_progress" | "completed"
  sectionsCompleted: number
  totalSections: number
  quizPassed: boolean
  quizScore?: number
  quizAttempts: number
}

// Normalized section-level state
export type SectionState = {
  moduleId: string
  sectionId: string
  isCompleted: boolean
  timeSpentSeconds: number
  lastViewedAt?: string
}

// Quiz attempt record
export type QuizAttempt = {
  moduleId: string
  attemptNumber: number
  score: number
  totalQuestions: number
  passed: boolean
  answers: Record<string, string>
  attemptedAt: string
}

// Legacy type for backward compatibility
export type QuizResultsState = Record<string, boolean>

async function getAuthenticatedUserId(): Promise<string | null> {
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

export async function loadCourseProgressState(): Promise<CourseProgressState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(COURSE_TABLE)
    .select("current_module, current_section, modules_completed, completion_percentage")
    .eq("user_id", userId)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) return null

  return {
    currentModule: data.current_module,
    currentSection: data.current_section,
    modulesCompleted: data.modules_completed,
    completionPercentage: data.completion_percentage,
  }
}

export async function saveCourseProgressState(state: CourseProgressState): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) {
    throw new Error("[Auth] Cannot save course progress: user not authenticated")
  }

  const supabase = createClient()
  const { error } = await supabase.from(COURSE_TABLE).upsert(
    {
      user_id: userId,
      current_module: state.currentModule,
      current_section: state.currentSection,
      modules_completed: state.modulesCompleted,
      completion_percentage: state.completionPercentage,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  )

  if (error) {
    throw new Error(`[Supabase] Course progress save failed: ${error.message}`)
  }
}

export async function resetCourseProgressState(): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return

  const supabase = createClient()
  const { error } = await supabase
    .from(COURSE_TABLE)
    .update({
      current_module: null,
      current_section: null,
      modules_completed: 0,
      completion_percentage: 0,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)

  if (error) {
    throw new Error(`[Supabase] Course progress reset failed: ${error.message}`)
  }
}

// DEPRECATED: Legacy section progress API (uses JSONB, kept for backward compatibility)
export async function loadSectionProgressState() {
  console.warn(
    "[Deprecation] loadSectionProgressState() uses legacy JSONB model. Use loadModuleProgress() instead.",
  )
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  // For now, return null to trigger migration
  return null
}

export async function saveSectionProgressState() {
  console.warn(
    "[Deprecation] saveSectionProgressState() uses legacy JSONB model. Use saveModuleProgress() instead.",
  )
  return
}

export async function resetSectionProgressState() {
  console.warn(
    "[Deprecation] resetSectionProgressState() uses legacy JSONB model. Use saveModuleProgress() instead.",
  )
  return
}

// NEW: Normalized module progress API
export async function loadModuleProgress(moduleId: string): Promise<ModuleProgressState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(MODULE_TABLE)
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    moduleId: data.module_id,
    status: data.status,
    sectionsCompleted: data.sections_completed || 0,
    totalSections: data.total_sections || 0,
    quizPassed: data.quiz_passed || false,
    quizScore: data.quiz_score,
    quizAttempts: data.quiz_attempts || 0,
  }
}

// NEW: Normalized section state API
export async function loadSectionState(moduleId: string, sectionId: string): Promise<SectionState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(SECTION_TABLE)
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .eq("section_id", sectionId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    moduleId: data.module_id,
    sectionId: data.section_id,
    isCompleted: data.is_completed || false,
    timeSpentSeconds: data.time_spent_seconds || 0,
    lastViewedAt: data.last_viewed_at,
  }
}

export async function saveSectionState(moduleId: string, sectionId: string, state: Partial<SectionState>): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) {
    throw new Error("[Auth] Cannot save section state: user not authenticated")
  }

  const supabase = createClient()
  const { error } = await supabase.from(SECTION_TABLE).upsert(
    {
      user_id: userId,
      module_id: moduleId,
      section_id: sectionId,
      is_completed: state.isCompleted,
      time_spent_seconds: state.timeSpentSeconds,
      last_viewed_at: state.lastViewedAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id,section_id" },
  )

  if (error) {
    throw new Error(`[Supabase] Section state save failed: ${error.message}`)
  }
}

// Backward compat: Load quiz results (legacy boolean records)
// Returns whether specific quiz keys were passed (true/false)
export async function loadQuizResults(moduleId: string): Promise<QuizResultsState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(QUIZ_TABLE)
    .select("passed, answers")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("attempted_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) return null

  // Convert legacy format: answers object keys become passed/failed booleans
  const results: QuizResultsState = {}
  if (data.answers && typeof data.answers === "object") {
    Object.keys(data.answers).forEach((key) => {
      results[key] = data.passed ?? false
    })
  }

  return results
}

// Save quiz attempt with normalized structure
export async function saveQuizResults(
  moduleId: string,
  results: QuizResultsState,
  options?: { score?: number; totalQuestions?: number; answers?: Record<string, string> },
): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) {
    throw new Error("[Auth] Cannot save quiz results: user not authenticated")
  }

  // Determine if quiz passed (all answers in results are true)
  const passed = Object.values(results).every((value) => value === true)
  const score = options?.score ?? (passed ? 100 : 0)
  const totalQuestions = options?.totalQuestions ?? Object.keys(results).length

  const supabase = createClient()

  // First, increment attempt counter in user_module_progress
  const currentProgress = await loadModuleProgress(moduleId)
  const attemptNumber = (currentProgress?.quizAttempts ?? 0) + 1

  // Save quiz attempt
  const { error: saveError } = await supabase.from(QUIZ_TABLE).insert({
    user_id: userId,
    module_id: moduleId,
    attempt_number: attemptNumber,
    score,
    total_questions: totalQuestions,
    passed,
    answers: options?.answers ?? results,
  })

  if (saveError) {
    throw new Error(`[Supabase] Quiz attempt save failed for module ${moduleId}: ${saveError.message}`)
  }

  // Update module progress with quiz result
  const { error: updateError } = await supabase.from(MODULE_TABLE).upsert(
    {
      user_id: userId,
      module_id: moduleId,
      quiz_passed: passed,
      quiz_score: score,
      quiz_attempts: attemptNumber,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id" },
  )

  if (updateError) {
    throw new Error(
      `[Supabase] Module progress update failed for module ${moduleId}: ${updateError.message}`,
    )
  }
}

// NEW: Load all quiz attempts for a module
export async function loadQuizAttempts(moduleId: string): Promise<QuizAttempt[]> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return []

  const supabase = createClient()
  const { data, error } = await supabase
    .from(QUIZ_TABLE)
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("attempted_at", { ascending: false })

  if (error) {
    throw error
  }

  return (
    data?.map((row) => ({
      moduleId: row.module_id,
      attemptNumber: row.attempt_number,
      score: row.score,
      totalQuestions: row.total_questions,
      passed: row.passed,
      answers: row.answers || {},
      attemptedAt: row.attempted_at,
    })) ?? []
  )
}

export async function resetQuizResults(moduleId?: string): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return

  const supabase = createClient()
  let query = supabase.from(QUIZ_TABLE).delete().eq("user_id", userId)

  if (moduleId) {
    query = query.eq("module_id", moduleId)
  }

  const { error } = await query

  if (error) {
    throw error
  }
}

export async function resetAllLearningState(): Promise<void> {
  await Promise.all([resetCourseProgressState(), resetSectionProgressState(), resetQuizResults()])
}
