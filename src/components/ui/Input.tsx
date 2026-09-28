import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input({ className = "", ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-10 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text placeholder:text-text-faint outline-none transition-colors focus:border-accent ${className}`}
      {...rest}
    />
  );
}

export function Textarea({
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-text placeholder:text-text-faint outline-none transition-colors focus:border-accent resize-none ${className}`}
      {...rest}
    />
  );
}
