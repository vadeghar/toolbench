import type { Metadata } from "next";

import { ToolLayout } from "@/components/layout/ToolLayout";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { RegexTester } from "@/components/tools/checkers/RegexTester";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { createToolMetadata } from "@/lib/seo/toolMetadata";

export const metadata: Metadata = createToolMetadata({
  name: "Regex Tester",
  description: "Test regular expressions against sample text with instant match feedback in your browser.",
  path: "/dev-tools/regex-tester",
  keywords: ["regex tester", "regular expression tester", "regexp", "regex validator"],
});

export default function RegexTesterPage() {
  return (
    <ToolLayout category="Developer Tools" toolName="Regex Tester" description="Test a regular expression against sample text and see matching results instantly without sending your data to a server.">
      <RegexTester />
      <section className="tool-content">
        <h2>Why use a regex tester?</h2>
        <p>Build and verify regular expressions interactively before using them in an application. The tester uses the browser's native JavaScript RegExp engine.</p>
        <p>Your test pattern and text stay in your browser and are not submitted to Toolbench.</p>
      </section>
      <ToolFAQ items={[
        { question: "What regex syntax does this use?", answer: "The tester uses JavaScript regular expression syntax supported by your browser's RegExp implementation." },
        { question: "Which flags can I use?", answer: "Enter supported JavaScript flags such as g, i, m, s, u, v, y, or combinations appropriate for your pattern." },
        { question: "What happens when the pattern is invalid?", answer: "The tester catches the RegExp error and displays the browser's validation message instead of breaking the page." },
      ]} />
      <RelatedTools currentSlug="regex-tester" category="dev" />
    </ToolLayout>
  );
}
