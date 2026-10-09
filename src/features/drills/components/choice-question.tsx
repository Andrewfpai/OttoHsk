"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

/** Splits "他＿＿来了" around the blank so it can be drawn as a gap. */
export function BlankSentence({
  sentence,
  fill,
  state,
  className,
}: {
  sentence: string;
  /** Shown in the gap once answered. */
  fill?: string | null;
  state?: "right" | "wrong" | null;
  className?: string;
}) {
  const [before, after = ""] = sentence.split("＿＿");
  return (
    <p className={cn("font-hanzi leading-relaxed", className)}>
      {before}
      <span
        className={cn(
          "mx-1 inline-block min-w-16 border-b-2 px-1 text-center",
          state === "right" && "border-success text-success",
          state === "wrong" && "border-destructive text-destructive",
          !state && "border-primary",
        )}
      >
        {fill ?? " "}
      </span>
      {after}
    </p>
  );
}

/**
 * A row of answer buttons. By default the answer shows as soon as one is
 * picked and the row locks. With `revealed={false}` the pick stays neutral
 * and changeable until the caller reveals it — for answering a whole
 * passage before seeing any answers.
 */
export function Choices({
  options,
  answer,
  picked,
  onPick,
  render = (o) => o,
  hanzi = true,
  revealed,
}: {
  options: readonly string[];
  answer: string;
  picked: string | null;
  onPick: (option: string) => void;
  render?: (option: string) => React.ReactNode;
  hanzi?: boolean;
  revealed?: boolean;
}) {
  const shown = revealed ?? picked !== null;
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const isAnswer = o === answer;
        const isPicked = o === picked;
        return (
          <button
            key={o}
            type="button"
            disabled={shown}
            aria-pressed={!shown ? isPicked : undefined}
            onClick={() => onPick(o)}
            className={cn(
              "focus-visible:ring-ring inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default",
              hanzi && "font-hanzi text-lg",
              !shown && !isPicked && "hover:border-primary/50 hover:bg-muted/50",
              !shown && isPicked && "border-primary bg-primary/10",
              shown && isAnswer && "border-success bg-success/10",
              shown && isPicked && !isAnswer && "border-destructive bg-destructive/10",
              shown && !isAnswer && !isPicked && "opacity-50",
            )}
          >
            {render(o)}
            {shown && isAnswer ? (
              <Check aria-label="Correct answer" className="text-success size-4" />
            ) : null}
            {shown && isPicked && !isAnswer ? (
              <X aria-label="Your answer" className="text-destructive size-4" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
