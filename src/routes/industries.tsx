// ============================================================
// FILE: industries.tsx
// PURPOSE: The Industries route. The nine sectors Graviyx serves, read in the adopted
//          "Soft Machine" material: a light neumorphic canvas holding the sectors and the
//          route to the register, then a dark neumorphic band holding the closing call.
// CONNECTS TO: @/components/site/{Hero,SectionHead,IndustryChips,Reveal}, @/lib/seo,
//          src/styles.css (the neu-* layer), @tanstack/react-router.
// ============================================================
//
// NEUMORPHIC CONTRACT: every section below that renders a `neu-*` surface carries
// `neu-canvas` or `neu-canvas-dark`, so each surface sits on a canvas of exactly its own
// tone. No Tailwind `shadow-*` is used, and `text-meta` never appears on a neumorphic
// surface â€” the lightest a label goes is `text-muted`.

import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { SectionHead } from "@/components/site/Section";
import { IndustryChips } from "@/components/site/IndustryChips";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/industries")({
  component: Industries,
});

/** The coverage band: the nine sectors on the light canvas, then the route to the register. */
function Coverage() {
  return (
    <section className="neu-canvas section-y">
      <div className="container-x">
        <Reveal from="left">
          <SectionHead eyebrow="Coverage" title="Nine sectors." />
        </Reveal>
        <Reveal from="right">
          <IndustryChips size="lg" />
        </Reveal>
        <Reveal from="left" className="mt-10">
          <div className="neu-flat max-w-3xl p-6 md:p-7">
            <p className="body-copy text-[16px] text-fg">
              Don't see your sector?{" "}
              <Link to="/post-a-requirement" className="text-fg underline-offset-4 hover:underline">
                Post a requirement
              </Link>{" "}
              and tell us what you source.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The closing band on the dark canvas: the two doors, extruded out of the dark ground. */
function Closing() {
  return (
    <section className="neu-canvas-dark section-y">
      <div className="container-x">
        <Reveal
          from="left"
          className="neu-raised mx-auto flex max-w-3xl flex-col items-center p-8 text-center md:p-12"
        >
          <h2 className="display-md text-fg">Your industry, your requirement.</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/for-buyers"
              className="neu-control inline-flex items-center justify-center gap-2 px-7 py-3.5 font-mono text-[11px] leading-none tracking-[0.14em] text-fg uppercase"
            >
              Marketplace
            </Link>
            <Link
              to="/post-a-requirement"
              className="neu-control inline-flex items-center justify-center gap-2 px-7 py-3.5 font-mono text-[11px] leading-none tracking-[0.14em] text-fg uppercase"
            >
              Post a Requirement
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <>
      <Hero
        eyebrow="Industries"
        headline="Built for the sectors that run on physical supply."
        subhead="Graviyx serves buyers who move materials, equipment and supply at scale."
        compact
      />
      <Coverage />
      <Closing />
    </>
  );
}
