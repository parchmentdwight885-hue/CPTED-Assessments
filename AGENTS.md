# AGENTS.md — Claude's operating manual for Thoughtful Design

This file is the maintaining agent's contract for this codebase. Claude (via
Claude Code, Claude Cowork, or chat) is the sole AI framework responsible for
building, restyling, and operating this app going forward. There is no
external installer, module registry, or platform agent reading this
repository anymore — the practices below are conventions Claude follows and
updates by hand, not rules mechanically enforced by outside tooling.

## Where This Codebase Came From

This app was originally scaffolded from a third-party Next.js template
(`polsia/template-next`) that shipped a framework/user/shared file-ownership
convention, an installed `contact-form` module, and platform services for
analytics, image hosting, and database provisioning. Those platform services
have been removed:

- The visitor-analytics beacon (`polsia-analytics.tsx`) is deleted. There is
  currently **no analytics on this site**. If you want visitor analytics,
  add a provider of your choice (Plausible, PostHog, GA4, etc.) in
  `src/components/custom/head-content.tsx`.
- `DATABASE_URL` is no longer auto-provisioned by a platform at deploy time.
  Whoever deploys this app must provision Postgres themselves and set
  `DATABASE_URL` (see "Deployment Gaps" below).
- There is no more `polsia.toml` deploy manifest or `[[crons]]` block.
  Recurring jobs (if you add any) need your own scheduler — a host-native
  cron, a Claude Cowork scheduled task, or similar.
- The `contact-form` feature that was installed as a module is still present
  as ordinary app code (`src/app/api/contact/route.ts`,
  `src/lib/contact/schema.ts`, `src/components/custom/contact-form.tsx`,
  `prisma/schema/contact.prisma`). It no longer receives automatic upgrades
  from a module registry — it's just your code now, edit it directly.

The file-ownership tiers below are kept because they're a genuinely useful
convention for keeping a shared shell (layout, security headers, CSP, SEO
plumbing) stable while business logic changes freely — not because anything
enforces them mechanically anymore.

## Ownership Model

`.claude/ownership.json` documents the tier of every notable path. Read it
before editing something you haven't touched before.

| Tier | Examples | Who edits |
| --- | --- | --- |
| `framework_owned` | `src/lib/db.ts`, `src/lib/utils.ts`, `components.json`, `prisma.config.ts`, `AGENTS.md` | Keep as shipped unless you have a specific reason to change the shell. |
| `user_owned` | `src/components/ui/**`, `src/app/(custom)/**`, `src/lib/brand.ts`, `src/lib/nav.ts`, `public/**`, `README.md` | Build and restyle freely — this is where the business lives. |
| `shared` | `src/app/globals.css`, `src/lib/env.ts`, `src/app/layout.tsx`, `proxy.ts`, `next.config.ts`, `package.json` | Edit only through the declared slot markers (`@claude:slot ... start/end`) or the documented merge strategy. |

Source files carry `@claude:framework-owned` / `@claude:user-owned` /
`@claude:shared` banner comments as reader signage. `.claude/ownership.json`
is the more complete reference.

## What Not To Edit Casually

- Anything marked `framework_owned` — it's shared shell (layout, security
  headers, CSP, SEO plumbing, the Prisma singleton). Changing it affects
  every page at once; do it deliberately, not as a side effect of a feature
  change.
- Anything outside the declared `@claude:slot ... start/end` markers in
  shared files (`next.config.ts`, `proxy.ts`, `src/lib/env.ts`,
  `src/app/layout.tsx`, `src/app/globals.css`).
- Don't add `middleware.ts` — Next.js 16 uses `proxy.ts` here.
- Don't add Server Actions — data and mutations go through `/api/*` route
  handlers called via `src/lib/api-client.ts`'s `apiFetch`, validated with a
  shared zod contract from `src/lib/contracts/`.

## Working On This App

1. Business-specific UI and logic go in the user-owned areas:
   - Routes: `src/app/(custom)/<feature>/page.tsx`
   - API handlers: `src/app/api/<resource>/route.ts`
   - Contracts: `src/lib/contracts/<resource>.ts`
   - Business logic: `src/lib/business/<feature>.ts`
   - Custom components: `src/components/custom/<feature>.tsx`
