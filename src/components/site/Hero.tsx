import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { To } from "./types";

export type HeroAction = {
  label: string;
  to: To;
  variant?: "primary" | "secondary";
};

export function Hero({
  eyebrow,
  headline,
  subhead,
  actions = [],
  children,
  compact = false,
}: {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  actions?: HeroAction[];
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Oversized by one background tile (72px) so the drift translate never
          exposes an edge. The drift animates transform, not background-position. */}
      <div className="grid-veil drift-grid pointer-events-none absolute -inset-[72px]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklab, var(--ink) 18%, transparent), transparent)",
        }}
      />
      <div
        className={`container-x relative ${compact ? "pt-28 pb-14 md:pt-36 md:pb-20" : "pt-32 pb-20 md:pt-44 md:pb-28"}`}
      >
        {eyebrow ? (
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <span className="mark-dot pulse-dot" />
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.h1
          className="display-xl max-w-5xl text-fg"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {headline}
        </motion.h1>

        {subhead ? (
          <motion.p
            className="lead mt-7 max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {subhead}
          </motion.p>
        ) : null}

        {actions.length > 0 ? (
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {actions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className={`btn ${a.variant === "secondary" ? "btn-secondary" : "btn-primary"}`}
              >
                {a.label}
              </Link>
            ))}
          </motion.div>
        ) : null}

        {children ? <div className="mt-14">{children}</div> : null}
      </div>
    </section>
  );
}
