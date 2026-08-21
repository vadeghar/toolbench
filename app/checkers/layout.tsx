import type { ReactNode } from "react";

import { ModuleLayout } from "@/components/layout/ModuleLayout";

export default function CheckersLayout({ children }: { children: ReactNode }) {
  return <ModuleLayout className="checkers-module">{children}</ModuleLayout>;
}
