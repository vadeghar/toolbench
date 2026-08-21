"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import styles from "./PercentageCalculator.module.css";

type PercentageRowProps = { expression: ReactNode; result: string; onCalculate: () => void };

function CopyIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="7" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><path d="M16 7V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v11A1.5 1.5 0 0 0 5.5 18H8" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { if (!value || value === "—") return; try { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1200); } catch { setCopied(false); } };
  return <button type="button" className={styles.copy} onClick={copy} aria-label={copied ? "Copied" : label} title={copied ? "Copied" : label}>{copied ? "✓" : <CopyIcon />}</button>;
}

function PercentageRow({ expression, result, onCalculate }: PercentageRowProps) {
  return <section className={styles.row}><div className={styles.expression}>{expression}</div><div className={styles.actions}><button type="button" className={styles.calculate} onClick={onCalculate}>CALCULATE</button><div className={styles.result} aria-live="polite"><span className={styles.resultText}>{result}</span></div><CopyButton value={result} label="Copy result" /></div></section>;
}

export function PercentageCalculator() {
  const [percentOfValue, setPercentOfValue] = useState(25);
  const [percentOfTotal, setPercentOfTotal] = useState(200);
  const [partValue, setPartValue] = useState(50);
  const [partTotal, setPartTotal] = useState(200);
  const [fromValue, setFromValue] = useState(100);
  const [toValue, setToValue] = useState(125);
  const [differenceValueOne, setDifferenceValueOne] = useState(100);
  const [differenceValueTwo, setDifferenceValueTwo] = useState(125);
  const [differenceResult, setDifferenceResult] = useState("—");
  const [changeValue, setChangeValue] = useState(200);
  const [changeDirection, setChangeDirection] = useState<"increase" | "decrease">("increase");
  const [changePercent, setChangePercent] = useState(25);
  const [changeResult, setChangeResult] = useState("—");
  const [resultOne, setResultOne] = useState("125.00");
  const [resultTwo, setResultTwo] = useState("25.00");
  const [resultThree, setResultThree] = useState("25.00%");

  const calculateOne = () => { const value = (percentOfValue / 100) * percentOfTotal; setResultOne(Number.isFinite(value) ? value.toFixed(2) : "—"); };
  const calculateTwo = () => { const value = partTotal === 0 ? NaN : (partValue / partTotal) * 100; setResultTwo(Number.isFinite(value) ? value.toFixed(2) : "—"); };
  const calculateThree = () => { const value = fromValue === 0 ? NaN : ((toValue - fromValue) / Math.abs(fromValue)) * 100; setResultThree(Number.isFinite(value) ? `${value.toFixed(2)}%` : "—"); };
  const calculateDifference = () => { const denominator = (Math.abs(differenceValueOne) + Math.abs(differenceValueTwo)) / 2; const value = denominator === 0 ? NaN : (Math.abs(differenceValueOne - differenceValueTwo) / denominator) * 100; setDifferenceResult(Number.isFinite(value) ? `${value.toFixed(2)}%` : "—"); };
  const calculateChange = () => { const multiplier = changeDirection === "increase" ? 1 : -1; const value = changeValue * (1 + (multiplier * changePercent) / 100); setChangeResult(Number.isFinite(value) ? value.toFixed(2) : "—"); };
  const clearDifference = () => { setDifferenceValueOne(0); setDifferenceValueTwo(0); setDifferenceResult("—"); };
  const clearChange = () => { setChangeValue(0); setChangePercent(0); setChangeDirection("increase"); setChangeResult("—"); };

  return <div className={styles.calculator}>
    <PercentageRow result={resultOne} onCalculate={calculateOne} expression={<><span>What is</span><input className={styles.input} aria-label="Percentage" type="number" value={percentOfValue} onChange={(e) => setPercentOfValue(Number(e.target.value))} /><span>% of</span><input className={styles.input} aria-label="Value" type="number" value={percentOfTotal} onChange={(e) => setPercentOfTotal(Number(e.target.value))} /><span>?</span></>} />
    <PercentageRow result={resultTwo} onCalculate={calculateTwo} expression={<><input className={styles.input} aria-label="Part" type="number" value={partValue} onChange={(e) => setPartValue(Number(e.target.value))} /><span>is what percent of</span><input className={styles.input} aria-label="Whole" type="number" value={partTotal} onChange={(e) => setPartTotal(Number(e.target.value))} /><span>?</span></>} />
    <PercentageRow result={resultThree} onCalculate={calculateThree} expression={<><span>What is the percentage increase/decrease</span><span>from</span><input className={styles.input} aria-label="Original value" type="number" value={fromValue} onChange={(e) => setFromValue(Number(e.target.value))} /><span>to</span><input className={styles.input} aria-label="New value" type="number" value={toValue} onChange={(e) => setToValue(Number(e.target.value))} /><span>?</span></>} />
    <section className={styles.section} aria-labelledby="percentage-difference-title"><h2 id="percentage-difference-title" className={styles.sectionTitle}>Percentage Difference Calculator</h2><div className={styles.sectionPanel}><div className={styles.formRow}><label htmlFor="difference-value-one">Value 1</label><input id="difference-value-one" className={styles.formInput} type="number" value={differenceValueOne} onChange={(e) => setDifferenceValueOne(Number(e.target.value))} /></div><div className={styles.formRow}><label htmlFor="difference-value-two">Value 2</label><input id="difference-value-two" className={styles.formInput} type="number" value={differenceValueTwo} onChange={(e) => setDifferenceValueTwo(Number(e.target.value))} /></div><div className={styles.formActions}><button type="button" className={styles.calculate} onClick={calculateDifference}>CALCULATE</button><button type="button" className={styles.clear} onClick={clearDifference}>CLEAR</button><div className={styles.result} aria-live="polite"><span className={styles.resultText}>{differenceResult}</span></div><CopyButton value={differenceResult} label="Copy percentage difference" /></div></div></section>
    <section className={styles.section} aria-labelledby="percentage-change-title"><h2 id="percentage-change-title" className={styles.sectionTitle}>Percentage Change Calculator</h2><p className={styles.sectionDescription}>Please provide a starting value, an increase or decrease, and a percentage to calculate the resulting value.</p><div className={styles.changePanel}><input className={styles.formInput} aria-label="Starting value" type="number" value={changeValue} onChange={(e) => setChangeValue(Number(e.target.value))} /><select className={styles.changeSelect} aria-label="Increase or decrease" value={changeDirection} onChange={(e) => setChangeDirection(e.target.value as "increase" | "decrease")}><option value="increase">Increase</option><option value="decrease">Decrease</option></select><div className={styles.percentInput}><input className={styles.formInput} aria-label="Change percentage" type="number" value={changePercent} onChange={(e) => setChangePercent(Number(e.target.value))} /><span>%</span></div><span className={styles.equals}>=</span><div className={styles.result} aria-live="polite"><span className={styles.resultText}>{changeResult}</span></div><button type="button" className={styles.calculate} onClick={calculateChange}>CALCULATE</button><button type="button" className={styles.clear} onClick={clearChange}>CLEAR</button><CopyButton value={changeResult} label="Copy percentage change" /></div></section>
  </div>;
}
