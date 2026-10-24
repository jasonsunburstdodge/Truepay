import * as cheerio from "cheerio";
export function bodySentences(html: string, minimumWords = 9): string[] {
  const $ = cheerio.load(html);
  const main = $("main").clone();
  // These are the only copy exemptions: actual quotes and shared commitment scope.
  main.find("blockquote, #fine-print, [data-commitment-fine-print], script, style, noscript").remove();
  const sentences = new Set<string>();
  main.find("p, li, td, th, figcaption, caption, dd, dt").each((_, element) => {
    const node = $(element);
    // Avoid counting a nested paragraph twice inside its parent list item/card.
    if (node.find("p, li, td, th, figcaption, caption, dd, dt").length) return;
    const text = node.text().replace(/\s+/g, " ").trim();
    // AP month abbreviations within dates are not sentence endings.
    const segmentText = text.replace(/\b(Jan|Feb|Aug|Sept|Oct|Nov|Dec)\.(?=\s+\d)/g, "$1__AP_PERIOD__");
    for (const item of new Intl.Segmenter("en-US", { granularity: "sentence" }).segment(segmentText)) {
      const sentence = item.segment.replace(/__AP_PERIOD__/g, ".").trim();
      if (!/[.!?]$/.test(sentence)) continue;
      if (sentence.split(/\s+/).length < minimumWords) continue;
      sentences.add(sentence.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " "));
    }
  });
  return [...sentences];
}
export function duplicateSentences(pages: { path: string; sentences: string[] }[]) {
  const owners = new Map<string, Set<string>>();
  for (const page of pages) for (const sentence of page.sentences) {
    if (!owners.has(sentence)) owners.set(sentence, new Set());
    owners.get(sentence)!.add(page.path);
  }
  return [...owners].filter(([, paths]) => paths.size > 1).map(([sentence, paths]) => ({ sentence, paths: [...paths] }));
}
