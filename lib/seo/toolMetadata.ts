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

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      siteName: "Toolbench",
      type: "website",
      url: path,
    },
  };
}
