# Deploy — For a Reason (Next.js)

No build hacks, no secrets in the repo. Supabase anon key is public (RLS protects data).

## 1. Push to GitHub
```
git init && git add -A && git commit -m "For a Reason (Next.js)"
git branch -M main
git remote add origin https://github.com/codefromtokyo/forareason.git
git push -u origin main
```

## 2. Supabase
1. Create a project (or reuse yours).
2. SQL Editor → run `supabase/schema.sql` (profiles, declared_languages, places, progress, RLS, trigger).
3. Authentication → URL Configuration:
   - Site URL: your deployed URL
   - Redirect URLs: add `https://YOUR-URL/auth/callback` (required — login completes here)
4. Optional: Authentication → Providers → Google (paste a Google OAuth client ID + secret).

## 3. Vercel
1. Import the GitHub repo (auto-detects Next.js).
2. Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SITE` (optional — your URL, used by sitemap/robots)
3. Deploy.

## Test
- Open the URL, Sign in → email → open the magic link → you land signed in; "You" opens your profile.
- Install the PWA (Add to home screen). Offline shell works for pages you've opened.

Never put the Supabase `service_role` key or a Google client secret in the repo or Vercel env.
