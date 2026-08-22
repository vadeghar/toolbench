import type { ReactNode } from "react";

import { Breadcrumbs } from "./Breadcrumbs";

export type ToolLayoutProps = {
  category: string;
  toolName: string;
  description: string;
  children: ReactNode;
};

export function ToolLayout({ category, toolName, description, children }: ToolLayoutProps) {
  return (
    <div className="tool-layout">
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category }, { label: toolName }]} />
        <header className="tool-page-header">
          <span className="tool-page-category">{category}</span>
          <h1>{toolName}</h1>
          <p>{description}</p>
        </header>
        {children}
      </div>
    </div>
  );
}
