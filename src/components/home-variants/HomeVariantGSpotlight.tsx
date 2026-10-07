// ============================================================
// FILE: HomeVariantGSpotlight.tsx
// PURPOSE: Home variant G — "Cursor Spotlight". The complete v2.0 Home content laid on a
//          fixed, faint hairline grid that a soft radial light follows the pointer over, so
//          the page is explored rather than merely scrolled. Two rationed Ink bands (the
//          hero and the closing), then the two required carried-over sections.
// CONNECTS TO: ./HomeVariantGSpotlight.parts (spotlight, shells, hero, closing, system),
//          shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar.tsx,
//          @/components/site/Reveal, @/components/site/Section, IndiaCoverageMap,
//          EcosystemDiagram, @tanstack/react-router (Link).
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
  THE_SYSTEM,
  TRUST,
  TWO_WAYS_IN,
} from "@/components/home-variants/shared/home-variants.constants";
import {
  ClosingSection,
  CursorSpotlight,
  EASE,
  HeroSection,
  RuleHeading,
  SectionFrame,
  SpotlightBase,
  SystemGraphic,
} from "./HomeVariantGSpotlight.parts";

/** One complaint: a ruled row whose line is struck through as the next one arrives. */
function ProblemRow({ text, index }: { text: string; index: number }) {
  return (
    <li className="border-b border-border">
      <Reveal delay={index * 0.07} className="flex items-start gap-5 py-6">
        <span className="eyebrow mt-1">{String(index + 1).padStart(2, "0")}</span>
        <span className="relative inline-block">
          <span className="display-sm text-fg">{text}</span>
          <motion.span
            aria-hidden="true"
            className="absolute top-1/2 left-0 w-full origin-left border-t border-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.45 + index * 0.07, ease: EASE }}
          />
        </span>
      </Reveal>
    </li>
  );
}

/** PROBLEM — the frictions as ruled rows, struck through as each next row arrives. */
function ProblemSection() {
  return (
    <SectionFrame>
      <RuleHeading index="01">{PROBLEM.heading}</RuleHeading>
      <ul className="mt-10 border-t border-border">
        {PROBLEM.items.map((item, i) => (
          <ProblemRow key={item} text={item} index={i} />
        ))}
      </ul>
      <Reveal delay={0.1}>
        <p className="lead mt-9 max-w-3xl">{PROBLEM.closing}</p>
      </Reveal>
    </SectionFrame>
  );
}

/** One step of HOW_IT_WORKS as a hairline cell. */
function StepCell({ step, index }: { step: { key: string; body: string }; index: number }) {
  return (
    <div className="border-r border-b border-border p-7 md:p-8">
      <Reveal delay={index * 0.06}>
        <span className="eyebrow block">
          {String(index + 1).padStart(2, "0")} / {step.key}
        </span>
        <h3 className="display-md mt-6 text-fg">{step.key}</h3>
        <p className="body-copy mt-3">{step.body}</p>
      </Reveal>
    </div>
  );
}

/** HOW_IT_WORKS — the four steps as a hairline register. */
function HowSection() {
  return (
    <SectionFrame>
      <RuleHeading index="02">{HOW_IT_WORKS.heading}</RuleHeading>
      <div className="mt-12 grid border-t border-l border-border sm:grid-cols-2 xl:grid-cols-4">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <StepCell key={step.key} step={step} index={i} />
        ))}
      </div>
      <Reveal>
        <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary mt-10">
          {HOW_IT_WORKS.link.label}
        </Link>
      </Reveal>
    </SectionFrame>
  );
}

/** SPEED_AND_JUDGEMENT — the judgement split: the statement left, the reading right. */
function SpeedSection() {
  return (
    <SectionFrame>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <RuleHeading index="03">{SPEED_AND_JUDGEMENT.heading}</RuleHeading>
        <Reveal delay={0.1}>
          <p className="lead max-w-2xl">{SPEED_AND_JUDGEMENT.body}</p>
          <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">
            {SPEED_AND_JUDGEMENT.link.label}
          </Link>
        </Reveal>
      </div>
    </SectionFrame>
  );
}

