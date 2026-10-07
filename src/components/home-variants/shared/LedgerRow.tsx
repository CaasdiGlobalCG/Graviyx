// ============================================================
// FILE: LedgerRow.tsx
// PURPOSE: The shared-language row primitive — a mono index, a hairline and a title
//          with optional body copy. The A1 and A2 variants build their pages from this
//          so the only difference between them is information architecture.
// CONNECTS TO: MonoIndex, @/components/site/Reveal, src/styles.css.
// ============================================================

import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";
import { MonoIndex } from "./MonoIndex";

/**
 * A numbered, hairline-separated row.
 *
 * @param props.index - The row's index, rendered through MonoIndex.
 * @param props.title - The row heading.
 * @param props.body - Optional supporting copy.
 * @param props.children - Optional extra content rendered under the body.
 * @param props.last - Suppress the bottom hairline on the final row.
 *
 * @connects shared/MonoIndex.tsx, @/components/site/Reveal.tsx
 */
export function LedgerRow({
  index,
  title,
  body,
  children,
  last = false,
}: {
  index: number | string;
  title: string;
  body?: string;
  children?: ReactNode;
  last?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={`grid gap-3 py-7 md:grid-cols-[72px_1fr] md:gap-8 md:py-9 ${
          last ? "" : "border-b border-border"
        }`}
      >
        <MonoIndex n={index} className="pt-1.5" />
        <div>
          <h3 className="display-sm text-ink">{title}</h3>
          {body ? <p className="body-copy mt-2 max-w-2xl">{body}</p> : null}
          {children}
        </div>
      </div>
    </Reveal>
  );
}
