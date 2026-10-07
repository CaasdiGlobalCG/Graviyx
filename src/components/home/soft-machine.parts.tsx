// ============================================================
// FILE: soft-machine.parts.tsx
// PURPOSE: The Home page's neumorphic primitives — surfaces pushed out of the canvas and
//          controls pressed back into it. Adopted from design direction "Soft Machine".
// CONNECTS TO: motion/react, @tanstack/react-router (Link), @/components/site/Reveal,
//          HomePage.tsx (the section assembler).
// ============================================================
//
// THE NEUMORPHIC CONTRACT (src/styles.css — a scoped exception to "structure with hairlines"):
//
//   · A surface's background must equal its parent canvas EXACTLY. Every surface below is used
//     only inside a section carrying `neu-canvas`, so the paired shadows read as a surface
//     pushed out of the page and never as a drop-shadowed box.
//   · No Tailwind `shadow-*`. That scale is blue-black and would read as a second system.
//   · Depth is for surfaces and controls. Hairlines still do the dividing.
//   · No text sits on a shaded edge: recessed surfaces are padded well clear of their own
//     inset shadow, and no body copy is ever placed on one.
//   · Contrast: the canvas is a mid-tone, so body copy is `text-fg`; `text-muted` (steel-50) is
//     the lightest a label may go. `text-meta` (steel-30) never appears on a neumorphic surface.

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";

/** Mirrors --ease-signal in src/styles.css. A tuple, so Motion's type accepts it. */
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/**
 * The focus ring for a neumorphic control. The site's global ring is an outline precisely
 * because a box-shadow ring would be swallowed by any `neu-*` utility; this restates it for
 * the controls that carry their own shadow.
 */
const FOCUS = "focus-visible:outline-offset-2 focus-visible:[outline:2px_solid_var(--ink)]";

/**
 * The pressed state: the surface presses in, the control drops a pixel, shrinks to 97% and the
 * label goes up a weight. Shadow alone would not survive greyscale, print or a low-contrast
 * display, so the press carries position, scale and weight as well — the idiomatic neumorphic
 * press. The 0.97 is the scale the design database specifies for neumorphism.
 *
 * The shrink is a `scale`, so `transition-transform` animates it; `box-shadow` is never animated,
 * the shadow is swapped by the `active:neu-pressed` class instead.
 */
const PRESS = "active:neu-pressed active:translate-y-px active:scale-[0.97] active:font-semibold";

/** Raised at rest, lifted a hair on hover. Transform only — box-shadow is never animated. */
const LIFT = "transition-transform duration-150 ease-out hover:-translate-y-px";

/** Zero-pads a zero-based position into the two-digit mono index used across the page. */
export function rowIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/** A section head. The heading takes no colour class, so it inherits whatever canvas it is on. */
export function SoftHead({ index, heading, lead }: { index: string; heading: string; lead?: string }) {
  return (
    <Reveal className="max-w-3xl">
      <span className="neu-inset inline-block px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums uppercase">
        {index}
      </span>
      <h2 className="display-lg mt-6">{heading}</h2>
      {lead ? <p className="lead mt-5 text-fg">{lead}</p> : null}
    </Reveal>
  );
}

/**
 * A neumorphic control: extruded at rest, pressed into the canvas on :active. It carries its own
 * radius (--neu-radius) rather than `btn`, whose 2px corners fight a soft shadow.
 */
export function NeuButton({
  to,
  children,
  size = "md",
}: {
  to: string;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <Link
      to={to}
      className={`neu-raised inline-flex items-center justify-center gap-2 font-mono tracking-[0.14em] text-fg uppercase ${LIFT} ${PRESS} ${FOCUS} ${
        size === "lg" ? "px-8 py-4 text-[12px]" : "px-6 py-3.5 text-[11px]"
      }`}
    >
      {children}
    </Link>
  );
}

/** One complaint, extruded out of the canvas and struck through as the next one arrives. */
export function StrikeRow({ index, text, delay = 0 }: { index: string; text: string; delay?: number }) {
  return (
    <li>
      <Reveal
        delay={delay}
        className="neu-flat relative flex items-baseline gap-4 px-5 py-5 md:gap-6 md:px-7 md:py-6"
      >
        <span className="font-mono text-[10px] leading-none tracking-[0.22em] text-muted tabular-nums">
          {index}
        </span>
        <span className="relative text-[15px] text-fg md:text-[16px]">
          {text}
          <motion.span
            aria-hidden="true"
            className="absolute top-1/2 left-0 h-px w-full origin-left bg-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: delay + 0.35, ease: EASE }}
          />
        </span>
      </Reveal>
    </li>
  );
}

