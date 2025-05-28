import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { DatePicker } from "@/components/date-picker";
import SearchInput from "@/components/search";
import {
  formatDateBr,
  getEventDateRange,
  limitPortableTextBlocks,
} from "@/utils";
import {
  EventPageQueryResult,
  GetResumedEventListQueryResult,
} from "sanity-shared/types";
import {
  eventPageQuery,
  getResumedEventListQuery,
} from "sanity-shared/queries";
import { sanityClient } from "@/lib/sanityClient";
import imagePlaceholderSquare from "@/assets/thumbs/placeholder-image-square.png";
import ClearSearch from "@/components/clear-search";
import BackToTopButton from "@/components/back-to-top-button";

interface EventsItemProps {
  eventItem: GetResumedEventListQueryResult[number];
}

function EventsItem({ eventItem }: EventsItemProps) {
  const { first } = getEventDateRange(eventItem.schedule);
  const { dayOfWeek, mm, shortMonth, dd } = formatDateBr(first?.date || "");
  const limitedContent = limitPortableTextBlocks(eventItem.shortDescription, 145);

  return (
    <Link href={`/events/${eventItem._id}`}>
      <div className="bg-white rounded-lg overflow-hidden border flex flex-col lg:flex-row gap-2 lg:gap-5">
        <div className="w-full lg:w-[30%] h-56 lg:h-auto relative">
          <Image
            src={eventItem.background || imagePlaceholderSquare}
            alt="Imagem do evento"
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden lg:flex w-[57px] flex-col items-center justify-center">
          <p className="text-5xl font-bold">{dd}</p>
          <hr className="w-full border-2 border-black" />
          <p className="text-2xl font-bold">{shortMonth}</p>
        </div>
        <div className="py-4 md:py-6 pr-4 md:pr-6 pl-4 md:pl-6 lg:pl-0 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{eventItem.title}</h3>
            {eventItem.shortDescription && (
              <div className="text-gray-600 mb-4">
                <PortableText value={limitedContent} />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex w-full items-center gap-2 lg:gap-6 justify-between lg:justify-start">
              <div className="flex flex-col text-sm">
                <span className="font-bold block lg:hidden">
                  {dayOfWeek}, {dd}/{mm}
                </span>
                <span className="text-gray-700">
                  {first?.startTime}-{first?.endTime}
                </span>
              </div>
              <span className="bg-gray-800 text-white px-3 py-2 rounded-full text-xs flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <p className="truncate max-w-20">{eventItem.address}</p>
              </span>
            </div>
            <div className="hidden lg:flex w-10 h-10 min-w-10 cursor-pointer bg-teal-500 text-white rounded-full items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function normalizeText(text: string | null): string {
  return (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase();
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

interface EventProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Event({ searchParams }: EventProps) {
  const [events_page_data, events_data]: [EventPageQueryResult, GetResumedEventListQueryResult] = await Promise.all([
    sanityClient.fetch(eventPageQuery),
    sanityClient.fetch(getResumedEventListQuery),
  ]);

  const { findDate = "", findTitle = "" } = await searchParams;

  const filteredEvents = events_data.filter((event) => {
    const eventDate = event?.schedule?.[0]?.date || "";
    const titleMatch = normalizeText(event.title).includes(normalizeText(findTitle));
    const dateMatch = findDate ? eventDate === formatDate(findDate) : true;
    return titleMatch && dateMatch;
  });

  return (
    <>
      <PageHeader imgSrc={events_page_data?.bannerImage}>
        {events_page_data?.title}
      </PageHeader>
      <Section>
        <div className="flex items-center gap-2 justify-between mb-8">
          <SearchInput />
          <DatePicker />
          <ClearSearch />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
          {filteredEvents.map((item, idx) => (
            <EventsItem eventItem={item} key={idx} />
          ))}
        </div>
      </Section>
      <Footer />
      <BackToTopButton />
    </>
  );
}
