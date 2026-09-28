import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: ReactNode;
}

const VARIANTS: Record<string, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover shadow-sm",
  secondary: "bg-accent-soft text-accent hover:brightness-95",
  ghost: "bg-transparent text-text-muted hover:bg-card-hover hover:text-text",
  danger: "bg-bad/10 text-bad hover:bg-bad/15",
};

const SIZES: Record<string, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
