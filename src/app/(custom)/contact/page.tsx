// @claude:user-owned — public consultation inquiry page.

import type { Metadata } from 'next';
import { ConsultationInquiryForm } from '@/components/custom/consultation-inquiry-form';
import { siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Request guard coverage or a consultation',
  description: `Tell ${siteName} about the guard coverage you need, or share the context for a CPTED design consultation.`,
};

export default function ContactPage() {
  return <ConsultationInquiryForm />;
}
