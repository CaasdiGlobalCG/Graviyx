// ============================================================
// FILE: HomeVariantMFuturisticWireframe.parts.tsx
// PURPOSE: The Signal Wireframe primitives — a technical drawing rendered as an
//          interface: the plotted field, the chamfered panel, the dimension rule, the
//          crosshair registration mark, the annotation leader and the two node-and-edge
//          diagrams (the HOW_IT_WORKS chain and the THE_SYSTEM hub). Every mark is a 1px
//          hairline or an SVG stroke paired with a text label, so no rule, tick or
//          crosshair ever carries meaning on its own. No colour is introduced and no
//          dimension, coordinate or status is ever printed.
// CONNECTS TO: motion/react (motion, useReducedMotion), @/components/site/Reveal,
//          HomeVariantMFuturisticWireframe.tsx (the section assembler).
// ============================================================

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";

/** Mirrors --ease-signal in src/styles.css. A tuple so Motion's transition type accepts it. */
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** Plotted-field geometry in SVG user units. Drawn, never read out. */
const GRID = 60;
const FIELD_W = 1440;
const FIELD_H = 840;
const AXIS_Y = 780;

/** A chamfered panel outline — the HUD device the database calls for instead of a radius.
 *  `clip-path` clips a border too, so a 1px chamfered outline is two stacked elements: an
 *  outer one filled with the frame colour, an inner one inset 1px and filled with the
 *  surface colour. Both carry `chamfer`, so the cut edges stay parallel and read as a
 *  hairline. A *filled* chamfered panel needs only the utility, not this wrapper. */
export function ChamferPanel({ children, className = "", frame = "bg-border", surface = "bg-paper-2" }: {
  children: ReactNode;
  className?: string;
  frame?: string;
  surface?: string;
}) {
  return (
    <div className={`chamfer ${frame} p-px`}>
      <div className={`chamfer ${surface} ${className}`}>{children}</div>
    </div>
  );
}

/** The plotted field — the drawing the variant sits on: a hairline grid, a heavier baseline
 *  with ticks, and one optional title-block label. The label is the only text it prints and
 *  must be real copy, because a numeric scale would mean inventing coordinates, which this
 *  repo forbids. Strokes are `currentColor`, so it renders as Paper on the Ink bands. The
 *  whole field is decorative and `aria-hidden`; its label is real copy repeated elsewhere. */
export function PlotField({ label, className = "" }: { label?: string; className?: string }) {
  const cols = Array.from({ length: 25 }, (_, i) => i * GRID);
  const rows = Array.from({ length: 15 }, (_, i) => i * GRID);
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg viewBox={`0 0 ${FIELD_W} ${FIELD_H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <g stroke="currentColor" strokeOpacity={0.07} strokeWidth={1}>
          {cols.map((x) => <line key={`c${x}`} x1={x} y1={0} x2={x} y2={FIELD_H} />)}
          {rows.map((y) => <line key={`r${y}`} x1={0} y1={y} x2={FIELD_W} y2={y} />)}
        </g>
        <g stroke="currentColor" strokeOpacity={0.32} strokeWidth={1}>
          <line x1={0} y1={AXIS_Y} x2={FIELD_W} y2={AXIS_Y} />
          {cols.map((x) => <line key={`t${x}`} x1={x} y1={AXIS_Y} x2={x} y2={AXIS_Y + 9} />)}
        </g>
      </svg>
      {label ? (
        <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">{label}</span>
      ) : null}
    </div>
  );
}

/** A registration crosshair — the CAD mark that anchors a node or a rule. Decorative: always
 *  paired with a text label. `className` replaces the default tone, so pass a colour. */
export function Crosshair({ className = "text-meta" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 ${className}`}>
      <line x1={8} y1={0} x2={8} y2={16} stroke="currentColor" strokeWidth={1} />
      <line x1={0} y1={8} x2={16} y2={8} stroke="currentColor" strokeWidth={1} />
      <circle cx={8} cy={8} r={3} fill="none" stroke="currentColor" strokeWidth={1} />
    </svg>
  );
}

/** The four registration marks at a band's corners. `currentColor`, so it reads on Ink —
 *  unlike `hud-corners`, whose `--hud-rule` is fixed black and vanishes on an Ink band. */
