import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";

export const metadata: Metadata = { title: "Finance Tools — Toolbench", description: "Free finance calculators for investment planning and everyday calculations." };

export default function FinanceToolsPage() {
  return (
    <main className="wrap">
      <div className="module-page-header">
        <span className="module-label">Finance</span>
        <h1>Finance Tools</h1>
        <p>Fast, browser-based calculators for investment planning and everyday financial calculations.</p>
      </div>
      <ModuleToolCatalogue category="finance" />
    </main>
  );
}
