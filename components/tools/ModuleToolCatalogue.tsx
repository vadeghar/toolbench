import { ToolCard } from "./ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
import type { ToolCategory } from "@/lib/tools/types";

export function ModuleToolCatalogue({ category }: { category: ToolCategory }) {
  const items = getToolsByCategory(category);
  return <div className="module-tool-grid">{items.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>;
}
