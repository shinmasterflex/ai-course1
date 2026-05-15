# Data Loss & Corruption Risk Audit
**Date:** May 10, 2026  
**Status:** Critical Issues Identified

---

## Executive Summary

The system has **moderate-to-high data loss risk** across three domains:
1. **Payment verification** - Concurrent race conditions could cause payment sessions to link to wrong accounts
2. **Progress state** - Unhandled errors during sync can silently lose user progress updates
3. **Quiz results** - Page unload during flush could lose quiz completion data

---

## 🔴 CRITICAL ISSUES

### 1. Payment Session Race Condition (HIGH SEVERITY)

**Location:** [app/api/auth/sync-user/route.ts](app/api/auth/sync-user/route.ts#L90-L108), [app/api/auth/provision-user/route.ts](app/api/auth/provision-user/route.ts#L122-L140)

**Issue:** Non-atomic payment session linking allows the same checkout session to be claimed by multiple users.

**Timeline:**
1. User A calls sync endpoint with `sessionId=sess_123`
2. `findFirst` check passes (no owner yet)
3. User B calls provision endpoint with same `sessionId=sess_123`
4. User B's `findFirst` check also passes (race window)
5. User B upsert succeeds first, claims `stripeCheckoutSessionId`
6. User A upsert fails with `P2002` duplicate key error
7. **Result:** Payment intended for A now belongs to B

**Code Pattern (Both Endpoints):**
```typescript
// ❌ PROBLEMATIC
const existingSessionOwner = await prisma.users.findFirst({
  where: { stripeCheckoutSessionId: sessionId },
  select: { id: true },
})

if (existingSessionOwner && existingSessionOwner.id !== userId) {
  return NextResponse.json(
    { error: 'Payment session is already linked to another account.' },
    { status: 409 },
  )
}

// Gap: concurrent request could claim session here

let dbUser
try {
  dbUser = await upsertAppUser({
    // ... stripeCheckoutSessionId is set here
  })
} catch (upsertErr: unknown) {
  if (upsertErr instanceof Prisma.PrismaClientKnownRequestError && upsertErr.code === 'P2002') {
    return NextResponse.json(...)
  }
}
```

**Impact:**
- ❌ User loses payment record (thinks payment failed)
- ❌ Another user incorrectly gains course access
- ❌ Revenue leak (payment recorded in Stripe but not linked correctly)
- ❌ Audit trail broken

**Fix:** Use database constraints + trigger-based validation

```sql
-- Add UNIQUE constraint on stripeCheckoutSessionId
ALTER TABLE users ADD CONSTRAINT unique_stripe_session 
UNIQUE(stripeCheckoutSessionId) WHERE stripeCheckoutSessionId IS NOT NULL;

-- Add trigger to prevent race
CREATE OR REPLACE FUNCTION validate_session_ownership()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stripeCheckoutSessionId IS NOT NULL THEN
    IF EXISTS(
      SELECT 1 FROM users 
      WHERE stripeCheckoutSessionId = NEW.stripeCheckoutSessionId 
      AND id != NEW.id
      AND stripeCheckoutSessionId IS NOT NULL
    ) THEN
      RAISE EXCEPTION 'Session already claimed by another user';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

### 2. Supabase Upsert Race Condition - Progress State (HIGH SEVERITY)

**Location:** [lib/progress-manager.ts](lib/progress-manager.ts#L100-L130)

**Issue:** Write queue prevents *local* races but loses updates if concurrent external operations happen.

**Scenario:**
1. User opens course on Tab A, loads progress from Supabase: `{modules: {mod1: {currentSection: 0}}}`
2. User opens course on Tab B, loads same progress
3. Tab A marks section 1 complete, queues write (1s debounce)
4. Tab B marks section 2 complete, queues write (1s debounce)
5. Tab A writes to Supabase: `{modules: {mod1: {completedSections: [1]}}}`
6. Tab B overwrites with: `{modules: {mod1: {completedSections: [2]}}}`
7. **Result:** Section 1 completion lost

**Root Cause:** Each tab maintains independent `cachedProgress`; writes don't merge but replace.

```typescript
// ❌ PROBLEMATIC in progress-manager.ts
let cachedProgress: GlobalProgress | null = null
let writeQueue: Promise<void> = Promise.resolve()

export async function markSectionComplete(moduleId: string, sectionIndex: number): Promise<void> {
  return enqueueWrite(async () => {
    const progress = cachedProgress ?? (await loadProgress())
    const moduleData = progress.modules[moduleId]
    const completedSections = [...(moduleData?.completedSections ?? [])]
    
    if (!completedSections.includes(sectionIndex)) {
      completedSections.push(sectionIndex)
    }
    
    progress.modules[moduleId] = {
      ...moduleData,
      completedSections,  // ❌ Overwrites other sections if Tab B loaded stale data
      currentSection: moduleData?.currentSection ?? 0,
      lastUpdated: new Date().toISOString(),
    }
    
    await saveProgress(progress)  // ❌ This replaces entire state
  })
}
```

**Impact:**
- ❌ Silent data loss (no error, user unaware)
- ❌ User completes quiz in Tab B, loses it when switching to Tab A
- ❌ Module completion percentages reset

---

### 3. Unhandled Errors in Supabase Save Operations (MEDIUM SEVERITY)

**Location:** [lib/progress-manager.ts](lib/progress-manager.ts#L110-L125)

**Issue:** Errors in Supabase saves are logged but not propagated; callers don't know if save failed.

```typescript
// ❌ PROBLEMATIC
export async function saveProgress(progress: GlobalProgress): Promise<void> {
  if (typeof window === "undefined") return

  const normalizedProgress = normalizeProgress(progress)
  cachedProgress = normalizedProgress  // ✅ Updates local cache first

  if (pendingSave) {
    clearTimeout(pendingSave)
  }

  pendingSave = setTimeout(async () => {
    try {
      await saveSectionProgressState(normalizedProgress)
    } catch (error) {
      console.error("[Progress] Failed to save section progress to Supabase:", error)
      // ❌ Error is swallowed. Caller has no idea this failed.
    }
  }, 1000)
}
```

**Scenario:**
1. User completes quiz section
2. `saveProgress()` called, `cachedProgress` updated optimistically
3. Supabase is temporarily down
4. Save error logged to console only
5. User refreshes page
6. `loadProgress()` fetches from Supabase → stale data loaded
7. Quiz completion lost

**Impact:**
- ❌ User loses session progress on page reload
- ❌ No indication to user that data failed to persist
- ❌ Only visible in server logs

---

### 4. Best-Effort Unload Handlers Can Lose Data (MEDIUM SEVERITY)

**Location:** [lib/progress-sync.ts](lib/progress-sync.ts#L24-L38)

**Issue:** Page unload handlers use `void` (fire-and-forget), silently ignore errors.

```typescript
// ❌ PROBLEMATIC
export function setupProgressSyncOnUnload(): () => void {
  if (typeof window === "undefined") return () => {}

  const handler = () => {
    void progressManager.forceSync().catch(() => {
      // Best-effort only.  ❌ Error is silently ignored
    })

    void flushProgress().catch(() => {
      // Best-effort only.  ❌ Error is silently ignored
    })
  }

  window.addEventListener("pagehide", handler)
  window.addEventListener("beforeunload", handler)

  return () => {
    window.removeEventListener("pagehide", handler)
    window.removeEventListener("beforeunload", handler)
  }
}
```

**Scenario:**
1. User completes quiz, progress syncs successfully
2. User marks section complete
3. Before 1s debounce timeout → User closes tab
4. `beforeunload` → `flushProgress()` starts
5. Supabase connection timeout (poor connection)
6. Error caught and silently ignored
7. Browser closes before retry
8. **Result:** Latest progress update lost

**Impact:**
- ❌ High probability of data loss on mobile (unreliable networks)
- ❌ No user notification that data failed to save
- ❌ User sees course as incomplete even though they finished

---

### 5. Quiz Results Not Covered by Unload Handlers (MEDIUM SEVERITY)

**Location:** [hooks/use-module-quiz.ts](hooks/use-module-quiz.ts#L52-L67)

**Issue:** Quiz results are saved asynchronously with no unload flush.

```typescript
// ❌ PROBLEMATIC
export function useModuleQuiz<T extends string>(moduleId: string, quizKeys: T[]) {
  const [quizResults, setQuizResults] = useState<Record<T, boolean>>(initialResults)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (!isHydrated) return

    void saveQuizResults(moduleId, quizResults).catch((error) => {
      console.error(`[useModuleQuiz] Failed to save quiz for ${moduleId}:`, error)
      // ❌ No retry, no recovery
    })
  }, [isHydrated, moduleId, quizResults])
  // ❌ No beforeunload handler to flush on page close
}
```

**Scenario:**
1. User answers 3 quiz questions correctly
2. `quizResults` updated → effect fires → `saveQuizResults()` called
3. Supabase request pending
4. User clicks "Next Module" link → page unloads
5. In-flight request is canceled by browser
6. **Result:** Quiz answers lost

**Impact:**
- ❌ User completes quiz but loses progress on next page load
- ❌ User must retake quiz

---

### 6. Silent Failures in `saveSectionProgressState()` (MEDIUM SEVERITY)

**Location:** Historical (`lib/supabase-learning-state.ts`, pre-normalization)

**Issue:** `upsertStateRow()` throws but errors are not descriptive.

```typescript
// Historical example (removed)
// ❌ PROBLEMATIC
async function upsertStateRow(table: string, userId: string, payload: Record<string, unknown>, onConflict: string) {
  const supabase = createClient()
  const { error } = await supabase.from(table).upsert(payload, { onConflict })

  if (error) {
    throw error  // ❌ Raw Supabase error, no context
  }
}

