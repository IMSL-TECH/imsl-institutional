"use client";
import { useState, useMemo } from "react";
import EventItem from "./item";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { HomePageEventsQueryResult } from "sanity-shared/types";
import { PortableText } from "@portabletext/react";
import {
  formatDateEventCard,
  getEventDateRange,
  getFirstValidSession,
  isOneDayEvent,
  limitPortableTextBlocks,
} from "@/utils";

interface EventCardProps {
  items: HomePageEventsQueryResult;
}

export default function EventCard({ items }: EventCardProps) {
  const [isSelect, setIsSelect] = useState(0);

  // Memoizar lista de eventos processados para evitar recálculo desnecessário
  const processedItems = useMemo(() => {
    if (!items) return [];

    return items.map(({ title, shortDescription, address, schedule, background, _id }) => {
      const limitedContent = limitPortableTextBlocks(shortDescription, 200);
      const date = getFirstValidSession(schedule);
      const { first, last } = getEventDateRange(schedule);
      const oneDayEvent = isOneDayEvent(first?.date || "", last?.date || "");

      return {
        title,
        limitedContent,
        address,
        schedule,
        background,
        _id,
        date,
        oneDayEvent,
      };
    });
  }, [items]);

  if (!items) return null;

  const renderedItems = useMemo(() => {  
    return processedItems.map(
      (
        {
          title,
          limitedContent,
          address,
          schedule,
          background,
          _id,
          date,
          oneDayEvent,
        },
        idx
      ) => (
        <EventItem
          singleEventUrl={`/events/${_id}`}
          isSelect={
            isSelect === idx ? "w-full lg:w-[47.22%]" : "w-full lg:w-[26.39%]"
          }
          idx={idx}
          setIsSelect={setIsSelect}
          key={_id}
        >
          {background && (
            <Image
              src={background}
              alt={`${title} banner`}
              fill
              className={`${
                isSelect === idx ? "lg:grayscale-0" : "lg:grayscale-100"
              } brightness-[0.4] lg:brightness-50 transition-all duration-300 object-cover rounded-xl`}
              priority
            />
          )}
          <div className="relative flex flex-col pt-14 justify-between min-h-52 lg:h-full z-10 text-white">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-start font-bold">{title}</h2>
              <div
                className={`${
                  isSelect === idx ? "block" : "lg:hidden"
                } text-sm text-gray-200 max-h-[130px] text-overflow text-ellipsis py-4`}
              >
                {limitedContent && <PortableText value={limitedContent} />}
              </div>
            </div>
  
            <div className="flex items-center gap-2 justify-between lg:justify-start mt-2">
              <div className="mt-2 text-sm text-white transition-all duration-300">
                <p className="font-semibold !text-left min-w-[106px]">
                  {formatDateEventCard(schedule)}
                </p>
                {date?.starTime && date?.endTime && (
                  <p className="!text-left">
                    {date.starTime}
                    {!oneDayEvent ? "" : ` - ${date.endTime}`}
                  </p>
                )}
              </div>
              <span
                className={`bg-gray-800 !text-left text-white px-3 py-2 rounded-full text-xs flex items-center gap-1 transition-opacity duration-300 ${
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
            className={`border absolute top-4 right-4 flex items-center justify-center bg-white rounded-full h-10 w-10 transition-all duration-300 ${
              isSelect === idx
                ? "opacity-100"
                : "opacity-100 lg:opacity-0 lg:translate-x-4"
            }`}
          >
            <ArrowRight className="w-5 h-5 text-black" />
          </div>
        </EventItem>
      )
    );
  }, [processedItems, isSelect, setIsSelect]);

  return (
    <ul className="w-full lg:h-[400px] flex flex-col lg:flex-row gap-2">
      {renderedItems}
    </ul>
  );
}
