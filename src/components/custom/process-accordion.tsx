// @claude:user-owned — expandable version of the "How an engagement runs"
// process timeline on the homepage (see (setup)/page.tsx). Each stage opens
// to show a sample deliverable, all drawn from the same running example —
// the Grand Cayman beachfront condominium already published at
// /portfolio/beachfront-condominium — so a visitor can see one project
// carried end to end through the engagement.

'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { CaseStudyBody } from '@/components/custom/case-study-body';
import { PlanPhoto, ShieldMark } from '@/components/custom/process-illustrations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type CaseStudyBlock, getCaseStudy } from '@/lib/portfolio/case-studies';

const CASE = getCaseStudy('beachfront-condominium');
const PLAN_IMAGE = {
  src: '/assets/portfolio/beachfront-condominium/ground-floor-plan.jpg',
  alt: 'Ground floor plan for the 5-Story Luxury Beachfront Condominium — lobby, units 101 and 102, and the pool terrace',
  width: 253,
  height: 453,
} as const;
const SITE_IMAGE = {
  src: '/assets/portfolio/beachfront-condominium/site-plan-aerial.jpg',
  alt: 'Aerial site rendering of the 5-Story Luxury Beachfront Condominium, showing parking, the pool terrace, and the beach',
  width: 281,
  height: 512,
} as const;

/** Pull the blocks between two headings (inclusive of the start heading,
 * exclusive of the end heading) out of a case study's write-up, so the
 * excerpts shown here stay a single source of truth with the full report at
 * /portfolio/[slug] instead of a copy that can drift out of sync. */
function blocksBetween(
  blocks: CaseStudyBlock[],
  startHeading: string,
  endHeading?: string,
): CaseStudyBlock[] {
  const start = blocks.findIndex((b) => b.type === 'heading' && b.text === startHeading);
  if (start === -1) return [];
  const end = endHeading
    ? blocks.findIndex((b, i) => i > start && b.type === 'heading' && b.text === endHeading)
    : -1;
  return blocks.slice(start, end === -1 ? undefined : end);
}

const FINDINGS_BLOCKS = CASE
  ? blocksBetween(
      CASE.blocks,
      '3. Findings summary by CPTED principle',
      '4. Prioritized recommendations',
    )
  : [];

const RECOMMENDATIONS_BLOCKS = CASE
  ? blocksBetween(CASE.blocks, '4. Prioritized recommendations', '5. Limitations')
  : [];

/** The design-stage priority items (the first numbered list in the
 * recommendations section) for the condensed sample report page — the full
 * eight-item list still renders in full beside it via CaseStudyBody. */
const REPORT_PAGE_RECOMMENDATIONS: string[] = (() => {
  const firstNumberedBlock = RECOMMENDATIONS_BLOCKS.find((b) => b.type === 'numbered');
  return firstNumberedBlock?.type === 'numbered' ? firstNumberedBlock.items : [];
})();

