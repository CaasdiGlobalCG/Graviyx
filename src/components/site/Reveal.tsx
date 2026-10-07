// ============================================================
// FILE: Reveal.tsx
// PURPOSE: The site's single scroll-reveal primitive. Fades and lifts children into
//          place once, when they enter the viewport.
// CONNECTS TO: motion/react. Used by Section, CtaBar, EmptyState and most routes.
//          Reduced motion is handled globally by <MotionConfig reducedMotion="user">
//          in src/routes/__root.tsx, so this component needs no local gate.
// ============================================================

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Mirrors --ease-signal in src/styles.css. Kept as a tuple so Motion's type accepts it. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Mirrors --motion-scene in src/styles.css. */
const REVEAL_DURATION = 0.6;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Reveals its children on first scroll into view.
 *
 * Animates transform and opacity only — never a layout property — so nothing
 * reflows while the reveal runs. Under `prefers-reduced-motion` the global
 * MotionConfig suppresses the transform, leaving a correct resting state.
 *
 * @param props.delay - Seconds to wait before the reveal starts.
 * @param props.y - Starting vertical offset in pixels.
 * @param props.className - Passed through to the wrapper element.
 *
 * @connects src/styles.css (--motion-scene, --ease-signal)
 */
export function Reveal({ children, delay = 0, y = 18, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: REVEAL_DURATION, delay, ease: EASE_SIGNAL }}
    >
      {children}
    </motion.div>
  );
}
