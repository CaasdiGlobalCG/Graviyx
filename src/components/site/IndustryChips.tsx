import { motion } from "motion/react";

export const INDUSTRIES = [
  "Manufacturing",
  "Engineering",
  "Construction & Infrastructure",
  "Oil & Gas",
  "Electrical & Electronics",
  "Automotive & Transport",
  "Healthcare Supplies",
  "FMCG",
  "Packaging",
];

export function IndustryChips({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <div className={`mt-10 flex flex-wrap gap-3 ${size === "lg" ? "md:gap-4" : ""}`}>
      {INDUSTRIES.map((name, i) => (
        <motion.span
          key={name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          whileHover={{ rotate: -1.2, scale: 1.04, borderColor: "var(--ink)" }}
          className={`cursor-default rounded-full border border-border bg-surface text-fg ${
            size === "lg" ? "px-6 py-4 text-[16px] md:text-[18px]" : "px-5 py-3 text-[15px]"
          }`}
        >
          {name}
        </motion.span>
      ))}
    </div>
  );
}
