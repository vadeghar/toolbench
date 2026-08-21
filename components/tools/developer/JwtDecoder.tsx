"use client";

import { useMemo, useState } from "react";

function decodePart(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return JSON.parse(decodeURIComponent(escape(atob(padded)))) as unknown;
}

export function JwtDecoder() {
  const [token, setToken] = useState("");

  const result = useMemo(() => {
    if (!token.trim()) return { header: "", payload: "", error: "" };
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { header: "", payload: "", error: "A JWT must contain three dot-separated parts." };

    try {
      return {
        header: JSON.stringify(decodePart(parts[0]), null, 2),
        payload: JSON.stringify(decodePart(parts[1]), null, 2),
        error: "",
      };
    } catch {
      return { header: "", payload: "", error: "The token contains an invalid Base64URL or JSON segment." };
    }
  }, [token]);

  return (
    <div className="calculator-stack">
      <section className="tool-panel">
        <label className="editor-label" htmlFor="jwt-token">JWT</label>
        <textarea id="jwt-token" value={token} onChange={(e) => setToken(e.target.value)} rows={8} spellCheck={false} placeholder="Paste a JWT here" />
      </section>
      {result.error ? (
        <p className="validation-error" role="alert">{result.error}</p>
      ) : result.header ? (
        <section className="json-editor-grid">
          <div className="tool-panel"><label className="editor-label" htmlFor="jwt-header">Header</label><textarea id="jwt-header" value={result.header} readOnly rows={12} /></div>
          <div className="tool-panel"><label className="editor-label" htmlFor="jwt-payload">Payload</label><textarea id="jwt-payload" value={result.payload} readOnly rows={12} /></div>
        </section>
      ) : null}
      <p className="tool-disclaimer">Decoding does not verify the JWT signature. Do not paste sensitive tokens into a third-party service.</p>
    </div>
  );
}
