import { Link } from "@tanstack/react-router";
import wordmark from "@/assets/graviyx-wordmark.png.asset.json";
import type { To } from "./types";

const COLUMNS: { heading: string; links: { label: string; to: To }[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "The Intelligence Layer", to: "/intelligence-layer" },
      { label: "Fulfilment & Warehousing", to: "/fulfillment-warehousing" },
      { label: "Trust", to: "/trust" },
    ],
  },
  {
    heading: "Audiences",
    links: [
      { label: "For Buyers", to: "/for-buyers" },
      { label: "For Suppliers", to: "/for-suppliers" },
      { label: "Partner With Us", to: "/partner-with-us" },
      { label: "Industries", to: "/industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Insights", to: "/insights" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/legal/privacy-policy" },
      { label: "Terms of Service", to: "/legal/terms-of-service" },
      { label: "Security & Data Handling", to: "/legal/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.4fr]">
          <div>
            <img src={wordmark.url} alt="Graviyx" className="h-4 w-auto invert" />
            <p className="body-copy mt-5 max-w-xs text-[15px]">
              GRAVIYX is the procurement orchestrator connecting verified manufacturers,
              sellers and industrial buyers.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/for-buyers" className="btn btn-primary">
                Marketplace
              </Link>
              <Link to="/post-a-requirement" className="btn btn-secondary">
                Post a Requirement
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-5">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[15px] text-muted transition-colors duration-200 hover:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-meta">
            Graviyx Procurement Pvt. Ltd. · hello@graviyx.com · graviyx.com · © GRAVIYX. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://operonsoftwares.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-meta transition-colors hover:text-fg"
            >
              Operon 360 ↗
            </a>
            <Link to="/legal" className="text-sm text-meta transition-colors hover:text-fg">
              Legal
            </Link>
            <Link to="/login" className="text-sm text-meta transition-colors hover:text-fg">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
