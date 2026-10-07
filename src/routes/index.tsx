// ============================================================
// FILE: index.tsx
// PURPOSE: The "/" route. Delegates the page body to the Home feature, which owns the
//          content and the design direction ("Soft Machine" — monochrome neumorphism).
// CONNECTS TO: @/components/home (HomePage, HOME_META), @/lib/seo.
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomePage, HOME_META } from "@/components/home";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageMeta(HOME_META.title, HOME_META.description),
  component: Index,
});

function Index() {
  return <HomePage />;
}
