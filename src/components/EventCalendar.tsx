"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { CalendarDays } from "lucide-react";

type Value = Date | null | [Date | null, Date | null];

const events = [
  {
    id: 1,
    title: "Parent Meeting",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Science Exam",
    time: "1:00 PM",
  },
  {
    id: 3,
    title: "Sports Practice",
    time: "4:00 PM",
  },
];

export default function EventCalendar() {
  const [value, setValue] = useState<Value>(new Date());

  return (
    <div className="flex h-full flex-col rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/30 to-white p-4 shadow-sm">

      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between shrink-0">
        <h2 className="text-base font-semibold text-slate-900">
          Calendar
        </h2>

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 ring-1 ring-indigo-200">
          <CalendarDays className="h-3.5 w-3.5 text-indigo-600" />
        </div>
      </div>

      {/* CALENDAR WRAPPER */}
      <div className="rounded-xl border border-indigo-100 bg-white p-2 overflow-hidden">

        <Calendar
          onChange={setValue}
          value={value}
          className="!border-none !w-full custom-calendar"
        />
      </div>

      {/* EVENTS */}
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">
          Events
        </h3>
      </div>

      <div className="mt-2 flex flex-col gap-2 overflow-y-auto overflow-x-visible pr-1">
        {events.map((event, i) => (
          <div
            key={event.id}
            className="group relative rounded-xl border border-slate-100 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(99,102,241,0.35)] hover:border-indigo-200 hover:bg-indigo-50/20 hover:z-10"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-slate-700 truncate">
                {event.title}
              </p>

              <span className="text-[10px] text-indigo-500 whitespace-nowrap">
                {event.time}
              </span>
            </div>

            <div
              className={`mt-2 h-1 w-full rounded-full ${
                i % 2 === 0 ? "bg-indigo-200" : "bg-violet-200"
              }`}
            />
          </div>
        ))}
      </div>

      {/* CUSTOM STYLES */}
      <style jsx global>{`
        .custom-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
        }

        /* header */
        .react-calendar__navigation {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .react-calendar__navigation button {
          background: transparent;
          min-width: 28px;
          color: #4f46e5;
          font-weight: 600;
          border-radius: 8px;
        }

        .react-calendar__navigation button:enabled:hover {
          background: #eef2ff;
        }

        /* weekday row */
        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-size: 10px;
          color: #64748b;
          font-weight: 600;
        }

        /* day cells */
        .react-calendar__tile {
          padding: 8px 0;
          font-size: 12px;
          border-radius: 10px;
          color: #334155;
        }

        .react-calendar__tile:enabled:hover {
          background: #eef2ff;
        }

        /* active day */
        .react-calendar__tile--active {
          background: #6366f1 !important;
          color: white !important;
          border-radius: 10px;
        }

        /* today */
        .react-calendar__tile--now {
          background: #e0e7ff;
          border-radius: 10px;
        }

        /* fix long text overflow */
        .react-calendar__month-view {
          overflow: hidden;
        }

        .react-calendar__month-view__days__day {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* responsiveness fix */
        @media (max-width: 1024px) {
          .react-calendar__tile {
            font-size: 10px;
            padding: 6px 0;
          }
        }
      `}</style>
    </div>
  );
}