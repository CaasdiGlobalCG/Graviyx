// ============================================================
// FILE: Header.tsx
// PURPOSE: The fixed site header — the mark, the primary navigation, the two calls to
//          action and the mobile panel.
// CONNECTS TO: @tanstack/react-router (Link), motion/react (the mobile panel), ./types,
//          src/styles.css (container-x, btn, btn-sm, the brand tokens).
// ============================================================
//
// The bar is deliberately quiet: one frosted Paper wash, one hairline that only appears once
// scrolled, and no second surface. Legibility over an Ink hero is why the wash is always on
// rather than transparent — see the note on the header element.

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { To } from "./types";

/**
 * The primary navigation. Kept short on purpose — every extra item costs the bar its
 * clarity, and the pages not listed here are all reachable from the footer.
 */
const NAV: { label: string; to: To }[] = [
  { label: "For Buyers", to: "/for-buyers" },
  { label: "For Suppliers", to: "/for-suppliers" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Intelligence Layer", to: "/intelligence-layer" },
  { label: "Industries", to: "/industries" },
  { label: "Insights", to: "/insights" },
];

/**
 * The nav-link recipe, shared by the desktop items and Login so they read as one system.
 *
 * The colour is `text-fg`, not `text-muted`. A muted tone fails AA on this surface: the bar
 * is translucent, so over the pinned Ink hero the glass resolves to roughly rgb(190,190,188),
 * where steel-50 lands at 2.9:1 against the 4.5:1 that 13px text needs. Ink on the same glass
 * is 11.3:1. Hover feedback comes from the underline, not from a colour change.
 */
const LINK =
  "whitespace-nowrap px-3 py-2 text-[13px] font-[450] text-fg transition-colors duration-200";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="glass-bar fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        // The glass surface — translucent Paper wash, backdrop blur, saturation boost and
        // the lit top edge — lives in the `glass-bar` utility in src/styles.css. Only the
        // hairline is inline, because it depends on scroll state.
        //
        // The wash is 76% rather than the 20-40% typical of glass, and that is deliberate:
        // this bar floats over the pinned Ink hero, so a thinner wash would let the black
        // surface through and the Ink logo and muted nav text would lose contrast against
        // it. 76% reads as glass while staying legible on both Paper and Ink heroes.
        borderBottom: `1px solid ${scrolled || open ? "var(--border)" : "transparent"}`,
      }}
    >
      <div className="container-x flex h-[72px] items-center gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/brand/graviyx-symbol-ink.png" alt="" className="h-7 w-auto" />
          <img
            src="/brand/graviyx-wordmark-ink.png"
            alt="GRAVIYX"
            className="hidden h-[15px] w-auto sm:block"
          />
        </Link>

        {/* The nav sits immediately after the mark rather than being centred or spread, so
            the eye reads one continuous left-to-right line instead of three separate groups.
            The hover rule grows from the left on a transform, never on a layout property. */}
        <nav className="hidden items-center xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`group relative ${LINK}`}
              activeProps={{ style: { color: "var(--fg)" } }}
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-1 block h-px origin-left scale-x-0 bg-fg transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        {/* Actions hold the right edge, separated from the nav by a hairline so there is one
            clear place to land. Login carries the nav recipe, so it belongs to the same
            system rather than floating between the links and the buttons. */}
        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <Link to="/login" className={LINK}>
            Login
          </Link>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          <Link to="/post-a-requirement" className="btn btn-secondary btn-sm">
            Post a Requirement
          </Link>
          <Link to="/for-buyers" className="btn btn-primary btn-sm">
            Marketplace
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center border border-border-soft text-ink transition-colors duration-200 hover:border-ink xl:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className="absolute top-[6px] left-0 block h-px w-4 bg-current transition-transform duration-200"
              style={{ transform: open ? "rotate(45deg)" : "translateY(-5px)" }}
            />
            <span
              className="absolute top-[6px] left-0 block h-px w-4 bg-current transition-transform duration-200"
              style={{ transform: open ? "rotate(-45deg)" : "translateY(5px)" }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto border-t border-border bg-paper xl:hidden"
          >
            <div className="container-x py-4">
              {/* divide-y rather than a border on every row: one hairline between items,
                  none dangling under the last one. */}
              <nav className="divide-y divide-border border-b border-border">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[17px] text-ink transition-colors duration-200 hover:text-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-2.5 pb-8">
                <Link
                  to="/for-buyers"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Marketplace
                </Link>
                <Link
                  to="/post-a-requirement"
                  onClick={() => setOpen(false)}
                  className="btn btn-secondary w-full"
                >
                  Post a Requirement
                </Link>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn btn-ghost w-full"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
