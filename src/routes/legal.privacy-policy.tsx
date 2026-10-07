import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/legal/privacy-policy")({
  head: () =>
    pageMeta(
      "Privacy Policy | GRAVIYX",
      "The Graviyx Privacy Policy is being finalised and will be published here."
    ),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <>
      <Hero eyebrow="Legal" headline="Privacy Policy." compact />
      <Section tone="surface">
        <Reveal className="mx-auto max-w-3xl">
          <p className="body-copy text-[17px]">
            <strong className="text-fg">
              This document is being finalised and will be published here.
            </strong>{" "}
            For questions in the meantime, contact hello@graviyx.com.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
