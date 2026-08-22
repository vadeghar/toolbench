import { ToolLayout } from "@/components/layout/ToolLayout";
import { TimeZoneConverter } from "@/components/tools/DateTimeConversionTools";

export const metadata = { title: "Time Zone Converter | Toolbench", description: "Convert times between common time zones." };

export default function Page() {
  return (
    <ToolLayout category="Date & Time" toolName="Time Zone Converter" description="Convert a date and time between common time zones.">
      <TimeZoneConverter />
    </ToolLayout>
  );
}
