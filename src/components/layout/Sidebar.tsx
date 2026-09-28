import { NavLink } from "react-router-dom";
import { NAV_ITEMS, SETTINGS_ITEM } from "./navItems";

interface SidebarProps {
  onNavigate?: () => void;
}

function navLinkClass(isActive: boolean) {
  return `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
    isActive
      ? "bg-sidebar-active text-accent"
      : "text-text-muted hover:bg-card-hover hover:text-text"
  }`;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav className="flex h-full w-64 shrink-0 flex-col justify-between bg-sidebar px-4 py-6">
      <ul className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/app"}
              onClick={onNavigate}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.1} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-sidebar-border pt-4">
        <NavLink
          to={SETTINGS_ITEM.to}
          onClick={onNavigate}
          className={({ isActive }) => navLinkClass(isActive)}
        >
          <SETTINGS_ITEM.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.1} />
          {SETTINGS_ITEM.label}
        </NavLink>
      </div>
    </nav>
  );
}
