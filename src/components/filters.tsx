"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GetAllTagsQueryResult } from "sanity-shared/types";

export default function Filters({filterlist}:{filterlist:GetAllTagsQueryResult}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filtersParams = searchParams.get("filters") || "";

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("filters", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-1 mb-4">
      {filterlist.map(({ title, slug }, idx) => {
        return (
          <button
            className={`px-3 py-1 rounded-full ${filtersParams === slug ? "bg-[#179389] hover:bg-teal-700 text-white" : "hover:bg-gray-100"}`}
            key={idx}
            onClick={() => handleClick(slug || "All")}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}
