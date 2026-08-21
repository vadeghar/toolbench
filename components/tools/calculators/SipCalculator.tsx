"use client";

import { useMemo, useState } from "react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const months = years * 12;
    const monthlyRate = annualReturn / 100 / 12;
    const invested = monthlyInvestment * months;

    if (monthlyRate === 0) {
      return { invested, value: invested, gains: 0 };
    }

    const value =
      monthlyInvestment *
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    return { invested, value, gains: value - invested };
  }, [monthlyInvestment, annualReturn, years]);

  return (
    <div className="calculator-stack">
      <section className="tool-panel" aria-label="SIP calculator inputs">
        <div className="calculator-field">
          <label htmlFor="sip-investment">Monthly investment</label>
          <div className="input-with-prefix">
            <span>₹</span>
            <input
              id="sip-investment"
              type="number"
              min="0"
              step="500"
              value={monthlyInvestment}
              onChange={(event) => setMonthlyInvestment(Math.max(0, Number(event.target.value)))}
            />
          </div>
        </div>

        <div className="calculator-field">
          <label htmlFor="sip-return">Expected annual return (%)</label>
          <div className="input-with-suffix">
            <input
              id="sip-return"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={annualReturn}
              onChange={(event) => setAnnualReturn(Math.min(100, Math.max(0, Number(event.target.value))))}
            />
            <span>%</span>
          </div>
        </div>

        <div className="calculator-field">
          <label htmlFor="sip-years">Investment period (years)</label>
          <div className="input-with-suffix">
            <input
              id="sip-years"
              type="number"
              min="1"
              max="50"
              step="1"
              value={years}
              onChange={(event) => setYears(Math.min(50, Math.max(1, Number(event.target.value))))}
            />
            <span>years</span>
          </div>
        </div>
      </section>

      <section className="calculator-result" aria-live="polite">
        <div className="result-primary">
          <span>Estimated maturity value</span>
          <strong>{formatCurrency(result.value)}</strong>
        </div>
        <div className="result-grid">
          <div>
            <span>Total invested</span>
            <strong>{formatCurrency(result.invested)}</strong>
          </div>
          <div>
            <span>Estimated gains</span>
            <strong>{formatCurrency(result.gains)}</strong>
          </div>
        </div>
      </section>

      <p className="tool-disclaimer">
        This calculator provides an illustration based on the inputs supplied. Actual mutual fund returns are market-dependent and not guaranteed.
      </p>
    </div>
  );
}
