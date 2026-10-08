// ============================================================
// FILE: seo.ts
// PURPOSE: The single source of per-page document metadata, and the hook that applies it.
// CONNECTS TO: src/routes/__root.tsx (mounts useSeo in the root layout),
//          index.html (owns the site-wide tags this file does not repeat).
// ============================================================
//
// This used to be a `pageMeta()` helper called from each route's `head()` option. `head` is a
// TanStack Start API — it does not exist on the standalone router — so when the project moved
// to a plain client-rendered Vite build the metadata had to live somewhere else.
//
// It lives here instead, in one map. That is a small improvement on the old arrangement: the
// titles and descriptions are now readable side by side, so drift between them is visible,
// where before they were scattered across nineteen route files.

import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** The site defaults. Also the fallback for any path not listed below. */
const DEFAULT_META = {
  title: "GRAVIYX — Buy Industrial Goods from Verified Suppliers",
  description:
    "Post what you need, compare quotes from verified suppliers and track every order to delivery. One platform, one record, a specialist on your account.",
};

/** Per-page metadata, keyed by the pathname the router reports. */
export const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": DEFAULT_META,
  "/for-buyers": {
    title: "For Buyers — Compare Verified Quotes, Track Every Order | GRAVIYX",
    description:
      "Source from verified suppliers, compare quotes side by side and follow every order to delivery, with a named specialist on your account.",
  },
  "/for-suppliers": {
    title: "For Suppliers — Get Verified, Reach Serious Buyers | GRAVIYX",
    description:
      "Get verified once and reach buyers who are actively sourcing. A named specialist helps you onboard and grow.",
  },
  "/how-it-works": {
    title: "How It Works — From Request to Delivery | GRAVIYX",
    description:
      "Six steps from request to delivery, on one shared record. AI does the legwork. A specialist makes the calls.",
  },
  "/intelligence-layer": {
    title: "The Intelligence Layer — AI That Does the Legwork | GRAVIYX",
    description:
      "Graviyx's AI isn't a chatbot. It handles the repetitive work in procurement and hands anything tricky to a specialist.",
  },
  "/fulfillment-warehousing": {
    title: "Fulfilment & Warehousing — Delivery You Can Plan Around | GRAVIYX",
    description:
      "A three-tier warehouse network that puts stock closer to buyers, for shorter and more predictable lead times.",
  },
  "/trust": {
    title: "Trust — Verified Before They Quote | GRAVIYX",
    description:
      "Suppliers are verified before they quote, scored after every deal and backed by evidence you can see.",
  },
  "/industries": {
    title: "Industries — Sectors Served | GRAVIYX",
    description:
      "Graviyx serves buyers across manufacturing, engineering, construction, oil and gas, electrical, automotive, healthcare supplies, FMCG and packaging.",
  },
  "/insights": {
    title: "Insights | GRAVIYX",
    description:
      "Perspective on industrial procurement, and what Graviyx is building next: Build-to-Spec and Semi-Finished Goods, both coming soon.",
  },
  "/about": {
    title: "About GRAVIYX | Mission, Vision and Roadmap",
    description:
      "Graviyx is building the default operating system for complex industrial procurement: verified supply, with AI and specialists working together.",
  },
  "/careers": {
    title: "Careers | GRAVIYX",
    description:
      "Graviyx pairs AI with a named team of procurement specialists. See how the team is organised and get in touch.",
  },
  "/partner-with-us": {
    title: "Partner With Us — District Warehouse Franchise | GRAVIYX",
    description:
      "Run a Graviyx district warehouse: last-mile industrial delivery, demand from the platform and clear performance standards.",
  },
  "/contact": {
    title: "Contact | GRAVIYX",
    description:
      "Apply for supplier verification, discuss a warehouse franchise, or send a general or press enquiry to Graviyx.",
  },
  "/post-a-requirement": {
    title: "Post a Requirement | GRAVIYX",
    description:
      "Tell us what you need. Graviyx turns it into a clear request, shortlists verified suppliers and brings back quotes you can compare.",
  },
  "/login": {
    title: "Login | GRAVIYX",
    description: "Sign in to GRAVIYX as a buyer or supplier.",
  },
  "/legal": {
    title: "Legal | GRAVIYX",
    description:
      "Graviyx legal documents: Privacy Policy, Terms of Service, and Security & Data Handling.",
  },
  "/legal/privacy-policy": {
    title: "Privacy Policy | GRAVIYX",
    description: "The Graviyx Privacy Policy is being finalised and will be published here.",
  },
  "/legal/terms-of-service": {
    title: "Terms of Service | GRAVIYX",
    description: "The Graviyx Terms of Service are being finalised and will be published here.",
  },
  "/legal/security": {
    title: "Security & Data Handling | GRAVIYX",
    description:
      "The Graviyx Security & Data Handling document is being finalised and will be published here.",
  },
};

/** The metadata for a pathname, falling back to the site defaults for an unknown path. */
export function metaFor(pathname: string) {
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return ROUTE_META[normalised] ?? DEFAULT_META;
}

/** Writes a value into a `<meta>` tag, creating it if the document has no such tag. */
function setMeta(selector: string, attribute: "name" | "property", key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

/**
 * Applies the current route's metadata to the document. Mounted once in the root layout.
 *
 * A client-rendered SPA has one document for every route, so this is what keeps the tab title
 * and the description in step with navigation. Crawlers that execute JavaScript see the right
 * values; ones that do not see the site-wide defaults declared in index.html.
 */
export function useSeo() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const { title, description } = metaFor(pathname);
    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
  }, [pathname]);
}
