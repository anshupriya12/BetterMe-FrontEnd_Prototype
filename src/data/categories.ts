import { HeartPulse, Palette, Video, Share2, Sparkles, type LucideIcon } from "lucide-react";
import type { CategoryId } from "../types";

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  header: string; // solid header background
  headerText: string;
  text: string; // text color class
  soft: string; // soft background class
  dot: string; // small dot / bg-only class
  ring: string; // stroke color for charts (css var)
}

export const CATEGORIES: Record<CategoryId, CategoryMeta> = {
  health: {
    id: "health",
    label: "Health",
    icon: HeartPulse,
    header: "bg-health",
    headerText: "text-white",
    text: "text-health",
    soft: "bg-health-soft",
    dot: "bg-health",
    ring: "var(--health)",
  },
  design: {
    id: "design",
    label: "Design",
    icon: Palette,
    header: "bg-design",
    headerText: "text-white",
    text: "text-design",
    soft: "bg-design-soft",
    dot: "bg-design",
    ring: "var(--design)",
  },
  video: {
    id: "video",
    label: "Video",
    icon: Video,
    header: "bg-video",
    headerText: "text-white",
    text: "text-video",
    soft: "bg-video-soft",
    dot: "bg-video",
    ring: "var(--video)",
  },
  socials: {
    id: "socials",
    label: "Socials",
    icon: Share2,
    header: "bg-socials",
    headerText: "text-white",
    text: "text-socials",
    soft: "bg-socials-soft",
    dot: "bg-socials",
    ring: "var(--socials)",
  },
  other: {
    id: "other",
    label: "Other",
    icon: Sparkles,
    header: "bg-other",
    headerText: "text-white",
    text: "text-other",
    soft: "bg-other-soft",
    dot: "bg-other",
    ring: "var(--other)",
  },
};

export const CATEGORY_ORDER: CategoryId[] = ["health", "design", "video", "socials", "other"];
