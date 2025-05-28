"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GetAllTagsQueryResult } from "sanity-shared/types";
import { Button } from "./ui/button";
import { useCallback, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Filters({
  filterlist,
}: {
  filterlist: GetAllTagsQueryResult;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false)
  const filtersParams = searchParams.get("filters") || "";

  function setSearchFilter(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("filters", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handleFilterClick = useCallback((slug: string) => setSearchFilter(slug), [searchParams, pathname])
  const handleExpanded = useCallback(() => setExpanded((e) => !e), [])

  const extendedFilterList = [
    {
      _id: "1",
      title: "Todos",
      slug: "",
    },
    ...filterlist,
  ];

  return (
    <div className="flex gap-2 w-full">
      <div className={`flex gap-1 mb-4 w-[calc(100%-40px)] flex-wrap overflow-hidden ${expanded ? "h-auto" : "h-[50px]"}`}>
        {extendedFilterList.map(({ title, slug }, idx) => {
          return (
            <button
              className={`px-3 py-1 rounded-full whitespace-nowrap ${filtersParams === slug ? "bg-[#179389] hover:bg-teal-700 text-white" : "hover:bg-gray-100"}`}
              key={idx}
              onClick={() => handleFilterClick(slug || "")}
            >
              {title}
            </button>
          );
        })}
      </div>
      <Button onClick={() => handleExpanded()} className="w-10 h-10 bg-[#179389]">
        {expanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
    </div>
  );
}
