import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";

export const metadata: Metadata = { title: "Generators — Toolbench", description: "Free browser-based generators for passwords, QR codes, and other useful data." };

export default function GeneratorsPage() {
  return (
    <main className="wrap">
      <div className="module-page-header">
        <span className="module-label">Generators</span>
        <h1>Generators</h1>
        <p>Useful generators that run instantly in your browser.</p>
      </div>
      <ModuleToolCatalogue category="generators" />
    </main>
  );
}
