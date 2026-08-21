import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { EmailValidator } from "@/components/tools/checkers/EmailValidator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"Email Validator",description:"Validate email address syntax directly in your browser.",path:"/checkers/email-validator",keywords:["email validator","email checker","email syntax"]});
export default function Page(){return <ToolLayout category="Checkers & Validators" toolName="Email Validator" description="Check whether an email address has a valid basic format."><EmailValidator/><RelatedTools currentSlug="email-validator" category="checkers"/></ToolLayout>}
