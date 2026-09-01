// @claude:user-owned — brand identity. Edit freely. `site.ts` re-exports
// siteName/siteDescription; `manifest.ts` + `opengraph-image.tsx` read `brandVisual`.

export const siteName = 'Thoughtful Design';
export const siteDescription =
  'CPTED design reviews that catch security gaps at the drawing board, before construction begins.';

// Single source of truth for the public contact inbox — shown on the
// consultation confirmation page and anywhere else a direct email is needed.
// Also the default reply-to / alert recipient for the inquiry-automation
// pipeline (src/lib/business/inquiry-automation.ts) until RESEND_FROM_EMAIL /
// INQUIRY_NOTIFICATION_EMAIL are set.
export const contactEmail = '119jannea@gmail.com';

// PWA + social-share colors. HEX only (the oklch() tokens in globals.css aren't
// readable here) — set to match your brand seed.
export const brandVisual = {
  /** PWA browser-UI / status-bar color. */
  themeColor: '#1c305e',
  /** PWA splash + install background. */
  backgroundColor: '#f5f4ef',
  /** Social-share (OG/Twitter) image. */
  og: {
    background: '#0c1a33',
    foreground: '#f5f4ef',
    /** Second line under the site name; '' hides it. */
    tagline: 'Detailed. Chronological. Professional.',
  },
} as const;
