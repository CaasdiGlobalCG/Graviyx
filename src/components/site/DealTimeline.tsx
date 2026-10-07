import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const MARKERS = [
  { day: "Day 0", label: "RFQ submitted", body: "Buyer submits an RFQ for a batch order." },
  { day: "Day 0", label: "Shortlist reviewed", body: "AI shortlists 6 vendors. A specialist reviews and narrows to 4." },
  { day: "Day 2", label: "Quotations normalised", body: "Two outliers are flagged for specialist review." },
  { day: "Day 3", label: "Lead time negotiated", body: "A specialist negotiates lead time. The buyer confirms the final quote." },
  { day: "Day 4", label: "PO countersigned", body: "The purchase order is generated and countersigned in-platform." },
  { day: "Day 18", label: "Delivered and learned from", body: "The vendor scorecard is updated and the next RFQ is pre-populated." },
];

export function DealTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mt-12">
      <p className="eyebrow mb-8">Illustrative example. Not a customer case study.</p>
      <div className="relative pl-9 md:pl-12">
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-border md:left-[11px]" />
        <motion.div
          className="absolute top-2 left-[7px] w-px md:left-[11px]"
          style={{ height, background: "var(--accent)" }}
        />
        <ol className="space-y-8 md:space-y-10">
          {MARKERS.map((m, i) => (
            <motion.li
              key={m.day}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <span
                className="absolute top-2 -left-9 h-[15px] w-[15px] rounded-full border-2 md:-left-12"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--accent)",
                  boxShadow: "0 0 12px color-mix(in oklab, var(--accent) 45%, transparent)",
                }}
              />
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent">{m.day}</p>
              <p className="mt-2 text-[19px] text-fg md:text-[22px]">{m.label}</p>
              <p className="body-copy mt-2 max-w-xl text-[16px]">{m.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-8 max-w-2xl text-sm text-meta">Timings are illustrative. Delivery timing reflects lead time, not platform delay, and varies by category, quantity and vendor.</p>
    </div>
  );
}
