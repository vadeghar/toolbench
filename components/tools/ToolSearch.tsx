"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { tools } from "@/lib/tools/registry";
import { searchTools } from "@/lib/tools/search";

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTools(tools, query), [query]);
  const searching = query.trim().length > 0;

  return (
    <div className="global-tool-search">
      <div className="global-tool-search-box">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools..."
          aria-label="Search tools"
        />
        <kbd>⌘K</kbd>
      </div>
      {searching && (
        <div className="global-tool-search-results" role="listbox" aria-label="Matching tools">
          {results.length > 0 ? results.map((tool) => (
            <Link key={tool.slug} href={tool.href} className="global-tool-search-result" onClick={() => setQuery("")}>
              <span>
                <strong>{tool.name}</strong>
                <small>{tool.description}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          )) : (
            <div className="global-tool-search-empty">No matching tools</div>
          )}
        </div>
      )}
    </div>
  );
}
