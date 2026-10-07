// ============================================================
// FILE: HomeVariantCOversizedSymbol.tsx
// PURPOSE: Home variant C — "Oversized Symbol". Brand background treatment 03: the
//          GRAVIYX mark at architectural scale, with the H1 sitting inside the counter
//          of the giant G. Poster-like, quiet, few elements, strong vertical rhythm.
// CONNECTS TO: shared/home-variants.constants.ts (all copy),
//          HomeVariantCOversizedSymbol.parts (hero, system, closing, the mark),
//          shared/VariantPreviewBar, @/components/site/Reveal, motion/react,
//          @tanstack/react-router.
// ============================================================

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import {
  HOW_IT_WORKS,
  INDUSTRIES_SECTION,
  PROBLEM,
  SPEED_AND_JUDGEMENT,
  TRUST,
  TWO_WAYS_IN,
} from "./shared/home-variants.constants";
import { VariantPreviewBar } from "./shared/VariantPreviewBar";
import {
  ClosingSection,
  EASE,
  HeroSection,
  SystemSection,
} from "./HomeVariantCOversizedSymbol.parts";

export function HomeVariantCOversizedSymbol() {
  return (
    <div className="bg-paper pb-28">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <SpeedJudgementSection />
      <TrustSection />
      <TwoWaysSection />
      <IndustriesSection />
      <SystemSection />
      <ClosingSection />
      <VariantPreviewBar current="c" />
    </div>
  );
}

/**
 * PROBLEM — the five complaints as ruled poster lines. Each row lifts in and is then
 * struck through by a hairline that scales on X, which is the cue the content doc gives
 * for this section. The line is transform-only, so no text ever reflows.
 */
function ProblemSection() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg text-ink">{PROBLEM.heading}</h2>
        </Reveal>

        <div className="mt-12 border-t border-border">
          {PROBLEM.items.map((line, i) => (
            <ProblemLine key={line} line={line} delay={i * 0.07} />
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="lead max-w-2xl">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

function ProblemLine({ line, delay }: { line: string; delay: number }) {
  return (
    <motion.div
      className="relative border-b border-border py-6 md:py-7"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: delay + 0.35, ease: EASE }}
      />
      <p className="display-md relative text-ink">{line}</p>
    </motion.div>
  );
}

/**
 * HOW_IT_WORKS — four steps as a hairline grid, one cell per step. The hairline comes
 * from a 1px gap showing the grid's background, so no cell needs a shadow or a border.
 */
function HowItWorksSection() {
  return (
    <section className="section-y bg-paper-2">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg max-w-3xl text-ink">{HOW_IT_WORKS.heading}</h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepCell key={step.key} step={step} order={i + 1} />
          ))}
        </div>

        <Reveal className="mt-12">
          <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary">
            {HOW_IT_WORKS.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function StepCell({ step, order }: { step: { key: string; body: string }; order: number }) {
  return (
    <div className="bg-paper-2 p-7 md:p-8">
      <Reveal delay={order * 0.07}>
        <p className="font-mono text-[11px] tracking-[0.22em] text-steel-30">
          {String(order).padStart(2, "0")}
        </p>
        <h3 className="display-md mt-6 text-ink">{step.key}</h3>
        <p className="body-copy mt-3 text-[15px]">{step.body}</p>
      </Reveal>
    </div>
  );
}

/** SPEED_AND_JUDGEMENT — one statement, given the room a poster gives a headline. */
function SpeedJudgementSection() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg max-w-4xl text-ink">{SPEED_AND_JUDGEMENT.heading}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="lead mt-8 max-w-3xl">{SPEED_AND_JUDGEMENT.body}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-10">
            {SPEED_AND_JUDGEMENT.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** TRUST — three commitments on ruled rows. */
function TrustSection() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg text-ink">{TRUST.heading}</h2>
        </Reveal>

        <ul className="mt-12 border-t border-border">
          {TRUST.items.map((item, i) => (
            <li key={item} className="border-b border-border">
              <Reveal delay={i * 0.08} className="flex items-center gap-5 py-6">
                <span aria-hidden="true" className="mark-dot" />
                <span className="display-sm text-ink">{item}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10">
          <Link to={TRUST.link.to} className="btn btn-secondary">
            {TRUST.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** TWO_WAYS_IN — two panels, equal weight, no accent colour to separate them. */
function TwoWaysSection() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg text-ink">{TWO_WAYS_IN.heading}</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <Reveal key={card.audience} delay={i * 0.1} className="h-full">
              <Link
                to={card.to}
                className="panel flex h-full flex-col p-8 transition-colors duration-200 hover:border-ink"
              >
                <p className="eyebrow">{card.audience}</p>
                <p className="lead mt-5">{card.body}</p>
                <p className="mt-10 font-mono text-[11px] tracking-[0.22em] text-ink uppercase">
                  {card.cta}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * INDUSTRIES_SECTION — the industries as a large-type list. The module ships no CTA
 * label for this section, so the names themselves are the link to the industries page.
 */
function IndustriesSection() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg text-ink">{INDUSTRIES_SECTION.heading}</h2>
        </Reveal>

        <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <li key={name}>
              <Reveal delay={i * 0.04}>
                <Link
                  to={INDUSTRIES_SECTION.to}
                  className="display-sm text-steel-50 transition-colors duration-200 hover:text-ink"
                >
                  {name}
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
