import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { Stepper } from "@/components/site/Stepper";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRIES } from "@/components/site/IndustryChips";
import { pageMeta } from "@/lib/seo";

const description =
  "Submit your requirement as a structured RFQ. Graviyx shortlists verified vendors and returns comparable quotations.";
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
        headline="Post a requirement."
        subhead="Already know what you need? Submit it now. It becomes a structured RFQ and goes to review and shortlisting."
        compact
      />

      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="panel mb-6 border-l-2 border-l-ink p-5 text-[15px] text-muted">
              Graviyx currently sources <strong className="text-fg">finished goods</strong>. Custom
              parts built to your drawings and semi-finished goods are not yet available. See{" "}
              <Link to="/insights" className="text-ink underline-offset-4 hover:underline">
                Insights
              </Link>
              .
            </p>
          </Reveal>

          {sent ? (
            <Reveal>
              <div className="panel flex flex-col items-center px-6 py-14 text-center">
                <span className="mark-dot pulse-dot mb-6" />
                <h2 className="display-sm text-fg">Requirement received.</h2>
                <p className="body-copy mt-3 max-w-md text-[16px]">
                  Your reference is <strong className="text-fg">{reference}</strong>. A specialist
                  will review it and a vendor shortlist will be built.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form
                className="panel space-y-5 p-6 md:p-9"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="block">
                  <span className="eyebrow mb-2 block">Item</span>
                  <input required className="field" placeholder="What do you need? Use plain nouns: item, spec, lot." />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow mb-2 block">Category</span>
                    <select className="field" defaultValue={INDUSTRIES[0]}>
                      {INDUSTRIES.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block">Quantity</span>
                    <input required className="field" placeholder="Quantity and unit" />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow mb-2 block">Specification</span>
                  <input className="field" placeholder="Grade, size, standard, tolerance, brand or model" />
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block">Attachments (optional)</span>
                  <input type="file" multiple className="field file:mr-3 file:border-0 file:bg-transparent file:text-sm file:text-muted" />
                  <span className="mt-1 block text-sm text-meta">Datasheets or specification documents.</span>
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow mb-2 block">Target date</span>
                    <input type="date" className="field" />
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block">Delivery location</span>
                    <input required className="field" placeholder="City and state" />
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow mb-2 block">Full name</span>
                    <input required className="field" placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block">Work email</span>
                    <input required type="email" className="field" placeholder="you@company.com" />
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow mb-2 block">Company</span>
                    <input className="field" placeholder="Company name" />
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block">Phone (optional)</span>
                    <input type="tel" className="field" placeholder="+91 …" />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow mb-2 block">Notes (optional)</span>
                  <textarea rows={4} className="field resize-none" placeholder="Anything else we should know." />
                </label>
                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                  Submit requirement
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="What happens next" title="After you submit." />
        <Stepper
          steps={[
            {
              title: "Structured into an RFQ",
              body: "Your requirement is structured into an RFQ.",
            },
            {
              title: "Review and shortlist",
              body: "A specialist reviews it and a vendor shortlist is built.",
            },
            {
              title: "Normalised quotations",
              body: "Shortlisted vendors quote, and quotations come back normalised for comparison.",
            },
          ]}
        />
      </Section>
    </>
  );
}
