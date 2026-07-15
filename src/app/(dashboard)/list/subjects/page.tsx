"use client";

import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { subjectsData, role } from "@/lib/data";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export default function SubjectListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const roleValue = role as string;
  const isAdmin = roleValue === "admin";

  const totalPages = Math.max(1, Math.ceil(subjectsData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = subjectsData.slice(startIndex, startIndex + itemsPerPage);

  const renderRow = (item: Subject) => (
    <tr key={item.id}>
      <td>
        <h3 className="font-semibold text-slate-800">{item.name}</h3>
      </td>
      <td className="hidden text-slate-500 md:table-cell">
        {/* Added a space after the comma for better readability */}
        {item.teachers.join(", ")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <FormModal table="subject" type="update" data={item} id={item.id} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-1 flex-col bg-white px-4 py-4 sm:px-6">
      
      {/* HEADER SECTION */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="hidden text-xl font-bold text-slate-800 md:block">
          All Subjects
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
            {/* FIX: Changed table="teacher" to table="subject" */}
            {isAdmin && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>

      {/* TABLE SECTION - Edge to Edge */}
      <div className="-mx-4 flex-1 overflow-x-auto sm:-mx-6">
        <Table 
          // Dynamically hides the Actions column header if not an admin
          columns={isAdmin ? columns : columns.filter(col => col.accessor !== "action")} 
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