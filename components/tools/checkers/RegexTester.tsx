"use client";

import { useMemo, useState } from "react";

type Match = { text: string; index: number };

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b[A-Z][a-z]+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Alice met Bob in Hyderabad.");

  const result = useMemo(() => {
    if (!pattern) return { error: "Enter a regular expression.", matches: [] as Match[], highlighted: escapeHtml(text) };
    try {
      const regex = new RegExp(pattern, flags);
      const matches: Match[] = [];
      if (regex.global) {
        for (const match of text.matchAll(regex)) matches.push({ text: match[0], index: match.index ?? 0 });
      } else {
        const match = regex.exec(text);
        if (match) matches.push({ text: match[0], index: match.index });
      }
      let cursor = 0;
      const highlighted = matches.map((match) => {
        const before = escapeHtml(text.slice(cursor, match.index));
        cursor = match.index + match.text.length;
        return `${before}<mark>${escapeHtml(match.text)}</mark>`;
      }).join("") + escapeHtml(text.slice(cursor));
      return { error: "", matches, highlighted };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Invalid regular expression.", matches: [] as Match[], highlighted: escapeHtml(text) };
    }
  }, [pattern, flags, text]);

  return (
    <div className="calculator-stack">
      <section className="tool-panel" aria-label="Regular expression tester inputs">
        <div className="calculator-field">
          <label htmlFor="regex-pattern">Regular expression</label>
          <input id="regex-pattern" type="text" value={pattern} onChange={(event) => setPattern(event.target.value)} placeholder="\\d+" spellCheck={false} autoComplete="off" />
        </div>
        <div className="calculator-field">
          <label htmlFor="regex-flags">Flags</label>
          <input id="regex-flags" type="text" value={flags} onChange={(event) => setFlags(event.target.value)} placeholder="gim" spellCheck={false} autoComplete="off" />
        </div>
        <div className="calculator-field">
          <label htmlFor="regex-test-text">Test string</label>
          <textarea id="regex-test-text" rows={7} value={text} onChange={(event) => setText(event.target.value)} spellCheck={false} />
        </div>
      </section>

      {result.error ? (
        <section className="calculator-result" role="alert">
          <strong>Invalid regular expression</strong>
          <p>{result.error}</p>
        </section>
      ) : (
        <>
          <section className="calculator-result" aria-live="polite">
            <div className="result-primary"><span>Matches</span><strong>{result.matches.length}</strong></div>
            <div className="result-grid">
              <div><span>Pattern</span><strong>{`/${pattern}/${flags}`}</strong></div>
              <div><span>Mode</span><strong>{flags.includes("g") ? "All matches" : "First match"}</strong></div>
            </div>
          </section>
          <section className="tool-content regex-preview" aria-label="Highlighted matches">
            <h2>Match preview</h2>
            <pre dangerouslySetInnerHTML={{ __html: result.highlighted }} />
          </section>
        </>
      )}
    </div>
  );
}
