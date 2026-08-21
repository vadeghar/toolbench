import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { QrCodeGenerator } from "@/components/tools/generators/QrCodeGenerator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"QR Code Generator",description:"Generate a scannable QR code from text or a URL.",path:"/generators/qr-code-generator",keywords:["QR code generator","qrcode","QR generator"]});
export default function Page(){return <ToolLayout category="Generators" toolName="QR Code Generator" description="Turn a URL or text into a scannable QR code."><QrCodeGenerator/><RelatedTools currentSlug="qr-code-generator" category="generators"/></ToolLayout>}
