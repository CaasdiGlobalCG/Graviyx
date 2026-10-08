// ============================================================
// FILE: trust.tsx
// PURPOSE: The Trust page, read in the adopted "Soft Machine" direction â€” monochrome
//          neumorphism. An Ink hero and an Ink closing frame five soft sections; four sit on
//          the light `neu-canvas` and "Trust that compounds" on the dark `neu-canvas-dark`.
//          Copy is the v2.0 plain-language edition, section 7.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, @tanstack/react-router,
//          src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/trust")({
  component: Trust,
});

const LAYERS = [
  {
    title: "Verified up front",
    body: "We check company standing, capability and compliance documents before onboarding. Where physical capability affects your risk, we check the site too.",
  },
  {
    title: "Scored every deal",
    body: "On-time delivery, quality, returns and disputes update after every order. A supplier's standing reflects how they perform now.",
  },
  {
    title: "Proof, not promises",
    body: "Test reports, certificates and shipment records sit on each supplier's profile. The AI and our specialists use them when shortlisting and negotiating.",
  },
  {
    title: "Controls for your team",
    body: "Approval levels, spend limits and audit-ready records are built into every PO.",
  },
];

const COMPARISON: [string, string, string][] = [
  ["Finding suppliers", "Referrals and guesswork", "A verified network"],
  ["Quotes", "Scattered emails", "Side by side"],
  ["Decisions", "Gut feel and phone calls", "AI-flagged, specialist-led"],
  ["Records", "Nothing logged", "Every step recorded"],
  ["Supplier performance", "Hearsay", "Scores based on evidence"],
  ["Planning", "Reactive", "AI-led forecasts"],
  ["Trust", "Personal relationships", "Evidence that builds over time"],
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

function Trust() {
  return (
    <>
      <Hero
        eyebrow="Trust"
        headline="Trust you can check."
        subhead="Suppliers are verified before they quote, scored after every deal and backed by evidence you can see."
        compact
        tone="ink"
      />

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="02" heading="Four layers" />
          <ul className="mt-12 space-y-3">
            {LAYERS.map((layer, i) => (
              <Reveal
                key={layer.title}
                delay={i * 0.08}
                y={16}
                from={i % 2 === 0 ? "left" : "right"}
                className="neu-raised flex gap-5 p-6 md:p-8"
              >
                <span aria-hidden="true" className="mark-dot mt-2 shrink-0" />
                <div className="min-w-0">
                  <h3 className="display-sm text-fg">{layer.title}</h3>
                  <p className="body-copy mt-2 text-[16px] text-fg">{layer.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <SoftHead
            index="03"
            heading="Most buying starts from zero. Graviyx doesn't."
            lead="Every deal adds to the record: more suppliers, more categories, more detail. That history can't be copied overnight."
          />
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="04" heading="The old way vs Graviyx" />
          <Reveal from="right" className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow py-4 pr-6" />
                  <th className="eyebrow py-4 pr-6">The old way</th>
                  <th className="eyebrow py-4">Graviyx</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([dim, old, grav]) => (
                  <tr key={dim} className="border-b border-border">
                    <td className="py-4 pr-6 text-[15px] font-medium text-fg">{dim}</td>
                    <td className="py-4 pr-6 text-[15px] text-muted">{old}</td>
                    <td className="py-4 text-[15px] text-fg">{grav}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead
            index="05"
            heading="Why it's hard to copy"
            lead="Software alone can't vouch for a supplier. Brokers can't scale or leave a record. Marketplaces list sellers but don't verify them or deliver. Graviyx brings verified suppliers, AI, specialists and warehouses together in one record."
          />
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="06" heading="Customer stories" />
          <Reveal from="right" className="neu-inset mt-12 px-6 py-14 text-center md:py-20">
            <span aria-hidden="true" className="mark-dot pulse-dot mx-auto mb-6 block" />
            <p className="body-copy mx-auto max-w-xl text-[16px] text-fg">
              Customer stories will appear here once verified deals are complete and customers agree
              to share them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-ink section-y relative overflow-hidden">
        <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <div className="flex flex-wrap gap-3">
            <Link to="/for-buyers" className="btn btn-on-ink">
              Marketplace
            </Link>
            <Link to="/how-it-works" className="btn btn-ghost-on-ink">
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
