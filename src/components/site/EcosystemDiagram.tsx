import { useReducedMotion } from "motion/react";

const INPUTS = [
  { code: "IN-01", label: "Buyer demand", detail: "Specification · timing · terms", y: 112 },
  { code: "IN-02", label: "Verified supply", detail: "Capacity · compliance · price", y: 294 },
] as const;

const OUTPUTS = [
  { code: "OUT-01", label: "Fulfilment", detail: "PO · movement · evidence", y: 112 },
  { code: "OUT-02", label: "Intelligence", detail: "Analytics · forecast · memory", y: 294 },
] as const;

const ROUTES = [
  { path: "M252 112 H320 Q350 112 350 142 V206 H650 V142 Q650 112 680 112 H748", delay: 0 },
  { path: "M252 294 H320 Q350 294 350 264 V236 H650 V264 Q650 294 680 294 H748", delay: 0.35 },
  { path: "M252 112 H298 Q326 112 340 138 L410 270 Q424 294 452 294 H748", delay: 0.7 },
  { path: "M252 294 H298 Q326 294 340 268 L410 136 Q424 112 452 112 H748", delay: 1.05 },
] as const;

function FlowPacket({ path, delay }: { path: string; delay: number }) {
  const reduceMotion = useReducedMotion();

  // SMIL <animateMotion> is not covered by <MotionConfig reducedMotion="user">,
  // so it is gated here. The routes and nodes still render, which keeps the
  // diagram fully legible without the travelling packet.
  if (reduceMotion) return null;

  return (
    <circle r="4" fill="var(--ink)">
      <animateMotion dur="5.6s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

export function EcosystemDiagram() {
  return (
    <div className="reveal neu-raised mx-auto mt-14 max-w-6xl overflow-hidden p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between border-b border-border pb-4 font-mono text-[9px] uppercase text-meta md:text-[10px]">
        <span>GRAVIYX / Exchange architecture</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-fg pulse-dot" />
          Network active
        </span>
      </div>

      <svg
        viewBox="0 0 1000 440"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-label="Buyer demand and verified supply are routed through Graviyx into fulfilment and procurement intelligence, which continuously informs future decisions."
      >
        <defs>
          <pattern id="exchange-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="var(--border)" strokeWidth="0.6" />
          </pattern>
          <clipPath id="routing-plane">
            <rect x="350" y="54" width="300" height="330" />
          </clipPath>
        </defs>

        <rect x="350" y="54" width="300" height="330" fill="url(#exchange-grid)" />
        <rect x="350" y="54" width="300" height="330" fill="none" stroke="var(--border-soft)" />
        <text x="370" y="78" fill="var(--meta)" fontSize="9" fontFamily="var(--font-mono)">ORCHESTRATION PLANE / 01</text>

        {/* Rendered statically. These routes are `fill="none"` strokes, so the previous
            `pathLength: 0` draw-on left them completely invisible for any viewer whose
            whileInView observer never fired. The diagram's motion is now carried entirely
            by the SMIL packets below, which cannot leave it blank. */}
        {ROUTES.map((route, index) => (
          <g key={route.path}>
            <path
              d={route.path}
              fill="none"
              stroke="var(--border-soft)"
              strokeWidth={index < 2 ? 1.5 : 1}
              strokeDasharray={index < 2 ? "none" : "4 6"}
            />
            <FlowPacket path={route.path} delay={route.delay} />
          </g>
        ))}

        <path
          d="M836 342 V408 H164 V160"
          fill="none"
          stroke="var(--meta)"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
        <path d="M158 168 L164 156 L170 168" fill="none" stroke="var(--fg)" strokeWidth="1.2" />
        <text x="500" y="426" textAnchor="middle" fill="var(--meta)" fontSize="9" fontFamily="var(--font-mono)">
          CONTINUOUS LEARNING / FUTURE RECOMMENDATIONS
        </text>

        {INPUTS.map((node) => (
          <g key={node.code}>
            <rect x="44" y={node.y - 42} width="208" height="84" fill="var(--neu-surface)" stroke="var(--border-soft)" />
            <text x="62" y={node.y - 18} fill="var(--meta)" fontSize="9" fontFamily="var(--font-mono)">{node.code}</text>
            <text x="62" y={node.y + 6} fill="var(--fg)" fontSize="16" fontFamily="var(--font-mono)">{node.label}</text>
            <text x="62" y={node.y + 26} fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">{node.detail}</text>
          </g>
        ))}

        {OUTPUTS.map((node) => (
          <g key={node.code}>
            <rect x="748" y={node.y - 42} width="208" height="84" fill="var(--neu-surface)" stroke="var(--border-soft)" />
            <text x="766" y={node.y - 18} fill="var(--meta)" fontSize="9" fontFamily="var(--font-mono)">{node.code}</text>
            <text x="766" y={node.y + 6} fill="var(--fg)" fontSize="16" fontFamily="var(--font-mono)">{node.label}</text>
            <text x="766" y={node.y + 26} fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">{node.detail}</text>
          </g>
        ))}

        <g>
          <rect x="414" y="174" width="172" height="92" fill="var(--fg)" />
          <text x="500" y="210" textAnchor="middle" fill="var(--bg)" fontSize="9" fontFamily="var(--font-mono)">VERIFIED MARKETPLACE</text>
          <text x="500" y="239" textAnchor="middle" fill="var(--bg)" fontSize="23" fontFamily="var(--font-mono)">GRAVIYX</text>
          <path d="M430 252 H570" stroke="var(--bg)" strokeWidth="0.7" opacity="0.4" />
        </g>
      </svg>

      <div className="md:hidden" role="img" aria-label="Graviyx exchange network">
        <div className="grid grid-cols-2 gap-px border border-border bg-border">
          {INPUTS.map((node) => (
            <div key={node.code} className="bg-bg p-4">
              <p className="font-mono text-[9px] text-meta">{node.code}</p>
              <p className="mt-4 font-mono text-[13px] text-fg">{node.label}</p>
              <p className="mt-1 font-mono text-[8px] leading-4 text-muted">{node.detail}</p>
            </div>
          ))}
        </div>
        <div className="relative my-4 border-y border-border px-5 py-9 text-center">
          <span className="absolute left-1/4 top-0 h-4 border-l border-border-soft" />
          <span className="absolute right-1/4 top-0 h-4 border-l border-border-soft" />
          <p className="font-mono text-[8px] text-meta">ORCHESTRATION PLANE / 01</p>
          <div className="mx-auto mt-3 max-w-[190px] bg-fg px-5 py-4 text-bg">
            <p className="font-mono text-[8px]">VERIFIED MARKETPLACE</p>
            <p className="mt-1 font-mono text-lg">GRAVIYX</p>
          </div>
          <span className="absolute bottom-0 left-1/4 h-4 border-l border-border-soft" />
          <span className="absolute bottom-0 right-1/4 h-4 border-l border-border-soft" />
        </div>
        <div className="grid grid-cols-2 gap-px border border-border bg-border">
          {OUTPUTS.map((node) => (
            <div key={node.code} className="bg-bg p-4">
              <p className="font-mono text-[9px] text-meta">{node.code}</p>
              <p className="mt-4 font-mono text-[13px] text-fg">{node.label}</p>
              <p className="mt-1 font-mono text-[8px] leading-4 text-muted">{node.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 font-mono text-[8px] uppercase text-meta">
          <span className="h-px flex-1 border-t border-dashed border-border-soft" />
          Continuous learning / future recommendations
          <span className="h-px flex-1 border-t border-dashed border-border-soft" />
        </div>
      </div>
    </div>
  );
}