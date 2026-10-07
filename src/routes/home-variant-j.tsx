// ============================================================
// FILE: home-variant-j.tsx
// PURPOSE: Preview route for Home variant J "Soft Machine" (neumorphic). Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantJSoftMachine), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantJSoftMachine } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-j")({
  head: () =>
    pageMeta(
      "Home variant J · Soft Machine | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantJSoftMachine,
});
