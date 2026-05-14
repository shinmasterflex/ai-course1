/**
 * DATABASE INITIALIZATION
 * Verifies database connection and learning state schema on app boot
 * Provides migration status and recommendations
 */

import { prisma } from '@/lib/prisma'

export type DatabaseHealthStatus = {
  isConnected: boolean
  learningStateReady: boolean
  missingTables: string[]
  errors: string[]
}

/**
 * Verify database connection and learning state tables exist
 * Called on app initialization (before rendering pages)
 */
export async function verifyDatabaseHealth(): Promise<DatabaseHealthStatus> {
  const status: DatabaseHealthStatus = {
    isConnected: false,
    learningStateReady: false,
    missingTables: [],
    errors: [],
  }

  try {
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`
    status.isConnected = true
  } catch (error) {
    status.errors.push(
      error instanceof Error ? error.message : 'Failed to connect to database'
    )
    return status
  }

  // Check for required learning state tables
  const requiredTables = [
    'user_course_enrollments',
    'user_course_progress',
    'user_module_progress',
    'user_section_state',
    'user_quiz_attempts',
  ]

  try {
    const existingTables = await prisma.$queryRaw<
      Array<{ table_name: string }>
    >`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN (${requiredTables.join(',')})
    `

    const existingTableNames = new Set(existingTables.map((t) => t.table_name))
    const missing = requiredTables.filter((t) => !existingTableNames.has(t))

    if (missing.length > 0) {
      status.missingTables = missing
      status.errors.push(
        `Missing learning state tables: ${missing.join(', ')}. ` +
        `Run 'npx prisma migrate deploy' or initialize from supabase/initial.sql`
      )
    } else {
      status.learningStateReady = true
    }
  } catch (error) {
    status.errors.push(
      error instanceof Error
        ? error.message
        : 'Failed to check learning state tables'
    )
  }

  return status
}

/**
 * Log database health on app startup (useful for debugging)
 */
export async function logDatabaseHealth(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    return // Don't log verbose details in production
  }

  try {
    const health = await verifyDatabaseHealth()

    if (health.isConnected) {
      console.log('[Database] ✓ Connection healthy')
    } else {
      console.error('[Database] ✗ Connection failed')
    }

    if (health.learningStateReady) {
      console.log('[Database] ✓ Learning state schema ready')
    } else if (health.missingTables.length > 0) {
      console.warn('[Database] ⚠ Missing tables:', health.missingTables)
    }

    health.errors.forEach((error) => {
      console.error('[Database] Error:', error)
    })
  } catch (error) {
    console.error('[Database] Failed to check health:', error)
  }
}
