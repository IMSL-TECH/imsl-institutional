"use client"

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function BackToTopButton(){
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const viewportHeight = window.innerHeight; // Altura do viewport
    const toggleVisibility = () => {
      if (window.scrollY > viewportHeight) { // Usa o threshold ou o tamanho do viewport
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    return (
        
            <Button
              onClick={scrollToTop}
              className={`fixed bottom-5 right-5 transition-all duration-300 ${isVisible ? "opacity-100" : "translate-y-20 opacity-0"} `}
              aria-label="Voltar ao topo"
            >
              ↑
            </Button>
          
    )
}