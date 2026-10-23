export type Source = {
  title: string;
  url: string;
  publisher?: string;
  accessed?: string;
};
export function Sources({ sources }: { sources: Source[] }) {
  return (
    <section data-sources>
      <h2>Sources</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url}>{source.title}</a>
            {source.publisher && <span> · {source.publisher}</span>}
            {source.accessed && (
              <span>
                {" "}
                · Accessed{" "}
                <time dateTime={source.accessed}>{source.accessed}</time>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
