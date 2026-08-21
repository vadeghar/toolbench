import type { Metadata } from "next";

export function createToolMetadata({
  name,
  description,
  path,
  keywords = [],
}: {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const title = `${name} — Toolbench`;
  const url = `https://toolbench.example${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Toolbench",
      type: "website",
    },
  };
}
