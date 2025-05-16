"use client";

import { useState } from "react";
import EventItem from "./item";
import { ArrowRight, MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface EventCardProps {
  items: {
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    image: string | StaticImageData;
  }[];
}

export default function EventCard({ items }: EventCardProps) {
  const [isSelect, setIsSelect] = useState(0);

  return (
    <ul className="w-full lg:h-[400px] flex flex-col lg:flex-row gap-2">
      {items.map(({ title, description, location, date, time, image }, idx) => (
        <EventItem
          isSelect={
            isSelect === idx ? "w-full lg:w-[47.22%]" : "w-full lg:w-[26.39%]"
          }
          idx={idx}
          setIsSelect={setIsSelect}
          key={idx}
        >
          <Image
            src={image}
            alt="Banner monte sião linhares"
            fill
            className={`${isSelect === idx ? "lg:grayscale-0 brightness-50" : "lg:grayscale-100 brightness-50"} transition-all duration-300 object-cover rounded-xl`}
            priority
          />
          <div className="relative flex flex-col pt-7 justify-between min-h-52 lg:h-full z-10 text-white">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-sm text-gray-200 mt-1">{description}</p>
            </div>

            <div className="mt-4 flex items-center gap-2 justify-between lg:justify-start">
              <div
                className={`mt-2 text-sm text-white transition-all duration-300`}
              >
                <p className="font-semibold !text-left">{date}</p>
                <p className="!text-left">{time}</p>
              </div>
              <span
                className={`bg-gray-800 !text-left text-white px-3 py-2 rounded-full text-xs flex items-center gap-1 ${
                  isSelect === idx
                    ? "opacity-100"
                    : "opacity-100 lg:opacity-0 lg:translate-x-4"
                }`}
              >
                <MapPin className="w-5 h-5" />{" "}
                <p className="truncate max-w-20">{location}</p>
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
