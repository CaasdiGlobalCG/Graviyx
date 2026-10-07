// ============================================================
// FILE: post-a-requirement.tsx
// PURPOSE: The Post a Requirement page. The finished-goods scope note and the RFQ form
//          (with its generated reference and sent state), read as monochrome neumorphism:
//          the scope note sits on the dark ground, the form is a surface pushed out of a
//          light canvas with its fields cut into it.
// CONNECTS TO: @/components/site/{Hero,Section,SectionHead,Stepper,Reveal},
//          @/components/site/IndustryChips (INDUSTRIES), @/lib/seo, src/styles.css
//          (the neu-* and canvas material), @tanstack/react-router.
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { Stepper } from "@/components/site/Stepper";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRIES } from "@/components/site/IndustryChips";
import { pageMeta } from "@/lib/seo";

const description =
  "Tell us what you need. Graviyx turns it into a clear request, shortlists verified suppliers and brings back quotes you can compare.";
export const Route = createFileRoute("/post-a-requirement")({
  head: () => pageMeta("Post a Requirement | GRAVIYX", description),
  component: PostRequirement,
});

function PostRequirement() {
  const [sent, setSent] = useState(false);
  const [reference] = useState(() => `RFQ-${String(Math.floor(10000 + Math.random() * 90000))}`);

  return (
    <>
      <Hero
        eyebrow="Post a requirement"
        headline="Tell us what you need."
        subhead="We turn it into a clear request and start shortlisting verified suppliers."
        compact
      />

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <Reveal from="left">
            <p className="neu-flat mx-auto max-w-2xl p-5 text-[15px] text-muted">
              Graviyx currently sources <strong className="text-fg">finished goods</strong>. Custom
              parts made to your drawings, and semi-finished goods, aren't available yet. See{" "}
              <Link to="/insights" className="text-fg underline-offset-4 hover:underline">
                Insights
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="neu-canvas section-y">
        <div className="container-x">
          <div className="mx-auto max-w-2xl">
            {sent ? (
              <Reveal>
                <div className="neu-raised flex flex-col items-center px-6 py-14 text-center">
                  <span className="mark-dot pulse-dot mb-6" />
                  <h2 className="display-sm text-fg">Requirement received.</h2>
                  <p className="body-copy mt-3 max-w-md text-[16px] text-fg">
                    Your reference is <strong className="text-fg">{reference}</strong>.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form
                  className="neu-raised space-y-5 p-6 md:p-9"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <label className="block">
                    <span className="eyebrow mb-2 block text-fg">Item</span>
                    <input required className="neu-field" placeholder="What do you need? Use plain nouns: item, spec, lot." />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Category</span>
                      <select className="neu-field" defaultValue={INDUSTRIES[0]}>
                        {INDUSTRIES.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                        <option>Other</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Quantity</span>
                      <input required className="neu-field" placeholder="Quantity and unit" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="eyebrow mb-2 block text-fg">Specification</span>
                    <input className="neu-field" placeholder="Grade, size, standard, tolerance, brand or model" />
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block text-fg">Attachments (optional)</span>
                    <input type="file" multiple className="neu-field file:mr-3 file:border-0 file:bg-transparent file:text-sm file:text-muted" />
                    <span className="mt-1 block text-sm text-muted">Datasheets or specification documents.</span>
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Target date</span>
                      <input type="date" className="neu-field" />
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Delivery location</span>
                      <input required className="neu-field" placeholder="City and state" />
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Full name</span>
                      <input required className="neu-field" placeholder="Your name" />
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Work email</span>
                      <input required type="email" className="neu-field" placeholder="you@company.com" />
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Company</span>
                      <input className="neu-field" placeholder="Company name" />
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Phone (optional)</span>
                      <input type="tel" className="neu-field" placeholder="+91 …" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="eyebrow mb-2 block text-fg">Notes (optional)</span>
                    <textarea rows={4} className="neu-field resize-none" placeholder="Anything else we should know." />
                  </label>
                  <button
                    type="submit"
                    className="neu-control w-full px-6 py-3.5 text-[15px] font-semibold text-fg sm:w-auto"
                  >
                    Submit requirement
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="What happens next" title="After you submit." />
        <Stepper
          steps={[
            {
              title: "Structured into a request",
              body: "Your request is structured.",
            },
            {
              title: "Review and shortlist",
              body: "A specialist reviews it and a supplier shortlist is built.",
            },
            {
              title: "Quotes side by side",
              body: "Suppliers quote, and quotes come back side by side.",
            },
          ]}
        />
      </Section>
    </>
  );
}
