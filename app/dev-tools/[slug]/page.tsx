import { notFound } from "next/navigation";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { CronGeneratorTool } from "@/components/tools/CronGeneratorTool";
import { DeveloperUtilityTool } from "@/components/tools/DeveloperUtilityTool";
import { JwtGeneratorTool } from "@/components/tools/JwtGeneratorTool";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools/registry";

export function generateStaticParams() {
  return [...getToolsByCategory("dev"), ...getToolsByCategory("data")]
    .filter((tool) => tool.status === "active")
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  return tool
    ? { title: `${tool.name} | Toolbench`, description: tool.description }
    : { title: "Developer Tools | Toolbench" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || !["dev", "data"].includes(tool.category) || tool.status !== "active") {
    notFound();
  }

  return (
    <ToolLayout
      category={tool.category === "data" ? "Data & Encoding" : "Developer Tools"}
      toolName={tool.name}
      description={tool.description}
    >
      {tool.slug === "cron-generator" ? (
        <CronGeneratorTool />
      ) : tool.slug === "jwt-generator" ? (
        <JwtGeneratorTool />
      ) : (
        <DeveloperUtilityTool slug={tool.slug} />
      )}
    </ToolLayout>
  );
}
