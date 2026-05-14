/**
 * SUPABASE ADMIN CLIENT
 * Centralized admin/service-role client for server-side operations
 * Uses service role key for operations that require elevated privileges
 */

import { createClient } from '@supabase/supabase-js'
import { getSupabaseSecretKey, getSupabaseUrl } from './supabase-env'

let adminClient: ReturnType<typeof createClient> | null = null

export function getAdminSupabaseClient() {
  if (adminClient) {
    return adminClient
  }

  try {
    adminClient = createClient(getSupabaseUrl(), getSupabaseSecretKey(), {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    return adminClient
  } catch (error) {
    console.error('[SupabaseAdmin] Failed to initialize admin client:', error)
    throw error
  }
}

/**
 * Execute a database operation with Prisma as primary, Supabase admin as fallback
 * Useful for operations that might fail during app boot before Prisma is ready
 */
export async function executeWithFallback<T>(
  prismaOperation: () => Promise<T>,
  supabaseOperation: () => Promise<T>
): Promise<T> {
  try {
    return await prismaOperation()
  } catch (prismaError) {
    console.warn('[SupabaseAdmin] Prisma operation failed, trying Supabase fallback:', prismaError)
    try {
      return await supabaseOperation()
    } catch (supabaseError) {
      console.error('[SupabaseAdmin] Both Prisma and Supabase operations failed:', supabaseError)
      throw supabaseError
    }
  }
}
