import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { SslChecker } from "@/components/tools/checkers/SslChecker";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"SSL Checker",description:"Inspect the live TLS certificate presented by a domain.",path:"/checkers/ssl-checker",keywords:["SSL checker","TLS checker","certificate checker"]});
export default function Page(){return <ToolLayout category="Checkers & Validators" toolName="SSL Checker" description="Inspect certificate subject, issuer, and validity for a domain's HTTPS endpoint."><SslChecker/><RelatedTools currentSlug="ssl-checker" category="checkers"/></ToolLayout>}
