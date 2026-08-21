"use client";

import { useMemo, useState } from "react";

export function PercentageCalculator() {
  const [value, setValue] = useState(25);
  const [total, setTotal] = useState(200);
  const [original, setOriginal] = useState(100);
  const [finalValue, setFinalValue] = useState(125);
  const result = useMemo(() => ({ percent: total ? (value / total) * 100 : 0, change: original ? ((finalValue - original) / original) * 100 : 0 }), [value, total, original, finalValue]);
  return <div className="calculator-stack"><section className="tool-panel"><div className="calculator-field"><label htmlFor="pct-value">Value</label><input id="pct-value" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} /></div><div className="calculator-field"><label htmlFor="pct-total">Total</label><input id="pct-total" type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} /></div><div className="calculator-field"><label htmlFor="pct-original">Original value</label><input id="pct-original" type="number" value={original} onChange={(e) => setOriginal(Number(e.target.value))} /></div><div className="calculator-field"><label htmlFor="pct-final">New value</label><input id="pct-final" type="number" value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))} /></div></section><section className="calculator-result"><div className="result-grid"><div><span>Value as percentage of total</span><strong>{result.percent.toFixed(2)}%</strong></div><div><span>Percentage change</span><strong>{result.change.toFixed(2)}%</strong></div></div></section></div>;
}
