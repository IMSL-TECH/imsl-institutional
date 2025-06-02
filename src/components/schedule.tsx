"use client";

import { formatDateBr } from "@/utils";
import { PortableText } from "@portabletext/react";
import { useState } from "react";
import { FindOneEventByIdQueryResult } from "sanity-shared/types";

type ScheduleType = NonNullable<
  NonNullable<FindOneEventByIdQueryResult>["schedule"]
>[number];

interface ScheduleProps {
  scheduleData: ScheduleType[];
}

const animationTabs = [
  "tabRightCurve",
  "tabRightCurve tabLeftCurve",
  "tabLeftCurve",
];

export default function Schedule({ scheduleData }: ScheduleProps) {
  const [activeTab, setActiveTab] = useState(0);

  const currentSessions = scheduleData[activeTab]?.sessions || [];
  const isShortList = scheduleData.length < 4;

  return (
    <div className="w-full mb-10">
      {/* Tabs */}
      {/* <div
        className={`relative h-[45px] ${
          isShortList
            ? "flex"
            : "overflow-x-auto overflow-y-hidden rounded-t-xl scrollbar-hide lg:overflow-visible"
        }`}
      >
        <div
          className={`flex bg-gray-200 rounded-t-xl h-20 z-0 ${
            isShortList ? "absolute w-full" : "min-w-max"
          }`}
        >
          {scheduleData.map(({ date }, idx) => {
            const { dd, shortMonth } = formatDateBr(date || "");
            const isActive = activeTab === idx;

            const animationClass =
              isActive && scheduleData.length > 1
                ? animationTabs[
                    idx === 0 ? 0 : idx === scheduleData.length - 1 ? 2 : 1
                  ]
                : "";

            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`pb-7 h-full w-full min-w-[80px] px-4 relative z-10 capitalize transition-all duration-200 ${
                  isActive
                    ? `bg-[#179389] rounded-t-xl text-white ${animationClass}`
                    : "text-gray-700 hover:text-[#179389]"
                }`}
              >
                {dd}/{shortMonth}
              </button>
            );
          })}
        </div>
      </div> */}

      <div className="relative h-[45px] w-full">
        <div
          className={`absolute h-20 w-full top-0 rounded-t-xl bg-gray-200 ${
            isShortList
              ? "flex"
              : "overflow-x-auto overflow-y-hidden scrollbar-hide lg:overflow-visible"
          }`}
        >
          <div className="flex w-full">
            {scheduleData.map(({ date }, idx) => {
              const { dd, shortMonth } = formatDateBr(date || "");
              const isActive = activeTab === idx;

              const animationClass =
                isActive && scheduleData.length > 1
                  ? animationTabs[
                      idx === 0 ? 0 : idx === scheduleData.length - 1 ? 2 : 1
                    ]
                  : "";

              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`pb-7 pt-2 h-full w-full min-w-[80px] px-4 relative z-10 capitalize transition-all duration-200 ${
                    isActive
                      ? `bg-[#179389] rounded-t-xl text-white ${animationClass}`
                      : "text-gray-700 hover:text-[#179389]"
                  }`}
                >
                  {dd}/{shortMonth}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div className="flex flex-col gap-2 w-full z-10 relative bg-[#179389] p-3 rounded-xl">
        {currentSessions.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-3">
            <p className="text-md montserrat">
              <strong>{item.title}</strong>
              {item.title && item.starTime ? " - " : ""} {item.starTime}
            </p>
            {item.description && (
              <div className="text-sm montserrat">
                <PortableText value={item.description} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