/** One step of HOW_IT_WORKS, extruded out of the canvas and lighting up in sequence. */
export function StepCard({
  index,
  step,
  delay = 0,
}: {
  index: string;
  step: { readonly key: string; readonly body: string };
  delay?: number;
}) {
  return (
    <li className="h-full">
      <Reveal delay={delay} y={16} className="neu-raised flex h-full flex-col p-6 md:p-7">
        <span className="neu-inset self-start px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums">
          {index}
        </span>
        <h3 className="display-sm mt-6 text-fg">{step.key}</h3>
        <p className="body-copy mt-3 text-[15px] text-fg">{step.body}</p>
      </Reveal>
    </li>
  );
}

/** One commitment, extruded out of the canvas. */
export function TrustCard({ index, text, delay = 0 }: { index: string; text: string; delay?: number }) {
  return (
    <li className="h-full">
      <Reveal delay={delay} y={16} className="neu-flat flex h-full flex-col p-6 md:p-7">
        <span aria-hidden="true" className="mark-dot" />
        <p className="mt-5 font-mono text-[10px] leading-none tracking-[0.22em] text-muted tabular-nums">
          {index}
        </p>
        <p className="body-copy mt-4 text-[16px] text-fg">{text}</p>
      </Reveal>
    </li>
  );
}

/** One of the two ways in — a buyer or supplier door, the largest extrusion on the page. */
export function WayCard({
  index,
  card,
  delay,
}: {
  index: string;
  card: { readonly audience: string; readonly body: string; readonly to: string; readonly cta: string };
  delay: number;
}) {
  return (
    <li className="h-full">
      <Reveal delay={delay} y={18} className="neu-raised flex h-full flex-col p-7 md:p-9">
        <span className="neu-inset self-start px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums">
          {index}
        </span>
        <h3 className="display-sm mt-6 text-fg">{card.audience}</h3>
        <p className="body-copy mt-4 text-[16px] text-fg">{card.body}</p>
        <div className="mt-auto pt-9">
          <NeuButton to={card.to}>{card.cta}</NeuButton>
        </div>
      </Reveal>
    </li>
  );
}

/** One industry: a shallow extrusion whose whole surface is the link to the register. */
export function IndustryChip({ to, name, delay = 0 }: { to: string; name: string; delay?: number }) {
  return (
    <li>
      <Reveal delay={delay} y={12}>
        <Link to={to} className={`neu-flat group flex items-center gap-3.5 px-5 py-4 text-fg ${LIFT} ${PRESS} ${FOCUS}`}>
          <span
            aria-hidden="true"
            className="mark-dot transition-transform duration-150 ease-out group-hover:scale-150"
          />
          <span className="text-[15px]">{name}</span>
        </Link>
      </Reveal>
    </li>
  );
}

/** One of the four sides of THE_SYSTEM, extruded shallowly out of the canvas. */
export function SystemSide({
  index,
  side,
  delay = 0,
}: {
  index: string;
  side: { readonly key: string; readonly body: string };
  delay?: number;
}) {
  return (
    <li className="h-full">
      <Reveal delay={delay} y={14} className="neu-flat flex h-full gap-4 p-5 md:p-6">
        <span aria-hidden="true" className="mark-dot mt-2" />
        <div className="min-w-0">
          <p className="font-mono text-[10px] leading-none tracking-[0.22em] text-muted tabular-nums">
            {index}
          </p>
          <h3 className="display-sm mt-3 text-fg">{side.key}</h3>
          <p className="body-copy mt-2 text-[14px] text-fg">{side.body}</p>
        </div>
      </Reveal>
    </li>
  );
}

/**
 * The centre of THE_SYSTEM: the one surface on the page extruded furthest. The pulse is a CSS
 * animation, so the reduced-motion block stops it without needing a JS gate.
 */
export function SystemCore({ label, caption }: { label: string; caption: string }) {
  return (
    <Reveal
      y={20}
      className="neu-raised relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden p-8 text-center md:p-10"
    >
      <span aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <span aria-hidden="true" className="mark-dot pulse-dot relative" />
      <p className="eyebrow relative">{label}</p>
      <span aria-hidden="true" className="relative block h-px w-16 bg-border" />
      <p className="body-copy relative text-[13px] text-fg">{caption}</p>
    </Reveal>
  );
}
