import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolSearch } from "@/components/tools/ToolSearch";
import { TimeZoneConverter } from "@/components/tools/DateTimeConversionTools";
export const metadata = { title: "Time Zone Converter | Toolbench", description: "Convert times between common time zones." };
export default function Page() { return <ModuleLayout><div className="tool-page-wrap"><div className="tool-page-header"><span className="tool-page-category">Date & Time</span><h1>Time Zone Converter</h1><p>Convert a date and time between common time zones.</p></div><ToolSearch /><TimeZoneConverter /></div></ModuleLayout>; }
