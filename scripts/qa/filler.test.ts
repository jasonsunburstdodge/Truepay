import test from "node:test";
import assert from "node:assert/strict";
import { bannedPatterns } from "../../src/content/claims";
test("every client-banned interchangeable phrase is covered by the QA register", () => {
  const phrases = ["seamless", "elevate", "unlock", "empower", "game-changer", "cutting-edge", "state-of-the-art", "robust", "leverage", "streamline", "tailored", "peace of mind", "hassle-free", "one-stop", "best-in-class", "world-class", "take your business to the next level", "in today's fast-paced world", "look no further", "we've got you covered", "whether you're a retailer or a contractor", "navigate", "journey"];
  for (const phrase of phrases) assert.ok(bannedPatterns.some(({pattern}) => new RegExp(pattern, "i").test(phrase)), phrase);
});
