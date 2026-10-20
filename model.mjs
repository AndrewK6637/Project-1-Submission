import fs from 'node:fs';
export const input = JSON.parse(fs.readFileSync(new URL('./inputs.json', import.meta.url),'utf8'));
export const clone=x=>structuredClone(x);
const sum=(o,ks)=>ks.reduce((s,k)=>s+o[k],0);
export const presentValue=(cash,time,rate)=>cash/(1+rate)**time;
export function terminalValue(nextCash,wacc,g){if(!Number.isFinite(wacc)||!Number.isFinite(g)||wacc<=g||g<0)throw Error('Invalid terminal boundary');return nextCash/(wacc-g);}
export const assetKeys=['cash','debt_securities','equity_securities','ar','inventory','prepaid','ppe','lease_assets','goodwill','intangible','dta','private_investments','other_assets'];
export const liabilityKeys=['ap','accrued','debt','lease_liabilities','other_liabilities'];
export function near(a,b,label){if(!Number.isFinite(a)||!Number.isFinite(b)||Math.abs(a-b)>1e-6)throw Error(`${label}: ${a} != ${b}`);}
function finiteFields(obj,keys,label){for(const key of keys)if(!Number.isFinite(obj?.[key]))throw Error(`Nonfinite or missing ${label}.${key}`);}
export function balance(r){near(sum(r,assetKeys),sum(r,liabilityKeys)+r.equity,'Balance sheet');return sum(r,assetKeys)-sum(r,liabilityKeys)-r.equity;}
export function historical(d){
 finiteFields(d.nonoperating,['public_equity_in_other_assets'],'nonoperating');
 if(d.nonoperating.public_equity_in_other_assets<0||d.nonoperating.public_equity_in_other_assets>d.opening.other_assets)throw Error('Invalid investment subset of other assets');
 finiteFields(d,['price','reported_assets','reported_liabilities'],'input');
 finiteFields(d.capital,['rf','beta','erp','spread','tax','basic_shares','existing_awards','cash_floor','public_haircut','private_haircut','other_claims'],'capital');
 if(d.price<=0||d.capital.basic_shares<=0||d.capital.existing_awards<0||d.capital.tax<0||d.capital.tax>=1)throw Error('Invalid price, shares or tax');
 if(d.capital.cash_floor<0||d.capital.cash_floor>d.opening.cash||d.capital.other_claims<0||[d.capital.public_haircut,d.capital.private_haircut].some(x=>x<0||x>1))throw Error('Invalid cash floor, claims or investment haircut');
 balance(d.opening);near(sum(d.opening,assetKeys),d.reported_assets,'Reported assets');near(sum(d.opening,liabilityKeys),d.reported_liabilities,'Reported liabilities');
 for(const [k,h] of Object.entries({...d.history,H1:d.h1})){near(h.revenue-h.cogs-h.rd-h.sga,h.ebit,k+' EBIT');near(h.ebit+h.other_income-h.tax,h.ni,k+' NI');}
 near(d.h1.begin_cash+d.h1.cfo+d.h1.cfi+d.h1.cff,d.opening.cash,'Historical cash');
 // Independent transcription anchors from K26 IS and Q27 BS/CF. Deliberately separate from model inputs.
 near(d.history.FY2026.revenue,215938,'K26 revenue source');near(d.h1.revenue,177837,'Q27 revenue source');near(d.opening.debt,33366,'Q27 debt source');
}
export function capital(d){const c=d.capital,eq=d.price*c.basic_shares,wd=d.opening.debt/(eq+d.opening.debt);return {ke:c.rf+c.beta*c.erp,kd:c.rf+c.spread,debt_weight:wd,equity_weight:1-wd,wacc:(c.rf+c.beta*c.erp)*(1-wd)+(c.rf+c.spread)*(1-c.tax)*wd,shares:c.basic_shares+c.existing_awards};}
export function forecast(d=input,name='base'){
 historical(d);const a=d.operating,c=d.capital,s=d.cases[name];if(!s)throw Error('Unknown case');
 finiteFields(a,['q3_revenue','q4_revenue','rd_ratio','sga_ratio','ar_days','inventory_days','ap_days','prepaid_ratio','accrued_ratio','capex_ratio','dep_rate','terminal_roic','terminal_growth','interest_rate'],'operating');
 if(!Array.isArray(a.amort_schedule)||a.amort_schedule.length!==6||a.amort_schedule.some(x=>!Number.isFinite(x)||x<0))throw Error('Invalid amortization schedule');
 near(a.amort_schedule.reduce((total,x)=>total+x,0),d.opening.intangible,'Amortization schedule ties to existing intangibles');
 finiteFields(s,['q3_factor','q4_factor','wacc_add','ar_add','inventory_add','claim'],'case');
 if(['q3_revenue','q4_revenue','rd_ratio','sga_ratio','ap_days','prepaid_ratio','accrued_ratio','interest_rate'].some(k=>a[k]<0)||a.dep_rate<0||a.dep_rate>1||s.q3_factor<0||s.q4_factor<0||s.claim<0)throw Error('Invalid operating rates, balances or scenario assumptions');
 for(const x of [...s.growth,...s.margins,a.capex_ratio,a.ar_days,a.inventory_days,a.ap_days])if(!Number.isFinite(x))throw Error('Nonfinite input');
 if(s.growth.length!==4||s.margins.length!==5||s.growth.some(x=>x<=-1)||s.margins.some(x=>x<0||x>1)||a.capex_ratio<0||a.ar_days+s.ar_add<0||a.inventory_days+s.inventory_add<0)throw Error('Invalid operating assumptions');
 let p=clone(d.opening),annual=d.h1.revenue+a.q3_revenue*s.q3_factor+a.q4_revenue*s.q4_factor,rows=[];
 // First model interval is H2 FY2027. Subsequent intervals are full fiscal years.
 for(let i=0;i<5;i++){
  if(i)annual*=1+s.growth[i-1];
  const duration=i===0?189/365:1, revenue=i===0?annual-d.h1.revenue:annual;
  const r={...p,year:2027+i,interval:i===0?'H2 FY2027':'FY'+(2027+i),duration,annual_revenue:annual,revenue};
  r.cogs=revenue*(1-s.margins[i]);r.gp=revenue-r.cogs;r.rd=revenue*a.rd_ratio;r.sga=revenue*a.sga_ratio;r.ebit=r.gp-r.rd-r.sga;
  r.interest=p.debt*a.interest_rate*duration;r.tax=Math.max(0,r.ebit-r.interest)*c.tax;r.ni=r.ebit-r.interest-r.tax;
  r.dep=p.ppe*a.dep_rate*duration;r.amort=Math.min(p.intangible,a.amort_schedule[i]);r.da=r.dep+r.amort;
  r.capex=revenue*a.capex_ratio;r.ppe=p.ppe+r.capex-r.dep;r.intangible=p.intangible-r.amort;
  // Ending operating balances use annual revenue/COGS run rate, not half-year flow.
  r.ar=annual*(a.ar_days+s.ar_add)/365;r.inventory=annual*(1-s.margins[i])*(a.inventory_days+s.inventory_add)/365;r.ap=annual*(1-s.margins[i])*a.ap_days/365;
  r.prepaid=annual*a.prepaid_ratio;r.accrued=annual*a.accrued_ratio;
  r.nwc=r.ar+r.inventory+r.prepaid-r.ap-r.accrued;
  r.dnwc=r.nwc-(p.ar+p.inventory+p.prepaid-p.ap-p.accrued);
  r.cfo=r.ni+r.da-r.dnwc;r.cfi=-r.capex;r.dividends=Math.max(0,r.cfo+r.cfi);r.cff=-r.dividends;
  r.cash=p.cash+r.cfo+r.cfi+r.cff;r.equity=p.equity+r.ni-r.dividends;
  if(r.cash<c.cash_floor||r.ppe<0||r.intangible<0)throw Error('Unfunded liquidity or asset deficit');
  r.operating_tax=Math.max(0,r.ebit)*c.tax;r.fcff=r.ebit-r.operating_tax+r.da-r.capex-r.dnwc;
  r.balance_gap=balance(r);r.cash_gap=r.cash-p.cash-r.cfo-r.cfi-r.cff;near(r.cash_gap,0,'Cash rollforward');near(r.equity-p.equity-r.ni+r.dividends,0,'Equity rollforward');
  rows.push(r);p=r;
 }
 return rows;
}
export function value(d=input,name='base',override={}){
 const rows=forecast(d,name),a=d.operating,c=d.capital,s=d.cases[name],k=capital(d),w=override.wacc??k.wacc+s.wacc_add,g=override.g??a.terminal_growth;
 if(!Number.isFinite(w)||!Number.isFinite(g)||w<=g||g<0||w<=0||a.terminal_roic<=g)throw Error('Require WACC > g >= 0 and terminal ROIC > g');
 // H2 is 189 days. Value only cash generated after Sep 1: 152/189 remains.
 // Cash earned July27-Sep1 assumed paid out before valuation; no retained-cash double count.
 const remaining=152/189,t0=152/365;
 const flows=rows.map((r,i)=>({year:r.year,fcff:r.fcff*(i===0?remaining:1),time:t0+i}));
 const pv_explicit=flows.reduce((s,f)=>s+presentValue(f.fcff,f.time,w),0),last=rows.at(-1);
 const terminal_nopat=last.ebit*(1+g)*(1-c.tax),terminal_reinvestment=terminal_nopat*g/a.terminal_roic,terminal_fcff=terminal_nopat-terminal_reinvestment;
 if(terminal_fcff<=0)throw Error('Terminal cash flow must be positive');
 const pv_terminal=presentValue(terminalValue(terminal_fcff,w,g),flows.at(-1).time,w),ev=pv_explicit+pv_terminal;
 const excess_cash=d.opening.cash-c.cash_floor,public_value=(d.opening.equity_securities+d.nonoperating.public_equity_in_other_assets)*(1-c.public_haircut),private_value=d.opening.private_investments*(1-c.private_haircut);
 const bridge=excess_cash+d.opening.debt_securities+public_value+private_value-d.opening.debt-c.other_claims-s.claim;
 const equity=ev+bridge,per_share=equity/k.shares;
 return {name,wacc:w,g,shares:k.shares,flows,pv_explicit,terminal_nopat,terminal_reinvestment,terminal_fcff,pv_terminal,terminal_share:pv_terminal/ev,ev,excess_cash,debt_securities:d.opening.debt_securities,public_value,private_value,debt:d.opening.debt,other_claims:c.other_claims+s.claim,bridge,equity,per_share,rows};
}
export function peers(d=input){return d.peers.map(p=>{const eq=p.price*p.shares_proxy,ev=eq+p.debt-p.cash-p.securities;return {...p,equity:eq,ev,ev_sales:ev/(2*p.h1_revenue),ev_ebit:ev/(2*p.h1_ebit),pe:p.price/(2*p.h1_diluted_eps)};});}
export function reverse(d=input){let lo=-.15,hi=.6;const calc=x=>{const z=clone(d);z.cases.base.growth=z.cases.base.growth.map(g=>g+x);return value(z).per_share;};const endpoints=[calc(lo),calc(hi)];if(d.price<endpoints[0]||d.price>endpoints[1])return {status:'No solution in bracket',endpoints};for(let i=0;i<80;i++){let mid=(lo+hi)/2;if(calc(mid)<d.price)lo=mid;else hi=mid;}return {status:'Solved',growth_shift:(lo+hi)/2,growth_path:d.cases.base.growth.map(g=>g+(lo+hi)/2),price:calc((lo+hi)/2),endpoints};}
export function decision(v,price){return price<=v.per_share*.8?'CONDITIONAL INITIATE':price>v.per_share*1.8?'DO NOT INITIATE':'WATCH / DEFER';}
