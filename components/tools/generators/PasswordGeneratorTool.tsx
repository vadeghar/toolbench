"use client";

import { useMemo, useState } from "react";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const AMBIGUOUS = /[O0lI1]/g;

type CharacterOptions = {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  ambiguous: boolean;
};

function randomInt(max: number) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function createPassword(length: number, options: CharacterOptions) {
  let pool = "";
  if (options.upper) pool += SETS.upper;
  if (options.lower) pool += SETS.lower;
  if (options.numbers) pool += SETS.numbers;
  if (options.symbols) pool += SETS.symbols;
  if (options.ambiguous) pool = pool.replace(AMBIGUOUS, "");

  if (!pool) return { value: "Select at least one character type", poolSize: 0 };

  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += pool[randomInt(pool.length)];
  }
  return { value, poolSize: pool.length };
}

function strength(poolSize: number, length: number) {
  const entropy = length * Math.log2(poolSize || 1);
  if (entropy < 40) return { percent: 25, label: "Weak", color: "var(--accent-coral)" };
  if (entropy < 60) return { percent: 50, label: "Fair", color: "var(--accent-brass)" };
  if (entropy < 90) return { percent: 75, label: "Strong", color: "var(--accent-teal)" };
  return { percent: 100, label: "Very strong", color: "var(--accent-violet)" };
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<CharacterOptions>({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
    ambiguous: false,
  });
  const [copied, setCopied] = useState(false);

  const generated = useMemo(() => createPassword(length, options), [length, options]);
  const strengthInfo = strength(generated.poolSize, length);

  async function copyPassword() {
    if (!generated.value || generated.poolSize === 0) return;
    try {
      await navigator.clipboard.writeText(generated.value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  function toggleOption(key: keyof CharacterOptions) {
    setOptions((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="calculator-stack">
      <section className="tool-panel calculator-stack" aria-label="Generated password">
        <div className="calculator-result">
          <div className="result-primary">
            <span>Generated password</span>
            <strong style={{ wordBreak: "break-all" }}>{generated.value}</strong>
          </div>
          <div className="result-grid">
            <button type="button" className="tool-button" onClick={copyPassword} disabled={generated.poolSize === 0}>
              {copied ? "Copied" : "Copy password"}
            </button>
            <div>
              <span>Strength</span>
              <strong style={{ color: strengthInfo.color }}>{strengthInfo.label}</strong>
            </div>
          </div>
          <div aria-hidden="true" style={{ height: 6, borderRadius: 999, background: "var(--bg)", overflow: "hidden" }}>
            <div style={{ width: `${strengthInfo.percent}%`, height: "100%", background: strengthInfo.color, transition: "width .15s ease" }} />
          </div>
        </div>
      </section>

      <section className="tool-panel calculator-stack" aria-label="Password options">
        <label className="calculator-field">
          Password length
          <input type="range" min="8" max="64" value={length} onChange={(event) => setLength(Number(event.target.value))} />
          <span className="tool-disclaimer">{length} characters</span>
        </label>

        <div className="result-grid">
          {([
            ["upper", "Uppercase letters (A–Z)"],
            ["lower", "Lowercase letters (a–z)"],
            ["numbers", "Numbers (0–9)"],
            ["symbols", "Symbols (!@#$%…)"],
            ["ambiguous", "Exclude ambiguous characters"],
          ] as Array<[keyof CharacterOptions, string]>).map(([key, label]) => (
            <label key={key} className="calculator-field" style={{ gridTemplateColumns: "1fr auto", alignItems: "center", gap: 12 }}>
              <span>{label}</span>
              <input type="checkbox" checked={options[key]} onChange={() => toggleOption(key)} />
            </label>
          ))}
        </div>

        <button type="button" className="tool-button" onClick={() => setLength((current) => current)}>
          Generate new password
        </button>
      </section>

      <section className="tool-content">
        <h2>What makes a password strong?</h2>
        <p>Password strength comes down to entropy — how many possible combinations an attacker would have to try. Length matters more than complexity, while character variety adds another layer of protection.</p>
        <p>Avoid reusing passwords across sites. If one service is breached, reused passwords can expose your other accounts too.</p>
        <div className="tool-faq-item">
          <h3>Is this password generator safe to use?</h3>
          <p>Yes. Passwords are generated in your browser using the Web Crypto API. Nothing is sent to a server by this tool.</p>
        </div>
        <div className="tool-faq-item">
          <h3>How long should my password be?</h3>
          <p>Longer passwords are generally stronger. Use a password manager where possible so unique, long passwords are practical.</p>
        </div>
        <div className="tool-faq-item">
          <h3>Should I include symbols?</h3>
          <p>Symbols can increase the available character space. If a site rejects a symbol, use a longer password and keep other character types enabled.</p>
        </div>
      </section>
    </div>
  );
}
