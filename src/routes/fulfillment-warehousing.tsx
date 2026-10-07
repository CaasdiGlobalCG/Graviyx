// ============================================================
// FILE: fulfillment-warehousing.tsx
// PURPOSE: The Fulfilment & Warehousing page, read in the adopted "Soft Machine" direction —
//          monochrome neumorphism. An Ink hero and an Ink closing frame four soft sections;
//          three sit on the light `neu-canvas` and "See every shipment" on the dark
//          `neu-canvas-dark`. Copy is the v2.0 plain-language edition, section 6.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, @tanstack/react-router,
//          src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "A three-tier warehouse network that puts stock closer to buyers, for shorter and more predictable lead times.";
export const Route = createFileRoute("/fulfillment-warehousing")({
  head: () =>
    pageMeta("Fulfilment & Warehousing — Delivery You Can Plan Around | GRAVIYX", description),
  component: Fulfillment,
});

const TIERS = [
  {
    title: "Master warehouse",
    tag: "owned by Graviyx",
    body: "The central hub. Holds strategic stock and restocks the state warehouses on a plan, not on a scramble.",
  },
  {
    title: "State warehouses",
    tag: "owned by Graviyx",
    body: "Regional stock, closer to where demand is. They give shorter lead times than one national hub and supply the district warehouses.",
  },
  {
    title: "District warehouses",
    tag: "franchise-owned",
    body: "Last-mile delivery, fast local response and small local stock, run to Graviyx standards.",
  },
];

const DATA_LOOP = [
  { title: "Stock levels", body: "feed the forecasts." },
  { title: "Stockout or delay risk", body: "alerts a specialist before you feel it." },
  { title: "Warehouse data", body: "sharpens the advice we give buyers and suppliers." },
];

/**
 * A section head: a recessed mono index chip, then the heading and optional lead, both
 * inheriting the canvas they sit on. The chip is a `neu-inset` surface, so every section
 * that renders one carries `neu-canvas` or `neu-canvas-dark`.
 */
function SoftHead({ index, heading, lead }: { index: string; heading: string; lead?: string }) {
  return (
    <Reveal className="max-w-3xl">
      <span className="neu-inset inline-block px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums uppercase">
        {index}
      </span>
      <h2 className="display-lg mt-6">{heading}</h2>
      {lead ? <p className="lead mt-5 text-fg">{lead}</p> : null}
    </Reveal>
  );
}

/** A neumorphic control: extruded at rest, pressed into the canvas on :active. */
function NeuButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="neu-raised inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] text-fg uppercase transition-transform duration-150 ease-out hover:-translate-y-px active:neu-pressed active:translate-y-px active:scale-[0.97] active:font-semibold focus-visible:outline-offset-2 focus-visible:[outline:2px_solid_var(--fg)]"
    >
      {children}
    </Link>
  );
}

function Fulfillment() {
  return (
    <>
      <Hero
        eyebrow="Fulfilment & warehousing"
        headline="Delivery you can plan around."
        subhead="Graviyx doesn't leave delivery to chance. A three-tier warehouse network puts stock closer to you, so lead times are shorter and more predictable."
        compact
        tone="ink"
      />

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="02" heading="Three tiers" />
          <ul className="mt-12 space-y-3">
            {TIERS.map((tier, i) => (
              <Reveal
                key={tier.title}
                delay={i * 0.1}
                y={16}
                className="neu-raised flex gap-5 p-6 md:p-8"
              >
                <span aria-hidden="true" className="mark-dot mt-2 shrink-0" />
                <div className="min-w-0">
                  <h3 className="display-sm text-fg">
                    {tier.title} <span className="text-muted">({tier.tag})</span>
                  </h3>
                  <p className="body-copy mt-2 text-[16px] text-fg">{tier.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="03" heading="Warehouses feed the AI" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {DATA_LOOP.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} y={14} className="neu-flat p-6">
                <span aria-hidden="true" className="mark-dot mb-5 block" />
                <p className="body-copy text-[16px] text-fg">
                  <strong className="text-fg">{item.title}</strong> {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <NeuButton to="/intelligence-layer">See the Intelligence Layer</NeuButton>
          </Reveal>
        </div>
      </section>

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <SoftHead
            index="04"
            heading="See every shipment"
            lead="Once an order is placed, you and the supplier share one view of status. Delays and quality issues are flagged early, so they're handled before they reach your operation."
          />
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead
            index="05"
            heading="Franchise doesn't mean looser"
            lead="Every district warehouse runs to Graviyx procedures and service levels. Performance is measured on on-time delivery and stock accuracy. Graviyx keeps control of the data and the scorecards."
          />
        </div>
      </section>

      <section className="surface-ink section-y relative overflow-hidden">
        <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <div className="flex flex-wrap gap-3">
            <Link to="/for-buyers" className="btn btn-on-ink">
              Marketplace
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-on-ink-muted">
            <Link to="/partner-with-us" className="underline-offset-4 hover:underline">
              Interested in running a district warehouse?
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
