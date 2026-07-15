"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: PaginationProps) {
  
  // State for our custom dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rowOptions = [5, 10, 15, 20, 50];

  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 1) return [1];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Page Info & Row Selector */}
      <div className="flex items-center gap-4 text-sm text-slate-500">
        
        {/* CUSTOM DROPDOWN */}
        {onItemsPerPageChange && itemsPerPage && (
          <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
            <label className="font-medium text-slate-600">
              Rows:
            </label>
            
            <div className="relative">
              {/* Trigger Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-8 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                <span>{itemsPerPage}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Click outside overlay */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}

              {/* Dropdown Menu (Pops Upwards) */}
              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 z-40 mb-2 w-full min-w-[80px] overflow-hidden rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {rowOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        onItemsPerPageChange(size);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                        itemsPerPage === size
                          ? "bg-gradient-to-r from-indigo-50 to-violet-50 font-semibold text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <p>
          Page <span className="font-semibold text-slate-700">{currentPage}</span> of{" "}
          <span className="font-semibold text-slate-700">{Math.max(1, totalPages)}</span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="px-2 text-sm font-medium text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}