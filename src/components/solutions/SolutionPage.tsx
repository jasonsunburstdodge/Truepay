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
const sectionLabels: Record<string, string[]> = {"/solutions/point-of-sale/": ["Orders, inventory and the counter", "When a full POS earns its space", "When a terminal is enough", "Clover, SkyTab and other systems", "Compare POS features around your service.", "From order entry to batch close", "Keep the sale connected to the shift.", "Menu, hardware and staff practice", "Prepare the POS before opening day.", "POS troubleshooting", "When order entry or payment stops.", "Bring the menu and counter plan"], "/solutions/terminals/": ["The device beside your register", "For a focused card-payment task", "When payments need more than a terminal", "VL100, VL110, VL500 and alternatives", "Compare the terminal at your counter.", "Amount, approval and receipt", "Follow one transaction through the device.", "Connection and device settings", "Get the terminal ready for its first sale.", "Terminal power and connection", "Start with the model and error screen.", "Bring the terminal model"], "/solutions/mobile-payments/": ["Payments away from the counter", "When checkout needs to move", "When the location has no connection", "Portable devices and phone apps", "Compare what travels with you.", "From the job to the receipt", "Keep the payment record with the work.", "Signal, receipt and device checks", "Test the mobile setup where you collect.", "Mobile payment status", "Before retrying a payment on the road.", "Bring your collection locations"], "/solutions/online-payments/": ["The payment step on your website", "For a website that collects payments", "When the platform fixes your choices", "Gateways and the checkout connection", "Compare the gateway behind the pay button.", "From checkout to order record", "Connect the website order to its payment.", "Website, gateway and test order", "Run a checkout before replacing the live link.", "Website checkout support", "Find the gateway behind the error.", "Bring your ecommerce platform"], "/solutions/integrations/": ["Keep the system your staff knows", "When an existing system matters", "When its payment connection is fixed", "Software and payment connections", "Compare the handoff between your systems.", "From payment to software record", "Follow the amount into your existing records.", "Version, provider and mapping", "Test the connection in the software you use.", "Integration troubleshooting", "Locate the handoff that stopped.", "Bring the software version"], "/solutions/billing-software/": ["Invoices and the payment record", "For a QuickBooks invoice workflow", "When the invoice lives elsewhere", "Biller Genie and MantaPay", "Compare how an invoice reaches collection.", "From open balance to paid invoice", "Bring the receipt back to the books.", "Accounting edition and invoice tests", "Prepare billing before sending payment links.", "Invoice and posting support", "Locate the invoice that has not reconciled.", "Bring a sample invoice"]};
export function SolutionPage({ solution: s }: { solution: Solution }) {
  const route = getRoute(s.path)!;
  const labels = sectionLabels[s.path];
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
        <p className="eyebrow">{labels[0]}</p>
        <div className="grid two">
          <article className="card">
            <h2 className="section-heading">{labels[1]}</h2>
            <p>{s.fit}</p>
          </article>
          <article className="card">
            <h2 className="section-heading">{labels[2]}</h2>
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
          <p className="eyebrow">{labels[3]}</p>
          <h2>{labels[4]}</h2>
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
        <p className="eyebrow">{labels[5]}</p>
        <h2>{labels[6]}</h2>
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
          <p className="eyebrow">{labels[7]}</p>
          <h2>{labels[8]}</h2>
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
          <p className="eyebrow">{labels[9]}</p>
          <h2>{labels[10]}</h2>
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
        eyebrow={labels[11]}
        title={ctaTitles[s.path]}
        primary={route.primaryCta}
        secondary={route.secondaryCta ?? "none"}
      />
    </>
  );
}
