// ============================================================
// FILE: Header.tsx
// PURPOSE: The fixed site header — the mark, the primary navigation, the two calls to
//          action and the mobile panel.
// CONNECTS TO: @tanstack/react-router (Link), motion/react (the mobile panel), ./types,
//          src/styles.css (glass-bar, header-x, neu-canvas, neu-control, --header-h, the
//          brand tokens).
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
 * The bar is the same dark ground as the hero, so this uses the on-ink tone rather than the
 * page's ink one — `text-fg` would be black on near-black. Hover feedback comes from the
 * underline rather than a colour change, which keeps the contrast constant while the pointer
 * is over the link.
 */
const LINK =
  "nav-active whitespace-nowrap px-3 py-2 text-[15px] font-[450] text-on-ink transition-colors duration-200";

/** The mark on a dark bar. `brightness-0 invert` forces the Ink assets to Paper, so the
 *  header does not need a second set of white exports. */
const MARK = "brightness-0 invert";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Travel is ACCUMULATED in one direction and reset when the direction reverses.
    //
    // Two earlier attempts were wrong. Comparing each event to the last flipped the state on
    // a single pixel, so a jittery trackpad made the bar bounce. Comparing against an anchor
    // that only moved on a state change was worse: the anchor stayed pinned where the bar
    // hid, so scrolling further down grew the gap and the bar could not come back until the
    // visitor scrolled up past that point — which in practice meant the top of the page.
    //
    // Accumulating fixes both. A direction has to be sustained for a real distance to count,
    // and reversing resets the counter, so 1px of noise can never accumulate into a flip.
    const HIDE_AFTER = 24;
    const SHOW_AFTER = 12;

    let lastY = window.scrollY;
    let downTravel = 0;
    let upTravel = 0;
    let isHidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      const delta = y - lastY;
      lastY = y;

      if (delta > 0) {
        downTravel += delta;
        upTravel = 0;
      } else if (delta < 0) {
        upTravel -= delta;
        downTravel = 0;
      }

      // Near the top the bar is always shown: the mark and nav are the natural thing to
      // reach for there, and hiding it would just be a thing to wait out.
      if (y <= 120) {
        if (isHidden) {
          isHidden = false;
          setHidden(false);
        }
        downTravel = 0;
        upTravel = 0;
      } else if (!isHidden && downTravel > HIDE_AFTER) {
        isHidden = true;
        setHidden(true);
        downTravel = 0;
      } else if (isHidden && upTravel > SHOW_AFTER) {
        isHidden = false;
        setHidden(false);
        upTravel = 0;
      }
    };

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
    <>
      <header
        className={`glass-bar fixed inset-x-0 top-0 z-50 transition-[transform,translate,border-color] duration-[var(--motion-slow)] ease-[var(--ease-signal)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          // The glass surface — translucent Paper wash, backdrop blur, saturation boost and
          // the lit top edge — lives in the `glass-bar` utility in src/styles.css. Only the
          // hairline is inline, because it depends on scroll state.
          //
          // `translate` MUST be in the transition-property list, and it is the whole reason
          // this animates at all. Tailwind v4's translate-* utilities emit the standalone
          // `translate` property, not `transform`, so a transition listing only `transform`
          // covers nothing the bar actually changes — the hide lands in a single frame and
          // reads as an instant blink. Tailwind's own `transition-transform` includes it
          // (`transform, translate, scale, rotate`); a hand-written list has to add it.
          //
          // The duration and curve are the project's tokens (420ms, ease-signal) rather than
          // raw values, which is why it glides rather than snaps.
          //
          // `!open` keeps it put while the mobile panel is showing — the panel is anchored
          // below the bar, so hiding the bar would leave it floating.
          borderBottom: `1px solid ${scrolled || open ? "var(--on-ink-rule)" : "transparent"}`,
        }}
      >
        {/* Three tracks: mark, nav, actions. The outer tracks are UNEQUAL on purpose —
            `1.35fr` on the right against `1fr` on the left — which pulls the nav left of the
            true centre. With `1fr auto 1fr` the nav sits noticeably right of where it reads
            as balanced, because the actions are much wider than the mark. Columns are placed
            explicitly so hiding the nav (below xl) still leaves the burger on the right. */}
        <div className="header-x grid h-[var(--header-h)] grid-cols-[1fr_auto_1.40fr] items-center gap-6">
          <Link
            to="/"
            className="col-start-1 flex shrink-0 items-center gap-3 justify-self-start"
            onClick={() => setOpen(false)}
          >
            <img src="/brand/graviyx-symbol-ink.png" alt="" className={`h-7 w-auto ${MARK}`} />
            <img
              src="/brand/graviyx-wordmark-ink.png"
              alt="GRAVIYX"
              className={`hidden h-[15px] w-auto sm:block ${MARK}`}
            />
          </Link>

          {/* The nav sits between the mark and the actions — one link per section, in the
              order the sections appear in the content document. */}
          <nav className="col-start-2 hidden items-center gap-2 xl:flex">
            {NAV.map((item) => (
              <Link key={item.label} to={item.to} className={LINK}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Login, then the two calls to action — Login first so the buttons hold the outer
              edge, which is where the eye lands last. */}
          <div className="col-start-3 hidden items-center gap-3 justify-self-end xl:flex">
            <Link to="/login" className={LINK}>
              Login
            </Link>
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-on-ink-rule" />
            <Link
              to="/post-a-requirement"
              className="neu-control neu-control-invert inline-flex items-center justify-center px-5 py-3 font-mono text-[13px] tracking-[0.14em] text-on-ink uppercase"
            >
              Post a Requirement
            </Link>
            <Link
              to="/for-buyers"
              className="neu-control neu-control-invert inline-flex items-center justify-center px-5 py-3 font-mono text-[13px] tracking-[0.14em] text-on-ink uppercase"
            >
              Marketplace
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="col-start-3 grid h-10 w-10 shrink-0 place-items-center justify-self-end border border-on-ink-rule-soft text-on-ink transition-colors duration-200 hover:border-on-ink xl:hidden"
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
      </header>

      {/* The panel is a SIBLING of the bar, not a child, and that is load-bearing.
        The bar always carries a `translate` value — Tailwind's `translate-y-0` emits
        `translate: 0px 0px`, not `none` — and a non-none `translate` makes an element the
        containing block for its `position: fixed` descendants. Nested inside the bar, this
        panel's `top: var(--header-h)` and `bottom: 0` both resolved against the bar's own
        80px box, so top and bottom met at the same point and the panel had zero height. It
        opened and rendered nothing, which is why the burger looked dead on a phone.
        As a sibling, its containing block is the viewport again. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto border-t border-border neu-canvas xl:hidden"
          >
            <div className="header-x py-4">
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
                  className="neu-control inline-flex w-full items-center justify-center px-6 py-3.5 font-mono text-[13px] tracking-[0.14em] text-fg uppercase"
                >
                  Marketplace
                </Link>
                <Link
                  to="/post-a-requirement"
                  onClick={() => setOpen(false)}
                  className="neu-control inline-flex w-full items-center justify-center px-6 py-3.5 font-mono text-[13px] tracking-[0.14em] text-fg uppercase"
                >
                  Post a Requirement
                </Link>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="neu-control inline-flex w-full items-center justify-center px-6 py-3.5 font-mono text-[13px] tracking-[0.14em] text-fg uppercase"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
