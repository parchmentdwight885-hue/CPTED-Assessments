// @claude:user-owned
//
// AI inquiry-automation pipeline, run from POST /api/contact right after a
// ContactMessage row is created. For each new inquiry it asks Claude to
// draft four things in one call:
//   1. A personalized reply email to the inquirer (sent automatically).
//   2. A short internal summary (emailed to Dwight as an alert).
//   3. A proposal / scope-of-work draft, for Dwight to edit before sending —
//      this is never sent to the client automatically. Covers a guard-
//      staffing quote, a CPTED consulting engagement, or both, depending on
//      what the inquiry describes.
//   4. A preliminary CPTED write-up (visibility / movement / care+activity),
//      for Dwight to review and refine — only produced when the inquiry
//      actually raises a design-consulting question; also never auto-sent.
// Drafts 2-4 are emailed to Dwight in one alert message and stored on the
// row so they're not lost even if the email fails.
//
// Fully optional and fails soft: if ANTHROPIC_API_KEY or RESEND_API_KEY is
// unset, this no-ops (automationStatus = 'skipped'). Any other failure is
// caught and recorded (automationStatus = 'failed' + automationError) —
// this must never throw back into the contact-form request, since a broken
// AI/email provider should not stop someone's inquiry from being saved.

import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { contactEmail } from '@/lib/brand';
import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
import { siteName } from '@/lib/site';

const MODEL = 'claude-sonnet-4-5';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
}

interface InquiryDrafts {
  replySubject: string;
  replyBody: string;
  summary: string;
  proposalDraft: string;
  assessmentDraft: string;
}

export async function runInquiryAutomation(inquiry: Inquiry): Promise<void> {
  if (!env.ANTHROPIC_API_KEY || !env.RESEND_API_KEY) {
    await prisma.contactMessage
      .update({ where: { id: inquiry.id }, data: { automationStatus: 'skipped' } })
      .catch(() => undefined);
    return;
  }

  try {
    const drafts = await draftWithClaude(inquiry);
    await sendEmails(inquiry, drafts);
    await prisma.contactMessage.update({
      where: { id: inquiry.id },
      data: {
        automationStatus: 'completed',
        aiReplySubject: drafts.replySubject,
        aiReplyBody: drafts.replyBody,
        aiSummary: drafts.summary,
        proposalDraft: drafts.proposalDraft,
        assessmentDraft: drafts.assessmentDraft,
      },
    });
  } catch (error) {
    await prisma.contactMessage
      .update({
        where: { id: inquiry.id },
        data: {
          automationStatus: 'failed',
          automationError: error instanceof Error ? error.message.slice(0, 500) : 'Unknown error',
        },
      })
      .catch(() => undefined);
  }
}

