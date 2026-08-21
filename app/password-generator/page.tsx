"use client";

import { useEffect, useRef } from "react";

const passwordHtml = `<header>
  <div class="header-inner">
    <a href="/" class="logo">
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="2" width="22" height="22" rx="6" stroke="#E3A542" stroke-width="1.6"/>
        <circle cx="9" cy="9" r="1.6" fill="#4FB3A9"/>
        <circle cx="17" cy="9" r="1.6" fill="#9B8DE8"/>
        <circle cx="9" cy="17" r="1.6" fill="#E28168"/>
        <circle cx="17" cy="17" r="1.6" fill="#E3A542"/>
      </svg>
      Toolbench
    </a>
    <span class="breadcrumb"><a href="/">Home</a> / <a href="/#generators">Generators</a> / Password Generator</span>
  </div>
</header>

<main>
  <div class="wrap">
    <div class="tool-header">
      <span class="cat-label">Generators</span>
      <h1>Password Generator</h1>
      <p>Create strong, random passwords with full control over length and character types. Everything happens in your browser — nothing is sent or stored anywhere.</p>
    </div>

    <div class="panel">
      <div class="pw-display">
        <span id="pwOutput">Fx7$kLm2#Qw9pR</span>
        <button class="icon-btn" id="copyBtn" aria-label="Copy password" title="Copy">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="5.5" y="5.5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 10.5V3.5C3 2.94772 3.44772 2.5 4 2.5H11" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
        <button class="icon-btn" id="refreshBtn" aria-label="Generate new password" title="Regenerate">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M14 8.5C14 11.5376 11.5376 14 8.5 14C5.98298 14 3.86823 12.2949 3.20735 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M3 3.5V7H6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

      <div class="strength-row">
        <div class="strength-track"><div class="strength-fill" id="strengthFill"></div></div>
        <span class="strength-label" id="strengthLabel">—</span>
      </div>
    </div>

    <div class="panel">
      <div class="control-row">
        <div>
          <div class="control-label">Password length</div>
          <div class="control-sub">8–64 characters</div>
        </div>
        <div style="display:flex; align-items:center; gap:14px;">
          <input type="range" id="lengthSlider" min="8" max="64" value="16">
          <span class="length-val" id="lengthVal">16</span>
        </div>
      </div>

      <div class="control-row">
        <div class="control-label">Uppercase letters (A–Z)</div>
        <label class="switch"><input type="checkbox" id="optUpper" checked><span class="slider-toggle"></span></label>
      </div>
      <div class="control-row">
        <div class="control-label">Lowercase letters (a–z)</div>
        <label class="switch"><input type="checkbox" id="optLower" checked><span class="slider-toggle"></span></label>
      </div>
      <div class="control-row">
        <div class="control-label">Numbers (0–9)</div>
        <label class="switch"><input type="checkbox" id="optNumbers" checked><span class="slider-toggle"></span></label>
      </div>
      <div class="control-row">
        <div class="control-label">Symbols (!@#$%…)</div>
        <label class="switch"><input type="checkbox" id="optSymbols" checked><span class="slider-toggle"></span></label>
      </div>
      <div class="control-row">
        <div>
          <div class="control-label">Exclude ambiguous characters</div>
          <div class="control-sub">Skips O, 0, l, 1, I</div>
        </div>
        <label class="switch"><input type="checkbox" id="optAmbiguous"><span class="slider-toggle"></span></label>
      </div>

      <button class="regenerate-btn" id="generateBtn">Generate new password</button>
    </div>

    <section class="info-section">
      <h2>What makes a password strong?</h2>
      <p>Password strength comes down to entropy — how many possible combinations an attacker would have to try. Length matters more than complexity: a 16-character password using only lowercase letters is often harder to crack than an 8-character password with symbols. This tool combines both length and character variety so you don't have to choose.</p>
      <p>Avoid reusing passwords across sites. If one service is breached, reused passwords let attackers into your other accounts too — a password manager makes using unique passwords everywhere practical.</p>

      <div class="faq-item">
        <h3>Is this password generator safe to use?</h3>
        <p>Yes. Every password is generated entirely in your browser using JavaScript's cryptographically secure random number generator. Nothing is transmitted to a server or stored anywhere.</p>
      </div>
      <div class="faq-item">
        <h3>How long should my password be?</h3>
        <p>At least 12 characters for general accounts, 16 or more for anything sensitive like email, banking, or your password manager's master password.</p>
      </div>
      <div class="faq-item">
        <h3>Should I include symbols?</h3>
        <p>Symbols increase strength but some older systems don't accept certain characters. If a site rejects your password, try toggling symbols off and generating a longer password instead.</p>
      </div>
    </section>
  </div>
</main>

<footer>
  <p>© 2026 Toolbench. Free tools, built to be fast.</p>
</footer>

<div class="toast" id="toast">Copied to clipboard</div>`;

