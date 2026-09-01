-- Adds AI inquiry-automation fields to contact_message.
-- See src/lib/business/inquiry-automation.ts. Forward-only, additive — safe
-- on existing rows (all new columns are optional or carry a default).

ALTER TABLE "contact_message"
  ADD COLUMN "automationStatus" TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN "automationError"  TEXT,
  ADD COLUMN "aiReplySubject"   TEXT,
  ADD COLUMN "aiReplyBody"      TEXT,
  ADD COLUMN "aiSummary"        TEXT,
  ADD COLUMN "proposalDraft"    TEXT,
  ADD COLUMN "assessmentDraft"  TEXT;
