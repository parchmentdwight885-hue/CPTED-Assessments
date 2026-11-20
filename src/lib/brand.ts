// @claude:user-owned — brand identity. Edit freely. `site.ts` re-exports
// siteName/siteDescription; `manifest.ts` + `opengraph-image.tsx` read `brandVisual`.

export const siteName = 'Genisis Security Services';
export const siteDescription =
  'Licensed armed and unarmed security guard services, backed by CPTED-informed security design consulting.';

// Single source of truth for the public contact inbox — shown on the
// consultation confirmation page and anywhere else a direct email is needed.
// Also the default reply-to / alert recipient for the inquiry-automation
// pipeline (src/lib/business/inquiry-automation.ts) until RESEND_FROM_EMAIL /
// INQUIRY_NOTIFICATION_EMAIL are set.
export const contactEmail = '119jannea@gmail.com';

// PWA + social-share colors. HEX only (the oklch() tokens in globals.css aren't
// readable here) — set to match your brand seed. Derived from the navy/gold
// shield mark (brand_tokens seed: --brand-h 255 navy + --color-gold accent).
export const brandVisual = {
  /** PWA browser-UI / status-bar color. */
  themeColor: '#10335D',
  /** PWA splash + install background. */
  backgroundColor: '#f5f4ef',
  /** Social-share (OG/Twitter) image. */
  og: {
    background: '#011E42',
    foreground: '#f5f4ef',
    /** Second line under the site name; '' hides it. */
    tagline: 'Security From The Design Stage',
  },
} as const;
