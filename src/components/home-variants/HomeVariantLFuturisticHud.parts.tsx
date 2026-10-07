// ============================================================
// FILE: HomeVariantLFuturisticHud.parts.tsx
// PURPOSE: The Heads-Up Display primitives — chamfered panels and cells, corner brackets,
//          ruled readout rows, the target screen and the single scan sweep. With no accent
//          colour, the futuristic read comes from geometry (45-degree chamfers), ruled
//          telemetry and type at scale. Every primitive is fed real copy from the constants
//          module; none invents a number, percentage, coordinate or status.
// CONNECTS TO: motion/react, @tanstack/react-router (Link), @/components/site/Reveal,
//          @/components/site/types (To), HomeVariantLFuturisticHud.tsx.
// ============================================================

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import type { To } from "@/components/site/types";
import {
  HOW_IT_WORKS,
  THE_SYSTEM,
  TWO_WAYS_IN,
} from "@/components/home-variants/shared/home-variants.constants";

/** Mirrors --ease-signal in src/styles.css. A tuple so Motion's type accepts it. */
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** The constant-derived prop types, so each signature stays on one line. */
type Step = (typeof HOW_IT_WORKS.steps)[number];
type Side = (typeof THE_SYSTEM.sides)[number];
type WayCard = (typeof TWO_WAYS_IN.cards)[number];

/** The chamfered-corner utilities, keyed by size: 45-degree cuts instead of a border radius —
 *  geometry rather than colour. `md` panels · `sm` cells · `all` the four-corner instrument. */
const CUT = { md: "chamfer", sm: "chamfer-sm", all: "chamfer-all" } as const;
type Cut = keyof typeof CUT;

/** Zero-pads a zero-based position into the two-digit mono index the HUD rules with. */
export function pad2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/**
 * Four L-shaped corner brackets, drawn with the re-pointed `border` token so one component
 * reads on Paper and on Ink. Decorative and aria-hidden: a bracket never carries meaning on
 * its own, so the surface behind it always holds a text label.
 */
export function CornerTicks() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute top-0 left-0 h-3.5 w-3.5 border-t border-l border-border" />
      <span className="absolute top-0 right-0 h-3.5 w-3.5 border-t border-r border-border" />
      <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-border" />
      <span className="absolute right-0 bottom-0 h-3.5 w-3.5 border-r border-b border-border" />
    </span>
  );
}

/**
 * A chamfered OUTLINED panel. `clip-path` also clips a border, so the outline is two stacked
 * elements: an outer box in the hairline colour and an inner box inset 1px in the surface
 * colour, leaving a 1px chamfered rule. Content sits in a third, padded layer, out of the
 * clip. `scan` adds the static hairline texture.
 */
export function HudPanel({
  children,
  className = "",
  size = "md",
  scan = false,
  contentClassName = "p-6 md:p-8",
}: {
  children: ReactNode;
  className?: string;
  size?: Cut;
  scan?: boolean;
  contentClassName?: string;
}) {
  const cut = CUT[size];
  return (
    <div className={`relative flex flex-col ${cut} bg-border ${className}`}>
      <span aria-hidden="true" className={`absolute inset-px ${cut} bg-surface`} />
      {scan ? (
        <span
          aria-hidden="true"
          className={`hud-scanlines pointer-events-none absolute inset-px ${cut}`}
        />
      ) : null}
      <div className={`relative flex flex-1 flex-col ${contentClassName}`}>{children}</div>
    </div>
  );
}

/** A chamfered FILLED cell: no border to clip, so one element carries the shape. Used where
 *  a surface is defined by its fill rather than by an outline. */
export function HudCell({
  children,
  className = "",
  size = "sm",
}: {
  children: ReactNode;
  className?: string;
  size?: Cut;
}) {
  return <div className={`${CUT[size]} bg-surface ${className}`}>{children}</div>;
}

/** A mono caption behind a leading rule tick. The tick is decoration, the label is the
 *  meaning, so the two always travel together. */
export function HudLegend({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-border" />
      {children}
    </p>
  );
}

/** The ruled section head: a two-digit mono index, a hairline to the margin and the heading.
 *  The rule is never read alone — it is bracketed by the index and the heading. */
export function HudHead({ index, heading }: { index: string; heading: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
          {index}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <h2 className="display-lg mt-6 max-w-3xl text-fg">{heading}</h2>
    </Reveal>
  );
}

/** The one ambient motion on an Ink screen: a single hairline that sweeps the band top to
 *  bottom. Under reduced motion it renders as a static rule at the top, never invisible. */
