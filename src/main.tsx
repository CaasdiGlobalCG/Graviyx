// ============================================================
// FILE: main.tsx
// PURPOSE: The client entry point — mounts the router into the document.
// CONNECTS TO: index.html (provides #root), src/router.tsx (the router factory),
//          src/styles.css (the design system).
// ============================================================
//
// This replaces TanStack Start's server-rendered entry. The site is a client-rendered SPA
// served as static files from GitHub Pages, so there is no server shell to hydrate.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();
const container = document.getElementById("root");

if (!container) {
  throw new Error("Mount point #root is missing from index.html");
}

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
