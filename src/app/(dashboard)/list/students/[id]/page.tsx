"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Droplet,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Presentation,
} from "lucide-react";

import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import FormModal from "@/components/FormModal";
import FullCalendarComponent from "@/components/FullCalendar";
import { role } from "@/lib/data";

export default function SingleStudentPage() {
  // In a real app, you would fetch this data using the [id] from params.
  const mockStudent = {
    id: 1,
    studentId: "1234567890",
    name: "Cameron Moran",
    email: "cameron@gmail.com",
    phone: "+1 234 567 89",
    address: "1234 Main St, Anytown, USA",
    bloodType: "A+",
    dateOfBirth: "2012-01-01",
    sex: "male",
    grade: 6,
    class: "6A",
    photo: "https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200",
  };

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 xl:grid-cols-3">
      
      {/* ========================================================= */}
      {/* LEFT COLUMN (Spans 2/3 of the screen)                     */}
      {/* ========================================================= */}
      <div className="flex h-full flex-col gap-6 xl:col-span-2">
        
        {/* TOP ROW: Profile & Stats */}
        <div className="flex flex-col gap-6 lg:flex-row">
          
          {/* USER INFO CARD */}
          <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-white p-6 shadow-sm sm:flex-row">
            <div className="flex shrink-0 items-center justify-center sm:items-start">
              <Image
                src={mockStudent.photo}
                alt={mockStudent.name}
                width={120}
                height={120}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-white shadow-sm"
              />
            </div>
            
            <div className="flex w-full flex-col justify-between gap-4">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-slate-800">
                  {mockStudent.name}
                </h1>
                {role === "student" && (
                  <FormModal table="student" type="update" data={mockStudent} id={mockStudent.id} />
                )}
              </div>
              
              <p className="text-sm text-slate-500">
                A bright and dedicated student excelling in mathematics and general sciences.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Droplet size={14} className="shrink-0 text-rose-400" />
                  <span>{mockStudent.bloodType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="shrink-0 text-sky-500" />
                  <span>January 2012</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="shrink-0 text-indigo-400" />
                  <span>{mockStudent.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-emerald-500" />
                  <span>{mockStudent.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL STAT CARDS */}
          <div className="grid flex-1 grid-cols-2 gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">90%</h1>
                <span className="text-xs font-medium text-slate-500">Attendance</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                <GraduationCap size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">6th</h1>
                <span className="text-xs font-medium text-slate-500">Grade</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <BookOpen size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">18</h1>
                <span className="text-xs font-medium text-slate-500">Lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Presentation size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">6A</h1>
                <span className="text-xs font-medium text-slate-500">Class</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Schedule */}
        <div className="min-h-[800px] w-full flex-1">
          <FullCalendarComponent />
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT COLUMN (Spans 1/3 of the screen)                      */}
      {/* ========================================================= */}
      <div className="flex h-full flex-col gap-6 xl:col-span-1">
        
        {/* SHORTCUTS */}
        <div className="shrink-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-bold text-slate-800">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium">
            <Link href="/" className="rounded-lg bg-sky-50 px-4 py-2 text-sky-600 transition hover:bg-sky-100 hover:text-sky-700">
              Student&apos;s Lessons
            </Link>
            <Link href="/" className="rounded-lg bg-violet-50 px-4 py-2 text-violet-600 transition hover:bg-violet-100 hover:text-violet-700">
              Student&apos;s Teachers
            </Link>
            <Link href="/" className="rounded-lg bg-amber-50 px-4 py-2 text-amber-600 transition hover:bg-amber-100 hover:text-amber-700">
              Student&apos;s Exams
            </Link>
            <Link href="/" className="rounded-lg bg-rose-50 px-4 py-2 text-rose-600 transition hover:bg-rose-100 hover:text-rose-700">
              Student&apos;s Assignments
            </Link>
            <Link href="/" className="rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 transition hover:bg-indigo-100 hover:text-indigo-700">
              Student&apos;s Results
            </Link>
          </div>
        </div>

        <Performance />
        
        <div className="min-h-[300px] flex-1">
          <Announcements />
        </div>
        
      </div>
    </div>
  );
}