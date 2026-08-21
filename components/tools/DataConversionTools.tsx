"use client";

import { useMemo, useState } from "react";

function parseYaml(value: string) {
  const result: Record<string, unknown> = {};
  value.split(/\r?\n/).forEach((line) => { const match = line.match(/^\s*([^:#]+):\s*(.*)\s*$/); if (match) result[match[1].trim()] = match[2].trim(); });
  return result;
}

export function JsonYamlConverter() {
  const [mode, setMode] = useState<"json-yaml" | "yaml-json">("json-yaml");
  const [input, setInput] = useState('{"name":"Toolbench","active":true}');
  const output = useMemo(() => {
    try {
      if (mode === "json-yaml") { const object = JSON.parse(input) as Record<string, unknown>; return Object.entries(object).map(([key, value]) => `${key}: ${typeof value === "string" ? value : JSON.stringify(value)}`).join("\n"); }
      return JSON.stringify(parseYaml(input), null, 2);
    } catch { return "Invalid input."; }
  }, [input, mode]);
  return <section className="tool-panel calculator-stack"><div className="formatter-toolbar"><label>Direction</label><select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}><option value="json-yaml">JSON → YAML</option><option value="yaml-json">YAML → JSON</option></select></div><div className="json-editor-grid"><label><span className="editor-label">Input</span><textarea value={input} onChange={(e) => setInput(e.target.value)} /></label><label><span className="editor-label">Output</span><textarea value={output} readOnly /></label></div></section>;
}

function csvToJson(csv: string) { const rows = csv.trim().split(/\r?\n/).filter(Boolean).map((row) => row.split(",").map((cell) => cell.trim())); if (!rows.length) return []; const headers = rows[0]; return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ""]))); }
function jsonToCsv(value: unknown) { if (!Array.isArray(value) || !value.length || typeof value[0] !== "object") throw new Error("Expected a JSON array of objects."); const rows = value as Record<string, unknown>[]; const headers = Object.keys(rows[0]); return [headers.join(","), ...rows.map((row) => headers.map((header) => { const cell = String(row[header] ?? ""); return /[",\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell; }).join(","))].join("\n"); }

export function JsonCsvConverter() { const [mode, setMode] = useState<"json-csv" | "csv-json">("json-csv"); const [input, setInput] = useState('[{"name":"Toolbench","active":true}]'); const output = useMemo(() => { try { return mode === "json-csv" ? jsonToCsv(JSON.parse(input)) : JSON.stringify(csvToJson(input), null, 2); } catch { return "Invalid input."; } }, [input, mode]); return <section className="tool-panel calculator-stack"><div className="formatter-toolbar"><label>Direction</label><select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}><option value="json-csv">JSON → CSV</option><option value="csv-json">CSV → JSON</option></select></div><div className="json-editor-grid"><label><span className="editor-label">Input</span><textarea value={input} onChange={(e) => setInput(e.target.value)} /></label><label><span className="editor-label">Output</span><textarea value={output} readOnly /></label></div></section>; }

export function HtmlEntityConverter() { const [mode, setMode] = useState<"encode" | "decode">("encode"); const [input, setInput] = useState("<Toolbench & tools>"); const output = useMemo(() => { const textarea = document.createElement("textarea"); if (mode === "encode") { textarea.textContent = input; return textarea.innerHTML; } textarea.innerHTML = input; return textarea.value; }, [input, mode]); return <section className="tool-panel calculator-stack"><div className="formatter-toolbar"><label>Direction</label><select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}><option value="encode">Encode</option><option value="decode">Decode</option></select></div><label className="calculator-field">Input<textarea value={input} onChange={(e) => setInput(e.target.value)} /></label><label className="calculator-field">Output<textarea value={output} readOnly /></label></section>; }

export function UnicodeConverter({ ascii = false }: { ascii?: boolean }) { const [mode, setMode] = useState<"encode" | "decode">("encode"); const [input, setInput] = useState(ascii ? "Toolbench" : "Hello ✓"); const output = useMemo(() => { try { if (mode === "encode") return [...input].map((char) => (ascii ? char.charCodeAt(0) : `U+${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`)).join(" "); const codes = input.trim().split(/[\s,]+/); return codes.map((code) => String.fromCodePoint(ascii ? Number(code) : parseInt(code.replace(/^U\+/i, ""), 16))).join(""); } catch { return "Invalid character codes."; } }, [input, mode, ascii]); return <section className="tool-panel calculator-stack"><div className="formatter-toolbar"><label>Direction</label><select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}><option value="encode">Text → Codes</option><option value="decode">Codes → Text</option></select></div><label className="calculator-field">Input<textarea value={input} onChange={(e) => setInput(e.target.value)} /></label><label className="calculator-field">Output<textarea value={output} readOnly /></label></section>; }
