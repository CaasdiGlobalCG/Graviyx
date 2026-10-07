// ============================================================
// FILE: partner-with-us.tsx
// PURPOSE: The Partner With Us page, read in the adopted "Soft Machine" direction —
//          monochrome neumorphism. An Ink hero and an Ink closing frame four soft sections;
//          three sit on the light `neu-canvas` and "How we measure performance" on the dark
//          `neu-canvas-dark`. Copy is the v2.0 plain-language edition, section 12.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, @tanstack/react-router,
//          src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Run a Graviyx district warehouse: last-mile industrial delivery, demand from the platform and clear performance standards.";
export const Route = createFileRoute("/partner-with-us")({
  head: () => pageMeta("Partner With Us — District Warehouse Franchise | GRAVIYX", description),
  component: Partner,
});

const RELATIONSHIP: [string, string][] = [
  ["The Graviyx brand", "Investment in, and operation of, local delivery infrastructure"],
  ["Demand from the platform", "Following our procedures and requirements"],
  ["Procedures and service levels", "Regular reporting"],
  ["Data and scorecard visibility", "Meeting service levels and audits"],
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

function Partner() {
  return (
    <>
      <Hero
        eyebrow="Partner with us"
        headline="Run a Graviyx district warehouse."
        subhead="Last-mile industrial delivery, franchise-owned and run to Graviyx standards."
        compact
        tone="ink"
      />

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead
            index="02"
            heading="The role"
            lead="District warehouses sit at the base of our three-tier network. They handle last-mile delivery, respond fast to local buyers and manage small local stock. They're restocked from the state warehouse above."
          />
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="03" heading="Two-way commitment" />
          <Reveal from="right" className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow py-4 pr-6">What Graviyx provides</th>
                  <th className="eyebrow py-4">What we expect from you</th>
                </tr>
              </thead>
              <tbody>
                {RELATIONSHIP.map(([gives, expects]) => (
                  <tr key={gives} className="border-b border-border">
                    <td className="py-4 pr-6 text-[15px] text-fg">{gives}</td>
                    <td className="py-4 text-[15px] text-muted">{expects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <SoftHead
            index="04"
            heading="How we measure performance"
            lead="On-time delivery and stock accuracy, recorded alongside supplier performance."
          />
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead
            index="05"
            heading="Franchise economics"
            lead="Franchise economics apply at the district tier. You invest in and run local infrastructure, and Graviyx earns from the franchise relationship. Terms are discussed directly. No figures are published here."
          />
        </div>
      </section>

      <section className="surface-ink section-y relative overflow-hidden">
        <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-on-ink">
              Discuss a warehouse franchise
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
