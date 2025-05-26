"use client";
import { parseISO, isSameDay } from 'date-fns'
import { useState } from "react";
import EventItem from "./item";
import { ArrowRight, MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { HomePageEventsQueryResult } from "sanity-shared/types";
import { PortableText } from "@portabletext/react";
import { formatDateBr, formatDateEventCard, getEventDateRange } from "@/utils";


export default function EventCard( {items} : {items:HomePageEventsQueryResult}) {
  const [isSelect, setIsSelect] = useState(0);
 

  return (
    <ul className="w-full lg:h-[400px] flex flex-col lg:flex-row gap-2">
      {items.map(({ title, shortDescription, address, schedule, background, _id }, idx) => (
        <EventItem
          singleEventUrl={`/events/${_id}`}
          isSelect={
            isSelect === idx ? "w-full lg:w-[47.22%]" : "w-full lg:w-[26.39%]"
          }
          idx={idx}
          setIsSelect={setIsSelect}
          key={idx}
        >
          {background && <Image
            src={background}
            alt="Banner monte sião linhares"
            fill
            className={`${isSelect === idx ? "lg:grayscale-0 brightness-50" : "lg:grayscale-100 brightness-50"} transition-all duration-300 object-cover rounded-xl`}
            priority
          />}
          <div className="relative flex flex-col pt-7 justify-between min-h-52 lg:h-full z-10 text-white">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{title}</h2>
              <div className="text-sm text-gray-200 mt-1">
                {shortDescription && <PortableText  value={shortDescription} />}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 justify-between lg:justify-start">
              <div
                className={`mt-2 text-sm text-white transition-all duration-300`}
              >
                <p className="font-semibold !text-left">{formatDateEventCard(schedule)}</p> 
                <p className="!text-left">{`${schedule && schedule[0].startTime} à ${schedule &&  schedule[0].endTime} `}</p>
              </div>
              <span
                className={`bg-gray-800 !text-left text-white px-3 py-2 rounded-full text-xs flex items-center gap-1 ${
                  isSelect === idx
                    ? "opacity-100"
                    : "opacity-100 lg:opacity-0 lg:translate-x-4"
                }`}
              >
                <MapPin className="w-5 h-5" />{" "}
                <p className="truncate max-w-20">{address}</p>
              </span>
            </div>
          </div>
          <div
            className={`border absolute top-7 right-4 flex items-center justify-center bg-white rounded-full h-10 w-10 transition-all duration-300 ${
              isSelect === idx
                ? "opacity-100"
                : "opacity-100 lg:opacity-0 lg:translate-x-4"
            }`}
          >
            <ArrowRight className="w-5 h-5 text-black" />
          </div>
        </EventItem>
      ))}
    </ul>
  );
}
