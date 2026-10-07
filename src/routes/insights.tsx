import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
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

function Insights() {
  return (
    <>
      <Hero
        eyebrow="Insights"
        headline="Insights"
        subhead="Perspective on industrial procurement, and a look at what Graviyx is building next."
        compact
      />

      <Section tone="surface">
        <SectionHead eyebrow="What's next" title="In build, not yet live." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {ROADMAP.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.1}>
              <div className="panel flex h-full flex-col p-6 md:p-8">
                <span className="eyebrow mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-meta">
                  <span className="mark-dot pulse-dot" />
                  COMING SOON — NOT YET LIVE
                </span>
                <h3 className="display-sm text-fg">{card.title}</h3>
                <p className="body-copy mt-3 flex-1 text-[16px]">{card.body}</p>
                <p className="mt-6 text-sm text-meta">
                  Not yet available for RFQs. Questions?{" "}
                  <Link to="/contact" className="text-ink underline-offset-4 hover:underline">
                    Contact
                  </Link>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Articles" title="Field notes." />
        <div className="mt-12">
          <EmptyState title="New content is on the way." body="Articles will appear here as they are published." />
        </div>
      </Section>
    </>
  );
}
