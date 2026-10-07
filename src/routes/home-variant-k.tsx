// ============================================================
// FILE: home-variant-k.tsx
// PURPOSE: Preview route for Home variant K "Inset Console" (neumorphic). Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantKInsetConsole), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantKInsetConsole } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-k")({
  head: () =>
    pageMeta(
      "Home variant K · Inset Console | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantKInsetConsole,
});
