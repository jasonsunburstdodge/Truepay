import { getRoute } from "@/content/routes";
import { type Solution } from "@/content/solutions";
import { entity } from "@/content/entity";
import { getClaim } from "@/lib/claims";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  ComparisonTable,
  CtaBand,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
const supportDetails: Record<string,string> = {
  "/solutions/point-of-sale/": "Give support the POS name and explain whether order entry or the payment step has stopped.",
  "/solutions/terminals/": "Report the terminal model, displayed error and whether the device still has power and a connection.",
  "/solutions/mobile-payments/": "Tell support the portable device, current signal and whether a payment already shows an approval.",
  "/solutions/online-payments/": "Share the gateway name and checkout error, keeping full card numbers out of the website-support message.",
  "/solutions/integrations/": "Identify the software version and the part of the payment-to-record connection that is failing.",
  "/solutions/billing-software/": "Bring the invoice reference and describe whether payment collection or QuickBooks posting is affected."
};
const ctaTitles: Record<string,string> = {
  "/solutions/point-of-sale/": "Compare the order, kitchen and payment handoff.",
  "/solutions/terminals/": "Choose the terminal for your payment counter.",
  "/solutions/mobile-payments/": "Plan the connection for your portable payment device.",
  "/solutions/online-payments/": "Check the gateway behind your website checkout.",
  "/solutions/integrations/": "Check your current system before replacing its payment connection.",
  "/solutions/billing-software/": "Trace the invoice payment back to QuickBooks."
};
export function SolutionPage({ solution: s }: { solution: Solution }) {
  const route = getRoute(s.path)!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow={s.eyebrow}
        aside={<ProofQuote id="a-monroe" />}
      >
        <p>{s.hero}</p>
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">Start with the fit</p>
        <div className="grid two">
          <article className="card">
            <h2 className="section-heading">A good starting point if…</h2>
            <p>{s.fit}</p>
          </article>
          <article className="card">
            <h2 className="section-heading">Think it through if…</h2>
            <p>{s.notFit}</p>
          </article>
        </div>
        <p className="back-to-hub">
          <a href="/solutions/">Compare all payment solutions</a>
        </p>
        <QuestionSection question={route.questions[0]}>
          <p>{s.questions[0]}</p>
        </QuestionSection>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Compare your options</p>
          <h2>Start with what your team needs.</h2>
          <p className="table-hint">
            Scroll across the table to compare every column.
          </p>
          <div data-sources>
            <ComparisonTable
              caption={`${route.label}: options and source information. Ask us to confirm availability for your business.`}
              columns={[...s.columns, "Source"]}
              rows={s.options.map((row) => [
                ...row.cells,
                <a key={row.source + row.cells[0]} href={row.source}>
                  {row.sourceLabel}
                </a>,
              ])}
            />
          </div>
          {s.path === "/solutions/point-of-sale/" && (
            <p className="contact-page-link">
              Looking for SkyTab Mobile or SkyTab Glass? Tell us which model you
              use so we can talk through your setup.
            </p>
          )}
          {s.path === "/solutions/terminals/" && (
            <p className="contact-page-link">
              Looking for Clover Mini or Clover Station Duo?{" "}
              <a href="/solutions/point-of-sale/">Compare the POS options</a>{" "}
              with your terminal needs.
            </p>
          )}
          {s.path === "/solutions/mobile-payments/" && (
            <p className="contact-page-link">
              Already using the Valor Pay app or RCKT mobile POS? Bring your
              device and current setup details so we can discuss your next step.
            </p>
          )}
        </div>
      </section>
      <section className="container section">
        <p className="eyebrow">In the working day</p>
        <h2>A payment is part of a bigger workflow.</h2>
        <div className="grid three">
          {s.workflow.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">From choosing to using</p>
          <h2>Work through the setup together.</h2>
          {s.setupClaim && (
            <p data-claim="setup-training">TruePay’s POS setup covers configuration, installation and staff instruction for the payment system you select.</p>
          )}
          <ol className="grid three setup-steps">
            {s.setup.map(([title, body], i) => (
              <li className="card" key={title}>
                <span className="step-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="container section">
        {route.questions.slice(1).map((q, i) => (
          <QuestionSection key={q} question={q}>
            <p>{s.questions[i + 1]}</p>
            {s.path === "/solutions/point-of-sale/" && (
              <p className="contact-page-link">
                Looking for SkyTab Mobile or SkyTab Glass? Tell us which model
                you use so we can talk through your setup.
              </p>
            )}
            {s.path === "/solutions/terminals/" && i === 0 && (
              <p data-claim="free-terminal">{getClaim("free-terminal").copy}</p>
            )}
            {s.path === "/solutions/point-of-sale/" && i === 0 && (
              <p>
                <a href="/solutions/integrations/">
                  Check your current POS connection
                </a>
                .
              </p>
            )}
          </QuestionSection>
        ))}
        <RelatedLinks route={route} />
      </section>
      <section className="dark-band section">
        <div className="container">
          <p className="eyebrow">Help after setup</p>
          <h2>What if something breaks?</h2>
          <p>
            {supportDetails[s.path]} Call <a href={entity.phone.href}>{entity.phone.display}</a>. <a href="/support/">Get merchant support</a>.
          </p>
          {s.equipmentCoverage && (
            <>
              <p data-claim="truecare">TrueCare covers repair or replacement of eligible terminal equipment for as long as you are a customer.</p>
              <p>
                <a href="/why-truepay/#fine-print">
                  Read the equipment coverage scope
                </a>
                .
              </p>
            </>
          )}
        </div>
      </section>
      <CtaBand
        eyebrow="Talk through your setup"
        title={ctaTitles[s.path]}
        primary={route.primaryCta}
        secondary={route.secondaryCta ?? "none"}
      />
    </>
  );
}
