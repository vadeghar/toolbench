"use client";

import { useMemo, useState } from "react";

function newRegimeTax(income: number) {
  const slabs = [[400000,0],[400000,0.05],[400000,0.1],[400000,0.15],[400000,0.2],[400000,0.25],[Infinity,0.3]] as const;
  let remaining = Math.max(0, income - 75000); let tax = 0;
  for (const [width, rate] of slabs) { const taxable = Math.min(remaining, width); tax += taxable * rate; remaining -= taxable; if (remaining <= 0) break; }
  return tax;
}
function oldRegimeTax(income: number) { const taxable = Math.max(0, income - 50000); const slabs = [[250000,0],[250000,0.05],[500000,0.2],[Infinity,0.3]] as const; let remaining = taxable; let tax=0; for (const [width, rate] of slabs) { const part=Math.min(remaining,width); tax+=part*rate; remaining-=part; if(remaining<=0) break; } return tax; }

export function TaxRegimeCalculator() { const [income,setIncome]=useState(1500000); const result=useMemo(()=>({old:oldRegimeTax(income), modern:newRegimeTax(income)}),[income]); const winner=result.modern<result.old?"New regime":"Old regime"; return <div className="calculator-stack"><section className="tool-panel"><div className="calculator-field"><label htmlFor="tax-income">Annual taxable income (₹)</label><input id="tax-income" type="number" min="0" value={income} onChange={e=>setIncome(Number(e.target.value))}/></div><p className="tool-disclaimer">Illustrative slab comparison. Deductions, rebates, cess and special-rate income are not included.</p></section><section className="calculator-result"><div className="result-grid"><div><span>Old regime estimate</span><strong>₹{result.old.toLocaleString("en-IN",{maximumFractionDigits:0})}</strong></div><div><span>New regime estimate</span><strong>₹{result.modern.toLocaleString("en-IN",{maximumFractionDigits:0})}</strong></div></div><div className="result-primary"><span>Lower estimated tax</span><strong>{winner}</strong></div></section></div>; }
