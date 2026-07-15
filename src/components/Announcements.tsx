"use client";

import { Bell } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Parent-Teacher Meeting Scheduled",
    date: "2025-01-01",
    message:
      "All parents are requested to attend the scheduled meeting for progress discussion.",
    type: "info",
  },
  {
    id: 2,
    title: "Exam Timetable Released",
    date: "2025-01-01",
    message:
      "Final exam schedule for all grades has been published in the portal.",
    type: "warning",
  },
  {
    id: 3,
    title: "Holiday Announcement",
    date: "2025-01-01",
    message:
      "School will remain closed due to regional holiday declaration.",
    type: "event",
  },
];

export default function Announcements() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/20 to-white p-4 shadow-sm">

      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between shrink-0">
        <h2 className="text-base font-semibold text-slate-900">
          Announcements
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs text-indigo-500 font-medium cursor-pointer hover:underline">
            View all
          </span>

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 ring-1 ring-indigo-200">
            <Bell className="h-3.5 w-3.5 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3 overflow-y-auto pr-1">

        {announcements.map((item, i) => (
          <div
            key={item.id}
            className="relative rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:shadow-md"
          >
            {/* accent bar */}
            <div
              className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${
                i === 0
                  ? "bg-indigo-400"
                  : i === 1
                  ? "bg-violet-400"
                  : "bg-indigo-300"
              }`}
            />

            {/* CONTENT */}
            <div className="pl-2">

              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-700 truncate">
                  {item.title}
                </h3>

                <span className="text-[10px] text-indigo-500 whitespace-nowrap">
                  {item.date}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                {item.message}
              </p>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}