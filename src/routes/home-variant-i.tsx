// ============================================================
// FILE: home-variant-i.tsx
// PURPOSE: Preview route for Home variant I "Float & Ground Shadow". Temporary — deleted at adoption.
// CONNECTS TO: @/components/home-variants (HomeVariantIFloatShadow), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomeVariantIFloatShadow } from "@/components/home-variants";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/home-variant-i")({
  head: () =>
    pageMeta(
      "Home variant I · Float & Shadow | GRAVIYX",
      "Design variant preview. Not a public page.",
    ),
  component: HomeVariantIFloatShadow,
});
