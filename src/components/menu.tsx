"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import logoMS from "@/assets/logo/Logo nav Bar.svg";
import { usePathname } from "next/navigation";

const menuList = [
  { label: "Home", link: "/" },
  { label: "Resumo da palavra", link: "" },
  { label: "Sobre", link: "/about" },
  { label: "Eventos", link: "/events" },
  { label: "Contatos", link: "/contact" },
];

function MenuList({
  label,
  link,
  className,
}: {
  label: string;
  link: string;
  className: string;
}) {
  return (
    <Link
      href={link}
      className={`px-2.5 py-1.5 uppercase rounded-md ${className}`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between w-full py-4 text-white">
      <Link href="/">
        <Image src={logoMS} alt="Banner Monte Sião Linhares" />
      </Link>

      {/* Menu Desktop */}
      <section className="hidden lg:flex gap-4">
        {menuList.map(({ label, link }, idx) => (
          <MenuList
            label={label}
            link={link}
            key={idx}
            className={`text-white hover:bg-teal-700 ${
              pathname === link && "bg-[#179389] "
            }`}
          />
        ))}
      </section>

      {/* Botão Menu Mobile */}
      <button className="lg:hidden" onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </button>

      {/* Drawer Mobile */}
      <section
        className={`fixed lg:hidden flex top-0 right-0 z-50 h-screen w-full transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="bg-black w-1/5 h-full opacity-5"
          onClick={() => setIsOpen(false)}
        ></div>
        <div className="bg-white w-4/5 h-full flex flex-col items-center">
          <div className="w-full flex justify-end items-center h-[50px] mt-10 px-6">
            <div className="w-10 h-10 hover:bg-gray-300 flex items-center justify-center rounded-lg">
              <X className="text-black" onClick={() => setIsOpen(false)} />
            </div>
          </div>
          <ul className="px-4 flex flex-col gap-2 w-full">
            {menuList.map(({ label, link }, idx) => (
              <MenuList
                label={label}
                link={link}
                key={idx}
                className={`text-black flex items-center justify-center w-full ${
                  pathname === link && "bg-[#179389] text-white"
                }`}
              />
            ))}
          </ul>
        </div>
      </section>
    </nav>
  );
}
