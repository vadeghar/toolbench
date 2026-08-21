import { notFound } from "next/navigation";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolSearch } from "@/components/tools/ToolSearch";
import { DeveloperUtilityTool } from "@/components/tools/DeveloperUtilityTool";
import { getToolBySlug } from "@/lib/tools/registry";

export function generateMetadata({ params }: { params: { slug: string } }) { const tool=getToolBySlug(params.slug); return tool?{title:`${tool.name} | Toolbench`,description:tool.description}:{title:"Developer Tools | Toolbench"}; }

export default function Page({ params }: { params: { slug: string } }) { const tool=getToolBySlug(params.slug); if(!tool || tool.category!=="dev" || tool.status!=="active") notFound(); return <ModuleLayout><div className="tool-page-wrap"><div className="tool-page-header"><span className="tool-page-category">Developer Tools</span><h1>{tool.name}</h1><p>{tool.description}</p></div><ToolSearch/><DeveloperUtilityTool slug={tool.slug}/></div></ModuleLayout>; }
