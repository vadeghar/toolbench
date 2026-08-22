import type { Metadata } from "next";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { PasswordGeneratorTool } from "@/components/tools/generators/PasswordGeneratorTool";

export const metadata: Metadata = {
  title: "Password Generator | Toolbench",
  description: "Create strong random passwords with configurable length and character types.",
};

export default function PasswordGeneratorPage() {
  return (
    <ModuleLayout className="generator-module">
      <ToolLayout
        category="Generators"
        toolName="Password Generator"
        description="Create strong, random passwords with full control over length and character types. Everything happens in your browser."
      >
        <PasswordGeneratorTool />
      </ToolLayout>
    </ModuleLayout>
  );
}
