// ============================================================
// FILE: HomeVariantDControlRoom.tsx
// PURPOSE: Home variant D "Control Room" — the v2.0 Home page read as an operator's
//          console for procurement: mono captions at scale, ruled and tabular layouts,
//          a compact Ink hero and an Ink closing, and a status-board system diagram.
// CONNECTS TO: shared/home-variants.constants.ts (all copy), shared/VariantPreviewBar,
//          @/components/site/Reveal, @tanstack/react-router (Link),
//          ./HomeVariantDControlRoom.parts (the instrument primitives).
// ============================================================

import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
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
  ConnectorRail,
  ConsoleCard,
  ConsoleHead,
  EntryPanel,
  FaultRow,
  MonitorRow,
  RegisterRow,
  rowIndex,
  StatusStrip,
  StepRow,
} from "./HomeVariantDControlRoom.parts";

/** 01 · The Ink console. Headline over a ruled status strip, grid drifting behind. */
function Hero() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
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
        <StatusStrip value={HERO.scopeLine} />
      </div>
    </section>
  );
}

/** 02 · The fault register. Each line logged, indexed and struck through. */
function Problem() {
  return (
    <section className="section-y">
      <div className="container-x">
        <ConsoleHead index="02" heading={PROBLEM.heading} />
        <ul className="mt-10 border-t border-border">
          {PROBLEM.items.map((item, i) => (
            <FaultRow key={item} index={rowIndex(i)} text={item} delay={i * 0.08} />
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="body-copy mt-9 max-w-3xl text-[16px]">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** 03 · The step table. A ruled table with a rail drawing across it. */
function HowItWorks() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <ConsoleHead index="03" heading={HOW_IT_WORKS.heading} />
        <ConnectorRail count={HOW_IT_WORKS.steps.length} />
        <ol className="border-t border-border">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepRow key={step.key} index={rowIndex(i)} step={step} />
          ))}
        </ol>
        <Reveal>
          <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary mt-9">
            {HOW_IT_WORKS.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** 04 · The judgement split. Instrument caption left, the reading on the right. */
function SpeedAndJudgement() {
  return (
    <section className="section-y">
      <div className="container-x grid gap-8 md:grid-cols-2 md:gap-16">
        <ConsoleHead index="04" heading={SPEED_AND_JUDGEMENT.heading} />
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

/** 05 · The verification checks. Three monitored columns. */
function Trust() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <ConsoleHead index="05" heading={TRUST.heading} />
        <ul className="mt-10 grid border-t border-border md:grid-cols-3">
          {TRUST.items.map((item, i) => (
            <li
              key={item}
              className="border-b border-border py-6 md:border-r md:pr-8 md:last:border-r-0"
            >
              <Reveal delay={i * 0.08}>
                <div className="flex items-start gap-3">
                  <span className="mark-dot mt-2" aria-hidden="true" />
                  <p className="text-[15px] text-fg">{item}</p>
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
      </div>
    </section>
  );
}

/** 06 · The two doors. Buyers and suppliers as paired console panels. */
function TwoWaysIn() {
  return (
    <section className="section-y">
      <div className="container-x">
        <ConsoleHead index="06" heading={TWO_WAYS_IN.heading} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <EntryPanel key={card.to} index={rowIndex(i)} card={card} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 07 · The coverage register. Industries read as logged entries, not chips. */
function Industries() {
  return (
    <section className="bg-paper-2 section-y">
      <div className="container-x">
        <ConsoleHead
          index="07"
          heading={INDUSTRIES_SECTION.heading}
          headingTo={INDUSTRIES_SECTION.to}
        />
        <ol className="mt-10 grid border-t border-border sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <RegisterRow key={name} index={rowIndex(i)} name={name} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 08 · The status board. Four monitored sides around the GRAVIYX console. */
function TheSystem() {
  return (
    <section className="section-y">
      <div className="container-x">
        <ConsoleHead index="08" heading={THE_SYSTEM.heading} />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <ul className="border-t border-border">
            {THE_SYSTEM.sides.map((side, i) => (
              <MonitorRow key={side.key} index={rowIndex(i)} side={side} />
            ))}
          </ul>
          <Reveal delay={0.1}>
            <ConsoleCard label={THE_SYSTEM.centre} />
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-8 text-[13px] text-muted lg:text-right">{THE_SYSTEM.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** 09 · The Ink closing panel. */
function Closing() {
  return (
    <section className="surface-ink section-y">
      <div className="container-x">
        <ConsoleHead index="09" heading={CLOSING.heading} />
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
    </section>
  );
}

/**
 * Variant D — "Control Room". Renders the complete v2.0 Home content as an instrument
 * console: nine sections, two rationed Ink bands (the hero and the closing) and the
 * comparison bar last.
 */
export function HomeVariantDControlRoom() {
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
      <Closing />
      <VariantPreviewBar current="d" />
    </div>
  );
}
