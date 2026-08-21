import type { Metadata } from "next";

import { ToolCard } from "@/components/tools/ToolCard";
import { categoryLabels, getToolsByCategory } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Developer Tools — Toolbench",
  description: "Free browser-based developer utilities for JSON, regular expressions, validation, and more.",
};

export default function DevToolsPage() {
  const tools = getToolsByCategory("dev");

  return (
    <main className="module-page-wrap">
      <div className="module-page-header">
        <span className="module-label">Developers</span>
        <h1>{categoryLabels.dev}</h1>
        <p>Practical developer utilities designed to work instantly in your browser.</p>
      </div>
      <div className="module-tool-grid">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </main>
  );
}
