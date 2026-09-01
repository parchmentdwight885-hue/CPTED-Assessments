// @claude:user-owned — CPTED consultation inquiry island.

'use client';

import { ArrowUpRight, ClipboardCheck, MapPin, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ContactForm } from '@/components/custom/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ConsultationInquiryForm() {
  const router = useRouter();

  return (
    <main className="overflow-hidden">
      <section className="section-lg relative">
        <div className="pointer-events-none absolute -left-40 top-20 size-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="container-page relative grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-24">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="mb-8 flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-10 bg-primary" />
              Consultation inquiry
            </div>
            <h1 className="font-display text-[clamp(3.2rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
              Start with the place.
            </h1>
            <p className="mt-8 max-w-lg text-body-lg text-muted-foreground">
              Give us the first contours of the space, project, or question you are carrying. We
              will reply with a thoughtful next step for a CPTED consultation.
            </p>
            <div className="mt-10 border-l-2 border-primary/30 pl-5 text-small text-muted-foreground">
              <p className="font-medium text-foreground">A useful brief can be simple.</p>
              <p className="mt-1 max-w-sm">
                Tell us who you are, where the site is, what is changing, and what you want people
                to experience there.
              </p>
            </div>
          </div>

          <Card className="relative overflow-hidden rounded-none border-primary/20 bg-card/90 shadow-lg shadow-primary/5 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
            <div className="absolute right-0 top-0 h-1 w-24 bg-primary" />
            <CardHeader className="border-b border-border/70 pb-6 sm:p-8 sm:pb-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-eyebrow text-primary">Field note 01</p>
                  <CardTitle className="mt-3 font-display text-h2 tracking-tight">
                    Tell us what is taking shape.
                  </CardTitle>
                </div>
                <ArrowUpRight className="mt-1 size-6 shrink-0 text-primary/70" aria-hidden />
              </div>
              <p className="mt-4 max-w-xl text-body text-muted-foreground">
                We use these details to understand the context before we suggest a way forward.
              </p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <ContactForm
                messageLabel="Tell us about the site or project"
                messagePlaceholder="Include your organization, site or location, what is changing, and the safety or experience question you want to explore."
                namePlaceholder="Your name"
                submitLabel="Send consultation inquiry"
                onSuccess={() => router.push('/contact/confirmation')}
              />
              <p className="mt-4 text-center text-caption text-muted-foreground">
                We will only use these details to respond to your inquiry.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-muted/35">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3 sm:gap-0">
          <div className="flex gap-3 border-border sm:border-r sm:px-6 sm:first:pl-0">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-small font-medium">Place in context</p>
              <p className="mt-1 text-caption text-muted-foreground">
                Site, setting, and movement.
              </p>
            </div>
          </div>
          <div className="flex gap-3 border-border sm:border-r sm:px-6">
            <ClipboardCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-small font-medium">Practical guidance</p>
              <p className="mt-1 text-caption text-muted-foreground">
                Clear observations and next steps.
              </p>
            </div>
          </div>
          <div className="flex gap-3 sm:pl-6 sm:pr-0">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-small font-medium">People-first lens</p>
              <p className="mt-1 text-caption text-muted-foreground">
                Security-aware, never alarmist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
