import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { TaxRegimeCalculator } from "@/components/tools/calculators/TaxRegimeCalculator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"Tax Regime Calculator",description:"Compare illustrative Indian old and new income-tax regime estimates.",path:"/finance-tools/tax-regime-calculator",keywords:["income tax calculator","old vs new tax regime","tax regime calculator"]});
export default function Page(){return <ToolLayout category="Finance Tools" toolName="Tax Regime Calculator" description="Compare estimated tax under the old and new Indian tax regimes."><TaxRegimeCalculator/><RelatedTools currentSlug="tax-regime-calculator" category="finance"/></ToolLayout>}
