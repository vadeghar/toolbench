"use client";

import { useState } from "react";

function createUuid() {
  // Avoid crypto.randomUUID() because some supported browsers/webviews do not expose it.
  const values = new Uint8Array(16);
  crypto.getRandomValues(values);
  values[6] = (values[6] & 0x0f) | 0x40;
  values[8] = (values[8] & 0x3f) | 0x80;

  const hex = Array.from(values, (value) => value.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

export function UuidGenerator() {
  const [uuid, setUuid] = useState(() => createUuid());

  return (
    <div className="calculator-stack">
      <section className="calculator-result" aria-live="polite">
        <div className="result-primary">
          <span>Generated UUID v4</span>
          <strong>{uuid}</strong>
        </div>
        <div className="formatter-toolbar">
          <button type="button" className="tool-button" onClick={() => setUuid(createUuid())}>Generate UUID</button>
          <button type="button" className="tool-button secondary" onClick={() => navigator.clipboard?.writeText(uuid)}>Copy</button>
        </div>
      </section>
      <p className="tool-disclaimer">UUIDs are generated locally in your browser using the Web Crypto API.</p>
    </div>
  );
}
