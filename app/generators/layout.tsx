import type { ReactNode } from "react";

import { ModuleLayout } from "@/components/layout/ModuleLayout";

export default function GeneratorsLayout({ children }: { children: ReactNode }) {
  return <ModuleLayout className="generators-module">{children}</ModuleLayout>;
}
