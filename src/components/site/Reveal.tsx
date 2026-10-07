// ============================================================
// FILE: Reveal.tsx
// PURPOSE: The site's single scroll-reveal primitive. Fades and lifts children into
//          place as they enter the viewport.
// CONNECTS TO: src/styles.css (the `reveal` utility and the `reveal-in` keyframes).
//          Used by Section, CtaBar, EmptyState and most routes.
// ============================================================
//
// This deliberately does NOT use Motion.
//
// The previous version set `initial={{ opacity: 0 }}`, which meant the server rendered
// every revealed element at `opacity:0` and only JavaScript could bring it back. If the
// observer never fired — JS disabled, a hydration failure, a viewer that does not scroll,
// an embed with an unusual viewport — the entire page rendered blank.
//
// Now the element is visible by default and the animation is attached only inside
// `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`
// (see src/styles.css). Browsers without scroll-driven animations get no animation and a
// fully legible page. The repo rule is "the resting state must be correct on its own";
// this is what that costs.

import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, previously a Motion delay in seconds. On a scroll timeline there is no
   *  clock, so this becomes an offset into the element's entry range. */
  delay?: number;
  /** Starting vertical offset in pixels. Transform only, never layout. */
  y?: number;
  className?: string;
};

/** Seconds of Motion delay to a percentage offset into the entry range. */
const DELAY_TO_OFFSET = 40;
const MAX_OFFSET = 20;

/**
 * Reveals its children on first scroll into view.
 *
 * The resting state is visible, so the page is fully legible with animation disabled,
 * with JavaScript disabled, and before hydration.
 *
 * @param props.delay - Stagger. Mapped to an entry-range offset, capped at 20%.
 * @param props.y - Starting vertical offset in pixels.
 * @param props.className - Merged onto the wrapper element.
 *
 * @connects src/styles.css (`reveal`, `reveal-in`, `--reveal-y`, `--reveal-offset`)
 */
export function Reveal({ children, delay = 0, y = 18, className }: RevealProps) {
  const offset = `${Math.min(delay * DELAY_TO_OFFSET, MAX_OFFSET).toFixed(1)}%`;

  return (
    <div
      className={className ? `reveal ${className}` : "reveal"}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-offset": offset,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
