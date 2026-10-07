// ============================================================
// FILE: HomeVariantGSpotlight.parts.tsx
// PURPOSE: The "Cursor Spotlight" primitives for Home variant G — the fixed faint grid that
//          is the page's resting structure, the soft radial light that follows a fine
//          pointer and makes that same grid legible in place, and the page's two rationed
//          Ink bands (the hero and the closing) plus the four-sides system graphic.
// CONNECTS TO: ./HomeVariantGSpotlight.tsx, shared/home-variants.constants.ts (HERO,
//          CLOSING, THE_SYSTEM), @/components/site/Reveal, motion/react,
//          @tanstack/react-router (Link).
// ============================================================

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import {
  CLOSING,
  HERO,
  THE_SYSTEM,
} from "@/components/home-variants/shared/home-variants.constants";

/** Mirrors --ease-signal in src/styles.css. A tuple, so Motion's type accepts it. */
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** Spotlight radius in px, shared by the mask and the glow so the two always agree. */
const SPOT = "320px";
const SPOT_MASK = `radial-gradient(circle ${SPOT} at var(--sx) var(--sy), #000 0%, transparent 72%)`;
const SPOT_GLOW = `radial-gradient(circle ${SPOT} at var(--sx) var(--sy), color-mix(in oklab, var(--paper) 55%, transparent), transparent 72%)`;

/**
 * The resting structure: a fixed, faint hairline grid behind every transparent section.
 * Plain CSS, no JS, always drawn — so the page is legible before hydration and nothing is
 * ever hidden behind the spotlight. The spotlight only brightens this same grid in place.
 */
export function SpotlightBase() {
  return (
    <div aria-hidden="true" className="bg-grid pointer-events-none fixed inset-0 z-0 opacity-40" />
  );
}

/**
 * Writes a fine pointer's position to the node's --sx / --sy custom properties. Deliberately
 * inert for touch, coarse pointers and reduced motion, so the light never appears where
 * there is no cursor to follow.
 */
function useSpotlightFollow(reduced: boolean | null) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    let lit = false;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      el.style.setProperty("--sx", `${event.clientX}px`);
      el.style.setProperty("--sy", `${event.clientY}px`);
      if (!lit) {
        lit = true;
        setActive(true);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return { ref, active };
}

/**
 * The one ambient motion on the page: a soft radial light that follows a fine pointer and
 * makes the faint grid beneath it legible, in place — a magnifier over a drawing, never a
 * reveal. It only ever ADDS light over the grid that is already there.
 *
 * Degrades in three ways, none of which hides content:
 *  - touch / no fine pointer — never activates; the page is simply the resting grid.
 *  - reduced motion — not rendered at all; no tracking, grid at its resting opacity.
 *  - no JS — renders at opacity 0; the resting page is the grid.
 *
 * The light and its mask are a radial gradient centred on a CSS custom property set
 * imperatively from the pointer — never a layout property, and never a MotionValue bound
 * through `style`, which MotionConfig would not cover.
 */
export function CursorSpotlight() {
  const reduced = useReducedMotion();
  const { ref, active } = useSpotlightFollow(reduced);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500 [--sx:50vw] [--sy:35vh]"
      style={{
        opacity: active ? 1 : 0,
        backgroundImage: SPOT_GLOW,
        maskImage: SPOT_MASK,
        WebkitMaskImage: SPOT_MASK,
      }}
    >
      <span aria-hidden="true" className="bg-grid absolute inset-0" />
    </div>
  );
}

/** The section shell: vertical rhythm and the container gutter. Transparent, so the fixed
 *  grid shows through and the spotlight has something to brighten. */
export function SectionFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`section-y relative ${className}`}>
      <div className="container-x relative">{children}</div>
    </section>
  );
}

/** A section heading opened by its mono index, revealed once on scroll. */
export function RuleHeading({
  index,
  children,
  className = "",
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <span className="eyebrow block">{index}</span>
      <h2 className="display-lg mt-3 max-w-3xl">{children}</h2>
    </Reveal>
  );
}

/** One side of the system: a mono key over its body copy. */
function SideBody({ side }: { side: { key: string; body: string } }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="mark-dot" aria-hidden="true" />
        <span className="eyebrow">{side.key}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-fg">{side.body}</p>
    </>
  );
}

/** One side of the system as a cell in the desktop hairline grid. */
function SideCell({ side }: { side: { key: string; body: string } }) {
  return (
    <div className="border-r border-b border-border p-6 md:p-8">
      <SideBody side={side} />
    </div>
  );
}

/** Four sides arranged around the one centre, drawn entirely in hairlines. */
export function SystemGraphic() {
  const [first, second, third, fourth] = THE_SYSTEM.sides;
  return (
    <div className="mt-12">
      <div className="hidden border-t border-l border-border lg:grid lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-2">
        {first ? <SideCell side={first} /> : null}
        <div className="row-span-2 grid place-items-center border-r border-b border-border px-12">
          <span className="font-mono text-xs tracking-[0.28em] uppercase">
            {THE_SYSTEM.centre}
          </span>
        </div>
        {second ? <SideCell side={second} /> : null}
        {third ? <SideCell side={third} /> : null}
        {fourth ? <SideCell side={fourth} /> : null}
      </div>
      <ul className="border-t border-border lg:hidden">
        {THE_SYSTEM.sides.map((side) => (
          <li key={side.key} className="border-b border-border py-5">
            <SideBody side={side} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * HERO — the page's first Ink band. Full-bleed Ink under a static grid. No `text-ink`,
 * `btn-primary` or `btn-secondary` here: on Ink those resolve to black and vanish. Headings
 * inherit Paper, so the H1 carries no colour class.
 */
export function HeroSection() {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div aria-hidden="true" className="grid-veil pointer-events-none absolute -inset-[72px]" />
      <div className="container-x relative pt-32 pb-20 md:pt-44 md:pb-28">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="mark-dot" aria-hidden="true" />
            {HERO.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-xl mt-6 max-w-4xl">{HERO.headline}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lead mt-7 max-w-2xl">{HERO.subhead}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={HERO.primaryCta.to} className="btn btn-on-ink">
              {HERO.primaryCta.label}
            </Link>
            <Link to={HERO.secondaryCta.to} className="btn btn-ghost-on-ink">
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-14 border-t border-border pt-5 font-mono text-xs text-on-ink-meta">
            {HERO.scopeLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** CLOSING — the page's second Ink band. The same restrained pair, inverted for Ink. */
export function ClosingSection() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="grid-veil pointer-events-none absolute -inset-[72px]" />
      <div className="container-x relative">
        <Reveal>
          <h2 className="display-lg max-w-3xl">{CLOSING.heading}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="lead mt-6 max-w-xl">{CLOSING.body}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={CLOSING.primaryCta.to} className="btn btn-on-ink">
              {CLOSING.primaryCta.label}
            </Link>
            <Link to={CLOSING.secondaryCta.to} className="btn btn-ghost-on-ink">
              {CLOSING.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
