"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Filter, SlidersHorizontal } from "lucide-react";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function TeacherListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // 1. Change this from a constant to a State variable
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const currentRole = role as string;
  const isTeacher = currentRole === "teacher";

  const totalPages = Math.max(1, Math.ceil(teachersData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = teachersData.slice(startIndex, startIndex + itemsPerPage);

  const renderRow = (item: Teacher) => (
    <tr key={item.id}>
      <td>
        <div className="flex items-center gap-3">
          <Image
            src={item.photo}
            alt={item.name}
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-100 md:hidden xl:block"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-slate-800">{item.name}</h3>
            <p className="text-xs text-slate-500">{item.email}</p>
          </div>
        </div>
      </td>
      <td className="hidden text-slate-600 md:table-cell">{item.teacherId}</td>
      <td className="hidden text-slate-500 md:table-cell">{item.subjects.join(", ")}</td>
      <td className="hidden text-slate-500 md:table-cell">{item.classes.join(", ")}</td>
      <td className="hidden text-slate-500 lg:table-cell">{item.phone}</td>
      <td className="hidden text-slate-500 lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 hover:ring-slate-300"
              title="View Profile"
            >
              <Eye size={14} strokeWidth={2.5} />
            </button>
          </Link>
          {isTeacher && (
            <>
              <FormModal table="teacher" type="update" data={item} id={item.id} />
              <FormModal table="teacher" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    // Reduced padding and removed the outer border/shadow
    <div className="flex flex-1 flex-col bg-white px-4 py-4 sm:px-6">
      
      {/* HEADER SECTION */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="hidden text-xl font-bold text-slate-800 md:block">
          All Teachers
        </h1>

        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <TableSearch />

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-800" title="Filter">
              <Filter size={14} strokeWidth={2.5} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-800" title="Sort">
              <SlidersHorizontal size={14} strokeWidth={2.5} />
            </button>
            {isTeacher && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* TABLE SECTION - Now Edge to Edge */}
      <div className="-mx-4 flex-1 overflow-x-auto sm:-mx-6">
        <Table columns={columns} renderRow={renderRow} data={paginatedData} />
      </div>

      {/* PAGINATION SECTION */}
      <div className="mt-2 shrink-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
          // New Props
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(newLimit: number) => {
            setItemsPerPage(newLimit);
            setCurrentPage(1); // Force back to page 1 so we don't end up out of bounds
          }}
        />
      </div>

    </div>
  );
}