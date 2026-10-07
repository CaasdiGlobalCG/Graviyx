// ============================================================
// FILE: HomeVariantFPinnedRail.tsx
// PURPOSE: Home variant F "Pinned Progress Rail" — the v2.0 Home page read as a measured
//          sequence. Every major section carries a pinned header that holds while its
//          content scrolls past, and a persistent rail advances down the left gutter.
// CONNECTS TO: ./HomeVariantFPinnedRail.parts (rail, pinned section, ruled rows),
//          shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          @/components/site/Reveal, @/components/site/Section, IndiaCoverageMap,
//          EcosystemDiagram, motion/react, @tanstack/react-router.
// ============================================================

import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHead } from "@/components/site/Section";
import { IndiaCoverageMap } from "@/components/site/IndiaCoverageMap";
import { EcosystemDiagram } from "@/components/site/EcosystemDiagram";
import { VariantPreviewBar } from "@/components/home-variants/shared/VariantPreviewBar";
import {
  CLOSING,
  HERO,
  HOW_IT_WORKS,
  INDUSTRIES_SECTION,
  PROBLEM,
  SPEED_AND_JUDGEMENT,
  THE_SYSTEM,
  TRUST,
  TWO_WAYS_IN,
} from "@/components/home-variants/shared/home-variants.constants";
import {
  EntryCard,
  MobileProgressBar,
  PinnedSection,
  ProgressRail,
  rowIndex,
  RuledRow,
  seqIndex,
  StepRow,
} from "./HomeVariantFPinnedRail.parts";

/** Mirrors --ease-signal in src/styles.css; a tuple so Motion's type accepts it. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** 01 · HERO — the Ink band the sequence opens on. */
function HeroBand() {
  return (
    <section id="hero" className="surface-ink relative overflow-hidden pt-32 pb-20 md:pt-44">
      <div
        aria-hidden="true"
        className="bg-grid drift-grid pointer-events-none absolute -inset-24"
      />
      <div className="container-x relative">
        <div className="flex items-center gap-3">
          <span className="mark-dot pulse-dot" aria-hidden="true" />
          <p className="eyebrow">{HERO.eyebrow}</p>
        </div>
        <h1 className="display-xl mt-6 max-w-4xl">{HERO.headline}</h1>
        <p className="lead mt-6 max-w-2xl">{HERO.subhead}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to={HERO.primaryCta.to} className="btn btn-on-ink">
            {HERO.primaryCta.label}
          </Link>
          <Link to={HERO.secondaryCta.to} className="btn btn-ghost-on-ink">
            {HERO.secondaryCta.label}
          </Link>
        </div>
        <p className="mt-12 border-t border-border pt-5 font-mono text-[11px] text-on-ink-muted">
          {HERO.scopeLine}
        </p>
      </div>
    </section>
  );
}

/** 02 · PROBLEM — each line struck through as the next arrives. */
function ProblemBand() {
  return (
    <PinnedSection id="problem" heading={PROBLEM.heading} tone="bg">
      <ul className="max-w-3xl border-t border-border">
        {PROBLEM.items.map((item, i) => (
          <RuledRow key={item} index={rowIndex(i)} text={item} delay={i * 0.08} strike />
        ))}
      </ul>
      <Reveal delay={0.1}>
        <p className="body-copy mt-9 max-w-3xl text-[16px]">{PROBLEM.closing}</p>
      </Reveal>
    </PinnedSection>
  );
}

/** 03 · HOW_IT_WORKS — four steps, with a line drawing down past them as they light up. */
function HowBand() {
  return (
    <PinnedSection id="how-it-works" heading={HOW_IT_WORKS.heading} tone="surface">
      <div className="relative lg:pl-16">
        <motion.span
          aria-hidden="true"
          className="absolute top-0 left-0 hidden h-full w-px origin-top bg-ink lg:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE_SIGNAL }}
        />
        <ol className="border-t border-border">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepRow key={step.key} index={rowIndex(i)} step={step} delay={i * 0.06} />
          ))}
        </ol>
      </div>
      <Reveal>
        <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary mt-9">
          {HOW_IT_WORKS.link.label}
        </Link>
      </Reveal>
    </PinnedSection>
  );
}

/** 04 · SPEED_AND_JUDGEMENT — the statement band. Deliberately NOT pinned: a single paragraph
 *  has nothing to scroll past a header, so a pin here would be decoration. */
