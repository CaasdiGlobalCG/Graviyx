// ============================================================
// FILE: HomeVariantLFuturisticHud.tsx
// PURPOSE: Home variant L "Heads-Up Display" — the v2.0 Home page read as a monochrome
//          procurement instrument: bracketed panels, mono readouts, hairline grids and a
//          single reticle. With no accent colour in the system, the futuristic read has to
//          come from geometry, ruled telemetry and type at scale rather than from a glow.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          @/components/site/Section, SectionHead, IndiaCoverageMap, EcosystemDiagram (the
//          two carried-over sections), @/components/site/Reveal,
//          @tanstack/react-router (Link), ./HomeVariantLFuturisticHud.parts (primitives).
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
  CheckCell,
  CornerTicks,
  HudHead,
  HudLegend,
  HudPanel,
  IndustryEntry,
  LogRow,
  Reticle,
  ScanSweep,
  SideRow,
  StepCell,
  WayPanel,
  pad2,
} from "./HomeVariantLFuturisticHud.parts";

/**
 * HERO — Ink band 1 of 2, the page's primary screen: a drifting hairline grid, corner brackets
 * and one scan sweep do the futuristic work. The heading inherits Paper and the eyebrow, subhead
 * and scope line resolve through the re-pointed semantic tokens, so no `text-ink`,
 * `btn-primary` or `btn-secondary` appears inside this band.
 */
function Hero() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid drift-grid pointer-events-none absolute -inset-24" />
      <ScanSweep />
      <div className="pointer-events-none absolute inset-3 md:inset-6">
        <CornerTicks />
      </div>
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="mark-dot pulse-dot" />
              <p className="eyebrow">{HERO.eyebrow}</p>
            </div>
            <h1 className="display-xl mt-6 max-w-3xl">{HERO.headline}</h1>
            <p className="lead mt-6 max-w-2xl">{HERO.subhead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to={HERO.primaryCta.to} className="btn btn-on-ink">{HERO.primaryCta.label}</Link>
              <Link to={HERO.secondaryCta.to} className="btn btn-ghost-on-ink">{HERO.secondaryCta.label}</Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Reticle className="w-[220px] xl:w-[260px]" />
          </div>
        </div>
        <div className="mt-10 flex items-start gap-4 border-t border-border pt-4">
          <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-border" />
          <p className="max-w-3xl text-[13px] text-on-ink-muted">{HERO.scopeLine}</p>
        </div>
      </div>
    </section>
  );
}

/** PROBLEM — the five complaints as a ruled diagnostics log, struck through as the next arrives. */
function Problem() {
  return (
    <section className="section-y">
      <div className="container-x">
        <HudHead index="02" heading={PROBLEM.heading} />
        <HudPanel scan className="mt-10">
          <ul>
            {PROBLEM.items.map((item, i) => (
              <LogRow key={item} index={pad2(i)} text={item} delay={i * 0.07} />
            ))}
          </ul>
        </HudPanel>
        <Reveal delay={0.1}>
          <p className="lead mt-10 max-w-3xl">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** HOW_IT_WORKS — the four steps as a bracketed sequencer: Post, Compare, Order, Track. */
function HowItWorks() {
  return (
    <section className="section-y border-t border-border">
      <div className="container-x">
        <HudHead index="03" heading={HOW_IT_WORKS.heading} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepCell key={step.key} index={pad2(i)} step={step} delay={i * 0.07} />
          ))}
        </ol>
        <Reveal className="mt-10">
          <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary">{HOW_IT_WORKS.link.label}</Link>
        </Reveal>
      </div>
    </section>
  );
}

