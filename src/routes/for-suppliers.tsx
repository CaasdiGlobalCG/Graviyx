// ============================================================
// FILE: for-suppliers.tsx
// PURPOSE: The For Suppliers page, read in the adopted "Soft Machine" direction â€”
//          monochrome neumorphism. An Ink hero and an Ink closing frame three soft sections;
//          two sit on the light `neu-canvas` and the three-check verification section on the
//          dark `neu-canvas-dark`. Copy is the v2.0 plain-language edition, section 3.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, @tanstack/react-router,
//          motion/react (the verification stagger), src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/for-suppliers")({
  component: ForSuppliers,
});

/** The three verification checks, rendered in the order given by the copy. */
const checks = [
  { title: "Documents", body: "Your company standing and compliance papers." },
  { title: "Capability", body: "What you can actually make and deliver." },
  { title: "Site check", body: "For categories where production capability affects buyer risk." },
];

/** The five "What you get" cards. */
const BENEFITS = [
  {
    title: "Real demand, not cold calls",
    body: "See buyers who are actively sourcing. Requests are matched to what you make, not sent to everyone.",
  },
  {
    title: "Credibility that travels",
    body: "Your verified status builds trust before you say a word. A specialist guides you through it. It's more than a form.",
  },
  {
    title: "Be seen for what you do well",
    body: "Your performance and capabilities are visible to every buyer on the network.",
  },
  {
    title: "Less back and forth",
    body: "Clear requests, comparable quotes and orders signed in the platform. More time closing, less time chasing.",
  },
  {
    title: "Room to grow",
    body: "One verified profile, many buyers. A specialist helps you read your scorecard and improve it.",
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

/** 02 â€” the five cards, each extruded out of the canvas. */
function WhatYouGet() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead index="02" heading="What you get" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((card, i) => (
            <li key={card.title} className="h-full">
              <Reveal
                delay={i * 0.08}
                y={16}
                from={i % 2 === 0 ? "left" : "right"}
                className="neu-flat flex h-full flex-col p-6 md:p-7"
              >
                <h3 className="display-sm text-fg">{card.title}</h3>
                <p className="body-copy mt-3 text-[15px] text-fg">{card.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 03 â€” verification: the three checks, then the scorecard. The page's dark band. */
function Verification() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SoftHead index="03" heading="Three checks, then a scorecard." />
        <div className="mt-12 space-y-3">
          {checks.map((item, index) => (
            <Reveal key={item.title} from={index % 2 === 0 ? "left" : "right"}>
              <motion.div
                className="neu-flat flex gap-5 p-6"
                initial={{ y: 18 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.16 }}
              >
                <span className="mark-dot mt-2 shrink-0" />
                <div>
                  <h3 className="display-sm text-fg">
                    {index + 1}. {item.title}
                  </h3>
                  <p className="body-copy mt-2 text-[16px]">{item.body}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <p className="body-copy mt-8 max-w-3xl text-[16px] text-fg">
          <strong className="text-fg">After you're verified:</strong> your scorecard tracks
          on-time delivery, quality, returns and disputes. It updates after every deal. Test
          reports and certificates sit on your profile.
        </p>
        <Link
          to="/trust"
          className="neu-control mt-7 inline-flex items-center gap-2 px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] text-fg uppercase"
        >
          See how trust works
        </Link>
      </div>
    </section>
  );
}

/** 04 â€” pricing: the two supplier models. */
function Pricing() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <SoftHead
          index="04"
          heading="Pricing"
          lead="Suppliers work on one of two models: a fee on completed deals, or a fee tied to platform access and lead volume. Terms are agreed during onboarding."
        />
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
        <Reveal from="left" className="max-w-3xl">
          <h2 className="display-md text-fg">Verified once. Visible to every buyer.</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-on-ink">
              Apply for Verification
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The For Suppliers page: Ink hero, three soft sections, Ink closing. */
function ForSuppliers() {
  return (
    <>
      <Hero
        compact
        tone="ink"
        eyebrow="For suppliers"
        headline="Get verified once. Get found by serious buyers."
        subhead="Verification puts you in front of buyers who are actively sourcing. A specialist helps you win the business."
        actions={[{ label: "Apply for Verification", to: "/contact" }]}
      />
      <WhatYouGet />
      <Verification />
      <Pricing />
      <Closing />
    </>
  );
}
