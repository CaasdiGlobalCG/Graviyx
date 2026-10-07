// ============================================================
// FILE: HomeVariantHMarquee.parts.tsx
// PURPOSE: The "Marquee & Ticker" primitives — a continuously moving ticker band that
//          pauses on hover and on keyboard focus, a ruled section head, and the small
//          feed rows HomeVariantHMarquee assembles.
// CONNECTS TO: motion/react (motion, useAnimationFrame, useMotionValue, useReducedMotion),
//          @tanstack/react-router (Link), @/components/site/Reveal,
//          HomeVariantHMarquee.tsx (the section assembler).
// ============================================================

import { useEffect, useRef, useState, type HTMLAttributes, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";

/** Mirrors --ease-signal in src/styles.css. Kept as a tuple so Motion's type accepts it. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** The two tones a ticker band can sit on. `ink` uses the on-ink token set. */
type Tone = "light" | "ink";
type Items = readonly string[];
type Step = { readonly key: string; readonly body: string };
type Card = { audience: string; body: string; to: string; cta: string };
type TickerBandProps = { items: Items; tone: Tone; label: string };
type TickHeadProps = { index: string; heading: string; lead?: string; to?: string };

/** The ticker's type recipe — the brand caption: mono, uppercase, +22% tracking. */
const TICKER_TYPE = "font-mono text-[11px] tracking-[0.22em] uppercase";

/** The mono index that numbers the page's feed rows. Mirrors --tracking-caption. */
const MONO_INDEX = "font-mono text-[11px] leading-none tracking-[0.22em] text-meta";

/** Seconds for one ticker pass to travel its own width. */
const TICKER_SECONDS = 34;

/** Ticker copy colour, and the band fill with its two hairlines. Both per tone. */
const TONE_TEXT: Record<Tone, string> = { light: "text-muted", ink: "text-on-ink-muted" };
const TONE_BAND: Record<Tone, string> = {
  light: "border-border bg-bg",
  ink: "border-on-ink-rule bg-ink",
};

/**
 * True only after mount, and only when the visitor prefers reduced motion. `useReducedMotion()`
 * is `null` on the server, so branching on it directly would render a different tree on the
 * server and on the first client render; gating on a mount flag keeps hydration identical.
 */
function useStillMotion(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && reduced === true;
}

/** Measures half the track — exactly one pass — and keeps it current across resizes. */
function useTrackHalf(track: RefObject<HTMLDivElement | null>) {
  const half = useRef(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => (half.current = el.scrollWidth / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [track]);
  return half;
}

/** One full pass of the ticker's content. The duplicate pass is marked aria-hidden. */
function TickerRow({
  items,
  tone,
  ...rest
}: { items: Items; tone: Tone } & HTMLAttributes<HTMLUListElement>) {
  return (
    <ul {...rest} className={`flex shrink-0 items-center ${TONE_TEXT[tone]}`}>
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center">
          <span className="px-7 py-4 font-mono text-[11px] tracking-[0.22em] uppercase">{item}</span>
          <span aria-hidden="true" className="mark-dot" />
        </li>
      ))}
    </ul>
  );
}

/** The reduced-motion resting state: one legible, wrapped row. It never scrolls. */
function StaticRow({ items, tone }: { items: Items; tone: Tone }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-7 gap-y-2 py-4 ${TONE_TEXT[tone]}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span aria-hidden="true" className="mark-dot" />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The moving track. Two identical passes sit side by side inside an overflow-hidden viewport;
 * the track translates by exactly -50% of its own width, so the second pass lands where the
 * first began and the seam is invisible. Only `transform: translateX` moves — never
 * `background-position`, never `left`. `paused` is set by the band while it is hovered or holds
 * keyboard focus; under reduced motion the track is not rendered at all.
 */
function Ticker({ items, tone, paused }: { items: Items; tone: Tone; paused: boolean }) {
  const still = useStillMotion();
  const x = useMotionValue(0);
  const track = useRef<HTMLDivElement>(null);
  const half = useTrackHalf(track);

  useAnimationFrame((_, delta) => {
    if (still || paused || half.current <= 0) return;
    const next = x.get() - (delta / 1000) * (half.current / TICKER_SECONDS);
    x.set(next <= -half.current ? next + half.current : next);
  });

  if (still) return <StaticRow items={items} tone={tone} />;

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      {/* motion.div, not div: a MotionValue in `style` is only typed by Motion's props. */}
      <motion.div ref={track} style={{ x }} className="flex w-max">
        <TickerRow items={items} tone={tone} />
        <TickerRow items={items} tone={tone} aria-hidden="true" />
      </motion.div>
    </div>
  );
}