/** SPEED_AND_JUDGEMENT — the statement as two instruments: the head left, the reading right. */
function SpeedAndJudgement() {
  return (
    <section className="section-y border-t border-border">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <HudHead index="04" heading={SPEED_AND_JUDGEMENT.heading} />
        <div>
          <HudPanel bare>
            <p className="body-copy max-w-xl text-[16px]">{SPEED_AND_JUDGEMENT.body}</p>
          </HudPanel>
          <Reveal delay={0.08}>
            <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">{SPEED_AND_JUDGEMENT.link.label}</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** TRUST — the three verification commitments as bracketed check cells. */
function Trust() {
  return (
    <section className="section-y border-t border-border">
      <div className="container-x">
        <HudHead index="05" heading={TRUST.heading} />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TRUST.items.map((item, i) => (
            <CheckCell key={item} index={pad2(i)} text={item} delay={i * 0.08} />
          ))}
        </div>
        <Reveal className="mt-10">
          <Link to={TRUST.link.to} className="btn btn-secondary">{TRUST.link.label}</Link>
        </Reveal>
      </div>
    </section>
  );
}

/** TWO_WAYS_IN — the two doors, as bracketed panels of equal weight. */
function TwoWaysIn() {
  return (
    <section className="section-y border-t border-border">
      <div className="container-x">
        <HudHead index="06" heading={TWO_WAYS_IN.heading} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <WayPanel key={card.to} index={pad2(i)} card={card} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** INDUSTRIES_SECTION — the industries as a logged register; each name is the link. */
function Industries() {
  return (
    <section className="section-y border-t border-border">
      <div className="container-x">
        <HudHead index="07" heading={INDUSTRIES_SECTION.heading} />
        <ul className="mt-10 grid border-t border-border sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <IndustryEntry key={name} index={pad2(i)} name={name} to={INDUSTRIES_SECTION.to} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** THE_SYSTEM — the four sides ruled down the left, the GRAVIYX centre held in a bracketed panel. */
function TheSystem() {
  return (
    <section className="section-y border-t border-border">
      <div className="container-x">
        <HudHead index="08" heading={THE_SYSTEM.heading} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
          <ul className="border-t border-border">
            {THE_SYSTEM.sides.map((side, i) => (
              <SideRow key={side.key} index={pad2(i)} side={side} />
            ))}
          </ul>
          <Reveal delay={0.1}>
            <div className="hud-corners panel flex flex-col items-center gap-6 p-8">
              <span aria-hidden="true" className="mark-dot pulse-dot" />
              <HudLegend className="justify-center">{THE_SYSTEM.centre}</HudLegend>
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
 * CLOSING — Ink band 2 of 2. Same rules as the hero: the heading inherits Paper, the copy
 * resolves to the on-ink tones and the pair of controls is the on-ink pair. No `text-ink`,
 * no `btn-primary`, no `btn-secondary`.
 */
function Closing() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-3 md:inset-6">
        <CornerTicks />
      </div>
      <div className="container-x relative">
        <HudLegend className="tabular-nums">09</HudLegend>
        <h2 className="display-lg mt-8 max-w-3xl">{CLOSING.heading}</h2>
        <p className="lead mt-6 max-w-2xl">{CLOSING.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to={CLOSING.primaryCta.to} className="btn btn-on-ink">{CLOSING.primaryCta.label}</Link>
          <Link to={CLOSING.secondaryCta.to} className="btn btn-ghost-on-ink">{CLOSING.secondaryCta.label}</Link>
        </div>
      </div>
    </section>
  );
}

/**
 * The two carried-over sections, verbatim from home-variants-context.md: "Where we serve" and
 * "The ecosystem". Both keep their own light surfaces — Ink stays rationed to the two bands.
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
 * Variant L — "Heads-Up Display". The complete v2.0 Home content as a monochrome instrument
 * panel, with the two Ink bands as the hero and the closing.
 */
export function HomeVariantLFuturisticHud() {
  return (
    <div className="pb-28">
      <Hero />
      <Problem />
      <HowItWorks />
      <SpeedAndJudgement />
      <Trust />
      <TwoWaysIn />
      <Industries />
      <TheSystem />
      <RequiredSections />
      <Closing />
      <VariantPreviewBar current="l" />
    </div>
  );
}
