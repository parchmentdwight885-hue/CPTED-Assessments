// @claude:user-owned
//
// POST /api/contact — plain REST route handler that writes a ContactMessage.
// Lives under /api, which proxy.ts's matcher excludes (no CSP/nonce, not proxied).
// PUBLIC — no auth check.

import 'server-only';
import { NextResponse } from 'next/server';
import { runInquiryAutomation } from '@/lib/business/inquiry-automation';
import { contactSchema } from '@/lib/contact/schema';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  const result = contactSchema.safeParse({
    name: body.name,
    email: body.email,
    message: body.message,
  });
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        errors: {
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          message: fieldErrors.message?.[0],
        },
      },
      { status: 400 },
    );
  }

  let created: { id: string };
  try {
    created = await prisma.contactMessage.create({ data: result.data });
  } catch {
    return NextResponse.json(
      { errors: { message: 'Something went wrong. Please try again.' } },
      { status: 500 },
    );
  }

  // Never lets an AI/email-provider failure affect the response below — the
  // inquiry is already saved. See src/lib/business/inquiry-automation.ts.
  await runInquiryAutomation({ id: created.id, ...result.data });

  return NextResponse.json({ ok: true }, { status: 201 });
}
