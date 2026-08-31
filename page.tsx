// @claude:user-owned — starter home served at /. Replace it in place, or delete
// this route group before adding another page that resolves to /.

import { ArrowDownRight, ArrowUpRight, Check, Eye, Footprints, Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { siteDescription, siteName } from '@/lib/site';

// Keep this a Server Component so it can export metadata.
export const metadata: Metadata = {
  title: { absolute: siteName },
  description: siteDescription,
  // Do not export an explicit openGraph object here; that suppresses the
  // file-based opengraph-image.tsx for the home route.
  alternates: { canonical: '/' },
};

const OBSERVATIONS = [
  {
    number: '01',
    title: 'Visibility',
    description: 'What can people see, and what disappears at the edges?',
    icon: Eye,
  },
  {
    number: '02',
    title: 'Movement',
    description: 'How do people arrive, pass through, pause, and find their way?',
    icon: Footprints,
  },
  {
    number: '03',
    title: 'Care + activity',
    description: 'What signals welcome, ownership, attention, and everyday presence?',
    icon: Lightbulb,
  },
] as const;

function SitePlan() {
  return (
    <div className="relative aspect-square w-full max-w-[31rem] overflow-hidden border border-border bg-muted/50 p-5 shadow-xl sm:p-8">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:2.25rem_2.25rem]" />
      <div className="relative flex h-full flex-col justify-between border border-border/80 bg-background/75 p-4 backdrop-blur-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary">
              Field note
            </p>
            <p className="mt-1 font-display text-lg font-semibold tracking-tight">
              A place in context
            </p>
          </div>
          <Badge variant="outline" className="shrink-0 bg-background/80">
            CPTED lens
          </Badge>
        </div>

        <div className="relative mx-auto flex aspect-[1.18] w-[78%] items-center justify-center border border-primary/45 bg-primary/10">
          <div className="absolute -left-px top-1/4 h-1/2 w-1/4 border-y border-r border-primary/60 bg-primary/10" />
          <div className="absolute -right-px top-1/4 h-1/2 w-1/4 border-y border-l border-primary/60 bg-primary/10" />
          <div className="h-1/2 w-1/2 border border-primary/75 bg-primary/15" />
          <div className="absolute -top-7 left-1/2 h-7 border-l border-dashed border-primary/70" />
          <div className="absolute -bottom-7 left-1/2 h-7 border-l border-dashed border-primary/70" />
          <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_6px_var(--color-background),0_0_0_7px_var(--color-primary)]" />
          <span className="absolute -top-11 left-1/2 -translate-x-1/2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Arrival
          </span>
          <span className="absolute -bottom-11 left-1/2 -translate-x-1/2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Connection
          </span>
        </div>

        <div className="flex items-end justify-between gap-5 text-xs text-muted-foreground">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" /> Sightline
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full border border-primary" /> Threshold
            </div>
          </div>
          <ArrowDownRight className="size-8 text-primary/80" strokeWidth={1.25} aria-hidden />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="section-lg relative">
        <div className="pointer-events-none absolute -right-36 -top-28 size-[30rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="container-page relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,31rem)] lg:items-center lg:gap-20">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="mb-8 flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-10 bg-primary" />
              CPTED consultancy
            </div>
            <h1 className="max-w-4xl font-display text-[clamp(3.2rem,8vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-foreground">
              Safer places,
              <span className="block text-primary">designed with</span>
              <span className="block">people in mind.</span>
            </h1>
            <div className="mt-10 grid max-w-2xl gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <p className="max-w-xl text-body-lg text-muted-foreground">
                Waymark Ember helps owners, planners, developers, and communities read the
                relationship between place and safety — then turn that reading into practical design
                guidance.
              </p>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Talk through your place
                    <ArrowUpRight
                      className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#approach">Our approach</a>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
            <SitePlan />
          </div>
        </div>
      </section>

      <section id="approach" className="border-y border-border bg-muted/35">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24 lg:py-28">
          <div>
            <p className="text-eyebrow">The Waymark Ember lens</p>
            <h2 className="mt-4 max-w-md font-display text-h2 tracking-tight">
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
              practice in real-world awareness, Waymark Ember makes established CPTED principles
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

      <section id="services" className="section">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-eyebrow">What we look at</p>
              <h2 className="mt-4 max-w-xl font-display text-h2 tracking-tight">
                A grounded read of the spaces people actually use.
              </h2>
            </div>
            <p className="max-w-xs text-small text-muted-foreground sm:text-right">
              For sites, buildings, public spaces, and the connections between them.
            </p>
          </div>
          <div className="mt-10 grid gap-0 border-l border-border">
            {OBSERVATIONS.map(({ number, title, description, icon: Icon }) => (
              <Card
                key={number}
                className="group rounded-none border-b border-r border-t-0 border-l-0 bg-card/70 shadow-none transition-colors duration-200 ease-out first:border-t hover:bg-accent/60"
              >
                <CardContent className="grid gap-6 p-6 sm:grid-cols-[4rem_minmax(9rem,0.55fr)_minmax(0,1fr)_auto] sm:items-center sm:p-8">
                  <span className="font-mono text-caption font-semibold tracking-[0.16em] text-primary">
                    {number}
                  </span>
                  <CardTitle className="flex items-center gap-3 font-display text-h4 tracking-tight">
                    <Icon
                      className="size-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {title}
                  </CardTitle>
                  <p className="max-w-md text-body text-muted-foreground">{description}</p>
                  <ArrowUpRight
                    className="hidden size-5 text-primary/70 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
                    aria-hidden
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section pt-8 sm:pt-12">
        <div className="container-page">
          <div className="relative overflow-hidden bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-20 lg:px-20">
            <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full border-[3rem] border-primary-foreground/10" />
            <div className="pointer-events-none absolute bottom-0 right-20 h-24 w-px bg-primary-foreground/25" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                  Begin with a closer look
                </p>
                <h2 className="mt-5 font-display text-h1 tracking-tight">Have a place in mind?</h2>
                <p className="mt-5 max-w-xl text-body-lg text-primary-foreground/80">
                  Tell us what you are working on, where it is, and what you want people to
                  experience there. We will start from the context.
                </p>
              </div>
              <Button asChild size="lg" variant="secondary" className="group w-fit">
                <Link href="/contact">
                  Start a consultation
                  <ArrowUpRight
                    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8 text-small text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Waymark Ember · Crime Prevention Through Environmental Design</p>
            <div className="flex items-center gap-3">
              <Separator className="w-10 sm:hidden" />
              <span>Thoughtful places, safer days.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
