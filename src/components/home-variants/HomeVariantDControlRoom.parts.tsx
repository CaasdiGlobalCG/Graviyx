// ============================================================
// FILE: HomeVariantDControlRoom.parts.tsx
// PURPOSE: The instrument-panel atoms for Home variant D — "Control Room". The ruled
//          board header, the status indicator, and the ruled rows (problem log, step
//          table, trust register, coverage register, status board, console panel).
// CONNECTS TO: shared/home-variants.constants.ts, motion/react, @tanstack/react-router.
// ============================================================

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { THE_SYSTEM, TWO_WAYS_IN } from "@/components/home-variants/shared/home-variants.constants";

/** Mirrors --ease-signal in src/styles.css, as a tuple so Motion's type accepts it. */
export const EASE_SIGNAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Two-digit mono index. Ordinal position only — no data is derived from it. */
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** The one indicator on the board. A square pulse — transform and opacity only. */
export function StatusDot({ tone = "ink", className }: { tone?: "ink" | "paper"; className?: string }) {
  const fill = tone === "paper" ? "bg-paper" : "bg-ink";
  return <span aria-hidden="true" className={`pulse-dot block h-1.5 w-1.5 shrink-0 ${fill} ${className ?? ""}`} />;
}

/** The ruled board header: a mono index on the left rail, the heading beside it. */
export function BoardHead({ index, title }: { index: string; title: ReactNode }) {
  return (
    <header className="hairline pt-5">
      <div className="grid items-baseline gap-2 md:grid-cols-[6rem_1fr] md:gap-8">
        <span className="eyebrow tabular-nums">{index}</span>
        <h2 className="display-lg max-w-[26ch] text-ink">{title}</h2>
      </div>
    </header>
  );
}

/** A problem line. Slides in, then a hairline is drawn across it. */
export function ProblemRow({ index, text, delay }: { index: number; text: string; delay: number }) {
  return (
    <li className="relative flex items-baseline gap-5 border-b border-border py-4">
      <span className="eyebrow w-7 shrink-0 tabular-nums">{pad2(index)}</span>
      <motion.span
        className="relative inline-block max-w-[46ch] text-[17px] leading-snug text-ink md:text-[19px]"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, delay, ease: EASE_SIGNAL }}
      >
        {text}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 block h-px w-full origin-left bg-steel-50"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55, delay: delay + 0.25, ease: EASE_SIGNAL }}
        />
      </motion.span>
    </li>
  );
}

/** One row of the four-step table. An ink rail is drawn across it, in sequence. */
export function StepRow({
  index,
  stepKey,
  body,
  delay,
}: {
  index: number;
  stepKey: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.div
      className="relative border-b border-border"
      initial={{ opacity: 0.3 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE_SIGNAL }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 block h-px origin-left bg-ink"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE_SIGNAL }}
      />
      <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 py-5 md:grid-cols-[3.5rem_10rem_1fr] md:gap-x-8">
        <span className="eyebrow tabular-nums">{pad2(index)}</span>
        <h3 className="display-sm text-ink">{stepKey}</h3>
        <p className="body-copy col-span-2 md:col-span-1">{body}</p>
      </div>
    </motion.div>
  );
}

/** A trust register line. Verified mark, index, statement. */
export function TrustRow({ index, text, delay }: { index: number; text: string; delay: number }) {
  return (
    <motion.li
      className="flex items-baseline gap-5 border-b border-border py-4"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5, delay, ease: EASE_SIGNAL }}
    >
      <span className="eyebrow w-7 shrink-0 tabular-nums">{pad2(index)}</span>
      <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-ink" />
      <p className="body-copy text-ink">{text}</p>
    </motion.li>
  );
}

/** One line of the coverage register. */
export function RegisterRow({ index, name, delay }: { index: number; name: string; delay: number }) {
  return (
    <motion.li
      className="flex items-center gap-4 border-b border-border py-3"
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay, ease: EASE_SIGNAL }}
    >
      <span className="eyebrow w-6 shrink-0 tabular-nums">{pad2(index)}</span>
      <span className="text-[15px] text-ink">{name}</span>
      <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 shrink-0 bg-steel-30" />
    </motion.li>
  );
}

/** One entry point into the platform. */
export function WayCard({ card }: { card: (typeof TWO_WAYS_IN.cards)[number] }) {
  return (
    <div className="panel flex h-full flex-col p-6 md:p-8">
      <span className="eyebrow">{card.audience}</span>
      <p className="body-copy mt-4 flex-1">{card.body}</p>
      <Link to={card.to} className="btn btn-primary mt-6 self-start">
        {card.cta}
      </Link>
    </div>
  );
}

/** A monitored row on the system status board. */
export function SystemRow({
  index,
  sideKey,
  body,
  delay,
}: {
  index: number;
  sideKey: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.li
      className="flex items-start gap-4 px-5 py-5 md:px-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE_SIGNAL }}
    >
      <StatusDot className="mt-2" />
      <span className="eyebrow mt-1 w-6 shrink-0 tabular-nums">{pad2(index)}</span>
      <div className="min-w-0">
        <h3 className="display-sm text-ink">{sideKey}</h3>
        <p className="body-copy mt-1">{body}</p>
      </div>
    </motion.li>
  );
}

/** The centre of the board: the console itself. */
export function ConsolePanel() {
  return (
    <div className="flex h-full flex-col justify-between bg-ink p-8 text-paper">
      <div className="flex items-center justify-between">
        <StatusDot tone="paper" />
        <span aria-hidden="true" className="flex gap-1">
          <span className="h-1.5 w-1.5 bg-steel-15" />
          <span className="h-1.5 w-1.5 bg-steel-15" />
          <span className="h-1.5 w-1.5 bg-steel-15" />
        </span>
      </div>
      <div className="mt-12">
        <p className="display-lg text-paper">{THE_SYSTEM.centre}</p>
        <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-steel-30">{THE_SYSTEM.caption}</p>
      </div>
    </div>
  );
}
