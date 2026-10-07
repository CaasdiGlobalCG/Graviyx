// ============================================================
// FILE: HomeVariantBDiagonalCut.parts.tsx
// PURPOSE: Primitives and the upper sections of Home variant B — "Diagonal Cut" — where
//          the GRAVIYX mark's 65° cut organises the page: angled hairline dividers,
//          blocks offset along the diagonal axis, a connector that draws on through the
//          four steps, and the full-bleed Ink hero.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), @/components/site/Reveal,
//          motion/react, @tanstack/react-router (Link).
// ============================================================

import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";
import {
  HERO,
  HOW_IT_WORKS,
  SPEED_AND_JUDGEMENT,
} from "@/components/home-variants/shared/home-variants.constants";

/** The GRAVIYX mark's decisive cut, measured from horizontal. */
export const CUT_DEG = -65;
/** A shallower angle, so a spanning divider hairline stays legible at every width. */
const EDGE_DEG = -6;
/** Mirrors --ease-cut in src/styles.css. Shared with the main file's strike-through. */
export const EASE_CUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
/** On desktop the four steps descend along the diagonal axis. */
const STEP_OFFSETS = ["lg:mt-0", "lg:mt-12", "lg:mt-24", "lg:mt-36"];

/** A short, bold slash at the brand cut angle. Decorative — it carries no copy. */
export function CutMark({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <span className={`relative inline-block h-4 w-5 shrink-0 ${className}`} aria-hidden="true">
      <span
        className={`absolute top-1/2 left-0 h-[2px] w-full ${
          tone === "paper" ? "bg-paper" : "bg-ink"
        }`}
        style={{ transform: `rotate(${CUT_DEG}deg)` }}
      />
    </span>
  );
}

/** An angled section divider: two tilted hairlines crossed by the bold cut. */
export function CutDivider() {
  return (
    <div className="container-x" aria-hidden="true">
      <div className="relative h-16 w-full overflow-hidden md:h-24">
        <span
          className="absolute top-[38%] left-[2%] h-px w-[54%] bg-border"
          style={{ transform: `rotate(${EDGE_DEG}deg)` }}
        />
        <span
          className="absolute top-[72%] left-[28%] h-px w-[34%] bg-border"
          style={{ transform: `rotate(${EDGE_DEG}deg)` }}
        />
        <span
          className="absolute top-1/2 left-[10%] h-[2px] w-12 bg-ink"
          style={{ transform: `rotate(${CUT_DEG}deg)` }}
        />
      </div>
    </div>
  );
}

/** A section heading preceded by the cut mark. Colour is inherited, so it reads on Paper and Ink. */
export function CutHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <CutMark className="mt-[0.55em]" />
      <h2 className="display-lg">{children}</h2>
    </div>
  );
}

/** The section shell: vertical rhythm plus the container gutter. */
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

/** The Paper diagonal that cuts across the Ink hero. Both lines draw on with scaleX.
 *  Under reduced motion MotionConfig suppresses the transform, so it is gated here to
 *  render the finished line rather than an invisible one. */
function HeroCut() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span
        className="absolute inset-0 m-auto h-[2px] w-[240%]"
        style={{ transform: `rotate(${CUT_DEG}deg)` }}
      >
        <motion.span
          className="block h-full w-full bg-paper/70"
          initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: EASE_CUT }}
        />
      </span>
      <span
        className="absolute inset-0 m-auto h-px w-[240%]"
        style={{ transform: `translateX(46px) rotate(${CUT_DEG}deg)` }}
      >
        <motion.span
          className="block h-full w-full bg-paper/25"
          initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.55, ease: EASE_CUT }}
        />
      </span>
    </div>
  );
}

/** The hero eyebrow, headline and subhead. They fade in on load; no colour class is set,
 *  so the Ink surface's inherited Paper does the work. */
function HeroCopy() {
  return (
    <>
      <motion.p
        className="eyebrow flex items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_CUT }}
      >
        <CutMark tone="paper" />
        {HERO.eyebrow}
      </motion.p>
      <motion.h1
        className="display-xl mt-6 max-w-4xl"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: EASE_CUT }}
      >
        {HERO.headline}
      </motion.h1>
      <motion.p
        className="lead mt-7 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE_CUT }}
      >
        {HERO.subhead}
      </motion.p>
    </>
  );
}

/** The hero's two calls to action, inverted for the Ink surface. */
function HeroActions() {
  return (
    <motion.div
      className="mt-10 flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.32, ease: EASE_CUT }}
    >
      <Link to={HERO.primaryCta.to} className="btn btn-on-ink">
        {HERO.primaryCta.label}
      </Link>
      <Link to={HERO.secondaryCta.to} className="btn btn-ghost-on-ink">
        {HERO.secondaryCta.label}
      </Link>
    </motion.div>
  );
}

/** HERO — the page anchor: a full-bleed Ink surface crossed by the Paper cut. */
export function HeroSection() {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div className="bg-grid drift-grid pointer-events-none absolute -inset-[72px]" aria-hidden="true" />
      <HeroCut />
      <div className="container-x relative pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="lg:pl-14">
          <HeroCopy />
          <HeroActions />
        </div>
        <p className="mt-12 border-t border-border pt-5 font-mono text-[11px] tracking-[0.06em] text-on-ink-meta">
          {HERO.scopeLine}
        </p>
      </div>
    </section>
  );
}

/** The diagonal that threads the four steps. It draws on via pathLength, which Motion
 *  does not suppress under reduced motion, so it is gated here explicitly. */
function StepsConnector() {
  const reduced = useReducedMotion();
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M12.5 6 L87.5 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.2, ease: EASE_CUT }}
      />
    </svg>
  );
}

/** One step in HOW_IT_WORKS, offset down the diagonal axis on desktop. */
function StepCard({ index, step }: { index: number; step: { key: string; body: string } }) {
  return (
    <Reveal delay={index * 0.12} className={`relative ${STEP_OFFSETS[index] ?? ""}`}>
      <div className="flex items-center gap-3">
        <CutMark />
        <span className="font-mono text-[11px] tracking-[0.18em] text-meta uppercase">
          {step.key}
        </span>
      </div>
      <span className="mt-5 block h-px w-full bg-border" />
      <p className="display-sm mt-5">{step.body}</p>
    </Reveal>
  );
}

/** HOW_IT_WORKS — four steps threaded by a diagonal that draws on. */
export function HowSection() {
  return (
    <SectionFrame className="bg-bg">
      <div className="lg:pl-10">
        <CutHeading>{HOW_IT_WORKS.heading}</CutHeading>
        <div className="relative mt-12 md:mt-16">
          <StepsConnector />
          <div className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <StepCard key={step.key} index={i} step={step} />
            ))}
          </div>
        </div>
        <Reveal>
          <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary mt-12">
            {HOW_IT_WORKS.link.label}
          </Link>
        </Reveal>
      </div>
    </SectionFrame>
  );
}

/** SPEED_AND_JUDGEMENT — AI legwork and human judgement, held by the cut. */
export function SpeedSection() {
  return (
    <SectionFrame className="bg-surface-warm">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <CutHeading>{SPEED_AND_JUDGEMENT.heading}</CutHeading>
        <Reveal delay={0.1}>
          <p className="lead">{SPEED_AND_JUDGEMENT.body}</p>
          <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">
            {SPEED_AND_JUDGEMENT.link.label}
          </Link>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
