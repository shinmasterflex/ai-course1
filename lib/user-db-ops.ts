/**
 * USER DATABASE OPERATIONS
 * Centralized upsert logic for app users.
 */

import { prisma } from '@/lib/prisma'

export type AppUserUpsertPayload = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  paidAt: Date | null
  stripeCheckoutSessionId: string | null
  updatedAt: Date
}

/**
 * Upsert app user via Prisma.
 */
export async function upsertAppUser(payload: AppUserUpsertPayload) {
  return prisma.users.upsert({
    where: { id: payload.id },
    update: payload,
    create: payload,
  })
}

/**
 * Find existing user by ID
 */
export async function findUserById(userId: string) {
  try {
    return await prisma.users.findUnique({
      where: { id: userId },
    })
  } catch (error) {
    console.error('[UserOps] Failed to find user:', error)
    throw error
  }
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string) {
  try {
    return await prisma.users.findUnique({
      where: { email },
    })
  } catch (error) {
    console.error('[UserOps] Failed to find user by email:', error)
    throw error
  }
}

/**
 * Find user by Stripe checkout session
 */
export async function findUserBySessionId(sessionId: string) {
  try {
    return await prisma.users.findFirst({
      where: { stripeCheckoutSessionId: sessionId },
    })
  } catch (error) {
    console.error('[UserOps] Failed to find user by session:', error)
    throw error
  }
}
