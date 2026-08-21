import type { ReactNode } from "react";

import { ModuleLayout } from "@/components/layout/ModuleLayout";

export default function DateTimeLayout({ children }: { children: ReactNode }) {
  return <ModuleLayout className="date-time-module">{children}</ModuleLayout>;
}
