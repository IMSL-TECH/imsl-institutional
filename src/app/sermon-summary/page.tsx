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
import { formatDate, normalizeText } from "@/utils";
import ClearSearch from "@/components/clear-search";

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
   const [
    sermon_list_data,
    all_tags_data,
    sermon_page_data
  ]: [
    GetResumedSermonSumaryListQueryResult,
    GetAllTagsQueryResult,
    SermonSummaryPageQueryResult
  ] = await Promise.all([
    sanityClient.fetch<GetResumedSermonSumaryListQueryResult>(getResumedSermonSumaryListQuery),
    sanityClient.fetch<GetAllTagsQueryResult>(getAllTagsQuery),
    sanityClient.fetch<SermonSummaryPageQueryResult>(sermonSummaryPageQuery),
  ]);

  

  const { findDate = "", findTitle = "", filters = "" } = await searchParams;

  const filteredSermons = sermon_list_data
  .filter((item) => {
    const sermonDate = item?.date || "";
    const titleMatch = normalizeText(item.title).includes(normalizeText(findTitle));
    const dateMatch = findDate ? sermonDate === formatDate(findDate) : true;

    const tagMatch = filters
      ? item.tags?.some((tag) =>
          normalizeText(tag._id).includes(normalizeText(filters))
        )
      : true;

    return titleMatch && dateMatch && tagMatch;
  })
  .sort((a, b) => {
    const dateA = new Date(a?.date || "").getTime();
    const dateB = new Date(b?.date || "").getTime();
    return dateB - dateA; // Mais recente primeiro
  });

  const blogPostList: FormatWordSummaryType[] = formatWordSummary(filteredSermons);

  return (
    <div>
      <PageHeader imgSrc={sermon_page_data?.bannerImage}>{sermon_page_data?.title}</PageHeader>
      <Section>
        <div className="flex items-center justify-between gap-2 mb-4">
          <SearchInput />
          <DatePicker />
          <ClearSearch local="sermon-summary"/>
        </div>
        <Filters filterlist={all_tags_data} />
        <div className="grid-cols-2 lg:grid-cols-3 gap-2 grid">
          {blogPostList.map(({ item, expanded }, idx) => {
            return (
              <BlogCard
                cardLink={`/sermon-summary/${item.slug}`}
                key={idx}
                title={item.title}
                author={`${item.speaker?.titleAbbreviation ? item.speaker?.titleAbbreviation : ""}${item.speaker?.name}`}
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