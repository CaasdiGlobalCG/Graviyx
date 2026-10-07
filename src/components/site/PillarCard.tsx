import { motion } from "motion/react";
import type { ReactNode } from "react";

export type Pillar = {
  title: string;
  body: string;
  index?: string;
};

export function PillarCard({
  title,
  body,
  index,
  delay = 0,
  icon,
}: Pillar & { delay?: number; icon?: ReactNode }) {
  return (
    <motion.article
      className="panel group relative h-full p-6 md:p-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="mb-5 flex items-center gap-3">
        {icon ? (
          <span className="text-accent">{icon}</span>
        ) : index ? (
          <span className="font-mono text-xs tracking-[0.2em] text-accent">{index}</span>
        ) : null}
        <span className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-border-soft" />
      </div>
      <h3 className="display-sm text-fg">{title}</h3>
      <p className="body-copy mt-3 text-[16px]">{body}</p>
    </motion.article>
  );
}

export function PillarGrid({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((p, i) => (
        <PillarCard
          key={p.title}
          {...p}
          index={p.index ?? String(i + 1).padStart(2, "0")}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}
