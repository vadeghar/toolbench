import type { Metadata } from "next";

export function createToolMetadata({
  name,
  description,
  keywords = [],
}: {
  name: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const title = `${name} — Toolbench`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      siteName: "Toolbench",
      type: "website",
    },
  };
}
