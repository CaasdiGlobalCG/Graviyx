import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { PillarGrid } from "@/components/site/PillarCard";
import { EmptyState } from "@/components/site/EmptyState";
import { CtaBar } from "@/components/site/CtaBar";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Vendor verification, continuous scorecards, evidence records and buyer-side governance. How trust is checked, updated and compounded on Graviyx.";
export const Route = createFileRoute("/trust")({
  head: () => pageMeta("Trust — Verification as a Layer, Not a Badge | GRAVIYX", description),
  component: Trust,
});

const LAYERS = [
  {
    title: "Layer 01 · Vendor verification",
    body: "Company standing, demonstrated capability and compliance documents are checked before onboarding. Site verification and capacity assessment apply where physical capability affects buyer risk.",
  },
  {
    title: "Layer 02 · Continuous scorecard",
    body: "On-time performance, quality, returns and dispute rate, updated deal by deal. A vendor's standing reflects current performance, not a one-time approval.",
  },
  {
    title: "Layer 03 · Evidence, not claims",
    body: "Test reports, certificates and past-shipment records are attached to the vendor record. They inform the AI's shortlisting and a specialist's negotiating position.",
  },
  {
    title: "Layer 04 · Buyer-side governance",
    body: "Approver hierarchies, spend caps and audit-ready trails are built into every PO. Trust runs in both directions: platform to vendor, and platform to buying organisation.",
  },
];

const COMPARISON: [string, string, string][] = [
  ["Vendor discovery", "Referrals and guesswork", "Verified network with continuous scorecards"],
  ["Quotations", "Scattered email threads", "Normalised and compared side by side"],
  ["Decisions", "Gut instinct and phone calls", "AI-flagged, specialist-owned"],
  ["Record keeping", "Nothing logged", "Every event captured on the record"],
  ["Vendor performance", "Anecdotal", "Continuous, evidence-based scorecard"],
  ["Demand planning", "Reactive", "AI-generated demand signals"],
  ["Trust", "Personal relationships", "Evidence-based and compounding"],
];

function Trust() {
  return (
    <>
      <Hero
        eyebrow="Trust"
        headline="Verification is a layer, not a badge."
        subhead="Trust on Graviyx is checked before a supplier quotes, updated after every deal and evidenced in the record."
        compact
      />

      <Section tone="surface">
        <SectionHead eyebrow="The four trust layers" title="Trust has a structure. This is ours." />
        <div className="mt-12 space-y-3">
          {LAYERS.map((layer, index) => (
            <motion.div
              key={layer.title}
              className="panel flex gap-5 p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <span className="mark-dot mt-2 shrink-0" />
              <div>
                <h3 className="display-sm text-fg">{layer.title}</h3>
                <p className="body-copy mt-2 text-[16px]">{layer.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="How trust compounds"
          title="Most procurement starts from zero. Graviyx does not."
        />
        <Reveal className="mt-8 max-w-3xl space-y-6">
          <p className="body-copy text-[17px]">
            Each completed deal updates the vendor's scorecard, evidence record and demand signal.
            Two things grow together. <strong className="text-fg">Coverage widens:</strong> more
            categories, geographies and deal types gain a verified record.{" "}
            <strong className="text-fg">Depth increases:</strong> the quality and granularity of
            trust data for any vendor or category improves. That record cannot be shortcut.
          </p>
        </Reveal>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="The contrast" title="Traditional procurement vs Graviyx." />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="eyebrow py-4 pr-6">Dimension</th>
                <th className="eyebrow py-4 pr-6">Traditional procurement</th>
                <th className="eyebrow py-4">Graviyx</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([dim, trad, grav], index) => (
                <motion.tr
                  key={dim}
                  className="border-b border-border"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                >
                  <td className="py-4 pr-6 text-[15px] font-medium text-fg">{dim}</td>
                  <td className="py-4 pr-6 text-[15px] text-meta">{trad}</td>
                  <td className="py-4 text-[15px] text-muted">{grav}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Structural differentiation" title="Four elements, one system of record." />
        <Reveal className="mt-8 max-w-3xl space-y-6">
          <p className="body-copy text-[17px]">
            Pure software tools digitise workflow but cannot supply vendor trust or negotiating
            judgement. Human-broker models supply judgement and relationships but do not scale or
            leave an auditable record. Generic marketplaces supply discovery but lack continuous
            verification and physical fulfilment infrastructure.
          </p>
          <p className="body-copy text-[17px]">
            Graviyx combines a verified network, an AI decision engine, a standing team of
            procurement specialists and a multi-tier warehouse network under one record. Each
            element is worth more because of the others, which is why the combination is hard to
            replicate piecemeal.
          </p>
        </Reveal>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Customer stories" title="Reserved." />
        <div className="mt-12">
          <EmptyState
            title="No customer stories published yet."
            body="Customer stories will appear here once verified deals are complete and customers have agreed to share them. None are published yet."
          />
        </div>
      </Section>

      <CtaBar
        title="Trust you can inspect."
        actions={[
          { label: "Marketplace", to: "/for-buyers" },
          { label: "See verification in the flow →", to: "/how-it-works", variant: "secondary" },
        ]}
      />
    </>
  );
}
