import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

const description =
  "Apply for supplier verification, discuss a warehouse franchise, or send a general or press enquiry to Graviyx.";
export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact | GRAVIYX", description),
  component: Contact,
});

type EnquiryType = "supplier" | "franchise" | "general" | "press";

const ENQUIRY_TYPES: { id: EnquiryType; label: string; button: string }[] = [
  { id: "supplier", label: "Supplier verification", button: "Apply for verification" },
  { id: "franchise", label: "Warehouse franchise", button: "Discuss a franchise" },
  { id: "general", label: "General enquiry", button: "Send message" },
  { id: "press", label: "Press", button: "Send message" },
];

function Contact() {
  const [type, setType] = useState<EnquiryType>("supplier");
  const [sent, setSent] = useState(false);

  const active = ENQUIRY_TYPES.find((t) => t.id === type)!;

  return (
    <>
      <Hero
        eyebrow="Contact"
        headline="Contact Graviyx."
        subhead="Apply for supplier verification, discuss a warehouse franchise, or send a general or press enquiry. To source finished goods, use the Marketplace or Post a Requirement."
        compact
      />

      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          {sent ? (
            <Reveal>
              <div className="panel flex flex-col items-center px-6 py-14 text-center">
                <span className="mark-dot pulse-dot mb-6" />
                <h2 className="display-sm text-fg">
                  {type === "supplier" || type === "franchise" ? "Thank you." : "Message received."}
                </h2>
                <p className="body-copy mt-3 max-w-md text-[16px]">
                  {type === "supplier" || type === "franchise"
                    ? "A Graviyx specialist will be in touch using the details you provided."
                    : "We'll reply to the email you provided."}
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
                <fieldset>
                  <legend className="eyebrow mb-3 block">Enquiry type</legend>
                  <div className="flex flex-wrap gap-2">
                    {ENQUIRY_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setType(t.id)}
                        className={
                          type === t.id
                            ? "btn btn-primary"
                            : "btn btn-secondary"
                        }
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

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

                {type === "supplier" && (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="eyebrow mb-2 block">Company type</span>
                        <select className="field" defaultValue="Manufacturer">
                          <option>Manufacturer</option>
                          <option>Distributor</option>
                          <option>Seller</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="eyebrow mb-2 block">Location</span>
                        <input required className="field" placeholder="City, state" />
                      </label>
                    </div>
                    <label className="block">
                      <span className="eyebrow mb-2 block">Products and categories supplied</span>
                      <input required className="field" placeholder="e.g. industrial fasteners, switchgear…" />
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block">Website (optional)</span>
                      <input type="url" className="field" placeholder="https://…" />
                    </label>
                  </>
                )}

                {type === "franchise" && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="eyebrow mb-2 block">City or district of interest</span>
                      <input required className="field" placeholder="e.g. Pune" />
                    </label>
                    <label className="block">
                      <span className="eyebrow mb-2 block">Existing warehouse or logistics operation?</span>
                      <select className="field" defaultValue="Yes">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </label>
                  </div>
                )}

                {type === "press" && (
                  <label className="block">
                    <span className="eyebrow mb-2 block">Publication (optional)</span>
                    <input className="field" placeholder="Publication name" />
                  </label>
                )}

                <label className="block">
                  <span className="eyebrow mb-2 block">Message</span>
                  <textarea required rows={5} className="field resize-none" placeholder="Tell us what you need." />
                </label>

                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                  {active.button}
                </button>
                <p className="text-sm text-meta">
                  Graviyx Procurement Pvt. Ltd. · hello@graviyx.com
                </p>
              </form>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-[15px] text-muted">
              Sourcing finished goods?{" "}
              <Link to="/for-buyers" className="text-ink underline-offset-4 hover:underline">
                Browse the Marketplace
              </Link>{" "}
              or{" "}
              <Link to="/post-a-requirement" className="text-ink underline-offset-4 hover:underline">
                post a requirement
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
