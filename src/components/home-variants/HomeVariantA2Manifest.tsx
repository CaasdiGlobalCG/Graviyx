// ============================================================
// FILE: HomeVariantA2Manifest.tsx
// PURPOSE: Home variant A2 — "The Manifest". The same component language as A1
//          (Hero, SectionHead, HairlineStack, MonoIndex, SystemDiagram) but a
//          deliberately different information architecture: a persistent right rail
//          plus multi-column matrices where A1 uses a single list.
// CONNECTS TO: shared/home-variants.constants.ts, shared/MonoIndex, shared/HairlineStack,
//          shared/SystemDiagram, shared/VariantPreviewBar, @/components/site/Hero,
//          @/components/site/Section, @/components/site/LinkOutCard,
//          @/components/site/IndustryChips, @/components/site/Reveal.
// ============================================================

import { Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { LinkOutCard } from "@/components/site/LinkOutCard";
import { IndustryChips } from "@/components/site/IndustryChips";
import { Reveal } from "@/components/site/Reveal";
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
} from "./shared/home-variants.constants";
import { HairlineStack } from "./shared/HairlineStack";
import { MonoIndex } from "./shared/MonoIndex";
import { SystemDiagram } from "./shared/SystemDiagram";
import { VariantPreviewBar } from "./shared/VariantPreviewBar";

/** A bordered matrix cell. A2's signature move: rows become cells. */
function MatrixCell({
  index,
  title,
  body,
  delay = 0,
}: {
  index: number;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full border-t border-border pt-5">
        <MonoIndex n={index} />
        <h3 className="display-sm mt-4 text-ink">{title}</h3>
        <p className="body-copy mt-2 text-[15px]">{body}</p>
      </div>
    </Reveal>
  );
}

export function HomeVariantA2Manifest() {
  return (
    <div className="bg-paper pb-28">
      <Hero
        tone="ink"
        compact
        eyebrow={HERO.eyebrow}
        headline={HERO.headline}
        subhead={HERO.subhead}
        actions={[
          { label: HERO.primaryCta.label, to: HERO.primaryCta.to },
          { label: HERO.secondaryCta.label, to: HERO.secondaryCta.to, variant: "secondary" },
        ]}
      >
        <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-2">
          <p className="text-[15px] text-on-ink-muted">{HERO.scopeLine}</p>
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.22em] text-on-ink-meta uppercase">
            Verified suppliers · Structured requests · One record
          </p>
        </div>
      </Hero>

      <div className="container-x">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <section className="section-y">
              <SectionHead title={PROBLEM.heading} />
              <HairlineStack items={PROBLEM.items} strike className="mt-10" />
              <p className="lead mt-8 max-w-2xl">{PROBLEM.closing}</p>
            </section>

            <section className="section-y border-t border-border">
              <SectionHead title={HOW_IT_WORKS.heading} />
              <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {HOW_IT_WORKS.steps.map((step, i) => (
                  <MatrixCell
                    key={step.key}
                    index={i + 1}
                    title={step.key}
                    body={step.body}
                    delay={i * 0.08}
                  />
                ))}
              </div>
              <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary mt-12">
                {HOW_IT_WORKS.link.label}
              </Link>
            </section>

            <section className="section-y border-t border-border">
              <SectionHead title={SPEED_AND_JUDGEMENT.heading} />
              <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
                <p className="lead">{SPEED_AND_JUDGEMENT.body}</p>
                <div className="border-t border-border pt-5">
                  <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary">
                    {SPEED_AND_JUDGEMENT.link.label}
                  </Link>
                </div>
              </div>
            </section>

            <section className="section-y border-t border-border">
              <SectionHead title={TRUST.heading} />
              <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
                {TRUST.items.map((item, i) => (
                  <MatrixCell
                    key={item}
                    index={i + 1}
                    title={`Check ${String(i + 1).padStart(2, "0")}`}
                    body={item}
                    delay={i * 0.08}
                  />
                ))}
              </div>
              <Link to={TRUST.link.to} className="btn btn-secondary mt-12">
                {TRUST.link.label}
              </Link>
            </section>

            <section className="section-y border-t border-border">
              <SectionHead title={TWO_WAYS_IN.heading} />
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {TWO_WAYS_IN.cards.map((card, i) => (
                  <LinkOutCard
                    key={card.audience}
                    eyebrow={card.audience}
                    title={card.cta}
                    body={card.body}
                    to={card.to}
                    cta={card.cta}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </section>

            <section className="section-y border-t border-border">
              <SectionHead title={INDUSTRIES_SECTION.heading} />
              <IndustryChips size="lg" />
              <Link to={INDUSTRIES_SECTION.to} className="btn btn-secondary mt-10">
                See Industries
              </Link>
            </section>

            <section className="section-y border-t border-border">
              <SectionHead title={THE_SYSTEM.heading} />
              <SystemDiagram
                sides={THE_SYSTEM.sides}
                centre={THE_SYSTEM.centre}
                caption={THE_SYSTEM.caption}
              />
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 border-l border-border pl-8">
              <p className="eyebrow">Manifest</p>
              <p className="mt-5 text-[15px] text-muted">{HERO.scopeLine}</p>
              <dl className="mt-8 border-t border-border pt-5 text-[14px]">
                <div className="flex justify-between gap-4 py-2">
                  <dt className="text-muted">Platform</dt>
                  <dd className="text-fg">One record</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-border py-2">
                  <dt className="text-muted">Suppliers</dt>
                  <dd className="text-fg">Verified first</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-border py-2">
                  <dt className="text-muted">Specialist</dt>
                  <dd className="text-fg">Named</dd>
                </div>
              </dl>
              <Link to={HERO.secondaryCta.to} className="btn btn-primary mt-8 w-full">
                {HERO.secondaryCta.label}
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* The two sections carried over verbatim from the live Home page. Page-level, so
          the wide coverage graphic gets full width and Section's container is not nested. */}
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

      {/* Ink band 2 of 2. The footer is already Ink globally — no third band. */}
      <section className="surface-ink section-y border-t border-border">
        <div className="container-x">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16">
            <div>
              <h2 className="display-md">{CLOSING.heading}</h2>
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
            <div aria-hidden="true" />
          </div>
        </div>
      </section>

      <VariantPreviewBar current="a2" />
    </div>
  );
}
