import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
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

      <Section tone="surface">
        <div className="mx-auto max-w-md">
          {reset ? (
            resetSent ? (
              <Reveal>
                <div className="panel flex flex-col items-center px-6 py-14 text-center">
                  <span className="accent-dot pulse-dot mb-6" />
                  <h2 className="display-sm text-fg">Check your inbox.</h2>
                  <p className="body-copy mt-3 text-[16px]">
                    If an account exists for this address, a reset link is on its way.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form
                  className="panel space-y-5 p-6 md:p-9"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setResetSent(true);
                  }}
                >
                  <h2 className="display-sm text-fg">Reset your password.</h2>
                  <p className="body-copy text-[15px]">
                    Enter your work email and we'll send a reset link.
                  </p>
                  <label className="block">
                    <span className="eyebrow mb-2 block">Work email</span>
                    <input required type="email" className="field" placeholder="you@company.com" />
                  </label>
                  <button type="submit" className="btn btn-primary w-full">
                    Send reset link
                  </button>
                  <button
                    type="button"
                    onClick={() => setReset(false)}
                    className="btn btn-ghost w-full"
                  >
                    Back to sign in
                  </button>
                </form>
              </Reveal>
            )
          ) : (
            <Reveal>
              <form
                className="panel space-y-5 p-6 md:p-9"
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
                      className={tab === t ? "btn btn-primary" : "btn btn-secondary"}
                    >
                      {t === "buyer" ? "Buyer" : "Supplier"}
                    </button>
                  ))}
                </div>
                <label className="block">
                  <span className="eyebrow mb-2 block">Work email</span>
                  <input required type="email" className="field" placeholder="you@company.com" />
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block">Password</span>
                  <input required type="password" className="field" placeholder="••••••••" />
                </label>
                {error && (
                  <p className="text-sm text-danger">Email or password is incorrect.</p>
                )}
                <button type="submit" className="btn btn-primary w-full">
                  Sign in
                </button>
                <p className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setReset(true)}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </button>
                </p>
              </form>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-[15px] text-muted">
              New to Graviyx?{" "}
              <Link to="/for-buyers" className="text-accent underline-offset-4 hover:underline">
                Browse the Marketplace
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="text-accent underline-offset-4 hover:underline">
                Apply for Verification
              </Link>{" "}
              (suppliers).
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
