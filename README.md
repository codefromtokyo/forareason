# For a Reason — Next.js (migration foundation)

A proper Next.js 16 App Router app (TypeScript, Tailwind, Supabase SSR auth) that is the new foundation for
For a Reason. It builds and deploys natively on Vercel. Content and features are ported into it from the
existing vanilla-JS app route by route.

## Stack
- Next.js 16 (App Router, RSC) + React 19 + TypeScript
- Tailwind CSS
- Supabase auth via `@supabase/ssr` (server client, browser client, middleware session refresh) — email
  magic-link and Google, done the idiomatic Next way (cookies, no config.js hack)

## Setup
```
npm install
cp .env.local.example .env.local   # fill in your Supabase URL + anon key
npm run dev
```

## Environment variables (Vercel → Settings → Environment Variables)
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the anon/public key (public; ships to the browser)

Never set the Supabase `service_role` key or a Google client secret here.

## Deploy
Push to GitHub, import to Vercel. It auto-detects Next.js; no build hacks. Add the two env vars, and add your
site URL to Supabase → Authentication → URL Configuration → Redirect URLs.

## Routes so far
- `/` dashboard + start-a-journey
- `/[country]/[topic]` course home (per-topic accent colour)
- `/about`, `/community`, `/tools`, `/signin`
- App-style bottom nav on mobile, top nav on desktop

## What still needs porting (from the vanilla app)
- Language course: syllabus, SRS vocab, drills, sentence build, mock exams, readiness
- Travel: essentials, getting-around deep-dive, places + detail guides, when/budget
- Roads, Visa & residency, Remote & nomad (incl. global DN table + by-passport lens)
- Tools internals: itinerary/Schengen/road-trip planners, cost calculator, PDF letters (pdf-lib),
  visa checklist
- Profiles + public profiles, badges, community pages content, i18n (hi/fr/ja/nl)
- Service worker / offline, SEO landing pages

Port these as components/route segments; reuse the data objects (travel/visa/nomad/cost) as TS modules.
