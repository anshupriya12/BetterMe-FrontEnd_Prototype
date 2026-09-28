interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 38 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-video text-xs font-semibold text-white ring-2 ring-white/15"
      aria-hidden
    >
      {initials}
    </div>
  );
}
