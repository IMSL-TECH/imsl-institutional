import BackToTopButton from "@/components/back-to-top-button";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { portableTextComponents } from "@/components/portableTextComponents";
import Schedule from "@/components/schedule";
import Section from "@/components/section";
import { sanityClient } from "@/lib/sanityClient";
import { formatPhone } from "@/utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { findOneEventByIdQuery } from "sanity-shared/queries";
import { FindOneEventByIdQueryResult } from "sanity-shared/types";

interface EventProps {
  params: Promise<{ eventId: string }>;
}

export default async function Event({ params }: EventProps) {
  const { eventId } = await params;
  const event_data: FindOneEventByIdQueryResult = await sanityClient.fetch(
    findOneEventByIdQuery,
    { id: eventId }
  );

  const {
    title,
    showDetailSchedule,
    teaser,
    about,
    schedule,
    registrtionLink,
    organizer,
    speakers,
    banner,
    subTitle,
  } = event_data || {};

  const phoneNumber = organizer?.phone?.number;
  const phoneName = organizer?.phone?.name;

  return (
    <>
      <PageHeader imgSrc={banner} />

      <Section className="!max-w-3xl">
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-center !text-4xl lg:whitespace-nowrap">
            {title}
          </h1>
          {subTitle && (
            <h2 className="text-gray-600 text-center">{subTitle}</h2>
          )}

          <div className="w-full mt-5 p-4 rounded-2xl flex flex-col lg:flex-row gap-6">
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4">
              <div className="flex w-full p-4 bg-gray-100 rounded-lg lg:w-1/2 flex-col items-center gap-1">
                <h2>Coordenação</h2>
                <h3 className="h-9 text-gray-500">{organizer?.description}</h3>
              </div>
              <div className="border-t lg:border-t-0 w-2/5 lg:w-1 lg:border-l h-px lg:h-4/5" />
              <div className="w-full lg:w-1/2 p-4 bg-gray-100 rounded-lg flex flex-col gap-1 items-center justify-center">
                <div className="text-xl">{phoneName}</div>
                <div className="flex w-full justify-center">
                  <Link
                    href={`https://wa.me/${phoneNumber}?text=Olá, gostaria de saber mais sobre o evento: ${title}`}
                    target="_blank"
                    className="h-9"
                  >
                    {formatPhone(phoneNumber)}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {registrtionLink && (
        <div className="w-full flex justify-center">
          <Link
            href={registrtionLink}
            target="_blank"
            className="bg-[#179389] text-white uppercase text-xl h-15 px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
          >
            Faça sua inscrição
          </Link>
        </div>
      )}

      {teaser && (
        <Section
          backgroundColor={!registrtionLink ? "!py-0" : ""}
          className="flex flex-col items-center"
        >
          <h2 className="mb-5 text-center">Teaser do evento</h2>
          <div className="w-full aspect-video bg-black/20 rounded-2xl relative">
            <iframe
              className="w-full h-full absolute top-0 left-0 rounded-2xl"
              src={teaser}
              title="Teaser do Evento"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Section>
      )}

      {about && (
        <Section className="flex !max-w-3xl flex-col items-center">
          <h2 className="mb-5">Sobre o Evento</h2>
          <div className="w-full text-justify">
            <PortableText value={about} components={portableTextComponents} />
          </div>
        </Section>
      )}

      {speakers && speakers?.length > 0 && (
        <Section className="flex flex-col !max-w-3xl items-center">
          <h2 className="mb-10">Palestrante</h2>
          <div className="w-full flex flex-wrap gap-10 justify-center">
            {speakers.map(({ image, titleAbbreviation, name, title }, idx) => (
              <div
                key={idx}
                className="flex max-w-[230px] flex-col items-center"
              >
                <Image
                  src={image || ""}
                  alt="Palestrante do evento"
                  className="h-40 w-40 rounded-full mb-5"
                  height={200}
                  width={200}
                />
                <h2 className="text-center">
                  {titleAbbreviation}
                  {name}
                </h2>
                <p className="text-center">{title}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {showDetailSchedule && schedule?.[0]?.sessions && (
        <Section
          backgroundColor="!py-0"
          className="flex !max-w-3xl flex-col items-center"
        >
          <Schedule scheduleData={schedule} />
        </Section>
      )}

      <Footer />
      <BackToTopButton />
    </>
  );
}
