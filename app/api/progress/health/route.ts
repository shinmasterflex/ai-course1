import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSupabasePublishableKey, getSupabaseUrl } from '@/lib/supabase-env'

export const runtime = 'nodejs'

function maskConnectionHost(connectionString: string): string {
  try {
    const url = new URL(connectionString)
    return `${url.protocol}//${url.hostname}:${url.port || '5432'}`
  } catch {
    return 'invalid'
  }
}

export async function GET() {
  const checks = {
    nodeEnv: process.env.NODE_ENV ?? 'unknown',
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    databaseHost: process.env.DATABASE_URL ? maskConnectionHost(process.env.DATABASE_URL) : 'missing',
    hasSupabaseUrl: false,
    hasSupabasePublishableKey: false,
    prismaQueryOk: false,
    prismaError: null as string | null,
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

  const ok =
    checks.hasDatabaseUrl &&
    checks.hasSupabaseUrl &&
    checks.hasSupabasePublishableKey &&
    checks.prismaQueryOk

  return NextResponse.json(
    {
      ok,
      checks,
    },
    { status: ok ? 200 : 500 }
  )
}
