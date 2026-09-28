import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Sidebar } from "./Sidebar";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40 animate-fade-up" onClick={onClose} aria-hidden />
      <div className="animate-pop-in absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col border-r border-border bg-sidebar shadow-[var(--shadow-pop)]">
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <span className="text-lg font-bold text-text">
            Better<span className="text-accent">Me.</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-1.5 text-text-muted hover:bg-card-hover hover:text-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1">
          <Sidebar onNavigate={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
