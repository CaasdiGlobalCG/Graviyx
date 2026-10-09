// ============================================================
// FILE: HomePage.tsx
// PURPOSE: The live Home page. The complete v2.0 Home content, in the documented order,
//          read as monochrome neumorphism — cards and controls pushed out of the page,
//          controls pressed back into it. Seven soft sections share one canvas, framed by
//          the page's two rationed Ink bands (the hero and the closing), where neumorphism
//          does not read and the page goes flat with hairlines instead.
// CONNECTS TO: ./home-content.constants (all copy), ./soft-machine.parts (the primitives),
//          @/components/site/{Reveal,Section,SectionHead,IndiaCoverageMap,EcosystemDiagram},
//          @tanstack/react-router.
// ============================================================
//
// ADOPTED DIRECTION: "Soft Machine", chosen from six explored variants. It is the accessible
// "Soft UI Evolution" form the ui-ux-pro-max database prefers over classic neumorphism (which
// it flags "⚠ Low contrast"): body copy on the canvas is `text-fg` and `text-meta` never
// appears on a neumorphic surface, the press shrinks to scale(0.97) as well as translating and
// reweighting, and `box-shadow` is swapped rather than animated.

import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/Section";
import { IndiaCoverageMap } from "@/components/site/IndiaCoverageMap";
import { EcosystemDiagram } from "@/components/site/EcosystemDiagram";
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
} from "./home-content.constants";
import {
  IndustryChip,
  NeuButton,
  ProblemRow,
  SoftHead,
  StepCard,
  SystemCore,
  SystemSide,
  TrustCard,
  WayCard,
  rowIndex,
} from "./soft-machine.parts";

/**
 * HERO — the page's first Ink band, and deliberately flat: neumorphism does not read on Ink. The
 * eyebrow, lead and scope line resolve through the re-pointed semantic tokens and the heading
 * inherits Paper, so no `text-ink`, `btn-primary` or `btn-secondary` appears inside it.
 *
 * The 72px header offset is PADDING, not margin, and that is the whole point: a margin would
 * leave a bare strip above the hero for the glass header to sit on, whereas padding is painted
 * by the section's own surface. So the Ink ground and its grid run the full height behind the
 * header while the copy still starts below it.
 */
