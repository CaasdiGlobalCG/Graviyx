// ============================================================
// FILE: HomeVariantBDiagonalCut.tsx
// PURPOSE: Home variant B — "Diagonal Cut". The GRAVIYX mark's 65° cut is the
//          organising device: angled section dividers, blocks offset along the
//          diagonal axis, and a connector line that draws on through the steps.
// CONNECTS TO: ./HomeVariantBDiagonalCut.parts (primitives + upper sections),
//          shared/home-variants.constants.ts (all copy),
//          shared/VariantPreviewBar.tsx, motion/react, @tanstack/react-router.
// ============================================================

import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { VariantPreviewBar } from "@/components/home-variants/shared/VariantPreviewBar";
import {
  CLOSING,
  INDUSTRIES_SECTION,
  THE_SYSTEM,
  TWO_WAYS_IN,
} from "@/components/home-variants/shared/home-variants.constants";
import {
  CutDivider,
  CutHeading,
  CutMark,
  HeroSection,
  HowSection,
  ProblemSection,
  SectionFrame,
  SpeedSection,
  TrustSection,
} from "./HomeVariantBDiagonalCut.parts";

/** The GRAVIYX mark's decisive cut, measured from horizontal. */
const CUT_DEG = -65;

/** TWO_WAYS_IN — the two audiences, cut apart by the diagonal. */
function TwoWaysSection() {
  return (
    <SectionFrame className="bg-paper-2">
      <CutHeading>{TWO_WAYS_IN.heading}</CutHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {TWO_WAYS_IN.cards.map((card, i) => (
          <Reveal key={card.audience} delay={i * 0.12}>
            <Link to={card.to} className="panel group relative block overflow-hidden p-7 md:p-9">
              <span
                className="pointer-events-none absolute -right-8 -top-8 h-[2px] w-28 bg-ink opacity-20"
                style={{ transform: `rotate(${CUT_DEG}deg)` }}
                aria-hidden="true"
              />
              <CutMark />
              <h3 className="display-md mt-6 text-fg">{card.audience}</h3>
              <p className="body-copy mt-4 text-[16px]">{card.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg">
                {card.cta} <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

/** INDUSTRIES_SECTION — the sectors, listed under a linked heading. */
function IndustriesSection() {
  return (
    <SectionFrame className="bg-bg">
      <div className="lg:pl-6">
        <Link to={INDUSTRIES_SECTION.to} className="inline-flex items-start gap-4">
          <CutMark className="mt-[0.7em]" />
          <h2 className="display-lg text-fg">{INDUSTRIES_SECTION.heading}</h2>
        </Link>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 md:mt-14">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <Reveal key={name} delay={i * 0.04}>
              <span className="flex items-center gap-3 border-b border-border pb-2 text-[16px] text-fg">
                <span className="h-px w-5 bg-steel-15" aria-hidden="true" />
                {name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

/** One side of the system grid. */
function SideCell({ side }: { side: { key: string; body: string } }) {
  return (
    <div className="bg-ink p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 bg-paper pulse-dot" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel-30">{side.key}</span>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-paper">{side.body}</p>
    </div>
  );
}

/** Four sides arranged around the one centre. */
function SystemGraphic() {
  const [buyers, suppliers, logistics, intelligence] = THE_SYSTEM.sides;
  return (
    <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-[1fr_auto_1fr]">
      <div className="grid gap-px bg-border">
        <SideCell side={buyers} />
        <SideCell side={logistics} />
      </div>
      <div className="relative flex items-center justify-center bg-ink px-10 py-10">
        <span
          className="pointer-events-none absolute h-[2px] w-24 bg-paper opacity-30"
          style={{ transform: `rotate(${CUT_DEG}deg)` }}
          aria-hidden="true"
        />
        <span className="font-mono text-[13px] uppercase tracking-[0.28em] text-paper">{THE_SYSTEM.centre}</span>
      </div>
      <div className="grid gap-px bg-border">
        <SideCell side={suppliers} />
        <SideCell side={intelligence} />
      </div>
    </div>
  );
}

/** THE_SYSTEM — inverted, so the system reads as the page's centre of gravity. */
function SystemSection() {
  return (
    <section className="section-y relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-65deg, color-mix(in oklab, var(--paper) 8%, transparent) 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="container-x relative">
        <div className="flex items-start gap-4">
          <CutMark className="mt-[0.7em]" tone="paper" />
          <h2 className="display-lg max-w-3xl text-paper">{THE_SYSTEM.heading}</h2>
        </div>
        <SystemGraphic />
        <p className="mt-8 font-mono text-[11px] tracking-[0.08em] text-steel-30">{THE_SYSTEM.caption}</p>
      </div>
    </section>
  );
}

/** CLOSING — the final call to action, crossed by the diagonal. */
function ClosingSection() {
  return (
    <section className="section-y relative overflow-hidden bg-paper-2">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span
          className="absolute left-1/2 top-1/2 h-[2px] w-[900px] bg-ink opacity-10"
          style={{ transform: `translate(-50%, -50%) rotate(${CUT_DEG}deg)` }}
        />
      </div>
      <div className="container-x relative">
        <CutHeading className="max-w-3xl">{CLOSING.heading}</CutHeading>
        <p className="lead mt-6 max-w-xl">{CLOSING.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to={CLOSING.primaryCta.to} className="btn btn-primary">
            {CLOSING.primaryCta.label}
          </Link>
          <Link to={CLOSING.secondaryCta.to} className="btn btn-secondary">
            {CLOSING.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Home variant B — "Diagonal Cut".
 *
 * Renders the complete v2.0 Home content in the order the constants define, with an
 * angled divider between each section. Every section's resting state is complete on
 * its own; motion only adds the draw-on and the reveals.
 */
export function HomeVariantBDiagonalCut() {
  return (
    <div className="relative overflow-hidden bg-bg pb-28">
      <HeroSection />
      <CutDivider />
      <ProblemSection />
      <CutDivider />
      <HowSection />
      <CutDivider />
      <SpeedSection />
      <CutDivider />
      <TrustSection />
      <CutDivider />
      <TwoWaysSection />
      <CutDivider />
      <IndustriesSection />
      <CutDivider />
      <SystemSection />
      <CutDivider />
      <ClosingSection />
      <VariantPreviewBar current="b" />
    </div>
  );
}
