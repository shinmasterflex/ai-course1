import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pool: Pool | undefined
}

let prismaClient = globalForPrisma.prisma
let connectionPool = globalForPrisma.pool

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  try {
    // Create connection pool with reasonable defaults for Next.js
    const pool = new Pool({
      connectionString: databaseUrl,
      max: process.env.NODE_ENV === 'production' ? 20 : 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    connectionPool = pool

    // Log pool errors but don't crash
    pool.on('error', (error) => {
      console.error('[Prisma Pool] Unexpected error:', error)
    })

    pool.on('connect', () => {
      console.debug('[Prisma Pool] New connection established')
    })

    const adapter = new PrismaPg(pool)

    const client = new PrismaClient({ 
      adapter,
      log: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error', 'warn', 'info']
    })

    return client
  } catch (error) {
    console.error('[Prisma] Error creating client:', error)
    throw error
  }
}

function getPrismaClient() {
  if (prismaClient) {
    return prismaClient
  }

  prismaClient = createPrismaClient()

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaClient
    globalForPrisma.pool = connectionPool
  }

  return prismaClient
}

export const prisma = getPrismaClient()

// Graceful shutdown: close all connections on app termination
export async function closePrismaConnection(): Promise<void> {
  try {
    await prisma.$disconnect()
    if (connectionPool) {
      await connectionPool.end()
    }
    console.log('[Prisma] Database connections closed cleanly')
  } catch (error) {
    console.error('[Prisma] Error during shutdown:', error)
    throw error
  }
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrismaClient()
    const value = Reflect.get(client as unknown as object, property, receiver)

    if (typeof value === 'function') {
      return value.bind(client)
    }

    return value
  },
})

export { getPrismaClient }
