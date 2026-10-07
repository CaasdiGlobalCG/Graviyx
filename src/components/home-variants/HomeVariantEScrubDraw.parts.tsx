// ============================================================
// FILE: HomeVariantEScrubDraw.parts.tsx
// PURPOSE: The Scroll-Scrubbed Draw primitives — the single long route that draws itself
//          in step with the scroll, the anchors and nodes that hang the sections on it,
//          and the ruled rows, step nodes and cards the variant assembles.
// CONNECTS TO: motion/react (useScroll, useTransform, useReducedMotion),
//          @tanstack/react-router (Link), @/components/site/Reveal,
//          HomeVariantEScrubDraw.tsx (the section assembler).
// ============================================================

import type { ReactNode } from "react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/site/Reveal";

/** Mirrors --ease-signal in src/styles.css. Kept as a tuple so Motion's type accepts it. */
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/**
 * The route. One long path in a 100 x 1000 viewBox, stretched to the height of the page
 * body. It weaves around the centre in long, unhurried curves and returns to the centre
 * every 100 units — a surveyor's construction line, not a ruler-straight rule.
 */
const ROUTE_D =
  "M 50 0 C 54 40 54 60 50 100 C 46 140 46 160 50 200 C 54 240 54 260 50 300 " +
  "C 46 340 46 360 50 400 C 54 440 54 460 50 500 C 46 540 46 560 50 600 " +
  "C 54 640 54 660 50 700 C 46 740 46 760 50 800 C 54 840 54 860 50 900 " +
  "C 46 940 48 970 50 1000";

/** Zero-pads a zero-based position into the two-digit mono index the route uses. */
export function rowIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/**
 * The route — the page's spine. A faint full-length line shows where it is going; a solid
 * overlay reveals the portion already travelled, scrubbed by the scroll.
 *
 * `pathLength` is bound to a MotionValue, which MotionConfig does not cover, so the gate is
 * explicit: under reduced motion the route renders fully drawn, never invisible. Only the
 * stroke's dash changes — the geometry never moves.
 *
 * @param props.children - The sections the route runs behind.
 */
export function RouteSpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="h-full w-full text-ink">
          <path
            d={ROUTE_D}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d={ROUTE_D}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={reduce ? { pathLength: 1 } : { pathLength: draw }}
          />
        </svg>
      </div>
      {children}
    </div>
  );
}

/**
 * A section's attachment to the route: a hairline drawn from the left edge to the centre,
 * ending on a small square node. It sits in the section's top padding, so it never crosses
 * the copy, and only transform is animated.
 */
export function SectionAnchor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 md:top-10">
      <div className="container-x">
        <div className="relative h-px">
          <motion.span
            className="absolute top-0 left-0 h-px w-1/2 origin-left bg-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <motion.span
            className="absolute top-0 left-1/2 block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 border border-ink bg-paper"
            initial={{ scale: 0.4 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * A node on the route — the marker each step of HOW_IT_WORKS sits on. It lights up as it
 * enters view and its paper fill masks the route passing behind it.
 */
export function SpineNode() {
  return (
    <motion.span
      aria-hidden="true"
      className="relative z-10 block h-3 w-3 justify-self-center border border-ink bg-paper"
      initial={{ scale: 0.4 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
    />
  );
}

/** The ruled section head: a mono index, the heading and optional lead copy. */
export function ScrubHead({ index, heading, lead }: { index: string; heading: string; lead?: string }) {
  return (
    <Reveal>
      <div className="flex items-start gap-5">
        <span aria-hidden="true" className="mark-dot mt-2 shrink-0" />
        <div className="min-w-0">
          <p className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </p>
          <h2 className="display-lg mt-4 max-w-3xl text-fg">{heading}</h2>
          {lead ? <p className="lead mt-5 max-w-2xl">{lead}</p> : null}
        </div>
      </div>
    </Reveal>
  );
}

/**
 * One step of HOW_IT_WORKS, hung on the route: a node at the centre, the step key on the left
 * arm and its body on the right, so the route visibly passes through all four.
 *
 * @param props.index - The step's two-digit mono index.
 * @param props.step - The step, verbatim from the constants module.
 */
export function StepNode({
  index,
  step,
}: {
  index: string;
  step: { readonly key: string; readonly body: string };
}) {
  return (
    <li className="border-t border-border">
      <div className="grid items-center gap-x-6 gap-y-4 py-7 md:grid-cols-[1fr_auto_1fr] md:gap-x-10 md:py-9">
        <Reveal className="md:text-right">
          <p className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </p>
          <h3 className="display-sm mt-3 text-fg">{step.key}</h3>
        </Reveal>
        <SpineNode />
        <Reveal delay={0.08}>
          <p className="body-copy text-[15px]">{step.body}</p>
        </Reveal>
      </div>
    </li>
  );
}

/**
 * A ruled row: a mono index and a line of copy, struck through as the next arrives when
 * `strike` is set — a hairline scaled on X, so no line of type ever reflows.
 */
export function ScrubRow({
  index,
  text,
  delay = 0,
  strike = false,
}: {
  index: string;
  text: string;
  delay?: number;
  strike?: boolean;
}) {
  return (
    <li className="border-b border-border">
      <Reveal delay={delay}>
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-5 md:gap-x-8 md:py-6">
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </span>
          <span className="relative inline-block text-[17px] text-fg md:text-[19px]">
            {text}
            {strike ? (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: delay + 0.4, ease: EASE }}
              />
            ) : null}
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/** One of the four sides of THE_SYSTEM, read as a ruled row. */
export function SystemRow({
  index,
  side,
}: {
  index: string;
  side: { readonly key: string; readonly body: string };
}) {
  return (
    <li className="border-b border-border">
      <Reveal>
        <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 py-5 md:grid-cols-[auto_180px_1fr] md:gap-x-8 md:py-6">
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

/** One industry, read as a logged entry whose name is the link. */
export function IndustryLink({ index, name, to }: { index: string; name: string; to: string }) {
  return (
    <li className="border-b border-border">
      <Reveal>
        <Link
          to={to}
          className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-4 md:gap-x-8"
        >
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

/** One of the two ways in — a buyer or supplier door. */
export function ScrubCard({
  index,
  card,
  delay,
}: {
  index: string;
  card: { readonly audience: string; readonly body: string; readonly to: string; readonly cta: string };
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={card.to}
        className="group flex h-full flex-col justify-between border border-border bg-paper p-8 transition-colors duration-200 hover:border-ink"
      >
        <div>
          <p className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta tabular-nums">
            {index}
          </p>
          <p className="eyebrow mt-5">{card.audience}</p>
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
