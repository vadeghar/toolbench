import type { Metadata } from "next";

import { MainHeader } from "@/components/layout/MainHeader";

import "./globals.css";
import "./ui-fixes.css";

export const metadata: Metadata = {
  title: "Toolbench — Every tool you reach for",
  description: "Free online calculators, converters, generators and checkers. No sign-up, no clutter, just fast tools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
