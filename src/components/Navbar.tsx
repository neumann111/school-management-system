"use client";

import { Bell, MessageSquare, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      
      {/* LEFT: Title / Search */}
      <div className="flex items-center gap-4">
        <h1 className="hidden text-lg font-semibold text-slate-800 md:block">
          Dashboard
        </h1>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-slate-600">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* Mobile search button */}
        <button className="rounded-xl bg-slate-100 p-2 text-slate-600 md:hidden">
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
          <Bell className="h-5 w-5" />

          {/* notification dot */}
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Messages */}
        <button className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
          <MessageSquare className="h-5 w-5" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600"></div>

          <div className="hidden leading-tight md:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin User
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}