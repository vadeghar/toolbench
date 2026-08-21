import type { ToolDefinition } from "./types";

export function searchTools(tools: ToolDefinition[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return tools
    .filter((tool) => {
      const haystack = [tool.name, tool.description, ...tool.keywords].join(" ").toLowerCase();
      return haystack.includes(normalized);
    })
    .slice(0, 8);
}
