import { getRoute } from "@/content/routes";
import { entity } from "@/content/entity";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { partnerProgram } from "@/content/partner-program";
import { RouteHero } from "@/components/modules/RouteHero";
import { CtaBand, QuestionSection, RelatedLinks } from "@/components/modules";
import { ResidualEstimator } from "@/components/partners/ResidualEstimator";
import { LeadForm } from "@/components/lead-form";
export const metadata = buildMetadata("/partners/");
export default function Partners() {
  const route = getRoute("/partners/")!;
  return <>
    <RouteHero path={route.path} eyebrow="Know the owners. Make the connection." aside={<div className="card partner-overlap" data-claim="partner-split"><p className="eyebrow">Two paths, written terms</p><h2>Choose the work behind your share.</h2><dl><div><dt>Sales reps</dt><dd>{partnerProgram.salesRepPercent}%</dd></div><div><dt>Referral partners</dt><dd>{partnerProgram.referralPercent}%</dd></div></dl><p>Shares apply to TruePay’s applicable profit under a written agreement.</p><a href="/about/team/">Meet the people behind the program</a></div>}>
      <p>Introduce TruePay to the owners who already trust you. Choose a sales rep or referral role around the work you want to do.</p>
      <a className="partner-estimate-link" href="#estimate">Estimate residuals ↓</a>
    </RouteHero>
    <section id="estimate" className="container section"><ResidualEstimator /></section>
    <section className="container section">
      <p className="eyebrow">Represent TruePay or make the introduction</p><h2>Choose the role that fits your relationships.</h2>
      <QuestionSection question={route.questions[0]}><p>A sales rep takes the selling role; a referral partner introduces an owner to TruePay. The share differs because the two paths involve different work.</p></QuestionSection>
      <div className="grid two" data-claim="partner-split">
        <article className="card partner-path"><p className="eyebrow">Stay in the sales conversation</p><h3>Sales rep</h3><p className="path-share">{partnerProgram.salesRepPercent}%</p><p>For someone who wants to discuss processing statements, payment equipment and TruePay’s programs with business owners.</p><a href="#apply">Tell us about your sales background</a></article>
        <article className="card partner-path"><p className="eyebrow">Make an owner-to-team introduction</p><h3>Referral partner</h3><p className="path-share">{partnerProgram.referralPercent}%</p><p>For someone whose existing work creates owner relationships and who wants TruePay to handle the processing conversation.</p><a href="#apply">Describe the businesses you know</a></article>
      </div>
      <p className="note">We’ll walk through your role, applicable profit and payment terms before you sign the partner agreement.</p>
      <QuestionSection question={route.questions[1]}><p data-claim="partner-estimator">{getClaim("partner-estimator").copy}</p><p>The model starts with equal monthly volume per account. Adding accounts increases the modeled base, while attrition reduces earlier accounts before the next group joins.</p></QuestionSection>
      <aside className="card partner-reward" data-claim="referral-reward"><h3>Ask about the separate merchant-referral reward.</h3><p>{getClaim("referral-reward").copy}</p><p className="note">Ask Jon which referral offer applies to your introduction, including its trigger and payout timing. The estimator models residual sharing only and adds no referral bonus.</p></aside>
    </section>
    <section className="dark-band section"><div className="container">
      <p className="eyebrow">Owners you already work with</p><QuestionSection question={route.questions[2]}><p>This program fits people who already serve local business owners and can make a useful introduction about their card processing. Start with the kinds of businesses you know and the payment questions they bring you.</p></QuestionSection>
      <div className="grid two"><article className="card"><h3>A relationship to build on</h3><p>You can name the owners you work with, explain how they take payment and ask permission for a TruePay introduction.</p></article><article className="card"><h3>When this is the wrong path</h3><p>If you need a salaried position or a promised monthly income, the residual estimator is not a job offer. Use the <a href="/careers/">career-interest page</a> for employment conversations.</p></article></div>
    </div></section>
    <section className="container section"><QuestionSection question={route.questions[3]}><p>TruePay’s training site covers its sales system and credit card processing. Start there, then bring role-specific questions to Jon and the team.</p><a className="button primary" href={entity.externalLinks.training}>Visit TruePay sales training ↗</a></QuestionSection><p><a href="/why-truepay/">Read the commitments you would be introducing to owners</a>.</p><RelatedLinks route={route} /></section>
    <CtaBand eyebrow="Bring the owner relationships you know" title="Put your first introduction on the table." primary="partner-apply" secondary="talk-to-person"><p>Tell the Josephine team which path interests you and which businesses you already work with.</p></CtaBand>
    <section id="apply" className="band section"><div className="container review-grid"><div><p className="eyebrow">Your partner introduction</p><h2>Tell us how you know local owners.</h2><p>Choose sales rep, referral partner or help choosing. You can describe your owner relationships without sharing a merchant’s private payment information.</p><p>Prefer to talk about the agreement first? Call <a href={entity.phone.href}>{entity.phone.display}</a>.</p><p className="note">Submitting an introduction does not enroll you in a partner agreement or promise a payout.</p></div><LeadForm formType="partner" /></div></section>
  </>;
}
