import type { ReactNode } from "react";

import { Breadcrumbs } from "./Breadcrumbs";
import { ModuleLayout } from "./ModuleLayout";

export type ToolLayoutProps = {
  category: string;
  toolName: string;
  description: string;
  children: ReactNode;
};

export function ToolLayout({ category, toolName, description, children }: ToolLayoutProps) {
  return (
    <ModuleLayout className="tool-layout">
      <div className="tool-page-wrap">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category }, { label: toolName }]} />
        <header className="tool-page-header">
          <span className="tool-page-category">{category}</span>
          <h1>{toolName}</h1>
          <p>{description}</p>
        </header>
        {children}
      </div>
    </ModuleLayout>
  );
}
