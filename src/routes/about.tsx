// ============================================================
// FILE: about.tsx
// PURPOSE: The About page, read in the adopted "Soft Machine" direction — monochrome
//          neumorphism. The v2.0 About section carries no hero, so the page opens on the
//          Mission and runs six soft sections; five sit on the light `neu-canvas` and
//          "The name" on the dark `neu-canvas-dark`. Copy is the v2.0 plain-language
//          edition, section 10.
// CONNECTS TO: @/components/site/{Reveal}, @/lib/seo, @tanstack/react-router,
//          src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Graviyx is building the default operating system for complex industrial procurement: verified supply, with AI and specialists working together.";
export const Route = createFileRoute("/about")({
  head: () => pageMeta("About GRAVIYX | Mission, Vision and Roadmap", description),
  component: About,
});

const PROPERTIES = [
  { title: "Speed", body: "from software." },
  { title: "Judgement", body: "from specialists." },
  { title: "Trust", body: "from a verified, scored network." },
  { title: "Reliability", body: "from warehouses." },
];

const ROADMAP = [
  {
    term: "Now",
    body: "Deepen coverage and trust in our current categories. Sharpen the AI's forecasting and routing as volume grows.",
  },
  {
    term: "Next",
    body: "Add more categories. Grow the warehouse network into new regions. Bring Build-to-Spec and Semi-Finished Goods onto the platform.",
  },
  {
    term: "Later",
    body: "A multi-region network, anchored in India and expanding across South and Southeast Asia.",
  },
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

function About() {
  return (
    <>
      <section className="neu-canvas section-y">
        <div className="container-x">
          <Reveal from="left" className="max-w-3xl">
            <span className="neu-inset inline-block px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums uppercase">
              01
            </span>
            <h1 className="display-lg mt-6">Mission</h1>
            <p className="lead mt-5 text-fg">
              To modernise industrial and commercial procurement through a verified ecosystem where
              AI and procurement specialists work together, so sourcing is faster, sharper and fully
              recorded.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead
            index="02"
            heading="Vision"
            lead="To become the default operating system for complex industrial procurement: the standard way buyers and suppliers do business, across more categories and more regions."
          />
        </div>
      </section>

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <SoftHead index="03" heading="The name" />
          <Reveal from="right" className="mt-8 max-w-3xl">
            <p className="body-copy text-[17px] text-fg">
              <strong className="text-fg">GRAVIYX:</strong> Global Resource Access &amp; Verified
              Industrial Yield eXchange. Worldwide access to verified industrial supply, exchanged
              with proof.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead
            index="04"
            heading="Industrial buying doesn't need more software. It needs judgement at scale."
            lead="Graviyx isn't another marketplace, and it isn't another software tool. It combines four things:"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROPERTIES.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.08}
                y={14}
                from={i % 2 === 0 ? "left" : "right"}
                className="neu-flat p-6"
              >
                <span aria-hidden="true" className="mark-dot mb-5 block" />
                <p className="text-[16px] text-fg">
                  <strong className="text-fg">{p.title}</strong>, {p.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="05" heading="Roadmap" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {ROADMAP.map((r, i) => (
              <Reveal
                key={r.term}
                delay={i * 0.1}
                y={16}
                from={i % 2 === 0 ? "left" : "right"}
                className="neu-raised p-6 md:p-7"
              >
                <span className="eyebrow">{r.term}</span>
                <p className="body-copy mt-3 text-[16px] text-fg">{r.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="06" heading="The team" />
          <Reveal from="right" className="mt-8 max-w-3xl">
            <p className="body-copy text-[17px] text-fg">
              Four groups build and run Graviyx: AI and engineering, procurement specialists,
              supplier verification, and logistics and warehousing.{" "}
              <Link to="/careers" className="underline underline-offset-4">
                Careers
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
