"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { months, shortWeekDays } from "@/utils";

interface DatePickerProps {
  selected?: string;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function DatePicker({ className = "" }: DatePickerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selected = new Date(searchParams.get("findDate")?.toString() || new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selected);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close the date picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selected]);

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Previous month days
    const prevMonthDays = [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: daysInPrevMonth - i,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
      });
    }

    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const nextMonthDays = [];
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const totalDaysToShow = 42; // 6 rows of 7 days
    const remainingDays =
      totalDaysToShow - (prevMonthDays.length + currentMonthDays.length);

    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        day: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1;
      const prevYear =
        prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1;
      const nextYear =
        prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
  };

  // Handle date selection
  const handleDateSelect = (day: number, month: number, year: number) => {
    const newDate = new Date(year, month, day).toString();
    const params = new URLSearchParams(searchParams.toString());

    params.set("findDate", newDate);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return "Select a date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Check if a date is the selected date
  const isSelectedDate = (day: number, month: number, year: number) => {
    if (!selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === month &&
      selected.getFullYear() === year
    );
  };

  // Check if a date is today
  const isToday = (day: number, month: number, year: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className={`relative inline-block ${className}`} ref={datePickerRef}>
      {/* Date Input */}
      <button
        type="button"
        className="bg-teal-500 cursor-pointer text-white px-4 py-3 lg:py-2 rounded-lg flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hidden lg:block">Calendário</span>
        <Calendar className="h-5 w-5" />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-10 w-72 mt-2 bg-white border rounded-md shadow-lg">
          <div className="p-2">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                className="p-1 cursor-pointer rounded-full hover:bg-gray-100"
                onClick={goToPreviousMonth}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="font-semibold">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button
                type="button"
                className="p-1 cursor-pointer rounded-full hover:bg-gray-100"
                onClick={goToNextMonth}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 mb-1">
              {shortWeekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((dateObj, index) => (
                <button
                  key={index}
                  type="button"
                  className={`
                    h-8 w-8 flex cursor-pointer items-center justify-center text-sm rounded-full mx-auto
                    ${!dateObj.isCurrentMonth ? "text-gray-400" : "text-gray-900"}
                    ${isSelectedDate(dateObj.day, dateObj.month, dateObj.year) ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-gray-100"}
                    ${isToday(dateObj.day, dateObj.month, dateObj.year) && !isSelectedDate(dateObj.day, dateObj.month, dateObj.year) ? "border border-blue-500" : ""}
                  `}
                  onClick={() =>
                    handleDateSelect(dateObj.day, dateObj.month, dateObj.year)
                  }
                >
                  {dateObj.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
