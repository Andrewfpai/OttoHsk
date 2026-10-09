import { Bot, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Attempt } from "../lib/fallback";
import type { Feedback } from "../lib/feedback";

function scoreTone(score: number) {
  if (score >= 75) return "text-success";
  if (score >= 55) return "text-warning";
  return "text-destructive";
}

/** "Checked by gpt-6-sol · deepseek-v4-pro failed (HTTP 503)". */
export function ModelLine({ model, attempts }: { model: string; attempts?: Attempt[] }) {
  const failed = (attempts ?? []).filter((a) => !a.ok);
  return (
    <p className="text-muted-foreground flex flex-wrap items-center gap-x-1.5 text-xs">
      <Bot aria-hidden className="size-3.5" />
      Checked by <span className="text-foreground font-medium">{model}</span>
      {failed.length > 0 ? (
        <span>
          · {failed.map((a) => `${a.model} failed (${a.error})`).join(", ")}
        </span>
      ) : null}
    </p>
  );
}

export function FeedbackView({
  feedback,
  model,
  attempts,
}: {
  feedback: Feedback;
  model: string;
  attempts?: Attempt[];
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="text-center">
          <p className={cn("font-numeric text-4xl font-semibold", scoreTone(feedback.score))}>
            {feedback.score}
          </p>
          <p className="text-muted-foreground text-xs">/ 100</p>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm">{feedback.summary}</p>
          <ModelLine model={model} attempts={attempts} />
        </div>
      </div>

      {feedback.wordUse.length > 0 ? (
        <section className="space-y-2">
          <h3 className="text-sm font-medium">The five words</h3>
          <ul className="space-y-1.5">
            {feedback.wordUse.map((w) => (
              <li key={w.word} className="flex items-start gap-2 text-sm">
                {w.ok ? (
                  <Check aria-label="Used correctly" className="text-success mt-0.5 size-4 shrink-0" />
                ) : (
                  <X aria-label="Not used correctly" className="text-destructive mt-0.5 size-4 shrink-0" />
                )}
                <span className="font-hanzi shrink-0">{w.word}</span>
                {w.note ? <span className="text-muted-foreground">{w.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {feedback.corrections.length > 0 ? (
        <section className="space-y-2">
          <h3 className="text-sm font-medium">Corrections</h3>
          <ul className="divide-y rounded-xl border">
            {feedback.corrections.map((c, i) => (
              <li key={i} className="space-y-1 p-3 text-sm">
                <p className="font-hanzi">
                  <span className="text-destructive line-through decoration-1">{c.original}</span>
                  <span className="text-muted-foreground mx-2">→</span>
                  <span className="text-success">{c.corrected}</span>
                </p>
                <p className="text-muted-foreground">{c.why}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-success text-sm">No errors found.</p>
      )}

      {feedback.corrected ? (
        <section className="space-y-1.5">
          <h3 className="text-sm font-medium">Your essay, corrected</h3>
          <p className="font-hanzi bg-muted/40 rounded-xl p-3 text-lg leading-relaxed">{feedback.corrected}</p>
        </section>
      ) : null}

      <section className="space-y-1.5">
        <h3 className="text-sm font-medium">Model answer</h3>
        <p className="font-hanzi bg-primary/5 rounded-xl p-3 text-lg leading-relaxed">{feedback.modelAnswer}</p>
      </section>

      {feedback.tips.length > 0 ? (
        <section className="space-y-1.5">
          <h3 className="text-sm font-medium">Tips</h3>
          <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
            {feedback.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