export function CornerMarks({ className = "text-meta" }: { className?: string }) {
  const spots = ["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {spots.map((spot) => (
        <span key={spot} className={`absolute ${spot}`}>
          <Crosshair className={className} />
        </span>
      ))}
    </div>
  );
}

/** A dimension rule: a hairline span with a tick at each end and a leader at the midpoint.
 *  It prints no number — a dimension readout would be invented data — so it stays
 *  decorative structure. */
export function DimensionRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      <span className="h-3.5 w-px bg-border-soft" />
      <span className="h-px flex-1 bg-border" />
      <span className="h-1.5 w-px bg-border" />
      <span className="h-px flex-1 bg-border" />
      <span className="h-3.5 w-px bg-border-soft" />
    </div>
  );
}

/** A mono annotation label on a leader line. The text must be real copy from the constants
 *  module: an annotation is a readout, and readouts are never invented. */
export function Annotation({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-[10px] leading-none tracking-[0.22em] text-muted uppercase ${className}`}>
      <span aria-hidden="true" className="h-px w-5 shrink-0 bg-border-soft" />
      {text}
    </p>
  );
}

/** The ruled section head: crosshairs, a measured rule, then the heading. */
export function WireHead({
  heading,
  lead,
  className = "",
}: {
  heading: string;
  lead?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div aria-hidden="true" className="flex items-center gap-3">
        <Crosshair className="text-fg" />
        <span className="h-px flex-1 bg-border" />
        <Crosshair className="text-fg" />
      </div>
      <h2 className="display-lg mt-6 max-w-3xl text-fg">{heading}</h2>
      {lead ? <p className="lead mt-5 max-w-2xl">{lead}</p> : null}
    </Reveal>
  );
}

/** One step of HOW_IT_WORKS as a node on the chain. From md up the chain runs horizontally
 *  and each node sits on a shared rule; below md it collapses to a vertical spine — a
 *  simplified drawing, not a shrunken desktop one. */
function StepCell({ step, last }: { step: { readonly key: string; readonly body: string }; last: boolean }) {
  return (
    <li className="relative pb-8 pl-8 md:pb-0 md:pl-0 md:pt-12">
      <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px bg-border md:hidden" />
      <span aria-hidden="true" className="absolute top-1 left-0 -translate-x-1/2 md:hidden">
        <Crosshair className="text-fg" />
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-2 left-0 hidden h-px bg-border md:block ${last ? "w-full" : "w-[calc(100%+1.5rem)]"}`}
      />
      <span aria-hidden="true" className="absolute top-0 left-0 hidden -translate-x-1/2 md:block">
        <Crosshair className="text-fg" />
      </span>
      <h3 className="display-sm text-fg">{step.key}</h3>
      <p className="body-copy mt-3 max-w-xs text-[15px]">{step.body}</p>
    </li>
  );
}

/** The HOW_IT_WORKS node chain: four nodes, edges between them, in one reading order. */
export function StepChain({ steps }: { steps: readonly { readonly key: string; readonly body: string }[] }) {
  return (
    <ol className="mt-14 grid md:grid-cols-4 md:gap-x-6">
      {steps.map((step, i) => (
        <StepCell key={step.key} step={step} last={i === steps.length - 1} />
      ))}
    </ol>
  );
}

/** The four side positions around the centre, in THE_SYSTEM.sides order. */
const HUB_NODES = [
  { x: 156, y: 96, tx: 156, ty: 68 },
  { x: 564, y: 96, tx: 564, ty: 68 },
  { x: 156, y: 344, tx: 156, ty: 386 },
  { x: 564, y: 344, tx: 564, ty: 386 },
] as const;

const HUB_CENTRE = { x: 360, y: 220 } as const;

/** A pulse travelling one edge of the hub, toward the centre. SMIL <animateMotion> is not
 *  covered by <MotionConfig reducedMotion="user">, so it is gated explicitly; the edges and
 *  nodes always render, so the diagram stays legible without the pulse. */
function HubPulse({ path, delay }: { path: string; delay: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <rect x={-4} y={-4} width={8} height={8} fill="currentColor">
      <animateMotion dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
    </rect>
  );
}