export function ScanSweep() {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
    );
  }
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        className="absolute inset-x-0 top-0 block h-full"
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 7, ease: "linear", repeat: Infinity }}
      >
        <span className="block h-px w-full bg-border" />
      </motion.span>
    </span>
  );
}

/** The target screen: a chamfer-all cell with corner brackets, four inward edge ticks and a
 *  centred text label. The hairlines are aria-hidden; the label is the meaning, so the target
 *  is never an unlabelled tick. */
export function TargetScreen({ label, className = "" }: { label: string; className?: string }) {
  return (
    <HudCell size="all" className={`relative grid aspect-square place-items-center ${className}`}>
      <CornerTicks />
      <span aria-hidden="true" className="absolute top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-border" />
      <span aria-hidden="true" className="absolute bottom-4 left-1/2 h-4 w-px -translate-x-1/2 bg-border" />
      <span aria-hidden="true" className="absolute top-1/2 left-4 h-px w-4 -translate-y-1/2 bg-border" />
      <span aria-hidden="true" className="absolute top-1/2 right-4 h-px w-4 -translate-y-1/2 bg-border" />
      <div className="relative text-center">
        <span aria-hidden="true" className="mark-dot mx-auto block" />
        <p className="eyebrow mt-4">{label}</p>
      </div>
    </HudCell>
  );
}

/** One line of the diagnostics log. The strike-through is a hairline scaled on X — transform
 *  only — so no line of type reflows. The single signature motion of the PROBLEM view. */
export function LogRow({ index, text, delay }: { index: string; text: string; delay: number }) {
  return (
    <li className="border-b border-border last:border-b-0">
      <Reveal delay={delay}>
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-5 md:gap-x-8">
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </span>
          <span className="relative inline-block text-[16px] text-fg md:text-[19px]">
            {text}
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: delay + 0.3, ease: EASE }}
            />
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/** One step of HOW_IT_WORKS as a chamfered sequencer cell. The key and body are real copy
 *  ("Post", "Compare", "Order", "Track") — never a synthesised status or fabricated count. */
export function StepCell({ index, step, delay }: { index: string; step: Step; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <HudPanel size="sm" className="h-full" contentClassName="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
        <p className="display-sm mt-6 text-fg">{step.key}</p>
        <p className="body-copy mt-3 text-[15px]">{step.body}</p>
      </HudPanel>
    </Reveal>
  );
}

/** One of TRUST's three commitments, as a chamfered check cell. */
export function CheckCell({ index, text, delay }: { index: string; text: string; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <HudPanel size="sm" className="h-full" contentClassName="flex flex-1 flex-col p-6">
        <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
          {index}
        </span>
        <p className="mt-6 text-[16px] text-fg">{text}</p>
      </HudPanel>
    </Reveal>
  );
}

/** One of the two ways in — a buyer or supplier door, chamfered like a readout. */
export function WayPanel({ index, card, delay }: { index: string; card: WayCard; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link to={card.to} className="group block h-full">
        <HudPanel
          size="sm"
          className="h-full transition-colors duration-200 group-hover:bg-ink"
          contentClassName="flex flex-1 flex-col justify-between p-7"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
                {index}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>
            <p className="eyebrow mt-6">{card.audience}</p>
            <p className="body-copy mt-4 text-[16px]">{card.body}</p>
          </div>
          <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-ink uppercase">
            {card.cta}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </HudPanel>
      </Link>
    </Reveal>
  );
}

/** One industry, read as a logged register entry whose name is the link. */
export function IndustryEntry({ index, name, to }: { index: string; name: string; to: To }) {
  return (
    <li className="border-b border-border">
      <Reveal>
        <Link to={to} className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-4 md:gap-x-8">
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </span>
          <span className="display-sm text-steel-50 transition-colors duration-200 group-hover:text-ink">
            {name}
          </span>
        </Link>
      </Reveal>
    </li>
  );
}

/** One of THE_SYSTEM's four sides, read as a ruled row. */
export function SideRow({ index, side }: { index: string; side: Side }) {
  return (
    <li className="border-b border-border">
      <Reveal>
        <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 py-5 md:grid-cols-[auto_160px_1fr] md:gap-x-8">
          <span className="pt-1 font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </span>
          <h3 className="display-sm text-fg">{side.key}</h3>
          <p className="body-copy col-start-2 max-w-2xl md:col-start-3">{side.body}</p>
        </div>
      </Reveal>
    </li>
  );
}
