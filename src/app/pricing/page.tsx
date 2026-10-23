import { getRoute } from "@/content/routes";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  ComparisonTable,
  CtaBand,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/pricing/");
export default function Pricing() {
  const route = getRoute("/pricing/")!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="Know the cost, then choose"
        aside={<ProofQuote id="r-moore" />}
      >
        <p>
          TruePay’s pricing starts with how your business takes payments, the
          cards your customers use and your processing statement. A single
          advertised rate cannot explain your total cost. Compare the pricing
          model, the processor’s markup and the full fee schedule before
          deciding between Membership and dual pricing.
        </p>
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">Start with an honest answer</p>
        <QuestionSection question={route.questions[0]}>
          <p>
            There is no universal rate quoted on this page. Your payment mix and
            business profile matter. Bring your statement to a review so you can
            compare a proposal with what you pay today.
          </p>
          <p data-claim="rate-lock">{getClaim("rate-lock").copy}</p>
          <p>
            <a href="/why-truepay/#fine-print">
              Read what the rate lock covers
            </a>
            . Network costs can change; the lock is not a freeze on every part
            of your bill.
          </p>
        </QuestionSection>
        <QuestionSection question={route.questions[1]}>
          <div className="grid two">
            {[
              [
                "How you take payments",
                "In-person payments, invoices and online checkout have different processing profiles. Start with where and how you collect payment.",
              ],
              [
                "The cards customers use",
                "Debit, rewards and business cards can carry different network costs. Your mix matters when comparing proposals.",
              ],
              [
                "Your business and risk profile",
                "Your industry, average sale, processing volume and time in business help shape the proposal.",
              ],
              [
                "Your processor’s markup",
                "Separate the network’s cost from the amount your processor adds. Compare that markup alongside the full fee schedule.",
              ],
            ].map(([title, body]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </QuestionSection>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Compare the whole bill</p>
          <QuestionSection question={route.questions[2]}>
            <p>
              No model is automatically cheaper for every business. Compare the
              same month of transactions, including monthly and per-transaction
              charges. A simple flat-rate plan can fit very low volume when
              recurring fees would outweigh a lower transaction price.
            </p>
            <ComparisonTable
              caption="Processing pricing models: structure, fit and tradeoffs"
              columns={[
                "Model",
                "How it works",
                "When to consider it",
                "What to check",
              ]}
              rows={[
                [
                  "Flat rate",
                  "A bundled transaction price, rather than an itemized network cost plus markup.",
                  "Very low volume or a business prioritizing a simple bill.",
                  "Recurring fees, different transaction channels and the total at your volume.",
                ],
                [
                  "Tiered",
                  "Transactions are grouped into pricing tiers defined by the processor.",
                  "A proposal where the tier definitions and your card mix are clear.",
                  "Which transactions fall into each tier and how changes affect your bill.",
                ],
                [
                  "Cost-plus / interchange-plus",
                  "Network interchange is separated from the processor’s markup.",
                  "A business wanting to see the cost and markup separately.",
                  "The markup, per-item charges and all recurring fees.",
                ],
              ]}
            />
            <p data-claim="cost-plus">{getClaim("cost-plus").copy}</p>
          </QuestionSection>
        </div>
      </section>
      <section className="container section">
        <p className="eyebrow">Choose the approach that fits</p>
        <QuestionSection question={route.questions[3]}>
          <div className="grid two">
            <article className="card">
              <h3>Membership</h3>
              <p>
                Start here if you want traditional card pricing with network
                costs and processor markup shown separately. It may fit better
                if separate cash and card prices do not suit your customers.
              </p>
              <a href="/pricing/membership/">
                Explore Membership pricing and its scope
              </a>
            </article>
            <article className="card">
              <h3>Dual pricing</h3>
              <p>
                Consider it if you accept cash and cards and want to discuss
                separate displayed prices. A cashless business or one selling
                mainly through subscriptions should compare other options.
              </p>
              <a href="/pricing/dual-pricing/">See dual pricing at checkout</a>
            </article>
          </div>
          <p className="contact-page-link">
            Not sure? <a href="/statement-review/">Get a statement review</a>{" "}
            before choosing. You can also{" "}
            <a href="/effective-rate-calculator/">
              calculate your effective rate
            </a>{" "}
            to establish your starting point.
          </p>
        </QuestionSection>
        <RelatedLinks route={route} />
      </section>
      <CtaBand
        eyebrow="Use your actual numbers"
        title="Compare a proposal with today’s costs."
        primary={route.primaryCta}
        secondary={route.secondaryCta}
      />
    </>
  );
}
