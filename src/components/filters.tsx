"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const filters = [
  { label: "Todos", value: "" },
  { label: "Perseverança", value: "perseverance" },
  { label: "Amor", value: "love" },
];

export default function Filters() {
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
      {filters.map(({ label, value }, idx) => {
        return (
          <button
            className={`px-3 py-1 rounded-full ${filtersParams === value ? "bg-[#179389] hover:bg-teal-700 text-white" : "hover:bg-gray-100"}`}
            key={idx}
            onClick={() => handleClick(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
