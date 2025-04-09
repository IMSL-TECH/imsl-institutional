"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Item = {
  title: string;
  image: string;
  link: string;
};
export default function Carousel({items}: {items: Item[]}) {
  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-auto"
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!transition-all relative duration-500 !h-[277px]"
          >
            <Link className="w-full h-full" href={item.link}>
            <Image
              src={item?.image}
              alt={`Slide ${index + 1}`}
              height={200}
              width={200}
              className="w-full h-full transition-all object-cover rounded-lg "
            />
            <div className="flex justify-between items-center min-h-52 lg:h-full gap-4 text-white">
              {/* <div>{item?.title}</div> */}
              <div
                className="border absolute top-4 right-4 flex items-center justify-center bg-white rounded-full h-10 w-10 custom-arrow"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
              <div className="absolute bottom-0 left-0 p-4 pb-6 smed-title">
                <h3 className="text-xl font-bold mb-2">{item?.title}</h3>
              </div>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
