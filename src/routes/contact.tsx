// ============================================================
// FILE: contact.tsx
// PURPOSE: The Contact page. The enquiry form â€” four enquiry types, their conditional
//          fields and the sent state â€” read as monochrome neumorphism: the form is a
//          surface pushed out of a light canvas with its fields cut into it, and the
//          closing "sourcing finished goods?" note on the dark ground.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, src/styles.css (the neu-* and
//          canvas material), @tanstack/react-router.
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
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

      <section className="neu-canvas section-y">
        <div className="container-x">
          <div className="mx-auto max-w-2xl">
            {sent ? (
              <Reveal>
                <div className="neu-raised flex flex-col items-center px-6 py-14 text-center">
                  <span className="mark-dot pulse-dot mb-6" />
                  <h2 className="display-sm text-fg">
                    {type === "supplier" || type === "franchise" ? "Thank you." : "Message received."}
                  </h2>
                  <p className="body-copy mt-3 max-w-md text-[16px] text-fg">
                    {type === "supplier" || type === "franchise"
                      ? "A Graviyx specialist will be in touch using the details you provided."
                      : "We'll reply to the email you provided."}
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
                  {/* Bottom reveal, not a side one: this fieldset sits INSIDE the form panel,
                      whose padding is 24-36px, so a 48px horizontal travel would overhang the
                      panel's own edge as it scrolls in. */}
                  <Reveal>
                    <fieldset>
                      <legend className="eyebrow mb-3 block text-fg">Enquiry type</legend>
                      <div className="flex flex-wrap gap-2">
                        {ENQUIRY_TYPES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setType(t.id)}
                            className={
                              type === t.id
                                ? "neu-pressed px-5 py-3 text-[14px] font-semibold text-fg"
                                : "neu-control px-5 py-3 text-[14px] font-medium text-fg"
                            }
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </Reveal>

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
                      <input type="tel" className="neu-field" placeholder="+91 â€¦" />
                    </label>
                  </div>

                  {type === "supplier" && (
                    <>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                          <span className="eyebrow mb-2 block text-fg">Company type</span>
                          <select className="neu-field" defaultValue="Manufacturer">
                            <option>Manufacturer</option>
                            <option>Distributor</option>
                            <option>Seller</option>
                          </select>
                        </label>
                        <label className="block">
                          <span className="eyebrow mb-2 block text-fg">Location</span>
                          <input required className="neu-field" placeholder="City, state" />
                        </label>
                      </div>
                      <label className="block">
                        <span className="eyebrow mb-2 block text-fg">Products and categories supplied</span>
                        <input required className="neu-field" placeholder="e.g. industrial fasteners, switchgearâ€¦" />
                      </label>
                      <label className="block">
                        <span className="eyebrow mb-2 block text-fg">Website (optional)</span>
                        <input type="url" className="neu-field" placeholder="https://â€¦" />
                      </label>
                    </>
                  )}

                  {type === "franchise" && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="eyebrow mb-2 block text-fg">City or district of interest</span>
                        <input required className="neu-field" placeholder="e.g. Pune" />
                      </label>
                      <label className="block">
                        <span className="eyebrow mb-2 block text-fg">Existing warehouse or logistics operation?</span>
                        <select className="neu-field" defaultValue="Yes">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </label>
                    </div>
                  )}

                  {type === "press" && (
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Publication (optional)</span>
                      <input className="neu-field" placeholder="Publication name" />
                    </label>
                  )}

                  <label className="block">
                    <span className="eyebrow mb-2 block text-fg">Message</span>
                    <textarea required rows={5} className="neu-field resize-none" placeholder="Tell us what you need." />
                  </label>

                  <button
                    type="submit"
                    className="neu-control w-full px-6 py-3.5 text-[15px] font-semibold text-fg sm:w-auto"
                  >
                    {active.button}
                  </button>
                  <p className="text-sm text-muted">
                    Graviyx Procurement Pvt. Ltd. Â· hello@graviyx.com
                  </p>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <Reveal from="right" delay={0.1}>
            <div className="neu-flat mx-auto max-w-2xl px-6 py-8 text-center">
              <p className="text-[15px] text-muted">
                Sourcing finished goods?{" "}
                <Link to="/for-buyers" className="text-fg underline-offset-4 hover:underline">
                  Browse the Marketplace
                </Link>{" "}
                or{" "}
                <Link to="/post-a-requirement" className="text-fg underline-offset-4 hover:underline">
                  post a requirement
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
