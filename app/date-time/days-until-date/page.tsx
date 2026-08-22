import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ToolLayout } from "@/components/layout/ToolLayout";

export const metadata = { title: "Days Until Date | Toolbench", description: "Find how many days remain until a target date." };

export default function Page() {
  return (
    <ToolLayout category="Date & Time" toolName="Days Until Date" description="Count the days from today to a target date.">
      <DateTimeTool type="until" />
    </ToolLayout>
  );
}
