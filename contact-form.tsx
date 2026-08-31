// @claude:user-owned
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch } from '@/lib/api-client';
import { contactSchema } from '@/lib/contact/schema';

// Composes the template's base shadcn primitives (Button/Input/Label/Textarea)
// styled through the theme tokens. Restyle via the brand_tokens slot + cva
// variants, or pull more primitives with `npx shadcn add` and compose them.
type ContactFormProps = {
  emailPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  namePlaceholder?: string;
  onSuccess?: () => void;
  submitLabel?: string;
};

export function ContactForm({
  emailPlaceholder = 'you@example.com',
  messageLabel = 'Message',
  messagePlaceholder = 'How can we help?',
  namePlaceholder = 'Your name',
  onSuccess,
  submitLabel = 'Send message',
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [ok, setOk] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }

    setPending(true);
    try {
      await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(parsed.data),
      });
      setOk(true);
      onSuccess?.();
    } catch (err) {
      const cause = (
        err as { cause?: { errors?: { name?: string; email?: string; message?: string } } }
      ).cause;
      if (cause?.errors) {
        setErrors(cause.errors);
      } else {
        toast.error('We could not send your inquiry. Please try again.');
      }
    } finally {
      setPending(false);
    }
  }

  if (ok) {
    return (
      <p className="py-4 text-center text-sm font-medium text-foreground">
        Thanks — we&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <Label htmlFor="contact-name">Name</Label>
      <Input
        id="contact-name"
        name="name"
        type="text"
        placeholder={namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        aria-invalid={errors.name ? true : undefined}
      />
      {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
      <Label htmlFor="contact-email">Email address</Label>
      <Input
        id="contact-email"
        name="email"
        type="email"
        placeholder={emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-invalid={errors.email ? true : undefined}
      />
      {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
      <Label htmlFor="contact-message">{messageLabel}</Label>
      <Textarea
        id="contact-message"
        name="message"
        placeholder={messagePlaceholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        aria-invalid={errors.message ? true : undefined}
      />
      {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Sending…' : submitLabel}
      </Button>
    </form>
  );
}
