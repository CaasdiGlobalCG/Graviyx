// ============================================================
// FILE: home-variant-h.tsx
// PURPOSE: Preview route for Home variant H "Marquee & Ticker". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantHMarquee), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantHMarquee } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-h")({
  head: () =>
    pageMeta(
      "Home variant H · Marquee | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantHMarquee,
});
