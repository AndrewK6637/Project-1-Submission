import assert from 'node:assert/strict';
import fs from 'node:fs';
import {input,clone,forecast,value,capital,historical,balance,near,peers,reverse,decision} from './model.mjs';
const started=new Date(),t=performance.now(),results=[];
function test(name,fn){try{const detail=fn();results.push({name,status:'PASS',detail});}catch(e){results.push({name,status:'FAIL',error:e.stack});}}
test('Historical source anchors, income identities, BS totals and H1 cash reconciliation',()=>historical(input));
test('All three cases: five linked statement intervals, equity and cash articulation',()=>{for(const n of Object.keys(input.cases)){const rs=forecast(input,n);assert.equal(rs.length,5);for(const r of rs){balance(r);near(r.cash_gap,0,'cash');}}});
test('Source mutation fails visibly',()=>{const d=clone(input);d.h1.revenue+=1;assert.throws(()=>forecast(d));});
test('Broken balance sheet rejected',()=>{const r=clone(input.opening);r.cash+=1;assert.throws(()=>balance(r));});
test('Reconciliation rejects nonfinite values on either side',()=>{for(const invalid of [NaN,Infinity,-Infinity,undefined,null]){assert.throws(()=>near(1,invalid,'expected'));assert.throws(()=>near(invalid,1,'actual'));}});
test('Invalid bridge and forecast assumptions fail before valuation',()=>{
 const mutations=[d=>d.capital.existing_awards=NaN,d=>d.capital.public_haircut=1.1,d=>d.capital.private_haircut=-.1,d=>d.capital.cash_floor=-1,d=>d.capital.other_claims=Infinity,d=>d.operating.terminal_roic=NaN,d=>d.operating.ap_days=-1,d=>d.operating.dep_rate=1.1,d=>d.cases.base.claim=NaN,d=>d.cases.base.q4_factor=-1,d=>d.reported_assets=NaN];
 for(const mutate of mutations){const d=clone(input);mutate(d);assert.throws(()=>value(d));}
 return `${mutations.length} invalid input mutations rejected`;
});
test('Highest-risk liquidity stress: no invented borrowing or cash plug',()=>{const d=clone(input);d.operating.capex_ratio=2;assert.throws(()=>forecast(d),/Unfunded/);return '200% capex/revenue rejected';});
test('WACC/g boundaries and nonfinite inputs',()=>{const w=capital(input).wacc;for(const g of [w,w+.01,-.01,NaN])assert.throws(()=>value(input,'base',{g}));assert.throws(()=>value(input,'base',{wacc:NaN}));});
test('AI engineering changed-input test (not locked human record)',()=>{const a=value(),b=value(input,'base',{wacc:capital(input).wacc+.01});assert(b.per_share<a.per_share);return {old_wacc:a.wacc,new_wacc:b.wacc,old_value:a.per_share,new_value:b.per_share,expected:'decrease',actual:'decrease',old_decision:decision(a,input.price),new_decision:decision(b,input.price),no_change_reason:'Discrete decision bands; numeric value still changes'};});
test('WACC monotonicity and terminal growth monotonicity',()=>{let last=Infinity;for(const w of [.10,.12,.14,.16,.18]){const v=value(input,'base',{wacc:w}).per_share;assert(v<last);last=v;}last=-Infinity;for(const g of [0,.01,.02,.03,.04]){const v=value(input,'base',{g}).per_share;assert(v>last);last=v;}});
test('Independent enterprise-equity bridge and shares',()=>{const v=value(),o=input.opening,c=input.capital;const eq=v.ev+o.cash-c.cash_floor+o.debt_securities+(o.equity_securities+4957)*(1-c.public_haircut)+o.private_investments*(1-c.private_haircut)-o.debt-c.other_claims;near(eq,v.equity,'bridge');near(eq/(24100+168),v.per_share,'shares');});
test('Restricted public investments are counted once outside operating value',()=>{const full=value(),d=clone(input);d.nonoperating.public_equity_in_other_assets=0;const excluded=value(d);near(full.ev,excluded.ev,'Operating EV unchanged');near(full.per_share-excluded.per_share,4957*.85/24268,'Investment bridge increment');near(full.rows[0].other_assets,input.opening.other_assets,'No second balance-sheet asset');});
test('Filed amortization schedule preserves remaining intangible balance',()=>{const rows=forecast();assert.deepEqual(rows.map(r=>r.amort),[482,795,642,528,468]);near(rows.at(-1).intangible,83,'FY2032+ residual');const d=clone(input);d.operating.amort_schedule[0]+=1;assert.throws(()=>forecast(d),/Amortization schedule/);});
test('Terminal reinvestment and discount timing',()=>{const v=value();near(v.terminal_reinvestment/v.terminal_nopat,v.g/input.operating.terminal_roic,'g/ROIC');near(v.flows[0].time,152/365,'stub');near(v.flows[0].fcff,v.rows[0].fcff*152/189,'exclude elapsed period');});
test('Signed explicit cash flows retained',()=>{const d=clone(input);d.operating.capex_ratio=.48;const v=value(d);assert(v.flows.some(f=>f.fcff<0));near(v.pv_explicit,v.flows.reduce((s,f)=>s+f.fcff/(1+v.wacc)**f.time,0),'signed PV');});
test('Peers: same annualized H1 basis, GAAP EPS, no forward/TTM mixing',()=>{for(const p of peers()){assert(p.published<=input.valuation_date);near(p.ev_sales*2*p.h1_revenue,p.ev,'EV/sales');near(p.pe*2*p.h1_diluted_eps,p.price,'P/E');}});
test('Reverse DCF reprices market and cases order causally',()=>{near(reverse().price,input.price,'reverse');assert(value(input,'low').per_share<value().per_share);assert(value().per_share<value(input,'high').per_share);});
test('Downside changes recommendation',()=>assert.notEqual(decision(value(),input.price),decision(value(input,'low'),input.price)));
test('No post-cutoff source dates',()=>{const reg=JSON.parse(fs.readFileSync(new URL('./sources/register.json',import.meta.url)));for(const s of reg)assert(s.as_of<=input.valuation_date,s.id);});
const out={started_utc:started.toISOString(),finished_utc:new Date().toISOString(),elapsed_seconds:(performance.now()-t)/1000,command:'node test.mjs',runtime:process.version,platform:process.platform,results,blocked:['Locked human prediction not performed','Human recorded cold run and videos missing','Partner feedback missing']};
fs.mkdirSync('evidence',{recursive:true});const path=`evidence/tests_${Date.now()}.json`;fs.writeFileSync(path,JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(results.some(x=>x.status==='FAIL'))process.exitCode=1;
