import { motion } from "motion/react";

const STAGES = [
  "Discovery",
  "RFx & Quotation",
  "Purchase Order",
  "Fulfilment",
  "Analytics",
];

export function PlatformStrip() {
  return (
    <div className="relative mt-14">
      <div className="absolute top-[13px] right-0 left-0 hidden h-px bg-border lg:block" />
      <motion.div
        className="absolute top-[13px] left-0 hidden h-px origin-left lg:block"
        style={{ background: "var(--ink)", width: "100%" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {STAGES.map((stage, i) => (
          <motion.li
            key={stage}
            className="relative flex items-start gap-4 lg:block"
            initial={{ y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.28 }}
          >
            <span className="relative mt-1 grid h-[27px] w-[27px] shrink-0 place-items-center lg:mt-0">
              <span className="h-[11px] w-[11px] rounded-full bg-ink" />
              <span className="absolute inset-0 rounded-full border border-border-soft" />
            </span>
            <div className="lg:mt-5">
              <p className="font-mono text-[11px] tracking-[0.2em] text-meta">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[15px] font-[500] leading-snug text-fg">{stage}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
