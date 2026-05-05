import { createClient } from '@supabase/supabase-js'
import { prisma } from '../lib/prisma'
import { getSupabaseSecretKey, getSupabaseUrl } from '../lib/supabase-env'

const supabaseUrl = getSupabaseUrl()
const supabaseSecretKey = getSupabaseSecretKey()

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function syncExistingUsers() {
  console.log('Fetching users from Supabase Auth...')
  
  const { data: { users }, error } = await supabase.auth.admin.listUsers()
  
  if (error) {
    console.error('Error fetching users:', error)
    return
  }

  console.log(`Found ${users.length} users in Supabase Auth`)

  for (const user of users) {
    if (user.email) {
      try {
        const metadata = user.user_metadata ?? {}
        const firstName = typeof metadata.first_name === 'string' ? metadata.first_name.trim() : null
        const lastName = typeof metadata.last_name === 'string' ? metadata.last_name.trim() : null

        await prisma.users.upsert({
          where: { id: user.id },
          update: {
            email: user.email,
            firstName,
            lastName,
            updatedAt: new Date(),
          },
          create: {
            id: user.id,
            email: user.email,
            firstName,
            lastName,
            updatedAt: new Date(),
          },
        })
        console.log(`✓ Synced user: ${user.email}`)
      } catch (err) {
        console.error(`✗ Failed to sync ${user.email}:`, err)
      }
    }
  }

  console.log('Sync complete!')
  await prisma.$disconnect()
}

syncExistingUsers()
