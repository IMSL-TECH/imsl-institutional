"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GetAllTagsQueryResult } from "sanity-shared/types";
import { Button } from "./ui/button";
import { useCallback, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FiltersProps = {
  filterlist: GetAllTagsQueryResult;
};

export default function Filters({ filterlist }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [expanded, setExpanded] = useState(false);
  const currentFilter = searchParams.get("filters") || "";

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const setFilterInURL = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("filters", value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const extendedFilterList = useMemo(
    () => [
      { _id: "", title: "Todos", slug: "" },
      ...filterlist,
    ],
    [filterlist]
  );

  const renderedFilters = useMemo(
    () =>
      extendedFilterList.map(({ title, _id }) => {
        const isActive = currentFilter === _id;

        return (
          <button
            key={_id || title}
            onClick={() => setFilterInURL(_id || "")}
            className={`px-3 py-1 rounded-full text-sm lg:text-base whitespace-nowrap transition-colors ${
              isActive
                ? "bg-[#179389] hover:bg-teal-700 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
            aria-pressed={isActive}
          >
            {title}
          </button>
        );
      }),
    [extendedFilterList, currentFilter, setFilterInURL]
  );

  return (
    <div className="flex gap-2 w-full">
      <div
        className={`
          flex gap-1 mb-4 w-[calc(100%-40px)] flex-wrap overflow-hidden transition-all
          ${expanded ? "h-auto" : "h-[30px] lg:h-[45px]"}
        `}
      >
        {renderedFilters}
      </div>

      <Button
        onClick={toggleExpanded}
        className="w-10 h-10 bg-[#179389] hover:bg-teal-700 p-0"
        aria-label={expanded ? "Mostrar menos filtros" : "Mostrar mais filtros"}
      >
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </div>
  );
}
