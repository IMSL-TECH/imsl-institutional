import { cn } from "@/lib/utils";

import type { IconProps } from "@/type";

export default function Instagram({ className, ...props }: IconProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <span className="sr-only">Instagram</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lucide lucide-instagram w-5 h-5", className)}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </div>
  );
}
