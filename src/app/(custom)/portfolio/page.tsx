// @claude:user-owned — sample-work index; lists src/lib/portfolio/case-studies.ts.

import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CASE_STUDIES } from '@/lib/portfolio/case-studies';

export const metadata: Metadata = {
  title: 'Sample assessments',
  description:
    'Preliminary CPTED design reviews, shared to show how Waymark Ember reads a site before you start a consultation.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioIndexPage() {
  return (
    <main>
      <section className="section-lg border-b border-border bg-muted/35">
        <div className="container-page">
          <p className="text-eyebrow">Sample work</p>
          <h1 className="mt-4 max-w-2xl font-display text-h1 tracking-tight text-foreground">
            A look at how we read a place.
          </h1>
          <p className="mt-5 max-w-xl text-body-lg text-muted-foreground">
            Preliminary, design-stage CPTED reviews — shared here so you can see the depth of a
            Waymark Ember assessment before starting a consultation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <Link key={study.slug} href={`/portfolio/${study.slug}`} className="group block">
                <Card className="h-full overflow-hidden shadow-none transition-colors duration-200 ease-out group-hover:bg-accent/60">
                  <div className="overflow-hidden">
                    <Image
                      src={study.coverImage.src}
                      alt={study.coverImage.alt}
                      width={study.coverImage.width}
                      height={study.coverImage.height}
                      className="h-56 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <CardContent className="space-y-3 p-6 sm:p-8">
                    <Badge variant="outline" className="w-fit">
                      {study.location}
                    </Badge>
                    <CardTitle className="flex items-center gap-2 font-display text-h4 tracking-tight">
                      {study.title}
                      <ArrowUpRight
                        className="size-4 text-primary/70 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </CardTitle>
                    <p className="text-body text-muted-foreground">{study.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
