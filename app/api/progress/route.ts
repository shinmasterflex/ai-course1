import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { prisma } from '@/lib/prisma'
import { courseStructure } from '@/lib/course-content'

export const runtime = 'nodejs'

function generateId(): string {
  return crypto.randomUUID()
}

/**
 * PROGRESS API - Module-Level Progress Tracking
 * Uses Prisma Progress model (status + completionRate per module)
 * Source of truth: Database, not JSON snapshots
 */

interface ProgressBody {
  modules?: Record<
    string,
    {
      status?: string
      completionRate?: number
    }
  >
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function getAuthenticatedUser() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null }
  }

  const normalizedEmail = typeof user.email === 'string' ? user.email.trim().toLowerCase() : ''
  if (!normalizedEmail) {
    return { user: null }
  }

  // Ensure user exists in DB
  await prisma.users.upsert({
    where: { id: user.id },
    update: {
      email: normalizedEmail,
      updatedAt: new Date(),
    },
    create: {
      id: user.id,
      email: normalizedEmail,
      updatedAt: new Date(),
    },
  })

  return { user }
}

export async function GET() {
  try {
    const { user } = await getAuthenticatedUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Load all module progress for this user from database
    const progressRecords = await prisma.progress.findMany({
      where: { userId: user.id },
      include: { module: true },
    })

    // Transform to API format: { modules: { "module-slug": { status, completionRate }, ... } }
    const modules: Record<
      string,
      { status: string; completionRate: number }
    > = {}

    for (const record of progressRecords) {
      if (record.module?.id && record.module?.slug) {
        modules[record.module.slug] = {
          status: record.status,
          completionRate: record.completionRate,
        }
      }
    }

    return NextResponse.json({
      progress: { modules, version: '1.0' },
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    const errorId = `progress-get-${Date.now()}`
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Progress API] Failed to load progress:', {
      errorId,
      message,
      error,
    })
    return NextResponse.json({ error: 'Failed to load progress', errorId, message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  return saveProgress(request)
}

export async function POST(request: NextRequest) {
  return saveProgress(request)
}

async function saveProgress(request: NextRequest) {
  try {
    const { user } = await getAuthenticatedUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => null)

    if (!body || !isRecord(body) || !isRecord(body.progress) || !isRecord(body.progress.modules)) {
      return NextResponse.json(
        {
          error:
            'Invalid payload. Expected shape: { progress: { modules: { moduleSlug: { status, completionRate } } } }',
        },
        { status: 400 }
      )
    }

    const progressBody = body.progress as ProgressBody
    const moduleUpdates = progressBody.modules as Record<
      string,
      {
        status?: string
        completionRate?: number
      }
    >
    const moduleSlugs = Object.keys(moduleUpdates)

    if (moduleSlugs.length === 0) {
      return NextResponse.json({ success: true, upserted: 0 })
    }

    // Get existing modules by slug, then auto-provision any missing modules.
    const existingModules = await prisma.modules.findMany({
      where: {
        slug: {
          in: moduleSlugs,
        },
      },
    })

    const modulesBySlug = new Map<string, (typeof existingModules)[number]>()

    for (const moduleRecord of existingModules) {
      modulesBySlug.set(moduleRecord.slug, moduleRecord)
    }

    const missingSlugs: string[] = []

    for (const slug of moduleSlugs) {
      if (!modulesBySlug.has(slug)) {
        missingSlugs.push(slug)
      }
    }

    if (missingSlugs.length > 0) {
      const course = await prisma.courses.upsert({
        where: { slug: 'swift-course' },
        update: { updatedAt: new Date() },
        create: {
          id: generateId(),
          title: 'Cognijin Course',
          slug: 'swift-course',
          description: 'Auto-created by progress API to persist module progress.',
          updatedAt: new Date(),
        },
      })

      const definitionBySlug = new Map(
        courseStructure.modules.map((moduleDefinition, index) => [
          moduleDefinition.slug,
          {
            title: moduleDefinition.title,
            order: index,
          },
        ])
      )

      for (const missingSlug of missingSlugs) {
        const definition = definitionBySlug.get(missingSlug)
        if (!definition) {
          return NextResponse.json(
            { error: `Unknown module slug: ${missingSlug}` },
            { status: 400 }
          )
        }

        const moduleRecord = await prisma.modules.upsert({
          where: {
            courseId_slug: {
              courseId: course.id,
              slug: missingSlug,
            },
          },
          update: {
            title: definition.title,
            order: definition.order,
            updatedAt: new Date(),
          },
          create: {
            id: generateId(),
            courseId: course.id,
            title: definition.title,
            slug: missingSlug,
            order: definition.order,
            description: 'Auto-created by progress API to support progress persistence.',
            updatedAt: new Date(),
          },
        })

        modulesBySlug.set(moduleRecord.slug, moduleRecord)
      }
    }

    let upsertedCount = 0

    // Upsert each module's progress record
    for (const [moduleSlug, data] of Object.entries(moduleUpdates)) {
      const module = modulesBySlug.get(moduleSlug)

      if (!module) {
        console.warn(`[Progress API] Module not found: ${moduleSlug}`)
        continue
      }

      if (typeof data.status !== 'string' || data.status.trim().length === 0) {
        return NextResponse.json(
          { error: `Invalid status for module ${moduleSlug}` },
          { status: 400 }
        )
      }

      if (typeof data.completionRate !== 'number' || Number.isNaN(data.completionRate)) {
        return NextResponse.json(
          { error: `Invalid completionRate for module ${moduleSlug}` },
          { status: 400 }
        )
      }

      const status = data.status
      const completionRate = Math.min(Math.max(data.completionRate, 0), 100)

      await prisma.progress.upsert({
        where: {
          userId_moduleId: {
            userId: user.id,
            moduleId: module.id,
          },
        },
        update: {
          status,
          completionRate,
          updatedAt: new Date(),
        },
        create: {
          id: generateId(),
          userId: user.id,
          moduleId: module.id,
          status,
          completionRate,
          updatedAt: new Date(),
        },
      })

      upsertedCount += 1
    }

    return NextResponse.json({ success: true, upserted: upsertedCount })
  } catch (error) {
    const errorId = `progress-save-${Date.now()}`
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Progress API] Failed to save progress:', {
      errorId,
      message,
      error,
    })
    return NextResponse.json({ error: 'Failed to save progress', errorId, message }, { status: 500 })
  }
}