function ProcessIcon({ stage }: { stage: 1 | 2 | 3 | 4 }) {
  const common = { viewBox: '0 0 56 56', className: 'size-11 shrink-0', role: 'img' as const };

  if (stage === 1) {
    return (
      <svg {...common} aria-label="A site plan reviewed against a sightline before construction">
        <title>Site plan reviewed against a sightline</title>
        <rect
          x="6"
          y="6"
          width="44"
          height="44"
          fill="none"
          stroke="var(--color-primary-foreground)"
          strokeOpacity="0.35"
          strokeWidth="1.25"
          strokeDasharray="3 3"
        />
        <rect x="14" y="26" width="18" height="18" fill="var(--color-olive)" opacity="0.85" />
        <path
          d="M 32 14 L 46 28"
          stroke="var(--color-primary-foreground)"
          strokeOpacity="0.6"
          strokeWidth="1.25"
          strokeDasharray="1 4"
          strokeLinecap="round"
        />
        <circle cx="46" cy="28" r="2.5" fill="var(--color-primary-foreground)" />
      </svg>
    );
  }

  if (stage === 2) {
    return (
      <svg {...common} aria-label="A walked route between waypoints, ending at a site marker">
        <title>A walked route ending at a site marker</title>
        <path
          d="M 8 42 Q 16 30 14 20 T 28 8"
          fill="none"
          stroke="var(--color-primary-foreground)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="1 5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="42" r="2.25" fill="var(--color-primary-foreground)" fillOpacity="0.7" />
        <circle cx="14" cy="20" r="2.25" fill="var(--color-primary-foreground)" fillOpacity="0.7" />
        <path
          d="M28 4c-4.4 0-8 3.4-8 7.7 0 5.8 8 14.3 8 14.3s8-8.5 8-14.3C36 7.4 32.4 4 28 4z"
          fill="var(--color-olive)"
        />
        <circle cx="28" cy="11.5" r="3" fill="var(--color-primary)" />
      </svg>
    );
  }

  if (stage === 3) {
    return (
      <svg {...common} aria-label="A document listing findings, with the top priority flagged">
        <title>A document listing findings, top priority flagged</title>
        <path
          d="M14 6h20l8 8v36H14z"
          fill="none"
          stroke="var(--color-primary-foreground)"
          strokeOpacity="0.4"
          strokeWidth="1.25"
        />
        <path
          d="M34 6v8h8"
          fill="none"
          stroke="var(--color-primary-foreground)"
          strokeOpacity="0.4"
          strokeWidth="1.25"
        />
        <line
          x1="20"
          y1="26"
          x2="40"
          y2="26"
          stroke="var(--color-primary-foreground)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="33"
          x2="40"
          y2="33"
          stroke="var(--color-primary-foreground)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="23"
          y1="40"
          x2="35"
          y2="40"
          stroke="var(--color-olive)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="17" cy="40" r="1.75" fill="var(--color-olive)" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-label="A checklist of verified items, the last one signed off">
      <title>A checklist of verified items, signed off</title>
      <rect
        x="10"
        y="8"
        width="30"
        height="40"
        fill="none"
        stroke="var(--color-primary-foreground)"
        strokeOpacity="0.4"
        strokeWidth="1.25"
      />
      {[16, 26, 36].map((y, i) => (
        <g key={y}>
          <rect
            x="16"
            y={y}
            width="6"
            height="6"
            fill={i === 2 ? 'var(--color-olive)' : 'none'}
            stroke={i === 2 ? 'none' : 'var(--color-primary-foreground)'}
            strokeOpacity="0.6"
            strokeWidth="1.25"
          />
          <path
            d={`M17 ${y + 3}l1.5 1.5L21 ${y + 1.5}`}
            stroke={i === 2 ? 'var(--color-primary)' : 'var(--color-primary-foreground)'}
            strokeOpacity={i === 2 ? '1' : '0.8'}
            strokeWidth="1.25"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="27"
            y1={y + 3}
            x2="34"
            y2={y + 3}
            stroke="var(--color-primary-foreground)"
            strokeOpacity="0.35"
            strokeWidth="1.25"
          />
        </g>
      ))}
    </svg>
  );
}

const EXECUTIVE_SUMMARY =
  'This conceptual/schematic CPTED review identifies four priority findings: no defined ' +
  'boundary at the beach-to-pool transition, a single circulation core serving parking ' +
  'through the penthouse with no tiered credentialing, possible balcony stacking that could ' +
  'bypass that core, and elevated exposure at the ground-floor units. Recommendations are ' +
  'organized below by design-stage, near-term, and long-term priority.';

/** A condensed, letterhead-style sample of the written report — real
 * excerpts (the executive summary and the top design-stage priorities),
 * laid out as a document rather than rendered as a photo. */
function ReportPage({ summary, items }: { summary: string; items: string[] }) {
  return (
    <div className="border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <ShieldMark className="size-8 shrink-0" />
        <div>
          <p className="text-caption font-semibold uppercase tracking-[0.1em] text-foreground">
            CPTED Assessment Report
          </p>
          <p className="text-[11px] leading-tight text-muted-foreground">
            5-Story Luxury Beachfront Condominium · Grand Cayman
          </p>
        </div>
      </div>
      <p className="mt-4 text-caption font-semibold uppercase tracking-[0.08em] text-olive">
        Executive summary
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{summary}</p>
      <p className="mt-4 text-caption font-semibold uppercase tracking-[0.08em] text-olive">
        Key recommendations
      </p>
      <ol className="mt-2 space-y-1.5">
        {items.map((item, i) => (
          <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-muted-foreground">
            <span className="shrink-0 font-semibold text-primary">{i + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const STEPS = [
  {
    value: 'stage-1',
    index: '01',
    stage: 1 as const,
    title: 'Design review',
    description:
      'We read the site plan and elevations against CPTED principles and flag risk areas before groundwork begins.',
    deliverable: 'Design-stage CPTED memo',
  },
  {
    value: 'stage-2',
    index: '02',
    stage: 2 as const,
    title: 'Site assessment',
    description:
      'For existing properties, a walk-through documents current sightlines, access control, and lighting against the plan.',
    deliverable: 'Site assessment field notes',
  },
  {
    value: 'stage-3',
    index: '03',
    stage: 3 as const,
    title: 'Report and recommendations',
    description:
      'A chronological, plan-referenced report sets out findings and prioritized changes for the design or property team.',
    deliverable: 'CPTED assessment report',
  },
  {
    value: 'stage-4',
    index: '04',
    stage: 4 as const,
    title: 'Implementation support',
    description:
      "We review revised drawings or completed works against the original recommendations and confirm they've been addressed.",
    deliverable: 'Verification & sign-off letter',
  },
] as const;

/** Small "excerpt of an excerpt" wrapper: a light card popped against the
 * navy process section, holding one stage's illustration and written
 * deliverable. Reuses CaseStudyBody's text tokens (built for a light
 * surface) rather than the section's own primary-foreground palette. */
function StagePanel({
  illustration,
  eyebrow,
  children,
}: {
  illustration: React.ReactNode;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-[280px] lg:mx-0">
          {illustration}
          <p className="mt-3 text-caption text-muted-foreground">{eyebrow}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function ProcessAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue="stage-1" className="mt-4">
      {STEPS.map((step) => (
        <AccordionItem
          key={step.value}
          value={step.value}
          className="border-t border-primary-foreground/15 last:border-b"
        >
          <AccordionTrigger className="py-8 text-primary-foreground hover:no-underline sm:py-8">
            <div className="grid w-full gap-6 text-left sm:grid-cols-[5.5rem_1fr_1.2fr_1.1fr] sm:items-center sm:gap-8">
              <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-4">
                <ProcessIcon stage={step.stage} />
                <span className="font-display text-h3 font-normal text-olive">{step.index}</span>
              </div>
              <span className="font-display text-h4 font-normal text-primary-foreground">
                {step.title}
              </span>
              <p className="max-w-lg text-body text-primary-foreground/75">{step.description}</p>
              <div className="flex flex-col gap-1.5 border-t border-primary-foreground/15 pt-4 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
                <span className="text-caption font-semibold uppercase tracking-[0.08em] text-primary-foreground/45">
                  Written deliverable
                </span>
                <span className="text-small font-medium text-primary-foreground">
                  {step.deliverable}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 pb-0">
            {step.stage === 1 && (
              <StagePanel
                illustration={<PlanPhoto {...PLAN_IMAGE} />}
                eyebrow="Sample walkthrough — 5-Story Luxury Beachfront Condominium, Grand Cayman"
              >
                <p className="text-eyebrow text-olive">Design-stage CPTED memo</p>
                <p className="mt-4 text-body text-muted-foreground">
                  The review reads the concept board against the four core CPTED strategies —
                  natural surveillance, natural access control, territorial reinforcement, and
                  maintenance &amp; management. On this project, that surfaced a beach-to-pool
                  transition with no defined boundary and a single circulation core with no tiered
                  credentialing, both flagged for the design team before construction documents were
                  finalized.
                </p>
                {CASE && (
                  <>
                    <p className="mt-6 text-eyebrow text-olive">Documents reviewed</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {CASE.documentsReviewed.map((doc) => (
                        <li
                          key={doc}
                          className="border border-border px-2.5 py-1 text-caption text-muted-foreground"
                        >
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </StagePanel>
            )}

            {step.stage === 2 && (
              <StagePanel
                illustration={<PlanPhoto {...SITE_IMAGE} />}
                eyebrow="Sample walkthrough — 5-Story Luxury Beachfront Condominium, Grand Cayman"
              >
                <p className="text-eyebrow text-olive">Site assessment field notes</p>
                <p className="mt-4 text-body text-muted-foreground">
                  A chronological read of the site plan, floor plans, elevations, and building
                  section, in the order a visitor — and separately, an opportunistic intruder —
                  would encounter the property. The findings below are organized by CPTED principle.
                </p>
                <div className="mt-5">
                  <CaseStudyBody blocks={FINDINGS_BLOCKS} />
                </div>
              </StagePanel>
            )}

            {step.stage === 3 && (
              <StagePanel
                illustration={
                  <ReportPage summary={EXECUTIVE_SUMMARY} items={REPORT_PAGE_RECOMMENDATIONS} />
                }
                eyebrow="Sample walkthrough — 5-Story Luxury Beachfront Condominium, Grand Cayman"
              >
                <p className="text-eyebrow text-olive">CPTED assessment report</p>
                <div className="mt-4">
                  <CaseStudyBody blocks={RECOMMENDATIONS_BLOCKS} />
                </div>
                {CASE && (
                  <Link
                    href={`/portfolio/${CASE.slug}`}
                    className="group mt-6 inline-flex items-center gap-1.5 text-small font-medium text-primary underline underline-offset-4"
                  >
                    Read the full assessment
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                )}
              </StagePanel>
            )}

            {step.stage === 4 && (
              <StagePanel
                illustration={<PlanPhoto {...PLAN_IMAGE} stamp />}
                eyebrow="Sample walkthrough — 5-Story Luxury Beachfront Condominium, Grand Cayman"
              >
                <p className="text-eyebrow text-olive">
                  Verification &amp; sign-off letter{' '}
                  <span className="text-muted-foreground">— illustrative</span>
                </p>
                <p className="mt-4 text-body text-muted-foreground">
                  This stage closes the loop: revised drawings come back, and each item from the
                  design-stage review is checked against them. The excerpt below is a sample of that
                  closing summary, shown here to illustrate the deliverable — not a claim that this
                  specific building has been built or inspected.
                </p>
                <div className="mt-5 space-y-4 border-l-2 border-olive/40 pl-4">
                  <p className="text-small font-semibold text-foreground">
                    Executive summary — implementation verification
                  </p>
                  <p className="text-body text-muted-foreground">
                    Following the design-stage review, the project team returned updated elevations
                    and a security systems narrative. This verification pass confirms:
                  </p>
                  <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                    {[
                      'A raised planter line now marks the beach-to-pool transition, addressing the territorial-reinforcement gap at Section 2.2.',
                      'Balcony geometry across floors 2–5 has been offset, resolving the vertical-alignment concern raised for the typical floors and the penthouse.',
                      'A CCTV, access-control, and lighting narrative is now part of the electrical design, tied to the emergency generator circuit.',
                      'Elevator floor-selection credentialing is programmed separately from building-entry credentialing.',
                    ].map((item) => (
                      <li key={item} className="pl-1 text-body text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-body text-muted-foreground">
                    Open item: the landscaping plan is still pending revision against the 2-and-6
                    planting rule, scheduled for the next design submission.
                  </p>
                </div>
              </StagePanel>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
