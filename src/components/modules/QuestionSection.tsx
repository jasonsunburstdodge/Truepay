import type { ReactNode } from "react";
export function QuestionSection({
  question,
  children,
  level = 2,
}: {
  question: string;
  children: ReactNode;
  level?: 2 | 3;
}) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <section className="question">
      <Heading>{question}</Heading>
      <div>{children}</div>
    </section>
  );
}
