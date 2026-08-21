import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Base64Encoder } from "@/components/tools/developer/Base64Encoder";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { createToolMetadata } from "@/lib/seo/toolMetadata";

export const metadata: Metadata = createToolMetadata({ name: "Base64 Encoder & Decoder", description: "Encode text to Base64 or decode Base64 text locally in your browser.", path: "/dev-tools/base64", keywords: ["Base64 encoder", "Base64 decoder", "encode Base64", "decode Base64"] });

export default function Base64Page() {
  return <ToolLayout category="Developer Tools" toolName="Base64 Encoder & Decoder" description="Convert text to and from Base64 without sending the data to a server."><Base64Encoder /><ToolFAQ items={[{ question: "What is Base64?", answer: "Base64 is an encoding format commonly used to represent binary data as ASCII text." }, { question: "Does Base64 encrypt data?", answer: "No. Base64 is encoding, not encryption, and it should not be used to protect secrets." }]} /><RelatedTools currentSlug="base64" category="dev" /></ToolLayout>;
}
