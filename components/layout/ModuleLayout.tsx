import type { ReactNode } from "react";

import styles from "./ModuleLayout.module.css";

export type ModuleLayoutProps = {
  children: ReactNode;
  className?: string;
};

/** Shared wrapper for category/module pages. */
export function ModuleLayout({ children, className = "" }: ModuleLayoutProps) {
  return <div className={`${styles.moduleLayout} ${className}`.trim()}>{children}</div>;
}
