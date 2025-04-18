import { cn } from "@/lib/utils";

import type { IconProps } from "@/type";

export function Facebook({ className, ...props }: IconProps) {
    return (
      <div className={cn("flex items-center", className)} {...props}>
        <span className="sr-only">Facebook</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn("w-5 h-5", className)}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </div>
    );
  }