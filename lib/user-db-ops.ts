/**
 * USER DATABASE OPERATIONS
 * Centralized upsert logic for app users with proper error handling
 */

import { prisma } from '@/lib/prisma'
import { getAdminSupabaseClient, executeWithFallback } from '@/lib/supabase-admin'

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
 * Upsert app user with Prisma primary, Supabase fallback
 * Handles race conditions and provides clear error messages
 */
export async function upsertAppUser(payload: AppUserUpsertPayload) {
  return executeWithFallback(
    // Prisma operation (primary)
    async () => {
      return await prisma.users.upsert({
        where: { id: payload.id },
        update: payload,
        create: payload,
      })
    },
    // Supabase operation (fallback)
    async () => {
      const adminClient = getAdminSupabaseClient()
      const { data, error } = await (adminClient as any)
        .from('users')
        .upsert(payload as any, { onConflict: 'id' })
        .select('*')
        .single()

      if (error || !data) {
        throw new Error(error?.message ? error.message : 'Supabase upsert failed.')
      }

      return data
    }
  )
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
