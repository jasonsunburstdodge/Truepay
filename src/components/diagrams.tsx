/**
 * Original explanatory diagrams, built in HTML so they reflow on phones and
 * read correctly to screen readers and crawlers. All figures are labeled examples.
 */

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

function FlowRow({
  title,
  sub,
  steps,
}: {
  title: string;
  sub: string;
  steps: { who: string; what: string }[];
}) {
  return (
    <div>
      <p className="font-semibold text-ink">
        {title} <span className="font-normal text-text-muted">· {sub}</span>
      </p>
      <ol className="mt-3 grid gap-2 sm:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.who}
            className="relative rounded-md border border-border bg-surface p-3"
          >
            <span className="num text-xs font-semibold text-gold-deep">
              Step {i + 1}
            </span>
            <p className="mt-0.5 font-semibold text-ink">{s.who}</p>
            <p className="text-sm leading-snug text-text">{s.what}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PaymentFlow() {
  const auth = [
    { who: "Your customer", what: "Taps, dips or enters a card." },
    {
      who: "Your terminal or checkout",
      what: "Sends the payment to your processor.",
    },
    {
      who: "Your processor",
      what: "Routes it to the card network (Visa, Mastercard, Discover or Amex).",
    },
    {
      who: "The customer's bank",
      what: "Checks funds and fraud signals, then approves or declines.",
    },
  ];
  const settle = [
    {
      who: "Card-issuing bank",
      what: "Keeps interchange, the largest part of the cost.",
    },
    { who: "Card network", what: "Keeps assessment and network fees." },
    { who: "Your processor", what: "Keeps its markup and any account fees." },
    { who: "Your bank account", what: "Receives the rest as a deposit." },
  ];
  return (
    <div className="grid gap-6">
      <FlowRow
        title="Authorization"
        sub="a few seconds at checkout"
        steps={auth}
      />
      <FlowRow
        title="Settlement"
        sub="usually one to two business days later"
        steps={settle}
      />
    </div>
  );
}

/** Example statement used in the "how to read your statement" guide. */
export const exampleStatement = (() => {
  const sales = 25000;
  const transactions = 500;
  const lines = [
    {
      key: "A",
      label: "Interchange (paid to card-issuing banks)",
      amount: 462.5,
      note: "Set by the card networks. Varies by card type and how the card is taken.",
    },
    {
      key: "B",
      label: "Assessments and network fees",
      amount: 35.0,
      note: "Set by Visa, Mastercard, Discover and Amex.",
    },
    {
      key: "C",
      label: "Processor markup: 0.30% + $0.10 per transaction",
      amount: sales * 0.003 + transactions * 0.1,
      note: "The part your processor controls. Compare this line when you shop.",
    },
    {
      key: "D",
      label: "Monthly account fees: statement, PCI, batch",
      amount: 10 + 19.95 + 30 * 0.25,
      note: "Small fixed charges that add up. Ask what each one is for.",
    },
  ];
  const total = lines.reduce((t, l) => t + l.amount, 0);
  return { sales, transactions, lines, total, rate: (total / sales) * 100 };
})();

function Statement() {
  const s = exampleStatement;
  return (
    <div className="table-wrap">
      <table className="table-tp">
        <caption>
          Example monthly statement summary (fictional numbers): {usd(s.sales)}{" "}
          in card sales across {s.transactions} transactions
        </caption>
        <thead>
          <tr>
            <th scope="col">Line</th>
            <th scope="col">What it is</th>
            <th scope="col" className="text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {s.lines.map((l) => (
            <tr key={l.key}>
              <th scope="row">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs text-white">
                  {l.key}
                </span>
              </th>
              <td>
                <span className="font-medium text-ink">{l.label}</span>
                <span className="block text-sm text-text-muted">{l.note}</span>
              </td>
              <td className="num text-right">{usd(l.amount)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" />
            <td className="font-semibold text-ink">
              Total fees · effective rate
            </td>
            <td className="num text-right font-semibold text-ink">
              {usd(s.total)} · {s.rate.toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** Example dual-pricing checkout, computed so the arithmetic always checks out. */
export const exampleDualPricing = (() => {
  const cashPrice = 100;
  const differencePct = 4;
  const cardPrice = cashPrice * (1 + differencePct / 100);
  return { cashPrice, differencePct, cardPrice };
})();

function DualPricingCheckout() {
  const d = exampleDualPricing;
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-md border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          On the shelf or menu
        </p>
        <p className="mt-2 text-ink">
          Cash price{" "}
          <span className="num font-semibold">{usd(d.cashPrice)}</span>
        </p>
        <p className="text-ink">
          Card price{" "}
          <span className="num font-semibold">{usd(d.cardPrice)}</span>
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Both prices are posted where customers can see them before they pay.
        </p>
      </div>
      <div className="rounded-md border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          At the terminal
        </p>
        <p className="mt-2 text-ink">
          The terminal shows both totals. The customer picks how to pay.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Cash or check: {usd(d.cashPrice)}. Credit card: {usd(d.cardPrice)}.
        </p>
      </div>
      <div className="rounded-md border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          On the receipt
        </p>
        <p className="mt-2 text-ink">
          The receipt shows the price paid and that a cash price was available.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Example uses a {d.differencePct}% difference between the two prices.
        </p>
      </div>
    </div>
  );
}

export function Diagram({
  kind,
}: {
  kind: "payment-flow" | "statement" | "dual-pricing-checkout";
}) {
  if (kind === "payment-flow") return <PaymentFlow />;
  if (kind === "statement") return <Statement />;
  return <DualPricingCheckout />;
}
