import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/legal/security")({
  head: () =>
    pageMeta(
      "Security & Data Handling | GRAVIYX",
      "The Graviyx Security & Data Handling document is being finalised and will be published here."
    ),
  component: Security,
});

function Security() {
  return (
    <>
      <Hero eyebrow="Legal" headline="Security & Data Handling." compact />
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
