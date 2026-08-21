export type ToolCategory =
  | "finance"
  | "dev"
  | "date-time"
  | "data"
  | "converters"
  | "generators"
  | "checkers";

export type ToolDefinition = {
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  href: string;
  keywords: string[];
  status: "active" | "coming-soon";
};
