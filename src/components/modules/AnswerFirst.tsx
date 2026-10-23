import type { ReactNode } from "react";
export function AnswerFirst({ children }: { children: ReactNode }) {
  return (
    <div data-answer className="answer-first">
      {children}
    </div>
  );
}
