// @claude:shared — edit only through declared slots.
//
// Typed env via @t3-oss/env-nextjs.
//
// New modules/features contribute env vars via the slots below — keep
// hand-edits inside those markers so the shape stays easy to audit.
//
// Never let a non-NEXT_PUBLIC_ env name leak into a client bundle — that's
// what separates `server` from `client` below.

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    // Prisma is the DB client. DATABASE_URL must point at a Postgres
    // instance you provision and set yourself (e.g. via your host's env
    // vars/secrets) — there is no platform auto-provisioning it for you.
    DATABASE_URL: z.string().url(),
    // Optional — only required if you add a Vercel Cron job. Vercel sends
    // `Authorization: Bearer <CRON_SECRET>` on cron-triggered requests when
    // this is set; /api/cron/* routes verify it. See AGENTS.md
    // "Recurring Jobs".
    CRON_SECRET: z.string().optional(),
    // @claude:slot env_vars_server start
    // Inquiry-automation pipeline (src/lib/business/inquiry-automation.ts).
    // Both optional — when either is unset, the pipeline no-ops and the
    // contact form keeps working without AI drafts or automated emails.
    // Get a key at https://console.anthropic.com.
    ANTHROPIC_API_KEY: z.string().optional(),
    // Get a key at https://resend.com/api-keys.
    RESEND_API_KEY: z.string().optional(),
    // Sender address for automated emails — must be on a domain verified in
    // Resend (https://resend.com/domains). Falls back to contactEmail
    // (src/lib/brand.ts) if unset.
    RESEND_FROM_EMAIL: z.string().email().optional(),
    // Where the internal "new inquiry" alert email is sent. Falls back to
    // contactEmail (src/lib/brand.ts) if unset.
    INQUIRY_NOTIFICATION_EMAIL: z.string().email().optional(),
    // @claude:slot env_vars_server end
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
    // Base for @/lib/api-client + proxy.ts connect-src. Default-empty
    // (unset) means same-origin `/api`; set only for an external API origin.
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
    // @claude:slot env_vars_client start
    // Add NEXT_PUBLIC_* env vars here as features need them.
    // @claude:slot env_vars_client end
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    CRON_SECRET: process.env.CRON_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // @claude:slot env_runtime start
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    INQUIRY_NOTIFICATION_EMAIL: process.env.INQUIRY_NOTIFICATION_EMAIL,
    // @claude:slot env_runtime end
  },
  emptyStringAsUndefined: true,
  // SKIP_ENV_VALIDATION=1 bypasses validation for envless builds (lint/CI/local).
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
