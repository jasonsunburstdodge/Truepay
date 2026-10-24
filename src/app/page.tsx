import { getRoute } from "@/content/routes";
import { entity, people } from "@/content/entity";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { webPageNode } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import {
  AnswerFirst,
  Commitment,
  CtaButtons,
  FitCheck,
  PersonCard,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
import { RateCalculator } from "@/components/rate-calculator";
import { LeadForm } from "@/components/lead-form";
export const metadata = buildMetadata("/");
export default function Home() {
  const route = getRoute("/")!;
  return (
    <>
      <JsonLd nodes={[webPageNode(route)]} />
      <section className="hero-gradient hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Built around your business</p>
            <h1>{route.h1}</h1>
            <AnswerFirst>
              <p>
                TruePay helps business owners understand card processing costs
                from our home in Josephine, Texas.{" "}
                <span data-claim="founded-2011">
                  {getClaim("founded-2011").copy}
                </span>
              </p>
            </AnswerFirst>
            <CtaButtons
              primary={route.primaryCta}
              secondary={route.secondaryCta}
            />
          </div>
          <aside className="hero-proof">
            <p className="eyebrow">People who follow through</p>
            <ProofQuote id="a-monroe" />
          </aside>
        </div>
      </section>
      <section className="container overlap card">
        <p className="eyebrow">Start with clarity</p>
        <h2>Know where your money is going.</h2>
        <div className="grid three">
          <div>
            <span className="step-number">01</span>
            <p>Understand your statement.</p>
          </div>
          <div>
            <span className="step-number">02</span>
            <p>Compare your options.</p>
          </div>
          <div>
            <span className="step-number">03</span>
            <p>Choose what fits your business.</p>
          </div>
        </div>
        <p data-claim="honest-recommendation">
          {getClaim("honest-recommendation").copy}
        </p>
      </section>
      <section className="container section">
        <p className="eyebrow">Sound familiar?</p>
        <h2>
          Your business is demanding.
          <br />
          Your processor shouldn’t be.
        </h2>
        <div className="grid three">
          <article>
            <h3>A rate that keeps changing.</h3>
            <p>
              You signed up at one rate. Your statement now tells a different
              story.
            </p>
          </article>
          <article>
            <h3>Fees you can’t explain.</h3>
            <p>
              You need to know what each charge means and what you’re actually
              paying.
            </p>
          </article>
          <article>
            <h3>Help that’s hard to reach.</h3>
            <p>
              When checkout stops, you need someone to talk to about getting it
              moving.
            </p>
          </article>
        </div>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Our commitments</p>
          <QuestionSection question={route.questions[2]}>
            <p>
              Separate the card networks’ costs from your processor’s markup.
              Here is the scope of TruePay’s rate lock.
            </p>
          </QuestionSection>
          <div className="grid three">
            <Commitment context="home" id="rate-lock" title="A markup that stays put" />
            <Commitment
              id="month-to-month"
              title="Room to make your own choice"
            />
            <Commitment id="us-support" title="People you can reach" />
          </div>
        </div>
      </section>
      <section className="dark-band section">
        <div className="container">
          <p className="eyebrow">The people behind the promise</p>
          <QuestionSection question={route.questions[3]}>
            <p>
              Call <a href={entity.phone.href}>{entity.phone.display}</a> or
              email <a href={`mailto:${entity.email}`}>{entity.email}</a> about
              your equipment or account.{" "}
              <a href="/support/">Get merchant support</a>.
            </p>
          </QuestionSection>
          <div className="grid two">
            {people.slice(0, 2).map((person) => (
              <PersonCard key={person.slug} person={person} bio={person.slug === "jon-wilson" ? "Jon’s TruePay work focuses on the pricing, statement and dual-pricing questions behind your processing decision." : "Shane handles TruePay operations across onboarding, equipment and the support handoff after setup."} />
            ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <p className="eyebrow">Choose your starting point</p>
        <QuestionSection question={route.questions[0]}>
          <p>
            TruePay helps business owners accept card payments. Start with how
            your customers pay, then discuss equipment and pricing that fit.
          </p>
        </QuestionSection>
        <div className="grid four">
          {[
            [
              "/solutions/terminals/",
              "At the counter",
              "Taking payments face to face? Start with your checkout needs.",
            ],
            [
              "/solutions/point-of-sale/",
              "At the table",
              "Talk through the way your guests order and pay.",
            ],
            [
              "/solutions/mobile-payments/",
              "On the job",
              "Tell us where your work takes you and how you collect payment.",
            ],
            [
              "/solutions/online-payments/",
              "Online or by invoice",
              "Start with your website, billing process and existing software.",
            ],
          ].map(([href, title, body]) => (
            <article className="card payment-card" key={title}>
              <span className="payment-icon" aria-hidden="true">
                ↗
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
              <a href={href}>Explore {title.toLowerCase()}</a>
            </article>
          ))}
        </div>
      </section>
      <section className="dark-band section">
        <div className="container">
          <p className="eyebrow">Check the fit before changing processors</p>
          <h2>Is dual pricing right for you?</h2>
          <p>
            <a href="/pricing/dual-pricing/">
              See how dual pricing works at checkout
            </a>
            .
          </p>
          <p className="section-intro" data-claim="dual-pricing-cost">
            Two displayed prices can offset part of card acceptance costs through the card price. Include any remaining monthly charges when comparing the program.
          </p>
          <FitCheck
            goodFit={[
              "You accept both cash and card payments.",
              "Processing costs are putting pressure on your margins.",
              "You want to discuss separate cash and card prices.",
            ]}
            notFit={[
              "Your business is cashless by design.",
              "Most of your sales are online or through subscriptions.",
              "Your current pricing already works for your business.",
            ]}
          />
        </div>
      </section>
      <section id="calculator" className="band section">
        <div className="container">
          <p className="eyebrow">Put a percentage on the processing bill</p>
          <h2>What are you really paying?</h2>
          <p className="section-intro">
            Your effective rate is your total processing fees divided by your
            card sales, multiplied by 100.
          </p>
          <RateCalculator context="home" />
          <p className="calculator-page-link">
            <a href="/effective-rate-calculator/">
              Open the effective rate calculator
            </a>
          </p>
        </div>
      </section>
      <section className="container section">
        <p className="eyebrow">From published TruePay reviews</p>
        <h2>Support is a relationship.</h2>
        <div className="grid two">
          <ProofQuote id="e-springfield" />
          <ProofQuote id="r-moore" />
        </div>
      </section>
      <section className="band section">
        <div className="container coverage">
          <p className="eyebrow">Josephine is where TruePay starts</p>
          <h2>Check service options for your payment location.</h2>
          <p className="section-intro" data-claim="coverage">
            TruePay’s home base is Josephine, Texas, with business coverage across the U.S.
          </p>
          <p>
            Name the state where your checkout or job sites operate so the team can discuss service options for that location.
          </p>
        </div>
      </section>
      <section id="review" className="hero-gradient section">
        <div className="container review-grid">
          <div>
            <p className="eyebrow">Start with a conversation</p>
            <QuestionSection question={route.questions[1]}>
              <p>
                A statement review explains your processing fees and effective
                rate, then compares your options. There’s no charge for the
                review.
              </p>
            </QuestionSection>
            <p data-claim="honest-recommendation">
              {getClaim("honest-recommendation").copy}
            </p>
            <p>
              Call <a href={entity.phone.href}>{entity.phone.display}</a> to
              discuss your statement. Keep account numbers and statement files
              out of this contact form.
            </p>
          </div>
          <LeadForm placement="home" />
        </div>
      </section>
      <div className="container">
        <p className="contact-page-link">
          <a href="/contact/">Talk with TruePay about pricing or equipment</a>
        </p>
        <RelatedLinks route={route} />
      </div>
    </>
  );
}
