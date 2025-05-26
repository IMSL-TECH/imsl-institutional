import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";

import { MapPin, ArrowRight } from "lucide-react";
import { PaginationCustom } from "@/components/pagination";
import Image from "next/image";
import SearchInput from "@/components/search";
import { DatePicker } from "@/components/date-picker";
import Link from "next/link";
import { formatDateBr, getEventDateRange } from "@/utils";
import { EventPageQueryResult, GetResumedEventListQueryResult } from "sanity-shared/types";
import { eventPageQuery, getResumedEventListQuery } from "sanity-shared/queries";
import { sanityClient } from "@/lib/sanityClient";
import imagePlaceholderSquare from "@/assets/thumbs/placeholder-image-square.png"
import { PortableText } from "@portabletext/react";

function EventsItem({ eventItem }: {eventItem:GetResumedEventListQueryResult[number]}) {

  const fristDate = getEventDateRange(eventItem.schedule).first?.date
  const starTime = getEventDateRange(eventItem.schedule).first?.startTime
  const endTime = getEventDateRange(eventItem.schedule).first?.endTime

  const {dayOfWeek,mm, shortMonth, dd} = formatDateBr(fristDate || "")

  return (
    <Link href={`/events/${eventItem._id}`}>
      <div className="bg-white rounded-lg overflow-hidden border flex flex-col lg:flex-row gap-2 lg:gap-5">
        <div className="w-full lg:w-[30%] h-56 lg:h-auto relative">
          <Image
            src={eventItem.background || imagePlaceholderSquare}
            alt="Bird on a branch"
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center">
          <p className="text-5xl font-bold">{dd}</p>
          <hr className="w-full border-2 border-black" />
          <p className="text-2xl font-bold">{shortMonth}</p>
        </div>
        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{eventItem.title}</h3>
                <div className="text-gray-600 mb-4">{eventItem.shortDescription && <PortableText value={eventItem.shortDescription}/>}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex w-full items-center lg-2 lg:gap-6 justify-between lg:justify-start">
              <div className="flex flex-col text-sm">
                <span className="font-bold !text-left block lg:hidden">
                  {dayOfWeek}, {dd}/{mm}
                </span>
                <span className="text-gray-700 !text-left">{starTime}-{endTime}</span>
              </div>
              <span className="bg-gray-800 !text-left text-white px-3 py-2 rounded-full text-xs flex items-center gap-1">
                <MapPin className="w-5 h-5" />{" "}
                <p className="truncate max-w-20">{eventItem.address}</p>
              </span>
            </div>
            <button className="w-10 h-10 hidden lg:flex cursor-pointer bg-teal-500 text-white rounded-full items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function Event({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {

  const events_page_data: EventPageQueryResult = await sanityClient.fetch(eventPageQuery);
  const events_data: GetResumedEventListQueryResult = await sanityClient.fetch(getResumedEventListQuery);

  const res_searchParams = await searchParams;
  const findDate = res_searchParams?.findDate || "";
  const find = res_searchParams?.find || "";

  return (
    <>
      <PageHeader imgSrc={events_page_data?.bannerImage}>{events_page_data?.title}</PageHeader>
      <Section>
        <div className="flex items-center justify-between mb-8">
          <SearchInput />
          <DatePicker />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
          {events_data.map(
            (item, idx) => (
              <EventsItem
                eventItem={item}
                key={idx}
              />
            )
          )}
        </div>

        <PaginationCustom />
      </Section>
      <Footer />
    </>
  );
}
