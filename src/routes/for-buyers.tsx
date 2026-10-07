import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { PillarGrid } from "@/components/site/PillarCard";
import { DealTimeline } from "@/components/site/DealTimeline";
import { PricingLogic } from "@/components/site/PricingLogic";
import { CtaBar } from "@/components/site/CtaBar";
import { pageMeta } from "@/lib/seo";
const description="Source from verified suppliers, compare quotations like for like and track every order to delivery, with a named specialist on every account.";
export const Route=createFileRoute("/for-buyers")({head:()=>pageMeta("For Buyers — Verified Sourcing with Full Control | GRAVIYX",description),component:ForBuyers});
function ForBuyers(){return <>
<Hero eyebrow="For buyers" headline="Buyers gain control most sourcing channels can't offer." subhead="Verified supply, structured quotations and a complete record, from first requirement to delivery." actions={[{label:"Start Sourcing",to:"/for-buyers"},{label:"Post a requirement now",to:"/post-a-requirement",variant:"secondary"}]} compact />
<Section tone="surface"><SectionHead eyebrow="Five pillars" title="Software moves the deal quickly. A named specialist owns the judgement calls." /><PillarGrid pillars={[
{title:"01 · Faster sourcing cycles",body:"Structured intake, AI-assisted shortlisting and normalised quotation comparison compress sourcing from weeks to days. RFQs are shortlisted and sent to vendors in hours."},
{title:"02 · Confident supplier selection",body:"Every supplier is checked on company standing, capability and compliance documents before it can receive an RFQ. A shortlist is one you would plausibly approve without further due diligence."},
{title:"03 · Sharper price discovery",body:"Quotations are normalised on price, lead time and compliance evidence. A specialist negotiates the lines the platform flags as outliers."},
{title:"04 · Real-time operational visibility",body:"Pricing, inventory and shipment status, live. Buyer and vendor work from the same view of every deal, so there is no status-chasing."},
{title:"05 · Spend intelligence and control",body:"Every RFQ, quotation, PO and dispatch is logged. Approver hierarchies, spend caps and audit-ready trails are built into every PO."}
]} /></Section>
<Section><SectionHead eyebrow="One deal, end to end" title="Day 0 to Day 18." /><DealTimeline /></Section>
<Section tone="warm"><SectionHead eyebrow="How Graviyx charges" title="Value aligned to procurement outcomes." lead="Graviyx captures value in proportion to verified sourcing, speed, cost optimisation and reduced risk. Commercial terms are agreed with your procurement specialist." /><PricingLogic paths={[{name:"Per-deal fee",body:"Priced to the transaction."},{name:"Segment-specific pricing",body:"Priced to the category."},{name:"Subscription",body:"For buyers with high transaction volume."}]} /></Section>
<CtaBar title="Start with a verified shortlist." actions={[{label:"Marketplace",to:"/for-buyers"},{label:"Post a requirement now",to:"/post-a-requirement",variant:"secondary"}]} />
</>}