async function draftWithClaude(inquiry: Inquiry): Promise<InquiryDrafts> {
  const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const system =
    `You are the intake assistant for ${siteName}, a licensed security ` +
    'company whose primary business is staffing armed and unarmed security ' +
    'guards for properties, communities, and events. As a secondary line of ' +
    'business, the same team also offers CPTED (Crime Prevention Through ' +
    'Environmental Design) design-stage consulting. You draft materials for ' +
    'the owner to review — never claim anything is final, priced, ' +
    "scheduled, staffed, or promised on the owner's behalf. Write in a " +
    'warm, plain-spoken, professional tone. No sales hype, no ' +
    'fear-mongering, no emojis.';

  const prompt = `A prospective client submitted this inquiry through the ${siteName} website contact form:

Name: ${inquiry.name}
Email: ${inquiry.email}
Message:
"""
${inquiry.message}
"""

Produce four pieces of text, each starting on its own line with the exact header shown (all caps, followed by a colon, nothing else on that line). Do not use markdown formatting anywhere.

REPLY_SUBJECT:
A short, warm email subject line acknowledging their inquiry.

REPLY_BODY:
A personalized reply email (plain text, ready to send as-is) that thanks them by name, reflects back the specific situation they described, sets the expectation that someone from ${siteName} will personally follow up soon with next steps — whether that's guard coverage, a design consultation, or both — and is signed "The ${siteName} Team". Do not invent pricing, dates, staffing levels, or commitments that haven't been made.

INTERNAL_SUMMARY:
2-4 sentences for the owner: who this is, whether they're asking about guard staffing, design consulting, or both, and anything urgent or notable.

PROPOSAL_DRAFT:
A draft scope-of-work / proposal outline the owner can edit before sending to the client. Lead with guard staffing if the inquiry mentions it (coverage type — armed/unarmed/both — hours, and site type), and include a CPTED design-consulting line only if the inquiry raises a design-stage question. Include a one-line understanding of the request, a list of a plausible engagement scope based on what was described (each item on its own line starting with "- "), and a final line reading exactly "[Owner to add pricing and timeline]". Do not invent specific dollar amounts, dates, or staffing counts.

ASSESSMENT_DRAFT:
Only if the inquiry raises a design-stage or CPTED question: a preliminary write-up for internal review, organized under exactly these three lines (each on its own line, followed by a colon): "Visibility (natural surveillance):", "Movement (natural access control):", "Care & activity (territorial reinforcement / maintenance):". Under each, 2-3 sentences of preliminary observations or open questions based only on what the inquiry describes, and note this is a draft pending an on-site assessment. If the inquiry is purely about guard staffing with no design-stage question, write exactly: "Not applicable — this inquiry is about guard staffing, not design consulting."`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system,
    messages: [{ role: 'user', content: prompt }],
  });

  let text = '';
  for (const block of response.content) {
    if (block.type === 'text') {
      text += block.text;
    }
  }

  return parseDrafts(text);
}

const SECTION_LABELS = [
  'REPLY_SUBJECT',
  'REPLY_BODY',
  'INTERNAL_SUMMARY',
  'PROPOSAL_DRAFT',
  'ASSESSMENT_DRAFT',
];

function extractSection(text: string, label: string, laterLabels: string[]): string {
  const marker = `${label}:`;
  const start = text.indexOf(marker);
  if (start === -1) return '';

  const rest = text.slice(start + marker.length);
  const nextOffsets = laterLabels
    .map((later) => rest.indexOf(`${later}:`))
    .filter((offset) => offset !== -1);
  const end = nextOffsets.length > 0 ? Math.min(...nextOffsets) : rest.length;

  return rest.slice(0, end).trim();
}

function parseDrafts(text: string): InquiryDrafts {
  return {
    replySubject:
      extractSection(text, 'REPLY_SUBJECT', SECTION_LABELS.slice(1)) ||
      `Thanks for reaching out to ${siteName}`,
    replyBody: extractSection(text, 'REPLY_BODY', SECTION_LABELS.slice(2)),
    summary: extractSection(text, 'INTERNAL_SUMMARY', SECTION_LABELS.slice(3)),
    proposalDraft: extractSection(text, 'PROPOSAL_DRAFT', SECTION_LABELS.slice(4)),
    assessmentDraft: extractSection(text, 'ASSESSMENT_DRAFT', []),
  };
}

async function sendEmails(inquiry: Inquiry, drafts: InquiryDrafts): Promise<void> {
  const resend = new Resend(env.RESEND_API_KEY);
  const fromAddress = env.RESEND_FROM_EMAIL ?? contactEmail;
  const notifyAddress = env.INQUIRY_NOTIFICATION_EMAIL ?? contactEmail;

  const replyBody =
    drafts.replyBody || 'Thanks for reaching out — a consultant will follow up soon.';

  await resend.emails.send({
    from: `${siteName} <${fromAddress}>`,
    to: inquiry.email,
    replyTo: contactEmail,
    subject: drafts.replySubject,
    text: replyBody,
  });

  await resend.emails.send({
    from: `${siteName} Alerts <${fromAddress}>`,
    to: notifyAddress,
    subject: `New inquiry: ${inquiry.name}`,
    text: [
      `New inquiry from ${inquiry.name} <${inquiry.email}>`,
      '',
      `Summary: ${drafts.summary}`,
      '',
      '--- Draft proposal (review before sending to client) ---',
      drafts.proposalDraft,
      '',
      '--- Draft CPTED assessment (review before sending to client) ---',
      drafts.assessmentDraft,
    ].join('\n'),
  });
}
