"use client";

import { useState } from "react";

function createUuid() {
  return crypto.randomUUID();
}

export function UuidGenerator() {
  const [uuid, setUuid] = useState(createUuid);

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
