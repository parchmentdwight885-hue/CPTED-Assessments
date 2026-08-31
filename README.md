# Waymark Ember 

The Waymark Ember consultancy site — CPTED (Crime Prevention Through
Environmental Design) security consulting, built for prospects to learn the
practice, request a consultation, and (eventually) preview a sample
assessment before booking a full engagement.

Next.js 16 App Router, React 19, Tailwind 4, Prisma, and a shadcn UI
baseline. Originally scaffolded from a third-party template; **now
maintained solely through Claude** (Claude Code / Claude Cowork / chat) —
see [AGENTS.md](./AGENTS.md) for the full operating manual, ownership
conventions, and a list of what changed when the app came off that
template's platform.

## What This Is

A standalone Next.js app with no external installer or platform agent
attached. `.claude/ownership.json` documents which files are shared shell
(security headers, CSP, SEO plumbing) versus business-specific code you
should feel free to change — read `AGENTS.md` before editing something
unfamiliar.

## What Is Included

- Next.js 16 App Router, React 19, TypeScript, and Tailwind 4.
- shadcn UI baseline: `components.json`, `cn()`, a committed primitive set in
  `src/components/ui/**`, sonner toasts, next-themes, and theme tokens in
  `src/app/globals.css`.
- Prisma 6 client setup: `prisma/schema/_base.prisma`, `prisma.config.ts`,
  and the server-only singleton in `src/lib/db.ts`. The database itself is
  external — you provision Postgres and set `DATABASE_URL` (see
  "Deployment Gaps" in `AGENTS.md`).
- Typed environment validation through `src/lib/env.ts`.
- A working consultation-inquiry flow: `/contact` →
  `src/app/api/contact/route.ts` → Postgres, with a confirmation page.
- Deploy scaffolding: `vercel.json`, a `vercel-build` script that runs
  migrations before build, a filled-out `.env.example`, an authenticated
  cron-route template (`src/app/api/cron/example/`), and a full step-by-step
  runbook in `DEPLOYMENT.md`.
- CSP and security headers in `proxy.ts`, `next.config.ts`, and
  `src/lib/csp.ts`.
- SEO plumbing: `src/lib/brand.ts`, `src/lib/site.ts`, `robots.ts`,
  `sitemap.ts`, `manifest.ts`, a default Open Graph image route, and an
  `/llms.txt` route (llmstxt.org) for AI/LLM crawlers curated via
  `src/lib/llms-config.ts`.
- Unit tests covering the ownership map, CSP posture, env validation, and
  `/llms.txt` rendering.

## What Is Not Included

- No analytics. The previous platform's visitor beacon was removed; add a
  provider of your choice if you want one (see `AGENTS.md`).
- No auth, billing, dashboards, or other product modules beyond the contact
  flow already built.
- No CI workflow file (lint/typecheck/test on PR) — see `DEPLOYMENT.md`
  "What's Deliberately Not Automated Here."
- No database server, Dockerfile, or compose file — `DEPLOYMENT.md` covers
  provisioning your own Postgres and deploying to Vercel (or another host).
- No Server Actions. Product pages call `/api/*` route handlers through
  `src/lib/api-client.ts`.

## Ownership Model

See `AGENTS.md` for the full table. Short version: `framework_owned` files
are shared shell you should change deliberately, `user_owned` files are
where the business logic lives and you should edit freely, and `shared`
files (like `next.config.ts`, `proxy.ts`, `src/lib/env.ts`) should only be
touched through their declared slot markers.

## Local Development

Use npm; the lockfile is committed.

```bash
npm install
npm run typecheck
npm run lint
npm run test
SKIP_ENV_VALIDATION=1 npm run dev
```

`npm run dev` and `npm run build` validate `DATABASE_URL` and
`NEXT_PUBLIC_APP_URL` when `SKIP_ENV_VALIDATION` is not set. On a local
clone without a provisioned database, either set the required vars in
`.env.local` or prefix the command with `SKIP_ENV_VALIDATION=1`.

`typecheck`, `lint`, and `test` do not require env vars.

## Directory Guide

```text
.
├── .claude/                          Ownership map (Claude's operating docs)
├── prisma/
│   ├── schema/_base.prisma           Datasource + generator only
│   ├── schema/contact.prisma         Contact-inquiry model
│   └── migrations/                   Migration history
├── public/                           Static assets
├── src/
│   ├── app/
│   │   ├── (custom)/contact/         Consultation inquiry page + confirmation
│   │   ├── (setup)/page.tsx          Starter home — replace or remove
│   │   ├── (custom)/example/page.tsx Data-plane example page
│   │   ├── api/contact/route.ts      Contact-form handler
│   │   ├── api/example/route.ts      Data-plane example route
│   │   ├── health/route.ts           Deploy healthcheck
│   │   ├── layout.tsx                Root layout and providers slot
│   │   └── globals.css               Tailwind theme and brand token slot
│   ├── components/
│   │   ├── ui/                       shadcn primitives
│   │   ├── custom/                   App-owned compositions (nav, forms, etc.)
│   │   └── theme-provider.tsx        next-themes wrapper
│   ├── hooks/                        App-owned React hooks
│   ├── lib/
│   │   ├── api-client.ts             Client transport helper
│   │   ├── brand.ts                  Product name, description, contact email
│   │   ├── contracts/                Shared zod contracts
│   │   ├── csp.ts                    CSP builder
│   │   ├── db.ts                     Prisma singleton
│   │   ├── env.ts                    Typed env schema
│   │   ├── forms.ts                  Server error mapping
│   │   ├── nav.ts                    App navigation config
│   │   └── utils.ts                  cn()
│   └── modules/                      Vendored install history (legacy)
├── tests/unit/                       Vitest unit tests
├── next.config.ts                    Next config and security headers
├── proxy.ts                          CSP nonce and middleware chain slot
└── AGENTS.md                         Claude's operating manual
```

## Security Headers

`next.config.ts` sets baseline response headers:

- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`

`proxy.ts` sets a per-request Content Security Policy. `script-src` stays
strict with a nonce and `strict-dynamic`; `style-src` allows inline styles so
Radix and shadcn runtime positioning works in production.

## Versions

Pinned exact versions:

- Next.js 16.2.6, App Router
- React 19.2.7
- Tailwind CSS 4.3.0, CSS-first `@theme`
- shadcn/ui New York style
- sonner 2.0.7
- TypeScript 5.5.4, strict mode
- Biome 2.3.1, lint and format
- Vitest 3.2.6
- Prisma 6.19.3
- Node >=20.18.1

Security `overrides` in `package.json` pin patched transitive dependency
versions that direct framework pins cannot reach on their own.

## License

MIT. See [LICENSE](./LICENSE).
