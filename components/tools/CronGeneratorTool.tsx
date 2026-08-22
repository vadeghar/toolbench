"use client";

import { useMemo, useState } from "react";

type Mode = "minutes" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
const modes: [Mode, string][] = [["minutes", "Minutes"], ["hourly", "Hourly"], ["daily", "Daily"], ["weekly", "Weekly"], ["monthly", "Monthly"], ["yearly", "Yearly"]];
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const pad = (n: number) => String(n).padStart(2, "0");
const parts = (time: string) => { const [h, m] = time.split(":").map(Number); return { h: h || 0, m: m || 0 }; };
const dateText = (d: Date) => d.toLocaleString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

function values(field: string, min: number, max: number, question = false) {
  if (question && field === "?") return null;
  if (field === "*") return new Set(Array.from({ length: max - min + 1 }, (_, i) => min + i));
  if (field === "L") return null;
  const out = new Set<number>();
  field.split(",").forEach((part) => {
    const [range, stepText] = part.split("/"); const step = Number(stepText || 1);
    if (!Number.isFinite(step) || step < 1) return;
    if (range === "*") for (let n = min; n <= max; n += step) out.add(n);
    else { const [a, b] = range.split("-").map(Number); for (let n = a; n <= (b || a); n += step) if (n >= min && n <= max) out.add(n); }
  });
  return out;
}

function nextDates(expression: string) {
  const f = expression.split(/\s+/); if (f.length !== 6) return [] as Date[];
  const min = values(f[1], 0, 59)!, hour = values(f[2], 0, 23)!;
  const dom = values(f[3], 1, 31, true), mon = values(f[4], 1, 12)!;
  const dow = values(f[5], 1, 7, true), last = f[3] === "L";
  const result: Date[] = []; const d = new Date(); d.setSeconds(0, 0); d.setMinutes(d.getMinutes() + 1);
  for (let i = 0; i < 10 * 366 * 24 * 60 && result.length < 5; i++) {
    const dayOfWeek = d.getDay() || 7, dayOfMonth = d.getDate(), month = d.getMonth() + 1;
    const dayMatch = last ? dayOfMonth === new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() : dom ? dom.has(dayOfMonth) : true;
    const weekMatch = dow ? dow.has(dayOfWeek) : true;
    const calendarMatch = f[3] === "?" ? weekMatch : f[5] === "?" ? dayMatch : dayMatch || weekMatch;
    if (min.has(d.getMinutes()) && hour.has(d.getHours()) && mon.has(month) && calendarMatch) result.push(new Date(d));
    d.setMinutes(d.getMinutes() + 1);
  }
  return result;
}

