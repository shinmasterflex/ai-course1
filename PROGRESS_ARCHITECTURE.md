# Progress Tracking - Supabase-First Architecture

## Overview

The course progress system now persists directly to Supabase tables from the client. The database is the source of truth, and localStorage is no longer used for progress or quiz persistence.

## Data Flow

1. **On Auth**: `useAuthGuard` calls `initializeProgressSync()` to warm the caches.
2. **On Update**: progress managers write directly to Supabase with optimistic in-memory updates.
3. **On Unload**: `beforeunload` and `pagehide` handlers flush the in-memory caches to Supabase.

## Progress Managers

**`lib/progress-manager.ts`**
- Stores module section progress in Supabase
- Keeps a client-side cache for fast reads during the session
- `loadProgress()`, `saveProgress()`, `flushProgress()`, `resetAllProgress()` all use Supabase state

**`lib/global-progress.ts`**
- Stores the full course snapshot and current position in Supabase
- Keeps the existing observer-pattern API for `useProgress()`
- `markSectionComplete()`, `setCurrentPosition()`, `resetProgress()`, and `forceSync()` now persist directly to Supabase

**`hooks/use-module-quiz.ts`**
- Loads and saves quiz completions from Supabase per module
- Maintains the same hook API for the course module page

## Storage Layers

| Layer | Purpose | Lifespan |
|-------|---------|----------|
| Supabase | Source of truth | Permanent |
| Memory cache | Fast reads during session | Until page reload |

## Database Schema

See [supabase/initial.sql](supabase/initial.sql) for the tables and RLS policies required for:
- `user_course_progress_snapshots`
- `user_section_progress_states`
- `user_module_quiz_results`

## Error Handling

- Network and auth failures are logged and fall back to the in-memory cache for the active session
- Reset operations clear both the client cache and the Supabase rows
- Unload sync is best-effort and flushes the current cache to Supabase

## Testing Checklist

- [ ] Login → progress loads from Supabase
- [ ] Complete section → optimistic UI update + Supabase save
- [ ] Complete quiz → results persist after refresh
- [ ] Refresh page → progress and quiz state rehydrate from Supabase
- [ ] Reset progress → Supabase rows are cleared
