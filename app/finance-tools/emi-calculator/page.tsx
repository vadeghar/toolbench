import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { EmiCalculator } from "@/components/tools/calculators/EmiCalculator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"EMI Calculator",description:"Calculate monthly loan EMI, total interest, and total repayment.",path:"/finance-tools/emi-calculator",keywords:["EMI calculator","loan EMI","loan interest"]});
export default function Page(){return <ToolLayout category="Finance Tools" toolName="EMI Calculator" description="Estimate your monthly loan payment and total borrowing cost."><EmiCalculator/><section className="tool-content"><h2>How it works</h2><p>The calculator uses the standard reducing-balance EMI formula with monthly compounding.</p></section><RelatedTools currentSlug="emi-calculator" category="finance"/></ToolLayout>}
