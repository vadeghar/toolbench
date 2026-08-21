"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import styles from "./PercentageCalculator.module.css";

type PercentageRowProps = {
  expression: ReactNode;
  result: string;
  onCalculate: () => string;
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="7" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 7V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v11A1.5 1.5 0 0 0 5.5 18H8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function PercentageRow({ expression, result, onCalculate }: PercentageRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result || result === "—") return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={styles.row}>
      <div className={styles.expression}>{expression}</div>
      <div className={styles.actions}>
        <button type="button" className={styles.calculate} onClick={onCalculate}>
          CALCULATE
        </button>
        <div className={styles.result} aria-live="polite">
          <span className={styles.resultText}>{result}</span>
        </div>
        <button
          type="button"
          className={styles.copy}
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy result"}
          title={copied ? "Copied" : "Copy result"}
        >
          {copied ? "✓" : <CopyIcon />}
        </button>
      </div>
    </section>
  );
}

export function PercentageCalculator() {
  const [percentOfValue, setPercentOfValue] = useState(25);
  const [percentOfTotal, setPercentOfTotal] = useState(200);
  const [partValue, setPartValue] = useState(50);
  const [partTotal, setPartTotal] = useState(200);
  const [fromValue, setFromValue] = useState(100);
  const [toValue, setToValue] = useState(125);

  const [resultOne, setResultOne] = useState("125.00");
  const [resultTwo, setResultTwo] = useState("25.00");
  const [resultThree, setResultThree] = useState("25.00%");

  const calculateOne = () => {
    const value = (percentOfValue / 100) * percentOfTotal;
    const formatted = Number.isFinite(value) ? value.toFixed(2) : "—";
    setResultOne(formatted);
    return formatted;
  };

  const calculateTwo = () => {
    const value = partTotal === 0 ? NaN : (partValue / partTotal) * 100;
    const formatted = Number.isFinite(value) ? value.toFixed(2) : "—";
    setResultTwo(formatted);
    return formatted;
  };

  const calculateThree = () => {
    const value = fromValue === 0 ? NaN : ((toValue - fromValue) / Math.abs(fromValue)) * 100;
    const formatted = Number.isFinite(value) ? `${value.toFixed(2)}%` : "—";
    setResultThree(formatted);
    return formatted;
  };

  return (
    <div className={styles.calculator}>
      <PercentageRow
        result={resultOne}
        onCalculate={calculateOne}
        expression={
          <>
            <span>What is</span>
            <input className={styles.input} aria-label="Percentage" type="number" value={percentOfValue} onChange={(event) => setPercentOfValue(Number(event.target.value))} />
            <span>% of</span>
            <input className={styles.input} aria-label="Value" type="number" value={percentOfTotal} onChange={(event) => setPercentOfTotal(Number(event.target.value))} />
            <span>?</span>
          </>
        }
      />

      <PercentageRow
        result={resultTwo}
        onCalculate={calculateTwo}
        expression={
          <>
            <input className={styles.input} aria-label="Part" type="number" value={partValue} onChange={(event) => setPartValue(Number(event.target.value))} />
            <span>is what percent of</span>
            <input className={styles.input} aria-label="Whole" type="number" value={partTotal} onChange={(event) => setPartTotal(Number(event.target.value))} />
            <span>?</span>
          </>
        }
      />

      <PercentageRow
        result={resultThree}
        onCalculate={calculateThree}
        expression={
          <>
            <span>What is the percentage increase/decrease</span>
            <span>from</span>
            <input className={styles.input} aria-label="Original value" type="number" value={fromValue} onChange={(event) => setFromValue(Number(event.target.value))} />
            <span>to</span>
            <input className={styles.input} aria-label="New value" type="number" value={toValue} onChange={(event) => setToValue(Number(event.target.value))} />
            <span>?</span>
          </>
        }
      />
    </div>
  );
}
