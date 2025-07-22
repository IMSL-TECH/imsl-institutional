"use client"

import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
  children: React.ReactNode;
  className?: string;
}

export function CopyButton({ textToCopy, children, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
    className={className}
    >
      {copied ? "Copiado!" : children}
    </button>
  );
}
