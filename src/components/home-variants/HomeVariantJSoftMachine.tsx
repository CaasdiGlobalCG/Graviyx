// ============================================================
// FILE: HomeVariantJSoftMachine.tsx
// PURPOSE: Home variant J "Soft Machine" — the complete v2.0 Home page read as real monochrome
//          neumorphism: cards and controls pushed out of the page, controls pressed back into
//          it. Seven soft sections share one canvas, framed by the page's two rationed Ink
//          bands — the hero and the closing — where neumorphism does not read and the page
//          goes flat with hairlines instead.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          ./HomeVariantJSoftMachine.parts (the primitives), @/components/site/Reveal,
//          @/components/site/Section, SectionHead, IndiaCoverageMap, EcosystemDiagram (the two
//          carried-over sections), @tanstack/react-router (Link).
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
  IndustryChip,
  NeuButton,
  SoftHead,
  StepCard,
  StrikeRow,
  SystemCore,
  SystemSide,
  TrustCard,
  WayCard,
  rowIndex,
} from "./HomeVariantJSoftMachine.parts";

/**
 * HERO — the page's first Ink band, and deliberately flat: neumorphism does not read on Ink. The
 * eyebrow, lead and scope line resolve through the re-pointed semantic tokens and the heading
 * inherits Paper, so no `text-ink`, `btn-primary` or `btn-secondary` appears inside it.
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

/** PROBLEM — the five complaints, each extruded out of the canvas and struck through in turn. */
function Problem() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="02" heading={PROBLEM.heading} />
        <ul className="mt-12 grid gap-6">
          {PROBLEM.items.map((item, i) => (
            <StrikeRow key={item} index={rowIndex(i)} text={item} delay={i * 0.06} />
          ))}
        </ul>
        <Reveal className="mt-10">
          <p className="lead max-w-3xl">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** HOW_IT_WORKS — the four steps as extruded cards, lighting up one after another. */
function HowItWorks() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="03" heading={HOW_IT_WORKS.heading} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepCard key={step.key} index={rowIndex(i)} step={step} delay={i * 0.08} />
          ))}
        </ol>
        <Reveal className="mt-10">
          <NeuButton to={HOW_IT_WORKS.link.to} size="lg">
            {HOW_IT_WORKS.link.label}
          </NeuButton>
        </Reveal>
      </div>
    </section>
  );
}

/** SPEED_AND_JUDGEMENT — the statement on the left, the reading extruded on the right. */
function SpeedAndJudgement() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <SoftHead index="04" heading={SPEED_AND_JUDGEMENT.heading} />
        <Reveal y={18} className="neu-flat flex flex-col p-7 md:p-9">
          <p className="body-copy max-w-xl text-[16px]">{SPEED_AND_JUDGEMENT.body}</p>
          <div className="mt-auto pt-9">
            <NeuButton to={SPEED_AND_JUDGEMENT.link.to}>{SPEED_AND_JUDGEMENT.link.label}</NeuButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** TRUST — the three commitments, each extruded out of the canvas. */
function Trust() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="05" heading={TRUST.heading} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {TRUST.items.map((item, i) => (
            <TrustCard key={item} index={rowIndex(i)} text={item} delay={i * 0.08} />
          ))}
        </ul>
        <Reveal className="mt-10">
          <NeuButton to={TRUST.link.to}>{TRUST.link.label}</NeuButton>
        </Reveal>
      </div>
    </section>
  );
}

/** TWO_WAYS_IN — the two doors, extruded out of the canvas. */
function TwoWaysIn() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="06" heading={TWO_WAYS_IN.heading} />
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <WayCard key={card.to} index={rowIndex(i)} card={card} delay={i * 0.1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** INDUSTRIES_SECTION — every industry set into the canvas as a link to the register. */
function Industries() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="07" heading={INDUSTRIES_SECTION.heading} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <IndustryChip key={name} name={name} to={INDUSTRIES_SECTION.to} delay={i * 0.04} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** THE_SYSTEM — four sides extruded shallowly, the one orchestrator extruded furthest. */
function TheSystem() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="08" heading={THE_SYSTEM.heading} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_minmax(260px,340px)]">
          <ul className="grid gap-6 sm:grid-cols-2">
            {THE_SYSTEM.sides.map((side, i) => (
              <SystemSide key={side.key} index={rowIndex(i)} side={side} delay={i * 0.06} />
            ))}
          </ul>
          <SystemCore label={THE_SYSTEM.centre} caption={THE_SYSTEM.caption} />
        </div>
      </div>
    </section>
  );
}

/**
 * The two sections carried over verbatim from the live Home page. They keep their own light
 * surfaces and are not neumorphic, so they carry no `neu-canvas` — Ink stays rationed to the two
 * bands, and depth stays on the seven soft sections above.
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
 * CLOSING — the page's second and last Ink band, flat for the same reason as the hero. The
 * heading inherits Paper, the copy resolves to on-ink tones and the controls are the on-ink pair.
 */
function Closing() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="mark-dot" />
          <p className="eyebrow">09</p>
        </div>
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
 * Variant J — "Soft Machine". The complete v2.0 Home content in the documented order, then the
 * two carried-over sections, with the comparison bar last. The two Ink bands are the hero and
 * the closing; every section between them carries `neu-canvas`, so each soft surface sits on a
 * canvas that matches it exactly.
 */
export function HomeVariantJSoftMachine() {
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
      <VariantPreviewBar current="j" />
    </div>
  );
}
