# Progress Tracking - Server-First Architecture

## Overview

The course progress system now uses a **server-first with optimistic UI** pattern. The PostgreSQL database is the source of truth, with localStorage serving only as a session cache for performance.

## Architecture

### API Endpoints

**`GET /api/progress`**
- Loads authenticated user's progress snapshot from PostgreSQL
- Returns `{ progress: {...}, updatedAt: "..." }`
- Falls back to empty progress if not found
- Requires authentication (401 if unauthorized)

**`PUT /api/progress`**
- Saves authenticated user's progress snapshot to PostgreSQL
- Accepts `{ progress: { modules: {...}, version: "1.0" } }`
- Upserts into `course_progress_snapshots` table (user_id, course_slug)
- Returns `{ success: true }`

### Data Flow

1. **On Auth**: `useAuthGuard` calls `initializeProgressSync()` to warm cache from server
2. **On Update**: 
   - Optimistic: Immediately update in-memory cache + localStorage
   - Debounced: API call after 1 second of inactivity
3. **On Unload**: `beforeunload` handler uses `sendBeacon` for best-effort final sync

### Progress Managers

**`lib/progress-manager.ts`** (Module-indexed format)
- Async functions: `loadProgress()`, `saveProgress()`, `markSectionComplete()`, etc.
- Sync functions: `getModuleProgressSync()`, `isModuleComplete()` (use cache)
- Debounced server saves (1 second)
- `flushProgress()` for immediate sync on critical actions

**`lib/global-progress.ts`** (Course structure format)
- Class-based observer pattern used by `useProgress()` hook
- Automatically syncs to server on mutations
- Methods: `markSectionComplete()`, `getModuleProgress()`, `resetProgress()`
- `forceSync()` for manual flush

### Storage Layers

| Layer | Purpose | Lifespan |
|-------|---------|----------|
| PostgreSQL | Source of truth | Permanent |
| Memory cache | Fast reads during session | Until page reload |
| localStorage | Offline fallback, unload backup | Until cleared |

## Usage Patterns

### Reading Progress (Synchronous)

```typescript
import { getModuleProgressSync, isModuleComplete } from '@/lib/progress-manager'

// Safe to call synchronously after initialization
const progress = getModuleProgressSync('module-1')
const isComplete = isModuleComplete('module-1', 10)
```

### Updating Progress (Optimistic)

```typescript
import { markSectionComplete } from '@/lib/progress-manager'

// Optimistic update: UI reflects change immediately
// Server sync happens automatically (debounced)
await markSectionComplete('module-1', 3)
```

### Critical Operations (Force Sync)

```typescript
import { flushProgress } from '@/lib/progress-manager'
import { progressManager } from '@/lib/global-progress'

// Before logout or navigation away
await flushProgress()
await progressManager.forceSync()
```

### Using the Hook (Recommended)

```typescript
import { useProgress } from '@/hooks/use-progress'

const { markSectionComplete, getModuleProgress, resetProgress } = useProgress()

// All methods handle async internally
markSectionComplete('module-1', 'section-2')
const progress = getModuleProgress('module-1')
```

## Migration Notes

### Breaking Changes

- `loadProgress()` is now **async** - returns `Promise<GlobalProgress>`
- `markSectionComplete()` is now **async** - returns `Promise<void>`
- Other mutation functions (`updateModuleProgress`, `saveQuizResults`, etc.) are async

### Non-Breaking

- Sync read functions (`getModuleProgressSync`, `isModuleComplete`, etc.) remain synchronous
- `useProgress()` hook API unchanged - handles async internally
- localStorage keys unchanged for backward compatibility

## Database Schema

```sql
CREATE TABLE course_progress_snapshots (
  user_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  progress_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, course_slug)
);
```

Auto-created by API on first use. Stores complete progress JSON in `progress_data` JSONB column.

## Error Handling

- API failures fall back to localStorage cache (read-only)
- Network errors are logged but don't block UI updates (optimistic)
- Unauthorized requests (401) skip server sync and use cache
- `beforeunload` sync is best-effort (may not complete on fast tab close)

## Testing Checklist

- [ ] Login → progress loads from server
- [ ] Complete section → optimistic UI update + debounced save
- [ ] Refresh page → progress persists from server
- [ ] Logout/close tab → final sync via sendBeacon
- [ ] Network offline → localStorage cache still works (read-only)
- [ ] Clear localStorage → reloads from server on next auth
