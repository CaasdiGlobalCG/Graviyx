// ============================================================
// FILE: how-it-works.tsx
// PURPOSE: The How It Works page, read in the adopted "Soft Machine" direction — monochrome
//          neumorphism. An Ink hero and an Ink closing frame four soft sections; three sit on
//          the light `neu-canvas` and "Under the hood" on the dark `neu-canvas-dark`. Copy is
//          the v2.0 plain-language edition, section 4.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, @tanstack/react-router,
//          src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Six steps from request to delivery, on one shared record. AI does the legwork. A specialist makes the calls.";
export const Route = createFileRoute("/how-it-works")({
  head: () => pageMeta("How It Works — From Request to Delivery | GRAVIYX", description),
  component: HowItWorks,
});

/** The six steps. `tag` is the parenthetical the copy attaches to each step. */
const STEPS = [
  {
    index: "01",
    title: "Request",
    tag: "AI-led",
    body: "You tell us what you need, or the AI drafts it from your spec. It becomes a clear, structured request.",
  },
  {
    index: "02",
    title: "Shortlist",
    tag: "AI + specialist",
    body: "The AI scores suppliers on fit, track record and capacity. A specialist reviews the list and refines it.",
  },
  {
    index: "03",
    title: "Compare",
    tag: "AI-led",
    body: "Quotes arrive. Price, lead time and compliance evidence line up side by side.",
  },
  {
    index: "04",
    title: "Negotiate",
    tag: "specialist-led",
    body: "A specialist negotiates the lines that look off. You approve the final quote.",
  },
  {
    index: "05",
    title: "Order",
    tag: "AI drafts, people sign",
    body: "The AI drafts the purchase order. You and the supplier sign it in the platform.",
  },
  {
    index: "06",
    title: "Deliver",
    tag: "shared view",
    body: "Dispatch and milestones are tracked in one view, shared by you and the supplier. Every event goes on the supplier's record.",
  },
];

/** The three things that keep working after delivery. */
const KEEPS_WORKING = [
  { title: "Analytics", body: "See where your spend goes and how your suppliers perform." },
  {
    title: "Forecast",
    body: "Confirmed orders and open requests become a forecast, so suppliers can prepare and you avoid stockouts.",
  },
  {
    title: "Recommendations",
    body: "Your next request is pre-filled. Where a supplier looks risky, specialists suggest backups.",
  },
];

/** The four layers under the workflow. */
const UNDER_THE_HOOD = [
  { title: "Verified network", body: "Every supplier is checked before they quote." },
  {
    title: "One workflow",
    body: "One record from request to delivery. No spreadsheets, no lost emails.",
  },
  {
    title: "AI that does the legwork",
    body: "It ranks suppliers, lines up quotes and flags outliers.",
  },
  {
    title: "Managed delivery",
    body: "Dispatch and milestones tracked, with you and the supplier on the same page.",
  },
];

/** The two pages linked from "Go deeper". */
const GO_DEEPER = [
  {
    title: "Intelligence Layer",
    body: "How the AI works, and where a person takes over.",
    to: "/intelligence-layer",
  },
  {
    title: "Fulfilment & Warehousing",
    body: "The warehouse network that keeps delivery on track.",
    to: "/fulfillment-warehousing",
  },
];

/**
 * A section head: a recessed mono index chip, then the heading and optional lead, both
 * inheriting the canvas they sit on. The chip is a `neu-inset` surface, so every section
 * that renders one carries `neu-canvas` or `neu-canvas-dark`.
 */
function SoftHead({ index, heading, lead }: { index: string; heading: string; lead?: string }) {
  return (
    <Reveal className="max-w-3xl">
      <span className="neu-inset inline-block px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums uppercase">
        {index}
      </span>
      <h2 className="display-lg mt-6">{heading}</h2>
      {lead ? <p className="lead mt-5 text-fg">{lead}</p> : null}
    </Reveal>
  );
}

/** 02 — the six steps as extruded cards, each lighting up in sequence. */
function Steps() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="02" heading="The six steps" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.index} className="h-full">
              <Reveal delay={i * 0.08} y={16} className="neu-raised flex h-full flex-col p-6 md:p-7">
                <span className="neu-inset self-start px-4 py-2.5 font-mono text-[10px] leading-none tracking-[0.22em] text-fg tabular-nums uppercase">
                  {step.index}
                </span>
                <p className="eyebrow mt-6">{step.tag}</p>
                <h3 className="display-sm mt-2 text-fg">{step.title}</h3>
                <p className="body-copy mt-3 text-[15px] text-fg">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 03 — the three things that keep working, extruded out of the canvas. */
function KeepsWorking() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="03" heading="Then it keeps working" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {KEEPS_WORKING.map((item, i) => (
            <li key={item.title} className="h-full">
              <Reveal delay={i * 0.08} y={16} className="neu-flat flex h-full flex-col p-6 md:p-7">
                <span aria-hidden="true" className="mark-dot" />
                <h3 className="display-sm mt-5 text-fg">{item.title}</h3>
                <p className="body-copy mt-3 text-[15px] text-fg">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 04 — the four layers, extruded shallowly out of the dark canvas. */
function UnderTheHood() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SoftHead index="04" heading="Under the hood" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {UNDER_THE_HOOD.map((layer, i) => (
            <li key={layer.title} className="h-full">
              <Reveal delay={i * 0.06} y={14} className="neu-flat flex h-full gap-4 p-5 md:p-6">
                <span aria-hidden="true" className="mark-dot mt-2" />
                <div className="min-w-0">
                  <h3 className="display-sm text-fg">{layer.title}</h3>
                  <p className="body-copy mt-2 text-[14px] text-fg">{layer.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 05 — the two doors deeper in, each whole card a link. */
function GoDeeper() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="05" heading="Go deeper" />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {GO_DEEPER.map((card, i) => (
            <li key={card.to} className="h-full">
              <Reveal delay={i * 0.08} y={18}>
                <Link
                  to={card.to}
                  className="neu-raised flex h-full flex-col p-7 transition-transform duration-150 ease-out hover:-translate-y-px active:neu-pressed active:translate-y-px active:scale-[0.97] md:p-9"
                >
                  <h3 className="display-sm text-fg">{card.title}</h3>
                  <p className="body-copy mt-3 text-[16px] text-fg">{card.body}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The closing Ink band, flat for the same reason as the hero. */
function Closing() {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <h2 className="display-md text-fg">Try it on a real requirement.</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/for-buyers" className="btn btn-on-ink">
              Marketplace
            </Link>
            <Link to="/post-a-requirement" className="btn btn-ghost-on-ink">
              Post a Requirement
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The How It Works page: Ink hero, four soft sections, Ink closing. */
function HowItWorks() {
  return (
    <>
      <Hero
        compact
        tone="ink"
        eyebrow="How it works"
        headline="From request to delivery."
        subhead="Six steps. One record. AI does the legwork. A specialist makes the calls."
      />
      <Steps />
      <KeepsWorking />
      <UnderTheHood />
      <GoDeeper />
      <Closing />
    </>
  );
}
