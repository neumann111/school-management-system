"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Wallet } from "lucide-react";

const data = [
  { month: "Jan", income: 4200, expense: 2800 },
  { month: "Feb", income: 4600, expense: 3100 },
  { month: "Mar", income: 5100, expense: 3600 },
  { month: "Apr", income: 4800, expense: 3400 },
  { month: "May", income: 5600, expense: 3900 },
  { month: "Jun", income: 6100, expense: 4300 },
  { month: "Jul", income: 5900, expense: 4100 },
  { month: "Aug", income: 6400, expense: 4600 },
  { month: "Sep", income: 6700, expense: 4900 },
  { month: "Oct", income: 6900, expense: 5100 },
  { month: "Nov", income: 7200, expense: 5500 },
  { month: "Dec", income: 7600, expense: 5800 },
];

export default function FinanceChart() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/30 to-white p-4 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between shrink-0">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          Finance Overview
        </h2>

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 ring-1 ring-indigo-200">
          <Wallet
            className="h-3.5 w-3.5 text-indigo-600"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center gap-6 shrink-0">

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-indigo-500 shadow-sm shadow-indigo-200" />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-600">
            Income
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-violet-400 shadow-sm shadow-violet-200" />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-600">
            Expense
          </span>
        </div>

      </div>

      {/* Chart */}
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EDE9FE"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#E9D5FF",
                strokeWidth: 1,
              }}
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #E9D5FF",
                backgroundColor: "#FFFFFF",
                boxShadow:
                  "0 12px 30px rgba(99,102,241,0.10)",
              }}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#6366F1",
              }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#A78BFA"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#A78BFA",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}