2. Set the product identity in `src/lib/brand.ts` (site name, description,
   PWA/OG colors, and `contactEmail`).
3. Update `src/lib/nav.ts` for every page that should be reachable from the
   header/footer nav — this also drives the sitemap and `/llms.txt`.
4. Keep every new page reachable from the nav or from a page that's already
   reachable. An unlinked page is effectively dead.
5. Run the checks below before shipping.

## Deployment Gaps (read this before deploying)

Since this app came off the Polsia platform, these are no longer handled for
you automatically — but the scaffolding for each is now in place. See
`DEPLOYMENT.md` for the full step-by-step runbook. Short version:

- **Hosting.** `vercel.json` + the `vercel-build` script in `package.json`
  are wired up for Vercel. Other Next.js-compatible hosts (Railway, Render)
  work too — just point their build command at `npm run vercel-build`
  (or run `db:migrate:deploy` then `build` as two steps).
- **Database.** Provision your own Postgres (Neon, Vercel Postgres, Supabase,
  Railway, RDS, etc.) and set `DATABASE_URL` in your host's env/secrets.
  Nothing provisions this for you.
- **Env vars.** `.env.example` documents every variable the app reads. Copy
  it to `.env.local` for local dev; set real values in your host's dashboard
  for production.
- **Recurring jobs.** See "Recurring Jobs" below — the pattern exists, but no
  job runs by default.
- **Image hosting.** `IMAGE_REMOTE_HOSTS` (comma-separated hostnames) lets
  you allow-list a remote image host in `next.config.ts` if you add one.

## Recurring Jobs

There is no more `polsia.toml` `[[crons]]` block. The replacement pattern:

1. Write the job as an authenticated `/api/cron/<job-name>/route.ts` —
   `src/app/api/cron/example/route.ts` is a worked template. It checks an
   `Authorization: Bearer <CRON_SECRET>` header so the route can't be
   triggered by anyone who finds the URL.
2. Set `CRON_SECRET` in your host's env vars (any long random string).
3. Point a scheduler at it:
   - **Vercel Cron** (simplest if you're hosting on Vercel): add an entry to
     `vercel.json`'s `crons` array, e.g.
     `{ "path": "/api/cron/example", "schedule": "0 9 * * *" }` for daily at
     09:00 UTC. Vercel automatically sends the `Authorization` header when
     `CRON_SECRET` is set.
   - **Another host's native cron/scheduled-functions feature**, pointed at
     the same route with the same header.
   - **A Claude Cowork scheduled task**, if you'd rather manage timing from
     there than from your host — have it call the route on a schedule.
4. Delete `src/app/api/cron/example/**` and its `vercel.json` entry if you
   never end up needing a recurring job — it costs nothing to leave, but
   there's no reason to ship an unused example to production.

Keep jobs fast and idempotent — most hosts cap execution time for scheduled
functions (Vercel Hobby: 10s; Pro: longer depending on plan), and a job that
runs more than once (retries, overlapping schedules) must not double up its
effects.

## Local Development

```bash
npm install
npm run typecheck
npm run lint
npm run test
SKIP_ENV_VALIDATION=1 npm run dev
```

`npm run dev` and `npm run build` validate `DATABASE_URL` and
`NEXT_PUBLIC_APP_URL` when `SKIP_ENV_VALIDATION` is not set. Without a
provisioned database, either set the required vars in `.env.local` or prefix
the command with `SKIP_ENV_VALIDATION=1`.

## Data Plane

Product pages are client components. They call route handlers through
`apiFetch` (`src/lib/api-client.ts`), passing a shared zod schema so the
response is validated at runtime, not just cast.

Each resource should have one shared contract in
`src/lib/contracts/<resource>.ts`, imported by both the route handler and the
client page. Route-handler validation errors use:

```ts
{ errors: { fieldName: 'Message' } }
```

Client forms map those with `applyServerErrors` (`src/lib/forms.ts`).
Transient success/failure feedback uses `toast` from `sonner`.

## UI

`src/components/ui/**` has a broad shadcn primitive set already in place.
Compose those first, restyle through theme tokens (`src/app/globals.css`)
and `cva` variants rather than ad-hoc per-element colors, and add more
primitives with:

```bash
npx shadcn@latest add <name> --yes
```

Reusable app-specific UI belongs in `src/components/custom/**`.
