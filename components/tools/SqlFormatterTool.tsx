"use client";

import { useMemo, useState } from "react";

const SAMPLE_SQL = "SELECT c.CustomerName, o.OrderID, o.OrderDate FROM Customers c INNER JOIN Orders o ON c.CustomerID = o.CustomerID;";

function formatSql(sql: string) {
  const normalized = sql.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized) return "";

  const placeholders: string[] = [];
  const protectedSql = normalized.replace(/'(?:''|[^'])*'|"(?:""|[^"])*"|`(?:``|[^`])*`/g, (value) => {
    const index = placeholders.push(value) - 1;
    return `__SQL_STRING_${index}__`;
  });

  let result = protectedSql;

  result = result.replace(/\s*,\s*/g, ", ");

  const clauses = [
    "UNION ALL", "UNION", "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET",
  ];
  for (const clause of clauses) {
    const escaped = clause.replace(/ /g, "\\s+");
    result = result.replace(new RegExp(`\\s+(${escaped})\\s+`, "gi"), "\\n$1 ");
  }

  const joins = ["LEFT OUTER JOIN", "RIGHT OUTER JOIN", "FULL OUTER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "INNER JOIN", "CROSS JOIN", "JOIN"];
  for (const join of joins) {
    const escaped = join.replace(/ /g, "\\s+");
    result = result.replace(new RegExp(`\\s+(${escaped})\\s+`, "gi"), "\\n$1 ");
  }

  result = result.replace(/\s+(AND|OR)\s+/gi, "\\n    $1 ");
  result = result.replace(/\s*;\s*$/g, ";");
  result = result.replace(/[ \t]+\n/g, "\n").replace(/\n{2,}/g, "\n").trim();

  result = result.replace(/\b(select|from|where|group by|having|order by|limit|offset|union all|union|left outer join|right outer join|full outer join|left join|right join|full join|inner join|cross join|join|and|or)\b/gi, (keyword) => keyword.toUpperCase());

  result = result.replace(/__SQL_STRING_(\d+)__/g, (_, index: string) => placeholders[Number(index)] ?? "");

  return result.endsWith(";") ? result : `${result};`;
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
          <button type="button" className="tool-button" onClick={copyOutput} disabled={!output}>
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
