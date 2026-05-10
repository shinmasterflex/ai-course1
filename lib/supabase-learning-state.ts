import { createClient } from "@/lib/supabase"

const COURSE_SLUG = "swift-course"
const COURSE_TABLE = "user_course_progress_snapshots"
const SECTION_TABLE = "user_section_progress_states"
const QUIZ_TABLE = "user_module_quiz_results"

export type CourseProgressState = {
  courseStructure?: unknown
  currentModule?: string | null
  currentSection?: string | null
}

export type SectionProgressState = {
  modules?: Record<
    string,
    {
      completedSections?: number[]
      currentSection?: number
      lastUpdated?: string
    }
  >
  version?: string
}

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

async function upsertStateRow(table: string, userId: string, payload: Record<string, unknown>, onConflict: string) {
  // userId is resolved by the caller once; we use it directly to avoid a second auth round-trip.
  const supabase = createClient()
  const { error } = await supabase.from(table).upsert(payload, { onConflict })

  if (error) {
    throw error
  }
}

async function loadStateRow<T extends Record<string, unknown>>(
  table: string,
  filters: Record<string, string>,
): Promise<T | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  let query = supabase.from(table).select("state")

  Object.entries(filters).forEach(([column, value]) => {
    query = query.eq(column, value)
  })

  const { data, error } = await query.maybeSingle()

  if (error) {
    throw error
  }

  const state = data?.state
  if (!state || typeof state !== "object" || Array.isArray(state)) {
    return null
  }

  return state as T
}

async function deleteStateRow(table: string, filters: Record<string, string>) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return

  const supabase = createClient()
  let query = supabase.from(table).delete()

  Object.entries(filters).forEach(([column, value]) => {
    query = query.eq(column, value)
  })

  const { error } = await query

  if (error) {
    throw error
  }
}

export async function loadCourseProgressState(): Promise<CourseProgressState | null> {
  return loadStateRow<CourseProgressState>(COURSE_TABLE, { course_slug: COURSE_SLUG })
}

export async function saveCourseProgressState(state: CourseProgressState): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return
  await upsertStateRow(
    COURSE_TABLE,
    userId,
    {
      user_id: userId,
      course_slug: COURSE_SLUG,
      state,
    },
    "user_id,course_slug",
  )
}

export async function resetCourseProgressState(): Promise<void> {
  await deleteStateRow(COURSE_TABLE, { course_slug: COURSE_SLUG })
}

export async function loadSectionProgressState(): Promise<SectionProgressState | null> {
  return loadStateRow<SectionProgressState>(SECTION_TABLE, { state_key: "default" })
}

export async function saveSectionProgressState(state: SectionProgressState): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return
  await upsertStateRow(
    SECTION_TABLE,
    userId,
    {
      user_id: userId,
      state_key: "default",
      state,
    },
    "user_id,state_key",
  )
}

export async function resetSectionProgressState(): Promise<void> {
  await deleteStateRow(SECTION_TABLE, { state_key: "default" })
}

export async function loadQuizResults(moduleId: string): Promise<QuizResultsState | null> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return null

  const supabase = createClient()
  const { data, error } = await supabase
    .from(QUIZ_TABLE)
    .select("results")
    .eq("module_id", moduleId)
    .maybeSingle()

  if (error) {
    throw error
  }

  const results = data?.results
  if (!results || typeof results !== "object" || Array.isArray(results)) {
    return null
  }

  return results as QuizResultsState
}

export async function saveQuizResults(moduleId: string, results: QuizResultsState): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return

  const completed = Object.values(results).every((value) => value === true)
  const supabase = createClient()
  const { error } = await supabase.from(QUIZ_TABLE).upsert(
    {
      user_id: userId,
      module_id: moduleId,
      results,
      completed,
    },
    {
      onConflict: "user_id,module_id",
    },
  )

  if (error) {
    throw error
  }
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
