// ============================================================
// FILE: Hero.tsx
// PURPOSE: The page hero — eyebrow, headline, subhead, actions and an optional slot for
//          extra content, on either a Paper or an Ink surface.
// CONNECTS TO: src/styles.css (neu-canvas-dark, neu-canvas, neu-raised, neu-control,
//          hero-in, hero-pin, bg-diagonal), @tanstack/react-router, ./types.
// ============================================================
//
// The entrance is a CSS mount stagger, not a Motion animation.
//
// It used to be `initial={{ opacity: 0 }}` + `animate`, which meant the headline sat at
// `opacity:0` in the server HTML and stayed invisible until JavaScript hydrated and ran the
// animation. The most prominent element on the site should not depend on that. `hero-in`
// runs on load from CSS alone, so the headline is visible with JS disabled, and the reduced
// motion block collapses its duration to effectively instant.

import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { To } from "./types";

export type HeroAction = {
  label: string;
  to: To;
  variant?: "primary" | "secondary";
};

/** Stagger steps, mirroring the delays the Motion version used. */
const STEP = {
  eyebrow: { delay: "0s", y: "12px" },
  headline: { delay: "0.08s", y: "22px" },
  subhead: { delay: "0.2s", y: "18px" },
  actions: { delay: "0.32s", y: "14px" },
} as const;

function stepStyle(step: { delay: string; y: string }): CSSProperties {
  return { "--hero-delay": step.delay, "--hero-y": step.y } as CSSProperties;
}

export function Hero({
  eyebrow,
  headline,
  subhead,
  actions = [],
  children,
  compact = false,
  tone = "paper",
}: {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  actions?: HeroAction[];
  children?: ReactNode;
  compact?: boolean;
  /** `ink` renders the hero as an Ink surface. Operon rations Ink to
   *  "nav, footer, select heroes", so this is used sparingly. */
  tone?: "paper" | "ink";
}) {
  const isInk = tone === "ink";

  return (
    <section
      className={`hero-pin min-h-[100svh] overflow-hidden pt-[var(--header-h)] ${isInk ? "neu-canvas-dark" : "neu-canvas"}`}
    >
      {/* No background grid. The hero is a flat neumorphic ground now, so the drifting
          grid read as noise behind the raised panel rather than as structure. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklab, currentColor 18%, transparent), transparent)",
        }}
      />
      <div
        className={`container-x hero-depth relative ${compact ? "pt-20 pb-14 md:pt-28 md:pb-20" : "pt-24 pb-20 md:pt-32 md:pb-28"}`}
      >
        {/* The hero is a neumorphic surface like the rest of the page, so its copy sits on a
            raised panel rather than directly on a flat band. The panel carries the same
            treatment as THE_SYSTEM's core — raised, `overflow-hidden`, with the brand's
            diagonal motif behind the content — so the hero reads as the same material as the
            sections below it rather than as a one-off. The container's top padding was
            reduced by this panel's padding, so the copy lands where it did before: the
            surface grew, the content did not move. */}
        <div className="neu-raised relative overflow-hidden p-8 md:p-12">
          <span aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
          <div className="relative">
            {eyebrow ? (
              <p
                className="eyebrow hero-in mb-6 flex items-center gap-3"
                style={stepStyle(STEP.eyebrow)}
              >
                <span className="mark-dot pulse-dot" />
                {eyebrow}
              </p>
            ) : null}

            <h1 className="display-xl hero-in max-w-5xl text-fg" style={stepStyle(STEP.headline)}>
              {headline}
            </h1>

            {subhead ? (
              <p className="lead hero-in mt-7 max-w-2xl" style={stepStyle(STEP.subhead)}>
                {subhead}
              </p>
            ) : null}

            {actions.length > 0 ? (
              <div className="hero-in mt-10 flex flex-wrap gap-3" style={stepStyle(STEP.actions)}>
                {actions.map((a) => (
                  <Link
                    key={a.label}
                    to={a.to}
                    activeProps={{ className: "neu-selected" }}
                    // `neu-control` rather than the `btn` family: it carries the neumorphic
                    // surface, the press and the focus ring, and it reads its colours from the
                    // canvas it sits on — so there is no ink/paper branch here. `text-fg` is
                    // re-pointed to Paper inside `neu-canvas-dark` and stays ink on a light one.
                    className="neu-control inline-flex items-center justify-center px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] text-fg uppercase"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            ) : null}

            {children ? <div className="mt-14">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