export async function saveSectionProgressState(state: SectionProgressState): Promise<void> {
  const userId = await getAuthenticatedUserId()
  if (!userId) return  // ❌ Silent return if no user, caller won't know
  
  await upsertStateRow(
    SECTION_TABLE,
    userId,
    {
      user_id: userId,
      state_key: "default",
      state,
    },
    "user_id,state_key",
  )
}
```

**Failure Mode 1:** No user authenticated
- `getAuthenticatedUserId()` returns `null`
- `saveSectionProgressState()` silently returns
- Caller thinks save succeeded

**Failure Mode 2:** Supabase policy violation
- `upsertStateRow()` throws raw error
- Caller logs error but doesn't know if it's transient or permanent

---

### 7. Optimistic Updates Without Recovery (MEDIUM SEVERITY)

**Location:** [lib/global-progress.ts](lib/global-progress.ts#L115-L150)

**Issue:** If optimistic update succeeds locally but Supabase sync fails, rollback state is stale.

```typescript
// ❌ PROBLEMATIC
class GlobalProgressManager {
  private pendingRollbackSnapshot: string | null = null
  private lastStableSnapshot: string | null = null

  markSectionComplete(moduleId: string, sectionId: string) {
    const module = courseStructure.modules.find((m) => m.id === moduleId)
    if (module) {
      const section = module.sections.find((s) => s.id === sectionId)
      if (section) {
        const rollbackSnapshot = this.createSnapshot()
        section.completed = true  // ✅ Optimistic update
        console.log("[Progress] Section marked, triggering save")
        this.queuePersist(rollbackSnapshot)
        this.notifyListeners()
      }
    }
  }

