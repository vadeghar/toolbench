import type { Metadata } from "next";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { PasswordGeneratorTool } from "@/components/tools/generators/PasswordGeneratorTool";

export const metadata: Metadata = {
  title: "Password Generator | Toolbench",
  description: "Create strong random passwords with configurable length and character types.",
};

export default function PasswordGeneratorPage() {
  return (
    <ModuleLayout className="generator-module">
      <div className="wrap">
        <div className="tool-page-header">
          <span className="tool-page-category">Generators</span>
          <h1>Password Generator</h1>
          <p>Create strong, random passwords with full control over length and character types. Everything happens in your browser.</p>
        </div>
        <PasswordGeneratorTool />
      </div>
    </ModuleLayout>
  );
}
