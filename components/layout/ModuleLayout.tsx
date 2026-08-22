import type { ReactNode } from "react";

export type ModuleLayoutProps = {
  children: ReactNode;
  className?: string;
};

/** Shared wrapper for category/module pages. Styling lives in the global stylesheet
 *  so it applies identically whether or not a page uses this wrapper. */
export function ModuleLayout({ children, className = "" }: ModuleLayoutProps) {
  return <div className={`module-layout ${className}`.trim()}>{children}</div>;
}
