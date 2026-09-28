import { Laptop, Moon, RotateCcw, Sun, Trash2 } from "lucide-react";
import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { Toggle } from "../components/ui/Toggle";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import { CATEGORIES, CATEGORY_ORDER } from "../data/categories";
import { useAppData } from "../store/AppDataContext";
import type { ThemePreference } from "../types";

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-text">{label}</p>
        {description && <p className="mt-0.5 text-xs text-text-muted">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { data, setTheme, updateSettings, resetDemoData, clearAllData } = useAppData();
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="mt-1 text-sm text-text-muted">Tune how BetterMe looks and behaves.</p>
      </div>

      <Card>
        <h2 className="text-sm font-semibold text-text-muted">Appearance</h2>
        <div className="divide-y divide-border">
          <Row label="Theme" description="Switch instantly, or follow your system setting.">
            <SegmentedControl<ThemePreference>
              value={data.theme}
              onChange={setTheme}
              options={[
                { value: "light", label: "Light", icon: <Sun className="h-3.5 w-3.5" /> },
                { value: "dark", label: "Dark", icon: <Moon className="h-3.5 w-3.5" /> },
                { value: "system", label: "System", icon: <Laptop className="h-3.5 w-3.5" /> },
              ]}
            />
          </Row>
          <Row label="Compact density" description="Tighter spacing across cards and lists.">
            <Toggle
              checked={data.settings.compactDensity}
              onChange={(v) => updateSettings({ compactDensity: v })}
              label="Compact density"
            />
          </Row>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-text-muted">Tasks</h2>
        <div className="divide-y divide-border">
          <Row label="Default category" description="Used for quick-add tasks with no category chosen.">
            <Select
              value={data.settings.defaultCategory}
              onChange={(e) => updateSettings({ defaultCategory: e.target.value as any })}
              className="w-40"
            >
              {CATEGORY_ORDER.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORIES[cat].label}
                </option>
              ))}
            </Select>
          </Row>
          <Row label="Notifications" description="Prototype only — no notifications are actually sent.">
            <Toggle
              checked={data.settings.notificationsEnabled}
              onChange={(v) => updateSettings({ notificationsEnabled: v })}
              label="Notifications"
            />
          </Row>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-text-muted">Data management</h2>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          {confirmReset ? (
            <div className="flex flex-1 items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  resetDemoData();
                  setConfirmReset(false);
                }}
              >
                Confirm reset
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmReset(true)}>
              <RotateCcw className="h-4 w-4" /> Reset demo data
            </Button>
          )}

          {confirmClear ? (
            <div className="flex flex-1 items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => {
                  clearAllData();
                  setConfirmClear(false);
                }}
              >
                Confirm clear
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="danger" className="flex-1" onClick={() => setConfirmClear(true)}>
              <Trash2 className="h-4 w-4" /> Clear all data
            </Button>
          )}
        </div>
        <p className="mt-3 text-xs text-text-faint">
          Resetting restores realistic demo data for today's date. Clearing removes everything and starts
          from an empty app.
        </p>
      </Card>
    </div>
  );
}
