import { motion } from "motion/react";

const INDIA_PATH =
  "M210.5 35 L225.6 56.3 224.2 71.1 229.8 80.4 229.3 89.7 219.2 87.2 223.2 107.3 237 118.8 256.5 131.5 247.6 139.7 242.1 156.7 255.7 163.6 268.9 172.5 287.2 182.7 306.4 185 314.5 194.2 325.4 196 342.3 200.2 353.9 199.9 355.5 192.7 353.7 181.2 354.8 173.4 363.3 169.5 364.5 183.8 364.8 187.5 377.6 194.4 386.4 191.5 398.2 192.8 409.7 192.2 410.7 181.1 405 175.3 416.3 173 429 159.5 445.2 147.9 457 152.4 467 144.7 473.6 156 468.8 163.6 483.9 166.4 485 173.2 480.1 176.6 481.2 187.8 471.2 184.5 453 197 453.5 207.4 445.7 222.7 445 231.5 438.8 246.5 427.8 242.3 427.3 261.1 424.1 267.3 425.6 275 418.6 279.3 411.3 250.5 407.4 250.6 405.1 262.2 397.4 252.8 401.7 242.4 408 241.4 414.5 226 406.4 222.9 393.4 223.2 380 220.7 378.8 208.1 372.1 207.2 361 199.3 356 211.7 366.2 221.3 357.4 228 354.3 234.7 362.9 239.5 360.5 250.5 365.4 264.1 367.6 279.1 365.6 285.7 356 285.5 338.7 289.3 339.5 302.9 332 313.7 311.9 325.9 296.2 347.3 285.6 358.7 271.6 370.6 271.6 379 264.6 383.4 252 389.9 245.4 390.9 241.2 404.8 244.1 428.4 244.9 443.4 238.9 460.7 238.9 491.6 231.6 492.4 225.2 506.3 229.5 512.3 216.7 517.4 212 529.8 206.4 535 193.1 518 186.6 492.6 181.2 474.3 176.3 465.7 168.8 448.2 165.3 425.5 162.9 414.2 150.2 389.2 144.3 354 140.2 330.8 140.2 308.8 137.5 291.8 117.1 302.7 107.2 300.5 88.9 278.5 95.6 271.9 91.5 264.8 75 249.4 84.3 237.2 115.2 237.3 112.4 221.7 104.5 212.5 102.9 198.5 93.8 190.3 109.2 171.3 125.5 172.7 140.2 153.6 149 135.2 162.6 117 162.4 104 174.4 93.5 163 84.6 158.2 72.3 153.2 56.4 160.1 48.5 181.3 53 197 50.3 210.5 35Z";

const CITIES = [
  { id: "01", name: "Delhi NCR", x: 200.2, y: 158.4 },
  { id: "02", name: "Ahmedabad", x: 136.6, y: 261.6 },
  { id: "03", name: "Mumbai", x: 141, y: 333.1 },
  { id: "04", name: "Pune", x: 154.7, y: 343.3 },
  { id: "05", name: "Hyderabad", x: 219.7, y: 364 },
  { id: "06", name: "Bengaluru", x: 207.1, y: 444.1 },
  { id: "07", name: "Chennai", x: 244.7, y: 442.1 },
  { id: "08", name: "Kolkata", x: 358.1, y: 269.7 },
] as const;

const CORRIDORS = [
  "M200.2 158.4 Q142 214 136.6 261.6",
  "M200.2 158.4 Q295 185 358.1 269.7",
  "M136.6 261.6 Q128 300 141 333.1",
  "M141 333.1 Q184 334 219.7 364",
  "M219.7 364 Q202 405 207.1 444.1",
  "M219.7 364 Q247 401 244.7 442.1",
  "M358.1 269.7 Q302 348 244.7 442.1",
] as const;

const REGIONAL_LINES = [
  "M112 221 Q178 226 242 207 Q306 191 361 199",
  "M93 278 Q156 272 222 286 Q295 300 339 302",
  "M140 331 Q190 316 242 332 Q274 340 296 347",
  "M151 389 Q194 381 245 391",
  "M168 448 Q207 427 244 428",
] as const;

