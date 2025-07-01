"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import logoMS from "@/assets/logo/Logo nav Bar.svg";
import { HeaderQueryResult } from "sanity-shared/types";
import Section from "./section";

type MenuItemProps = {
  label: string | null;
  link: string | null;
  isActive: boolean;
  isMobile?: boolean;
};

function MenuItem({ label, link, isActive, isMobile = false }: MenuItemProps) {
  const isExternal = link?.startsWith("http");
  const baseClasses =
    "px-3 py-1.5 rounded-md uppercase transition-all text-sm lg:text-base";
  const activeClasses = isActive
    ? "bg-[#179389] text-white"
    : isMobile
    ? "text-black"
    : "text-white";
  const hoverClasses = isActive
    ? "hover:bg-teal-700"
    : isMobile
    ? "hover:bg-gray-100"
    : "hover:bg-teal-700";

  return (
    <Link
      href={link || ""}
      className={`${baseClasses} ${activeClasses} ${hoverClasses} text-center`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </Link>
  );
}

export default function Navbar({ headerData }: { headerData: HeaderQueryResult }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuList = useMemo(() => {
    const pathRoot = pathname.split("/").filter(Boolean)[0];
    return headerData?.items?.map(({ label = "Sem Título", link = "/" }) => ({
      label,
      link,
      isActive: pathRoot === link?.split("/").filter(Boolean)[0],
    }));
  }, [headerData, pathname]);

  const handleOpenMenu = useCallback(() => setIsOpen(true), []);
  const handleCloseMenu = useCallback(() => setIsOpen(false), []);

  const renderMenuItem = useCallback(
    (
      item: { label: string | null; link: string | null; isActive: boolean },
      isMobile = false
    ) => {
      return (
        <MenuItem
          key={item.link}
          label={item.label}
          link={item.link}
          isActive={item.isActive}
          isMobile={isMobile}
        />
      );
    },
    []
  );


  return (
    <Section
      backgroundColor="bg-gradient-to-b from-black/60 via-black/40 to-transparent !py-0 z-10"
      className="relative h-32"
    >
      <div className="absolute w-full pt-6 md:pt-7">
        <nav className="flex items-center justify-between w-full py-4 text-white">
          {/* Logo */}
          <Link href="/" aria-label="Página inicial">
            <Image src={logoMS} alt="Logo Monte Sião Linhares" priority />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-4">
          {menuList?.map((item) => renderMenuItem(item, false))}
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="lg:hidden"
            onClick={handleOpenMenu}
            aria-label="Abrir menu"
            aria-expanded={isOpen}
          >
            <Menu size={28} />
          </button>

          {/* Drawer Mobile */}
          <div
            className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 flex ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Overlay */}
            <div
              className="bg-black/30 w-1/5 h-full"
              onClick={handleCloseMenu}
              aria-hidden="true"
            ></div>

            {/* Drawer Content */}
            <div className="bg-white w-4/5 h-full flex flex-col items-center">
              <div className="w-full flex justify-end p-6 mt-6">
                <button
                  onClick={handleCloseMenu}
                  className="w-10 h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                  aria-label="Fechar menu"
                >
                  <X className="text-black" />
                </button>
              </div>

              <ul className="flex flex-col gap-2 w-full px-4 mt-4">
              {menuList?.map((item) => renderMenuItem(item, true))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Section>
  );
}
