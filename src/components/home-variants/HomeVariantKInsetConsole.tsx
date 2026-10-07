// ============================================================
// FILE: HomeVariantKInsetConsole.tsx
// PURPOSE: Home variant K "Inset Console" — the complete v2.0 Home page read as a machined
//          panel: every surface is cut INTO the page rather than pushed out of it, so content
//          sits down inside recessed wells, channels and slots. The hero and the closing are
//          the page's two rationed Ink bands, flat with hairlines — neumorphism does not read on Ink.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          @/components/site/Reveal, @/components/site/Section + SectionHead +
//          IndiaCoverageMap + EcosystemDiagram (the two carried-over sections only),
//          @tanstack/react-router (Link), ./HomeVariantKInsetConsole.parts (the primitives).
// ============================================================
//
// Every section rendering a neumorphic surface also carries `neu-canvas`, so each surface's
// background matches its parent canvas exactly. Body copy on those surfaces is `text-fg` and
// `text-meta` never appears on one — see the contrast note in the .parts file.

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
  CentrePlate,
  ChannelRow,
  ConsoleAction,
  ConsoleHead,
  DoorCard,
  IndustryKey,
  SideSlot,
  StepSlot,
  TravellingLine,
  rowIndex,
  sidePlacement,
} from "./HomeVariantKInsetConsole.parts";

/** HERO — Ink band 1. Flat Ink with hairlines; copy resolves through the on-ink tokens. */
function Hero() {
  return (
    <section className="surface-ink section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="mark-dot pulse-dot" />
            <p className="eyebrow">{HERO.eyebrow}</p>
          </div>
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-on-ink-meta tabular-nums">
            01
          </span>
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

/** PROBLEM — the five complaints on ruled rows, struck through as the next arrives. */
function Problem() {
  return (
    <section className="neu-canvas hairline section-y">
      <div className="container-x">
        <ConsoleHead index="02" heading={PROBLEM.heading} />
        <Reveal delay={0.06} className="mt-10">
          <ul className="neu-inset divide-y divide-border px-5 py-2 md:px-8 md:py-3">
            {PROBLEM.items.map((item, i) => (
              <ChannelRow key={item} index={rowIndex(i)} text={item} delay={i * 0.06} strike />
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <p className="lead max-w-3xl">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** HOW_IT_WORKS — the four steps cut into slots, the line travelling across them above. */
function HowItWorks() {
  return (
    <section className="neu-canvas hairline section-y">
      <div className="container-x">
        <ConsoleHead index="03" heading={HOW_IT_WORKS.heading} />
        <div className="mt-12">
          <TravellingLine />
          <ol className="grid gap-5 lg:mt-6 lg:grid-cols-4">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <StepSlot key={step.key} index={rowIndex(i)} step={step} delay={i} />
            ))}
          </ol>
        </div>
        <Reveal className="mt-10">
          <ConsoleAction to={HOW_IT_WORKS.link.to}>{HOW_IT_WORKS.link.label}</ConsoleAction>
        </Reveal>
      </div>
    </section>
  );
}

/** SPEED_AND_JUDGEMENT — the heading beside a well with the reading sunk into it. */
function SpeedAndJudgement() {
  return (
    <section className="neu-canvas hairline section-y">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ConsoleHead index="04" heading={SPEED_AND_JUDGEMENT.heading} />
        <div className="lg:pt-2">
          <Reveal>
            <div className="neu-inset p-6 md:p-8">
              <p className="max-w-xl text-[16px] text-fg">{SPEED_AND_JUDGEMENT.body}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <ConsoleAction to={SPEED_AND_JUDGEMENT.link.to} tone="flat">
              {SPEED_AND_JUDGEMENT.link.label}
            </ConsoleAction>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** TRUST — three commitments on ruled rows inside one wide shallow channel. */
function Trust() {
  return (
    <section className="neu-canvas hairline section-y">
      <div className="container-x">
        <ConsoleHead index="05" heading={TRUST.heading} />
        <Reveal className="mt-10">
          <ul className="neu-inset divide-y divide-border px-5 py-2 md:px-8 md:py-3">
            {TRUST.items.map((item, i) => (
              <ChannelRow key={item} index={rowIndex(i)} text={item} delay={i * 0.06} />
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-10">
          <ConsoleAction to={TRUST.link.to} tone="flat">
            {TRUST.link.label}
          </ConsoleAction>
        </Reveal>
      </div>
    </section>
  );
}

/** TWO_WAYS_IN — two doors raised out of the panel, each with its index sunk into it. */
function TwoWaysIn() {
  return (
    <section className="neu-canvas hairline section-y">
      <div className="container-x">
        <ConsoleHead index="06" heading={TWO_WAYS_IN.heading} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <DoorCard key={card.to} index={rowIndex(i)} card={card} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** INDUSTRIES_SECTION — each industry cut into its own slot, the name the link. */
function Industries() {
  return (
    <section className="neu-canvas hairline section-y">
      <div className="container-x">
        <ConsoleHead index="07" heading={INDUSTRIES_SECTION.heading} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <IndustryKey key={name} index={rowIndex(i)} name={name} to={INDUSTRIES_SECTION.to} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** THE_SYSTEM — the four sides cut into slots around the pressed centre plate. */
function TheSystem() {
  return (
    <section className="neu-canvas hairline section-y">
      <div className="container-x">
        <ConsoleHead index="08" heading={THE_SYSTEM.heading} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <CentrePlate
            label={THE_SYSTEM.centre}
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
          />
          {THE_SYSTEM.sides.map((side, i) => (
            <SideSlot
              key={side.key}
              index={rowIndex(i)}
              side={side}
              placement={sidePlacement(i)}
              delay={i}
            />
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="text-[13px] text-muted lg:text-right">{THE_SYSTEM.caption}</p>
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

/** CLOSING — Ink band 2. Same rules as the hero: flat Ink, hairlines, the on-ink button pair. */
function Closing() {
  return (
    <section className="surface-ink hairline section-y">
      <div className="container-x">
        <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-on-ink-meta tabular-nums">
          09
        </span>
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
 * Variant K — "Inset Console". All nine v2.0 sections in order, then the two carried-over
 * sections, then the comparison bar. The two Ink bands are the hero and the closing.
 */
export function HomeVariantKInsetConsole() {
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
      <VariantPreviewBar current="k" />
    </div>
  );
}
