# Clean Slate Reset Checklist

Use this checklist to fully reset your dev environment between test cycles. Takes ~2 minutes.

## Step 1: Reset Prisma Database (1 min)
```powershell
pnpm prisma migrate reset --force
pnpm prisma db seed
```

**What this does:**
- Drops all tables and recreates from migrations
- Reseeds baseline course/module data
- All user progress, attempts, quiz data cleared

---

## Step 2: Clear Supabase Auth Users (1 min)

### Option A: Via Dashboard (easier)
1. Open Supabase project → `Authentication` → `Users`
2. Select all users shown
3. Delete them
4. Confirm

### Option B: Via SQL (if dashboard is slow)
1. Go to Supabase SQL editor
2. Run:
```sql
DELETE FROM auth.identities;
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.users;
```

**What this does:**
- Removes all auth accounts
- Invalidates all email confirmation links
- Resets auth state completely

---

## Step 3: Clear Browser Storage (30 sec)

### Option A: Dev Tools
1. Open browser DevTools (`F12`)
2. Go to `Application` tab
3. Under `Storage`:
   - `Local Storage` → Select `http://localhost:3000` → `Clear All`
   - `Session Storage` → Select `http://localhost:3000` → `Clear All`
   - `Cookies` → Delete all for `localhost`

### Option B: One-liner in Console
```javascript
localStorage.clear();
sessionStorage.clear();
document.cookie.split(";").forEach(c => {
  const name = c.split("=")[0].trim();
  document.cookie = `${name}=; max-age=0`;
});
console.log('Storage cleared');
```

**What this does:**
- Removes cached progress: `cognijin_progress:*`, `cognijin_position:*`
- Removes session data and auth cookies
- Browser will forget old auth tokens

---

## Step 4: Verify Clean State

1. **Browser**: Hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`)
   - Should show logged-out state
   - Progress sidebar empty

2. **Terminal**: Restart dev server
   ```powershell
   # Stop current server (Ctrl+C)
   pnpm dev
   ```

3. **Test signup**:
   - Go to `/register`
   - Create new account with test email
   - Should work with no old progress carryover

---

## Quick Reference: Key Storage Keys

If you only want to clear progress (not auth/session):

```javascript
// Client-side progress namespaced keys
localStorage.removeItem('cognijin_progress:anonymous');
localStorage.removeItem('cognijin_position:anonymous');
localStorage.removeItem('cognijin-progress:anonymous');

// Active user tracker
localStorage.removeItem('cognijin_active_user');
```

---

## Troubleshooting

**"Email already registered" after reset?**
- Supabase Auth users weren't deleted. Use Step 2 above.

**Old progress still showing?**
- Browser cache not cleared. Use Step 3 with hard refresh.

**Dev server showing stale data?**
- Restart dev server after Prisma reset (Step 4).

