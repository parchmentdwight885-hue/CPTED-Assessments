// @claude:user-owned — public consultation inquiry page.

import type { Metadata } from 'next';
import { ConsultationInquiryForm } from '@/components/custom/consultation-inquiry-form';
import { siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Start a consultation',
  description: `Share the context for a ${siteName} CPTED consultation.`,
};

export default function ContactPage() {
  return <ConsultationInquiryForm />;
}
