import { DateTimeTool } from "@/components/tools/DateTimeTool";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ToolSearch } from "@/components/tools/ToolSearch";

export const metadata = { title: "Age Calculator | Toolbench", description: "Calculate exact age from date of birth." };
export default function Page() { return <ModuleLayout><div className="tool-page-wrap"><div className="tool-page-header"><span className="tool-page-category">Date & Time</span><h1>Age Calculator</h1><p>Calculate your age from your date of birth.</p></div><ToolSearch /><DateTimeTool type="age" /></div></ModuleLayout>; }
