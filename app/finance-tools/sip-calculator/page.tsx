import type { Metadata } from "next";

import { RelatedTools } from "@/components/tools/RelatedTools";
import { SipCalculator } from "@/components/tools/calculators/SipCalculator";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { createToolMetadata } from "@/lib/seo/toolMetadata";

export const metadata: Metadata = createToolMetadata({
  name: "SIP Calculator",
  description: "Calculate estimated SIP maturity value, total investment, and potential gains for a monthly mutual fund investment.",
  path: "/finance-tools/sip-calculator",
  keywords: ["SIP calculator", "mutual fund SIP calculator", "SIP returns", "investment calculator"],
});

export default function SipCalculatorPage() {
  return (
    <ToolLayout
      category="Finance Tools"
      toolName="SIP Calculator"
      description="Estimate how your monthly mutual fund investment could grow over time using an expected annual return."
    >
      <SipCalculator />

      <section className="tool-content">
        <h2>How to use the SIP Calculator</h2>
        <p>
          Enter the amount you plan to invest every month, your expected annual return, and the investment period. The calculator uses monthly compounding to estimate the value of your SIP at the end of the selected period.
        </p>
        <p>
          SIP calculations are illustrations rather than guarantees. Mutual fund returns fluctuate with market conditions, so use the result as a planning estimate rather than a promise of future performance.
        </p>
      </section>

      <ToolFAQ
        items={[
          {
            question: "What is a SIP?",
            answer: "A Systematic Investment Plan lets an investor contribute a fixed amount to a mutual fund at regular intervals, commonly monthly.",
          },
          {
            question: "Does the SIP calculator guarantee returns?",
            answer: "No. The result is an estimate based on the expected return you enter. Market-linked investments can produce higher or lower actual returns.",
          },
          {
            question: "What return should I enter?",
            answer: "Use a reasonable long-term assumption for the investment you are evaluating. Avoid treating a calculator assumption as a guaranteed rate of return.",
          },
        ]}
      />

      <RelatedTools currentSlug="sip-calculator" category="finance" />
    </ToolLayout>
  );
}
