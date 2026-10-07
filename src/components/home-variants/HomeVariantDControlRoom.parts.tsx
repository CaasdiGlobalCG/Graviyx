// ============================================================
// FILE: HomeVariantDControlRoom.parts.tsx
// PURPOSE: The Control Room instrument primitives — a ruled console head, the hero
//          status strip, the ruled step-table row, the travelling connector rail and
//          the monitored status-board rows that HomeVariantDControlRoom assembles.
// CONNECTS TO: motion/react, @tanstack/react-router (Link), @/components/site/Reveal,
//          HomeVariantDControlRoom.tsx (the section assembler).
// ============================================================

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";

/** Mirrors --ease-signal in src/styles.css. Kept as a tuple so Motion's type accepts it. */
const EASE_SIGNAL: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
/** Mirrors --motion-draw in src/styles.css — the signature travelling-line duration. */
const DRAW_DURATION = 1.2;

/** A monitored side on the status board: a key and its body copy. */
type Side = { readonly key: string; readonly body: string };

/** Zero-pads a zero-based row position into the two-digit mono index the console uses. */
export function rowIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/**
 * The ruled section head: a mono index, a display heading and optional lead copy.
 *
 * Resolves through the semantic tokens, so it reads correctly on Paper and on an Ink
 * surface with no variant — the heading inherits Paper inside `surface-ink`.
 *
 * @param props.index - The section's two-digit mono index.
 * @param props.heading - The section heading.
 * @param props.lead - Optional lead paragraph.
 * @param props.headingTo - Optional route; makes the heading itself the section link.
 */
export function ConsoleHead({
  index,
  heading,
  lead,
  headingTo,
}: {
  index: string;
  heading: string;
  lead?: string;
  headingTo?: string;
}) {
  return (
    <Reveal>
      <div className="border-t border-border pt-5">
        <p className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta">{index}</p>
        <h2 className="display-lg mt-4 max-w-3xl text-fg">
          {headingTo ? (
            <Link to={headingTo} className="transition-colors hover:text-muted">
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
 * The hero's ruled status strip — one live readout under the console headline.
 *
 * Ink-only: it uses `text-on-ink-muted` and the re-pointed `border-border`, so it stays
 * legible on the dark hero. The dot is the console's heartbeat.
 *
 * @param props.value - The readout, passed through verbatim.
 */
export function StatusStrip({ value }: { value: string }) {
  return (
    <Reveal delay={0.12}>
      <div className="mt-10 flex items-start gap-4 border-y border-border py-4">
        <span className="mark-dot pulse-dot mt-1.5" aria-hidden="true" />
        <p className="font-mono text-[11px] leading-relaxed tracking-[0.08em] text-on-ink-muted">
          {value}
        </p>
      </div>
    </Reveal>
  );
}

/**
 * The connector rail. A hairline that draws left-to-right across the step table, with a
 * node per step — the motion cue's "line travels across".
 *
 * Animates scaleX on the X axis only, so nothing reflows. Under reduced motion the rail
 * simply sits at its resting (drawn) state.
 *
 * @param props.count - The number of nodes, one per step.
 */
export function ConnectorRail({ count }: { count: number }) {
  return (
    <div aria-hidden="true" className="relative mt-10 h-px w-full bg-border">
      <motion.span
        className="absolute inset-y-0 left-0 block w-full origin-left bg-ink"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: DRAW_DURATION, ease: EASE_SIGNAL }}
      />
      <div className="absolute inset-x-0 top-0 flex justify-between">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="block h-1.5 w-1.5 -translate-y-1/2 bg-ink" />
        ))}
      </div>
    </div>
  );
}

/**
 * One ruled row of the step table: mono index, the step key and its body.
 *
 * @param props.index - The step's two-digit mono index.
 * @param props.step - The step, verbatim from the constants module.
 */
