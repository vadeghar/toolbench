import Link from "next/link";
import { ToolCard } from "./ToolCard";
import { categoryLabels, getToolsByCategory } from "@/lib/tools/registry";
import type { ToolCategory } from "@/lib/tools/types";

const moreRoutes: Record<ToolCategory, string> = { finance: "/finance-tools", dev: "/dev-tools", "date-time": "/date-time", data: "/dev-tools", converters: "/converters", generators: "/generators", checkers: "/checkers" };

export function ModuleToolCatalogue({ category }: { category: ToolCategory }) {
  const items = getToolsByCategory(category);
  const visible = items.slice(0, 5);
  return <div className="module-tool-grid">{visible.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}{items.length > 5 && <Link className="module-tool-card module-more-card" href={moreRoutes[category]}><h3>More</h3><p>Explore all {categoryLabels[category].toLowerCase()}.</p><span className="tool-card-link">→ View all</span></Link>}</div>;
}
