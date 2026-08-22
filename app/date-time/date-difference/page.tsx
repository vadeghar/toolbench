import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ToolLayout } from "@/components/layout/ToolLayout";

export const metadata = { title: "Date Difference | Toolbench", description: "Calculate the difference between two dates." };

export default function Page() {
  return (
    <ToolLayout category="Date & Time" toolName="Date Difference" description="Find the number of days between two dates.">
      <DateTimeTool type="difference" />
    </ToolLayout>
  );
}