  private async syncToServer() {
    // ...
    try {
      await saveCourseProgressState({...})
      this.lastStableSnapshot = this.createSnapshot()
      this.pendingRollbackSnapshot = null
    } catch (error) {
      console.error("[Progress] Failed to sync to Supabase:", error)
      if (this.initGeneration !== generation) return
      this.rollbackProgressState()  // ❌ Rollback to pendingRollbackSnapshot
    }
  }

  private rollbackProgressState() {
    const rollbackSnapshot = this.pendingRollbackSnapshot 
      ? this.pendingRollbackSnapshot 
      : this.lastStableSnapshot  // ❌ Falls back to old snapshot
    // ...
    this.mergeProgress(JSON.parse(rollbackSnapshot))
  }
}
```

**Scenario:**
1. Last stable: `{modules: [{id: "m1", completed: [0]}]}`
2. User completes section 1 → `pendingRollbackSnapshot = {modules: [{id: "m1", completed: [0]}]}`
3. Update applied optimistically → UI shows both sections 0 & 1 complete
4. Supabase sync fails
5. Rollback applied → back to `{modules: [{id: "m1", completed: [0]}]}`
6. But if user marked section 2 while sync was in-flight, section 2 is now lost too

**Impact:**
- ❌ User sees UI revert to older state
- ❌ Multiple sections can be lost in cascading failure

---

### 8. Cross-Tab Auth State Changes Invalidate In-Flight Operations (MEDIUM SEVERITY)

**Location:** [lib/global-progress.ts](lib/global-progress.ts#L55-L70), [lib/global-progress.ts](lib/global-progress.ts#L82-L87)

**Issue:** When user logs out on Tab A, Tab B's in-flight syncs are invalidated but recovery isn't clean.

```typescript
// ❌ PROBLEMATIC
private setupAuthListener() {
  const supabase = createClient()
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    const nextUserId = session?.user?.id ? session.user?.id : null
    if (nextUserId !== this.activeUserId) {
      void this.switchActiveUser(nextUserId)  // ❌ Async, fire-and-forget
    }
  })
}

