"use client";
import { useState } from "react";
import { partnerProgram } from "@/content/partner-program";
import { estimatePartnerResiduals } from "@/lib/partner-estimator";
const money = (n: number) => new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const number = (s: string) => s.trim() === "" ? NaN : Number(s);
export function ResidualEstimator() {
  const [volume,setVolume] = useState(String(partnerProgram.defaultVolume));
  const [margin,setMargin] = useState(String(partnerProgram.defaultMarginPercent));
  const [accounts,setAccounts] = useState("1");
  const [attrition,setAttrition] = useState(String(partnerProgram.defaultAttritionPercent));
  const [path,setPath] = useState("sales-rep");
  const share = path === "sales-rep" ? partnerProgram.salesRepPercent : partnerProgram.referralPercent;
  const inputs = {monthlyVolume:number(volume),marginPercent:number(margin),accountsPerMonth:number(accounts),attritionPercent:number(attrition),sharePercent:share};
  const result = estimatePartnerResiduals(inputs);
  const single = estimatePartnerResiduals({...inputs,accountsPerMonth:1,attritionPercent:0});
  return <div className="partner-estimator" data-claim="partner-estimator">
    <section className="card single-account" aria-labelledby="single-account-title">
      <p className="eyebrow">Begin with one merchant</p><h2 id="single-account-title">What could one account contribute each month?</h2>
      <p>Use a merchant’s monthly card volume and an assumed TruePay profit margin. Your share applies to that estimated profit, not to the merchant’s sales.</p>
      <div className="grid two estimator-inputs">
        <label htmlFor="partner-volume">Monthly card volume per account ($)<input id="partner-volume" type="number" min="0" max="1000000000" step="1000" value={volume} onChange={e=>setVolume(e.target.value)} /></label>
        <label htmlFor="partner-margin">Estimated TruePay profit margin (%)<input id="partner-margin" type="number" min="0" max="100" step="0.01" value={margin} onChange={e=>setMargin(e.target.value)} /></label>
      </div>
      <p className="note">The editable 1% default is the low end of the draft’s 1%-1.75% margin assumption. It is not a quoted merchant rate or a confirmed account profit.</p>
      <div className="grid two single-results" aria-live="polite" aria-atomic="true">
        <div className="result"><p className="result-label">Sales rep · {partnerProgram.salesRepPercent}% share</p><p className="big-number" data-single-rep>{single ? money(single.singleAccountMonthly * partnerProgram.salesRepPercent / share) : "Enter valid inputs"}</p><p>One account · one full month</p></div>
        <div className="result result-light"><p className="result-label">Referral partner · {partnerProgram.referralPercent}% share</p><p className="big-number" data-single-referral>{single ? money(single.singleAccountMonthly * partnerProgram.referralPercent / share) : "Check the amounts above"}</p><p>Same volume and profit assumption</p></div>
      </div>
      <p className="note" data-single-formula>{single ? `${money(inputs.monthlyVolume)} volume × ${inputs.marginPercent}% estimated profit margin × your path’s share.` : "Enter a volume from $0 to $1 billion and a margin from 0% to 100%."} The example assumes the account processes for the full month.</p>
      <p className="estimate-disclaimer">Illustration only, not an earnings promise. Actual applicable profit, payment eligibility and residual rights follow your written partner agreement.</p>
    </section>
    <section className="band partner-projection" aria-labelledby="projection-title">
      <p className="eyebrow">Add accounts and account loss</p><h2 id="projection-title">Estimate residuals across 12 months.</h2>
      <div className="projection-grid">
        <div className="card estimator-inputs">
          <label htmlFor="partner-path">Partner path<select id="partner-path" value={path} onChange={e=>setPath(e.target.value)}><option value="sales-rep">Sales rep · {partnerProgram.salesRepPercent}%</option><option value="referral-partner">Referral partner · {partnerProgram.referralPercent}%</option></select></label>
          <label htmlFor="partner-accounts">New processing accounts per month<input id="partner-accounts" type="number" min="0" max="100" step="1" value={accounts} onChange={e=>setAccounts(e.target.value)} /></label>
          <label htmlFor="partner-attrition">Monthly account attrition (%)<input id="partner-attrition" type="number" min="0" max="100" step="0.1" value={attrition} onChange={e=>setAttrition(e.target.value)} /></label>
          <p className="note">Attrition means the assumed share of prior accounts that stop processing each month. The editable 2% default is a modeling assumption, not a TruePay retention statistic.</p>
        </div>
        <div className="card projection-results" aria-live="polite" aria-atomic="true">
          {result ? <>
            <dl><div><dt>Estimated month 12 residual</dt><dd data-month12>{money(result.lastMonth.residual)}</dd></div><div><dt>Estimated total paid over months 1-12</dt><dd data-year-total>{money(result.total)}</dd></div><div><dt>Expected active accounts in month 12</dt><dd data-active>{result.lastMonth.activeAccounts.toFixed(2)}</dd></div></dl>
            <p className="projection-assumptions">Assumptions: {money(inputs.monthlyVolume)} per account each month; {inputs.marginPercent}% estimated TruePay profit margin; {share}% partner share; {inputs.accountsPerMonth} new {inputs.accountsPerMonth === 1 ? "account" : "accounts"} monthly; {inputs.attritionPercent}% monthly attrition.</p>
            <p className="note">Each new account contributes a full month immediately. Attrition reduces prior accounts before new ones are added; fractional accounts are expected values. Volume and margin stay constant. These figures do not subtract your expenses or taxes.</p>
          </> : <p role="alert">Use whole numbers from 0 to 100 for new accounts and 0%-100% attrition. Complete the volume and margin above to calculate this scenario.</p>}
          <p className="estimate-disclaimer">A model cannot predict which owners will sign or keep processing. Real residuals can be lower or absent; review the definition of applicable profit and payment conditions with TruePay. <a href="/terms/#calculator-illustrations">Read the website illustration terms</a>.</p>
        </div>
      </div>
      <details><summary>See the monthly calculation</summary>{result && <div className="table-scroll"><table><caption>Illustrative account survival and residuals using the assumptions above.</caption><thead><tr><th scope="col">Month</th><th scope="col">Expected active accounts</th><th scope="col">Monthly residual</th><th scope="col">Cumulative residual</th></tr></thead><tbody>{result.months.map(m=><tr key={m.month}><th scope="row">{m.month}</th><td>{m.activeAccounts.toFixed(2)}</td><td>{money(m.residual)}</td><td>{money(m.cumulative)}</td></tr>)}</tbody></table></div>}</details>
    </section>
  </div>;
}
