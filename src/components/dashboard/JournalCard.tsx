import { Star, type LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";

interface JournalCardProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: LucideIcon;
}

export function JournalCard({ title, value, onChange, placeholder, icon: Icon = Star }: JournalCardProps) {
  return (
    <Card className="relative">
      <h3 className="text-[15px] font-semibold text-text">{title}</h3>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-script mt-4 w-full border-0 border-b border-border bg-transparent pb-2 text-xl text-text outline-none placeholder:text-text-faint focus:border-accent"
      />
      <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-design text-white shadow-sm">
        <Icon className="h-4 w-4" strokeWidth={2.25} fill="currentColor" />
      </span>
    </Card>
  );
}
