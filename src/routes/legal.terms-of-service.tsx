import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/legal/terms-of-service")({
  head: () =>
    pageMeta(
      "Terms of Service | GRAVIYX",
      "The Graviyx Terms of Service are being finalised and will be published here."
    ),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <>
      <Hero eyebrow="Legal" headline="Terms of Service." compact />
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