export default function PasswordGeneratorPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lengthSlider = root.querySelector("#lengthSlider") as HTMLInputElement;
    const lengthVal = root.querySelector("#lengthVal") as HTMLElement;
    const optUpper = root.querySelector("#optUpper") as HTMLInputElement;
    const optLower = root.querySelector("#optLower") as HTMLInputElement;
    const optNumbers = root.querySelector("#optNumbers") as HTMLInputElement;
    const optSymbols = root.querySelector("#optSymbols") as HTMLInputElement;
    const optAmbiguous = root.querySelector("#optAmbiguous") as HTMLInputElement;
    const pwOutput = root.querySelector("#pwOutput") as HTMLElement;
    const strengthFill = root.querySelector("#strengthFill") as HTMLElement;
    const strengthLabel = root.querySelector("#strengthLabel") as HTMLElement;
    const toast = root.querySelector("#toast") as HTMLElement;

    const SETS = {
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    const AMBIGUOUS = /[O0lI1]/g;

    function getPool() {
      let pool = "";
      if (optUpper.checked) pool += SETS.upper;
      if (optLower.checked) pool += SETS.lower;
      if (optNumbers.checked) pool += SETS.numbers;
      if (optSymbols.checked) pool += SETS.symbols;
      if (optAmbiguous.checked) pool = pool.replace(AMBIGUOUS, "");
      return pool;
    }

    function secureRandomInt(max: number) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] % max;
    }

    function updateStrength(poolSize: number, length: number) {
      const entropy = length * Math.log2(poolSize || 1);
      let pct, label, color;
      if (entropy < 40) { pct = 25; label = "Weak"; color = "#E28168"; }
      else if (entropy < 60) { pct = 50; label = "Fair"; color = "#E3A542"; }
      else if (entropy < 90) { pct = 75; label = "Strong"; color = "#4FB3A9"; }
      else { pct = 100; label = "Very strong"; color = "#9B8DE8"; }
      strengthFill.style.width = pct + "%";
      strengthFill.style.background = color;
      strengthLabel.textContent = label;
      strengthLabel.style.color = color;
    }

    function generatePassword() {
      const pool = getPool();
      const length = parseInt(lengthSlider.value, 10);
      if (!pool) {
        pwOutput.textContent = "Select at least one character type";
        strengthFill.style.width = "0%";
        strengthLabel.textContent = "—";
        return;
      }
      let result = "";
      for (let i = 0; i < length; i++) result += pool[secureRandomInt(pool.length)];
      pwOutput.textContent = result;
      updateStrength(pool.length, length);
    }

    function showToast(msg: string) {
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1600);
    }

    const onLength = () => {
      lengthVal.textContent = lengthSlider.value;
      generatePassword();
    };
    const onOptions = () => generatePassword();
    const onGenerate = () => generatePassword();
    const onCopy = async () => {
      try {
        await navigator.clipboard.writeText(pwOutput.textContent ?? "");
      } catch {
        const range = document.createRange();
        range.selectNode(pwOutput);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
        document.execCommand("copy");
      }
      showToast("Copied to clipboard");
    };

    lengthSlider.addEventListener("input", onLength);
    [optUpper, optLower, optNumbers, optSymbols, optAmbiguous].forEach((el) =>
      el.addEventListener("change", onOptions)
    );
    root.querySelector("#generateBtn")?.addEventListener("click", onGenerate);
    root.querySelector("#refreshBtn")?.addEventListener("click", onGenerate);
    root.querySelector("#copyBtn")?.addEventListener("click", onCopy);

    generatePassword();

    return () => {
      lengthSlider.removeEventListener("input", onLength);
      [optUpper, optLower, optNumbers, optSymbols, optAmbiguous].forEach((el) =>
        el.removeEventListener("change", onOptions)
      );
      root.querySelector("#generateBtn")?.removeEventListener("click", onGenerate);
      root.querySelector("#refreshBtn")?.removeEventListener("click", onGenerate);
      root.querySelector("#copyBtn")?.removeEventListener("click", onCopy);
    };
  }, []);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: passwordHtml }} />;
}
