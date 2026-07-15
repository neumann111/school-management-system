"use client";

import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, role } from "@/lib/data";

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

type Role = "admin" | "student";
const currentRole: Role = role as Role;

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export default function ClassListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.max(1, Math.ceil(classesData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = classesData.slice(startIndex, startIndex + itemsPerPage);

  const renderRow = (item: Class) => (
    <tr key={item.id}>
      <td>
        <h3 className="font-semibold text-slate-800">{item.name}</h3>
      </td>
      <td className="hidden text-slate-500 md:table-cell">{item.capacity}</td>
      <td className="hidden text-slate-500 md:table-cell">{item.grade}</td>
      <td className="hidden text-slate-500 md:table-cell">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          {currentRole === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} id={item.id} />
              <FormModal table="class" type="delete" id={item.id} />
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
          All Classes
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
            {currentRole === "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>

      {/* TABLE SECTION - Edge to Edge */}
      <div className="-mx-4 flex-1 overflow-x-auto sm:-mx-6">
        <Table columns={columns} renderRow={renderRow} data={paginatedData} />
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