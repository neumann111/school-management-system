"use client";

import { Search } from "lucide-react";

interface TableSearchProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function TableSearch({
  value = "",
  placeholder = "Search...",
  onChange,
}: TableSearchProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        // Flattened this className to a single line to prevent SSR hydration errors
        className="h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-indigo-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}