/** THE_SYSTEM as a node-and-edge diagram: the four sides on the corners, GRAVIYX at the
 *  centre, one hairline edge each. The frame is a chamfered SVG polygon — the figure has a
 *  known aspect ratio, so a real polygon keeps a true 45° cut in one element, where an HTML
 *  clip-path would need two stacked elements and still only approximate the outline. Node
 *  labels are the real side keys and the real centre; the bodies follow in the keyed rows
 *  below, as a labelled figure and its legend. Shown from sm up — a phone gets HubChain. */
export function HubGraph({ centre, sides, label }: {
  centre: string;
  sides: readonly { readonly key: string }[];
  label: string;
}) {
  return (
    <div className="relative mt-14 hidden bg-grid sm:block">
      <svg viewBox="0 0 720 440" role="img" aria-label={label} className="w-full text-fg">
        <polygon points="14,1 719,1 719,426 705,439 1,439 1,14" fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <g stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke">
          {HUB_NODES.map((n) => <line key={`e${n.x}-${n.y}`} x1={n.x} y1={n.y} x2={HUB_CENTRE.x} y2={HUB_CENTRE.y} />)}
          {HUB_NODES.map((n) => <rect key={`n${n.x}-${n.y}`} x={n.x - 6} y={n.y - 6} width={12} height={12} fill="var(--paper)" />)}
          <rect x={HUB_CENTRE.x - 11} y={HUB_CENTRE.y - 11} width={22} height={22} fill="var(--paper)" />
        </g>
        {HUB_NODES.map((n, i) => (
          <text key={`t${i}`} x={n.tx} y={n.ty} textAnchor="middle" fill="currentColor" className="font-display" fontSize={15} fontWeight={500}>
            {sides[i]?.key}
          </text>
        ))}
        <text x={HUB_CENTRE.x} y={HUB_CENTRE.y + 5} textAnchor="middle" fill="currentColor" className="font-mono" fontSize={12} letterSpacing={2}>
          {centre}
        </text>
        {HUB_NODES.map((n, i) => (
          <HubPulse key={`p${i}`} path={`M ${n.x} ${n.y} L ${HUB_CENTRE.x} ${HUB_CENTRE.y}`} delay={i * 0.8} />
        ))}
      </svg>
    </div>
  );
}

/** One node on a vertical spine — the phone rendering of a diagram. */
function SpineNode({ children, head = false }: { children: ReactNode; head?: boolean }) {
  return (
    <li className={`relative border-t border-border py-5 pl-8 ${head ? "first:border-t-0" : ""}`}>
      <span aria-hidden="true" className="absolute top-7 left-0 -translate-x-1/2">
        <Crosshair />
      </span>
      {children}
    </li>
  );
}

/** The phone rendering of THE_SYSTEM: the radial hub simplified to a vertical spine — the
 *  centre at the head, the four sides as nodes below. Keys only; the bodies follow in the
 *  keyed rows, so the drawing is never the sole carrier of meaning. */
export function HubChain({ centre, sides }: { centre: string; sides: readonly { readonly key: string }[] }) {
  return (
    <ol className="mt-12 border-l border-border sm:hidden">
      <SpineNode head>
        <p className="eyebrow">{centre}</p>
      </SpineNode>
      {sides.map((side) => (
        <SpineNode key={side.key}>
          <p className="display-sm text-fg">{side.key}</p>
        </SpineNode>
      ))}
    </ol>
  );
}

/** A ruled row for the PROBLEM and TRUST lists: a crosshair, the copy, and — on the
 *  PROBLEM list, which is the section's one signature motion — a hairline drawn across the
 *  line as it arrives. The crosshair and the strike are both decorative and `aria-hidden`;
 *  the sentence is the only thing that carries meaning. */
export function StrikeRow({ text, strike = false }: { text: string; strike?: boolean }) {
  return (
    <li className="border-b border-border">
      <div className="flex items-baseline gap-4 py-5 md:gap-6 md:py-6">
        <Crosshair className="mt-1 text-fg" />
        <span className="relative inline-block text-[17px] text-fg md:text-[19px]">
          {text}
          {strike ? (
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 left-0 h-px w-full origin-left bg-steel-30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            />
          ) : null}
        </span>
      </div>
    </li>
  );
}
