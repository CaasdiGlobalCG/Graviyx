// ============================================================
// FILE: Hero.tsx
// PURPOSE: The page hero — eyebrow, headline, subhead, actions and an optional slot for
//          extra content, on either a Paper or an Ink surface.
// CONNECTS TO: src/styles.css (surface-ink, hero-in, grid-veil, drift-grid, btn-on-ink,
//          btn-ghost-on-ink), @tanstack/react-router, ./types.
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
    <section className={`hero-pin overflow-hidden ${isInk ? "surface-ink" : "bg-bg"}`}>
      {/* Oversized by one background tile (72px) so the drift translate never
          exposes an edge. The drift animates transform, not background-position. */}
      <div className="grid-veil drift-grid pointer-events-none absolute -inset-[72px]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklab, currentColor 18%, transparent), transparent)",
        }}
      />
      <div
        className={`container-x hero-depth relative ${compact ? "pt-28 pb-14 md:pt-36 md:pb-20" : "pt-32 pb-20 md:pt-44 md:pb-28"}`}
      >
        {eyebrow ? (
          <p className="eyebrow hero-in mb-6 flex items-center gap-3" style={stepStyle(STEP.eyebrow)}>
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
          <div
            className="hero-in mt-10 flex flex-wrap gap-3"
            style={stepStyle(STEP.actions)}
          >
            {actions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className={`btn ${
                  isInk
                    ? a.variant === "secondary"
                      ? "btn-ghost-on-ink"
                      : "btn-on-ink"
                    : a.variant === "secondary"
                      ? "btn-secondary"
                      : "btn-primary"
                }`}
              >
                {a.label}
              </Link>
            ))}
          </div>
        ) : null}

        {children ? <div className="mt-14">{children}</div> : null}
      </div>
    </section>
  );
}
