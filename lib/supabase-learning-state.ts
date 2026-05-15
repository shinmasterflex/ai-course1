import { createClient } from "@/lib/supabase"

const COURSE_TABLE = "user_course_progress"
const MODULE_TABLE = "user_module_progress"
const SECTION_TABLE = "user_section_state"
const QUIZ_TABLE = "user_quiz_attempts"

export type CourseProgressState = {
  currentModule?: string | null
  currentSection?: string | null
  modulesCompleted?: number
  completionPercentage?: number
}

export type ModuleProgressState = {
  moduleId: string
  status: "not_started" | "in_progress" | "completed"
  sectionsCompleted: number
  totalSections: number
  quizPassed: boolean
  quizScore?: number
  quizAttempts: number
}

export type SectionState = {
  moduleId: string
  sectionId: string
  isCompleted: boolean
  timeSpentSeconds: number
  lastViewedAt?: string
}

export type QuizResultsState = Record<string, boolean>

export type QuizAttempt = {
  moduleId: string
  attemptNumber: number
  score: number
  totalQuestions: number
  passed: boolean
  answers: Record<string, string | boolean>
  attemptedAt: string
}

type SectionStateWrite = {
  moduleId: string
  sectionId: string
  isCompleted: boolean
  timeSpentSeconds?: number
  lastViewedAt?: string
}

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
      modules_completed: state.modulesCompleted ?? 0,
      completion_percentage: state.completionPercentage ?? 0,
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
    })
    .eq("user_id", userId)

  if (error) {
    throw new Error(`[Supabase] Course progress reset failed: ${error.message}`)
  }
}

export async function loadModuleProgress(moduleId: string): Promise<ModuleProgressState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(MODULE_TABLE)
    .select("module_id, status, sections_completed, total_sections, quiz_passed, quiz_score, quiz_attempts")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    moduleId: data.module_id,
    status: data.status,
    sectionsCompleted: data.sections_completed,
    totalSections: data.total_sections ?? 0,
    quizPassed: data.quiz_passed,
    quizScore: data.quiz_score ?? undefined,
    quizAttempts: data.quiz_attempts,
  }
}

export async function resetModuleProgress(moduleId?: string): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return

  const supabase = createClient()
  let query = supabase.from(MODULE_TABLE).delete().eq("user_id", userId)

  if (moduleId) {
    query = query.eq("module_id", moduleId)
  }

  const { error } = await query
  if (error) throw error
}

export async function loadSectionState(moduleId: string, sectionId: string): Promise<SectionState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(SECTION_TABLE)
    .select("module_id, section_id, is_completed, time_spent_seconds, last_viewed_at")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .eq("section_id", sectionId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    moduleId: data.module_id,
    sectionId: data.section_id,
    isCompleted: data.is_completed,
    timeSpentSeconds: data.time_spent_seconds,
    lastViewedAt: data.last_viewed_at ?? undefined,
  }
}

export async function loadAllSectionStates(moduleId?: string): Promise<SectionState[]> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return []

  const supabase = createClient()
  let query = supabase
    .from(SECTION_TABLE)
    .select("module_id, section_id, is_completed, time_spent_seconds, last_viewed_at")
    .eq("user_id", userId)

  if (moduleId) {
    query = query.eq("module_id", moduleId)
  }

  const { data, error } = await query
  if (error) throw error

  return (
    data?.map((row) => ({
      moduleId: row.module_id,
      sectionId: row.section_id,
      isCompleted: row.is_completed,
      timeSpentSeconds: row.time_spent_seconds,
      lastViewedAt: row.last_viewed_at ?? undefined,
    })) ?? []
  )
}

export async function saveSectionState(moduleId: string, sectionId: string, state: Partial<SectionState>): Promise<void> {
  await saveSectionStatesBulk([
    {
      moduleId,
      sectionId,
      isCompleted: state.isCompleted ?? false,
      timeSpentSeconds: state.timeSpentSeconds,
      lastViewedAt: state.lastViewedAt,
    },
  ])
}

export async function saveSectionStatesBulk(states: SectionStateWrite[]): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) {
    throw new Error("[Auth] Cannot save section state: user not authenticated")
  }

  if (states.length === 0) return

  const supabase = createClient()
  const now = new Date().toISOString()
  const payload = states.map((state) => ({
    user_id: userId,
    module_id: state.moduleId,
    section_id: state.sectionId,
    is_completed: state.isCompleted,
    time_spent_seconds: state.timeSpentSeconds ?? 0,
    last_viewed_at: state.lastViewedAt ?? now,
  }))

  const { error } = await supabase.from(SECTION_TABLE).upsert(payload, {
    onConflict: "user_id,module_id,section_id",
  })

  if (error) {
    throw new Error(`[Supabase] Section states bulk save failed: ${error.message}`)
  }
}

export async function resetSectionStates(moduleId?: string): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return

  const supabase = createClient()
  let query = supabase.from(SECTION_TABLE).delete().eq("user_id", userId)

  if (moduleId) {
    query = query.eq("module_id", moduleId)
  }

  const { error } = await query
  if (error) throw error
}

export async function loadQuizResults(moduleId: string): Promise<QuizResultsState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(QUIZ_TABLE)
    .select("answers")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("attempted_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data || !data.answers || typeof data.answers !== "object" || Array.isArray(data.answers)) {
    return null
  }

  const results: QuizResultsState = {}
  Object.entries(data.answers as Record<string, unknown>).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      results[key] = value
    }
  })

  return Object.keys(results).length > 0 ? results : null
}

export async function saveQuizResults(
  moduleId: string,
  results: QuizResultsState,
  options?: { score?: number; totalQuestions?: number; answers?: Record<string, string | boolean> },
): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) {
    throw new Error("[Auth] Cannot save quiz results: user not authenticated")
  }

  const passed = Object.values(results).every((value) => value === true)
  const score = options?.score ?? Object.values(results).filter(Boolean).length
  const totalQuestions = options?.totalQuestions ?? Object.keys(results).length

  const supabase = createClient()
  const currentProgress = await loadModuleProgress(moduleId)
  const attemptNumber = (currentProgress?.quizAttempts ?? 0) + 1

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

  const { error: updateError } = await supabase.from(MODULE_TABLE).upsert(
    {
      user_id: userId,
      module_id: moduleId,
      quiz_passed: passed,
      quiz_score: score,
      quiz_attempts: attemptNumber,
    },
    { onConflict: "user_id,module_id" },
  )

  if (updateError) {
    throw new Error(
      `[Supabase] Module progress update failed for module ${moduleId}: ${updateError.message}`,
    )
  }
}

export async function loadQuizAttempts(moduleId: string): Promise<QuizAttempt[]> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return []

  const supabase = createClient()
  const { data, error } = await supabase
    .from(QUIZ_TABLE)
    .select("module_id, attempt_number, score, total_questions, passed, answers, attempted_at")
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
      answers: row.answers ?? {},
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
  if (error) throw error
}

export async function resetAllLearningState(): Promise<void> {
  await Promise.all([
    resetCourseProgressState(),
    resetModuleProgress(),
    resetSectionStates(),
    resetQuizResults(),
  ])
}
