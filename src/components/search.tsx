"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const findTitle = searchParams.get("findTitle")
  const [query, setQuery] = useState(findTitle || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("findTitle", query);
      } else {
        params.delete("findTitle");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [query, findTitle]);

  return (
    <div className="relative flex-1 mr-4">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button className="absolute right-5 top-1/2 -translate-y-1/2">
        <Search className="text-gray-400" />
      </button>
    </div>
  );
}
