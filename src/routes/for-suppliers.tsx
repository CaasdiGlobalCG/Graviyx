import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHead } from "@/components/site/Section";
import { PillarGrid } from "@/components/site/PillarCard";
import { CtaBar } from "@/components/site/CtaBar";
import { pageMeta } from "@/lib/seo";
const description="Get verified once and reach enterprise buyers who are actively sourcing. A named specialist guides onboarding and helps you grow.";
export const Route=createFileRoute("/for-suppliers")({head:()=>pageMeta("For Suppliers — Verified Access to Enterprise Demand | GRAVIYX",description),component:ForSuppliers});
const checks=[{title:"Document check",body:"Company standing and compliance documents."},{title:"Capability assessment",body:"Demonstrated capability for the category."},{title:"Site verification",body:"Applied where physical production capability materially affects buyer risk."}];
function ForSuppliers(){return <>
<Hero eyebrow="For suppliers" headline="A credible route to serious B2B demand." subhead="Network access means little without support behind it. Graviyx pairs verified status with a named specialist who helps you get trade-ready and grow." actions={[{label:"Apply for Verification",to:"/contact"}]} compact />
<Section tone="surface"><SectionHead eyebrow="Five pillars" title="Verified access, supported growth." /><PillarGrid pillars={[
{title:"01 · Demand access",body:"Visibility into enterprise buyers who are actively sourcing. Requirements are matched to your capability, not broadcast."},
{title:"02 · Verified credibility",body:"Verification status does the trust-building for you, guided by a specialist rather than a form."},
{title:"03 · Commercial visibility",body:"Your performance and capability are visible to every buyer on the network, backed by a scorecard and attached evidence."},
{title:"04 · Streamlined quotation and order flow",body:"Structured RFQs, comparable quotation formats and in-platform PO countersignature. Fewer manual back-and-forths, more closed deals."},
{title:"05 · A scalable growth path",body:"One verified profile gives access to many buyers. Specialists coach you on reading your scorecard and improving it."}
]} /></Section>
<Section><SectionHead eyebrow="What verification involves" title="Checked before the first RFQ. Maintained after." lead="Verification is checked before you can receive an RFQ, and maintained after." /><div className="mt-12 space-y-3">{checks.map((item,index)=><motion.div key={item.title} className="panel flex gap-5 p-6" initial={{y:18}} whileInView={{y:0}} viewport={{once:true}} transition={{delay:index*.16}}><span className="mark-dot mt-2 shrink-0"/><div><h3 className="display-sm text-fg">{index+1}. {item.title}</h3><p className="body-copy mt-2 text-[16px]">{item.body}</p></div></motion.div>)}</div><p className="body-copy mt-8 max-w-3xl text-[16px]"><strong className="text-fg">After onboarding:</strong> A continuous scorecard tracks on-time performance, quality, returns and dispute rate, updated deal by deal. Test reports, certificates and shipment histories are attached to your record.</p><Link to="/trust" className="btn btn-secondary mt-7">See the full trust architecture →</Link></Section>
<Section tone="warm"><SectionHead eyebrow="How Graviyx charges" title="Two supplier models." lead="Commercial terms are agreed during onboarding." /><PillarGrid pillars={[{title:"Success-based fee",body:"Tied to completed deals."},{title:"Usage-based fee",body:"Tied to platform access and lead volume."}]} /></Section>
<CtaBar title="Be verified once. Be visible to every buyer." actions={[{label:"Apply for Verification",to:"/contact"}]} />
</>}
