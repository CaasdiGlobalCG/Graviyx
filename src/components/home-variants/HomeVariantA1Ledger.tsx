// ============================================================
// FILE: HomeVariantA1Ledger.tsx
// PURPOSE: Home variant A1 — "The Ledger". A document-like single column: every section
//          is a numbered hairline row, with a sticky section index on the left at lg+.
//          Shares its component language with A2 (Hero, SectionHead, LedgerRow,
//          HairlineStack, MonoIndex, SystemDiagram) — only the IA differs.
// CONNECTS TO: shared/home-variants.constants.ts, shared/LedgerRow, shared/HairlineStack,
//          shared/MonoIndex, shared/SystemDiagram, shared/VariantPreviewBar,
//          @/components/site/Hero, @/components/site/Section,
//          @/components/site/LinkOutCard, @/components/site/IndustryChips.
// ============================================================

import { Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { LinkOutCard } from "@/components/site/LinkOutCard";
import { IndustryChips } from "@/components/site/IndustryChips";
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
import { LedgerRow } from "./shared/LedgerRow";
import { HairlineStack } from "./shared/HairlineStack";
import { MonoIndex } from "./shared/MonoIndex";
import { SystemDiagram } from "./shared/SystemDiagram";
import { VariantPreviewBar } from "./shared/VariantPreviewBar";

/** The sticky index. Static anchors — nothing here is derived from data. */
const INDEX = [
  { id: "problem", label: "Sound familiar?" },
  { id: "how", label: "How it works" },
  { id: "judgement", label: "Speed and judgement" },
  { id: "trust", label: "Trust" },
  { id: "ways", label: "Two ways in" },
  { id: "industries", label: "Industries" },
  { id: "system", label: "The system" },
] as const;

export function HomeVariantA1Ledger() {
  return (
    <div className="bg-paper pb-28">
      <Hero
        tone="ink"
        eyebrow={HERO.eyebrow}
        headline={HERO.headline}
        subhead={HERO.subhead}
        actions={[
          { label: HERO.primaryCta.label, to: HERO.primaryCta.to },
          { label: HERO.secondaryCta.label, to: HERO.secondaryCta.to, variant: "secondary" },
        ]}
      >
        <p className="max-w-2xl border-t border-border pt-5 text-[15px] text-on-ink-muted">
          {HERO.scopeLine}
        </p>
      </Hero>

      <div className="container-x">
        <div className="lg:grid lg:grid-cols-[168px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <nav className="sticky top-28" aria-label="On this page">
              <p className="eyebrow border-b border-border pb-3">Contents</p>
              <ol className="mt-4 space-y-3">
                {INDEX.map((entry, i) => (
                  <li key={entry.id} className="flex items-baseline gap-3">
                    <MonoIndex n={i + 1} />
                    <a
                      href={`#${entry.id}`}
                      className="text-[14px] text-muted transition-colors duration-200 hover:text-fg"
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div>
            <section id="problem" className="section-y">
              <SectionHead title={PROBLEM.heading} />
              <HairlineStack items={PROBLEM.items} strike className="mt-10" />
              <p className="lead mt-8 max-w-2xl">{PROBLEM.closing}</p>
            </section>

            <section id="how" className="section-y">
              <SectionHead title={HOW_IT_WORKS.heading} />
              <div className="mt-10">
                {HOW_IT_WORKS.steps.map((step, i) => (
                  <LedgerRow
                    key={step.key}
                    index={i + 1}
                    title={step.key}
                    body={step.body}
                    last={i === HOW_IT_WORKS.steps.length - 1}
                  />
                ))}
              </div>
              <Link to={HOW_IT_WORKS.link.to} className="btn btn-secondary mt-10">
                {HOW_IT_WORKS.link.label}
              </Link>
            </section>

            <section id="judgement" className="section-y">
              <SectionHead title={SPEED_AND_JUDGEMENT.heading} />
              <p className="lead mt-8 max-w-3xl">{SPEED_AND_JUDGEMENT.body}</p>
              <Link to={SPEED_AND_JUDGEMENT.link.to} className="btn btn-secondary mt-8">
                {SPEED_AND_JUDGEMENT.link.label}
              </Link>
            </section>

            <section id="trust" className="section-y">
              <SectionHead title={TRUST.heading} />
              <HairlineStack items={TRUST.items} className="mt-10" />
              <Link to={TRUST.link.to} className="btn btn-secondary mt-8">
                {TRUST.link.label}
              </Link>
            </section>

            <section id="ways" className="section-y">
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

            <section id="industries" className="section-y">
              <SectionHead title={INDUSTRIES_SECTION.heading} />
              <IndustryChips />
              <Link to={INDUSTRIES_SECTION.to} className="btn btn-secondary mt-10">
                See Industries
              </Link>
            </section>

            <section id="system" className="section-y">
              <SectionHead title={THE_SYSTEM.heading} />
              <SystemDiagram
                sides={THE_SYSTEM.sides}
                centre={THE_SYSTEM.centre}
                caption={THE_SYSTEM.caption}
              />
            </section>
          </div>
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
      <section className="surface-ink section-y">
        <div className="container-x">
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
      </section>

      <VariantPreviewBar current="a1" />
    </div>
  );
}
