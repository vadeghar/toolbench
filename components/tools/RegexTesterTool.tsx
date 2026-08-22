"use client";

import { useMemo, useState } from "react";
import { RegExpParser } from "@eslint-community/regexpp";

const QUICK_REFERENCE = [
  ["[abc]", "Character class — one character from a, b, or c"],
  ["[^abc]", "Negated character class — one character except a, b, or c"],
  ["[a-z]", "Character range — one character from a through z"],
  [".", "Any character except line terminators"],
  ["a|b", "Alternation — match either a or b"],
  ["\\d", "Any digit"],
  ["\\D", "Any non-digit"],
  ["\\w", "Any word character"],
  ["\\W", "Any non-word character"],
  ["\\s", "Any whitespace character"],
  ["^", "Start of input or line with multiline mode"],
  ["$", "End of input or line with multiline mode"],
  ["\\b", "Word boundary"],
  ["(...) ", "Capturing group"],
  ["(?:...)", "Non-capturing group"],
  ["a?", "Zero or one of a"],
  ["a*", "Zero or more of a"],
  ["a+", "One or more of a"],
  ["a{3}", "Exactly three of a"],
  ["a{3,}", "Three or more of a"],
  ["a{3,6}", "Between three and six of a"],
];

const FLAG_INFO: Record<string, string> = {
  g: "Global — find all matches",
  i: "Ignore case",
  m: "Multiline — ^ and $ match line boundaries",
  s: "DotAll — . also matches line terminators",
  u: "Unicode mode",
  v: "Unicode sets mode",
  y: "Sticky — match only at lastIndex",
};

function parseFlags(flags: string) {
  return {
    unicode: flags.includes("u"),
    unicodeSets: flags.includes("v"),
  };
}

function explainPattern(pattern: string, flags: string): string[] {
  try {
    const parser = new RegExpParser();
    const ast = parser.parsePattern(pattern, 0, pattern.length, parseFlags(flags)) as unknown as Record<string, unknown>;
    const explanations: string[] = [];
    const seen = new Set<string>();

    const add = (key: string, text: string) => {
      if (!seen.has(key)) {
        seen.add(key);
        explanations.push(text);
      }
    };

    const visit = (node: unknown) => {
      if (!node || typeof node !== "object") return;
      const n = node as Record<string, unknown>;
      const type = String(n.type ?? "");
      const raw = typeof n.raw === "string" ? n.raw : "";

      switch (type) {
        case "CharacterClass":
          add(`class:${raw}`, raw.startsWith("[^") ? `${raw} — matches one character not present in this character class` : `${raw} — matches one character present in this character class`);
          break;
        case "CharacterClassRange":
          add(`range:${raw}`, `${raw} — matches one character in this range`);
          break;
        case "CharacterSet":
          add(`set:${raw}`, `${raw} — predefined character set`);
          break;
        case "Assertion":
          if (raw === "^") add("assert:^", "^ asserts the position at the start of the input or line");
          else if (raw === "$") add("assert:$", "$ asserts the position at the end of the input or line");
          else if (raw === "\\b") add("assert:\\b", "\\b asserts a word boundary");
          else if (raw === "\\B") add("assert:\\B", "\\B asserts a non-word boundary");
          else if (raw) add(`assert:${raw}`, `${raw} — zero-width assertion`);
          break;
        case "Quantifier":
          if (raw) add(`quant:${raw}`, `${raw} — controls how many times the preceding token is matched`);
          break;
        case "CapturingGroup":
          add(`capture:${raw}`, `${raw || "(...)"} — capturing group`);
          break;
        case "Group":
          add(`group:${raw}`, `${raw || "(?:...)"} — non-capturing group`);
          break;
        case "Backreference":
          add(`backref:${raw}`, `${raw} — matches the text captured by an earlier group`);
          break;
        case "Character":
          if (raw && !/^[A-Za-z0-9 _.,:;!?-]$/.test(raw)) add(`char:${raw}`, `${raw} — escaped or special character`);
          break;
      }

      for (const value of Object.values(n)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") visit(value);
      }
    };

    visit(ast);
    return explanations.length ? explanations : ["The expression is valid and contains literal characters or simple tokens."];
  } catch {
    return [];
  }
}

function buildMatches(pattern: string, flags: string, text: string) {
  if (!pattern) return { error: "Enter a regular expression pattern.", matches: [] as Array<{ index: number; end: number; value: string; groups: string[] }> };
  try {
    const regex = new RegExp(pattern, flags);
    const matches: Array<{ index: number; end: number; value: string; groups: string[] }> = [];

    if (flags.includes("g")) {
      for (const match of text.matchAll(regex)) {
        matches.push({ index: match.index ?? 0, end: (match.index ?? 0) + match[0].length, value: match[0], groups: match.slice(1).map((group) => group ?? "") });
      }
    } else {
      const match = regex.exec(text);
      if (match) matches.push({ index: match.index, end: match.index + match[0].length, value: match[0], groups: match.slice(1).map((group) => group ?? "") });
    }

    return { error: "", matches };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Invalid regular expression.", matches: [] };
  }
}

