import Link from "next/link";
import { notFound } from "next/navigation";
import { people } from "@/content/entity";
import {
  getPublishedStory,
  publishedStories,
  storyRoute,
} from "@/content/stories";
import { buildRouteMetadata } from "@/lib/seo";
import { articleNode, webPageNode } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import {
  AnswerFirst,
  AuthorBox,
  Breadcrumbs,
  CtaBand,
  QuestionSection,
  Sources,
} from "@/components/modules";
export const dynamicParams = false;
export function generateStaticParams() {
  return publishedStories().map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const story = getPublishedStory((await params).slug);
  if (!story) notFound();
  return buildRouteMetadata(storyRoute(story));
}
export default async function Story({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const story = getPublishedStory((await params).slug);
  if (!story) notFound();
  const author = people.find((p) => p.slug === story.authorSlug);
  if (!author) notFound();
  const route = storyRoute(story);
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode(route),
          articleNode(route, author, {
            datePublished: story.datePublished,
            dateModified: story.dateModified,
          }),
        ]}
      />
      <section className="hero-gradient route-hero">
        <div className="container">
          <Breadcrumbs path="/customer-stories/" />
          <p className="eyebrow">
            {story.business} · {story.city}
          </p>
          <h1>{route.h1}</h1>
          <AnswerFirst>
            <p>{story.answer}</p>
          </AnswerFirst>
        </div>
      </section>
      <section className="container section">
        <AuthorBox
          author={author}
          datePublished={story.datePublished}
          dateModified={story.dateModified}
        />
        {[story.problem, story.change, story.outcome].map((answer, i) => (
          <QuestionSection
            question={route.questions[i]}
            key={route.questions[i]}
          >
            <p>{answer}</p>
          </QuestionSection>
        ))}
        <Sources sources={story.sources} />
        <Link href="/customer-stories/">Back to customer stories</Link>
      </section>
      <CtaBand
        eyebrow="Talk through your business"
        title="Start with your own statement."
      />
    </>
  );
}
