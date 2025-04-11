import React from "react";

import Image from "next/image";
import Link from "next/link";
import Section from "@/components/section";

import Instagram from "@/components/icons/instagram";
import YouTube from "@/components/icons/youtube";
import { Facebook } from "@/components/icons/facebook";
import Maps from "@/components/maps";
import logo from "@/assets/logo/PNG BRANCA HORIZONTAL (1).png";

export default function Footer() {
  return (
    <React.Fragment>
      <Section
        backgroundColor="bg-[#179389]"
        className="py-8 flex justify-center gap-6"
      >
        <Link
          href="#"
          className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
        >
          <Instagram className="text-white w-7 h-7" />
        </Link>
        <Link
          href="#"
          className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
        >
          <YouTube className="text-white w-7 h-7" />
        </Link>
        <Link
          href="#"
          className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
        >
          <Facebook className="text-white w-7 h-7" />
        </Link>
      </Section>
      <Section backgroundColor="bg-[#0F2E2F]" className="text-white mt-20">
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full flex items-center justify-center">
                <Image src={logo} alt="Logo" className="w-52" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Programação fixa:</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>Culto aos domingos 18h</p>
              </div>

              <h3 className="font-bold mt-6">Você precisa de ajuda?</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>(27) 99528-0013</p>
              </div>

              <h3 className="font-bold mt-6">Localização:</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 min-w-2 h-2 bg-teal-400 rounded-full"></div>
                <div>
                  <p className="hidden lg:block">
                    Avenida Prefeito Samuel Batista cruz, 8259
                  </p>
                  <p className="hidden lg:block">Três Barras, Linhares/ES</p>
                  <p className="block lg:hidden">
                    Avenida Prefeito Samuel Batista cruz, 8259, Três Barras,
                    Linhares/ES
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[300px] relative rounded-lg overflow-hidden">
            <Maps placeUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.812928913682!2d-40.069291117142!3d-19.377251177287768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb625d90ec2124f%3A0x1acfd1d9b825f1a6!2sIgreja%20Monte%20Si%C3%A3o%20Linhares!5e0!3m2!1spt-BR!2sbr!4v1741886781973!5m2!1spt-BR!2sbr" />
          </div>
        </div>

        <div className="py-4 text-center text-gray-400 text-sm border-t border-teal-700">
          © Copyright Igreja Apostólica Monte Sião Linhares 2024 - Design by
          Redeem™ | Desenvolvido por{" "}
          <Link href={"https://www.reijanlopes.com/"}>Reijan Lopes</Link>
        </div>
      </Section>
    </React.Fragment>
  );
}
