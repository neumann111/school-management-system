"use client";

import dynamic from "next/dynamic";
import Announcements from "@/components/Announcements";

const FullCalendar = dynamic(() => import("@/components/FullCalendar"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[500px] rounded-2xl border border-emerald-100 bg-slate-50 animate-pulse" />
  ),
});

const EventCalendar = dynamic(() => import("@/components/EventCalendar"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] rounded-2xl border border-emerald-100 bg-slate-50 animate-pulse" />
  ),
});

export default function TeacherPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* LEFT */}
      <div className="lg:col-span-3 flex flex-col h-full">
        <div className="flex-1 min-h-[500px] overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
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