private async switchActiveUser(nextUserId: string | null) {
  this.initGeneration++  // Invalidates in-flight syncs
  this.activeUserId = nextUserId
  this.resetInMemoryProgressState()
  await this.init()  // ❌ Async, caller doesn't know when it completes
}
```

**Scenario:**
1. Tab A: User logged in, marking section complete
2. Tab B: Auth state change detected (user logs out elsewhere)
3. `switchActiveUser(null)` called, `initGeneration++`
4. Tab A: `syncToServer()` completes but check `if (this.initGeneration !== generation)` succeeds
5. Result discarded silently
6. In-memory state rolled back via `resetInMemoryProgressState()`
7. **Result:** Session progress lost, in-flight operation result discarded

---

## 🟡 MODERATE ISSUES

### 9. No Retry Logic for Failed Saves (MEDIUM SEVERITY)

**Location:** [lib/progress-manager.ts](lib/progress-manager.ts#L110-L125), [lib/progress-sync.ts](lib/progress-sync.ts#L24-L38)

**Issue:** Transient failures (network timeout, Supabase rate limit) cause permanent data loss.

```typescript
// ❌ NO RETRY
pendingSave = setTimeout(async () => {
  try {
    await saveSectionProgressState(normalizedProgress)
  } catch (error) {
    console.error("[Progress] Failed to save section progress to Supabase:", error)
    // ❌ No retry scheduled
  }
}, 1000)
```

**Impact:**
- Single network glitch loses entire module's progress

---

### 10. Payment Verification Doesn't Handle Session Expiry (MEDIUM SEVERITY)

**Location:** [lib/stripe.ts](lib/stripe.ts#L77-L90)

**Issue:** Stripe checkout sessions expire after 24 hours; old sessions cause verification to fail but code doesn't distinguish expiry from fraud.

```typescript
// ❌ NO EXPIRY CHECK
export async function verifyCheckoutSessionPayment(sessionId: string): Promise<VerifiedCheckoutSession> {
  const stripe = getStripeServerClient()
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  
  // ❌ No check for session.expires_at
  const isPaid = session.status === 'complete' && session.payment_status === 'paid'
  
  return { isPaid, normalizedCustomerEmail, paymentLinkId }
}
```

**Scenario:**
1. User completes payment on Day 1
2. User tries to register on Day 2 (session expired)
3. Verification fails silently
4. User doesn't know if payment was processed

---

### 11. Cascading Delete on User Deletion Could Wipe Test Data (LOW-MEDIUM SEVERITY)

**Location:** [prisma/schema.prisma](prisma/schema.prisma#L11-L20)

**Issue:** `ON DELETE CASCADE` means deleting a user also deletes all their attempts, progress, etc. This could happen accidentally if test fixtures aren't isolated.

```prisma
model progress {
  id                      String   @id
  userId                  String
  moduleId                String
  status                  String
  // ...
  user                    users    @relation(fields: [userId], references: [id], onDelete: Cascade)
  // ❌ If user is deleted, ALL progress is gone forever
}
```

**Risk:** If an admin script accidentally deletes a user account instead of a test account, all progress is lost.

---

### 12. No Unique Constraint on Module Quiz Results (LOW SEVERITY)

**Location:** Historical (`supabase/initial.sql`, pre-normalization)

**Issue (Historical):** The older `user_module_quiz_results` naming implied a single-row-per-module model and could be misread as under-constrained.

```sql
-- Historical table shape
CREATE TABLE IF NOT EXISTS public.user_module_quiz_results (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  results JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, module_id)  -- ✅ Good
);
```

Current schema uses `user_quiz_attempts` with a UUID primary key and timestamped attempts, so duplicate-row concerns are no longer relevant to the active model.

---

## 🟢 LOW SEVERITY / DESIGN OBSERVATIONS

### 13. Snapshot Storage Overhead (RESOLVED)

This is resolved in the current architecture. Runtime persistence now writes normalized section rows (`user_section_state`) and aggregate position (`user_course_progress`) instead of storing full course snapshots in the database.

**Current Impact:** No snapshot-size storage overhead in Supabase persistence path.

---

### 14. No Concurrent Request Batching

Each quiz question saved individually. No request batching.

**Scenario:** User answers 5 quiz questions → 5 separate Supabase upsert requests

**Impact:** Network overhead, higher latency, higher failure surface area

---

## Summary Table

| Issue | Severity | Data Loss Risk | User Impact |
|-------|----------|-----------------|------------|
| Payment session race | 🔴 CRITICAL | Yes | Wrong user gains access; revenue leak |
| Multi-tab progress race | 🔴 CRITICAL | Yes | Progress silently lost when switching tabs |
| Unhandled Supabase errors | 🟡 HIGH | Yes | Silent data loss on reload |
| Best-effort unload | 🟡 HIGH | Yes | Data lost on page close |
| Quiz no unload flush | 🟡 HIGH | Yes | Quiz progress lost on navigation |
| Optimistic update rollback | 🟡 MEDIUM | Partial | Multiple sections rolled back |
| Auth state invalidation | 🟡 MEDIUM | Partial | Session progress lost on logout |
| No retry logic | 🟡 MEDIUM | Yes | Transient network errors cause data loss |
| Payment expiry not handled | 🟡 MEDIUM | No | User confusion but not data loss |
| Cascading delete risk | 🟡 MEDIUM | Yes | Accidental user deletion wipes progress |

---

## Recommended Mitigation Priority

### Phase 1 (Immediate - This Sprint)
1. **Add payment session unique constraint** with upsert retry logic
2. **Add merge logic to progress saves** (don't replace, merge with current state)
3. **Add error propagation** from `saveProgress()` and `flushProgress()`

### Phase 2 (Next Sprint)
4. Add retry logic with exponential backoff
5. Add explicit `beforeunload` flush confirmation
6. Add quiz result batching

### Phase 3 (Future)
7. Implement event sourcing for progress (immutable log instead of snapshots)
8. Add data validation on Supabase load
9. Add recovery UI for failed saves

