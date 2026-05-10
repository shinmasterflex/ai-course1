-- Initial Supabase schema for persisted learning state.
-- Run this in the Supabase SQL editor before deploying the client-side persistence changes.

CREATE TABLE IF NOT EXISTS public.user_course_progress_snapshots (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL DEFAULT 'swift-course',
  state JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, course_slug)
);

CREATE TABLE IF NOT EXISTS public.user_section_progress_states (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  state_key TEXT NOT NULL DEFAULT 'default',
  state JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, state_key)
);

CREATE TABLE IF NOT EXISTS public.user_module_quiz_results (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  results JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, module_id)
);

CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_user_course_progress_snapshots_updated_at ON public.user_course_progress_snapshots;
CREATE TRIGGER set_user_course_progress_snapshots_updated_at
BEFORE UPDATE ON public.user_course_progress_snapshots
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_timestamp();

DROP TRIGGER IF EXISTS set_user_section_progress_states_updated_at ON public.user_section_progress_states;
CREATE TRIGGER set_user_section_progress_states_updated_at
BEFORE UPDATE ON public.user_section_progress_states
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_timestamp();

DROP TRIGGER IF EXISTS set_user_module_quiz_results_updated_at ON public.user_module_quiz_results;
CREATE TRIGGER set_user_module_quiz_results_updated_at
BEFORE UPDATE ON public.user_module_quiz_results
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_timestamp();

ALTER TABLE public.user_course_progress_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_section_progress_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_quiz_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their course progress" ON public.user_course_progress_snapshots;
CREATE POLICY "Users can read their course progress"
ON public.user_course_progress_snapshots
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their course progress" ON public.user_course_progress_snapshots;
CREATE POLICY "Users can insert their course progress"
ON public.user_course_progress_snapshots
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their course progress" ON public.user_course_progress_snapshots;
CREATE POLICY "Users can update their course progress"
ON public.user_course_progress_snapshots
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their course progress" ON public.user_course_progress_snapshots;
CREATE POLICY "Users can delete their course progress"
ON public.user_course_progress_snapshots
FOR DELETE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read their section progress" ON public.user_section_progress_states;
CREATE POLICY "Users can read their section progress"
ON public.user_section_progress_states
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their section progress" ON public.user_section_progress_states;
CREATE POLICY "Users can insert their section progress"
ON public.user_section_progress_states
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their section progress" ON public.user_section_progress_states;
CREATE POLICY "Users can update their section progress"
ON public.user_section_progress_states
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their section progress" ON public.user_section_progress_states;
CREATE POLICY "Users can delete their section progress"
ON public.user_section_progress_states
FOR DELETE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read their quiz results" ON public.user_module_quiz_results;
CREATE POLICY "Users can read their quiz results"
ON public.user_module_quiz_results
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their quiz results" ON public.user_module_quiz_results;
CREATE POLICY "Users can insert their quiz results"
ON public.user_module_quiz_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their quiz results" ON public.user_module_quiz_results;
CREATE POLICY "Users can update their quiz results"
ON public.user_module_quiz_results
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their quiz results" ON public.user_module_quiz_results;
CREATE POLICY "Users can delete their quiz results"
ON public.user_module_quiz_results
FOR DELETE
USING (auth.uid() = user_id);
