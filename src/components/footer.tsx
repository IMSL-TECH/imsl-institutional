import React from "react";

import Link from "next/link";
import Section from "@/components/section";

import Instagram from "@/components/icons/instagram";
import YouTube from "@/components/icons/youtube";
import { Facebook } from "@/components/icons/facebook";
import Maps from "@/components/maps";

import { sanityClient } from '@/lib/sanityClient'
import { footerQuery } from '@/lib/queries'
import { FooterData } from "@/type";

export default async function Footer() {


  const footer_data: FooterData = await sanityClient.fetch(footerQuery)

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
                <img src={footer_data.logo} alt="Logo" className="w-52" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">{footer_data.programmingTitle}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>{footer_data.programmingText}</p>
              </div>

              <h3 className="font-bold mt-6">{footer_data.helpTitle}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>{footer_data.helpPhone}</p>
              </div>

              <h3 className="font-bold mt-6">{footer_data.locationTitle}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 min-w-2 h-2 bg-teal-400 rounded-full"></div>
                <div>
                  <p className="hidden lg:block">
                    {footer_data.location.split(",")[0]+","+footer_data.location.split(",")[1]}
                  </p>
                  <p className="hidden lg:block">{footer_data.location.split(",")[2]+","+footer_data.location.split(",")[3]}</p>
                  <p className="block lg:hidden">
                    {footer_data.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[300px] relative rounded-lg overflow-hidden">
            <Maps placeUrl={footer_data.mapEmbedUrl} />
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
