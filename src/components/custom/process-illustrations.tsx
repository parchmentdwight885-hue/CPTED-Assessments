// @claude:user-owned — visual pieces shown inside each expanded process-stage
// panel on the homepage (see process-accordion.tsx). PlanPhoto renders real
// crops taken from the client's own concept board (see
// public/assets/portfolio/beachfront-condominium/) rather than illustrated
// or generated imagery. ShieldMark is a small brand mark used on the sample
// report page. SiteWalkthroughVideo is an embed slot for a future walkthrough
// clip, with a styled placeholder until one is wired up.

import Image from 'next/image';

/** A real photo/render crop from the project's concept board — the ground
 * floor plan or the aerial site rendering — optionally finished with a
 * small "Verified" stamp for the implementation-support stage. */
export function PlanPhoto({
  src,
  alt,
  width,
  height,
  stamp,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  stamp?: boolean;
}) {
  return (
    <div className="relative overflow-hidden border border-border bg-muted/30">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
      {stamp && (
        <div className="absolute bottom-3 right-3 flex -rotate-6 flex-col items-center gap-0.5 border-2 border-primary bg-background/95 px-3 py-2">
          <svg
            viewBox="0 0 24 24"
            className="size-5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12l5 5L20 6" />
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-primary">
            Verified
          </span>
        </div>
      )}
    </div>
  );
}

/** Small shield-and-bars brand mark used as the letterhead on the sample
 * report page. Pure theme tokens, matching the rest of the site's line-art
 * style (see HeroMark in (setup)/page.tsx). */
export function ShieldMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 46" className={className} role="img" aria-hidden="true">
      <path
        d="M20 2 L36 8 V21 C36 32 29 40 20 44 C11 40 4 32 4 21 V8 Z"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />
      <rect x="12.5" y="27" width="4" height="9" fill="var(--color-primary)" />
      <rect x="18" y="20" width="4" height="16" fill="var(--color-primary)" />
      <rect x="23.5" y="24" width="4" height="12" fill="var(--color-olive)" />
    </svg>
  );
}

/** A 16:9 video slot for a process stage. Pass a `videoUrl` — a YouTube or
 * Vimeo *embed* URL (e.g. https://www.youtube.com/embed/VIDEO_ID, from that
 * video's Share → Embed panel, not the regular watch/share link; or
 * https://player.vimeo.com/video/VIDEO_ID) — once a walkthrough clip exists.
 * Hosting the clip externally like this keeps large video files out of the
 * git repo entirely, rather than uploading them alongside the source code.
 * Until a `videoUrl` is set this renders a styled placeholder instead of a
 * broken or empty space. */
export function SiteWalkthroughVideo({ videoUrl, title }: { videoUrl?: string; title: string }) {
  if (!videoUrl) {
    return (
      <div
        className="flex aspect-video w-full flex-col items-center justify-center gap-3 border border-dashed border-border bg-muted/30 px-6 text-center"
        role="img"
        aria-label="Video walkthrough placeholder — not yet added"
      >
        <svg viewBox="0 0 48 48" className="size-9 text-muted-foreground/60" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 16.5 L32 24 L20 31.5 Z" fill="currentColor" />
        </svg>
        <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Video walkthrough — coming soon
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden border border-border bg-black">
      <iframe
        src={videoUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
