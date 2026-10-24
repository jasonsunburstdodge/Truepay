import { getRoute } from "@/content/routes";
import { entity } from "@/content/entity";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import { CtaBand, QuestionSection, RelatedLinks } from "@/components/modules";
import { LeadForm } from "@/components/lead-form";
export const metadata = buildMetadata("/careers/");
export default function Careers() {
  const route = getRoute("/careers/")!;
  return <>
    <RouteHero path={route.path} eyebrow="The work behind a merchant’s checkout"><p>Bring your experience with business owners, payment equipment or merchant support. Share the work you’d like to do with TruePay’s Josephine team.</p></RouteHero>
    <section className="container section">
      <QuestionSection question={route.questions[0]}><p>Send a general interest note below and ask the team which roles are open. Tell us about the statements you’ve explained, equipment you’ve helped set up or merchant questions you’ve handled.</p><p className="note">This is a general interest form, not a listing for a specific vacancy.</p></QuestionSection>
      <QuestionSection question={route.questions[1]}><p>The work connects an owner’s processing costs with the equipment and support behind the counter. Jon focuses on merchant pricing; Shane oversees onboarding, equipment and support.</p><a href="/about/team/">Get to know TruePay’s team and responsibilities</a></QuestionSection>
      <div className="grid two"><article className="card"><p className="eyebrow">For the career-interest conversation</p><h2 className="section-heading">Bring a payment problem you’ve worked through.</h2><p>A short example helps: a fee you explained, a terminal issue you resolved or an owner’s question you helped answer. Keep customer names and account details out of the introduction.</p></article><article className="card"><p className="eyebrow">For independent owner relationships</p><h2 className="section-heading">Looking for a rep or referral path?</h2><p>Compare the sales rep and referral partner roles if your interest starts with the business owners you already serve. Those paths use written residual-sharing agreements, not the career-interest form.</p><a href="/partners/">Explore the TruePay partner paths</a></article></div>
      <RelatedLinks route={route} />
    </section>
    <CtaBand eyebrow="Statements, setup and merchant questions" title="Tell us which part of payment work you know." primary="careers-apply" secondary="talk-to-person" />
    <section id="apply" className="band section"><div className="container review-grid"><div><p className="eyebrow">Introduce your work background</p><h2>A short note for the Josephine team.</h2><p>Describe the payment or owner-facing work you’ve done and the responsibilities you want to discuss. The form accepts contact details and text, not resume uploads.</p><p>To ask about a role by phone, call <a href={entity.phone.href}>{entity.phone.display}</a>.</p></div><LeadForm formType="careers" /></div></section>
  </>;
}
