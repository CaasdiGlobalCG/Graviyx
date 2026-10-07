import { motion } from "motion/react";

export function ProblemList({ items }: { items: string[] }) {
  return (
    <ul className="mt-12 divide-y divide-[color:var(--border)] border-y border-border">
      {items.map((item, i) => (
        <motion.li
          key={item}
          className="flex items-center gap-5 py-5 md:gap-8 md:py-7"
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <motion.span
            className="hidden h-px bg-border md:block"
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
          />
          <span className="text-[17px] text-fg md:text-[20px]">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}