function highlightMatches(text: string, matches: Array<{ index: number; end: number }>) {
  if (!text) return "";
  if (!matches.length) return text;
  const parts: Array<{ value: string; match: boolean }> = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.index > cursor) parts.push({ value: text.slice(cursor, match.index), match: false });
    parts.push({ value: text.slice(match.index, match.end), match: true });
    cursor = match.end;
  }
  if (cursor < text.length) parts.push({ value: text.slice(cursor), match: false });
  return parts;
}

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("\\b[A-Z][a-z]+\\b");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Alice met Bob in Hyderabad.");
  const [referenceSearch, setReferenceSearch] = useState("");

  const analysis = useMemo(() => {
    const matches = buildMatches(pattern, flags, testString);
    let parserError = "";
    if (pattern) {
      try {
        new RegExpParser().parsePattern(pattern, 0, pattern.length, parseFlags(flags));
      } catch (error) {
        parserError = error instanceof Error ? error.message : "Pattern error";
      }
    }
    return {
      ...matches,
      parserError,
      explanation: parserError ? [] : explainPattern(pattern, flags),
      highlighted: highlightMatches(testString, matches.matches),
    };
  }, [pattern, flags, testString]);

  const filteredReference = QUICK_REFERENCE.filter(([token, description]) => {
    const query = referenceSearch.trim().toLowerCase();
    return !query || token.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  });

  const toggleFlag = (flag: string) => {
    setFlags((current) => current.includes(flag) ? current.replace(flag, "") : `${current}${flag}`);
  };

  return (
    <div className="calculator-stack">
      <section className="tool-panel">
        <div className="editor-label-row">
          <span className="editor-label">Regular Expression</span>
          <span className={`validation-status ${analysis.parserError ? "invalid" : "valid"}`}>
            {analysis.parserError ? `Error · ${analysis.parserError}` : "Pattern valid"}
          </span>
        </div>

        <div className="input-with-prefix" style={{ marginTop: 10 }}>
          <span>/</span>
          <input
            aria-label="Regular expression"
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            spellCheck={false}
            placeholder="insert your regular expression here"
          />
          <span>/</span>
          <strong style={{ color: "var(--accent-teal)", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>{flags || "—"}</strong>
        </div>

        <div className="formatter-toolbar" style={{ marginTop: 12 }}>
          {Object.keys(FLAG_INFO).map((flag) => (
            <label key={flag} style={{ display: "inline-flex", alignItems: "center", gap: 7, color: flags.includes(flag) ? "var(--text-primary)" : "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.78rem" }} title={FLAG_INFO[flag]}>
              <input type="checkbox" checked={flags.includes(flag)} onChange={() => toggleFlag(flag)} />
              {flag}
            </label>
          ))}
        </div>

        {analysis.parserError && <p className="validation-error">{analysis.parserError}</p>}
      </section>

      <section className="tool-panel">
        <div className="editor-label-row">
          <span className="editor-label">Test String</span>
          <span className="validation-status valid">Matches · {analysis.matches.length}</span>
        </div>
        <textarea value={testString} onChange={(event) => setTestString(event.target.value)} spellCheck={false} placeholder="Enter text to test against the pattern..." style={{ marginTop: 10, minHeight: 220 }} />
        <div className="regex-preview">
          <span className="editor-label">Match Preview</span>
          <pre>{Array.isArray(analysis.highlighted) ? analysis.highlighted.map((part, index) => part.match ? <mark key={index}>{part.value}</mark> : <span key={index}>{part.value}</span>) : analysis.highlighted}</pre>
        </div>
      </section>

      <section className="json-editor-grid">
        <div className="tool-panel">
          <div className="editor-label-row">
            <span className="editor-label">Explanation</span>
            <span className="validation-status valid">ECMAScript</span>
          </div>
          <div className="calculator-stack" style={{ marginTop: 14 }}>
            {analysis.explanation.length ? analysis.explanation.map((item, index) => <p key={index} style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.65 }}>{item}</p>) : <p className="validation-error" style={{ margin: 0 }}>The regular expression contains one or more errors.</p>}
          </div>
        </div>

        <div className="tool-panel">
          <div className="editor-label-row">
            <span className="editor-label">Match Information</span>
            <span className="validation-status valid">{analysis.matches.length ? `${analysis.matches.length} match${analysis.matches.length === 1 ? "" : "es"}` : "No matches"}</span>
          </div>
          <div className="calculator-stack" style={{ marginTop: 14 }}>
            {analysis.error ? <p className="validation-error" style={{ margin: 0 }}>{analysis.error}</p> : analysis.matches.length ? analysis.matches.map((match, index) => (
              <div key={`${match.index}-${index}`} style={{ padding: "12px 0", borderTop: index ? "1px solid var(--border)" : undefined }}>
                <strong>Match {index + 1}</strong>
                <div style={{ marginTop: 6, color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>{match.index}–{match.end} · {JSON.stringify(match.value)}</div>
                {match.groups.length > 0 && <div style={{ marginTop: 6, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>{match.groups.map((group, groupIndex) => `Group ${groupIndex + 1}: ${JSON.stringify(group)}`).join(" · ")}</div>}
              </div>
            )) : <p style={{ margin: 0, color: "var(--text-secondary)" }}>Your regular expression does not match the test string.</p>}
          </div>
        </div>
      </section>

      <section className="tool-panel">
        <div className="editor-label-row">
          <span className="editor-label">Quick Reference</span>
          <input type="search" value={referenceSearch} onChange={(event) => setReferenceSearch(event.target.value)} placeholder="Search reference..." style={{ maxWidth: 260, minHeight: 38 }} />
        </div>
        <div className="calculator-stack" style={{ marginTop: 14 }}>
          {filteredReference.map(([token, description]) => (
            <div key={token} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, padding: "9px 0", borderTop: "1px solid var(--border)" }}>
              <code style={{ color: "var(--accent-violet)", fontFamily: "var(--font-mono)" }}>{token}</code>
              <span style={{ color: "var(--text-secondary)" }}>{description}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
