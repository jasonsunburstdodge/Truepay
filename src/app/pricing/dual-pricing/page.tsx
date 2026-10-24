import { getRoute } from "@/content/routes";
import { dualPricingFit } from "@/content/commitments";
import { getClaim } from "@/lib/claims";
import { checkoutExample, money } from "@/lib/checkout-example";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  CtaBand,
  FitCheck,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/pricing/dual-pricing/");
export default function DualPricing() {
  const route = getRoute("/pricing/dual-pricing/")!;
  const example = checkoutExample(10000, 400);
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="Cash price. Card price. A clear choice."
        aside={<ProofQuote id="r-moore" />}
      >
        <p>
          Dual pricing shows a cash price and a card price before payment. See
          how checkout works and whether the approach fits your business.
        </p>
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">Follow a payment through checkout</p>
        <QuestionSection question={route.questions[0]}>
          <p data-claim="dual-pricing-cost">
            {getClaim("dual-pricing-cost").copy}
          </p>
          <p>
            Customers see both prices and choose their payment method. Discuss
            the price display and customer explanation with TruePay before
            deciding whether this approach suits your business.
          </p>
          <figure className="card checkout-example" data-checkout-example>
            <figcaption>
              <h3>One illustrative checkout</h3>
            </figcaption>
            <p data-assumptions>
              Assumptions: one item with a cash price of{" "}
              {money(example.cashCents)} and an assumed price difference of{" "}
              {money(example.differenceCents)}. No tax, tip, discount or other
              charge is included. These are hypothetical prices, not a TruePay
              rate or a quote. This example does not calculate your net
              processing cost.
            </p>
            <div className="grid two">
              <div className="card">
                <h4>Displayed cash price</h4>
                <strong className="result-number" data-cash-price>
                  {money(example.cashCents)}
                </strong>
                <p>Customer chooses cash.</p>
              </div>
              <div className="card card-price">
                <h4>Displayed card price</h4>
                <strong className="result-number" data-card-price>
                  {money(example.cardCents)}
                </strong>
                <p>Customer chooses card.</p>
                <div className="receipt-row">
                  <span>Receipt item / total paid</span>
                  <strong data-receipt-total>
                    {money(example.receiptCents)}
                  </strong>
                </div>
              </div>
            </div>
            <p className="contact-page-link" data-example-formula>
              Card price = {money(example.cashCents)} cash price +{" "}
              {money(example.differenceCents)} assumed difference ={" "}
              {money(example.cardCents)}. The card receipt uses that displayed
              card price; the difference is not added again.
            </p>
          </figure>
        </QuestionSection>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Make the choice visible</p>
          <QuestionSection question={route.questions[1]}>
            <p data-claim="dual-pricing-rules">
              {getClaim("dual-pricing-rules").copy}
            </p>
            <div className="grid three">
              <article className="card">
                <h3>Before payment</h3>
                <p>
                  Review signage and price displays so customers can see the
                  cash and card prices before choosing how to pay.
                </p>
              </article>
              <article className="card">
                <h3>At the terminal</h3>
                <p>
                  Review the payment prompt and the selected price with your
                  team. Confirm how debit cards are treated in your specific
                  setup.
                </p>
              </article>
              <article className="card">
                <h3>On the receipt</h3>
                <p>
                  Check that the receipt matches the selected price and payment.
                  Use the checkout example above to understand the arithmetic.
                </p>
              </article>
            </div>
            <p className="contact-page-link">
              Debit-card treatment and state law vary. Confirm current
              requirements, disclosures and the proposed setup with TruePay
              before using the program.
            </p>
          </QuestionSection>
        </div>
      </section>
      <section className="dark-band section">
        <div className="container">
          <p className="eyebrow">Would two prices suit your checkout?</p>
          <QuestionSection question={route.questions[2]}>
            <p>
              Start with how your customers pay and whether separate prices suit
              your checkout. Consider these tradeoffs before changing your
              pricing.
            </p>
          </QuestionSection>
          <FitCheck {...dualPricingFit} recommendation={false} />
          <p>
            <a href="/pricing/membership/">
              Compare Membership if separate prices do not fit
            </a>
            .
          </p>
        </div>
      </section>
      <section className="container section">
        <QuestionSection question={route.questions[3]}>
          <p>
            Dual pricing displays separate cash and card prices. A surcharge
            adds a charge to a card transaction; a cash discount reduces a
            displayed price for paying cash. The label alone does not establish
            the applicable rules. The actual pricing, card treatment and
            disclosures need review.
          </p>
          <p>
            Ask TruePay to explain your proposed structure and the costs you
            still pay. Compare it with{" "}
            <a href="/pricing/membership/">
              Membership’s traditional card pricing
            </a>{" "}
            before choosing.
          </p>
        </QuestionSection>
        <RelatedLinks route={route} />
      </section>
      <CtaBand
        eyebrow="Start with the fit"
        title="Talk through your checkout and your costs."
        primary={route.primaryCta}
        secondary={route.secondaryCta}
      />
    </>
  );
}
