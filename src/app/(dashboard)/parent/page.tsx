"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Announcements from "@/components/Announcements";
import { ChevronDown } from "lucide-react";

const FullCalendar = dynamic(() => import("@/components/FullCalendar"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[500px] rounded-2xl border border-violet-100 bg-slate-50 animate-pulse" />
  ),
});

const EventCalendar = dynamic(() => import("@/components/EventCalendar"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] rounded-2xl border border-violet-100 bg-slate-50 animate-pulse" />
  ),
});

// Dummy children (replace with backend later)
const children = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "Grade 8 • Section A",
  },
  {
    id: 2,
    name: "Liam Johnson",
    grade: "Grade 5 • Section C",
  },
];

export default function ParentPage() {
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* LEFT */}
      <div className="lg:col-span-3 flex flex-col gap-4 h-full">
        {/* Child Selector */}
        <div className="rounded-2xl border border-violet-100 bg-white shadow-sm p-5 z-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Header */}
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                My Children
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {children.length} child
                {children.length > 1 ? "ren" : ""} linked to this account.
                Select one to view their timetable.
              </p>
            </div>

            {/* Dropdown */}
            <div className="relative w-full sm:w-[300px]">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-xl border border-violet-100 bg-white px-4 py-3 text-left transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:shadow-md hover:shadow-violet-100/50 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-semibold text-white shadow-sm">
                    {selectedChild.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-slate-800">
                      {selectedChild.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedChild.grade}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Click outside */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full z-40 mt-2 w-full overflow-hidden rounded-xl border border-violet-100 bg-white p-1.5 shadow-xl shadow-violet-100/50 transition-all duration-200">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setSelectedChild(child);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-all duration-150 ${
                        selectedChild.id === child.id
                          ? "border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50"
                          : "border-transparent hover:border-violet-100 hover:bg-violet-50/70"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-semibold text-white">
                        {child.name.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            selectedChild.id === child.id
                              ? "text-violet-700"
                              : "text-slate-800"
                          }`}
                        >
                          {child.name}
                        </p>

                        <p
                          className={`text-xs ${
                            selectedChild.id === child.id
                              ? "text-violet-500"
                              : "text-slate-500"
                          }`}
                        >
                          {child.grade}
                        </p>
                      </div>

                      {selectedChild.id === child.id && (
                        <span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold text-violet-700">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="relative z-10 flex-1 min-h-[500px] overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
          <FullCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-1 flex flex-col gap-6 h-full">
        <div className="shrink-0">
          <EventCalendar />
        </div>

        <div className="flex-1 min-h-[300px]">
          <Announcements />
        </div>
      </div>
    </div>
  );
}