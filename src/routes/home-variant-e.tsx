// ============================================================
// FILE: home-variant-e.tsx
// PURPOSE: Preview route for Home variant E "Scroll-Scrubbed Draw". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantEScrubDraw), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantEScrubDraw } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-e")({
  head: () =>
    pageMeta(
      "Home variant E · Scrubbed Draw | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantEScrubDraw,
});
