"use client";

import { useState } from "react";
import Item from "./item";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SmedCardType {
  title: string;
  link: string;
  image: string | StaticImageData;
}

export default function SmedCard({ items }: {items: SmedCardType[] }) {
  const [isSelect, setIsSelect] = useState(0);

  return (
    <ul className="w-full lg:h-[400px] flex flex-col lg:flex-row gap-2">
      {items.map(({ title, link, image }, idx) => (
        <Item 
        isSelect={isSelect === idx ? "w-full lg:w-[47.22%]" : "w-full lg:w-[26.39%]"}
          idx={idx} 
          setIsSelect={setIsSelect} 
          key={idx}
        >
          <Link href={link}>
          <Image
            src={image}
            alt="Banner Monte Sião Linhares"
            fill
            className={`${isSelect === idx ? "" : "lg:grayscale-100 brightness-50"} transition-all duration-300 object-cover  rounded-xl`}
            priority
          />
          <div className="flex justify-between items-center min-h-52 lg:h-full gap-4 text-white">
            
            <div
            className={`border absolute top-4 right-4 flex items-center justify-center bg-white rounded-full h-10 w-10 transition-all duration-300 ${
              isSelect === idx ? "opacity-100" : "opacity-100 lg:opacity-0 lg:translate-x-4"
            }`}
          >
            <ArrowRight className=" w-5 h-5 text-black" />
          </div>
            <div className=" absolute bottom-0 left-0 p-4 pb-6 bg-linear-to-b from-transparent from-0% to-black to-100% pt-16 w-full rounded-b-lg">
              <h3 className={`text-xl font-bold mb-2 text-left`}>{title}</h3>
            </div>
          </div>
          </Link>

        </Item>
      ))}
    </ul>
  );
}