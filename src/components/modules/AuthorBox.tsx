import { type Person } from "@/content/entity";
const calendarDate = (value: string) => value.slice(0, 10);
export function readableDate(value: string) {
  const [year, month, day] = calendarDate(value).split("-");
  const months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
}
export function AuthorBox({ author, reviewer, reviewedAt, datePublished, dateModified }: {
  author: Person;
  reviewer?: Person;
  reviewedAt?: string;
  datePublished: string;
  dateModified: string;
}) {
  return <aside className="author-box">
    <p data-author>Written by <a href={author.profilePath ?? `/about/${author.slug}/`}>{author.name}</a></p>
    {reviewer && reviewedAt && <p data-reviewed>Reviewed by <a href={reviewer.profilePath ?? `/about/${reviewer.slug}/`}>{reviewer.name}</a> · <time dateTime={calendarDate(reviewedAt)}>{readableDate(reviewedAt)}</time></p>}
    <p>Published <time dateTime={calendarDate(datePublished)}>{readableDate(datePublished)}</time> · Updated <time dateTime={calendarDate(dateModified)}>{readableDate(dateModified)}</time></p>
  </aside>;
}
