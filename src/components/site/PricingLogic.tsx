import { motion } from "motion/react";

export type PricingPath = {
  name: string;
  body: string;
};

function PathGlyph({ variant, delay }: { variant: number; delay: number }) {
  const paths = [
    "M4 28 C 40 28, 48 8, 92 8",
    "M4 18 C 34 18, 34 34, 60 34 C 82 34, 82 8, 92 8",
    "M4 30 L 30 30 L 30 14 L 60 14 L 60 30 L 92 30",
  ];
  return (
    <svg viewBox="0 0 96 40" className="h-10 w-24" aria-hidden="true">
      <motion.path
        d={paths[variant % paths.length]}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        initial={false}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay }}
      />
      <motion.circle
        r="3"
        fill="var(--ink)"
        initial={false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.9 }}
        cx="92"
        cy={variant === 2 ? 30 : 8}
      />
    </svg>
  );
}

export function PricingLogic({ paths }: { paths: PricingPath[] }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {paths.map((p, i) => (
        <motion.div
          key={p.name}
          className="panel p-6 md:p-7"
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <PathGlyph variant={i} delay={i * 0.15} />
          <h3 className="display-sm mt-5 text-fg">{p.name}</h3>
          <p className="body-copy mt-3 text-[16px]">{p.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