export function IndiaCoverageMap() {
  return (
    <div className="mt-12 border-y border-border">
      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
        <div className="relative min-h-[520px] overflow-hidden bg-bg sm:min-h-[640px] lg:border-r lg:border-border">
          <div className="absolute left-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-meta sm:left-8 sm:top-7">
            <span className="text-fg">IND / 01</span>
            <span className="mx-2 text-border-soft">—</span>
            Active coverage
          </div>

          <svg
            viewBox="0 0 560 580"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Map of India showing Graviyx coverage across eight metropolitan centres."
          >
            <defs>
              <pattern id="atlas-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0V32" fill="none" stroke="var(--border)" strokeWidth="0.7" />
              </pattern>
              <clipPath id="india-atlas-clip">
                <path d={INDIA_PATH} />
              </clipPath>
            </defs>

            <rect width="560" height="580" fill="url(#atlas-grid)" opacity="0.55" />
            <path d="M26 70H534M26 510H534" stroke="var(--border-soft)" strokeWidth="0.7" />
            <path d="M62 28V552M498 28V552" stroke="var(--border-soft)" strokeWidth="0.7" />
            <text x="29" y="62" fill="var(--meta)" fontFamily="var(--font-mono)" fontSize="9">35° N</text>
            <text x="29" y="523" fill="var(--meta)" fontFamily="var(--font-mono)" fontSize="9">08° N</text>
            <text x="66" y="547" fill="var(--meta)" fontFamily="var(--font-mono)" fontSize="9">68° E</text>
            <text x="465" y="547" fill="var(--meta)" fontFamily="var(--font-mono)" fontSize="9">97° E</text>

            <motion.path
              d={INDIA_PATH}
              fill="var(--surface-warm)"
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            />

            <g clipPath="url(#india-atlas-clip)" opacity="0.8">
              {REGIONAL_LINES.map((line) => (
                <path key={line} d={line} fill="none" stroke="var(--border-soft)" strokeWidth="0.8" />
              ))}
              <path d="M218 87Q192 180 219 364T207 444" fill="none" stroke="var(--border-soft)" strokeWidth="0.8" />
              <path d="M306 185Q277 256 271 371" fill="none" stroke="var(--border-soft)" strokeWidth="0.8" />
            </g>

            {CORRIDORS.map((route, index) => (
              <g key={route}>
                <motion.path
                  id={`corridor-${index}`}
                  d={route}
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth="1"
                  strokeDasharray="2 7"
                  opacity="0.32"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.35 + index * 0.09 }}
                />
                <circle r="2.5" fill="var(--accent)">
                  <animateMotion dur={`${4.8 + index * 0.35}s`} begin={`${index * 0.4}s`} repeatCount="indefinite" path={route} />
                </circle>
              </g>
            ))}

            {CITIES.map((city, index) => (
              <motion.g
                key={city.name}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.65 + index * 0.06 }}
                style={{ transformOrigin: `${city.x}px ${city.y}px` }}
              >
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r="9"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                  animate={{ r: [6, 14], opacity: [0.8, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2, ease: "easeOut" }}
                />
                <circle cx={city.x} cy={city.y} r="5.5" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1.2" />
                <circle cx={city.x} cy={city.y} r="2.5" fill="var(--accent)" />
              </motion.g>
            ))}
          </svg>

          <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-meta sm:bottom-7 sm:left-8">
            <span className="h-px w-10 bg-fg" />
            National operating network
          </div>
        </div>

        <div className="bg-surface px-5 py-8 sm:px-8 lg:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-meta">Metropolitan centres</p>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {CITIES.map((city) => (
              <div key={city.name} className="flex items-center justify-between gap-4 py-3.5">
                <span className="text-[15px] text-fg">{city.name}</span>
                <span className="font-mono text-[10px] text-meta">{city.id}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-3">
            <span className="accent-dot pulse-dot mt-2 shrink-0" />
            <p className="text-sm leading-relaxed text-muted">
              Technology connects requirements, verified suppliers and fulfilment visibility across every active corridor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}