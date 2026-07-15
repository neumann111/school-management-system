"use client";

import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { MoreHorizontal } from "lucide-react";

const data = [
  { name: "Score", value: 92, fill: "#8b5cf6" },
  { name: "Remaining", value: 8, fill: "#f1f5f9" },
];

export default function Performance() {
  return (
    // FIX 1: Removed `h-80` so the card height dynamically wraps the content
    <div className="relative flex shrink-0 flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800">Performance</h1>
        <button 
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          title="More options"
        >
          <MoreHorizontal size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* CHART CONTAINER */}
      {/* FIX 2: Gave this a strict height (h-36 = 144px) and added top margin */}
      <div className="relative mt-4 h-30 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              // FIX 3: Anchors the semi-circle to the absolute bottom of the 144px box
              cy="100%" 
              innerRadius={70}
              outerRadius={90}
              stroke="none" 
            />
          </PieChart>
        </ResponsiveContainer>

        {/* ABSOLUTE CENTER TEXT */}
        {/* FIX 4: Locked the text to the bottom of the container, inside the chart's arch */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-slate-800">9.2</h1>
          <p className="mt-1 text-xs font-medium text-slate-500">of 10 max LTS</p>
        </div>
      </div>

      {/* FOOTER */}
      <h2 className="mt-6 text-center text-sm font-medium text-slate-600">
        1st Semester - 2nd Semester
      </h2>
      
    </div>
  );
}