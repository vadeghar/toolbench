import type { ToolCategory, ToolDefinition } from "./types";

export const tools: ToolDefinition[] = [
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "finance",
    description: "Project mutual fund SIP growth over time.",
    href: "/finance-tools/sip-calculator",
    keywords: ["sip", "mutual fund", "investment", "returns"],
    status: "active",
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    category: "finance",
    description: "Calculate loan EMI, total interest, and repayment amount.",
    href: "/finance-tools/emi-calculator",
    keywords: ["emi", "loan", "interest", "repayment"],
    status: "coming-soon",
  },
  {
    slug: "tax-regime-calculator",
    name: "Tax Regime Calculator",
    category: "finance",
    description: "Compare India's old and new income-tax regimes.",
    href: "/finance-tools/tax-regime-calculator",
    keywords: ["income tax", "old regime", "new regime", "tax"],
    status: "coming-soon",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "finance",
    description: "Calculate percentages, changes, ratios, and differences.",
    href: "/finance-tools/percentage-calculator",
    keywords: ["percentage", "percent", "ratio", "math"],
    status: "coming-soon",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "dev",
    description: "Validate, format, and beautify JSON instantly in your browser.",
    href: "/dev-tools/json-formatter",
    keywords: ["json", "formatter", "validator", "developer"],
    status: "active",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "dev",
    description: "Test regular expressions against sample text live.",
    href: "/dev-tools/regex-tester",
    keywords: ["regex", "regexp", "regular expression", "developer"],
    status: "active",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    category: "converters",
    description: "Convert length, weight, temperature, and other common units.",
    href: "/converters/unit-converter",
    keywords: ["unit", "length", "weight", "temperature", "converter"],
    status: "coming-soon",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    category: "converters",
    description: "Convert between currencies using live exchange rates.",
    href: "/converters/currency-converter",
    keywords: ["currency", "exchange rate", "forex", "converter"],
    status: "coming-soon",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "generators",
    description: "Generate strong random passwords entirely in your browser.",
    href: "/password-generator",
    keywords: ["password", "generator", "security", "random"],
    status: "active",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "generators",
    description: "Turn a link or text into a scannable QR code.",
    href: "/generators/qr-code-generator",
    keywords: ["qr", "qrcode", "generator", "barcode"],
    status: "coming-soon",
  },
  {
    slug: "email-validator",
    name: "Email Validator",
    category: "checkers",
    description: "Check email format and domain validity.",
    href: "/checkers/email-validator",
    keywords: ["email", "validator", "validation", "mx"],
    status: "coming-soon",
  },
  {
    slug: "ssl-checker",
    name: "SSL Checker",
    category: "checkers",
    description: "Check a domain's SSL certificate status.",
    href: "/checkers/ssl-checker",
    keywords: ["ssl", "tls", "certificate", "security"],
    status: "coming-soon",
  },
];

export const categoryLabels: Record<ToolCategory, string> = {
  finance: "Finance Tools",
  dev: "Developer Tools",
  converters: "Converters",
  generators: "Generators",
  checkers: "Checkers & Validators",
};

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory) {
  return tools.filter((tool) => tool.category === category);
}
