# Deployment Runbook

This app has no platform behind it anymore — you're deploying it the way
you'd deploy any Next.js + Prisma app. This is the order to do it in.

## 1. Push the code to GitHub

If this isn't already a git repo:

```bash
git init
git add .
git commit -m "Initial commit — off the Polsia platform, maintained via Claude"
```

Create a GitHub repo (via github.com or `gh repo create`) and push to it.
Vercel deploys from a connected GitHub repo, so this needs to happen first.

## 2. Provision Postgres

Pick one — any of these gives you a `DATABASE_URL` connection string:

| Provider | Notes |
| --- | --- |
| **Vercel Postgres** (Neon-backed) | Simplest if you're hosting on Vercel — provision it from the same project dashboard, `DATABASE_URL` is added to your project's env vars automatically. |
| **Neon** (neon.tech) | Generous free tier, works from any host. Copy the connection string from their dashboard — use the "pooled connection" string for serverless hosts like Vercel. |
| **Supabase** | Also gives you a dashboard/auth/storage if you want them later. Use the connection string under Project Settings → Database. |
| **Railway** | Good if you're also hosting the app on Railway — one dashboard for both. |

Whichever you pick, you need `?sslmode=require` on the connection string
(most providers include it by default) — `env.ts` requires a valid URL but
doesn't enforce SSL itself.

You do **not** need to run migrations manually right now — step 4 does that
automatically on every deploy via the `vercel-build` script.

## 3. Create the Vercel project

1. In the Vercel dashboard, "Add New… → Project," import the GitHub repo.
2. Vercel auto-detects Next.js from `vercel.json`'s `framework: "nextjs"`.
   It will use the `vercel-build` script in `package.json` automatically —
   Vercel prefers a `vercel-build` script over the plain `build` script when
   one exists, so `prisma migrate deploy` runs before `next build` on every
   deploy without any extra configuration.
3. Before the first deploy, set environment variables (Project Settings →
   Environment Variables):
   - `DATABASE_URL` — from step 2 (skip if you provisioned Vercel Postgres
     in the same project — it's added automatically).
   - `NEXT_PUBLIC_APP_URL` — your production URL, e.g.
     `https://thoughtfuldesign.ky` (or the `*.vercel.app` URL until you attach
     a custom domain).
   - `SEO_INDEXABLE` — set to `true` on the Production environment only,
     so previews stay disallowed from indexing.
   - `CRON_SECRET` — only if you're using the cron pattern (step 4 below);
     any long random string.
4. Deploy. Watch the build log — you should see `prisma migrate deploy`
   apply your migrations, then `next build` compile the app.

## 4. Verify the deploy

- Visit `/health` on your new deploy — `src/app/health/route.ts` is a plain
  200 OK healthcheck.
- Visit `/contact`, submit a test inquiry, confirm it lands in Postgres
  (`npm run db:studio` locally against the same `DATABASE_URL`, or your
  provider's dashboard, to check the `contact_message` table).
- Check `/robots.txt` and `/sitemap.xml` reflect `SEO_INDEXABLE`.

## 5. Custom domain (optional)

Project Settings → Domains → add `thoughtfuldesign.ky` (or whatever you own),
follow Vercel's DNS instructions, then update `NEXT_PUBLIC_APP_URL` to match
and redeploy (it feeds canonical URLs, the sitemap, and OG images).

## 6. Recurring jobs (optional — skip if you don't need any yet)

See `AGENTS.md` → "Recurring Jobs" for the full pattern. Short version once
you have a real job written at `src/app/api/cron/<name>/route.ts`:

```json
// vercel.json
{
  "framework": "nextjs",
  "crons": [
    { "path": "/api/cron/<name>", "schedule": "0 9 * * *" }
  ]
}
```

Set `CRON_SECRET` in Vercel's env vars if you haven't already, redeploy, and
Vercel will trigger the route on that schedule with the auth header the
route expects.

## Rollback

Every Vercel deploy is kept and instantly promotable from the dashboard —
if a deploy breaks something, promote the previous one while you fix it. For
a database-schema change specifically, Prisma migrations are forward-only by
design (see `prisma/migrations/`); rolling back a schema change means
writing a new migration that reverses it, not deleting the old one.

## What's Deliberately Not Automated Here

- No CI workflow file is included. If you want lint/typecheck/test to run on
  every PR before Vercel even attempts a deploy, add a GitHub Actions
  workflow that runs `npm run lint && npm run typecheck && npm run test` —
  ask Claude to write one when you're ready for it.
- No staging environment beyond Vercel's automatic preview deploys (every
  branch/PR gets one for free — that's usually enough for a site this size).
