import Image from "next/image";
import { entity, type Person } from "@/content/entity";
import { isBuilt } from "@/lib/navigation";
export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="card person">
      {person.image && (
        <Image src={person.image} alt={person.name} width={240} height={240} />
      )}
      {!person.image && <div className="person-rule" aria-hidden="true" />}
      <p className="eyebrow">{person.jobTitle}</p>
      <h3>{person.name}</h3>
      <p
        {...(person.slug === "jon-wilson"
          ? { "data-claim": "founded-2011" }
          : {})}
      >
        {person.bio}
      </p>
      {person.expertise.length > 0 && (
        <ul
          className="person-topics"
          aria-label={`What ${person.name} helps with`}
        >
          {person.expertise.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}
      <a href={entity.phone.href}>Reach the team: {entity.phone.display}</a>
      {person.profilePath && isBuilt(person.profilePath) && (
        <a href={person.profilePath}>Meet {person.name}</a>
      )}
    </article>
  );
}
