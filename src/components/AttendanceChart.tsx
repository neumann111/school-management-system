"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CalendarCheck2 } from "lucide-react";

const data = [
  { day: "Mon", present: 60, absent: 40 },
  { day: "Tue", present: 70, absent: 30 },
  { day: "Wed", present: 82, absent: 18 },
  { day: "Thu", present: 76, absent: 24 },
  { day: "Fri", present: 91, absent: 9 },
];

export default function AttendanceChart() {
  return (
    <div className="w-full h-full rounded-2xl border border-purple-100 bg-gradient-to-br from-white via-purple-50/90 to-white p-4 flex flex-col shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          Weekly Attendance
        </h2>

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 ring-1 ring-purple-200">
          <CalendarCheck2
            className="h-3.5 w-3.5 text-indigo-600"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex items-center gap-6 mb-4 shrink-0">

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-indigo-500" />
          <span className="text-xs font-medium text-slate-600">
            Present
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-purple-300" />
          <span className="text-xs font-medium text-slate-600">
            Absent
          </span>
        </div>

      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={6}
            barCategoryGap="22%"
          >
            <CartesianGrid
              vertical={false}
              stroke="#E9E5FF"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "#F5F3FF",
              }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E9D5FF",
                backgroundColor: "#fff",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="present"
              fill="#6366F1"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="absent"
              fill="#C084FC"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}