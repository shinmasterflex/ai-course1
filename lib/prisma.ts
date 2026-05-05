import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prismaClient = globalForPrisma.prisma

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  try {
    const pool = new Pool({
      connectionString: databaseUrl,
    })

    const adapter = new PrismaPg(pool)

    const client = new PrismaClient({ 
      adapter,
      log: ['error', 'warn']
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
  }

  return prismaClient
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
