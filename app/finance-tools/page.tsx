import type { Metadata } from "next";

import { ToolCard } from "@/components/tools/ToolCard";
import { categoryLabels, getToolsByCategory } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Finance Tools — Toolbench",
  description: "Free finance calculators for SIPs, loans, taxes, percentages, and everyday financial planning.",
};

export default function FinanceToolsPage() {
  const tools = getToolsByCategory("finance");

  return (
    <main className="module-page-wrap">
      <div className="module-page-header">
        <span className="module-label">Finance</span>
        <h1>{categoryLabels.finance}</h1>
        <p>Fast, browser-based calculators for investment planning and everyday financial calculations.</p>
      </div>
      <div className="module-tool-grid">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </main>
  );
}
