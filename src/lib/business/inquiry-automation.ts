// @claude:user-owned
//
// AI inquiry-automation pipeline, run from POST /api/contact right after a
// ContactMessage row is created. For each new inquiry it asks Claude to
// draft four things in one call:
//   1. A personalized reply email to the inquirer (sent automatically).
//   2. A short internal summary (emailed to Dwight as an alert).
//   3. A proposal / scope-of-work draft, for Dwight to edit before sending —
//      this is never sent to the client automatically.
//   4. A preliminary CPTED write-up (visibility / movement / care+activity),
//      for Dwight to review and refine — also never auto-sent.
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
    'You are the intake assistant for Waymark Ember, a CPTED (Crime Prevention ' +
    'Through Environmental Design) security consultancy run by a professional ' +
    'security consultant. You draft materials for the consultant to review — ' +
    'never claim anything is final, priced, scheduled, or promised on the ' +
    "consultant's behalf. Write in a warm, plain-spoken, professional tone. " +
    'No sales hype, no fear-mongering, no emojis.';

  const prompt = `A prospective client submitted this inquiry through the Waymark Ember website contact form:

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
A personalized reply email (plain text, ready to send as-is) that thanks them by name, reflects back the specific situation they described, sets the expectation that a security consultant will personally follow up soon with next steps, and is signed "The Waymark Ember Team". Do not invent pricing, dates, or commitments the consultant hasn't made.

INTERNAL_SUMMARY:
2-4 sentences for the consultant: who this is, what they're asking for, and anything urgent or notable.

PROPOSAL_DRAFT:
A draft scope-of-work / proposal outline the consultant can edit before sending to the client. Include a one-line project understanding, a list of a plausible engagement scope based on what was described (each item on its own line starting with "- "), and a final line reading exactly "[Consultant to add pricing and timeline]". Do not invent specific dollar amounts or dates.

ASSESSMENT_DRAFT:
A preliminary CPTED write-up for internal review, organized under exactly these three lines (each on its own line, followed by a colon): "Visibility (natural surveillance):", "Movement (natural access control):", "Care & activity (territorial reinforcement / maintenance):". Under each, 2-3 sentences of preliminary observations or open questions based only on what the inquiry describes, and note this is a draft pending an on-site assessment.`;

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
      'Thanks for reaching out to Waymark Ember',
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
    from: `Waymark Ember <${fromAddress}>`,
    to: inquiry.email,
    replyTo: contactEmail,
    subject: drafts.replySubject,
    text: replyBody,
  });

  await resend.emails.send({
    from: `Waymark Ember Alerts <${fromAddress}>`,
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
