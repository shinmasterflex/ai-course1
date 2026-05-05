-- Keep public.users aligned with Supabase auth.users.
-- This guarantees users appear in Table Editor even if app-level sync misses callback timing.

CREATE OR REPLACE FUNCTION public.sync_auth_user_to_public_users()
RETURNS trigger
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
    NEW.id::text,
    lower(trim(NEW.email)),
    NULLIF(trim(COALESCE(NEW.raw_user_meta_data ->> 'first_name', '')), ''),
    NULLIF(trim(COALESCE(NEW.raw_user_meta_data ->> 'last_name', '')), ''),
    NOW(),
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

-- Backfill existing auth users into public.users.
INSERT INTO public."users" (
  "id",
  "email",
  "firstName",
  "lastName",
  "createdAt",
  "updatedAt"
)
SELECT
  au.id::text,
  lower(trim(au.email)),
  NULLIF(trim(COALESCE(au.raw_user_meta_data ->> 'first_name', '')), ''),
  NULLIF(trim(COALESCE(au.raw_user_meta_data ->> 'last_name', '')), ''),
  COALESCE(au.created_at, NOW()),
  NOW()
FROM auth.users AS au
WHERE au.email IS NOT NULL
ON CONFLICT ("id") DO UPDATE
  SET
    "email" = EXCLUDED."email",
    "firstName" = EXCLUDED."firstName",
    "lastName" = EXCLUDED."lastName",
    "updatedAt" = NOW();