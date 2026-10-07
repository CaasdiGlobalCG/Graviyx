// ============================================================
// FILE: home-variant-a2.tsx
// PURPOSE: Preview route for Home variant A2 "The Manifest". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantA2Manifest), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantA2Manifest } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-a2")({
  head: () =>
    pageMeta(
      "Home variant A2 · The Manifest | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantA2Manifest,
});
