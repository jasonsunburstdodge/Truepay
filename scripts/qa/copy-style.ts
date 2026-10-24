import * as cheerio from "cheerio";
/** Verbatim quotations are exempt; all other rendered main copy follows the AP dash rule. */
export function copyStyleViolations(html: string): string[] {
  const $ = cheerio.load(html);
  const main = $("main").clone();
  main.find("blockquote, script, style, noscript").remove();
  return [...new Set(main.text().match(/[\u2013\u2014]/g) ?? [])];
}
