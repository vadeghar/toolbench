"use client";

import { useMemo, useState } from "react";

const SAMPLE_JSON = '{\n  "name": "Toolbench",\n  "tools": ["SIP Calculator", "JSON Formatter"]\n}';

export function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { valid: null as null, output: "", message: "" };

    try {
      const parsed: unknown = JSON.parse(input);
      return {
        valid: true as const,
        output: JSON.stringify(parsed, null, indent),
        message: "Valid JSON",
      };
    } catch (error) {
      return {
        valid: false as const,
        output: "",
        message: error instanceof Error ? error.message : "Invalid JSON",
      };
    }
  }, [input, indent]);

  async function copyOutput() {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="formatter-stack">
      <section className="tool-panel json-panel">
        <div className="formatter-toolbar">
          <label htmlFor="json-indent">Indent</label>
          <select id="json-indent" value={indent} onChange={(event) => setIndent(Number(event.target.value))}>
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Compact</option>
          </select>
          <button type="button" className="tool-button secondary" onClick={() => setInput("")}>Clear</button>
          <button type="button" className="tool-button" onClick={copyOutput} disabled={!result.output}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="json-editor-grid">
          <div>
            <label className="editor-label" htmlFor="json-input">Input JSON</label>
            <textarea
              id="json-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
              placeholder="Paste JSON here..."
            />
          </div>
          <div>
            <div className="editor-label-row">
              <span className="editor-label">Formatted output</span>
              {result.valid !== null && <span className={`validation-status ${result.valid ? "valid" : "invalid"}`}>{result.message}</span>}
            </div>
            <textarea value={result.output} readOnly spellCheck={false} placeholder="Formatted JSON appears here..." />
          </div>
        </div>
      </section>

      {!result.valid && result.message && <p className="validation-error">{result.message}</p>}
    </div>
  );
}
