"use client";

import { useMemo, useState } from "react";

export function UnixTimestampConverter() {
  const [value, setValue] = useState(String(Math.floor(Date.now() / 1000)));
  const [mode, setMode] = useState<"timestamp" | "date">("timestamp");
  const result = useMemo(() => {
    if (mode === "timestamp") {
      const timestamp = Number(value);
      if (!Number.isFinite(timestamp)) return "Enter a valid Unix timestamp.";
      const date = new Date(timestamp * 1000);
      return Number.isNaN(date.getTime()) ? "Invalid timestamp." : date.toISOString();
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Enter a valid date/time.";
    return String(Math.floor(date.getTime() / 1000));
  }, [value, mode]);

  return <section className="tool-panel calculator-stack"><div className="formatter-toolbar"><label>Convert</label><select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}><option value="timestamp">Unix timestamp → Date</option><option value="date">Date → Unix timestamp</option></select></div><label className="calculator-field">{mode === "timestamp" ? "Unix timestamp" : "Date / time"}<input type={mode === "timestamp" ? "number" : "datetime-local"} value={value} onChange={(e) => setValue(e.target.value)} /></label><div className="calculator-result"><span>Result</span><strong>{result}</strong></div></section>;
}

const zones = ["UTC", "Asia/Kolkata", "America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Tokyo", "Australia/Sydney"];

export function TimeZoneConverter() {
  const [value, setValue] = useState("2026-08-21T19:30");
  const [from, setFrom] = useState("Asia/Kolkata");
  const [to, setTo] = useState("UTC");
  const result = useMemo(() => {
    try {
      const parts = value.split(/[T:-]/).map(Number);
      if (parts.length < 5 || parts.some(Number.isNaN)) return "Enter a valid date and time.";
      const [year, month, day, hour, minute] = parts;
      const source = new Date(Date.UTC(year, month - 1, day, hour, minute));
      const sourceFormatter = new Intl.DateTimeFormat("en-US", { timeZone: from, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
      const sourceParts = Object.fromEntries(sourceFormatter.formatToParts(source).map((p) => [p.type, p.value]));
      const asUtc = Date.UTC(Number(sourceParts.year), Number(sourceParts.month) - 1, Number(sourceParts.day), Number(sourceParts.hour) % 24, Number(sourceParts.minute));
      const target = new Date(asUtc);
      return new Intl.DateTimeFormat("en-US", { timeZone: to, dateStyle: "full", timeStyle: "short" }).format(target);
    } catch {
      return "Unable to convert this time zone.";
    }
  }, [value, from, to]);

  return <section className="tool-panel calculator-stack"><label className="calculator-field">Date and time<input type="datetime-local" value={value} onChange={(e) => setValue(e.target.value)} /></label><div className="date-tool-grid"><label className="calculator-field">From<select value={from} onChange={(e) => setFrom(e.target.value)}>{zones.map((zone) => <option key={zone}>{zone}</option>)}</select></label><label className="calculator-field">To<select value={to} onChange={(e) => setTo(e.target.value)}>{zones.map((zone) => <option key={zone}>{zone}</option>)}</select></label></div><div className="calculator-result"><span>Converted time</span><strong>{result}</strong></div></section>;
}
