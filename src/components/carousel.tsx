"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import imagePlaceholderSquare from "@/assets/thumbs/placeholder-image-square.png";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HomePageSmedsQueryResult } from "sanity-shared/types";
import { urlFor } from "@/lib/sanityImage";
import { useMemo } from "react";

export default function Carousel({
  items,
}: {
  items: HomePageSmedsQueryResult;
}) {
  const swiperSlides = useMemo(() => {
    if (!items) return null;
  
    return items.map((item: HomePageSmedsQueryResult[number], idx: number) => (
      <SwiperSlide
        key={item._id}
        className="!transition-all relative duration-500 !h-[277px]"
      >
        <Link className="w-full h-full" href={`/smeds#${item._id}`}>
          <Image
            src={urlFor(item?.banner).url() || imagePlaceholderSquare}
            alt={`Slide ${idx + 1}`}
            height={200}
            width={200}
            loading="lazy"
            className="w-full h-full transition-all object-cover rounded-lg"
          />
          <div className="flex justify-between items-center min-h-52 lg:h-full gap-4 text-white">
            <div className="border absolute top-4 right-4 flex items-center justify-center bg-white rounded-full h-10 w-10 custom-arrow">
              <ArrowRight className="w-5 h-5 text-black" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 pt-5 bg-linear-to-b w-full rounded-b-lg from-transparent from-0% to-black to-100% pb-6 smed-title">
              <h3 className="text-xl font-bold !text-start mb-2">
                {item?.title}
              </h3>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    ));
  }, [items]);
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
        {swiperSlides}
      </Swiper>
    </div>
  );
}
