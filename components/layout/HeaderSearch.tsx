"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { tools } from "../../lib/tools/registry";
import { searchTools } from "../../lib/tools/search";
import styles from "./HeaderSearch.module.css";

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => searchTools(tools, query), [query]);
  const searching = open && query.trim().length > 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = () => {
    setQuery("");
    setOpen(false);
  };

  return (
    <div className={styles.search} ref={containerRef}>
      <div className={styles.box}>
        <span aria-hidden="true">⌕</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          placeholder="Search tools…"
          aria-label="Search tools"
          className="search-textbox border-none"
        />
        <kbd>⌘K</kbd>
      </div>
      {searching && (
        <div className={styles.results} role="listbox" aria-label="Matching tools">
          {results.length > 0 ? (
            results.map((tool) => (
              <Link key={tool.slug} href={tool.href} className={styles.result} onClick={handleSelect}>
                <span>
                  <strong>{tool.name}</strong>
                  <small>{tool.description}</small>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))
          ) : (
            <div className={styles.empty}>No matching tools</div>
          )}
        </div>
      )}
    </div>
  );
}
