import React from "react";

import Link from "next/link";
import Section from "@/components/section";

import { getSocialIconByName } from "@/components/icons";
import Maps from "@/components/maps";

import { sanityClient } from "@/lib/sanityClient";
import { footerQuery } from "sanity-shared/queries";
import { FooterQueryResult } from "sanity-shared/types";
import { phoneFormat } from "@/utils";
import ResetCookieLink from "./btnResetcookie";


export default async function Footer() {
  const footer_data: FooterQueryResult = await sanityClient.fetch(footerQuery);

  return (
    <React.Fragment>
      <Section
        backgroundColor="bg-[#179389] !py-12"
        className="flex justify-center gap-6"
      >
        {footer_data?.socialLinks &&
          footer_data.socialLinks.map((socialLink, idx) => (
            <Link
              key={idx}
              target="_blank"
              href={socialLink.url || "#"}
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
            >
              {getSocialIconByName(socialLink.plataform)}
            </Link>
          ))}
      </Section>
      <Section backgroundColor="bg-[#0F2E2F]" className="text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full flex items-center justify-center">
                {footer_data?.logo && (
                  <img src={footer_data.logo} alt="Logo" className="w-52" />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">{footer_data?.programmingTitle}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>{footer_data?.programmingText}</p>
              </div>

              <h3 className="font-bold mt-6">{footer_data?.helpTitle}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>{phoneFormat(footer_data?.helpPhone)}</p>
              </div>

              <h3 className="font-bold mt-6">{footer_data?.locationTitle}</h3>
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex lg:items-center relative">
                    <p className="w-2 top-3 min-w-2 h-2 bg-teal-400 rounded-full absolute"></p>{" "}
                    <p className="pl-4">
                      {footer_data?.address?.street},{" "}
                      {footer_data?.address?.number}
                    </p>
                  </div>
                  <p className="pl-4">
                  {footer_data?.address?.district}, {footer_data?.address?.city}{" "}
                  - {footer_data?.address?.state}
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="h-[300px] relative rounded-lg overflow-hidden">
            {footer_data?.mapEmbedUrl && (
              <Maps placeUrl={footer_data.mapEmbedUrl} />
            )}
          </div>
        </div>

        <div className="py-4 text-center text-gray-400 text-sm border-t border-teal-700">
          © Copyright Igreja Apostólica Monte Sião Linhares 2024 - Design by
          Redeem™ | Desenvolvido por Produtora BG & {" "}
          <Link href={"https://www.reijanlopes.com/"}>Reijan Lopes</Link>
          <br />
          <ResetCookieLink/>
        </div>
        
      </Section>
    </React.Fragment>
  );
}
