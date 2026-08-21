import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { UrlEncoder } from "@/components/tools/developer/UrlEncoder";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { createToolMetadata } from "@/lib/seo/toolMetadata";

export const metadata: Metadata = createToolMetadata({ name: "URL Encoder & Decoder", description: "Encode and decode URL components directly in your browser.", path: "/dev-tools/url-encoder", keywords: ["URL encoder", "URL decoder", "encode URI", "decode URI"] });

export default function UrlEncoderPage() {
  return <ToolLayout category="Developer Tools" toolName="URL Encoder & Decoder" description="Encode URL components or decode percent-encoded text locally in your browser."><UrlEncoder /><ToolFAQ items={[{ question: "What does URL encoding do?", answer: "URL encoding converts characters that have special meaning in URLs into percent-encoded representations." }, { question: "Is my input uploaded?", answer: "No. Encoding and decoding happen locally in your browser." }]} /><RelatedTools currentSlug="url-encoder" category="dev" /></ToolLayout>;
}
