import { getClaim } from "@/lib/claims";
export function FitCheck({
  goodFit,
  notFit,
  recommendation = true,
}: {
  goodFit: string[];
  notFit: string[];
  recommendation?: boolean;
}) {
  return (
    <div className="grid two fit-grid">
      {[
        ["A good fit if…", goodFit],
        ["Probably not a fit if…", notFit],
      ].map(([title, items]) => (
        <article className="card" key={title as string}>
          <h3>{title}</h3>
          <ul>
            {(items as string[]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {recommendation && (
            <p
              className="fit-recommendation"
              data-claim="honest-recommendation"
            >
              {getClaim("honest-recommendation").copy}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
