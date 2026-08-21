import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolSearch } from "@/components/tools/ToolSearch";
export const metadata = { title: "Add / Subtract Days | Toolbench", description: "Add or subtract days from a date." };
export default function Page() { return <ModuleLayout><div className="tool-page-wrap"><div className="tool-page-header"><span className="tool-page-category">Date & Time</span><h1>Add / Subtract Days</h1><p>Move a date forward or backward by any number of days.</p></div><ToolSearch /><DateTimeTool type="add" /></div></ModuleLayout>; }
