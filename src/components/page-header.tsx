import Image from "next/image";
import Menu from "@/components/menu";
import { ComponentPropsWithoutRef } from "react";
import { HeaderQueryResult } from "sanity-shared/types";
import { sanityClient } from "@/lib/sanityClient";
import { headerQuery } from "sanity-shared/queries";

interface Props extends ComponentPropsWithoutRef<"section"> {
  imgSrc: string;
}
export default async function PageHeader({ children, imgSrc }: Props) {

  const header_links_data: HeaderQueryResult = (await sanityClient.fetch(headerQuery))

  return (
    <section className="h-[60vh] relative">
      <Image
        alt="Banner Monte Sião Linhares"
        fill
        className="object-cover brightness-50 -z-10"
        priority
        src={imgSrc}
      />
      <div className="absolute h-[60vh] w-full bg-black opacity-30 -z-10"></div>
      <p className="text-3xl md:text-5xl absolute w-full h-[60vh] top-0 font-bold text-white flex items-center justify-center">
        {children}
      </p>
      <Menu headerData={header_links_data}/>
    </section>
  );
}
