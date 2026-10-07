// ============================================================
// FILE: HomeVariantIFloatShadow.parts.tsx
// PURPOSE: The "Float & Ground Shadow" primitives — one paired surface (an element plus the
//          blurred ground shadow under it, both driven by a SINGLE MotionValue so the lift
//          and the shadow cannot drift apart), the two surfaces that carry the family, the
//          two rationed Ink bands and the four-sides board.
// CONNECTS TO: HomeVariantIFloatShadow.tsx (the assembler),
//          @/components/home-variants/shared/home-variants.constants (HERO, CLOSING,
//          THE_SYSTEM), @/components/site/Reveal, motion/react,
//          @tanstack/react-router (Link).
// ============================================================

import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import {
  CLOSING,
  HERO,
  THE_SYSTEM,
} from "@/components/home-variants/shared/home-variants.constants";

/** Mirrors --ease-signal in src/styles.css. A tuple so Motion's type accepts it. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** Mirrors --motion-slow in src/styles.css. One pass, no bounce — a card picked up off a desk. */
const SETTLE_DURATION = 0.9;

/** The three keys of one float: below the desk, the apex of the lift, settled on the desk. */
const FLOAT_KEYS: number[] = [0, 0.6, 1];

/** The resting pair. With motion off the object sits FLAT — no lift, no offset — and the
 *  ground shadow is neutral. Nothing here is reachable only through an animation. */
const SHADOW_REST = { scale: 1, opacity: 0.14 };
const OBJECT_REST = { y: 0 };

type FloatProps = {
  children: ReactNode;
  /** Seconds to wait before the surface lifts. Staggers a row of them. */
  delay?: number;
  /** Applied to the wrapper, so a caller can stretch the pair to a grid cell. */
  className?: string;
};

/**
 * The float family's only primitive: a surface and the soft ground shadow beneath it.
 *
 * Both read one MotionValue, `settle`, through the same three keys, so the object's
 * translateY and the shadow's scale/opacity move as a pair. Only `scale` and `opacity` are
 * animated on the shadow — `box-shadow` / `filter` interpolation is paint, never used here.
 *
 * MotionConfig does not cover a MotionValue bound through `style`, so the reduced-motion
 * branch is explicit: `settle` is pinned to 1 and both surfaces render their rest values.
 */
