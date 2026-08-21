"use client";

import { useState } from "react";

function encode(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function decode(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  let output = "";
  let error = "";

  try {
    output = mode === "encode" ? encode(input) : decode(input);
  } catch {
    error = "The input cannot be decoded as valid Base64.";
  }

  return (
    <div className="calculator-stack">
      <section className="tool-panel">
        <div className="formatter-toolbar">
          <label htmlFor="base64-mode">Mode</label>
          <select id="base64-mode" value={mode} onChange={(e) => setMode(e.target.value as "encode" | "decode")}>
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
          <button type="button" className="tool-button secondary" onClick={() => setInput("")}>Clear</button>
        </div>
        <div className="json-editor-grid">
          <div>
            <label className="editor-label" htmlFor="base64-input">Input</label>
            <textarea id="base64-input" value={input} onChange={(e) => setInput(e.target.value)} rows={10} spellCheck={false} />
          </div>
          <div>
            <label className="editor-label" htmlFor="base64-output">Output</label>
            <textarea id="base64-output" value={output} readOnly rows={10} spellCheck={false} />
          </div>
        </div>
      </section>
      {error && <p className="validation-error" role="alert">{error}</p>}
    </div>
  );
}
