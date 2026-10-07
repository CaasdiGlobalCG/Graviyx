import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Graviyx is building the default operating system for complex industrial procurement: verified supply, AI and specialists working together.";
export const Route = createFileRoute("/about")({
  head: () => pageMeta("About GRAVIYX | Mission, Vision and Roadmap", description),
  component: About,
});

const PROPERTIES = [
  { title: "Speed", body: "from software." },
  { title: "Judgement", body: "from specialists." },
  { title: "Trust", body: "from a verified and scored network." },
  { title: "Reliability", body: "from owned and franchised warehousing." },
];

const ROADMAP = [
  {
    term: "Short term",
    body: "Deepen coverage and trust in existing categories and the anchor geography. Strengthen the AI engine's forecasting and routing as volume grows.",
  },
  {
    term: "Medium term",
    body: "Extend category coverage. Extend the state and district warehouse network into new regions. Bring Build-to-Spec and Semi-Finished Goods onto the platform.",
  },
  {
    term: "Long term",
    body: "A multi-region vendor network anchored in India and expanding across South and Southeast Asia, on the same verified network, AI engine, specialist model and three-tier warehouse architecture.",
  },
];

function About() {
  return (
    <>
      <Hero
        eyebrow="About Graviyx"
        headline="The default operating system for complex industrial procurement."
        subhead="Verified supply, AI and specialists working together — the standard layer through which buyers and suppliers transact."
        compact
      />

      <Section tone="surface">
        <SectionHead eyebrow="Mission" title="Why Graviyx exists." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            Graviyx's mission is to modernise industrial and commercial procurement by building a
            verified ecosystem in which artificial intelligence and procurement specialists work
            together to deliver sourcing outcomes that are faster, sharper and more fully recorded
            than fragmented, manual procurement can achieve today.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="Vision" title="Where this goes." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            To become the default operating system for complex industrial procurement: the standard
            layer through which buyers and suppliers transact, across an expanding set of categories
            and geographies.
          </p>
        </Reveal>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="The name" title="GRAVIYX." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            <strong className="text-fg">Global Resource Access &amp; Verified Industrial Yield
            eXchange.</strong> Worldwide access to verified industrial supply, exchanged with proof.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="Category thesis" title="Not a marketplace. Not a tool." />
        <Reveal className="mt-8 max-w-3xl space-y-6">
          <p className="body-copy text-[17px]">
            Graviyx is not another procurement marketplace competing on the breadth of its listings,
            and not another software tool competing on the elegance of its workflow. It is a
            verified B2B procurement operating system, built on the view that industrial
            procurement's central failure is a lack of judgement at scale, not a lack of digital
            tooling.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROPERTIES.map((p, index) => (
            <motion.div
              key={p.title}
              className="panel p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="mark-dot mb-4 block" />
              <h3 className="display-sm text-fg">{p.title}</h3>
              <p className="body-copy mt-2 text-[15px]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <SectionHead eyebrow="Roadmap" title="What gets built, in what order." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {ROADMAP.map((r, index) => (
            <motion.div
              key={r.term}
              className="panel p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.14 }}
            >
              <span className="eyebrow text-ink">{r.term}</span>
              <p className="body-copy mt-3 text-[16px]">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="The team" title="Four groups build and run Graviyx." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[17px]">
            AI and engineering, procurement specialists, vendor success and verification, and
            logistics and warehouse operations.{" "}
            <Link to="/careers" className="text-ink underline-offset-4 hover:underline">
              Careers →
            </Link>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
