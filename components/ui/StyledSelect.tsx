"use client";

import { useEffect, useRef, useState } from "react";

export type StyledSelectOption = {
  value: string;
  label: string;
};

export type StyledSelectProps = {
  id: string;
  value: string;
  options: StyledSelectOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
};

export function StyledSelect({ id, value, options, onChange, ariaLabel }: StyledSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selected = options[selectedIndex] ?? options[0];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const nextIndex = event.key === "ArrowDown"
          ? (selectedIndex + 1) % options.length
          : (selectedIndex - 1 + options.length) % options.length;
        onChange(options[nextIndex].value);
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onChange, options, selectedIndex]);

  if (!selected) return null;

  return (
    <div ref={rootRef} className="styled-select" data-open={open}>
      <button
        id={id}
        type="button"
        className="styled-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected.label}</span>
        <span className="styled-select-chevron" aria-hidden="true" />
      </button>

      {open && (
        <div className="styled-select-menu" role="listbox" aria-labelledby={id}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`styled-select-option${isSelected ? " selected" : ""}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected && <span className="styled-select-check" aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
