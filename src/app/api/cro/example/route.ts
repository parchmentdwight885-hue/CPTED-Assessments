// @claude:user-owned — worked example of an authenticated recurring-job
// route. Copy this shape for a real scheduled job, or delete it if you never
// add one. See AGENTS.md "Recurring Jobs" for the full pattern.
//
// This replaces what used to be a `polsia.toml` `[[crons]]` entry. There is
// no platform scheduler anymore — recurring work is just an ordinary /api
// route that something else calls on a schedule:
//   - Vercel Cron: add an entry to vercel.json's `crons` array pointing at
//     this route's path, and set CRON_SECRET in your Vercel project's env
//     vars. Vercel then sends `Authorization: Bearer <CRON_SECRET>` on every
//     scheduled invocation, which this route verifies below.
//   - Any other host: point its cron/scheduled-job feature at this route
//     with the same header, or swap the auth check for whatever your host's
//     cron feature supports.
//   - Claude Cowork: a scheduled task can also call this route on a
//     schedule if you'd rather manage timing from there than from your host.
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!env.CRON_SECRET || authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Example — delete this and do your own idempotent recurring work. Keep it
  // fast: most hosts cap cron execution time (Vercel Hobby: 10s; Pro: 60s+
  // depending on plan).
  //
  // const { prisma } = await import('@/lib/db');
  // await prisma.someModel.updateMany({ where: { ... }, data: { ... } });

  return NextResponse.json({ ok: true, ranAt: new Date().toISOString() });
}
