import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { ProblemList } from "@/components/site/ProblemList";
import { PlatformStrip } from "@/components/site/PlatformStrip";
import { EcosystemDiagram } from "@/components/site/EcosystemDiagram";
import { IndustryChips } from "@/components/site/IndustryChips";
import { LinkOutCard } from "@/components/site/LinkOutCard";
import { CtaBar } from "@/components/site/CtaBar";
import { Reveal } from "@/components/site/Reveal";
import { IndiaCoverageMap } from "@/components/site/IndiaCoverageMap";
import { pageMeta } from "@/lib/seo";

const description = "GRAVIYX is a procurement orchestrator for industrial and commercial buyers. Verified suppliers, structured quotations and a complete record, from RFQ to delivery.";
export const Route = createFileRoute("/")({ head: () => pageMeta("GRAVIYX — Verified B2B Procurement for Industrial Buyers", description), component: Index });

function Index() {
  return <>
    <Hero eyebrow="B2B PROCUREMENT · VERIFIED · ORCHESTRATED" headline="Industrial Commerce, Engineered for Control." subhead="GRAVIYX is a procurement orchestrator engineered for the industrial and commercial buyer — where verification, specification and fulfilment converge into a single, trusted system." actions={[{ label: "Marketplace", to: "/for-buyers" }, { label: "Post a Requirement", to: "/post-a-requirement", variant: "secondary" }]}>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted"><span>Sourcing</span><span>Quotation</span><span>Purchase Orders</span><span>Fulfilment</span><span>Intelligence</span></div>
      <p className="mt-4 text-sm text-meta">Live now: Finished Goods. MRO, industrial and commercial SKUs from verified manufacturers, distributors and sellers.</p>
    </Hero>
    <Section tone="surface"><SectionHead eyebrow="The structural problem" title="Procurement wasn't built to run at today's speed." lead="Every industrial buyer inherits the same frictions, regardless of size, sector or geography." /><ProblemList items={["Fragmented sourcing. Spreadsheets, WhatsApp threads and unverified vendor lists.", "Unlogged coordination. RFQs, POs and dispatches chased by hand. Nothing recorded.", "Opaque quotations. Price, lead time and compliance evidence in a different format every time.", "No vendor memory. Every deal starts from zero. No scorecards. No history.", "Trust by relationship. Supplier credibility judged on rapport, not evidence."]} /><p className="body-copy mt-8 text-[16px]">These are structural, not incidental. No one owns fixing them end to end.</p></Section>
    <Section><SectionHead eyebrow="The belief" title="Procurement doesn't need more software. It needs judgement at scale." lead="Software handles speed. Specialists handle judgement. Graviyx's AI structures RFQs, ranks vendors, normalises quotations and flags exceptions in seconds. Negotiation, escalation and unusual requirements stay with a named procurement specialist who is accountable for the outcome." /></Section>
    <Section tone="warm"><SectionHead eyebrow="The platform" title="One controllable environment, from first inquiry to final delivery." /><PlatformStrip /><Link to="/how-it-works" className="btn btn-secondary mt-10">See how it works →</Link></Section>
    <Section><SectionHead eyebrow="For buyers · For suppliers" title="Two sides. One orchestrated network." /><div className="mt-12 grid gap-4 md:grid-cols-2"><LinkOutCard eyebrow="For Buyers" title="Verified sourcing with full control." body="Source against verified supply, compare quotations like for like, and follow every order through to delivery." to="/for-buyers" cta="For Buyers" /><LinkOutCard eyebrow="For Suppliers" title="Verified access to enterprise demand." body="Reach enterprise buyers who are actively sourcing, with verification that carries your credibility." to="/for-suppliers" cta="For Suppliers" delay={0.1} /></div></Section>
    <Section tone="surface"><SectionHead eyebrow="Trust" title="Visible. Verifiable. Intelligent. Execution-ready." lead="Every supplier assessed before they quote. Every stage traceable. Every order tracked from PO to delivery." /><Reveal><Link to="/trust" className="btn btn-secondary mt-9">Trust →</Link></Reveal></Section>
    <Section><SectionHead eyebrow="Industries" title="Built for the sectors that run on physical supply." /><IndustryChips /></Section>
    <Section tone="surface"><SectionHead eyebrow="Where we serve" title="Connected across India's industrial corridors." lead="Our technology-enabled network coordinates demand, verified supply and fulfilment across the country's major metropolitan centres." /><IndiaCoverageMap /></Section>
    <Section tone="warm"><SectionHead eyebrow="The ecosystem" title="Four sides. One orchestrator." align="center" /><EcosystemDiagram /><p className="mt-6 text-center text-sm text-meta">Orchestrated trade, not just listed products.</p></Section>
    <CtaBar title="Source with specification. Deliver with proof." body="Browse verified supply in the Marketplace, or post the requirement you already have." actions={[{ label: "Marketplace", to: "/for-buyers" }, { label: "Post a Requirement", to: "/post-a-requirement", variant: "secondary" }]} />
  </>;
}
