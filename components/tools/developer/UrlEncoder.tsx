"use client";

import { useState } from "react";

export function UrlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  let output = "";
  let error = "";
  try {
    output = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
  } catch {
    error = "The input is not valid URL-encoded text.";
  }

  return (
    <div className="calculator-stack">
      <section className="tool-panel">
        <div className="formatter-toolbar">
          <label htmlFor="url-mode">Mode</label>
          <select id="url-mode" value={mode} onChange={(e) => setMode(e.target.value as "encode" | "decode")}>
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
          <button type="button" className="tool-button secondary" onClick={() => setInput("")}>Clear</button>
        </div>
        <div className="json-editor-grid">
          <div>
            <label className="editor-label" htmlFor="url-input">Input</label>
            <textarea id="url-input" value={input} onChange={(e) => setInput(e.target.value)} rows={10} spellCheck={false} />
          </div>
          <div>
            <label className="editor-label" htmlFor="url-output">Output</label>
            <textarea id="url-output" value={output} readOnly rows={10} spellCheck={false} />
          </div>
        </div>
      </section>
      {error && <p className="validation-error" role="alert">{error}</p>}
    </div>
  );
}
