import type { ReactNode } from "react";

import { ModuleLayout } from "@/components/layout/ModuleLayout";

export default function FinanceToolsLayout({ children }: { children: ReactNode }) {
  return <ModuleLayout className="finance-module">{children}</ModuleLayout>;
}
