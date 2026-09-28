import {
  LayoutDashboard,
  CircleUserRound,
  Clock,
  CalendarRange,
  CalendarDays,
  FilePlus2,
  Settings as SettingsIcon,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/today", label: "Today", icon: CircleUserRound },
  { to: "/app/time-view", label: "Time View", icon: Clock },
  { to: "/app/weekly", label: "Weekly View", icon: CalendarRange },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/new-page", label: "New Page", icon: FilePlus2 },
];

export const SETTINGS_ITEM: NavItem = { to: "/app/settings", label: "Settings", icon: SettingsIcon };
