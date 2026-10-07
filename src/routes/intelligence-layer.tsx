// ============================================================
// FILE: intelligence-layer.tsx
// PURPOSE: The Intelligence Layer page, read in the adopted "Soft Machine" direction —
//          monochrome neumorphism. An Ink hero and an Ink closing frame four soft sections;
//          three sit on the light `neu-canvas` and "What stays human" on the dark
//          `neu-canvas-dark`. Copy is the v2.0 plain-language edition, section 5.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, @tanstack/react-router,
//          src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Graviyx's AI isn't a chatbot. It handles the repetitive work in procurement and hands anything tricky to a specialist.";
export const Route = createFileRoute("/intelligence-layer")({
  head: () => pageMeta("The Intelligence Layer — AI That Does the Legwork | GRAVIYX", description),
  component: IntelligenceLayer,
});

/**
 * The four jobs. `title`, `action` and `handoff` carry the v2.0 copy and are the fields the
 * page renders. `stage` and `trigger` are left as they were: the array may not be
 * restructured, and v2.0 gives no equivalent for either, so they are no longer rendered.
 */
const functions = [
  {
    title: "1 · It talks to buyers",
    stage: "Stage 01, RFQ Intake",
    trigger: "A buyer enquiry or an incomplete requirement.",
    action:
      "Answers first enquiries, gathers your spec, checks availability and drafts quotes from live pricing.",
    handoff: "it can't confirm something, or the request is unusual.",
  },
  {
    title: "2 · It finds the best route",
    stage: "Stage 02, Review & Shortlist",
    trigger: "A structured RFQ.",
    action:
      "Compares suppliers and prices, checks our internal pricing and partner network, and recommends the best way to fulfil your order.",
    handoff: "a specialist reviews and adjusts the shortlist.",
  },
  {
    title: "3 · It sees demand coming",
    stage: "Stage 03, Quotations & Compare",
    trigger: "Confirmed POs and active enquiries accumulate.",
    action:
      "Combines confirmed orders and open requests into a forecast, so suppliers can prepare and buyers avoid stockouts.",
    handoff: "specialists turn the forecast into buying plans.",
  },
  {
    title: "4 · It flags the unusual",
    stage: "Stage 04, Negotiate & Confirm",
    trigger: "Activity outside standard parameters.",
    action:
      "Watches for odd quantities, special requirements, unusual delivery locations, shortages and price anomalies.",
    handoff: "always. The AI never tries to fix these itself.",
  },
];

/**
 * A section head: a recessed mono index chip, then the heading and optional lead, both
 * inheriting the canvas they sit on. The chip is a `neu-inset` surface, so every section
 * that renders one carries `neu-canvas` or `neu-canvas-dark`.
 */
function SoftHead({ index, heading, lead }: { index: string; heading: string; lead?: string }) {
  return (
    <Reveal from="left" className="max-w-3xl">
      <span className="neu-inset inline-block px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums uppercase">
        {index}
      </span>
      <h2 className="display-lg mt-6">{heading}</h2>
      {lead ? <p className="lead mt-5 text-fg">{lead}</p> : null}
    </Reveal>
  );
}

/** 02 — the rule: where the AI stops and a person takes over. */
function TheRule() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead
          index="02"
          heading="The rule"
          lead="It never guesses on the hard stuff. When something falls outside the normal, it escalates to a person."
        />
      </div>
    </section>
  );
}

/** 03 — the four jobs, each extruded out of the canvas with its human hand-off. */
function Jobs() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="03" heading="Four jobs" />
        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {functions.map((job, i) => (
            <li key={job.title} className="h-full">
              <Reveal
                delay={i * 0.08}
                y={16}
                from={i % 2 === 0 ? "left" : "right"}
                className="neu-flat flex h-full flex-col p-6 md:p-8"
              >
                <h3 className="display-sm text-fg">{job.title}</h3>
                <p className="body-copy mt-4 text-[15px] text-fg">{job.action}</p>
                <p className="body-copy mt-4 text-[15px] text-fg">
                  <strong className="text-fg">A person steps in when:</strong> {job.handoff}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 04 — what stays human. The page's single dark band. */
function WhatStaysHuman() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SoftHead
          index="04"
          heading="What stays human"
          lead="Negotiation. Escalation. First-time and unusual buys. Accountability. The AI drafts the PO. A person signs it."
        />
      </div>
    </section>
  );
}

/** 05 — what the layer learns from. Carries the link through to the warehousing page, which
 *  is the topically adjacent one: warehouse stock is one of the signals this layer learns from. */
function WhatItLearnsFrom() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead
          index="05"
          heading="What it learns from"
          lead="Supplier scorecards, demand signals, warehouse stock and the evidence on each supplier's record. Every deal makes the next one better."
        />
        <Reveal from="right" className="mt-10">
          <Link
            to="/fulfillment-warehousing"
            className="neu-control inline-flex items-center px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] text-fg uppercase"
          >
            Fulfilment &amp; Warehousing
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** The closing Ink band, flat for the same reason as the hero. */
function Closing() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <Reveal from="left" className="max-w-3xl">
          <h2 className="display-md text-fg">See where software stops and a person starts.</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/for-buyers" className="btn btn-on-ink">
              Marketplace
            </Link>
            <Link to="/post-a-requirement" className="btn btn-ghost-on-ink">
              Post a Requirement
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The Intelligence Layer page: Ink hero, four soft sections, Ink closing. */
function IntelligenceLayer() {
  return (
    <>
      <Hero
        compact
        tone="ink"
        eyebrow="The Intelligence Layer"
        headline="AI that does the legwork. People who make the call."
        subhead="Not a chatbot. Graviyx's AI sits inside the buying process, handling the repetitive work and handing anything tricky to a specialist."
      />
      <TheRule />
      <Jobs />
      <WhatStaysHuman />
      <WhatItLearnsFrom />
      <Closing />
    </>
  );
}
