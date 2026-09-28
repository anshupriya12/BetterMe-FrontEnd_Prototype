const DOT: Record<"health" | "design" | "video", string> = {
  health: "bg-health",
  design: "bg-design",
  video: "bg-video",
};
const BAR: Record<"health" | "design" | "video", string> = {
  health: "bg-health",
  design: "bg-design",
  video: "bg-video",
};

/** Theme-independent static mockup card — used to show light & dark side by side regardless of the app's live theme setting. */
export function MiniPreview({ theme }: { theme: "light" | "dark" }) {
  return (
    <div data-theme={theme} className="pointer-events-none select-none rounded-2xl bg-bg p-4 sm:p-5">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text">Overview</p>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">Today</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div
            className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--health) 0deg 90deg, var(--design) 90deg 190deg, var(--video) 190deg 260deg, var(--ring-track) 260deg 360deg)`,
            }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-xs font-bold text-text">76%</div>
          </div>
          <div className="flex-1 space-y-1.5">
            {(["health", "design", "video"] as const).map((c) => (
              <div key={c} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${DOT[c]}`} />
                <div className="h-1.5 flex-1 rounded-full bg-ring-track">
                  <div className={`h-1.5 rounded-full ${BAR[c]}`} style={{ width: c === "health" ? "70%" : c === "design" ? "55%" : "35%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[["Tasks", "24"], ["Hours", "13"], ["Mood", "4.6"]].map(([label, val]) => (
            <div key={label} className="rounded-xl bg-bg px-2.5 py-2 text-center">
              <p className="text-sm font-bold text-text">{val}</p>
              <p className="text-[10px] text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
