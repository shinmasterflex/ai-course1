# Database Integration Guide

## Architecture Overview

The application uses a **dual-layer database approach**:

1. **PostgreSQL (Primary)** - Persistent data via Supabase
   - Prisma ORM for type-safe queries
   - Direct connection via `DATABASE_URL`
   - Connection pooling with pg
   - Normalized learning state schema

2. **Supabase Auth & Admin API (Secondary)**
   - Authentication and user management
   - Service-role operations (Prisma fallback)
   - Real-time subscriptions (optional)

## Client Organization

### File: `lib/prisma.ts`
- **Purpose**: Database client singleton
- **Connection**: `DATABASE_URL` → PostgreSQL via pg Pool
- **Pool Config**: 20 connections (prod), 5 (dev)
- **Cleanup**: `closePrismaConnection()` on app shutdown
- **Error Handling**: Logs pool errors without crashing

### File: `lib/supabase.ts`
- **Purpose**: Browser-side Supabase client
- **Usage**: Client components, auth state, real-time subscriptions
- **Key**: Public publishable key (safe for client)

### File: `lib/supabase-server.ts`
- **Purpose**: Server-side Supabase client with SSR
- **Usage**: API routes, server components
- **Cookies**: Automatically managed for session persistence

### File: `lib/supabase-admin.ts`
- **Purpose**: Service-role admin client (NEW)
- **Usage**: Fallback for Prisma operations, elevated privileges
- **Key**: Secret service-role key (server-only)

### File: `lib/user-db-ops.ts`
- **Purpose**: Centralized user database operations (NEW)
- **Functions**:
  - `upsertAppUser()` - Create/update with Prisma → Supabase fallback
  - `findUserById()`, `findUserByEmail()`, `findUserBySessionId()`
- **Used By**: `app/api/auth/sync-user/*`, `app/api/auth/provision-user/*`

## Data Flow

### User Registration/Sync Flow
```
1. Browser auth → Supabase Auth (user created)
2. Client calls `/api/auth/sync-user` with Bearer token
3. API verifies user → calls `upsertAppUser()`
4. Prisma tries INSERT/UPDATE
   └─ On failure → Supabase fallback
5. Response includes `hasAccess` (based on paidAt)
```

### Progress State Flow
```
Client:
  Component updates progress state
  └─ useModuleQuiz hook saves via Supabase REST API
  └─ saves to `user_quiz_attempts` table

Supabase:
  Row-level security (RLS) ensures user_id isolation
  Trigger updates `user_module_progress` aggregate

Server:
  API routes read from `user_course_progress` for dashboard
```

### Learning State Schema
```
user_course_enrollments (1:1 with users)
├─ Tracks enrollment and payment status
└─ Synced with Stripe via sync-user endpoint

user_course_progress (1:1 with users)
├─ Denormalized aggregate for fast dashboard queries
└─ Updated when user changes module/section

user_module_progress (N:M with users)
├─ Per-module tracking: status, sections_completed, quiz results
└─ Composite unique: (user_id, module_id)

user_section_state (N:M with users)
├─ Section completion and engagement time
└─ Composite unique: (user_id, module_id, section_id)

user_quiz_attempts (N:M with users)
├─ Complete quiz submission history with answers
└─ Order by attempted_at for full audit trail
```

## API Endpoints

### `GET /api/progress/health`
- Checks database connectivity
- Verifies all 5 learning state tables exist
- Returns status for monitoring/debugging

### `POST /api/auth/sync-user`
- Syncs authenticated user from Supabase Auth
- Verifies Stripe payment session (if provided)
- Creates/updates user record with payment status
- Rate limited: 12 requests per 10 minutes

### `POST /api/auth/provision-user`
- Admin endpoint for user creation
- Verifies payment before provisioning
- Used by server-side workflows
- Rate limited: 12 requests per 10 minutes

### `POST /api/ai-chat`
- Learning assistant chat endpoint
- Does NOT modify database
- Rate limited: 20 requests per minute

## Environment Variables

```bash
# Database (Required)
DATABASE_URL=postgresql://...  # Prisma + Direct queries

# Supabase Auth & API (Required)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Optional
SUPABASE_SECRET_KEY=sb_secret_...  # Alternative to SUPABASE_SERVICE_ROLE_KEY
```

## Migration & Setup

### 1. First Time Setup
```bash
# Apply schema from supabase/initial.sql
npx supabase db push

# Or manually via Supabase SQL editor:
# Copy contents of supabase/initial.sql → Execute
```

### 2. Prisma Schema Management
```bash
# Generate Prisma client
npx prisma generate

# Create new migration
npx prisma migrate dev --name <migration_name>

# Deploy migrations
npx prisma migrate deploy
```

### 3. Verify Database
```bash
# Check health endpoint
curl http://localhost:3000/api/progress/health

# Expected response:
{
  "ok": true,
  "checks": {
    "prismaQueryOk": true,
    "learningStateTables": {
      "userCourseEnrollments": true,
      "userCourseProgress": true,
      "userModuleProgress": true,
      "userSectionState": true,
      "userQuizAttempts": true
    }
  }
}
```

## Row-Level Security (RLS)

All learning state tables have RLS policies:

```sql
-- Pattern: Users can only access their own records
FOR ALL USING (auth.uid() = user_id)
```

**Implication**: Client-side Supabase queries automatically filter to current user.

## Troubleshooting

### "DATABASE_URL is not set"
- **Cause**: Environment variable missing
- **Fix**: Add to `.env.local` or deployment environment

### "Connection refused"
- **Cause**: PostgreSQL not running or wrong host
- **Fix**: Check DATABASE_URL, verify Supabase is running

### "Missing learning state tables"
- **Cause**: Schema not initialized
- **Fix**: Run `supabase db push` or execute `supabase/initial.sql`

### "User sync fails with P2002"
- **Cause**: Concurrent requests trying to claim same payment session
- **Fix**: Already handled with ownership verification in sync-user

### "Fallback to Supabase keeps happening"
- **Cause**: Prisma connection issue
- **Check**: 
  - Connection pool exhaustion?
  - Timeout settings?
  - Run `/api/progress/health`

### RLS Policy Blocks Query
- **Cause**: Query doesn't match `auth.uid() = user_id`
- **Fix**: Use server client or service-role key for cross-user queries

## Performance Considerations

### Connection Pooling
- **Production**: 20 concurrent connections
- **Development**: 5 concurrent connections
- **Idle Timeout**: 30 seconds
- **Connection Timeout**: 2 seconds

### Indexes
Learning state tables include indexes on:
- `(user_id, module_id)` - Most common query pattern
- `(user_id, status)` - Module status lookups
- `(user_id, is_completed)` - Section completion queries
- `(user_id, attempted_at DESC)` - Quiz history

### Denormalization
- `user_course_progress` denormalizes aggregates for dashboard
- `user_module_progress` denormalizes section counts for quick calculations
- Trade-off: Update overhead vs query speed

## Security

1. **Connection**: TLS (all PostgreSQL connections)
2. **Auth**: Supabase Auth + Bearer tokens
3. **Database**: Row-level security + user_id isolation
4. **API**: Rate limiting + Turnstile bot protection
5. **Secrets**: Service-role key server-only, never in client

## Future Improvements

- [ ] Connection pool warm-up on app startup
- [ ] Query caching layer (Redis)
- [ ] Automated backups verification
- [ ] Query performance monitoring
- [ ] Database replication (hot standby)
