"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarDays } from "lucide-react";

import { calendarEvents } from "@/lib/data";
import "./fullcalendar.css";

const MOBILE_BREAKPOINT = 768;

export default function FullCalendarComponent() {
  const calendarRef = useRef<FullCalendar>(null);
  const wasMobileRef = useRef<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const events = useMemo(
    () =>
      calendarEvents.map((event) => ({
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay ?? false,
      })),
    []
  );

  // Switch to a compact month view on small screens instead of squeezing
  // a 7-column time grid onto a phone. Only fires when crossing the
  // breakpoint, so it never overrides a view the person picked manually.
  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      if (wasMobileRef.current === null) {
        wasMobileRef.current = mobile;
        calendarRef.current?.getApi().changeView(mobile ? "dayGridMonth" : "timeGridWeek");
        return;
      }

      if (mobile !== wasMobileRef.current) {
        wasMobileRef.current = mobile;
        calendarRef.current?.getApi().changeView(mobile ? "dayGridMonth" : "timeGridWeek");
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="fc-wrapper">
      {/* HEADER */}
      <div className="fc-header">
        <div className="fc-header-left">
          <div className="fc-icon-badge">
            <CalendarDays size={16} strokeWidth={2.25} />
          </div>
          <div>
            <h2 className="fc-title">Schedule</h2>
            <p className="fc-subtitle">Classes &amp; activities overview</p>
          </div>
        </div>

        <div className="fc-badge">
          <span className="fc-badge-dot" />
          <span>Live</span>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="fc-body">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? "dayGridMonth" : "timeGridWeek"}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
          }}
          dayHeaderFormat={
            isMobile ? { weekday: "narrow" } : { weekday: "short", day: "numeric" }
          }
          events={events}
          height="100%"
          nowIndicator={true}
          selectable={true}
          editable={false}
          dayMaxEvents={true}
          expandRows={true}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
        />
      </div>
    </div>
  );
}