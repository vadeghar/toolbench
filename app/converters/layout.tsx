import type { ReactNode } from "react";

import { ModuleLayout } from "@/components/layout/ModuleLayout";

export default function ConvertersLayout({ children }: { children: ReactNode }) {
  return <ModuleLayout className="converters-module">{children}</ModuleLayout>;
}
