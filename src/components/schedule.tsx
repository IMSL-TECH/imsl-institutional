"use client";

import { formatDateBr, shortMonths } from "@/utils";
import { PortableText } from "@portabletext/react";
import { useState } from "react";
import { FindOneEventByIdQueryResult } from "sanity-shared/types";

interface Event {
  time: string;
  title: string;
  subtitle?: string;
  type: string;
}
interface ScheduleDay {
  date: string;
  events: Event[];
}

const animationTabs = [
  "tabRightCurve",
  "tabRightCurve tabLeftCurve",
  "tabLeftCurve",
];

type ScheduleType = NonNullable<
  NonNullable<FindOneEventByIdQueryResult>["schedule"]
>[number];


export default function Schedule({
  scheduleData,
}: {
  scheduleData: ScheduleType[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  const session = scheduleData?.[activeTab]?.sessions || [];

  return (
    <div className="w-full mb-10">
      <div className="flex relative h-[45px]">
        <div className="absolute bg-gray-200 w-full rounded-t-xl h-20 z-0 flex">
          {scheduleData.map(({ date }, idx) => {
            const { dd, shortMonth } = formatDateBr(date || "");
            const isActive = activeTab === idx;

            let animationClass = "";
            if (isActive) {
              if (idx === 0) animationClass = animationTabs[0];
              else if (idx === scheduleData.length - 1)
                animationClass = animationTabs[2];
              else animationClass = animationTabs[1];
            }

            const length = scheduleData?.[1];

            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`pb-7 h-full w-full relative z-10 capitalize ${
                  isActive
                    ? `bg-[#179389] rounded-t-xl text-white ${length && animationClass}`
                    : ""
                }`}
              >
                {dd}/{shortMonth}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full z-10 relative bg-[#179389] p-3 rounded-xl">
        {session.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-2">
            <p className="text-md montserrat">  <strong>{item.title}</strong> {item.title&&"-"} {item.starTime}</p>
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
