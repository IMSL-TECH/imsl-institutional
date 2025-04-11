import banner from "@/assets/header-bgs/header-br-template.jpg";
import Footer from "@/components/footer";
// import PageHeader from "@/components/PageHeader";
// import PageContent from "@/components/pageContent";

import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import { time } from "console";

import iconPrev from "@icons/icon-arrow-left.svg";
import iconNext from "@icons/icon-arrow-right.svg";

import { CalendarCheck, Clock3, MapPin } from "lucide-react";
import { PaginationCustom } from "@/components/pagination";

interface EventList {
  title: string;
  content: string;
  date: string;
  time: string;
  location: string;
}

const pageHeaderImage = "https://picsum.photos/2000/1000?random=22"

const eventsList = [
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod. Magni aut incidunt fugiat labore est
        ut non ipsam nihil. Voluptate rerum dolores unde voluptas. Et similique
        praesentium dolor. Et quod eius sint at quae est dolores. Beatae quo
        facere hic.`,
    date: "Saturday, September 28, 2019",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
  },
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod. Magni aut incidunt fugiat labore est
        ut non ipsam nihil. Voluptate rerum dolores unde voluptas. Et similique
        praesentium dolor. Et quod eius sint at quae est dolores. Beatae quo
        facere hic.`,
    date: "Saturday, September 28, 2019",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
  },
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod. Magni aut incidunt fugiat labore est
        ut non ipsam nihil. Voluptate rerum dolores unde voluptas. Et similique
        praesentium dolor. Et quod eius sint at quae est dolores. Beatae quo
        facere hic.`,
    date: "Saturday, September 28, 2019",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
  },
  {
    title: "2019 Kids Church Camp.",
    content: `Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod. Magni aut incidunt fugiat labore est
        ut non ipsam nihil. Voluptate rerum dolores unde voluptas. Et similique
        praesentium dolor. Et quod eius sint at quae est dolores. Beatae quo
        facere hic.`,
    date: "Saturday, September 28, 2019",
    time: "8:00AM - 5:30PM",
    location: "1600 Amphitheatre Parkway, Mt. View",
  },
];

function EventsItem({ title }: EventList) {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="display-1 events-list__item-title">
        <a href="/events/event-slug" title="">
          {title}
        </a>
      </h3>
      <p>
        Et consequatur nihil odio odit voluptatem qui. Dolores doloribus
        cupiditate totam esse dolores quod. Magni aut incidunt fugiat labore est
        ut non ipsam nihil. Voluptate rerum dolores unde voluptas. Et similique
        praesentium dolor. Et quod eius sint at quae est dolores. Beatae quo
        facere hic.
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        <hr className="w-full" />
        <li className="font-semibold flex gap-2">
          <CalendarCheck />
          Saturday, September 28, 2019
        </li>
        <hr className="w-full" />
        <li className="font-semibold flex gap-2">
          <Clock3 />
          8:00AM - 5:30PM
        </li>
        <hr className="w-full" />
        <li className="font-semibold flex gap-2">
          <MapPin />
          1600 Amphitheatre Parkway, Mt. View
        </li>
      </ul>
    </div>
  );
}

export default function Event() {
  return (
    <>
      <PageHeader imgSrc={pageHeaderImage}>Eventos</PageHeader>
      <Section className="mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {eventsList.map(({ title, content, date, time, location }, idx) => (
            <EventsItem
              title={title}
              time={time}
              date={date}
              content={content}
              location={location}
              key={idx}
            />
          ))}
        </div>

        <PaginationCustom />
      </Section>
      <Footer />
    </>
  );
}
