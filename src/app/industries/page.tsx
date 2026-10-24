import { getRoute } from "@/content/routes";
import { industryPages } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";
import { webPageNode } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { AnswerFirst, Breadcrumbs, CtaBand, QuestionSection } from "@/components/modules";
import { CtaButtons } from "@/components/modules/CtaBand";
export const metadata = buildMetadata("/industries/");
const moments: Record<string,string> = {
 restaurants:"Open tabs, split checks and the tip adjustment at shift close.",
 retail:"Product records, counter and website purchases and the return that follows.",
 "salons-spas":"Booking deposits, no-shows and the tip at the end of a visit.",
 "medical-dental":"Visit collections, later patient balances and the practice-software handoff.",
 "home-services":"Dispatch, a weak signal at the property and the final job invoice.",
 "auto-services":"Repair approvals, parts deposits and payment before the keys change hands.",
 "professional-services":"Engagement terms, retainers and payments against open receivables.",
 nonprofits:"Online gifts, event volunteers and the donor acknowledgment after collection.",
};
export default function Industries() {
 const route=getRoute("/industries/")!;
 return <><JsonLd nodes={[webPageNode(route)]} />
  <section className="hero-gradient route-hero"><div className="container"><Breadcrumbs path={route.path}/><div className="route-hero-copy"><p className="eyebrow">Start with the payment moment</p><h1>{route.h1}</h1><p className="industry-hero-summary">A restaurant tab and a contractor’s final invoice need different handoffs. Choose the routine that looks like yours.</p><CtaButtons primary={route.primaryCta} secondary="none" /></div></div></section>
  <section className="container section resource-hub"><AnswerFirst><p>Start with the work behind the payment: closing a restaurant tab, collecting a patient balance or reconciling an online gift. The guides below connect those moments to equipment, pricing choices and staff practice. Bring TruePay your actual software and checkout steps so the team can check the proposed connection.</p></AnswerFirst>
   <QuestionSection question={route.questions[0]}><p>Use the relevant guide to prepare that conversation with your current system details. A salon’s booking deposit, for example, needs a different demonstration from a retail return.</p></QuestionSection>
   <div className="grid two resource-grid">{industryPages.map(c=>{const r=getRoute(`/industries/${c.slug}/`)!;return <article className="card resource-card" key={c.slug}><p className="eyebrow">{r.label}</p><h2>{r.h1}</h2><p>{moments[c.slug]}</p><a href={r.path}>Explore {r.label.toLowerCase()} payments <span aria-hidden="true">↗</span></a></article>;})}</div>
  </section>
  <CtaBand eyebrow="Bring the statement and system name" title="Compare costs in the context of your checkout." primary={route.primaryCta} secondary="talk-to-person" />
 </>;
}
