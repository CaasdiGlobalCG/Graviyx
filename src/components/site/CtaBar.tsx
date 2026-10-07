import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import type { HeroAction } from "./Hero";

export function CtaBar({
  title,
  body,
  actions,
}: {
  title: string;
  body?: string;
  actions: HeroAction[];
}) {
  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div className="grid-veil pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-md text-fg">{title}</h2>
          {body ? <p className="lead mt-5">{body}</p> : null}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {actions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className={`btn ${a.variant === "secondary" ? "btn-ghost-on-ink" : "btn-on-ink"}`}
              >
                {a.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
