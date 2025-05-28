import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import Footer from "@/components/footer";
import BlogCard from "@/components/blog-card";
import SearchInput from "@/components/search";
import Filters from "@/components/filters";
import { DatePicker } from "@/components/date-picker";
import { GetResumedSermonSumaryListQueryResult,GetAllTagsQueryResult, SermonSummaryPageQueryResult } from "sanity-shared/types";
import { getResumedSermonSumaryListQuery,getAllTagsQuery, sermonSummaryPageQuery } from "sanity-shared/queries";
import { sanityClient } from "@/lib/sanityClient";
import BackToTopButton from "@/components/back-to-top-button";

type FormatWordSummaryType = {
  item: GetResumedSermonSumaryListQueryResult[number];
  expanded: boolean;
};

function formatWordSummary(data: GetResumedSermonSumaryListQueryResult) {
  const itemsWithSpan: FormatWordSummaryType[] = [];

  for (let i = 0; i < data?.length; i++) {
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
   const sermon_list_data: GetResumedSermonSumaryListQueryResult = await sanityClient.fetch(getResumedSermonSumaryListQuery);
   const all_tags_data: GetAllTagsQueryResult = await sanityClient.fetch(getAllTagsQuery);
   const sermon_page_data: SermonSummaryPageQueryResult = await sanityClient.fetch(sermonSummaryPageQuery);

  const res_searchParams = await searchParams;
  const blogPostList: FormatWordSummaryType[] = formatWordSummary(sermon_list_data);

  const findDate = res_searchParams?.findDate || ""
  const find = res_searchParams?.find || ""
  const filters = res_searchParams?.filters || ""

  return (
    <div>
      <PageHeader imgSrc={sermon_page_data?.bannerImage}>{sermon_page_data?.title}</PageHeader>
      <Section>
        <div className="flex items-center justify-between mb-4">
          <SearchInput />
          <DatePicker />
          
        </div>
        <Filters filterlist={all_tags_data} />
        <div className="grid-cols-2 lg:grid-cols-3 gap-2 grid">
          {blogPostList.map(({ item, expanded }, idx) => {
            return (
              <BlogCard
                cardLink={`/sermon-summary/${item.slug}`}
                key={idx}
                title={item.title}
                author={item.speaker?.name || ""}
                date={item.date}
                background={item.background}
                panelist={item.speaker?.photo}
                className={`h-[270px] lg:h-[350px] border ${expanded ? "lg:col-span-2" : "col-span-1"}`}
              />
            );
          })}
        </div>
      </Section>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
