import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { LinkOutCard } from "@/components/site/LinkOutCard";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/legal")({
  head: () =>
    pageMeta(
      "Legal | GRAVIYX",
      "Graviyx legal documents: Privacy Policy, Terms of Service, and Security & Data Handling."
    ),
  component: Legal,
});

function Legal() {
  return (
    <>
      <Hero eyebrow="Legal" headline="Legal documents." compact />

      <Section tone="surface">
        <SectionHead eyebrow="Documents" title="Privacy, terms and security." />
        <Reveal className="mt-8 max-w-3xl">
          <p className="body-copy text-[16px]">
            <strong className="text-fg">
              These documents are being finalised and will be published here.
            </strong>{" "}
            For questions in the meantime, contact hello@graviyx.com.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <LinkOutCard
            eyebrow="Privacy"
            title="Privacy Policy"
            body="Being finalised. It will be published here."
            to="/legal/privacy-policy"
            cta="View"
          />
          <LinkOutCard
            eyebrow="Terms"
            title="Terms of Service"
            body="Being finalised. It will be published here."
            to="/legal/terms-of-service"
            cta="View"
            delay={0.08}
          />
          <LinkOutCard
            eyebrow="Security"
            title="Security & Data Handling"
            body="Being finalised. It will be published here."
            to="/legal/security"
            cta="View"
            delay={0.16}
          />
        </div>
      </Section>
    </>
  );
}
