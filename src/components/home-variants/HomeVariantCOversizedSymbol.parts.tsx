// ============================================================
// FILE: HomeVariantCOversizedSymbol.parts.tsx
// PURPOSE: The oversized-symbol device and the sections that carry it — the giant-G
//          hero, the four-sides grid, and the inverted closing — for Home variant C.
// CONNECTS TO: HomeVariantCOversizedSymbol.tsx, shared/home-variants.constants.ts,
//          @/components/site/Reveal, motion/react, @tanstack/react-router.
// ============================================================

import { useRef, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { CLOSING, HERO, THE_SYSTEM } from "./shared/home-variants.constants";

/* ──────────────────────────────────────
   GEOMETRY — measured, not estimated
   The enclosed counter of the G in public/brand/graviyx-symbol-ink.png occupies
   x 42..125 and y 51..136 of the 191x201 canvas. Its area centroid is (75.3, 85.1),
   i.e. 39.4% across and 42.3% down. Anchoring the mark on that single point puts the
   counter exactly behind the headline, which is why the two translate utilities in
   OversizedSymbol are literal values and not an approximation.
   ────────────────────────────────────── */
/** The mark at architectural scale: wider than the viewport from 320px up. */
const SYMBOL_SIZE = "w-[clamp(760px,118vw,1500px)]";
/** 0.293 x 118vw — the counter's width at its centroid row, expressed in vw. */
export const HEADLINE_COL = "max-w-[clamp(223px,34.6vw,440px)]";
/** Mirrors --ease-signal in src/styles.css. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type SymbolProps = {
  /** The section the parallax is measured against. */
  targetRef: RefObject<HTMLElement | null>;
  /** How far the mark drifts, in px, across the section's scroll range. */
  distance: number;
  /** "counter" pins the G's enclosed counter behind the headline; "centre" centres the mark. */
  anchor: "counter" | "centre";
  invert?: boolean;
  opacityClass?: string;
};

/**
 * The GRAVIYX symbol used as architecture: very large, very low opacity, drifting
 * slowly against the scroll.
 *
 * Only transform and opacity are animated, and both are pinned to their resting
 * values when the visitor prefers reduced motion — MotionConfig does not cover a
 * MotionValue bound through `style`, so the gate is explicit here.
 *
 * @connects public/brand/graviyx-symbol-ink.png
 */
