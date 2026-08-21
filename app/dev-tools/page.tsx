import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";
import { ToolSearch } from "@/components/tools/ToolSearch";

export const metadata: Metadata = { title: "Developer Tools — Toolbench", description: "Free browser-based developer utilities for JSON, regular expressions, validation, and more." };

export default function DevToolsPage() {
  return (
    <main className="wrap">
      <div className="module-page-header">
        <span className="module-label">Developers</span>
        <h1>Developer Tools</h1>
        <p>Practical developer utilities designed to work instantly in your browser.</p>
      </div>
      <ToolSearch />
      <ModuleToolCatalogue category="dev" />
    </main>
  );
}
