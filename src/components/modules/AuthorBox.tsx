import { type Person } from "@/content/entity";
export function AuthorBox({
  author,
  reviewer,
  reviewPending = false,
  datePublished,
  dateModified,
}: {
  author: Person;
  reviewer?: Person;
  reviewPending?: boolean;
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
          {reviewPending ? "Review assigned to" : "Reviewed by"}{" "}
          <a href={reviewer.profilePath ?? `/about/${reviewer.slug}/`}>
            {reviewer.name}
          </a>
        </p>
      )}
      <p>
        Published <time dateTime={datePublished}>{datePublished.slice(0, 10)}</time> ·
        Updated <time dateTime={dateModified}>{dateModified.slice(0, 10)}</time>
      </p>
    </aside>
  );
}
