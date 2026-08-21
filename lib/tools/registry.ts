import type { ToolCategory, ToolDefinition } from "./types";

export const tools: ToolDefinition[] = [
  { slug: "sip-calculator", name: "SIP Calculator", category: "finance", description: "Project mutual fund SIP growth over time.", href: "/finance-tools/sip-calculator", keywords: ["sip", "mutual fund", "investment", "returns"], status: "active" },
  { slug: "emi-calculator", name: "EMI Calculator", category: "finance", description: "Calculate loan EMI, total interest, and repayment amount.", href: "/finance-tools/emi-calculator", keywords: ["emi", "loan", "interest", "repayment"], status: "active" },
  { slug: "tax-regime-calculator", name: "Tax Regime Calculator", category: "finance", description: "Compare illustrative Indian old and new income-tax regime estimates.", href: "/finance-tools/tax-regime-calculator", keywords: ["income tax", "old regime", "new regime", "tax"], status: "active" },
  { slug: "percentage-calculator", name: "Percentage Calculator", category: "finance", description: "Calculate percentages, changes, ratios, and differences.", href: "/finance-tools/percentage-calculator", keywords: ["percentage", "percent", "ratio", "math"], status: "active" },
  { slug: "json-formatter", name: "JSON Formatter", category: "dev", description: "Validate, format, and beautify JSON instantly in your browser.", href: "/dev-tools/json-formatter", keywords: ["json", "formatter", "validator", "developer"], status: "active" },
  { slug: "regex-tester", name: "Regex Tester", category: "dev", description: "Test regular expressions against sample text live.", href: "/dev-tools/regex-tester", keywords: ["regex", "regexp", "regular expression", "developer"], status: "active" },
  { slug: "url-encoder", name: "URL Encoder & Decoder", category: "dev", description: "Encode and decode URL components instantly.", href: "/dev-tools/url-encoder", keywords: ["url", "uri", "encode", "decode"], status: "active" },
  { slug: "base64", name: "Base64 Encoder & Decoder", category: "dev", description: "Encode and decode Base64 text locally.", href: "/dev-tools/base64", keywords: ["base64", "encode", "decode", "developer"], status: "active" },
  { slug: "uuid-generator", name: "UUID Generator", category: "dev", description: "Generate random UUID v4 identifiers locally.", href: "/dev-tools/uuid-generator", keywords: ["uuid", "guid", "uuid v4", "generator"], status: "active" },
  { slug: "jwt-decoder", name: "JWT Decoder", category: "dev", description: "Decode JWT headers and payloads without verifying signatures.", href: "/dev-tools/jwt-decoder", keywords: ["jwt", "json web token", "decoder", "token"], status: "active" },
  { slug: "unit-converter", name: "Unit Converter", category: "converters", description: "Convert length, weight, temperature, and other common units.", href: "/converters/unit-converter", keywords: ["unit", "length", "weight", "temperature", "converter"], status: "active" },
  { slug: "currency-converter", name: "Currency Converter", category: "converters", description: "Convert between currencies using current public exchange rates.", href: "/converters/currency-converter", keywords: ["currency", "exchange rate", "forex", "converter"], status: "active" },
  { slug: "password-generator", name: "Password Generator", category: "generators", description: "Generate strong random passwords entirely in your browser.", href: "/password-generator", keywords: ["password", "generator", "security", "random"], status: "active" },
  { slug: "qr-code-generator", name: "QR Code Generator", category: "generators", description: "Turn a link or text into a scannable QR code.", href: "/generators/qr-code-generator", keywords: ["qr", "qrcode", "generator", "barcode"], status: "active" },
  { slug: "email-validator", name: "Email Validator", category: "checkers", description: "Check email address syntax directly in your browser.", href: "/checkers/email-validator", keywords: ["email", "validator", "validation", "syntax"], status: "active" },
  { slug: "ssl-checker", name: "SSL Checker", category: "checkers", description: "Inspect the live TLS certificate presented by a domain.", href: "/checkers/ssl-checker", keywords: ["ssl", "tls", "certificate", "security"], status: "active" },
];

export const categoryLabels: Record<ToolCategory, string> = { finance: "Finance Tools", dev: "Developer Tools", converters: "Converters", generators: "Generators", checkers: "Checkers & Validators" };
export function getToolBySlug(slug: string) { return tools.find((tool) => tool.slug === slug); }
export function getToolsByCategory(category: ToolCategory) { return tools.filter((tool) => tool.category === category); }
