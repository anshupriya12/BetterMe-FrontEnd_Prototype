import { Frown, Smile, Star } from "lucide-react";
import { Card } from "../ui/Card";
import { useAppData } from "../../store/AppDataContext";
import type { MoodLevel } from "../../types";

const LEVELS: MoodLevel[] = [1, 2, 3, 4, 5];
const LEVEL_LABEL: Record<MoodLevel, string> = {
  1: "Very bad",
  2: "Bad",
  3: "Neutral",
  4: "Good",
  5: "Great",
};

export function MoodSelector({ date, title = "How are we feeling?" }: { date: string; title?: string }) {
  const { data, setMood } = useAppData();
  const level = data.moods[date];

  return (
    <Card>
      <h3 className="text-[15px] font-semibold text-text">{title}</h3>
      <div className="mt-4 flex items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={() => setMood(date, 1)}
          aria-label="Very bad"
          className="rounded-full p-1 transition-transform hover:scale-110"
        >
          <Frown className="h-6 w-6 text-bad" strokeWidth={2} />
        </button>

        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => setMood(date, lvl)}
            aria-label={LEVEL_LABEL[lvl]}
            title={LEVEL_LABEL[lvl]}
            className="rounded-full p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                level && lvl <= level ? "fill-design text-design" : "fill-transparent text-border-strong"
              }`}
              strokeWidth={2}
            />
          </button>
        ))}

        <button
          type="button"
          onClick={() => setMood(date, 5)}
          aria-label="Great"
          className="rounded-full p-1 transition-transform hover:scale-110"
        >
          <Smile className="h-6 w-6 text-design" strokeWidth={2} />
        </button>
      </div>
      {level && (
        <p className="mt-2 text-center text-xs font-medium text-text-muted">{LEVEL_LABEL[level]}</p>
      )}
    </Card>
  );
}
