export default function NotFound() {
  return (
    <section className="section container">
      <p className="eyebrow">Page not found</p>
      <h1>Let’s get you back on track.</h1>
      <p>That address doesn’t lead to a page. You can start here:</p>
      <ul className="link-list">
        {[
          ["/", "TruePay home"],
          ["/pricing/", "Processing pricing"],
          ["/statement-review/", "Statement review"],
          ["/contact/", "Contact TruePay"],
        ].map(([href, label]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
