// @claude:user-owned — starter home served at /. Replace it in place, or delete
// this route group before adding another page that resolves to /.

import { ArrowUpRight, Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CASE_STUDIES } from '@/lib/portfolio/case-studies';
import { siteDescription, siteName } from '@/lib/site';

// Keep this a Server Component so it can export metadata.
export const metadata: Metadata = {
  title: { absolute: siteName },
  description: siteDescription,
  // Do not export an explicit openGraph object here; that suppresses the
  // file-based opengraph-image.tsx for the home route.
  alternates: { canonical: '/' },
};

const SERVICES = [
  {
    number: '01',
    label: 'Design stage',
    title: 'Reviewed before construction',
    description:
      'Sightlines, entry points, and lighting plans are assessed on paper, while changes still cost a redline instead of a renovation.',
  },
  {
    number: '02',
    label: 'Chronological',
    title: 'A dated record, start to finish',
    description:
      'Every observation is logged against the stage it applies to, so the report reads as a timeline the design team can act on in order.',
  },
  {
    number: '03',
    label: 'Detailed',
    title: 'Findings tied to plan references',
    description:
      'Each recommendation cites the specific drawing, elevation, or zone it concerns — no generic checklist language.',
  },
  {
    number: '04',
    label: 'Outcome',
    title: 'Better spaces, stronger communities',
    description:
      "The goal isn't a longer perimeter fence — it's natural surveillance and access control that residents barely notice.",
  },
] as const;

const PROCESS_STEPS = [
  {
    index: '01',
    stage: 1,
    title: 'Design review',
    description:
      'We read the site plan and elevations against CPTED principles and flag risk areas before groundwork begins.',
    deliverable: 'Design-stage CPTED memo',
  },
  {
    index: '02',
    stage: 2,
    title: 'Site assessment',
    description:
      'For existing properties, a walk-through documents current sightlines, access control, and lighting against the plan.',
    deliverable: 'Site assessment field notes',
  },
  {
    index: '03',
    stage: 3,
    title: 'Report and recommendations',
    description:
      'A chronological, plan-referenced report sets out findings and prioritized changes for the design or property team.',
    deliverable: 'CPTED assessment report',
  },
  {
    index: '04',
    stage: 4,
    title: 'Implementation support',
    description:
      "We review revised drawings or completed works against the original recommendations and confirm they've been addressed.",
    deliverable: 'Verification & sign-off letter',
  },
] as const;

/** Decorative hero mark — an arc, four site datums, and a stack of massed
 * forms reading as a small building. Theme-aware via CSS custom properties
 * (see globals.css / custom-style.css) so it follows dark mode automatically. */
function HeroMark() {
  return (
    <svg
      viewBox="0 0 470 478"
      className="w-full max-w-[26rem]"
      role="img"
      aria-label="Abstract illustration of a building massed within a site datum"
    >
      <title>A building massed within a site datum</title>
      <path
        d="M 235 14 A 225 225 0 0 0 235 464"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 235 14 A 225 225 0 0 1 235 464"
        fill="none"
        stroke="var(--color-olive)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="0.5 12"
      />
      <circle cx="235" cy="14" r="5" fill="var(--color-primary)" />
      <circle cx="235" cy="464" r="5" fill="var(--color-primary)" />
      <circle cx="10" cy="239" r="5" fill="var(--color-primary)" />
      <circle cx="460" cy="239" r="5" fill="var(--color-primary)" />
      <line x1="235" y1="14" x2="235" y2="464" stroke="var(--color-border)" strokeWidth="1" />
      <line x1="10" y1="239" x2="460" y2="239" stroke="var(--color-border)" strokeWidth="1" />

      <g>
        <ellipse cx="235" cy="381" rx="180" ry="10" fill="var(--color-primary)" opacity="0.08" />
        <path
          d="M 55 376 Q 130 358 195 376 T 340 368 Q 375 363 405 372"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.75"
          opacity="0.5"
        />
        <polygon points="135,378 135,235 202,178 202,378" fill="var(--color-primary)" />
        <polygon
          points="135,235 202,178 202,235 162,264"
          fill="var(--color-primary)"
          opacity="0.75"
        />
        <polygon points="202,378 202,270 265,270 265,378" fill="var(--color-muted-foreground)" />
        <polygon
          points="265,270 265,378 292,378 292,281"
          fill="var(--color-muted-foreground)"
          opacity="0.8"
        />
        <polygon points="292,378 292,210 345,178 345,378" fill="var(--color-olive)" />
        <polygon points="345,210 345,178 375,196 345,231" fill="var(--color-olive)" opacity="0.8" />
      </g>
    </svg>
  );
}

