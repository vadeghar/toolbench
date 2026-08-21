import type { Metadata } from "next";

import { ToolCard } from "@/components/tools/ToolCard";
import { categoryLabels, getToolsByCategory } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Generators — Toolbench",
  description: "Free browser-based generators for passwords, QR codes, and other useful data.",
};

export default function GeneratorsPage() {
  const tools = getToolsByCategory("generators");

  return (
    <main className="module-page-wrap">
      <div className="module-page-header">
        <span className="module-label">Generators</span>
        <h1>{categoryLabels.generators}</h1>
        <p>Useful generators that run instantly in your browser.</p>
      </div>
      <div className="module-tool-grid">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </main>
  );
}
