"use client";

import { useMemo, useState } from "react";

type Mode = "minutes" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
type MonthlyKind = "day" | "weekday";
type YearlyKind = "day" | "weekday";

const modes: [Mode, string][] = [["minutes", "Minutes"], ["hourly", "Hourly"], ["daily", "Daily"], ["weekly", "Weekly"], ["monthly", "Monthly"], ["yearly", "Yearly"]];
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ordinals = ["First", "Second", "Third", "Fourth", "Last"];
const ordinalValues = [1, 2, 3, 4, 5];
const dayNumbers = [1, 2, 3, 4, 5, 6, 7];

const pad = (n: number) => String(n).padStart(2, "0");
const selectOptions = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

function timeParts(time: string) {
  const [h, m] = time.split(":").map(Number);
  return { h: Number.isFinite(h) ? h : 12, m: Number.isFinite(m) ? m : 0 };
}

function nextDates(expression: string) {
  const f = expression.trim().split(/\s+/);
  if (f.length !== 7) return [] as Date[];
  const minute = f[1], hour = f[2], dom = f[3], month = f[4], dow = f[5];
  const result: Date[] = [];
  const d = new Date();
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  const matches = (field: string, value: number, min: number, max: number) => {
    if (field === "*") return true;
    if (field === "?") return true;
    return field.split(",").some((token) => {
      if (token.includes("#")) return false;
      if (token.includes("/")) { const [start, step] = token.split("/").map(Number); return Number.isFinite(start) && Number.isFinite(step) && value >= start && (value - start) % step === 0; }
      if (token.includes("-")) { const [a, b] = token.split("-").map(Number); return value >= a && value <= b; }
      return Number(token) === value;
    });
  };
  for (let i = 0; i < 6 * 366 * 24 * 60 && result.length < 5; i++) {
    const dowValue = d.getDay() || 7;
    let dowMatch = matches(dow, dowValue, 1, 7);
    const hash = dow.match(/(\d+)#(\d+)/);
    if (hash) {
      const target = Number(hash[1]); const occurrence = Number(hash[2]);
      const first = new Date(d.getFullYear(), d.getMonth(), 1);
      const firstDow = first.getDay() || 7;
      const targetDate = 1 + ((target - firstDow + 7) % 7) + (occurrence - 1) * 7;
      dowMatch = d.getDate() === targetDate;
    }
    const domMatch = dom === "L" ? d.getDate() === new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() : matches(dom, d.getDate(), 1, 31);
    const monthMatch = matches(month, d.getMonth() + 1, 1, 12);
    const calendarMatch = dom === "?" ? dowMatch : dow === "?" ? domMatch : domMatch || dowMatch;
    if (matches(minute, d.getMinutes(), 0, 59) && matches(hour, d.getHours(), 0, 23) && monthMatch && calendarMatch) result.push(new Date(d));
    d.setMinutes(d.getMinutes() + 1);
  }
  return result;
}

export function CronGeneratorTool() {
  const [mode, setMode] = useState<Mode>("minutes");
  const [minutesInterval, setMinutesInterval] = useState(5);
  const [hourlyKind, setHourlyKind] = useState<"every" | "starts">("every");
  const [hourlyInterval, setHourlyInterval] = useState(1);
  const [dailyKind, setDailyKind] = useState<"everyday" | "weekday">("everyday");
  const [time, setTime] = useState("12:00");
  const [weekdays, setWeekdays] = useState<string[]>(["MON", "TUE"]);
  const [monthlyKind, setMonthlyKind] = useState<MonthlyKind>("day");
  const [monthlyDay, setMonthlyDay] = useState(1);
  const [monthlyInterval, setMonthlyInterval] = useState(1);
  const [monthlyOrdinal, setMonthlyOrdinal] = useState(1);
  const [monthlyWeekday, setMonthlyWeekday] = useState(1);
  const [yearlyKind, setYearlyKind] = useState<YearlyKind>("day");
  const [yearlyMonth, setYearlyMonth] = useState(1);
  const [yearlyDay, setYearlyDay] = useState(1);
  const [yearlyOrdinal, setYearlyOrdinal] = useState(1);
  const [yearlyWeekday, setYearlyWeekday] = useState(1);
  const [generated, setGenerated] = useState("");

  const expression = useMemo(() => {
    const { h, m } = timeParts(time);
    switch (mode) {
      case "minutes": return `0 0/${minutesInterval} * 1/1 * ? *`;
      case "hourly": return hourlyKind === "every" ? `0 0 0/${hourlyInterval} 1/1 * ? *` : `0 ${m} ${h} 1/1 * ? *`;
      case "daily": return dailyKind === "weekday" ? `0 ${m} ${h} ? * MON-FRI *` : `0 ${m} ${h} 1/1 * ? *`;
      case "weekly": return `0 ${m} ${h} ? * ${weekdays.length ? weekdays.join(",") : "MON"} *`;
      case "monthly": return monthlyKind === "day" ? `0 ${m} ${h} ${monthlyDay} 1/${monthlyInterval} ? *` : `0 ${m} ${h} ? 1/${monthlyInterval} ${monthlyWeekday}#${monthlyOrdinal} *`;
      case "yearly": return yearlyKind === "day" ? `0 ${m} ${h} ${yearlyDay} ${yearlyMonth} ? *` : `0 ${m} ${h} ? ${yearlyMonth} ${yearlyWeekday}#${yearlyOrdinal} *`;
    }
  }, [mode, minutesInterval, hourlyKind, hourlyInterval, dailyKind, time, weekdays, monthlyKind, monthlyDay, monthlyInterval, monthlyOrdinal, monthlyWeekday, yearlyKind, yearlyMonth, yearlyDay, yearlyOrdinal, yearlyWeekday]);

  const cron = generated || expression;
  const dates = useMemo(() => nextDates(cron), [cron]);
  const clearGenerated = () => setGenerated("");
  const changeMode = (next: Mode) => { setMode(next); clearGenerated(); };

  const radio = (checked: boolean, onChange: () => void) => <input type="radio" checked={checked} onChange={onChange} />;
  const timeFields = <div style={{ display: "flex", alignItems: "center", gap: 6 }}><select aria-label="Hour" value={String(timeParts(time).h)} onChange={(e) => { const { m } = timeParts(time); setTime(`${e.target.value}:${pad(m)}`); clearGenerated(); }}>{[12, ...selectOptions(1, 11)].map((n) => <option key={n} value={n}>{pad(n)}</option>)}</select><span>:</span><select aria-label="Minute" value={String(timeParts(time).m)} onChange={(e) => { const { h } = timeParts(time); setTime(`${pad(h)}:${pad(Number(e.target.value))}`); clearGenerated(); }}>{selectOptions(0, 59).map((n) => <option key={n} value={n}>{pad(n)}</option>)}</select></div>;

  return <div className="cron-generator">
    <h2 style={{ marginBottom: 10, fontStyle: "italic" }}>Generate cron expression</h2>
    <section className="tool-panel" style={{ padding: 0, overflow: "hidden" }}>
      <div role="tablist" aria-label="Cron schedule type" style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid var(--border-strong)", background: "var(--bg-elevated)" }}>
        {modes.map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => changeMode(id)} style={{ flex: "1 0 145px", minHeight: 72, padding: "14px 18px", border: 0, borderRight: "1px solid var(--border-strong)", borderRadius: mode === id ? "8px 8px 0 0" : 0, background: mode === id ? "var(--bg-elevated-hover)" : "transparent", color: mode === id ? "var(--text-primary)" : "#3478f6", fontSize: "1.35rem", cursor: "pointer" }}>{label}</button>)}
      </div>

      <div style={{ minHeight: 300, padding: "34px 42px" }}>
        {mode === "minutes" && <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: "1.25rem" }}><span>Every</span><select aria-label="Minutes interval" value={minutesInterval} onChange={(e) => { setMinutesInterval(Number(e.target.value)); clearGenerated(); }}>{selectOptions(1, 59).map((n) => <option key={n} value={n}>{n}</option>)}</select><span>minute(s)</span></div>}

        {mode === "hourly" && <div style={{ display: "grid", gap: 24, fontSize: "1.25rem" }}><label style={{ display: "flex", alignItems: "center", gap: 10 }}>{radio(hourlyKind === "every", () => { setHourlyKind("every"); clearGenerated(); })}<span>Every</span><select value={hourlyInterval} disabled={hourlyKind !== "every"} onChange={(e) => { setHourlyInterval(Number(e.target.value)); clearGenerated(); }}>{selectOptions(1, 23).map((n) => <option key={n} value={n}>{n}</option>)}</select><span>hour(s)</span></label><label style={{ display: "flex", alignItems: "center", gap: 10 }}>{radio(hourlyKind === "starts", () => { setHourlyKind("starts"); clearGenerated(); })}<span>Starts at</span>{timeFields}</label></div>}

        {mode === "daily" && <div style={{ display: "grid", gap: 24, fontSize: "1.25rem" }}><label style={{ display: "flex", alignItems: "center", gap: 10 }}>{radio(dailyKind === "everyday", () => { setDailyKind("everyday"); clearGenerated(); })}<span>Everyday</span></label><label style={{ display: "flex", alignItems: "center", gap: 10 }}>{radio(dailyKind === "weekday", () => { setDailyKind("weekday"); clearGenerated(); })}<span>Every weekday</span></label><label style={{ display: "flex", alignItems: "center", gap: 8 }}>Starts at : {timeFields}</label></div>}

        {mode === "weekly" && <div style={{ display: "grid", gap: 22, fontSize: "1.2rem" }}><div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(150px, 1fr))", columnGap: 38, rowGap: 22 }}>{days.map((day, index) => <label key={day} style={{ display: "flex", alignItems: "center", gap: 8 }}>{<input type="checkbox" checked={weekdays.includes(day)} onChange={() => { setWeekdays(weekdays.includes(day) ? weekdays.filter((d) => d !== day) : [...weekdays, day]); clearGenerated(); }} />}<span>{dayLabels[index]}</span></label>)}</div><label style={{ display: "flex", alignItems: "center", gap: 8 }}>Starts at : {timeFields}</label></div>}

        {mode === "monthly" && <div style={{ display: "grid", gap: 24, fontSize: "1.2rem" }}><label style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{radio(monthlyKind === "day", () => { setMonthlyKind("day"); clearGenerated(); })}<span>Day</span><input type="number" min={1} max={31} value={monthlyDay} disabled={monthlyKind !== "day"} onChange={(e) => { setMonthlyDay(Number(e.target.value)); clearGenerated(); }} style={{ width: 165 }} /><span>of every</span><select value={monthlyInterval} disabled={monthlyKind !== "day"} onChange={(e) => { setMonthlyInterval(Number(e.target.value)); clearGenerated(); }}>{selectOptions(1, 12).map((n) => <option key={n} value={n}>{n}</option>)}</select><span>month(s)</span></label><label style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{radio(monthlyKind === "weekday", () => { setMonthlyKind("weekday"); clearGenerated(); })}<span>The</span><select value={monthlyOrdinal} disabled={monthlyKind !== "weekday"} onChange={(e) => { setMonthlyOrdinal(Number(e.target.value)); clearGenerated(); }}>{ordinals.map((n, i) => <option key={n} value={i + 1}>{n}</option>)}</select><select value={monthlyWeekday} disabled={monthlyKind !== "weekday"} onChange={(e) => { setMonthlyWeekday(Number(e.target.value)); clearGenerated(); }}>{dayLabels.map((n, i) => <option key={n} value={i + 1}>{n}</option>)}</select><span>of every</span><select value={monthlyInterval} disabled={monthlyKind !== "weekday"} onChange={(e) => { setMonthlyInterval(Number(e.target.value)); clearGenerated(); }}>{selectOptions(1, 12).map((n) => <option key={n} value={n}>{n}</option>)}</select><span>month(s)</span></label><label style={{ display: "flex", alignItems: "center", gap: 8 }}>Starts at : {timeFields}</label></div>}

        {mode === "yearly" && <div style={{ display: "grid", gap: 24, fontSize: "1.2rem" }}><label style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{radio(yearlyKind === "day", () => { setYearlyKind("day"); clearGenerated(); })}<span>Every</span><select value={yearlyMonth} disabled={yearlyKind !== "day"} onChange={(e) => { setYearlyMonth(Number(e.target.value)); clearGenerated(); }}>{months.map((n, i) => <option key={n} value={i + 1}>{n}</option>)}</select><input type="number" min={1} max={31} value={yearlyDay} disabled={yearlyKind !== "day"} onChange={(e) => { setYearlyDay(Number(e.target.value)); clearGenerated(); }} style={{ width: 165 }} /></label><label style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{radio(yearlyKind === "weekday", () => { setYearlyKind("weekday"); clearGenerated(); })}<span>The</span><select value={yearlyOrdinal} disabled={yearlyKind !== "weekday"} onChange={(e) => { setYearlyOrdinal(Number(e.target.value)); clearGenerated(); }}>{ordinals.map((n, i) => <option key={n} value={i + 1}>{n}</option>)}</select><select value={yearlyWeekday} disabled={yearlyKind !== "weekday"} onChange={(e) => { setYearlyWeekday(Number(e.target.value)); clearGenerated(); }}>{dayLabels.map((n, i) => <option key={n} value={i + 1}>{n}</option>)}</select><span>of</span><select value={yearlyMonth} disabled={yearlyKind !== "weekday"} onChange={(e) => { setYearlyMonth(Number(e.target.value)); clearGenerated(); }}>{months.map((n, i) => <option key={n} value={i + 1}>{n}</option>)}</select></label><label style={{ display: "flex", alignItems: "center", gap: 8 }}>Starts at : {timeFields}</label></div>}
      </div>

      <div style={{ borderTop: "1px solid var(--border-strong)", padding: "24px 42px", background: "var(--bg-elevated)" }}><button type="button" className="tool-button" onClick={() => setGenerated(expression)}>Generate</button></div>
    </section>

    <section className="calculator-result" style={{ marginTop: 20 }}><div className="result-primary"><span>Generated Quartz cron expression</span><strong style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", wordBreak: "break-all" }}>{cron}</strong></div><button type="button" className="tool-button secondary" onClick={() => navigator.clipboard?.writeText(cron)}>Copy</button></section>
    <section className="calculator-result" style={{ marginTop: 18 }}><div className="result-primary"><span>Next scheduled dates</span>{dates.length ? <ol style={{ margin: "8px 0 0", paddingLeft: 22 }}>{dates.map((d) => <li key={d.toISOString()}>{d.toLocaleString()}</li>)}</ol> : <p className="tool-disclaimer">No upcoming dates could be calculated.</p>}</div></section>
  </div>;
}
