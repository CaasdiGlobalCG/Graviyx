// ============================================================
// FILE: HomeVariantCOversizedSymbol.parts.tsx
// PURPOSE: The oversized-symbol device and the three sections that carry it — the ink
//          hero with the H1 inside the counter of the giant G, the four-sides grid built
//          on the whole mark, and the ink closing that bookends the hero.
// CONNECTS TO: HomeVariantCOversizedSymbol.tsx, shared/home-variants.constants.ts
//          (HERO, THE_SYSTEM, CLOSING), @/components/site/Reveal, motion/react,
//          @tanstack/react-router, public/brand/graviyx-symbol-{ink,white}.png.
// ============================================================

import { useRef, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { CLOSING, HERO, THE_SYSTEM } from "./shared/home-variants.constants";

/* ──────────────────────────────────────
   GEOMETRY — measured from the assets, not estimated
   Both files are the same GRAVIYX mark at different sizes, and the enclosed counter of
   the G does NOT sit at the same place in each, so each asset carries its own anchor.
   Measured by decoding the PNG, thresholding alpha, flood-filling the transparent
   surround inwards from the border and taking the area centroid of the one enclosed
   hole left:
     ink   191x201  counter x 42..125  y 51..136   centroid 39.3% / 42.3%
     white 477x501  counter x 113..320 y 120..336  centroid 40.9% / 41.1%
   The white export is not a plain 2.5x scale — it is inset ~8px in 477 — so reusing the
   ink numbers on the white asset would miss by ~24px at full size. Anchoring on that one
   point puts the counter behind the headline; the transform-origin repeats the point so
   a parallax scale keeps it pinned.
   ────────────────────────────────────── */
const COUNTER_PLACEMENT = {
  ink: {
    wrapper: "left-1/2 top-1/2 w-max -translate-x-[39.3%] -translate-y-[42.3%]",
    origin: "[transform-origin:39.3%_42.3%]",
  },
  white: {
    wrapper: "left-1/2 top-1/2 w-max -translate-x-[40.9%] -translate-y-[41.1%]",
    origin: "[transform-origin:40.9%_41.1%]",
  },
} as const;

type SymbolAsset = keyof typeof COUNTER_PLACEMENT;

/** The mark at architectural scale: wider than the viewport from 320px up. */
const SYMBOL_SIZE = "w-[clamp(760px,118vw,1500px)]";
/** 0.293 x 118vw — the counter's width at its centroid row, expressed in vw. */
const HEADLINE_COL = "max-w-[clamp(223px,34.6vw,440px)]";

type SymbolProps = {
  /** The section the parallax is measured against. */
  targetRef: RefObject<HTMLElement | null>;
  /** Which brand file to draw — ink for light grounds, white for ink grounds. */
  asset: SymbolAsset;
  /** How far the mark drifts, in px, across the section's scroll range. */
  distance: number;
  /** "counter" pins the G's enclosed counter behind the headline; "centre" centres the mark. */
  anchor: "counter" | "centre";
  opacityClass: string;
};

/**
 * The GRAVIYX symbol used as architecture: very large, very quiet, drifting slowly against
 * the scroll — the structural device the page is composed against, not decoration.
 *
 * Only transform and opacity are animated, and both are pinned to their resting values
 * when the visitor prefers reduced motion: MotionConfig does not cover a MotionValue bound
 * through `style`, so the gate has to be explicit here.
 *
 * @connects public/brand/graviyx-symbol-ink.png, public/brand/graviyx-symbol-white.png
 */
export function OversizedSymbol({ targetRef, asset, distance, anchor, opacityClass }: SymbolProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const onCounter = anchor === "counter";
  const place = COUNTER_PLACEMENT[asset];
  const src =
    asset === "white" ? "/brand/graviyx-symbol-white.png" : "/brand/graviyx-symbol-ink.png";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${
        onCounter ? place.wrapper : "inset-0 flex items-center justify-center"
      }`}
    >
      <motion.img
        src={src}
        alt=""
        style={reduce ? { y: 0, scale: 1 } : { y, scale }}
        className={`block h-auto ${onCounter ? place.origin : "[transform-origin:50%_50%]"} ${
          opacityClass
        } ${onCounter ? SYMBOL_SIZE : "w-[min(92vw,980px)]"}`}
      />
    </div>
  );
}

/** The CTA pair for an ink band: `btn-on-ink` plus `btn-ghost-on-ink`, never the invisible
 *  `btn-primary` / `btn-secondary`. Both ink bands carry the same pair and invert together. */
function InkActions({
  primary,
  secondary,
  delay = 0.3,
}: {
  primary: { readonly label: string; readonly to: "/for-buyers" | "/post-a-requirement" };
  secondary: { readonly label: string; readonly to: "/for-buyers" | "/post-a-requirement" };
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="mt-10 flex flex-wrap justify-center gap-3">
      <Link to={primary.to} className="btn btn-on-ink">
        {primary.label}
      </Link>
      <Link to={secondary.to} className="btn btn-ghost-on-ink">
        {secondary.label}
      </Link>
    </Reveal>
  );
}

/**
 * HERO — the signature move, and the page's first ink band. The oversized WHITE G is
 * anchored so its enclosed counter sits exactly behind the headline, and the headline
 * column is sized to the counter's measured width so the type stays inside the negative
 * space. The positioned box is static, so that placement holds with every animation off.
 *
 * No `text-ink` and no `btn-primary` inside `surface-ink`: the first resolves to #000000
 * and vanishes, the second is ink-on-ink. Headings inherit Paper, so the H1 has no colour.
 */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="surface-ink relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-veil drift-grid pointer-events-none absolute -inset-[72px]"
      />
      <div className="container-x relative flex min-h-[88vh] flex-col justify-center pt-32 pb-20 md:pt-44 md:pb-28">
        <Reveal className="text-center">
          <p className="eyebrow">{HERO.eyebrow}</p>
        </Reveal>
        <div className={`relative mx-auto mt-10 w-full ${HEADLINE_COL}`}>
          <OversizedSymbol
            targetRef={ref}
            asset="white"
            distance={90}
            anchor="counter"
            opacityClass="opacity-[0.12]"
          />
          <Reveal delay={0.1}>
            <h1 className="display-xl text-center">{HERO.headline}</h1>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto mt-12 max-w-xl text-center">
          <p className="lead">{HERO.subhead}</p>
        </Reveal>

        <InkActions primary={HERO.primaryCta} secondary={HERO.secondaryCta} />

        <Reveal delay={0.4} className="mx-auto mt-16 w-full max-w-2xl">
          <p className="hairline pt-5 text-center text-[15px] text-on-ink-meta">{HERO.scopeLine}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* The four sides sit on the four edge-centres of a 3x3 grid; the corners stay empty and
   the centre is the mark itself. The arrangement is spatial, not arbitrary: Intelligence
   above (the layer that advises), Buyers left and Suppliers right (the two sides of a
   deal), Logistics below (the part that arrives). Literal tuple indices, so the side
   types stay exact under noUncheckedIndexedAccess. */
const SYSTEM_LAYOUT = [
  null,
  THE_SYSTEM.sides[3],
  null,
  THE_SYSTEM.sides[0],
  "centre",
  THE_SYSTEM.sides[1],
  null,
  THE_SYSTEM.sides[2],
  null,
] as const;

/**
 * THE_SYSTEM — the oversized mark returns, but as the whole G, centred behind a 3x3
 * hairline grid rather than counter-anchored, drifting the other way. "Four sides, one
 * centre" is drawn in hairlines and the cells stay transparent, so the mark reads
 * through the grid. This band is a light surface, so the mark is the ink asset.
 */
export function SystemSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="section-y relative isolate overflow-hidden bg-paper-2">
      <OversizedSymbol
        targetRef={ref}
        asset="ink"
        distance={-70}
        anchor="centre"
        opacityClass="opacity-[0.05]"
      />
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
      <div
        className={`${shell} flex min-h-[190px] flex-col items-center justify-center gap-4 text-center`}
      >
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
 * CLOSING — the page's second ink band and the deliberate bookend. The same white mark
 * is anchored on its counter again, so the closing line sits in the G exactly as the
 * headline does and the page opens and closes on one device; the mark drifts the other
 * way and sits a step quieter, so it reads as a reprise rather than a repeat.
 */
export function ClosingSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="surface-ink section-y relative isolate overflow-hidden">
      <div className="container-x relative">
        <div className={`relative mx-auto w-full ${HEADLINE_COL}`}>
          <OversizedSymbol
            targetRef={ref}
            asset="white"
            distance={-110}
            anchor="counter"
            opacityClass="opacity-[0.10]"
          />
          <Reveal>
            <h2 className="display-lg text-center">{CLOSING.heading}</h2>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-xl text-center">
          <p className="body-copy">{CLOSING.body}</p>
        </Reveal>

        <InkActions primary={CLOSING.primaryCta} secondary={CLOSING.secondaryCta} delay={0.2} />
      </div>
    </section>
  );
}
