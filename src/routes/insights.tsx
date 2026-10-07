// ============================================================
// FILE: insights.tsx
// PURPOSE: The Insights route. What Graviyx is building next, and the articles empty state,
//          read in the adopted "Soft Machine" material: the two roadmap cards extruded out
//          of a dark canvas, the articles empty state set on the light one.
// CONNECTS TO: @/components/site/{Hero,SectionHead,EmptyState,Reveal}, @/lib/seo,
//          src/styles.css (the neu-* layer), @tanstack/react-router.
// ============================================================
//
// NEUMORPHIC CONTRACT: each section below that renders a `neu-*` surface carries
// `neu-canvas-dark` or `neu-canvas`, so every surface sits on a canvas of exactly its own
// tone. No Tailwind `shadow-*` is used. The COMING SOON badge is a factual status and is
// left exactly as it was; it sits on the dark canvas, where `text-meta` resolves to
// on-ink-meta rather than the steel-30 that is forbidden on a light neumorphic surface.

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { SectionHead } from "@/components/site/Section";
import { EmptyState } from "@/components/site/EmptyState";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Perspective on industrial procurement, and what Graviyx is building next: Build-to-Spec and Semi-Finished Goods, both coming soon.";
export const Route = createFileRoute("/insights")({
  head: () => pageMeta("Insights | GRAVIYX", description),
  component: Insights,
});

const ROADMAP = [
  {
    title: "Build-to-Spec (Raw Materials)",
    body: "For custom-engineered and built-to-specification components, Graviyx is designed to offer an end-to-end manufacturing and procurement service. It begins with reading a buyer's drawings and engineering specifications, translating them into a structured RFQ and onboarding suitable global manufacturing partners. Graviyx then coordinates production planning, machining, fabrication, finishing and inspection, and warehouses finished components to reduce lead-time risk. The aim is an extension of the buyer's own procurement and supply chain team.",
  },
  {
    title: "Semi-Finished Goods",
    body: "Standard sub-assemblies and processed inputs, matched to a buyer's specification. Vendors are verified for tolerance and traceability. The platform's structured workflow carries more of the day-to-day coordination, while specialists guide qualification against tolerance, material or compliance requirements.",
  },
];

/** The roadmap band on the dark canvas: each card extruded out of the dark ground. */
function WhatNext() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SectionHead eyebrow="What's next" title="In build, not yet live." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {ROADMAP.map((card, index) => (
            <Reveal
              key={card.title}
              delay={index * 0.1}
              className="neu-raised flex h-full flex-col p-6 md:p-8"
            >
              <span className="eyebrow mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-meta">
                <span className="mark-dot pulse-dot" />
                COMING SOON — NOT YET LIVE
              </span>
              <h3 className="display-sm text-fg">{card.title}</h3>
              <p className="body-copy mt-3 flex-1 text-[16px] text-fg">{card.body}</p>
              <p className="mt-6 text-sm text-muted">
                Not yet available for RFQs. Questions?{" "}
                <Link to="/contact" className="text-fg underline-offset-4 hover:underline">
                  Contact
                </Link>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The articles band on the light canvas: the empty state, set into the canvas. */
function Articles() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SectionHead eyebrow="Articles" title="Field notes." />
        <div className="mt-12">
          <EmptyState
            title="New content is on the way."
            body="Articles will appear here as they are published."
          />
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <>
      <Hero
        eyebrow="Insights"
        headline="Insights"
        subhead="Perspective on industrial procurement, and a look at what Graviyx is building next."
        compact
      />
      <WhatNext />
      <Articles />
    </>
  );
}
