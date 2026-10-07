// ============================================================
// FILE: HomeVariantLFuturisticHud.parts.tsx
// PURPOSE: The Heads-Up Display primitives — the bracketed panel, the four corner
//          ticks, the ruled readout rows, the target/reticle motif and the single
//          scan sweep. Every primitive is fed real copy from the constants module;
//          none of them invents a number, percentage, coordinate or status.
// CONNECTS TO: motion/react (motion, useReducedMotion), @tanstack/react-router (Link),
//          @/components/site/Reveal, @/components/site/types (To),
//          HomeVariantLFuturisticHud.tsx (the section assembler).
// ============================================================

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import type { To } from "@/components/site/types";

/** Mirrors --ease-signal in src/styles.css. A tuple so Motion's type accepts it. */
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** Zero-pads a zero-based position into the two-digit mono index the HUD rules with. */
export function pad2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/**
 * Four L-shaped corner brackets, drawn with the re-pointed `border` token so one component
 * reads on Paper and on Ink. The provided `hud-corners` utility is ink-on-light only, so
 * this is its on-Ink counterpart — and it costs four spans, nothing more.
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
 * A bracketed instrument panel. `hud-corners` is a background-image, so the panel carries
 * its own padding for the brackets to sit in. `scan` adds the repeating hairline sweep on a
 * separate layer, because `hud-corners` and `hud-scanlines` both set `background-image` and
 * cannot share one element.
 */
export function HudPanel({
  children,
  className = "",
  scan = false,
  bare = false,
}: {
  children: ReactNode;
  className?: string;
  scan?: boolean;
  bare?: boolean;
}) {
  return (
    <div className={`hud-corners relative p-6 md:p-8 ${bare ? "" : "panel"} ${className}`}>
      {scan ? (
        <span aria-hidden="true" className="hud-scanlines pointer-events-none absolute inset-0" />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

/** The HUD's label unit: a mono caption behind a leading rule tick. */
export function HudLegend({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-border" />
      {children}
    </p>
  );
}

/** The ruled section head: a two-digit mono index, a hairline to the margin and the heading. */
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

/**
 * The one moving element on an Ink screen: a single hairline that sweeps the band top to
 * bottom, so it reads as a live instrument rather than a flat panel.
 *
 * A MotionValue bound through `style` would escape MotionConfig, so the gate here is
 * explicit: under reduced motion the sweep renders as a static rule at the top of the band,
 * never as something invisible.
 */
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

/**
 * The target motif: corner brackets over a centre crosshair, drawn entirely from hairlines.
 * Decorative, so it is aria-hidden — it carries no number, no coordinate and no status.
 */
export function Reticle({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none relative block aspect-square ${className}`}>
      <CornerTicks />
      <span className="absolute top-1/2 left-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-border" />
      <span className="absolute top-1/2 left-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 bg-border" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="mark-dot pulse-dot" />
      </span>
    </span>
  );
}

/**
 * One line of the diagnostics log. The strike-through is a hairline scaled on X — transform
 * only — so no line of type ever reflows as it is struck.
 */
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

/**
 * One step of HOW_IT_WORKS as a bracketed sequencer cell. The key and the body are real copy
 * from the constants module ("Post", "Compare", "Order", "Track") — never a synthesised
 * status and never a fabricated count.
 */
export function StepCell({
  index,
  step,
  delay,
}: {
  index: string;
  step: { readonly key: string; readonly body: string };
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="hud-corners panel flex h-full flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
        <p className="display-sm mt-6 text-fg">{step.key}</p>
        <p className="body-copy mt-3 text-[15px]">{step.body}</p>
      </div>
    </Reveal>
  );
}

/** One of TRUST's three commitments, as a bracketed check cell. */
export function CheckCell({ index, text, delay }: { index: string; text: string; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="hud-corners panel flex h-full flex-col p-6">
        <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
          {index}
        </span>
        <p className="mt-6 text-[16px] text-fg">{text}</p>
      </div>
    </Reveal>
  );
}

/** One of the two ways in — a buyer or supplier door, bracketed like a readout. */
export function WayPanel({
  index,
  card,
  delay,
}: {
  index: string;
  card: { readonly audience: string; readonly body: string; readonly to: To; readonly cta: string };
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={card.to}
        className="hud-corners panel group flex h-full flex-col justify-between p-7 transition-colors duration-200 hover:border-ink"
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
export function SideRow({
  index,
  side,
}: {
  index: string;
  side: { readonly key: string; readonly body: string };
}) {
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
