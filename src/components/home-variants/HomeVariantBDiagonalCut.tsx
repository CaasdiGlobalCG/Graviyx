// ============================================================
// FILE: HomeVariantBDiagonalCut.tsx
// PURPOSE: Home variant B — "Diagonal Cut". The GRAVIYX mark's 65° cut is the organising
//          device: angled hairline dividers, blocks offset along the diagonal axis, a
//          connector that draws on through the steps, and an Ink hero and Ink closing so
//          the page carries exactly its two rationed Ink bands.
// CONNECTS TO: ./HomeVariantBDiagonalCut.parts (primitives + upper sections),
//          shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar.tsx,
//          motion/react, @tanstack/react-router.
// ============================================================

import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { VariantPreviewBar } from "@/components/home-variants/shared/VariantPreviewBar";
import {
  CLOSING,
  INDUSTRIES_SECTION,
  PROBLEM,
  THE_SYSTEM,
  TRUST,
  TWO_WAYS_IN,
} from "@/components/home-variants/shared/home-variants.constants";
import {
  CUT_DEG,
  CutDivider,
  CutHeading,
  CutMark,
  EASE_CUT,
  HeroSection,
  HowSection,
  SectionFrame,
  SpeedSection,
} from "./HomeVariantBDiagonalCut.parts";

/** The problem lines step out along the diagonal axis, on wider screens only. */
const PROBLEM_OFFSETS = ["", "md:ml-6", "md:ml-12", "md:ml-16", "md:ml-24"];

/** One problem line: it slides in, then a hairline strikes through as the next arrives. */
function StrikeRow({ text, index }: { text: string; index: number }) {
  return (
    <Reveal delay={index * 0.09} className={PROBLEM_OFFSETS[index] ?? ""}>
      <div className="flex items-start gap-4 border-b border-border py-5">
        <CutMark className="mt-[0.4em]" />
        <span className="relative inline-block">
          <span className="display-sm">{text}</span>
          <motion.span
            aria-hidden="true"
            className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.09, ease: EASE_CUT }}
          />
        </span>
      </div>
    </Reveal>
  );
}