/** Small conceptual diagrams for each stage of the process timeline. Kept in
 * the same visual language as HeroMark (thin strokes, olive accent, theme
 * tokens) but rendered on the primary (navy) section background, so strokes
 * lean on --color-primary-foreground instead of --color-border/foreground. */
function ProcessIcon({ stage }: { stage: 1 | 2 | 3 | 4 }) {
  const common = {
    viewBox: '0 0 56 56',
    className: 'size-11 shrink-0',
    role: 'img' as const,
  };

  if (stage === 1) {
    // Design review — a dashed site boundary, a massed footprint, and a
    // sightline resolving to a single viewpoint.
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
    // Site assessment — a walked route between waypoints, ending at a
    // location marker on the property.
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
    // Report and recommendations — a folded-corner document with findings
    // logged as lines, the top-priority one flagged in olive.
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

  // stage === 4 — Implementation support — a checklist of verified items,
  // the final one confirmed (solid) as the sign-off.
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

export default function HomePage() {
  const featured = CASE_STUDIES[0];

  return (
    <main className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="section-lg relative">
        <div className="container-page relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="mb-6 flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.18em] text-olive">
              <span className="h-px w-6 bg-olive" />
              CPTED consultancy
            </div>
            <h1 className="font-display text-h1 font-normal leading-[1.08] tracking-tight text-foreground sm:text-[3.4rem]">
              Security reviewed at the drawing board, not after the ribbon cutting.
            </h1>
            <p className="mt-7 max-w-lg text-body-lg text-muted-foreground">
              We assess layout, sightlines, and access before a single wall goes up — so the
              finished property is safer by design, not by afterthought.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Request an assessment
                  <ArrowUpRight
                    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">View a sample report</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 lg:justify-end">
            <HeroMark />
          </div>
        </div>
      </section>

      {/* ================= APPROACH ================= */}
      <section id="approach" className="border-y border-border bg-muted/35">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24 lg:py-28">
          <div>
            <p className="text-eyebrow text-olive">The {siteName} lens</p>
            <h2 className="mt-4 max-w-md font-display text-h2 font-normal tracking-tight">
              Security is not separate from how a place feels.
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-body-lg text-muted-foreground">
            <p>
              A locked gate, a dark corner, an unclear entrance, or a neglected edge can change how
              people use a place long before an incident occurs. We look at those everyday signals
              with a security-aware, people-first eye.
            </p>
            <p>
              Led by Dwight Parchment, whose frontline experience as a security officer grounds the
              practice in real-world awareness, {siteName} makes established CPTED principles
              accessible and actionable.
            </p>
            <div className="flex items-center gap-3 pt-3 text-small font-medium text-foreground">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-4" aria-hidden />
              </span>
              Clear reporting. Ethical practice. Better everyday places.
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="section">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-eyebrow text-olive">What the assessment covers</p>
              <h2 className="mt-4 max-w-xl font-display text-h2 font-normal tracking-tight">
                Four principles guide every review.
              </h2>
            </div>
            <p className="max-w-xs text-small text-muted-foreground sm:text-right">
              From a single retail unit to a multi-building residential compound.
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ number, label, title, description }) => (
              <div key={number} className="border-l border-border pl-6 first:border-l-0 first:pl-0">
                <span className="text-caption font-semibold uppercase tracking-[0.08em] text-olive">
                  {label}
                </span>
                <h3 className="mt-4 font-display text-h4 font-normal tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-body text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section id="process" className="bg-primary text-primary-foreground">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-5 border-b border-primary-foreground/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-eyebrow text-primary-foreground/60">How an engagement runs</p>
              <h2 className="mt-4 max-w-xl font-display text-h2 font-normal tracking-tight text-primary-foreground">
                Four stages, each closed out with a written deliverable.
              </h2>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.index}
                className="grid gap-6 border-t border-primary-foreground/15 py-8 last:border-b sm:grid-cols-[5.5rem_1fr_1.2fr_1.1fr] sm:items-start sm:gap-8"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-4">
                  <ProcessIcon stage={step.stage} />
                  <span className="font-display text-h3 font-normal text-olive">{step.index}</span>
                </div>
                <h3 className="text-h4 font-display font-normal text-primary-foreground">
                  {step.title}
                </h3>
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
            ))}
          </div>
        </div>
      </section>

      {/* ================= SAMPLE WORK ================= */}
      {featured && (
        <section id="sample" className="section">
          <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="text-eyebrow text-olive">Sample report</p>
              <h2 className="mt-4 max-w-md font-display text-h2 font-normal tracking-tight">
                A report built to be acted on, not filed away.
              </h2>
              <p className="mt-6 max-w-md text-body-lg text-muted-foreground">
                Every assessment is delivered as a single reference document — findings, plan
                citations, and priority ordered so nothing gets lost between the design table and
                the site.
              </p>
              <ul className="mt-8 max-w-md space-y-0 text-small">
                {[
                  ['Site and drawing set reviewed', 'Design stage'],
                  ['Observations logged', 'Chronological'],
                  ['Recommendations issued', 'Prioritized'],
                ].map(([left, right]) => (
                  <li
                    key={left}
                    className="flex items-center justify-between gap-6 border-t border-border py-3.5 last:border-b"
                  >
                    <span className="text-foreground">{left}</span>
                    <span className="text-muted-foreground">{right}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="lg" className="group mt-8">
                <Link href={`/portfolio/${featured.slug}`}>
                  Read the full assessment
                  <ArrowUpRight
                    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>

            <Link href={`/portfolio/${featured.slug}`} className="group block">
              <Card className="overflow-hidden shadow-none transition-colors duration-200 ease-out group-hover:bg-accent/60">
                <div className="overflow-hidden">
                  <Image
                    src={featured.coverImage.src}
                    alt={featured.coverImage.alt}
                    width={featured.coverImage.width}
                    height={featured.coverImage.height}
                    className="h-72 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <CardContent className="space-y-2 p-6 sm:p-8">
                  <Badge variant="outline" className="w-fit">
                    {featured.location}
                  </Badge>
                  <p className="font-display text-h4 font-normal tracking-tight text-foreground">
                    {featured.title}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="section pt-8 sm:pt-12">
        <div className="container-page">
          <div className="relative overflow-hidden bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-20 lg:px-20">
            <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full border-[3rem] border-primary-foreground/10" />
            <div className="pointer-events-none absolute bottom-0 right-20 h-24 w-px bg-primary-foreground/25" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-caption font-semibold uppercase tracking-[0.18em] text-olive">
                  Begin while the drawings are still open to change
                </p>
                <h2 className="mt-5 font-display text-h1 font-normal tracking-tight">
                  Bring us in before anything is poured.
                </h2>
                <p className="mt-5 max-w-xl text-body-lg text-primary-foreground/80">
                  Send over your site plan or elevations and we'll scope the assessment before
                  construction begins.
                </p>
              </div>
              <Button asChild size="lg" variant="secondary" className="group w-fit">
                <Link href="/contact">
                  Start a conversation
                  <ArrowUpRight
                    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8 text-small text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>{siteName} · Crime Prevention Through Environmental Design</p>
            <span>Detailed. Chronological. Professional.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
