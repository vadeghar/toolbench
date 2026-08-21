import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { JwtDecoder } from "@/components/tools/developer/JwtDecoder";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { createToolMetadata } from "@/lib/seo/toolMetadata";

export const metadata: Metadata = createToolMetadata({ name: "JWT Decoder", description: "Decode JWT header and payload sections locally without verifying signatures.", path: "/dev-tools/jwt-decoder", keywords: ["JWT decoder", "JSON Web Token", "JWT payload", "JWT header"] });

export default function JwtDecoderPage() {
  return <ToolLayout category="Developer Tools" toolName="JWT Decoder" description="Inspect the header and payload of a JSON Web Token directly in your browser."><JwtDecoder /><ToolFAQ items={[{ question: "Does this verify the JWT signature?", answer: "No. This tool only decodes the header and payload and does not validate the token's signature." }, { question: "Should I paste production tokens here?", answer: "Avoid pasting sensitive production credentials or tokens into tools unless you are certain the environment is appropriate." }]} /><RelatedTools currentSlug="jwt-decoder" category="dev" /></ToolLayout>;
}
