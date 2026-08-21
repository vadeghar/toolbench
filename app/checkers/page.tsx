import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";
import { ToolSearch } from "@/components/tools/ToolSearch";
export const metadata: Metadata = { title: "Checkers & Validators — Toolbench", description: "Free browser-based checkers and validators." };
export default function CheckersPage(){return <main className="module-page-wrap"><div className="module-page-header"><span className="module-label">Checkers</span><h1>Checkers &amp; Validators</h1><p>Practical validation and checking tools that run directly in your browser.</p></div><ToolSearch/><ModuleToolCatalogue category="checkers"/></main>}
