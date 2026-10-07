// ============================================================
// FILE: HomeVariantIFloatShadow.tsx
// PURPOSE: Home variant I — "Float & Ground Shadow". Depth is carried by motion and a soft
//          ground shadow beneath each surface rather than by borders: one family of cards
//          (the HOW_IT_WORKS steps and the TWO_WAYS_IN panels) lifts as it enters and
//          settles, with a shadow that grows and softens in step with the lift. The page
//          opens and closes on the two rationed Ink bands.
// CONNECTS TO: ./HomeVariantIFloatShadow.parts (the float pair, the Ink bands, the
//          four-sides board), @/components/home-variants/shared/home-variants.constants
//          (all copy), @/components/home-variants/shared/VariantPreviewBar,
//          @/components/site/Reveal, @/components/site/Section (the two carried-over
//          sections only), motion/react, @tanstack/react-router (Link).
// ============================================================

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHead } from "@/components/site/Section";
import { IndiaCoverageMap } from "@/components/site/IndiaCoverageMap";
import { EcosystemDiagram } from "@/components/site/EcosystemDiagram";
import { VariantPreviewBar } from "@/components/home-variants/shared/VariantPreviewBar";
import {
  HOW_IT_WORKS,
  INDUSTRIES_SECTION,
  PROBLEM,
  SPEED_AND_JUDGEMENT,
  TRUST,
  TWO_WAYS_IN,
} from "@/components/home-variants/shared/home-variants.constants";
import {
  ClosingSection,
  FloatStep,
  FloatWayIn,
  HeroSection,
  SystemBoard,
} from "./HomeVariantIFloatShadow.parts";

/** Mirrors --ease-signal in src/styles.css. A tuple so Motion's type accepts it. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/**
 * The light-ground section head: a display heading and an optional lead. This is this
 * variant's own layout — the site's `SectionHead` is reserved for the two carried-over
 * sections. It resolves through the semantic tokens, so it would also read on an Ink band.
 *
 * @param props.heading - The section heading, verbatim from the constants module.
 * @param props.lead - Optional lead paragraph.
 * @param props.to - Optional route; makes the heading itself the section link.
 */
function SectionHeading({
  heading,
  lead,
  to,
}: {
  heading: string;
  lead?: string;
  to?: string;
}) {
  return (
    <Reveal>
      <h2 className="display-lg max-w-3xl text-fg">
        {to ? (
          <Link to={to} className="transition-colors hover:text-muted">
            {heading}
          </Link>
        ) : (
          heading
        )}
      </h2>
      {lead ? <p className="lead mt-5 max-w-2xl">{lead}</p> : null}
    </Reveal>
  );
}

/**
 * PROBLEM — the five frictions as ruled lines. Each slides in, then is gently struck through
 * as the next arrives, which is the cue the content doc gives for this section.
 *
 * The strike is a hairline scaled on X: transform-only, so no line of type ever reflows, and
 * the global MotionConfig suppresses the transform under reduced motion.
 */
function StrikeLine({ text, index }: { text: string; index: number }) {
  return (
    <li className="border-b border-border py-5 md:py-6">
      <Reveal delay={index * 0.08}>
        <span className="relative inline-block text-[17px] text-fg md:text-[19px]">
          {text}
          <motion.span
            aria-hidden="true"
            className="absolute top-1/2 left-0 h-px w-full origin-left bg-ink"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.4, ease: EASE_SIGNAL }}
          />
        </span>
      </Reveal>
    </li>
  );
}

/** 02 · PROBLEM — the friction list, then the turn. */
function Problem() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading heading={PROBLEM.heading} />
        <ul className="mt-10 border-t border-border md:mt-12">
          {PROBLEM.items.map((item, i) => (
            <StrikeLine key={item} text={item} index={i} />
          ))}
        </ul>
        <Reveal delay={0.1} className="mt-9">
          <p className="body-copy max-w-3xl text-[16px]">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * 03 · HOW_IT_WORKS — the first half of the float family. Each step is a borderless Paper
 * card on the Paper-2 band, lifted on its own ground shadow.
 */
function HowItWorks() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <SectionHeading heading={HOW_IT_WORKS.heading} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <FloatStep key={step.key} step={step} order={i + 1} delay={i * 0.09} />
          ))}
        </ol>
        <Reveal className="mt-12">
          <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary">
            {HOW_IT_WORKS.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** 04 · SPEED_AND_JUDGEMENT — the split: the claim left, the reading right. */
function SpeedAndJudgement() {
  return (
    <section className="section-y">
      <div className="container-x grid gap-8 md:grid-cols-2 md:gap-16">
        <SectionHeading heading={SPEED_AND_JUDGEMENT.heading} />
        <div>
          <Reveal>
            <p className="body-copy max-w-xl text-[16px]">{SPEED_AND_JUDGEMENT.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">
              {SPEED_AND_JUDGEMENT.link.label}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** 05 · TRUST — the three verification promises, each opened by the brand mark. */
function Trust() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <SectionHeading heading={TRUST.heading} />
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {TRUST.items.map((item, i) => (
            <li key={item} className="border-t border-border pt-6">
              <Reveal delay={i * 0.08}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="mark-dot mt-2" />
                  <p className="text-[15px] text-fg">{item}</p>
                </div>
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

/**
 * 06 · TWO_WAYS_IN — the second half of the float family. Same primitive, same shadow, so the
 * two sections read as one system rather than as a one-off effect.
 */
function TwoWaysIn() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading heading={TWO_WAYS_IN.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <FloatWayIn key={card.to} card={card} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 07 · INDUSTRIES_SECTION — the sectors, the heading itself carrying the link. */
function Industries() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <SectionHeading heading={INDUSTRIES_SECTION.heading} to={INDUSTRIES_SECTION.to} />
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8 md:mt-12">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <li key={name}>
              <Reveal delay={i * 0.04}>
                <Link
                  to={INDUSTRIES_SECTION.to}
                  className="text-[16px] text-steel-50 transition-colors hover:text-fg"
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

/**
 * "Where we serve" — carried over verbatim from the live Home page so the variants match it.
 * `Section` / `SectionHead` are used here and only here. A light surface: Ink stays rationed
 * to the hero and the closing.
 */
function WhereWeServe() {
  return (
    <Section tone="surface">
      <SectionHead
        eyebrow="Where we serve"
        title="Connected across India's industrial corridors."
        lead="Our technology-enabled network coordinates demand, verified supply and fulfilment across the country's major metropolitan centres."
      />
      <IndiaCoverageMap />
    </Section>
  );
}

/** "The ecosystem" — the second carried-over section, also verbatim and also a light surface. */
function TheEcosystem() {
  return (
    <Section tone="warm">
      <SectionHead eyebrow="The ecosystem" title="Four sides. One orchestrator." align="center" />
      <EcosystemDiagram />
      <p className="mt-6 text-center text-sm text-meta">
        Orchestrated trade, not just listed products.
      </p>
    </Section>
  );
}

/**
 * Home variant I — "Float & Ground Shadow". The complete v2.0 Home content in content order,
 * then the two carried-over sections, with the comparison bar last. Exactly two Ink bands:
 * the hero and the closing.
 */
export function HomeVariantIFloatShadow() {
  return (
    <div className="pb-28">
      <HeroSection />
      <Problem />
      <HowItWorks />
      <SpeedAndJudgement />
      <Trust />
      <TwoWaysIn />
      <Industries />
      <SystemBoard />
      <ClosingSection />
      <WhereWeServe />
      <TheEcosystem />
      <VariantPreviewBar current="i" />
    </div>
  );
}
