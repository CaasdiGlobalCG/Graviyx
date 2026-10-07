// ============================================================
// FILE: HomeVariantHMarquee.tsx
// PURPOSE: Home variant H — "Marquee & Ticker". The v2.0 Home page read as an operator's
//          console: ruled feed rows under mono indices, and three continuously moving
//          ticker bands that give the page a visible pulse. Two of the nine sections are
//          Ink — the hero and the closing — which is the whole of this page's Ink ration.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          @/components/site/Reveal, Section, SectionHead, IndiaCoverageMap,
//          EcosystemDiagram, @tanstack/react-router,
//          ./HomeVariantHMarquee.parts (the ticker and feed primitives).
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
  EntryCard,
  IndustryRow,
  StepCell,
  StrikeRow,
  SystemCentre,
  SystemSide,
  TickHead,
  TickerBand,
} from "./HomeVariantHMarquee.parts";

/** The ticker's two content sets, taken verbatim from the constants module. */
const STEP_KEYS = HOW_IT_WORKS.steps.map((step) => step.key);
const INDUSTRY_NAMES = INDUSTRIES_SECTION.items;

/** 01 · The Ink hero. Headline over the drifting grid, closing on the live step ticker. */
function Hero() {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid drift-grid pointer-events-none absolute -inset-24"
      />
      <div className="container-x section-y relative">
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
        <Reveal delay={0.12}>
          <div className="mt-10 flex items-start gap-4 border-t border-border pt-5">
            <span aria-hidden="true" className="mark-dot pulse-dot mt-1.5" />
            <p className="font-mono text-[11px] tracking-[0.08em] text-on-ink-muted">
              {HERO.scopeLine}
            </p>
          </div>
        </Reveal>
      </div>
      <TickerBand items={STEP_KEYS} tone="ink" label={HOW_IT_WORKS.heading} />
    </section>
  );
}

/** 02 · The problem feed. Each complaint is logged, then struck through as the next lands. */
function Problem() {
  return (
    <section className="section-y">
      <div className="container-x">
        <TickHead index="02" heading={PROBLEM.heading} />
        <ul className="mt-10 border-t border-border">
          {PROBLEM.items.map((item, i) => (
            <StrikeRow key={item} order={i + 1} text={item} />
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="body-copy mt-9 max-w-3xl text-[16px]">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** 03 · The step feed. Four steps as a hairline grid, in the order they run. */
function HowItWorks() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <TickHead index="03" heading={HOW_IT_WORKS.heading} />
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepCell key={step.key} step={step} order={i + 1} />
          ))}
        </div>
        <Reveal className="mt-10">
          <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary">
            {HOW_IT_WORKS.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** 04 · The judgement split. The AI's legwork left, the named specialist's call right. */
function SpeedAndJudgement() {
  return (
    <section className="section-y">
      <div className="container-x grid gap-8 md:grid-cols-2 md:gap-16">
        <TickHead index="04" heading={SPEED_AND_JUDGEMENT.heading} />
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

/** 05 · The verification feed. Three checks, each opened by the brand mark. */
function Trust() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <TickHead index="05" heading={TRUST.heading} />
        <ul className="mt-10 border-t border-border">
          {TRUST.items.map((item, i) => (
            <li key={item} className="border-b border-border">
              <Reveal delay={i * 0.08} className="flex items-center gap-5 py-6">
                <span aria-hidden="true" className="mark-dot" />
                <p className="text-[16px] text-fg">{item}</p>
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

/** 06 · The two doors. Buyers and suppliers, as paired hairline panels. */
function TwoWaysIn() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <TickHead index="06" heading={TWO_WAYS_IN.heading} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <EntryCard key={card.to} card={card} order={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 07 · The coverage feed. Industries as logged entries under a linked heading. */
function Industries() {
  return (
    <section className="section-y">
      <div className="container-x">
        <TickHead index="07" heading={INDUSTRIES_SECTION.heading} to={INDUSTRIES_SECTION.to} />
        <ol className="mt-10 grid border-t border-border sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <IndustryRow key={name} index={String(i + 1).padStart(2, "0")} name={name} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 08 · The system feed. Four sides around the one orchestrator. */
function TheSystem() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <TickHead index="08" heading={THE_SYSTEM.heading} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <ul className="border-t border-border">
            {THE_SYSTEM.sides.map((side, i) => (
              <SystemSide key={side.key} side={side} order={i + 1} />
            ))}
          </ul>
          <Reveal delay={0.1}>
            <SystemCentre label={THE_SYSTEM.centre} caption={THE_SYSTEM.caption} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** 09 · The Ink closing. The page's second and last Ink band, over the step ticker. */
function Closing() {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div className="container-x section-y relative">
        <TickHead index="09" heading={CLOSING.heading} />
        <p className="lead mt-5 max-w-2xl">{CLOSING.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to={CLOSING.primaryCta.to} className="btn btn-on-ink">
            {CLOSING.primaryCta.label}
          </Link>
          <Link to={CLOSING.secondaryCta.to} className="btn btn-ghost-on-ink">
            {CLOSING.secondaryCta.label}
          </Link>
        </div>
      </div>
      <TickerBand items={STEP_KEYS} tone="ink" label={HOW_IT_WORKS.heading} />
    </section>
  );
}

/** Where we serve — carried over verbatim from the live Home page. */
function CoverageSection() {
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

/** The ecosystem — carried over verbatim from the live Home page. */
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
 * Home variant H — "Marquee & Ticker". Renders the complete v2.0 Home content in the order the
 * constants define, then the two sections every variant carries verbatim. Three ticker bands
 * give the page a visible pulse; two of the nine sections are Ink.
 */
export function HomeVariantHMarquee() {
  return (
    <div className="pb-28">
      <Hero />
      <Problem />
      <HowItWorks />
      <SpeedAndJudgement />
      <Trust />
      <TickerBand items={INDUSTRY_NAMES} tone="light" label={INDUSTRIES_SECTION.heading} />
      <TwoWaysIn />
      <Industries />
      <TheSystem />
      <Closing />
      <CoverageSection />
      <EcosystemSection />
      <VariantPreviewBar current="h" />
    </div>
  );
}
