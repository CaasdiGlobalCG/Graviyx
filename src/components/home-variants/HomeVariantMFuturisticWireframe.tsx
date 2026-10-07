// ============================================================
// FILE: HomeVariantMFuturisticWireframe.tsx
// PURPOSE: Home variant M "Signal Wireframe" — the complete v2.0 Home content drawn as a
//          technical drawing that happens to be interactive. Plotted fields with drawn
//          axes, dimension rules, crosshair registration marks and node-and-edge diagrams
//          carry the page; the hero and the closing are its two rationed Ink bands.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          @/components/site/Section, SectionHead, IndiaCoverageMap, EcosystemDiagram (the
//          two carried-over sections), @/components/site/Reveal, @tanstack/react-router
//          (Link), ./HomeVariantMFuturisticWireframe.parts (the primitives).
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
  Annotation,
  CornerMarks,
  DimensionRule,
  HubChain,
  HubGraph,
  PlotField,
  StepChain,
  StrikeRow,
  WireHead,
} from "./HomeVariantMFuturisticWireframe.parts";

/** HERO — the Ink hero, the first of two rationed dark bands. The plotted field and corner
 *  registration marks are decorative; the copy resolves through the re-pointed tokens and
 *  the heading inherits Paper, so no `text-ink`, `btn-primary` or `btn-secondary` inside. */
function Hero() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <PlotField label={HERO.eyebrow} />
      <CornerMarks className="text-on-ink-meta" />
      <div className="container-x relative">
        <div className="px-5 pt-6 pb-10 md:px-10 md:pt-10 md:pb-14">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="mark-dot pulse-dot" />
            <p className="eyebrow">{HERO.eyebrow}</p>
          </div>
          <h1 className="display-xl mt-6 max-w-4xl">{HERO.headline}</h1>
          <DimensionRule className="mt-8 max-w-2xl" />
          <p className="lead mt-8 max-w-2xl">{HERO.subhead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={HERO.primaryCta.to} className="btn btn-on-ink">{HERO.primaryCta.label}</Link>
            <Link to={HERO.secondaryCta.to} className="btn btn-ghost-on-ink">{HERO.secondaryCta.label}</Link>
          </div>
          <div className="mt-10 border-t border-border pt-4">
            <p className="text-[13px] text-on-ink-muted">{HERO.scopeLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** PROBLEM — the five complaints as ruled rows, each struck through as the next arrives. */
function Problem() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <WireHead heading={PROBLEM.heading} />
        <ul className="mt-12 border-t border-border">
          {PROBLEM.items.map((item, i) => (
            <StrikeRow key={item} text={item} strike={i < PROBLEM.items.length - 1} />
          ))}
        </ul>
        <Reveal className="mt-10">
          <p className="lead max-w-3xl">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** HOW_IT_WORKS — the four steps as the nodes of one chain, in one reading order. */
function HowItWorks() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <WireHead heading={HOW_IT_WORKS.heading} />
        <StepChain steps={HOW_IT_WORKS.steps} />
        <Reveal className="mt-12">
          <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary">{HOW_IT_WORKS.link.label}</Link>
        </Reveal>
      </div>
    </section>
  );
}

