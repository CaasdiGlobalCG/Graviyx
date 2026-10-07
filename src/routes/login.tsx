// ============================================================
// FILE: login.tsx
// PURPOSE: The Login page. Buyer/supplier tabs, the sign-in form with its error state and
//          the two-step forgot-password state, read as monochrome neumorphism: the form is
//          a surface pushed out of a light canvas with its fields cut into it, and the
//          "new to Graviyx?" note on the dark ground.
// CONNECTS TO: @/components/site/{Hero,Reveal}, @/lib/seo, src/styles.css (the neu-* and
//          canvas material), @tanstack/react-router.
// ============================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => pageMeta("Login | GRAVIYX", "Sign in to GRAVIYX as a buyer or supplier."),
  component: Login,
});

function Login() {
  const [tab, setTab] = useState<"buyer" | "supplier">("buyer");
  const [reset, setReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <Hero eyebrow="Login" headline="Sign in to GRAVIYX." compact />

      <section className="neu-canvas section-y">
        <div className="container-x">
          <div className="mx-auto max-w-md">
            {reset ? (
              resetSent ? (
                <Reveal>
                  <div className="neu-raised flex flex-col items-center px-6 py-14 text-center">
                    <span className="mark-dot pulse-dot mb-6" />
                    <h2 className="display-sm text-fg">Check your inbox.</h2>
                    <p className="body-copy mt-3 text-[16px] text-fg">
                      If an account exists for this address, a reset link is on its way.
                    </p>
                  </div>
                </Reveal>
              ) : (
                <Reveal>
                  <form
                    className="neu-raised space-y-5 p-6 md:p-9"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setResetSent(true);
                    }}
                  >
                    <h2 className="display-sm text-fg">Reset your password.</h2>
                    <p className="body-copy text-[15px] text-fg">
                      Enter your work email and we'll send a reset link.
                    </p>
                    <label className="block">
                      <span className="eyebrow mb-2 block text-fg">Work email</span>
                      <input required type="email" className="neu-field" placeholder="you@company.com" />
                    </label>
                    <button
                      type="submit"
                      className="neu-control w-full px-6 py-3.5 text-[15px] font-semibold text-fg"
                    >
                      Send reset link
                    </button>
                    <button
                      type="button"
                      onClick={() => setReset(false)}
                      className="neu-control w-full px-6 py-3.5 text-[15px] font-medium text-muted"
                    >
                      Back to sign in
                    </button>
                  </form>
                </Reveal>
              )
            ) : (
              <Reveal>
                <form
                  className="neu-raised space-y-5 p-6 md:p-9"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setError(true);
                  }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {(["buyer", "supplier"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        className={
                          tab === t
                            ? "neu-pressed px-5 py-3 text-[14px] font-semibold text-fg"
                            : "neu-control px-5 py-3 text-[14px] font-medium text-fg"
                        }
                      >
                        {t === "buyer" ? "Buyer" : "Supplier"}
                      </button>
                    ))}
                  </div>
                  <label className="block">
                    <span className="eyebrow mb-2 block text-fg">Work email</span>
                    <input required type="email" className="neu-field" placeholder="you@company.com" />
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block text-fg">Password</span>
                    <input required type="password" className="neu-field" placeholder="••••••••" />
                  </label>
                  {error && (
                    <p className="text-sm text-danger">Email or password is incorrect.</p>
                  )}
                  <button
                    type="submit"
                    className="neu-control w-full px-6 py-3.5 text-[15px] font-semibold text-fg"
                  >
                    Sign in
                  </button>
                  <p className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => setReset(true)}
                      className="text-ink underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </p>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="neu-canvas-dark section-y">
        <div className="container-x">
          <Reveal from="left" delay={0.1}>
            <div className="neu-flat mx-auto max-w-md px-6 py-8 text-center">
              <p className="text-[15px] text-muted">
                New to Graviyx?{" "}
                <Link to="/for-buyers" className="text-fg underline-offset-4 hover:underline">
                  Browse the Marketplace
                </Link>{" "}
                or{" "}
                <Link to="/contact" className="text-fg underline-offset-4 hover:underline">
                  Apply for Verification
                </Link>{" "}
                (suppliers).
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
