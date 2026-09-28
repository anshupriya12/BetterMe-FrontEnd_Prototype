import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] ${
        padded ? "p-5" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