/** SPEED_AND_JUDGEMENT — the statement, split into a head and a plotted panel. */
function SpeedAndJudgement() {
  return (
    <section className="section-y relative">
      <div className="container-x grid gap-10 md:grid-cols-2 md:gap-16">
        <WireHead heading={SPEED_AND_JUDGEMENT.heading} />
        <Reveal>
          <div className="hud-corners hud-scanlines border border-border bg-paper-2 p-6 md:p-8">
            <DimensionRule className="max-w-xs" />
            <p className="body-copy mt-6 text-[16px]">{SPEED_AND_JUDGEMENT.body}</p>
            <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">
              {SPEED_AND_JUDGEMENT.link.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** TRUST — three commitments as ruled rows, each with its own registration mark. */
function Trust() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <WireHead heading={TRUST.heading} />
        <ul className="mt-12 border-t border-border">
          {TRUST.items.map((item) => (
            <StrikeRow key={item} text={item} />
          ))}
        </ul>
        <Reveal className="mt-10">
          <Link to={TRUST.link.to} className="btn btn-secondary">{TRUST.link.label}</Link>
        </Reveal>
      </div>
    </section>
  );
}

/** TWO_WAYS_IN — the two doors as the two categories of one plotted field. */
function TwoWaysIn() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <WireHead heading={TWO_WAYS_IN.heading} />
        <div className="relative mt-12 border-y border-border py-10">
          <PlotField labels={TWO_WAYS_IN.cards.map((card) => card.audience)} />
          <div className="relative grid md:grid-cols-2 md:divide-x md:divide-border">
            {TWO_WAYS_IN.cards.map((card) => (
              <Link key={card.to} to={card.to} className="group flex flex-col justify-between bg-paper p-8 transition-colors duration-200 hover:bg-paper-2">
                <div>
                  <p className="eyebrow">{card.audience}</p>
                  <p className="body-copy mt-4 text-[16px]">{card.body}</p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-ink uppercase">
                  {card.cta}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <DimensionRule className="mt-10" />
      </div>
    </section>
  );
}

/** INDUSTRIES_SECTION — the industries as a measured register whose name is the link. */
function Industries() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <WireHead heading={INDUSTRIES_SECTION.heading} />
        <ul className="mt-12 grid border-t border-border sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name) => (
            <li key={name} className="border-b border-border">
              <Reveal>
                <Link to={INDUSTRIES_SECTION.to} className="group flex items-center gap-4 py-4">
                  <span aria-hidden="true" className="h-px w-5 shrink-0 bg-border-soft" />
                  <span className="display-sm text-steel-50 transition-colors duration-200 group-hover:text-ink">
                    {name}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** THE_SYSTEM — four sides and one centre, drawn as a node-and-edge diagram plus its key. */
function TheSystem() {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <WireHead heading={THE_SYSTEM.heading} />
        <HubGraph centre={THE_SYSTEM.centre} sides={THE_SYSTEM.sides} label={THE_SYSTEM.heading} />
        <HubChain centre={THE_SYSTEM.centre} sides={THE_SYSTEM.sides} />
        <ul className="mt-12 grid border-t border-border sm:grid-cols-2 sm:gap-x-12">
          {THE_SYSTEM.sides.map((side) => (
            <li key={side.key} className="border-b border-border">
              <Reveal>
                <div className="py-5">
                  <p className="eyebrow">{side.key}</p>
                  <p className="body-copy mt-2 max-w-md text-[15px]">{side.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <Annotation text={THE_SYSTEM.caption} className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}

/** CLOSING — the Ink closing, the second and last dark band. Same rules as the hero: the
 *  heading inherits Paper, the copy resolves to on-ink tones and the buttons are the on-ink
 *  pair, so no `text-ink`, `btn-primary` or `btn-secondary` appears inside. */
function Closing() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <PlotField />
      <CornerMarks className="text-on-ink-meta" />
      <div className="container-x relative">
        <div className="px-5 pt-6 pb-10 md:px-10 md:pt-10 md:pb-14">
          <DimensionRule className="max-w-xl" />
          <h2 className="display-lg mt-8 max-w-3xl">{CLOSING.heading}</h2>
          <p className="lead mt-6 max-w-2xl">{CLOSING.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={CLOSING.primaryCta.to} className="btn btn-on-ink">{CLOSING.primaryCta.label}</Link>
            <Link to={CLOSING.secondaryCta.to} className="btn btn-ghost-on-ink">{CLOSING.secondaryCta.label}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The two carried-over sections, verbatim from home-variants-context.md: "Where we serve"
 *  and "The ecosystem". Both keep their own light surfaces — Ink stays rationed to the two
 *  bands above. */
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

/** Variant M — "Signal Wireframe". The complete v2.0 Home content drawn as a technical
 *  drawing: the two Ink bands are the hero and the closing, the two carried-over sections
 *  follow the v2.0 content, and the comparison bar sits last. */
export function HomeVariantMFuturisticWireframe() {
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
      <VariantPreviewBar current="m" />
    </div>
  );
}
