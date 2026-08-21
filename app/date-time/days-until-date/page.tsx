import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolSearch } from "@/components/tools/ToolSearch";
export const metadata = { title: "Days Until Date | Toolbench", description: "Find how many days remain until a target date." };
export default function Page() { return <ModuleLayout><div className="tool-page-wrap"><div className="tool-page-header"><span className="tool-page-category">Date & Time</span><h1>Days Until Date</h1><p>Count the days from today to a target date.</p></div><ToolSearch /><DateTimeTool type="until" /></div></ModuleLayout>; }
