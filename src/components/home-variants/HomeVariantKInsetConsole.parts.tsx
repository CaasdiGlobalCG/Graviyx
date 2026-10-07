// ============================================================
// FILE: HomeVariantKInsetConsole.parts.tsx
// PURPOSE: The Inset Console primitives — the recessed well, the ruled row that sits down
//          inside a channel, the engraved slot, the console head and the raised control that
//          presses into the panel. Every surface here is cut INTO the page, not pushed out.
// CONNECTS TO: motion/react, @tanstack/react-router (Link), @/components/site/Reveal,
//          HomeVariantKInsetConsole.tsx (the section assembler).
// ============================================================
//
// Neumorphic rule this file depends on: an element's background must match its parent canvas
// exactly, so every section that renders one of these primitives carries `neu-canvas`.

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";

/** Mirrors --ease-signal in src/styles.css. A tuple so Motion's type accepts it. */
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** The press transition, expressed through the motion tokens rather than a new curve. */
const PRESS = "transition-[translate] duration-[var(--motion-fast)] ease-[var(--ease-signal)]";
/** An outline ring, not a box-shadow: the neu-* utilities already own box-shadow. */
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/** Zero-pads a zero-based position into the console's two-digit mono index. */
export function rowIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/** Places the four sides around the centre plate on large screens; they stack below that. */
export function sidePlacement(i: number): string {
  const placement = [
    "lg:col-start-1 lg:row-start-1",
    "lg:col-start-1 lg:row-start-2",
    "lg:col-start-3 lg:row-start-1",
    "lg:col-start-3 lg:row-start-2",
  ][i];
  return placement ?? "";
}

/** The mono readout. Every index and label in the console is set in it. */
export function Readout({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[11px] leading-none tracking-[0.22em] text-muted tabular-nums ${className}`}
    >
      {children}
    </span>
  );
}

/** The section head: the mono index sunk into a pressed slot, the heading set beside it. */
export function ConsoleHead({ index, heading }: { index: string; heading: string }) {
  return (
    <Reveal>
      <div className="flex items-start gap-5 md:gap-8">
        <span className="neu-pressed mt-1 inline-flex w-fit shrink-0 items-center px-4 py-3 md:px-5">
          <Readout>{index}</Readout>
        </span>
        <h2 className="display-lg max-w-3xl text-fg">{heading}</h2>
      </div>
    </Reveal>
  );
}

/**
 * A ruled row sitting down inside a channel. The strike-through is a hairline scaled on X, so
 * no line of type ever reflows and the animation stays on transform.
 */
export function ChannelRow({
  index,
  text,
  delay = 0,
  strike = false,
}: {
  index: string;
  text: string;
  delay?: number;
  strike?: boolean;
}) {
  return (
    <li className="py-5 md:py-6">
      <Reveal delay={delay}>
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 md:gap-x-8">
          <Readout>{index}</Readout>
          <span className="relative inline-block text-[17px] text-fg md:text-[19px]">
            {text}
            {strike ? (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: delay + 0.4, ease: EASE }}
              />
            ) : null}
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/** The line that travels across the four steps: a hairline scaled on X from the left. */
export function TravellingLine() {
  return (
    <div aria-hidden="true" className="relative hidden h-px w-full bg-border lg:block">
      <motion.span
        className="absolute inset-y-0 left-0 w-full origin-left bg-ink"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </div>
  );
}

/** One step of HOW_IT_WORKS, cut into its own shallow slot. The dot lights it up in turn. */
export function StepSlot({
  index,
  step,
  delay,
}: {
  index: string;
  step: { readonly key: string; readonly body: string };
  delay: number;
}) {
  return (
    <li className="neu-inset flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center justify-between gap-3">
        <Readout>{index}</Readout>
        <span
          aria-hidden="true"
          className="mark-dot pulse-dot"
          style={{ animationDelay: `${delay * 0.45}s` }}
        />
      </div>
      <h3 className="display-sm mt-5 text-fg">{step.key}</h3>
      <p className="body-copy mt-3 text-[15px]">{step.body}</p>
    </li>
  );
}

/** One side of THE_SYSTEM, cut into a slot and placed around the centre plate. */
export function SideSlot({
  index,
  side,
  placement,
  delay,
}: {
  index: string;
  side: { readonly key: string; readonly body: string };
  placement: string;
  delay: number;
}) {
  return (
    <div className={`neu-inset flex flex-col p-6 md:p-7 ${placement}`}>
      <div className="flex items-center justify-between gap-3">
        <Readout>{index}</Readout>
        <span
          aria-hidden="true"
          className="mark-dot pulse-dot"
          style={{ animationDelay: `${delay * 0.45}s` }}
        />
      </div>
      <h3 className="display-sm mt-4 text-fg">{side.key}</h3>
      <p className="body-copy mt-2 text-[15px]">{side.body}</p>
    </div>
  );
}

/** The centre of THE_SYSTEM: the mono readout pressed into a plate. */
export function CentrePlate({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`neu-pressed flex flex-col items-center justify-center gap-5 p-6 text-center md:p-8 ${className}`}
    >
      <span aria-hidden="true" className="mark-dot pulse-dot" />
      <Readout>{label}</Readout>
      <span aria-hidden="true" className="block h-px w-14 bg-border" />
    </div>
  );
}

/** One industry, cut into a slot. The name is the link. */
export function IndustryKey({ index, name, to }: { index: string; name: string; to: string }) {
  return (
    <li>
      <Link
        to={to}
        className={`group neu-inset flex items-center gap-4 px-5 py-4 hover:-translate-y-0.5 ${PRESS} ${FOCUS}`}
      >
        <Readout className="group-hover:text-ink">{index}</Readout>
        <span className="display-sm text-fg">{name}</span>
      </Link>
    </li>
  );
}

/** One of the two ways in: a door raised out of the panel, its label sunk into it. */
export function DoorCard({
  index,
  card,
  delay,
}: {
  index: string;
  card: { readonly audience: string; readonly body: string; readonly to: string; readonly cta: string };
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={card.to}
        className={`group neu-raised flex h-full flex-col justify-between p-7 hover:-translate-y-0.5 md:p-9 ${PRESS} ${FOCUS}`}
      >
        <div>
          <span className="neu-pressed inline-flex items-center px-3 py-2">
            <Readout>{index}</Readout>
          </span>
          <p className="eyebrow mt-5">{card.audience}</p>
          <p className="body-copy mt-4 text-[16px]">{card.body}</p>
        </div>
        <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-ink uppercase">
          {card.cta}
          <span
            aria-hidden="true"
            className="transition-transform duration-[var(--motion-fast)] group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

/**
 * The console control. Raised at rest, pressed on :active — and the press also drops it 2px,
 * so the state survives greyscale and print rather than living in the shadow alone.
 */
export function ConsoleAction({
  to,
  children,
  tone = "raised",
  className = "",
}: {
  to: string;
  children: ReactNode;
  tone?: "raised" | "flat";
  className?: string;
}) {
  const skin =
    tone === "raised"
      ? "neu-raised text-ink active:neu-pressed"
      : "neu-flat text-muted hover:text-ink active:neu-pressed";

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium active:translate-y-[2px] ${PRESS} ${FOCUS} ${skin} ${className}`}
    >
      {children}
    </Link>
  );
}
