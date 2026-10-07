// ============================================================
// FILE: home-variant-f.tsx
// PURPOSE: Preview route for Home variant F "Pinned Progress Rail". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantFPinnedRail), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantFPinnedRail } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-f")({
  head: () =>
    pageMeta(
      "Home variant F · Pinned Rail | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantFPinnedRail,
});
