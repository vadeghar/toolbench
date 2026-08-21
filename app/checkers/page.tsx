import type { Metadata } from "next";

import { ToolCard } from "@/components/tools/ToolCard";
import { categoryLabels, getToolsByCategory } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Checkers & Validators — Toolbench",
  description: "Free browser-based checkers and validators for email, SSL, and other common validation tasks.",
};

export default function CheckersPage() {
  const tools = getToolsByCategory("checkers");

  return (
    <main className="module-page-wrap">
      <div className="module-page-header">
        <span className="module-label">Checkers</span>
        <h1>{categoryLabels.checkers}</h1>
        <p>Practical validation and checking tools that run directly in your browser.</p>
      </div>
      <div className="module-tool-grid">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </main>
  );
}
