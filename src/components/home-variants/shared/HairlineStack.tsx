// ============================================================
// FILE: HairlineStack.tsx
// PURPOSE: The shared-language list primitive. Hairline-separated rows that slide in
//          on scroll, with an optional line that draws through each row as the next
//          arrives — the motion cue the v2.0 content doc gives for "Sound familiar?".
// CONNECTS TO: motion/react, src/styles.css (hairlines, --ease-signal).
// ============================================================

import { motion } from "motion/react";

/** Mirrors --ease-signal in src/styles.css. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Renders items as hairline-separated rows.
 *
 * Animates transform and opacity only. The optional strike-through is a hairline that
 * scales on the X axis, so no text is reflowed and no layout property is animated.
 *
 * @param props.items - The lines to render.
 * @param props.strike - Draw a hairline through each line as the next one arrives.
 * @param props.className - Extra classes, merged onto the list.
 *
 * @connects src/styles.css (--ease-signal, hairlines)
 */
export function HairlineStack({
  items,
  strike = false,
  className = "",
}: {
  items: readonly string[];
  strike?: boolean;
  className?: string;
}) {
  return (
    <ul className={`border-t border-border ${className}`}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          className="border-b border-border py-5 md:py-6"
          initial={{ x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.42, delay: i * 0.1, ease: EASE_SIGNAL }}
        >
          <span className="relative inline-block">
            <span className="text-[17px] text-ink md:text-[19px]">{item}</span>
            {strike ? (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease: EASE_SIGNAL }}
              />
            ) : null}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
