import { motion } from "motion/react";

const STAGES = [
  { code: "01", title: "Pickup orchestration", body: "Supplier-ready dispatch planning across origin, load and delivery constraints." },
  { code: "02", title: "In-transit visibility", body: "Milestones, exceptions and ownership remain visible to both sides of the order." },
  { code: "03", title: "Delivery evidence", body: "Receipt, condition and supporting documents close the operational record." },
] as const;

export function SupplyChainNetwork() {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
      {STAGES.map((stage, index) => (
        <motion.article
          key={stage.code}
          className="relative bg-surface p-7 md:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.5, delay: index * 0.14 }}
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-border-soft font-mono text-[10px] text-accent">
              {stage.code}
            </span>
            <motion.span
              className="h-px flex-1 bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.14 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <h3 className="text-[22px] text-fg">{stage.title}</h3>
          <p className="body-copy mt-3 text-[16px]">{stage.body}</p>
        </motion.article>
      ))}
    </div>
  );
}