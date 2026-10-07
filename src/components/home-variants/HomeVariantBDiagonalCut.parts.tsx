// ============================================================
// FILE: HomeVariantBDiagonalCut.parts.tsx
// PURPOSE: Primitives and the upper half of Home variant B — "Diagonal Cut" — where
//          the GRAVIYX mark's 65° cut organises the page: angled dividers, offset
//          blocks, a drawing connector line and a bespoke hero.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), @/components/site/Reveal,
//          motion/react, @tanstack/react-router (Link).
// ============================================================

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";
import {
  HERO,
  HOW_IT_WORKS,
  PROBLEM,
  SPEED_AND_JUDGEMENT,
  TRUST,
} from "@/components/home-variants/shared/home-variants.constants";

/** The GRAVIYX mark's decisive cut, measured from horizontal. */
const CUT_DEG = -65;
/** A gentler angle, so a spanning divider hairline stays legible at every width. */
const EDGE_DEG = -5;
/** Mirrors --ease-cut in src/styles.css. */
const EASE_CUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
/** On desktop the four steps descend along the diagonal axis. */
const STEP_OFFSETS = ["lg:mt-0", "lg:mt-12", "lg:mt-24", "lg:mt-36"];

/** A short, bold slash at the brand cut angle. Decorative — it carries no copy. */
export function CutMark({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <span className={`relative inline-block h-3 w-[18px] shrink-0 ${className}`} aria-hidden="true">
      <span
        className={`absolute left-0 top-1/2 h-[2px] w-full ${tone === "paper" ? "bg-paper" : "bg-ink"}`}
        style={{ transform: `rotate(${CUT_DEG}deg)` }}
      />
    </span>
  );
}

/** An angled section divider — two hairlines on the diagonal plus one bold cut. */
export function CutDivider() {
  return (
    <div className="relative mx-auto h-14 w-full max-w-[1280px] md:h-20" aria-hidden="true">
      <span className="absolute left-[4%] top-[34%] h-px w-[46%] bg-border" style={{ transform: `rotate(${EDGE_DEG}deg)` }} />
      <span className="absolute left-[12%] top-[64%] h-px w-[30%] bg-border" style={{ transform: `rotate(${EDGE_DEG}deg)` }} />
      <span className="absolute left-[6%] top-1/2 h-[2px] w-12 bg-ink" style={{ transform: `rotate(${CUT_DEG}deg)` }} />
    </div>
  );
}

/** A section heading preceded by the cut mark. */
export function CutHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <CutMark className="mt-[0.7em]" />
      <h2 className="display-lg text-fg">{children}</h2>
    </div>
  );
}

/** The section shell: vertical rhythm plus the container gutter. */
export function SectionFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`section-y relative ${className}`}>
      <div className="container-x relative">{children}</div>
    </section>
  );
}

/** The large, confident cut crossing the headline block; draws on with pathLength. */
function HeroDiagonal() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M4 88 L96 14"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.3, delay: 0.45, ease: EASE_CUT }}
      />
      <motion.path
        d="M2 96 L86 26"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1"
        strokeDasharray="3 7"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1.3, delay: 0.7, ease: EASE_CUT }}
      />
    </svg>
  );
}

/** The hero eyebrow, headline and subhead, fading in on load. */
function HeroCopy() {
  return (
    <>
      <motion.p
        className="eyebrow flex items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_CUT }}
      >
        <CutMark />
        {HERO.eyebrow}
      </motion.p>
      <motion.h1
        className="display-xl mt-6 max-w-4xl text-fg"
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

/** The hero's two calls to action. */
function HeroActions() {
  return (
    <motion.div
      className="mt-10 flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.32, ease: EASE_CUT }}
    >
      <Link to={HERO.primaryCta.to} className="btn btn-primary">
        {HERO.primaryCta.label}
      </Link>
      <Link to={HERO.secondaryCta.to} className="btn btn-secondary">
        {HERO.secondaryCta.label}
      </Link>
    </motion.div>
  );
}

/** HERO — the page anchor, crossed by a single confident diagonal. */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="grid-veil drift-grid pointer-events-none absolute -inset-[72px]" aria-hidden="true" />
      <HeroDiagonal />
      <div className="container-x relative pt-32 pb-20 md:pt-44 md:pb-28">
        <HeroCopy />
        <HeroActions />
        <p className="mt-8 border-t border-border pt-5 font-mono text-[11px] tracking-[0.06em] text-muted">
          {HERO.scopeLine}
        </p>
      </div>
    </section>
  );
}

/** PROBLEM — the frictions, set as a descending run of statements. */
export function ProblemSection() {
  return (
    <SectionFrame className="bg-paper-2">
      <CutHeading>{PROBLEM.heading}</CutHeading>
      <div className="mt-10 max-w-3xl md:mt-14">
        {PROBLEM.items.map((item, i) => (
          <Reveal key={item} delay={i * 0.08}>
            <div className="flex items-start gap-4 border-b border-border py-5">
              <CutMark className="mt-[0.45em]" />
              <span className="display-sm text-fg">{item}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="body-copy mt-8 max-w-2xl text-[16px]">{PROBLEM.closing}</p>
      </Reveal>
    </SectionFrame>
  );
}

/** The diagonal that threads the four steps and draws on as it enters view. */
function StepsConnector() {
  return (
    <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M12.5 4 L87.5 66"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.1, ease: EASE_CUT }}
      />
    </svg>
  );
}

/** One step in HOW_IT_WORKS, offset down the diagonal axis on desktop. */
function StepCard({ index, step }: { index: number; step: { key: string; body: string } }) {
  return (
    <Reveal delay={index * 0.12} className={`relative ${STEP_OFFSETS[index]}`}>
      <div className="flex items-center gap-3">
        <CutMark />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-meta">{step.key}</span>
      </div>
      <span className="mt-5 block h-px w-full bg-border" />
      <p className="display-sm mt-5 text-fg">{step.body}</p>
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

/** TRUST — three verification promises on a hairline grid. */
export function TrustSection() {
  return (
    <SectionFrame className="bg-bg">
      <div className="lg:pl-12">
        <CutHeading>{TRUST.heading}</CutHeading>
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {TRUST.items.map((item, i) => (
            <Reveal key={item} delay={i * 0.1} className="bg-bg p-6 md:p-8">
              <CutMark />
              <p className="mt-6 text-[16px] leading-relaxed text-fg">{item}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link to={TRUST.link.to} className="btn btn-secondary mt-10">
            {TRUST.link.label}
          </Link>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
