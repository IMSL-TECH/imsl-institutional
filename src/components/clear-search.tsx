"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Eraser } from "lucide-react";
import { useCallback, useTransition } from "react";
import Loading from "./loading";

export default function ClearSearch({ local }: { local: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(() => {
    startTransition(() => {
      router.replace(local, { scroll: false });
    });
  }, [router, local]);

  console.log(isPending)

  return (
    <Button
      className={`w-11 h-11 ${isPending ? "bg-teal-700 !cursor-progress" : "bg-[#179389]"}  hover:bg-teal-700 `}
      onClick={handleClick}
      aria-label="Limpar busca"
      disabled={isPending}
    >
      {isPending ? <Loading /> : <Eraser className="w-6 h-6" />}
    </Button>
  );
}
