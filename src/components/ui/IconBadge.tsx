import type { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  icon: LucideIcon;
  className?: string;
}

export function IconBadge({ icon: Icon, className = "" }: IconBadgeProps) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-contrast shadow-sm ${className}`}
    >
      <Icon className="h-4 w-4" strokeWidth={2.25} />
    </div>
  );
}
