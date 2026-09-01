// @claude:user-owned — case-study detail page, rendered from
// src/lib/portfolio/case-studies.ts.

import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyBody } from '@/components/custom/case-study-body';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CASE_STUDIES, getCaseStudy } from '@/lib/portfolio/case-studies';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/portfolio/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.summary,
      images: [study.coverImage.src],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main>
      <section className="section-lg border-b border-border bg-muted/35">
        <div className="container-page">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-small font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Sample assessments
          </Link>
          <div className="mt-8 flex flex-col gap-4">
            <Badge variant="outline" className="w-fit bg-background/80">
              {study.location}
            </Badge>
            <h1 className="max-w-3xl font-display text-h1 tracking-tight text-foreground">
              {study.title}
            </h1>
            <p className="max-w-2xl text-body-lg text-muted-foreground">{study.summary}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <Image
              src={study.coverImage.src}
              alt={study.coverImage.alt}
              width={study.coverImage.width}
              height={study.coverImage.height}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div>
                <p className="text-eyebrow text-olive">Prepared by</p>
                <p className="mt-2 text-small text-foreground">{study.preparedBy}</p>
              </div>
              <div>
                <p className="text-eyebrow text-olive">Assessment type</p>
                <p className="mt-2 text-small text-foreground">{study.assessmentType}</p>
              </div>
              <div>
                <p className="text-eyebrow text-olive">Documents reviewed</p>
                <ul className="mt-2 space-y-1 text-small text-muted-foreground">
                  {study.documentsReviewed.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div>
              <CaseStudyBody blocks={study.blocks} />
              <p className="mt-10 text-small font-medium uppercase tracking-[0.14em] text-muted-foreground">
                End of assessment
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="relative overflow-hidden bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-20 lg:px-20">
            <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full border-[3rem] border-primary-foreground/10" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                  Have a place like this in mind?
                </p>
                <h2 className="mt-5 font-display text-h2 tracking-tight">
                  Start with a closer look.
                </h2>
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
        </div>
      </section>
    </main>
  );
}