/** PROBLEM — the frictions, set as a run of statements stepping out along the diagonal. */
function ProblemSection() {
  return (
    <SectionFrame className="bg-paper-2">
      <CutHeading>{PROBLEM.heading}</CutHeading>
      <div className="mt-10 max-w-3xl md:mt-14">
        {PROBLEM.items.map((item, i) => (
          <StrikeRow key={item} text={item} index={i} />
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="body-copy mt-8 max-w-2xl text-[16px]">{PROBLEM.closing}</p>
      </Reveal>
    </SectionFrame>
  );
}

/** TRUST — three verification promises on a hairline grid. */
function TrustSection() {
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

/** TWO_WAYS_IN — the two audiences, cut apart by the diagonal. */
function TwoWaysSection() {
  return (
    <SectionFrame className="bg-paper-2">
      <CutHeading>{TWO_WAYS_IN.heading}</CutHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {TWO_WAYS_IN.cards.map((card, i) => (
          <Reveal key={card.audience} delay={i * 0.12}>
            <Link to={card.to} className="panel relative block overflow-hidden p-7 md:p-9">
              <span
                className="pointer-events-none absolute -top-6 -right-6 h-[2px] w-24 bg-ink opacity-20"
                style={{ transform: `rotate(${CUT_DEG}deg)` }}
                aria-hidden="true"
              />
              <CutMark />
              <h3 className="display-md mt-6">{card.audience}</h3>
              <p className="body-copy mt-4 text-[16px]">{card.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase">
                {card.cta} <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

/** INDUSTRIES_SECTION — the sectors, listed under a linked heading. */
function IndustriesSection() {
  return (
    <SectionFrame className="bg-bg">
      <div className="lg:pl-6">
        <Link to={INDUSTRIES_SECTION.to} className="inline-flex items-start gap-4">
          <CutMark className="mt-[0.55em]" />
          <h2 className="display-lg">{INDUSTRIES_SECTION.heading}</h2>
        </Link>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 md:mt-14">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <Reveal key={name} delay={i * 0.04}>
              <span className="flex items-center gap-3 border-b border-border pb-2 text-[16px]">
                <span className="h-px w-5 bg-steel-15" aria-hidden="true" />
                {name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

/** The key and body of one side of the system. */
function SystemSide({ side }: { side: { key: string; body: string } }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 bg-ink pulse-dot" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-[0.18em] text-meta uppercase">
          {side.key}
        </span>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-fg">{side.body}</p>
    </>
  );
}

/** One side of the system as a Paper cell in the desktop grid. */
function SystemCell({ side }: { side: { key: string; body: string } }) {
  return (
    <div className="bg-paper p-6 md:p-8">
      <SystemSide side={side} />
    </div>
  );
}

/** A pulse travelling inward toward the centre. Decorative; transform and opacity only.
 *  MotionConfig suppresses the transform under reduced motion, so it is gated here and a
 *  static marker is left in its place. */
function SystemPulse({ side, delay = 0 }: { side: "left" | "right"; delay?: number }) {
  const reduced = useReducedMotion();
  const className = `absolute h-1.5 w-1.5 bg-ink ${
    side === "left" ? "top-1/4 left-0" : "top-3/4 right-0"
  }`;
  if (reduced) return <span aria-hidden="true" className={className} />;
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      animate={{ x: side === "left" ? [0, 44] : [0, -44], opacity: [0, 1, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/** Four sides arranged around the one centre, with pulses running inward. */
function SystemGraphic() {
  const [first, second, third, fourth] = THE_SYSTEM.sides;
  return (
    <div className="mt-14">
      <div className="hidden gap-px border border-border bg-border lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {first ? <SystemCell side={first} /> : null}
        <div className="relative row-span-2 grid place-items-center border-x border-border bg-paper px-10">
          <SystemPulse side="left" />
          <SystemPulse side="right" delay={1.2} />
          <span className="relative bg-ink px-8 py-6">
            <span
              className="pointer-events-none absolute inset-0 m-auto h-[2px] w-16 bg-paper/40"
              style={{ transform: `rotate(${CUT_DEG}deg)` }}
              aria-hidden="true"
            />
            <span className="relative font-mono text-[13px] tracking-[0.28em] text-paper uppercase">
              {THE_SYSTEM.centre}
            </span>
          </span>
        </div>
        {second ? <SystemCell side={second} /> : null}
        {third ? <SystemCell side={third} /> : null}
        {fourth ? <SystemCell side={fourth} /> : null}
      </div>

      <ul className="border-t border-border lg:hidden">
        {THE_SYSTEM.sides.map((side) => (
          <li key={side.key} className="border-b border-border py-5">
            <SystemSide side={side} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** THE_SYSTEM — four sides around one centre, held together by the diagonal. */
function SystemSection() {
  return (
    <SectionFrame className="bg-paper-2">
      <CutHeading className="max-w-3xl">{THE_SYSTEM.heading}</CutHeading>
      <SystemGraphic />
      <p className="mt-8 font-mono text-[11px] tracking-[0.08em] text-meta">{THE_SYSTEM.caption}</p>
    </SectionFrame>
  );
}

/** CLOSING — the Ink band the page ends on, crossed by the Paper cut. */
function ClosingSection() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <span
        className="pointer-events-none absolute inset-0 m-auto h-[2px] w-[220%] bg-paper/20"
        style={{ transform: `rotate(${CUT_DEG}deg)` }}
        aria-hidden="true"
      />
      <div className="container-x relative">
        <h2 className="display-lg max-w-3xl">{CLOSING.heading}</h2>
        <p className="lead mt-6 max-w-xl">{CLOSING.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to={CLOSING.primaryCta.to} className="btn btn-on-ink">
            {CLOSING.primaryCta.label}
          </Link>
          <Link to={CLOSING.secondaryCta.to} className="btn btn-ghost-on-ink">
            {CLOSING.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Home variant B — "Diagonal Cut". Renders the complete v2.0 Home content in the order
 * the constants define, with an angled divider between each section. Every section's
 * resting state is complete on its own; motion only adds the draw-on and the reveals.
 */
export function HomeVariantBDiagonalCut() {
  return (
    <div className="relative overflow-hidden bg-bg pb-28">
      <HeroSection />
      <CutDivider />
      <ProblemSection />
      <CutDivider />
      <HowSection />
      <CutDivider />
      <SpeedSection />
      <CutDivider />
      <TrustSection />
      <CutDivider />
      <TwoWaysSection />
      <CutDivider />
      <IndustriesSection />
      <CutDivider />
      <SystemSection />
      <CutDivider />
      <ClosingSection />
      <VariantPreviewBar current="b" />
    </div>
  );
}
