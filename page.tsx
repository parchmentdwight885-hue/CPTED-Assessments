// @claude:user-owned — public consultation inquiry page.

import type { Metadata } from 'next';
import { ConsultationInquiryForm } from '@/components/custom/consultation-inquiry-form';

export const metadata: Metadata = {
  title: 'Start a consultation',
  description: 'Share the context for a Waymark Ember CPTED consultation.',
};

export default function ContactPage() {
  return <ConsultationInquiryForm />;
}
