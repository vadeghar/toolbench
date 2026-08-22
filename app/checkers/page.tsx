import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";

export const metadata: Metadata = { title: "Checkers & Validators — Toolbench", description: "Free browser-based checkers and validators." };

export default function CheckersPage() {
  return (
    <main className="wrap">
      <div className="module-page-header">
        <span className="module-label">Checkers</span>
        <h1>Checkers &amp; Validators</h1>
        <p>Practical validation and checking tools that run directly in your browser.</p>
      </div>
      <ModuleToolCatalogue category="checkers" />
    </main>
  );
}
