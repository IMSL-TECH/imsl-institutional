import Image from "next/image";
import Menu from "@/components/menu";
import { ComponentPropsWithoutRef } from "react";
import Section from "./section";
import { HeaderType } from "@/type";
import { sanityClient } from "@/lib/sanityClient";
import { headerQuery } from "@/lib/queries";

interface Props extends ComponentPropsWithoutRef<"section"> {
  imgSrc: string;
}
export default async function PageHeader({ children, imgSrc }: Props) {

  const header_links_data: HeaderType = (await sanityClient.fetch(headerQuery))
  .items;

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
      <Menu menuList={header_links_data}/>
    </section>
  );
}
