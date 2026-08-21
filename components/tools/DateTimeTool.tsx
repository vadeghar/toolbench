"use client";

import { useMemo, useState } from "react";

function localDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

export function DateTimeTool({ type }: { type: "age" | "difference" | "add" | "until" }) {
  const today = new Date().toISOString().slice(0, 10);
  const [first, setFirst] = useState("2000-01-01");
  const [second, setSecond] = useState(today);
  const [days, setDays] = useState("30");
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const result = useMemo(() => {
    const a = localDate(first);
    const b = localDate(second);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return "Enter valid dates.";
    const dayMs = 86400000;

    if (type === "age") {
      if (a > b) return "Birth date cannot be in the future.";
      let years = b.getFullYear() - a.getFullYear();
      const anniversary = new Date(b.getFullYear(), a.getMonth(), a.getDate());
      if (anniversary > b) years -= 1;
      const lastBirthday = new Date(b.getFullYear() - (anniversary > b ? 1 : 0), a.getMonth(), a.getDate());
      const daysSince = Math.floor((b.getTime() - lastBirthday.getTime()) / dayMs);
      return `${years} year${years === 1 ? "" : "s"}, ${daysSince} day${daysSince === 1 ? "" : "s"}`;
    }

    if (type === "difference") {
      return `${Math.abs(Math.round((b.getTime() - a.getTime()) / dayMs))} days`;
    }

    if (type === "until") {
      return `${Math.round((a.getTime() - localDate(today).getTime()) / dayMs)} days`;
    }

    const amount = Number(days);
    if (!Number.isFinite(amount)) return "Enter a valid number of days.";
    const target = new Date(a);
    target.setDate(target.getDate() + (operation === "add" ? amount : -amount));
    return target.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }, [first, second, days, operation, type, today]);

  const title = { age: "Age Calculator", difference: "Date Difference", add: "Add / Subtract Days", until: "Days Until Date" }[type];

  return (
    <section className="tool-panel calculator-stack">
      <h2>{title}</h2>
      <div className="date-tool-grid">
        <label className="calculator-field">{type === "age" ? "Date of birth" : "Start / target date"}<input type="date" value={first} onChange={(e) => setFirst(e.target.value)} /></label>
        {(type === "difference" || type === "age") && <label className="calculator-field">End date<input type="date" value={second} onChange={(e) => setSecond(e.target.value)} /></label>}
        {type === "add" && <>
          <label className="calculator-field">Days<input type="number" min="0" value={days} onChange={(e) => setDays(e.target.value)} /></label>
          <label className="calculator-field">Operation<select value={operation} onChange={(e) => setOperation(e.target.value as "add" | "subtract")}><option value="add">Add</option><option value="subtract">Subtract</option></select></label>
        </>}
      </div>
      <div className="calculator-result"><span>Result</span><strong>{result}</strong></div>
    </section>
  );
}
