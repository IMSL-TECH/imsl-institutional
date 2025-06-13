"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
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

  const selected = useMemo(() => {
    const dateParam = searchParams.get("findDate");
    return dateParam ? new Date(dateParam) : new Date();
  }, [searchParams]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selected);
  const datePickerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const getDaysInMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }, []);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

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

    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
      });
    }

    const nextMonthDays = [];
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const totalDaysToShow = 42; // 6 rows * 7 days
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
  }, [currentDate, getDaysInMonth, getFirstDayOfMonth]);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const prevMonth = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1;
      const prevYear = prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const nextMonth = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1;
      const nextYear = prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
  }, []);

  const handleDateSelect = useCallback(
    (day: number, month: number, year: number) => {
      const newDate = new Date(year, month, day).toISOString();
      const params = new URLSearchParams(searchParams.toString());

      params.set("findDate", newDate);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      setIsOpen(false);
      setCurrentDate(new Date(year, month, day));
    },
    [router, pathname, searchParams]
  );

  const isSelectedDate = useCallback(
    (day: number, month: number, year: number) => {
      return (
        selected.getDate() === day &&
        selected.getMonth() === month &&
        selected.getFullYear() === year
      );
    },
    [selected]
  );

  const isToday = useCallback((day: number, month: number, year: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  }, []);

  const renderShortWeekDays = useMemo(() => {
    return shortWeekDays.map((day) => (
        <div
          key={day}
          className="text-center text-xs font-medium text-gray-500 py-1"
          aria-hidden="true"
        >
          {day}
        </div>
      ))
    
  }, [shortWeekDays])

const renderCalendarDays = useMemo(() => {
  return calendarDays.map((dateObj, index) => (
    <button
      key={index}
      type="button"
      className={`
        h-8 w-8 flex cursor-pointer items-center justify-center text-sm rounded-full mx-auto
        ${!dateObj.isCurrentMonth ? "text-gray-400" : "text-gray-900"}
        ${
          isSelectedDate(dateObj.day, dateObj.month, dateObj.year)
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "hover:bg-gray-100"
        }
        ${
          isToday(dateObj.day, dateObj.month, dateObj.year) &&
          !isSelectedDate(dateObj.day, dateObj.month, dateObj.year)
            ? "border border-blue-500"
            : ""
        }
      `}
      onClick={() =>
        handleDateSelect(dateObj.day, dateObj.month, dateObj.year)
      }
      aria-current={
        isToday(dateObj.day, dateObj.month, dateObj.year)
          ? "date"
          : undefined
      }
      aria-selected={isSelectedDate(
        dateObj.day,
        dateObj.month,
        dateObj.year
      )}
    >
      {dateObj.day}
    </button>
  ));
}, [calendarDays, isSelectedDate, isToday, handleDateSelect]);


  return (
    <div className={`relative inline-block ${className}`} ref={datePickerRef}>
      <button
        type="button"
        className="bg-[#179389] cursor-pointer text-white px-4 py-3 lg:py-2 rounded-lg flex items-center gap-2"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Abrir calendário"
      >
        <span className="hidden lg:block">Calendário</span>
        <Calendar className="h-5 w-5" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 w-72 mt-2 bg-white border rounded-md shadow-lg"
          role="dialog"
          aria-modal="true"
        >
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                className="p-1 cursor-pointer rounded-full hover:bg-gray-100"
                onClick={goToPreviousMonth}
                aria-label="Mês anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="font-semibold" aria-live="polite" aria-atomic="true">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button
                type="button"
                className="p-1 cursor-pointer rounded-full hover:bg-gray-100"
                onClick={goToNextMonth}
                aria-label="Próximo mês"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
              {renderShortWeekDays}
            </div>

            <div className="grid grid-cols-7">
              {renderCalendarDays}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
