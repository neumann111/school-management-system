"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { Plus, Pencil, Trash2, X, AlertTriangle } from "lucide-react";

/* ==========================================================
   Lazy Loaded Forms with Skeletons
========================================================== */

const FormSkeleton = () => (
  <div className="flex flex-col gap-6 animate-pulse p-2">
    <div className="h-8 w-48 rounded-lg bg-slate-200" />
    <div className="h-4 w-64 rounded-lg bg-slate-100 mb-4" />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="h-12 rounded-xl bg-slate-100" />
      <div className="h-12 rounded-xl bg-slate-100" />
      <div className="h-12 rounded-xl bg-slate-100" />
      <div className="h-12 rounded-xl bg-slate-100" />
    </div>
  </div>
);

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <FormSkeleton />,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <FormSkeleton />,
});

// Use Record<string, unknown> instead of any
const forms: {
  [key: string]: (
    type: "create" | "update",
    data?: Record<string, unknown>
  ) => ReactElement | null;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

/* ==========================================================
   Types & Configuration
========================================================== */

type ModalProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: Record<string, unknown>; // Fixed 'any' here
  id?: number | string;
};

const config = {
  create: {
    icon: Plus,
    buttonStyles:
      "bg-indigo-50 text-indigo-600 ring-indigo-200 hover:bg-indigo-100 hover:ring-indigo-300",
    size: "h-8 w-8",
  },
  update: {
    icon: Pencil,
    buttonStyles:
      "bg-violet-50 text-violet-600 ring-violet-200 hover:bg-violet-100 hover:ring-violet-300",
    size: "h-7 w-7",
  },
  delete: {
    icon: Trash2,
    buttonStyles:
      "bg-rose-50 text-rose-600 ring-rose-200 hover:bg-rose-100 hover:ring-rose-300",
    size: "h-7 w-7",
  },
};

/* ==========================================================
   Main Component
========================================================== */

export default function FormModal({ table, type, data, id }: ModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const CurrentIcon = config[type].icon;

  // Changed from a component <FormContent /> to a standard helper function
  const renderFormContent = () => {
    // ----------------- DELETE STATE -----------------
    if (type === "delete" && id) {
      return (
        <form className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <AlertTriangle size={32} />
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-800">
            Delete {table.charAt(0).toUpperCase() + table.slice(1)}?
          </h2>
          <p className="mb-8 text-sm text-slate-500">
            Are you sure you want to delete this record? All associated data
            will be permanently removed. This action cannot be undone.
          </p>
          <div className="flex w-full gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-rose-600 hover:shadow-lg"
            >
              Delete
            </button>
          </div>
        </form>
      );
    }

    // ----------------- CREATE / UPDATE STATE -----------------
    if (type === "create" || type === "update") {
      return forms[table] ? (
        forms[table](type, data)
      ) : (
        <div className="p-10 text-center text-slate-500">
          Form for <strong>{table}</strong> is under construction.
        </div>
      );
    }

    return "Form not found!";
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center justify-center rounded-full ring-1 transition-all duration-200 ${config[type].size} ${config[type].buttonStyles}`}
        title={`${type} ${table}`}
      >
        <CurrentIcon size={type === "create" ? 16 : 14} strokeWidth={2.5} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="animate-in fade-in zoom-in-95 relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl ring-1 ring-slate-900/5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="custom-scrollbar overflow-y-auto p-4 sm:p-6 md:p-8">
              {/* Call the function here instead of using JSX tags */}
              {renderFormContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}