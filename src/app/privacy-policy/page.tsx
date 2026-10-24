import { getRoute } from "@/content/routes";
import { entity } from "@/content/entity";
import { publishedPrivacyIntro, publishedPrivacySections } from "@/content/privacy-policy";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import { RelatedLinks } from "@/components/modules";
export const metadata = buildMetadata("/privacy-policy/");
export default function PrivacyPolicy() {
  const route = getRoute("/privacy-policy/")!;
  return <>
    <RouteHero path={route.path} eyebrow="Information you share with TruePay"><p>Read TruePay’s published privacy policy and the added details for this website’s forms. Send privacy questions to support@gotruepay.com.</p></RouteHero>
    <article className="container section legal-body">
      <aside className="card legal-edition"><p>Published policy: <time dateTime="2024-07-16">July 16, 2024</time>. Website-forms addition drafted <time dateTime="2026-10-24">Oct. 24, 2026</time>.</p><p className="note">The website-forms section supplements the published policy below. Its contact-permission rules apply to the review, contact, partner and career-interest forms on this site.</p><nav aria-label="Privacy policy sections"><a href="#information-collected">Information collected</a><a href="#text-messages">Text messaging</a><a href="#website-forms">Website forms</a><a href="#privacy-contact">Privacy contact</a></nav></aside>
      <div data-published-policy><p>{publishedPrivacyIntro}</p>
        {publishedPrivacySections.map(s=><section key={s.id} id={s.id}><h2>{s.title}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}{"items" in s && <ul>{s.items?.map(i=><li key={i}>{i}</li>)}</ul>}{"after" in s && s.after?.map(p=><p key={p}>{p}</p>)}{s.id === "text-messages" && <p className="policy-forms-clarification">For these website forms, the <a href="#website-forms">website-forms section</a> controls contact permission. Providing an optional phone number here is not an enrollment in promotional text messaging.</p>}</section>)}
        <section id="privacy-contact"><h2>7. Contact us about this policy</h2><p>If you have any questions or concerns about this Privacy Policy, please get in touch with us at:</p><address>{entity.name}<br />Email: <a href={`mailto:${entity.email}`}>{entity.email}</a><br />Phone: <a href={entity.phone.href}>{entity.phone.display}</a></address></section>
      </div>
      <section id="website-forms" className="card website-forms-policy"><p className="eyebrow">Review requests and opportunity introductions</p><h2>8. Website forms and calculator inputs</h2>
        <h3>What a request contains</h3><p>The statement-review and contact forms collect your name, business, email, optional phone number, business type and message. Partner introductions also collect a selected rep or referral path; career interests use optional work-background fields instead of requiring a business name.</p><p>TruePay uses that information to respond to the request you send. The permission checkbox is for that response, not promotional SMS enrollment; a separate text-message opt-in would be needed for promotional messaging.</p>
        <h3>Delivery and follow-up</h3><p>A submitted request goes to TruePay’s configured intake service. When delivery cannot be confirmed, the form displays a phone fallback instead of a success confirmation.</p><p>No statement or resume upload is available through these forms. Keep card numbers, bank details and confidential merchant documents out of the message; contact the team to arrange an appropriate way to share documents.</p><p>For questions about storage, retention or deletion of a form submission, email <a href={`mailto:${entity.email}`}>{entity.email}</a>. Include which form you used and enough contact information to locate your request without sending payment credentials.</p>
        <h3>Calculators, campaign tags and confirmation</h3><p>The effective-rate and partner-residual calculators run in your browser. Their entered amounts are not included in the lead request or the calculator event this website sends.</p><p>Campaign tags may be kept for your browser session and attached to a request so TruePay can identify its source. If analytics is configured, the site’s form events exclude names, email addresses, messages and calculator amounts.</p><p>A short-lived confirmation cookie records successful delivery and the form type for the thank-you page. It contains no name, email or message and expires after five minutes.</p>
      </section>
      <RelatedLinks route={route} />
    </article>
  </>;
}
