// @claude:user-owned — successful consultation inquiry state.

'use client';

import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { contactEmail } from '@/lib/brand';
import { siteName } from '@/lib/site';

export function ConsultationConfirmation() {
  return (
    <main className="section-lg">
      <div className="container-page">
        <Card className="mx-auto max-w-2xl rounded-none border-primary/20 bg-card/90 shadow-lg shadow-primary/5">
          <CardContent className="flex flex-col items-start p-8 sm:p-12">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Check className="size-7" aria-hidden />
            </div>
            <p className="mt-8 text-eyebrow text-primary">Inquiry received</p>
            <h1 className="mt-3 font-display text-h1 tracking-tight">
              Thank you for sharing the context.
            </h1>
            <p className="mt-5 max-w-xl text-body-lg text-muted-foreground">
              Your note is with {siteName}. We will review the site or project details and get back
              to you with a considered next step for your consultation.
            </p>
            <p className="mt-6 border-l-2 border-primary/30 pl-4 text-small text-muted-foreground">
              If the question is time-sensitive, you can also reach us at{' '}
              <span className="font-medium text-foreground">{contactEmail}</span>.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/">Back to {siteName}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">
                  <ArrowLeft aria-hidden /> Send another inquiry
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
