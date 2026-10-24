import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { routes, SITE_URL } from "../../src/content/routes.ts";
import { industryPages } from "../../src/content/industries/index.ts";
import { guides } from "../../src/content/guides/index.ts";
import { bodySentences, duplicateSentences } from "./duplicate-copy.ts";
import { copyStyleViolations } from "./copy-style.ts";
const dir='docs/qa/phase-6';mkdirSync(dir,{recursive:true});
const built=routes.filter(r=>r.phase<=6&&r.status!=="planned"&&!r.path.includes('['));
const env={...process.env,SITE_ENV:'production'};delete env.LEAD_WEBHOOK_URL;
const base='http://127.0.0.1:4036';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','4036','-H','127.0.0.1'],{env,stdio:'ignore'});
let browser;const records=[],errors=[],copy=[],inbound=new Map(),industryEvidence=[],guideEvidence=[];
try{
 let ready=false;for(let i=0;i<80;i++){try{if((await fetch(base)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,250));}assert.ok(ready);
 browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,1440]){await page.setViewportSize({width,height:900});for(const route of built){
  const res=await page.goto(base+route.path);assert.equal(res.status(),200,route.path);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.title(),route.title);assert.equal(await page.locator('h1').innerText(),route.h1);assert.equal(await page.locator('h1').count(),1);
  assert.match(await page.locator('meta[name="robots"]').getAttribute('content'),/noindex/);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),SITE_URL+route.path);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route.path+' overflow '+width);
  const hero=route.template==='guide'?'.guide-hero-summary':route.phase===6?'.industry-hero-summary':'[data-answer]';
  const summary=await page.locator(hero).innerText();assert.equal([...new Intl.Segmenter('en-US',{granularity:'sentence'}).segment(summary)].filter(s=>s.segment.trim()).length,2,route.path+' hero sentences');
  if(route.template==='guide'||route.phase===6)assert.ok(summary.split(/\s+/).length<=28,route.path+' short hero');
  const hrefs=await page.locator('main a[href]').evaluateAll(a=>a.map(e=>e.getAttribute('href').split('#')[0]));
  for(const link of route.links.filter(p=>built.some(r=>r.path===p)))assert.ok(hrefs.includes(link),route.path+' missing '+link);
  if(width===1440)for(const href of new Set(hrefs))inbound.set(href,(inbound.get(href)||0)+1);
  const html=await page.content();assert.deepEqual(copyStyleViolations(html),[],route.path+' AP');
  if(width===1440)copy.push({path:route.path,sentences:bodySentences(html)});
  if(route.template==='industry'){
   const c=industryPages.find(c=>route.path===`/industries/${c.slug}/`);assert.ok(c);
   assert.equal(await page.getByRole('heading',{level:2,name:c.workflowTitle,exact:true}).count(),1);
   for(const q of route.questions)assert.equal(await page.getByRole('heading',{level:2,name:q,exact:true}).count(),1);
   assert.ok(c.setups.length>=2&&c.setups.length<=3);for(const s of c.setups)assert.ok(hrefs.includes(s.path));
   assert.equal(await page.locator('blockquote').count(),0,'No industry identity is known for the published reviews');
   const answer=await page.locator('[data-answer]').innerText();assert.ok(answer.split(/\s+/).length>=40&&answer.split(/\s+/).length<=80);
   const graph=await page.locator('script[type="application/ld+json"]').evaluateAll(s=>s.flatMap(n=>JSON.parse(n.textContent)['@graph']));
   assert.equal(graph.find(n=>n['@type']==='Service').provider['@id'],SITE_URL+'/#organization');
   assert.ok(!graph.some(n=>['Review','AggregateRating','FAQPage'].includes(n['@type'])));
   const scales=await page.locator('.question > h2').evaluateAll(h=>h.map(e=>parseFloat(getComputedStyle(e).fontSize)));assert.ok(scales.every(n=>n>=32&&n<=40));
   if(width===1440)industryEvidence.push({path:route.path,questions:route.questions,workflow:c.workflowTitle,setups:c.setups.map(s=>s.path),sentences:bodySentences(html,1),schema:'WebPage + Service + BreadcrumbList',status:'draft',quoteCount:0});
  }
  if(route.template==='guide'){
   const g=guides.find(g=>route.path===`/resources/${g.slug}/`);assert.equal(await page.locator('[data-reviewed]').count(),g.reviewedAt?1:0);
   assert.doesNotMatch(await page.locator('.guide-byline').innerText(),/Review assigned|Draft guide/);
   for(const date of await page.locator('.author-box time').evaluateAll(t=>t.map(e=>({datetime:e.getAttribute('datetime'),text:e.textContent})))){assert.match(date.datetime,/^\d{4}-\d{2}-\d{2}$/);assert.equal(date.text,'Oct. 24, 2026');}
   if(width===1440)guideEvidence.push({path:route.path,hero:summary,authorBox:await page.locator('.guide-byline').innerText(),reviewedAt:g.reviewedAt??null});
  }
  if(route.phase===6){const slug=route.template==='industry'?route.path.split('/')[2]:'industries';await page.screenshot({path:`${dir}/${slug}-${width}.jpg`,type:'jpeg',quality:70,fullPage:true});}
  if(route.path==='/resources/how-to-read-your-processing-statement/')await page.screenshot({path:`${dir}/guide-authorship-${width}.jpg`,type:'jpeg',quality:70,fullPage:true});
  records.push({path:route.path,width,status:200,overflow:false});
 }}
 assert.deepEqual(duplicateSentences(copy),[]);
 const pairs=[];for(let i=0;i<industryEvidence.length;i++)for(let j=i+1;j<industryEvidence.length;j++){const a=industryEvidence[i],b=industryEvidence[j],shared=a.sentences.filter(s=>b.sentences.includes(s));assert.ok(shared.length<=1);pairs.push({a:a.path,b:b.path,shared});}
 for(const r of built.filter(r=>r.indexable&&r.path!='/'))assert.ok(inbound.get(r.path)>0,r.path+' orphan');
 assert.equal((await fetch(base+'/industries/unknown-industry/')).status,404);assert.equal((await fetch(base+'/customer-stories/unpublished-story/')).status,404);
 assert.equal(errors.length,0,errors.join('\n'));
 writeFileSync(`${dir}/originality-results.json`,JSON.stringify({sitewideDuplicateSentences:duplicateSentences(copy),threshold:'more than 8 words',exclusions:['verbatim blockquotes','shared commitment fine print'],industryPairs:pairs},null,2)+'\n');
 writeFileSync(`${dir}/guide-review-fixes.json`,JSON.stringify(guideEvidence,null,2)+'\n');
 writeFileSync(`${dir}/industry-checks.json`,JSON.stringify(industryEvidence.map(record=>Object.fromEntries(Object.entries(record).filter(([key])=>key!=="sentences"))),null,2)+'\n');
 writeFileSync(`${dir}/browser-results.json`,JSON.stringify({summary:`PASS: ${records.length} page/viewport checks, 18 new-page screenshots + 2 guide screenshots, all required links, AP copy, truthful review/date display and originality gates`,records,errors},null,2)+'\n');
 console.log(`PASS: ${records.length} page/viewport checks; 20 screenshots; 0 duplicate long sentences; ${pairs.length} industry pairs checked; 0 runtime errors`);
}finally{await browser?.close();server.kill();}
