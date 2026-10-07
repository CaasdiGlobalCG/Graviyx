import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Tone = "bg" | "surface" | "warm";

const toneClass: Record<Tone, string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  warm: "bg-surface-warm",
};

export function Section({
  children,
  tone = "bg",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`section-y ${toneClass[tone]} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="eyebrow mb-4 flex items-center gap-3">
          {align === "left" ? <span className="mark-dot shrink-0" /> : null}
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display-md text-fg">{title}</h2>
      {lead ? <p className="lead mt-5">{lead}</p> : null}
    </Reveal>
  );
}
