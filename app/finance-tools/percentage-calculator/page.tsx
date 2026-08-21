import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { PercentageCalculator } from "@/components/tools/calculators/PercentageCalculator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"Percentage Calculator",description:"Calculate percentages, ratios, increases, decreases, and percentage change.",path:"/finance-tools/percentage-calculator",keywords:["percentage calculator","percent calculator","percentage change"]});
export default function Page(){return <ToolLayout category="Finance Tools" toolName="Percentage Calculator" description="Handle common percentage and percentage-change calculations instantly."><PercentageCalculator/><RelatedTools currentSlug="percentage-calculator" category="finance"/></ToolLayout>}
