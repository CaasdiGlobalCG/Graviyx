import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import type { To } from "./types";

export function EmptyState({
  title,
  body,
  actionLabel,
  actionTo,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionTo?: To;
}) {
  return (
    <Reveal>
      <div className="panel flex flex-col items-center px-6 py-14 text-center md:py-20">
        <span className="mark-dot pulse-dot mb-6" />
        <h3 className="display-sm text-fg">{title}</h3>
        <p className="body-copy mt-3 max-w-xl text-[16px]">{body}</p>
        {actionLabel && actionTo ? (
          <Link to={actionTo} className="btn btn-secondary mt-8">
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </Reveal>
  );
}
