import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";
import { ToolSearch } from "@/components/tools/ToolSearch";
export const metadata: Metadata = { title: "Converters — Toolbench", description: "Free browser-based converters for units, currencies, and everyday conversions." };
export default function ConvertersPage(){return <main className="module-page-wrap"><div className="module-page-header"><span className="module-label">Converters</span><h1>Converters</h1><p>Fast, browser-based conversion tools for everyday units and currencies.</p></div><ToolSearch/><ModuleToolCatalogue category="converters"/></main>}