function Hero() {
  return (
    <section className="hero-pin surface-ink min-h-[100svh] overflow-hidden pt-[112px] pb-10 md:pt-[136px] md:pb-16 lg:pt-[168px] lg:pb-24">
      <div aria-hidden="true" className="bg-grid drift-grid pointer-events-none absolute -inset-24" />
      <div className="container-x hero-depth relative">
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
        <SoftHead index="01" heading={PROBLEM.heading} />
        <ul className="mt-12 grid gap-6">
          {PROBLEM.items.map((item, i) => (
            <ProblemRow
              key={item}
              index={rowIndex(i)}
              text={item}
              delay={i * 0.06}
              from={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </ul>
        <Reveal className="mt-10">
          <p className="lead max-w-3xl text-fg">{PROBLEM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** HOW_IT_WORKS — the four steps as extruded cards. Section 03, and the first of the three
 *  dark bands, so the page alternates: 02 light, 03 dark, 04 light, 05 dark, 06 light,
 *  07 dark, 08 light. */
function HowItWorks() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SoftHead index="02" heading={HOW_IT_WORKS.heading} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StepCard
              key={step.key}
              index={rowIndex(i)}
              step={step}
              delay={i * 0.08}
              from={i % 2 === 0 ? "left" : "right"}
            />
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
        <Reveal from="left">
          <SoftHead index="03" heading={SPEED_AND_JUDGEMENT.heading} />
        </Reveal>
        <Reveal from="right" y={18} className="neu-flat flex flex-col p-7 md:p-9">
          <p className="body-copy max-w-xl text-[16px] text-fg">{SPEED_AND_JUDGEMENT.body}</p>
          <div className="mt-auto pt-9">
            <NeuButton to={SPEED_AND_JUDGEMENT.link.to}>{SPEED_AND_JUDGEMENT.link.label}</NeuButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** TRUST — the three commitments, each extruded out of the canvas. Section 05, the second
 *  dark band. */
function Trust() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SoftHead index="04" heading={TRUST.heading} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {TRUST.items.map((item, i) => (
            <TrustCard
              key={item}
              index={rowIndex(i)}
              text={item}
              delay={i * 0.08}
              from={i % 2 === 0 ? "left" : "right"}
            />
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
        <SoftHead index="05" heading={TWO_WAYS_IN.heading} />
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {TWO_WAYS_IN.cards.map((card, i) => (
            <WayCard
              key={card.to}
              index={rowIndex(i)}
              card={card}
              delay={i * 0.1}
              from={i === 0 ? "left" : "right"}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** INDUSTRIES_SECTION — every industry set into the canvas as a link to the register.
 *  Section 07, the third dark band. */
function Industries() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SoftHead index="06" heading={INDUSTRIES_SECTION.heading} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_SECTION.items.map((name, i) => (
            <IndustryChip
              key={name}
              name={name}
              to={INDUSTRIES_SECTION.to}
              delay={i * 0.04}
              from={i % 2 === 0 ? "left" : "right"}
            />
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
        <SoftHead index="07" heading={THE_SYSTEM.heading} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_minmax(260px,340px)]">
          <ul className="grid gap-6 sm:grid-cols-2">
            {THE_SYSTEM.sides.map((side, i) => (
              <SystemSide
                key={side.key}
                index={rowIndex(i)}
                side={side}
                delay={i * 0.06}
                from={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </ul>
          <SystemCore label={THE_SYSTEM.centre} caption={THE_SYSTEM.caption} />
        </div>
      </div>
    </section>
  );
}

/**
 * The coverage map and the ecosystem diagram, now in the neumorphic material like the rest
 * of the page: each sits on a light `neu-canvas` and presents its graphic on a `neu-raised`
 * panel, so the drawing reads as a surface pushed out of the page rather than a bordered box.
 *
 * The two components are neutralised to suit — their own backgrounds were removed so the
 * raised surface shows through, and their hairlines come from the panel instead of a border.
 * Their copy is unchanged; only the caption's colour class moved from `text-meta` to
 * `text-muted`, because `text-meta` (steel-30) fails contrast on a light neumorphic canvas.
 */
function CoverageAndEcosystem() {
  return (
    <>
      <section className="neu-canvas section-y">
        <div className="container-x">
          <Reveal from="left">
            <SectionHead
              eyebrow="Where we serve"
              title="Connected across India's industrial corridors."
              lead="Our technology-enabled network coordinates demand, verified supply and fulfilment across the country's major metropolitan centres."
            />
            <IndiaCoverageMap />
          </Reveal>
        </div>
      </section>
      <section className="neu-canvas section-y">
        <div className="container-x">
          <Reveal from="right">
            <SectionHead
              eyebrow="The ecosystem"
              title="Four sides. One orchestrator."
              align="center"
            />
            <EcosystemDiagram />
            <p className="mt-6 text-center text-sm text-muted">
              Orchestrated trade, not just listed products.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * CLOSING — the page's second and last dark band, and the one place the DARK neumorphic
 * material is used. `neu-canvas-dark` grounds it on steel-90 and re-points the semantic
 * tokens exactly as `surface-ink` does, so the eyebrow, lead and heading read correctly with
 * no per-node colour classes. The CTA then sits on a `neu-raised` console, which is what
 * makes the dark material visible at all — a flat dark band shows none of it.
 */
function Closing() {
  return (
    <section className="neu-canvas-dark section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <Reveal y={18} className="neu-raised p-8 md:p-12">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="mark-dot" />
            <p className="eyebrow">08</p>
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
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The Home page. The v2.0 content in the documented order, then the coverage and ecosystem
 * sections, closing on the call to action. The two Ink bands are the hero and the closing;
 * every section between them carries `neu-canvas`, so each soft surface sits on a canvas that
 * matches it exactly.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <SpeedAndJudgement />
      <Trust />
      <TwoWaysIn />
      <Industries />
      <TheSystem />
      <CoverageAndEcosystem />
      <Closing />
    </>
  );
}
