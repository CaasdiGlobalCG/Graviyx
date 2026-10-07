import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { PillarGrid } from "@/components/site/PillarCard";
import { EmptyState } from "@/components/site/EmptyState";
import { pageMeta } from "@/lib/seo";

const description =
  "Graviyx pairs AI with a named team of procurement specialists. See how the team is organised and get in touch.";
export const Route = createFileRoute("/careers")({
  head: () => pageMeta("Careers | GRAVIYX", description),
  component: Careers,
});

const OWNS = [
  {
    title: "Client guidance",
    body: "Walking buyers through spec, category and vendor choices, especially first-time or unusual buys.",
  },
  {
    title: "Negotiation and escalation",
    body: "Price, lead-time and commercial exceptions the AI flags but does not decide.",
  },
  {
    title: "Vendor partnership",
    body: "Onboarding, coaching and holding vendors to scorecard commitments.",
  },
  {
    title: "Planning and forecasting",
    body: "Turning demand signals into buying calendars and stocking recommendations.",
  },
];

const GROUPS = [
  {
    title: "AI & Engineering",
    body: "Builds and maintains the platform, the intelligence layer and the system of record.",
  },
  {
    title: "Procurement Specialists",
    body: "Organised by category. Negotiate, coordinate vendors, forecast demand and manage supply risk.",
  },
  {
    title: "Vendor Success & Verification",
    body: "Onboard, verify and maintain the standing of suppliers on the network.",
  },
  {
    title: "Logistics & Warehouse Operations",
    body: "Run the master, state and district tiers, including franchise relationships.",
  },
];

function Careers() {
  return (
    <>
      <Hero
        eyebrow="Careers"
        headline="Judgement at scale needs people who can exercise it."
        subhead="The AI moves the deal. The specialist owns the outcome: negotiation, escalation, unusual requirements and accountability. Graviyx's edge depends on that team as much as on the software."
        compact
      />

      <Section tone="surface">
        <SectionHead eyebrow="The role" title="What a specialist owns." />
        <PillarGrid pillars={OWNS} />
      </Section>

      <Section>
        <SectionHead eyebrow="The team" title="Four functional groups." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {GROUPS.map((g, index) => (
            <motion.div
              key={g.title}
              className="panel p-6"
              initial={{ y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="mark-dot mb-4 block" />
              <h3 className="display-sm text-fg">{g.title}</h3>
              <p className="body-copy mt-2 text-[16px]">{g.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Open roles" title="Current openings." />
        <div className="mt-12">
          <EmptyState
            title="No open roles right now."
            body="Tell us why you'd be a fit anyway."
            actionLabel="Get in touch"
            actionTo="/contact"
          />
        </div>
      </Section>
    </>
  );
}
