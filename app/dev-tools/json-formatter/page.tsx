import type { Metadata } from "next";

import { ToolLayout } from "@/components/layout/ToolLayout";
import { JsonFormatter } from "@/components/tools/checkers/JsonFormatter";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFAQ } from "@/components/tools/ToolFAQ";
import { createToolMetadata } from "@/lib/seo/toolMetadata";

export const metadata: Metadata = createToolMetadata({
  name: "JSON Formatter & Validator",
  description: "Format, beautify, and validate JSON directly in your browser with instant syntax feedback.",
  path: "/dev-tools/json-formatter",
  keywords: ["JSON formatter", "JSON validator", "beautify JSON", "JSON pretty print"],
});

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      category="Developer Tools"
      toolName="JSON Formatter & Validator"
      description="Paste JSON, validate its syntax, and format it into readable output without sending the data to a server."
    >
      <JsonFormatter />

      <section className="tool-content">
        <h2>Why use a JSON formatter?</h2>
        <p>
          Minified or poorly indented JSON can be difficult to inspect. Formatting adds consistent indentation so nested objects and arrays are easier to read, while validation catches syntax errors before you use the data in an application or API request.
        </p>
        <p>
          This formatter runs in your browser using the built-in JSON parser. Your input is not submitted to Toolbench for formatting.
        </p>
      </section>

      <ToolFAQ
        items={[
          {
            question: "What does valid JSON look like?",
            answer: "Valid JSON uses double-quoted property names and string values, with supported JSON values such as objects, arrays, strings, numbers, true, false, and null.",
          },
          {
            question: "Does this formatter send my JSON to a server?",
            answer: "No. Formatting and validation are performed in the browser by JavaScript's built-in JSON parser and serializer.",
          },
          {
            question: "Can I format large JSON files?",
            answer: "The formatter works with JSON that your browser can parse and hold in memory. Very large documents may be limited by available browser memory.",
          },
        ]}
      />

      <RelatedTools currentSlug="json-formatter" category="dev" />
    </ToolLayout>
  );
}
