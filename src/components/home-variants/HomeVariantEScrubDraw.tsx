// ============================================================
// FILE: HomeVariantEScrubDraw.tsx
// PURPOSE: Home variant E "Scroll-Scrubbed Draw" — the v2.0 Home page built on one idea:
//          a single long route runs down the page body and draws itself in step with the
//          scroll. Sections hang off it, HOW_IT_WORKS is the four nodes on it, and the hero
//          and the closing are the page's two rationed Ink bands.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          @/components/site/Section, SectionHead, IndiaCoverageMap, EcosystemDiagram (the
//          two carried-over sections), @/components/site/Reveal,
//          @tanstack/react-router (Link), ./HomeVariantEScrubDraw.parts (the primitives).
// ============================================================

import { Link } from "@tanstack/react-router";
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
  IndustryLink,
  RouteSpine,
  ScrubCard,
  ScrubHead,
  ScrubRow,
  SectionAnchor,
  StepNode,
  SystemRow,
  rowIndex,
} from "./HomeVariantEScrubDraw.parts";

/**
 * HERO — the Ink hero, one of the page's two rationed dark bands. The eyebrow, lead and scope
 * line resolve through the re-pointed semantic tokens and the heading inherits Paper, so no
 * `text-ink`, `btn-primary` or `btn-secondary` appears inside it.
 */
function Hero() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid drift-grid pointer-events-none absolute -inset-24" />
      <div className="container-x relative">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="mark-dot pulse-dot" />
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
        <div className="mt-10 border-t border-border pt-4">
          <p className="text-[13px] text-on-ink-muted">{HERO.scopeLine}</p>
        </div>
      </div>
    </section>
  );
}

/** PROBLEM — the five complaints on ruled rows, each struck through as the next arrives. */
function Problem() {
  return (
    <section className="section-y relative">
      <SectionAnchor />
      <div className="container-x">
        <ScrubHead index="02" heading={PROBLEM.heading} />
        <ul className="mt-12 border-t border-border">
          {PROBLEM.items.map((item, i) => (
            <ScrubRow key={item} index={rowIndex(i)} text={item} delay={i * 0.07} strike />
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="lead mt-10 max-w-3xl">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** HOW_IT_WORKS — the centrepiece: the four steps as the nodes the route passes through. */
function HowItWorks() {
  return (
    <section className="section-y relative">
      <SectionAnchor />
      <div className="container-x">
        <ScrubHead index="03" heading={HOW_IT_WORKS.heading} />
        <ol className="mt-14 border-b border-border">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepNode key={step.key} index={rowIndex(i)} step={step} />
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

/** SPEED_AND_JUDGEMENT — the statement, split into a head and a reading. */
function SpeedAndJudgement() {
  return (
    <section className="section-y relative">
      <SectionAnchor />
      <div className="container-x grid gap-8 md:grid-cols-2 md:gap-16">
        <ScrubHead index="04" heading={SPEED_AND_JUDGEMENT.heading} />
        <div>
          <Reveal>
            <p className="body-copy max-w-xl text-[16px]">{SPEED_AND_JUDGEMENT.body}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">
              {SPEED_AND_JUDGEMENT.link.label}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** TRUST — three commitments on ruled rows. */
function Trust() {
  return (
    <section className="section-y relative">
      <SectionAnchor />
      <div className="container-x">
        <ScrubHead index="05" heading={TRUST.heading} />
        <ul className="mt-12 border-t border-border">
          {TRUST.items.map((item, i) => (
            <ScrubRow key={item} index={rowIndex(i)} text={item} delay={i * 0.08} />
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

/** TWO_WAYS_IN — two panels of equal weight, the route running between them. */
function TwoWaysIn() {
  return (
    <section className="section-y relative">
      <SectionAnchor />
      <div className="container-x">
        <ScrubHead index="06" heading={TWO_WAYS_IN.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <ScrubCard key={card.to} index={rowIndex(i)} card={card} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** INDUSTRIES_SECTION — the industries as a logged register whose names are the link. */
function Industries() {
  return (
    <section className="section-y relative">
      <SectionAnchor />
      <div className="container-x">
        <ScrubHead index="07" heading={INDUSTRIES_SECTION.heading} />
        <ul className="mt-12 grid border-t border-border sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <IndustryLink key={name} index={rowIndex(i)} name={name} to={INDUSTRIES_SECTION.to} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** THE_SYSTEM — four sides ruled down the left, the GRAVIYX centre held on the right. */
function TheSystem() {
  return (
    <section className="section-y relative">
      <SectionAnchor />
      <div className="container-x">
        <ScrubHead index="08" heading={THE_SYSTEM.heading} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <ul className="border-t border-border">
            {THE_SYSTEM.sides.map((side, i) => (
              <SystemRow key={side.key} index={rowIndex(i)} side={side} />
            ))}
          </ul>
          <Reveal delay={0.1}>
            <div className="panel relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden p-8 text-center">
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-diagonal" />
              <span aria-hidden="true" className="mark-dot pulse-dot relative" />
              <p className="eyebrow relative">{THE_SYSTEM.centre}</p>
              <span aria-hidden="true" className="relative block h-px w-16 bg-border" />
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-8 text-[13px] text-muted lg:text-right">{THE_SYSTEM.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The two carried-over sections, verbatim from home-variants-context.md: "Where we serve" and
 * "The ecosystem". They keep their own light surfaces — Ink stays rationed to the two bands.
 */
function RequiredSections() {
  return (
    <>
      <Section tone="surface">
        <SectionHead
          eyebrow="Where we serve"
          title="Connected across India's industrial corridors."
          lead="Our technology-enabled network coordinates demand, verified supply and fulfilment across the country's major metropolitan centres."
        />
        <IndiaCoverageMap />
      </Section>
      <Section tone="warm">
        <SectionHead eyebrow="The ecosystem" title="Four sides. One orchestrator." align="center" />
        <EcosystemDiagram />
        <p className="mt-6 text-center text-sm text-meta">
          Orchestrated trade, not just listed products.
        </p>
      </Section>
    </>
  );
}

/**
 * CLOSING — the Ink closing, the page's second and last dark band. Same rules as the hero: the
 * heading inherits Paper, the copy resolves to on-ink tones and the buttons are the on-ink pair.
 */
function Closing() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <p className="eyebrow">09</p>
        <h2 className="display-lg mt-6 max-w-3xl">{CLOSING.heading}</h2>
        <p className="lead mt-6 max-w-2xl">{CLOSING.body}</p>
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

/**
 * Variant E — "Scroll-Scrubbed Draw". The complete v2.0 Home content hung on a single route
 * that draws itself as the page is scrolled: the two Ink bands are the hero and the closing,
 * and the comparison bar sits last. The two carried-over sections follow the v2.0 content.
 */
export function HomeVariantEScrubDraw() {
  return (
    <div className="pb-28">
      <Hero />
      <RouteSpine>
        <Problem />
        <HowItWorks />
        <SpeedAndJudgement />
        <Trust />
        <TwoWaysIn />
        <Industries />
        <TheSystem />
      </RouteSpine>
      <RequiredSections />
      <Closing />
      <VariantPreviewBar current="e" />
    </div>
  );
}
