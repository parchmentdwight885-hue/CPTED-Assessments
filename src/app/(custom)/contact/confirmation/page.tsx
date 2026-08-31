// @claude:user-owned — confirmation page for successful inquiries.

import type { Metadata } from 'next';
import { ConsultationConfirmation } from '@/components/custom/consultation-confirmation';

export const metadata: Metadata = {
  title: 'Inquiry received',
  description: 'Your Waymark Ember consultation inquiry has been received.',
};

export default function ConsultationConfirmationPage() {
  return <ConsultationConfirmation />;
}
