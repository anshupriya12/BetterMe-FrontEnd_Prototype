import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  size?: "sm" | "md";
}

export function Checkbox({ checked, onChange, label, size = "md" }: CheckboxProps) {
  const dim = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`group relative shrink-0 ${dim} rounded-md border-2 transition-all duration-150 ${
        checked
          ? "border-accent bg-accent"
          : "border-border-strong bg-transparent hover:border-accent"
      }`}
    >
      {checked && (
        <Check
          strokeWidth={3}
          className="absolute inset-0 h-full w-full p-0.5 text-accent-contrast animate-check-pop"
        />
      )}
    </button>
  );
}
