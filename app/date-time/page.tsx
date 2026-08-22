import type { Metadata } from "next";
import { ModuleToolCatalogue } from "@/components/tools/ModuleToolCatalogue";

export const metadata: Metadata = { title: "Date & Time Tools — Toolbench", description: "Free date and time calculators and converters." };

export default function DateTimePage() {
  return (
    <main className="wrap">
      <div className="module-page-header">
        <span className="module-label">Utilities</span>
        <h1>Date &amp; Time</h1>
        <p>Calculate dates, durations, ages, timestamps, and time-zone conversions.</p>
      </div>
      <ModuleToolCatalogue category="date-time" />
    </main>
  );
}
