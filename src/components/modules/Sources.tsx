import { readableDate } from "./AuthorBox";
export type Source = {
  title: string;
  url: string;
  publisher?: string;
  accessed?: string;
};
export function Sources({ sources, title }: { sources: Source[]; title: string }) {
  return (
    <section data-sources>
      <h2>{title}</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url}>{source.title}</a>
            {source.publisher && <span> · {source.publisher}</span>}
            {source.accessed && (
              <span>
                {" "}
                · Accessed{" "}
                <time dateTime={source.accessed.slice(0, 10)}>{readableDate(source.accessed)}</time>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
