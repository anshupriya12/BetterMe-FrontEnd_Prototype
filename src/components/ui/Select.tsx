import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

export function Select({ className = "", children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={`h-10 w-full appearance-none rounded-xl border border-border bg-surface px-3.5 pr-9 text-sm text-text outline-none transition-colors focus:border-accent ${className}`}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
    </div>
  );
}
