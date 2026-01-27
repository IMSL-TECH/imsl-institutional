import BackToTopButton from "@/components/back-to-top-button";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { portableTextComponents } from "@/components/portableTextComponents";
import Schedule from "@/components/schedule";
import Section from "@/components/section";
import { sanityClient } from "@/lib/sanityClient";
import { formatDateBr, formatPhone } from "@/utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { findOneEventByIdQuery } from "sanity-shared/queries";
import { FindOneEventByIdQueryResult } from "sanity-shared/types";

import { urlFor } from "@/lib/sanityImage";
import userPlaceholder from "@/assets/thumbs/placeholder-image-user.png";
import { MapPin } from "lucide-react";
import WhatsApp from "@/components/icons/whatsapp";
import { Metadata } from "next";
import Share from "@/components/share";
import { redirect } from "next/navigation";

interface EventProps {
  params: Promise<{ eventId: string }>;
}

export async function generateMetadata({ params }: EventProps): Promise<Metadata> {
  const { eventId } = await params;

  const event_data: FindOneEventByIdQueryResult = await sanityClient?.fetch(
    findOneEventByIdQuery,
    { id: eventId }
  );

  const first_schedule = getFirstSessionOfEarliestDay(event_data?.schedule ?? []);
  const { dd, mm, aaaa } = formatDateBr(first_schedule?.date ?? "");

  const title = event_data?.title ?? 'Evento';
  const date = `${dd}/${mm}/${aaaa} | ${first_schedule?.session?.starTime}`;
  const image = event_data?.banner
    ? urlFor(event_data.banner).width(740).height(422).url()
    : '';
  const url = `https://www.montesiaolinhares.com.br/events/${eventId}`;

  return {
    title: 'Igreja Monte Sião Linhares',
    description: title,
    openGraph: {
      title: title,
      description: date,
      url,
      type: 'website',
      images: image ? [
        {
          url: image,
          width: 740,
          height: 422,
          alt: 'Banner do evento',
        },
      ] : undefined,
    },
  };
}

function getFirstSessionOfEarliestDay(
  data: NonNullable<FindOneEventByIdQueryResult>["schedule"]
): {
  date: string | null;
  session: {
    title: string | null;
    description: any;
    starTime: string | null;
    endTime: string | null;
  } | null;
} | null {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const sortedDays = data.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateA.getTime() - dateB.getTime();
  });

  const firstDay = sortedDays[0];

  if (!firstDay.sessions || firstDay.sessions.length === 0) {
    return null;
  }

  const toMinutes = (time: string | null) => {
    if (!time) return Number.MAX_SAFE_INTEGER;
    const [h, m = "00"] = time.replace("h", ":").split(":");
    return parseInt(h) * 60 + parseInt(m);
  };

  const sortedSessions = firstDay.sessions.sort((a, b) => {
    return toMinutes(a.starTime) - toMinutes(b.starTime);
  });

  return {
    date: firstDay.date,
    session: sortedSessions[0] || null,
  };
}

export default async function Event({ params }: EventProps) {

  const { eventId } = await params;
  let event_data: FindOneEventByIdQueryResult

  try {
      event_data = await sanityClient.fetch(
    findOneEventByIdQuery,
    { id: eventId }
  );
    
  } catch (error) {
   console.error("❌ Sanity fetch failed (Event Page)", error);
    event_data = null;
  }

  if(!event_data){
    redirect("/events")
  }

  const {
    about,
    title,
    banner,
    teaser,
    address,
    subTitle,
    speakers,
    schedule,
    organizer,
    registrtionLink,
    showDetailSchedule,
  } = event_data || {};

  const address_title = address?.title;
  const phoneNumber = organizer?.phone?.number;
  const organizer_description = organizer?.description;

  const query =
    `${address?.title} ${address?.street}, ${address?.city}, ${address?.state}, ${address?.zip}`.replace(
      /\s/g,
      "+"
    );

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const first_schedule = getFirstSessionOfEarliestDay(schedule ?? []);
  const { dd, mm, aaaa } = formatDateBr(first_schedule?.date ?? "");
  const date = `${dd}/${mm}/${aaaa}`;

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
              <Link
                href={`https://wa.me/${phoneNumber}?text=Olá, gostaria de saber mais sobre o evento: ${title}`}
                target="_blank"
                className="flex w-full p-4 bg-gray-100 rounded-lg lg:w-1/2 flex-col items-center gap-1"
              >
                <h2>Coordenação</h2>
                <div className="flex w-full justify-center items-center gap-2">
                  <WhatsApp className="w-5 h-5" />
                  <strong className="h-7 flex items-center text-gray-500">{organizer_description}</strong>
                </div>
              </Link>
              <div className="border-t lg:border-t-0 w-2/5 lg:w-1 lg:border-l h-px lg:h-4/5" />
              <Link
                href={mapsLink}
                target="_blank"
                className="w-full lg:w-1/2 p-4 bg-gray-100 rounded-lg flex flex-col gap-1 items-center justify-center"
              >
                <div className="text-xl flex gap-2">
                  <strong>{date}</strong>
                  <span>|</span>
                  <div>{first_schedule?.session?.starTime}</div>
                </div>
                <div className="flex w-full justify-center items-center gap-2">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span className="truncate h-7">{address_title}</span>
                </div>
              </Link>
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
            {speakers.map(({ photo, titleAbbreviation, name }, idx) => {
              const userImage = photo
                ? urlFor(photo).width(320).height(320).url()
                : userPlaceholder;

              return (
                <div
                  key={idx}
                  className="flex max-w-[230px] flex-col items-center"
                >
                  <Image
                    src={userImage}
                    alt="Palestrante do evento"
                    className="h-40 w-40 rounded-full mb-5"
                    height={200}
                    width={200}
                  />
                  <h2 className="text-center">
                    {titleAbbreviation}
                    {name}
                  </h2>
                </div>
              );
            })}
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
      <Share title={title ?? ""}/>
      <BackToTopButton />
    </>
  );
}
