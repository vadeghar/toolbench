import { tools } from "@/lib/tools/registry";
import type { ToolCategory } from "@/lib/tools/types";

export function RelatedTools({ currentSlug, category }: { currentSlug: string; category: ToolCategory }) {
  const related = tools
    .filter((tool) => tool.category === category && tool.slug !== currentSlug && tool.status === "active")
    .slice(0, 3);
  if (!related.length) return null;

  return (
    <section className="related-tools" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading">Related tools</h2>
      <div className="related-tools-grid">
        {related.map((tool) => (
          <a key={tool.slug} href={tool.href} className="related-tool-link">
            <strong>{tool.name}</strong>
            <span>{tool.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
