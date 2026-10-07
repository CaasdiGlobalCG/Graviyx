import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { CtaBar } from "@/components/site/CtaBar";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Operate a Graviyx district warehouse: last-mile industrial delivery under Graviyx standards, with demand routing and full performance visibility.";
export const Route = createFileRoute("/partner-with-us")({
  head: () => pageMeta("Partner With Us — District Warehouse Franchise | GRAVIYX", description),
  component: Partner,
});

const RELATIONSHIP: [string, string][] = [
  ["The Graviyx brand", "Investment in and operation of local last-mile infrastructure"],
  ["Demand routing from the platform", "Compliance with operating procedures and requirements"],
  ["Standard operating procedures and service-level agreements", "Reporting to Graviyx"],
  ["Data, orchestration and scorecard visibility", "Service-level adherence and audit obligations"],
];

function Partner() {
  return (
    <>
      <Hero
        eyebrow="Partner with us"
        headline="Operate a Graviyx district warehouse."
        subhead="Last-mile industrial delivery, franchise-owned and run to Graviyx standards."
        compact
      />

      <Section tone="surface">
        <SectionHead eyebrow="The opportunity" title="The base of the three-tier network." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            District warehouses sit at the base of Graviyx's three-tier network. They focus on
            last-mile industrial delivery, rapid response to local buyers and micro-inventory
            management at district or city level. They are replenished from the state tier above.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="Give and take" title="A two-way operating relationship." />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="eyebrow py-4 pr-6">What Graviyx provides</th>
                <th className="eyebrow py-4">What is expected of the franchisee</th>
              </tr>
            </thead>
            <tbody>
              {RELATIONSHIP.map(([gives, expects], index) => (
                <motion.tr
                  key={gives}
                  className="border-b border-border"
                  initial={{ y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <td className="py-4 pr-6 text-[15px] text-fg">{gives}</td>
                  <td className="py-4 text-[15px] text-muted">{expects}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Accountability" title="How performance is measured." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            Delivery SLA adherence and stock accuracy, logged in the same continuously updated
            record that governs vendor performance.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="Franchise economics" title="Terms, discussed directly." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            Franchise economics apply at the district tier. The franchisee invests in and operates
            the local infrastructure. Graviyx earns from the franchise relationship. Terms are
            discussed directly. No figures are published here.
          </p>
        </Reveal>
      </Section>

      <CtaBar
        title="Discuss a warehouse franchise."
        actions={[{ label: "Discuss a warehouse franchise", to: "/contact" }]}
      />
    </>
  );
}
