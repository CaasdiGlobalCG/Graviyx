// ============================================================
// FILE: SystemDiagram.tsx
// PURPOSE: The shared "four sides, one centre" graphic. Buyers, Suppliers, Logistics and
//          Intelligence sit around a GRAVIYX centre, with pulses travelling inward so the
//          system reads as live. This is the v2.0 content doc's "best slot on the page".
// CONNECTS TO: motion/react, src/styles.css (hairlines, --ease-signal).
// ============================================================

import { motion } from "motion/react";

/** Mirrors --ease-signal in src/styles.css. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Mirrors --motion-slow in src/styles.css. */
const PULSE_DURATION = 2.6;

type Side = { readonly key: string; readonly body: string };

function SideCard({ side, align = "left" }: { side: Side; align?: "left" | "right" }) {
  return (
    <div className={align === "right" ? "lg:text-right" : ""}>
      <h3 className="display-sm text-ink">{side.key}</h3>
      <p className="body-copy mt-2 text-[15px]">{side.body}</p>
    </div>
  );
}

/**
 * A pulse travelling along one connector, toward the centre.
 *
 * Animates transform and opacity only. It is a decorative duplicate of information that
 * is already present as text, so it is aria-hidden.
 */
function Pulse({ axis, reverse = false }: { axis: "x" | "y"; reverse?: boolean }) {
  const distance = 16;
  const from = reverse ? distance : -distance;
  const to = reverse ? -distance : distance;
  const keyframes = axis === "x" ? { x: [from, to] } : { y: [from, to] };

  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
      animate={keyframes}
      transition={{ duration: PULSE_DURATION, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/**
 * Renders four sides around a central block.
 *
 * @param props.sides - Exactly four sides, in order: top-left, top-right, bottom-left, bottom-right.
 * @param props.centre - The label for the centre block.
 * @param props.caption - Optional line under the diagram.
 *
 * @connects src/styles.css (hairlines, --ease-signal)
 */
export function SystemDiagram({
  sides,
  centre,
  caption,
}: {
  sides: readonly Side[];
  centre: string;
  caption?: string;
}) {
  const [topLeft, topRight, bottomLeft, bottomRight] = sides;

  return (
    <figure className="mx-auto mt-12 max-w-5xl border-y border-border py-6 md:py-8">
      {/* Desktop: a symmetric 3x3 grid with the centre in the middle. */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[auto_auto_auto]">
        {topLeft ? <div className="p-4"><SideCard side={topLeft} /></div> : null}
        <div className="relative min-h-[64px] min-w-[64px]">
          <span className="absolute top-1/2 right-0 left-0 h-px bg-border" />
          <Pulse axis="x" reverse />
        </div>
        {topRight ? <div className="p-4"><SideCard side={topRight} align="right" /></div> : null}

        <div className="relative min-h-[64px]">
          <span className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
          <Pulse axis="y" />
        </div>
        <div className="grid place-items-center p-4">
          <div className="bg-ink px-7 py-6 text-center">
            <p className="font-mono text-[9px] tracking-[0.22em] text-paper/70 uppercase">
              {centre}
            </p>
            <p className="mt-2 font-mono text-[15px] tracking-[0.1em] text-paper">ONE SYSTEM</p>
          </div>
        </div>
        <div className="relative min-h-[64px]">
          <span className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
          <Pulse axis="y" />
        </div>

        {bottomLeft ? <div className="p-4"><SideCard side={bottomLeft} /></div> : null}
        <div className="relative min-h-[64px] min-w-[64px]">
          <span className="absolute top-1/2 right-0 left-0 h-px bg-border" />
          <Pulse axis="x" />
        </div>
        {bottomRight ? (
          <div className="p-4"><SideCard side={bottomRight} align="right" /></div>
        ) : null}
      </div>

      {/* Mobile: the same information, stacked. */}
      <div className="lg:hidden">
        <ul className="border-t border-border">
          {sides.map((side) => (
            <li key={side.key} className="border-b border-border py-5">
              <SideCard side={side} />
            </li>
          ))}
        </ul>
        <div className="mt-6 bg-ink px-6 py-5 text-center">
          <p className="font-mono text-[9px] tracking-[0.22em] text-paper/70 uppercase">{centre}</p>
          <p className="mt-2 font-mono text-[15px] tracking-[0.1em] text-paper">ONE SYSTEM</p>
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-6 text-center text-[13px] text-steel-50">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
