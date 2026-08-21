import { ToolLayout } from "@/components/layout/ToolLayout";
import { UnixTimestampConverter } from "@/components/tools/DateTimeConversionTools";

export const metadata = { title: "Unix Timestamp Converter | Toolbench", description: "Convert Unix timestamps and dates." };

export default function Page() {
  return (
    <ToolLayout category="Date & Time" toolName="Unix Timestamp Converter" description="Convert Unix timestamps to dates and dates to Unix timestamps.">
      <UnixTimestampConverter />
    </ToolLayout>
  );
}
