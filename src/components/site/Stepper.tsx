import { useState } from "react";
import { motion } from "motion/react";

export type Step = {
  title: string;
  body: string;
};

export function Stepper({ steps }: { steps: Step[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="relative mt-12">
      {/* traveling connector line */}
      <div className="absolute top-0 bottom-0 left-[15px] w-px bg-border md:left-[19px]" />
      <motion.div
        className="absolute top-0 left-[15px] w-px origin-top md:left-[19px]"
        style={{ background: "var(--accent)" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <div className="h-full w-px" style={{ height: "100%" }} />
      </motion.div>

      <ol className="space-y-3">
        {steps.map((step, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-12 md:pl-16"
            >
              <span
                className="absolute top-5 left-0 grid h-8 w-8 place-items-center rounded-full border font-mono text-[11px] md:h-10 md:w-10 md:text-xs"
                style={{
                  background: "var(--bg)",
                  borderColor: isOpen ? "var(--accent)" : "var(--border)",
                  color: isOpen ? "var(--accent)" : "var(--meta)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="panel w-full px-5 py-5 text-left transition-colors duration-200 hover:border-border-soft md:px-7"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="display-sm text-fg">{step.title}</span>
                  <span
                    className="text-accent transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </span>
                <motion.span
                  className="block overflow-hidden"
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <span className="body-copy mt-3 block text-[16px]">{step.body}</span>
                </motion.span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
