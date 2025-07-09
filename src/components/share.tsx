"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function Share({title}: {title: string}) {
  const site_url = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Click no link para mais detalhes 👇

`,
          url: site_url,
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
      className="fixed z-40 bottom-28 right-5 z-40"
    >
      <Share2 />
    </Button>
  );
}
