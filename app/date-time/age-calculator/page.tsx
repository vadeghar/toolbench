import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ToolLayout } from "@/components/layout/ToolLayout";

export const metadata = { title: "Age Calculator | Toolbench", description: "Calculate exact age from date of birth." };

export default function Page() {
  return (
    <ToolLayout category="Date & Time" toolName="Age Calculator" description="Calculate your age from your date of birth.">
      <DateTimeTool type="age" />
    </ToolLayout>
  );
}
