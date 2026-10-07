import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { To } from "./types";

export function LinkOutCard({
  eyebrow,
  title,
  body,
  to,
  cta,
  delay = 0,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  to: To;
  cta: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015, y: -4 }}
      className="h-full"
    >
      <Link
        to={to}
        className="panel group flex h-full flex-col justify-between p-7 transition-colors duration-200 hover:border-ink md:p-9"
      >
        <div>
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          <h3 className="display-sm text-fg">{title}</h3>
          <p className="body-copy mt-3 text-[16px]">{body}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-[550] text-ink">
          {cta}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </motion.div>
  );
}
