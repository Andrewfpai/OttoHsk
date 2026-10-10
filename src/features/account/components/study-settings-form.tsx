"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_EXAM_DATE } from "@/lib/exam";
import { LEVELS, type Level } from "@/lib/levels";
import { cn } from "@/lib/utils";

import { updateStudySettings } from "../server/actions";

const LEVEL_COPY: Record<Level, string> = {
  5: "1,300 words · sentence order · two short essays",
  6: "2,500 words · find the error · 缩写 retelling",
};

/** The HSK level every tab follows, and the exam date the countdown uses. */
export function StudySettingsForm({ level, examDate }: { level: Level; examDate: string | null }) {
  const router = useRouter();
  const [chosen, setChosen] = useState<Level>(level);
  const [date, setDate] = useState(examDate ?? "");
  const [pending, startTransition] = useTransition();
  const changed = chosen !== level || date !== (examDate ?? "");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const res = await updateStudySettings({ level: chosen, examDate: date });
        if (!res.ok) {
          toast.error(res.error);
          return;
        }
        toast.success(chosen !== level ? `Switched to HSK ${chosen}.` : "Saved.");
        router.refresh();
      } catch {
        toast.error("Couldn't reach the server. Nothing was changed; try again.");
      }
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-medium">Level</legend>
        <div role="radiogroup" aria-label="HSK level" className="grid gap-2 sm:grid-cols-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={chosen === l}
              onClick={() => setChosen(l)}
              className={cn(
                "focus-visible:ring-ring cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none",
                chosen === l ? "border-primary bg-primary/10" : "hover:bg-muted",
              )}
            >
              <span className="block font-semibold">HSK {l}</span>
              <span className="text-muted-foreground block text-xs">{LEVEL_COPY[l]}</span>
            </button>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          Progress is kept per level, so switching back and forth loses nothing.
        </p>
      </fieldset>

      <div className="space-y-1.5">
        <Label htmlFor="examDate">Exam date</Label>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            id="examDate"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-44"
          />
          {date ? (
            <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => setDate("")}>
              Clear
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => setDate(DEFAULT_EXAM_DATE)}
            >
              Use 7 Nov 2026
            </Button>
          )}
        </div>
        <p className="text-muted-foreground text-xs">
          For the dashboard countdown. Leave it empty if you have no exam booked.
        </p>
      </div>

      <Button type="submit" className="cursor-pointer" disabled={!changed || pending}>
        {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
        Save
      </Button>
    </form>
  );
}
