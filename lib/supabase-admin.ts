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
