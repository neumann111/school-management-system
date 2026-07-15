"use client";

import dynamic from "next/dynamic";
import UserCard from "@/components/UserCard";
import Announcements from "@/components/Announcements";
import { Users, GraduationCap, UserRound, UserCheck } from "lucide-react";

// 1. Dynamically import all components that rely on browser APIs (like Recharts and React-Calendar)
const EventCalendar = dynamic(() => import("@/components/EventCalendar"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] rounded-2xl border border-indigo-100 bg-slate-50 animate-pulse" />
  ),
});

const CountChart = dynamic(() => import("@/components/CountChart"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl border border-purple-100 bg-slate-50 animate-pulse" />
  ),
});

const AttendanceChart = dynamic(() => import("@/components/AttendanceChart"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl border border-purple-100 bg-slate-50 animate-pulse" />
  ),
});

const FinanceChart = dynamic(() => import("@/components/FinanceChart"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl border border-indigo-100 bg-slate-50 animate-pulse" />
  ),
});

export default function AdminPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* LEFT SECTION */}
      <div className="flex h-full flex-col gap-6 lg:col-span-3">
        
        {/* TOP STATS */}
        <section className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <UserCard
            title="Students"
            value={1200}
            icon={Users}
            bgColor="bg-gradient-to-br from-white via-indigo-50/90 to-white border-indigo-100"
          />
          <UserCard
            title="Teachers"
            value={85}
            icon={GraduationCap}
            bgColor="bg-gradient-to-br from-white via-violet-50/90 to-white border-violet-100"
          />
          <UserCard
            title="Parents"
            value={540}
            icon={UserRound}
            bgColor="bg-gradient-to-br from-white via-sky-50/90 to-white border-sky-100"
          />
          <UserCard
            title="Staff"
            value={120}
            icon={UserCheck}
            bgColor="bg-gradient-to-br from-white via-pink-50/90 to-white border-pink-100"
          />
        </section>

        {/* MIDDLE CHARTS */}
        <section className="grid shrink-0 grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-[320px] lg:h-72">
            <CountChart />
          </div>

          <div className="h-[320px] lg:h-72">
            <AttendanceChart />
          </div>
        </section>

        {/* FINANCE */}
        <section className="min-h-[320px] flex-1">
          <FinanceChart />
        </section>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="flex h-full flex-col gap-6">
        <div className="shrink-0">
          <EventCalendar />
        </div>

        <div className="min-h-[300px] flex-1">
          <Announcements />
        </div>
      </div>
    </div>
  );
}