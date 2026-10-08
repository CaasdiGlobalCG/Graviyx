// ============================================================
// FILE: legal.tsx
// PURPOSE: The Legal index route. The finalisation notice, held in one dark neumorphic
//          panel, above the three document cards set on the light neumorphic canvas.
// CONNECTS TO: @/components/site/{Hero,SectionHead,LinkOutCard,Reveal}, @/lib/seo,
//          src/styles.css (the neu-* layer), @tanstack/react-router.
// ============================================================
//
// NEUMORPHIC CONTRACT: each section below that renders a `neu-*` surface carries
// `neu-canvas-dark` or `neu-canvas`, so every surface sits on a canvas of exactly its own
// tone. No Tailwind `shadow-*` is used. The notice copy is verbatim from the content doc.

import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { SectionHead } from "@/components/site/Section";
import { LinkOutCard } from "@/components/site/LinkOutCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/legal")({
  component: Legal,
});

/** The status band on the dark canvas: the heading and the finalisation notice, in one panel. */
function Notice() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <SectionHead eyebrow="Documents" title="Privacy, terms and security." />
        <Reveal from="left" className="mt-8 max-w-3xl">
          <div className="neu-raised p-7 md:p-9">
            <p className="body-copy text-[16px]">
              <strong className="text-fg">
                These documents are being finalised and will be published here.
              </strong>{" "}
              For questions in the meantime, contact hello@graviyx.com.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The three documents, each a card that leaves the page for its own route. */
function Documents() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal from="left" className="h-full">
            <LinkOutCard
              eyebrow="Privacy"
              title="Privacy Policy"
              body="Being finalised. It will be published here."
              to="/legal/privacy-policy"
              cta="View"
            />
          </Reveal>
          <Reveal from="right" className="h-full">
            <LinkOutCard
              eyebrow="Terms"
              title="Terms of Service"
              body="Being finalised. It will be published here."
              to="/legal/terms-of-service"
              cta="View"
              delay={0.08}
            />
          </Reveal>
          <Reveal from="left" className="h-full">
            <LinkOutCard
              eyebrow="Security"
              title="Security & Data Handling"
              body="Being finalised. It will be published here."
              to="/legal/security"
              cta="View"
              delay={0.16}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Legal() {
  return (
    <>
      <Hero eyebrow="Legal" headline="Legal documents." compact />
      <Notice />
      <Documents />
    </>
  );
}
