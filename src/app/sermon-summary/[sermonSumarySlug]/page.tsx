import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import { sanityClient } from "@/lib/sanityClient";
import { formatDateBr } from "@/utils";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portableTextComponents";

import Link from "next/link";
import { findOneSermonBySlugQuery } from "sanity-shared/queries";
import { FindOneSermonBySlugQueryResult } from "sanity-shared/types";
import BackToTopButton from "@/components/back-to-top-button";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

interface SermonSummaryPageProps {
  params: Promise<{ sermonSumarySlug: string }>;
}
export default async function SermonSumary({ params }: SermonSummaryPageProps) {
  const res_params = await params;
  const slug = res_params.sermonSumarySlug;

  const sermonSummaryData: FindOneSermonBySlugQueryResult =
    await sanityClient.fetch(findOneSermonBySlugQuery, { slug });
  const content = sermonSummaryData?.content;
  const title = sermonSummaryData?.title;
  const videoLink = sermonSummaryData?.videoLink;
  const date = formatDateBr(sermonSummaryData?.date || "");
  const speaker = sermonSummaryData?.speaker?.name;
  const speakerTitle = sermonSummaryData?.speaker?.titleAbbreviation;
  const imageSpeaker = sermonSummaryData?.speaker?.image

  return (
    <>
      <PageHeader imgSrc={sermonSummaryData?.background} />
      <Section className="flex !max-w-3xl flex-col items-center">
        <h2 className="text-center mb-5">{title}</h2>
        <div className="flex flex-col text-sm gap-4 justify-center items-center font-normal">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data</p>
                <p className="text-base font-semibold">
                {`${date.dd} de ${date.month} de ${date.aaaa}`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 relative w-12 h-12 rounded-full border flex items-center justify-center">
                
                {imageSpeaker && <Image className="rounded-full" src={imageSpeaker} fill alt={`Pregador: ${speaker}`}/>}
              </div>
              <div>
                
                <p className="text-sm font-medium text-gray-500">Pregador</p>
                <p className="text-base font-semibold">{speakerTitle&&`${speakerTitle}`}{speaker}</p>
              </div>
            </div>
          </div>
          {videoLink && <Link target="_blank" className="bg-[#179389] text-white h-auto text-base px-4 py-2 rounded-lg" href={videoLink}>Palavra completa</Link>}
        </div>
      </Section>
      <Section className="text-justify !max-w-3xl">
        {content && (
          <PortableText value={content} components={portableTextComponents} />
        )}
      </Section>
      <Footer />
      <BackToTopButton />
    </>
  );
}
