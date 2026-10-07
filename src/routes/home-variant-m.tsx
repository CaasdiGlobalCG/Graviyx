// ============================================================
// FILE: home-variant-m.tsx
// PURPOSE: Preview route for Home variant M "Signal Wireframe" (futuristic). Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantMFuturisticWireframe), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantMFuturisticWireframe } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-m")({
  head: () =>
    pageMeta(
      "Home variant M · Signal Wireframe | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantMFuturisticWireframe,
});
