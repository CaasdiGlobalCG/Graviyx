// ============================================================
// FILE: home-variant-b.tsx
// PURPOSE: Preview route for Home variant B "Diagonal Cut". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantBDiagonalCut), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantBDiagonalCut } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-b")({
  head: () =>
    pageMeta(
      "Home variant B · Diagonal Cut | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantBDiagonalCut,
});
