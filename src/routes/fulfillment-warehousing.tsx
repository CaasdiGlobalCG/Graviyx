import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { CtaBar } from "@/components/site/CtaBar";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "A master, state and district warehouse architecture that gives Graviyx control over lead time, stock positioning and last-mile delivery.";
export const Route = createFileRoute("/fulfillment-warehousing")({
  head: () => pageMeta("Fulfilment & Warehousing — A Three-Tier Network | GRAVIYX", description),
  component: Fulfillment,
});

const TIERS = [
  {
    title: "Tier 1 · Master Warehouse",
    tag: "company-owned",
    body: "The central hub. Holds strategic stock across key categories and is the primary consolidation point for manufacturing outputs and longer-term inventory. Feeds the state tier through planned transfer orders and replenishment cycles, not ad hoc shipments.",
  },
  {
    title: "Tier 2 · State Warehouses",
    tag: "company-owned",
    body: "Regional buffer stock, positioned closer to major demand centres. Responsible for state-level fulfilment, shorter lead times than a single national hub, and support for local procurement programmes. Each supplies multiple district warehouses.",
  },
  {
    title: "Tier 3 · District Warehouses",
    tag: "franchise-owned",
    body: "Last-mile industrial delivery, rapid response to local buyers and micro-inventory management at district or city level. Replenished from the state tier and run under Graviyx's operating procedures.",
  },
];

const DATA_LOOP = [
  {
    title: "Stock positions → demand forecasting",
    body: "Shows where inventory already exists and where new production or transfer orders are needed.",
  },
  {
    title: "Stockout and lead-time risk → exception management",
    body: "Escalated through the same pathway as a vendor-side exception, so a specialist can step in before the buyer feels a shortfall.",
  },
  {
    title: "Warehouse data → planning recommendations",
    body: "Closes the loop between physical inventory and the guidance given to buyers and suppliers.",
  },
];

function Fulfillment() {
  return (
    <>
      <Hero
        eyebrow="Fulfilment & warehousing"
        headline="Delivery reliability, built into the network."
        subhead="Graviyx does not leave fulfilment to whichever vendor happens to ship on time. A three-tier warehouse architecture gives control over lead time, stock positioning and delivery."
        compact
      />

      <Section tone="surface">
        <SectionHead eyebrow="Three tiers" title="Master, state, district." />
        <div className="mt-12 space-y-3">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.title}
              className="panel flex gap-5 p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.14 }}
            >
              <span className="accent-dot mt-2 shrink-0" />
              <div>
                <h3 className="display-sm text-fg">
                  {tier.title} <span className="text-meta">({tier.tag})</span>
                </h3>
                <p className="body-copy mt-2 text-[16px]">{tier.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="The data loop" title="How warehouse data feeds the AI." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {DATA_LOOP.map((item, index) => (
            <motion.div
              key={item.title}
              className="panel p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <h3 className="display-sm text-fg">{item.title}</h3>
              <p className="body-copy mt-2 text-[16px]">{item.body}</p>
            </motion.div>
          ))}
        </div>
        <Reveal className="mt-8">
          <Link to="/intelligence-layer" className="btn btn-secondary">
            See the Intelligence Layer →
          </Link>
        </Reveal>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Shipment visibility" title="One shared view of status." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            Once a PO is issued, specialists and the platform manage milestones, estimated delivery
            times and exceptions together. Buyers and vendors work from one shared view of status. A
            delay, a quality concern or a vendor capacity constraint is surfaced through the same
            exception pathway, so it is handled before it reaches the buyer's operation.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="Governance" title="Franchise ownership does not mean lost standards." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            Operating procedures, service-level agreements, compliance requirements and audit
            obligations are defined centrally and enforced through reporting and scorecarding.
            Performance is measured on delivery SLA adherence and stock accuracy and logged in the
            same record as vendor performance. Graviyx retains control of the data, orchestration
            and scorecards for every district warehouse.
          </p>
        </Reveal>
      </Section>

      <CtaBar
        title="Delivery you can plan around."
        actions={[
          { label: "Marketplace", to: "/for-buyers" },
          { label: "Interested in operating a district warehouse?", to: "/partner-with-us", variant: "secondary" },
        ]}
      />
    </>
  );
}
