// ============================================================
// FILE: __root.tsx
// PURPOSE: The root route — the site chrome every page renders inside, plus the 404 and
//          error states, and the per-page metadata hook.
// CONNECTS TO: src/lib/seo.ts (useSeo applies the route's title and description),
//          src/components/site/{Header,Footer}, src/router.tsx (provides the query client),
//          index.html (the document this renders into).
// ============================================================
//
// This was a TanStack Start root route: it declared `head()`, rendered an `<html>` shell
// through `shellComponent`, and mounted `HeadContent`/`Scripts` for server rendering. A plain
// client-rendered build has no server, so the shell moved into index.html and the metadata
// moved into src/lib/seo.ts. The chrome and both error states are unchanged.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";

import { useSeo } from "@/lib/seo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-xl mt-4 text-ink">Page not found</h1>
        <p className="body-copy mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display-md mt-4 text-ink">This page didn't load</h1>
        <p className="body-copy mt-4">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn btn-secondary">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Applies the current route's title and description. There is one document for every route
  // in a client-rendered SPA, so this is what keeps them in step with navigation.
  useSeo();

  return (
    <QueryClientProvider client={queryClient}>
      {/* reducedMotion="user" makes every motion.* animation in the app honour
          prefers-reduced-motion at the library level. SMIL <animateMotion> markers
          are not covered by this and are gated individually with useReducedMotion(). */}
      <MotionConfig reducedMotion="user">
        <Header />
        <main className="min-h-screen">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </MotionConfig>
    </QueryClientProvider>
  );
}
