import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import { sanityClient } from "@/lib/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { SmedsPageQuery, getSmedListQuery } from "sanity-shared/queries";
import {
  GetSmedListQueryResult,
  SmedsPageQueryResult,
} from "sanity-shared/types";
import imagePlaceholderSquare from "@/assets/thumbs/placeholder-image-square.png";
import { PortableText } from "@portabletext/react";
import BackToTopButton from "@/components/back-to-top-button";
import { urlFor } from "@/lib/sanityImage";

function SmedsList({
  pair,
  smedItem,
}: {
  pair: boolean;
  smedItem: GetSmedListQueryResult[number];
}) {
  return (
    <Section
      background_id={smedItem._id}
      className={`lg:min-h-[300px] flex gap-2 lg:gap-8 flex-col rounded-xl ${pair ? "lg:flex-row-reverse" : "lg:border-green-200 lg:flex-row"}`}
      backgroundColor={`py-16 ${pair ? "bg-[#0F2E2F]" : ""}`}
    >
      <div className="w-full lg:w-[53%] rounded-t-xl lg:rounded-none overflow-hidden h-[250px] lg:h-full relative">
        <Image
          src={
            urlFor(smedItem.bannerHorizontal).auto("format").url() ||
            imagePlaceholderSquare
          }
          fill
          className={`object-cover rounded-none lg:rounded-xl ${pair ? "" : "border"}`}
          alt="Banner Monte Sião Linhares"
        />
      </div>
      <div
        className={`w-full lg:w-[47%] flex py-4 flex-col gap-4 justify-center ${pair ? "text-white" : ""}`}
      >
        <h1>{smedItem.title}</h1>
        <div>
          {" "}
          {smedItem.smedDescription && (
            <PortableText value={smedItem.smedDescription} />
          )}
        </div>
        {smedItem.smedButton?.contentButton &&
        smedItem.smedButton.linktButton ? (
          <Link
            href={smedItem.smedButton.linktButton}
            target="_black"
            className={`py-2 px-3 uppercase rounded-md items-center gap-2 flex justify-center ${
              pair
                ? "bg-white hover:bg-white/90 text-black"
                : "bg-[#179389] hover:bg-teal-700 text-white"
            }  uppercase`}
          >
            <p className="">{smedItem.smedButton.contentButton}</p>{" "}
          </Link>
        ) : null}
      </div>
    </Section>
  );
}

export default async function Smeds() {
  const [smeds_data, smeds_page_data]: [
    GetSmedListQueryResult,
    SmedsPageQueryResult,
  ] = await Promise.all([
    sanityClient.fetch(getSmedListQuery),
    sanityClient.fetch(SmedsPageQuery),
  ]);

  return (
    <>
      <PageHeader
        imgSrc={smeds_page_data?.bannerImage || imagePlaceholderSquare.src}
      >
        {smeds_page_data?.title}
      </PageHeader>
      <Section>
        {smeds_page_data?.description && (
          <PortableText value={smeds_page_data?.description} />
        )}
      </Section>
      {smeds_data?.map((item, idx) => {
        const pair = idx % 2 === 0;
        return <SmedsList pair={pair} smedItem={item} key={idx} />;
      })}
      <Section>
        {smeds_page_data?.conclusion && (
          <PortableText value={smeds_page_data?.conclusion} />
        )}
      </Section>
      <Footer />
      <BackToTopButton />
    </>
  );
}
