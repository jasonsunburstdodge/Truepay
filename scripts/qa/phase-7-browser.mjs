import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { routes, SITE_URL } from "../../src/content/routes.ts";
import { bodySentences, duplicateSentences, headingTexts } from "./duplicate-copy.ts";
import { copyStyleViolations } from "./copy-style.ts";
const dir = "docs/qa/phase-7"; mkdirSync(dir,{recursive:true});
const built = routes.filter(r=>r.phase<=7&&r.status!=="planned"&&!r.path.includes("["));
const env={...process.env,SITE_ENV:"production"}; delete env.LEAD_WEBHOOK_URL;
const base="http://127.0.0.1:4037";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","4037","-H","127.0.0.1"],{env,stdio:"ignore"});
const records=[], errors=[], copies=[], headings=[], industry=[], forms=[], estimator=[];
let browser;
const money = n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
try {
 let ready=false; for(let i=0;i<80;i++){try{if((await fetch(base)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,250));} assert.ok(ready,'Next server');
 browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of built){
   const response=await page.goto(base+route.path);assert.equal(response.status(),200,route.path);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.title(),route.title);assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('h1').innerText(),route.h1);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),SITE_URL+route.path);
   assert.match(await page.locator('meta[name="robots"]').getAttribute('content'),/noindex/);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route.path+' overflow at '+width);
   const html=await page.content();assert.deepEqual(copyStyleViolations(html),[],route.path+' AP');
   const hrefs=await page.locator('main a[href]').evaluateAll(links=>links.map(a=>a.getAttribute('href').split('#')[0]));
   for(const link of route.links.filter(p=>built.some(r=>r.path===p)))assert.ok(hrefs.includes(link),route.path+' missing '+link);
   for(const q of route.questions)assert.equal(await page.getByRole('heading',{level:2,name:q,exact:true}).count(),1,route.path+' question '+q);
   if(width===1440){copies.push({path:route.path,sentences:bodySentences(html)});headings.push({path:route.path,sentences:headingTexts(html)});if(route.template==='industry')industry.push({path:route.path,sentences:bodySentences(html,1)});}
   if(route.phase===7){
    const hero=await page.locator('[data-answer] > p').first().innerText();assert.equal([...new Intl.Segmenter('en-US',{granularity:'sentence'}).segment(hero)].length,2,route.path+' hero');assert.ok(hero.split(/\s+/).length<=28,route.path+' short hero');
    const graph=await page.locator('script[type="application/ld+json"]').evaluateAll(s=>s.flatMap(n=>JSON.parse(n.textContent)['@graph']));
    assert.ok(graph.some(n=>n['@type']==='WebPage'));assert.ok(!graph.some(n=>['JobPosting','FAQPage','Review','AggregateRating'].includes(n['@type'])));
    if(route.template==='legal')assert.equal(await page.locator('[data-legal-review="required"]').count(),1);
    const slug=route.path.split('/')[1];await page.screenshot({path:`${dir}/${slug}-${width}.jpg`,type:'jpeg',quality:70,fullPage:true});
   }
   if(route.path==='/solutions/point-of-sale/')await page.screenshot({path:`${dir}/solution-review-fixes-${width}.jpg`,type:'jpeg',quality:70,fullPage:true});
   records.push({path:route.path,width,status:response.status(),overflow:false});
  }
  console.log(`PASS: ${width}px checks for ${built.length} pages`);
  await page.goto(base+'/partners/');
  assert.equal(await page.locator('[data-single-rep]').innerText(),'$125.00');assert.equal(await page.locator('[data-single-referral]').innerText(),'$50.00');
  assert.ok(await page.locator('.single-account').evaluate(el=>el.getBoundingClientRect().top < document.querySelector('.partner-projection').getBoundingClientRect().top));
  const defaultActive=(1-.98**12)/.02, defaultTotal=125*Array.from({length:12},(_,i)=>(1-.98**(i+1))/.02).reduce((a,b)=>a+b,0);
  assert.equal(await page.locator('[data-month12]').innerText(),money(defaultActive*125));assert.equal(await page.locator('[data-year-total]').innerText(),money(defaultTotal));
  await page.locator('#partner-volume').fill('100000');await page.locator('#partner-margin').fill('1.75');
  assert.equal(await page.locator('[data-single-rep]').innerText(),'$875.00');assert.equal(await page.locator('[data-single-referral]').innerText(),'$350.00');
  await page.locator('#partner-path').selectOption('referral-partner');await page.locator('#partner-accounts').fill('2');await page.locator('#partner-attrition').fill('0');
  assert.equal(await page.locator('[data-month12]').innerText(),'$8,400.00');assert.equal(await page.locator('[data-year-total]').innerText(),'$54,600.00');
  await page.locator('#partner-attrition').fill('100');assert.equal(await page.locator('[data-month12]').innerText(),'$700.00');assert.equal(await page.locator('[data-year-total]').innerText(),'$8,400.00');
  await page.locator('#partner-accounts').fill('0');assert.equal(await page.locator('[data-year-total]').innerText(),'$0.00');
  await page.locator('#partner-accounts').fill('1.5');assert.equal(await page.locator('.projection-results [role="alert"]').count(),1);
  await page.locator('#partner-volume').fill('');assert.equal(await page.locator('[data-single-rep]').innerText(),'Enter valid inputs');
  estimator.push({width,defaultRep:125,defaultReferral:50,editedVolume:100000,editedMargin:1.75,editedReferral:350,noAttritionYear:54600,fullAttritionYear:8400,zeroAccounts:0,invalidInputs:'no result'});
  for(const type of ['partner','careers']){
   const path=type==='partner'?'/partners/':'/careers/';await page.goto(base+path);
   await page.locator(`#${type}-name`).fill('QA Test');await page.locator(`#${type}-email`).fill('qa@example.com');
   assert.equal(await page.locator(`#${type}-business`).getAttribute('required'),null,'Background is optional');
   if(type==='partner')await page.locator('#partner-role').selectOption('referral-partner');
   await page.locator('input[name="consent"]').check();
   const requestPromise=page.waitForRequest(r=>r.url().endsWith('/api/lead/')&&r.method()==='POST');const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/lead/'));
   await page.locator('form button[type="submit"]').click();const request=await requestPromise,response=await responsePromise;
   const payload=request.postDataJSON();assert.equal(payload.formType,type);assert.equal(payload.consent,true);if(type==='partner')assert.equal(payload.partnerPath,'referral-partner');
   assert.equal(response.status(),503);await page.locator('.form-error').waitFor();assert.ok((await page.locator('.form-error').innerText()).includes('888-792-0284'));
   assert.equal(new URL(page.url()).pathname,path);assert.equal((await page.context().cookies()).some(c=>c.name==='truepay-request-received'),false);
   forms.push({width,type,formType:payload.formType,status:503,phoneFallback:true,successCookie:false,redirected:false});
  }
 }
 assert.deepEqual(duplicateSentences(copies),[]);assert.deepEqual(duplicateSentences(headings),[]);
 const pairs=[];for(let i=0;i<industry.length;i++)for(let j=i+1;j<industry.length;j++){const shared=industry[i].sentences.filter(s=>industry[j].sentences.includes(s));assert.ok(shared.length<=1);pairs.push({a:industry[i].path,b:industry[j].path,shared});}
 const noJs=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJs.newPage();await staticPage.goto(base+'/partners/');assert.equal(await staticPage.locator('[data-single-rep]').innerText(),'$125.00');assert.equal(await staticPage.locator('[data-single-referral]').innerText(),'$50.00');await noJs.close();
 assert.equal((await fetch(base+'/industries/unknown-industry/')).status,404);assert.equal((await fetch(base+'/customer-stories/unpublished-story/')).status,404);
 for(const [old,target]of [['/referral/','/partners/'],['/affiliate-program/','/partners/'],['/employment-opportunity/','/careers/']]){const r=await fetch(base+old,{redirect:'manual'});assert.ok([301,308].includes(r.status));assert.equal(new URL(r.headers.get('location'),base).pathname,target);}
 assert.equal(errors.length,0,errors.join('\n'));
 writeFileSync(`${dir}/browser-results.json`,JSON.stringify({summary:`PASS: ${records.length} page/viewport checks, 8 new-page + 2 review-fix screenshots, all manifest questions/links, 0 runtime errors`,records,errors},null,2)+'\n');
 writeFileSync(`${dir}/originality-results.json`,JSON.stringify({sitewideBodyDuplicates:duplicateSentences(copies),sitewideHeadingDuplicates:duplicateSentences(headings),headingScope:'all main H2s and editorial eyebrows, any length',bodyScope:'sentences over eight words',industryPairs:pairs,exclusions:['verbatim blockquotes','shared commitment fine print']},null,2)+'\n');
 writeFileSync(`${dir}/estimator-browser-results.json`,JSON.stringify({singleAccountServerRendered:true,scenarios:estimator},null,2)+'\n');
 writeFileSync(`${dir}/form-browser-results.json`,JSON.stringify(forms,null,2)+'\n');
 console.log(`PASS: ${records.length} page/viewport checks; 10 screenshots; estimator edits and honest form fallback at both widths; 0 duplicate H2s/eyebrows; 0 duplicate long body sentences; ${pairs.length} industry pairs; 0 runtime errors`);
} finally {await browser?.close();server.kill();}
