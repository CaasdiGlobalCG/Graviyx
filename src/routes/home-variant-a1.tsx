// ============================================================
// FILE: home-variant-a1.tsx
// PURPOSE: Preview route for Home variant A1 "The Ledger". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantA1Ledger), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantA1Ledger } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-a1")({
  head: () =>
    pageMeta(
      "Home variant A1 · The Ledger | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantA1Ledger,
});
