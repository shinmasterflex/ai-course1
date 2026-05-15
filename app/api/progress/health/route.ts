import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSupabasePublishableKey, getSupabaseUrl } from '@/lib/supabase-env'

export const runtime = 'nodejs'

function maskConnectionHost(connectionString: string): string {
  try {
    const url = new URL(connectionString)
    return `${url.protocol}//${url.hostname}:${url.port}`
  } catch {
    return 'invalid'
  }
}

export async function GET() {
  const checks = {
    nodeEnv: process.env.NODE_ENV,
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    databaseHost: process.env.DATABASE_URL ? maskConnectionHost(process.env.DATABASE_URL) : 'missing',
    hasSupabaseUrl: false,
    hasSupabasePublishableKey: false,
    prismaQueryOk: false,
    prismaError: null as string | null,
    learningStateTables: {
      userCourseProgress: false,
      userModuleProgress: false,
      userSectionState: false,
      userQuizAttempts: false,
    },
    tablesError: null as string | null,
  }

  try {
    const url = getSupabaseUrl()
    checks.hasSupabaseUrl = Boolean(url)
  } catch {
    checks.hasSupabaseUrl = false
  }

  try {
    const key = getSupabasePublishableKey()
    checks.hasSupabasePublishableKey = Boolean(key)
  } catch {
    checks.hasSupabasePublishableKey = false
  }

  try {
    await prisma.$queryRaw`SELECT 1`
    checks.prismaQueryOk = true
  } catch (error) {
    checks.prismaQueryOk = false
    checks.prismaError = error instanceof Error ? error.message : 'Unknown Prisma error'
  }

  // Check for learning state tables
  try {
    const tables = await prisma.$queryRaw<any[]>`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN (
        'user_course_progress', 
        'user_module_progress',
        'user_section_state',
        'user_quiz_attempts'
      )
    `
    const tableNames = new Set(tables.map((t) => t.table_name))
    checks.learningStateTables.userCourseProgress = tableNames.has('user_course_progress')
    checks.learningStateTables.userModuleProgress = tableNames.has('user_module_progress')
    checks.learningStateTables.userSectionState = tableNames.has('user_section_state')
    checks.learningStateTables.userQuizAttempts = tableNames.has('user_quiz_attempts')
  } catch (error) {
    checks.tablesError = error instanceof Error ? error.message : 'Unknown error checking tables'
  }

  const ok =
    checks.hasDatabaseUrl &&
    checks.hasSupabaseUrl &&
    checks.hasSupabasePublishableKey &&
    checks.prismaQueryOk &&
    Object.values(checks.learningStateTables).every((v) => v === true)

  return NextResponse.json(
    {
      ok,
      checks,
    },
    { status: ok ? 200 : 500 }
  )
}
