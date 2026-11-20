// @claude:user-owned — starter home served at /. Replace it in place, or delete
// this route group before adding another page that resolves to /.

import { ArrowUpRight, Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ProcessAccordion } from '@/components/custom/process-accordion';
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
    label: 'Armed guards',
    title: 'Elevated deterrence and response',
    description:
      'Licensed, firearm-certified officers posted where the risk profile calls for a stronger deterrent and a faster response.',
  },
  {
    number: '02',
    label: 'Unarmed guards',
    title: 'Day-to-day access and presence',
    description:
      'Professional, customer-facing officers staffing access control, patrols, and front-desk or gate posts.',
  },
  {
    number: '03',
    label: 'Coverage',
    title: 'Scheduled, 24/7, or event-based',
    description:
      'Staffing scaled to the hours and risk profile of your site — a single shift, round-the-clock coverage, or a one-time event.',
  },
  {
    number: '04',
    label: 'Deployment',
    title: 'Posts placed by design, not guesswork',
    description:
      'Guard posts and patrol routes informed by the same CPTED principles behind our design-consulting line.',
  },
] as const;

export default function HomePage() {
  const featured = CASE_STUDIES[0];

  return (
    <main className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="section-lg relative">
        <div className="container-page relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="mb-6 flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-px w-6 bg-gold" />
              Armed &amp; unarmed guard services
            </div>
            <h1 className="font-display text-h1 font-normal leading-[1.08] tracking-tight text-foreground sm:text-[3.4rem]">
              Professional security guards, backed by a design-trained eye.
            </h1>
            <p className="mt-7 max-w-lg text-body-lg text-muted-foreground">
              {siteName} staffs licensed armed and unarmed officers for properties, communities, and
              events — a visible, reliable presence from a team that also understands how a site is
              built to be secured.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Request guard coverage
                  <ArrowUpRight
                    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#consulting">Design consulting</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 lg:justify-end">
            <Image
              src="/assets/brand/gss-mark.png"
              alt={`${siteName} shield emblem`}
              width={512}
              height={512}
              priority
              className="w-full max-w-[22rem]"
            />
          </div>
        </div>
      </section>

      {/* ================= APPROACH ================= */}
      <section id="approach" className="border-y border-border bg-muted/35">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24 lg:py-28">
          <div>
            <p className="text-eyebrow text-gold">The {siteName} approach</p>
            <h2 className="mt-4 max-w-md font-display text-h2 font-normal tracking-tight">
              Trained presence, paired with a trained eye for design.
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-body-lg text-muted-foreground">
            <p>
              A visible, professional officer is the first line of protection for any property — but
              where and how that post is placed matters just as much as who is staffing it. We
              assign guards and patrol routes with that in mind.
            </p>
            <p>
              Led by Dwight Parchment, whose frontline experience as a security officer shapes how
              we train and deploy guards, {siteName} pairs licensed armed and unarmed staffing with
              the same CPTED principles behind our design-consulting line.
            </p>
            <div className="flex items-center gap-3 pt-3 text-small font-medium text-foreground">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-4" aria-hidden />
              </span>
              Licensed officers. Reliable coverage. Security built in from the start.
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="section">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-eyebrow text-gold">Guard services</p>
              <h2 className="mt-4 max-w-xl font-display text-h2 font-normal tracking-tight">
                Armed and unarmed coverage, staffed to the site.
              </h2>
            </div>
            <p className="max-w-xs text-small text-muted-foreground sm:text-right">
              From a single storefront to a multi-building residential community.
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ number, label, title, description }) => (
              <div key={number} className="border-l border-border pl-6 first:border-l-0 first:pl-0">
                <span className="text-caption font-semibold uppercase tracking-[0.08em] text-gold">
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

      {/* ================= MISSION & VISION ================= */}
      <section id="mission" className="border-y border-border bg-muted/35">
        <div className="container-page py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-eyebrow text-gold">Why this work matters</p>
            <h2 className="mt-4 font-display text-h2 font-normal tracking-tight">
              Mission &amp; vision
            </h2>
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-caption font-semibold uppercase tracking-[0.08em] text-gold">
                Mission
              </span>
              <div className="mt-4 space-y-4 text-body-lg text-muted-foreground">
                <p>
                  {siteName} exists to put reliable, professional officers — armed and unarmed — on
                  the properties and events that need them, so owners, residents, and guests are
                  protected around the clock.
                </p>
                <p>
                  Every officer we staff is trained, licensed, and held to a clear standard of
                  conduct, and every post is scheduled and supervised so coverage never has a gap.
                </p>
                <p className="text-foreground">
                  Every post we staff exists to protect the people who will ultimately live, work,
                  and move through that space — a responsibility we hold as central to the work, not
                  incidental to it.
                </p>
              </div>
            </div>
            <div className="lg:border-l lg:border-border lg:pl-16">
              <span className="text-caption font-semibold uppercase tracking-[0.08em] text-gold">
                Vision
              </span>
              <div className="mt-4 space-y-4 text-body-lg text-muted-foreground">
                <p>
                  We&apos;re working toward being a security partner that offers more than headcount
                  — guard staffing backed by the same design-stage thinking that keeps a site safer
                  before an officer ever needs to act.
                </p>
                <p className="text-foreground">
                  A strong guard presence and a well-designed site aren&apos;t separate disciplines
                  to us — together, they&apos;re the standard we hold every engagement to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESIGN CONSULTING (secondary service) ================= */}
      <section id="consulting" className="bg-primary text-primary-foreground">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-5 border-b border-primary-foreground/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-eyebrow text-primary-foreground/60">
                Also available — design consulting
              </p>
              <h2 className="mt-4 max-w-xl font-display text-h2 font-normal tracking-tight text-primary-foreground">
                CPTED reviews, for clients who want security considered before anything is built.
              </h2>
              <p className="mt-5 max-w-2xl text-body-lg text-primary-foreground/80">
                {`Alongside guard staffing, ${siteName} offers CPTED-informed design consulting — reviewing layout, sightlines, lighting, and access before a design is finalized. It's a secondary service for clients who want security built into the plans themselves, closed out with a written deliverable at each stage.`}
              </p>
            </div>
          </div>
          <ProcessAccordion />
        </div>
      </section>

      {/* ================= SAMPLE WORK ================= */}
      {featured && (
        <section id="sample" className="section">
          <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="text-eyebrow text-gold">Design consulting — sample work</p>
              <h2 className="mt-4 max-w-md font-display text-h2 font-normal tracking-tight">
                A report built to be acted on, not filed away.
              </h2>
              <p className="mt-6 max-w-md text-body-lg text-muted-foreground">
                Every design-consulting assessment is delivered as a single reference document —
                findings, plan citations, and priority ordered so nothing gets lost between the
                design table and the site.
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
                <p className="text-caption font-semibold uppercase tracking-[0.18em] text-gold">
                  Begin with guard coverage, or start a design review
                </p>
                <h2 className="mt-5 font-display text-h1 font-normal tracking-tight">
                  Put trained officers on site — and build security into the plans.
                </h2>
                <p className="mt-5 max-w-xl text-body-lg text-primary-foreground/80">
                  Tell us about your property or event and we&apos;ll scope the right mix of guard
                  staffing and, if you need it, a design-stage review.
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
            <p>{siteName} · Armed &amp; Unarmed Guard Services · Design Consulting</p>
            <span>Licensed. Reliable. Security-minded by design.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
