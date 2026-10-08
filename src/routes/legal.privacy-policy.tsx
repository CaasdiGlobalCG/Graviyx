// ============================================================
// FILE: legal.privacy-policy.tsx
// PURPOSE: The Privacy Policy route. The finalisation notice, held in one dark neumorphic
//          panel on a dark canvas â€” the page's single dark ground.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, src/styles.css (the neu-* layer),
//          @tanstack/react-router.
// ============================================================
//
// NEUMORPHIC CONTRACT: the section below carries `neu-canvas-dark`, so the `neu-raised`
// panel sits on a canvas of exactly its own tone. No Tailwind `shadow-*` is used. The notice
// copy is verbatim from the content doc.

import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/legal/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <>
      <Hero eyebrow="Legal" headline="Privacy Policy." compact />
      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <Reveal from="left" className="mx-auto max-w-3xl">
            <div className="neu-raised p-7 md:p-9">
              <p className="body-copy text-[17px]">
                <strong className="text-fg">
                  This document is being finalised and will be published here.
                </strong>{" "}
                For questions in the meantime, contact hello@graviyx.com.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
