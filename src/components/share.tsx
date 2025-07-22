"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Share({title}: {title: string}) {
  const pathname = usePathname()
  const site_url = typeof window !== "undefined" ? window.location.origin : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Click no link para mais detalhes 👇
          
`,
          url: `${site_url}${pathname}`,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("O compartilhamento nativo não é suportado neste navegador.");
    }
  };

  return (
    <Button
      onClick={() => handleShare()}
      className="fixed z-40 bottom-28 right-5 z-40 min-w-10 w-10 h-10"
    >
      <Send />
    </Button>
  );
}
