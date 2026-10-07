// ============================================================
// FILE: IndiaCoverageMap.tsx
// PURPOSE: The "Where we serve" graphic — the national outline with the eight
//          metropolitan centres Graviyx operates across, the corridors between them,
//          and a lat/lon graticule. Presentation only; all geometry is imported.
// CONNECTS TO: ./india-map-geometry (outline, cities, corridors, graticule),
//          motion/react, src/styles.css.
// ============================================================
//
// The outline is a real boundary, not a drawing: see india-map-geometry.ts for the
// source dataset, the projection and the simplification, and for the city coordinates
// that are projected through that same transform.

import { motion, useReducedMotion } from "motion/react";
import {
  INDIA_CITIES,
  INDIA_CORRIDORS,
  INDIA_GRATICULE,
  INDIA_PATH,
  INDIA_VIEWBOX,
} from "./india-map-geometry";

export function IndiaCoverageMap() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="reveal mt-12 border-y border-border">
      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
        <div className="relative min-h-[560px] overflow-hidden bg-bg sm:min-h-[680px] lg:border-r lg:border-border">
          <div className="absolute top-5 left-5 z-10 font-mono text-[10px] tracking-[0.16em] text-meta uppercase sm:top-7 sm:left-8">
            <span className="text-fg">IND / 01</span>
            <span className="mx-2 text-border-soft">—</span>
            Active coverage
          </div>

          <svg
            viewBox={INDIA_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Map of India showing Graviyx coverage across eight metropolitan centres."
          >
            <defs>
              <pattern id="atlas-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0V32" fill="none" stroke="var(--border)" strokeWidth="0.7" />
              </pattern>
            </defs>

            <rect width="560" height="620" fill="url(#atlas-grid)" opacity="0.55" />

            {/* Graticule — real parallels and meridians, produced by the same projection
                as the outline, so the labels sit where they belong. */}
            <g opacity="0.7">
              {INDIA_GRATICULE.map((line) => (
                <path
                  key={line.d}
                  d={line.d}
                  fill="none"
                  stroke="var(--border-soft)"
                  strokeWidth="0.7"
                />
              ))}
              {INDIA_GRATICULE.map((line) => (
                <text
                  key={`${line.d}-label`}
                  x={line.lx}
                  y={line.ly}
                  fill="var(--meta)"
                  fontFamily="var(--font-mono)"
                  fontSize="9"
                >
                  {line.label}
                </text>
              ))}
            </g>

            {/* The national outline. Rendered statically — the previous `pathLength: 0`
                draw-on was gated behind whileInView, so a viewer whose observer never fired
                saw no outline at all. The map's motion now comes from the corridor packets
                and the city pulses, which are continuous and cannot leave it blank. */}
            <path
              d={INDIA_PATH}
              fill="var(--surface-warm)"
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {INDIA_CORRIDORS.map((route, index) => (
              <g key={route}>
                <path
                  id={`corridor-${index}`}
                  d={route}
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth="1"
                  strokeDasharray="2 7"
                  opacity="0.32"
                />
                {/* SMIL is not covered by MotionConfig, so the travelling packet is
                    gated here. The corridor path itself always renders. */}
                {reduceMotion ? null : (
                  <circle r="2.5" fill="var(--ink)">
                    <animateMotion
                      dur={`${4.8 + index * 0.35}s`}
                      begin={`${index * 0.4}s`}
                      repeatCount="indefinite"
                      path={route}
                    />
                  </circle>
                )}
              </g>
            ))}

            {INDIA_CITIES.map((city, index) => (
              <g key={city.name}>
                {/* Scale + opacity only. Animating `r` would be a geometry animation.
                    No `initial`, so the marker is drawn at full size even if the pulse
                    never runs. */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r="9"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.2"
                  style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                  animate={{ scale: [0.7, 1.6], opacity: [0.8, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                />
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="5.5"
                  fill="var(--paper)"
                  stroke="var(--ink)"
                  strokeWidth="1.2"
                />
                <circle cx={city.x} cy={city.y} r="2.5" fill="var(--ink)" />
              </g>
            ))}
          </svg>

          <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-meta uppercase sm:bottom-7 sm:left-8">
            <span className="h-px w-10 bg-fg" />
            National operating network
          </div>
        </div>

        <div className="bg-surface px-5 py-8 sm:px-8 lg:py-16">
          <p className="font-mono text-[11px] tracking-[0.16em] text-meta uppercase">
            Metropolitan centres
          </p>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {INDIA_CITIES.map((city) => (
              <div key={city.name} className="flex items-center justify-between gap-4 py-3.5">
                <span className="text-[15px] text-fg">{city.name}</span>
                <span className="font-mono text-[10px] text-meta">{city.id}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-3">
            <span className="mark-dot pulse-dot mt-2 shrink-0" />
            <p className="text-sm leading-relaxed text-muted">
              Technology connects requirements, verified suppliers and fulfilment visibility across
              every active corridor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
