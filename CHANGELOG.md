# Changelog

## v2.1.0 — built for everyone (students · employees · travellers · dependents)
Product reframed to serve four audiences, with the dependent/family segment (often the most underserved) built for explicitly.
- **Phrasebook** (`/tools/phrasebook`): offline survival phrases with audio for Dutch, French, Japanese — basics, getting around, eating out, shopping, health & emergency, making friends (with romaji for Japanese).
- **Documents & deadlines** (`/tools/deadlines`): track passport, visa, residence permit, insurance and licence expiry; days-left with amber/red warnings. Private, on-device.
- **Persona layer** on the dashboard: "Who are you here as?" (Student · Relocating for work · Travelling · Joining family/dependent) with tailored next steps for each.
- **Dependent / family guidance**: work-rights-on-a-dependent-visa notes per country on the Visa pages (JP Dependent status + part-time permission, NL/FR family permits), routing to community.

## v2.0.0
New features (market-driven):
- **Daily review — spaced repetition + streaks** (`/[country]/language/review`): Leitner SRS over vocab, "Again/Got it" grading, due scheduling, daily streak. The retention loop a language community needs. A "🔥 Review (n)" button shows due count on each course.
- **Public profiles** (`/u/[handle]`) and **member directory** (`/community/members`): shareable profiles with badges, languages and map; a growth + SEO loop. Reads the Supabase `public_profiles` view.
- **Settle-in checklist** (`/tools/settle`): the after-you-arrive admin for Japan, the Netherlands, France — register address, bank, health insurance, SIM, utilities — with tick-off progress. The "arrive-ready" differentiator.

Hardening carried from v1.x: Supabase SSR auth + `/auth/callback`, PWA, SEO (sitemap/robots/OG), i18n (EN/FR/JA/NL), progress sync.

## v1.x
Full port of For a Reason to Next.js 16 (App Router, TS, Tailwind): Travel + Places + guides, Language courses + mock tests, Visa, Remote & nomad, Roads, Tools (itinerary/Schengen/road-trip/letters/visa-check/cost), profile, dashboard, community, about.
