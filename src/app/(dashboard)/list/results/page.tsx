"use client";

import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role } from "@/lib/data";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  date: string;
  score: number;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "subject", // Fixed from "name" to match the Result type
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export default function ResultListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.max(1, Math.ceil(resultsData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = resultsData.slice(startIndex, startIndex + itemsPerPage) as Result[];

  const renderRow = (item: Result) => (
    <tr key={item.id}>
      <td>
        <h3 className="font-semibold text-slate-800">{item.subject}</h3>
      </td>
      <td className="text-slate-600">{item.student}</td>
      <td className="hidden md:table-cell">
        <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          {item.score}
        </span>
      </td>
      <td className="hidden text-slate-500 md:table-cell">{item.teacher}</td>
      <td className="hidden text-slate-500 md:table-cell">{item.class}</td>
      <td className="hidden text-slate-500 md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {canEdit && (
            <>
              <FormModal table="result" type="update" data={item} id={item.id} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const currentRole = role as "admin" | "teacher" | "student";
  const canEdit = currentRole === "admin" || currentRole === "teacher";

  return (
    <div className="flex flex-1 flex-col bg-white px-4 py-4 sm:px-6">
      
      {/* HEADER SECTION */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="hidden text-xl font-bold text-slate-800 md:block">
          All Results
        </h1>

        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button 
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-800" 
              title="Filter"
            >
              <Filter size={14} strokeWidth={2.5} />
            </button>
            <button 
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-800" 
              title="Sort"
            >
              <SlidersHorizontal size={14} strokeWidth={2.5} />
            </button>
            {canEdit && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>

      {/* TABLE SECTION - Edge to Edge */}
      <div className="-mx-4 flex-1 overflow-x-auto sm:-mx-6">
        <Table 
          // Dynamically hides the Actions column header if not an admin or teacher
          columns={canEdit ? columns : columns.filter(col => col.accessor !== "action")} 
          renderRow={renderRow} 
          data={paginatedData} 
        />
      </div>

      {/* PAGINATION SECTION */}
      <div className="mt-2 shrink-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(newLimit: number) => {
            setItemsPerPage(newLimit);
            setCurrentPage(1); 
          }}
        />
      </div>

    </div>
  );
}