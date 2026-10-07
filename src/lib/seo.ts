// ============================================================
// FILE: seo.ts
// PURPOSE: Builds the per-route document head for every content page.
// CONNECTS TO: src/routes/*.tsx (each route calls pageMeta in its head()),
//          src/routes/__root.tsx (owns og:site_name, og:type and twitter:card —
//          this helper deliberately does not repeat them, which previously produced
//          two conflicting twitter:card tags on every page).
// ============================================================

/**
 * Builds the head metadata for a content route.
 *
 * Only page-specific values are emitted here. Site-wide tags live in the root
 * route so they are declared exactly once.
 *
 * @param title - The document title for this route.
 * @param description - The meta description for this route.
 * @returns A TanStack Router head object containing this route's meta tags.
 *
 * @connects src/routes/__root.tsx (declares og:site_name, og:type, twitter:card)
 * @see GRAVIYX — Website Content v2.0, per-page "Meta title" / "Meta description"
 */
export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  };
}
