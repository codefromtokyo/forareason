# For a Reason

**Break the language gap, together.** A free, non-profit, open-source community that learns the language, road rules and tests a new country asks of them, for a real reason, and helps each other land. Built by Sakshi, from Himachal to Tokyo.

| Course | Test | Levels | Mock test parts |
|---|---|---|---|
| English → Dutch | Staatsexamen NT2 (CEFR) | A1, A2, B1, B2 | Lezen, Luisteren, Schrijven, Spreken |
| English → French | DELF | A1, A2, B1, B2 | Compréhension des écrits, de l'oral, production écrite, orale |
| English → Japanese | JLPT | N5, N4, N3, N2, N1 | 文字・語彙, 文法・読解, 聴解 |
| Driving in Japan | 外免切替 knowledge test | road path | 50 two-choice questions, 45 to pass |
| Driving in the Netherlands | CBR theory (car, B) | road path | 50 questions, 30 min, 44 to pass |
| Visa & residency (JP/NL/FR) | — (overview) | visa path | Types, journey to citizenship, basics check |

Non-profit and open source (MIT), improved by the community. See CONTRIBUTING.md.

The syllabus, exercises and mock tests are AI-generated and can contain mistakes. Report them in [Issues](https://github.com/codefromtokyo/forareason/issues). Not affiliated with the JLPT, the Staatsexamen NT2, France Éducation international, CBR or any police or licensing authority. Road guides are not legal advice.

## Repo layout

- `index.html`, `about/`, `learn-dutch/`, `learn-japanese/`: built site (deployed as-is)
- `src/`: sources. Edit here, then rebuild: `cd src && python3 build.py && python3 about.py`
- `src/cities.json`: the travel map on the About page. Add a city as you travel, then rebuild.
- `api/`: Vercel functions for AI marking
- `.github/ISSUE_TEMPLATE/content-error.yml`: the form behind every "Report a mistake" link
- `prompts/fix-content.md`: prompt for an AI agent to triage reports and open fix PRs

## Community (WhatsApp-driven)

The Community tab and `/community/` page describe a WhatsApp-run community: fellow learners and travellers who help each other land, find **house shares**, and get around. It is **women-tuned and safe-first**. There is no in-app messaging or listings; people coordinate on WhatsApp.

Set the links in `/config.js`:
- `WHATSAPP_COMMUNITY`: main invite (e.g. `https://chat.whatsapp.com/...`)
- `WHATSAPP_WOMEN`: optional women-only room invite
- `REPORT_CONTACT`: where scam reports go, a `https://wa.me/<number>` or `mailto:` link

**Report a scammer** opens that contact with a prefilled message; users attach screenshots there, and admins block the person from the community. Until the links are set, Join shows "coming soon" and Report falls back to a GitHub safety issue.

## Accounts and profiles

- **Real Google sign-in and multi-user sync** are wired through Supabase and turn on automatically when `config.js` has `SUPABASE_URL` and `SUPABASE_ANON_KEY`. Until then, it runs in local-only preview: a profile on the device only.

### Sign-in is live (Supabase)

**Email magic-link works now** against the live project (Supabase email auth is on by default): enter an email on the sign-in screen and open the link. **Google** is optional and needs a one-time setup below.

In the Supabase dashboard, Authentication → URL Configuration, add your deployed site URL (and custom domain) to **Redirect URLs**, or magic links will bounce back.

A Supabase project (`forareason`, Tokyo region) is already created, the schema is applied, and the keys are in `/config.js`. To finish:
1. In the Supabase dashboard, Authentication → Providers → enable **Google** (add a Google OAuth client ID and secret, redirect URL your site).
2. Deploy. Sign-in, profile and progress then sync to the account and follow the user across devices.

Profiles are **public by default** (each has a shareable link `/?u=<id>`), stored with row-level security: owners edit their own rows, anyone can read public profiles, languages and places, and progress stays private. A trigger creates a public profile row on sign-up.
- Profiles are **self-declared**: reasons, languages with the level you say you have (e.g. Japanese N2), and your map of places (living, visited, going next, where you're from). Nothing is verified. We trust people to be honest; the official test is where you verify yourself.
- Real Google sign-in later: enable the Google provider in Supabase, run `supabase/schema.sql` (profiles, declared languages, places, progress, with row-level security), and replace `Auth` in `src/app.js` with `supabase.auth.signInWithOAuth({ provider: "google" })` plus load/save of the profile and progress rows.

## Fixing AI-generated content

1. Learners tap **Report a mistake** on any word, drill, sentence or mock question. It opens the issue form with the item ID (e.g. `ja/N5/vocab/3`), course, level and item filled in.
2. Issues arrive labelled `content` + `needs-triage`.
3. Run `prompts/fix-content.md` with Claude Code (or fix by hand). It maps each item ID to the exact entry in `src/data_*.js`, verifies the report, and opens one PR per issue.

Enable **Discussions** in the repo settings for the Community link.

## Deploy (Vercel)

    npx vercel --prod

Environment variables (Project → Settings → Environment Variables), then redeploy:

- `ANTHROPIC_API_KEY`: enables AI marking, translations, example answers and new practice content
- `APP_PASSCODE`: recommended; required by `/api/claude`
- `ANTHROPIC_MODEL`: optional, default `claude-sonnet-5`

Without the API key the whole syllabus and all multiple-choice mocks still work.

## Profile data

Profiles now also store: a unique **handle** (for `/u/<handle>` links), the user's **locale**, an **email opt-in** flag, a **terms-accepted** timestamp, and **last-seen**. All are on the live database. Passwords and emails stay in Supabase Auth, never in these tables. There's no payment, ID-number, or voice data.

## Public profiles and sitemap

- Every profile is public by default and shareable at `/?u=<id>`; owners can make it private in Edit profile.
- `/sitemap/` is a human-readable sitemap of every page, plus a live directory of public members pulled from Supabase.
- `/sitemap.xml` lists all static pages. Public member profiles are dynamic; the `public_profiles` view is exposed so a serverless function can extend `sitemap.xml` with them later.

## Topics per country

Each country has up to five topics: **Travel** (practical guide: transport, money, connectivity, etiquette, when to go, budget, top experiences), **Language** (exam course), **Driving & walking**, **Visa & residency**, and **Remote & nomad** (incl. a global digital-nomad table and a by-passport lens). Travel is the friendly front door; the others go deeper for people moving or staying.

## Navigation

Pick a **Country** and a **Topic** (Language · Driving & walking · Visa & residency) in the header; that resolves to the right course. Learning is from English only for now, so the country implies the target language. Inside each course, reason chips (trip / life / student / tech / exam for languages; learn / visit / licence / convert for roads; work / study / family / PR / citizenship for visas) tailor the path.

**Badges** are awarded automatically: finishing a level's mocks, a reason track, a road path or a visa path adds a badge to the profile, and syncs to the account when signed in.

## Interface languages

The app UI and the marketing/About pages come in English, Hindi, French, Japanese and Dutch, served from URL prefixes (`/`, `/hi/`, `/fr/`, `/ja/`, `/nl/`) with `hreflang` alternates and per-language `sitemap` entries. English is the source; other languages fall back to English for any missing app string. To add or complete a language, extend `STR_EXTRA` in `src/i18n_ui.js` and `ABOUT` in `src/about_content.py`, then rebuild.

## Custom domain and SEO

Pages ship with canonical URLs, Open Graph and Twitter cards, JSON-LD (WebApplication, Course, FAQPage, BreadcrumbList), `robots.txt`, `sitemap.xml` and two landing pages (`/learn-dutch/`, `/learn-japanese/`). The site URL defaults to `https://forareason.vercel.app`. After adding a domain:

    sh set-site.sh https://your-domain
    npx vercel --prod

Then submit `https://your-domain/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Road and visa courses

Road courses (`kind:"road"`) cover rules for **drivers, cyclists and pedestrians**, a licence path, and a theory mock in the official format. Visa courses (`kind:"visa"`) are plain-English overviews of the journey from an entry visa to permanent residence and citizenship, with official links and a strong "not legal advice" disclaimer. Content is in `src/roads.js` and `src/visa.js`; facts were checked September 2026 and change often.

## Readiness and feedback

Language courses show a readiness badge (on track / almost / building / take a mock). There are no "fail" badges. When a real exam turns out harder than the course, the mock result offers **"What was missing?"**, which opens a labelled GitHub gap issue so content improves.

## Adding a module

Courses have a `group`: `lang` (language + exam + reason tracks) or `road` (road rules guide, licence path, theory mock). New kinds (e.g. residence permits, citizenship tests) can reuse the same shell: a pack with `kind`, `sections` and data.

## Adding a language

1. Add a data file with levels shaped like `data_ja.js` (vocab, grammar, order, exam).
2. Add a pack to `PACKS` in `packs.js` (levels, test name, speech codes, exam sections, prompts).
3. Add a course to `COURSES` in `app.js`, e.g. `"en-de": { from:"en", to:"de" }`.
4. To teach from a language other than English, add a UI string set to `STR` in `i18n.js` and write meanings in that language.

## Speech

Text to speech uses the device voice for the target language. Speech input uses the browser recogniser, or open-source Whisper (onnx-community/whisper-base via transformers.js, about 80 MB, cached for offline use).
