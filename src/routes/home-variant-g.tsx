// ============================================================
// FILE: home-variant-g.tsx
// PURPOSE: Preview route for Home variant G "Cursor Spotlight". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantGSpotlight), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantGSpotlight } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-g")({
  head: () =>
    pageMeta(
      "Home variant G · Spotlight | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantGSpotlight,
});
