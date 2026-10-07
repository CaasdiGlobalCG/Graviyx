// ============================================================
// FILE: home-variant-l.tsx
// PURPOSE: Preview route for Home variant L "Heads-Up Display" (futuristic). Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantLFuturisticHud), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantLFuturisticHud } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-l")({
  head: () =>
    pageMeta(
      "Home variant L · Heads-Up Display | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantLFuturisticHud,
});