/** TRUST — the three verification commitments on ruled columns. */
function TrustSection() {
  return (
    <SectionFrame>
      <RuleHeading index="04">{TRUST.heading}</RuleHeading>
      <ul className="mt-10 grid border-t border-border md:grid-cols-3">
        {TRUST.items.map((item, i) => (
          <li
            key={item}
            className="border-b border-border py-7 md:border-r md:pr-8 md:last:border-r-0"
          >
            <Reveal delay={i * 0.08}>
              <div className="flex items-start gap-3">
                <span className="mark-dot mt-2" aria-hidden="true" />
                <p className="text-sm text-fg">{item}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal>
        <Link to={TRUST.link.to} className="btn btn-secondary mt-9">
          {TRUST.link.label}
        </Link>
      </Reveal>
    </SectionFrame>
  );
}

/** TWO_WAYS_IN — the two audiences as paired panels of equal weight. */
function TwoWaysSection() {
  return (
    <SectionFrame>
      <RuleHeading index="05">{TWO_WAYS_IN.heading}</RuleHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {TWO_WAYS_IN.cards.map((card, i) => (
          <Reveal key={card.to} delay={i * 0.1} className="h-full">
            <Link
              to={card.to}
              className="panel flex h-full flex-col p-8 transition-colors duration-200 hover:border-ink"
            >
              <p className="eyebrow">{card.audience}</p>
              <p className="lead mt-5">{card.body}</p>
              <span className="eyebrow mt-10 block">{card.cta}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

/** INDUSTRIES_SECTION — the sectors as a ruled register under a linked heading. */
function IndustriesSection() {
  return (
    <SectionFrame>
      <Reveal>
        <span className="eyebrow block">06</span>
        <h2 className="display-lg mt-3 max-w-3xl">
          <Link
            to={INDUSTRIES_SECTION.to}
            className="transition-opacity duration-200 hover:opacity-60"
          >
            {INDUSTRIES_SECTION.heading}
          </Link>
        </h2>
      </Reveal>
      <ul className="mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES_SECTION.items.map((name) => (
          <li key={name} className="border-r border-b border-border">
            <Link
              to={INDUSTRIES_SECTION.to}
              className="block px-6 py-5 text-sm text-fg transition-colors duration-200 hover:text-muted"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}

/** THE_SYSTEM — four sides around one centre, drawn in hairlines. */
function SystemSection() {
  return (
    <SectionFrame>
      <RuleHeading index="07">{THE_SYSTEM.heading}</RuleHeading>
      <SystemGraphic />
      <Reveal>
        <p className="mt-8 font-mono text-xs text-meta">{THE_SYSTEM.caption}</p>
      </Reveal>
    </SectionFrame>
  );
}

/** Required section, carried over verbatim from the live Home page. */
function WhereWeServeSection() {
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

/** Required section, carried over verbatim from the live Home page. */
function EcosystemSection() {
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
 * Home variant G — "Cursor Spotlight". Nine v2.0 sections in content order, then the two
 * required carried-over sections. Exactly two of the nine are Ink bands — the hero and the
 * closing — which is the whole of this page's Ink ration, the global footer aside.
 */
export function HomeVariantGSpotlight() {
  return (
    <div className="relative overflow-hidden bg-bg pb-28">
      <SpotlightBase />
      <CursorSpotlight />
      <div className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <HowSection />
        <SpeedSection />
        <TrustSection />
        <TwoWaysSection />
        <IndustriesSection />
        <SystemSection />
        <ClosingSection />
        <WhereWeServeSection />
        <EcosystemSection />
      </div>
      <VariantPreviewBar current="g" />
    </div>
  );
}
