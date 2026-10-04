# For a Reason — Next.js (v2)

Built for students, relocating employees, travellers, and dependents/family. Non-profit, open source.

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

## PWA
Installable and offline-capable: web manifest (`app/manifest.ts`), a service worker (`public/sw.js`) with
app-shell + runtime caching, an `/offline` fallback, and an install prompt (`components/PWA.tsx`). Icons live
in `public/icons`. Offline covers client-rendered pages you have opened; server-rendered/auth routes show the
offline page when there is no network. As features are ported as client components, they are covered by the
same caching. (The existing vanilla app is already a fully offline PWA with every feature.)

## Routes so far
- `/` dashboard + start-a-journey
- `/[country]/[topic]` course home (per-topic accent colour)
- `/about`, `/community`, `/tools`, `/signin`
- App-style bottom nav on mobile, top nav on desktop

## Ported so far (data-driven)
- **Travel** guide: essentials, getting-around deep-dive, when/budget, top experiences, food, stay, day trips, apps (`/[country]/travel`)
- **Places** grid by city + **place detail** with the pre-written self-guide and transit directions (`/[country]/travel/places`)
- **Cost of living & take-home** calculator for JP/NL/FR with the 30% ruling (`/tools/cost`)
- Data reused as TS modules: `lib/travel.ts`, `lib/cost.ts`

## Ported (round 2)
- **Visa & residency** (`/[country]/visa`): types, journey to citizenship, official links — JP/NL/FR
- **Remote & nomad** (`/[country]/nomad`): options, setup, best bases, remote-job resources, **global DN table + by-passport lens** (interactive)
- Data reused: `lib/visa.ts`, `lib/nomad.ts`, `lib/nomad_global.ts`, `lib/visacheck.ts`

## Ported (round 3)
- **Roads: drive, ride, walk** (`/[country]/road`, JP/NL): reason chips (rules/visit/licence/convert), guide accordion, interactive practice quiz, licence + convert journeys (`lib/roads.ts`, `components/RoadCourse.tsx`)

## Ported (round 4) — Tools planners
- **Day-by-day itinerary** (`/tools/itinerary`): pace + interests, no museum-stacking, over-commit nudge, routed stops with transit directions
- **Schengen trip** (`/tools/itinerary?schengen=1`): combined NL + France with a transfer day
- **Road trip** (`/tools/roadtrip`): caravan-style driving legs with live directions
- Logic reused: `lib/itinerary.ts` (planItinerary, planRoadTrip)

## Ported (rounds 5-6)
- **PDF letters** (`/tools/letters`): cover, sponsorship (with passport + local ID), invitation — fillable PDFs via pdf-lib; itinerary PDF export added to the planner
- **Visa checklist** (`/tools/visa-check`): by passport (Indian/US/EU/UK/other), visa-free vs required, tick-off document list, links to the letter generators
- Reused: `lib/pdf.ts`, `lib/visacheck.ts`

## Ported (round 7) — Language engine
- **Language courses** (`/[country]/language`, Dutch/French/Japanese): level selector, Core words (flashcard + listen), Grammar & drills (shuffled MCQ with feedback), Build sentences (reveal + listen)
- **Mock tests** (`/[country]/language/exam`): per-level, Reading and Listening sections, shuffled options, scoring with pass mark, listening plays audio (TTS), no-fail feedback
- Data reused: `lib/lang-data.ts` (NL NT2, FR DELF, JP JLPT), `lib/lang.ts`

## Ported (round 8) — profiles, dashboard, content, SEO
- **Profile** (`/profile`): Supabase-backed view/edit (name, handle, from, bio, public toggle), sign out
- **Dashboard** (`/`): real progress from local store + Supabase name, "what you're doing" task list with per-topic colour, start-a-journey search
- **Community & About**: full ported content (story, facts, inclusivity, safety)
- **SEO**: `sitemap.ts`, `robots.ts`, per-route metadata

## Ported (round 9) — progress sync + i18n
- **Progress & badges sync to Supabase** (`progress._all`): local store merges with the account on load, pushes on change
- **i18n**: UI in English, French, Japanese, Dutch, with a language switcher (persisted). Nav, dashboard, course tabs and mock test translated; English fallback for the rest
- Reused: `lib/i18n/strings.ts`, `components/i18n/*`, `lib/progress-sync.ts`

## Hardening (final)
- Auth callback route (`/auth/callback`) — Supabase PKCE code exchange so sign-in completes on deploy
- `metadataBase` + OpenGraph/Twitter cards + favicon/app icons
- Proper 404 page; middleware migrated to Next 16 `proxy`
- Defensive guards on language data; data verified complete across all levels
- Full route smoke test: every page 200, invalid 404, zero console errors
- `DEPLOY.md` with exact GitHub → Supabase → Vercel steps; `supabase/schema.sql` included

## Optional / later
- Travel: essentials, getting-around deep-dive, places + detail guides, when/budget

Port these as components/route segments; reuse the data objects (travel/visa/nomad/cost) as TS modules.
