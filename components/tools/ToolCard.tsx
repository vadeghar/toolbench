import type { ToolDefinition } from "@/lib/tools/types";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const className = `module-tool-card ${tool.status === "active" ? "active" : "disabled"}`;

  if (tool.status !== "active") {
    return (
      <div className={className}>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <span className="soon-badge">Coming soon</span>
      </div>
    );
  }

  return (
    <a href={tool.href} className={className}>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <span className="tool-card-link">→ Open tool</span>
    </a>
  );
}
