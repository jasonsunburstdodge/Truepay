import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { routes, SITE_URL } from "../../src/content/routes.ts";
import { people, testimonials } from "../../src/content/entity.ts";
import { guides } from "../../src/content/guides/index.ts";
const dir = "docs/qa/phase-5";
mkdirSync(dir, { recursive: true });
const built = routes.filter(r => r.status !== "planned" && r.phase <= 5 && !r.path.includes("["));
const base = "http://127.0.0.1:4035", env = { ...process.env, SITE_ENV: "production" };
delete env.LEAD_WEBHOOK_URL;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "4035", "-H", "127.0.0.1"], { env, stdio: "ignore" });
let browser;
const errors = [], records = [], schemas = [], inbound = new Map();
try {
  let ready = false;
  for (let i=0;i<80;i++) { try { if ((await fetch(base)).ok) { ready=true; break; } } catch {} await new Promise(r=>setTimeout(r,250)); }
  assert.ok(ready);
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"] });
  const page = await browser.newPage();
  page.on("pageerror", e=>errors.push(e.message));
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:900});
    for (const route of built) {
      const response = await page.goto(base+route.path);
      assert.equal(response.status(),200,route.path);
      await page.evaluate(()=>document.fonts.ready);
      assert.equal(await page.title(),route.title);
      assert.equal(await page.locator("h1").innerText(),route.h1);
      assert.equal(await page.locator("h1 + [data-answer]").count(),1);
      assert.match(await page.locator('meta[name="robots"]').getAttribute("content"),/noindex/);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route.path+" overflow "+width);
      const answer=await page.locator("[data-answer]").innerText();
      const sentences=[...new Intl.Segmenter("en-US",{granularity:"sentence"}).segment(answer)].filter(s=>s.segment.trim());
      assert.equal(sentences.length,2,route.path+" hero sentences");
      const links=await page.locator("main a[href]").evaluateAll(a=>a.map(e=>e.getAttribute("href")));
      const paths=links.map(h=>h.split("#")[0]);
      for (const required of route.links.filter(p=>built.some(r=>r.path===p))) assert.ok(paths.includes(required),route.path+" missing "+required);
      if(width===1440) for(const href of new Set(paths)) inbound.set(href,(inbound.get(href)||0)+1);
      const sizes=await page.locator(".question > h2").evaluateAll(h=>h.map(e=>parseFloat(getComputedStyle(e).fontSize)));
      assert.ok(sizes.every(n=>n>=32&&n<=40),route.path+" heading scale");
      if(route.template==="guide") {
        const guide=guides.find(g=>route.path===`/resources/${g.slug}/`);
        assert.ok(answer.split(/\s+/).length>=40&&answer.split(/\s+/).length<=80,route.path+" answer length");
        assert.equal(await page.locator("[data-author] a").innerText(),people.find(p=>p.slug===guide.author).name);
        assert.match(await page.locator("[data-reviewed]").innerText(),/Review assigned to/);
        assert.equal(await page.locator(".author-box time").count(),2);
        for (const q of route.questions) assert.equal(await page.getByRole("heading",{level:2,name:q,exact:true}).count(),1);
        const commercial=paths.filter(h=>h.startsWith("/pricing/")||h.startsWith("/solutions/")||h==="/why-truepay/");
        const tools=paths.filter(h=>["/statement-review/","/effective-rate-calculator/"].includes(h));
        assert.equal(commercial.length,1,route.path+" commercial count");
        assert.equal(tools.length,1,route.path+" tool count");
        assert.deepEqual(await page.locator(".related-card").evaluateAll(a=>a.map(e=>e.getAttribute("href"))),guide.siblings);
        assert.equal(paths.filter(h=>h.startsWith("/resources/")&&h!=="/resources/").length,2,route.path+" siblings");
        assert.ok(await page.locator("[data-sources] a[href^='http']").count()>=2);
        const graph=await page.locator('script[type="application/ld+json"]').evaluateAll(s=>s.flatMap(e=>JSON.parse(e.textContent)["@graph"]));
        const article=graph.find(n=>n["@type"]==="Article"),author=graph.find(n=>n["@type"]==="Person"&&n.name===people.find(p=>p.slug===guide.author).name);
        assert.equal(article.author["@id"],author["@id"]);
        assert.equal(article.publisher["@id"],SITE_URL+"/#organization");
        assert.equal(article.datePublished,guide.datePublished);
        assert.equal(article.dateModified,guide.dateModified);
        assert.deepEqual(author.worksFor,{"@id":SITE_URL+"/#organization"});
        assert.ok(!graph.some(n=>["FAQPage","Review","AggregateRating"].includes(n["@type"])));
        if(width===1440) {
          const payload={"@context":"https://schema.org","@graph":graph};
          writeFileSync(`${dir}/${guide.slug}-rendered.jsonld`,JSON.stringify(payload,null,2)+"\n");
          writeFileSync(`${dir}/${guide.slug}-validator-input.html`,`<!doctype html><html><head><title>${route.title}</title><script type="application/ld+json">${JSON.stringify(payload)}</script></head><body><h1>${route.h1}</h1><p>Written by ${author.name}</p><time datetime="${guide.datePublished}">${guide.datePublished}</time></body></html>`);
          schemas.push({path:route.path,article,author,checks:"PASS: actual rendered graph, registered author, worksFor, publisher and dates"});
        }
      }
      if(route.path==="/customer-stories/") {
        assert.equal(await page.locator('.proof .note').count(),1);
        assert.match(await page.locator('.proof[data-claim="holt-quote"] .note').innerText(),/One customer’s experience. Individual results vary./);
        assert.equal(await page.locator('.proof a[href="/customer-stories/"]').count(),0);
        for (const q of testimonials) assert.equal(await page.locator('.proof').filter({hasText:q.name}).locator('blockquote p').innerText(),q.quote);
        assert.doesNotMatch(await page.locator('main').innerText(),/These accounts do not establish|No separate setup result/);
      }
      if(route.path==="/about/team/") assert.equal(await page.locator('.team-grid a[href^="tel:"]').count(),0);
      if(route.phase===5) {
        const slug=route.path==="/resources/"?"resources":route.path.split('/')[2];
        await page.screenshot({path:`${dir}/${slug}-${width}.jpg`,type:"jpeg",quality:82,fullPage:true});
      }
      records.push({path:route.path,width,status:response.status(),overflow:false});
    }
  }
  for(const r of built.filter(r=>r.path!=="/" && r.indexable)) assert.ok(inbound.get(r.path)>0,r.path+" orphan");
  for(const slug of ["how-to-read-your-processing-statement","flat-rate-vs-tiered-vs-interchange-plus","dual-pricing-vs-surcharging-vs-cash-discount"]) {
    const res=await fetch(base+`/resources/${slug}/`), html=await res.text();
    assert.ok(html.includes('data-author')&&html.includes('data-sources')&&html.includes('data-answer'));
  }
  assert.equal((await fetch(base+'/resources/not-a-real-guide/')).status,404);
  assert.equal((await fetch(base+'/customer-stories/unpublished-story/')).status,404);
  assert.equal(errors.length,0,errors.join('\n'));
  writeFileSync(`${dir}/article-schema-checks.json`,JSON.stringify(schemas,null,2)+'\n');
  writeFileSync(`${dir}/browser-results.json`,JSON.stringify({summary:`PASS: ${records.length} page/viewport checks, 14 screenshots, 6 Article graphs, link budgets, no orphans, SSR and review fixes`,records,errors},null,2)+'\n');
  console.log(`PASS: ${records.length} page/viewport checks; 14 screenshots; 6 Article graphs; no runtime errors`);
} finally { await browser?.close(); server.kill(); }