export function StepRow({ index, step }: { index: string; step: Side }) {
  return (
    <li className="border-b border-border">
      <Reveal>
        <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 py-6 md:grid-cols-[64px_180px_1fr] md:gap-x-8 md:py-8">
          <span className="pt-1 font-mono text-[11px] leading-none tracking-[0.22em] text-meta">
            {index}
          </span>
          <h3 className="display-sm text-fg">{step.key}</h3>
          <p className="body-copy col-start-2 max-w-2xl md:col-start-3">{step.body}</p>
        </div>
      </Reveal>
    </li>
  );
}

/**
 * One logged fault in the problem register: a mono index and a line that is gently
 * struck through as the next arrives.
 *
 * The strike is a hairline scaled on X — no text is reflowed and no layout property is
 * animated. Reduced motion leaves it at its resting state.
 *
 * @param props.index - The row's two-digit mono index.
 * @param props.text - The line, verbatim from the constants module.
 * @param props.delay - Seconds to wait before the row reveals.
 */
export function FaultRow({
  index,
  text,
  delay,
}: {
  index: string;
  text: string;
  delay: number;
}) {
  return (
    <li className="border-b border-border py-5 md:py-6">
      <Reveal delay={delay}>
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 md:gap-x-8">
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta">
            {index}
          </span>
          <span className="relative inline-block text-[17px] text-fg md:text-[19px]">
            {text}
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: delay + 0.45, ease: EASE_SIGNAL }}
            />
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/**
 * One of the two entry panels — the buyer and supplier doors into the console.
 *
 * @param props.index - The panel's two-digit mono index.
 * @param props.card - The card, verbatim from the constants module.
 * @param props.delay - Seconds to wait before the panel reveals.
 */
export function EntryPanel({
  index,
  card,
  delay,
}: {
  index: string;
  card: { readonly audience: string; readonly body: string; readonly to: string; readonly cta: string };
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        to={card.to}
        className="panel group flex h-full flex-col justify-between p-7 transition-colors hover:border-ink md:p-9"
      >
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta">
              {index}
            </span>
            <p className="eyebrow">{card.audience}</p>
          </div>
          <p className="body-copy mt-4 text-[16px]">{card.body}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg">
          {card.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </Reveal>
  );
}

/**
 * One monitored row of the status board: a pulse indicator, a mono index, the side's key
 * and its body.
 *
 * @param props.index - The row's two-digit mono index.
 * @param props.side - The side, verbatim from the constants module.
 */
export function MonitorRow({ index, side }: { index: string; side: Side }) {
  return (
    <li className="border-b border-border">
      <Reveal>
        <div className="grid grid-cols-[auto_auto_1fr] items-baseline gap-x-4 gap-y-2 py-5 md:gap-x-8 md:py-6">
          <span className="mark-dot pulse-dot self-center" aria-hidden="true" />
          <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta">
            {index}
          </span>
          <h3 className="display-sm text-fg">{side.key}</h3>
          <p className="body-copy col-span-3 max-w-2xl md:col-span-1 md:col-start-3">{side.body}</p>
        </div>
      </Reveal>
    </li>
  );
}

/**
 * One row of the coverage register — an industry, read as a logged entry rather than a chip.
 *
 * @param props.index - The entry's two-digit mono index.
 * @param props.name - The industry name, verbatim from the constants module.
 */
export function RegisterRow({ index, name }: { index: string; name: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-border py-4 md:gap-x-8">
      <span className="font-mono text-[11px] leading-none tracking-[0.22em] text-meta">{index}</span>
      <span className="text-[15px] text-fg">{name}</span>
    </li>
  );
}

/**
 * The console itself — the GRAVIYX centre of the status board.
 *
 * @param props.label - The centre label, verbatim from the constants module.
 */
export function ConsoleCard({ label }: { label: string }) {
  return (
    <div className="panel relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden p-8 text-center">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-diagonal" />
      <span className="mark-dot pulse-dot relative" aria-hidden="true" />
      <p className="eyebrow relative">{label}</p>
      <span aria-hidden="true" className="relative block h-px w-16 bg-border" />
    </div>
  );
}
