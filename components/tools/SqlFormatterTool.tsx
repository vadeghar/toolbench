"use client";

import { useMemo, useState } from "react";
import { format } from "sql-formatter";

const SAMPLE_SQL = "SELECT c.CustomerName, o.OrderID, o.OrderDate FROM Customers c INNER JOIN Orders o ON c.CustomerID = o.CustomerID;";

function formatSql(sql: string) {
  if (!sql.trim()) return "";

  try {
    return format(sql, {
      language: "sql",
      keywordCase: "upper",
      tabWidth: 2,
      useTabs: false,
      indentStyle: "tabularLeft",
      logicalOperatorNewline: "before",
      expressionWidth: 1000,
      linesBetweenQueries: 1,
      newlineBeforeSemicolon: false,
    }).trim();
  } catch {
    return "Unable to format SQL. Please check the SQL syntax and try again.";
  }
}

export function SqlFormatterTool() {
  const [input, setInput] = useState(SAMPLE_SQL);
  const [copied, setCopied] = useState(false);
  const output = useMemo(() => formatSql(input), [input]);

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="formatter-stack">
      <section className="tool-panel">
        <div className="formatter-toolbar">
          <button type="button" className="tool-button secondary" onClick={() => setInput("")}>Clear</button>
          <button type="button" className="tool-button" onClick={copyOutput} disabled={!output || output.startsWith("Unable to format SQL")}> 
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="json-editor-grid">
          <div>
            <label className="editor-label" htmlFor="sql-input">SQL Input</label>
            <textarea id="sql-input" value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} placeholder="Paste SQL here..." />
          </div>
          <div>
            <label className="editor-label" htmlFor="sql-output">Formatted SQL</label>
            <textarea id="sql-output" value={output} readOnly spellCheck={false} placeholder="Formatted SQL appears here..." />
          </div>
        </div>
      </section>
    </div>
  );
}
