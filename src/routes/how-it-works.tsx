import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { Stepper } from "@/components/site/Stepper";
import { PillarGrid } from "@/components/site/PillarCard";
import { LinkOutCard } from "@/components/site/LinkOutCard";
import { CtaBar } from "@/components/site/CtaBar";
import { pageMeta } from "@/lib/seo";
const description="Six stages from RFQ intake to fulfilment, on one shared record. AI moves the deal. A specialist owns every judgement call.";
export const Route=createFileRoute("/how-it-works")({head:()=>pageMeta("How It Works — From RFQ to Delivery | GRAVIYX",description),component:HowItWorks});
function HowItWorks(){return <>
<Hero eyebrow="How it works" headline="How a requirement becomes a delivered order." subhead="One shared record from RFQ to dispatch. AI moves the deal. A specialist owns every judgement call." />
<Section tone="surface"><SectionHead eyebrow="The six stages" title="From intake to fulfilment, nothing moves off-record." /><Stepper steps={[
{title:"01 · RFQ Intake",body:"The buyer submits a structured RFQ, or the AI drafts one on the buyer's behalf. It captures the specification, quantity, drawings where relevant and target delivery date."},
{title:"02 · Review & Shortlist",body:"A procurement specialist reviews the RFQ. The AI produces a vendor shortlist scored on category fit, past performance and available capacity. The specialist refines it."},
{title:"03 · Quotations & Compare",body:"The RFQ goes to shortlisted vendors. Quotations are normalised so price, lead time and compliance evidence can be compared like for like."},
{title:"04 · Negotiate & Confirm",body:"A specialist negotiates the lines flagged as outliers. The final quotation is locked with buyer approval."},
{title:"05 · PO & Vendor Approval",body:"The PO is generated or uploaded, sent to the vendor and countersigned in-platform. The AI drafts. A person signs."},
{title:"06 · Fulfil & Log",body:"Dispatch, milestones and delivery are tracked in a view shared by buyer and vendor. Every event is logged to the vendor's scorecard."}
]} /></Section>
<Section><SectionHead eyebrow="After delivery" title="The record keeps working." /><PillarGrid pillars={[{title:"Analytics",body:"Spend intelligence and vendor performance across deals."},{title:"Forecast",body:"Confirmed POs and open enquiries become a Rollout Forecast for procurement teams and suppliers."},{title:"Recommendations",body:"The next RFQ is pre-populated. Where a vendor is at risk, specialists recommend alternates and contingency plans."}]} /></Section>
<Section tone="warm"><SectionHead eyebrow="Four engine layers" title="The operating system behind the flow." /><PillarGrid pillars={[{title:"Verified Network",body:"Every vendor is onboarded through document, capability and site verification."},{title:"Structured Workflow",body:"One shared record from RFQ to PO to dispatch. No parallel spreadsheets or re-keying."},{title:"Applied Intelligence",body:"AI ranks vendors, normalises quotations and flags outliers."},{title:"Managed Fulfilment",body:"Dispatch, milestones and delivery windows tracked with buyer and vendor in the same view."}]} /></Section>
<Section><SectionHead eyebrow="Go deeper" title="Inspect the layers behind the workflow." /><div className="mt-12 grid gap-4 md:grid-cols-2"><LinkOutCard title="The Intelligence Layer" body="How the AI works, what triggers each function and where it hands off to a person." to="/intelligence-layer" cta="See the full Intelligence Layer"/><LinkOutCard title="Fulfilment & Warehousing" body="The three-tier network behind delivery reliability." to="/fulfillment-warehousing" cta="See Fulfilment & Warehousing" delay={.1}/></div></Section>
<CtaBar title="Run the six stages on your own requirement." actions={[{label:"Marketplace",to:"/for-buyers"},{label:"Post a Requirement",to:"/post-a-requirement",variant:"secondary"}]} />
</>}
