// ============================================================
// FILE: VariantPreviewBar.tsx
// PURPOSE: The comparison tool. A fixed bar carrying jump links to all five Home
//          variants plus a reduced-motion toggle, so every variant is reachable from
//          every other and motion can be disabled to check the resting state.
// CONNECTS TO: shared/home-variants.constants.ts (VARIANTS), src/styles.css
//          ([data-reduced-motion] hook).
// ============================================================

import { useEffect, useState } from "react";
import { VARIANTS, type VariantId } from "./home-variants.constants";

/**
 * A fixed bottom bar for comparing variants.
 *
 * Uses plain anchors rather than router Links on purpose: the preview routes are
 * generated into routeTree.gen.ts by the dev server, so anchors keep this component
 * free of a generated-type dependency. It is a preview tool and is deleted at adoption.
 *
 * The motion toggle writes `data-reduced-motion` on <html>, which src/styles.css uses to
 * disable every CSS animation and transition — a direct test of the resting state.
 *
 * @param props.current - The variant id of the page currently being viewed.
 */
export function VariantPreviewBar({ current }: { current: VariantId }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Bracket access: tsconfig sets noPropertyAccessFromIndexSignature, and DOMStringMap
    // is an index signature, so `dataset.reducedMotion` is a TS4111 error.
    if (reduced) {
      document.documentElement.dataset["reducedMotion"] = "true";
    } else {
      delete document.documentElement.dataset["reducedMotion"];
    }
    return () => {
      delete document.documentElement.dataset["reducedMotion"];
    };
  }, [reduced]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-paper/95 backdrop-blur">
      <div className="container-x flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
        <span className="font-mono text-[10px] tracking-[0.22em] text-steel-50 uppercase">
          Home variants
        </span>

        <nav aria-label="Home variants" className="flex flex-wrap items-center gap-1">
          {VARIANTS.map((v) => {
            const isCurrent = v.id === current;
            return (
              <a
                key={v.id}
                href={`/${v.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                  isCurrent
                    ? "border-ink bg-ink text-paper"
                    : "border-border text-steel-50 hover:border-ink hover:text-ink"
                }`}
              >
                {v.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setReduced((v) => !v)}
          aria-pressed={reduced}
          className="ml-auto border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-steel-50 uppercase transition-colors duration-200 hover:border-ink hover:text-ink"
        >
          {reduced ? "Motion: off" : "Motion: on"}
        </button>
      </div>
    </div>
  );
}
