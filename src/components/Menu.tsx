"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  Home,
  GraduationCap,
  Users,
  UserRound,
  School,
  BookOpen,
  ClipboardCheck,
  FileText,
  CalendarCheck,
  CalendarDays,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "Teachers", href: "/list/teachers", icon: GraduationCap },
  { title: "Students", href: "/list/students", icon: Users },
  { title: "Parents", href: "/list/parents", icon: UserRound },
  { title: "Classes", href: "/list/classes", icon: School },
  { title: "Lessons", href: "/list/lessons", icon: BookOpen },
  { title: "Exams", href: "/list/exams", icon: ClipboardCheck },
  { title: "Assignments", href: "/list/assignments", icon: FileText },
  { title: "Attendance", href: "/list/attendance", icon: CalendarCheck },
  { title: "Events", href: "/list/events", icon: CalendarDays },
  { title: "Messages", href: "/list/messages", icon: MessageSquare },
  { title: "Announcements", href: "/list/announcements", icon: Bell },
];

const otherItems = [
  { title: "Profile", href: "#", icon: User },
  { title: "Settings", href: "#", icon: Settings },
  { title: "Logout", href: "/sign-in", icon: LogOut },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-20 lg:w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex items-center justify-center lg:justify-start gap-3 border-b border-slate-100 px-6 py-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>

        {/* hide text on small sidebar */}
        <div className="hidden lg:block">
          <h1 className="text-lg font-bold text-slate-900">
            SchoolMS
          </h1>
          <p className="text-xs text-slate-500">
            School Management System
          </p>
        </div>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 lg:px-4 py-6">

        {/* MENU SECTION */}
        <p className="hidden lg:block mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all justify-center lg:justify-start",
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                )}
              >
                <Icon className="h-5 w-5 transition" />

                {/* hide text on small width */}
                <span className="hidden lg:inline">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* OTHER SECTION */}
        <div className="mt-4">

          <p className="hidden lg:block mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Other
          </p>

          <nav className="space-y-1">
            {otherItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all justify-center lg:justify-start",
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                  )}
                >
                  <Icon className="h-5 w-5" />

                  <span className="hidden lg:inline">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}