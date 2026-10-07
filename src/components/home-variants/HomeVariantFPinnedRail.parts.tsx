// ============================================================
// FILE: HomeVariantFPinnedRail.parts.tsx
// PURPOSE: Pinned Progress Rail primitives — the persistent sequence rail and its mono
//          readout, the pinned (sticky) section header, and the ruled rows the variant
//          assembles into the v2.0 sections.
// CONNECTS TO: motion/react, @tanstack/react-router (Link), @/components/site/Reveal,
//          shared/home-variants.constants (every string), HomeVariantFPinnedRail.tsx.
// ============================================================

import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import {
  CLOSING,
  HERO,
  HOW_IT_WORKS,
  INDUSTRIES_SECTION,
  PROBLEM,
  SPEED_AND_JUDGEMENT,
  THE_SYSTEM,
  TRUST,
  TWO_WAYS_IN,
} from "@/components/home-variants/shared/home-variants.constants";

/** Mirrors --ease-signal in src/styles.css; a tuple so Motion's type accepts it. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** One section of the measured sequence. */
type SequenceEntry = { readonly id: string; readonly label: string };
/** A keyed side or step, verbatim from the constants module. */
type Keyed = { readonly key: string; readonly body: string };
/** One of the two ways in, verbatim from the constants module. */
type EntryCardData = {
  readonly audience: string;
  readonly body: string;
  readonly to: "/for-buyers" | "/for-suppliers";
  readonly cta: string;
};

/** Every section the page renders, in order. Each label is real copy — the section headings,
 *  or the two required sections' prescribed eyebrow. The mono indices are positions here. */
export const SEQUENCE: readonly SequenceEntry[] = [
  { id: "hero", label: HERO.headline },
  { id: "problem", label: PROBLEM.heading },
  { id: "how-it-works", label: HOW_IT_WORKS.heading },
  { id: "speed-and-judgement", label: SPEED_AND_JUDGEMENT.heading },
  { id: "trust", label: TRUST.heading },
  { id: "two-ways-in", label: TWO_WAYS_IN.heading },
  { id: "industries", label: INDUSTRIES_SECTION.heading },
  { id: "the-system", label: THE_SYSTEM.heading },
  { id: "closing", label: CLOSING.heading },
  { id: "where-we-serve", label: "Where we serve" },
  { id: "ecosystem", label: "The ecosystem" },
];

/** The sequence ids as a stable array — the key the rail's observer watches. */
export const SEQUENCE_IDS: readonly string[] = SEQUENCE.map((entry) => entry.id);

/** Zero-pads a zero-based position into the two-digit mono index the page uses. */
export function rowIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/** The two-digit mono index of a section, read from its position in SEQUENCE. */
export function seqIndex(id: string): string {
  const position = SEQUENCE.findIndex((entry) => entry.id === id);
  return rowIndex(position < 0 ? 0 : position);
}

/**
 * Which sequence section contains the middle of the viewport — the rail's real position.
 * An IntersectionObserver over a thin centre band keeps this off the scroll handler.
 * @param ids - The sequence ids in document order. Must be referentially stable.
 */
