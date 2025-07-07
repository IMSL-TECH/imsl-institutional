"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2, Mail, Send, Link2, Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import WhatsApp from "./icons/whatsapp";
import { cn } from "@/utils";
import Link from "next/link";
import Telegram from "./icons/telegram";

export default function Share() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const site_url = typeof window !== "undefined" ? window.location.href : "";
  const string_url = `Click no link para mais detalhes 👇

${site_url}`;

  const url = encodeURIComponent(string_url);

  const social_media = [
    {
      label: "Whatsapp",
      bg_color: "#25d366",
      icon: <WhatsApp className="h-6 w-6 text-white" />,
      href: `https://wa.me/?text=${url}`,
    },
    {
      label: "Telegram",
      bg_color: "#0088cc",
      icon: <Telegram className="h-6 w-6 text-white" />,
      href: `https://wa.me/?text=${url}`,
    },
  ];

  const handleClick = useCallback(
    (valeu: boolean) => setIsOpen(() => valeu),
    []
  );

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // API moderna
        await navigator.clipboard.writeText(string_url);
      } else {
        // Fallback antigo
        const textarea = document.createElement("textarea");
        textarea.value = string_url;
        textarea.style.position = "fixed"; // evita scroll para o textarea
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Falha ao copiar!", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <>
          <div className="w-full h-screen flex flex-col fixed bottom-0 lg:bottom-20 right-0 z-50">
            <div
              onClick={() => handleClick(false)}
              className="w-full h-[calc(100%-7rem)] h-full"
            ></div>
            <div className="border-t lg:absolute bg-white h-28 lg:h-auto lg:rounded-md lg:bottom-10 lg:right-8 lg:shadow-sm w-full lg:w-auto flex gap-4 py-2 px-3 items-center">
              {social_media.map(({ bg_color, icon, label, href }, idx) => (
                <Link
                  href={href}
                  key={idx}
                  onClick={() => handleClick(false)}
                  target="_blank"
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    style={{ backgroundColor: bg_color }}
                    className={
                      "w-14 h-14 rounded-full flex items-center justify-center"
                    }
                  >
                    {icon}
                  </div>
                  <p className="font-semibold !text-xs">{label}</p>
                </Link>
              ))}
              <button
                onClick={() => copyToClipboard()}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={cn(
                    `bg-gray-300`,
                    "w-14 h-14 rounded-full flex items-center justify-center"
                  )}
                >
                  {copied ? (
                    <Check className="text-white" />
                  ) : (
                    <Link2 className="h-6 w-6 text-white" />
                  )}
                </div>
                <p className="font-semibold !text-xs">
                  {copied ? "Copiado" : "Copiar link"}
                </p>
              </button>
            </div>
          </div>
        </>
      ) : (
        <Button
          onClick={() => handleClick(true)}
          className="fixed z-40 bottom-28 right-5 z-40"
        >
          <Share2 />
        </Button>
      )}
    </>
  );
}
