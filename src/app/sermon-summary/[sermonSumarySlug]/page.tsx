import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import { sanityClient } from "@/lib/sanityClient";
import { formatDateBr } from "@/utils";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from '@/components/portableTextComponents'

import Link from "next/link";
import { findOneSermonBySlugQuery } from "sanity-shared/queries";
import { FindOneSermonBySlugQueryResult } from "sanity-shared/types";
import BackToTopButton from "@/components/back-to-top-button";

interface SermonSummaryPageProps {
    params: Promise<{ sermonSumarySlug: string }>;
}
export default async function SermonSumary({ params }: SermonSummaryPageProps) {
    const res_params = await params;
    const slug = res_params.sermonSumarySlug;
    
    const sermonSummaryData: FindOneSermonBySlugQueryResult = await sanityClient.fetch(
        findOneSermonBySlugQuery,
        { slug }
    );
    const content = sermonSummaryData?.content;
    const title = sermonSummaryData?.title
    const videoLink = sermonSummaryData?.videoLink;
    const date = formatDateBr(sermonSummaryData?.date ||"")
    const speaker = sermonSummaryData?.speaker?.name
    const speakerTitle = sermonSummaryData?.speaker?.titleAbbreviation

    return (
        <>
            <PageHeader imgSrc={sermonSummaryData?.background} />
            <Section className="flex flex-col items-center">
                <h2 className="text-center mb-5">{title}</h2>
                <div className="flex flex-col text-sm gap-4 justify-center items-center font-normal">
                    <h3 className="flex items-center text-gray-700">{`${date.dd} de ${date.month} de ${date.aaaa}`}</h3>
                    <h3 className="flex items-center text-gray-700">{speakerTitle&&`${speakerTitle}`}{speaker}</h3>
                    {videoLink && <Link target="_blank" className="bg-[#179389] text-white h-auto text-base px-4 py-2 rounded-lg" href={videoLink}>Palavra completa</Link>}
                </div>

            </Section>
            <Section className="text-justify">
                {content && <PortableText value={content} components={portableTextComponents} />}
            </Section>
            <Footer />
            <BackToTopButton />
        </>
    )

}