import type { Metadata } from "next";

import { ToolCard } from "@/components/tools/ToolCard";
import { categoryLabels, getToolsByCategory } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Converters — Toolbench",
  description: "Free browser-based converters for units, currencies, files, and everyday conversions.",
};

export default function ConvertersPage() {
  const tools = getToolsByCategory("converters");

  return (
    <main className="module-page-wrap">
      <div className="module-page-header">
        <span className="module-label">Converters</span>
        <h1>{categoryLabels.converters}</h1>
        <p>Fast, browser-based conversion tools for everyday units, currencies, and files.</p>
      </div>
      <div className="module-tool-grid">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </main>
  );
}
