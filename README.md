# Pet Care by Akasha

Pet shop + house-call vet booking platform for Lahore, Pakistan.

## Stack
- Next.js (App Router) + Tailwind CSS
- Supabase (Postgres, Auth, Storage) — free tier
- Vercel (hosting) — free tier
- Resend (transactional email) — free tier
- Google Gemini API (AI chat assistant) — free tier, replaces Anthropic/OpenAI to avoid per-token costs
- Cash on delivery/visit only for payments (no online payment gateway for MVP)

## Project context
Full requirements, decisions, and design direction are in `docs/website-requirements.md`.
Read this file first before generating any code — it's the source of truth for scope,
features, tech choices, and things explicitly ruled out.

## Assets
Logo files are in `public/logo/`:
- `logo-primary.svg` — main lockup, use in header/most pages
- `logo-icon.svg` — standalone icon, use for favicon/app icon/social profile
- `logo-reversed.svg` — light-on-dark version, use for footers/dark backgrounds

## First Windsurf prompt
Suggested first message to Windsurf once this folder is open:

> Read docs/website-requirements.md fully first. Then scaffold a Next.js 14 (App Router)
> + Tailwind CSS + Supabase project matching the tech stack section. Set up the folder
> structure (src/app, src/components, src/lib) and the sitemap pages as empty route files
> to start, before building out any single page in full.

## Environment variables (create .env.local, never commit it)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
GOOGLE_GEMINI_API_KEY=
```
No payment gateway variables are needed — COD only for MVP.
