// @claude:user-owned — brand identity. Edit freely. `site.ts` re-exports
// siteName/siteDescription; `manifest.ts` + `opengraph-image.tsx` read `brandVisual`.

export const siteName = 'Waymark Ember';
export const siteDescription = 'Safer places, designed with people in mind.';

// Single source of truth for the public contact inbox — shown on the
// consultation confirmation page and anywhere else a direct email is needed.
// TODO: replace with the real inbox before launch.
export const contactEmail = 'hello@waymarkember.com';

// PWA + social-share colors. HEX only (the oklch() tokens in globals.css aren't
// readable here) — set to match your brand seed.
export const brandVisual = {
  /** PWA browser-UI / status-bar color. */
  themeColor: '#c45b32',
  /** PWA splash + install background. */
  backgroundColor: '#f8f4ee',
  /** Social-share (OG/Twitter) image. */
  og: {
    background: '#2b211c',
    foreground: '#f8f4ee',
    /** Second line under the site name; '' hides it. */
    tagline: 'Safer places, designed with people in mind.',
  },
} as const;
