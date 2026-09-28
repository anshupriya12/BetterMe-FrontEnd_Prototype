import type { ReactNode } from "react";

interface DeviceFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
  theme?: "light" | "dark";
  chromeClassName?: string;
}

/** Premium browser-chrome mockup used to present real product UI at large scale. */
export function DeviceFrame({ children, url = "betterme.app/dashboard", className = "", theme, chromeClassName = "" }: DeviceFrameProps) {
  return (
    <div
      data-theme={theme}
      className={`overflow-hidden rounded-[20px] border border-black/[0.06] bg-card shadow-[0_2px_8px_rgba(20,20,40,0.06),0_40px_80px_-24px_rgba(20,20,40,0.35)] ${className}`}
    >
      <div className={`flex items-center gap-3 border-b border-border bg-surface px-4 py-3 ${chromeClassName}`}>
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex w-full max-w-[280px] items-center justify-center gap-1.5 truncate rounded-md bg-bg px-3 py-1 text-[11px] font-medium text-text-faint sm:max-w-xs">
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="bg-bg">{children}</div>
    </div>
  );
}