export function CronGeneratorTool() {
  const [mode, setMode] = useState<Mode>("hourly");
  const [interval, setInterval] = useState("1");
  const [minuteStart, setMinuteStart] = useState("0");
  const [time, setTime] = useState("00:00");
  const [weekdays, setWeekdays] = useState(["MON"]);
  const [monthDay, setMonthDay] = useState("1");
  const [lastDay, setLastDay] = useState(false);
  const [yearMonth, setYearMonth] = useState("1");
  const [yearDay, setYearDay] = useState("1");
  const [generated, setGenerated] = useState("");

  const expression = useMemo(() => {
    const { h, m } = parts(time); const n = Math.max(1, Number(interval) || 1); const start = Math.max(0, Math.min(59, Number(minuteStart) || 0));
    switch (mode) {
      case "minutes": return `0 ${start}/${Math.min(n, 59)} * * * ?`;
      case "hourly": return `0 ${pad(m)} 0/${Math.min(n, 23)} * * ?`;
      case "daily": return `0 ${pad(m)} ${pad(h)} 1/${Math.min(n, 31)} * ?`;
      case "weekly": return `0 ${pad(m)} ${pad(h)} ? * ${weekdays.join(",") || "MON"}`;
      case "monthly": return `0 ${pad(m)} ${pad(h)} ${lastDay ? "L" : monthDay} * ?`;
      case "yearly": return `0 ${pad(m)} ${pad(h)} ${yearDay} ${yearMonth} ?`;
    }
  }, [interval, minuteStart, mode, time, weekdays, monthDay, lastDay, yearMonth, yearDay]);

  const cron = generated || expression;
  const dates = useMemo(() => nextDates(cron), [cron]);
  const update = <T,>(setter: (v: T) => void, value: T) => { setter(value); setGenerated(""); };
  const toggleDay = (day: string) => update(setWeekdays, weekdays.includes(day) ? weekdays.length === 1 ? weekdays : weekdays.filter((d) => d !== day) : [...weekdays, day]);

  return <section className="tool-panel calculator-stack">
    <div><h2>Cron Expression Generator</h2><p className="tool-disclaimer">Build Quartz-compatible cron expressions with seconds as the first field.</p></div>

    <div role="tablist" aria-label="Cron schedule type" style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid var(--border-strong)", gap: 4 }}>
      {modes.map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => update(setMode, id)} style={{ flex: "1 1 120px", minHeight: 48, padding: "10px 16px", border: "1px solid transparent", borderBottom: mode === id ? "2px solid var(--accent-violet)" : "2px solid transparent", borderRadius: "8px 8px 0 0", background: mode === id ? "var(--bg-elevated-hover)" : "transparent", color: mode === id ? "var(--text-primary)" : "var(--text-secondary)", cursor: "pointer", fontWeight: 600 }}>{label}</button>)}
    </div>

    {mode === "minutes" && <div className="date-tool-grid">
      <label className="calculator-field">Every<select value={interval} onChange={(e) => update(setInterval, e.target.value)}>{Array.from({ length: 59 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} minute{i ? "s" : ""}</option>)}</select></label>
      <label className="calculator-field">Start at minute<select value={minuteStart} onChange={(e) => update(setMinuteStart, e.target.value)}>{Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{pad(i)}</option>)}</select></label>
    </div>}

    {mode === "hourly" && <div className="date-tool-grid">
      <label className="calculator-field">Every<select value={interval} onChange={(e) => update(setInterval, e.target.value)}>{Array.from({ length: 23 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} hour{i ? "s" : ""}</option>)}</select></label>
      <label className="calculator-field">At minute<select value={String(parts(time).m)} onChange={(e) => update(setTime, `${pad(parts(time).h)}:${pad(Number(e.target.value))}`)}>{Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{pad(i)}</option>)}</select></label>
    </div>}

    {mode === "daily" && <div className="date-tool-grid">
      <label className="calculator-field">Every<select value={interval} onChange={(e) => update(setInterval, e.target.value)}>{Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} day{i ? "s" : ""}</option>)}</select></label>
      <label className="calculator-field">At<input type="time" value={time} onChange={(e) => update(setTime, e.target.value)} /></label>
    </div>}

    {mode === "weekly" && <div className="calculator-stack">
      <fieldset style={{ border: "1px solid var(--border-strong)", borderRadius: 9, padding: 16 }}><legend style={{ padding: "0 8px", color: "var(--text-secondary)", fontWeight: 600 }}>Run on</legend><div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8 }}>{days.map((day) => <label key={day} style={{ display: "grid", gap: 6, justifyItems: "center", padding: "10px 4px", borderRadius: 8, background: weekdays.includes(day) ? "rgba(155,141,232,.12)" : "transparent" }}><input type="checkbox" checked={weekdays.includes(day)} onChange={() => toggleDay(day)} /><span>{day.slice(0, 3)}</span></label>)}</div></fieldset>
      <label className="calculator-field">At<input type="time" value={time} onChange={(e) => update(setTime, e.target.value)} /></label>
    </div>}

    {mode === "monthly" && <div className="date-tool-grid">
      <label className="calculator-field">Day of month<select disabled={lastDay} value={monthDay} onChange={(e) => update(setMonthDay, e.target.value)}>{Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label>
      <label style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 30 }}><input type="checkbox" checked={lastDay} onChange={(e) => update(setLastDay, e.target.checked)} />Last day of the month</label>
      <label className="calculator-field">At<input type="time" value={time} onChange={(e) => update(setTime, e.target.value)} /></label>
    </div>}

    {mode === "yearly" && <div className="date-tool-grid">
      <label className="calculator-field">Month<select value={yearMonth} onChange={(e) => update(setYearMonth, e.target.value)}>{monthNames.map((name, i) => <option key={name} value={i + 1}>{name}</option>)}</select></label>
      <label className="calculator-field">Day<select value={yearDay} onChange={(e) => update(setYearDay, e.target.value)}>{Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label>
      <label className="calculator-field">At<input type="time" value={time} onChange={(e) => update(setTime, e.target.value)} /></label>
    </div>}

    <div className="formatter-toolbar"><button type="button" className="tool-button" onClick={() => setGenerated(expression)}>Generate</button></div>
    <div className="calculator-result" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}><div style={{ display: "grid", gap: 7 }}><span>Quartz cron expression</span><code style={{ fontSize: "1rem", wordBreak: "break-all" }}>{cron}</code></div><button type="button" className="tool-button secondary" onClick={() => navigator.clipboard?.writeText(cron)}>Copy</button></div>

    <div className="calculator-result"><h3 style={{ marginBottom: 10 }}>Next scheduled dates</h3>{dates.length ? <ol style={{ display: "grid", gap: 8, margin: 0, paddingLeft: 24 }}>{dates.map((d) => <li key={d.toISOString()}>{dateText(d)}</li>)}</ol> : <p className="tool-disclaimer">No upcoming dates could be calculated.</p>}</div>
  </section>;
}
