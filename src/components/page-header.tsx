import Image from "next/image";
import Menu from "@/components/menu";
import { ComponentPropsWithoutRef } from "react";
import { HeaderQueryResult } from "sanity-shared/types";
import { sanityClient } from "@/lib/sanityClient";
import { headerQuery } from "sanity-shared/queries";
import { urlFor } from "@/lib/sanityImage";
import bannerFallback from "@/assets/banners/banner.png";
import { ImageType } from "@/type";
import headerQueryFallback from "@/lib/fallbackdata/headerQuery.json";

interface Props extends ComponentPropsWithoutRef<"section"> {
  imgSrc: ImageType;
}
export default async function PageHeader({ children, imgSrc }: Props) {

  let header_links_data: HeaderQueryResult;
  
  try {
    header_links_data = (await sanityClient.fetch(headerQuery))

  } catch (error) {
    console.error("❌ Sanity fetch failed (header links)", error);
    header_links_data = headerQueryFallback;
  }

  if (!header_links_data) {
    return null;
  }
  


  const banner = imgSrc ? urlFor(imgSrc).width(2560).height(840).url() : bannerFallback
  const banner_mobile = imgSrc ? urlFor(imgSrc).width(750).height(800).url() : bannerFallback

  return (
    <section className="h-[60vh] relative">
      <Image
        alt="Banner Monte Sião Linhares"
        fill
        className={`object-cover ${children && "brightness-50"} hidden lg:block -z-10`}
        priority
        src={banner}
      />
        <Image
        alt="Banner Monte Sião Linhares"
        fill
        className={`object-cover ${children && "brightness-50"}  -z-10 block lg:hidden`}
        priority
        src={banner_mobile}
      />
      {children && <div className="absolute h-[60vh] w-full bg-black opacity-30 -z-10"></div>}
      <p className="text-3xl md:text-5xl absolute w-full h-[60vh] top-0 font-bold text-white flex items-center justify-center">
        {children}
      </p>
      <Menu headerData={header_links_data}/>
    </section>
  );
}
