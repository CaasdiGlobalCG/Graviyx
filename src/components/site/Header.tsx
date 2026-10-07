import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { To } from "./types";

const NAV: { label: string; to: To }[] = [
  { label: "For Buyers", to: "/for-buyers" },
  { label: "For Suppliers", to: "/for-suppliers" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Intelligence Layer", to: "/intelligence-layer" },
  { label: "Trust", to: "/trust" },
  { label: "Industries", to: "/industries" },
  { label: "Insights", to: "/insights" },
];

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
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor:
          scrolled || open ? "color-mix(in oklab, var(--paper) 88%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled || open ? "var(--border)" : "transparent"}`,
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
      }}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/brand/graviyx-symbol-ink.png" alt="" className="h-7 w-auto" />
          <img
            src="/brand/graviyx-wordmark-ink.png"
            alt="GRAVIYX"
            className="hidden h-[15px] w-auto sm:block"
          />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="whitespace-nowrap text-sm font-[450] text-muted transition-colors duration-200 hover:text-fg"
              activeProps={{ style: { color: "var(--fg)" } }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link to="/post-a-requirement" className="btn btn-secondary">
            Post a Requirement
          </Link>
          <Link to="/for-buyers" className="btn btn-primary">
            Marketplace
          </Link>
          <Link
            to="/login"
            className="text-sm font-[450] text-muted transition-colors hover:text-fg"
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center border border-border-soft text-ink xl:hidden"
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
            <div className="container-x flex flex-col gap-1 py-6">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-[17px] text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
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
