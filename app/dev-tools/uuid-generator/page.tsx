import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { UuidGenerator } from "@/components/tools/developer/UuidGenerator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { createToolMetadata } from "@/lib/seo/toolMetadata";

export const metadata: Metadata = createToolMetadata({ name: "UUID Generator", description: "Generate UUID version 4 identifiers instantly in your browser.", path: "/dev-tools/uuid-generator", keywords: ["UUID generator", "UUID v4", "GUID generator", "random UUID"] });

export default function UuidGeneratorPage() {
  return <ToolLayout category="Developer Tools" toolName="UUID Generator" description="Generate random UUID v4 identifiers locally using the browser Web Crypto API."><UuidGenerator /><ToolFAQ items={[{ question: "What version of UUID is generated?", answer: "This tool generates random UUID version 4 identifiers." }, { question: "Are UUIDs unique?", answer: "UUID v4 provides a very large random identifier space, making collisions extremely unlikely." }]} /><RelatedTools currentSlug="uuid-generator" category="dev" /></ToolLayout>;
}
