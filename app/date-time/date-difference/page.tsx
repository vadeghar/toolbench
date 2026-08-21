import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolSearch } from "@/components/tools/ToolSearch";
export const metadata = { title: "Date Difference | Toolbench", description: "Calculate the difference between two dates." };
export default function Page() { return <ModuleLayout><div className="tool-page-wrap"><div className="tool-page-header"><span className="tool-page-category">Date & Time</span><h1>Date Difference</h1><p>Find the number of days between two dates.</p></div><ToolSearch /><DateTimeTool type="difference" /></div></ModuleLayout>; }
