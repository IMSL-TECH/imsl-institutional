import Image from "next/image";
import Menu from "@/components/menu";
import { ComponentPropsWithoutRef } from "react";
import Section from "./section";

interface Props extends ComponentPropsWithoutRef<"section"> {
  imgSrc: string;
}
export default function PageHeader({ children, imgSrc }: Props) {
  return (
    <section className="h-[60vh] relative">
      <Image
        alt="Banner monte sião linhares"
        fill
        className="object-cover brightness-50 -z-10"
        priority
        src={imgSrc}
      />
      <div className="absolute h-[60vh] w-full bg-black opacity-30 -z-10"></div>
      <Section className="pt-6 md:pt-7 z-10">
        <Menu />
      </Section>

      <p className="text-3xl md:text-5xl absolute w-full h-[60vh] top-0 font-bold text-white flex items-center justify-center">
        {children}
      </p>
    </section>
  );
}
