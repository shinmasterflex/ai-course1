-- ============================================================================
-- AI Course Schema: Learning State Persistence
-- ============================================================================
-- 5-Module AI for Business Leaders Course
--   Module 0 (The AI Shift): 3 sections + quiz
--   Module 1 (AI Landscape & Agents): 9 sections + quiz
--   Module 2 (Optimize Existing Systems): 6 sections + quiz
--   Module 3 (Adopt New Systems): 6 sections + quiz
--   Module 4 (Measure Business Value): 5 sections + quiz
--
-- Data Flow:
--   auth.users (secure credentials) -> public.users (app profile mirror)
--   app tables reference public.users so ORM and SQL stay aligned
--   user_course_enrollments (entry) → user_course_progress (aggregate)
--   user_module_progress (module-level) + user_section_state (section-level)
--   user_quiz_attempts (quiz history per module)
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- 0. APPLICATION USERS
-- ────────────────────────────────────────────────────────────────────────────
-- Supabase Auth remains the source of truth for credentials and password
-- validation. The public.users table stores the reusable app profile needed by
-- login, progress syncing, and payment/access workflows.

CREATE TABLE IF NOT EXISTS public."users" (
  "id" UUID PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "firstName" TEXT,
  "lastName" TEXT,
  "paidAt" TIMESTAMPTZ,
  "stripeCheckoutSessionId" TEXT UNIQUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public."users" IS
  'Application-level user profiles mirrored from Supabase auth.users. Credentials stay in auth.users; this table is reused for app login state, progress, and access control.';
COMMENT ON COLUMN public."users"."id" IS
  'Matches auth.users.id (UUID). Required for UUID-typed foreign keys from learning state tables and auth.uid() RLS comparisons.';
COMMENT ON COLUMN public."users"."stripeCheckoutSessionId" IS
  'Verified Stripe checkout session linked to the account for paid course access.';

CREATE OR REPLACE FUNCTION public.sync_auth_user_to_public_users()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IS NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO public."users" (
    "id",
    "email",
    "firstName",
    "lastName",
    "createdAt",
    "updatedAt"
  )
  VALUES (
    NEW.id,
    lower(trim(NEW.email)),
    NULLIF(trim(COALESCE(NEW.raw_user_meta_data ->> 'first_name', '')), ''),
    NULLIF(trim(COALESCE(NEW.raw_user_meta_data ->> 'last_name', '')), ''),
    COALESCE(NEW.created_at, NOW()),
    NOW()
  )
  ON CONFLICT ("id") DO UPDATE
    SET
      "email" = EXCLUDED."email",
      "firstName" = EXCLUDED."firstName",
      "lastName" = EXCLUDED."lastName",
      "updatedAt" = NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_synced_to_public_users ON auth.users;
CREATE TRIGGER on_auth_user_synced_to_public_users
AFTER INSERT OR UPDATE OF email, raw_user_meta_data
ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.sync_auth_user_to_public_users();

-- ────────────────────────────────────────────────────────────────────────────
-- 1. ENROLLMENTS & ACCESS CONTROL
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public."users"(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL DEFAULT 'ai-course',
  has_paid BOOLEAN NOT NULL DEFAULT FALSE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.user_course_enrollments IS
  'Links users to course enrollments. Synced with Stripe payment status via users.paidAt.';
COMMENT ON COLUMN public.user_course_enrollments.has_paid IS
  'Reflects sync status with Stripe; primary source of truth is public.users.paidAt.';

-- ────────────────────────────────────────────────────────────────────────────
-- 2. PROGRESS SUMMARIES
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_course_progress (
  user_id UUID PRIMARY KEY REFERENCES public."users"(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL DEFAULT 'ai-course',
  current_module TEXT,
  current_section TEXT,
  modules_completed INTEGER NOT NULL DEFAULT 0,
  total_modules INTEGER NOT NULL DEFAULT 5,
  completion_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.user_course_progress IS
  'Aggregate course-level progress snapshot. Updated when user changes position.';
COMMENT ON COLUMN public.user_course_progress.total_modules IS
  'Always 5 for this course (Module 0 through Module 4). Included for future multi-course support.';
COMMENT ON COLUMN public.user_course_progress.completion_percentage IS
  'Calculated: (modules_completed / 5) * 100. Denormalized for quick dashboard queries.';

-- ────────────────────────────────────────────────────────────────────────────
-- 3. MODULE-LEVEL TRACKING
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public."users"(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started',
  sections_completed INTEGER NOT NULL DEFAULT 0,
  total_sections INTEGER,
  quiz_passed BOOLEAN NOT NULL DEFAULT FALSE,
  quiz_score INTEGER,
  quiz_attempts INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

COMMENT ON TABLE public.user_module_progress IS
  'Per-module progress: status, section completion, quiz results.';
COMMENT ON COLUMN public.user_module_progress.status IS
  'not_started | in_progress | completed. Updated when sections are marked complete or quiz passed.';
COMMENT ON COLUMN public.user_module_progress.total_sections IS
  'Total sections in module (varies by module: M0=3, M1=9, M2=6, M3=6, M4=5). Set on initial record creation, used for progress calculations.';

-- ────────────────────────────────────────────────────────────────────────────
-- 4. SECTION-LEVEL STATE
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_section_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public."users"(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, module_id, section_id)
);

COMMENT ON TABLE public.user_section_state IS
  'Section-level tracking: completion, engagement (time spent), last access time.';
COMMENT ON COLUMN public.user_section_state.time_spent_seconds IS
  'Cumulative time user spent on section. Can be approximated from timestamps if not explicitly tracked.';

-- ────────────────────────────────────────────────────────────────────────────
-- 5. QUIZ SUBMISSIONS & RESULTS
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public."users"(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT FALSE,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.user_quiz_attempts IS
  'Complete history of quiz attempts per module. Each row = one submission.';
COMMENT ON COLUMN public.user_quiz_attempts.answers IS
  'JSON: { question_key: selected_option_id, ... }. Allows audit trail and review.';
COMMENT ON COLUMN public.user_quiz_attempts.passed IS
  'Derived from: score >= (total_questions * 0.8). Threshold may be configurable.';

-- ────────────────────────────────────────────────────────────────────────────
-- 6. TRIGGERS FOR TIMESTAMP AUTOMATION
-- ────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_user_course_enrollments_updated_at ON public.user_course_enrollments;
CREATE TRIGGER set_user_course_enrollments_updated_at
BEFORE UPDATE ON public.user_course_enrollments
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();

DROP TRIGGER IF EXISTS set_user_course_progress_updated_at ON public.user_course_progress;
CREATE TRIGGER set_user_course_progress_updated_at
BEFORE UPDATE ON public.user_course_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();

DROP TRIGGER IF EXISTS set_user_module_progress_updated_at ON public.user_module_progress;
CREATE TRIGGER set_user_module_progress_updated_at
BEFORE UPDATE ON public.user_module_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();

DROP TRIGGER IF EXISTS set_user_section_state_updated_at ON public.user_section_state;
CREATE TRIGGER set_user_section_state_updated_at
BEFORE UPDATE ON public.user_section_state
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();

DROP TRIGGER IF EXISTS set_user_quiz_attempts_updated_at ON public.user_quiz_attempts;
CREATE TRIGGER set_user_quiz_attempts_updated_at
BEFORE UPDATE ON public.user_quiz_attempts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();

-- ────────────────────────────────────────────────────────────────────────────
-- 7. ROW-LEVEL SECURITY
-- ────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.user_course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_section_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Enable RLS policies: users can only see/modify their own data
DROP POLICY IF EXISTS "user_isolation" ON public.user_course_enrollments;
CREATE POLICY "user_isolation" ON public.user_course_enrollments
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_isolation" ON public.user_course_progress;
CREATE POLICY "user_isolation" ON public.user_course_progress
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_isolation" ON public.user_module_progress;
CREATE POLICY "user_isolation" ON public.user_module_progress
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_isolation" ON public.user_section_state;
CREATE POLICY "user_isolation" ON public.user_section_state
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_isolation" ON public.user_quiz_attempts;
CREATE POLICY "user_isolation" ON public.user_quiz_attempts
  FOR ALL USING (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────────────────────
-- 8. INDEXES FOR QUERY PERFORMANCE
-- ────────────────────────────────────────────────────────────────────────────
-- Primary key and UNIQUE constraints already provide indexes for
-- (user_id) on user_course_progress and the unique tuples on
-- user_module_progress and user_section_state, so they are not redeclared here.

CREATE INDEX IF NOT EXISTS idx_user_module_progress_status
  ON public.user_module_progress(user_id, status);

CREATE INDEX IF NOT EXISTS idx_user_module_progress_module_id
  ON public.user_module_progress(module_id);

CREATE INDEX IF NOT EXISTS idx_user_section_state_completed
  ON public.user_section_state(user_id, module_id, is_completed);

CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_user_module
  ON public.user_quiz_attempts(user_id, module_id);

CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_timestamp
  ON public.user_quiz_attempts(user_id, attempted_at DESC);

-- ────────────────────────────────────────────────────────────────────────────
-- 9. BOOKING BOX SUBMISSIONS
-- ────────────────────────────────────────────────────────────────────────────
-- Visitor/user contact submissions from the website booking form.

CREATE TABLE IF NOT EXISTS public.booking_box_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public."users"(id) ON DELETE SET NULL,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0),
  email TEXT NOT NULL CHECK (position('@' in email) > 1),
  message TEXT NOT NULL CHECK (length(trim(message)) > 0),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'resolved', 'spam')),
  source_page TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.booking_box_submissions IS
  'Stores booking/contact form submissions from the website booking box.';
COMMENT ON COLUMN public.booking_box_submissions.status IS
  'Workflow status for triage: new | in_review | resolved | spam.';
COMMENT ON COLUMN public.booking_box_submissions.source_page IS
  'Optional page path where the form was submitted (for attribution).';

DROP TRIGGER IF EXISTS set_booking_box_submissions_updated_at ON public.booking_box_submissions;
CREATE TRIGGER set_booking_box_submissions_updated_at
BEFORE UPDATE ON public.booking_box_submissions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();

ALTER TABLE public.booking_box_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_submit_booking_box" ON public.booking_box_submissions;
CREATE POLICY "public_submit_booking_box" ON public.booking_box_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "user_read_own_booking_box" ON public.booking_box_submissions;
CREATE POLICY "user_read_own_booking_box" ON public.booking_box_submissions
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_booking_box_submissions_email
  ON public.booking_box_submissions(email);

CREATE INDEX IF NOT EXISTS idx_booking_box_submissions_status_created
  ON public.booking_box_submissions(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_booking_box_submissions_user_id
  ON public.booking_box_submissions(user_id);
