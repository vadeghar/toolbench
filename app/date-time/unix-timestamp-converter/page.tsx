import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolSearch } from "@/components/tools/ToolSearch";
import { UnixTimestampConverter } from "@/components/tools/DateTimeConversionTools";
export const metadata = { title: "Unix Timestamp Converter | Toolbench", description: "Convert Unix timestamps and dates." };
export default function Page() { return <ModuleLayout><div className="tool-page-wrap"><div className="tool-page-header"><span className="tool-page-category">Date & Time</span><h1>Unix Timestamp Converter</h1><p>Convert Unix timestamps to dates and dates to Unix timestamps.</p></div><ToolSearch /><UnixTimestampConverter /></div></ModuleLayout>; }
