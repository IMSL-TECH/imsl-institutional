import Footer from "@/components/footer";
// import PageHeader from "@/components/PageHeader";
// import PageContent from "@/components/pageContent";

import PageHeader from "@/components/page-header";
import Section from "@/components/section";

import { MapPin, Search, Calendar, ArrowRight } from "lucide-react";
import { PaginationCustom } from "@/components/pagination";
import Image from "next/image";
import SearchInput from "@/components/search";
import { DatePicker } from "@/components/date-picker";
import { link } from "fs";
import Link from "next/link";
import { daysOfWeek, shortMonths } from "@/utils";

interface EventList {
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string;
  time: string;
  location: string;
  image: string;
  link: string;
}

const pageHeaderImage = "https://picsum.photos/2000/1000?random=22";

const eventsList = [
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod.`,
    startDate: "Thu May 09 2025 19:00:00 GMT-0300 (Horário Padrão de Brasília)",
    endDate: "Thu May 09 2025 21:30:00 GMT-0300 (Horário Padrão de Brasília)",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
    image: "https://picsum.photos/800/600?random=15",
    link: "/events",
  },
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod.`,
    startDate: "Thu May 08 2025 19:00:00 GMT-0300 (Horário Padrão de Brasília)",
    endDate: "Thu May 09 2025 21:30:00 GMT-0300 (Horário Padrão de Brasília)",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
    image: "https://picsum.photos/800/600?random=16",
    link: "/events",
  },
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod.`,
    startDate: "Thu May 08 2025 19:00:00 GMT-0300 (Horário Padrão de Brasília)",
    endDate: "Thu May 09 2025 21:30:00 GMT-0300 (Horário Padrão de Brasília)",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
    image: "https://picsum.photos/800/600?random=17",
    link: "/events",
  },
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod.`,
    startDate: "Thu May 08 2025 19:00:00 GMT-0300 (Horário Padrão de Brasília)",
    endDate: "Thu May 09 2025 21:30:00 GMT-0300 (Horário Padrão de Brasília)",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
    image: "https://picsum.photos/800/600?random=18",
    link: "/events",
  },
];

function formatNumber(num: number): string {
  return String(num).padStart(2, '0');
}


function EventsItem({ title, image, content, startDate, endDate, link, location }: EventList) {
  const date = new Date(startDate);
  const end = new Date(endDate);
  
  const [day, month, monthFormatted, dayOfMonth, hours, minutes] = [
    daysOfWeek[date.getDay() - 1],
    shortMonths[date.getMonth()],
    formatNumber(date.getMonth()),
    formatNumber(date.getDate()),
    formatNumber(date.getHours()),
    formatNumber(date.getMinutes())
  ];
  
  const [endDateHours, endDateMinutes] = [
    formatNumber(end.getHours()),
    formatNumber(end.getMinutes())
  ];

  return (
    <Link href={link}>
      <div className="bg-white rounded-lg overflow-hidden border flex flex-col lg:flex-row gap-2 lg:gap-5">
        <div className="w-full lg:w-[30%] h-56 lg:h-auto relative">
          <Image
            src={image}
            alt="Bird on a branch"
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center">
          <p className="text-5xl font-bold">{dayOfMonth}</p>
          <hr className="w-full border-2 border-black" />
          <p className="text-2xl font-bold">{month}</p>
        </div>
        <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{content}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex w-full items-center lg-2 lg:gap-6 justify-between lg:justify-start">
              <div className="flex flex-col text-sm">
                <span className="font-bold !text-left block lg:hidden">
                  {day}, {dayOfMonth}/{monthFormatted}
                </span>
                <span className="text-gray-700 !text-left">{hours}:{minutes}-{endDateHours}:{endDateMinutes}</span>
              </div>
              <span className="bg-gray-800 !text-left text-white px-3 py-2 rounded-full text-xs flex items-center gap-1">
                <MapPin className="w-5 h-5" />{" "}
                <p className="truncate max-w-20">{location}</p>
              </span>
            </div>
            <button className="w-10 h-10 hidden lg:flex bg-teal-500 text-white rounded-full items-center justify-center">
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
  const res_searchParams = await searchParams;
  const findDate = res_searchParams?.findDate || "";
  const find = res_searchParams?.find || "";

  return (
    <>
      <PageHeader imgSrc={pageHeaderImage}>Eventos</PageHeader>
      <Section className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <SearchInput />
          <DatePicker />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
          {eventsList.map(
            ({ title, content, startDate, endDate, time, location, image, link }, idx) => (
              <EventsItem
                title={title}
                time={time}
                startDate={startDate}
                endDate={endDate}
                content={content}
                location={location}
                key={idx}
                image={image}
                link={link}
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