export function OversizedSymbol({
  targetRef,
  distance,
  anchor,
  invert = false,
  opacityClass = "opacity-[0.06]",
}: SymbolProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const onCounter = anchor === "counter";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${
        onCounter
          ? "left-1/2 top-1/2 w-max -translate-x-[39.4%] -translate-y-[42.3%]"
          : "inset-0 flex items-center justify-center"
      }`}
    >
      <motion.img
        src="/brand/graviyx-symbol-ink.png"
        alt=""
        style={reduce ? { y: 0, scale: 1 } : { y, scale }}
        className={`block h-auto [transform-origin:39.4%_42.3%] ${opacityClass} ${
          invert ? "invert" : ""
        } ${onCounter ? SYMBOL_SIZE : "w-[min(92vw,980px)]"}`}
      />
    </div>
  );
}

/**
 * HERO — the signature move. The oversized G is anchored so its enclosed counter sits
 * exactly behind the headline, and the headline column is sized to the counter's
 * measured width so the type stays inside the negative space. Nothing about that
 * placement depends on an animation.
 */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-paper">
      <div className="container-x flex min-h-[88vh] flex-col justify-center pt-32 pb-24 md:pt-40">
        <Reveal className="text-center">
          <p className="eyebrow">{HERO.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.1} className={`relative mx-auto mt-10 w-full ${HEADLINE_COL}`}>
          <OversizedSymbol targetRef={ref} distance={90} anchor="counter" />
          <h1 className="display-xl relative text-center text-ink">{HERO.headline}</h1>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-12 max-w-xl text-center">
          <p className="lead">{HERO.subhead}</p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to={HERO.primaryCta.to} className="btn btn-primary">
            {HERO.primaryCta.label}
          </Link>
          <Link to={HERO.secondaryCta.to} className="btn btn-secondary">
            {HERO.secondaryCta.label}
          </Link>
        </Reveal>

        <Reveal delay={0.4} className="mx-auto mt-16 w-full max-w-2xl">
          <p className="hairline pt-5 text-center text-[15px] text-steel-50">{HERO.scopeLine}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* The four sides sit on the four edge-centres of a 3x3 grid; the corners stay empty
   and the centre is the mark itself. Literal tuple indices, so the side types are
   exact even under noUncheckedIndexedAccess. */
const SYSTEM_LAYOUT = [
  null,
  THE_SYSTEM.sides[0],
  null,
  THE_SYSTEM.sides[3],
  "centre",
  THE_SYSTEM.sides[1],
  null,
  THE_SYSTEM.sides[2],
  null,
] as const;

/**
 * THE_SYSTEM — the oversized mark returns, but centred and whole rather than
 * counter-anchored, and drifting the other way. "Four sides, one centre" is built
 * from hairlines; the cells are transparent so the mark reads through the grid.
 */
export function SystemSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="section-y relative isolate overflow-hidden bg-paper-2">
      <OversizedSymbol targetRef={ref} distance={-70} anchor="centre" opacityClass="opacity-[0.05]" />
      <div className="container-x relative">
        <Reveal>
          <h2 className="display-lg max-w-3xl text-ink">{THE_SYSTEM.heading}</h2>
        </Reveal>

        <div className="mt-14 grid border-t border-l border-border sm:grid-cols-3">
          {SYSTEM_LAYOUT.map((slot, i) => (
            <SystemCell key={i} slot={slot} order={i} />
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="lead max-w-2xl">{THE_SYSTEM.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}

type SystemSlot = (typeof SYSTEM_LAYOUT)[number];

function SystemCell({ slot, order }: { slot: SystemSlot; order: number }) {
  const shell = "border-r border-b border-border p-6 md:p-8";

  if (slot === null) return <div aria-hidden="true" className={`hidden sm:block ${shell}`} />;

  if (slot === "centre") {
    return (
      <div className={`${shell} flex min-h-[190px] flex-col items-center justify-center gap-4 text-center`}>
        <span aria-hidden="true" className="mark-dot pulse-dot" />
        <p className="display-md text-ink">{THE_SYSTEM.centre}</p>
      </div>
    );
  }

  return (
    <div className={shell}>
      <Reveal delay={order * 0.05}>
        <span
          aria-hidden="true"
          className="mark-dot pulse-dot block"
          style={{ animationDelay: `${(order * 0.3).toFixed(2)}s` }}
        />
        <h3 className="display-sm mt-4 text-ink">{slot.key}</h3>
        <p className="body-copy mt-2 text-[15px]">{slot.body}</p>
      </Reveal>
    </div>
  );
}

/**
 * CLOSING — the mark comes back inverted on ink, anchored to the closing line the same
 * way it is anchored to the headline, so the page opens and closes on one device.
 */
export function ClosingSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="section-y relative isolate overflow-hidden bg-ink">
      <div className="container-x relative">
        <div className={`relative ${HEADLINE_COL}`}>
          <OversizedSymbol
            targetRef={ref}
            distance={110}
            anchor="counter"
            invert
            opacityClass="opacity-[0.12]"
          />
          <h2 className="display-lg relative text-paper">{CLOSING.heading}</h2>
        </div>

        <Reveal className="mt-8">
          <p className="max-w-xl text-[16px] text-steel-30">{CLOSING.body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          <Link to={CLOSING.primaryCta.to} className="btn bg-paper text-ink">
            {CLOSING.primaryCta.label}
          </Link>
          <Link
            to={CLOSING.secondaryCta.to}
            className="btn border border-steel-50 text-paper hover:border-paper"
          >
            {CLOSING.secondaryCta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
