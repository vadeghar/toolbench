"use client";

import { useMemo, useState } from "react";

export function EmiCalculator() {
  const [loan, setLoan] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const result = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 1200;
    const emi = monthlyRate === 0 ? loan / months : loan * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1);
    return { emi, total: emi * months, interest: emi * months - loan };
  }, [loan, rate, years]);

  return <div className="calculator-stack">
    <section className="tool-panel">
      <div className="calculator-field"><label htmlFor="emi-loan">Loan amount</label><input id="emi-loan" type="number" min="0" value={loan} onChange={(e) => setLoan(Number(e.target.value))} /></div>
      <div className="calculator-field"><label htmlFor="emi-rate">Annual interest rate (%)</label><input id="emi-rate" type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      <div className="calculator-field"><label htmlFor="emi-years">Loan tenure (years)</label><input id="emi-years" type="number" min="1" max="50" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
    </section>
    <section className="calculator-result"><div className="result-primary"><span>Monthly EMI</span><strong>₹{result.emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong></div><div className="result-grid"><div><span>Total interest</span><strong>₹{result.interest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong></div><div><span>Total repayment</span><strong>₹{result.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong></div></div></section>
  </div>;
}
