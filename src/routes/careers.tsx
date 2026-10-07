// ============================================================
// FILE: careers.tsx
// PURPOSE: The Careers page, read in the adopted "Soft Machine" direction — monochrome
//          neumorphism. An Ink hero frames three soft sections; "What a specialist owns" and
//          "Open roles" sit on the light `neu-canvas` and "Four teams" on the dark
//          `neu-canvas-dark`. Copy is the v2.0 plain-language edition, section 11.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, @tanstack/react-router,
//          src/styles.css (the neu-* material).
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Graviyx pairs AI with a named team of procurement specialists. See how the team is organised and get in touch.";
export const Route = createFileRoute("/careers")({
  head: () => pageMeta("Careers | GRAVIYX", description),
  component: Careers,
});

const OWNS = [
  { title: "Guiding clients", body: "through spec, category and supplier choices." },
  { title: "Negotiating", body: "the price and delivery exceptions the AI flags." },
  {
    title: "Working with suppliers:",
    body: "onboarding, coaching and holding them to their scorecard.",
  },
  { title: "Planning:", body: "turning demand signals into buying calendars and stocking advice." },
];

const GROUPS = [
  {
    title: "AI & Engineering",
    body: "Build and maintain the platform and the intelligence layer.",
  },
  {
    title: "Procurement Specialists",
    body: "Organised by category. Negotiate, coordinate suppliers, forecast demand, manage risk.",
  },
  {
    title: "Supplier Verification",
    body: "Onboard, verify and maintain supplier standing.",
  },
  {
    title: "Logistics & Warehousing",
    body: "Run the master, state and district warehouses, including franchise partners.",
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

/** A neumorphic control: extruded at rest, pressed into the canvas on :active. */
function NeuButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="neu-raised inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] text-fg uppercase transition-transform duration-150 ease-out hover:-translate-y-px active:neu-pressed active:translate-y-px active:scale-[0.97] active:font-semibold focus-visible:outline-offset-2 focus-visible:[outline:2px_solid_var(--fg)]"
    >
      {children}
    </Link>
  );
}

function Careers() {
  return (
    <>
      <Hero
        eyebrow="Careers"
        headline="Judgement at scale needs people who can exercise it."
        subhead="The AI moves the deal. The specialist owns the outcome. Our edge depends on that team as much as on the software."
        compact
        tone="ink"
      />

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="02" heading="What a specialist owns" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {OWNS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} y={14} className="neu-flat h-full p-6">
                <span aria-hidden="true" className="mark-dot mb-5 block" />
                <p className="text-[16px] text-fg">
                  <strong className="text-fg">{item.title}</strong> {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <SoftHead index="03" heading="Four teams" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08} y={14} className="neu-flat h-full p-6 md:p-7">
                <span aria-hidden="true" className="mark-dot mb-5 block" />
                <h3 className="display-sm text-fg">{g.title}</h3>
                <p className="body-copy mt-2 text-[15px] text-fg">{g.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <SoftHead index="04" heading="Open roles" />
          <Reveal className="neu-inset mt-12 px-6 py-14 text-center md:py-20">
            <span aria-hidden="true" className="mark-dot pulse-dot mx-auto mb-6 block" />
            <h3 className="display-sm text-fg">No open roles right now.</h3>
            <p className="body-copy mx-auto mt-3 max-w-xl text-[16px] text-fg">
              Tell us why you'd be a fit anyway.
            </p>
            <div className="mt-8 flex justify-center">
              <NeuButton to="/contact">Get in touch</NeuButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
