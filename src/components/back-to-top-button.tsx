"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const scrolledPastThreshold = window.scrollY > window.innerHeight;
    setIsVisible(scrolledPastThreshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-16 right-5 z-40 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      ↑
    </Button>
  );
}
