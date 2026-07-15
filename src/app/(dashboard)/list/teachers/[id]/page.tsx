"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Droplet,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  Building2,
  BookOpen,
  Presentation,
} from "lucide-react";

import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import FormModal from "@/components/FormModal";
import FullCalendarComponent from "@/components/FullCalendar";
import { role } from "@/lib/data";

export default function SingleTeacherPage() {
  const currentRole = role as string;
  const mockTeacher = {
    id: 1,
    username: "deanguerrero",
    email: "deanguerrero@gmail.com",
    password: "password",
    firstName: "Dean",
    lastName: "Guerrero",
    phone: "+1 234 567 89",
    address: "1234 Main St, Anytown, USA",
    bloodType: "A+",
    dateOfBirth: "2000-01-01",
    sex: "male",
    img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
                src={mockTeacher.img}
                alt={`${mockTeacher.firstName} ${mockTeacher.lastName}`}
                width={120}
                height={120}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-white shadow-sm"
              />
            </div>
            
            <div className="flex w-full flex-col justify-between gap-4">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-slate-800">
                  {mockTeacher.firstName} {mockTeacher.lastName}
                </h1>
                {currentRole === "teacher" && (
                  <FormModal table="teacher" type="update" data={mockTeacher} id={mockTeacher.id} />
                )}
              </div>
              
              <p className="text-sm text-slate-500">
                Senior Mathematics Educator with over 10 years of experience in advanced calculus and curriculum development.
              </p>
              
              {/* FIX: Changed from grid to flex-wrap, added shrink-0 to icons, removed truncate from email */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Droplet size={14} className="shrink-0 text-rose-400" />
                  <span>{mockTeacher.bloodType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="shrink-0 text-sky-500" />
                  <span>January 2000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="shrink-0 text-indigo-400" />
                  <span>{mockTeacher.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-emerald-500" />
                  <span>{mockTeacher.phone}</span>
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
                <Building2 size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">2</h1>
                <span className="text-xs font-medium text-slate-500">Branches</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <BookOpen size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">6</h1>
                <span className="text-xs font-medium text-slate-500">Lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Presentation size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">6</h1>
                <span className="text-xs font-medium text-slate-500">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Schedule */}
        <div className="min-h-[800px] flex-1 w-full">
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
              Teacher&apos;s Classes
            </Link>
            <Link href="/" className="rounded-lg bg-violet-50 px-4 py-2 text-violet-600 transition hover:bg-violet-100 hover:text-violet-700">
              Teacher&apos;s Students
            </Link>
            <Link href="/" className="rounded-lg bg-amber-50 px-4 py-2 text-amber-600 transition hover:bg-amber-100 hover:text-amber-700">
              Teacher&apos;s Lessons
            </Link>
            <Link href="/" className="rounded-lg bg-rose-50 px-4 py-2 text-rose-600 transition hover:bg-rose-100 hover:text-rose-700">
              Teacher&apos;s Exams
            </Link>
            <Link href="/" className="rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 transition hover:bg-indigo-100 hover:text-indigo-700">
              Teacher&apos;s Assignments
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