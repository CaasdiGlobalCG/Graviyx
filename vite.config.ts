// ============================================================
// FILE: vite.config.ts
// PURPOSE: Plain Vite build for a client-rendered React SPA, deployable as static files.
// CONNECTS TO: index.html (the entry document), src/main.tsx (the mount point),
//          src/router.tsx (the router factory), src/routes/** (generates routeTree.gen.ts).
// ============================================================
//
// This replaced @lovable.dev/vite-tanstack-config, which bundled TanStack Start, nitro, the
// Lovable devtools and a Cloudflare server target. None of that is wanted here: the site is
// static and is served from GitHub Pages, so there is no server to render it.
//
// The router plugin is kept, because it is what generates src/routeTree.gen.ts from the files
// in src/routes/. It is pointed at the plain `react` target rather than `react-start`, so the
// generated tree no longer imports anything from TanStack Start.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // Must run before react(): it generates routeTree.gen.ts, which the entry imports.
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],

  // Served from a custom domain at the root, so assets resolve from "/".
  base: "/",

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
