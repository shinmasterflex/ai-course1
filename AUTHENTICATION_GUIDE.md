# Authentication & Password Troubleshooting Guide

## How Passwords Are Stored

Your application uses **Supabase Authentication** for secure password management:

- **Passwords are hashed using bcrypt** and stored in Supabase's `auth.users` table
- **Your Prisma database does NOT store passwords** - only user profile information (id, email, name)
- Passwords are never stored in plain text
- Password requirements: Minimum 6 characters (configurable in Supabase dashboard)

## Architecture

```
User Registration/Login Flow:
1. User enters credentials → Frontend (Next.js)
2. Frontend calls Supabase Auth API
3. Supabase securely hashes & stores password
4. Supabase returns authentication token
5. App syncs user profile to Prisma database (without password)
```

## Common Login Issues & Solutions

### Issue 1: "Invalid login credentials"

**Possible Causes:**
- Wrong email or password
- Email not confirmed yet
- Extra spaces in email field
- Caps Lock is on
- Account doesn't exist

**Solutions:**
1. Double-check your email and password (case-sensitive)
2. Make sure you confirmed your email (check spam folder)
3. Use the "Forgot Password" link to reset
4. Try the password reset flow from `/sign-in`

### Issue 2: "Email not confirmed"

**Solution:**
1. Check your email inbox for confirmation link
2. Check spam/junk folder
3. Click the confirmation link
4. If link expired, register again with same email

### Issue 3: Can't remember which email I used

**Solution:**
1. Try all your email addresses
2. Check email for "Welcome" or confirmation emails
3. Contact admin to check account

### Issue 4: Password reset not working

**Possible Issues:**
- Password reset email in spam
- Email link expired (valid for 1 hour)
- Browser blocking cookies

**Solution:**
1. Check spam folder
2. Request new password reset link
3. Click link within 1 hour
4. Make sure cookies are enabled

## New Features Added

### 1. Password Reset Flow
- Visit `/sign-in`
- Click "Forgot your password?"
- Enter your email
- Check email for reset link
- Click link → redirected to `/update-password`
- Enter new password (min 6 characters)
- Done!

### 2. Better Error Messages
- Clear, helpful error messages on login page
- No more generic alerts
- Specific guidance for each error type

### 3. Bot Protection (Turnstile + Rate Limiting)
- Sign-in, registration, and password reset now require a Turnstile challenge.
- Auth-related API endpoints and AI chat endpoint now have request throttling.
- A hidden honeypot field blocks basic scripted form submissions.

## Testing Your Login

### Method 1: Normal Flow
1. Go to `/sign-in`
2. Enter email and password
3. Should redirect to `/educ` on success

### Method 2: Password Reset Confirmation
1. Go to `/sign-in`
2. Click "Forgot your password?"
3. Request a reset email
4. Confirm the email arrives and opens `/update-password`

## Supabase Dashboard Access

As an admin, you can check user accounts directly:

1. Go to https://supabase.com/dashboard
2. Select your project (`dmrfgptdovihbqmpmahg`)
3. Go to Authentication → Users
4. Search for user by email
5. Check:
   - Email Confirmed (should be green checkmark)
   - Last Sign In
   - Created At

## Manual User Verification

If a user is having issues, you can manually verify them:

```sql
-- In Supabase SQL Editor
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'user@example.com';
```

## Resetting a User's Password (Admin)

In Supabase Dashboard:
1. Authentication → Users
2. Find the user
3. Click the `...` menu
4. Select "Send password recovery email"

## Security Best Practices

✅ **Current Implementation:**
- Passwords hashed with bcrypt
- Secure token-based authentication
- Email confirmation required
- HTTPS required in production
- Session management via cookies
- Bot challenge on auth forms (Cloudflare Turnstile)
- Route-level throttling for auth + AI endpoints

❌ **Not Implemented Yet (Consider Adding):**
- Two-factor authentication (2FA)
- Password strength requirements (currently just 6 chars)
- Account lockout after failed attempts
- Password history (prevent reuse)

## Troubleshooting Checklist

- [ ] Is the user using the correct email?
- [ ] Is the password case-sensitive match?
- [ ] Has the user confirmed their email?
- [ ] Check Supabase dashboard - does user exist?
- [ ] Is email_confirmed_at populated?
- [ ] Try password reset flow
- [ ] Check browser console for errors
- [ ] Test the password reset flow from `/sign-in`
- [ ] Verify NEXT_PUBLIC_SUPABASE_URL and keys are correct
- [ ] Check if Supabase project is active (not paused)

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://dmrfgptdovihbqmpmahg.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL=https://buy.stripe.com/your_payment_link
STRIPE_SECRET_KEY=sk_live_... (or sk_test_...)
STRIPE_PAYMENT_LINK_ID=plink_... (optional but recommended)
STRIPE_REGISTRATION_PRICE_ID=price_... (required for dynamic checkout session flow)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...
BOT_PROTECTION_REQUIRED=true
```

### Turnstile Setup

1. Create a Cloudflare Turnstile widget for your domain.
2. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in your deployment environment.
3. For local development, either:
   - use Cloudflare test keys, or
   - set `BOT_PROTECTION_REQUIRED=false`.

When `BOT_PROTECTION_REQUIRED=true` (or in production), missing Turnstile server keys will block protected requests.

## Stripe Payment Link Registration Flow

Course registration is now payment-gated via Stripe:

1. User opens `/register`
2. User pays using `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL`
3. Stripe redirects back to `/register?session_id={CHECKOUT_SESSION_ID}`
4. App verifies the session server-side using `STRIPE_SECRET_KEY`
5. Account creation/unlock is allowed only after paid session verification

In your Stripe Payment Link settings, set **After payment → Redirect to URL** as:

`https://your-production-domain.com/register?session_id={CHECKOUT_SESSION_ID}`

## Email Confirmation Redirect Configuration

If confirmation links open `localhost` (or show "localhost refused to connect"), verify both app and Supabase settings:

1. Set `NEXT_PUBLIC_SITE_URL` to your live domain in your deployment environment.
2. In Supabase Dashboard → Authentication → URL Configuration:
    - Set **Site URL** to your live domain (for example `https://your-production-domain.com`)
    - Add redirect URLs used by this app, including:
       - `https://your-production-domain.com/auth/callback`
       - `http://localhost:3000/auth/callback` (for local development only)

If a redirect URL is not allow-listed in Supabase, it may fall back to Site URL and appear to ignore your client-side redirect setting.

## Support Resources

- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth
- **Password Reset Docs:** https://supabase.com/docs/guides/auth/passwords

## Quick Fixes Script

If many users are having issues, you can verify all unconfirmed users:

```sql
-- See all unconfirmed users
SELECT email, created_at, email_confirmed_at
FROM auth.users
WHERE email_confirmed_at IS NULL
ORDER BY created_at DESC;

-- Manually confirm all (use with caution!)
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
```

## Next Steps for Improvement

1. **Add 2FA** - Extra security layer
2. **Password strength meter** - Visual feedback on password quality
3. **Remember me** - Optional longer sessions
4. **Social login** - Google/GitHub OAuth
5. **Account recovery** - Security questions or backup email
6. **Audit logging** - Track all auth events
7. **Distributed rate limiting** - Move throttling store to Redis/Upstash for multi-instance deployments

---

Last Updated: March 3, 2026
