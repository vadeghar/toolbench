"use client";

import { useEffect, useRef, useState } from "react";

const homeHtml = `<header>
  <div class="wrap header-inner">
    <a href="/" class="logo">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="2" y="2" width="22" height="22" rx="6" stroke="#E3A542" stroke-width="1.6"/><circle cx="9" cy="9" r="1.6" fill="#4FB3A9"/><circle cx="17" cy="9" r="1.6" fill="#9B8DE8"/><circle cx="9" cy="17" r="1.6" fill="#E28168"/><circle cx="17" cy="17" r="1.6" fill="#E3A542"/></svg>
      Toolbench
    </a>
    <nav class="primary-nav">
      <a href="#calculators">Calculators</a><a href="#dev-tools">Developer Tools</a><a href="#converters">Converters</a><a href="#generators">Generators</a><a href="#checkers">Checkers</a>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-label="Open menu"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
  </div>
</header>
<div class="mobile-nav" id="mobileNav"><a href="#calculators">Calculators</a><a href="#dev-tools">Developer Tools</a><a href="#converters">Converters</a><a href="#generators">Generators</a><a href="#checkers">Checkers</a></div>
<section class="hero"><div class="wrap"><span class="eyebrow">◆ 100% free · no sign-up</span><h1>Every tool you reach for.<br><span>None of the noise.</span></h1><p class="sub">Calculators, converters, generators and checkers that load instantly and work in your browser — nothing to install, nothing to sign up for.</p><div class="search-shell"><div class="search-box"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6"/><path d="M16 16L12.5 12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><input id="toolSearch" type="text" placeholder="Search calculators, converters, generators…"><span class="kbd">⌘K</span></div><div class="chip-row"><span class="chip" data-jump="calculators">SIP Calculator</span><span class="chip" data-jump="dev-tools">Regex Tester</span><span class="chip" data-jump="generators">Password Generator</span><span class="chip" data-jump="checkers">JSON Formatter</span></div></div></div></section>
<section class="category-section" id="calculators"><div class="wrap"><div class="cat-head"><span class="cat-dot" style="background:var(--accent-brass)"></span><h2>Calculators</h2><span class="count">finance &amp; everyday math</span></div><div class="card-grid">
<a href="/finance-tools/sip-calculator" class="tool-card active"><h3>SIP Calculator</h3><p>Project mutual fund SIP growth over time.</p><span class="tag">→ Open tool</span></a>
<div class="tool-card disabled"><h3>EMI Calculator</h3><p>Work out loan EMIs, interest, and payoff schedule.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>Tax Regime Comparator</h3><p>Old vs new tax regime — see which saves more.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>Percentage Calculator</h3><p>Quick percentage, increase, and ratio math.</p><span class="soon-badge">Coming soon</span></div></div></div></section>
<section class="category-section" id="dev-tools"><div class="wrap"><div class="cat-head"><span class="cat-dot" style="background:var(--accent-violet)"></span><h2>Developer Tools</h2><span class="count">built for developers</span></div><div class="card-grid">
<a href="/dev-tools/json-formatter" class="tool-card active"><h3>JSON Formatter</h3><p>Validate, format, and beautify JSON instantly.</p><span class="tag">→ Open tool</span></a>
<a href="/dev-tools/regex-tester" class="tool-card active"><h3>Regex Tester</h3><p>Test regular expressions against sample text live.</p><span class="tag">→ Open tool</span></a>
<a href="/dev-tools/url-encoder" class="tool-card active"><h3>URL Encoder / Decoder</h3><p>Encode or decode URL components safely in your browser.</p><span class="tag">→ Open tool</span></a>
<a href="/dev-tools/base64" class="tool-card active"><h3>Base64 Encoder / Decoder</h3><p>Encode and decode UTF-8 text using Base64.</p><span class="tag">→ Open tool</span></a>
<a href="/dev-tools/jwt-decoder" class="tool-card active"><h3>JWT Decoder</h3><p>Inspect JWT header and payload without verifying the signature.</p><span class="tag">→ Open tool</span></a>
<a href="/dev-tools/uuid-generator" class="tool-card active"><h3>UUID Generator</h3><p>Generate random UUID v4 identifiers instantly.</p><span class="tag">→ Open tool</span></a></div></div></section>
<section class="category-section" id="converters"><div class="wrap"><div class="cat-head"><span class="cat-dot" style="background:var(--accent-coral)"></span><h2>Converters</h2><span class="count">units, currency &amp; files</span></div><div class="card-grid"><div class="tool-card disabled"><h3>Unit Converter</h3><p>Length, weight, temperature, and more.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>Currency Converter</h3><p>Live exchange rates between world currencies.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>PDF ↔ Word</h3><p>Convert documents without losing formatting.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>Image Converter</h3><p>Switch between PNG, JPG, and WebP instantly.</p><span class="soon-badge">Coming soon</span></div></div></div></section>
<section class="category-section" id="generators"><div class="wrap"><div class="cat-head"><span class="cat-dot" style="background:var(--accent-violet)"></span><h2>Generators</h2><span class="count">passwords, codes &amp; documents</span></div><div class="card-grid"><a href="/password-generator" class="tool-card active"><h3>Password Generator</h3><p>Strong, random passwords with live strength check.</p><span class="tag">→ Open tool</span></a><div class="tool-card disabled"><h3>QR Code Generator</h3><p>Turn any link or text into a scannable QR code.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>Invoice Generator</h3><p>Create a clean, professional invoice in minutes.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>Fake Data Generator</h3><p>Sample JSON/CSV data for testing your app.</p><span class="soon-badge">Coming soon</span></div></div></div></section>
<section class="category-section" id="checkers"><div class="wrap"><div class="cat-head"><span class="cat-dot" style="background:var(--accent-teal)"></span><h2>Checkers &amp; Validators</h2><span class="count">for developers</span></div><div class="card-grid"><a href="/dev-tools/json-formatter" class="tool-card active"><h3>JSON Formatter</h3><p>Validate, format, and beautify JSON instantly.</p><span class="tag">→ Open tool</span></a><a href="/dev-tools/regex-tester" class="tool-card active"><h3>Regex Tester</h3><p>Test regular expressions against sample text live.</p><span class="tag">→ Open tool</span></a><div class="tool-card disabled"><h3>Email Validator</h3><p>Check email format and domain validity.</p><span class="soon-badge">Coming soon</span></div><div class="tool-card disabled"><h3>SSL Checker</h3><p>Check a domain's SSL certificate status.</p><span class="soon-badge">Coming soon</span></div></div></div></section>
<footer><div class="wrap"><p>© 2026 Toolbench. Free tools, built to be fast.</p><div class="foot-links"><a href="#">About</a><a href="#">Privacy</a><a href="#">Contact</a></div></div></footer>`;

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const menuBtn = root.querySelector("#menuBtn");
    const mobileNav = root.querySelector("#mobileNav");
    const toggleMenu = () => { mobileNav?.classList.toggle("open"); setMobileOpen((v) => !v); };
    menuBtn?.addEventListener("click", toggleMenu);
    root.querySelectorAll(".mobile-nav a").forEach((a) => a.addEventListener("click", () => { mobileNav?.classList.remove("open"); setMobileOpen(false); }));
    root.querySelectorAll(".chip").forEach((chip) => chip.addEventListener("click", () => { const id = chip.getAttribute("data-jump"); if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }));
    const searchInput = root.querySelector("#toolSearch") as HTMLInputElement | null;
    const runSearch = () => { const q = searchInput?.value.trim().toLowerCase(); if (!q) return; const cards = Array.from(root.querySelectorAll(".tool-card")); for (const card of cards) { const title = card.querySelector("h3")?.textContent?.toLowerCase() ?? ""; if (title.includes(q)) { (card as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" }); (card as HTMLElement).style.borderColor = "var(--text-primary)"; setTimeout(() => ((card as HTMLElement).style.borderColor = ""), 1200); break; } } };
    searchInput?.addEventListener("keydown", (e) => { if ((e as KeyboardEvent).key === "Enter") runSearch(); });
    const onGlobalKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); searchInput?.focus(); } };
    window.addEventListener("keydown", onGlobalKey);
    return () => { menuBtn?.removeEventListener("click", toggleMenu); window.removeEventListener("keydown", onGlobalKey); };
  }, []);

  return <div ref={rootRef} data-mobile-open={mobileOpen}><div dangerouslySetInnerHTML={{ __html: homeHtml }} /></div>;
}
