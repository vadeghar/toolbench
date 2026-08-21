import type { Metadata } from "next";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { CurrencyConverter } from "@/components/tools/converters/CurrencyConverter";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { createToolMetadata } from "@/lib/seo/toolMetadata";
export const metadata: Metadata=createToolMetadata({name:"Currency Converter",description:"Convert currencies using current rates from a public exchange-rate service.",path:"/converters/currency-converter",keywords:["currency converter","exchange rates","forex converter"]});
export default function Page(){return <ToolLayout category="Converters" toolName="Currency Converter" description="Convert between major currencies using current public exchange rates."><CurrencyConverter/><RelatedTools currentSlug="currency-converter" category="converters"/></ToolLayout>}
