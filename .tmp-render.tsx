// Temporary SSR smoke test — deleted after the check. Not part of the app.
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import {
  createRootRoute,
  createRoute,
  createRouter,
  createMemoryHistory,
  RouterProvider,
} from "@tanstack/react-router";
import { HomeVariantIFloatShadow } from "./src/components/home-variants/HomeVariantIFloatShadow";

const rootRoute = createRootRoute();
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeVariantIFloatShadow,
});

const targets = [
  "/for-buyers",
  "/for-suppliers",
  "/post-a-requirement",
  "/how-it-works",
  "/intelligence-layer",
  "/trust",
  "/industries",
];

const childRoutes = targets.map((path) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => null,
  }),
);

const routeTree = rootRoute.addChildren([indexRoute, ...childRoutes]);
const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ["/"] }) });

async function main() {
  await router.load();
  const html = renderToString(createElement(RouterProvider, { router }));
  console.log("SSR_OK length=" + html.length);
  console.log("has headline=" + html.includes("Industrial buying, without the chase."));
  console.log("has step=" + html.includes("Tell us what you need."));
  console.log("has scope=" + html.includes("Live now: finished goods."));
  console.log("has where=" + html.includes("Connected across India&#x27;s industrial corridors."));
  console.log("has ecosystem=" + html.includes("Orchestrated trade, not just listed products."));
  console.log("ink bands=" + (html.match(/surface-ink/g) || []).length);
  console.log("shadow plates=" + (html.match(/blur-md/g) || []).length);
  console.log("btn-primary=" + (html.match(/btn-primary/g) || []).length);
  console.log("btn-secondary=" + (html.match(/btn-secondary/g) || []).length);
  console.log("text-ink=" + (html.match(/text-ink(?![a-z-])/g) || []).length);
  const re = /text-ink(?![a-z-])/g;
  let mm;
  let n = 0;
  while ((mm = re.exec(html)) && n < 10) {
    n += 1;
    console.log("  ctx: ..." + html.slice(Math.max(0, mm.index - 70), mm.index + 20) + "...");
  }
}

void main();
