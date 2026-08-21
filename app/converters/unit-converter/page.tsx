import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { UnitConverter } from "@/components/tools/converters/UnitConverter";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"Unit Converter",description:"Convert common length, weight, and temperature units.",path:"/converters/unit-converter",keywords:["unit converter","length converter","weight converter","temperature converter"]});
export default function Page(){return <ToolLayout category="Converters" toolName="Unit Converter" description="Convert common measurements between everyday units."><UnitConverter/><RelatedTools currentSlug="unit-converter" category="converters"/></ToolLayout>}