function SpeedBand() {
  return (
    <section id="speed-and-judgement" className="bg-bg section-y">
      <div className="container-x">
        <span aria-hidden="true" className="block h-px w-full bg-border" />
        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow">{seqIndex("speed-and-judgement")}</p>
            <h2 className="display-md mt-4">{SPEED_AND_JUDGEMENT.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-copy max-w-2xl text-[16px]">{SPEED_AND_JUDGEMENT.body}</p>
            <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">
              {SPEED_AND_JUDGEMENT.link.label}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** 05 · TRUST — three verification statements, each on its own ruled block. */
function TrustBand() {
  return (
    <PinnedSection id="trust" heading={TRUST.heading} tone="surface">
      <ul className="max-w-4xl border-t border-border">
        {TRUST.items.map((item, i) => (
          <RuledRow key={item} index={rowIndex(i)} text={item} delay={i * 0.08} emphasis />
        ))}
      </ul>
      <Reveal>
        <Link to={TRUST.link.to} className="btn btn-secondary mt-9">
          {TRUST.link.label}
        </Link>
      </Reveal>
    </PinnedSection>
  );
}

/** 06 · TWO_WAYS_IN — the two doors, stacked so each one takes the full width. */
function TwoWaysBand() {
  return (
    <PinnedSection id="two-ways-in" heading={TWO_WAYS_IN.heading} tone="bg">
      <div className="grid max-w-3xl gap-4">
        {TWO_WAYS_IN.cards.map((card, i) => (
          <EntryCard key={card.to} card={card} delay={i * 0.08} />
        ))}
      </div>
    </PinnedSection>
  );
}

/** 07 · INDUSTRIES_SECTION — nine industries as logged entries, two columns from sm up. */
function IndustriesBand() {
  return (
    <PinnedSection
      id="industries"
      heading={INDUSTRIES_SECTION.heading}
      headingTo={INDUSTRIES_SECTION.to}
      tone="surface"
    >
      <ol className="grid border-t border-border sm:grid-cols-2 sm:gap-x-12">
        {INDUSTRIES_SECTION.items.map((name, i) => (
          <li
            key={name}
            className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-border py-4"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] text-meta">{rowIndex(i)}</span>
            <span className="text-[15px]">{name}</span>
          </li>
        ))}
      </ol>
    </PinnedSection>
  );
}

/** 08 · THE_SYSTEM — four sides, ruled, held around the one centre. The centre carries the
 *  page's only live mark; its pulse is CSS, so the global reduced-motion block covers it. */
function SystemBand() {
  return (
    <PinnedSection id="the-system" heading={THE_SYSTEM.heading} tone="bg">
      <ul className="max-w-3xl border-t border-border">
        {THE_SYSTEM.sides.map((side, i) => (
          <li
            key={side.key}
            className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-border py-6 md:gap-x-8"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] text-meta">{rowIndex(i)}</span>
            <div>
              <h3 className="display-sm">{side.key}</h3>
              <p className="body-copy mt-3">{side.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex items-center gap-4 border border-border px-8 py-10">
        <span className="mark-dot pulse-dot" aria-hidden="true" />
        <p className="eyebrow">{THE_SYSTEM.centre}</p>
      </div>
      <p className="mt-6 font-mono text-[11px] text-muted">{THE_SYSTEM.caption}</p>
    </PinnedSection>
  );
}

/** 09 · CLOSING — the Ink band the sequence closes on. */
function ClosingBand() {
  return (
    <section id="closing" className="surface-ink section-y">
      <div className="container-x">
        <p className="eyebrow">{seqIndex("closing")}</p>
        <h2 className="display-lg mt-4 max-w-3xl">{CLOSING.heading}</h2>
        <p className="lead mt-6 max-w-xl">{CLOSING.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
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

/** REQUIRED — "Where we serve", verbatim. The id is the only addition: the rail reads it. */
function WhereWeServeBand() {
  return (
    <Section id="where-we-serve" tone="surface">
      <SectionHead
        eyebrow="Where we serve"
        title="Connected across India's industrial corridors."
        lead="Our technology-enabled network coordinates demand, verified supply and fulfilment across the country's major metropolitan centres."
      />
      <IndiaCoverageMap />
    </Section>
  );
}

/** REQUIRED — "The ecosystem", verbatim. The id is the only addition: the rail reads it. */
function EcosystemBand() {
  return (
    <Section id="ecosystem" tone="warm">
      <SectionHead eyebrow="The ecosystem" title="Four sides. One orchestrator." align="center" />
      <EcosystemDiagram />
      <p className="mt-6 text-center text-sm text-meta">
        Orchestrated trade, not just listed products.
      </p>
    </Section>
  );
}

/** Variant F — "Pinned Progress Rail": the complete v2.0 Home content, then the two required
 *  sections, two rationed Ink bands (hero, closing) and the comparison bar last. */
export function HomeVariantFPinnedRail() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="relative bg-bg pb-28">
      <ProgressRail targetRef={pageRef} />
      <MobileProgressBar targetRef={pageRef} />
      <HeroBand />
      <ProblemBand />
      <HowBand />
      <SpeedBand />
      <TrustBand />
      <TwoWaysBand />
      <IndustriesBand />
      <SystemBand />
      <ClosingBand />
      <WhereWeServeBand />
      <EcosystemBand />
      <VariantPreviewBar current="f" />
    </div>
  );
}
