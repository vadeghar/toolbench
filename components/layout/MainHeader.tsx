"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./MainHeader.module.css";

const navItems = [
  { label: "Calculators", href: "/finance-tools", category: "calc" },
  { label: "Developer Tools", href: "/dev-tools", category: "dev" },
  { label: "Converters", href: "/#converters", category: "conv" },
  { label: "Generators", href: "/#generators", category: "gen" },
  { label: "Checkers", href: "/#checkers", category: "check" },
];

export function MainHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/") return null;

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu} aria-label="Toolbench home">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="22" height="22" rx="6" stroke="#E3A542" strokeWidth="1.6" />
              <circle cx="9" cy="9" r="1.6" fill="#4FB3A9" />
              <circle cx="17" cy="9" r="1.6" fill="#9B8DE8" />
              <circle cx="9" cy="17" r="1.6" fill="#E28168" />
              <circle cx="17" cy="17" r="1.6" fill="#E3A542" />
            </svg>
            Toolbench
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink} data-cat={item.category}>
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <nav className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.mobileLink} onClick={closeMobileMenu}>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
