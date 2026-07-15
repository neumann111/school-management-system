"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { Users } from "lucide-react";

const data = [
  { name: "Total", count: 123, fill: "#F5F3FF" }, // soft purple track
  { name: "Girls", count: 53, fill: "#C084FC" },   // purple accent
  { name: "Boys", count: 70, fill: "#6366F1" },    // indigo accent
];

export default function CountChart() {
  const totalStudents = data.find((d) => d.name === "Total")?.count || 0;
  const boysCount = data.find((d) => d.name === "Boys")?.count || 0;
  const girlsCount = data.find((d) => d.name === "Girls")?.count || 0;

  return (
    <div className="w-full h-full rounded-2xl border border-purple-100 bg-gradient-to-br from-white via-purple-50/90 to-white p-4 flex flex-col shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between shrink-0 mb-2">
        <h1 className="text-base font-semibold text-slate-900 tracking-tight">
          Students Overview
        </h1>

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 ring-1 ring-purple-200">
          <Users
            className="h-3.5 w-3.5 text-indigo-600"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* CHART */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="100%"
            barSize={14}
            data={data}
          >
            <RadialBar
              dataKey="count"
              background={{ fill: "#F5F3FF" }}
              cornerRadius={99}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* CENTER LABEL */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Users className="h-5 w-5 text-purple-400 mb-1" />

          <span className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
            {totalStudents}
          </span>

          <span className="text-[10px] font-semibold text-purple-500 uppercase tracking-wider mt-1">
            Total
          </span>
        </div>
      </div>

      {/* LEGEND */}
      <div className="shrink-0 flex justify-center gap-8 mt-2">

        {/* Boys */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-200" />
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Boys
            </p>
          </div>

          <div className="flex items-baseline gap-1">
            <p className="text-base font-bold text-slate-900 leading-none">
              {boysCount}
            </p>
            <p className="text-[11px] text-indigo-500 font-medium">
              ({Math.round((boysCount / totalStudents) * 100)}%)
            </p>
          </div>
        </div>

        {/* Girls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-200" />
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Girls
            </p>
          </div>

          <div className="flex items-baseline gap-1">
            <p className="text-base font-bold text-slate-900 leading-none">
              {girlsCount}
            </p>
            <p className="text-[11px] text-purple-500 font-medium">
              ({Math.round((girlsCount / totalStudents) * 100)}%)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}