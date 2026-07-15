"use client";

import React from "react";
import clsx from "clsx";

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  className?: string; 
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

export default function Table<T>({
  columns,
  data,
  renderRow,
  emptyMessage = "No data available.",
}: TableProps<T>) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead className="bg-slate-50/80">
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.accessor)}
              className={clsx(
                "border-y border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500",
                column.className
              )}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="[&_td]:border-b [&_td]:border-slate-100 [&_td]:px-4 [&_td]:py-3 [&_td]:align-middle [&_tr:last-child_td]:border-b-0 [&_tr]:transition-colors [&_tr]:duration-200 [&_tr:hover]:bg-indigo-50/50">
        {data.length > 0 ? (
          data.map((item, index) => (
            <React.Fragment key={index}>
              {renderRow(item, index)}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="px-4 py-12 text-center text-slate-500"
            >
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}