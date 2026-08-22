import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ToolLayout } from "@/components/layout/ToolLayout";

export const metadata = { title: "Add / Subtract Days | Toolbench", description: "Add or subtract days from a date." };

export default function Page() {
  return (
    <ToolLayout category="Date & Time" toolName="Add / Subtract Days" description="Move a date forward or backward by any number of days.">
      <DateTimeTool type="add" />
    </ToolLayout>
  );
}