/**
 * The full-bleed band a ticker travels inside — the page's structural divider. It separates two
 * major sections and carries the hero's and the closing's base line.
 *
 * The band is a focusable, labelled group so the motion can always be stopped: hovering pauses
 * it, and so does holding keyboard focus (WCAG 2.2.2 Pause, Stop, Hide). Its label is real copy
 * passed in by the caller — never invented ticker text.
 */
export function TickerBand({ items, tone, label }: TickerBandProps) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      className={`flex items-center border-y ${TONE_BAND[tone]}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span aria-hidden="true" className="mark-dot pulse-dot ml-6 hidden shrink-0 sm:block" />
      <Ticker items={items} tone={tone} paused={paused} />
    </div>
  );
}

/**
 * The ruled section head: a mono index, a display heading and optional lead copy. It resolves
 * through the semantic tokens, so it reads correctly on Paper and on an Ink surface with no
 * variant — inside `surface-ink` the heading inherits Paper.
 */
export function TickHead({ index, heading, lead, to }: TickHeadProps) {
  return (
    <Reveal>
      <div className="border-t border-border pt-5">
        <p className="eyebrow">{index}</p>
        <h2 className="display-lg mt-4 max-w-3xl text-fg">
          {to ? (
            <Link to={to} className="transition-colors duration-200 hover:text-muted">
              {heading}
            </Link>
          ) : (
            heading
          )}
        </h2>
        {lead ? <p className="lead mt-5 max-w-2xl">{lead}</p> : null}
      </div>
    </Reveal>
  );
}

/**
 * One complaint in the problem feed: a mono index and a line struck through by a hairline as the
 * next arrives — the cue the content doc gives for this section. The strike is a hairline scaled
 * on X, so no type reflows and reduced motion leaves the line at its resting state.
 */
export function StrikeRow({ order, text }: { order: number; text: string }) {
  return (
    <li className="border-b border-border">
      <Reveal delay={order * 0.07}>
        <div className="flex items-baseline gap-4 py-5 md:gap-6">
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta">
            {String(order).padStart(2, "0")}
          </span>
          <span className="relative inline-block text-[17px] text-fg md:text-[19px]">
            {text}
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE_SIGNAL }}
            />
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/** One step of the how-it-works feed: a mono order, the step key and its body. */
export function StepCell({ step, order }: { step: Step; order: number }) {
  return (
    <div className="bg-paper-2 p-7 md:p-8">
      <Reveal delay={order * 0.07}>
        <p className="eyebrow">{String(order).padStart(2, "0")}</p>
        <h3 className="display-md mt-5 text-fg">{step.key}</h3>
        <p className="body-copy mt-3">{step.body}</p>
      </Reveal>
    </div>
  );
}

/**
 * One of the two doors in — the buyer and supplier panels. There is no accent colour to separate
 * them, so the hairline and the paper fill do the work.
 */
export function EntryCard({ card, order }: { card: Card; order: number }) {
  return (
    <Reveal delay={order * 0.08} className="h-full">
      <Link
        to={card.to}
        className="group flex h-full flex-col border border-border bg-bg p-7 transition-colors duration-200 hover:border-ink md:p-9"
      >
        <p className="eyebrow">{card.audience}</p>
        <p className="lead mt-5">{card.body}</p>
        <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-fg uppercase">
          {card.cta}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

/** One industry in the coverage feed — a mono index and the name. */
export function IndustryRow({ index, name }: { index: string; name: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-border py-4 md:gap-x-8">
      <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta">{index}</span>
      <span className="text-[15px] text-fg">{name}</span>
    </li>
  );
}

/** One side of the system feed: a live pulse mark, the key and its body. */
export function SystemSide({ side, order }: { side: Step; order: number }) {
  return (
    <li className="border-b border-border">
      <Reveal delay={order * 0.07}>
        <div className="flex items-start gap-5 py-5 md:py-6">
          <span aria-hidden="true" className="mark-dot pulse-dot mt-2" />
          <div>
            <h3 className="display-sm text-fg">{side.key}</h3>
            <p className="body-copy mt-2 max-w-xl">{side.body}</p>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

/** The orchestrator at the centre of the system feed. */
export function SystemCentre({ label, caption }: { label: string; caption: string }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden border border-border bg-bg p-8 text-center">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-diagonal" />
      <span aria-hidden="true" className="mark-dot pulse-dot relative" />
      <p className="eyebrow relative">{label}</p>
      <span aria-hidden="true" className="relative block h-px w-16 bg-border" />
      <p className="relative text-[13px] text-muted">{caption}</p>
    </div>
  );
}
