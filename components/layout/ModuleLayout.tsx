import type { ReactNode } from "react";

export type ModuleLayoutProps = {
  children: ReactNode;
  className?: string;
};

/** Shared wrapper for category/module pages. */
export function ModuleLayout({ children, className = "" }: ModuleLayoutProps) {
  return <div className={`module-layout ${className}`.trim()}>{children}</div>;
}
