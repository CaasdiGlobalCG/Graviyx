// ============================================================
// FILE: index.tsx
// PURPOSE: The "/" route. Delegates the page body to the Home feature, which owns the
//          content and the design direction ("Soft Machine" â€” monochrome neumorphism).
// CONNECTS TO: @/components/home (HomePage).
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <HomePage />;
}
