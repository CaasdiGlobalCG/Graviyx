// ============================================================
// FILE: HomeVariantDControlRoom.tsx
// PURPOSE: Home variant D — "Control Room". An instrument-panel reading of the v2.0
//          Home content: mono captions at scale, ruled and tabular layouts, a four-step
//          table, a coverage register and a system status board around a dark console.
// CONNECTS TO: shared/home-variants.constants.ts, ./HomeVariantDControlRoom.parts,
//          shared/VariantPreviewBar, @/components/site/Reveal, motion/react,
//          @tanstack/react-router (Link).
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
  BoardHead,
  ConsolePanel,
  ProblemRow,
  RegisterRow,
  StatusDot,
  StepRow,
  SystemRow,
  TrustRow,
  WayCard,
} from "./HomeVariantDControlRoom.parts";

/** HERO — compact and instrument-like: the H1 sits above a ruled status strip. */
function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-24 bg-grid drift-grid" />
      </div>
      <div className="container-x relative py-16 md:py-24">
        <Reveal>
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="display-xl mt-5 max-w-[16ch] text-ink">{HERO.headline}</h1>
          <p className="lead mt-6 max-w-[54ch]">{HERO.subhead}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
          <Link to={HERO.primaryCta.to} className="btn btn-primary">
            {HERO.primaryCta.label}
          </Link>
          <Link to={HERO.secondaryCta.to} className="btn btn-secondary">
            {HERO.secondaryCta.label}
          </Link>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-12 flex items-center gap-3 border-t border-border pt-5">
            <StatusDot />
            <p className="text-[14px] text-steel-50">{HERO.scopeLine}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** PROBLEM — a ruled fault log; each line is drawn through as the next arrives. */
function ProblemSection() {
  return (
    <section id="problem" className="container-x section-y">
      <BoardHead index="01" title={PROBLEM.heading} />
      <ul className="mt-8">
        {PROBLEM.items.map((text, i) => (
          <ProblemRow key={text} index={i + 1} text={text} delay={i * 0.07} />
        ))}
      </ul>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-[60ch] border-t border-border pt-6 text-[15px] text-steel-50">
          {PROBLEM.closing}
        </p>
      </Reveal>
    </section>
  );
}

/** HOW_IT_WORKS — a ruled table. Post / Compare / Order / Track as four rows. */
function HowItWorksSection() {
  return (
    <section id="how" className="container-x section-y">
      <BoardHead index="02" title={HOW_IT_WORKS.heading} />
      <div className="mt-8 border-t border-border">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <StepRow key={step.key} index={i + 1} stepKey={step.key} body={step.body} delay={i * 0.18} />
        ))}
      </div>
      <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary mt-8">
        {HOW_IT_WORKS.link.label}
      </Link>
    </section>
  );
}

/** SPEED_AND_JUDGEMENT — a wide readout with the link set on the baseline. */
function JudgementSection() {
  return (
    <section id="judgement" className="container-x section-y">
      <BoardHead index="03" title={SPEED_AND_JUDGEMENT.heading} />
      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-end md:gap-12">
        <Reveal>
          <p className="lead max-w-[64ch]">{SPEED_AND_JUDGEMENT.body}</p>
        </Reveal>
        <Reveal delay={0.12} className="md:justify-self-end">
          <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary">
            {SPEED_AND_JUDGEMENT.link.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** TRUST — a verification register. */
function TrustSection() {
  return (
    <section id="trust" className="container-x section-y">
      <BoardHead index="04" title={TRUST.heading} />
      <ol className="mt-8">
        {TRUST.items.map((text, i) => (
          <TrustRow key={text} index={i + 1} text={text} delay={i * 0.08} />
        ))}
      </ol>
      <Link to={TRUST.link.to} className="btn btn-secondary mt-8">
        {TRUST.link.label}
      </Link>
    </section>
  );
}

/** TWO_WAYS_IN — two entry panels. */
function TwoWaysSection() {
  return (
    <section id="ways" className="container-x section-y">
      <BoardHead index="05" title={TWO_WAYS_IN.heading} />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {TWO_WAYS_IN.cards.map((card, i) => (
          <Reveal key={card.audience} delay={i * 0.1} className="h-full">
            <WayCard card={card} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** INDUSTRIES_SECTION — a coverage register rather than a chip cloud. */
function IndustriesSection() {
  return (
    <section id="industries" className="container-x section-y">
      <BoardHead
        index="06"
        title={
          <Link to={INDUSTRIES_SECTION.to} className="underline-offset-4 hover:underline">
            {INDUSTRIES_SECTION.heading}
          </Link>
        }
      />
      <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES_SECTION.items.map((name, i) => (
          <RegisterRow key={name} index={i + 1} name={name} delay={i * 0.04} />
        ))}
      </ul>
    </section>
  );
}

/** THE_SYSTEM — a status board of four monitored rows beside the GRAVIYX console. */
function SystemSection() {
  return (
    <section id="system" className="container-x section-y">
      <BoardHead index="07" title={THE_SYSTEM.heading} />
      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ul className="panel divide-y divide-border">
          {THE_SYSTEM.sides.map((side, i) => (
            <SystemRow key={side.key} index={i + 1} sideKey={side.key} body={side.body} delay={i * 0.08} />
          ))}
        </ul>
        <ConsolePanel />
      </div>
    </section>
  );
}

/** CLOSING — the final console strip. */
function ClosingSection() {
  return (
    <section id="closing" className="container-x section-y">
      <Reveal>
        <div className="panel p-6 md:p-12">
          <span className="eyebrow tabular-nums">08</span>
          <h2 className="display-lg mt-5 max-w-[22ch] text-ink">{CLOSING.heading}</h2>
          <p className="lead mt-5 max-w-[54ch]">{CLOSING.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={CLOSING.primaryCta.to} className="btn btn-primary">
              {CLOSING.primaryCta.label}
            </Link>
            <Link to={CLOSING.secondaryCta.to} className="btn btn-secondary">
              {CLOSING.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Home variant D — "Control Room". The whole v2.0 Home content as an operator console. */
export function HomeVariantDControlRoom() {
  return (
    <div className="min-h-screen bg-paper pb-28 text-ink">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <JudgementSection />
      <TrustSection />
      <TwoWaysSection />
      <IndustriesSection />
      <SystemSection />
      <ClosingSection />
      <VariantPreviewBar current="d" />
    </div>
  );
}
