// ============================================================
// FILE: home-variant-c.tsx
// PURPOSE: Preview route for Home variant C "Oversized Symbol". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantCOversizedSymbol), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantCOversizedSymbol } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-c")({
  head: () =>
    pageMeta(
      "Home variant C · Oversized Symbol | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantCOversizedSymbol,
});
