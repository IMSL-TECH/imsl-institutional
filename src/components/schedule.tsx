"use client";

import { formatDateBr, shortMonths } from "@/utils";
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

const scheduleData: ScheduleDay[] = [
  {
    date: "Thu May 22 2025 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
    events: [
      {
        time: "17:30h",
        title: "Credenciamento",
        type: "credenciamento",
      },
      {
        time: "18:00h",
        title: "Liberação das Oficinas totalmente online",
        type: "oficina",
      },
      {
        time: "19h30 - Pr. Jucimar Ramos",
        title: "Plenária I | Abertura",
        type: "abertura",
      },
    ],
  },
  {
    date: "Thu May 23 2025 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
    events: [
      {
        time: "09:00h",
        title: "Sessão Matinal",
        type: "oficina",
      },
      {
        time: "14:00h",
        title: "Plenária II",
        type: "abertura",
      },
    ],
  },
  {
    date: "Thu May 24 2025 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
    events: [
      {
        time: "09:00h",
        title: "Sessão Matinal",
        type: "oficina",
      },
      {
        time: "14:00h",
        title: "Plenária II",
        type: "abertura",
      },
    ],
  },
  {
    date: "Thu May 25 2025 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
    events: [
      {
        time: "10:00h",
        title: "Encerramento",
        type: "abertura",
      },
    ],
  },
];

const animationTabs = [
  "tabRightCurve",
  "tabRightCurve tabLeftCurve",
  "tabLeftCurve",
];

type ScheduleType = NonNullable<NonNullable<FindOneEventByIdQueryResult>["schedule"]>[number];

function formatData(data: ScheduleType){

  return 
}


export default function Schedule({scheduleData}: {scheduleData: ScheduleType[]}) {
  const [activeTab, setActiveTab] = useState(0);

  const session = scheduleData?.[activeTab]?.sessions || []

  return (
    <div className="w-full mb-10">
      <div className="flex relative h-[45px]">
        <div className="absolute bg-gray-200 w-full rounded-t-xl h-20 z-0 flex">
          {scheduleData.map(({date}, idx) => {
            const {dd, shortMonth} = formatDateBr(date || "");
            const isActive = activeTab === idx;

            let animationClass = "";
            if (isActive) {
              if (idx === 0) animationClass = animationTabs[0];
              else if (idx === scheduleData.length - 1) animationClass = animationTabs[2];
              else animationClass = animationTabs[1];
            }

            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`pb-7 h-full w-full relative z-10 capitalize ${
                  isActive
                    ? `bg-[#179389] rounded-t-xl text-white ${animationClass}`
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
            <p className="text-lg font-bold montserrat">{item.starTime}</p>
            <p className="text-start montserrat">{item.title}</p>
            <p className="text-sm montserrat">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
