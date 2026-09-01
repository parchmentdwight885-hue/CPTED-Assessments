// @claude:user-owned — renders CaseStudyBlock[] (src/lib/portfolio/case-studies.ts)
// for the /portfolio/[slug] detail page.

import type { CaseStudyBlock } from '@/lib/portfolio/case-studies';

export function CaseStudyBody({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case 'heading':
            return block.level === 2 ? (
              <h2
                key={key}
                className="pt-6 font-display text-h3 tracking-tight text-foreground first:pt-0"
              >
                {block.text}
              </h2>
            ) : (
              <h3 key={key} className="pt-2 font-display text-h4 tracking-tight text-foreground">
                {block.text}
              </h3>
            );
          case 'label':
            return (
              <p key={key} className="text-eyebrow text-olive">
                {block.text}
              </p>
            );
          case 'paragraph':
            return (
              <p key={key} className="text-body text-muted-foreground">
                {block.text}
              </p>
            );
          case 'list':
            return (
              <ul key={key} className="list-disc space-y-2 pl-5 marker:text-primary">
                {block.items.map((item) => (
                  <li key={item} className="pl-1 text-body text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'numbered':
            return (
              <ol
                key={key}
                start={block.start ?? 1}
                className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-primary"
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1 text-body text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
