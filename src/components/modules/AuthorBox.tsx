import { type Person } from "@/content/entity";
export function AuthorBox({
  author,
  reviewer,
  datePublished,
  dateModified,
}: {
  author: Person;
  reviewer?: Person;
  datePublished: string;
  dateModified: string;
}) {
  return (
    <aside className="author-box">
      <p data-author>
        Written by{" "}
        <a href={author.profilePath ?? `/about/${author.slug}/`}>
          {author.name}
        </a>
      </p>
      {reviewer && (
        <p data-reviewed>
          Reviewed by{" "}
          <a href={reviewer.profilePath ?? `/about/${reviewer.slug}/`}>
            {reviewer.name}
          </a>
        </p>
      )}
      <p>
        Published <time dateTime={datePublished}>{datePublished}</time> ·
        Updated <time dateTime={dateModified}>{dateModified}</time>
      </p>
    </aside>
  );
}
