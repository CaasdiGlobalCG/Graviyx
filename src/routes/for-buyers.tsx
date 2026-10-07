// ============================================================
// FILE: for-buyers.tsx
// PURPOSE: The For Buyers page, read in the adopted "Soft Machine" direction — monochrome
//          neumorphism. An Ink hero and an Ink closing frame four soft sections; three sit
//          on the light `neu-canvas` and "A named specialist on your account" on the dark
//          `neu-canvas-dark`. Copy is the v2.0 plain-language edition, section 2.
// CONNECTS TO: @/components/site/{Hero,Reveal,PricingLogic}, @/lib/seo,
//          @tanstack/react-router, src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { PricingLogic } from "@/components/site/PricingLogic";
import { pageMeta } from "@/lib/seo";

const description =
  "Source from verified suppliers, compare quotes side by side and follow every order to delivery, with a named specialist on your account.";
export const Route = createFileRoute("/for-buyers")({
  head: () =>
    pageMeta("For Buyers — Compare Verified Quotes, Track Every Order | GRAVIYX", description),
  component: ForBuyers,
});

/** The five "What you get" cards. */
const BENEFITS = [
  {
    title: "Faster sourcing",
    body: "Clear requests and AI shortlisting get you to comparable quotes fast. No more weeks of back and forth.",
  },
  {
    title: "Suppliers you can trust",
    body: "Every supplier is checked before they quote: company standing, capability and compliance documents. You choose from a verified network, not a directory.",
  },
  {
    title: "Prices you can see",
    body: "Every quote lines up side by side: price, lead time, compliance evidence. A specialist negotiates the lines that look off.",
  },
  {
    title: "Know where your order is",
    body: "Pricing, stock and shipment status, live. You and the supplier see the same thing.",
  },
  {
    title: "Spend you can explain",
    body: "Every request, quote, PO and delivery is logged. Approval levels and spend limits are built in, so audits are simple.",
  },
];

/** The seven stages of "One path, from request to delivery." */
const STAGES = [
  { name: "Request", body: "You send your spec. Our AI turns it into a clear request." },
  { name: "Shortlist", body: "AI picks suitable verified suppliers. A specialist checks the list." },
  { name: "Quotes", body: "Suppliers quote. You see them side by side, with odd ones flagged." },
  { name: "Negotiation", body: "A specialist negotiates. You approve the final quote." },
  { name: "Order", body: "The purchase order is raised and signed in the platform." },
  { name: "Delivery", body: "Track dispatch and delivery in one shared view." },
  { name: "Record", body: "The supplier's scorecard updates. Your next request is pre-filled." },
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

/** 02 — the five cards, each extruded out of the canvas. */
function WhatYouGet() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="02" heading="What you get" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((card, i) => (
            <li key={card.title} className="h-full">
              <Reveal
                delay={i * 0.08}
                y={16}
                from={i % 2 === 0 ? "left" : "right"}
                className="neu-flat flex h-full flex-col p-6 md:p-7"
              >
                <h3 className="display-sm text-fg">{card.title}</h3>
                <p className="body-copy mt-3 text-[15px] text-fg">{card.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 03 — the named specialist. The page's single dark band. */
function NamedSpecialist() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SoftHead
          index="03"
          heading="Not a ticket queue. A person."
          lead="Your specialist knows your category and is easy to reach. They are accountable for the outcome, not just the answer."
        />
      </div>
    </section>
  );
}

/** 04 — the seven stages, each extruded out of the canvas as a row. */
function Stages() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="04" heading="One path, from request to delivery." />
        <ol className="mt-12 grid gap-6">
          {STAGES.map((stage, i) => (
            <li key={stage.name}>
              <Reveal
                delay={i * 0.06}
                from={i % 2 === 0 ? "left" : "right"}
                className="neu-flat flex items-baseline gap-4 px-5 py-5 md:gap-6 md:px-7 md:py-6"
              >
                <span className="font-mono text-[10px] leading-none tracking-[0.22em] text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="display-sm text-fg">{stage.name}</h3>
                  <p className="body-copy mt-1 text-[15px] text-fg">{stage.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 05 — pricing: the three models, rendered through the existing PricingLogic. */
function Pricing() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead
          index="05"
          heading="Simple, and tied to results."
          lead="Buyers work on one of three models: pay per deal, category-based pricing, or a subscription for high volume. Terms are agreed with your specialist."
        />
        <Reveal from="left">
          <PricingLogic
            paths={[
              { name: "Pay per deal", body: "Priced to the transaction." },
              { name: "Category-based pricing", body: "Priced to the category." },
              {
                name: "Subscription for high volume",
                body: "For buyers with high transaction volume.",
              },
            ]}
          />
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
          <h2 className="display-md text-fg">Stop chasing. Start comparing.</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/for-buyers" className="btn btn-on-ink">
              Marketplace
            </Link>
            <Link to="/post-a-requirement" className="btn btn-ghost-on-ink">
              Post a requirement
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The For Buyers page: Ink hero, four soft sections, Ink closing. */
function ForBuyers() {
  return (
    <>
      <Hero
        compact
        tone="ink"
        eyebrow="For buyers"
        headline="Buy with control, not guesswork."
        subhead="Verified suppliers. Quotes you can actually compare. A record of every step."
        actions={[
          { label: "Start Sourcing", to: "/for-buyers" },
          { label: "Post a requirement", to: "/post-a-requirement", variant: "secondary" },
        ]}
      />
      <WhatYouGet />
      <NamedSpecialist />
      <Stages />
      <Pricing />
      <Closing />
    </>
  );
}