export function useActiveSection(ids: readonly string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const centre = window.innerHeight / 2;
        const inside = entries.find(
          (entry) =>
            entry.boundingClientRect.top <= centre && entry.boundingClientRect.bottom > centre,
        );
        if (!inside) return;
        const position = ids.indexOf(inside.target.id);
        if (position >= 0) setActive(position);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** The persistent rail: a fixed track down the left gutter whose fill is the page's scroll
 *  progress, plus a mono readout of the sequence position. The fill is a MotionValue bound
 *  through `style`, which <MotionConfig reducedMotion="user"> does not cover, so it is gated
 *  here and rests fully drawn. It needs a gutter, so it is hidden below lg. */
export function ProgressRail({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const active = useActiveSection(SEQUENCE_IDS);
  const current = SEQUENCE[active] ?? SEQUENCE[0];

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-14 lg:block"
    >
      <div className="absolute top-[12vh] h-[40vh] w-full">
        <span className="absolute inset-y-0 right-0 block w-px bg-steel-30" />
        <motion.span
          className="absolute inset-y-0 right-0 block w-px origin-top bg-ink"
          style={reduced ? { scaleY: 1 } : { scaleY }}
        />
        <ol className="absolute inset-y-0 right-2 flex flex-col justify-between">
          {SEQUENCE.map((entry, i) => (
            <li
              key={entry.id}
              className={`px-1 font-mono text-[9px] leading-4 tracking-[0.14em] ${
                i === active ? "bg-ink text-paper" : "text-steel-30"
              }`}
            >
              {rowIndex(i)}
            </li>
          ))}
        </ol>
      </div>
      {/* bottom-24 clears the fixed preview bar (VariantPreviewBar, ~56px tall). */}
      <p className="absolute bottom-24 left-0 w-full px-1.5 font-mono text-[9px] leading-[1.7] text-muted">
        {current ? current.label : null}
      </p>
    </aside>
  );
}

/** The rail's phone form: below lg the same progress reads as a two-pixel bar under the site
 *  header instead — same MotionValue, same explicit gate. */
export function MobileProgressBar({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[72px] z-40 h-[2px] lg:hidden"
    >
      <motion.span
        className="block h-full w-full origin-left bg-ink"
        style={reduced ? { scaleX: 1 } : { scaleX }}
      />
    </div>
  );
}

/** One pinned section: an opening hairline spanning the container, then the pinned header — a
 *  mono index in `eyebrow`, the heading in `display-sm`, a hairline under both — then the
 *  content that scrolls past it. The header pins from md up, clearing the fixed 72px site
 *  header (Header.tsx:49), and only because the content below it is long enough to warrant
 *  it. Below md it scrolls normally: on a 320px phone a pinned header would eat the screen.
 *  @param props.id - The section id, which is also its key in SEQUENCE.
 *  @param props.headingTo - Optional route; makes the heading itself the section link. */
export function PinnedSection({
  id,
  heading,
  headingTo,
  tone,
  children,
}: {
  id: string;
  heading: string;
  headingTo?: "/industries";
  tone: "bg" | "surface";
  children: ReactNode;
}) {
  const ground = tone === "surface" ? "bg-surface" : "bg-bg";

  return (
    <section id={id} className={`section-y ${ground}`}>
      <div className="container-x">
        <span aria-hidden="true" className="block h-px w-full bg-border" />
        <header className={`z-20 border-b border-border py-5 md:sticky md:top-[72px] ${ground}`}>
          <p className="eyebrow">{seqIndex(id)}</p>
          <h2 className="display-sm mt-3 max-w-3xl">
            {headingTo ? (
              <Link to={headingTo} className="transition-colors hover:text-muted">
                {heading}
              </Link>
            ) : (
              heading
            )}
          </h2>
        </header>
        <div className="mt-8 md:mt-12">{children}</div>
      </div>
    </section>
  );
}

/** The props of one ruled row. */
type RuledRowProps = {
  index: string;
  text: string;
  delay: number;
  emphasis?: boolean;
  strike?: boolean;
};

/** A ruled row: a mono index, then the line. `emphasis` sets the larger statement size;
 *  `strike` draws a hairline through the text — a scaleX, so no text reflows. */
export function RuledRow({ index, text, delay, emphasis = false, strike = false }: RuledRowProps) {
  return (
    <li className={`border-b border-border ${emphasis ? "py-7 md:py-9" : "py-5 md:py-6"}`}>
      <Reveal delay={delay}>
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 md:gap-x-8">
          <span className="font-mono text-[11px] tracking-[0.22em] text-meta">{index}</span>
          <span
            className={`relative inline-block ${
              emphasis ? "display-sm max-w-2xl" : "text-[17px] md:text-[19px]"
            }`}
          >
            {text}
            {strike ? (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: delay + 0.45, ease: EASE_SIGNAL }}
              />
            ) : null}
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/** One ruled row of the step table: mono index, the step key and its body. */
export function StepRow({ index, step, delay }: { index: string; step: Keyed; delay: number }) {
  return (
    <li className="border-b border-border">
      <Reveal delay={delay}>
        <div className="grid gap-x-5 gap-y-2 py-6 md:grid-cols-[64px_180px_1fr] md:gap-x-8 md:py-8">
          <span className="font-mono text-[11px] tracking-[0.22em] text-meta">{index}</span>
          <h3 className="display-sm">{step.key}</h3>
          <p className="body-copy max-w-2xl">{step.body}</p>
        </div>
      </Reveal>
    </li>
  );
}

/** One of the two ways in — a buyer or supplier door, verbatim from the constants module. */
export function EntryCard({ card, delay }: { card: EntryCardData; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={card.to}
        className="panel group flex h-full flex-col justify-between p-7 transition-colors hover:border-ink md:p-9"
      >
        <div>
          <p className="eyebrow">{card.audience}</p>
          <p className="body-copy mt-4 max-w-xl text-[16px]">{card.body}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
          {card.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </Reveal>
  );
}
