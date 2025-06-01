import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import Schedule from "@/components/schedule";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanityClient";
import { formatDateBr, isOneDayEvent } from "@/utils";
import { PortableText } from "@portabletext/react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { findOneEventByIdQuery } from "sanity-shared/queries";
import { FindOneEventByIdQueryResult } from "sanity-shared/types";

function getFirstAndLastScheduleDate(event: FindOneEventByIdQueryResult) {
  if (!event?.schedule) return { first: null, last: null };

  const validSchedule = event.schedule.filter((day) => day.date !== null) as {
    date: string;
    startTime: string | null;
    endTime: string | null;
    sessions: Array<{
      title: string | null;
      description: string | null;
      starTime: string | null;
      endTime: string | null;
    }> | null;
  }[];

  if (validSchedule.length === 0) return { first: null, last: null };

  const sorted = [...validSchedule].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return {
    first: sorted[0],
    last: sorted[sorted.length - 1],
  };
}

function getFirstSessionOfDay(day: {
  sessions: Array<{
    title: string | null;
    description: string | null;
    starTime: string | null;
    endTime: string | null;
  }> | null;
}) {
  if (!day.sessions || day.sessions.length === 0) return null;

  const validSessions = day.sessions.filter((s) => s.starTime !== null) as {
    title: string | null;
    description: string | null;
    starTime: string;
    endTime: string | null;
  }[];

  if (validSessions.length === 0) return null;

  const sortedByTime = [...validSessions].sort((a, b) =>
    a.starTime.localeCompare(b.starTime)
  );

  return sortedByTime[0];
}

interface EventProps {
  params: Promise<{ eventId: string }>;
}

export default async function Event({ params }: EventProps) {
  const res_params = await params;
  const id = res_params.eventId;

  const event_data: FindOneEventByIdQueryResult = await sanityClient.fetch(
    findOneEventByIdQuery,
    { id }
  );

  const shortDescription = event_data?.shortDescription;
  const teaser = event_data?.teaser;
  const about = event_data?.about;
  const schedule = event_data?.schedule;
  const registrtionLink = event_data?.registrtionLink;

  const { first, last } = getFirstAndLastScheduleDate(event_data);

  const formatFirstDate = formatDateBr(first?.date || "");
  const formatEndDate = formatDateBr(last?.date || "");

  const firstSession = getFirstSessionOfDay({
    sessions: first?.sessions || [],
  });

  return (
    <>
      <PageHeader imgSrc={event_data?.banner} />
      <Section className="flex flex-col items-center">
        <h2 className="text-center">{event_data?.title}</h2>
        {shortDescription && (
          <div className="text-gray-600 !text-sm text-justify !font-medium mt-1">
            <PortableText
              value={shortDescription}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>,
                },
              }}
            />
          </div>
        )}

        <div className="mt-10 w-full lg:max-w-md flex justify-between gap-2">
          <div>
            {first === last ? (
              //mostra uma data só
              <>
                <div className="font-semibold flex gap-1 flex-wrap text-gray-800">
                  Data:{" "}
                  <p className="capitalize">
                    {formatFirstDate.dd}/{formatFirstDate.shortMonth}
                  </p>
                </div>
                <div className="!text-base/6">
                  <p className="text-gray-700 text-start">
                    {firstSession?.starTime} às {firstSession?.endTime}{" "}
                  </p>
                </div>
              </>
            ) : (
              // mostras duas datas
              <>
                <div className="font-semibold flex gap-1 flex-wrap text-gray-800">
                  De{" "}
                  <p className="capitalize">
                    {formatFirstDate.dd}/{formatFirstDate.shortMonth}
                  </p>{" "}
                  a{" "}
                  <p className="capitalize">
                    {formatEndDate.dd}/{formatEndDate.shortMonth}
                  </p>
                </div>
                <div className="!text-base/6">
                  <p className="text-gray-700 text-start">
                    No primeiro dia, das:
                  </p>
                  <p className="text-gray-700">
                    {firstSession?.starTime} às {firstSession?.endTime}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Location Card */}

          <Link
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${event_data?.address?.zip}`}
            className="bg-gray-800 flex max-w-[135px] md:max-w-[160px] flex-col text-white px-4 py-2 rounded-lg"
          >
            <div className="text-center">
              <p className="font-semibold truncate">
                {event_data?.address?.city}, {event_data?.address?.state}
              </p>
              <div className="flex gap-1">
                <MapPin className="w-5 h-5 min-w-5" />
                <p className="text-sm truncate">{event_data?.address?.title}</p>
              </div>
            </div>
          </Link>
        </div>
      </Section>
      {/* adicionar o link para a inscrição e remover se não tiver */}
      {registrtionLink &&
        <div className="mb-10 w-full flex justify-center">
          <Link
            href={registrtionLink}
            target="_blank"
            className="bg-[#179389] whitespace-nowrap w-auto h-15 text-xl px-4 rounded-lg hover:bg-teal-700 text-white flex items-center gap-2 uppercase"
          >
            Faça sua inscrição
          </Link>
        </div>}
      {teaser && <Section className="flex flex-col items-center">
        {teaser && (
          <div className="w-full flex flex-col">
            <h2 className="mb-5 text-center">Teaser do evento</h2>
            <div className="w-full aspect-video bg-black/20 relative">
              <iframe
                className="w-full h-full absolute top-0 left-0 rounded-lg"
                src={teaser}
                title="Teaser do Evento"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </Section>}
      <Section className="flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <h2 className="mb-5">Sobre o Evento</h2>
          {about && (
            <div className="w-full text-justify">
              <PortableText value={about} />
            </div>
          )}
        </div>
      </Section>
      {event_data?.speakers && <Section className="flex flex-col items-center">
        {event_data?.speakers && (
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="mb-10">Palestrante</h2>
            <div className="w-full flex flex-wrap gap-10 justify-center">
              {event_data?.speakers?.map(
                ({ image, titleAbbreviation, name, title }, idx) => {
                  return (
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
                  );
                }
              )}
            </div>
          </div>
        )}
      </Section>}
      <Section className="flex flex-col items-center">
        {schedule && schedule?.[0].sessions && (
          <div className="w-full flex flex-col items-center">
            <h2 className="mb-5">Programação</h2>
            <div className="w-full">
              <Schedule scheduleData={schedule} />
            </div>
          </div>
        )}
      </Section>
      <Footer />
    </>
  );
}