export function FloatSurface({ children, delay = 0, className = "" }: FloatProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const settle = useMotionValue(0);

  const y = useTransform(settle, FLOAT_KEYS, [16, -5, 0]);
  // NOTE: there is deliberately no opacity transform on the object.
  // It previously ran [0, 1, 1] across the settle progress, so at rest the object sat at
  // opacity 0 — every float surface started invisible and only appeared once the scroll
  // passed 35% of its range. The lift and the ground shadow carry the motion; the object
  // itself is always opaque, which is what the "resting state must be correct on its own"
  // rule requires.
  const shadowScale = useTransform(settle, FLOAT_KEYS, [0.9, 1.07, 1]);
  const shadowOpacity = useTransform(settle, FLOAT_KEYS, [0.03, 0.09, 0.14]);

  useEffect(() => {
    if (reduce) {
      settle.set(1);
      return;
    }
    if (!inView) return;
    const controls = animate(settle, 1, {
      duration: SETTLE_DURATION,
      delay,
      ease: EASE_SIGNAL,
    });
    return () => controls.stop();
  }, [reduce, inView, delay, settle]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 -bottom-1.5 h-4 rounded-sm bg-ink blur-md"
        style={reduce ? SHADOW_REST : { scale: shadowScale, opacity: shadowOpacity }}
      />
      <motion.div className="relative h-full" style={reduce ? OBJECT_REST : { y }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * One HOW_IT_WORKS step on a floating Paper surface. Borderless on purpose — on this direction
 * depth comes from the ground shadow, not from a hairline.
 *
 * @param props.step - The step, verbatim from the constants module.
 * @param props.order - The step's 1-based position, used only as its mono index.
 * @param props.delay - Seconds to wait before the step lifts.
 */
export function FloatStep({
  step,
  order,
  delay,
}: {
  step: { readonly key: string; readonly body: string };
  order: number;
  delay: number;
}) {
  return (
    <li className="h-full">
      <FloatSurface delay={delay} className="h-full">
        <div className="flex h-full flex-col bg-paper p-7 md:p-8">
          <p className="eyebrow">{String(order).padStart(2, "0")}</p>
          <h3 className="display-md mt-6">{step.key}</h3>
          <p className="body-copy mt-3">{step.body}</p>
        </div>
      </FloatSurface>
    </li>
  );
}

/**
 * One of the two ways in, on the same floating surface as the steps, so the family reads as one
 * system across the page rather than as a one-off.
 *
 * @param props.card - The card, verbatim from the constants module.
 * @param props.delay - Seconds to wait before the card lifts.
 */
export function FloatWayIn({
  card,
  delay,
}: {
  card: {
    readonly audience: string;
    readonly body: string;
    readonly to: string;
    readonly cta: string;
  };
  delay: number;
}) {
  return (
    <FloatSurface delay={delay} className="h-full">
      <Link to={card.to} className="group flex h-full flex-col justify-between bg-surface p-7 md:p-9">
        <div>
          <p className="eyebrow">{card.audience}</p>
          <p className="lead mt-4">{card.body}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg">
          {card.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </FloatSurface>
  );
}

/**
 * HERO — the page's first Ink band, and the only place the drifting brand grid is used.
 *
 * Inside `surface-ink` there is no `text-ink` and no `btn-primary` / `btn-secondary`: the first
 * resolves to #000000 and vanishes, the other two are ink-on-ink. The eyebrow, the lead and the
 * hairline re-point themselves, and the H1 inherits Paper with no colour class.
 */
export function HeroSection() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid drift-grid pointer-events-none absolute -inset-24" />
      <div className="container-x relative">
        <div className="flex items-center gap-3">
          <span className="mark-dot pulse-dot" aria-hidden="true" />
          <p className="eyebrow">{HERO.eyebrow}</p>
        </div>
        <Reveal className="mt-6">
          <h1 className="display-xl max-w-4xl">{HERO.headline}</h1>
        </Reveal>
        <Reveal delay={0.12} className="mt-6">
          <p className="lead max-w-2xl">{HERO.subhead}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
          <Link to={HERO.primaryCta.to} className="btn btn-on-ink">
            {HERO.primaryCta.label}
          </Link>
          <Link to={HERO.secondaryCta.to} className="btn btn-ghost-on-ink">
            {HERO.secondaryCta.label}
          </Link>
        </Reveal>
        <Reveal delay={0.3} className="mt-12">
          <p className="hairline pt-4 text-[15px] text-on-ink-muted">{HERO.scopeLine}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** CLOSING — the page's second and last Ink band: same ration, same button pair as the hero. */
export function ClosingSection() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <Reveal>
          <h2 className="display-lg max-w-3xl">{CLOSING.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lead mt-5 max-w-xl">{CLOSING.body}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
          <Link to={CLOSING.primaryCta.to} className="btn btn-on-ink">
            {CLOSING.primaryCta.label}
          </Link>
          <Link to={CLOSING.secondaryCta.to} className="btn btn-ghost-on-ink">
            {CLOSING.secondaryCta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* Where each side sits on the lg board: the four edge-centres of a 3x3 grid, the centre
   excluded. Literal placement rather than auto-flow, so the "four sides, one centre"
   arrangement cannot break at any width. */
const SIDE_PLACEMENT = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-3 lg:row-start-2",
] as const;

/** One side of the system as a Paper cell in the hairline board. */
function SystemSideCell({
  side,
  order,
  className = "",
}: {
  side: { readonly key: string; readonly body: string };
  order: number;
  className?: string;
}) {
  return (
    <div className={`bg-paper p-6 md:p-8 ${className}`}>
      <Reveal delay={order * 0.06}>
        <span aria-hidden="true" className="mark-dot pulse-dot block" />
        <h3 className="display-sm mt-4">{side.key}</h3>
        <p className="body-copy mt-2">{side.body}</p>
      </Reveal>
    </div>
  );
}

/**
 * THE_SYSTEM — four sides on the edge-centres of a hairline grid, GRAVIYX at the centre.
 *
 * Structure here is hairlines rather than the ground shadow: the float family is rationed to
 * the steps and the two ways in, so it reads as a system rather than as decoration applied to
 * everything. On phone and tablet the four sides stack above the centre.
 */
export function SystemBoard() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg max-w-3xl text-fg">{THE_SYSTEM.heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {THE_SYSTEM.sides.map((side, i) => (
            <SystemSideCell key={side.key} side={side} order={i} className={SIDE_PLACEMENT[i] ?? ""} />
          ))}
          <div className="flex flex-col items-center justify-center gap-4 bg-paper p-8 text-center sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <span aria-hidden="true" className="mark-dot pulse-dot" />
            <p className="display-md">{THE_SYSTEM.centre}</p>
          </div>
        </div>
        <Reveal className="mt-8">
          <p className="text-[13px] text-muted">{THE_SYSTEM.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
