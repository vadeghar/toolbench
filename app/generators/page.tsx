import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";
import { ToolSearch } from "@/components/tools/ToolSearch";
export const metadata: Metadata = { title: "Generators — Toolbench", description: "Free browser-based generators for passwords, QR codes, and other useful data." };
export default function GeneratorsPage(){return <main className="module-page-wrap"><div className="module-page-header"><span className="module-label">Generators</span><h1>Generators</h1><p>Useful generators that run instantly in your browser.</p></div><ToolSearch/><ModuleToolCatalogue category="generators"/></main>}
