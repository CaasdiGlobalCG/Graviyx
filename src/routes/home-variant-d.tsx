// ============================================================
// FILE: home-variant-d.tsx
// PURPOSE: Preview route for Home variant D "Control Room". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantDControlRoom), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantDControlRoom } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-d")({
  head: () =>
    pageMeta(
      "Home variant D · Control Room | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantDControlRoom,
});
