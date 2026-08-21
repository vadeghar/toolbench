import type { ReactNode } from "react";

import { ModuleLayout } from "@/components/layout/ModuleLayout";

export default function DevToolsLayout({ children }: { children: ReactNode }) {
  return <ModuleLayout className="dev-module">{children}</ModuleLayout>;
}
