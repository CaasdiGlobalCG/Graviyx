import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { IndustryChips } from "@/components/site/IndustryChips";
import { CtaBar } from "@/components/site/CtaBar";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Graviyx serves buyers across manufacturing, engineering, construction, oil and gas, electrical, automotive, healthcare supplies, FMCG and packaging.";
export const Route = createFileRoute("/industries")({
  head: () => pageMeta("Industries — Sectors Served | GRAVIYX", description),
  component: Industries,
});

function Industries() {
  return (
    <>
      <Hero
        eyebrow="Industries"
        headline="Built for the sectors that run on physical supply."
        subhead="Graviyx serves buyers who move materials, equipment and supply at scale."
        compact
      />

      <Section tone="surface">
        <SectionHead eyebrow="Coverage" title="Nine sectors." />
        <IndustryChips size="lg" />
        <Reveal className="mt-10">
          <p className="body-copy text-[16px]">
            Not sure your sector fits?{" "}
            <Link to="/post-a-requirement" className="text-accent underline-offset-4 hover:underline">
              Post a requirement
            </Link>{" "}
            and tell us what you source.
          </p>
        </Reveal>
      </Section>

      <CtaBar
        title="Your industry, your requirement."
        actions={[
          { label: "Marketplace", to: "/for-buyers" },
          { label: "Post a Requirement", to: "/post-a-requirement", variant: "secondary" },
        ]}
      />
    </>
  );
}
