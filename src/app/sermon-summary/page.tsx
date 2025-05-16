import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import Footer from "@/components/footer";
import { Calendar, Search } from "lucide-react";
import BlogCard from "@/components/blog-card";
import Link from "next/link";
import SearchInput from "@/components/search";
import Filters from "@/components/filters";
import { DatePicker } from "@/components/date-picker";

const pageHeaderImage = "https://picsum.photos/2000/1000?random=30";

const blogPosts = [
  {
    title: "Suspire por Jesus",
    author: "Pr. Daniel Santos",
    date: "Maio 15, 2023",
    image: "https://picsum.photos/800/600?random=7",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Mantenha a fé firme",
    author: "Pr. Gustavo Ramos",
    date: "Maio 10, 2023",
    image: "https://picsum.photos/800/600?random=8",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Em meio às tempestades, pesca abundante",
    author: "Pr. Gabriel Rocha",
    date: "Abril 28, 2023",
    image: "https://picsum.photos/800/600?random=9",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Por que você não obedece",
    author: "Pr. Matheus Oliveira",
    date: "Abril 20, 2023",
    image: "https://picsum.photos/800/600?random=10",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Conecte-se com Deus",
    author: "Pr. Gustavo Ramos",
    date: "Abril 15, 2023",
    image: "https://picsum.photos/800/600?random=11",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Suspire por Jesus",
    author: "Pr. Daniel Santos",
    date: "Maio 15, 2023",
    image: "https://picsum.photos/800/600?random=12",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Mantenha a fé firme",
    author: "Pr. Gustavo Ramos",
    date: "Maio 10, 2023",
    image: "https://picsum.photos/800/600?random=13",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Em meio às tempestades, pesca abundante",
    author: "Pr. Gabriel Rocha",
    date: "Abril 28, 2023",
    image: "https://picsum.photos/800/600?random=14",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Por que você não obedece",
    author: "Pr. Matheus Oliveira",
    date: "Abril 20, 2023",
    image: "https://picsum.photos/800/600?random=15",
    panelist: "https://picsum.photos/800/600?random=17"
  },
  {
    title: "Conecte-se com Deus",
    author: "Pr. Gustavo Ramos",
    date: "Abril 15, 2023",
    image: "https://picsum.photos/800/600?random=16",
    panelist: "https://picsum.photos/800/600?random=17"
  },
];

type BlogPostType = {
  title: string;
  author: string;
  date: string;
  image: string;
  panelist: string;
};

type FormatWordSummaryType = {
  item: BlogPostType;
  expanded: boolean;
};

function formatWordSummary(data: BlogPostType[]) {
  const itemsWithSpan: FormatWordSummaryType[] = [];

  for (let i = 0; i < data.length; i++) {
    const indexInGroup = i % 10;

    let expanded = false;

    if (indexInGroup === 0 || indexInGroup === 6 || indexInGroup === 10) {
      expanded = true;
    }

    itemsWithSpan.push({
      item: data[i],
      expanded,
    });
  }

  return itemsWithSpan;
}



export default async function WordSummary({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const res_searchParams = await searchParams;
  const blogPostList: FormatWordSummaryType[] = formatWordSummary(blogPosts);

  const findDate = res_searchParams?.findDate || ""
  const find = res_searchParams?.find || ""
  const filters = res_searchParams?.filters || ""

  return (
    <div>
      <PageHeader imgSrc={pageHeaderImage}>Resumo da palavra</PageHeader>
      <Section className="my-20">
        <div className="flex items-center justify-between mb-4">
          <SearchInput />
          <DatePicker />
        </div>
        <Filters />
        <div className="grid-cols-2 lg:grid-cols-3 gap-2 grid">
          {blogPostList.map(({ item, expanded }, idx) => {
            return (
              <BlogCard
                key={idx}
                title={item.title}
                author={item.author}
                date={item.date}
                image={item.image}
                panelist={item.panelist}
                className={`h-[270px] lg:h-[350px] border ${expanded ? "lg:col-span-2" : "col-span-1"}`}
              />
            );
          })}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
