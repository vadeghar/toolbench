"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { tools } from "@/lib/tools/registry";
import { searchTools } from "@/lib/tools/search";
import styles from "./ToolSearch.module.css";

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTools(tools, query), [query]);
  const searching = query.trim().length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.box}>
        <span aria-hidden="true">⌕</span>
        <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools..." aria-label="Search tools" />
        <kbd>⌘K</kbd>
      </div>
      {searching && (
        <div className={styles.results} role="listbox" aria-label="Matching tools">
          {results.length > 0 ? results.map((tool) => (
            <Link key={tool.slug} href={tool.href} className={styles.result} onClick={() => setQuery("")}>
              <span><strong>{tool.name}</strong><small>{tool.description}</small></span><span aria-hidden="true">→</span>
            </Link>
          )) : <div className={styles.empty}>No matching tools</div>}
        </div>
      )}
    </div>
  );
}
